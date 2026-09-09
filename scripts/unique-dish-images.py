#!/usr/bin/env python3
"""Write a unique JPEG for every recipe that has no authentic photo."""
from __future__ import annotations

import hashlib
import json
import subprocess
import sys
from pathlib import Path

from PIL import Image, ImageEnhance, ImageOps

ROOT = Path(__file__).resolve().parents[1]
DISH = ROOT / "public" / "dishes"
UNIQUE = DISH / "u"
SKIP = {"hero"}


def authentic_ids() -> set[str]:
    return {p.stem for p in DISH.glob("*.jpg") if p.stem not in SKIP}


def hbytes(value: str) -> bytes:
    return hashlib.md5(value.encode("utf-8")).digest()


def variant(src: Path, slug: str, dest: Path) -> None:
    raw = hbytes(slug)
    im = Image.open(src).convert("RGB")
    width, height = im.size
    scale = 0.76 + (raw[0] / 255) * 0.18
    nw = max(8, int(width * scale))
    nh = max(8, int(height * scale))
    x = min(width - nw, int((width - nw) * raw[1] / 255))
    y = min(height - nh, int((height - nh) * raw[2] / 255))
    im = im.crop((x, y, x + nw, y + nh))
    if raw[3] > 200:
        im = ImageOps.mirror(im)
    angle = (raw[4] / 255) * 5.0 - 2.5
    im = im.rotate(angle, resample=Image.Resampling.BICUBIC, expand=False, fillcolor=(28, 22, 16))
    im = im.resize((540, 720), Image.Resampling.LANCZOS)
    im = ImageEnhance.Color(im).enhance(0.80 + raw[5] / 255 * 0.50)
    im = ImageEnhance.Contrast(im).enhance(0.86 + raw[6] / 255 * 0.38)
    im = ImageEnhance.Brightness(im).enhance(0.90 + raw[7] / 255 * 0.22)
    warm = Image.new(
        "RGB",
        im.size,
        (
            40 + raw[8] // 2,
            24 + raw[9] // 3,
            16 + raw[10] // 4,
        ),
    )
    im = Image.blend(im, warm, 0.035 + raw[11] / 255 * 0.07)
    dest.parent.mkdir(parents=True, exist_ok=True)
    im.save(dest, "JPEG", quality=70, optimize=True)


def dump_recipes() -> list[dict]:
    out = subprocess.check_output(
        ["npx", "tsx", "scripts/dump-recipe-images.ts"],
        cwd=ROOT,
    )
    return json.loads(out)


def main() -> int:
    auth = authentic_ids()
    recipes = dump_recipes()
    UNIQUE.mkdir(parents=True, exist_ok=True)
    written = 0
    skipped = 0
    missing_src = 0
    for recipe in recipes:
        slug = recipe["slug"]
        dest = UNIQUE / f"{slug}.jpg"
        if slug in auth:
            if dest.exists():
                dest.unlink()
            skipped += 1
            continue
        if dest.exists() and dest.stat().st_size > 8000:
            skipped += 1
            continue
        src_name = Path(str(recipe.get("source", ""))).name
        src = DISH / src_name
        if not src.exists():
            src = DISH / "hero.jpg"
            missing_src += 1
        variant(src, slug, dest)
        written += 1
    print(f"unique written={written} skipped={skipped} missing_src={missing_src} recipes={len(recipes)}")
    return 0


if __name__ == "__main__":
    sys.exit(main())
