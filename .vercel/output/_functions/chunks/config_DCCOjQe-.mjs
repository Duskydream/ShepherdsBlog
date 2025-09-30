import * as fs from 'node:fs';
import * as nodePath from 'node:path';
import yaml from 'js-yaml';

const configPath = nodePath.resolve("frosti.config.yaml");
const translationsPath = nodePath.resolve("src/i18n/translations.yaml");
const config = yaml.load(fs.readFileSync(configPath, "utf8"));
const translationsConfig = yaml.load(fs.readFileSync(translationsPath, "utf8"));
const SITE_TAB = config.site.tab;
const SITE_TITLE = config.site.title;
const SITE_DESCRIPTION = config.site.description;
const SITE_LANGUAGE = config.site.language;
const SITE_FAVICON = config.site.favicon;
const SITE_THEME = config.site.theme;
const DATE_FORMAT = config.site.date_format;
config.site.blog;
const BLOG_PAGE_SIZE = config.site.blog.pageSize;
config.site.theme.code;
const USER_NAME = config.user.name;
const USER_SITE = config.user.site;
const USER_AVATAR = config.user.avatar;
const USER_SIDEBAR_SOCIAL_ICONS = config.user.sidebar.social;
const USER_FOOTER_SOCIAL_ICONS = config.user.footer.social;
const SITE_MENU = config.site.menu;
const TRANSLATIONS = translationsConfig;
const translationCache = {};
function t(key) {
  if (translationCache[key] !== void 0) {
    return translationCache[key];
  }
  const currentLangTranslations = TRANSLATIONS[SITE_LANGUAGE];
  if (!currentLangTranslations) {
    translationCache[key] = key;
    return key;
  }
  const keyParts = key.split(".");
  let result = currentLangTranslations;
  for (let i = 0; i < keyParts.length; i++) {
    const part = keyParts[i];
    if (!result || typeof result !== "object") {
      translationCache[key] = key;
      return key;
    }
    result = result[part];
  }
  translationCache[key] = typeof result === "string" ? result : key;
  return translationCache[key];
}

export { BLOG_PAGE_SIZE as B, DATE_FORMAT as D, SITE_LANGUAGE as S, USER_NAME as U, SITE_TAB as a, SITE_DESCRIPTION as b, SITE_TITLE as c, SITE_MENU as d, USER_SIDEBAR_SOCIAL_ICONS as e, USER_AVATAR as f, SITE_THEME as g, USER_FOOTER_SOCIAL_ICONS as h, USER_SITE as i, SITE_FAVICON as j, t };
