import { c as createAstro, a as createComponent, r as renderComponent, e as renderScript, b as renderTemplate, f as renderSlot, m as maybeRenderHead, d as addAttribute } from './astro/server_BSSrx8qw.mjs';
import { t } from './config_DCCOjQe-.mjs';
import { b as $$Card, a as $$Icon } from './BaseLayout_KMbkoCGG.mjs';
import './index_MaT6fT73.mjs';
import { $ as $$Image } from './_astro_assets_Bt0X4mJE.mjs';

const $$Astro = createAstro("https://duskydream.icu");
const $$MainCard = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$MainCard;
  const {
    title,
    description,
    image,
    infoIcon = "lucide:help-circle",
    helpText = t("label.learnMore"),
    textOverlay,
    showTextBackground = true,
    headerClass = "",
    extraClasses = ""
  } = Astro2.props;
  const accessibleHelpText = `${helpText}: ${title}`;
  return renderTemplate`${renderComponent($$result, "Card", $$Card, { "class": `overflow-hidden ${extraClasses}` }, { "default": ($$result2) => renderTemplate`${image ? (
    // With image - show image with overlay title
    renderTemplate`${maybeRenderHead()}<div class="relative"> <div class="aspect-video w-full overflow-hidden"> ${renderComponent($$result2, "Image", $$Image, { "src": image, "alt": title, "width": 1200, "height": 630, "format": "webp", "loading": "eager", "class": "w-full h-full object-cover" })} </div>  <div class="absolute bottom-4 left-4 right-4 lg:bottom-6 lg:left-6 lg:right-6 flex items-end justify-between gap-4">  <div class="inline-block bg-black/60 backdrop-blur-md px-4 py-2 rounded-xl border border-white/40 shadow-lg"> <h1 class="text-xl sm:text-2xl lg:text-4xl font-bold text-white">${title}</h1> </div>  ${description && renderTemplate`<div class="flex-shrink-0"> <div class="dropdown dropdown-top dropdown-end dropdown-hover"> <label tabindex="0"${addAttribute(accessibleHelpText, "aria-label")} class="group btn btn-sm px-2 bg-black/60 backdrop-blur-md hover:bg-black/80 border border-white/40 text-white shadow-lg rounded-full flex items-center gap-0 transition-all duration-300 ease-in-out"> ${renderComponent($$result2, "Icon", $$Icon, { "name": infoIcon, "class": "w-4 h-4 flex-shrink-0" })} <span class="w-0 overflow-hidden group-hover:w-20 transition-all duration-300 text-xs whitespace-nowrap"> ${helpText} </span> </label> <div tabindex="0" class="dropdown-content z-[1] card w-64 sm:w-80 p-2 shadow-lg bg-black/70 backdrop-blur-md text-white border border-white/20 mb-4" data-state="closed"> <div class="card-body p-3"> <p class="text-sm">${description}</p> </div> </div> </div> </div>`} </div> </div>`
  ) : textOverlay ? (
    // No image, but with textOverlay - show gradient background with overlay text
    renderTemplate`<div class="relative"> <div${addAttribute(`aspect-video w-full overflow-hidden bg-gradient-to-br from-base-300 to-base-100 ${headerClass}`, "class")}> ${showTextBackground && textOverlay && renderTemplate`<div class="absolute inset-0 w-full h-full error-animation-container"> <div class="text-9xl md:text-[12rem] font-bold text-primary opacity-20 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"> ${textOverlay} </div> </div>`} </div>  <div class="absolute bottom-4 left-4 right-4 lg:bottom-6 lg:left-6 lg:right-6 flex items-end justify-between gap-4">  <div class="inline-block bg-black/60 backdrop-blur-md px-4 py-2 rounded-xl border border-white/40 shadow-lg"> <h1 class="text-xl sm:text-2xl lg:text-4xl font-bold text-white">${title}</h1> </div>  ${description && renderTemplate`<div class="flex-shrink-0"> <div class="dropdown dropdown-top dropdown-end dropdown-hover"> <label tabindex="0"${addAttribute(accessibleHelpText, "aria-label")} class="group btn btn-sm px-2 bg-black/60 backdrop-blur-md hover:bg-black/80 border border-white/40 text-white shadow-lg rounded-full flex items-center gap-0 transition-all duration-300 ease-in-out"> ${renderComponent($$result2, "Icon", $$Icon, { "name": infoIcon, "class": "w-4 h-4 flex-shrink-0" })} <span class="w-0 overflow-hidden group-hover:w-20 transition-all duration-300 text-xs whitespace-nowrap"> ${helpText} </span> </label> <div tabindex="0" class="dropdown-content z-[1] card w-64 sm:w-80 p-2 shadow-lg bg-black/70 backdrop-blur-md text-white border border-white/20 mb-4" data-state="closed"> <div class="card-body p-3"> <p class="text-sm">${description}</p> </div> </div> </div> </div>`} </div> </div>`
  ) : (
    // No image, no textOverlay - show simple title and description at top
    renderTemplate`<div class="pt-6 px-6"> <h1 class="text-xl sm:text-2xl lg:text-4xl font-bold">${title}</h1> ${description && renderTemplate`<p class="mt-2 text-sm text-base-content/80">${description}</p>`} </div>`
  )} <div class="p-4 sm:p-6"> ${renderSlot($$result2, $$slots["default"])} </div> ` })} ${renderScript($$result, "F:/Frosti/src/components/MainCard.astro?astro&type=script&index=0&lang.ts")}`;
}, "F:/Frosti/src/components/MainCard.astro", void 0);

export { $$MainCard as $ };
