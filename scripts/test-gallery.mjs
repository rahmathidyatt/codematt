// Isolated fixture route: never include synthetic screenshots in production content.
import {
  mkdir,
  copyFile,
  rm,
  readFile,
  writeFile,
  access,
} from "node:fs/promises";
import { spawnSync } from "node:child_process";
const route = "app/[locale]/gallery-test";
try {
  await access(route);
  throw new Error(
    "gallery-test route already exists; refusing to overwrite it",
  );
} catch (e) {
  if (e.code !== "ENOENT") throw e;
}
const tsconfig = await readFile("tsconfig.json");
const nextenv = await readFile("next-env.d.ts");
const env = {
  ...process.env,
  CODEMATT_GALLERY_TEST: "1",
  NEXT_PUBLIC_ENABLE_ANALYTICS: "true",
};
function run(args) {
  const result = spawnSync(process.execPath, args, { env, stdio: "inherit" });
  if (result.status !== 0) throw new Error(`Command failed: ${args.join(" ")}`);
}
try {
  await mkdir(route);
  await copyFile("tests/fixtures/gallery-page.tsx", `${route}/page.tsx`);
  run(["node_modules/next/dist/bin/next", "build"]);
  run([
    "node_modules/@playwright/test/cli.js",
    "test",
    "--config=playwright.gallery.config.ts",
  ]);
} finally {
  await rm(route, { recursive: true, force: true });
  await rm(".next-gallery", { recursive: true, force: true });
  await writeFile("tsconfig.json", tsconfig);
  await writeFile("next-env.d.ts", nextenv);
}
