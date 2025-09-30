import { c as createAstro, a as createComponent, r as renderComponent, b as renderTemplate, m as maybeRenderHead, f as renderSlot } from './astro/server_BSSrx8qw.mjs';
import './index_MaT6fT73.mjs';
import { $ as $$Image } from './_astro_assets_Bt0X4mJE.mjs';
import { b as $$Card } from './BaseLayout_KMbkoCGG.mjs';

const $$Astro = createAstro("https://duskydream.icu");
const $$BaseCard = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$BaseCard;
  const { title, image } = Astro2.props;
  return renderTemplate`${renderComponent($$result, "Card", $$Card, {}, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<div id="image-container"> ${image && renderTemplate`${renderComponent($$result2, "Image", $$Image, { "src": image, "width": "1920", "height": "1080", "alt": title, "loading": "eager" })}`} </div> <div class="p-4 sm:p-6"> ${renderSlot($$result2, $$slots["default"])} </div> ` })}`;
}, "F:/Frosti/src/components/BaseCard.astro", void 0);

export { $$BaseCard as $ };
