/** Measure visible fixed bars in CSS pixels (works with rem units and text zoom). */
export function getReadingOffset(): number {
  let bottom = 0;
  for (const selector of [".page > header", ".mobile-toc-summary"]) {
    const element = document.querySelector<HTMLElement>(selector);
    if (!element || !element.getClientRects().length) continue;
    bottom = Math.max(bottom, element.getBoundingClientRect().bottom);
  }
  return bottom + 8;
}
