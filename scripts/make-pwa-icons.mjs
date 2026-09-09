import { chromium } from "playwright";
import { writeFileSync, mkdirSync } from "node:fs";

const LEAF = `
  <path fill="#4F7C4C" d="M9.2 22.4C9.6 13.6 16.6 6.2 25.2 6.8c.4 8-5.2 16.6-13.8 18.8-1.6.4-2.4-1.4-2.2-3.2z"/>
  <path fill="none" stroke="#C09A52" stroke-width="1.7" stroke-linecap="round" d="M12.4 22.6c2.6-3.2 6-8 10.2-13.6"/>
`;

function html(size, scale) {
  const s = Math.round(size * scale);
  return `<!doctype html>
<html><head><meta charset="utf-8">
<style>
  html,body{margin:0;padding:0;background:#F3EADC}
  .tile{width:${size}px;height:${size}px;display:grid;place-items:center;background:#F3EADC}
</style></head>
<body><div class="tile">
  <svg xmlns="http://www.w3.org/2000/svg" width="${s}" height="${s}" viewBox="0 0 32 32">${LEAF}</svg>
</div></body></html>`;
}

const jobs = [
  { file: "apple-touch-icon.png", size: 180, scale: 0.84 },
  { file: "icon-192.png", size: 192, scale: 0.84 },
  { file: "icon-512.png", size: 512, scale: 0.84 },
  { file: "icon-maskable-512.png", size: 512, scale: 0.64 },
];

mkdirSync("/tmp/hoja-icons", { recursive: true });
const browser = await chromium.launch();
for (const job of jobs) {
  const page = await browser.newPage({
    viewport: { width: job.size, height: job.size },
    deviceScaleFactor: 1,
  });
  await page.setContent(html(job.size, job.scale), { waitUntil: "load" });
  await page.screenshot({
    path: `/tmp/hoja-icons/${job.file}`,
    type: "png",
    omitBackground: false,
  });
  await page.close();
  console.log("wrote", job.file);
}
await browser.close();
