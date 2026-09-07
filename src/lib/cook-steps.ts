import type { CookStep, Recipe, RecipeSource } from "./recipe-types";
import { familyOf } from "./families";

type ToolRule = { re: RegExp; tool: string };

const TOOL_RULES: ToolRule[] = [
  { re: /parrilla|asador|carbón|\bbrasas\b|\bgrilla\b/i, tool: "Parrilla" },
  { re: /\bhorno\b|gratin|hornea|al horno|costra/i, tool: "Horno" },
  { re: /\bwok\b|saltea/i, tool: "Wok" },
  { re: /\bcomal\b|\bplancha\b|\bbudare\b/i, tool: "Plancha o comal" },
  { re: /pilón|machaca/i, tool: "Pilón o mortero" },
  { re: /\bmortero\b|\bmaja\b/i, tool: "Mortero" },
  { re: /licúa|licuadora|procesa/i, tool: "Licuadora" },
  { re: /cuela|infusiona|hierve agua|ceba |licúa con yogur/i, tool: "Jarra o cafetera" },
  { re: /varilla|\bbate\b|emulsiona/i, tool: "Varillas y bol" },
  { re: /fríe|fritura|aceite a |reboz|\bpanko\b|empan/i, tool: "Cazuela honda" },
  { re: /sartén|dora|sofreír|sofríe|confitá/i, tool: "Sartén" },
  { re: /\bolla\b|hierve|estofa|\bcaldo\b|tapado|cocotte|cassole/i, tool: "Olla pesada" },
  { re: /\btabla\b|\bcorta\b|\bpica\b|deshebra|lonchea|\braja\b/i, tool: "Tabla y cuchillo" },
  { re: /\barma\b|\bsirve\b|\bmonta\b|\bplato\b|\bmesa\b|envuelve|\btaco\b/i, tool: "Plato y cuchara" },
  { re: /marina|remoj|nevera|hidrata/i, tool: "Bol y nevera" },
];

function inferTool(text: string, recipe: RecipeSource, index: number, total: number): string {
  for (const rule of TOOL_RULES) {
    if (rule.re.test(text)) return rule.tool;
  }
  const tags = recipe.tags.join(" ");
  if (/horno|bake/i.test(tags)) return index === total - 1 ? "Fuente y horno" : "Horno";
  if (/wok|calle/i.test(tags)) return "Wok";
  if (/parrilla|asado/i.test(tags)) return "Parrilla";
  if (index === 0) return "Tabla y cuchillo";
  if (index === total - 1) return "Plato de servir";
  return "Olla o sartén";
}

function parseMentionedMinutes(text: string): number | null {
  const hour = text.match(/(\d+(?:[.,]\d+)?)\s*h(?:oras?)?\b/i);
  if (hour) {
    const n = Number(hour[1].replace(",", "."));
    if (n >= 1 && n <= 12) return Math.round(n * 60);
  }
  const min = text.match(/(\d+)\s*min/i);
  if (min) {
    const n = Number(min[1]);
    if (n >= 1 && n <= 240) return n;
  }
  if (/toda la noche|de un día|un día|24 h/i.test(text)) return 12;
  if (/reposa|descansa/i.test(text) && /hora/i.test(text)) return 15;
  return null;
}

function weight(text: string, index: number, total: number): number {
  let w = 1;
  if (/horno|estofa|hierve|brasea|cocotte/i.test(text)) w += 2.4;
  if (/fríe|reboz|panko/i.test(text)) w += 1.2;
  if (/marina|remoj/i.test(text)) w += 0.4;
  if (/sirve|arma|monta|plato/i.test(text)) w += 0.2;
  if (index === 0) w += 0.3;
  if (index === total - 1) w += 0.15;
  return w;
}

function allocateMinutes(recipe: RecipeSource): number[] {
  const n = recipe.steps.length;
  const parsed = recipe.steps.map((s) => parseMentionedMinutes(s));
  const weights = recipe.steps.map((s, i) => weight(s, i, n));

  const budgetOf = (v: number | null) => (v == null ? null : v >= 90 ? 12 : v);
  const known = parsed.reduce<number>((sum, v) => sum + (budgetOf(v) ?? 0), 0);
  const unknownIdx = parsed.map((v, i) => (budgetOf(v) == null ? i : -1)).filter((i) => i >= 0);
  const leftover = Math.max(n * 4, recipe.timeMin - known);
  const wSum = unknownIdx.reduce((s, i) => s + weights[i]!, 0) || 1;
  const minutes = parsed.map((v) => v ?? 0);
  for (const i of unknownIdx) {
    minutes[i] = Math.max(3, Math.round((leftover * (weights[i] ?? 1)) / wSum));
  }
  return minutes.map((m) => Math.min(240, Math.max(2, m)));
}

function expandText(recipe: RecipeSource, raw: string, tool: string, minutes: number, index: number, total: number): string {
  const trimmed = raw.trim().replace(/\s+/g, " ");
  const base = trimmed.endsWith(".") ? trimmed : `${trimmed}.`;
  if (base.length >= 110) return base;

  const cues: string[] = [];
  const lower = base.toLowerCase();

  if (tool === "Horno" && !/°c|grados/i.test(base)) {
    cues.push("Precalienta a 180 °C con calor arriba y abajo.");
  }
  if (tool === "Sartén" && !/caliente|hume/i.test(lower)) {
    cues.push("La sartén tiene que estar caliente antes de que entre el alimento: si no chisporrotea, espera.");
  }
  if (tool === "Wok" && !/alto|hume/i.test(lower)) {
    cues.push("Fuego alto, wok seco primero. Trabaja en tandas para no hervir.");
  }
  if (tool === "Parrilla" && !/marca|brasa/i.test(lower)) {
    cues.push("Parrilla bien marcada; no aplastes. Deja reposar 5 minutos al salir.");
  }
  if (tool === "Olla pesada" && !/fuego bajo|tapa/i.test(lower)) {
    cues.push("Tapa entreabierta, fuego bajo. Espuma si sale suciedad a la superficie.");
  }
  if (tool === "Cazuela honda" && !/°c|170|180/i.test(lower)) {
    cues.push("Aceite a 170–180 °C. No abarrote: la temperatura cae y se pone aceitoso.");
  }
  if (tool === "Plancha o comal") {
    cues.push("Comal a fuego medio. Si humea, baja un punto.");
  }
  if (tool === "Mortero" || tool === "Pilón o mortero") {
    cues.push("Golpes cortos, no puré. El punto vive en lo que queda entero.");
  }
  if (tool === "Licuadora") {
    cues.push("Empieza a pulsos. Si el vaso se calienta, para unos segundos.");
  }
  if (tool === "Varillas y bol") {
    cues.push("Fuera del fuego si hay huevo o queso: si no, gruma.");
  }
  if (tool === "Tabla y cuchillo" && index === 0) {
    cues.push("Mise en place primero: todo cortado y medido antes de encender el fuego.");
  }
  if (tool === "Bol y nevera") {
    cues.push("Cubre y refrigerar. Saca 20 minutos antes de cocinar para que no entre helado al fuego.");
  }
  if (index === total - 1 && !/sirve|plato|mesa/i.test(lower)) {
    cues.push("Prueba sal y ácido justo antes de servir.");
  }
  if (minutes >= 40 && !/paciencia|lento|hora/i.test(lower)) {
    cues.push(`Presupuesto: unos ${minutes} min. No aceleres con fuego alto.`);
  }

  if (cues.length === 0) return base;
  const cue = cues[0] ?? "";
  return `${base} ${cue.endsWith(".") ? cue : `${cue}.`}`;
}

export function hydrateRecipe(recipe: RecipeSource): Recipe {
  const minutes = allocateMinutes(recipe);
  const steps: CookStep[] = recipe.steps.map((raw, i) => {
    const tool = inferTool(raw, recipe, i, recipe.steps.length);
    const mins = minutes[i] ?? 8;
    return {
      text: expandText(recipe, raw, tool, mins, i, recipe.steps.length),
      minutes: mins,
      tool,
    };
  });
  return {
    ...recipe,
    flavors: [...new Set(recipe.flavors)],
    familyId: familyOf(recipe.slug, recipe.name, recipe.tags),
    steps,
  };
}

export function formatStepClock(minutes: number) {
  if (minutes >= 120 && minutes % 60 === 0) return `${minutes / 60} h`;
  if (minutes >= 90) {
    const h = Math.floor(minutes / 60);
    const m = minutes % 60;
    return m ? `${h} h ${m} min` : `${h} h`;
  }
  return `${minutes} min`;
}

export function timerSecondsForStep(minutes: number) {
  const cap = minutes >= 90 ? 15 : minutes;
  return Math.max(2, cap) * 60;
}