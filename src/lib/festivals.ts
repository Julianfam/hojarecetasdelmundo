import type { FamilyId, MoodId, Recipe, RegionId } from "./recipe-types";
import { RECIPES } from "./recipes";
import { dailySeed, dayOfYear, hashString, pickAt, shuffleCopy, withoutSlugs } from "./shuffle";
import type { SwatchId } from "./swatch";

export type FestivalAccent = SwatchId;

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
    accent: "queso",
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
    accent: "naranja",
    month: 1,
    start: 5,
    end: 7,
    countries: ["México", "España", "Francia"],
    families: ["pan", "postre"],
  },
  {
    id: "lunar",
    name: "Año nuevo lunar",
    blurb: "Dumplings, pato, caldo largo. La mesa pide reunirse.",
    accent: "rojo",
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
    accent: "mora",
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
    accent: "rojo",
    month: 2,
    start: 12,
    end: 15,
    moods: ["impresionar"],
    families: ["estofado", "postre"],
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
    accent: "rojo",
    month: 5,
    start: 3,
    end: 6,
    countries: ["México"],
  },
  {
    id: "madre",
    name: "Día de la madre",
    blurb: "El almuerzo largo. Un estofado o un arroz que se espera.",
    accent: "mora",
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
    accent: "naranja",
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
    accent: "rojo",
    month: 7,
    start: 18,
    end: 21,
    countries: ["Colombia"],
  },
  {
    id: "peru",
    name: "Fiestas patrias del Perú",
    blurb: "Mar, andes y limón. El ceviche marca el minuto.",
    accent: "naranja",
    month: 7,
    start: 26,
    end: 29,
    countries: ["Perú"],
  },
  {
    id: "boyaca",
    name: "Batalla de Boyacá",
    blurb: "Otra vez Colombia a la mesa: ajiaco, sancocho, arepa.",
    accent: "queso",
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
    accent: "rojo",
    month: 9,
    start: 14,
    end: 17,
    countries: ["México"],
  },
  {
    id: "chile",
    name: "Fiestas patrias de Chile",
    blurb: "Asado, choclo y merquén. El dieciocho se huele a dos calles.",
    accent: "rojo",
    month: 9,
    start: 16,
    end: 20,
    countries: ["Chile"],
  },
  {
    id: "hispana",
    name: "Herencia hispana",
    blurb: "Un mes para cruzar el océano en el plato: maíz, ajo, sofrito.",
    accent: "naranja",
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
    accent: "queso",
    month: 9,
    start: 20,
    end: 30,
    regions: ["asia-este"],
  },
  {
    id: "oktoberfest",
    name: "Oktoberfest",
    blurb: "Cerdo, col y cerveza. El asado pide agrio al lado.",
    accent: "naranja",
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
    accent: "mora",
    month: 10,
    start: 28,
    endMonth: 11,
    end: 3,
    countries: ["México"],
    families: ["estofado", "pan", "postre"],
  },
  {
    id: "thanksgiving",
    name: "Acción de gracias",
    blurb: "Horno, salsa y mesa larga. El consuelo se sirve en fuente.",
    accent: "naranja",
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
    accent: "queso",
    month: 12,
    start: 6,
    end: 8,
    countries: ["Colombia"],
  },
  {
    id: "navidad",
    name: "Navidad",
    blurb: "El año se cierra con horno, masa y un plato que se espera todo el mes.",
    accent: "rojo",
    month: 12,
    start: 12,
    end: 26,
    moods: ["fiesta", "consuelo"],
    families: ["estofado", "pan", "brasa", "postre"],
    countries: ["México", "Italia", "Colombia", "Perú", "Filipinas", "Reino Unido"],
  },
];

const DAILY: Festival[] = [
  { id: "dia-caldo", name: "Día del caldo", blurb: "Cuchara, vapor, un hueso que trabajó toda la noche.", accent: "queso", families: ["caldo"] },
  { id: "dia-maiz", name: "Día del maíz", blurb: "Tortilla, arepa, tamal. El grano que sostiene un continente.", accent: "queso", families: ["maiz"] },
  { id: "dia-fuego", name: "Día del fuego", blurb: "Carbón, piel y humo. Hoy se come lo que se oye chisporrotear.", accent: "naranja", families: ["brasa"] },
  { id: "dia-pan", name: "Día del pan", blurb: "Corteza, miga, algo que se abre con la mano.", accent: "naranja", families: ["pan"] },
  { id: "dia-mar", name: "Día del mar", blurb: "Limón, hielo y puerto. El pescado manda la mesa.", accent: "leaf", tags: ["pescado", "mar", "camaron"] },
  { id: "dia-arroz", name: "Día del arroz", blurb: "Un grano, mil países. Hoy el plato es una cuchara de vapor.", accent: "leaf", families: ["arroz"] },
  { id: "dia-chile", name: "Día del chile", blurb: "Ají, fuego, contrapunto. Nada se sirve sin un poco de incendio.", accent: "rojo", tags: ["chile", "picante"] },
  { id: "dia-cacao", name: "Día del cacao", blurb: "Chocolate, mole, taza espesa. El grano que también es salsa.", accent: "wine", tags: ["chocolate", "cacao"], families: ["postre", "bebida"] },
  { id: "dia-huevo", name: "Día del huevo", blurb: "Yema blanda, sartén, desayuno que se queda de almuerzo.", accent: "queso", families: ["desayuno"], tags: ["huevo"] },
  { id: "dia-hierba", name: "Día de la hierba", blurb: "Cilantro, menta, albahaca. El plato se huele antes de verse.", accent: "leaf", tags: ["cilantro", "menta", "hierba"] },
  { id: "dia-estofado", name: "Día de la olla", blurb: "Tapa entreabierta, tiempo. El domingo cabe en un lunes.", accent: "wine", families: ["estofado"] },
  { id: "dia-fideos", name: "Día del fideo", blurb: "Caldo, wok o huevo. El trigo largo da la vuelta al mundo.", accent: "naranja", families: ["fideo"] },
  { id: "dia-frito", name: "Día de la fritura", blurb: "Aceite a punto, crujiente, se come de pie.", accent: "naranja", families: ["frito"] },
  { id: "dia-curry", name: "Día del curry", blurb: "Especia, coco, cuchara. El sur de Asia manda hoy.", accent: "mora", families: ["curry"] },
  { id: "dia-crudo", name: "Día de lo crudo", blurb: "Ácido, frío, cuchillo. Nada pasa por el fuego.", accent: "leaf", families: ["crudo"] },
  { id: "dia-empanada", name: "Día de la empanada", blurb: "El mundo cabe en un pliegue. Horneada, frita, al vapor.", accent: "rojo", families: ["empanada"] },
  { id: "dia-postre", name: "Día del postre", blurb: "Azúcar, nata, un final que se adelanta.", accent: "mora", families: ["postre"] },
  { id: "dia-vaso", name: "Día del vaso", blurb: "Té, café, algo que se bebe con las dos manos.", accent: "queso", families: ["bebida"] },
  { id: "dia-desayuno", name: "Día del desayuno", blurb: "La primera mesa. Huevo, pan, lo que abre el día.", accent: "naranja", families: ["desayuno"] },
  { id: "dia-cerdo", name: "Día del cerdo", blurb: "Piel, grasa, un corte que pide fuego.", accent: "rojo", tags: ["cerdo"] },
  { id: "dia-cordero", name: "Día del cordero", blurb: "Humo, especias, un asado que se espera.", accent: "wine", tags: ["cordero"] },
  { id: "dia-frijol", name: "Día del frijol", blurb: "Olla, tiempo, el grano que llena sin pedir lujo.", accent: "leaf", tags: ["frijol", "lenteja", "garbanzo"] },
  { id: "dia-coco", name: "Día del coco", blurb: "Leche, ralladura, trópico en una cuchara.", accent: "queso", tags: ["coco"] },
  { id: "dia-limon", name: "Día del limón", blurb: "Ácido que despierta. Ceviche, té, un golpe al final.", accent: "leaf", tags: ["limon", "lima", "citrico"] },
  { id: "dia-queso", name: "Día del queso", blurb: "Fondo, gratinado, un hilo que se estira.", accent: "queso", tags: ["queso"] },
  { id: "dia-cafe", name: "Día del café", blurb: "Tueste, olla, una taza que abre o cierra la mesa.", accent: "wine", tags: ["cafe"], families: ["bebida"] },
  { id: "dia-te", name: "Día del té", blurb: "Hoja, vapor, un vaso que se sirve de alto.", accent: "leaf", tags: ["te"], families: ["bebida"] },
  { id: "dia-fiesta", name: "Día de mesa larga", blurb: "Ruido, salsa, un plato que se reparte.", accent: "rojo", moods: ["fiesta"] },
  { id: "dia-consuelo", name: "Día de consuelo", blurb: "Manta, caldo, lo que se come cuando el día pide abrigo.", accent: "mora", moods: ["consuelo"] },
  { id: "dia-ligero", name: "Día ligero", blurb: "Hierba, crudo, un plato que no pesa.", accent: "naranja", moods: ["ligero"] },
  { id: "dia-gala", name: "Día de gala", blurb: "Técnica, tiempo, un plato para impresionar.", accent: "mora", moods: ["impresionar"] },
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

function weekdayTable(date: Date): Festival {
  const day = date.getDay();
  if (day === 0) {
    return {
      id: "domingo",
      name: "Olla de domingo",
      blurb: "Fuego bajo, tapa entreabierta. El domingo pide caldo o estofado.",
      accent: "queso",
      families: ["estofado", "caldo"],
      moods: ["consuelo"],
    };
  }
  if (day === 1) {
    return {
      id: "lunes",
      name: "Lunes de fideos",
      blurb: "El arranque pide caldo y trigo largo. Una olla que ordena la semana.",
      accent: "naranja",
      families: ["fideo", "caldo"],
    };
  }
  if (day === 2) {
    return {
      id: "martes",
      name: "Martes de maíz",
      blurb: "Arepa, tortilla, tamal. El martes se come con las manos.",
      accent: "queso",
      families: ["maiz", "empanada"],
    };
  }
  if (day === 3) {
    return {
      id: "miercoles",
      name: "Miércoles de mar",
      blurb: "Mitad de semana, limón y puerto. El pescado aligera el fuego.",
      accent: "leaf",
      tags: ["pescado", "mar", "camaron"],
      families: ["crudo", "caldo"],
    };
  }
  if (day === 4) {
    return {
      id: "jueves",
      name: "Jueves de curry",
      blurb: "Especia y cuchara. El jueves se abre al sur de Asia.",
      accent: "mora",
      families: ["curry", "arroz"],
    };
  }
  if (day === 5) {
    return {
      id: "viernes",
      name: "Viernes de brasa",
      blurb: "Se enciende el fin. Carbón, piel y un plato que se oye.",
      accent: "rojo",
      families: ["brasa", "frito"],
      moods: ["fiesta"],
    };
  }
  return {
    id: "sabado",
    name: "Sábado de fiesta",
    blurb: "Mesa larga, salsa, un plato que se reparte.",
    accent: "naranja",
    families: ["brasa", "frito", "maiz"],
    moods: ["fiesta"],
  };
}

function dailyMesa(date: Date): Festival {
  const list = DAILY;
  const pick = list[dayOfYear(date) % list.length]!;
  return pick;
}

export function currentFestivals(date = new Date()): Festival[] {
  const hits = CALENDAR.filter((rule) => inWindow(date, rule));
  const daily = dailyMesa(date);
  const week = weekdayTable(date);
  const seen = new Set<string>();
  const list: Festival[] = [];
  for (const fest of [...hits, daily, week]) {
    if (seen.has(fest.id)) continue;
    seen.add(fest.id);
    list.push(fest);
  }
  return list;
}

export function todaysTable(date = new Date()) {
  const all = currentFestivals(date);
  const lead = all[dayOfYear(date) % all.length] ?? all[0]!;
  return { lead, rest: all.filter((fest) => fest.id !== lead.id), all };
}

export function matchesFestival(recipe: Recipe, festival: Festival) {
  if (festival.slugs?.includes(recipe.slug)) return true;
  if (festival.countries?.includes(recipe.country)) return true;
  if (festival.regions?.includes(recipe.regionId)) return true;
  if (festival.families?.includes(recipe.familyId)) return true;
  if (festival.tags?.some((tag) => recipe.tags.includes(tag) || recipe.slug.includes(tag) || recipe.flavors.includes(tag as Recipe["flavors"][number]))) {
    return true;
  }
  if (festival.moods?.some((mood) => recipe.moods.includes(mood)) && (festival.families || festival.countries || festival.tags)) {
    return festival.moods.some((mood) => recipe.moods.includes(mood));
  }
  if (!festival.countries && !festival.regions && !festival.families && !festival.tags && !festival.slugs) {
    return festival.moods?.some((mood) => recipe.moods.includes(mood)) ?? false;
  }
  return false;
}

export function festivalRecipes(festival: Festival, seed: number, limit = 6, exclude: Iterable<string> = []) {
  const skip = new Set(exclude);
  const pool = withoutSlugs(
    RECIPES.filter((recipe) => matchesFestival(recipe, festival)),
    skip,
  );
  const source = pool.length >= 3 ? pool : withoutSlugs(RECIPES, skip);
  const mixed = seed ^ dailySeed() ^ hashString(festival.id);
  return shuffleCopy(source.length > 0 ? source : RECIPES, mixed).slice(0, limit);
}

export function suggestFeatured(seed: number, date = new Date(), exclude: Iterable<string> = []) {
  const { lead } = todaysTable(date);
  const skip = new Set(exclude);
  const pool = withoutSlugs(
    lead ? RECIPES.filter((recipe) => matchesFestival(recipe, lead)) : RECIPES,
    skip,
  );
  const source = pool.length > 0 ? pool : withoutSlugs(RECIPES, skip);
  const mixed = seed ^ dailySeed(date) ^ hashString(`featured:${lead.id}`);
  return pickAt(source.length > 0 ? source : RECIPES, mixed) ?? RECIPES[0]!;
}

export function dateStamp(date = new Date()) {
  return date.toLocaleDateString("es", { day: "numeric", month: "long" });
}
