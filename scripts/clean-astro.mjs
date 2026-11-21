import { rm } from "node:fs/promises";

for (const target of [".astro", "node_modules/.astro/data-store.json"]) {
  try {
    await rm(target, { recursive: true, force: true });
  } catch {
    // ignore
  }
}
