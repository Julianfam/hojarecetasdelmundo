#!/usr/bin/env python3
"""Compile compact TSV atlas rows into TypeScript AtlasSeed files."""
from __future__ import annotations

import unicodedata
import re
from collections import Counter, defaultdict
from pathlib import Path

ROOT = Path("/workspace")
SRC = ROOT / "src/lib"
DATA = ROOT / "scripts/atlas"
OUT_MAP = {
    "latam.tsv": ("atlas-latam.ts", "ATLAS_LATAM"),
    "europa.tsv": ("atlas-europa.ts", "ATLAS_EUROPA"),
    "asia.tsv": ("atlas-asia.ts", "ATLAS_ASIA"),
    "resto.tsv": ("atlas-resto.ts", "ATLAS_RESTO"),
    "extra.tsv": ("atlas-extra.ts", "ATLAS_EXTRA"),
}

COUNTRIES: dict[str, tuple[str, str]] = {
    "MX": ("México", "latam"),
    "CO": ("Colombia", "latam"),
    "PE": ("Perú", "latam"),
    "AR": ("Argentina", "latam"),
    "BR": ("Brasil", "latam"),
    "CL": ("Chile", "latam"),
    "VE": ("Venezuela", "latam"),
    "EC": ("Ecuador", "latam"),
    "BO": ("Bolivia", "latam"),
    "PY": ("Paraguay", "latam"),
    "UY": ("Uruguay", "latam"),
    "CR": ("Costa Rica", "latam"),
    "SV": ("El Salvador", "latam"),
    "GT": ("Guatemala", "latam"),
    "HN": ("Honduras", "latam"),
    "NI": ("Nicaragua", "caribe"),
    "PA": ("Panamá", "latam"),
    "CU": ("Cuba", "caribe"),
    "PR": ("Puerto Rico", "caribe"),
    "DO": ("República Dominicana", "caribe"),
    "JM": ("Jamaica", "caribe"),
    "HT": ("Haití", "caribe"),
    "TT": ("Trinidad y Tobago", "caribe"),
    "GY": ("Guyana", "caribe"),
    "US": ("Estados Unidos", "norte"),
    "CA": ("Canadá", "norte"),
    "AU": ("Australia", "norte"),
    "NZ": ("Nueva Zelanda", "norte"),
    "IT": ("Italia", "mediterraneo"),
    "FR": ("Francia", "mediterraneo"),
    "ES": ("España", "mediterraneo"),
    "PT": ("Portugal", "europa"),
    "GR": ("Grecia", "mediterraneo"),
    "DE": ("Alemania", "europa"),
    "GB": ("Reino Unido", "europa"),
    "PL": ("Polonia", "europa"),
    "RU": ("Rusia", "europa"),
    "HU": ("Hungría", "europa"),
    "AT": ("Austria", "europa"),
    "CZ": ("Chequia", "europa"),
    "RO": ("Rumania", "europa"),
    "HR": ("Croacia", "mediterraneo"),
    "NL": ("Países Bajos", "europa"),
    "BE": ("Bélgica", "europa"),
    "NO": ("Noruega", "europa"),
    "SE": ("Suecia", "europa"),
    "DK": ("Dinamarca", "europa"),
    "FI": ("Finlandia", "europa"),
    "IE": ("Irlanda", "europa"),
    "CH": ("Suiza", "europa"),
    "UA": ("Ucrania", "europa"),
    "GE": ("Georgia", "europa"),
    "BG": ("Bulgaria", "europa"),
    "RS": ("Serbia", "europa"),
    "IS": ("Islandia", "europa"),
    "CN": ("China", "asia-este"),
    "JP": ("Japón", "asia-este"),
    "KR": ("Corea del Sur", "asia-este"),
    "TW": ("Taiwán", "asia-este"),
    "VN": ("Vietnam", "asia-este"),
    "MN": ("Mongolia", "asia-este"),
    "IN": ("India", "asia-sur"),
    "TH": ("Tailandia", "asia-sur"),
    "ID": ("Indonesia", "asia-sur"),
    "MY": ("Malasia", "asia-sur"),
    "PH": ("Filipinas", "asia-sur"),
    "SG": ("Singapur", "asia-sur"),
    "KH": ("Camboya", "asia-sur"),
    "LA": ("Laos", "asia-sur"),
    "MM": ("Myanmar", "asia-sur"),
    "PK": ("Pakistán", "asia-sur"),
    "BD": ("Bangladesh", "asia-sur"),
    "LK": ("Sri Lanka", "asia-sur"),
    "NP": ("Nepal", "asia-sur"),
    "AF": ("Afganistán", "asia-sur"),
    "TR": ("Turquía", "medio-oriente"),
    "LB": ("Líbano", "medio-oriente"),
    "IR": ("Irán", "medio-oriente"),
    "IL": ("Israel", "medio-oriente"),
    "PS": ("Palestina", "medio-oriente"),
    "SY": ("Siria", "medio-oriente"),
    "JO": ("Jordania", "medio-oriente"),
    "IQ": ("Irak", "medio-oriente"),
    "YE": ("Yemen", "medio-oriente"),
    "SA": ("Arabia Saudita", "medio-oriente"),
    "AM": ("Armenia", "medio-oriente"),
    "EG": ("Egipto", "africa"),
    "MA": ("Marruecos", "africa"),
    "TN": ("Túnez", "africa"),
    "DZ": ("Argelia", "africa"),
    "NG": ("Nigeria", "africa"),
    "ET": ("Etiopía", "africa"),
    "GH": ("Ghana", "africa"),
    "SN": ("Senegal", "africa"),
    "KE": ("Kenia", "africa"),
    "ZA": ("Sudáfrica", "africa"),
    "CM": ("Camerún", "africa"),
    "ML": ("Malí", "africa"),
    "MZ": ("Mozambique", "africa"),
    "AO": ("Angola", "africa"),
    "UG": ("Uganda", "africa"),
    "CI": ("Costa de Marfil", "africa"),
    "TZ": ("Tanzania", "africa"),
    "MG": ("Madagascar", "africa"),
    "KZ": ("Kazajistán", "europa"),
}

FAMILIES = {
    "empanada", "maiz", "caldo", "estofado", "arroz", "fideo", "brasa",
    "curry", "frito", "pan", "crudo", "desayuno", "postre", "bebida",
}
FLAVORS = {"umami", "picante", "citrico", "ahumado", "herbal", "dulce", "cremoso", "fresco"}
MOODS = {"consuelo", "fiesta", "ligero", "impresionar"}


def existing_slugs() -> set[str]:
    slugs: set[str] = set()
    for p in SRC.glob("*.ts"):
        text = p.read_text()
        slugs.update(re.findall(r'slug:\s*"([^"]+)"', text))
        slugs.update(re.findall(r'dish\("([^"]+)"', text))
    return slugs


def fold_slug(slug: str) -> str:
    s = unicodedata.normalize("NFD", slug)
    s = "".join(c for c in s if unicodedata.category(c) != "Mn")
    s = s.lower().replace("ñ", "n")
    s = re.sub(r"[^a-z0-9]+", "-", s)
    return s.strip("-")


def parse_tsv(path: Path) -> list[list[str]]:
    rows: list[list[str]] = []
    for i, raw in enumerate(path.read_text().splitlines(), 1):
        line = raw.strip()
        if not line or line.startswith("#"):
            continue
        parts = [p.strip() for p in line.split("|")]
        if len(parts) == 11:
            rows.append(parts)
            continue
        fam_idx = next((j for j, p in enumerate(parts) if p in FAMILIES), -1)
        if fam_idx >= 5 and len(parts) >= fam_idx + 6:
            code = parts[0]
            name = parts[fam_idx - 3]
            local = parts[fam_idx - 2]
            city = parts[fam_idx - 1]
            family = parts[fam_idx]
            flavors = parts[fam_idx + 1]
            time = parts[fam_idx + 2]
            moods = parts[fam_idx + 3]
            ings = parts[fam_idx + 4]
            story = "|".join(parts[fam_idx + 5 :])
            slug = fold_slug(parts[1] if "wait" not in parts[1] else name)
            rows.append([code, slug, name, local, city, family, flavors, time, moods, ings, story])
            continue
        print(f"skip {path.name}:{i} fields={len(parts)}")
    return rows


def ts_str(s: str) -> str:
    return '"' + s.replace("\\", "\\\\").replace('"', '\\"') + '"'


def compile_file(tsv_name: str, ts_name: str, export: str, deny: set[str]) -> tuple[int, Counter, list[str]]:
    rows = parse_tsv(DATA / tsv_name)
    seen: set[str] = set()
    out: list[str] = []
    by_country: Counter = Counter()
    errors: list[str] = []
    for code, slug, name, local, city, family, flavors, time, moods, ings, story in rows:
        if code not in COUNTRIES:
            errors.append(f"unknown country {code} ({slug})")
            continue
        if family not in FAMILIES:
            errors.append(f"bad family {family} ({slug})")
            continue
        flav = [f.strip() for f in flavors.split(",") if f.strip()]
        mood = [m.strip() for m in moods.split(",") if m.strip()]
        country, region = COUNTRIES[code]
        slug = fold_slug(slug)
        if "wait" in slug or "skip" in slug or "wait" in name.lower():
            clean_name = re.sub(r"\b(wait|skip|already)\b", "", name, flags=re.I)
            clean_name = re.sub(r"\s+", " ", clean_name).strip(" -")
            if clean_name:
                name = clean_name
            slug = fold_slug(name)
        if not slug:
            errors.append(f"empty slug after fold ({name})")
            continue
        flav = [f for f in flav if f in FLAVORS] or ["umami"]
        mood = [{"desayuno": "consuelo"}.get(m, m) for m in mood]
        mood = [m for m in mood if m in MOODS] or ["consuelo"]
        if slug in deny or slug in seen:
            continue
        try:
            t = int(time)
        except ValueError:
            errors.append(f"bad time {time} ({slug})")
            continue
        if "*" not in ings:
            errors.append(f"ings need item*amount*key ({slug})")
            continue
        country, region = COUNTRIES[code]
        seen.add(slug)
        by_country[country] += 1
        tuple_src = ", ".join([
            ts_str(slug), ts_str(name), ts_str(local or name), ts_str(country),
            ts_str(city), ts_str(region), ts_str(family), ts_str(",".join(flav)),
            str(t), ts_str(",".join(mood)), ts_str(ings), ts_str(story),
        ])
        out.append(f"  [{tuple_src}],")
    text = (
        'import type { AtlasSeed } from "./atlas-expand";\n\n'
        f"export const {export}: AtlasSeed[] = [\n"
        + "\n".join(out)
        + "\n];\n"
    )
    (SRC / ts_name).write_text(text)
    return len(out), by_country, errors


def main() -> None:
    deny = existing_slugs()
    DATA.mkdir(parents=True, exist_ok=True)
    total = 0
    countries: Counter = Counter()
    all_errors: list[str] = []
    for tsv, (ts_name, export) in OUT_MAP.items():
        path = DATA / tsv
        if not path.exists():
            print(f"missing {path}")
            continue
        n, by_c, errors = compile_file(tsv, ts_name, export, deny)
        total += n
        countries.update(by_c)
        all_errors.extend(errors)
        print(f"{ts_name}: {n} recipes")
    print("TOTAL_NEW", total)
    print("KITCHENS_IN_ATLAS", len(countries))
    for name, n in countries.most_common():
        print(f"  {n:3d} {name}")
    if all_errors:
        print("ERRORS", len(all_errors))
        for e in all_errors[:40]:
            print(" ", e)
        if all_errors:
            print("WARN", len(all_errors), "non-fatal")


if __name__ == "__main__":
    main()
