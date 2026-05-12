#!/usr/bin/env python3
"""
Patch xmulogin 1.0.0 so TronClass login follows the current XMU redirect chain.

Usage:
    python patch-xmulogin.py

The script locates the installed xmulogin/core.py, creates a .bak backup next
to it, and rewrites only the _login_tronclass function plus small helper
functions needed by that login flow.
"""

from __future__ import annotations

import importlib.util
import re
import shutil
import sys
from pathlib import Path


PATCH_MARKER = "# XMU_TRONCLASS_REDIRECT_PATCH"

HELPERS = r'''

# XMU_TRONCLASS_REDIRECT_PATCH
def _xmu_follow_redirects(session, response, headers, max_redirects=12):
    """Follow redirects manually until a non-redirect response is reached."""
    from urllib.parse import urljoin

    for _ in range(max_redirects):
        if not response.is_redirect:
            return response
        location = response.headers.get("location")
        if not location:
            return response
        response = session.get(
            urljoin(response.url, location),
            headers=headers,
            allow_redirects=False,
        )
    raise RuntimeError("Login redirect chain is too long")


def _xmu_extract_login_field(html, field_name):
    """Extract hidden login fields even if attribute order changes."""
    patterns = [
        rf'<input[^>]*(?:id|name)=["\']{re.escape(field_name)}["\'][^>]*value=["\']([^"\']+)["\'][^>]*>',
        rf'<input[^>]*value=["\']([^"\']+)["\'][^>]*(?:id|name)=["\']{re.escape(field_name)}["\'][^>]*>',
    ]
    for pattern in patterns:
        match = re.search(pattern, html, re.I)
        if match:
            return match.group(1)
    return None
'''

LOGIN_FUNCTION = r'''def _login_tronclass(username: str, password: str) -> Optional[requests.Session]:
    """
    Log in to XMU TronClass through the unified identity authentication flow.

    This patched version follows the full redirect chain before parsing the
    XMU authserver login page. The old xmulogin 1.0.0 flow assumed a fixed
    number of redirects and can fail with "'NoneType' object has no attribute
    'group'" when XMU inserts an extra redirect.
    """
    url = "https://c-identity.xmu.edu.cn/auth/realms/xmu/protocol/openid-connect/auth"
    url_2 = "https://c-identity.xmu.edu.cn/auth/realms/xmu/protocol/openid-connect/token"
    url_3 = "https://lnt.xmu.edu.cn/api/login?login=access_token"

    headers = {
        "User-Agent": "Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/142.0.0.0 Mobile Safari/537.36"
    }

    params = {
        "scope": "openid",
        "response_type": "code",
        "client_id": "TronClassH5",
        "redirect_uri": "https://c-mobile.xmu.edu.cn/identity-web-login-callback?_h5=true"
    }

    try:
        s = requests.Session()
        s.trust_env = False

        response = s.get(url, headers=headers, params=params, allow_redirects=False)
        response = _xmu_follow_redirects(s, response, headers)
        html = response.text

        salt = _xmu_extract_login_field(html, "pwdEncryptSalt")
        execution = _xmu_extract_login_field(html, "execution")
        if not salt or not execution:
            raise RuntimeError(
                f"Could not find XMU login form fields at {response.url} "
                f"(status {response.status_code})"
            )

        enc = _encrypt_password(password, salt)

        data = {
            "username": username,
            "password": enc,
            "captcha": '',
            "_eventId": "submit",
            "cllt": "userNameLogin",
            "dllt": "generalLogin",
            "lt": '',
            "execution": execution
        }

        response = s.post(response.url, data=data, headers=headers, allow_redirects=False)
        response = _xmu_follow_redirects(s, response, headers)

        params_dict = parse_qs(urlparse(response.url).query)
        code = params_dict.get('code', [None])[0]
        if not code:
            raise RuntimeError(f"XMU login did not return an authorization code at {response.url}")

        data = {
            "client_id": "TronClassH5",
            "grant_type": "authorization_code",
            "code": code,
            "redirect_uri": "https://c-mobile.xmu.edu.cn/identity-web-login-callback?_h5=true",
            "scope": "openid"
        }

        res_6 = s.post(url_2, data=data, headers=headers).json()
        access_token = res_6['access_token']

        data = {
            "access_token": access_token,
            "org_id": 1
        }

        if s.post(url_3, json=data).status_code == 200:
            return s
        else:
            return None

    except Exception as e:
        print(f"TronClass login failed: {e}")
        return None
'''


def find_core_path() -> Path:
    spec = importlib.util.find_spec("xmulogin.core")
    if spec is None or spec.origin is None:
        raise RuntimeError("Could not find installed xmulogin.core. Install xmulogin first.")
    return Path(spec.origin).resolve()


def replace_login_function(source: str) -> str:
    pattern = re.compile(
        r"def _login_tronclass\(username: str, password: str\) -> Optional\[requests\.Session\]:\n"
        r".*?\n(?=def xmulogin\()",
        re.S,
    )
    patched, count = pattern.subn(LOGIN_FUNCTION + "\n\n", source)
    if count != 1:
        raise RuntimeError("Could not locate exactly one _login_tronclass function to patch.")

    if PATCH_MARKER not in patched:
        patched = patched.replace("\ndef _login_tronclass", HELPERS + "\n\ndef _login_tronclass", 1)
    return patched


def main() -> int:
    core_path = find_core_path()
    source = core_path.read_text(encoding="utf-8")

    if PATCH_MARKER in source and "def _xmu_follow_redirects" in source:
        print(f"xmulogin is already patched: {core_path}")
        return 0

    patched = replace_login_function(source)
    backup_path = core_path.with_suffix(core_path.suffix + ".bak")
    if not backup_path.exists():
        shutil.copy2(core_path, backup_path)

    core_path.write_text(patched, encoding="utf-8")
    print(f"Patched: {core_path}")
    print(f"Backup:  {backup_path}")
    print("Done. Try: xmu refresh && xmu start")
    return 0


if __name__ == "__main__":
    try:
        raise SystemExit(main())
    except Exception as exc:
        print(f"Patch failed: {exc}", file=sys.stderr)
        raise SystemExit(1)
