function normalizeRoute(value: string) {
  let route = value.trim();

  try {
    route = decodeURI(route);
  } catch {
    // Keep the original value if it is not a valid URI.
  }

  return route
    .replace(/^https?:\/\/[^/]+/i, "")
    .split("#")[0]
    .split("?")[0]
    .replace(/^\/+|\/+$/g, "")
    .toLowerCase();
}

function compactHash(value: string) {
  let hash = 5381;
  for (let index = 0; index < value.length; index += 1) {
    hash = (hash * 33) ^ value.charCodeAt(index);
  }
  return (hash >>> 0).toString(36);
}

export function transitionNameForPath(path: string) {
  const route = normalizeRoute(path) || "home";
  return `page-${compactHash(route)}`;
}

export function transitionNameForTag(tag: string) {
  return `tag-${compactHash(tag.trim().toLowerCase())}`;
}
