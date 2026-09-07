import type {
  Difficulty,
  FamilyId,
  FlavorId,
  Ingredient,
  MoodId,
  RecipeSource,
  RegionId,
} from "./recipe-types";
import { pickDishImage } from "./dish-images";

export type AtlasSeed = [
  slug: string,
  name: string,
  local: string,
  country: string,
  city: string,
  region: RegionId,
  family: FamilyId,
  flavors: string,
  time: number,
  moods: string,
  ings: string,
  story: string,
];

const BASE: Record<FamilyId, Ingredient[]> = {
  empanada: [
    { item: "Harina o masa", amount: "300 g", key: "trigo" },
    { item: "Cebolla", amount: "1", key: "cebolla" },
  ],
  maiz: [
    { item: "Maíz o masa nixtamal", amount: "400 g", key: "maiz" },
    { item: "Cebolla", amount: "1", key: "cebolla" },
  ],
  caldo: [
    { item: "Cebolla", amount: "1", key: "cebolla" },
    { item: "Ajo", amount: "3 dientes", key: "ajo" },
  ],
  estofado: [
    { item: "Cebolla", amount: "2", key: "cebolla" },
    { item: "Ajo", amount: "4 dientes", key: "ajo" },
    { item: "Tomate", amount: "2", key: "tomate" },
  ],
  arroz: [
    { item: "Arroz", amount: "300 g", key: "arroz" },
    { item: "Cebolla", amount: "1", key: "cebolla" },
  ],
  fideo: [
    { item: "Fideos o pasta", amount: "300 g", key: "fideos" },
    { item: "Ajo", amount: "2 dientes", key: "ajo" },
  ],
  brasa: [
    { item: "Ajo", amount: "4 dientes", key: "ajo" },
    { item: "Limón", amount: "1", key: "limon" },
  ],
  curry: [
    { item: "Cebolla", amount: "2", key: "cebolla" },
    { item: "Ajo", amount: "3 dientes", key: "ajo" },
    { item: "Jengibre", amount: "1 trozo", key: "jengibre" },
  ],
  frito: [
    { item: "Aceite para freír", amount: "500 ml", key: "aceite" },
    { item: "Sal", amount: "al gusto", key: "sal" },
  ],
  pan: [
    { item: "Pan o harina", amount: "4 piezas", key: "trigo" },
  ],
  crudo: [
    { item: "Limón o lima", amount: "3", key: "limon" },
    { item: "Cilantro o hierba", amount: "un manojo", key: "cilantro" },
  ],
  desayuno: [
    { item: "Huevos", amount: "4", key: "huevo" },
  ],
  postre: [
    { item: "Azúcar", amount: "100 g", key: "azucar" },
  ],
  bebida: [
    { item: "Agua", amount: "800 ml", key: "agua" },
  ],
};

function parseFlavors(raw: string): FlavorId[] {
  const allowed = new Set<FlavorId>(["umami", "picante", "citrico", "ahumado", "herbal", "dulce", "cremoso", "fresco"]);
  const list = raw
    .split(",")
    .map((s) => s.trim())
    .filter((s): s is FlavorId => allowed.has(s as FlavorId));
  return list.length > 0 ? [...new Set(list)] : ["umami"];
}

function parseMoods(raw: string): MoodId[] {
  const allowed = new Set<MoodId>(["consuelo", "fiesta", "ligero", "impresionar"]);
  const list = raw
    .split(",")
    .map((s) => s.trim())
    .filter((s): s is MoodId => allowed.has(s as MoodId));
  return list.length > 0 ? [...new Set(list)] : ["consuelo"];
}

function parseIngs(raw: string): Ingredient[] {
  return raw.split(";").map((chunk) => {
    const [item, amount, key] = chunk.split("*").map((s) => s.trim());
    return { item: item || "Ingrediente", amount: amount || "al gusto", key: key || "sal" };
  });
}

function profileOf(flavors: FlavorId[], family: FamilyId): RecipeSource["profile"] {
  const has = (id: FlavorId) => flavors.includes(id);
  return {
    picante: has("picante") ? 7 : family === "curry" ? 5 : 2,
    umami: has("umami") ? 8 : has("ahumado") ? 6 : 4,
    acido: has("citrico") || has("fresco") ? 7 : 3,
    dulce: has("dulce") ? 7 : family === "postre" ? 8 : 2,
    grasa: has("cremoso") || family === "frito" || family === "brasa" ? 7 : 4,
    aroma: has("herbal") || has("ahumado") ? 8 : 5,
  };
}

function mergeIngs(family: FamilyId, extras: Ingredient[]): Ingredient[] {
  const seen = new Set(extras.map((i) => i.key + i.item));
  const base = (BASE[family] ?? []).filter((i) => !seen.has(i.key + i.item) && !extras.some((e) => e.key === i.key));
  return [...extras, ...base].slice(0, 8);
}

function stepsFor(family: FamilyId, name: string, country: string, city: string, hero: string, time: number): string[] {
  const wait = time >= 55 ? "Sin prisa: el tiempo es el ingrediente que no se compra." : "El punto llega antes de lo que crees: prueba y aparta.";
  switch (family) {
    case "caldo":
      return [
        `Cubre ${hero} con agua fría, cebolla y ajo. El fuego arranca manso, sin prisa de hervor.`,
        `Espuma. Baja a mínimo. ${time >= 50 ? "Tapa 40 minutos: el caldo se aclara solo." : "Cocina 20 minutos, tapado a medias."}`,
        `Prueba la sal. Un golpe de ácido o hierba. ${city} se oye en este punto.`,
        `Sirve hondo, humeante. ${name} no espera: se come cuando el vapor todavía escribe.`,
      ];
    case "estofado":
      return [
        `Dora ${hero}. Reserva. Sofríe cebolla y ajo hasta que huelan a casa.`,
        `Vuelve la carne. Líquido que cubra. Tapa. ${wait}`,
        `Prueba. Ajusta sal y un toque de ácido. La salsa debe napar, no nadar.`,
        `${name} se sirve con cuchara. ${country} cabe en un plato hondo.`,
      ];
    case "brasa":
      return [
        `Marina ${hero} con ajo, ácido y sal. El fuego pide tiempo en frío primero.`,
        `Brasa alta. No lo muevas hasta que suelte. La costra es el pasaporte.`,
        `Gira. ${time >= 40 ? "Fuego indirecto para el centro." : "Minutos cortos: el punto se oye."}`,
        `Reposa. Corta. ${name} se come con las manos o no es de esta calle.`,
      ];
    case "arroz":
      return [
        `Sofríe aromáticos. Suma ${hero}. Que se impregne antes del líquido.`,
        `Arroz. Agua o caldo. Tapa. ${wait}`,
        `Sin revolver al final. El grano se defiende solo.`,
        `Sirve. ${name} es ${city} medido en cucharas.`,
      ];
    case "fideo":
      return [
        `Agua con sal. Los fideos salen al dente, nunca blandos.`,
        `En sartén o wok, ${hero} y aromáticos a fuego alto.`,
        `Suma la pasta con un cucharón de agua. Emulsiona.`,
        `Plato hondo o bowl. ${name} no espera a que se enfríe.`,
      ];
    case "curry":
      return [
        `Tosta especias. Sofríe cebolla, ajo, jengibre. El curry nace aquí.`,
        `Suma ${hero}. Cubre con coco, tomate o yogur. ${wait}`,
        `Prueba: picante, ácido, salado, un fondo dulce. Los cuatro.`,
        `Arroz al lado. ${name} es ${country} sin disculpas.`,
      ];
    case "maiz":
      return [
        `Masa de maíz: sal, un hilo de grasa. Que no se raje al cerrar.`,
        `Relleno de ${hero}. Comal o hoja. El maíz pide calor seco.`,
        `Voltea cuando suelte. El punto es mancha, no quemadura.`,
        `Sirve con salsa y ácido. ${name} se come de pie o no es calle.`,
      ];
    case "empanada":
      return [
        `Masa elástica. Reposo. El relleno de ${hero} se enfría antes de cerrar.`,
        `Rellena, sella el borde. Si abre, ya no es secreto.`,
        `Horno o aceite. Dorado parejo.`,
        `${name} cabe en la mano. ${city} se muerde.`,
      ];
    case "frito":
      return [
        `Seca ${hero}. Rebozo o masa. El agua es enemiga del crujiente.`,
        `Aceite a 175 °C. No abarrotar.`,
        `Dora, escurre en rejilla, sal al aire.`,
        `Se come al minuto. ${name} frío es otra receta.`,
      ];
    case "pan":
      return [
        `Pan o masa. Si hay relleno, ${hero} va tibio.`,
        `Arma con ácido, hierba o salsa. El contraste es el plato.`,
        `Plancha o horno corto para cerrar.`,
        `Se come con las dos manos. ${name} es ${country} de calle.`,
      ];
    case "crudo":
      return [
        `Corta ${hero} frío, limpio, contra el hilo.`,
        `Ácido, sal, un graso. El minuto cuenta.`,
        `Hierba al final, nunca cocida.`,
        `Sirve inmediato. ${name} no sobrevive a la espera.`,
      ];
    case "desayuno":
      return [
        `Fuego medio. ${hero} entra cuando la sartén ya huele.`,
        `Huevo o masa al lado. El desayuno pide dos temperaturas.`,
        `Sal, un ácido, algo verde.`,
        `${name} abre el día en ${city}. No se negocia el café.`,
      ];
    case "postre":
      return [
        `Mezcla base. ${hero} manda el perfume.`,
        `${time >= 40 ? "Horno o fuego bajo. El azúcar se cuaja sin prisa." : "Monta en frío. El tiempo está en la nevera."}`,
        `Prueba: dulce contra un amargo o un ácido.`,
        `Sirve. ${name} cierra la mesa de ${country}.`,
      ];
    case "bebida":
      return [
        `Calienta o machaca. ${hero} suelta el aroma primero.`,
        `Agua, leche o hielo según el país. No hiervas de más.`,
        `Endulza apenas. El punto es el perfume, no el almíbar.`,
        `Sirve al momento. ${name} es ${city} en un vaso.`,
      ];
    default:
      return [
        `Prepara ${hero} con sal y aromáticos.`,
        `Cocina a fuego medio. ${wait}`,
        `Prueba y ajusta.`,
        `Sirve. ${name}, ${country}.`,
      ];
  }
}

function tipFor(family: FamilyId, hero: string): string {
  switch (family) {
    case "caldo":
      return "El agua se pone fría sobre el hueso. Caliente, el caldo se enturbia.";
    case "brasa":
      return "No pinches: el jugo se va. Reposa antes de cortar.";
    case "crudo":
      return `${hero} va frío. El ácido cocina: el reloj es el plato.`;
    case "frito":
      return "Si el aceite humea, ya se amargó. Baja y espera.";
    case "postre":
      return "El azúcar se prueba al final. El horno miente si abres la puerta.";
    case "bebida":
      return "El perfume se va con el hervor largo. Fuego manso.";
    default:
      return `Prueba antes de servir. ${hero} pide sal al final, no al principio.`;
  }
}

export function expandSeed(row: AtlasSeed): RecipeSource {
  const [slug, name, local, country, city, region, family, flavorsRaw, time, moodsRaw, ingsRaw, story] = row;
  const flavors = parseFlavors(flavorsRaw);
  const extras = parseIngs(ingsRaw);
  const ingredients = mergeIngs(family, extras);
  const hero = extras[0]?.item ?? name;
  const difficulty: Difficulty = time >= 85 ? "alta" : time <= 25 ? "fácil" : "media";
  return {
    slug,
    name,
    nameLocal: local || name,
    country,
    city,
    regionId: region,
    flavors,
    profile: profileOf(flavors, family),
    timeMin: time,
    servings: family === "bebida" || family === "postre" ? 4 : 4,
    difficulty,
    moods: parseMoods(moodsRaw),
    ingredients,
    steps: stepsFor(family, name, country, city, hero, time),
    story,
    tip: tipFor(family, hero),
    image: pickDishImage({ slug, name, country, regionId: region, family }),
    tags: [family, country.toLowerCase(), hero.toLowerCase().split(" ")[0] ?? slug],
  };
}

export function expandAtlas(rows: AtlasSeed[]): RecipeSource[] {
  const seen = new Set<string>();
  const out: RecipeSource[] = [];
  for (const row of rows) {
    const slug = row[0];
    if (!slug || seen.has(slug)) continue;
    seen.add(slug);
    out.push(expandSeed(row));
  }
  return out;
}
