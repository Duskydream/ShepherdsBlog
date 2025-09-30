import { c as createAstro, a as createComponent, h as defineStyleVars, m as maybeRenderHead, d as addAttribute, f as renderSlot, b as renderTemplate } from './astro/server_BSSrx8qw.mjs';
/* empty css                          */

const $$Astro = createAstro("https://duskydream.icu");
const $$CardGroup = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$CardGroup;
  const {
    class: className = "",
    cols = "2"
    // Default 2 columns
  } = Astro2.props;
  const $$definedVars = defineStyleVars([{ cols }]);
  return renderTemplate`${maybeRenderHead()}<div${addAttribute(`card-group ${className}`, "class")} data-astro-cid-v7qmzqza${addAttribute($$definedVars, "style")}> ${renderSlot($$result, $$slots["default"])} </div> `;
}, "F:/Frosti/src/components/temple/CardGroup.astro", void 0);

export { $$CardGroup as $ };
