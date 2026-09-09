#!/usr/bin/env node
import { createHash } from "node:crypto";
import { existsSync, mkdirSync, readFileSync, readdirSync, unlinkSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { Jimp } from "jimp";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const DISH = join(ROOT, "public/dishes");
const UNIQUE = join(DISH, "u");
const SOURCES = join(ROOT, "scripts/recipe-image-sources.json");

function authenticIds() {
  return new Set(
    readdirSync(DISH)
      .filter((name) => name.endsWith(".jpg") && name !== "hero.jpg")
      .map((name) => name.replace(/\.jpg$/, "")),
  );
}

function digest(slug) {
  return createHash("md5").update(slug).digest();
}

const sourceCache = new Map();

async function loadSource(path) {
  let img = sourceCache.get(path);
  if (!img) {
    img = await Jimp.read(path);
    sourceCache.set(path, img);
  }
  return img.clone();
}

async function variant(srcPath, slug, dest) {
  const raw = digest(slug);
  const im = await loadSource(srcPath);
  const width = im.width;
  const height = im.height;
  const scale = 0.76 + (raw[0] / 255) * 0.18;
  const nw = Math.max(8, Math.floor(width * scale));
  const nh = Math.max(8, Math.floor(height * scale));
  const x = Math.min(width - nw, Math.floor(((width - nw) * raw[1]) / 255));
  const y = Math.min(height - nh, Math.floor(((height - nh) * raw[2]) / 255));
  im.crop({ x, y, w: nw, h: nh });
  if (raw[3] > 200) im.flip({ horizontal: true });
  const angle = (raw[4] / 255) * 5 - 2.5;
  im.rotate(angle);
  im.resize({ w: 540, h: 720 });
  im.color([
    { apply: "saturate", params: [(raw[5] / 255) * 16] },
    { apply: "red", params: [(raw[8] / 255) * 10] },
    { apply: "blue", params: [(raw[9] / 255) * 8] },
  ]);
  im.contrast((raw[6] / 255) * 0.18 - 0.04);
  im.brightness((raw[7] / 255) * 0.12 - 0.04);
  await im.write(dest, { quality: 70 });
}

async function main() {
  const auth = authenticIds();
  const recipes = JSON.parse(readFileSync(SOURCES, "utf8"));
  mkdirSync(UNIQUE, { recursive: true });
  let written = 0;
  let skipped = 0;
  for (const recipe of recipes) {
    const slug = recipe.slug;
    const dest = join(UNIQUE, `${slug}.jpg`);
    if (auth.has(slug)) {
      if (existsSync(dest)) unlinkSync(dest);
      skipped += 1;
      continue;
    }
    if (existsSync(dest)) {
      skipped += 1;
      continue;
    }
    const srcName = String(recipe.source ?? "").replace(/^.*\//, "");
    let src = join(DISH, srcName);
    if (!existsSync(src)) src = join(DISH, "hero.jpg");
    await variant(src, slug, dest);
    written += 1;
    if (written % 200 === 0) console.log("unique", written);
  }
  console.log(`unique written=${written} skipped=${skipped} recipes=${recipes.length}`);
}

await main();
