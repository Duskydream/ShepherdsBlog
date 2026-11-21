let dispose: (() => void) | undefined;
let navigating = false;
let keepOpen = false;

const DRAWER_LILY_SVG = `<svg viewBox="0 0 420 420" fill="none" xmlns="http://www.w3.org/2000/svg" class="lily-ornament" aria-hidden="true">
  <defs>
    <linearGradient id="drawer-lily-grad" x1="60" y1="420" x2="360" y2="40" gradientUnits="userSpaceOnUse">
      <stop offset="0" style="stop-color: var(--sl-color-accent)" stop-opacity="0.18" />
      <stop offset="0.55" style="stop-color: var(--sl-color-accent)" stop-opacity="0.85" />
      <stop offset="1" style="stop-color: var(--sl-color-accent-high)" />
    </linearGradient>
  </defs>
  <path class="draw" style="animation-delay:.1s" d="M 26 152 A 165 165 0 0 1 214 24" stroke="url(#drawer-lily-grad)" stroke-width="1.5" stroke-linecap="round" pathLength="1" opacity="0.55" />
  <path class="draw" d="M 434 438 C 352 382 272 312 212 232 C 194 208 182 186 176 166" stroke="url(#drawer-lily-grad)" stroke-width="2.4" stroke-linecap="round" pathLength="1" />
  <path class="draw" style="animation-delay:.45s" d="M 315 344 C 340 328 366 322 388 324 C 366 340 338 346 315 344 Z" stroke="url(#drawer-lily-grad)" stroke-width="1.8" stroke-linecap="round" pathLength="1" />
  <path class="draw" style="animation-delay:.6s" d="M 260 290 C 234 278 208 277 186 286 C 210 298 238 299 260 290 Z" stroke="url(#drawer-lily-grad)" stroke-width="1.8" stroke-linecap="round" pathLength="1" />
  <path class="draw" style="animation-delay:.55s" d="M 287 317 C 300 292 310 272 316 250" stroke="url(#drawer-lily-grad)" stroke-width="1.8" stroke-linecap="round" pathLength="1" />
  <path class="draw" style="animation-delay:.85s" d="M 316 250 C 310 234 314 219 327 208 C 332 223 328 238 316 250 Z" stroke="url(#drawer-lily-grad)" stroke-width="1.8" stroke-linecap="round" pathLength="1" fill="url(#drawer-lily-grad)" fill-opacity="0.06" />
  <g transform="translate(176 166) rotate(-24)">
    <path class="draw" style="animation-delay:.7s" d="M -7 -30 C -4 -20 -2 -10 0 0" stroke="url(#drawer-lily-grad)" stroke-width="2.1" stroke-linecap="round" pathLength="1" />
    <path class="draw" style="animation-delay:.7s" d="M 7 -30 C 4 -20 2 -10 0 0" stroke="url(#drawer-lily-grad)" stroke-width="2.1" stroke-linecap="round" pathLength="1" />
    <path class="draw" style="animation-delay:.85s" d="M -6 -30 C -14 -62 -28 -74 -45 -76 C -51 -77 -52 -70 -47 -69 C -34 -52 -20 -38 -6 -30" stroke="url(#drawer-lily-grad)" stroke-width="2" stroke-linecap="round" pathLength="1" />
    <path class="draw" style="animation-delay:.97s" d="M -4 -31 C -20 -58 -28 -80 -27 -97 C -29 -103 -22 -105 -20 -100 C -6 -78 0 -54 -1 -32" stroke="url(#drawer-lily-grad)" stroke-width="2" stroke-linecap="round" pathLength="1" />
    <path class="draw" style="animation-delay:1.09s" d="M -1 -32 C -12 -66 -16 -92 -12 -110 C -13 -116 -6 -118 -5 -112 C 2 -90 6 -62 2 -32" stroke="url(#drawer-lily-grad)" stroke-width="2" stroke-linecap="round" pathLength="1" />
    <path class="draw" style="animation-delay:1.21s" d="M 3 -31 C 19 -58 27 -80 26 -97 C 28 -103 21 -105 19 -100 C 5 -78 -1 -54 0 -32" stroke="url(#drawer-lily-grad)" stroke-width="2" stroke-linecap="round" pathLength="1" />
    <path class="draw" style="animation-delay:1.33s" d="M 6 -30 C 14 -62 28 -74 45 -76 C 51 -77 52 -70 47 -69 C 34 -52 20 -38 6 -30" stroke="url(#drawer-lily-grad)" stroke-width="2" stroke-linecap="round" pathLength="1" />
    <path class="draw" style="animation-delay:1.5s" d="M -2 -32 C -6 -60 -12 -84 -22 -104" stroke="url(#drawer-lily-grad)" stroke-width="1.4" stroke-linecap="round" pathLength="1" />
    <path class="fade" style="animation-delay:2s" d="M -22 -104 L -28 -114" stroke="url(#drawer-lily-grad)" stroke-width="3.6" stroke-linecap="round" />
    <path class="draw" style="animation-delay:1.62s" d="M 2 -32 C 4 -64 8 -92 14 -112" stroke="url(#drawer-lily-grad)" stroke-width="1.4" stroke-linecap="round" pathLength="1" />
    <path class="fade" style="animation-delay:2.12s" d="M 14 -112 L 18 -124" stroke="url(#drawer-lily-grad)" stroke-width="3.6" stroke-linecap="round" />
    <path class="draw" style="animation-delay:1.74s" d="M 4 -30 C 10 -56 18 -78 30 -94" stroke="url(#drawer-lily-grad)" stroke-width="1.4" stroke-linecap="round" pathLength="1" />
    <path class="fade" style="animation-delay:2.24s" d="M 30 -94 L 36 -102" stroke="url(#drawer-lily-grad)" stroke-width="3.6" stroke-linecap="round" />
  </g>
  <path class="sparkle" transform="translate(84 72)" d="M 0 -12 C 1.6 -4 4 -1.6 12 0 C 4 1.6 1.6 4 0 12 C -1.6 4 -4 1.6 -12 0 C -4 -1.6 -1.6 -4 0 -12 Z" fill="url(#drawer-lily-grad)" />
  <path class="sparkle" style="animation-delay:1.1s" transform="translate(322 96) scale(0.55)" d="M 0 -12 C 1.6 -4 4 -1.6 12 0 C 4 1.6 1.6 4 0 12 C -1.6 4 -4 1.6 -12 0 C -4 -1.6 -1.6 -4 0 -12 Z" fill="url(#drawer-lily-grad)" />
  <path class="sparkle" style="animation-delay:2s" transform="translate(52 208) scale(0.45)" d="M 0 -12 C 1.6 -4 4 -1.6 12 0 C 4 1.6 1.6 4 0 12 C -1.6 4 -4 1.6 -12 0 C -4 -1.6 -1.6 -4 0 -12 Z" fill="url(#drawer-lily-grad)" />
  <path class="sparkle" style="animation-delay:.6s" transform="translate(238 44) scale(0.35)" d="M 0 -12 C 1.6 -4 4 -1.6 12 0 C 4 1.6 1.6 4 0 12 C -1.6 4 -4 1.6 -12 0 C -4 -1.6 -1.6 -4 0 -12 Z" fill="url(#drawer-lily-grad)" />
</svg>`;

function ensureDrawerLily(pane: HTMLElement) {
  const host = pane.querySelector<HTMLElement>("[data-drawer-lily]");
  if (!host || host.firstElementChild) return;
  host.innerHTML = DRAWER_LILY_SVG;
}

export function initDrawer() {
  dispose?.();
  const pane = document.getElementById("starlight__sidebar");
  const toggle = document.getElementById("starlight__drawer-toggle");
  if (!pane || !toggle) return;
  const controller = new AbortController();
  const { signal } = controller;
  let returnFocus: HTMLElement | null = toggle;
  // Only inert siblings outside the drawer; never inert an ancestor of the dialog.
  const background = [
    ...document.querySelectorAll<HTMLElement>(".page > header, .page > mobile-starlight-toc, .main-frame, body > a"),
  ];
  const previousInert = new Map(background.map((element) => [element, element.inert]));
  const restoreBackground = () => {
    previousInert.forEach((inert, element) => { element.inert = inert; });
  };
  const focusables = () => [...pane.querySelectorAll<HTMLElement>(
    'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), summary, [tabindex]:not([tabindex="-1"])',
  )].filter((element) => element.tabIndex >= 0 && !element.closest('[inert], [hidden]') &&
    element.getClientRects().length > 0 && getComputedStyle(element).visibility !== "hidden");

  function open() {
    if (document.body.hasAttribute("data-drawer-open")) return;
    ensureDrawerLily(pane!);
    returnFocus = document.activeElement instanceof HTMLElement && document.activeElement !== document.body ? document.activeElement : toggle;
    document.body.setAttribute("data-drawer-open", "true");
    pane!.style.visibility = "visible";
    pane!.inert = false;
    pane!.removeAttribute("aria-hidden");
    toggle!.setAttribute("aria-expanded", "true");
    toggle!.setAttribute("aria-label", "关闭目录");
    toggle!.setAttribute("title", "关闭目录 (Catalog)");
    // Focus the labelled dialog itself, independent of descendant visibility transitions.
    pane!.focus({ preventScroll: true });
    background.forEach((element) => { element.inert = true; });
  }

  function close(restoreFocus = true) {
    const wasOpen = document.body.hasAttribute("data-drawer-open");
    document.body.removeAttribute("data-drawer-open");
    restoreBackground();
    toggle!.setAttribute("aria-expanded", "false");
    toggle!.setAttribute("aria-label", "打开目录");
    toggle!.setAttribute("title", "打开目录 (Catalog)");
    if (wasOpen && restoreFocus) {
      (returnFocus?.isConnected ? returnFocus : toggle!)?.focus({ preventScroll: true });
    }
    pane!.inert = true;
    pane!.style.removeProperty("visibility");
    pane!.setAttribute("aria-hidden", "true");
  }

  close(false);
  document.addEventListener("click", (event) => {
    if (!(event.target instanceof Element)) return;
    if (event.target.closest("#starlight__drawer-toggle")) {
      event.preventDefault();
      if (document.body.hasAttribute("data-drawer-open")) close();
      else open();
      if (navigating) keepOpen = document.body.hasAttribute("data-drawer-open");
    } else if (event.target.closest(".drawer-scrim, .drawer-close-btn, #starlight__sidebar a")) {
      keepOpen = false;
      close();
    }
  }, { signal });
  document.addEventListener("keydown", (event) => {
    if (!document.body.hasAttribute("data-drawer-open")) return;
    if (event.key === "Escape") {
      event.preventDefault();
      keepOpen = false;
      close();
    } else if (event.key === "Tab") {
      const items = focusables();
      const first = items[0] ?? pane!;
      const last = items.at(-1) ?? pane!;
      if (!items.length || document.activeElement === pane || !pane!.contains(document.activeElement) ||
          (event.shiftKey && document.activeElement === first) ||
          (!event.shiftKey && document.activeElement === last)) {
        event.preventDefault();
        (event.shiftKey ? last : first).focus();
      }
    }
  }, { signal });
  document.addEventListener("focusin", (event) => {
    if (document.body.hasAttribute("data-drawer-open") && event.target instanceof Node && !pane.contains(event.target)) {
      (focusables()[0] ?? pane).focus({ preventScroll: true });
    }
  }, { signal });
  dispose = () => { controller.abort(); close(false); };
  navigating = false;
  if (keepOpen) { keepOpen = false; open(); }
}

document.addEventListener("astro:before-preparation", () => { navigating = true; });
document.addEventListener("astro:before-swap", () => { dispose?.(); });
