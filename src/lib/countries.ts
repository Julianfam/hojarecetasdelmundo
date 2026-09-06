import { FLAVORS, PANTRY_GROUPS, RECIPES, REGIONS } from "./recipes";
import type { FlavorId, Recipe, RegionId } from "./recipe-types";

const VOICE: Record<string, string> = {
  Italia: "Tomate, trigo y grasa noble. El fuego es corto; el producto, largo.",
  China: "Wok, vapor y umami. El corte vale tanto como la salsa.",
  "Estados Unidos": "Humo, sartén profunda y exceso deliberado. La fiesta cabe en un plato.",
  India: "Especias en capas, no en polvo. El tadka es el último acorde.",
  Japón: "Caldo, estación y silencio. El punto se oye al morder.",
  Tailandia: "Picante, ácido, salado, dulce: los cuatro a la vez, sin pedir permiso.",
  Líbano: "Mezze, limón y carbón. Se come con pan y con la mano.",
  "Corea del Sur": "Fermento, picante y sesión larga. El banchan es el país entero.",
  Francia: "Mantequilla, vino y paciencia. La salsa no se improvisa.",
  Grecia: "Aceite, orégano y brasa. El mar está cerca aunque no se vea.",
  España: "Aceite, ajo y sobremesa. El fuego bajo es una opinión nacional.",
  México: "Maíz, chile y ácido. Nada se sirve sin su contrapunto.",
  Perú: "Mar, andes y limón. El ceviche es reloj; el ají, territorio.",
  Indonesia: "Coco, rempah y brasa. El rendang enseña a esperar.",
  Vietnam: "Hierba, caldo y crujiente. Se arma en la mesa, no en la cocina.",
  Argentina: "Brasa y milanesa. El fuego es social; el plato, un pretexto.",
  Cuba: "Sofrito, cerdo y tiempo. El plátano endulza lo que el ajo abre.",
  Etiopía: "Berbere, injera y mano. El picante se come en comunidad.",
  Filipinas: "Agrío, adobo y fiesta. El vinagre es la brújula.",
  Irán: "Azafrán, hierba y granada. El arroz se trata como joya.",
  Marruecos: "Ras el hanout, cuscús y tagine. El perfume llega antes que el plato.",
  Nigeria: "Aceite de palma, estofado y arroz. El jollof no admite tibieza.",
  Portugal: "Bacalao, ajo y mar. El horno huele a domingo.",
  "Reino Unido": "Humo, masa y consuelo. El frío se responde con gravy.",
  Turquía: "Carbón, yogur y pan. El kebab es oficio, no adorno.",
  Alemania: "Cerdo, col y cerveza. El asado pide agrio al lado.",
  Brasil: "Dendê, feijão y brasa. El trópico se come con cuchara.",
  Camerún: "Plátano, maní y fuego lento. El ndolé es bosque en el plato.",
  Chile: "Mar, choclo y merquén. El horno del sur no tiene prisa.",
  Colombia: "Sopa, maíz y aguacate. El almuerzo es un territorio.",
  Ghana: "Fufu, sopa y picante. Se come con la mano y sin prisa.",
  Hungría: "Pimentón, estofado y nata. El rojo no es adorno: es el plato.",
  Jamaica: "Allspice, Scotch bonnet y humo. El jerk se oye en la piel.",
  Malasia: "Coco, sambal y calle. El desayuno ya viene con chile.",
  Palestina: "Za'atar, aceite y horno. El pan es el plato y la mesa.",
  Polonia: "Masa, caldo y invierno. El relleno es un secreto caliente.",
  "Puerto Rico": "Sofrito, plátano y cerdo. El sofrito es la bandera que se come.",
  Rusia: "Caldo, masa y nata. El frío se responde con cuchara.",
  Senegal: "Pescado, arroz y tamarindo. El thieb es el país en una olla.",
  "Sudáfrica": "Especias, horno y braai. La mesa mezcla océanos.",
  "Trinidad y Tobago": "Curry, pan y calle. El doubles se come de pie.",
  Angola: "Yuca, palma y mar. El muamba es rojo y lento.",
  Austria: "Mantequilla, empanado y horno. El crujiente es un derecho.",
  Camboya: "Kroeung, coco y vapor. El amok se sirve en hoja.",
  Canadá: "Frío, gravy y queso. La poutine no pide disculpas.",
  "Costa Rica": "Frijol, arroz y mañana. El gallo pinto es el día entero.",
  Dinamarca: "Pan, mantequilla y mar. El smørrebrød es arquitectura.",
  Ecuador: "Maíz, ají y sierra. La humita cabe en la mano.",
  Egipto: "Lenteja, arroz y comino. El koshari es el caos ordenado.",
  "El Salvador": "Maíz, frijol y quesillo. La pupusa se cierra sobre un secreto.",
  Guatemala: "Pepita, chile y milpa. El pepián es mole del altiplano.",
  Guyana: "Cassareep, pimienta y olla. El pepperpot dura días.",
  Irlanda: "Cordero, papa y caldo. El estofado es el clima.",
  Israel: "Tahini, huevo y pan. La calle cabe en un pita.",
  Jordania: "Cordero, yogur y arroz. El mansaf se comparte sin cubiertos.",
  Kenia: "Brasa, nyama y ugali. El fuego es el restaurante.",
  Laos: "Hierba, sticky rice y lima. El larb se come fresco y picante.",
  Malí: "Maní, tomate y estofado. El maafe es cuchara y sombra.",
  Mozambique: "Piri-piri, coco y brasa. El picante es el mar.",
  Nicaragua: "Maíz, naranja agria y hoja. El vigorón sabe a mercado.",
  "República Dominicana": "Plátano, habichuela y pollo. El almuerzo tiene tres colores.",
  Singapur: "Calle, chile y caldo. El plato cambia de idioma en cada puesto.",
  Siria: "Granada, nuez y carbón. El kebab se perfumea antes de doler.",
  Suecia: "Nata, eneldo y consuelo. El invierno se come con cuchara.",
  Suiza: "Queso, fuego y montaña. Se come del mismo pote.",
  Taiwán: "Caldo, trigo y noche. El niú ròu miàn es un abrazo largo.",
  Túnez: "Harissa, brik y aceite. El picante entra crujiente.",
  Ucrania: "Remolacha, eneldo y nata. El borscht es el color del invierno.",
  Uganda: "Plátano, estofado y vapor. El matoke es el día.",
  Uruguay: "Brasa, milanesa y mediodía. El chivito no cabe en un bocado.",
};

const CONTRAST: Record<string, string> = {
  México: "A diferencia del Perú, el maíz aquí es nixtamal y el ácido es lima, no limón reloj.",
  Perú: "A diferencia de México, el choclo no se nixtamaliza: el limón marca el minuto del pescado.",
  Argentina: "A diferencia de México, el fuego es social y la milanesa no pide salsa: pide chimichurri.",
  Brasil: "A diferencia de Argentina, el trópico se come con cuchara: dendê, feijão, dendê otra vez.",
  Chile: "A diferencia de Perú, el mar se hornea y el merquén ahumado sustituye al ají fresco.",
  Colombia: "A diferencia de México, el almuerzo es sopa y aguacate, no taco: el territorio cabe en un plato hondo.",
  "Costa Rica": "A diferencia de México, el día empieza en el pinto: frijol y arroz, no chile.",
  Ecuador: "A diferencia de Perú, la sierra envuelve el maíz en hoja y lo come con la mano.",
  "El Salvador": "A diferencia de México, la tortilla se cierra: la pupusa es un secreto, no un escenario.",
  Guatemala: "A diferencia de México, el mole del altiplano se llama pepián y la pepita manda.",
  Uruguay: "A diferencia de Argentina, el mediodía cabe en un chivito: todo el asado en un pan.",
  Cuba: "A diferencia de México, el sofrito es tierno y el plátano endulza el cerdo, no el chile.",
  Jamaica: "A diferencia de Cuba, el fuego es humo de pimento y el picante entra por la piel.",
  "Puerto Rico": "A diferencia de Cuba, el sofrito es recao y ají dulce: la bandera se sofríe.",
  "Trinidad y Tobago": "A diferencia de Jamaica, el picante viaja en curry y el pan se come de pie.",
  Guyana: "A diferencia del Caribe hispano, el cassareep oscurece la olla durante días.",
  Nicaragua: "A diferencia de México, la naranja agria abre la carne y el maíz se sirve con yuca.",
  "República Dominicana": "A diferencia de Cuba, el almuerzo tiene tres colores: plátano, habichuela, pollo.",
  "Estados Unidos": "A diferencia de México, el exceso es el punto: humo, sartén profunda, gravy.",
  Canadá: "A diferencia de Estados Unidos, el consuelo es queso chirriante y papas, no brasa.",
  China: "A diferencia de Japón, el wok no espera: el corte y el fuego alto son la receta.",
  Japón: "A diferencia de China, el caldo se espera y el plato no se disfraza.",
  "Corea del Sur": "A diferencia de Japón, el fermento y el picante ocupan toda la mesa: banchan.",
  Taiwán: "A diferencia de China continental, el caldo de res es un abrazo nocturno, no un banquete.",
  India: "A diferencia de Tailandia, las especias se tuestan en capas; el tadka es el último acorde.",
  Tailandia: "A diferencia de India, los cuatro sabores pegan a la vez: no hay curry que espere.",
  Indonesia: "A diferencia de Tailandia, el coco se espera horas: el rendang enseña paciencia.",
  Vietnam: "A diferencia de Tailandia, las hierbas se suman crudas en la mesa, no en el wok.",
  Filipinas: "A diferencia de Indonesia, el vinagre es la brújula: agrío antes que coco.",
  Malasia: "A diferencia de Tailandia, el desayuno ya trae sambal: la calle no espera el almuerzo.",
  Camboya: "A diferencia de Tailandia, el kroeung se cuece al vapor en hoja, no se saltea.",
  Laos: "A diferencia de Tailandia, el sticky rice es cubierto y el larb se come fresco.",
  Singapur: "A diferencia de Malasia, cada puesto cambia de idioma: el plato es la ciudad.",
  Irán: "A diferencia de Turquía, el arroz es joya y el azafrán manda sobre el carbón.",
  Turquía: "A diferencia del Líbano, el kebab es oficio de carbón y el yogur es el plato.",
  Palestina: "A diferencia de Israel, el za'atar y el pan de horno son el país, no el relleno.",
  Israel: "A diferencia del Líbano, la calle cabe en un pita: tahini, huevo, prisa.",
  Jordania: "A diferencia de Turquía, el mansaf se comparte con la mano y el yogur es el caldo.",
  Siria: "A diferencia de Turquía, la granada y la nuez perfumean el kebab antes del fuego.",
  Italia: "A diferencia de Francia, el fuego es corto y el tomate no se esconde en la salsa.",
  Líbano: "A diferencia de Italia, se come con pan y con la mano: el mezze es el menú.",
  Grecia: "A diferencia de Italia, el orégano y la brasa mandan; el queso se grilla, no se funde.",
  España: "A diferencia de Italia, el aceite y el ajo son la receta; la sobremesa es el plato.",
  Túnez: "A diferencia de España, la harissa entra crujiente: el picante es el desayuno.",
  Francia: "A diferencia de Italia, la salsa se construye; la mantequilla no se disculpa.",
  Portugal: "A diferencia de España, el bacalao es domingo y el horno huele a ajo y mar.",
  "Reino Unido": "A diferencia de Francia, el frío se responde con gravy, no con vino.",
  Alemania: "A diferencia de Francia, el asado pide col agria y cerveza, no reducción.",
  Hungría: "A diferencia de Alemania, el pimentón es el plato: rojo, estofado, nata.",
  Polonia: "A diferencia de Alemania, el invierno se esconde en un dumpling.",
  Rusia: "A diferencia de Polonia, el caldo es el país y la nata cierra el frío.",
  Austria: "A diferencia de Alemania, el empanado es un derecho y la mantequilla manda.",
  Dinamarca: "A diferencia del Reino Unido, el pan se arquitecta: mantequilla, mar, silencio.",
  Irlanda: "A diferencia del Reino Unido, el clima se come: cordero, papa, caldo.",
  Suecia: "A diferencia de Dinamarca, el invierno pide nata y eneldo, no solo pan.",
  Suiza: "A diferencia de Francia, se come del mismo pote: queso, fuego, montaña.",
  Ucrania: "A diferencia de Rusia, el invierno es rojo de remolacha, no solo nata.",
  Etiopía: "A diferencia de Nigeria, el pan es injera y el picante se come en comunidad.",
  Marruecos: "A diferencia de España, el perfume llega antes: ras el hanout, tagine, cuscús.",
  Nigeria: "A diferencia de Etiopía, el jollof no admite tibieza: palma, arroz, orgullo.",
  Camerún: "A diferencia de Nigeria, el ndolé es bosque: plátano, maní, amargo.",
  Ghana: "A diferencia de Nigeria, el fufu es el cubierto: se come con la mano.",
  Senegal: "A diferencia de Nigeria, el pescado y el tamarindo mandan el arroz.",
  "Sudáfrica": "A diferencia de Nigeria, la mesa mezcla océanos: especias, horno, braai.",
  Angola: "A diferencia de Brasil, la palma encuentra la yuca y el mar en el muamba.",
  Egipto: "A diferencia de Marruecos, el caos se ordena en un plato: koshari.",
  Kenia: "A diferencia de Etiopía, el restaurante es el fuego: nyama, ugali, brasa.",
  Malí: "A diferencia de Nigeria, el maafe es sombra y maní, no palma.",
  Mozambique: "A diferencia de Portugal, el piri-piri se casa con coco y brasa.",
  Uganda: "A diferencia de Kenia, el día es plátano al vapor, no solo brasa.",
};

const SIGNATURE: Record<string, string[]> = {
  México: ["Maíz", "Chile", "Lima"],
  Perú: ["Limón", "Ají", "Pescado"],
  Argentina: ["Res", "Chimichurri", "Brasa"],
  Brasil: ["Frijol", "Dendê", "Cerdo"],
  Chile: ["Mar", "Choclo", "Merquén"],
  Colombia: ["Maíz", "Papa", "Aguacate"],
  Cuba: ["Cerdo", "Plátano", "Sofrito"],
  Jamaica: ["Pollo", "Allspice", "Humo"],
  "Puerto Rico": ["Plátano", "Cerdo", "Sofrito"],
  "Estados Unidos": ["Res", "Humo", "Papa"],
  China: ["Soya", "Wok", "Jengibre"],
  Japón: ["Caldo", "Soya", "Trigo"],
  "Corea del Sur": ["Chile", "Fermento", "Cerdo"],
  India: ["Especias", "Ghee", "Yogur"],
  Tailandia: ["Lima", "Chile", "Pescado"],
  Indonesia: ["Coco", "Rempah", "Res"],
  Vietnam: ["Hierba", "Caldo", "Fideos"],
  Filipinas: ["Vinagre", "Ajo", "Cerdo"],
  Irán: ["Azafrán", "Arroz", "Granada"],
  Turquía: ["Cordero", "Yogur", "Pan"],
  Líbano: ["Tahini", "Limón", "Pan"],
  Italia: ["Tomate", "Trigo", "Aceite"],
  Grecia: ["Aceite", "Orégano", "Brasa"],
  España: ["Aceite", "Ajo", "Arroz"],
  Francia: ["Mantequilla", "Vino", "Caldo"],
  Etiopía: ["Berbere", "Injera", "Mano"],
  Marruecos: ["Cuscús", "Cordero", "Especias"],
  Nigeria: ["Arroz", "Palma", "Tomate"],
};

export function countrySlug(name: string) {
  return name
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export interface CountryKitchen {
  name: string;
  slug: string;
  blurb: string;
  contrast: string;
  count: number;
  cover: string;
  regionId: RegionId;
  regionLabel: string;
  flavors: FlavorId[];
  signatures: string[];
  recipes: Recipe[];
}

function pantryLabel(key: string) {
  for (const group of PANTRY_GROUPS) {
    const hit = group.keys.find((k) => k.key === key);
    if (hit) return hit.label;
  }
  return key;
}

function topFlavors(recipes: Recipe[], limit = 3): FlavorId[] {
  const tally = new Map<FlavorId, number>();
  for (const r of recipes) {
    for (const f of r.flavors) tally.set(f, (tally.get(f) ?? 0) + 1);
  }
  return [...tally.entries()]
    .sort((a, b) => b[1] - a[1])
    .slice(0, limit)
    .map(([id]) => id);
}

function topSignatures(name: string, recipes: Recipe[]): string[] {
  const curated = SIGNATURE[name];
  if (curated) return curated;
  const tally = new Map<string, number>();
  for (const recipe of recipes) {
    for (const ing of recipe.ingredients) {
      tally.set(ing.key, (tally.get(ing.key) ?? 0) + 1);
    }
  }
  return [...tally.entries()]
    .sort((a, b) => b[1] - a[1])
    .slice(0, 3)
    .map(([key]) => pantryLabel(key));
}

export function countryKitchens(): CountryKitchen[] {
  const map = new Map<string, Recipe[]>();
  for (const recipe of RECIPES) {
    const list = map.get(recipe.country);
    if (list) list.push(recipe);
    else map.set(recipe.country, [recipe]);
  }

  const regionRank = new Map(REGIONS.map((r, i) => [r.id, i]));

  return [...map.entries()]
    .map(([name, recipes]) => {
      const regionId = recipes[0]!.regionId;
      return {
        name,
        slug: countrySlug(name),
        blurb: VOICE[name] ?? `Cocina de ${name}: el viaje entra por este plato.`,
        contrast: CONTRAST[name] ?? `Cocina de ${name}, con acento propio en esta mesa.`,
        count: recipes.length,
        cover: recipes[0]!.image,
        regionId,
        regionLabel: REGIONS.find((r) => r.id === regionId)?.label ?? "",
        flavors: topFlavors(recipes),
        signatures: topSignatures(name, recipes),
        recipes: [...recipes].sort((a, b) => a.name.localeCompare(b.name, "es")),
      };
    })
    .sort((a, b) => {
      const ra = regionRank.get(a.regionId) ?? 99;
      const rb = regionRank.get(b.regionId) ?? 99;
      if (ra !== rb) return ra - rb;
      if (b.count !== a.count) return b.count - a.count;
      return a.name.localeCompare(b.name, "es");
    });
}

const KITCHENS = countryKitchens();
const BY_NAME = new Map(KITCHENS.map((k) => [k.name, k]));
const BY_SLUG = new Map(KITCHENS.map((k) => [k.slug, k]));

export function getCountry(name: string) {
  return BY_NAME.get(name);
}

export function getCountryBySlug(slug: string) {
  return BY_SLUG.get(slug);
}

export function countryStops(name: string) {
  return [...(BY_NAME.get(name)?.recipes ?? [])];
}

export function countryTour(slug: string) {
  const index = KITCHENS.findIndex((k) => k.slug === slug);
  return {
    index,
    total: KITCHENS.length,
    prev: index > 0 ? KITCHENS[index - 1] : undefined,
    next: index >= 0 && index < KITCHENS.length - 1 ? KITCHENS[index + 1] : undefined,
    list: KITCHENS,
  };
}

export function kitchensInRegion(regionId: RegionId) {
  return KITCHENS.filter((k) => k.regionId === regionId);
}

export function neighborsOf(name: string, limit = 6) {
  const kitchen = BY_NAME.get(name);
  if (!kitchen) return [];
  return KITCHENS.filter((k) => k.regionId === kitchen.regionId && k.name !== name).slice(0, limit);
}

export function flavorLabel(id: FlavorId) {
  return FLAVORS.find((f) => f.id === id)?.label ?? id;
}

export function groupRecipesByCountry(recipes: Recipe[]) {
  const order: string[] = [];
  const map = new Map<string, Recipe[]>();
  for (const recipe of recipes) {
    const list = map.get(recipe.country);
    if (list) list.push(recipe);
    else {
      map.set(recipe.country, [recipe]);
      order.push(recipe.country);
    }
  }
  const regionRank = new Map(REGIONS.map((r, i) => [r.id, i]));
  return order
    .map((name) => {
      const kitchen = BY_NAME.get(name);
      const list = map.get(name) ?? [];
      return {
        kitchen,
        name,
        recipes: list,
      };
    })
    .sort((a, b) => {
      const ra = regionRank.get(a.recipes[0]?.regionId ?? "europa") ?? 99;
      const rb = regionRank.get(b.recipes[0]?.regionId ?? "europa") ?? 99;
      if (ra !== rb) return ra - rb;
      return a.name.localeCompare(b.name, "es");
    });
}