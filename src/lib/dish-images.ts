import { ALL_IDS } from "./dish-image-ids";
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
  { family: "bebida", needles: ["cafe", "chai", "mate", "horchata", "lassi", "te-menta", "jamaica", "matcha", "canelazo", "bubble-tea", "ca-phe", "caipirinha", "chocolate-a-la-taza", "champurrado", "chicha", "gluhwein", "irish-coffee", "michelada", "mojito", "negroni", "paloma", "pisco", "sangria", "thai-iced", "teh-tarik", "ayran", "agua-de", "limonada", "lulada", "rompope"] },
  { family: "postre", needles: ["tiramisu", "tres-leches", "baklava", "knafeh", "alfajores", "pastel-de-nata", "mango-sticky", "gulab", "cannoli", "cheesecake", "creme-brulee", "daifuku", "flan", "panna-cotta", "sacher", "selva-negra", "sticky-toffee", "brigadeiro", "chocotorta", "milhojas", "picarones", "suspiro", "kaiserschmarrn", "kanelbulle", "tarta-santiago", "tarte-citron", "halo-halo", "cendol", "acai", "churros", "obleas", "pandebono"] },
  { family: "desayuno", needles: ["shakshuka", "huevos", "changua", "dosa", "ful-medames", "menemen", "congee", "kaya-toast", "full-english", "breakfast-burrito", "idli", "jianbing", "calentado", "ackee"] },
  { family: "crudo", needles: ["ceviche", "poke", "som-tam", "larb", "fattoush", "gazpacho", "kitfo", "nicoise", "dakos", "caponata", "zaalouk", "hummus", "kokoda", "conch-salad", "aguachile"] },
  { family: "maiz", needles: ["taco", "pupusa", "arepa", "humita", "pastel-de-choclo", "pibil", "pozole", "gallo-pinto", "chilaquiles", "motulenos", "cou-cou", "enchilada", "tamal", "tlayuda", "elote", "memela", "birria"] },
  { family: "empanada", needles: ["empanada", "gyoza", "xiao-long", "pierogi", "pelmeni", "kibbeh", "spanakopita", "brik", "arancini", "takoyaki", "pani-puri", "bunuelos", "pastizzi", "tequeno", "coxinha"] },
  { family: "caldo", needles: ["pho", "ramen", "soup", "caldo", "chowder", "gumbo", "ajiaco", "sancocho", "wonton", "kimchi-jjigae", "sundubu", "tom-yum", "tom-kha", "hot-and-sour", "niu-rou", "goat-water", "naengmyeon", "menudo", "harira", "lablabi", "mondongo", "joumou", "pepper-soup"] },
  { family: "fideo", needles: ["pad-thai", "carbonara", "dan-dan", "japchae", "laksa", "khao-soi", "jajangmyeon", "fideua", "cacio", "lasagna", "gnocchi", "vongole", "pesto", "norma", "mee-goreng", "tteokbokki", "bun-cha", "banh-cuon"] },
  { family: "curry", needles: ["curry", "butter-chicken", "massaman", "vindaloo", "panang", "katsu-curry", "palak", "dal-makhani", "chole", "ema-datshi"] },
  { family: "brasa", needles: ["jerk", "brisket", "souvlaki", "koobideh", "carne-asada", "anticuchos", "nyama", "piri-piri", "satay", "char-siu", "shawarma", "shish", "siu-yuk", "pato-pekin", "cevapi", "kapana", "halloumi", "suya", "tibs", "boerewors", "pachamanca", "attieke"] },
  { family: "frito", needles: ["tonkatsu", "schnitzel", "fish-and-chips", "falafel", "nashville", "poutine", "crab-cakes", "fried-steak", "doubles", "tostones", "griot", "tempura", "scotch-egg", "kroket", "langos", "bitterballen", "rosti", "pasteis", "taameya", "vetkoek", "chiles-rellenos"] },
  { family: "pan", needles: ["pizza", "banh-mi", "cubano", "chivito", "lahmacun", "manakish", "croque", "bagels", "francesinha", "pan-con-tomate", "smorrebrod", "roti-canai", "sabich", "khachapuri", "dholl-puri"] },
  { family: "arroz", needles: ["paella", "jollof", "biryani", "nasi", "risotto", "yangzhou", "thieb", "koshari", "tacu", "jambalaya", "waakye", "com-tam", "hainanese", "oyakodon", "omurice", "bibimbap", "plov", "machboos", "shuwa", "rice-and-peas"] },
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
  enchiladas: "enchiladas-suizas",
  tamales: "tamales-oaxaquenos",
  tlayuda: "tlayuda",
  "mole-negro": "mole-negro",
  "chiles-rellenos": "chiles-rellenos",
  elote: "elote-callejero",
  birria: "birria-jalisco",
  aguachile: "aguachile-verde",
  bandeja: "bandeja-paisa",
  lechona: "lechona-tolimense",
  causa: "causa-limena",
  coxinha: "coxinha",
  tequenos: "tequenos",
  tostones: "tostones",
  pachamanca: "pachamanca",
  joumou: "soup-joumou",
  griot: "griot",
  suya: "suya",
  tibs: "tibs",
  harira: "harira",
  boerewors: "boerewors",
  tempura: "tempura-moriawase",
  "scotch-egg": "scotch-egg",
  barbacoa: "tacos-de-barbacoa",
  carnitas: "tacos-de-carnitas",
  menudo: "menudo-rojo",
  tinga: "tinga-poblana",
  memelas: "memelas-oaxaca",
  pandebono: "pandebono",
  mondongo: "mondongo-colombiano",
  obleas: "obleas",
  lulada: "lulada",
  kroket: "kroket",
  langos: "langos",
  bitterballen: "bitterballen",
  rosti: "rosti",
  "wiener-schnitzel": "wiener-schnitzel",
  lablabi: "lablabi",
  taameya: "taameya",
  vetkoek: "vetkoek",
  romazava: "romazava",
};

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
  return slug.replace(/-plus(?:-[a-z0-9]+)?$/g, "").replace(/-extra\d*$/g, "");
}

export function uniqueImagePath(slug: string) {
  if (HAS_FILE.has(slug)) return `/dishes/${slug}.jpg`;
  return `/dishes/u/${slug}.jpg`;
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
  return recipes.map((recipe) => ({
    ...recipe,
    image: uniqueImagePath(recipe.slug),
  }));
}

