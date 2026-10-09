let dispose: (() => void) | undefined;
let navigating = false;
let keepOpen = false;

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
