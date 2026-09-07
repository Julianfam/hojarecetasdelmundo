import { hydrateRecipe } from "./cook-steps";
import { shuffleCopy } from "./shuffle";
import { boostHay, boostScore, type BoostId } from "./boosts";
import type { FlavorId, MoodId, Recipe, RecipeSource, RegionId } from "./recipe-types";
import type { SwatchId } from "./swatch";
import { EXPANSION } from "./catalog-expansion";
import { WAVE } from "./catalog-wave";
import { MESA } from "./catalog-mesa";
import { CURSOS } from "./catalog-cursos";
import { expandAtlas } from "./atlas-expand";
import { ATLAS_LATAM } from "./atlas-latam";
import { ATLAS_EUROPA } from "./atlas-europa";
import { ATLAS_ASIA } from "./atlas-asia";
import { ATLAS_RESTO } from "./atlas-resto";
import { ATLAS_EXTRA } from "./atlas-extra";
import { ATLAS_NACIONES } from "./atlas-naciones";
import { rebalanceImages } from "./dish-images";

export type {
  CookStep,
  Difficulty,
  FamilyId,
  FlavorId,
  Ingredient,
  MoodId,
  Recipe,
  RecipeSource,
  RegionId,
} from "./recipe-types";
export { FAMILIES, familyOf, getFamily, recipesInFamily, COURSE_IDS } from "./families";
export { formatStepClock, timerSecondsForStep } from "./cook-steps";
export { SWATCH_CHIP, SWATCH_DOT, SWATCH_ON, type SwatchId } from "./swatch";

export const FLAVORS: { id: FlavorId; label: string; blurb: string; swatch: SwatchId }[] = [
  { id: "umami", label: "Umami", blurb: "Caldo, soja, profundidad", swatch: "queso" },
  { id: "picante", label: "Picante", blurb: "Ají, chile, fuego", swatch: "rojo" },
  { id: "citrico", label: "Cítrico", blurb: "Lima, vinagre, brillo", swatch: "naranja" },
  { id: "ahumado", label: "Ahumado", blurb: "Brasa, pimentón, carbón", swatch: "wine" },
  { id: "herbal", label: "Herbal", blurb: "Cilantro, albahaca, menta", swatch: "leaf" },
  { id: "dulce", label: "Dulce", blurb: "Caramelo, fruta, coco", swatch: "mora" },
  { id: "cremoso", label: "Cremoso", blurb: "Yema, nata, mantequilla", swatch: "queso" },
  { id: "fresco", label: "Fresco", blurb: "Crudo, crujiente, jardín", swatch: "naranja" },
];

export const REGIONS: { id: RegionId; label: string; hint: string; cover: string }[] = [
  { id: "latam", label: "América Latina", hint: "Maíz, ají, brasa", cover: "/dishes/tacos-al-pastor.jpg" },
  { id: "caribe", label: "Caribe", hint: "Plátano, rum, humo", cover: "/dishes/jerk-chicken.jpg" },
  { id: "norte", label: "Norteamérica", hint: "Humo, mar, sartén", cover: "/dishes/poutine.jpg" },
  { id: "asia-este", label: "Asia oriental", hint: "Caldo, soja, vapor", cover: "/dishes/ramen-tonkotsu.jpg" },
  { id: "asia-sur", label: "India y Sudeste", hint: "Especias, wok, hierbas", cover: "/dishes/pad-thai.jpg" },
  { id: "medio-oriente", label: "Oriente medio", hint: "Tahini, cordero, pan", cover: "/dishes/hummus.jpg" },
  { id: "mediterraneo", label: "Mediterráneo", hint: "Aceite, tomate, trigo", cover: "/dishes/pizza-margherita.jpg" },
  { id: "europa", label: "Europa", hint: "Vino, horno, mantequilla", cover: "/dishes/boeuf-bourguignon.jpg" },
  { id: "africa", label: "África", hint: "Estofado, arroz, fuego lento", cover: "/dishes/jollof-rice.jpg" },
];

export const MOODS: { id: MoodId; label: string; blurb: string }[] = [
  { id: "consuelo", label: "Consuelo", blurb: "Caldo, manta, domingo" },
  { id: "fiesta", label: "Fiesta", blurb: "Mesa larga, ruido, salsa" },
  { id: "ligero", label: "Ligero", blurb: "Brillo, hierba, calor" },
  { id: "impresionar", label: "Impresionar", blurb: "Ritual, técnica, aplauso" },
];

export const PANTRY_GROUPS: { label: string; keys: { key: string; label: string }[] }[] = [
  {
    label: "Proteínas",
    keys: [
      { key: "pollo", label: "Pollo" },
      { key: "cerdo", label: "Cerdo" },
      { key: "res", label: "Res" },
      { key: "cordero", label: "Cordero" },
      { key: "camaron", label: "Camarón" },
      { key: "pescado", label: "Pescado" },
      { key: "huevo", label: "Huevo" },
      { key: "garbanzo", label: "Garbanzo" },
      { key: "tofu", label: "Tofu" },
    ],
  },
  {
    label: "Base",
    keys: [
      { key: "arroz", label: "Arroz" },
      { key: "fideos", label: "Fideos" },
      { key: "trigo", label: "Harina / trigo" },
      { key: "maiz", label: "Maíz" },
      { key: "papa", label: "Papa" },
      { key: "platano", label: "Plátano" },
      { key: "frijol", label: "Frijol" },
      { key: "lenteja", label: "Lenteja" },
      { key: "tomate", label: "Tomate" },
      { key: "coco", label: "Coco" },
    ],
  },
  {
    label: "Aromáticos",
    keys: [
      { key: "ajo", label: "Ajo" },
      { key: "cebolla", label: "Cebolla" },
      { key: "cilantro", label: "Cilantro" },
      { key: "jengibre", label: "Jengibre" },
      { key: "chile", label: "Chile" },
      { key: "limon", label: "Limón / lima" },
      { key: "soya", label: "Soya" },
      { key: "leche", label: "Leche / nata" },
      { key: "yogurt", label: "Yogur" },
      { key: "cacahuete", label: "Cacahuete" },
    ],
  },
];

const CORE_RECIPES: RecipeSource[] = [
  {
    slug: "tacos-al-pastor",
    name: "Tacos al pastor",
    nameLocal: "Tacos al pastor",
    country: "México",
    city: "Ciudad de México",
    regionId: "latam",
    flavors: ["picante", "ahumado", "citrico", "dulce"],
    profile: { picante: 7, umami: 7, acido: 6, dulce: 5, grasa: 6, aroma: 8 },
    timeMin: 50,
    servings: 4,
    difficulty: "media",
    moods: ["fiesta", "impresionar"],
    ingredients: [
      { item: "Lomo de cerdo", amount: "700 g", key: "cerdo" },
      { item: "Chiles guajillo", amount: "4", key: "chile" },
      { item: "Achiote", amount: "2 cdas", key: "chile" },
      { item: "Piña", amount: "4 rodajas", key: "piña" },
      { item: "Tortillas de maíz", amount: "12", key: "maiz" },
      { item: "Cilantro y cebolla", amount: "al gusto", key: "cilantro" },
      { item: "Limón", amount: "2", key: "limon" },
      { item: "Ajo", amount: "3 dientes", key: "ajo" },
    ],
    steps: [
      "Remoja los guajillos, licúalos con achiote, ajo, vinagre y un toque de piña hasta obtener un adobo espeso.",
      "Marina el cerdo al menos 2 horas (mejor toda la noche) y ásalo a fuego alto hasta caramelizar los bordes.",
      "Pica la carne fina, junto con piña asada. Calienta las tortillas en comal.",
      "Arma cada taco: carne, piña, cebolla, cilantro y un golpe de limón. Salsa al lado, nunca encima primero.",
    ],
    story:
      "Nacieron en los trompos de la capital, donde la shawarma libanesa se cruzó con el chile seco mexicano. El pastor no es un taco: es un acuerdo entre el Mediterráneo y el altiplano.",
    tip: "Si no tienes trompo, usa una sartén de hierro bien caliente y no muevas la carne hasta que dore.",
    image: "/dishes/tacos-al-pastor.jpg",
    tags: ["street food", "maíz", "trompo", "cdmx"],
  },
  {
    slug: "ramen-tonkotsu",
    name: "Ramen tonkotsu",
    nameLocal: "豚骨ラーメン",
    country: "Japón",
    city: "Fukuoka",
    regionId: "asia-este",
    flavors: ["umami", "cremoso", "ahumado"],
    profile: { picante: 2, umami: 10, acido: 2, dulce: 3, grasa: 9, aroma: 7 },
    timeMin: 120,
    servings: 4,
    difficulty: "alta",
    moods: ["consuelo", "impresionar"],
    ingredients: [
      { item: "Huesos de cerdo", amount: "2 kg", key: "cerdo" },
      { item: "Panceta para chashu", amount: "400 g", key: "cerdo" },
      { item: "Fideos ramen", amount: "4 porciones", key: "fideos" },
      { item: "Huevos", amount: "4", key: "huevo" },
      { item: "Salsa de soya", amount: "80 ml", key: "soya" },
      { item: "Jengibre", amount: "1 trozo", key: "jengibre" },
      { item: "Ajo", amount: "1 cabeza", key: "ajo" },
      { item: "Cebollín", amount: "1 manojo", key: "cebolla" },
    ],
    steps: [
      "Blanquea los huesos 15 min, lava y hierve a fuego vivo 8–12 horas hasta que el caldo se vuelva lechoso.",
      "Cocina el chashu en soya, mirin y azúcar; reserva el líquido como tare.",
      "Cuece huevos 6½ min, pélalos y marínalos en el tare.",
      "Monta: tare en el fondo, caldo hirviendo, fideos, chashu, huevo, nori y cebollín.",
    ],
    story:
      "En Hakata el caldo se bate horas hasta emulsionar tuétano y colágeno. Es un abrazo que tarda un día en hacerse y tres minutos en desaparecer.",
    tip: "El secreto del color marfil no es leche: es fuego alto y paciencia. El agua nunca debe dormir.",
    image: "/dishes/ramen-tonkotsu.jpg",
    tags: ["caldo", "cerdo", "fukuoka", "noodles"],
  },
  {
    slug: "pad-thai",
    name: "Pad Thai",
    nameLocal: "ผัดไทย",
    country: "Tailandia",
    city: "Bangkok",
    regionId: "asia-sur",
    flavors: ["citrico", "dulce", "umami", "picante"],
    profile: { picante: 5, umami: 7, acido: 7, dulce: 6, grasa: 5, aroma: 6 },
    timeMin: 30,
    servings: 2,
    difficulty: "media",
    moods: ["fiesta", "ligero"],
    ingredients: [
      { item: "Fideos de arroz", amount: "200 g", key: "fideos" },
      { item: "Camarones", amount: "200 g", key: "camaron" },
      { item: "Huevo", amount: "2", key: "huevo" },
      { item: "Tamarindo", amount: "3 cdas", key: "limon" },
      { item: "Maní tostado", amount: "40 g", key: "mani" },
      { item: "Germinados", amount: "1 taza", key: "germinado" },
      { item: "Cebollín", amount: "3", key: "cebolla" },
      { item: "Lima", amount: "1", key: "limon" },
    ],
    steps: [
      "Remoja los fideos hasta que estén flexibles, no blandos.",
      "Mezcla tamarindo, azúcar de palma, salsa de pescado y un toque de chile: esa es la salsa.",
      "Saltea camarón, empuja a un lado, revuelve el huevo, agrega fideos y salsa. Todo a fuego alto.",
      "Fuera del wok: germinados, maní, lima. Se come de un golpe, aún caliente.",
    ],
    story:
      "Plato de nación y de puesto callejero. El pad thai equilibra ácido, dulce, salado y crunch como si fuera un tratado de paz en un wok.",
    tip: "Si los fideos se pegan, el wok no está lo bastante caliente. Mejor dos porciones que una sobrecargada.",
    image: "/dishes/pad-thai.jpg",
    tags: ["wok", "camarón", "street food", "bangkok"],
  },
  {
    slug: "pizza-margherita",
    name: "Pizza Margherita",
    nameLocal: "Pizza Margherita",
    country: "Italia",
    city: "Nápoles",
    regionId: "mediterraneo",
    flavors: ["herbal", "umami", "fresco"],
    profile: { picante: 1, umami: 6, acido: 5, dulce: 4, grasa: 5, aroma: 7 },
    timeMin: 40,
    servings: 2,
    difficulty: "media",
    moods: ["fiesta", "consuelo"],
    ingredients: [
      { item: "Harina 00", amount: "500 g", key: "trigo" },
      { item: "Tomate San Marzano", amount: "400 g", key: "tomate" },
      { item: "Mozzarella de búfala", amount: "250 g", key: "queso" },
      { item: "Albahaca", amount: "1 manojo", key: "albahaca" },
      { item: "Aceite de oliva", amount: "3 cdas", key: "aceite" },
      { item: "Levadura", amount: "2 g", key: "trigo" },
      { item: "Sal", amount: "12 g", key: "sal" },
    ],
    steps: [
      "Amasa harina, agua, sal y poca levadura. Fermenta en frío 24 h.",
      "Estira a mano — nunca con rodillo — dejando un cornicione alto.",
      "Salsa cruda de tomate, mozzarella escurrida, aceite. Horno al máximo o piedra 90 segundos.",
      "Albahaca fresca al salir. Se corta, no se discute.",
    ],
    story:
      "Rojo, blanco y verde: la bandera sobre un disco de fuego. En Nápoles la Margherita no es simple, es una disciplina.",
    tip: "La mozzarella debe estar bien seca. El agua es el enemigo de una pizza que crepita.",
    image: "/dishes/pizza-margherita.jpg",
    tags: ["horno", "napoles", "albahaca", "masa"],
  },
  {
    slug: "paella-valenciana",
    name: "Paella valenciana",
    nameLocal: "Paella valenciana",
    country: "España",
    city: "Valencia",
    regionId: "mediterraneo",
    flavors: ["ahumado", "herbal", "umami"],
    profile: { picante: 1, umami: 8, acido: 2, dulce: 2, grasa: 5, aroma: 9 },
    timeMin: 75,
    servings: 6,
    difficulty: "alta",
    moods: ["fiesta", "impresionar"],
    ingredients: [
      { item: "Arroz bomba", amount: "400 g", key: "arroz" },
      { item: "Pollo", amount: "500 g", key: "pollo" },
      { item: "Judía verde", amount: "200 g", key: "judia" },
      { item: "Garrofón", amount: "150 g", key: "frijol" },
      { item: "Azafrán", amount: "1 pizca", key: "azafran" },
      { item: "Tomate rallado", amount: "1", key: "tomate" },
      { item: "Romero", amount: "1 ramita", key: "romero" },
      { item: "Aceite de oliva", amount: "80 ml", key: "aceite" },
    ],
    steps: [
      "Dora el pollo en el centro de la paella con abundante aceite.",
      "Sofríe judías, garrofón y tomate. Cubre con caldo y azafrán.",
      "Vierte el arroz en cruz, no remuevas más. Fuego medio-alto 18 min.",
      "Últimos minutos a fuego fuerte para el socarrat. Reposa 5 min tapada con un paño.",
    ],
    story:
      "Nació en la Albufera, entre arrozales y domingo. La paella verdadera no lleva mariscos: lleva memoria de campo y un fondo tostado que se pelea con la cuchara.",
    tip: "Si remueves el arroz, estás haciendo un risotto con disfraz. Manos quietas.",
    image: "/dishes/paella-valenciana.jpg",
    tags: ["arroz", "domingo", "socarrat", "valencia"],
  },
  {
    slug: "ceviche-limeno",
    name: "Ceviche limeño",
    nameLocal: "Ceviche",
    country: "Perú",
    city: "Lima",
    regionId: "latam",
    flavors: ["citrico", "picante", "fresco"],
    profile: { picante: 6, umami: 5, acido: 10, dulce: 3, grasa: 2, aroma: 7 },
    timeMin: 25,
    servings: 4,
    difficulty: "fácil",
    moods: ["ligero", "fiesta"],
    ingredients: [
      { item: "Pescado blanco fresco", amount: "500 g", key: "pescado" },
      { item: "Limón de mesa", amount: "10", key: "limon" },
      { item: "Ají limo", amount: "1", key: "chile" },
      { item: "Cebolla morada", amount: "1", key: "cebolla" },
      { item: "Cilantro", amount: "1 manojo", key: "cilantro" },
      { item: "Camote", amount: "2", key: "papa" },
      { item: "Cancha", amount: "1 taza", key: "maiz" },
      { item: "Ajo", amount: "1 diente", key: "ajo" },
    ],
    steps: [
      "Corta el pescado en cubos; manténlo muy frío.",
      "Mezcla jugo de limón, ajo, ají, sal: la leche de tigre.",
      "Junta pescado, cebolla en pluma y cilantro. Marina 3–5 minutos, no más.",
      "Sirve con camote, cancha y un vaso de la misma leche de tigre.",
    ],
    story:
      "El ceviche limeño es un relámpago: el limón no cocina, conversa. En el Mercado de Surquillo se mide en segundos y en sudor de ají.",
    tip: "El pescado debe oler a mar, no a pescado. Si dudas, no es día de ceviche.",
    image: "/dishes/ceviche-limeno.jpg",
    tags: ["crudo", "lima", "ají", "mar"],
  },
  {
    slug: "butter-chicken",
    name: "Butter chicken",
    nameLocal: "Murgh makhani",
    country: "India",
    city: "Delhi",
    regionId: "asia-sur",
    flavors: ["cremoso", "picante", "dulce", "ahumado"],
    profile: { picante: 5, umami: 7, acido: 4, dulce: 5, grasa: 8, aroma: 9 },
    timeMin: 55,
    servings: 4,
    difficulty: "media",
    moods: ["consuelo", "fiesta"],
    ingredients: [
      { item: "Pollo", amount: "700 g", key: "pollo" },
      { item: "Yogur", amount: "150 g", key: "leche" },
      { item: "Tomate", amount: "500 g", key: "tomate" },
      { item: "Mantequilla", amount: "80 g", key: "leche" },
      { item: "Nata", amount: "100 ml", key: "leche" },
      { item: "Garam masala", amount: "2 cditas", key: "comino" },
      { item: "Jengibre y ajo", amount: "2 cdas", key: "jengibre" },
      { item: "Chile kashmiri", amount: "1 cdita", key: "chile" },
    ],
    steps: [
      "Marina el pollo en yogur, jengibre, ajo y especias. Ásalo hasta ahumar ligeramente.",
      "Sofríe tomate con especias hasta que se deshaga; licúa y cuele.",
      "Monta con mantequilla y nata. Devuelve el pollo a la salsa 10 min.",
      "Sirve con naan. Un toque de kasuri methi al final cambia el plato.",
    ],
    story:
      "Inventado en Delhi para no desperdiciar el tandoor del día anterior. El makhani es seducción: picante que se disfraza de terciopelo.",
    tip: "El color rojo debe venir del kashmiri, no del colorante. Paciencia con el sofrito de tomate.",
    image: "/dishes/butter-chicken.jpg",
    tags: ["curry", "tandoor", "delhi", "mantequilla"],
  },
  {
    slug: "pho-bo",
    name: "Phở bò",
    nameLocal: "Phở bò",
    country: "Vietnam",
    city: "Hanói",
    regionId: "asia-sur",
    flavors: ["herbal", "umami", "citrico"],
    profile: { picante: 3, umami: 9, acido: 4, dulce: 3, grasa: 4, aroma: 10 },
    timeMin: 150,
    servings: 4,
    difficulty: "media",
    moods: ["consuelo", "ligero"],
    ingredients: [
      { item: "Huesos de res", amount: "1.5 kg", key: "res" },
      { item: "Falda o lomo fino", amount: "300 g", key: "res" },
      { item: "Fideos de arroz", amount: "400 g", key: "fideos" },
      { item: "Anís estrellado", amount: "3", key: "anís" },
      { item: "Canela y clavo", amount: "1 palo", key: "canela" },
      { item: "Jengibre tostado", amount: "1", key: "jengibre" },
      { item: "Hierbas: albahaca, cilantro", amount: "1 bandeja", key: "cilantro" },
      { item: "Lima y chile", amount: "al gusto", key: "limon" },
    ],
    steps: [
      "Tuesta jengibre y cebolla. Blanquea huesos y hierve 3–4 h con especias tostadas.",
      "Sazona con salsa de pescado y un poco de azúcar. Cuela cristalino.",
      "Escalda fideos. Coloca carne cruda finísima en el tazón.",
      "Vierte caldo hirviendo. Hierbas, lima y chile en la mesa, cada quien su phở.",
    ],
    story:
      "Desayuno nacional y meditación. En Hanói el caldo es claro como un haiku; en Saigón, más dulce y ruidoso.",
    tip: "Tosta las especias en seco hasta que perfumen la cocina. Ahí nace el phở, no en el agua.",
    image: "/dishes/pho-bo.jpg",
    tags: ["caldo", "res", "hanoi", "hierbas"],
  },
  {
    slug: "ajiaco-santafereno",
    name: "Ajiaco santafereño",
    nameLocal: "Ajiaco",
    country: "Colombia",
    city: "Bogotá",
    regionId: "latam",
    flavors: ["herbal", "cremoso", "umami"],
    profile: { picante: 2, umami: 7, acido: 3, dulce: 2, grasa: 5, aroma: 8 },
    timeMin: 80,
    servings: 6,
    difficulty: "fácil",
    moods: ["consuelo"],
    ingredients: [
      { item: "Pollo", amount: "1 pechuga con hueso", key: "pollo" },
      { item: "Papa sabanera", amount: "4", key: "papa" },
      { item: "Papa pastusa", amount: "4", key: "papa" },
      { item: "Papa criolla", amount: "500 g", key: "papa" },
      { item: "Mazorca", amount: "2", key: "maiz" },
      { item: "Guascas", amount: "2 ramos", key: "guascas" },
      { item: "Alcaparras y crema", amount: "al servir", key: "leche" },
      { item: "Aguacate", amount: "1", key: "aguacate" },
    ],
    steps: [
      "Hierve el pollo con cebolla y ajos. Retira, desmenuza y sigue con el caldo.",
      "Agrega papas por orden: sabanera, pastusa y al final la criolla que espesa.",
      "Mazorca en trozos y guascas los últimos 10 minutos.",
      "Sirve con crema, alcaparras, aguacate y arroz blanco. Bogotá en un plato.",
    ],
    story:
      "Sopa de altitud y de domingo bogotano. Tres papas, una hierba que no crece en cualquier lado, y la llovizna de la sabana como condimento invisible.",
    tip: "Sin guascas no es ajiaco, es una sopa de papa. Búscalas secas si estás lejos de la sabana.",
    image: "/dishes/ajiaco-santafereno.jpg",
    tags: ["sopa", "bogotá", "papa", "domingo"],
  },
  {
    slug: "spaghetti-carbonara",
    name: "Spaghetti alla carbonara",
    nameLocal: "Carbonara",
    country: "Italia",
    city: "Roma",
    regionId: "mediterraneo",
    flavors: ["cremoso", "umami", "ahumado"],
    profile: { picante: 3, umami: 8, acido: 1, dulce: 1, grasa: 8, aroma: 5 },
    timeMin: 25,
    servings: 2,
    difficulty: "media",
    moods: ["consuelo", "impresionar"],
    ingredients: [
      { item: "Spaghetti", amount: "250 g", key: "trigo" },
      { item: "Guanciale", amount: "120 g", key: "cerdo" },
      { item: "Yemas", amount: "3", key: "huevo" },
      { item: "Pecorino romano", amount: "60 g", key: "queso" },
      { item: "Pimienta negra", amount: "generosa", key: "pimienta" },
    ],
    steps: [
      "Dora el guanciale lento hasta que suelte su grasa cristalina.",
      "Mezcla yemas, pecorino y pimienta molida al momento. Nada de nata.",
      "Cocina la pasta al dente. Fuera del fuego, emulsiona con yemas y un cucharón de agua de cocción.",
      "Sirve inmediata, brillante, con más pecorino y pimienta.",
    ],
    story:
      "No hay crema en la carbonara. Solo yema, pecorino, guanciale y la fe de que el calor residual basta. Roma no negocia esto.",
    tip: "Saca la sartén del fuego antes de las yemas. Si cuajan, perdiste el plato; si brillan, ganaste Roma.",
    image: "/dishes/spaghetti-carbonara.jpg",
    tags: ["pasta", "roma", "huevo", "guanciale"],
  },
  {
    slug: "bibimbap",
    name: "Bibimbap",
    nameLocal: "비빔밥",
    country: "Corea del Sur",
    city: "Jeonju",
    regionId: "asia-este",
    flavors: ["picante", "umami", "fresco", "herbal"],
    profile: { picante: 6, umami: 7, acido: 3, dulce: 3, grasa: 4, aroma: 6 },
    timeMin: 45,
    servings: 2,
    difficulty: "media",
    moods: ["ligero", "fiesta"],
    ingredients: [
      { item: "Arroz", amount: "2 tazas cocidas", key: "arroz" },
      { item: "Espinaca, zanahoria, brotes", amount: "surtido", key: "verdura" },
      { item: "Gochujang", amount: "2 cdas", key: "chile" },
      { item: "Huevo", amount: "2", key: "huevo" },
      { item: "Carne de res o tofu", amount: "150 g", key: "res" },
      { item: "Sésamo y ajo", amount: "al gusto", key: "ajo" },
      { item: "Soya", amount: "2 cdas", key: "soya" },
    ],
    steps: [
      "Saltea cada verdura por separado, sazonada con ajo, sésamo y soya.",
      "Dora la carne. Cocina el huevo a la sartén o crudo sobre dolsot.",
      "Arroz al fondo, verduras en gajos de color, gochujang al centro.",
      "Mezcla con ganas justo antes de comer. El arroz tostado del dolsot es premio.",
    ],
    story:
      "Un círculo de colores que se destruye a propósito. El bibimbap es compostura y caos: primero se contempla, después se revuelve.",
    tip: "Si usas piedra (dolsot), caliéntala bien con un hilo de aceite de sésamo para el nurungji.",
    image: "/dishes/bibimbap.jpg",
    tags: ["arroz", "corea", "gochujang", "bowls"],
  },
  {
    slug: "tagine-cordero",
    name: "Tayín de cordero",
    nameLocal: "طاجين",
    country: "Marruecos",
    city: "Marrakech",
    regionId: "africa",
    flavors: ["dulce", "ahumado", "herbal", "umami"],
    profile: { picante: 3, umami: 8, acido: 3, dulce: 7, grasa: 6, aroma: 10 },
    timeMin: 140,
    servings: 6,
    difficulty: "media",
    moods: ["impresionar", "consuelo"],
    ingredients: [
      { item: "Cordero", amount: "1.2 kg", key: "cordero" },
      { item: "Cebolla", amount: "2", key: "cebolla" },
      { item: "Albaricoques secos", amount: "150 g", key: "albaricoque" },
      { item: "Almendras", amount: "80 g", key: "almendra" },
      { item: "Canela, jengibre, azafrán", amount: "al ras", key: "canela" },
      { item: "Cilantro y perejil", amount: "1 manojo", key: "cilantro" },
      { item: "Miel", amount: "1 cda", key: "miel" },
    ],
    steps: [
      "Dora el cordero con cebolla, jengibre, cúrcuma y canela.",
      "Agrega un poco de agua, azafrán y hierbas. Tapa el cono del tayín 1½ h a fuego bajo.",
      "Suma albaricoques y miel los últimos 20 minutos.",
      "Almendras tostadas al servir. Cuscús o pan khobz para recoger la salsa.",
    ],
    story:
      "El cono del tayín no es decoración: es una chimenea que devuelve el vapor a la carne. Dulce y salado se dan la mano en Marrakech desde hace siglos.",
    tip: "Fuego perezoso. Si hierve fuerte, se seca. El tayín se cocina como se cuenta un secreto.",
    image: "/dishes/tagine-cordero.jpg",
    tags: ["cordero", "marruecos", "azafrán", "estofado"],
  },
  {
    slug: "feijoada",
    name: "Feijoada",
    nameLocal: "Feijoada completa",
    country: "Brasil",
    city: "Río de Janeiro",
    regionId: "latam",
    flavors: ["ahumado", "umami", "citrico"],
    profile: { picante: 2, umami: 9, acido: 4, dulce: 2, grasa: 8, aroma: 6 },
    timeMin: 180,
    servings: 8,
    difficulty: "media",
    moods: ["fiesta", "consuelo"],
    ingredients: [
      { item: "Frijol negro", amount: "500 g", key: "frijol" },
      { item: "Costilla y linguiça", amount: "800 g", key: "cerdo" },
      { item: "Naranja", amount: "2", key: "naranja" },
      { item: "Col rizada", amount: "1 manojo", key: "verdura" },
      { item: "Arroz", amount: "para acompañar", key: "arroz" },
      { item: "Ajo y cebolla", amount: "al sofrito", key: "ajo" },
      { item: "Harina de yuca (farofa)", amount: "1 taza", key: "yuca" },
    ],
    steps: [
      "Remoja los frijoles. Cocínalos con las carnes ahumadas a fuego lento 2–3 h.",
      "Sofríe ajo y cebolla y devuélvelos al potaje para profundizar.",
      "Saltea la col con ajo. Prepara farofa y arroz blanco.",
      "Sirve con naranja, que corta la grasa como un milagro.",
    ],
    story:
      "Sábado carioca, olla enorme, amigos que llegan tarde. La feijoada es un país entero sentado alrededor del frijol negro.",
    tip: "La naranja no es adorno. Un gajo entre cucharadas resetea el paladar.",
    image: "/dishes/feijoada.jpg",
    tags: ["frijol", "cerdo", "río", "sábado"],
  },
  {
    slug: "pato-pekin",
    name: "Pato pekinés",
    nameLocal: "北京烤鸭",
    country: "China",
    city: "Pekín",
    regionId: "asia-este",
    flavors: ["ahumado", "dulce", "umami"],
    profile: { picante: 2, umami: 8, acido: 2, dulce: 6, grasa: 7, aroma: 8 },
    timeMin: 180,
    servings: 4,
    difficulty: "alta",
    moods: ["impresionar", "fiesta"],
    ingredients: [
      { item: "Pato entero", amount: "2 kg", key: "pato" },
      { item: "Maltosa o miel", amount: "3 cdas", key: "miel" },
      { item: "Panqueques chinos", amount: "16", key: "trigo" },
      { item: "Cebollín", amount: "1 manojo", key: "cebolla" },
      { item: "Salsa hoisin", amount: "80 g", key: "soya" },
      { item: "Pepino", amount: "1", key: "pepino" },
    ],
    steps: [
      "Escalda el pato, barnízalo con maltosa y sécalo en la nevera, descubierto, 12–24 h.",
      "Asa a 190 °C hasta piel lacada y crujiente.",
      "Trincha la piel primero, luego la carne.",
      "Cada invitado arma su panqueque: hoisin, cebollín, pepino, pato. Se come con las manos.",
    ],
    story:
      "Banquete imperial que bajó a la calle. El ritual importa tanto como el lacado: primero se admira la piel, después se envuelve.",
    tip: "El secado en frío es innegociable. Sin piel seca no hay crujido.",
    image: "/dishes/pato-pekin.jpg",
    tags: ["asado", "pekin", "banquete", "pato"],
  },
  {
    slug: "xiao-long-bao",
    name: "Xiao long bao",
    nameLocal: "小笼包",
    country: "China",
    city: "Shanghái",
    regionId: "asia-este",
    flavors: ["umami", "cremoso", "fresco"],
    profile: { picante: 1, umami: 9, acido: 4, dulce: 2, grasa: 6, aroma: 5 },
    timeMin: 90,
    servings: 4,
    difficulty: "alta",
    moods: ["impresionar"],
    ingredients: [
      { item: "Harina", amount: "300 g", key: "trigo" },
      { item: "Carne de cerdo magra", amount: "300 g", key: "cerdo" },
      { item: "Gelatina de caldo (aspic)", amount: "200 g", key: "cerdo" },
      { item: "Jengibre", amount: "20 g", key: "jengibre" },
      { item: "Soya y vinagre negro", amount: "para dip", key: "soya" },
      { item: "Cebollín", amount: "2", key: "cebolla" },
    ],
    steps: [
      "Prepara un caldo que gele en frío; pica el aspic fino.",
      "Mezcla el relleno de cerdo con aspic, jengibre y soya.",
      "Estira discos finos, pliega 18 cierra. El caldo va dentro como un secreto.",
      "Vapor 8 min. Se muerde con cuchara, se sorbe, se dipa en vinagre y jengibre.",
    ],
    story:
      "Una sopa que viaja disfrazada de dumpling. En Shanghái se juzga por el número de pliegues y por no quemarse la lengua.",
    tip: "Nunca muerdas al aire: la sopa salta. Cuchara debajo, siempre.",
    image: "/dishes/xiao-long-bao.jpg",
    tags: ["dim sum", "shanghái", "vapor", "caldo"],
  },
  {
    slug: "tom-yum-goong",
    name: "Tom yum goong",
    nameLocal: "ต้มยำกุ้ง",
    country: "Tailandia",
    city: "Bangkok",
    regionId: "asia-sur",
    flavors: ["picante", "citrico", "herbal", "umami"],
    profile: { picante: 8, umami: 7, acido: 9, dulce: 3, grasa: 3, aroma: 10 },
    timeMin: 30,
    servings: 3,
    difficulty: "fácil",
    moods: ["ligero", "fiesta"],
    ingredients: [
      { item: "Camarones con cabeza", amount: "300 g", key: "camaron" },
      { item: "Hierba limón", amount: "2 tallos", key: "limon" },
      { item: "Hojas de lima kaffir", amount: "6", key: "limon" },
      { item: "Galanga", amount: "6 rodajas", key: "jengibre" },
      { item: "Chile de árbol", amount: "4", key: "chile" },
      { item: "Hongos paja", amount: "150 g", key: "hongo" },
      { item: "Salsa de pescado y lima", amount: "al gusto", key: "limon" },
    ],
    steps: [
      "Haz un caldo rápido con las cabezas de camarón.",
      "Golpea hierba limón y galanga; suéltalas en el caldo con kaffir y chile.",
      "Agrega hongos y camarones. Apaga. Sazona con salsa de pescado, lima y un toque de azúcar.",
      "No debe hervir después del marisco. El aroma tiene que saltar de la sopa.",
    ],
    story:
      "La sopa que despierta. Ácida, picante, aromática: un recuento de Tailandia en diez minutos de fuego.",
    tip: "La galanga no es jengibre. Si no la encuentras, el plato pierde un piso entero de perfume.",
    image: "/dishes/tom-yum-goong.jpg",
    tags: ["sopa", "picante", "camarón", "bangkok"],
  },
  {
    slug: "mole-poblano",
    name: "Mole poblano",
    nameLocal: "Mole poblano",
    country: "México",
    city: "Puebla",
    regionId: "latam",
    flavors: ["ahumado", "dulce", "picante", "umami"],
    profile: { picante: 5, umami: 8, acido: 3, dulce: 6, grasa: 6, aroma: 10 },
    timeMin: 150,
    servings: 8,
    difficulty: "alta",
    moods: ["impresionar", "fiesta"],
    ingredients: [
      { item: "Chiles mulato, pasilla, ancho", amount: "mezcla", key: "chile" },
      { item: "Pavo o pollo", amount: "1.5 kg", key: "pollo" },
      { item: "Chocolate de metate", amount: "60 g", key: "chocolate" },
      { item: "Ajonjolí, almendras, pasas", amount: "1 taza", key: "almendra" },
      { item: "Canela y clavo", amount: "al ras", key: "canela" },
      { item: "Tortillas y arroz", amount: "para servir", key: "maiz" },
    ],
    steps: [
      "Tuesta chiles, especias y frutos secos por tandas. Nada se quema, todo se perfume.",
      "Licúa con caldo de pavo. Cuece la salsa a fuego bajo hasta que espese y oscurezca.",
      "Integra el chocolate al final. Equilibra sal y un pellizco de azúcar.",
      "Napas el pavo. Ajonjolí arriba. Se come con arroz y tortillas, nunca con prisa.",
    ],
    story:
      "Cientos de años y decenas de ingredientes en una sola cazuela. El mole no es salsa: es archivo de conventos, mercados y fiestas patronales.",
    tip: "Tuesta en tandas y anota. El mole se corrige al final, no al principio.",
    image: "/dishes/mole-poblano.jpg",
    tags: ["fiesta", "puebla", "chile", "chocolate"],
  },
  {
    slug: "jollof-rice",
    name: "Jollof rice",
    nameLocal: "Jollof",
    country: "Nigeria",
    city: "Lagos",
    regionId: "africa",
    flavors: ["ahumado", "picante", "umami", "dulce"],
    profile: { picante: 6, umami: 7, acido: 4, dulce: 4, grasa: 5, aroma: 8 },
    timeMin: 60,
    servings: 6,
    difficulty: "media",
    moods: ["fiesta"],
    ingredients: [
      { item: "Arroz de grano largo", amount: "400 g", key: "arroz" },
      { item: "Tomate y pimiento", amount: "6 tomates", key: "tomate" },
      { item: "Pollo", amount: "800 g", key: "pollo" },
      { item: "Chile scotch bonnet", amount: "1", key: "chile" },
      { item: "Cebolla y ajo", amount: "2 y 4", key: "cebolla" },
      { item: "Tomate concentrado", amount: "3 cdas", key: "tomate" },
      { item: "Plátano maduro", amount: "2", key: "platano" },
    ],
    steps: [
      "Asa pollo. Licúa tomate, pimiento, cebolla y scotch bonnet: el stew base.",
      "Sofríe concentrado de tomate hasta que oscurezca; agrega el stew y reduce.",
      "Incorpora arroz lavado y caldo. Tapa. El fondo debe tostarse un poco: party rice.",
      "Sirve con pollo, plátano frito y ensalada. Discute origen con respeto y humor.",
    ],
    story:
      "Ghana y Nigeria se disputan el trono. Lo que no se discute: un jollof sin humo de olla y sin scotch bonnet no es jollof.",
    tip: "El concentrado de tomate debe freírse hasta oler a caramelo salado. Ahí está el color.",
    image: "/dishes/jollof-rice.jpg",
    tags: ["arroz", "nigeria", "fiesta", "humo"],
  },
  {
    slug: "rendang",
    name: "Rendang",
    nameLocal: "Rendang daging",
    country: "Indonesia",
    city: "Padang",
    regionId: "asia-sur",
    flavors: ["picante", "ahumado", "dulce", "umami"],
    profile: { picante: 7, umami: 9, acido: 3, dulce: 4, grasa: 7, aroma: 10 },
    timeMin: 180,
    servings: 6,
    difficulty: "alta",
    moods: ["impresionar", "consuelo"],
    ingredients: [
      { item: "Tapa de res", amount: "1 kg", key: "res" },
      { item: "Leche de coco", amount: "800 ml", key: "coco" },
      { item: "Chile rojo", amount: "8", key: "chile" },
      { item: "Jengibre, galanga, cúrcuma", amount: "pasta", key: "jengibre" },
      { item: "Hoja de lima y serai", amount: "4 y 2", key: "limon" },
      { item: "Ajo y chalota", amount: "8 y 6", key: "ajo" },
    ],
    steps: [
      "Licúa el bumbu (pasta de chiles y aromáticos) y fríelo en aceite hasta que separe.",
      "Agrega la res y la leche de coco. Hierve y luego reduce horas, removiendo.",
      "Cuando el líquido desaparece, fríe la carne en su propio aceite de coco.",
      "El rendang está listo cuando está oscuro, seco y lacado. Arroz al vapor.",
    ],
    story:
      "Un plato minangkabau diseñado para viajar días sin nevera. El coco se evapora hasta volverse armadura de especias.",
    tip: "No es un curry líquido. Sigue reduciendo cuando creas que ya está. El final es un confitado.",
    image: "/dishes/rendang.jpg",
    tags: ["res", "coco", "padang", "especias"],
  },
  {
    slug: "shakshuka",
    name: "Shakshuka",
    nameLocal: "شكشوكة",
    country: "Túnez",
    city: "Túnez",
    regionId: "mediterraneo",
    flavors: ["picante", "herbal", "umami"],
    profile: { picante: 5, umami: 6, acido: 6, dulce: 4, grasa: 5, aroma: 7 },
    timeMin: 30,
    servings: 3,
    difficulty: "fácil",
    moods: ["consuelo", "fiesta"],
    ingredients: [
      { item: "Huevos", amount: "5", key: "huevo" },
      { item: "Tomate maduro", amount: "6", key: "tomate" },
      { item: "Pimiento", amount: "2", key: "pimiento" },
      { item: "Cebolla y ajo", amount: "1 y 3", key: "cebolla" },
      { item: "Comino y pimentón", amount: "1 cdita c/u", key: "comino" },
      { item: "Queso feta", amount: "80 g", key: "queso" },
      { item: "Cilantro", amount: "un puñado", key: "cilantro" },
      { item: "Pan", amount: "para mojar", key: "trigo" },
    ],
    steps: [
      "Sofríe cebolla y pimiento hasta dulces. Ajo, comino, pimentón.",
      "Tomate y un pellizco de azúcar. Reduce 15 min hasta salsa espesa.",
      "Nidos para los huevos. Tapa 4–5 min: clara cuajada, yema suave.",
      "Feta, cilantro, pan. Se come en la sartén, en el centro de la mesa.",
    ],
    story:
      "Desayuno nómada del Magreb al Levante. Cada casa discute si lleva feta, si el huevo se tapa, si el pan debe ser pita o jalá.",
    tip: "Salsa espesa antes de los huevos. Si está líquida, los huevos se ahogan y no se posan.",
    image: "/dishes/shakshuka.jpg",
    tags: ["huevo", "tomate", "desayuno", "sartén"],
  },
  {
    slug: "falafel",
    name: "Falafel",
    nameLocal: "فلافل",
    country: "Líbano",
    city: "Beirut",
    regionId: "mediterraneo",
    flavors: ["herbal", "fresco", "umami"],
    profile: { picante: 3, umami: 6, acido: 5, dulce: 2, grasa: 5, aroma: 7 },
    timeMin: 40,
    servings: 4,
    difficulty: "media",
    moods: ["ligero", "fiesta"],
    ingredients: [
      { item: "Garbanzos secos (remojados)", amount: "300 g", key: "garbanzo" },
      { item: "Cilantro y perejil", amount: "1 taza", key: "cilantro" },
      { item: "Cebolla y ajo", amount: "½ y 3", key: "ajo" },
      { item: "Comino y cilantro semilla", amount: "1 cdita", key: "comino" },
      { item: "Hummus y pita", amount: "para servir", key: "garbanzo" },
      { item: "Pepino, tomate, encurtidos", amount: "ensalada", key: "tomate" },
    ],
    steps: [
      "Nunca uses garbanzo de lata. Remoja 12 h, escurre, procesa con hierbas y especias.",
      "Reposa la masa 30 min. Forma bolas. Fríe a 170 °C hasta verde por dentro, crujiente por fuera.",
      "Arma el plato: hummus, falafel, ensalada, nabo encurtido, tahini.",
      "Un golpe de limón al final. Se come con las manos, de pie o en terraza.",
    ],
    story:
      "Croqueta de calle y de viernes. El falafel bueno es hierba molida, no harina: debe oler a jardín cuando se parte.",
    tip: "Si la masa está húmeda, un poco de garbanzo en harina. Si está seca, un hilo de agua. Nunca huevo.",
    image: "/dishes/falafel.jpg",
    tags: ["garbanzo", "beirut", "frito", "mezze"],
  },
  {
    slug: "empanadas-criollas",
    name: "Empanadas criollas",
    nameLocal: "Empanadas de horno",
    country: "Argentina",
    city: "Salta / Buenos Aires",
    regionId: "latam",
    flavors: ["ahumado", "umami", "citrico"],
    profile: { picante: 3, umami: 7, acido: 4, dulce: 2, grasa: 6, aroma: 6 },
    timeMin: 70,
    servings: 8,
    difficulty: "media",
    moods: ["fiesta"],
    ingredients: [
      { item: "Tapas de empanada", amount: "12", key: "trigo" },
      { item: "Nalga o tapa de asado", amount: "500 g", key: "res" },
      { item: "Cebolla y cebolla de verdeo", amount: "2 y 4", key: "cebolla" },
      { item: "Comino, pimentón, ají", amount: "al ras", key: "comino" },
      { item: "Huevo duro", amount: "2", key: "huevo" },
      { item: "Aceitunas verdes", amount: "80 g", key: "aceituna" },
      { item: "Chimichurri", amount: "para servir", key: "cilantro" },
    ],
    steps: [
      "Pica la carne a cuchillo (no molida). Sofríe cebolla, especias, luego la carne al rojo.",
      "Enfría el recado. Suma huevo, verdeo y aceitunas.",
      "Rellena, repulga. Horno 200 °C hasta dorar.",
      "Chimichurri y vino. Se comen de pie, de a dos, discutiendo si Salta o Tucumán gana.",
    ],
    story:
      "Cada provincia tiene su dogma: jugo, papa, pasas, picante. La criolla de horno es el pasaporte de cualquier asado que se respete.",
    tip: "El recado se arma el día anterior. En frío, el jugo se gelifica y no rompe la tapa.",
    image: "/dishes/empanadas-criollas.jpg",
    tags: ["horno", "argentina", "asado", "picada"],
  },
  {
    slug: "boeuf-bourguignon",
    name: "Bœuf bourguignon",
    nameLocal: "Bœuf bourguignon",
    country: "Francia",
    city: "Borgoña",
    regionId: "europa",
    flavors: ["umami", "ahumado", "herbal"],
    profile: { picante: 1, umami: 10, acido: 4, dulce: 3, grasa: 7, aroma: 8 },
    timeMin: 180,
    servings: 6,
    difficulty: "media",
    moods: ["consuelo", "impresionar"],
    ingredients: [
      { item: "Carrillera o chuck de res", amount: "1.2 kg", key: "res" },
      { item: "Vino tinto de Borgoña", amount: "750 ml", key: "vino" },
      { item: "Panceta", amount: "150 g", key: "cerdo" },
      { item: "Champiñones", amount: "250 g", key: "hongo" },
      { item: "Cebollitas francesas", amount: "250 g", key: "cebolla" },
      { item: "Zanahoria", amount: "3", key: "zanahoria" },
      { item: "Tomillo y laurel", amount: "1 ramo", key: "tomillo" },
      { item: "Ajo", amount: "4 dientes", key: "ajo" },
    ],
    steps: [
      "Dora la res en tandas. Sofríe panceta, cebolla y zanahoria.",
      "Flambea con un chorro de vino, cubre con el resto y el ramo. Horno 160 °C 2½ h.",
      "Saltea hongos y cebollitas aparte; súmalos al final.",
      "Sirve con puré o pan de pueblo. Reposa mejor al día siguiente.",
    ],
    story:
      "Campesino y de mantel largo a la vez. Julia Child lo llevó al mundo; Borgoña lo cocinaba desde que el vino supo esperar.",
    tip: "Usa un vino que te beberías. El bourguignon no es un basurero de botellas tristes.",
    image: "/dishes/boeuf-bourguignon.jpg",
    tags: ["estofado", "vino", "francia", "invierno"],
  },
  {
    slug: "lomo-saltado",
    name: "Lomo saltado",
    nameLocal: "Lomo saltado",
    country: "Perú",
    city: "Lima",
    regionId: "latam",
    flavors: ["umami", "ahumado", "citrico"],
    profile: { picante: 4, umami: 8, acido: 6, dulce: 2, grasa: 6, aroma: 7 },
    timeMin: 35,
    servings: 4,
    difficulty: "fácil",
    moods: ["fiesta", "consuelo"],
    ingredients: [
      { item: "Lomo de res", amount: "600 g", key: "res" },
      { item: "Tomate pera", amount: "3", key: "tomate" },
      { item: "Cebolla roja", amount: "2", key: "cebolla" },
      { item: "Salsa de soya", amount: "3 cdas", key: "soya" },
      { item: "Ají amarillo", amount: "1", key: "chile" },
      { item: "Papas fritas", amount: "400 g", key: "papa" },
      { item: "Arroz blanco", amount: "para servir", key: "arroz" },
      { item: "Cilantro y vinagre", amount: "al gusto", key: "cilantro" },
    ],
    steps: [
      "Corta el lomo en tiras. Saltea a fuego muy alto en tandas, sin hervir la carne.",
      "Saca la carne. En el mismo wok, saltea cebolla, tomate y ají. Deben quedar crujientes.",
      "Vuelve el lomo. Soya, un chorro de vinagre, cilantro. 30 segundos.",
      "Sirve sobre arroz y cubre con papas recién fritas. El jugo las empapa.",
    ],
    story:
      "Hijo del barrio chino de Lima: wok chino, ají andino, papa frita criolla. El saltado es el mestizaje que Perú se come todas las noches.",
    tip: "El wok tiene que humear. Si no chisporrotea, es un estofado disfrazado.",
    image: "/dishes/lomo-saltado.jpg",
    tags: ["wok", "peru", "chifa", "semana"],
  },
  {
    slug: "pupusas",
    name: "Pupusas",
    nameLocal: "Pupusas revueltas",
    country: "El Salvador",
    city: "Olocuilta",
    regionId: "latam",
    flavors: ["cremoso", "fresco", "picante"],
    profile: { picante: 4, umami: 6, acido: 6, dulce: 1, grasa: 6, aroma: 5 },
    timeMin: 50,
    servings: 4,
    difficulty: "media",
    moods: ["fiesta", "consuelo"],
    ingredients: [
      { item: "Masa de maíz", amount: "500 g", key: "maiz" },
      { item: "Queso fresco rallado", amount: "250 g", key: "leche" },
      { item: "Frijoles refritos", amount: "200 g", key: "frijol" },
      { item: "Chicharrón molido", amount: "150 g", key: "cerdo" },
      { item: "Repollo para curtido", amount: "1/4", key: "repollo" },
      { item: "Vinagre y orégano", amount: "al ras", key: "limon" },
      { item: "Salsa roja", amount: "1 taza", key: "tomate" },
    ],
    steps: [
      "Arma el curtido: repollo, zanahoria, vinagre, orégano. Deja enfriar.",
      "Mezcla queso, frijol y chicharrón. Forma bolas de masa, rellena, cierra sin grietas.",
      "Plancha a fuego medio hasta que doren por ambos lados y el queso pida salir.",
      "Curtido abundante y salsa. Se comen con las manos, de pie, sin prisa.",
    ],
    story:
      "Plato nacional y desayuno, almuerzo y cena. El curtido no es adorno: es el ácido que abre el maíz.",
    tip: "Mojar las manos en agua con un toque de aceite evita que la masa se pegue y se agriete.",
    image: "/dishes/pupusas.jpg",
    tags: ["maiz", "salvador", "calle", "queso"],
  },
  {
    slug: "moqueca-baiana",
    name: "Moqueca baiana",
    nameLocal: "Moqueca",
    country: "Brasil",
    city: "Salvador",
    regionId: "latam",
    flavors: ["cremoso", "citrico", "picante"],
    profile: { picante: 4, umami: 7, acido: 6, dulce: 3, grasa: 7, aroma: 8 },
    timeMin: 45,
    servings: 4,
    difficulty: "fácil",
    moods: ["fiesta", "impresionar"],
    ingredients: [
      { item: "Pescado firme (corvina o róbalo)", amount: "800 g", key: "pescado" },
      { item: "Leche de coco", amount: "400 ml", key: "coco" },
      { item: "Aceite de dendê", amount: "3 cdas", key: "coco" },
      { item: "Pimiento y tomate", amount: "2 y 2", key: "tomate" },
      { item: "Cebolla y ajo", amount: "1 y 3", key: "cebolla" },
      { item: "Cilantro y jugo de lima", amount: "al gusto", key: "cilantro" },
      { item: "Ají malagueta", amount: "1", key: "chile" },
      { item: "Arroz blanco", amount: "para servir", key: "arroz" },
    ],
    steps: [
      "Marina el pescado con lima, ajo y sal. 20 minutos.",
      "En una olla de barro, capa de cebolla, pimiento y tomate. Encima el pescado.",
      "Coco, dendê, malagueta. Tapa. 15 minutos a fuego medio, sin revolver.",
      "Cilantro al final. Sirve con arroz y farofa si hay.",
    ],
    story:
      "Bahía en una olla: África, Portugal y el Atlántico. El dendê no se sustituye; si no hay, espera a que haya.",
    tip: "No remuevas. El pescado se deshace. Inclina la olla para bañarlo con el caldo.",
    image: "/dishes/moqueca-baiana.jpg",
    tags: ["pescado", "coco", "bahia", "estofado"],
  },
  {
    slug: "arepas",
    name: "Arepas",
    nameLocal: "Arepa rellena",
    country: "Colombia",
    city: "Medellín",
    regionId: "latam",
    flavors: ["cremoso", "umami", "fresco"],
    profile: { picante: 2, umami: 6, acido: 3, dulce: 1, grasa: 6, aroma: 5 },
    timeMin: 40,
    servings: 4,
    difficulty: "fácil",
    moods: ["consuelo", "fiesta"],
    ingredients: [
      { item: "Harina de maíz precocida", amount: "500 g", key: "maiz" },
      { item: "Agua tibia y sal", amount: "600 ml", key: "maiz" },
      { item: "Queso campesino", amount: "250 g", key: "leche" },
      { item: "Tomate para hogao", amount: "3", key: "tomate" },
      { item: "Cebolla larga", amount: "4", key: "cebolla" },
      { item: "Mantequilla", amount: "1 cda", key: "leche" },
      { item: "Cilantro", amount: "un ramito", key: "cilantro" },
    ],
    steps: [
      "Mezcla harina, agua y sal. Reposa 5 minutos. Forma discos de 1.5 cm.",
      "Plancha o budare hasta que doren y suenen huecas. Abre con cuchillo.",
      "Hogao: sofríe cebolla larga y tomate con mantequilla hasta que se vuelva salsa.",
      "Rellena con queso y hogao. Se come con la mano, de camino al trabajo.",
    ],
    story:
      "Venezuela y Colombia se pelean la paternidad. Da igual: el maíz redondo es desayuno de un continente.",
    tip: "Si la masa se raya al formar, le falta agua. Si se pega, un poco más de harina.",
    image: "/dishes/arepas.jpg",
    tags: ["maiz", "colombia", "desayuno", "queso"],
  },
  {
    slug: "mapo-tofu",
    name: "Mapo tofu",
    nameLocal: "麻婆豆腐",
    country: "China",
    city: "Chengdu",
    regionId: "asia-este",
    flavors: ["picante", "umami", "ahumado"],
    profile: { picante: 9, umami: 9, acido: 2, dulce: 2, grasa: 7, aroma: 8 },
    timeMin: 25,
    servings: 3,
    difficulty: "media",
    moods: ["consuelo", "impresionar"],
    ingredients: [
      { item: "Tofu sedoso", amount: "400 g", key: "tofu" },
      { item: "Carne de cerdo picada", amount: "150 g", key: "cerdo" },
      { item: "Doubanjiang", amount: "2 cdas", key: "chile" },
      { item: "Pimienta de Sichuan", amount: "1 cdita", key: "chile" },
      { item: "Ajo y jengibre", amount: "3 y 1", key: "ajo" },
      { item: "Salsa de soya", amount: "1 cda", key: "soya" },
      { item: "Cebollín", amount: "2", key: "cebolla" },
      { item: "Aceite de chile", amount: "2 cdas", key: "chile" },
    ],
    steps: [
      "Corta el tofu en cubos. Blánchalo 1 minuto en agua salada para que no se rompa.",
      "Sofríe el cerdo. Añade doubanjiang, ajo y jengibre hasta que el aceite se vuelva rojo.",
      "Tofu, soya, un poco de caldo. Hierve suave 3 minutos. Espesa con almidón.",
      "Pimienta de Sichuan tostada y cebollín. Tiene que hormiguear la lengua.",
    ],
    story:
      "La viuda Chen lo inventó en Chengdu. Málà: picante que quema y pimienta que adormece. No es opcional.",
    tip: "No revuelvas con cuchara: mueve la olla. El tofu se defiende mal.",
    image: "/dishes/mapo-tofu.jpg",
    tags: ["sichuan", "picante", "tofu", "rapido"],
  },
  {
    slug: "okonomiyaki",
    name: "Okonomiyaki",
    nameLocal: "お好み焼き",
    country: "Japón",
    city: "Osaka",
    regionId: "asia-este",
    flavors: ["umami", "dulce", "ahumado"],
    profile: { picante: 2, umami: 8, acido: 3, dulce: 5, grasa: 6, aroma: 6 },
    timeMin: 30,
    servings: 2,
    difficulty: "fácil",
    moods: ["fiesta", "consuelo"],
    ingredients: [
      { item: "Repollo rallado", amount: "300 g", key: "repollo" },
      { item: "Harina", amount: "100 g", key: "trigo" },
      { item: "Huevo", amount: "2", key: "huevo" },
      { item: "Dashi o agua", amount: "120 ml", key: "soya" },
      { item: "Panceta en tiras", amount: "6 lonchas", key: "cerdo" },
      { item: "Salsa okonomiyaki y mayo", amount: "al gusto", key: "soya" },
      { item: "Katsuobushi y aonori", amount: "para servir", key: "pescado" },
    ],
    steps: [
      "Mezcla harina, huevo, dashi. Incorpora el repollo. La masa debe ser espesa.",
      "En plancha, un disco de masa. Encima la panceta. Voltea cuando dore.",
      "Pincela salsa, zigzag de mayo, aonori y bonito que se mueve con el calor.",
      "Corta en porciones. Se come en la plancha, discutiendo Osaka contra Hiroshima.",
    ],
    story:
      "Okonomi: como te guste. Osaka lo volvió antojo de medianoche, con el vapor de la teppan y el bonito bailando.",
    tip: "No comprimas la masa. El aire entre el repollo es lo que la hace ligera.",
    image: "/dishes/okonomiyaki.jpg",
    tags: ["japon", "plancha", "calle", "repollo"],
  },
  {
    slug: "gyoza",
    name: "Gyoza",
    nameLocal: "餃子",
    country: "Japón",
    city: "Utsunomiya",
    regionId: "asia-este",
    flavors: ["umami", "ahumado", "fresco"],
    profile: { picante: 3, umami: 8, acido: 4, dulce: 2, grasa: 6, aroma: 7 },
    timeMin: 45,
    servings: 4,
    difficulty: "media",
    moods: ["fiesta", "impresionar"],
    ingredients: [
      { item: "Tapas de gyoza", amount: "30", key: "trigo" },
      { item: "Cerdo picado", amount: "300 g", key: "cerdo" },
      { item: "Repollo picado", amount: "200 g", key: "repollo" },
      { item: "Ajo y jengibre", amount: "2 y 1", key: "ajo" },
      { item: "Cebollín", amount: "3", key: "cebolla" },
      { item: "Soya y sésamo", amount: "1 cda c/u", key: "soya" },
      { item: "Vinagre y chile para dip", amount: "al gusto", key: "limon" },
    ],
    steps: [
      "Sala el repollo, escurre. Mezcla con cerdo, ajo, jengibre, soya.",
      "Rellena, pliega en abanico. No sobrecargues o revientan.",
      "Sartén con aceite. Acomoda en círculo. Cuando doren, un chorro de agua y tapa 6 min.",
      "Destapa, deja evaporar hasta la falda crujiente. Dip de vinagre, soya y raya de chile.",
    ],
    story:
      "Primo del jiaozi que Japón hizo suyo: un lado tostado, el otro al vapor. La falda de almidón es vanidad permitida.",
    tip: "Una cucharadita de harina en el agua de vapor hace la encaje dorado.",
    image: "/dishes/gyoza.jpg",
    tags: ["japon", "dumpling", "cerdo", "aperitivo"],
  },
  {
    slug: "chicken-biryani",
    name: "Biryani de pollo",
    nameLocal: "حیدرآبادی بریانی",
    country: "India",
    city: "Hyderabad",
    regionId: "asia-sur",
    flavors: ["ahumado", "picante", "herbal"],
    profile: { picante: 6, umami: 7, acido: 3, dulce: 3, grasa: 6, aroma: 10 },
    timeMin: 90,
    servings: 6,
    difficulty: "alta",
    moods: ["fiesta", "impresionar"],
    ingredients: [
      { item: "Pollo en trozos", amount: "1 kg", key: "pollo" },
      { item: "Arroz basmati", amount: "500 g", key: "arroz" },
      { item: "Yogur", amount: "200 g", key: "yogurt" },
      { item: "Cebolla caramelizada", amount: "3", key: "cebolla" },
      { item: "Azafrán en leche", amount: "una pizca", key: "leche" },
      { item: "Jengibre, ajo, chile", amount: "pasta", key: "jengibre" },
      { item: "Menta y cilantro", amount: "1 taza", key: "cilantro" },
      { item: "Ghee y garam masala", amount: "3 cdas", key: "leche" },
    ],
    steps: [
      "Marina el pollo en yogur, pasta de jengibre-ajo, chili y garam masala. 1 hora mínimo.",
      "Parboiled el basmati 70%. Escurre.",
      "En olla pesada: pollo al fondo, hierbas, cebolla, arroz, azafrán, ghee. Sella con masa o tapa húmeda.",
      "Dum: fuego bajo 25 minutos. Reposa 10. Mezcla en vertical, no en círculos.",
    ],
    story:
      "Cocina de corte nizamí. El dum —vapor preso— es el truco: el arroz se perfume sin volverse risotto.",
    tip: "El arroz se pasa en un parpadeo. Sácalo cuando el grano aún tiene un punto blanco.",
    image: "/dishes/chicken-biryani.jpg",
    tags: ["india", "arroz", "fiesta", "especias"],
  },
  {
    slug: "laksa",
    name: "Laksa",
    nameLocal: "Laksa lemak",
    country: "Malasia",
    city: "Penang",
    regionId: "asia-sur",
    flavors: ["picante", "cremoso", "citrico"],
    profile: { picante: 7, umami: 8, acido: 6, dulce: 3, grasa: 7, aroma: 9 },
    timeMin: 50,
    servings: 4,
    difficulty: "media",
    moods: ["consuelo", "impresionar"],
    ingredients: [
      { item: "Fideos de arroz", amount: "400 g", key: "fideos" },
      { item: "Leche de coco", amount: "400 ml", key: "coco" },
      { item: "Pasta laksa o chili-lemongrass", amount: "4 cdas", key: "chile" },
      { item: "Camarones", amount: "300 g", key: "camaron" },
      { item: "Tofu frito (tau pok)", amount: "150 g", key: "tofu" },
      { item: "Germinados y cilantro", amount: "al gusto", key: "cilantro" },
      { item: "Lima y aceite de chile", amount: "para servir", key: "limon" },
      { item: "Caldo de camarón", amount: "800 ml", key: "camaron" },
    ],
    steps: [
      "Sofríe la pasta hasta que el aceite se separe. Coco y caldo. Hierve 10 minutos.",
      "Camarones y tofu. Sal y un toque de azúcar de palma.",
      "Fideos escaldados en el plato. Baña con el caldo.",
      "Germinados, cilantro, lima, chile. Se come con cuchara y palillos a la vez.",
    ],
    story:
      "Nyonya: cocina peranakan, entre China y el archipiélago. El laksa es el mediodía húmedo de Penang en un tazón.",
    tip: "Si no hay pasta lista, licúa chile, lemongrass, galanga, pasta de camarón y chalota.",
    image: "/dishes/laksa.jpg",
    tags: ["malasia", "coco", "fideos", "picante"],
  },
  {
    slug: "palak-paneer",
    name: "Palak paneer",
    nameLocal: "पालक पनीर",
    country: "India",
    city: "Punyab",
    regionId: "asia-sur",
    flavors: ["herbal", "cremoso", "picante"],
    profile: { picante: 4, umami: 5, acido: 2, dulce: 2, grasa: 6, aroma: 7 },
    timeMin: 40,
    servings: 4,
    difficulty: "fácil",
    moods: ["consuelo", "ligero"],
    ingredients: [
      { item: "Espinaca fresca", amount: "500 g", key: "espinaca" },
      { item: "Paneer", amount: "250 g", key: "leche" },
      { item: "Cebolla, ajo, jengibre", amount: "1, 3, 1", key: "cebolla" },
      { item: "Tomate", amount: "1", key: "tomate" },
      { item: "Garam masala y comino", amount: "1 cdita c/u", key: "comino" },
      { item: "Nata o crema", amount: "3 cdas", key: "leche" },
      { item: "Chile verde", amount: "1", key: "chile" },
      { item: "Ghee", amount: "2 cdas", key: "leche" },
    ],
    steps: [
      "Blanchea la espinaca 30 segundos, hielo, licúa. Conserva el verde.",
      "Sofríe comino, cebolla, ajo, jengibre, tomate y chile.",
      "Suma el puré de palak. 5 minutos. Nata. Ajusta sal.",
      "Cubos de paneer al final, solo para calentar. Naan o arroz.",
    ],
    story:
      "El verde del Punyab. El paneer no se fríe aquí: se baña. Un curry que consuela sin pedir carne.",
    tip: "Un pellizco de azúcar y un chorro de limón al final avivan el verde y el sabor.",
    image: "/dishes/palak-paneer.jpg",
    tags: ["india", "vegetariano", "espinaca", "curry"],
  },
  {
    slug: "nasi-goreng",
    name: "Nasi goreng",
    nameLocal: "Nasi goreng",
    country: "Indonesia",
    city: "Yakarta",
    regionId: "asia-sur",
    flavors: ["umami", "picante", "ahumado"],
    profile: { picante: 6, umami: 8, acido: 3, dulce: 5, grasa: 5, aroma: 7 },
    timeMin: 25,
    servings: 2,
    difficulty: "fácil",
    moods: ["consuelo", "fiesta"],
    ingredients: [
      { item: "Arroz del día anterior", amount: "3 tazas", key: "arroz" },
      { item: "Huevo frito", amount: "2", key: "huevo" },
      { item: "Kecap manis", amount: "2 cdas", key: "soya" },
      { item: "Pasta de camarón (terasi)", amount: "1/2 cdita", key: "camaron" },
      { item: "Chalota, ajo, chile", amount: "al ras", key: "ajo" },
      { item: "Camarones o pollo", amount: "150 g", key: "camaron" },
      { item: "Pepino y krupuk", amount: "para servir", key: "limon" },
    ],
    steps: [
      "Sofríe chalota, ajo, chile y terasi hasta que huela a mar y humo.",
      "Proteína. Luego el arroz frío, desmenuzado. Kecap manis. Fuego alto.",
      "Huevo frito con borde crujiente. Pepino, sambal, krupuk.",
      "El arroz tiene que quedar grano a grano, oscuro y brillante.",
    ],
    story:
      "Desayuno nacional de Indonesia. El arroz de ayer no es sobra: es el punto de partida.",
    tip: "Arroz recién hecho se pega. Lo de ayer, en la nevera, es ley.",
    image: "/dishes/nasi-goreng.jpg",
    tags: ["indonesia", "arroz", "wok", "desayuno"],
  },
  {
    slug: "moussaka",
    name: "Musaca",
    nameLocal: "Μουσακάς",
    country: "Grecia",
    city: "Atenas",
    regionId: "mediterraneo",
    flavors: ["cremoso", "umami", "herbal"],
    profile: { picante: 2, umami: 8, acido: 3, dulce: 3, grasa: 8, aroma: 7 },
    timeMin: 110,
    servings: 6,
    difficulty: "media",
    moods: ["consuelo", "impresionar"],
    ingredients: [
      { item: "Berenjenas", amount: "3 grandes", key: "berenjena" },
      { item: "Cordero picado", amount: "500 g", key: "cordero" },
      { item: "Tomate triturado", amount: "400 g", key: "tomate" },
      { item: "Canela y orégano", amount: "1 cdita", key: "canela" },
      { item: "Cebolla y ajo", amount: "1 y 3", key: "cebolla" },
      { item: "Leche para bechamel", amount: "600 ml", key: "leche" },
      { item: "Mantequilla y harina", amount: "50 g c/u", key: "trigo" },
      { item: "Queso kefalotyri o parmesano", amount: "80 g", key: "leche" },
    ],
    steps: [
      "Sala y asa las berenjenas hasta dorar. Escurre amargor.",
      "Sofríe cordero, cebolla, tomate, canela. Reduce a ragú seco.",
      "Bechamel espesa con nuez moscada. Capas: berenjena, carne, berenjena, bechamel.",
      "Horno 180 °C 40 minutos. Reposa 20 antes de cortar o se desmorona.",
    ],
    story:
      "Tselementes la afrancesó con bechamel en el siglo XX. Debajo sigue el Egeo: berenjena, cordero, canela.",
    tip: "Asar las berenjenas, no freírlas, evita un pastel de aceite.",
    image: "/dishes/moussaka.jpg",
    tags: ["grecia", "horno", "cordero", "bechamel"],
  },
  {
    slug: "cacio-e-pepe",
    name: "Cacio e pepe",
    nameLocal: "Cacio e pepe",
    country: "Italia",
    city: "Roma",
    regionId: "mediterraneo",
    flavors: ["cremoso", "umami"],
    profile: { picante: 3, umami: 8, acido: 1, dulce: 1, grasa: 7, aroma: 6 },
    timeMin: 20,
    servings: 2,
    difficulty: "media",
    moods: ["impresionar", "consuelo"],
    ingredients: [
      { item: "Tonnarelli o spaghetti", amount: "250 g", key: "trigo" },
      { item: "Pecorino romano", amount: "120 g", key: "leche" },
      { item: "Pimienta negra en grano", amount: "2 cditas", key: "pimienta" },
      { item: "Sal gruesa", amount: "para el agua", key: "sal" },
    ],
    steps: [
      "Tuesta la pimienta en sartén seca. Machácala. Un chapuzón de agua de pasta la abre.",
      "Pasta en agua poco salada, más concentrada de lo habitual.",
      "Fuera del fuego: pecorino rallado fino + agua de pasta hasta crema. Nunca nata.",
      "Emulsiona con la pasta. Si gruma, más agua caliente y pulso. Sirve ya.",
    ],
    story:
      "Tres ingredientes y ninguna red de seguridad. Los pastores la llevaban: pecorino que viaja, pimienta que calienta, trigo.",
    tip: "El pecorino se ralla como polvo. Si está grueso, no emulsiona.",
    image: "/dishes/cacio-e-pepe.jpg",
    tags: ["roma", "pasta", "rapido", "queso"],
  },
  {
    slug: "gazpacho",
    name: "Gazpacho",
    nameLocal: "Gazpacho andaluz",
    country: "España",
    city: "Sevilla",
    regionId: "mediterraneo",
    flavors: ["fresco", "citrico", "herbal"],
    profile: { picante: 1, umami: 4, acido: 7, dulce: 4, grasa: 4, aroma: 6 },
    timeMin: 20,
    servings: 4,
    difficulty: "fácil",
    moods: ["ligero"],
    ingredients: [
      { item: "Tomates maduros", amount: "1 kg", key: "tomate" },
      { item: "Pepino", amount: "1", key: "pepino" },
      { item: "Pimiento verde", amount: "1", key: "pimiento" },
      { item: "Ajo", amount: "1 diente", key: "ajo" },
      { item: "Pan del día anterior", amount: "80 g", key: "trigo" },
      { item: "Aceite de oliva virgen", amount: "80 ml", key: "aceite" },
      { item: "Vinagre de Jerez", amount: "2 cdas", key: "limon" },
      { item: "Sal", amount: "al ras", key: "sal" },
    ],
    steps: [
      "Remoja el pan. Licúa tomate, pepino, pimiento, ajo y pan.",
      "Con el motor andando, hila el aceite. Vinagre y sal.",
      "Pasa por chino si quieres seda. Enfría al menos 2 horas.",
      "Picadillo de verdura y un hilo de aceite. Se bebe, no se cucharea.",
    ],
    story:
      "El aire acondicionado de Andalucía antes de que existiera. Pan, aceite, huerta: el verano en un vaso.",
    tip: "Tomate feo y maduro. El de nevera, duro, hace gazpacho de cartón.",
    image: "/dishes/gazpacho.jpg",
    tags: ["andalucia", "frio", "verano", "crudo"],
  },
  {
    slug: "risotto-ai-funghi",
    name: "Risotto ai funghi",
    nameLocal: "Risotto ai funghi porcini",
    country: "Italia",
    city: "Milán",
    regionId: "europa",
    flavors: ["umami", "cremoso", "herbal"],
    profile: { picante: 0, umami: 9, acido: 2, dulce: 2, grasa: 7, aroma: 8 },
    timeMin: 40,
    servings: 4,
    difficulty: "media",
    moods: ["consuelo", "impresionar"],
    ingredients: [
      { item: "Arroz arborio o carnaroli", amount: "320 g", key: "arroz" },
      { item: "Porcini secos y frescos", amount: "30 g y 200 g", key: "hongo" },
      { item: "Cebolla", amount: "1 pequeña", key: "cebolla" },
      { item: "Vino blanco", amount: "120 ml", key: "vino" },
      { item: "Caldo de verdura", amount: "1.2 l", key: "caldo" },
      { item: "Mantequilla y parmesano", amount: "50 g y 60 g", key: "leche" },
      { item: "Tomillo", amount: "unas ramitas", key: "tomillo" },
    ],
    steps: [
      "Hidratar porcini; reserva el líquido colado. Pica los frescos.",
      "Sofríe cebolla en mantequilla. Arroz hasta que transparente. Vino.",
      "Caldo caliente, cucharón a cucharón, 16 minutos. Hongos a mitad.",
      "Fuera del fuego: mantequilla y parmesano. Mantecare. Reposa 1 minuto.",
    ],
    story:
      "El norte de Italia en otoño. El arroz no es guarnición: es el bosque removido con paciencia.",
    tip: "El caldo no hierve el arroz; lo acaricia. Si hierve a saltos, se rompe el grano.",
    image: "/dishes/risotto-ai-funghi.jpg",
    tags: ["italia", "hongos", "cremoso", "otono"],
  },
  {
    slug: "goulash",
    name: "Gulash",
    nameLocal: "Gulyás",
    country: "Hungría",
    city: "Budapest",
    regionId: "europa",
    flavors: ["ahumado", "umami", "picante"],
    profile: { picante: 4, umami: 8, acido: 3, dulce: 3, grasa: 6, aroma: 8 },
    timeMin: 150,
    servings: 6,
    difficulty: "fácil",
    moods: ["consuelo"],
    ingredients: [
      { item: "Aguja de res", amount: "1 kg", key: "res" },
      { item: "Pimentón dulce húngaro", amount: "3 cdas", key: "pimenton" },
      { item: "Cebolla", amount: "3", key: "cebolla" },
      { item: "Papa", amount: "400 g", key: "papa" },
      { item: "Pimiento", amount: "2", key: "pimiento" },
      { item: "Comino y ajo", amount: "1 cdita y 3", key: "comino" },
      { item: "Tomate", amount: "2", key: "tomate" },
      { item: "Nata agria", amount: "para servir", key: "leche" },
    ],
    steps: [
      "Cebolla a fuego lento hasta oro. Fuera del fuego, pimentón —si se quema, amarga.",
      "Carne, ajo, comino, tomate. Cubre con agua. 90 minutos.",
      "Papa y pimiento. Otros 30, hasta que la res se rinda.",
      "Nata y pan. En Hungría es sopa; en el resto, estofado. Da igual, está bueno.",
    ],
    story:
      "Comida de pastores magiares. El pimentón no es color: es el alma. Sin él, es otro guiso.",
    tip: "Pimentón fresco, de lata reciente. El viejo sabe a polvo de armario.",
    image: "/dishes/goulash.jpg",
    tags: ["hungria", "estofado", "pimenton", "invierno"],
  },
  {
    slug: "pierogi",
    name: "Pierogi",
    nameLocal: "Pierogi ruskie",
    country: "Polonia",
    city: "Cracovia",
    regionId: "europa",
    flavors: ["cremoso", "umami", "ahumado"],
    profile: { picante: 1, umami: 7, acido: 3, dulce: 2, grasa: 6, aroma: 5 },
    timeMin: 80,
    servings: 4,
    difficulty: "media",
    moods: ["consuelo", "fiesta"],
    ingredients: [
      { item: "Harina", amount: "400 g", key: "trigo" },
      { item: "Huevo y agua", amount: "1 y 150 ml", key: "huevo" },
      { item: "Papa", amount: "500 g", key: "papa" },
      { item: "Queso blanco o ricota", amount: "250 g", key: "leche" },
      { item: "Cebolla caramelizada", amount: "2", key: "cebolla" },
      { item: "Mantequilla", amount: "40 g", key: "leche" },
      { item: "Nata agria", amount: "para servir", key: "leche" },
    ],
    steps: [
      "Masa: harina, huevo, agua, sal. Reposa 30 minutos.",
      "Puré de papa + queso + cebolla. Sal y pimienta.",
      "Discos, relleno, sella bien. Hierve hasta que floten. Dora en mantequilla.",
      "Más cebolla, nata, cebollino. Se comen de a doce, no de a tres.",
    ],
    story:
      "Ruskie no es de Rusia: es de Rutenia. Papa y queso, el relleno de domingo en cada casa polaca.",
    tip: "Sella con agua en los bordes. Un pierogi abierto en el agua es una tragedia menor.",
    image: "/dishes/pierogi.jpg",
    tags: ["polonia", "dumpling", "papa", "consuelo"],
  },
  {
    slug: "coq-au-vin",
    name: "Coq au vin",
    nameLocal: "Coq au vin",
    country: "Francia",
    city: "Borgoña",
    regionId: "europa",
    flavors: ["umami", "ahumado", "herbal"],
    profile: { picante: 1, umami: 9, acido: 4, dulce: 3, grasa: 7, aroma: 8 },
    timeMin: 140,
    servings: 4,
    difficulty: "media",
    moods: ["consuelo", "impresionar"],
    ingredients: [
      { item: "Pollo en cuartos", amount: "1.5 kg", key: "pollo" },
      { item: "Vino tinto", amount: "750 ml", key: "vino" },
      { item: "Panceta", amount: "120 g", key: "cerdo" },
      { item: "Champiñones", amount: "250 g", key: "hongo" },
      { item: "Cebollitas", amount: "200 g", key: "cebolla" },
      { item: "Ajo, tomillo, laurel", amount: "1 ramo", key: "ajo" },
      { item: "Harina y mantequilla", amount: "para ligar", key: "trigo" },
    ],
    steps: [
      "Dora el pollo y la panceta. Reserva.",
      "Sofríe cebolla. Flambea con vino. Vuelve el pollo, ramo, ajo. 1 hora tapado.",
      "Saltea hongos y cebollitas aparte. Súmalos. Liga la salsa si hace falta.",
      "Reposa. Al día siguiente está más hondo. Puré o pan.",
    ],
    story:
      "El gallo viejo que el vino ablanda. Campesino, de domingo, de cazuela que se pone en el centro y no se discute.",
    tip: "Marina el pollo en el vino la noche anterior si tienes tiempo. Cambia el plato.",
    image: "/dishes/coq-au-vin.jpg",
    tags: ["francia", "pollo", "vino", "estofado"],
  },
  {
    slug: "doro-wat",
    name: "Doro wat",
    nameLocal: "ዶሮ ወጥ",
    country: "Etiopía",
    city: "Adís Abeba",
    regionId: "africa",
    flavors: ["picante", "umami", "ahumado"],
    profile: { picante: 8, umami: 8, acido: 4, dulce: 3, grasa: 7, aroma: 9 },
    timeMin: 120,
    servings: 4,
    difficulty: "media",
    moods: ["fiesta", "impresionar"],
    ingredients: [
      { item: "Pollo en trozos", amount: "1 kg", key: "pollo" },
      { item: "Cebolla", amount: "4 grandes", key: "cebolla" },
      { item: "Berbere", amount: "3 cdas", key: "chile" },
      { item: "Mantequilla especiada (niter kibbeh)", amount: "4 cdas", key: "leche" },
      { item: "Pasta de ajo y jengibre", amount: "2 cdas", key: "ajo" },
      { item: "Huevos duros", amount: "4", key: "huevo" },
      { item: "Injera o pan plano", amount: "para servir", key: "trigo" },
      { item: "Vino o limón", amount: "un chorro", key: "limon" },
    ],
    steps: [
      "Cebolla picada, sin grasa, hasta que se derrita —30 a 40 minutos. Paciencia.",
      "Kibbeh, berbere, ajo, jengibre. El aceite se pone rojo.",
      "Pollo. Agua o vino hasta cubrir. 40 minutos. Huevos al final para que se tiñan.",
      "Injera debajo. Se come con la mano derecha, rompiendo el pan.",
    ],
    story:
      "El estofado de fiesta etíope. El berbere es una orquesta de chiles; la cebolla, el tiempo hecho salsa.",
    tip: "Si no hay injera, un pan plano ácido sirve. Lo dulce rompe el plato.",
    image: "/dishes/doro-wat.jpg",
    tags: ["etiopia", "picante", "pollo", "fiesta"],
  },
  {
    slug: "thieboudienne",
    name: "Thieboudienne",
    nameLocal: "Thieboudienne",
    country: "Senegal",
    city: "Saint-Louis",
    regionId: "africa",
    flavors: ["umami", "picante", "fresco"],
    profile: { picante: 4, umami: 8, acido: 4, dulce: 3, grasa: 5, aroma: 7 },
    timeMin: 90,
    servings: 6,
    difficulty: "media",
    moods: ["fiesta", "consuelo"],
    ingredients: [
      { item: "Pescado entero (pargo o corvina)", amount: "1 kg", key: "pescado" },
      { item: "Arroz partido", amount: "400 g", key: "arroz" },
      { item: "Pasta de tomate", amount: "3 cdas", key: "tomate" },
      { item: "Zanahoria, repollo, yuca", amount: "al gusto", key: "papa" },
      { item: "Cebolla y ajo", amount: "2 y 4", key: "cebolla" },
      { item: "Pimiento y chile", amount: "1 y 1", key: "chile" },
      { item: "Aceite y tamarindo o limón", amount: "al ras", key: "limon" },
    ],
    steps: [
      "Rellena el pescado con pasta de ajo, chile y hierbas. Dora.",
      "Sofríe tomate y cebolla. Agua, verduras grandes. Cocina y reserva.",
      "En ese caldo rojo, el arroz hasta que absorba y se toste un poco al fondo —el xooñ.",
      "Monta el plato comunal: arroz, pescado, verduras. Se come en círculo.",
    ],
    story:
      "Plato nacional de Senegal. El fondo tostado del arroz se disputa como el premio.",
    tip: "El arroz partido (broken rice) es el correcto. El grano largo no empapa igual.",
    image: "/dishes/thieboudienne.jpg",
    tags: ["senegal", "pescado", "arroz", "comunal"],
  },
  {
    slug: "koshari",
    name: "Koshari",
    nameLocal: "كشري",
    country: "Egipto",
    city: "El Cairo",
    regionId: "africa",
    flavors: ["umami", "picante", "citrico"],
    profile: { picante: 5, umami: 7, acido: 6, dulce: 3, grasa: 4, aroma: 6 },
    timeMin: 50,
    servings: 4,
    difficulty: "fácil",
    moods: ["consuelo", "fiesta"],
    ingredients: [
      { item: "Arroz", amount: "200 g", key: "arroz" },
      { item: "Lentejas", amount: "150 g", key: "lenteja" },
      { item: "Pasta corta", amount: "120 g", key: "trigo" },
      { item: "Garbanzos", amount: "200 g", key: "garbanzo" },
      { item: "Cebolla frita crujiente", amount: "2", key: "cebolla" },
      { item: "Salsa de tomate y vinagre", amount: "2 tazas", key: "tomate" },
      { item: "Salsa de ajo (daqqa)", amount: "al gusto", key: "ajo" },
      { item: "Chile", amount: "al gusto", key: "chile" },
    ],
    steps: [
      "Cocina aparte arroz, lentejas y pasta. Garbanzos al dente.",
      "Salsa: tomate, ajo, vinagre, comino. Daqqa: ajo, vinagre, cilantro, chile.",
      "Cebolla en pluma, frita hasta caoba.",
      "Monta en el plato: granos, salsa, daqqa, cebolla. Cada cucharada es un piso distinto.",
    ],
    story:
      "La comida callejera de El Cairo. Carbohidrato sobre carbohidrato, y aun así se extraña cuando no está.",
    tip: "La cebolla se fríe lento. Si se quema, amarga el plato entero.",
    image: "/dishes/koshari.jpg",
    tags: ["egipto", "calle", "lenteja", "vegetariano"],
  },
  {
    slug: "poulet-yassa",
    name: "Poulet yassa",
    nameLocal: "Yassa au poulet",
    country: "Senegal",
    city: "Casamance",
    regionId: "africa",
    flavors: ["citrico", "ahumado", "picante"],
    profile: { picante: 4, umami: 7, acido: 8, dulce: 4, grasa: 5, aroma: 7 },
    timeMin: 70,
    servings: 4,
    difficulty: "fácil",
    moods: ["fiesta", "consuelo"],
    ingredients: [
      { item: "Pollo en cuartos", amount: "1.2 kg", key: "pollo" },
      { item: "Cebolla", amount: "5 grandes", key: "cebolla" },
      { item: "Jugo de limón", amount: "120 ml", key: "limon" },
      { item: "Mostaza de Dijon", amount: "2 cdas", key: "mostaza" },
      { item: "Ajo", amount: "4 dientes", key: "ajo" },
      { item: "Chile", amount: "1", key: "chile" },
      { item: "Aceitunas (opcional)", amount: "un puñado", key: "aceituna" },
      { item: "Arroz blanco", amount: "para servir", key: "arroz" },
    ],
    steps: [
      "Marina el pollo con limón, mostaza, ajo, cebolla y chile. Mínimo 2 horas.",
      "Escurre. Asa o grilla el pollo hasta marcar.",
      "Carameliza la cebolla de la marinada a fuego medio. Suma el jugo, mostaza, un poco de agua.",
      "Pollo a la salsa 20 minutos. Aceitunas. Arroz para recoger el ácido.",
    ],
    story:
      "Casamance: cebolla hasta que duela, limón hasta que brille. El yassa es asado y estofado a la vez.",
    tip: "La cebolla tiene que rendirse. Si queda cruda, el plato pica a crudo y no a fiesta.",
    image: "/dishes/poulet-yassa.jpg",
    tags: ["senegal", "pollo", "limon", "cebolla"],
  },
];

export const RECIPES: Recipe[] = rebalanceImages([
  ...CORE_RECIPES,
  ...EXPANSION,
  ...WAVE,
  ...MESA,
  ...CURSOS,
  ...expandAtlas([...ATLAS_LATAM, ...ATLAS_EUROPA, ...ATLAS_ASIA, ...ATLAS_RESTO, ...ATLAS_EXTRA, ...ATLAS_NACIONES]),
].map(hydrateRecipe));

const BY_SLUG = new Map(RECIPES.map((r) => [r.slug, r]));

export function getRecipe(slug: string) {
  try {
    const decoded = decodeURIComponent(slug);
    return BY_SLUG.get(decoded) ?? BY_SLUG.get(slug);
  } catch {
    return BY_SLUG.get(slug);
  }
}

export function dailyRecipe(date = new Date()) {
  const start = Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate());
  const day = Math.floor(start / 86_400_000);
  return RECIPES[day % RECIPES.length] ?? RECIPES[0]!;
}

const REGION_RANK = new Map(REGIONS.map((r, i) => [r.id, i]));

const TOUR = [...RECIPES].sort((a, b) => {
  const ra = REGION_RANK.get(a.regionId) ?? 99;
  const rb = REGION_RANK.get(b.regionId) ?? 99;
  if (ra !== rb) return ra - rb;
  const ca = a.country.localeCompare(b.country, "es");
  if (ca !== 0) return ca;
  return a.name.localeCompare(b.name, "es");
});

export function getRegion(id: string) {
  return REGIONS.find((r) => r.id === id);
}

export function tourList() {
  return TOUR;
}

export function tourInRegion(id: RegionId) {
  return TOUR.filter((r) => r.regionId === id);
}

export function tourStop(slug: string) {
  const list = tourList();
  const index = list.findIndex((r) => r.slug === slug);
  return {
    index,
    total: list.length,
    prev: index > 0 ? list[index - 1] : undefined,
    next: index >= 0 && index < list.length - 1 ? list[index + 1] : undefined,
  };
}

export function pantryOverlap(recipe: Recipe, pantry: string[]) {
  if (pantry.length === 0) return 0;
  const set = new Set(pantry);
  const keys = new Set(recipe.ingredients.map((i) => i.key));
  let n = 0;
  for (const k of set) if (keys.has(k)) n += 1;
  return n;
}

export function familyMates(recipe: Recipe, limit = 6, seed = 1) {
  const pool = RECIPES.filter((r) => r.familyId === recipe.familyId && r.slug !== recipe.slug);
  return shuffleCopy(pool, seed).slice(0, limit);
}

export function similarRecipes(recipe: Recipe, limit = 3, seed = 1) {
  const ranked = RECIPES.filter((r) => r.slug !== recipe.slug)
    .map((r) => {
      const flavor = r.flavors.filter((f) => recipe.flavors.includes(f)).length;
      const region = r.regionId === recipe.regionId ? 2 : 0;
      const family = r.familyId === recipe.familyId ? 5 : 0;
      const country = r.country === recipe.country ? 4 : 0;
      const mood = r.moods.filter((m) => recipe.moods.includes(m)).length;
      return { recipe: r, score: flavor * 2 + region + country + mood + family };
    })
    .sort((a, b) => b.score - a.score)
    .map((x) => x.recipe);
  const same = ranked.filter((r) => r.country === recipe.country);
  const rest = ranked.filter((r) => r.country !== recipe.country);
  const pool = [...same, ...rest].slice(0, Math.max(limit * 4, 12));
  return shuffleCopy(pool, seed).slice(0, limit);
}

export interface Filters {
  query: string;
  flavors: FlavorId[];
  regionId: RegionId | null;
  country: string | null;
  mood: MoodId | null;
  boost: BoostId | null;
  pantry: string[];
  favoritesOnly: boolean;
  favoriteSlugs: string[];
}

export function filterRecipes(filters: Filters) {
  const q = filters.query.trim().toLowerCase();
  const tokens = q ? q.split(/\s+/).filter(Boolean) : [];

  const scored = RECIPES.map((recipe) => {
    if (filters.favoritesOnly && !filters.favoriteSlugs.includes(recipe.slug)) {
      return null;
    }
    if (filters.regionId && recipe.regionId !== filters.regionId) return null;
    if (filters.country && recipe.country !== filters.country) return null;
    if (filters.mood && !recipe.moods.includes(filters.mood)) return null;
    const boostPts = filters.boost ? boostScore(recipe, filters.boost) : 0;
    if (filters.boost && boostPts <= 0) return null;
    if (filters.flavors.length > 0) {
      const hit = filters.flavors.every((f) => recipe.flavors.includes(f));
      if (!hit) return null;
    }

    const hay = [
      recipe.name,
      recipe.nameLocal ?? "",
      recipe.country,
      recipe.city ?? "",
      recipe.story,
      ...recipe.tags,
      ...recipe.ingredients.map((i) => i.item),
      ...recipe.flavors,
      ...recipe.moods,
      recipe.familyId,
      boostHay(recipe),
    ]
      .join(" ")
      .toLowerCase();

    if (tokens.some((t) => !hay.includes(t))) return null;

    const overlap = pantryOverlap(recipe, filters.pantry);
    if (filters.pantry.length > 0 && overlap === 0) return null;

    let score = 0;
    if (q && recipe.name.toLowerCase().includes(q)) score += 8;
    score += overlap * 3;
    score += filters.flavors.filter((f) => recipe.flavors.includes(f)).length;
    if (filters.boost) score += boostPts * 3;
    return { recipe, score, overlap };
  }).filter((x): x is { recipe: Recipe; score: number; overlap: number } => x !== null);

  scored.sort((a, b) => b.score - a.score || a.recipe.name.localeCompare(b.recipe.name, "es"));
  return scored;
}

export function uniquePantryKeys() {
  return PANTRY_GROUPS.flatMap((g) => g.keys);
}
