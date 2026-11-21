// 藤蔓元算法：测量列表条目位置，生成「藤茎 + 节点花 + 节间叶」的 SVG 覆盖层。
// 用法：给容器加 data-floral-vine（可选 JSON：{items, current, vineX, meander}），
// 调用 bindFloralVines() 或 refreshFloralVine(el)。容器需 position: relative。

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

// 节点花：5 片花瓣绕中心 + 实心花心，半径 11（与藤茎同量级）
const FLOWER =
  "M 0 0 C -3.74 2.3 -7.92 2.3 -11 0 C -7.92 -2.3 -3.74 -2.3 0 0 Z " +
  "M 0 0 C -3.34 -2.85 -4.63 -6.82 -3.4 -10.46 C -0.26 -8.24 1.03 -4.27 0 0 Z " +
  "M 0 0 C 1.67 -4.06 5.06 -6.52 8.9 -6.47 C 7.76 -2.79 4.38 -0.34 0 0 Z " +
  "M 0 0 C 4.38 0.34 7.76 2.79 8.9 6.47 C 5.06 6.52 1.67 4.06 0 0 Z " +
  "M 0 0 C 1.03 4.27 -0.26 8.24 -3.4 10.46 C -4.63 6.82 -3.34 2.85 0 0 Z " +
  "M 2.05 0 A 2.05 2.05 0 1 0 -2.05 0 A 2.05 2.05 0 1 0 2.05 0 Z";
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

function applySyncCurrent(
  svg: Element,
  items: HTMLElement[],
  opts: FloralVineOptions
) {
  const stars = svg.querySelectorAll(".fv-star");
  if (stars.length !== items.length) return false;
  items.forEach((el, i) => {
    const star = stars[i] as SVGPathElement;
    const isCurrent = Boolean(opts.current && el.querySelector(opts.current));
    star.classList.toggle("fv-current", isCurrent);
    star.style.setProperty("--s", isCurrent ? "0.5" : "0.32");
  });
  return true;
}

// 滚动跟随等场景只移动「当前」星，避免在节点数一致时触发 offsetHeight/offsetParent 强制布局读取
export function syncCurrent(container: HTMLElement) {
  const opts = readOptions(container);
  const svg = container.querySelector(":scope > svg.floral-vine-svg");
  if (svg) {
    const allItems = Array.from(
      container.querySelectorAll<HTMLElement>(opts.items)
    );
    if (applySyncCurrent(svg, allItems, opts)) return;
    const visItems = visibleItems(container, opts);
    if (applySyncCurrent(svg, visItems, opts)) return;
  }
  renderFloralVine(container);
}

type VinePlan =
  | { type: "clear"; existingSvg: SVGSVGElement | null }
  | {
      type: "sync";
      existingSvg: SVGSVGElement;
      items: HTMLElement[];
      opts: FloralVineOptions;
    }
  | {
      type: "replace";
      container: HTMLElement;
      existingSvg: SVGSVGElement | null;
      html: string;
    };

/**
 * 纯读取阶段：测量容器与条目几何坐标，不触发任何 DOM 写操作。
 * 若几何签名未变且非强制重播，则仅同步当前激活节点，避免打断首屏画线动画。
 */
function measureFloralVine(container: HTMLElement, force = false): VinePlan {
  const opts = readOptions(container);
  const existingSvg = container.querySelector<SVGSVGElement>(
    ":scope > svg.floral-vine-svg"
  );

  if (!container.offsetWidth && !container.offsetHeight) {
    return { type: "clear", existingSvg };
  }

  const items = visibleItems(container, opts);
  if (!items.length) {
    return { type: "clear", existingSvg };
  }

  const anchors = items.map((el, i) => ({
    x: opts.vineX + Math.sin(i * 2.1) * opts.meander,
    y: relTop(el, container) + Math.min(el.offsetHeight / 2, 18),
  }));

  const lastItem = items[items.length - 1];
  const contentHeight = relTop(lastItem, container) + lastItem.offsetHeight;
  const height = Math.max(container.clientHeight, contentHeight);
  const geomKey = `${height}:${anchors.map((a) => `${a.x.toFixed(1)},${a.y.toFixed(1)}`).join(";")}`;

  if (!force && existingSvg && existingSvg.dataset.fvGeom === geomKey) {
    return { type: "sync", existingSvg, items, opts };
  }

  const width = 44;
  const gid = `fv-grad-${uid++}`;

  const pts = [
    { x: opts.vineX, y: Math.max(anchors[0].y - 14, 2) },
    ...anchors,
    {
      x: opts.vineX,
      // Keep the stem alive through the whole TOC container.
      y: Math.max(anchors[anchors.length - 1].y + 16, height - 2),
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
    const isCurrent = Boolean(opts.current && items[i].querySelector(opts.current));
    const capped = Math.min(i, 8);
    const delay = (0.12 + capped * 0.035).toFixed(2);
    deco += `<g transform="translate(${p.x.toFixed(1)} ${p.y.toFixed(1)})">
      <path class="fv-star${isCurrent ? " fv-current" : ""}"
        style="--s:${isCurrent ? 0.5 : 0.32};animation-delay:${delay}s"
        d="${FLOWER}" fill="url(#${gid})" /></g>`;
    if (i < anchors.length - 1) {
      const ny = ((anchors[i].y + anchors[i + 1].y) / 2).toFixed(1);
      const side = i % 2 === 0 ? 1 : -1;
      deco += `<path class="fv-draw" style="animation-delay:${(0.18 + capped * 0.035).toFixed(2)}s"
        transform="translate(${opts.vineX} ${ny}) scale(${(0.3 * side).toFixed(2)} 0.3)"
        d="${LEAF}" stroke="url(#${gid})" stroke-width="3" stroke-linecap="round"
        fill="url(#${gid})" fill-opacity="0.08" />`;
    }
  });

  const html = `<svg class="floral-vine-svg" data-fv-geom="${geomKey}" width="${width}" height="${height}"
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
    </svg>`;

  return { type: "replace", container, existingSvg, html };
}

function applyVinePlan(plan: VinePlan) {
  if (plan.type === "clear") {
    plan.existingSvg?.remove();
  } else if (plan.type === "sync") {
    applySyncCurrent(plan.existingSvg, plan.items, plan.opts);
  } else {
    plan.existingSvg?.remove();
    plan.container.insertAdjacentHTML("afterbegin", plan.html);
  }
}

export function renderFloralVine(container: HTMLElement, force = false) {
  applyVinePlan(measureFloralVine(container, force));
}

export function renderFloralVineBatch(
  containers: Iterable<HTMLElement>,
  force = false
) {
  const list = Array.from(containers);
  const plans = list.map((container) => measureFloralVine(container, force));
  plans.forEach(applyVinePlan);
}

const containerCleanups = new Map<HTMLElement, () => void>();
const pendingRedraws = new Map<HTMLElement, boolean>();
const pendingSyncs = new Set<HTMLElement>();
let queueFrame = 0;

function flushQueue() {
  queueFrame = 0;
  const syncList = Array.from(pendingSyncs).filter(
    (el) => el.isConnected && !pendingRedraws.has(el)
  );
  pendingSyncs.clear();

  const normalList: HTMLElement[] = [];
  const forceList: HTMLElement[] = [];
  pendingRedraws.forEach((force, el) => {
    if (!el.isConnected) return;
    if (force) forceList.push(el);
    else normalList.push(el);
  });
  pendingRedraws.clear();

  syncList.forEach(syncCurrent);
  if (normalList.length) renderFloralVineBatch(normalList, false);
  if (forceList.length) renderFloralVineBatch(forceList, true);
}

function scheduleQueue() {
  if (queueFrame) return;
  queueFrame = requestAnimationFrame(flushQueue);
}

function scheduleContainerRedraw(container: HTMLElement, force = false) {
  pendingRedraws.set(container, Boolean(pendingRedraws.get(container) || force));
  scheduleQueue();
}

function scheduleContainerSync(container: HTMLElement) {
  if (!pendingRedraws.has(container)) {
    pendingSyncs.add(container);
    scheduleQueue();
  }
}

function clearQueue() {
  if (queueFrame) cancelAnimationFrame(queueFrame);
  queueFrame = 0;
  pendingRedraws.clear();
  pendingSyncs.clear();
}

function clearContainerObservers() {
  containerCleanups.forEach((cleanup) => cleanup());
  containerCleanups.clear();
}

// 忽略生成器自身重插 SVG 引起的变更，避免重画死循环
function isSvgChurn(m: MutationRecord) {
  return [...m.addedNodes, ...m.removedNodes].some(
    (n) =>
      n instanceof Element &&
      (n.matches("svg.floral-vine-svg") ||
        n.closest("svg.floral-vine-svg") !== null)
  );
}

function observeContainer(container: HTMLElement) {
  if (containerCleanups.has(container)) return;
  let resizeTimer = 0;
  let resizeObserver: ResizeObserver | undefined;

  if (typeof ResizeObserver !== "undefined") {
    resizeObserver = new ResizeObserver(() => {
      window.clearTimeout(resizeTimer);
      resizeTimer = window.setTimeout(
        () => scheduleContainerRedraw(container, false),
        80
      );
    });
    resizeObserver.observe(container);
  }

  const mutationObserver = new MutationObserver((mutations) => {
    if (mutations.every(isSvgChurn)) return;
    if (
      mutations.every(
        (m) => m.type === "attributes" && m.attributeName === "aria-current"
      )
    ) {
      scheduleContainerSync(container);
      return;
    }
    scheduleContainerRedraw(container, false);
  });
  mutationObserver.observe(container, {
    childList: true,
    subtree: true,
    attributes: true,
    attributeFilter: ["hidden", "aria-expanded", "aria-current"],
  });
  containerCleanups.set(container, () => {
    resizeObserver?.disconnect();
    mutationObserver.disconnect();
    window.clearTimeout(resizeTimer);
  });
}

/**
 * 局部刷新指定容器（或全页已挂载容器）的藤蔓，不重建 document.body 观察器。
 */
export function refreshFloralVine(
  container?: HTMLElement | null,
  force = false
) {
  if (container) {
    observeContainer(container);
    scheduleContainerRedraw(container, force);
    return;
  }
  document
    .querySelectorAll<HTMLElement>("[data-floral-vine]")
    .forEach((el) => {
      observeContainer(el);
      scheduleContainerRedraw(el, force);
    });
}

export function bindFloralVines() {
  const w = window as unknown as {
    __fvBound?: boolean;
    __fvObserver?: MutationObserver;
    __fvObservedBody?: HTMLElement;
    bindFloralVines?: typeof bindFloralVines;
    refreshFloralVine?: typeof refreshFloralVine;
  };
  w.bindFloralVines = bindFloralVines;
  w.refreshFloralVine = refreshFloralVine;

  containerCleanups.forEach((cleanup, container) => {
    if (!container.isConnected) {
      cleanup();
      containerCleanups.delete(container);
    }
  });
  refreshFloralVine(undefined, false);

  if (!w.__fvBound) {
    w.__fvBound = true;
    window.addEventListener("load", () => refreshFloralVine(undefined, false));
    document.addEventListener("astro:before-swap", () => {
      clearQueue();
      clearContainerObservers();
      w.__fvObserver?.disconnect();
      w.__fvObserver = undefined;
      w.__fvObservedBody = undefined;
    });

    let resizeTimer = 0;
    window.addEventListener("resize", () => {
      window.clearTimeout(resizeTimer);
      resizeTimer = window.setTimeout(
        () => refreshFloralVine(undefined, false),
        120
      );
    });

    document.addEventListener(
      "toggle",
      (event) => {
        const details = event.target;
        if (!(details instanceof HTMLDetailsElement) || !details.open) return;
        details
          .querySelectorAll<HTMLElement>("[data-floral-vine]")
          .forEach((el) => scheduleContainerRedraw(el, true));
      },
      true
    );
  }

  // body 在视图过渡时会被替换；仅在 body 实例变化时重挂观察器
  if (w.__fvObservedBody !== document.body) {
    w.__fvObserver?.disconnect();
    const observer = new MutationObserver((mutations) => {
      if (
        mutations.some((m) => m.attributeName === "data-drawer-open") &&
        document.body.hasAttribute("data-drawer-open")
      ) {
        const drawer = document.getElementById("starlight__sidebar");
        if (drawer) {
          drawer
            .querySelectorAll<HTMLElement>("[data-floral-vine]")
            .forEach((el) => scheduleContainerRedraw(el, true));
        }
      }
    });
    observer.observe(document.body, {
      attributes: true,
      attributeFilter: ["data-drawer-open"],
    });
    w.__fvObserver = observer;
    w.__fvObservedBody = document.body;
  }
}

if (typeof window !== "undefined") {
  const w = window as unknown as {
    bindFloralVines?: typeof bindFloralVines;
    refreshFloralVine?: typeof refreshFloralVine;
  };
  w.bindFloralVines = bindFloralVines;
  w.refreshFloralVine = refreshFloralVine;
}
