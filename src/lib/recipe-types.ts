export type FlavorId =
  | "umami"
  | "picante"
  | "citrico"
  | "ahumado"
  | "herbal"
  | "dulce"
  | "cremoso"
  | "fresco";

export type RegionId =
  | "latam"
  | "caribe"
  | "norte"
  | "asia-este"
  | "asia-sur"
  | "medio-oriente"
  | "mediterraneo"
  | "europa"
  | "africa";

export type MoodId = "consuelo" | "fiesta" | "ligero" | "impresionar";

export type FamilyId =
  | "empanada"
  | "maiz"
  | "caldo"
  | "estofado"
  | "arroz"
  | "fideo"
  | "brasa"
  | "curry"
  | "frito"
  | "pan"
  | "crudo";

export type Difficulty = "fácil" | "media" | "alta";

export interface Ingredient {
  item: string;
  amount: string;
  key: string;
}

export interface CookStep {
  text: string;
  minutes: number;
  tool: string;
}

export interface RecipeSource {
  slug: string;
  name: string;
  nameLocal?: string;
  country: string;
  city?: string;
  regionId: RegionId;
  flavors: FlavorId[];
  profile: {
    picante: number;
    umami: number;
    acido: number;
    dulce: number;
    grasa: number;
    aroma: number;
  };
  timeMin: number;
  servings: number;
  difficulty: Difficulty;
  moods: MoodId[];
  ingredients: Ingredient[];
  steps: string[];
  story: string;
  tip: string;
  image: string;
  tags: string[];
}

export interface Recipe extends Omit<RecipeSource, "steps"> {
  steps: CookStep[];
  familyId: FamilyId;
}