import type { Difficulty, FlavorId, MoodId, RecipeSource, RegionId } from "./recipe-types";

function dish(
  slug: string,
  name: string,
  nameLocal: string,
  country: string,
  city: string,
  regionId: RegionId,
  flavors: FlavorId[],
  profile: RecipeSource["profile"],
  timeMin: number,
  servings: number,
  difficulty: Difficulty,
  moods: MoodId[],
  ingredients: RecipeSource["ingredients"],
  steps: string[],
  storyOrTags: string | string[],
  tipOrTags?: string | string[],
  maybeTags?: string[],
): RecipeSource {
  let story = "";
  let tip = "";
  let tags: string[] = [];
  if (Array.isArray(storyOrTags)) {
    tags = storyOrTags;
    story = steps.at(-1) ?? name;
    tip = steps.at(-2) ?? story;
  } else if (typeof tipOrTags === "string" && maybeTags) {
    story = storyOrTags;
    tip = tipOrTags;
    tags = maybeTags;
  } else if (Array.isArray(tipOrTags)) {
    story = storyOrTags;
    tags = tipOrTags;
    tip = steps.at(-1) ?? story;
  }
  return {
    slug,
    name,
    nameLocal,
    country,
    city,
    regionId,
    flavors,
    profile,
    timeMin,
    servings,
    difficulty,
    moods,
    ingredients,
    steps,
    story,
    tip,
    image: `/dishes/${slug}.jpg`,
    tags,
  };
}

export const CURSOS: RecipeSource[] = [
  dish("calentado", "Calentado", "Calentado", "Colombia", "Medellín", "latam", ["umami", "ahumado", "picante"], { picante: 3, umami: 7, acido: 2, dulce: 2, grasa: 6, aroma: 5 }, 25, 2, "fácil", ["consuelo", "fiesta"], [
    { item: "Arroz del día anterior", amount: "2 tazas", key: "arroz" },
    { item: "Frijoles", amount: "1 taza", key: "frijol" },
    { item: "Huevos", amount: "2", key: "huevo" },
    { item: "Arepa", amount: "2", key: "maiz" },
    { item: "Chorizo o hogao", amount: "al gusto", key: "cerdo" },
    { item: "Aguacate", amount: "1", key: "aguacate" },
  ], ["Sofríe hogao. Suma arroz y frijoles. Calienta sin prisa hasta que tome color.", "Huevo frito: yema blanda. Arepa al comal.", "Chorizo a la plancha. Aguacate al lado.", "Se come de pie, con café. El desayuno que nació de no tirar nada."], "En Antioquia el sobrante es el lujo de la mañana. El calentado no se inventa: se hereda de la noche.", "El arroz tiene que estar frío. Caliente, se pone gacha y pierde el tostado.", ["desayuno", "arroz", "antioquia"]),
  dish("huevos-pericos", "Huevos pericos", "Huevos pericos", "Colombia", "Bogotá", "latam", ["umami", "herbal"], { picante: 1, umami: 5, acido: 3, dulce: 2, grasa: 6, aroma: 5 }, 15, 2, "fácil", ["consuelo", "ligero"], [
    { item: "Huevos", amount: "4", key: "huevo" },
    { item: "Tomate", amount: "2", key: "tomate" },
    { item: "Cebolla larga", amount: "3", key: "cebolla" },
    { item: "Mantequilla", amount: "1 cda", key: "leche" },
    { item: "Arepa o pan", amount: "para servir", key: "maiz" },
  ], ["Sofríe tomate y cebolla larga hasta salsa, no agua.", "Huevos. Revuelve apenas: cremosos, no secos.", "Sal. Arepa caliente.", "El perico no es revuelto cualquiera: el tomate tiene que brillar."], "Bogotá desayuna huevo con tomate y cebolla. El perico es el país en una sartén de diez minutos.", "Apaga cuando aún brillen. El calor residual termina el huevo.", ["desayuno", "huevo", "bogota"]),
  dish("huevos-motulenos", "Huevos motuleños", "Huevos motuleños", "México", "Motul", "latam", ["picante", "umami", "dulce"], { picante: 5, umami: 7, acido: 4, dulce: 4, grasa: 6, aroma: 6 }, 35, 2, "media", ["fiesta", "impresionar"], [
    { item: "Huevos", amount: "4", key: "huevo" },
    { item: "Tortillas", amount: "4", key: "maiz" },
    { item: "Frijol colado", amount: "1 taza", key: "frijol" },
    { item: "Jamón y chícharos", amount: "80 g y 80 g", key: "cerdo" },
    { item: "Salsa de tomate", amount: "1 taza", key: "tomate" },
    { item: "Plátano frito", amount: "1", key: "platano" },
  ], ["Tortilla frita, frijol, huevo estrellado.", "Salsa de tomate, jamón, chícharos, queso.", "Plátano maduro al lado. El dulce cierra el plato.", "Motul no pide permiso: el desayuno es un edificio."], "Yucatán pone el huevo sobre una arquitectura: maíz, frijol, jamón y plátano. El motuleño es un pueblo en un plato.", "El plátano va maduro. Verde, el acuerdo se rompe.", ["desayuno", "yucatan", "huevo"]),
  dish("croque-madame", "Croque madame", "Croque madame", "Francia", "París", "europa", ["umami", "cremoso"], { picante: 0, umami: 7, acido: 2, dulce: 2, grasa: 8, aroma: 5 }, 25, 2, "fácil", ["consuelo", "impresionar"], [
    { item: "Pan de molde", amount: "4 rebanadas", key: "trigo" },
    { item: "Jamón", amount: "4 lonchas", key: "cerdo" },
    { item: "Queso gruyère", amount: "120 g", key: "queso" },
    { item: "Bechamel", amount: "200 ml", key: "leche" },
    { item: "Huevos", amount: "2", key: "huevo" },
  ], ["Monta jamón y queso. Bechamel encima. Más queso.", "Horno o sartén tapada hasta gratinar.", "Huevo frito encima: la madame es el huevo.", "Cuchillo y tenedor. París no se come con la mano a las ocho."], "El croque monsieur se casó con un huevo y se volvió madame. El desayuno francés que no pide prisa.", "La bechamel tiene que napar, no nadar. Si chorrea, reduce.", ["desayuno", "jamon", "paris"]),
  dish("full-english", "Full English", "Full English breakfast", "Reino Unido", "Londres", "europa", ["umami", "ahumado"], { picante: 1, umami: 8, acido: 2, dulce: 2, grasa: 8, aroma: 6 }, 30, 2, "fácil", ["consuelo", "fiesta"], [
    { item: "Huevos", amount: "4", key: "huevo" },
    { item: "Bacon y salchichas", amount: "4 y 4", key: "cerdo" },
    { item: "Frijoles en salsa", amount: "1 lata", key: "frijol" },
    { item: "Tomate y champiñones", amount: "2 y 200 g", key: "tomate" },
    { item: "Pan tostado", amount: "4", key: "trigo" },
  ], ["Salchicha y bacon a la plancha. Reserva la grasa.", "Champiñón y tomate en esa grasa. Frijoles a calentar.", "Huevos fritos. Tostada.", "Todo junto, nada elegante. El desayuno es una asamblea."], "Inglaterra responde al clima con un plato que no cabe en la foto. El full English es política de estado a las ocho.", "No escatimes plancha. Si queda pálido, no es desayuno: es duda.", ["desayuno", "bacon", "londres"]),
  dish("jianbing", "Jianbing", "煎饼", "China", "Beijing", "asia-este", ["umami", "picante", "cremoso"], { picante: 4, umami: 6, acido: 3, dulce: 3, grasa: 5, aroma: 6 }, 20, 2, "media", ["ligero", "fiesta"], [
    { item: "Harina de trigo y mijo", amount: "150 g", key: "trigo" },
    { item: "Huevo", amount: "2", key: "huevo" },
    { item: "Hoja crujiente de wantán", amount: "2", key: "trigo" },
    { item: "Cebolleta y cilantro", amount: "al gusto", key: "cebolla" },
    { item: "Salsa hoisin y chile", amount: "al gusto", key: "soya" },
  ], ["Masa fina en plancha caliente. Huevo encima, revuelve.", "Hoisin, chile, cebolleta, hoja crujiente.", "Dobla en sobre. Córtale un bocado en la calle.", "Se come caminando. Beijing no se sienta a desayunar."], "El jianbing es el periódico de la mañana: se dobla, se muerde, se acaba en dos cuadras.", "La masa tiene que ser fina como un rumor. Si queda tortita, perdiste Pekín.", ["desayuno", "calle", "beijing"]),
  dish("roti-canai", "Roti canai", "Roti canai", "Malasia", "Kuala Lumpur", "asia-sur", ["umami", "cremoso"], { picante: 3, umami: 6, acido: 2, dulce: 2, grasa: 7, aroma: 6 }, 40, 2, "media", ["consuelo", "fiesta"], [
    { item: "Harina", amount: "300 g", key: "trigo" },
    { item: "Leche condensada y aceite", amount: "2 cdas y 3 cdas", key: "leche" },
    { item: "Dhal de lenteja", amount: "2 tazas", key: "lenteja" },
    { item: "Curry leaf y comino", amount: "al gusto", key: "comino" },
  ], ["Amasa, aceita, reposa. Estira hasta transparente, pliega.", "Plancha con ghee hasta hojaldre. Golpea para abrir.", "Dhal caliente al lado.", "Se rasga, se moja. El desayuno de Malasia cabe en la mano."], "India llegó, el roti se hizo canai. El dhal es el país; el pan, el pasaporte.", "El reposo no se negocia. Masa impaciente no hace mil hojas.", ["desayuno", "pan", "malasia"]),
  dish("breakfast-burrito", "Breakfast burrito", "Breakfast burrito", "Estados Unidos", "Santa Fe", "norte", ["picante", "umami", "cremoso"], { picante: 5, umami: 6, acido: 4, dulce: 2, grasa: 7, aroma: 5 }, 25, 2, "fácil", ["fiesta", "consuelo"], [
    { item: "Tortillas de harina", amount: "2 grandes", key: "trigo" },
    { item: "Huevos", amount: "4", key: "huevo" },
    { item: "Chorizo o tocino", amount: "120 g", key: "cerdo" },
    { item: "Papa", amount: "2", key: "papa" },
    { item: "Queso y salsa", amount: "al gusto", key: "queso" },
  ], ["Papa dorada. Chorizo. Huevo revuelto suave.", "Tortilla caliente, relleno, queso. Enrolla tenso.", "Salsa al lado o dentro, tú decides el incendio.", "Nuevo México enseña que el desayuno también se lleva."], "El suroeste metió el huevo en una tortilla y se fue al trabajo. El burrito de mañana es frontera y prisa.", "No sobrecargues. Si se abre, no es burrito: es accidente.", ["desayuno", "burrito", "nuevo mexico"]),
  dish("bagels-lox", "Bagels con lox", "Bagels and lox", "Estados Unidos", "Nueva York", "norte", ["umami", "cremoso", "citrico"], { picante: 0, umami: 7, acido: 4, dulce: 1, grasa: 6, aroma: 6 }, 15, 2, "fácil", ["ligero", "impresionar"], [
    { item: "Bagels", amount: "2", key: "trigo" },
    { item: "Queso crema", amount: "120 g", key: "leche" },
    { item: "Salmón ahumado", amount: "150 g", key: "pescado" },
    { item: "Cebolla morada, alcaparra, eneldo", amount: "al gusto", key: "cebolla" },
  ], ["Tuesta el bagel. Queso crema generoso.", "Lox, cebolla, alcaparra, eneldo.", "Limón apenas. Se come con las dos manos.", "Nueva York desayuna el Báltico sobre un pan con agujero."], "El lox es el domingo judío que se volvió la ciudad. El bagel no se discute: se unta.", "El salmón va frío. Si lo calientas, perdiste el oficio.", ["desayuno", "salmon", "nyc"]),
  dish("acai-bowl", "Açaí bowl", "Açaí na tigela", "Brasil", "Río de Janeiro", "latam", ["dulce", "fresco"], { picante: 0, umami: 1, acido: 3, dulce: 6, grasa: 3, aroma: 4 }, 10, 2, "fácil", ["ligero"], [
    { item: "Pulpa de açaí congelada", amount: "400 g", key: "fruta" },
    { item: "Plátano", amount: "1", key: "platano" },
    { item: "Granola", amount: "80 g", key: "trigo" },
    { item: "Coco y miel", amount: "al gusto", key: "coco" },
  ], ["Licúa açaí con un chorro de leche o plátano. Tiene que quedar espeso, no jugo.", "Tazón. Granola, plátano, coco, miel.", "Cuchara. Se come antes de que el trópico lo derrita.", "Río lo toma como desayuno de tabla. El açaí no es smoothie: es marea oscura."], "Si queda líquido, añade pulpa, no leche. El tazón se sostiene o no es açaí.", ["desayuno", "acai", "rio"]),
  dish("omurice", "Omurice", "オムライス", "Japón", "Tokio", "asia-este", ["umami", "dulce", "cremoso"], { picante: 1, umami: 6, acido: 3, dulce: 4, grasa: 6, aroma: 5 }, 25, 2, "media", ["consuelo", "impresionar"], [
    { item: "Arroz", amount: "2 tazas", key: "arroz" },
    { item: "Pollo o verdura", amount: "150 g", key: "pollo" },
    { item: "Ketchup", amount: "3 cdas", key: "tomate" },
    { item: "Huevos", amount: "4", key: "huevo" },
  ], ["Arroz frito con ketchup y pollo. Reserva en óvalo.", "Tortilla fina, casi crema, sobre el arroz. Corta al medio: que corra.", "Más ketchup. Se come con cuchara.", "El omurice es el almuerzo escolar que se quedó de desayuno."], "Tokio envuelve el arroz en una nube de huevo. El corte es el espectáculo.", "La tortilla no se cuaja. Si queda galleta, ya no hay teatro.", ["desayuno", "huevo", "tokio"]),
  dish("kaiserschmarrn", "Kaiserschmarrn", "Kaiserschmarrn", "Austria", "Viena", "europa", ["dulce", "cremoso"], { picante: 0, umami: 2, acido: 2, dulce: 7, grasa: 6, aroma: 5 }, 30, 4, "fácil", ["consuelo", "fiesta"], [
    { item: "Huevos", amount: "4", key: "huevo" },
    { item: "Harina y leche", amount: "140 g y 200 ml", key: "trigo" },
    { item: "Azúcar glass", amount: "al gusto", key: "azucar" },
    { item: "Mantequilla", amount: "40 g", key: "leche" },
    { item: "Compota de ciruela", amount: "para servir", key: "fruta" },
  ], ["Masa de tortita con claros a nieve. Sartén con mantequilla.", "Cuando cuaje, rasga en trozos. Azúcar, carameliza.", "Glass. Compota al lado.", "El emperador desayunaba desorden. Viena lo volvió postre de mañana."], "No intentes una tortita perfecta. El encanto es el jirón dorado.", ["desayuno", "viena", "dulce"]),
  dish("waffles-liege", "Gofres de Lieja", "Gaufres de Liège", "Bélgica", "Lieja", "europa", ["dulce", "cremoso"], { picante: 0, umami: 2, acido: 1, dulce: 8, grasa: 7, aroma: 5 }, 40, 4, "media", ["fiesta", "consuelo"], [
    { item: "Harina", amount: "300 g", key: "trigo" },
    { item: "Mantequilla y levadura", amount: "140 g y 8 g", key: "leche" },
    { item: "Azúcar perlado", amount: "120 g", key: "azucar" },
    { item: "Huevo", amount: "2", key: "huevo" },
  ], ["Masa brioche. Reposa. Azúcar perlado al final, sin disolver.", "Plancha de gofre hasta caramelizar el azúcar.", "Se come con la mano, tibio, en la calle.", "Lieja no cubre el gofre: el azúcar es la cobertura, quemada."], "El perlado va al final. Si se mezcla antes, se derrite y no hay crujiente.", ["desayuno", "gofre", "belgica"]),
  dish("banh-cuon", "Bánh cuốn", "Bánh cuốn", "Vietnam", "Hanoi", "asia-este", ["umami", "herbal", "fresco"], { picante: 3, umami: 6, acido: 5, dulce: 2, grasa: 4, aroma: 6 }, 45, 4, "media", ["ligero", "impresionar"], [
    { item: "Harina de arroz", amount: "200 g", key: "arroz" },
    { item: "Cerdo picado y oreja de palo", amount: "200 g", key: "cerdo" },
    { item: "Chalota frita", amount: "al gusto", key: "cebolla" },
    { item: "Nước chấm y hierbas", amount: "para servir", key: "limon" },
  ], ["Masa muy líquida. Vapor, capa fina, relleno, enrolla.", "Chalota frita encima.", "Nước chấm, menta, cilantro.", "Hanoi desayuna vapor y ácido. El bánh cuốn es sábana de arroz."], "La lámina tiene que verse el relleno. Si queda gorda, es otro plato.", ["desayuno", "vapor", "hanoi"]),

  dish("panna-cotta", "Panna cotta", "Panna cotta", "Italia", "Piamonte", "mediterraneo", ["dulce", "cremoso"], { picante: 0, umami: 2, acido: 2, dulce: 6, grasa: 7, aroma: 5 }, 25, 4, "fácil", ["impresionar", "ligero"], [
    { item: "Nata", amount: "500 ml", key: "leche" },
    { item: "Azúcar", amount: "80 g", key: "azucar" },
    { item: "Gelatina", amount: "7 g", key: "gelatina" },
    { item: "Vainilla", amount: "1 rama", key: "vainilla" },
    { item: "Frutos rojos", amount: "para servir", key: "fruta" },
  ], ["Calienta nata, azúcar, vainilla. Gelatina hidratada.", "Moldes. Nevera 4 horas.", "Desmolda. Coulis.", "Tiene que temblar, no rebotar. Piamonte enseña la nata quieta."], "Menos gelatina de la que crees. Si queda goma, ya no es panna cotta.", ["postre", "nata", "italia"]),
  dish("cannoli", "Cannoli", "Cannoli", "Italia", "Palermo", "mediterraneo", ["dulce", "citrico", "cremoso"], { picante: 0, umami: 2, acido: 3, dulce: 8, grasa: 7, aroma: 6 }, 50, 8, "media", ["fiesta", "impresionar"], [
    { item: "Masa frita para cannoli", amount: "8 tubos", key: "trigo" },
    { item: "Ricotta", amount: "400 g", key: "leche" },
    { item: "Azúcar glass", amount: "80 g", key: "azucar" },
    { item: "Pistacho y naranja confitada", amount: "al gusto", key: "cacahuete" },
  ], ["Ricotta escurrida, glass, ralladura. Frío.", "Rellena los tubos al servir, nunca antes.", "Pistacho en los extremos.", "Palermo frita el tubo y guarda la nieve dentro."], "Si rellenas con horas, la masa se rinde. El cannolo se arma en el minuto.", ["postre", "sicilia", "ricotta"]),
  dish("sacher-torte", "Sachertorte", "Sachertorte", "Austria", "Viena", "europa", ["dulce", "cremoso"], { picante: 0, umami: 3, acido: 3, dulce: 8, grasa: 7, aroma: 6 }, 90, 10, "alta", ["impresionar", "consuelo"], [
    { item: "Chocolate negro", amount: "200 g", key: "chocolate" },
    { item: "Mantequilla, azúcar, huevos", amount: "140 g, 120 g, 6", key: "huevo" },
    { item: "Harina", amount: "140 g", key: "trigo" },
    { item: "Mermelada de albaricoque", amount: "200 g", key: "fruta" },
  ], ["Bizcocho de chocolate. Horno 170 °C 45 min.", "Parte, mermelada, junta. Cubre de mermelada.", "Glaseado de chocolate brillante.", "Nata al lado, nunca encima. Viena tiene reglas."], "El brillo del glaseado es el orgullo. Si queda mate, el agua del chocolate falló.", ["postre", "viena", "chocolate"]),
  dish("sticky-toffee", "Sticky toffee pudding", "Sticky toffee pudding", "Reino Unido", "Lake District", "europa", ["dulce", "cremoso"], { picante: 0, umami: 3, acido: 1, dulce: 9, grasa: 7, aroma: 5 }, 50, 6, "fácil", ["consuelo", "fiesta"], [
    { item: "Dátiles", amount: "200 g", key: "fruta" },
    { item: "Harina, azúcar moreno, huevo", amount: "175 g, 150 g, 2", key: "trigo" },
    { item: "Mantequilla y nata para toffee", amount: "al gusto", key: "leche" },
  ], ["Dátil remojado, triturado. Masa. Horno 180 °C 30 min.", "Toffee: azúcar, mantequilla, nata.", "Bizcocho, salsa generosa. Helado si hay.", "El norte de Inglaterra moja el esponjado hasta rendirlo."], "Los dátiles son el alma. Sin ellos, es un bizcocho con disfraz.", ["postre", "datil", "inglaterra"]),
  dish("cheesecake-ny", "Cheesecake de NY", "New York cheesecake", "Estados Unidos", "Nueva York", "norte", ["dulce", "cremoso", "citrico"], { picante: 0, umami: 2, acido: 3, dulce: 7, grasa: 8, aroma: 4 }, 80, 10, "media", ["impresionar", "consuelo"], [
    { item: "Queso crema", amount: "900 g", key: "leche" },
    { item: "Huevos", amount: "4", key: "huevo" },
    { item: "Base de galleta", amount: "200 g", key: "trigo" },
    { item: "Azúcar y nata", amount: "200 g y 120 ml", key: "azucar" },
  ], ["Base prensada. Relleno sin incorporar aire.", "Baño maría, 160 °C 1 h. El centro tiembla.", "Frío toda la noche. Frutos rojos si quieres.", "Nueva York hace el cheesecake alto, denso, sin perdón."], "No abras el horno. El crack nace de la corriente de aire.", ["postre", "queso", "nyc"]),
  dish("brigadeiros", "Brigadeiros", "Brigadeiros", "Brasil", "São Paulo", "latam", ["dulce", "cremoso"], { picante: 0, umami: 2, acido: 1, dulce: 9, grasa: 6, aroma: 4 }, 30, 20, "fácil", ["fiesta"], [
    { item: "Leche condensada", amount: "1 lata", key: "leche" },
    { item: "Cacao", amount: "3 cdas", key: "chocolate" },
    { item: "Mantequilla", amount: "1 cda", key: "leche" },
    { item: "Granillo de chocolate", amount: "para cubrir", key: "chocolate" },
  ], ["Condensada, cacao, mantequilla. Remueve hasta soltar del fondo.", "Frío. Bolas. Granillo.", "Bandeja de fiesta. Se comen de a uno, se acaban de a veinte.", "Brasil no corta tarta: hace balas de cacao."], "El punto es el fondo de la olla. Si aún pega, espera.", ["postre", "fiesta", "brasil"]),
  dish("picarones", "Picarones", "Picarones", "Perú", "Lima", "latam", ["dulce", "cremoso"], { picante: 0, umami: 2, acido: 2, dulce: 8, grasa: 6, aroma: 6 }, 50, 6, "media", ["fiesta", "consuelo"], [
    { item: "Camote y zapallo", amount: "300 g y 200 g", key: "papa" },
    { item: "Harina y levadura", amount: "300 g y 8 g", key: "trigo" },
    { item: "Miel de chancaca", amount: "para bañar", key: "azucar" },
    { item: "Anís y clavo", amount: "al gusto", key: "clavo" },
  ], ["Puré, harina, levadura. Reposa.", "Aros en aceite 180 °C.", "Chancaca caliente encima.", "Lima frita el zapallo y lo moja en caña. El picaronero no cierra."], "La masa tiene que pesar. Si queda liviana, no es picaron: es donut.", ["postre", "lima", "frito"]),
  dish("flan-napolitano", "Flan napolitano", "Flan napolitano", "México", "Ciudad de México", "latam", ["dulce", "cremoso"], { picante: 0, umami: 2, acido: 1, dulce: 8, grasa: 7, aroma: 4 }, 70, 8, "fácil", ["consuelo", "fiesta"], [
    { item: "Huevos", amount: "5", key: "huevo" },
    { item: "Leche condensada y evaporada", amount: "1 y 1 lata", key: "leche" },
    { item: "Queso crema", amount: "200 g", key: "leche" },
    { item: "Azúcar para caramelo", amount: "150 g", key: "azucar" },
  ], ["Caramelo en el molde.", "Licúa el resto. Baño maría 50 min.", "Frío. Voltea. El caramelo es el río.", "México puso queso al flan y no miró atrás."], "El cuchillo sale limpio. Si sale líquido, más horno. Si sale agujero, menos.", ["postre", "flan", "mexico"]),
  dish("halo-halo", "Halo-halo", "Halo-halo", "Filipinas", "Manila", "asia-este", ["dulce", "fresco", "cremoso"], { picante: 0, umami: 2, acido: 2, dulce: 8, grasa: 4, aroma: 5 }, 20, 2, "fácil", ["fiesta", "ligero"], [
    { item: "Hielo raspado", amount: "2 vasos", key: "hielo" },
    { item: "Ube, flan, frijoles dulces, coco", amount: "al gusto", key: "coco" },
    { item: "Leche evaporada", amount: "al chorro", key: "leche" },
    { item: "Helado de ube", amount: "1 bola", key: "leche" },
  ], ["Fondo: dulces, fruta, flan.", "Hielo. Leche. Helado.", "Se mezcla al comer: halo-halo quiere decir mezclar.", "Manila apila el postre hasta que el vaso no basta."], "No lo sirvas derretido. El contraste es frío contra crema.", ["postre", "ube", "filipinas"]),
  dish("daifuku", "Daifuku", "大福", "Japón", "Kioto", "asia-este", ["dulce", "cremoso"], { picante: 0, umami: 2, acido: 1, dulce: 7, grasa: 2, aroma: 4 }, 40, 8, "media", ["ligero", "impresionar"], [
    { item: "Harina de arroz glutinoso", amount: "150 g", key: "arroz" },
    { item: "Azúcar", amount: "40 g", key: "azucar" },
    { item: "Anko (pasta de azuki)", amount: "200 g", key: "frijol" },
    { item: "Almidón de papa", amount: "para las manos", key: "papa" },
  ], ["Masa al micro o vapor hasta translúcida.", "Bolas de anko. Cubre con mochi fino.", "Almidón para que no se pegue.", "Kioto esconde el frijol en una nube. El daifuku se muerde de un golpe."], "Trabaja la masa caliente. Fría, se pone goma y no cierra.", ["postre", "mochi", "kioto"]),
  dish("gulab-jamun", "Gulab jamun", "गुलाब जामुन", "India", "Delhi", "asia-sur", ["dulce", "cremoso"], { picante: 0, umami: 2, acido: 1, dulce: 9, grasa: 6, aroma: 7 }, 45, 12, "media", ["fiesta", "consuelo"], [
    { item: "Leche en polvo o khoya", amount: "150 g", key: "leche" },
    { item: "Harina", amount: "30 g", key: "trigo" },
    { item: "Almíbar de rosa y cardamomo", amount: "400 ml", key: "azucar" },
    { item: "Aceite o ghee", amount: "para freír", key: "aceite" },
  ], ["Masa suave, bolas sin grieta. Fríe lento, dorado.", "Almíbar tibio. 30 min de baño.", "Pistacho. Se sirven tibios.", "Delhi frita la leche y la ahoga en rosa. El gulab jamun es un suspiro."], "Fuego bajo. Si se queman por fuera, el centro queda crudo.", ["postre", "india", "rosa"]),
  dish("chocotorta", "Chocotorta", "Chocotorta", "Argentina", "Rosario", "latam", ["dulce", "cremoso"], { picante: 0, umami: 2, acido: 1, dulce: 8, grasa: 6, aroma: 5 }, 30, 10, "fácil", ["fiesta", "consuelo"], [
    { item: "Galletas de chocolate", amount: "3 paquetes", key: "trigo" },
    { item: "Dulce de leche", amount: "500 g", key: "leche" },
    { item: "Queso crema", amount: "400 g", key: "leche" },
    { item: "Leche para mojar", amount: "200 ml", key: "leche" },
  ], ["Mezcla dulce de leche y queso.", "Galleta mojada, crema, galleta, crema.", "Nevera 4 horas. Cacao.", "Argentina no enciende el horno: apila. La chocotorta es un pacto de cumpleaños."], "No empapes la galleta. Un segundo. Si se deshace, la torre cae.", ["postre", "argentina", "dulce de leche"]),
  dish("bunuelos", "Buñuelos", "Buñuelos", "Colombia", "Bogotá", "latam", ["dulce", "cremoso"], { picante: 0, umami: 3, acido: 1, dulce: 5, grasa: 6, aroma: 4 }, 40, 16, "fácil", ["fiesta", "consuelo"], [
    { item: "Queso costeño o feta", amount: "250 g", key: "queso" },
    { item: "Almidón de yuca", amount: "250 g", key: "yuca" },
    { item: "Huevo y azúcar", amount: "1 y 1 cda", key: "huevo" },
    { item: "Aceite para freír", amount: "1 l", key: "aceite" },
  ], ["Amasa queso, almidón, huevo. Bolas lisas.", "Aceite 170 °C. Se hinchan, se dorean.", "Se comen tibios, con natilla en diciembre.", "Bogotá en Navidad huele a buñuelo. El queso hace la masa y el milagro."], "El aceite no puede estar bravo. Si se queman, el centro queda goma.", ["postre", "navidad", "bogota"]),
  dish("selva-negra", "Selva negra", "Schwarzwälder Kirschtorte", "Alemania", "Selva Negra", "europa", ["dulce", "citrico", "cremoso"], { picante: 0, umami: 2, acido: 4, dulce: 8, grasa: 7, aroma: 6 }, 90, 10, "alta", ["impresionar", "fiesta"], [
    { item: "Bizcocho de chocolate", amount: "3 capas", key: "chocolate" },
    { item: "Nata montada", amount: "600 ml", key: "leche" },
    { item: "Cerezas y kirsch", amount: "400 g y 80 ml", key: "fruta" },
  ], ["Bizcocho, kirsch. Cerezas.", "Nata, capa, nata, capa.", "Viruta de chocolate. Cereza arriba.", "Sin kirsch no es selva negra: es tarta disfrazada."], "La nata tiene que estar fría y firme. Si chorrea, la montaña se rinde.", ["postre", "alemania", "cereza"]),
  dish("tarte-citron", "Tarte au citron", "Tarte au citron meringuée", "Francia", "París", "europa", ["citrico", "dulce", "cremoso"], { picante: 0, umami: 1, acido: 8, dulce: 7, grasa: 6, aroma: 6 }, 70, 8, "media", ["impresionar", "ligero"], [
    { item: "Masa quebrada", amount: "1", key: "trigo" },
    { item: "Limones", amount: "4", key: "limon" },
    { item: "Huevos, azúcar, mantequilla", amount: "4, 150 g, 80 g", key: "huevo" },
    { item: "Claras para merengue", amount: "3", key: "huevo" },
  ], ["Hornea la base en ciego.", "Crema de limón. Rellena.", "Merengue, soplete.", "París enseña que el ácido también se viste de gala."], "El limón va fresco, no botella. El botella no perfumea: avinagra.", ["postre", "limon", "paris"]),
  dish("milhojas", "Milhojas", "Milhojas", "Chile", "Santiago", "latam", ["dulce", "cremoso"], { picante: 0, umami: 1, acido: 1, dulce: 8, grasa: 7, aroma: 4 }, 50, 8, "media", ["fiesta", "impresionar"], [
    { item: "Hojaldre", amount: "500 g", key: "trigo" },
    { item: "Manjar o crema pastelera", amount: "500 g", key: "leche" },
    { item: "Azúcar glass", amount: "al gusto", key: "azucar" },
  ], ["Hojaldre al máximo, dorado, prensado al salir.", "Capas de manjar. Prensa. Frío.", "Glass. Se corta con cuchillo caliente.", "Chile apila el viento. El milhojas cruje y después se rinde."], "Hornea las placas con peso. Si inflan, no hay mil: hay globo.", ["postre", "chile", "hojaldre"]),
  dish("suspiro-limeno", "Suspiro limeño", "Suspiro de limeña", "Perú", "Lima", "latam", ["dulce", "cremoso"], { picante: 0, umami: 2, acido: 1, dulce: 9, grasa: 6, aroma: 6 }, 40, 6, "media", ["impresionar", "consuelo"], [
    { item: "Leche condensada y evaporada", amount: "1 y 1 lata", key: "leche" },
    { item: "Yemas", amount: "3", key: "huevo" },
    { item: "Claras, oporto, azúcar", amount: "para merengue", key: "azucar" },
    { item: "Canela", amount: "al gusto", key: "canela" },
  ], ["Manjar de leches. Yemas fuera del fuego.", "Merengue italiano con oporto.", "Copa: manjar, nubes, canela.", "Lima suspiró y el postre se quedó con el nombre."], "El merengue tiene que hacer pico. Si chorrea, el almíbar no llegó a punto.", ["postre", "lima", "manjar"]),
  dish("kanelbulle", "Kanelbulle", "Kanelbulle", "Suecia", "Estocolmo", "europa", ["dulce", "cremoso"], { picante: 0, umami: 2, acido: 1, dulce: 7, grasa: 6, aroma: 8 }, 90, 12, "media", ["consuelo", "fiesta"], [
    { item: "Harina, leche, levadura", amount: "500 g, 250 ml, 25 g", key: "trigo" },
    { item: "Mantequilla, canela, cardamomo", amount: "al gusto", key: "canela" },
    { item: "Azúcar perlado", amount: "para terminar", key: "azucar" },
  ], ["Masa de cardamomo. Reposa. Rellena de canela y mantequilla.", "Nudos. Levado. Horno 200 °C 8 min.", "Perlado. Café. El fika no se discute.", "Suecia para el día a las tres. El kanelbulle es la pausa hecha pan."], "El cardamomo va en la masa, la canela en el relleno. No los mezcles: cada uno tiene su hora.", ["postre", "suecia", "canela"]),
  dish("tarta-santiago", "Tarta de Santiago", "Tarta de Santiago", "España", "Santiago de Compostela", "mediterraneo", ["dulce", "citrico"], { picante: 0, umami: 2, acido: 3, dulce: 7, grasa: 6, aroma: 6 }, 50, 8, "fácil", ["consuelo", "impresionar"], [
    { item: "Almendras molidas", amount: "250 g", key: "cacahuete" },
    { item: "Huevos y azúcar", amount: "5 y 200 g", key: "huevo" },
    { item: "Limón y canela", amount: "al gusto", key: "limon" },
    { item: "Azúcar glass y plantilla de cruz", amount: "para terminar", key: "azucar" },
  ], ["Huevo y azúcar a cinta. Almendra, limón, canela.", "Horno 180 °C 30 min.", "Glass con la cruz. Sin cruz, no es Santiago.", "Galicia hace tarta sin harina. El camino se come en almendra."], "No la seques. El centro pide humectación de almendra, no bizcocho de caja.", ["postre", "galicia", "almendra"]),
  dish("cendol", "Cendol", "Cendol", "Malasia", "Penang", "asia-sur", ["dulce", "fresco", "cremoso"], { picante: 0, umami: 1, acido: 2, dulce: 7, grasa: 4, aroma: 6 }, 30, 4, "fácil", ["ligero", "fiesta"], [
    { item: "Harina de arroz y pandano", amount: "para los gusanos verdes", key: "arroz" },
    { item: "Leche de coco", amount: "400 ml", key: "coco" },
    { item: "Gula melaka", amount: "120 g", key: "azucar" },
    { item: "Hielo raspado", amount: "al gusto", key: "hielo" },
  ], ["Masa verde por colador a agua helada: gusanos.", "Gula melaka derretida. Coco con sal.", "Hielo, cendol, coco, azúcar de palma.", "Penang enseña que el postre también tiene sal. El coco la pide."], "El gula melaka no se sustituye con azúcar blanca. El humo de palma es el plato.", ["postre", "malasia", "coco"]),

  dish("matcha", "Matcha", "抹茶", "Japón", "Uji", "asia-este", ["herbal", "umami"], { picante: 0, umami: 4, acido: 2, dulce: 1, grasa: 0, aroma: 8 }, 10, 1, "media", ["ligero", "impresionar"], [
    { item: "Matcha ceremonial", amount: "2 g", key: "te" },
    { item: "Agua a 80 °C", amount: "70 ml", key: "agua" },
  ], ["Tamiza el matcha. Un hilo de agua. Bate en W hasta espuma fina.", "Bebe de inmediato, de un trago o tres.", "El amargo es el punto. No se endulza en Uji.", "Kioto bate el verde hasta que hay isla de espuma."], "El agua no hierve. A 90 el matcha se pone astringente y pierde el dulzor del umami.", ["bebida", "te", "japon"]),
  dish("cafe-turco", "Café turco", "Türk kahvesi", "Turquía", "Estambul", "medio-oriente", ["ahumado", "dulce"], { picante: 0, umami: 3, acido: 2, dulce: 4, grasa: 1, aroma: 8 }, 10, 2, "fácil", ["consuelo", "impresionar"], [
    { item: "Café molido extrafino", amount: "2 cdas", key: "cafe" },
    { item: "Agua", amount: "2 tazas pequeñas", key: "agua" },
    { item: "Azúcar", amount: "al gusto", key: "azucar" },
  ], ["Cezve: agua, café, azúcar. No revuelvas después de calentar.", "Sube la espuma, aparta, vuelve. Tres veces.", "Sirve con poso. No se bebe el fondo: se lee.", "Estambul cocina el café sin filtro. El poso es parte del trato."], "Fuego mínimo. Si hierve bravo, se amarga y la espuma se va.", ["bebida", "cafe", "estambul"]),
  dish("te-menta", "Té de menta", "أتاي", "Marruecos", "Fez", "africa", ["herbal", "dulce", "fresco"], { picante: 0, umami: 1, acido: 1, dulce: 6, grasa: 0, aroma: 8 }, 15, 4, "fácil", ["fiesta", "ligero"], [
    { item: "Té verde", amount: "2 cdas", key: "te" },
    { item: "Menta fresca", amount: "un manojo", key: "menta" },
    { item: "Azúcar", amount: "generoso", key: "azucar" },
  ], ["Lava el té con agua hirviendo. Tira esa agua.", "Menta, azúcar, agua. Hierve un minuto.", "Sirve de alto, para espuma.", "Fez no ofrece un vaso: ofrece tres. El té es la casa."], "La menta va entera, no picada. Picada, amarga.", ["bebida", "menta", "marruecos"]),
  dish("thai-iced-tea", "Té helado tailandés", "ชาเย็น", "Tailandia", "Bangkok", "asia-sur", ["dulce", "cremoso"], { picante: 0, umami: 2, acido: 1, dulce: 8, grasa: 3, aroma: 6 }, 15, 2, "fácil", ["fiesta", "ligero"], [
    { item: "Té negro tailandés", amount: "3 cdas", key: "te" },
    { item: "Leche condensada y evaporada", amount: "2 cdas y un chorro", key: "leche" },
    { item: "Hielo", amount: "vasos llenos", key: "hielo" },
    { item: "Anís estrellado (opcional)", amount: "1", key: "anís" },
  ], ["Té fuerte, 5 min. Cuela.", "Condensada. Hielo. Evaporada encima, no revuelvas del todo.", "El naranja es el anuncio. Bangkok se bebe así a las cuatro.", "El té tiene que ser agresivo. Suave, la leche lo apaga."], ["bebida", "te", "bangkok"]),
  dish("bubble-tea", "Bubble tea", "珍珠奶茶", "Taiwán", "Taichung", "asia-este", ["dulce", "cremoso"], { picante: 0, umami: 2, acido: 1, dulce: 7, grasa: 3, aroma: 4 }, 25, 2, "fácil", ["fiesta", "ligero"], [
    { item: "Té negro o oolong", amount: "400 ml", key: "te" },
    { item: "Perlas de tapioca", amount: "150 g", key: "yuca" },
    { item: "Leche y azúcar moreno", amount: "al gusto", key: "leche" },
  ], ["Cuece las perlas hasta blandas al centro. Baño de azúcar moreno.", "Té, leche, hielo, perlas.", "Pajita gorda. Se bebe y se mastica.", "Taiwán inventó que el té también se muerde."], "Las perlas no esperan. A los veinte minutos se ponen goma.", ["bebida", "te", "taiwan"]),
  dish("ca-phe-sua-da", "Cà phê sữa đá", "Cà phê sữa đá", "Vietnam", "Saigón", "asia-este", ["dulce", "ahumado", "cremoso"], { picante: 0, umami: 4, acido: 2, dulce: 6, grasa: 3, aroma: 7 }, 10, 1, "fácil", ["consuelo", "ligero"], [
    { item: "Café robusta", amount: "20 g", key: "cafe" },
    { item: "Leche condensada", amount: "2 cdas", key: "leche" },
    { item: "Hielo", amount: "1 vaso", key: "hielo" },
  ], ["Condensada en el vaso. Phin encima, goteo lento.", "Remueve. Vierte sobre hielo.", "Saigón enseña que el café puede ser postre y motor.", "El goteo no se apura. Si empujas el phin, amarga."], ["bebida", "cafe", "saigon"]),
  dish("agua-de-jamaica", "Agua de jamaica", "Agua de jamaica", "México", "Oaxaca", "latam", ["citrico", "fresco"], { picante: 0, umami: 1, acido: 6, dulce: 5, grasa: 0, aroma: 6 }, 20, 6, "fácil", ["ligero", "fiesta"], [
    { item: "Flor de jamaica", amount: "80 g", key: "jamaica" },
    { item: "Agua", amount: "2 l", key: "agua" },
    { item: "Azúcar", amount: "al gusto", key: "azucar" },
    { item: "Limón (opcional)", amount: "1", key: "limon" },
  ], ["Hierve la flor 5 min. Reposa 10. Cuela.", "Azúcar, agua fría, hielo.", "Cántaro. El mercado se oye rojo.", "México no bebe té: bebe flor. La jamaica es el vaso del comal."], "No hiervas de más. Se pone astringente y pierde el rojo limpio.", ["bebida", "jamaica", "mexico"]),
  dish("champurrado", "Champurrado", "Champurrado", "México", "Michoacán", "latam", ["dulce", "ahumado", "cremoso"], { picante: 1, umami: 3, acido: 1, dulce: 6, grasa: 4, aroma: 8 }, 25, 4, "fácil", ["consuelo"], [
    { item: "Masa de maíz", amount: "80 g", key: "maiz" },
    { item: "Chocolate de mesa", amount: "100 g", key: "chocolate" },
    { item: "Leche o agua", amount: "1 l", key: "leche" },
    { item: "Piloncillo y canela", amount: "al gusto", key: "canela" },
  ], ["Disuelve masa en frío. Suma a la leche con canela.", "Chocolate, piloncillo. Molinillo hasta espuma.", "Se bebe humeante, con tamal si hay.", "El atole se encontró con el cacao. El champurrado es el maíz bebido."], "Sin molinillo, una varilla. Sin espuma, es chocolate triste.", ["bebida", "maiz", "chocolate"]),
  dish("chicha-morada", "Chicha morada", "Chicha morada", "Perú", "Lima", "latam", ["dulce", "citrico", "fresco"], { picante: 1, umami: 2, acido: 5, dulce: 6, grasa: 0, aroma: 7 }, 40, 8, "fácil", ["fiesta", "ligero"], [
    { item: "Maíz morado", amount: "500 g", key: "maiz" },
    { item: "Piña, membrillo, canela, clavo", amount: "al gusto", key: "canela" },
    { item: "Limón y azúcar", amount: "al final", key: "limon" },
  ], ["Hierve maíz, piña, especias 30 min. Reposa.", "Cuela. Azúcar, limón frío.", "Hielo. El morado tiene que manchar el vaso.", "Lima bebe el maíz que no se come. La chicha morada es andes en jarra."], "El limón va frío, al final. Si hierve, se apaga el perfume.", ["bebida", "maiz", "lima"]),
  dish("agua-de-panela", "Agua de panela", "Aguapanela", "Colombia", "Bogotá", "latam", ["dulce", "citrico"], { picante: 0, umami: 1, acido: 3, dulce: 6, grasa: 0, aroma: 5 }, 10, 4, "fácil", ["consuelo", "ligero"], [
    { item: "Panela", amount: "120 g", key: "azucar" },
    { item: "Agua", amount: "1 l", key: "agua" },
    { item: "Limón", amount: "1", key: "limon" },
  ], ["Disuelve panela en agua caliente o fría.", "Limón al servir.", "Caliente en páramo, fría en valle. Colombia elige según el clima.", "La panela no es azúcar: es caña. El agua de panela es la casa."], "No uses azúcar blanca. El punto es el humo de la panela.", ["bebida", "panela", "bogota"]),
  dish("limonada-de-coco", "Limonada de coco", "Limonada de coco", "Colombia", "Cartagena", "caribe", ["citrico", "cremoso", "fresco"], { picante: 0, umami: 1, acido: 6, dulce: 6, grasa: 4, aroma: 5 }, 10, 4, "fácil", ["fiesta", "ligero"], [
    { item: "Coco o crema de coco", amount: "200 ml", key: "coco" },
    { item: "Limón", amount: "4", key: "limon" },
    { item: "Azúcar", amount: "al gusto", key: "azucar" },
    { item: "Hielo", amount: "generoso", key: "hielo" },
  ], ["Licúa coco, limón, azúcar, hielo.", "Tiene que quedar nieve, no jugo.", "Cartagena se defiende del calor con esta copa.", "Si queda rala, más coco. Si queda pasta, más hielo."], ["bebida", "coco", "caribe"]),
  dish("michelada", "Michelada", "Michelada", "México", "Ciudad de México", "latam", ["picante", "citrico", "umami"], { picante: 6, umami: 5, acido: 7, dulce: 1, grasa: 0, aroma: 5 }, 10, 1, "fácil", ["fiesta"], [
    { item: "Cerveza clara", amount: "1", key: "cerveza" },
    { item: "Limón", amount: "2", key: "limon" },
    { item: "Salsa picante, worcester, maggi", amount: "al gusto", key: "soya" },
    { item: "Sal y chile para el borde", amount: "1 cda", key: "chile" },
  ], ["Borde de chile y sal. Limón, salsas, hielo.", "Cerveza. No revuelvas de más.", "Se bebe antes de que pierda el gas.", "México puso el ceviche en un vaso de cerveza. La michelada es playa y cruda."], "La cerveza va fría y al final. Si la dejas parada, se pone sopa.", ["bebida", "cerveza", "mexico"]),
  dish("caipirinha", "Caipirinha", "Caipirinha", "Brasil", "São Paulo", "latam", ["citrico", "dulce", "fresco"], { picante: 0, umami: 1, acido: 8, dulce: 5, grasa: 0, aroma: 6 }, 8, 1, "fácil", ["fiesta"], [
    { item: "Cachaça", amount: "60 ml", key: "cachaca" },
    { item: "Limón", amount: "1", key: "limon" },
    { item: "Azúcar", amount: "2 cditas", key: "azucar" },
    { item: "Hielo triturado", amount: "al vaso", key: "hielo" },
  ], ["Limón en trozos, azúcar, machaca la piel, no el blanco.", "Cachaça, hielo. Corto.", "São Paulo enseña que el cóctel nacional cabe en un vaso bajo.", "No uses lima persa si hay galego. El perfume es el trago."], ["bebida", "cachaca", "brasil"]),
  dish("mojito", "Mojito", "Mojito", "Cuba", "La Habana", "caribe", ["citrico", "herbal", "fresco"], { picante: 0, umami: 1, acido: 6, dulce: 4, grasa: 0, aroma: 7 }, 8, 1, "fácil", ["fiesta", "ligero"], [
    { item: "Ron blanco", amount: "50 ml", key: "ron" },
    { item: "Menta", amount: "8 hojas", key: "menta" },
    { item: "Limón y azúcar", amount: "20 ml y 2 cditas", key: "limon" },
    { item: "Soda e hielo", amount: "al gusto", key: "hielo" },
  ], ["Menta, azúcar, limón: aplasta suave, no trituras a pasta.", "Ron, hielo, soda.", "La Habana se bebe con hierbabuena y corriente de aire.", "Si machacas de más, la menta amarga y el mojito se pone a té."], ["bebida", "ron", "cuba"]),
  dish("sangria", "Sangría", "Sangría", "España", "Valencia", "mediterraneo", ["dulce", "citrico", "fresco"], { picante: 0, umami: 1, acido: 5, dulce: 6, grasa: 0, aroma: 6 }, 20, 6, "fácil", ["fiesta"], [
    { item: "Vino tinto", amount: "1 botella", key: "vino" },
    { item: "Naranja, limón, manzana", amount: "al gusto", key: "limon" },
    { item: "Azúcar y un chorro de licor", amount: "al gusto", key: "azucar" },
    { item: "Hielo", amount: "al servir", key: "hielo" },
  ], ["Fruta, azúcar, vino. Reposa 1 hora en frío.", "Hielo al servir, no antes.", "Valencia enseña que el vino también es jarra de patio.", "No uses vino que no te beberías solo. La fruta no milagra un tinto malo."], ["bebida", "vino", "espana"]),
  dish("chocolate-a-la-taza", "Chocolate a la taza", "Chocolate a la taza", "España", "Madrid", "mediterraneo", ["dulce", "cremoso"], { picante: 0, umami: 3, acido: 1, dulce: 7, grasa: 6, aroma: 6 }, 15, 2, "fácil", ["consuelo"], [
    { item: "Chocolate negro", amount: "200 g", key: "chocolate" },
    { item: "Leche", amount: "400 ml", key: "leche" },
    { item: "Maicena (opcional)", amount: "1 cda", key: "trigo" },
  ], ["Leche, chocolate a fuego bajo. Maicena si lo quieres de cuchara.", "No hiervas. Sirve espeso.", "Churro al lado. Madrid no moja: empoma.", "Si queda ralo, no es a la taza: es cacao de sobre."], ["bebida", "chocolate", "madrid"]),
  dish("teh-tarik", "Teh tarik", "Teh tarik", "Malasia", "Kuala Lumpur", "asia-sur", ["dulce", "cremoso"], { picante: 0, umami: 2, acido: 1, dulce: 6, grasa: 3, aroma: 5 }, 10, 2, "fácil", ["consuelo", "fiesta"], [
    { item: "Té negro", amount: "2 cdas", key: "te" },
    { item: "Leche condensada", amount: "2 cdas", key: "leche" },
    { item: "Leche evaporada", amount: "un chorro", key: "leche" },
  ], ["Té fuerte. Condensada.", "Tira de un vaso al otro, alto, hasta espuma.", "El teatro es la receta. Malasia bebe el té que voló.", "Sin el tirón no hay tarik. El aire enfría y hace nata."], ["bebida", "te", "malasia"]),
  dish("paloma", "Paloma", "Paloma", "México", "Guadalajara", "latam", ["citrico", "picante", "fresco"], { picante: 3, umami: 1, acido: 7, dulce: 4, grasa: 0, aroma: 5 }, 8, 1, "fácil", ["fiesta"], [
    { item: "Tequila blanco", amount: "50 ml", key: "tequila" },
    { item: "Refresco de toronja", amount: "120 ml", key: "toronja" },
    { item: "Limón y sal-chile", amount: "al borde", key: "limon" },
  ], ["Borde de sal. Tequila, limón, hielo, toronja.", "No lo endulces más. La paloma ya es patio.", "Jalisco enseña que el tequila también pide soda y sombra.", "Toronja de verdad si puedes. El refresco vale; el jugo, mejor."], ["bebida", "tequila", "jalisco"]),
  dish("ayran", "Ayran", "Ayran", "Turquía", "Ankara", "medio-oriente", ["citrico", "fresco", "cremoso"], { picante: 0, umami: 3, acido: 4, dulce: 0, grasa: 3, aroma: 3 }, 5, 2, "fácil", ["ligero"], [
    { item: "Yogur natural", amount: "400 g", key: "yogurt" },
    { item: "Agua fría", amount: "200 ml", key: "agua" },
    { item: "Sal", amount: "al gusto", key: "sal" },
  ], ["Yogur, agua, sal. Bate hasta espuma.", "Frío. Se bebe con kebab, no con postre.", "Turquía enseña que el yogur también es vaso. El ayran apaga el picante.", "La sal no se discute. Sin sal es lassi a medias."], ["bebida", "yogurt", "turquia"]),
  dish("negroni", "Negroni", "Negroni", "Italia", "Florencia", "mediterraneo", ["herbal", "citrico"], { picante: 1, umami: 2, acido: 4, dulce: 3, grasa: 0, aroma: 8 }, 5, 1, "fácil", ["impresionar", "fiesta"], [
    { item: "Gin", amount: "30 ml", key: "gin" },
    { item: "Campari", amount: "30 ml", key: "campari" },
    { item: "Vermut rojo", amount: "30 ml", key: "vermut" },
    { item: "Naranja", amount: "1 piel", key: "naranja" },
  ], ["Partes iguales, hielo grande, vaso bajo.", "Piel de naranja exprimida encima.", "Florencia lo pidió más fuerte que el Americano. El negroni no pide azúcar: pide carácter.", "El hielo tiene que ser un cubo. Picado, diluye el himno."], ["bebida", "gin", "florencia"]),
  dish("irish-coffee", "Irish coffee", "Irish coffee", "Irlanda", "Foynes", "europa", ["dulce", "ahumado", "cremoso"], { picante: 0, umami: 3, acido: 2, dulce: 5, grasa: 4, aroma: 7 }, 10, 1, "media", ["consuelo", "impresionar"], [
    { item: "Café caliente", amount: "120 ml", key: "cafe" },
    { item: "Whiskey irlandés", amount: "40 ml", key: "whiskey" },
    { item: "Azúcar moreno", amount: "1 cdita", key: "azucar" },
    { item: "Nata apenas montada", amount: "2 cdas", key: "leche" },
  ], ["Vaso caliente. Café, azúcar, whiskey.", "Nata flotando, sin revolver.", "Se bebe a través de la nata. Irlanda calienta el café con isla.", "La nata no se bate a pico. Si está dura, no flota: se hunde."], ["bebida", "cafe", "irlanda"]),
  dish("gluhwein", "Glühwein", "Glühwein", "Alemania", "Núremberg", "europa", ["dulce", "herbal"], { picante: 1, umami: 1, acido: 3, dulce: 6, grasa: 0, aroma: 8 }, 20, 4, "fácil", ["consuelo", "fiesta"], [
    { item: "Vino tinto", amount: "1 botella", key: "vino" },
    { item: "Naranja, canela, clavo, anís", amount: "al gusto", key: "canela" },
    { item: "Azúcar", amount: "3 cdas", key: "azucar" },
  ], ["Vino, especias, naranja. Calienta sin hervir.", "Azúcar. Cuela. Jarra humeante.", "Núremberg en diciembre. El glühwein es el abrigo que se bebe.", "Si hierve, se va el alcohol y queda tes de vino. Fuego manso."], ["bebida", "vino", "navidad"]),
];
