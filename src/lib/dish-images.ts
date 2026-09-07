import type { FamilyId, RegionId } from "./recipe-types";

export interface ImageQuery {
  slug: string;
  name: string;
  country: string;
  regionId: RegionId;
  family: FamilyId;
}

const STOP = new Set([
  "plus", "con", "del", "los", "las", "the", "and", "with", "for",
  "aux", "una", "uno", "por", "para", "sin", "sobre",
]);

const FAMILY_HINTS: { family: FamilyId; needles: string[] }[] = [
  { family: "bebida", needles: ["cafe", "chai", "mate", "horchata", "lassi", "te-menta", "jamaica", "matcha", "canelazo", "bubble-tea", "ca-phe", "caipirinha", "chocolate-a-la-taza", "champurrado", "chicha", "gluhwein", "irish-coffee", "michelada", "mojito", "negroni", "paloma", "pisco", "sangria", "thai-iced", "teh-tarik", "ayran", "agua-de", "limonada"] },
  { family: "postre", needles: ["tiramisu", "tres-leches", "baklava", "knafeh", "alfajores", "pastel-de-nata", "mango-sticky", "gulab", "cannoli", "cheesecake", "creme-brulee", "daifuku", "flan", "panna-cotta", "sacher", "selva-negra", "sticky-toffee", "brigadeiro", "chocotorta", "milhojas", "picarones", "suspiro", "kaiserschmarrn", "kanelbulle", "tarta-santiago", "tarte-citron", "halo-halo", "cendol", "acai", "churros"] },
  { family: "desayuno", needles: ["shakshuka", "huevos", "changua", "dosa", "ful-medames", "menemen", "congee", "kaya-toast", "full-english", "breakfast-burrito", "idli", "jianbing", "calentado", "ackee"] },
  { family: "crudo", needles: ["ceviche", "poke", "som-tam", "larb", "fattoush", "gazpacho", "kitfo", "nicoise", "dakos", "caponata", "zaalouk", "hummus", "kokoda", "conch-salad"] },
  { family: "maiz", needles: ["taco", "pupusa", "arepa", "humita", "pastel-de-choclo", "pibil", "pozole", "gallo-pinto", "chilaquiles", "motulenos", "cou-cou"] },
  { family: "empanada", needles: ["empanada", "gyoza", "xiao-long", "pierogi", "pelmeni", "kibbeh", "spanakopita", "brik", "arancini", "takoyaki", "pani-puri", "bunuelos", "pastizzi"] },
  { family: "caldo", needles: ["pho", "ramen", "soup", "caldo", "chowder", "gumbo", "ajiaco", "sancocho", "wonton", "kimchi-jjigae", "sundubu", "tom-yum", "tom-kha", "hot-and-sour", "niu-rou", "goat-water", "naengmyeon"] },
  { family: "fideo", needles: ["pad-thai", "carbonara", "dan-dan", "japchae", "laksa", "khao-soi", "jajangmyeon", "fideua", "cacio", "lasagna", "gnocchi", "vongole", "pesto", "norma", "mee-goreng", "tteokbokki", "bun-cha", "banh-cuon"] },
  { family: "curry", needles: ["curry", "butter-chicken", "massaman", "vindaloo", "panang", "katsu-curry", "palak", "dal-makhani", "chole", "ema-datshi"] },
  { family: "brasa", needles: ["jerk", "brisket", "souvlaki", "koobideh", "carne-asada", "anticuchos", "nyama", "piri-piri", "satay", "char-siu", "shawarma", "shish", "siu-yuk", "pato-pekin", "cevapi", "kapana", "halloumi"] },
  { family: "frito", needles: ["tonkatsu", "schnitzel", "fish-and-chips", "falafel", "nashville", "poutine", "crab-cakes", "fried-steak", "doubles"] },
  { family: "pan", needles: ["pizza", "banh-mi", "cubano", "chivito", "lahmacun", "manakish", "croque", "bagels", "francesinha", "pan-con-tomate", "smorrebrod", "roti-canai", "sabich", "khachapuri", "dholl-puri"] },
  { family: "arroz", needles: ["paella", "jollof", "biryani", "nasi", "risotto", "yangzhou", "thieb", "koshari", "tacu", "jambalaya", "waakye", "com-tam", "hainanese", "oyakodon", "omurice", "bibimbap", "plov", "machboos", "shuwa"] },
];

const REGION_HINTS: { region: RegionId; needles: string[] }[] = [
  { region: "latam", needles: ["taco", "mole", "pozole", "pibil", "pupusa", "arepa", "humita", "choclo", "ajiaco", "sancocho", "feijoada", "moqueca", "empanada", "milanesa", "lomo", "ceviche", "tacu", "locro", "pepian", "chivito", "calentado", "changua", "huevos-pericos", "huevos-rancheros", "chilaquiles", "chiles", "horchata", "canelazo", "chicha", "champurrado", "cafe-de-olla", "michelada", "paloma", "caipirinha", "alfajores", "tres-leches", "brigadeiro", "chocotorta", "flan", "picarones", "suspiro", "bunuelos", "aji-de-gallina", "seco", "rabo"] },
  { region: "caribe", needles: ["jerk", "mofongo", "callaloo", "doubles", "pepperpot", "rondon", "ackee", "sandwich-cubano", "ropa-vieja", "mojito", "goat-water", "conch-salad", "oil-down", "cou-cou", "arroz-con-gandules"] },
  { region: "norte", needles: ["brisket", "poutine", "gumbo", "jambalaya", "nashville", "lobster", "clam-chowder", "bagels", "breakfast-burrito", "chicken-fried", "crab-cakes", "cioppino", "cheesecake", "kokoda", "palusami", "lap-lap"] },
  { region: "asia-este", needles: ["ramen", "pho", "mapo", "kimchi", "japchae", "jajangmyeon", "tonkatsu", "xiao-long", "gyoza", "dan-dan", "char-siu", "siu-yuk", "pato-pekin", "congee", "jianbing", "okonomiyaki", "oyakodon", "omurice", "nikujaga", "samgyetang", "sundubu", "tteokbokki", "bibimbap", "takoyaki", "matcha", "daifuku", "banh", "bun-cha", "com-tam", "hainanese", "wonton", "hot-and-sour", "kung-pao", "yangzhou", "naengmyeon"] },
  { region: "asia-sur", needles: ["pad-thai", "curry", "biryani", "dosa", "idli", "butter-chicken", "vindaloo", "massaman", "panang", "khao-soi", "laksa", "som-tam", "larb", "amok", "nasi", "rendang", "satay", "mee-goreng", "roti-canai", "cendol", "teh-tarik", "mango-sticky", "halo-halo", "pani-puri", "chole", "dal", "palak", "gulab", "masala", "ema-datshi"] },
  { region: "medio-oriente", needles: ["hummus", "falafel", "shawarma", "manakish", "lahmacun", "knafeh", "baklava", "mansaf", "maqluba", "musakhan", "kibbeh", "fattoush", "shish", "koobideh", "fesenjan", "ghormeh", "ful", "sabich", "mujadara", "dolma", "cafe-turco", "ayran", "te-menta", "plov", "machboos", "shuwa"] },
  { region: "mediterraneo", needles: ["pizza", "paella", "carbonara", "cacio", "gazpacho", "nicoise", "moussaka", "spanakopita", "souvlaki", "kleftiko", "youvetsi", "imam", "dakos", "pan-con-tomate", "fideua", "pasta", "lasagna", "gnocchi", "pesto", "norma", "vongole", "risotto", "arancini", "caponata", "ratatouille", "couscous", "brik", "zaalouk", "tortilla-espanola", "caldo-verde", "pastel-de-nata", "negroni", "sangria", "halloumi", "pastizzi"] },
  { region: "europa", needles: ["bourguignon", "coq-au-vin", "cassoulet", "goulash", "schnitzel", "fish-and-chips", "pierogi", "pelmeni", "borscht", "stroganoff", "swedish", "kaesespaetzle", "kaiserschmarrn", "kanelbulle", "sacher", "selva-negra", "fondue", "waffles", "smorrebrod", "irish-stew", "shepherds", "choucroute", "sauerbraten", "paprikash", "bigos", "ribollita", "creme-brulee", "tiramisu", "cannoli", "panna-cotta", "tarte-citron", "sticky-toffee", "gluhwein", "irish-coffee", "croque", "francesinha", "bacalhau", "khachapuri", "cevapi"] },
  { region: "africa", needles: ["jollof", "doro", "kitfo", "shiro", "thieb", "yassa", "ndole", "maafe", "egusi", "muamba", "bobotie", "bunny", "waakye", "asaro", "matoke", "light-soup", "poulet", "tagine", "bazeen", "cachupa", "nsima", "dholl-puri", "injera", "seswaa", "kapana", "fufu", "shakshuka"] },
];

const ALIAS: Record<string, string> = {
  couscous: "couscous-royal",
  cuscus: "couscous-royal",
  tagine: "tagine-cordero",
  tajine: "tagine-cordero",
  jollof: "jollof-rice",
  shakshuka: "shakshuka",
  pho: "pho-bo",
  ramen: "ramen-tonkotsu",
  padthai: "pad-thai",
  "pad-thai": "pad-thai",
  hummus: "hummus",
  biryani: "chicken-biryani",
  kebab: "koobideh",
  shawarma: "shawarma",
  cevapi: "cevapi",
  cevapcici: "cevapi",
  plov: "plov-uzbek",
  palaw: "plov-uzbek",
  pilaf: "plov-uzbek",
  khachapuri: "khachapuri",
  cachupa: "cachupa",
  bazeen: "bazeen",
  kokoda: "kokoda",
  palusami: "palusami",
  machboos: "machboos",
  machbous: "machboos",
  shuwa: "shuwa",
  "ema-datshi": "ema-datshi",
  datshi: "ema-datshi",
  nsima: "nsima",
  nshima: "nsima",
  sadza: "nsima",
  ugali: "nsima",
  pap: "nsima",
  "dholl-puri": "dholl-puri",
  injera: "injera-platter",
  "goat-water": "goat-water",
  "lap-lap": "lap-lap",
  laplap: "lap-lap",
  conch: "conch-salad",
  "oil-down": "oil-down",
  naengmyeon: "naengmyeon",
  pastizzi: "pastizzi",
  halloumi: "halloumi-grill",
  "cou-cou": "cou-cou",
  coucou: "cou-cou",
  seswaa: "seswaa",
  kapana: "kapana",
  fufu: "fufu-bowl",
  moqueca: "moqueca-baiana",
  ajiaco: "ajiaco-santafereno",
  feijoada: "feijoada",
  mapo: "mapo-tofu",
  kimchi: "kimchi-jjigae",
  "butter-chicken": "butter-chicken",
  poutine: "poutine",
  "fish-and-chips": "fish-and-chips",
  cacio: "cacio-e-pepe",
  moussaka: "moussaka",
  bobotie: "bobotie",
  doro: "doro-wat",
  wat: "doro-wat",
  mechoui: "tagine-cordero",
  thieb: "thieboudienne",
  yassa: "poulet-yassa",
  ndole: "ndole",
  maafe: "maafe",
  egusi: "egusi",
  mansaf: "mansaf",
  maqluba: "maqluba",
  musakhan: "musakhan",
  knafeh: "knafeh",
  baklava: "baklava",
  falafel: "falafel",
  lahmacun: "lahmacun",
  manakish: "manakish",
  sachertorte: "sacher-torte",
  sacher: "sacher-torte",
  ceviche: "ceviche-limeno",
  tacos: "tacos-al-pastor",
  taco: "tacos-al-pastor",
  pupusa: "pupusas",
  arepa: "arepas",
  pozole: "pozole-rojo",
  mole: "mole-poblano",
  paella: "paella-valenciana",
  carbonara: "spaghetti-carbonara",
  pizza: "pizza-margherita",
  jerk: "jerk-chicken",
  brisket: "texas-brisket",
  rendang: "rendang",
  laksa: "laksa",
  "khao-soi": "khao-soi",
  gyoza: "gyoza",
  pierogi: "pierogi",
  pelmeni: "pelmeni",
  borscht: "borscht",
  goulash: "goulash",
  schnitzel: "schnitzel",
  tiramisu: "tiramisu",
  churros: "churros",
  mate: "mate",
  chai: "masala-chai",
  satay: "satay",
  kitfo: "kitfo",
  shiro: "shiro",
  matoke: "matoke",
  waakye: "waakye",
  muamba: "muamba",
};

const ALL_IDS: string[] = [
  "acai-bowl",
  "ackee-saltfish",
  "agua-de-jamaica",
  "agua-de-panela",
  "aji-de-gallina",
  "ajiaco-santafereno",
  "alfajores",
  "amok-trey",
  "anticuchos",
  "arancini",
  "arepas",
  "arroz-con-gandules",
  "arroz-con-leche",
  "asaro",
  "ayran",
  "bacalhau-bras",
  "bagels-lox",
  "baklava",
  "banh-cuon",
  "banh-mi",
  "bazeen",
  "beef-wellington",
  "bibimbap",
  "bigos",
  "bobotie",
  "boeuf-bourguignon",
  "borscht",
  "breakfast-burrito",
  "brigadeiros",
  "brik",
  "bubble-tea",
  "bun-cha",
  "bunny-chow",
  "bunuelos",
  "butter-chicken",
  "ca-phe-sua-da",
  "ca-phe-trung",
  "cachupa",
  "cacio-e-pepe",
  "cafe-de-olla",
  "cafe-turco",
  "caipirinha",
  "caldo-verde",
  "calentado",
  "callaloo",
  "canelazo",
  "cannoli",
  "caponata",
  "carne-asada",
  "cassoulet",
  "cendol",
  "cevapi",
  "ceviche-limeno",
  "champurrado",
  "changua",
  "char-siu",
  "cheesecake-ny",
  "chicha-morada",
  "chicken-adobo",
  "chicken-biryani",
  "chicken-fried-steak",
  "chilaquiles-verdes",
  "chiles-en-nogada",
  "chivito",
  "chocolate-a-la-taza",
  "chocotorta",
  "chole-bhature",
  "choucroute",
  "churros",
  "cioppino",
  "clam-chowder",
  "cochinita-pibil",
  "com-tam",
  "conch-salad",
  "congee",
  "coq-au-vin",
  "cou-cou",
  "couscous-royal",
  "crab-cakes",
  "creme-brulee",
  "croque-madame",
  "daifuku",
  "dakos",
  "dal-makhani",
  "dan-dan-mian",
  "dholl-puri",
  "dolma",
  "doro-wat",
  "doubles",
  "egusi",
  "ema-datshi",
  "empanadas-criollas",
  "falafel",
  "fattoush",
  "feijoada",
  "fesenjan",
  "fideua",
  "fish-and-chips",
  "flan-napolitano",
  "fondue",
  "francesinha",
  "fufu-bowl",
  "ful-medames",
  "full-english",
  "gallo-pinto",
  "gazpacho",
  "ghormeh-sabzi",
  "gluhwein",
  "gnocchi-sorrentina",
  "goat-water",
  "goulash",
  "green-curry",
  "gulab-jamun",
  "gumbo",
  "gyoza",
  "hainanese-chicken",
  "halloumi-grill",
  "halo-halo",
  "horchata",
  "hot-and-sour-soup",
  "huevos-motulenos",
  "huevos-pericos",
  "huevos-rancheros",
  "humitas",
  "hummus",
  "idli-sambar",
  "imam-bayildi",
  "injera-platter",
  "irish-coffee",
  "irish-stew",
  "jajangmyeon",
  "jambalaya",
  "japchae",
  "jerk-chicken",
  "jianbing",
  "jollof-rice",
  "kaesespaetzle",
  "kaiserschmarrn",
  "kanelbulle",
  "kapana",
  "kare-kare",
  "katsu-curry",
  "kaya-toast",
  "khachapuri",
  "khao-soi",
  "kibbeh",
  "kimchi-jjigae",
  "kitfo",
  "kleftiko",
  "knafeh",
  "kokoda",
  "koobideh",
  "koshari",
  "kung-pao-chicken",
  "lahmacun",
  "laksa",
  "lap-lap",
  "larb",
  "lasagna",
  "light-soup",
  "limonada-de-coco",
  "lobster-roll",
  "locro",
  "lomo-saltado",
  "maafe",
  "machboos",
  "manakish",
  "mango-lassi",
  "mango-sticky-rice",
  "mansaf",
  "mapo-tofu",
  "maqluba",
  "masala-chai",
  "masala-dosa",
  "massaman-curry",
  "matcha",
  "mate",
  "matoke",
  "mee-goreng",
  "menemen",
  "michelada",
  "milanesa-napolitana",
  "milhojas",
  "mofongo",
  "mojito",
  "mole-poblano",
  "moqueca-baiana",
  "moussaka",
  "muamba",
  "mujadara",
  "musakhan",
  "naengmyeon",
  "nashville-hot-chicken",
  "nasi-goreng",
  "nasi-lemak",
  "ndole",
  "negroni",
  "nikujaga",
  "niu-rou-mian",
  "nsima",
  "nyama-choma",
  "oil-down",
  "okonomiyaki",
  "omurice",
  "oyakodon",
  "pad-thai",
  "paella-valenciana",
  "palak-paneer",
  "paloma",
  "palusami",
  "pan-con-tomate",
  "panang-curry",
  "pani-puri",
  "panna-cotta",
  "paprikash",
  "pasta-alla-norma",
  "pastel-de-choclo",
  "pastel-de-nata",
  "pastizzi",
  "pato-pekin",
  "pelmeni",
  "pepian",
  "pepperpot",
  "pesto-alla-genovese",
  "pho-bo",
  "picarones",
  "pierogi",
  "piri-piri-chicken",
  "pisco-sour",
  "pizza-margherita",
  "plov-uzbek",
  "poke-bowl",
  "poulet-dg",
  "poulet-yassa",
  "poutine",
  "pozole-rojo",
  "pupusas",
  "rabo-encendido",
  "ramen-tonkotsu",
  "ratatouille",
  "rendang",
  "ribollita",
  "risotto-ai-funghi",
  "rondon",
  "ropa-vieja",
  "roti-canai",
  "sabich",
  "sacher-torte",
  "salade-nicoise",
  "samgyetang",
  "sancocho",
  "sandwich-cubano",
  "sangria",
  "satay",
  "sauerbraten",
  "schnitzel",
  "seco-de-pollo",
  "selva-negra",
  "seswaa",
  "shakshuka",
  "shawarma",
  "shepherds-pie",
  "shiro",
  "shish-taouk",
  "shuwa",
  "sinigang",
  "siu-yuk",
  "smorrebrod",
  "som-tam",
  "souvlaki",
  "spaghetti-carbonara",
  "spanakopita",
  "sticky-toffee",
  "stroganoff",
  "sundubu-jjigae",
  "suspiro-limeno",
  "swedish-meatballs",
  "tacos-al-pastor",
  "tacu-tacu",
  "tagine-cordero",
  "takoyaki",
  "tarta-santiago",
  "tarte-citron",
  "te-menta",
  "teh-tarik",
  "texas-brisket",
  "thai-iced-tea",
  "thieboudienne",
  "tiramisu",
  "tom-kha-gai",
  "tom-yum-goong",
  "tonkatsu",
  "tortilla-espanola",
  "tres-leches",
  "tteokbokki",
  "vindaloo",
  "vongole",
  "waakye",
  "waffles-liege",
  "wonton-soup",
  "xiao-long-bao",
  "yangzhou-fried-rice",
  "youvetsi",
  "zaalouk"
];

interface Photo {
  id: string;
  family: FamilyId;
  region: RegionId;
  tokens: string[];
}

function fold(value: string) {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase();
}

function tokenize(value: string) {
  return fold(value)
    .split(/[^a-z0-9]+/)
    .filter((t) => t.length >= 3 && !STOP.has(t));
}

function familyOfPhoto(id: string): FamilyId {
  for (const row of FAMILY_HINTS) {
    if (row.needles.some((n) => id.includes(n))) return row.family;
  }
  return "estofado";
}

function regionOfPhoto(id: string): RegionId {
  for (const row of REGION_HINTS) {
    if (row.needles.some((n) => id.includes(n))) return row.region;
  }
  return "europa";
}

const PHOTOS: Photo[] = ALL_IDS.map((id) => ({
  id,
  family: familyOfPhoto(id),
  region: regionOfPhoto(id),
  tokens: tokenize(id),
}));

export const HAS_FILE = new Set(ALL_IDS);

function hash(value: string) {
  let h = 2166136261;
  for (let i = 0; i < value.length; i += 1) {
    h ^= value.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

export function stemOf(image: string) {
  return image.replace(/^.*\//, "").replace(/\.jpe?g$/i, "");
}

function aliasHitsFor(q: ImageQuery): string[] {
  const hits: string[] = [];
  const seen = new Set<string>();
  const qTokens = tokenize(`${q.slug} ${q.name}`);
  const foldedName = fold(q.name);
  const foldedSlug = fold(q.slug);
  const add = (id: string) => {
    if (HAS_FILE.has(id) && !seen.has(id)) {
      seen.add(id);
      hits.push(id);
    }
  };
  for (const t of qTokens) {
    const hit = ALIAS[t];
    if (hit) add(hit);
  }
  for (const [key, photo] of Object.entries(ALIAS)) {
    if (key.length >= 5 && (foldedSlug.includes(key) || foldedName.includes(key))) add(photo);
  }
  return hits;
}

function strippedSlug(slug: string) {
  return slug.replace(/-plus(?:-[a-z0-9]+)?$/g, "");
}

export function pickDishImage(
  q: ImageQuery,
  avoid: Set<string> = new Set(),
  usage: Map<string, number> = new Map(),
): string {
  if (HAS_FILE.has(q.slug) && !avoid.has(q.slug)) return `/dishes/${q.slug}.jpg`;

  const stripped = strippedSlug(q.slug);
  if (stripped.length >= 4 && HAS_FILE.has(stripped) && !avoid.has(stripped)) {
    return `/dishes/${stripped}.jpg`;
  }

  for (const id of aliasHitsFor(q)) {
    if (!avoid.has(id)) return `/dishes/${id}.jpg`;
  }

  const qTokens = tokenize(`${q.slug} ${q.name} ${q.country}`);
  const foldedSlug = fold(q.slug);
  const scored: { id: string; score: number; family: FamilyId; region: RegionId }[] = [];
  for (const photo of PHOTOS) {
    if (avoid.has(photo.id)) continue;
    let score = 0;
    if (foldedSlug.includes(photo.id) || (stripped.length >= 5 && photo.id.includes(stripped))) score += 70;
    for (const token of qTokens) {
      if (token.length >= 4 && photo.tokens.includes(token)) score += token.length >= 6 ? 16 : 10;
      if (token.length >= 5 && photo.id.includes(token)) score += 12;
    }
    if (photo.family === q.family) score += 8;
    if (photo.region === q.regionId) score += 5;
    scored.push({ id: photo.id, score, family: photo.family, region: photo.region });
  }

  const pool = scored.length > 0 ? scored : PHOTOS.filter((p) => !avoid.has(p.id)).map((p) => ({
    id: p.id,
    score: 0,
    family: p.family,
    region: p.region,
  }));
  if (pool.length === 0) {
    const fallback = PHOTOS[hash(q.slug) % PHOTOS.length] ?? PHOTOS[0]!;
    return `/dishes/${fallback.id}.jpg`;
  }

  const strong = pool.filter((row) => row.score >= 70);
  const familyPool = pool.filter((row) => row.family === q.family);
  const regional = familyPool.filter((row) => row.region === q.regionId);
  const candidates =
    strong.length > 0
      ? strong
      : regional.length >= 2
        ? regional
        : familyPool.length >= 3
          ? familyPool
          : pool;

  candidates.sort((a, b) => {
    if (b.score !== a.score) return b.score - a.score;
    const ua = usage.get(a.id) ?? 0;
    const ub = usage.get(b.id) ?? 0;
    if (ua !== ub) return ua - ub;
    return hash(`${q.slug}:${a.id}`) - hash(`${q.slug}:${b.id}`);
  });

  return `/dishes/${candidates[0]!.id}.jpg`;
}

function isExactOrAliased(recipe: { slug: string; name: string; country: string; regionId: RegionId; familyId: FamilyId }) {
  if (HAS_FILE.has(recipe.slug)) return true;
  const stripped = strippedSlug(recipe.slug);
  if (stripped.length >= 4 && HAS_FILE.has(stripped)) return true;
  return aliasHitsFor({
    slug: recipe.slug,
    name: recipe.name,
    country: recipe.country,
    regionId: recipe.regionId,
    family: recipe.familyId,
  }).length > 0;
}

export function pickCountryCover<T extends { slug: string; name: string; image: string }>(recipes: T[]): string {
  if (recipes.length === 0) return "/dishes/hero.jpg";
  const ranked = [...recipes].sort((a, b) => {
    const sa = HAS_FILE.has(a.slug) || stemOf(a.image) === a.slug ? 2 : fold(`${a.slug} ${a.name}`).includes(stemOf(a.image).split("-")[0] ?? "") ? 1 : 0;
    const sb = HAS_FILE.has(b.slug) || stemOf(b.image) === b.slug ? 2 : fold(`${b.slug} ${b.name}`).includes(stemOf(b.image).split("-")[0] ?? "") ? 1 : 0;
    return sb - sa;
  });
  return ranked[0]!.image;
}

export function rebalanceImages<
  T extends {
    slug: string;
    name: string;
    country: string;
    regionId: RegionId;
    familyId: FamilyId;
    image: string;
  },
>(recipes: T[]): T[] {
  const out = recipes.map((recipe) => ({ ...recipe }));
  const usage = new Map<string, number>();
  const assigned = new Set<string>();

  const byCountry = new Map<string, T[]>();
  for (const recipe of out) {
    const list = byCountry.get(recipe.country);
    if (list) list.push(recipe);
    else byCountry.set(recipe.country, [recipe]);
  }

  const queryOf = (recipe: T): ImageQuery => ({
    slug: recipe.slug,
    name: recipe.name,
    country: recipe.country,
    regionId: recipe.regionId,
    family: recipe.familyId,
  });

  for (const recipe of out) {
    if (!HAS_FILE.has(recipe.slug)) continue;
    recipe.image = `/dishes/${recipe.slug}.jpg`;
    assigned.add(recipe.slug);
    usage.set(recipe.slug, (usage.get(recipe.slug) ?? 0) + 1);
  }

  for (const group of byCountry.values()) {
    const used = new Set(
      group.filter((recipe) => assigned.has(recipe.slug)).map((recipe) => stemOf(recipe.image)),
    );
    const ranked = [...group].sort((a, b) => Number(isExactOrAliased(b)) - Number(isExactOrAliased(a)));
    for (const recipe of ranked) {
      if (assigned.has(recipe.slug)) continue;
      if (!isExactOrAliased(recipe)) continue;
      const image = pickDishImage(queryOf(recipe), new Set(), usage);
      recipe.image = image;
      const stem = stemOf(image);
      used.add(stem);
      assigned.add(recipe.slug);
      usage.set(stem, (usage.get(stem) ?? 0) + 1);
    }
  }

  const coverUsed = new Set<string>();
  for (const group of byCountry.values()) {
    const used = new Set(
      group.filter((recipe) => assigned.has(recipe.slug)).map((recipe) => stemOf(recipe.image)),
    );
    let coverLocked = false;
    for (const recipe of group) {
      if (assigned.has(recipe.slug)) {
        if (!coverLocked) {
          coverUsed.add(stemOf(recipe.image));
          coverLocked = true;
        }
        continue;
      }
      const avoid = new Set(used);
      if (!coverLocked) {
        for (const id of coverUsed) avoid.add(id);
      }
      const image = pickDishImage(queryOf(recipe), avoid, usage);
      recipe.image = image;
      const stem = stemOf(image);
      used.add(stem);
      assigned.add(recipe.slug);
      if (!coverLocked) {
        coverUsed.add(stem);
        coverLocked = true;
      }
      usage.set(stem, (usage.get(stem) ?? 0) + 1);
    }
  }

  return out;
}

