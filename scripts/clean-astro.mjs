import { rm } from "node:fs/promises";

try {
  await rm(".astro", { recursive: true, force: true });
} catch {
  // ignore
}
