import type { Recipe } from "./recipe-types";
import type { SwatchId } from "./swatch";

export type BoostId =
  | "energia"
  | "cansancio"
  | "recuperacion"
  | "fuerza"
  | "defensas"
  | "digestion"
  | "foco"
  | "abrigo";

export const BOOSTS: {
  id: BoostId;
  label: string;
  blurb: string;
  swatch: SwatchId;
}[] = [
  { id: "energia", label: "Energía", blurb: "Carbohidrato, picante, un plato que despierta.", swatch: "naranja" },
  { id: "cansancio", label: "Cansancio", blurb: "Hierro, caldo, consuelo de cuchara.", swatch: "queso" },
  { id: "recuperacion", label: "Recuperación", blurb: "Proteína, jengibre, colágeno.", swatch: "leaf" },
  { id: "fuerza", label: "Fuerza", blurb: "Carne, legumbre, plato que sostiene.", swatch: "rojo" },
  { id: "defensas", label: "Defensas", blurb: "Ajo, cítrico, chile y caldo.", swatch: "mora" },
  { id: "digestion", label: "Digestión", blurb: "Ligero, hierba, sin fritura.", swatch: "leaf" },
  { id: "foco", label: "Foco", blurb: "Pescado, cítrico, mesa corta.", swatch: "naranja" },
  { id: "abrigo", label: "Abrigo", blurb: "Estofado, caldo, frío afuera.", swatch: "wine" },
];

export function getBoost(id: BoostId | null | undefined) {
  return BOOSTS.find((b) => b.id === id);
}

function hasKey(recipe: Recipe, keys: string[]) {
  return recipe.ingredients.some((i) => keys.includes(i.key));
}

function tagHay(recipe: Recipe) {
  return recipe.tags.join(" ").toLowerCase();
}

export function boostScore(recipe: Recipe, id: BoostId): number {
  const { familyId, flavors, moods, profile, timeMin } = recipe;
  let score = 0;

  switch (id) {
    case "energia":
      if (["arroz", "fideo", "pan", "maiz", "desayuno"].includes(familyId)) score += 4;
      if (hasKey(recipe, ["arroz", "fideos", "maiz", "papa", "trigo", "platano"])) score += 3;
      if (flavors.includes("picante") || profile.picante >= 5) score += 2;
      if (timeMin <= 35) score += 2;
      if (moods.includes("ligero")) score += 1;
      if (familyId === "frito" || profile.grasa >= 9) score -= 2;
      break;
    case "cansancio":
      if (["caldo", "estofado"].includes(familyId)) score += 4;
      if (moods.includes("consuelo")) score += 3;
      if (hasKey(recipe, ["lenteja", "frijol", "res", "huevo", "espinaca", "garbanzo"])) score += 3;
      if (profile.umami >= 7) score += 2;
      if (hasKey(recipe, ["papa", "arroz"])) score += 1;
      break;
    case "recuperacion":
      if (hasKey(recipe, ["pollo", "pescado", "huevo", "camaron", "tofu"])) score += 4;
      if (familyId === "caldo") score += 3;
      if (hasKey(recipe, ["jengibre", "ajo"])) score += 3;
      if (hasKey(recipe, ["limon", "yogurt"])) score += 1;
      if (familyId === "frito" || (flavors.includes("dulce") && profile.dulce >= 7)) score -= 2;
      break;
    case "fuerza":
      if (hasKey(recipe, ["res", "cerdo", "cordero", "pollo", "huevo"])) score += 4;
      if (hasKey(recipe, ["lenteja", "garbanzo", "frijol", "tofu", "cacahuete"])) score += 3;
      if (["brasa", "estofado"].includes(familyId)) score += 2;
      if (profile.grasa >= 6) score += 1;
      break;
    case "defensas":
      if (hasKey(recipe, ["ajo", "jengibre", "limon", "chile"])) score += 4;
      if (flavors.includes("citrico") || flavors.includes("picante")) score += 2;
      if (familyId === "caldo") score += 3;
      if (hasKey(recipe, ["tomate", "cilantro"])) score += 1;
      if (flavors.includes("herbal")) score += 1;
      break;
    case "digestion":
      if (moods.includes("ligero")) score += 3;
      if (flavors.includes("herbal") || flavors.includes("fresco")) score += 3;
      if (["caldo", "crudo"].includes(familyId)) score += 3;
      if (hasKey(recipe, ["jengibre", "yogurt", "limon"])) score += 2;
      if (familyId === "frito" || profile.grasa >= 8) score -= 3;
      if (familyId === "postre") score -= 2;
      break;
    case "foco":
      if (hasKey(recipe, ["pescado", "huevo", "jengibre"])) score += 4;
      if (flavors.includes("citrico") || flavors.includes("herbal")) score += 2;
      if (moods.includes("ligero") || flavors.includes("fresco")) score += 2;
      if (timeMin <= 40) score += 2;
      if (tagHay(recipe).includes("desayuno") || tagHay(recipe).includes("crudo")) score += 1;
      if (familyId === "desayuno") score += 2;
      if (profile.grasa >= 8) score -= 2;
      break;
    case "abrigo":
      if (["estofado", "caldo"].includes(familyId)) score += 5;
      if (moods.includes("consuelo")) score += 3;
      if (profile.grasa >= 5) score += 1;
      if (timeMin >= 60) score += 1;
      if (flavors.includes("umami") || flavors.includes("ahumado")) score += 1;
      break;
  }

  return score;
}

export function recipeBoosts(recipe: Recipe, min = 4) {
  return BOOSTS.map((b) => ({ ...b, score: boostScore(recipe, b.id) }))
    .filter((b) => b.score >= min)
    .sort((a, b) => b.score - a.score)
    .slice(0, 3);
}

export function matchesBoost(recipe: Recipe, id: BoostId | null | undefined) {
  if (!id) return true;
  return boostScore(recipe, id) > 0;
}

export function boostHay(recipe: Recipe) {
  return recipeBoosts(recipe, 2)
    .map((b) => `${b.label} ${b.id}`)
    .join(" ");
}
