import { FLAVORS, PANTRY_GROUPS, RECIPES, REGIONS } from "./recipes";
import type { FlavorId, Recipe, RegionId } from "./recipe-types";
import { pickCountryCover } from "./dish-images";

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
  Venezuela: "Caracas no pide permiso: arepa, caraotas y un aguacate que cierra el plato.",
  Bolivia: "La altura se come. Ají, papa y una salteña que quema los dedos.",
  Paraguay: "El maíz se vuelve chipa y sopa. El país cabe en una harina de mandioca.",
  Honduras: "Plátano, coco y un tapado que sabe a costa.",
  Panamá: "Sancocho de gallina y un canal de sabores: afro, chino, criollo.",
  Haití: "Griot, diri ak pwa. El creole se come crujiente y con picante.",
  "Países Bajos": "Mar, queso y un stamppot que responde al viento.",
  Noruega: "El frío se come: pescado curado, fuego lento, eneldo.",
  Finlandia: "Bosque, lago y ruis. El pan negro es el clima.",
  Chequia: "Cerveza, cerdo y un knedlík que absorbe la salsa.",
  Rumania: "Mămăligă, sarmale y un ajo que no se esconde.",
  Georgia: "Nogal, pan de queso y un vino que se bebe en cuerno.",
  Croacia: "Mar adriático, peka y un aceite que huele a isla.",
  Australia: "Mariscos, brasa y un pavlova que no admite discusión.",
  "Nueva Zelanda": "Cordero, mar y un hāngī que se cuece bajo tierra.",
  Pakistán: "Biryani, karahi y un chai que sostiene el día.",
  Bangladesh: "Hilsa, mostaza y un arroz que se come con la mano.",
  "Sri Lanka": "Coco, curry leaf y un hopper que amanece crujiente.",
  Nepal: "Momos, dal bhat y un ají que sube con la montaña.",
  Myanmar: "Lahpet, fideos y un fermento que sabe a té.",
  Irak: "Masgouf, dolma y un arroz azafranado de fiesta.",
  Yemen: "Saltah, mandi y un hilbeh que pica con fenogreco.",
  "Arabia Saudita": "Kabsa, cordero y un arroz que se comparte en fuente.",
  Armenia: "Lavash, granada y un khorovats de brasa larga.",
  Afganistán: "Kabuli pulao, yogur y un cordero que se espera.",
  Argelia: "Cuscús, chorba y un harissa que no se disculpa.",
  "Costa de Marfil": "Attiéké, kedjenou y un pollo que se cuece en vasija.",
  Tanzania: "Ugali, pilau y un Zanzíbar de especias y mar.",
  Madagascar: "Ravitoto, zebú y una vainilla que perfumea la olla.",
  Mongolia: "Cordero, vapor y un buuz que se come con las manos.",
  Kazajistán: "Beshbarmak, yurta y un caldo que se sirve a los invitados.",
  Bélgica: "Cerveza, frites y mejillón. El gofre esconde azúcar que se carameliza.",
  Bulgaria: "Sirene, yogur y un pimiento asado que se unta en invierno.",
  Serbia: "Ćevapi, kajmak y una col que espera el frío.",
  Islandia: "Cordero ahumado, skyr y un Atlántico que se masca seco.",
  Libia: "Cuscús, harissa y un shorba que huele a desierto y mar.",
  Sudán: "Ful, kisra y un sorgo que fermenta el desayuno.",
  Eritrea: "Berbere, injera y un zigni que se come en comunidad.",
  Somalia: "Bariis, xawaash y un cordero que perfumea el Índico.",
  Mauritania: "Thieb, mechoui y un cuscús hassaní de caravana.",
  Botsuana: "Seswaa, pap y una res que se deshace para la fiesta.",
  Namibia: "Kapana, braai y un kingklip que sabe a desierto y Atlántico.",
  Zimbabue: "Sadza, nyama y un cacahuete que espesa las hojas.",
  Zambia: "Nshima, ifisashi y un lago que se come frito.",
  Malaui: "Nsima, chambo y un tilapia que sale del lago.",
  Ruanda: "Ugali, brochettes y un isombe de hoja de yuca.",
  Burundi: "Ubugari, ndagala y un Tanganica que cruje.",
  "República Democrática del Congo": "Pondu, palma y un fufu que se come con la mano.",
  "República del Congo": "Nyembwe, palma y un pescado envuelto en hoja.",
  Gabón: "Nyembwe, odika y un bosque que se come en salsa.",
  Benín: "Pâté, ablo y un maíz tostado de Ouidah.",
  Togo: "Fufu, akumé y un cacahuete que espesa el mediodía.",
  "Burkina Faso": "Tô, riz gras y un pollo bicyclette a la brasa.",
  Níger: "Djerma, dambou y una moringa que verdea el cuscús.",
  Chad: "Daraba, mijo y un okra que espesa el Sahel.",
  Guinea: "Fouti, graine y un yassa que no se esconde.",
  "Sierra Leona": "Plasas, jollof y una hoja de yuca con mar.",
  Liberia: "Palava, dumboy y un aceite de palma que no se disculpa.",
  Gambia: "Benachin, domoda y un tamarindo que abre el arroz.",
  "Cabo Verde": "Cachupa, grogue y un maíz que espera el puerto.",
  Mauricio: "Dholl puri, rougaille y un Índico que habla criollo.",
  Seychelles: "Kari koko, bourzwa y una vainilla que no se esconde.",
  Comoras: "Langosta, vainilla y un pilaou de clavo.",
  Yibuti: "Skoudehkaris, fah-fah y un cuerno de África en una olla.",
  "Santo Tomé y Príncipe": "Calulu, palma y un plátano que se vuelve postre.",
  "Guinea Ecuatorial": "Succotash, pepe soup y un golfo que pica.",
  Lesoto: "Papa, moroho y una altura que se come con cuchara.",
  Esuatini: "Sishwala, cabra y un estofado de reino.",
  "República Centroafricana": "Gozo, kanda y un maní que espesa el río.",
  "Sudán del Sur": "Kisra, wal wal y una cabra de fiesta.",
  "Guinea-Bisáu": "Mancarra, cafriela y un cacahuete lusófono.",
  Albania: "Tavë kosi, byrek y un yogur que cuece el cordero.",
  "Bosnia y Herzegovina": "Ćevapi, burek y un somun que recoge el jugo.",
  "Macedonia del Norte": "Tavče gravče, trucha de Ohrid y un ajvar que se unta.",
  Montenegro: "Njeguški, brudet y un kajmak que no se discute.",
  Eslovenia: "Potica, žlikrofi y un horno alpino que espera.",
  Eslovaquia: "Bryndza, halušky y una panceta que cierra el plato.",
  Lituania: "Cepelinai, šaltibarščiai y una papa que viaja en globo.",
  Letonia: "Guisante gris, pan negro y un arenque del Báltico.",
  Estonia: "Verivorst, kama y un centeno que se come con espadín.",
  Bielorrusia: "Draniki, machanka y una nata que responde al frío.",
  Moldavia: "Mămăligă, zeama y un queso que se derrite al lado.",
  Malta: "Pastizzi, fenek y un conejo que espera el domingo.",
  Chipre: "Halloumi, kleftiko y un orégano que huele a isla.",
  Luxemburgo: "Judd, Gaardebounen y un lomo ahumado de invierno.",
  Andorra: "Escudella, trinxat y una montaña que se come con col.",
  Mónaco: "Barbagiuan, socca y un garbanzo que cruje en la Roca.",
  "San Marino": "Torta tre monti, bustrengo y tres torres de avellana.",
  Liechtenstein: "Käsknöpfle, ribel y un queso que se come con cebolla.",
  Kosovo: "Flija, pite y un fuego que cuece capa a capa.",
  Uzbekistán: "Plov, samsa y una zanahoria que se dora en qazan.",
  Kirguistán: "Beshbarmak, lagman y cinco dedos para el cordero.",
  Tayikistán: "Qurutob, fatir y un yogur que se vierte sobre el pan.",
  Turkmenistán: "Palaw, dograma y un pan que se parte en el caldo.",
  Azerbaiyán: "Plov, piti y un azafrán que se sirve en vasija.",
  "Emiratos Árabes Unidos": "Machboos, luqaimat y un dátil que endulza el fuego.",
  Catar: "Machbous, harees y un loomi que perfumea el arroz.",
  Kuwait: "Machboos, gabout y un pescado que se casa con el grano.",
  Omán: "Shuwa, halwa y un cordero que se entierra un día.",
  Baréin: "Muhammar, machboos y un arroz que sabe a dátil.",
  Bután: "Ema datshi, chile y un queso que no se esconde del picante.",
  Maldivas: "Mas huni, atún y un coco que amanece en el atolón.",
  Brunei: "Ambuyat, nasi katok y un sagú que se come con palillos.",
  "Timor Oriental": "Ikan sabuko, batar daan y un tamarindo lusófono.",
  Surinam: "Pom, moksi alesi y un pomtayer que es el almuerzo de fiesta.",
  Belice: "Hudut, rice and beans y un coco que cocina el Caribe inglés.",
  Bahamas: "Conch salad, cracked conch y una lima que cruje el caracol.",
  Barbados: "Cou-cou, flying fish y un maíz que es el plato nacional.",
  Granada: "Oil down, panapén y un coco que no deja fondo.",
  "Santa Lucía": "Green fig, saltfish y un plátano verde de mediodía.",
  Dominica: "Callaloo, provisions y un cangrejo que espesa la sopa.",
  "Antigua y Barbuda": "Fungee, pepperpot y un okra que ata el maíz.",
  "San Vicente y las Granadinas": "Panapén asado, callaloo y un carbón de isla.",
  "San Cristóbal y Nieves": "Goat water, stew pork y un caldo de fiesta.",
  Fiyi: "Kokoda, lovo y una lima que cocina el pescado en coco.",
  "Papúa Nueva Guinea": "Mumu, saksak y un cerdo que se cuece bajo tierra.",
  Samoa: "Oka, palusami y un coco que envuelve la hoja de taro.",
  Tonga: "Lū pulu, ota ika y un corned beef que se vuelve fiesta.",
  Vanuatu: "Lap lap, tuluk y un ñame rallado que se cuece en hoja.",
  "Islas Salomón": "Yuca, coco y un pescado que se casa con santan.",
  Palau: "Taro, arrecife y un cangrejo de coco de fiesta.",
  Kiribati: "Palusami, babai y un atún que se come crudo con lima.",
  Micronesia: "Panapén, coco y un cangrejo que sabe a laguna.",
  "Islas Marshall": "Panapén, coco y un pescado que se cocina en hoja.",
  Nauru: "Pescado a la brasa y un coco que es el país entero.",
  Tuvalu: "Pulaka, palusami y un arrecife que se come con coco.",
  "Corea del Norte": "Naengmyeon, caldo frío y un alforfón que se come en silencio.",
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
  Venezuela: "A diferencia de Colombia, la arepa se abre y se rellena: el país cabe en un bolsillo de maíz.",
  Bolivia: "A diferencia del Perú, la altura manda ají y papa; la salteña quema los dedos.",
  Paraguay: "A diferencia de Argentina, el maíz se vuelve chipa y la mandioca es el pan.",
  Honduras: "A diferencia de El Salvador, el plátano y el coco mandan la costa, no solo el maíz cerrado.",
  Panamá: "A diferencia de Colombia, el sancocho cruza afro, chino y criollo en un solo mediodía.",
  Haití: "A diferencia de Jamaica, el griot se fríe y el pikliz abre la grasa en creole.",
  "Países Bajos": "A diferencia de Bélgica, el stamppot se majá y el arenque se come de cola, hacia el cielo.",
  Noruega: "A diferencia de Suecia, el cordero se cura y el invierno se responde con akevitt.",
  Finlandia: "A diferencia de Suecia, el pan negro es el clima y el centeno no se esconde.",
  Chequia: "A diferencia de Alemania, el knedlík absorbe la salsa y la cerveza es cubierto.",
  Rumania: "A diferencia de Hungría, la mămăligă es el pan y el ajo no se esconde.",
  Georgia: "A diferencia de Turquía, el pan de queso se sirve con huevo y el vino fermenta bajo tierra.",
  Croacia: "A diferencia de Italia, la peka se cuece bajo brasas y el Adriático pide polenta.",
  Australia: "A diferencia del Reino Unido, el pub napa el schnitzel y el vegemite se unta apenas.",
  "Nueva Zelanda": "A diferencia de Australia, el hāngī se cuece bajo tierra: el cordero es pasto, no discusión.",
  Pakistán: "A diferencia de India, el nihari se espera toda la noche y el karahi no admite agua.",
  Bangladesh: "A diferencia de India, el hilsa y la mostaza mandan el río, no el tandoor.",
  "Sri Lanka": "A diferencia de India, el hopper amanece crujiente y el coco es el desayuno.",
  Nepal: "A diferencia de India, el dal bhat se vuelve a servir y el momo sube con la montaña.",
  Myanmar: "A diferencia de Tailandia, el té se ensalada y el mohinga es el desayuno.",
  Irak: "A diferencia de Irán, el masgouf se abre como un libro y el Tigris firma con humo.",
  Yemen: "A diferencia de Arabia Saudita, el hilbeh de fenogreco espesa el caldo en piedra.",
  "Arabia Saudita": "A diferencia de Yemen, la kabsa se comparte en fuente y el dátil endulza el café aparte.",
  Armenia: "A diferencia de Georgia, el lavash recoje el khorovats y la gata esconde un botón.",
  Afganistán: "A diferencia de Irán, el kabuli se corona de zanahoria dulce y el huésped manda.",
  Argelia: "A diferencia de Marruecos, el cuscús del viernes no se discute y el frik ahumado espesa el ramadán.",
  "Costa de Marfil": "A diferencia de Senegal, el attiéké es el cuscús del Golfo y el pollo se agita en vasija.",
  Tanzania: "A diferencia de Kenia, Zanzíbar perfumea el pilau de clavo y el Índico cabe en un grano.",
  Madagascar: "A diferencia de Mozambique, la hoja de yuca se majá y la vainilla perfumea la olla.",
  Mongolia: "A diferencia de China, el dumpling se come con las manos y el té se sala.",
  Kazajistán: "A diferencia de Rusia, el beshbarmak se come con cinco dedos y el kumis se ofrece primero.",
  Bélgica: "A diferencia de Francia, las frites se fríen dos veces y la mayo no es cobardía.",
  Bulgaria: "A diferencia de Grecia, el sirene se ralla sobre el huerto y el yogur se bebe helado.",
  Serbia: "A diferencia de Turquía, el ćevap se sirve en diez y el kajmak no se discute.",
  Islandia: "A diferencia de Noruega, el cordero se ahúma para Navidad y el skyr no es yogur.",
  Libia: "A diferencia de Túnez, el cuscús se come con shorba y el desierto manda sobre el aceite.",
  Sudán: "A diferencia de Egipto, el sorgo fermenta el pan y el ful se come con sésamo.",
  Eritrea: "A diferencia de Etiopía, el zigni mira al mar Rojo y el injera también es de teff.",
  Somalia: "A diferencia de Etiopía, el bariis se perfumea de xawaash y el Índico firma el grano.",
  Mauritania: "A diferencia de Senegal, el thieb viaja hassaní y el mechoui es de caravana.",
  Botsuana: "A diferencia de Sudáfrica, el seswaa se deshace a palo y el pap no admite salsa de más.",
  Namibia: "A diferencia de Sudáfrica, el kapana se come en la calle y el Atlántico llega en kingklip.",
  Zimbabue: "A diferencia de Sudáfrica, el sadza es el cubierto y el cacahuete espesa las hojas.",
  Zambia: "A diferencia de Zimbabue, el nshima mira al cobre y el kapenta sabe a lago.",
  Malaui: "A diferencia de Zambia, el chambo sale del lago y el nsima no se discute.",
  Ruanda: "A diferencia de Uganda, las brochettes son el restaurante y el isombe es hoja de yuca.",
  Burundi: "A diferencia de Ruanda, el ndagala cruje del Tanganica y el ubugari es mandioca.",
  "República Democrática del Congo": "A diferencia de Angola, el pondu es hoja y palma, y el fufu se come con la mano.",
  "República del Congo": "A diferencia de Gabón, el nyembwe se envuelve en hoja junto al río.",
  Gabón: "A diferencia del Congo, la odika espesa el bosque y el nyembwe no se apura.",
  Benín: "A diferencia de Nigeria, el maíz se tuesta en pâté y el ablo fermenta el arroz.",
  Togo: "A diferencia de Ghana, el fufu se casa con cacahuete y el akumé no pide disculpas.",
  "Burkina Faso": "A diferencia de Malí, el tô de mijo espera el riz gras y el pollo se asa en bicicleta.",
  Níger: "A diferencia de Nigeria, el dambou se viste de moringa y el Sahel cabe en un cuscús.",
  Chad: "A diferencia de Camerún, el daraba espesa el okra con maní y el mijo es el pan.",
  Guinea: "A diferencia de Senegal, el fouti lleva palma y el yassa no se esconde.",
  "Sierra Leona": "A diferencia de Liberia, la hoja de yuca se llama plasas y el jollof mira al puerto.",
  Liberia: "A diferencia de Ghana, el palava se fríe en palma y el dumboy es yuca majada.",
  Gambia: "A diferencia de Senegal, el benachin abre el arroz con tamarindo y el domoda es maní.",
  "Cabo Verde": "A diferencia de Portugal, la cachupa espera el puerto y el grogue endulza el Atlántico.",
  Mauricio: "A diferencia de India, el dholl puri se come con rougaille y el Índico habla criollo.",
  Seychelles: "A diferencia de Mauricio, el kari koko es el arrecife y la vainilla no se esconde.",
  Comoras: "A diferencia de Madagascar, la langosta se casa con vainilla y el pilaou lleva clavo.",
  Yibuti: "A diferencia de Somalia, el skoudehkaris es el cuerno de África en una sola olla.",
  "Santo Tomé y Príncipe": "A diferencia de Angola, el calulu es isla y el plátano se vuelve postre.",
  "Guinea Ecuatorial": "A diferencia de Camerún, el pepe soup pica el golfo y el succotash es criollo.",
  Lesoto: "A diferencia de Sudáfrica, la altura se come con papa y el moroho es el huerto.",
  Esuatini: "A diferencia de Sudáfrica, el sishwala es el reino y la cabra espera la fiesta.",
  "República Centroafricana": "A diferencia del Congo, el gozo es el cubierto y el kanda se rueda en maní.",
  "Sudán del Sur": "A diferencia de Sudán, el wal wal se sirve con cabra y el kisra no se discute.",
  "Guinea-Bisáu": "A diferencia de Senegal, el mancarra es lusófono y la cafriela pica el pollo.",
  Albania: "A diferencia de Grecia, el yogur cuece el cordero y el byrek se come de pie.",
  "Bosnia y Herzegovina": "A diferencia de Serbia, el ćevap cabe en un somun y el burek se corta con el sol.",
  "Macedonia del Norte": "A diferencia de Grecia, el frijol se hornea en tavče y el ajvar se unta como país.",
  Montenegro: "A diferencia de Croacia, el kajmak cierra el bistec y el brudet mira al Adriático.",
  Eslovenia: "A diferencia de Austria, la potica se enrolla de nuez y los žlikrofi son de Idrija.",
  Eslovaquia: "A diferencia de Chequia, la bryndza es el plato y la panceta cierra los halušky.",
  Lituania: "A diferencia de Polonia, la papa viaja en cepelinai y el frío se bebe rosa.",
  Letonia: "A diferencia de Estonia, el guisante gris espera el bacon y el pan negro lleva arenque.",
  Estonia: "A diferencia de Finlandia, el kama se come con kéfir y el espadín se sienta en centeno.",
  Bielorrusia: "A diferencia de Ucrania, el dranik se fríe y la nata responde al invierno.",
  Moldavia: "A diferencia de Rumania, la mămăligă se casa con zeama y el queso se derrite al lado.",
  Malta: "A diferencia de Italia, el pastizzi cabe en la mano y el conejo espera el domingo.",
  Chipre: "A diferencia de Grecia, el halloumi se grilla y el kleftiko se entierra con orégano.",
  Luxemburgo: "A diferencia de Alemania, el lomo ahumado se come con habas y el invierno es Judd.",
  Andorra: "A diferencia de Cataluña, el trinxat es montaña y la escudella no se apura.",
  Mónaco: "A diferencia de Francia, el garbanzo cruje en socca y el barbagiuan es la Roca.",
  "San Marino": "A diferencia de Italia, la torta tiene tres montes y el bustrengo es Navidad.",
  Liechtenstein: "A diferencia de Suiza, los knöpfle se comen con cebolla frita y el ribel es el desayuno.",
  Kosovo: "A diferencia de Albania, la flija se cuece capa a capa y el pite no se discute.",
  Uzbekistán: "A diferencia de Kazajistán, el plov se dora en qazan y la zanahoria es el país.",
  Kirguistán: "A diferencia de Kazajistán, el lagman se estira a mano y el beshbarmak se come con cinco.",
  Tayikistán: "A diferencia de Uzbekistán, el qurutob se vierte sobre el pan y el yogur es el caldo.",
  Turkmenistán: "A diferencia de Uzbekistán, el palaw parte el pan en el caldo y el desierto manda.",
  Azerbaiyán: "A diferencia de Irán, el piti se sirve en vasija y el azafrán firma el plov.",
  "Emiratos Árabes Unidos": "A diferencia de Arabia Saudita, el machboos lleva loomi y el luqaimat se baña en dátil.",
  Catar: "A diferencia de Arabia Saudita, el harees se maja y el machbous perfumea el loomi.",
  Kuwait: "A diferencia de Irak, el machboos se casa con pescado y el gabout nada en yogur.",
  Omán: "A diferencia de Yemen, el shuwa se entierra un día y la halwa se corta con azafrán.",
  Baréin: "A diferencia de Arabia Saudita, el muhammar sabe a dátil y el arroz se dora de fiesta.",
  Bután: "A diferencia de Nepal, el chile es el vegetal y el queso no se esconde del picante.",
  Maldivas: "A diferencia de Sri Lanka, el atún amanece con coco y el mas huni es el desayuno.",
  Brunei: "A diferencia de Malasia, el ambuyat se come con palillos y el nasi katok es la calle.",
  "Timor Oriental": "A diferencia de Indonesia, el tamarindo es lusófono y el maíz se casa con frijol.",
  Surinam: "A diferencia de Guyana, el pom es el almuerzo de fiesta y el moksi alesi mezcla océanos.",
  Belice: "A diferencia de México, el coco cocina el arroz y el hudut se come con plátano majado.",
  Bahamas: "A diferencia de Jamaica, el caracol se come crudo con lima y el cracked conch cruje.",
  Barbados: "A diferencia de Trinidad, el maíz nacional se llama cou-cou y el pez vuela al plato.",
  Granada: "A diferencia de Jamaica, el oil down no deja fondo y el panapén se cuece en coco.",
  "Santa Lucía": "A diferencia de Jamaica, el plátano verde se llama fig y el bacalao abre el mediodía.",
  Dominica: "A diferencia de Jamaica, el callaloo se espesa con cangrejo y el provision es el almuerzo.",
  "Antigua y Barbuda": "A diferencia de Jamaica, el fungee ata el maíz con okra y el pepperpot es fiesta.",
  "San Vicente y las Granadinas": "A diferencia de Granada, el panapén se asa entero y el callaloo llega con coco.",
  "San Cristóbal y Nieves": "A diferencia de Jamaica, el goat water es el caldo de fiesta y el cerdo se estofa oscuro.",
  Fiyi: "A diferencia de Samoa, el kokoda se cocina en lima y coco y el lovo se entierra para la fiesta.",
  "Papúa Nueva Guinea": "A diferencia de Indonesia, el mumu se cuece bajo tierra y el sagú es postre.",
  Samoa: "A diferencia de Tonga, el oka se come crudo y el palusami envuelve el coco en taro.",
  Tonga: "A diferencia de Samoa, el lū pulu casa el corned beef con hoja y el ota ika es el crudo.",
  Vanuatu: "A diferencia de Fiyi, el lap lap se ralla de ñame y se cuece en hoja con coco.",
  "Islas Salomón": "A diferencia de Papúa, la yuca se casa con santan y el pescado no se esconde.",
  Palau: "A diferencia de Filipinas, el taro es el cubierto y el cangrejo de coco es fiesta.",
  Kiribati: "A diferencia de Samoa, el babai es el taro del atolón y el atún se come con lima.",
  Micronesia: "A diferencia de Filipinas, el panapén se maja y el cangrejo sabe a laguna.",
  "Islas Marshall": "A diferencia de Kiribati, el panapén se cocina en hoja y el coco es el caldo.",
  Nauru: "A diferencia de Australia, el país cabe en un pescado a la brasa y un coco.",
  Tuvalu: "A diferencia de Samoa, el pulaka es el almuerzo y el arrecife se come con palusami.",
  "Corea del Norte": "A diferencia de Corea del Sur, el naengmyeon de Pionyang se come frío y sin prisa de picante.",
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
  Venezuela: ["Maíz", "Caraota", "Plátano"],
  Georgia: ["Queso", "Nuez", "Uva"],
  Pakistán: ["Cordero", "Naan", "Especias"],
  "Sri Lanka": ["Coco", "Chile", "Arroz"],
  Australia: ["Mar", "Brasa", "Merengue"],
  Bélgica: ["Cerveza", "Papa", "Mejillón"],
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
        cover: pickCountryCover(recipes),
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