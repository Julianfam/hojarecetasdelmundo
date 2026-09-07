import type { FamilyId, MoodId, Recipe, RegionId } from "./recipe-types";
import { RECIPES } from "./recipes";
import { pickAt, shuffleCopy } from "./shuffle";

export type FestivalAccent = "chile" | "leaf" | "gold";

export interface Festival {
  id: string;
  name: string;
  blurb: string;
  accent: FestivalAccent;
  countries?: string[];
  regions?: RegionId[];
  families?: FamilyId[];
  tags?: string[];
  moods?: MoodId[];
  slugs?: string[];
}

interface FestivalRule extends Festival {
  month: number;
  start: number;
  end: number;
  endMonth?: number;
}

const CALENDAR: FestivalRule[] = [
  {
    id: "ano-nuevo",
    name: "Año nuevo",
    blurb: "Suerte en el plato: uvas, fideos, lo que se come para entrar bien.",
    accent: "gold",
    month: 12,
    start: 28,
    endMonth: 1,
    end: 4,
    countries: ["España", "Japón", "Estados Unidos", "Italia"],
    families: ["fideo", "estofado"],
  },
  {
    id: "reyes",
    name: "Día de Reyes",
    blurb: "Rosca, canela y el último dulce de las fiestas.",
    accent: "gold",
    month: 1,
    start: 5,
    end: 7,
    countries: ["México", "España", "Francia"],
    families: ["pan"],
  },
  {
    id: "lunar",
    name: "Año nuevo lunar",
    blurb: "Dumplings, pato, caldo largo. La mesa pide reunirse.",
    accent: "chile",
    month: 1,
    start: 20,
    endMonth: 2,
    end: 20,
    countries: ["China", "Corea del Sur", "Vietnam", "Taiwán"],
    families: ["fideo", "caldo"],
  },
  {
    id: "carnaval",
    name: "Carnaval",
    blurb: "Calle, fritura y color. Se come de pie y se baila con la boca llena.",
    accent: "chile",
    month: 2,
    start: 1,
    endMonth: 3,
    end: 10,
    countries: ["Brasil", "Trinidad y Tobago", "Colombia", "Cuba"],
    families: ["frito", "maiz"],
    moods: ["fiesta"],
  },
  {
    id: "san-valentin",
    name: "San Valentín",
    blurb: "Un plato para impresionar: salsa, tiempo, una sola mesa.",
    accent: "chile",
    month: 2,
    start: 12,
    end: 15,
    moods: ["impresionar"],
    families: ["estofado", "brasa"],
  },
  {
    id: "semana-santa",
    name: "Semana Santa",
    blurb: "Mar, vinagre y horno. El bacalao y el pescado mandan la mesa.",
    accent: "leaf",
    month: 3,
    start: 20,
    endMonth: 4,
    end: 20,
    tags: ["pescado", "bacalao", "mar"],
    countries: ["España", "Portugal", "México", "Filipinas"],
    families: ["caldo"],
  },
  {
    id: "cinco-mayo",
    name: "Cinco de Mayo",
    blurb: "Maíz, chile y ácido. México se sirve con contrapunto.",
    accent: "chile",
    month: 5,
    start: 3,
    end: 6,
    countries: ["México"],
  },
  {
    id: "madre",
    name: "Día de la madre",
    blurb: "El almuerzo largo. Un estofado o un arroz que se espera.",
    accent: "gold",
    month: 5,
    start: 8,
    end: 15,
    moods: ["consuelo", "impresionar"],
    families: ["estofado", "arroz"],
  },
  {
    id: "san-juan",
    name: "San Juan",
    blurb: "Brasa de solsticio. El fuego sale a la calle.",
    accent: "chile",
    month: 6,
    start: 20,
    end: 25,
    families: ["brasa"],
    regions: ["mediterraneo", "latam", "europa"],
  },
  {
    id: "colombia",
    name: "Independencia de Colombia",
    blurb: "Sopa, maíz y aguacate. El almuerzo es un territorio.",
    accent: "chile",
    month: 7,
    start: 18,
    end: 21,
    countries: ["Colombia"],
  },
  {
    id: "peru",
    name: "Fiestas patrias del Perú",
    blurb: "Mar, andes y limón. El ceviche marca el minuto.",
    accent: "gold",
    month: 7,
    start: 26,
    end: 29,
    countries: ["Perú"],
  },
  {
    id: "boyaca",
    name: "Batalla de Boyacá",
    blurb: "Otra vez Colombia a la mesa: ajiaco, sancocho, arepa.",
    accent: "chile",
    month: 8,
    start: 6,
    end: 8,
    countries: ["Colombia"],
  },
  {
    id: "brasil",
    name: "Independencia de Brasil",
    blurb: "Dendê, feijão y brasa. El trópico se come con cuchara.",
    accent: "leaf",
    month: 9,
    start: 5,
    end: 8,
    countries: ["Brasil"],
  },
  {
    id: "mexico",
    name: "Independencia de México",
    blurb: "El grito pide chile, maíz y una mesa ruidosa.",
    accent: "chile",
    month: 9,
    start: 14,
    end: 17,
    countries: ["México"],
  },
  {
    id: "chile",
    name: "Fiestas patrias de Chile",
    blurb: "Asado, choclo y merquén. El dieciocho se huele a dos calles.",
    accent: "chile",
    month: 9,
    start: 16,
    end: 20,
    countries: ["Chile"],
  },
  {
    id: "hispana",
    name: "Herencia hispana",
    blurb: "Un mes para cruzar el océano en el plato: maíz, ajo, sofrito.",
    accent: "gold",
    month: 9,
    start: 15,
    endMonth: 10,
    end: 15,
    regions: ["latam", "caribe", "mediterraneo"],
    countries: ["México", "España", "Colombia", "Perú", "Argentina", "Chile", "Cuba"],
  },
  {
    id: "mid-autumn",
    name: "Fiesta de mediados de otoño",
    blurb: "Luna, vapor y sésamo. Asia oriental se sienta a compartir.",
    accent: "gold",
    month: 9,
    start: 20,
    end: 30,
    regions: ["asia-este"],
  },
  {
    id: "oktoberfest",
    name: "Oktoberfest",
    blurb: "Cerdo, col y cerveza. El asado pide agrio al lado.",
    accent: "gold",
    month: 9,
    start: 15,
    endMonth: 10,
    end: 10,
    countries: ["Alemania", "Austria"],
    families: ["frito", "estofado"],
  },
  {
    id: "muertos",
    name: "Día de muertos",
    blurb: "Mole, pan y cempasúchil. Se cocina para los que vuelven.",
    accent: "chile",
    month: 10,
    start: 28,
    endMonth: 11,
    end: 3,
    countries: ["México"],
    families: ["estofado", "pan"],
  },
  {
    id: "thanksgiving",
    name: "Acción de gracias",
    blurb: "Horno, salsa y mesa larga. El consuelo se sirve en fuente.",
    accent: "gold",
    month: 11,
    start: 22,
    end: 29,
    countries: ["Estados Unidos", "Canadá"],
    moods: ["consuelo"],
  },
  {
    id: "velitas",
    name: "Día de las velitas",
    blurb: "Colombia enciende diciembre. Tamal, natilla, olla dulce.",
    accent: "gold",
    month: 12,
    start: 6,
    end: 8,
    countries: ["Colombia"],
  },
  {
    id: "navidad",
    name: "Navidad",
    blurb: "El año se cierra con horno, masa y un plato que se espera todo el mes.",
    accent: "chile",
    month: 12,
    start: 12,
    end: 26,
    moods: ["fiesta", "consuelo"],
    families: ["estofado", "pan", "brasa"],
    countries: ["México", "Italia", "Colombia", "Perú", "Filipinas", "Reino Unido"],
  },
];

function inWindow(date: Date, rule: FestivalRule) {
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const endMonth = rule.endMonth ?? rule.month;
  if (rule.month === endMonth) {
    return month === rule.month && day >= rule.start && day <= rule.end;
  }
  if (rule.month > endMonth) {
    return (month === rule.month && day >= rule.start) || (month === endMonth && day <= rule.end);
  }
  return (
    (month === rule.month && day >= rule.start) ||
    (month === endMonth && day <= rule.end) ||
    (month > rule.month && month < endMonth)
  );
}

function weekdayTable(date: Date): Festival | null {
  const day = date.getDay();
  if (day === 0) {
    return {
      id: "domingo",
      name: "Olla de domingo",
      blurb: "Fuego bajo, tapa entreabierta. El domingo pide caldo o estofado.",
      accent: "gold",
      families: ["estofado", "caldo"],
      moods: ["consuelo"],
    };
  }
  if (day === 5) {
    return {
      id: "viernes",
      name: "Viernes de mar",
      blurb: "Pescado, limón y plancha. El viernes huele a puerto.",
      accent: "leaf",
      tags: ["pescado", "mar", "camaron", "bacalao"],
      families: ["caldo"],
    };
  }
  if (day === 6) {
    return {
      id: "sabado",
      name: "Sábado de brasa",
      blurb: "Carbón, piel y humo. El fin de semana se oye en la parrilla.",
      accent: "chile",
      families: ["brasa"],
      moods: ["fiesta"],
    };
  }
  return null;
}

export function currentFestivals(date = new Date()): Festival[] {
  const hits = CALENDAR.filter((rule) => inWindow(date, rule));
  const table = weekdayTable(date);
  const list = table ? [...hits, table] : hits;
  if (list.length > 0) return list;
  const month = date.getMonth() + 1;
  if (month === 12 || month <= 2) {
    return [
      {
        id: "invierno",
        name: "Mesa de invierno",
        blurb: "Cuchara, nata y tiempo. El frío se responde con olla.",
        accent: "gold",
        families: ["estofado", "caldo"],
        moods: ["consuelo"],
      },
    ];
  }
  if (month >= 6 && month <= 8) {
    return [
      {
        id: "verano",
        name: "Mesa de verano",
        blurb: "Crudo, hierba y brasa corta. El calor pide ácido.",
        accent: "leaf",
        families: ["crudo", "brasa"],
        moods: ["ligero", "fiesta"],
      },
    ];
  }
  return [
    {
      id: "cosecha",
      name: "Cosecha",
      blurb: "Maíz, estofado y especias. El año se come en su punto.",
      accent: "chile",
      families: ["maiz", "estofado", "curry"],
    },
  ];
}

export function matchesFestival(recipe: Recipe, festival: Festival) {
  if (festival.slugs?.includes(recipe.slug)) return true;
  if (festival.countries?.includes(recipe.country)) return true;
  if (festival.regions?.includes(recipe.regionId)) return true;
  if (festival.families?.includes(recipe.familyId)) return true;
  if (festival.tags?.some((tag) => recipe.tags.includes(tag) || recipe.slug.includes(tag))) return true;
  if (festival.moods?.some((mood) => recipe.moods.includes(mood)) && (festival.families || festival.countries)) {
    return festival.moods.some((mood) => recipe.moods.includes(mood));
  }
  if (!festival.countries && !festival.regions && !festival.families && !festival.tags && !festival.slugs) {
    return festival.moods?.some((mood) => recipe.moods.includes(mood)) ?? false;
  }
  return false;
}

export function festivalRecipes(festival: Festival, seed: number, limit = 6) {
  const pool = RECIPES.filter((recipe) => matchesFestival(recipe, festival));
  const source = pool.length >= 3 ? pool : RECIPES;
  return shuffleCopy(source, seed).slice(0, limit);
}

export function suggestFeatured(seed: number, date = new Date()) {
  const [first] = currentFestivals(date);
  const pool = first ? RECIPES.filter((recipe) => matchesFestival(recipe, first)) : RECIPES;
  const source = pool.length > 0 ? pool : RECIPES;
  return pickAt(source, seed) ?? RECIPES[0]!;
}
