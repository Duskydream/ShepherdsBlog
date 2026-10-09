// Dependency-free Edge/Chromium smoke tests against the built static site.
// Run: pnpm build:fast && node scripts/test-reading-browser.mjs
import assert from 'node:assert/strict';
import http from 'node:http';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { spawn } from 'node:child_process';

const root = path.resolve('dist');
const browserPath = process.env.BROWSER_PATH ?? 'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe';
const profile = fs.mkdtempSync(path.join(os.tmpdir(), 'hananiwa-browser-'));
const mime = { '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css', '.json': 'application/json', '.svg': 'image/svg+xml', '.woff2': 'font/woff2', '.webp': 'image/webp' };
const server = http.createServer((req, res) => {
  let file = path.resolve(root, '.' + decodeURIComponent(new URL(req.url, 'http://localhost').pathname));
  if (!file.startsWith(root + path.sep) && file !== root) { res.writeHead(403).end(); return; }
  if (fs.existsSync(file) && fs.statSync(file).isDirectory()) file = path.join(file, 'index.html');
  if (!fs.existsSync(file)) { res.writeHead(404).end(); return; }
  res.setHeader('Content-Type', mime[path.extname(file)] ?? 'application/octet-stream');
  fs.createReadStream(file).pipe(res);
});
await new Promise(resolve => server.listen(0, '127.0.0.1', resolve));
const origin = `http://127.0.0.1:${server.address().port}`;
const browser = spawn(browserPath, ['--headless=new', '--disable-gpu', '--no-first-run', '--remote-debugging-port=0', `--user-data-dir=${profile}`, 'about:blank'], { stdio: 'ignore' });
let socket;
const errors = [];
const pause = ms => new Promise(resolve => setTimeout(resolve, ms));
try {
  let port;
  for (let i = 0; i < 100; i++) {
    const activePort = path.join(profile, 'DevToolsActivePort');
    if (fs.existsSync(activePort)) { port = fs.readFileSync(activePort, 'utf8').split('\n')[0]; break; }
    await pause(100);
  }
  assert.ok(port, 'browser started');
  const tabs = await (await fetch(`http://127.0.0.1:${port}/json/list`)).json();
  socket = new WebSocket(tabs.find(tab => tab.type === 'page').webSocketDebuggerUrl);
  await new Promise((resolve, reject) => { socket.addEventListener('open', resolve, { once: true }); socket.addEventListener('error', reject, { once: true }); });
  let id = 0;
  const pending = new Map();
  socket.addEventListener('message', event => {
    const message = JSON.parse(event.data);
    if (message.method === 'Runtime.exceptionThrown') errors.push(message.params.exceptionDetails.exception?.description ?? message.params.exceptionDetails.text);
    const task = pending.get(message.id);
    if (task) { pending.delete(message.id); message.error ? task.reject(new Error(JSON.stringify(message.error))) : task.resolve(message.result); }
  });
  function command(method, params = {}) {
    return new Promise((resolve, reject) => {
      const key = ++id;
      const timer = setTimeout(() => { pending.delete(key); reject(new Error(`CDP timeout: ${method}`)); }, 15000);
      pending.set(key, { resolve: value => { clearTimeout(timer); resolve(value); }, reject: error => { clearTimeout(timer); reject(error); } });
      socket.send(JSON.stringify({ id: key, method, params }));
    });
  }
  async function evaluate(expression) {
    const response = await command('Runtime.evaluate', { expression, returnByValue: true, awaitPromise: true });
    if (response.exceptionDetails) throw new Error(response.exceptionDetails.exception?.description ?? response.exceptionDetails.text);
    return response.result.value;
  }
  async function waitFor(expression) {
    for (let i = 0; i < 100; i++) { if (await evaluate(expression)) return; await pause(50); }
    throw new Error(`Timed out: ${expression}`);
  }
  async function navigate(route) {
    await command('Page.navigate', { url: origin + route });
    await waitFor(`location.pathname === ${JSON.stringify(route.split('#')[0])} && document.readyState === 'complete'`);
    await pause(300);
  }
  async function viewport(width, height = 900) {
    await command('Emulation.setDeviceMetricsOverride', { width, height, deviceScaleFactor: 1, mobile: false });
    await pause(150);
  }
  await command('Emulation.setFocusEmulationEnabled', { enabled: true });
  await command('Runtime.enable');
  await command('Page.enable');
  await command('Page.bringToFront');
  await command('Network.enable');
  await command('Network.setBlockedURLs', { urls: ['https://*'] });

  for (const width of [320, 390, 768]) {
    await viewport(width);
    await navigate('/');
    const result = await evaluate(`(() => {
      const row = document.querySelector('.home-fragment-row:nth-child(3)');
      const title = row.querySelector('.home-fragment-title');
      const meta = row.querySelector('.home-fragment-meta');
      return { overflow: document.documentElement.scrollWidth > innerWidth,
        below: meta.getBoundingClientRect().top >= title.getBoundingClientRect().bottom,
        clamp: getComputedStyle(title).webkitLineClamp,
        progressHidden: document.querySelector('.reading-progress').hidden };
    })()`);
    assert.equal(result.overflow, false, `home overflow at ${width}`);
    assert.equal(result.below, true, `metadata below title at ${width}`);
    assert.equal(result.clamp, '2');
    assert.equal(result.progressHidden, true);
  }
  console.log('PASS mobile titles/metadata: 320, 390, 768px');

  for (const width of [390, 800, 1024, 1151, 1152, 1440]) {
    await viewport(width);
    await navigate('/blog/second-person/');
    const result = await evaluate(`(() => {
      const mobile = document.querySelector('mobile-starlight-toc');
      const desktop = document.querySelector('.right-sidebar-container');
      const top = document.querySelector('.sl-markdown-content').getBoundingClientRect().top;
      const summary = document.querySelector('.mobile-toc-summary');
      return { mobile: !!mobile.getClientRects().length, desktop: !!desktop.getClientRects().length,
        clear: top > (summary.getClientRects().length ? summary.getBoundingClientRect().bottom : document.querySelector('.page > header').getBoundingClientRect().bottom) };
    })()`);
    assert.equal(result.mobile, width < 1152, `mobile TOC ${width}`);
    assert.equal(result.desktop, width >= 1152, `desktop TOC ${width}`);
    assert.equal(result.clear, true, `content below bars ${width}`);
  }
  console.log('PASS TOC breakpoints: 390, 800, 1024, 1151, 1152, 1440px');

  await viewport(390);
  await navigate('/blog/second-person/');
  await evaluate(`document.getElementById('starlight__drawer-toggle').click()`);
  await waitFor(`document.activeElement.id === 'starlight__sidebar'`);
  assert.equal(await evaluate(`document.querySelector('.main-frame').inert && document.getElementById('starlight__drawer-toggle').getAttribute('aria-expanded') === 'true'`), true);
  await command('Input.dispatchKeyEvent', { type: 'keyDown', key: 'Tab', code: 'Tab', modifiers: 8 });
  const trapped = await evaluate(`(() => { const e = document.activeElement; return !!e.closest('#starlight__sidebar') && !!e.getClientRects().length; })()`);
  assert.equal(trapped, true, 'Shift+Tab wraps to a visible drawer control');
  await command('Input.dispatchKeyEvent', { type: 'keyDown', key: 'Escape', code: 'Escape' });
  assert.equal(await evaluate(`document.activeElement.id === 'starlight__drawer-toggle' && !document.querySelector('.main-frame').inert && document.getElementById('starlight__sidebar').inert`), true);
  console.log('PASS drawer focus, trap, Escape, inert restoration');

  // Place a heading between the broken parseFloat offset (~14px) and actual bars (~111px).
  const expected = await evaluate(`(() => {
    const heading = document.querySelectorAll('.sl-markdown-content h2[id], .sl-markdown-content h3[id]')[2];
    const offset = document.querySelector('.mobile-toc-summary').getBoundingClientRect().bottom + 8;
    scrollTo(0, heading.getBoundingClientRect().top + scrollY - offset + 4);
    return heading.id;
  })()`);
  await pause(200);
  assert.equal(await evaluate(`decodeURIComponent(document.querySelector('.mobile-toc-panel a[aria-current]').hash.slice(1))`), expected);
  await evaluate(`(() => { const a = document.querySelector('.sl-markdown-content'); scrollTo(0, a.getBoundingClientRect().bottom + scrollY - innerHeight); })()`);
  await pause(200);
  assert.ok(await evaluate(`Number(document.querySelector('.reading-progress').style.transform.slice(7, -1)) > 0.99`));
  console.log('PASS real-height current chapter and progress ends before footer');

  await evaluate(`(() => { const a = document.querySelector('.sl-markdown-content'); scrollTo(0, a.getBoundingClientRect().top + scrollY + a.offsetHeight * 0.4); })()`);
  await pause(1800);
  const saved = await evaluate(`JSON.parse(localStorage.getItem('hananiwa:reading:v1'))[0]`);
  assert.ok(saved.ratio > 0.3 && saved.ratio < 0.6);
  await navigate('/');
  await navigate('/blog/second-person/');
  assert.equal(await evaluate(`!!document.querySelector('.reading-resume') && scrollY < 100`), true);
  await evaluate(`document.querySelector('.reading-resume button').click()`);
  await pause(200);
  const resumedRatio = await evaluate(`Number(document.querySelector('.reading-progress').style.transform.slice(7, -1))`);
  assert.ok(await evaluate(`scrollY > 1000 && !document.querySelector('.reading-resume')`));
  assert.ok(Math.abs(resumedRatio - saved.ratio) < 0.02, 'resume restores position within 2%');
  await navigate('/blog/second-person/#_top');
  assert.equal(await evaluate(`!!document.querySelector('.reading-resume')`), false, 'fragment links suppress resume notice');
  console.log('PASS bookmark saved locally, explicit resume, fragment precedence');

  // Exercise Astro view transitions, not only full page navigations.
  for (let i = 0; i < 3; i++) {
    await evaluate(`window.testPageReady = false; document.addEventListener('astro:page-load', () => { window.testPageReady = true; }, { once: true }); document.querySelector('.site-title-wrapper a').click()`);
    await waitFor(`window.testPageReady && location.pathname === '/' && document.querySelector('.reading-progress').hidden`);
    await evaluate(`window.testPageReady = false; document.addEventListener('astro:page-load', () => { window.testPageReady = true; }, { once: true }); document.querySelector('.home-fragment-row[href="/blog/second-person"]').click()`);
    await waitFor(`window.testPageReady && location.pathname.replace(/\\/+$/, '') === '/blog/second-person' && !document.querySelector('.reading-progress').hidden`);
    await evaluate(`document.getElementById('starlight__drawer-toggle').click()`);
    await waitFor(`document.body.hasAttribute('data-drawer-open') && document.activeElement.id === 'starlight__sidebar'`);
    await command('Input.dispatchKeyEvent', { type: 'keyDown', key: 'Escape', code: 'Escape' });
    assert.equal(await evaluate(`!document.body.hasAttribute('data-drawer-open')`), true);
  }
  console.log('PASS repeated Astro navigation retains single working drawer/reading bindings');

  await command('Emulation.setEmulatedMedia', { features: [{ name: 'prefers-reduced-motion', value: 'reduce' }] });
  await evaluate(`document.getElementById('starlight__drawer-toggle').click()`);
  await waitFor(`document.activeElement.id === 'starlight__sidebar'`);
  await command('Input.dispatchKeyEvent', { type: 'keyDown', key: 'Escape', code: 'Escape' });
  console.log('PASS reduced-motion drawer focus');

  // Storage errors must never disable reading or navigation.
  await evaluate(`Storage.prototype.setItem = () => { throw new Error('storage blocked'); }; scrollTo(0, 2000);`);
  await pause(1800);
  assert.deepEqual(errors, [], 'no browser runtime exceptions');
  console.log('PASS storage failure tolerated; no browser runtime exceptions');
} finally {
  socket?.close();
  browser.kill();
  await new Promise(resolve => server.close(resolve));
  await pause(300);
  fs.rmSync(profile, { recursive: true, force: true, maxRetries: 10, retryDelay: 100 });
}
