import { getRecipe, PANTRY_GROUPS, type Recipe } from "./recipes";
import type { BasketItem } from "./store";

export interface MarketDish {
  slug: string;
  name: string;
  country: string;
  servings: number;
  qty: number;
  image: string;
  recipe: Recipe;
}

export interface MarketLine {
  id: string;
  item: string;
  key: string;
  aisle: string;
  amounts: { amount: string; dish: string }[];
  label: string;
  inPantry: boolean;
}

export interface MarketAisle {
  label: string;
  lines: MarketLine[];
}

export interface MarketList {
  dishes: MarketDish[];
  aisles: MarketAisle[];
  lines: MarketLine[];
}

const AISLE_FALLBACK = "Otros";
const AISLE_RANK = new Map(
  [...PANTRY_GROUPS.map((g) => g.label), AISLE_FALLBACK].map((label, i) => [label, i]),
);
const KEY_AISLE = new Map(
  PANTRY_GROUPS.flatMap((g) => g.keys.map((k) => [k.key, g.label] as const)),
);

function aisleOf(key: string) {
  return KEY_AISLE.get(key) ?? AISLE_FALLBACK;
}

function normalizeItem(item: string) {
  return item
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, " ")
    .trim();
}

function scaleAmount(amount: string, qty: number) {
  if (qty === 1) return amount;
  const match = amount.match(/^(\d+(?:[.,]\d+)?)(.*)$/);
  if (!match) return amount;
  const value = parseFloat(match[1].replace(",", "."));
  const scaled = value * qty;
  const shown = Number.isInteger(scaled)
    ? String(scaled)
    : String(Math.round(scaled * 10) / 10).replace(".", ",");
  return `${shown}${match[2]}`;
}

function combineAmounts(amounts: string[]) {
  const parsed = amounts.map((raw) => {
    const match = raw.trim().match(/^(\d+(?:[.,]\d+)?)\s*(.*)$/);
    if (!match) return null;
    return { n: parseFloat(match[1].replace(",", ".")), unit: match[2].trim() };
  });
  const first = parsed[0];
  if (first && parsed.every((row) => row && row.unit === first.unit)) {
    const sum = parsed.reduce((total, row) => total + (row?.n ?? 0), 0);
    const shown = Number.isInteger(sum)
      ? String(sum)
      : String(Math.round(sum * 10) / 10).replace(".", ",");
    return first.unit ? `${shown} ${first.unit}` : shown;
  }
  return [...new Set(amounts)].join(" + ");
}

export function buildMarket(basket: BasketItem[], pantry: string[]): MarketList {
  const dishes: MarketDish[] = [];
  const map = new Map<string, MarketLine>();

  for (const item of basket) {
    const recipe = getRecipe(item.slug);
    if (!recipe) continue;
    const qty = Math.max(1, item.qty || 1);
    dishes.push({
      slug: recipe.slug,
      name: recipe.name,
      country: recipe.country,
      servings: recipe.servings * qty,
      qty,
      image: recipe.image,
      recipe,
    });

    for (const ing of recipe.ingredients) {
      const id = normalizeItem(ing.item) || ing.key;
      const scaled = scaleAmount(ing.amount, qty);
      const current = map.get(id);
      if (current) {
        current.amounts.push({ amount: scaled, dish: recipe.name });
        if (ing.item.length > current.item.length) current.item = ing.item;
        current.inPantry = current.inPantry && pantry.includes(ing.key);
      } else {
        map.set(id, {
          id,
          item: ing.item,
          key: ing.key,
          aisle: aisleOf(ing.key),
          amounts: [{ amount: scaled, dish: recipe.name }],
          label: scaled,
          inPantry: pantry.includes(ing.key),
        });
      }
    }
  }

  const lines = [...map.values()].map((line) => ({
    ...line,
    label: combineAmounts(line.amounts.map((a) => a.amount)),
  }));

  lines.sort((a, b) => {
    const aisle = (AISLE_RANK.get(a.aisle) ?? 99) - (AISLE_RANK.get(b.aisle) ?? 99);
    if (aisle !== 0) return aisle;
    return a.item.localeCompare(b.item, "es");
  });

  const aisles: MarketAisle[] = [];
  for (const line of lines) {
    const last = aisles[aisles.length - 1];
    if (last && last.label === line.aisle) last.lines.push(line);
    else aisles.push({ label: line.aisle, lines: [line] });
  }

  return { dishes, aisles, lines };
}

export function formatMarketText(
  list: MarketList,
  opts: { skipPantry: boolean; flavor: "notes" | "whatsapp" },
) {
  const aisles = list.aisles
    .map((aisle) => ({
      ...aisle,
      lines: opts.skipPantry ? aisle.lines.filter((l) => !l.inPantry) : aisle.lines,
    }))
    .filter((aisle) => aisle.lines.length > 0);

  const wa = opts.flavor === "whatsapp";
  const title = wa ? "*Hoja — lista de mercado*" : "Hoja — lista de mercado";
  const dishesHeading = wa ? "*Platos*" : "Platos";
  const dishes = list.dishes
    .map((d) => {
      const qty = d.qty > 1 ? ` ×${d.qty}` : "";
      return `- ${d.name}${qty} (${d.country}, ${d.servings} pers.)`;
    })
    .join("\n");

  const items = aisles
    .map((aisle) => {
      const heading = wa ? `*${aisle.label}*` : aisle.label;
      const rows = aisle.lines
        .map((line) => {
          const mark = wa ? "☐" : "- [ ]";
          const pantry = line.inPantry ? " (ya tienes)" : "";
          return `${mark} ${line.item} — ${line.label}${pantry}`;
        })
        .join("\n");
      return `${heading}\n${rows}`;
    })
    .join("\n\n");

  return [
    title,
    "",
    dishesHeading,
    dishes || "- Ninguno",
    "",
    items || (wa ? "_Nada que comprar._" : "Nada que comprar."),
    "",
    wa ? "_Lista hecha en Hoja._" : "Lista hecha en Hoja.",
  ].join("\n");
}

export function whatsappHref(text: string) {
  return `https://wa.me/?text=${encodeURIComponent(text)}`;
}

export function downloadNotesFile(text: string) {
  const blob = new Blob([text], { type: "text/plain;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "lista-hoja.txt";
  a.rel = "noopener";
  document.body.appendChild(a);
  a.click();
  a.remove();
  window.setTimeout(() => URL.revokeObjectURL(url), 1000);
}
