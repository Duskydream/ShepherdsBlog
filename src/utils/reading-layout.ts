let cachedOffset: number | null = null;
let listenersBound = false;

export function invalidateReadingOffset() {
  cachedOffset = null;
}

function bindInvalidation() {
  if (listenersBound || typeof window === "undefined") return;
  listenersBound = true;
  window.addEventListener("resize", invalidateReadingOffset, { passive: true });
  document.addEventListener("astro:before-swap", invalidateReadingOffset);
  document.addEventListener("astro:page-load", invalidateReadingOffset);
  document.fonts?.ready.then(invalidateReadingOffset);
}

/**
 * Measure visible fixed bars in CSS pixels (works with rem units and text zoom).
 * Result is cached across scroll frames and invalidated on resize / route changes.
 */
export function getReadingOffset(): number {
  bindInvalidation();
  if (cachedOffset !== null) return cachedOffset;
  let bottom = 0;
  for (const selector of [".page > header", ".mobile-toc-summary"]) {
    const element = document.querySelector<HTMLElement>(selector);
    if (!element || !element.getClientRects().length) continue;
    bottom = Math.max(bottom, element.getBoundingClientRect().bottom);
  }
  cachedOffset = bottom + 8;
  return cachedOffset;
}
