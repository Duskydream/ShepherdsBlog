// 藤蔓元算法：测量列表条目位置，生成「藤茎 + 节点花 + 节间叶」的 SVG 覆盖层。
// 用法：给容器加 data-floral-vine（可选 JSON：{items, current, vineX, meander}），
// 调用 bindFloralVines()。容器需 position: relative；展开/resize 自动重画并重播动画。

export interface FloralVineOptions {
  items: string;
  current: string;
  vineX: number;
  meander: number;
}

const DEFAULTS: FloralVineOptions = {
  items: ":scope > li",
  current: "a[aria-current]",
  vineX: 8,
  meander: 2.5,
};

const SPARK =
  "M 0 -12 C 1.6 -4 4 -1.6 12 0 C 4 1.6 1.6 4 0 12 C -1.6 4 -4 1.6 -12 0 C -4 -1.6 -1.6 -4 0 -12 Z";
const LEAF = "M 0 0 C 14 -9 30 -11 42 -9 C 30 0 14 3 0 0 Z";

let uid = 0;

// 嵌套条目可能挂在 position:relative 的祖先 li 下，需沿 offsetParent 链累加
function relTop(el: HTMLElement, container: HTMLElement): number {
  let y = 0;
  let node: HTMLElement | null = el;
  while (node && node !== container) {
    y += node.offsetTop;
    node = node.offsetParent as HTMLElement | null;
  }
  return y;
}

function readOptions(el: HTMLElement): FloralVineOptions {
  const raw = el.getAttribute("data-floral-vine");
  if (!raw) return DEFAULTS;
  try {
    return { ...DEFAULTS, ...JSON.parse(raw) };
  } catch {
    return DEFAULTS;
  }
}

function visibleItems(container: HTMLElement, opts: FloralVineOptions) {
  return Array.from(
    container.querySelectorAll<HTMLElement>(opts.items)
  ).filter((el) => el.offsetParent !== null && el.offsetHeight > 0);
}

// 滚动跟随等场景只移动「当前」星，不重画整条藤（避免重播画线动画）
export function syncCurrent(container: HTMLElement) {
  const opts = readOptions(container);
  const svg = container.querySelector(":scope > svg.floral-vine-svg");
  const items = visibleItems(container, opts);
  const stars = svg?.querySelectorAll(".fv-star");
  if (!svg || !stars || stars.length !== items.length) {
    renderFloralVine(container);
    return;
  }
  items.forEach((el, i) => {
    const star = stars[i] as SVGPathElement;
    const isCurrent = !!el.querySelector(opts.current);
    star.classList.toggle("fv-current", isCurrent);
    star.style.setProperty("--s", isCurrent ? "0.45" : "0.28");
  });
}

export function renderFloralVine(container: HTMLElement) {
  const opts = readOptions(container);
  container.querySelector(":scope > svg.floral-vine-svg")?.remove();

  if (!container.offsetWidth && !container.offsetHeight) return;

  const items = visibleItems(container, opts);
  if (!items.length) return;

  const height = container.scrollHeight;
  const width = 44;
  const gid = `fv-grad-${uid++}`;

  const anchors = items.map((el, i) => ({
    x: opts.vineX + Math.sin(i * 2.1) * opts.meander,
    y: relTop(el, container) + Math.min(el.offsetHeight / 2, 18),
  }));

  const pts = [
    { x: opts.vineX, y: Math.max(anchors[0].y - 14, 2) },
    ...anchors,
    {
      x: opts.vineX,
      y: Math.min(anchors[anchors.length - 1].y + 16, height - 2),
    },
  ];

  let d = `M ${pts[0].x.toFixed(1)} ${pts[0].y.toFixed(1)}`;
  for (let i = 1; i < pts.length - 1; i++) {
    const mx = ((pts[i].x + pts[i + 1].x) / 2).toFixed(1);
    const my = ((pts[i].y + pts[i + 1].y) / 2).toFixed(1);
    d += ` Q ${pts[i].x.toFixed(1)} ${pts[i].y.toFixed(1)} ${mx} ${my}`;
  }
  d += ` L ${pts[pts.length - 1].x.toFixed(1)} ${pts[pts.length - 1].y.toFixed(1)}`;

  let deco = "";
  anchors.forEach((p, i) => {
    const isCurrent = !!items[i].querySelector(opts.current);
    const delay = (0.25 + i * 0.09).toFixed(2);
    deco += `<g transform="translate(${p.x.toFixed(1)} ${p.y.toFixed(1)})">
      <path class="fv-star${isCurrent ? " fv-current" : ""}"
        style="--s:${isCurrent ? 0.45 : 0.28};animation-delay:${delay}s"
        d="${SPARK}" fill="url(#${gid})" /></g>`;
    if (i < anchors.length - 1) {
      const ny = ((anchors[i].y + anchors[i + 1].y) / 2).toFixed(1);
      const side = i % 2 === 0 ? 1 : -1;
      deco += `<path class="fv-draw" style="animation-delay:${(0.35 + i * 0.09).toFixed(2)}s"
        transform="translate(${opts.vineX} ${ny}) scale(${(0.3 * side).toFixed(2)} 0.3)"
        d="${LEAF}" stroke="url(#${gid})" stroke-width="3" stroke-linecap="round"
        fill="url(#${gid})" fill-opacity="0.08" />`;
    }
  });

  container.insertAdjacentHTML(
    "afterbegin",
    `<svg class="floral-vine-svg" width="${width}" height="${height}"
      viewBox="0 0 ${width} ${height}" fill="none" aria-hidden="true">
      <defs>
        <linearGradient id="${gid}" x1="0" y1="${height}" x2="0" y2="0" gradientUnits="userSpaceOnUse">
          <stop offset="0" style="stop-color: var(--sl-color-accent)" stop-opacity="0.2" />
          <stop offset="0.5" style="stop-color: var(--sl-color-accent)" stop-opacity="0.8" />
          <stop offset="1" style="stop-color: var(--sl-color-accent-high)" />
        </linearGradient>
      </defs>
      <path class="fv-draw" d="${d}" stroke="url(#${gid})" stroke-width="1.2"
        stroke-linecap="round" pathLength="1" />
      ${deco}
    </svg>`
  );
}

export function bindFloralVines() {
  const w = window as unknown as {
    __fvBound?: boolean;
    __fvObserver?: MutationObserver;
  };

  const redrawAll = () =>
    document
      .querySelectorAll<HTMLElement>("[data-floral-vine]")
      .forEach(renderFloralVine);

  // 忽略生成器自身重插 SVG 引起的变更，避免重画死循环
  const isSvgChurn = (m: MutationRecord) =>
    [...m.addedNodes, ...m.removedNodes].some(
      (n) =>
        n instanceof Element &&
        (n.matches("svg.floral-vine-svg") ||
          n.closest("svg.floral-vine-svg") !== null)
    );

  const observeContainer = (container: HTMLElement) => {
    if (container.dataset.fvObserved) return;
    container.dataset.fvObserved = "1";
    new MutationObserver((mutations) => {
      if (mutations.every(isSvgChurn)) return;
      if (
        mutations.every(
          (m) => m.type === "attributes" && m.attributeName === "aria-current"
        )
      ) {
        setTimeout(() => syncCurrent(container), 0);
        return;
      }
      setTimeout(() => renderFloralVine(container), 0);
    }).observe(container, {
      childList: true,
      subtree: true,
      attributes: true,
      attributeFilter: ["hidden", "aria-expanded", "aria-current"],
    });
  };

  const bindContainers = () =>
    document
      .querySelectorAll<HTMLElement>("[data-floral-vine]")
      .forEach(observeContainer);

  bindContainers();
  requestAnimationFrame(redrawAll);

  // body 在视图过渡时会被整体替换，观察器需重新挂到新 body 上
  if (!w.__fvBound) {
    w.__fvBound = true;
    window.addEventListener("load", redrawAll);

    let timer: number;
    window.addEventListener("resize", () => {
      window.clearTimeout(timer);
      timer = window.setTimeout(redrawAll, 150);
    });

    document.addEventListener(
      "toggle",
      (event) => {
        const details = event.target;
        if (!(details instanceof HTMLDetailsElement) || !details.open) return;
        setTimeout(() =>
          details
            .querySelectorAll<HTMLElement>("[data-floral-vine]")
            .forEach(renderFloralVine)
        , 0);
      },
      true
    );
  }

  w.__fvObserver?.disconnect();
  const observer = new MutationObserver((mutations) => {
    if (mutations.some((m) => m.attributeName === "data-drawer-open"))
      setTimeout(redrawAll, 0);
  });
  observer.observe(document.body, { attributes: true });
  w.__fvObserver = observer;
}
