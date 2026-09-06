#!/usr/bin/env python3
"""Emit src/lib/catalog-wave.ts from compact recipe records."""
from pathlib import Path

RAW = r"""
cochinita-pibil|Cochinita pibil|Cochinita pibil|México|Mérida|latam|ahumado,picante,citrico|6,8,6,3,7,8|180|8|media|fiesta,impresionar|yucatan,cerdo,achiote
Cerdo|1.5 kg|cerdo;Achiote|100 g|chile;Naranja agria|4|limon;Cebolla morada|2|cebolla;Tortillas de maíz|16|maiz;Hoja de plátano|para envolver|platano
Marina el cerdo en achiote y naranja un día.|Envuelve en hoja, horno 150 °C 3 horas.|Deshebra, moja en su jugo.|Tortilla, cebolla curtida, habanero.
Yucatán bajo tierra: el pib es hoyo, el achiote es sol. La cochinita no se fríe: se rinde.
La naranja agria no se sustituye con dulce. Si no hay, naranja + lima + un toque de vinagre.
---
pozole-rojo|Pozole rojo|Pozole rojo|México|Guerrero|latam|picante,umami,herbal|6,8,5,2,5,7|150|8|fácil|fiesta,consuelo|mexico,maiz,cerdo
Cabeza o espinazo de cerdo|1.2 kg|cerdo;Maíz cacahuazintle|500 g|maiz;Chile guajillo|8|chile;Ajo y orégano|al ras|ajo;Rábano y lechuga|para servir|limon;Tostadas y lima|al gusto|maiz
Cocina el maíz hasta que florezca.|Cocina la carne. Licúa el chile, súmalo.|Hierve junto 30 minutos.|Mesa de rábanos, orégano, lima: cada quien arma su plato.
El pozole es fiesta y resaca. El maíz que se abre es el aplauso.
No uses elote tierno. El cacahuazintle es otra especie: sin él, es sopa de maíz.
---
aji-de-gallina|Ají de gallina|Ají de gallina|Perú|Lima|latam|picante,cremoso,umami|5,7,3,2,7,6|50|4|fácil|consuelo|peru,pollo,aji
Pechuga de pollo|600 g|pollo;Ají amarillo|4|chile;Pan remojado en leche|3 rebanadas|leche;Nueces o pecanas|50 g|cacahuete;Papa y huevo|para servir|papa;Aceitunas|un puñado|aceituna
Cocina y deshebra el pollo. Reserva caldo.|Licúa ají, pan, nuez, ajo.|Sofríe la pasta, caldo, pollo. Crema espesa.|Papa, huevo, aceituna. Arroz al lado.
Crema limeña de ají y pan: la gallina de las casas, no de los restaurantes de moda.
El ají se pela. Si queda piel, pica a crudo y amarga.
---
locro|Locro|Locro|Argentina|Salta|latam|umami,dulce,cremoso|2,8,2,4,6,5|180|8|fácil|consuelo,fiesta|andes,maiz,invierno
Maíz blanco|400 g|maiz;Zapallo|400 g|calabaza;Porotos blancos|200 g|frijol;Mondongo o falda|400 g|res;Chorizo|2|cerdo;Cebolla de verdeo|para el quiquirimichi|cebolla
Remoja maíz y porotos. Cocina 2 horas.|Suma zapallo y carnes.|Chorizo al final. Machaca un poco para espesar.|Quiquirimichi: verdeo, ají, aceite.
El 25 de mayo no se discute el locro. Es independencia en cuchara.
El maíz se cuece hasta que explota de suave. Si queda entero y duro, espera.
---
chivito|Chivito|Chivito|Uruguay|Montevideo|latam|umami,cremoso,ahumado|1,8,3,1,8,4|25|2|fácil|fiesta|uruguay,sandwich,res
Bife de chorizo fino|2|res;Jamón y mozzarella|2 y 2|leche;Panceta|4 lonchas|cerdo;Huevo|2|huevo;Pan de milanesa|2|trigo;Tomate y mayonesa|al gusto|tomate
Plancha la carne. Panceta y huevo aparte.|Arma: pan, mayo, bife, jamón, queso, huevo, tomate.|Prensa un minuto.|Papas al lado. Servilleta extra.
Uruguay cabalga un sándwich. El chivito no es cabrito: es el bife que no cabe en la boca.
Que el pan aguante. Si se desarma, era flaco el pan, no el plato.
---
anticuchos|Anticuchos|Anticuchos|Perú|Lima|latam|ahumado,picante,umami|6,8,5,2,5,8|40|4|fácil|fiesta|peru,parrilla,calle
Corazón de res|700 g|res;Ají panca|3 cdas|chile;Vinagre y comino|al ras|comino;Ajo|4 dientes|ajo;Papa cocida|4|papa;Choclo|para servir|maiz
Corta el corazón, marina en panca, vinagre, comino.|Ensarta. Parrilla feroz, 2 minutos por lado.|Pincela más adobo.|Papa y salsa. De pie, en la esquina.
El anticucho nació esclavo y se volvió fiesta. El corazón, bien tratado, es el mejor corte.
No lo pases. El corazón seco es suela; jugoso, es Lima de noche.
---
gallo-pinto|Gallo pinto|Gallo pinto|Costa Rica|San José|latam|umami,fresco,dulce|2,7,3,2,5,5|25|4|fácil|consuelo|centroamerica,desayuno,frijol
Arroz del día anterior|3 tazas|arroz;Frijoles negros con caldo|2 tazas|frijol;Cebolla y chile dulce|al ras|cebolla;Cilantro|un ramito|cilantro;Huevo frito|4|huevo;Plátano maduro|2|platano
Sofríe cebolla y chile. Frijol y un poco de caldo.|Arroz, revuelve hasta mancharse.|Cilantro. Salsa Lizano si hay.|Huevo, plátano, natilla. El desayuno nacional.
Pinto porque el arroz se mancha. Gallo porque el día empieza ruidoso.
El arroz tiene que ser de ayer. El de hoy se pone mazacote.
---
pepian|Pepián|Pepián|Guatemala|Antigua|latam|ahumado,picante,umami|5,8,3,2,6,8|80|6|media|fiesta,consuelo|guatemala,semilla,pollo
Pollo|1.2 kg|pollo;Pepitoria y ajonjolí|80 g c/u|cacahuete;Chile pasa y guaque|al ras|chile;Tomate y miltomate|4 y 6|tomate;Güisquil y papa|al gusto|papa;Canela y ajo|al ras|ajo
Tosta semillas y chiles. Licúa con tomate.|Sofríe la salsa hasta que suelte aceite.|Pollo y verdura. 40 minutos.|Arroz. El pepián cubre, no nadar.
El recado tostado es el alma maya. Guatemala no pide permiso para espesar.
Tuesta hasta que huela a fiesta. Crudo, sabe a semilla de jardín.
---
milanesa-napolitana|Milanesa napolitana|Milanesa napolitana|Argentina|Buenos Aires|latam|umami,cremoso,dulce|2,7,3,3,8,4|35|2|fácil|consuelo,fiesta|argentina,empanado,queso
Nalga fina|2 filetes|res;Huevo y pan rallado|para empanar|huevo;Salsa de tomate|1 taza|tomate;Jamón y mozzarella|2 y 150 g|leche;Orégano|una pizca|oregano;Papas fritas|para servir|papa
Empana y fríe la milanesa.|Salsa, jamón, queso. Gratiná.|Orégano. Reposa un minuto.|Con papas, o no es napolitana de verdad.
Nápoles no la pidió. Buenos Aires la inventó y la volvió domingo.
No ahogues de salsa. La milanesa tiene que seguir crujiendo debajo.
---
tacu-tacu|Tacu tacu|Tacu tacu|Perú|Lima|latam|umami,ahumado,fresco|3,8,4,1,6,5|30|2|fácil|consuelo|peru,leftovers,frijol
Arroz con frijoles|3 tazas|arroz;Ajo y ají|al ras|ajo;Bistec|2|res;Huevo frito|2|huevo;Cebolla y lima para salsa criolla|al gusto|cebolla;Aceite|para la sartén|aceite
Machaca arroz y frijol con ajo. Sartén caliente, compacta, dora ambos lados.|Plancha el bistec.|Salsa criolla.|Huevo arriba. El tacu es el bis de la nevera.
Afroperuano: el resto de ayer se vuelve protagonista. Lima lo come de almuerzo.
Que dore. Si queda suave, es puré; si hace costra, es tacu tacu.
---
humitas|Humitas|Humitas|Chile|Valle Central|latam|dulce,cremoso,herbal|1,5,2,5,5,5|50|6|media|consuelo|andes,maiz,vapor
Choclo tierno|8|maiz;Albahaca|un ramito|albahaca;Cebolla|1|cebolla;Leche y mantequilla|al ras|leche;Queso fresco|opcional|leche;Hojas de choclo|para envolver|maiz
Ralla el choclo. Sofríe cebolla, mezcla con albahaca y un poco de azúcar.|Envuelve en hojas. Vapor 30 minutos.|Sirve en la hoja.|Mantequilla al abrir.
El choclo andino en paquete. Dulce o salada, según la abuela que mande.
Si el choclo está duro, no hay humita que valga. Espera marzo.
---
seco-de-pollo|Seco de pollo|Seco de pollo|Ecuador|Guayaquil|latam|herbal,umami,citrico|3,7,4,2,5,8|70|4|fácil|consuelo,fiesta|ecuador,cilantro,pollo
Pollo en trozos|1.2 kg|pollo;Cilantro|2 manojos|cilantro;Cerveza|250 ml|cebada;Cebolla y ajo|al ras|cebolla;Ají|1|chile;Arroz amarillo y plátano|para servir|arroz
Licúa cilantro con cerveza y aji.|Dora el pollo, sofríe cebolla, salsa verde.|45 minutos tapado.|Arroz, aguacate, plátano. El seco no está seco: está hondo.
Ecuador en verde. El cilantro no es adorno: es el caldo.
No dejes que se evapore del todo. Seco significa estofado, no desierto.
---
arroz-con-gandules|Arroz con gandules|Arroz con gandules|Puerto Rico|San Juan|caribe|umami,herbal,ahumado|3,8,3,2,5,7|50|6|fácil|fiesta|puerto-rico,arroz,sofrigito
Arroz|400 g|arroz;Gandules|250 g|frijol;Sofrito|4 cdas|cilantro;Cerdo o jamón de cocinar|150 g|cerdo;Achiote y hoja de laurel|al ras|chile;Caldo|800 ml|pollo
Sofríe cerdo y sofrito. Achiote.|Gandules, arroz, caldo. Un hervor.|Tapa 20 minutos a fuego bajo. Pegao del fondo.|Pernil si es Navidad.
El arroz de las fiestas boricuas. Sin gandules, es otro almuerzo.
No remuevas. El pegao se pelea al final, como premio.
---
ackee-saltfish|Ackee and saltfish|Ackee and saltfish|Jamaica|Kingston|caribe|umami,picante,fresco|4,8,4,2,6,6|40|4|media|consuelo,fiesta|jamaica,desayuno,bacalao
Bacalao salado|300 g|pescado;Ackee en lata o fresco|400 g|coco;Tomate y cebolla|2 y 1|tomate;Scotch bonnet|1|chile;Tomillo|unas ramitas|tomillo;Dumpling o bammy|para servir|trigo
Desala el bacalao, deshebra.|Sofríe cebolla, tomate, chile, tomillo, bacalao.|Ackee al final, solo para calentar.|Callaloo y dumpling. El desayuno de la isla.
El ackee parece huevo revuelto y es fruta. Jamaica no explica: sirve.
El ackee crudo mata. Cocido o de lata, festeja. No improvises.
---
sandwich-cubano|Sándwich cubano|Cubano|Cuba|La Habana|caribe|umami,citrico,ahumado|2,8,5,1,7,4|20|2|fácil|fiesta|cuba,sandwich,cerdo
Pan cubano|2|trigo;Pernil asado|200 g|cerdo;Jamón|4 lonchas|cerdo;Queso suizo|4 lonchas|leche;Pepinillos|8 rodajas|limon;Mostaza|al gusto|mostaza
Abre el pan, mostaza.|Pernil, jamón, queso, pepinillo.|Plancha con peso hasta que cruja y el queso llore.|Córtalo en diagonal. Café al lado.
Tampa y Miami se lo pelean; La Habana lo reconoció tarde. El plancha lo hace cubano.
Sin pepinillo no hay cubano. El ácido corta la grasa del pernil.
---
callaloo|Callaloo|Callaloo|Trinidad y Tobago|Puerto España|caribe|herbal,cremoso,picante|3,6,3,2,6,7|45|4|fácil|consuelo|caribe,hoja,coco
Hojas de callaloo o amaranto|400 g|espinaca;Leche de coco|250 ml|coco;Ocra|6|okra;Cangrejo o bacalao|opcional|pescado;Cebolla y ají|al ras|cebolla;Tomillo|al ras|tomillo
Sofríe cebolla y ají. Ocra.|Hojas, coco, tomillo. 20 minutos.|Machaca un poco.|Arroz. El verde tiene que brillar.
El callaloo viajó de África con otro nombre y se volvió domingo caribeño.
Si usas espinaca, acorta el fuego. El callaloo de verdad pide más tiempo.
---
doubles|Doubles|Doubles|Trinidad y Tobago|Puerto España|caribe|picante,dulce,citrico|6,6,6,4,4,7|40|4|media|fiesta|trinidad,calle,garbanzo
Harina para bara|300 g|trigo;Chana (garbanzo)|400 g|garbanzo;Cúrcuma y comino|al ras|comino;Tamarindo|3 cdas|limon;Chile|al gusto|chile;Cilantro|un ramito|cilantro
Masa de bara con cúrcuma, fríe discos suaves.|Chana con curry hasta cremoso.|Arma dos baras, chana, tamarindo, chile.|Se come de pie, desbordando.
El desayuno de Trinidad cabe en la mano y mancha la otra.
El bara se infla. Si queda galleta, la masa estaba seca.
---
rondon|Rondón|Rundown|Nicaragua|Bluefields|caribe|cremoso,picante,umami|4,8,4,3,7,7|60|6|media|fiesta|caribe,coco,pescado
Pescado y cangrejo|800 g|pescado;Leche de coco|500 ml|coco;Ñame y yuca|al gusto|papa;Plátano verde|2|platano;Chile y ajo|al ras|chile;Albahaca de monte|un ramito|albahaca
Reduce el coco hasta que suelte aceite.|Verduras, luego el pescado.|Fuego medio, 20 minutos.|Se come en cazuela, con cuchara honda.
Moskitia y Jamaica: el coco recorre el pescado hasta que todo es uno.
No hiervas a saltos o el coco se corta y el pescado se deshace.
---
pepperpot|Pepperpot|Pepperpot|Guyana|Georgetown|caribe|dulce,ahumado,picante|4,8,3,5,6,8|240|8|media|fiesta,consuelo|guyana,cassareep,navidad
Mezcla de carnes|1.5 kg|res;Cassareep|4 cdas|yuca;Canela, clavo, tiro|al ras|canela;Chile wiri wiri|4|chile;Azúcar moreno|1 cda|dulce;Pan|para servir|trigo
Dora las carnes. Cassareep, especias, chile, agua.|Fuego bajo horas. Mejora al día siguiente.|Ajusta dulce y sal.|Pan para el jugo negro.
Navidad guyanesa. El cassareep —yuca amarga reducida— es el alma oscura.
Sin cassareep no hay pepperpot. No lo finge con soya.
---
rabo-encendido|Rabo encendido|Rabo encendido|Cuba|La Habana|caribe|picante,umami,ahumado|7,9,4,2,7,7|180|6|fácil|consuelo,fiesta|cuba,rabo,estofado
Rabo de res|1.5 kg|res;Vino seco y tomate|al ras|tomate;Pimiento y cebolla|2 y 2|cebolla;Comino y orégano|al ras|comino;Ají|2|chile;Plátano y arroz|para servir|arroz
Dora el rabo. Sofrito cubano.|Vino, tomate, especias. 2 horas y media.|La salsa espesa, la carne se rinde.|Arroz blanco. El picante es el nombre.
Habana de fondo de olla. El rabo pide tiempo y lo paga con gelatina.
No escatimes el sofrito. Sin pimiento, es otro guiso.
---
poutine|Poutine|Poutine|Canadá|Montreal|norte|umami,cremoso,ahumado|1,8,2,1,8,4|25|2|fácil|consuelo,fiesta|quebec,papa,gravy
Papas para fritas|800 g|papa;Cheese curds|200 g|leche;Caldo de res|400 ml|res;Mantequilla y harina|para el gravy|trigo;Pimienta|al ras|pimienta
Fríe las papas dos veces.|Gravy: roux y caldo, pimienta negra.|Curds fríos sobre papas calientes, gravy encima.|Los curds tienen que chirríar.
Quebec no pide disculpas. Papa, queso y salsa: la trinidad de invierno.
Si el queso se derrite del todo, estaban calientes los curds. Tienen que chirríar.
---
gumbo|Gumbo|Gumbo|Estados Unidos|Nueva Orleans|norte|umami,picante,ahumado|5,9,3,2,7,8|120|6|media|consuelo,fiesta|louisiana,roux,marisco
Harina y grasa para roux|1 taza c/u|trigo;Andouille|200 g|cerdo;Camarón|300 g|camaron;Ocra o filé|al gusto|okra;Pimiento, apio, cebolla|el trinity|cebolla;Arroz|para servir|arroz
Roux oscuro, color chocolate, sin quemar.|Trinity, andouille, caldo.|Ocra. Camarón al final.|Arroz en el centro. Tabasco a la mesa.
Cajún y criollo se pelean el gumbo. El roux no se pelea: se cuida.
El roux se va de negro a quemado en un suspiro. No dejes la cuchara.
---
texas-brisket|Brisket texano|Brisket|Estados Unidos|Austin|norte|ahumado,umami,dulce|3,9,2,3,8,8|720|10|alta|fiesta,impresionar|texas,humo,res
Punta de pecho|4 kg|res;Sal y pimienta|al ras|pimienta;Papel butcher|para envolver|papel;Leña de roble|para el ahumador|lena;Pepinillos|para servir|limon;Pan blanco|para servir|trigo
Rub de sal y pimienta. Ahumador 120 °C.|Cuando la corteza esté lista, envuelve.|Hasta que la sonda entre como mantequilla.|Reposar una hora. Lonchea contra la fibra.
Texas mide el carácter en millas de humo. El brisket no se apura.
El reposo no es opcional. Cortar ya es tirar el jugo al suelo.
---
lobster-roll|Lobster roll|Lobster roll|Estados Unidos|Portland|norte|fresco,cremoso,citrico|1,7,5,1,6,5|25|2|fácil|ligero,impresionar|new-england,langosta,verano
Carne de langosta|300 g|pescado;Mayonesa o mantequilla|3 cdas|leche;Pan split-top|2|trigo;Apio y cebollín|al ras|cebolla;Limón|1|limon;Papas chips|para servir|papa
Langosta fría con mayo, o tibia con mantequilla. Elige un bando.|Tuesta el pan en mantequilla.|Rellena hasta que desborde.|Limón. Mar al lado, si puedes.
Maine no discute el roll: discute si va caliente o frío. Ambos ganan.
No ahogues la langosta en mayo. Ella es el plato; el pan, el vehículo.
---
nashville-hot-chicken|Pollo Nashville|Nashville hot chicken|Estados Unidos|Nashville|norte|picante,ahumado,dulce|9,6,3,3,8,6|50|4|media|fiesta|tennessee,frito,cayena
Pollo en piezas|1.2 kg|pollo;Harina y suero|para el empanado|trigo;Cayena y pimentón|3 cdas|chile;Azúcar moreno y ajo|al ras|ajo;Pan blanco|4 rebanadas|trigo;Pepinillos|para servir|limon
Empana y fríe el pollo.|Mezcla cayena con grasa caliente del freidor.|Pincela. Pan debajo, pepinillo arriba.|Duele y se pide más.
Prince's lo encendió por venganza. Nashville lo volvió himno.
La grasa caliente activa la cayena. Con aceite frío, es polvo rojo.
---
clam-chowder|Clam chowder|Clam chowder|Estados Unidos|Boston|norte|cremoso,umami,fresco|1,7,3,1,7,5|45|4|fácil|consuelo|new-england,almeja,nata
Almejas|1 kg|pescado;Papa|3|papa;Panceta|100 g|cerdo;Nata|250 ml|leche;Apio y cebolla|al ras|cebolla;Oyster crackers|para servir|trigo
Abre las almejas, reserva el jugo.|Panceta, cebolla, papa, jugo.|Nata al final. No hiervas.|Crackers. El chowder es manta.
Manhattan le pone tomate y Boston no le dirige la palabra.
La nata se suma fuera del hervor. Si cuaja, era un flan salado.
---
poke-bowl|Poke|Poke bowl|Estados Unidos|Honolulu|norte|fresco,umami,picante|4,8,5,2,4,6|20|2|fácil|ligero|hawaii,atun,crudo
Atún ahi|300 g|pescado;Soya y sésamo|al ras|soya;Cebolla dulce|1/2|cebolla;Arroz sushi|para servir|arroz;Alga y aguacate|al gusto|aguacate;Mayonesa picante|opcional|chile
Cuba el atún. Soya, sésamo, cebolla.|Arroz tibio en el bowl.|Atún, alga, aguacate.|Se arma y se come ya.
Hawái crudo y salado. El poke no es bowl de moda: es pescador en tazón.
El atún se corta frío. Si está tibia la tabla, se pone papilla.
---
jambalaya|Jambalaya|Jambalaya|Estados Unidos|Nueva Orleans|norte|picante,ahumado,umami|6,8,3,2,6,8|55|6|fácil|fiesta|louisiana,arroz,andouille
Arroz|350 g|arroz;Andouille|200 g|cerdo;Pollo|400 g|pollo;Camarón|200 g|camaron;Trinity y tomate|al ras|tomate;Tomillo y cayena|al ras|chile
Dora pollo y andouille. Trinity.|Tomate, arroz, caldo. 20 minutos tapado.|Camarón 5 minutos.|Que el arroz se manche, no se pase.
El jambalaya es paella criolla que olvidó el azafrán y descubrió el humo.
Un solo hervor. Remover lo vuelve risotto de Luisiana, y no es un cumplido.
---
carne-asada|Carne asada|Carne asada|Estados Unidos|Los Ángeles|norte|ahumado,citrico,herbal|4,8,5,2,6,7|40|4|fácil|fiesta|california,parrilla,res
Arrachera|800 g|res;Naranja y lima|1 y 2|limon;Cilantro y cebolla|al ras|cilantro;Cerveza o soya|un chorro|soya;Guacamole y pico de gallo|para servir|aguacate;Tortillas|12|maiz
Marina 2 horas. Parrilla alta.|Reposa, lonchea fino.|Tortilla, guacamole, cebolla asada.|Se come de pie, discutiendo el punto.
La frontera no es un lado: es un asado. Los Ángeles lo hizo almuerzo.
Contra la fibra. A favor, es suela; al través, es fiesta.
---
crab-cakes|Crab cakes|Crab cakes|Estados Unidos|Baltimore|norte|umami,citrico,fresco|2,8,4,1,6,5|35|4|media|impresionar,ligero|maryland,cangrejo,mar
Carne de cangrejo|400 g|pescado;Mayonesa y mostaza|2 cdas|leche;Panko|poco|trigo;Huevo|1|huevo;Old Bay|1 cdita|pimenton;Limón y remoulade|para servir|limon
Mezcla suave. El cangrejo manda, el pan no.|Forma, enfría 20 minutos.|Sartén con mantequilla, dora.|Limón. Si se deshace, era honesto.
Maryland jura que el pastel de cangrejo no lleva relleno. Tiene razón.
Menos pan. Si sabe a empanada, perdiste el Chesapeake.
---
cioppino|Cioppino|Cioppino|Estados Unidos|San Francisco|norte|umami,citrico,herbal|3,9,5,2,5,7|50|4|media|fiesta,impresionar|california,marisco,tomate
Cangrejo, mejillón, almeja|1 kg junto|pescado;Camarón y pescado blanco|300 g|camaron;Tomate y vino blanco|al ras|tomate;Hinojo y ajo|al ras|ajo;Pan de masa madre|para servir|trigo
Sofríe hinojo y ajo. Tomate, vino, caldo.|Mariscos por tiempos: primero los que tardan.|Pan para mojar.|El cioppino es el muelle en una olla.
Los pescadores italianos de North Beach lo armaron con lo que sobraba del barco.
No hiervas el marisco. Se pone goma y San Francisco no perdona.
---
chicken-fried-steak|Chicken fried steak|Chicken fried steak|Estados Unidos|Austin|norte|cremoso,umami,ahumado|2,7,2,1,8,3|40|2|fácil|consuelo|texas,empanado,gravy
Bistec aplasta|2|res;Harina, huevo, suero|para empanar|trigo;Leche para gravy|300 ml|leche;Pimienta negra|generosa|pimienta;Puré de papa|para servir|papa
Empana el bistec. Fríe.|En la misma sartén, gravy de leche y pimienta.|Puré. El gravy cubre todo.|Es milanesa que se fue al diner.
Texas empanó el bistec y lo bañó en pimienta. No es pollo. Da igual.
El gravy pide pimienta hasta que estornudes. Si está blanco y tímido, no es el plato.
---
oyakodon|Oyakodon|親子丼|Japón|Tokio|asia-este|umami,cremoso,dulce|1,8,3,4,5,6|20|2|fácil|consuelo|japon,arroz,huevo
Muslo de pollo|250 g|pollo;Huevo|3|huevo;Cebolla|1|cebolla;Dashi, soya, mirin|al ras|soya;Arroz japonés|para servir|arroz;Mitsuba|unas hojas|cilantro
Cebolla y pollo en dashi-soya-mirin.|Huevo a medias, tapa 30 segundos.|Vierte sobre arroz.|La yema tiene que quedar viva.
Padre e hijo: el pollo y el huevo en un bowl. Tokio lo come de almuerzo diario.
El huevo no se cuaja del todo. Si queda tortilla, perdiste el don.
---
katsu-curry|Katsu curry|カツカレー|Japón|Tokio|asia-este|dulce,umami,cremoso|3,7,2,5,7,5|40|2|fácil|consuelo,fiesta|japon,curry,cerdo
Chuleta de cerdo|2|cerdo;Panko|para empanar|trigo;Roux de curry japonés|100 g|comino;Papa y zanahoria|2 y 2|papa;Arroz|para servir|arroz;Fukujinzuke|para servir|pepinillo
Haz el curry con verdura y roux.|Empana y fríe el katsu. Lonchea.|Arroz, curry, katsu encima.|El crujiente contra la salsa es el punto.
El curry japonés es dulce y espeso, hijo de la marina británica y el supermercado.
El katsu se pone al final. Si nada en curry 10 minutos, adiós panko.
---
kimchi-jjigae|Kimchi jjigae|김치찌개|Corea del Sur|Seúl|asia-este|picante,umami,citrico|8,8,6,2,6,7|30|2|fácil|consuelo|corea,kimchi,tofu
Kimchi maduro|300 g|chile;Cerdo o atún|150 g|cerdo;Tofu|200 g|tofu;Gochugaru y ajo|al ras|ajo;Cebollín|2|cebolla;Caldo|400 ml|caldo
Sofríe el kimchi con cerdo en su jugo.|Caldo, hervor 15 minutos.|Tofu al final.|Se sirve hirviendo. El jjigae no espera.
El kimchi viejo no se tira: se vuelve el mejor estofado de Seúl.
Usa kimchi ácido, de nevera olvidada. El fresco no da caldo.
---
jajangmyeon|Jajangmyeon|짜장면|Corea del Sur|Incheon|asia-este|umami,dulce,ahumado|2,8,2,5,6,6|35|2|fácil|consuelo,fiesta|corea,fideos,soya
Fideos gruesos|400 g|fideos;Chunjang (soya negra)|3 cdas|soya;Cerdo|200 g|cerdo;Papa y cebolla|2 y 1|papa;Calabacín|1|calabacin;Pepino rallado|para servir|pepino
Sofríe chunjang en aceite. Cerdo y verdura.|Agua, un poco de azúcar, espesa con almidón.|Fideos, salsa encima, pepino.|Mezcla en la mesa hasta negro.
Incheon lo tomó de Shandong y lo volvió el pedido de los viernes.
Tuesta el chunjang o sabe a pasta cruda. Un minuto de aceite lo cambia.
---
wonton-soup|Sopa wonton|雲吞湯|China|Cantón|asia-este|umami,fresco,herbal|2,9,3,1,4,6|40|4|media|ligero,consuelo|canton,caldo,cerdo
Tapas de wonton|30|trigo;Cerdo y camarón picados|200 g y 100 g|cerdo;Jengibre y cebollín|al ras|jengibre;Caldo de pollo claro|1.2 l|pollo;Pak choi|4|repollo;Soya|unas gotas|soya
Rellena, cierra como ingot.|Caldo limpio a fuego medio.|Wontons 3 minutos, verdes al final.|El caldo tiene que verse, no teñirse.
Cantón mide a un chef por un caldo que parece agua y sabe a gallina.
No hiervas a saltos. El wonton se rompe y el caldo se enturbia.
---
kung-pao-chicken|Pollo kung pao|宫保鸡丁|China|Chengdu|asia-este|picante,umami,dulce|7,7,4,4,5,8|25|2|fácil|fiesta|sichuan,cacahuete,pollo
Pechuga o muslo en cubos|400 g|pollo;Chiles secos|8|chile;Cacahuetes|50 g|cacahuete;Szechuan pepper|1 cdita|chile;Soya, vinagre, azúcar|la salsa|soya;Cebollín|2|cebolla
Marina el pollo. Wok feroz.|Chiles y pimienta, pollo, salsa.|Cacahuetes y cebollín. 30 segundos.|Tiene que oler a humo de wok.
Gongbao: el gobernador que le dio nombre. Sichuan le dio el hormigueo.
El wok tiene que humear. Si no, es pollo con salsa, no kung pao.
---
bun-cha|Bún chả|Bún chả|Vietnam|Hanói|asia-este|ahumado,citrico,herbal|4,7,7,3,5,8|45|4|fácil|ligero,fiesta|vietnam,cerdo,fideos
Cerdo picado y panceta|400 g|cerdo;Fideos de arroz|400 g|fideos;Nước chấm|para mojar|limon;Hierbas: menta, cilantro, perilla|un manojo|cilantro;Ajo y chalota|al ras|ajo;Papaya verde|opcional|papaya
Hamburguesitas y panceta a la parrilla de carbón.|Nước chấm: pescado, lima, azúcar, chile.|Fideos fríos, hierbas, carne al caldo.|Hanói al mediodía.
Obama lo comió con Bourdain. Hanói lo comía desde antes, cada día.
El carbón no es opcional. A la plancha sabe a cerdo; al carbón, a Hanói.
---
com-tam|Cơm tấm|Cơm tấm|Vietnam|Saigón|asia-este|ahumado,dulce,citrico|3,7,6,4,5,6|40|2|fácil|consuelo|vietnam,arroz,cerdo
Arroz partido|200 g|arroz;Chuleta de cerdo|2|cerdo;Huevo frito o tráng|1|huevo;Pepino y encurtidos|al gusto|limon;Nước chấm|para servir|pescado;Cebolla frita|un puñado|cebolla
Marina la chuleta en ajo, pescado, azúcar. Parrilla.|Arroz partido cocido.|Monta: arroz, carne, huevo, encurtido, salsa.|El plato del almuerzo saigonés.
El arroz partido era sobra. Saigón lo volvió identidad.
La chuleta se maja para que se marque. Gruesa, queda cruda por dentro.
---
sundubu-jjigae|Sundubu jjigae|순두부찌개|Corea del Sur|Seúl|asia-este|picante,cremoso,umami|8,8,4,1,6,7|25|2|fácil|consuelo|corea,tofu,picante
Tofu extra blando|400 g|tofu;Kimchi y gochugaru|al ras|chile;Marisco o cerdo|150 g|camaron;Huevo|1|huevo;Ajo y caldo|al ras|ajo;Cebollín|2|cebolla
Sofríe kimchi y gochugaru.|Caldo, tofu a cucharadas. Hierve.|Huevo crudo al centro. Tapa 20 segundos.|Se come quemando la lengua, feliz.
El sundubu no se corta: se derrama. Seúl en día frío.
El huevo se pone al final. Si se cuece del todo, era otro jjigae.
---
nikujaga|Nikujaga|肉じゃが|Japón|Tokio|asia-este|dulce,umami,cremoso|1,7,2,5,4,5|45|4|fácil|consuelo|japon,casa,res
Res en tiras|300 g|res;Papa|4|papa;Cebolla|2|cebolla;Soya, mirin, azúcar|al ras|soya;Zanahoria|1|zanahoria;Shirataki|opcional|fideos
Dora la res. Verduras.|Soya, mirin, azúcar, agua. 20 minutos.|Reduce hasta brillar.|El plato que sabe a casa ajena y propia.
La marina japonesa lo copió del stew británico. Las madres lo volvieron ley.
Las papas se deshacen un poco a propósito. Es el espesor.
---
congee|Congee|粥|China|Cantón|asia-este|umami,cremoso,fresco|2,8,3,1,4,5|90|4|fácil|consuelo,ligero|canton,arroz,desayuno
Arroz|150 g|arroz;Agua o caldo|1.8 l|caldo;Cerdo deshebrado|150 g|cerdo;Huevo de mil años|2|huevo;Cebollín y jengibre|al ras|jengibre;Youtiao|para servir|trigo
Arroz a fuego bajo 1 hora, revolviendo.|Cerdo y jengibre.|Huevo, cebollín, masa frita.|El congee consuela resacas y gripes.
Es agua de arroz que se volvió manta. Cantón lo come al amanecer.
Si se pega, fuego más bajo y más agua. El congee pide paciencia, no fuego.
---
siu-yuk|Siu yuk|燒肉|China|Cantón|asia-este|ahumado,umami,cremoso|2,8,3,2,8,6|90|4|media|fiesta,impresionar|canton,cerdo,crujiente
Panceta con piel|1.2 kg|cerdo;Sal gruesa|para la piel|sal;Cinco especias y ajo|al ras|anís;Vinagre|para la piel|limon;Salsa hoisin|para servir|soya;Arroz|para servir|arroz
Pincha la piel, vinagre, seca. Sal.|Horno 190 °C hasta crackling.|Reposa, corta en cubos.|La piel tiene que estallar.
El siu mei cuelga en Cantón como joyería. El yuk es el que cruje.
La piel se seca en la nevera sin tapar. Humedad = goma, no vidrio.
---
takoyaki|Takoyaki|たこ焼き|Japón|Osaka|asia-este|umami,dulce,ahumado|2,7,3,4,6,6|30|4|media|fiesta|osaka,pulpo,calle
Pulpo cocido|150 g|pescado;Harina para takoyaki|200 g|trigo;Dashi y huevo|para la masa|huevo;Salsa takoyaki y mayo|al gusto|soya;Katsuobushi y aonori|para servir|pescado;Jengibre rojo|al gusto|jengibre
Masa en la plancha de huecos. Pulpo.|Gira con palillo hasta bola.|Salsa, mayo, bonito que baile.|Se come quemando el paladar, riendo.
Osaka cabe en una bola. El pulpo es el premio; la masa, el juego.
La plancha tiene que estar bien caliente o no se redondean.
---
yangzhou-fried-rice|Arroz frito Yangzhou|扬州炒饭|China|Yangzhou|asia-este|umami,fresco,ahumado|2,8,2,2,5,5|20|2|fácil|consuelo|china,arroz,wok
Arroz de ayer|3 tazas|arroz;Huevo|2|huevo;Camarón|100 g|camaron;Jamón o lap cheong|50 g|cerdo;Guisantes y cebollín|al ras|cebolla;Soya clara|1 cda|soya
Huevo revuelto, reserva.|Wok: camarón, jamón, arroz frío.|Huevo, soya, cebollín.|Grano a grano, no apelmazado.
Yangzhou lo hizo imperial. El wok lo hace cotidiano.
Arroz frío y seco. El caliente se pega y traiciona al wok.
---
hot-and-sour-soup|Sopa agridulce|酸辣汤|China|Sichuan|asia-este|citrico,picante,umami|6,8,8,2,4,6|30|4|fácil|consuelo|sichuan,vinagre,tofu
Caldo de pollo|1 l|pollo;Tofu firme|200 g|tofu;Orejón y bambú|al ras|hongo;Huevo|1|huevo;Vinagre negro y pimienta blanca|al ras|limon;Almidón|para espesar|trigo
Hongos y bambú en el caldo.|Tofu, vinagre, pimienta, soya.|Almidón, hilo de huevo.|Tiene que picar la nariz y el paladar.
El agridulce chino no es agridulce de comida rápida. Es vinagre y pimienta blanca.
La pimienta blanca va al final. Cocida 10 minutos, se apaga.
---
samgyetang|Samgyetang|삼계탕|Corea del Sur|Seúl|asia-este|herbal,umami,cremoso|2,8,2,2,5,8|90|2|media|consuelo,impresionar|corea,ginseng,pollo
Pollo pequeño|1|pollo;Arroz glutinoso|80 g|arroz;Ginseng y jujube|al ras|jengibre;Ajo|8 dientes|ajo;Ginkgo|opcional|ginkgo;Sal y cebollín|para servir|cebolla
Rellena el pollo de arroz, ginseng, ajo, jujube.|Cocina 1 hora en agua apenas cubierto.|Sal a la mesa, no en la olla.|Verano coreano: calor contra calor.
El samgyetang se come en el día más caliente. El ginseng no es adorno.
Cierra bien el pollo o el arroz se fuga y queda sopa suelta.
---
massaman-curry|Massaman|มัสมั่น|Tailandia|Bangkok|asia-sur|dulce,cremoso,ahumado|4,7,3,5,7,9|70|4|media|impresionar,consuelo|tailandia,curry,cacahuete
Pasta massaman|4 cdas|chile;Leche de coco|400 ml|coco;Estofado de res|700 g|res;Papa|3|papa;Cacahuetes|50 g|cacahuete;Canela y anís|al ras|canela
Sofríe la pasta en coco espeso.|Res, coco, especias. 45 minutos.|Papa y cacahuetes.|Arroz jazmín. Dulce y hondo.
Persia llegó a Ayutthaya y se quedó en curry. El massaman es esa carta.
La pasta se sofríe hasta que el aceite se separe. Si no, sabe a crudo.
---
tom-kha-gai|Tom kha gai|ต้มข่าไก่|Tailandia|Bangkok|asia-sur|cremoso,citrico,herbal|4,6,6,3,6,9|30|4|fácil|ligero,consuelo|tailandia,coco,galanga
Leche de coco|400 ml|coco;Muslo de pollo|400 g|pollo;Galanga y lemongrass|al ras|jengibre;Hojas de lima|4|limon;Hongos|150 g|hongo;Salsa de pescado y chile|al gusto|pescado
Coco y hierbas, no hiervas a saltos.|Pollo, hongos.|Pescado, lima, chile al final.|Las hierbas se apartan al comer.
El tom yum grita; el tom kha susurra. Misma familia, otro volumen.
La galanga no es jengibre. Si la sustituyes, es otra sopa.
---
nasi-lemak|Nasi lemak|Nasi lemak|Malasia|Kuala Lumpur|asia-sur|picante,dulce,umami|6,7,4,4,6,8|40|4|fácil|fiesta,consuelo|malasia,coco,sambal
Arroz jazmín|300 g|arroz;Leche de coco y pandan|al ras|coco;Sambal|para servir|chile;Anchoas fritas y cacahuetes|al gusto|pescado;Huevo|4|huevo;Pepino|1|pepino
Cocina el arroz en coco y pandan.|Sambal de chile y cebolla.|Monta en hoja de plátano: arroz, sambal, anchoa, cacahuete, huevo, pepino.|El desayuno que es cena.
Malasia en una hoja. El sambal decide si amas o sufres.
El pandan no es opcional si lo encuentras. Sin él, el arroz es solo coco.
---
sinigang|Sinigang|Sinigang|Filipinas|Manila|asia-sur|citrico,umami,fresco|3,7,8,2,4,6|50|6|fácil|consuelo|filipinas,tamarindo,sopa
Costilla de cerdo|800 g|cerdo;Tamarindo o mix sinigang|al ras|limon;Kangkong o espinaca|un manojo|espinaca;Rábano y tomate|al gusto|tomate;Chile verde|2|chile;Cebolla|1|cebolla
Cocina el cerdo 40 minutos.|Tamarindo, verduras de raíz.|Hojas y chile al final.|Arroz. El ácido es el clima de Manila en olla.
El sinigang es el caldo con el que Filipinas se reconoce. Ácido, no picante.
El tamarindo va medido. Si pasas, no hay azúcar que lo salve del todo.
---
kare-kare|Kare-kare|Kare-kare|Filipinas|Manila|asia-sur|dulce,umami,cremoso|2,8,2,4,7,6|150|6|media|fiesta|filipinas,cacahuete,rabo
Rabo de res|1.2 kg|res;Mantequilla de cacahuete|150 g|cacahuete;Berenjena y judía larga|al gusto|berenjena;Annatto|para el color|achiote;Bagoong|para servir|camaron;Arroz|para servir|arroz
Cocina el rabo hasta gelatina.|Cacahuete, annatto, verduras.|Bagoong a la mesa, no en la olla.|Cada quien sala con el fermento.
El kare no es curry indio. Es cacahuete y rabo, y el bagoong es el secreto.
Sin bagoong sabe plano. No lo mezcles todo: que cada cucharada decida.
---
larb|Larb|ລາບ|Laos|Vientián|asia-sur|picante,citrico,herbal|7,6,8,2,3,8|20|4|fácil|ligero,fiesta|laos,ensalada,cerdo
Cerdo o pollo picado|400 g|cerdo;Arroz tostado molido|2 cdas|arroz;Lima y salsa de pescado|al ras|limon;Menta y cebollín|un manojo|cilantro;Chile tostado|al gusto|chile;Lechuga|para servir|lechuga
Cocina la carne sin jugo, o cruda en la versión lao.|Lima, pescado, chile, arroz tostado.|Hierbas a puñados.|Lechuga para envolver.
Larb es el plato nacional de Laos. El arroz tostado es el umami que no se ve.
Tuesta el arroz hasta oro. Crudo, es arena; tostado, es el plato.
---
dal-makhani|Dal makhani|दाल मखनी|India|Delhi|asia-sur|cremoso,umami,picante|4,7,2,3,8,7|180|6|fácil|consuelo|india,lenteja,mantequilla
Urad dal negro|250 g|lenteja;Frijol rojo|50 g|frijol;Mantequilla y nata|80 g y 80 ml|leche;Tomate|3|tomate;Garam masala y chile|al ras|chile;Jengibre y ajo|al ras|jengibre
Remoja y cocina las dal 1 hora.|Sofríe tomate, ajo, jengibre. Suma las dal.|Mantequilla y nata. Fuego lento.|Naan. El dal pide de un día para otro.
Punyab de noche: lenteja negra, mantequilla, paciencia. El makhani no se apura.
Un carbón al soplete en ghee al final da el ahumado de dhaba.
---
chole-bhature|Chole bhature|छोले भटूरे|India|Delhi|asia-sur|picante,citrico,cremoso|6,6,4,2,7,7|50|4|media|fiesta|india,garbanzo,frito
Garbanzos|400 g|garbanzo;Té negro y amchur|al ras|limon;Cebolla y tomate|2 y 2|tomate;Harina para bhature|300 g|trigo;Yogur|para la masa|yogurt;Cebolla y limón|para servir|cebolla
Chole con té, tomate, especias. Oscuros y hondos.|Masa de bhature con yogur, fríe globos.|Chole, cebolla, encurtido.|El almuerzo de Delhi que llena la semana.
El chole se tiñe con té. El bhature se infla como ego. Juntos son Delhi.
Fríe el bhature justo antes. En 5 minutos se desinfla y se pone triste.
---
panang-curry|Panang|พะแนง|Tailandia|Bangkok|asia-sur|cremoso,picante,dulce|5,7,3,4,7,8|30|4|fácil|impresionar,consuelo|tailandia,cacahuete,curry
Pasta panang|3 cdas|chile;Leche de coco|400 ml|coco;Res o pollo en tiras|400 g|res;Cacahuete|2 cdas|cacahuete;Hoja de lima|4|limon;Azúcar de palma y pescado|al ras|pescado
Sofríe pasta en coco espeso.|Carne, resto del coco, cacahuete.|Hojas en tiras. Espeso, no sopa.|Arroz. Un curry de cuchara corta.
El panang es el curry que se sienta, no el que nada. Bangkok lo prefiere espeso.
Si queda líquido, reduce. El panang se come con poco arroz, no al revés.
---
idli-sambar|Idli sambar|இட்லி சாம்பார்|India|Chennai|asia-sur|herbal,citrico,picante|4,5,5,2,3,7|40|4|media|ligero,consuelo|tamil,fermentado,desayuno
Masa de idli fermentada|500 g|arroz;Toor dal|150 g|lenteja;Tamarindo y verdura|al ras|limon;Mostaza en grano y hoja de curry|al ras|comino;Coco rallado para chutney|80 g|coco;Chile|2|chile
Idlis al vapor 12 minutos.|Sambar: dal, tamarindo, verdura, templado de mostaza.|Chutney de coco.|Se moja, no se corta con cubiertos.
Tamil Nadu amanece así: suave, ácido, picante. El idli es almohada de arroz.
La masa tiene que fermentar. Sin agrio, es bolita triste.
---
pani-puri|Pani puri|पानी पूरी|India|Mumbai|asia-sur|picante,citrico,fresco|7,5,8,3,2,8|30|4|media|fiesta,ligero|india,calle,garbanzo
Puris crujientes|24|trigo;Papa y garbanzo|al ras|papa;Pani de menta, tamarindo y chile|400 ml|limon;Cebolla picada|1/2|cebolla;Cilantro|un ramito|cilantro;Chutney de dátil|opcional|dulce
Pani helado, bien ácido y picante.|Agujerea la puri, rellena, baña, a la boca.|De a una. No hay mesa que las espere.|Mumbai en un bocado que explota.
El pani es el alma. La puri es el tambor. Juntos, la calle.
El pani se hace y se hiela. Tibio, es otro chat.
---
vindaloo|Vindaloo|विंदालू|India|Goa|asia-sur|picante,citrico,ahumado|9,7,6,2,6,8|90|4|media|fiesta|goa,vinagre,cerdo
Cerdo|800 g|cerdo;Vinagre de caña|80 ml|limon;Chiles secos|10|chile;Ajo y jengibre|al ras|ajo;Comino, mostaza, canela|al ras|comino;Arroz|para servir|arroz
Marina el cerdo en vinagre y pasta de chile.|Sofríe, cubre, 1 hora.|Reduce. El vinagre brilla.|Arroz. Sudor permitido.
Vinagre y ajo de los portugueses; chile de Goa. El vindaloo no es el más picante del menú británico: es este.
Desala si el cerdo viene curado. El vinagre ya sala bastante.
---
mee-goreng|Mee goreng|Mee goreng|Indonesia|Yakarta|asia-sur|picante,dulce,umami|6,8,4,5,5,7|20|2|fácil|fiesta,consuelo|indonesia,fideos,wok
Fideos amarillos|400 g|fideos;Kecap manis|2 cdas|soya;Camarón y tofu|al gusto|camaron;Huevo|1|huevo;Sambal|al gusto|chile;Lima|1|limon
Wok: ajo, chile, proteína.|Fideos, kecap, huevo.|Lima y sambal.|El wok tiene que oler a calle.
Primo del nasi goreng, con fideo en vez de arroz. El kecap pinta de noche.
Fideos un poco crudos al wok. Si llegan cocidos, se ponen papilla.
---
musakhan|Musakhan|مسخن|Palestina|Jerusalén|medio-oriente|ahumado,herbal,umami|2,8,4,2,7,8|70|6|fácil|fiesta,impresionar|palestina,sumac,pollo
Pollo|1.4 kg|pollo;Cebolla|6|cebolla;Sumac|4 cdas|sumac;Aceite de oliva|120 ml|aceite;Piñones|50 g|cacahuete;Pan taboon o pita|4|trigo
Cebolla a fuego lento con sumac y aceite.|Pollo asado encima.|Pan, cebolla, pollo, piñones.|Se come con la mano, compartido.
El musakhan es hospitalidad palestina: cebolla, olivo, sumac. El pan es plato y cubierto.
El sumac no es adorno. Sin él, es pollo con cebolla.
---
maqluba|Maqluba|مقلوبة|Palestina|Ramala|medio-oriente|umami,herbal,cremoso|2,8,3,2,6,7|90|6|media|fiesta,impresionar|palestina,arroz,berenjena
Arroz|400 g|arroz;Pollo o cordero|800 g|pollo;Berenjena y coliflor|al gusto|berenjena;Cúrcuma y pimienta|al ras|comino;Yogur|para servir|yogurt;Almendras|un puñado|cacahuete
Fríe o asa las verduras.|Capa: carne, verdura, arroz. Caldo.|20 minutos. Voltea la olla de un golpe.|Yogur. El aplauso es que no se desmorone.
Maqluba: al revés. El teatro de la olla es mitad del plato.
Espera 5 minutos antes de voltear. Si corres, se parte el edificio.
---
fesenjan|Fesenjan|فسنجان|Irán|Teherán|medio-oriente|dulce,umami,cremoso|2,8,5,6,7,8|120|6|media|impresionar,consuelo|persia,granada,nuez
Pollo o pato|1.2 kg|pollo;Nuez molida|250 g|cacahuete;Melaza de granada|150 ml|limon;Cebolla|2|cebolla;Azúcar|una pizca|dulce;Arroz con tahdig|para servir|arroz
Tuesta y muele la nuez.|Cebolla, pollo, nuez, granada. 1 hora.|Oscuro, agridulce, espeso.|Tahdig al lado. Persépolis en salsa.
Irán en una cucharada: bosque de nueces y granada. El color es caoba, no rojo.
La nuez se tuesta. Cruda, el fesenjan queda crudo y pálido.
---
ghormeh-sabzi|Ghormeh sabzi|قورمه سبزی|Irán|Teherán|medio-oriente|herbal,citrico,umami|3,8,6,1,5,9|150|6|media|consuelo,fiesta|persia,hierbas,lenteja
Res o cordero|700 g|res;Fenugreco, perejil, cilantro, puerro|400 g junto|cilantro;Frijoles rojos|150 g|frijol;Limones secos|4|limon;Cebolla|1|cebolla;Arroz|para servir|arroz
Sofríe las hierbas hasta oscuras.|Carne, limón seco, frijol. 2 horas.|El caldo se pone negro-verde.|Arroz. El plato nacional no se discute.
Las hierbas se fríen hasta que huelen a bosque. Irán cabe en ese fuego.
No temas oscurecer las hierbas. Crudas, el ghormeh sabe a ensalada caliente.
---
koobideh|Koobideh|کباب کوبیده|Irán|Teherán|medio-oriente|ahumado,umami,herbal|3,8,3,2,7,7|40|4|media|fiesta|persia,cordero,parrilla
Cordero y res picados|700 g|cordero;Cebolla rallada escurrida|1|cebolla;Bicarbonato y sumac|una pizca|sumac;Tomate|4|tomate;Arroz con azafrán|para servir|arroz;Mantequilla|para el arroz|leche
Amasa la carne con cebolla hasta pegajosa.|Ensarta, parrilla. Tomates igual.|Arroz azafranado, sumac.|El kebab se sirve ya.
El koobideh se cae de la brocheta si la carne está tibia o la cebolla mojada.
Escurre la cebolla. El agua es el enemigo de la brocheta.
---
fattoush|Fattoush|فتوش|Líbano|Beirut|medio-oriente|fresco,citrico,herbal|2,4,7,2,4,7|20|4|fácil|ligero,fiesta|libano,ensalada,pan
Pan pita frito|2|trigo;Tomate y pepino|3 y 2|tomate;Rábano y lechuga|al gusto|limon;Menta y perejil|un manojo|cilantro;Melaza de granada y limón|al ras|limon;Sumac|1 cda|sumac
Fríe o tuesta la pita.|Verdura, hierbas, sumac.|Aliño, pita al final para que cruja.|Mezze, no acompañamiento.
El fattoush es el cajón de sastre de Beirut: pan de ayer, huerta de hoy.
La pita se suma al servir. Antes, es sopa de pan.
---
shish-taouk|Shish taouk|شيش طاووق|Líbano|Beirut|medio-oriente|citrico,ahumado,cremoso|3,7,6,2,5,7|40|4|fácil|fiesta,ligero|libano,pollo,yogurt
Pechuga de pollo|700 g|pollo;Yogur|150 g|yogurt;Ajo y limón|al ras|ajo;Tomillo y pimentón|al ras|pimenton;Toum|para servir|ajo;Pita y pepinillos|al gusto|trigo
Marina en yogur, ajo, limón.|Brochetas, parrilla alta.|Toum, pita, ensalada.|El ajo es el plato; el pollo, el pretexto.
El taouk es el pollo que Beirut asó para el mundo. El toum no se escatima.
El yogur ablanda. Sin marinada, es pollo a la parrilla y basta.
---
mujadara|Mujadara|مجدرة|Líbano|Beirut|medio-oriente|umami,dulce,herbal|1,7,3,3,4,6|45|4|fácil|consuelo,ligero|libano,lenteja,cebolla
Lentejas|250 g|lenteja;Arroz|200 g|arroz;Cebolla|4|cebolla;Comino|1 cdita|comino;Aceite de oliva|80 ml|aceite;Yogur|para servir|yogurt
Cebolla en pluma, frita hasta caoba. Reserva.|Lenteja, arroz, comino, agua.|Cebolla encima a puñados.|Yogur. Pobreza convertida en fiesta.
Arroz, lenteja, cebolla. El Levante demuestra que tres cosas bastan.
La cebolla se fríe lento. Quemada, amarga el plato entero.
---
sabich|Sabich|סביח|Israel|Tel Aviv|medio-oriente|cremoso,picante,fresco|4,6,6,2,6,6|30|2|fácil|ligero,fiesta|israel,berenjena,huevo
Pita|2|trigo;Berenjena frita|1|berenjena;Huevo duro|2|huevo;Amba (mango)|2 cdas|limon;Tahini|al gusto|cacahuete;Ensalada y pepinillo|al gusto|tomate
Fríe la berenjena hasta crema.|Pita, tahini, berenjena, huevo, amba, ensalada.|Se desborda. Es la idea.|Desayuno de sábado iraquí en Tel Aviv.
Los judíos iraquíes lo llevaron. Tel Aviv lo volvió cola de medianoche.
La amba no es opcional. Sin ella, es un sándwich de berenjena.
---
lahmacun|Lahmacun|Lahmacun|Turquía|Gaziantep|medio-oriente|picante,herbal,ahumado|5,7,5,1,5,8|35|4|media|fiesta|turquia,cordero,pan
Masa fina|4 discos|trigo;Cordero picado|250 g|cordero;Tomate y pimiento|al ras|tomate;Perejil y ajo|al ras|cilantro;Limón y cebolla|para servir|limon;Sumac|al gusto|sumac
Extiende la masa como papel.|Cubre con la pasta de cordero.|Horno 280 °C 5 minutos.|Limón, perejil, enrolla.
No es pizza. Turquía se ofende, y tiene razón: es más fina, más limón, menos queso.
Masa fina de verdad. Si queda pan, era pide.
---
manakish|Manakish|مناقيش|Líbano|Beirut|medio-oriente|herbal,citrico,umami|1,6,4,1,6,8|30|4|fácil|ligero,consuelo|libano,zaatar,desayuno
Masa de pan|4 discos|trigo;Zaatar|4 cdas|oregano;Aceite de oliva|80 ml|aceite;Tomate y menta|para servir|tomate;Labneh|opcional|yogurt;Aceitunas|un puñado|aceituna
Mezcla zaatar y aceite.|Extiende, cubre, horno caliente.|Menta, tomate, labneh.|El desayuno de Beirut cabe en la mano.
El zaatar es tomillo, sésamo, sumac. El manakish es ese bosque sobre pan.
Aceite generoso. El zaatar seco se quema y amarga.
---
dolma|Dolma|Dolma|Turquía|Estambul|medio-oriente|herbal,citrico,umami|2,6,5,2,5,7|80|6|media|fiesta,ligero|turquia,hoja,arroz
Hojas de parra|40|hoja;Arroz|200 g|arroz;Piñones y pasas|al ras|cacahuete;Menta, eneldo, perejil|al ras|cilantro;Limón y aceite|al ras|limon;Yogur|para servir|yogurt
Relleno de arroz, hierba, piñón.|Enrolla apretado. Cazuela, limón, aceite.|Fuego bajo 40 minutos.|Yogur. Frías o tibias.
El dolma es el recado de las abuelas: paciencia enrollada.
No las apiles sueltas o se abren. Apretadas, como secretos.
---
pasta-alla-norma|Pasta alla Norma|Pasta alla Norma|Italia|Catania|mediterraneo|umami,herbal,dulce|2,7,4,3,6,6|35|4|fácil|consuelo,fiesta|sicilia,berenjena,tomate
Rigatoni|400 g|trigo;Berenjena|2|berenjena;Tomate|500 g|tomate;Ricotta salata|80 g|leche;Albahaca|un ramito|albahaca;Ajo|2 dientes|ajo
Fríe la berenjena en cubos.|Salsa de tomate y ajo.|Pasta, berenjena, ricotta, albahaca.|Norma es la ópera; la pasta, el bis.
Catania nombra sus platos como arias. La ricotta salata es el aplauso.
Sala y escurre la berenjena. Si no, bebe aceite y se pone pesada.
---
fideua|Fideuà|Fideuà|España|Gandía|mediterraneo|umami,ahumado,citrico|2,9,4,1,5,7|50|4|media|fiesta,impresionar|valencia,fideo,marisco
Fideos cortos|400 g|fideos;Caldo de pescado|1 l|pescado;Gamba y rape|al gusto|camaron;Ñora y ajo|al ras|ajo;Azafrán|una pizca|azafran;Alioli|para servir|ajo
Sofríe el fideo hasta oro.|Salmorra, caldo, marisco.|No remuevas. Socarrat.|Alioli. Gandía se ríe de la paella.
La fideuà nació cuando se acabó el arroz. Gandía no volvió atrás.
Tuesta el fideo. Crudo, es sopa de tallarines, no fideuà.
---
salade-nicoise|Salade niçoise|Salade niçoise|Francia|Niza|mediterraneo|fresco,citrico,umami|1,7,6,1,5,6|25|2|fácil|ligero|niza,atun,verano
Atún en aceite|180 g|pescado;Huevo|2|huevo;Judía verde y papa|al ras|papa;Aceituna y anchoa|al gusto|aceituna;Tomate|2|tomate;Aceite de oliva y albahaca|al ras|albahaca
Cocina papa y judía al dente.|Monta, no mezcles como ensalada loca.|Aceite, nunca vinagre según los puristas.|Niza en el plato, sin arroz.
Niza se pelea por la papa. Tú ponla. El aceite, de oliva y generoso.
Atún en aceite, no en agua. El agua es un insulto al Mediterráneo.
---
caponata|Caponata|Caponata|Italia|Palermo|mediterraneo|dulce,citrico,umami|2,6,6,5,5,6|40|4|fácil|ligero,fiesta|sicilia,berenjena,agridulce
Berenjena|2|berenjena;Apio|2 tallos|apio;Aceituna y alcaparra|al ras|aceituna;Tomate|2|tomate;Vinagre y azúcar|2 cdas y 1|limon;Piñones|un puñado|cacahuete
Fríe la berenjena.|Sofríe apio, tomate, aceituna, alcaparra.|Vinagre y azúcar. Junta. Fría.|Al día siguiente está más siciliana.
La caponata es agridulce de palacio y de calle. Palermo no elige.
Se come fría. Caliente, es pisto; fría, es caponata.
---
imam-bayildi|Imam bayildi|İmam bayıldı|Turquía|Estambul|mediterraneo|herbal,dulce,umami|1,6,3,4,7,7|70|4|fácil|ligero,impresionar|turquia,berenjena,aceite
Berenjenas|4|berenjena;Cebolla|3|cebolla;Tomate|3|tomate;Ajo|4 dientes|ajo;Aceite de oliva|120 ml|aceite;Perejil y azúcar|al ras|cilantro
Abre las berenjenas, sálalas.|Relleno de cebolla, tomate, ajo, aceite generoso.|Horno 40 minutos.|Se sirve tibia. El imán se desmayó, dice la leyenda, de tanto aceite bueno.
No escatimes el oliva. El nombre es el chiste y la receta.
---
kleftiko|Kleftiko|Κλέφτικο|Grecia|Atenas|mediterraneo|herbal,umami,citrico|2,8,5,2,7,7|210|6|fácil|impresionar,consuelo|grecia,cordero,horno
Pierna de cordero|1.5 kg|cordero;Papa|6|papa;Limón y orégano|al ras|limon;Ajo|1 cabeza|ajo;Vino blanco|un vaso|vino;Papel de horno|para el paquete|papel
Todo en un paquete cerrado.|Horno 150 °C 3 horas.|Abre a la mesa. El vapor es el aplauso.|El kleftiko era el cordero de los kleftes, cocinado bajo tierra.
El paquete no se abre a mitad. La paciencia es el ladrón bueno.
---
ribollita|Ribollita|Ribollita|Italia|Florencia|mediterraneo|herbal,umami,cremoso|1,8,3,2,5,6|90|6|fácil|consuelo|toscana,pan,frijol
Cavolo nero|400 g|repollo;Frijoles canellini|250 g|frijol;Pan toscano de ayer|300 g|trigo;Zanahoria, apio, cebolla|el soffritto|cebolla;Tomate|2|tomate;Aceite de oliva|para servir|aceite
Soffritto, verdura, frijol, caldo. 40 minutos.|Pan, reposa.|Se rehace al día siguiente —ribollita: hervida de nuevo.|Aceite crudo al plato.
Toscana de invierno. El pan de ayer es el lujo de hoy.
El aceite se suma crudo. Cocido, pierde el frutado.
---
pan-con-tomate|Pan con tomate|Pa amb tomàquet|España|Barcelona|mediterraneo|fresco,umami,citrico|1,6,5,3,4,5|10|2|fácil|ligero|catalunya,tomate,desayuno
Pan de pueblo|4 rebanadas|trigo;Tomate maduro|2|tomate;Aceite de oliva|al gusto|aceite;Sal gruesa|al ras|sal;Ajo|1 diente|ajo;Jamón|opcional|cerdo
Tuesta el pan. Ajo crudo.|Ralla el tomate, no lo pongas en rodajas.|Aceite, sal.|Desayuno, almuerzo, cena. Catalunya no se cansa.
El tomate se ralla y el pan se lleva la pulpa. Las pepitas, al compost.
Tomate feo y maduro. El de nevera, duro, hace pan con agua.
---
vongole|Spaghetti alle vongole|Spaghetti alle vongole|Italia|Nápoles|mediterraneo|umami,fresco,herbal|1,8,4,1,4,7|25|2|fácil|ligero,impresionar|napoles,almeja,ajo
Spaghetti|250 g|trigo;Almejas|800 g|pescado;Ajo|3 dientes|ajo;Perejil y vino blanco|al ras|cilantro;Guindilla|1|chile;Aceite de oliva|al ras|aceite
Abre las almejas con ajo y vino. Reserva el jugo colado.|Pasta al dente, jugo, almejas, perejil.|Nunca nata. Nápoles vigila.|El mar tiene que olerse.
Si las almejas no abren, se tiran. Las demás, al plato ya.
---
arancini|Arancini|Arancini|Italia|Palermo|mediterraneo|umami,cremoso,ahumado|2,8,3,2,7,5|50|6|media|fiesta|sicilia,arroz,frito
Arroz para risotto|300 g|arroz;Ragú y guisante|al ras|res;Mozzarella|150 g|leche;Azafrán|una pizca|azafran;Huevo y pan rallado|para empanar|huevo;Aceite para freír|necesario|aceite
Arroz con azafrán, enfría.|Bolas, relleno, empanado.|Fríe a 170 °C.|En Palermo son arancini; en Catania, arancine. Elige bando con cuidado.
Enfría el arroz o no se cierran. Caliente, es risotto frito y se abre.
---
youvetsi|Youvetsi|Γιουβέτσι|Grecia|Atenas|mediterraneo|umami,dulce,herbal|2,8,3,3,6,7|110|6|fácil|consuelo,fiesta|grecia,orzo,cordero
Cordero|800 g|cordero;Orzo|300 g|trigo;Tomate|400 g|tomate;Canela y clavo|al ras|canela;Cebolla y ajo|al ras|cebolla;Queso kefalotyri|para servir|leche
Dora el cordero. Tomate, especias, 1 hora.|Orzo en la misma cazuela, horno.|Queso al final.|El orzo bebe el cordero.
La giouvetsi es el domingo griego en cazuela de barro. La canela no se discute.
El orzo se pasa en un instante. Sácalo cuando aún tiene un punto.
---
dakos|Dakos|Ντάκος|Grecia|Creta|mediterraneo|fresco,umami,herbal|1,6,5,2,6,6|15|2|fácil|ligero|creta,tomate,queso
Pan de cebada|2|trigo;Tomate rallado|2|tomate;Mizithra o feta|80 g|leche;Aceite de oliva|al gusto|aceite;Orégano|al ras|oregano;Aceitunas|un puñado|aceituna
Humedece el pan, no lo empapes.|Tomate, queso, orégano, aceite.|Creta en diez minutos.|El dakos es ensalada y tostada a la vez.
El pan de cebada aguanta. El de molde se pone papilla.
---
lasagna|Lasagna|Lasagne alla bolognese|Italia|Bolonia|europa|umami,cremoso,herbal|1,9,3,2,8,6|180|8|media|consuelo,impresionar|emilia,ragu,horno
Láminas de pasta|12|trigo;Ragú de res y cerdo|800 g|res;Bechamel|700 ml|leche;Parmesano|80 g|leche;Cebolla, apio, zanahoria|el soffritto|cebolla;Vino tinto|un vaso|vino
Ragú 2 horas.|Capas: pasta, ragú, bechamel, queso.|Horno 180 °C 40 minutos. Reposa 15.|Cortar caliente es crimen.
Bolonia no pone mozzarella a puñados. El ragú y la bechamel bastan.
El reposo compacta. Si sirves ya, es derrumbe.
---
stroganoff|Stroganoff|Бефстроганов|Rusia|San Petersburgo|europa|cremoso,umami,ahumado|2,8,3,2,7,6|35|4|fácil|consuelo|rusia,nata,res
Solomillo en tiras|600 g|res;Champiñón|250 g|hongo;Cebolla|1|cebolla;Nata agria|200 g|leche;Mostaza|1 cda|mostaza;Fideos o arroz|para servir|fideos
Dora la res en tandas. Reserva.|Cebolla, hongos, mostaza, nata.|Res 2 minutos. No hiervas.|Eneldo. Petersburgo en cuchara.
Stroganoff era conde; el plato, de casino. La nata no se hierve.
La res se dora y se aparta. Cocida en la nata, se pone suela.
---
shepherds-pie|Shepherd's pie|Shepherd's pie|Reino Unido|Londres|europa|umami,cremoso,herbal|2,8,2,2,6,5|70|6|fácil|consuelo|reino-unido,cordero,papa
Cordero picado|600 g|cordero;Papa|1 kg|papa;Zanahoria y guisante|al ras|zanahoria;Caldo y Worcestershire|al ras|res;Mantequilla y leche|para el puré|leche;Tomillo|unas ramitas|tomillo
Sofríe el cordero, verdura, caldo. Reduce.|Puré. Cubre. Marca con tenedor.|Horno hasta dorar.|Cottage es res; shepherd es cordero. No los mezcles.
El puré se pone con manga o cuchara, pero gratinado siempre.
---
irish-stew|Irish stew|Stobhach|Irlanda|Dublín|europa|umami,herbal,cremoso|1,8,3,2,5,6|150|6|fácil|consuelo|irlanda,cordero,papa
Cuello de cordero|1 kg|cordero;Papa|800 g|papa;Cebolla y zanahoria|al ras|cebolla;Perejil y tomillo|al ras|tomillo;Cebada|opcional|trigo;Caldo|al cubrimiento|caldo
Capa de carne y verdura.|Agua o caldo, fuego bajo 2 horas.|Perejil.|Pan de soda. La lluvia afuera es parte de la receta.
Sin cerveza negra ni trucos: cordero, papa, tiempo. Irlanda basta.
La papa se deshace un poco y espesa. Es el diseño, no un error.
---
fondue|Fondue|Fondue savoyarde|Suiza|Ginebra|europa|cremoso,umami,herbal|1,7,3,1,8,5|30|4|fácil|fiesta,consuelo|suiza,queso,vino
Gruyère y vacherin|400 g c/u|leche;Vino blanco|250 ml|vino;Ajo|1 diente|ajo;Kirsch y maicena|al ras|maiz;Nuez moscada|una pizca|nuez;Pan del día|para mojar|trigo
Ajo la cazuela. Vino, queso a puñados.|Maicena, kirsch. Remueve en ochos.|Fuego mínimo. Pan. El fondo tostado se disputa.
Suiza se entiende alrededor de una cazuela. El que pierde el pan, invita.
Remueve siempre. Quieto, el queso se parte y no hay kirsch que lo salve.
---
kaesespaetzle|Käsespätzle|Käsespätzle|Alemania|Múnich|europa|cremoso,umami,dulce|1,7,2,2,8,4|40|4|media|consuelo,fiesta|suabia,queso,cebolla
Harina y huevo|300 g y 4|trigo;Emmental o Bergkäse|250 g|leche;Cebolla|3|cebolla;Mantequilla|40 g|leche;Nuez moscada|una pizca|nuez;Cebollín|para servir|cebolla
Spaetzle: masa blanda, rallador, agua hirviendo.|Capas de pasta y queso. Horno.|Cebolla frita a puñados.|El mac and cheese que fue primero.
La cebolla frita no es adorno. Sin ella, es pasta con queso.
La masa de spätzle es blanda. Si se puede amasar, le falta agua.
---
sauerbraten|Sauerbraten|Sauerbraten|Alemania|Colonia|europa|citrico,umami,dulce|2,8,6,4,6,6|180|6|media|consuelo|alemania,res,vinagre
Tapa de res|1.5 kg|res;Vinagre y vino|para la marinada|limon;Cebolla, zanahoria, laurel|al ras|cebolla;Pan de jengibre o galleta|para ligar|trigo;Lombarda|para servir|repollo;Klösse|para servir|papa
Marina 2 o 3 días.|Dora, sofríe, cocina 2 horas en la marinada.|Liga con pan de jengibre.|Agrio y dulce, como el Rin.
La marinada es el plato. Sin días, es un asado con vinagre.
No temas el pan de jengibre. Es el truco de la abuela del Rin.
---
bigos|Bigos|Bigos|Polonia|Varsovia|europa|ahumado,umami,citrico|3,9,5,2,7,7|180|8|fácil|consuelo,fiesta|polonia,chucrut,caza
Chucrut y col fresca|500 g c/u|repollo;Cerdo, salchicha, tocino|800 g junto|cerdo;Setas secas|30 g|hongo;Ciruela seca y vino|al ras|dulce;Hojas de laurel|2|laurel;Pan de centeno|para servir|trigo
Sofríe carnes. Col, chucrut, setas, ciruela.|Horas a fuego bajo. Mejor al día tres.|Pan. El bigos es cacería sin bosque.
Se dice que el bigos mejora cada recalentado. Es verdad y es dogma.
No escatimes el humo de la carne. Sin ahumado, es col estofada.
---
pelmeni|Pelmeni|Пельмени|Rusia|Siberia|europa|umami,cremoso,herbal|2,8,3,1,6,4|80|6|media|consuelo,fiesta|siberia,dumpling,invierno
Harina y huevo|400 g y 1|trigo;Res y cerdo picados|500 g|res;Cebolla|1|cebolla;Mantequilla y nata agria|para servir|leche;Eneldo|un ramito|eneldo;Pimienta|al ras|pimienta
Masa, círculos, relleno, cierra como oreja.|Hierve hasta que floten. Mantequilla.|Nata, eneldo. Se comen por docenas.|Siberia los congelaba en la nieve. Tú, en el congelador.
Ciérralos bien. Un pelmen abierto es una nube de carne en el agua.
---
francesinha|Francesinha|Francesinha|Portugal|Oporto|europa|picante,umami,cremoso|5,8,4,2,8,5|40|2|media|fiesta|oporto,sandwich,cerveza
Pan de molde|4 rebanadas|trigo;Bife, salchicha, jamón|al ras|res;Queso|8 lonchas|leche;Cerveza, tomate, piri-piri para la salsa|al ras|chile;Huevo|1|huevo;Papas fritas|para servir|papa
Arma el sándwich, cubre de queso.|Salsa de cerveza y piri-piri. Horno.|Huevo y papas.|Oporto en resaca y en gloria.
La salsa es el plato. El sándwich, el pretexto para beberla con papas.
La salsa pide cerveza de verdad, no caldo. Si no pica, no es Oporto.
---
caldo-verde|Caldo verde|Caldo verde|Portugal|Braga|europa|herbal,umami,ahumado|2,6,2,1,5,5|40|4|fácil|consuelo|minho,col,chorizo
Papa|600 g|papa;Couve galega o kale|200 g|repollo;Chorizo|100 g|cerdo;Ajo y cebolla|al ras|ajo;Aceite de oliva|al ras|aceite;Broa|para servir|trigo
Cocina papa y cebolla, tritura.|Col en tiras finísimas. 5 minutos.|Chorizo en rodajas, aceite crudo.|El caldo del Minho es niebla comestible.
La col se corta como hilo. Ancha, es otra sopa.
---
smorrebrod|Smørrebrød|Smørrebrød|Dinamarca|Copenhague|europa|fresco,umami,citrico|2,7,5,2,6,6|25|4|fácil|ligero,impresionar|dinamarca,centeno,arenque
Pan de centeno|4 rebanadas|trigo;Mantequilla|al ras|leche;Arenque o camarón|al gusto|pescado;Huevo|2|huevo;Eneldo y rábano|al ras|eneldo;Remolacha o pepino|al gusto|pepino
Pan, mantequilla generosa —el smør.|Monta en capas bajas y precisas.|Se come con cuchillo y tenedor, no a mordidas.|Copenhague en miniatura.
El pan de centeno es el plato. Lo demás, sombrero.
No hagas torres. El smørrebrød es horizontal, como Dinamarca.
---
beef-wellington|Beef Wellington|Beef Wellington|Reino Unido|Londres|europa|umami,cremoso,herbal|1,9,3,2,8,7|90|4|alta|impresionar|inglaterra,solomillo,hojaldre
Solomillo|800 g|res;Duxelles de champiñón|250 g|hongo;Hojaldre|1 lámina|trigo;Jamón o crêpe|para envolver|cerdo;Yema|para pintar|huevo;Jugo de vino|para servir|vino
Sella el solomillo. Envuelve en duxelles y jamón. Frío.|Hojaldre, horno 200 °C hasta 52 °C interno.|Reposa 10 minutos.|Rosa adentro, oro afuera. Londres de club.
El frío antes del hojaldre evita el jugo que empapa. Sin reposo en nevera, es papilla.
---
gnocchi-sorrentina|Gnocchi alla sorrentina|Gnocchi alla sorrentina|Italia|Sorrento|europa|cremoso,umami,herbal|1,7,3,2,6,6|50|4|media|consuelo|campania,papa,mozzarella
Papa|800 g|papa;Harina|200 g|trigo;Huevo|1|huevo;Tomate|400 g|tomate;Mozzarella|200 g|leche;Albahaca|un ramito|albahaca
Puré de papa, harina, huevo. Ñoquis.|Salsa de tomate. Horno con mozzarella.|Albahaca. El ñoqui tiene que ser almohada, no bala.
Poca harina. Mucha, son dumplings; poca, se deshacen. El punto es el arte.
---
choucroute|Choucroute garnie|Choucroute garnie|Francia|Estrasburgo|europa|ahumado,citrico,umami|2,8,5,2,7,6|150|6|fácil|consuelo,fiesta|alsacia,chucrut,cerdo
Chucrut|1 kg|repollo;Salchichas variadas|600 g|cerdo;Panceta y jarrete|al ras|cerdo;Vino blanco de Alsacia|un vaso|vino;Enebro y laurel|al ras|enebro;Papa|6|papa
Enjuaga un poco el chucrut. Vino, especias, carnes.|1 hora y media.|Salchichas al final. Mostaza.|Alsacia no es tímida con el cerdo.
El chucrut se cocina en vino, no en agua. El agua lo vuelve lavandería.
---
paprikash|Paprikás csirke|Paprikás csirke|Hungría|Budapest|europa|cremoso,ahumado,dulce|4,7,3,3,7,8|55|4|fácil|consuelo|hungria,pimenton,pollo
Pollo|1.2 kg|pollo;Pimentón dulce húngaro|3 cdas|pimenton;Cebolla|2|cebolla;Nata agria|200 g|leche;Guindilla|opcional|chile;Nokedli|para servir|trigo
Cebolla, fuera del fuego el pimentón.|Pollo, agua, 30 minutos.|Nata fuera del hervor.|Nokedli. El pimentón es el país.
El pimentón se añade fuera del fuego. Si se quema, amarga Hungría entera.
---
bunny-chow|Bunny chow|Bunny chow|Sudáfrica|Durban|africa|picante,umami,dulce|8,7,4,3,6,8|60|4|fácil|fiesta|durban,curry,pan
Pan de molde blanco|1 hogaza|trigo;Cordero o frijol|700 g|cordero;Masala de Durban|3 cdas|chile;Tomate y cebolla|2 y 2|tomate;Papa|2|papa;Cilantro|un ramito|cilantro
Curry hondo, 45 minutos.|Cava el pan, llena, tapa con la miga.|Se come con la mano, desde afuera.|Durban no pide plato.
Los indios de Natal lo inventaron para llevar. El pan es el táper.
El pan tiene que ser hogaza blanca de panadería. El artesanal se deshace.
---
shiro|Shiro|ሽሮ|Etiopía|Adís Abeba|africa|picante,cremoso,umami|6,7,3,2,6,8|35|4|fácil|consuelo,ligero|etiopia,garbanzo,berbere
Harina de garbanzo|200 g|garbanzo;Berbere|2 cdas|chile;Cebolla|2|cebolla;Niter kibbeh|3 cdas|leche;Ajo y jengibre|al ras|ajo;Injera|para servir|trigo
Cebolla hasta que se derrita.|Kibbeh, berbere, harina, agua. 15 minutos.|Injera. El shiro es el diario etíope, más que el doro wat.
Sin grumos. Se añade la harina lluvia, como polenta.
---
ndole|Ndolé|Ndolé|Camerún|Duala|africa|umami,amargo,cremoso|3,8,3,2,7,7|80|6|media|fiesta|camerun,cacahuete,hoja
Hojas amargas o espinaca|400 g|espinaca;Pasta de cacahuete|150 g|cacahuete;Camarón seco y res|al ras|camaron;Cebolla y ajo|al ras|cebolla;Aceite de palma|2 cdas|aceite;Plátano maduro|para servir|platano
Blanchea las hojas para quitar amargo.|Cacahuete, carnes, hojas. 30 minutos.|Plátano. Duala en su fiesta.
El amargo se domestica, no se borra. El ndolé pide ese filo.
---
waakye|Waakye|Waakye|Ghana|Acra|africa|picante,umami,dulce|5,7,3,3,5,6|50|4|fácil|fiesta,consuelo|ghana,arroz,frijol
Arroz y frijol|200 g y 150 g|arroz;Hojas de sorgo o bicarbonato|para el color|hoja;Huevo y espagueti|para servir|huevo;Estofado de tomate|al ras|tomate;Shito|al gusto|chile;Plátano frito|al gusto|platano
Frijol primero, arroz después, hoja para el rojo-marrón.|Monta con todo lo que hay en el puesto.|El waakye es plato y buffet.
El color lo da la hoja, no el colorante. Sin ella, es arroz con frijol.
---
kitfo|Kitfo|ክትፎ|Etiopía|Adís Abeba|africa|picante,umami,herbal|7,8,3,1,7,8|20|4|media|impresionar,fiesta|etiopia,res,crudo
Res magra picada a cuchillo|400 g|res;Niter kibbeh|4 cdas|leche;Mitmita|2 cditas|chile;Ayib (queso fresco)|100 g|leche;Injera|para servir|trigo;Gomen|opcional|espinaca
Calienta el kibbeh con mitmita, no frías la carne.|Mezcla. Leb leb (tibio) o crudo.|Injera, ayib.|El kitfo pide carne de ese día, no de nevera larga.
Si no te anima crudo, léb leb: apenas tibio. Cocido del todo ya no es kitfo.
---
brik|Brik|Brik|Túnez|Túnez|africa|cremoso,umami,citrico|3,7,5,1,7,5|20|2|media|fiesta,ligero|tunez,huevo,frito
Hojas de brick|4|trigo;Huevo|4|huevo;Atún y alcaparra|al ras|pescado;Perejil y cebolla|al ras|cilantro;Aceite para freír|necesario|aceite;Limón|1|limon
Rellena, huevo crudo al centro, cierra triángulo.|Fríe 1 minuto por lado. Yema viva.|Limón. Se come de inmediato.
La yema corre. Si se cuaja, era un pastelito, no un brik.
---
zaalouk|Zaalouk|Zaalouk|Marruecos|Marrakech|africa|herbal,dulce,ahumado|3,6,4,3,5,7|40|4|fácil|ligero,fiesta|marruecos,berenjena,comino
Berenjena|2|berenjena;Tomate|3|tomate;Comino y pimentón|al ras|comino;Ajo y cilantro|al ras|ajo;Aceite de oliva|80 ml|aceite;Pan khobz|para servir|trigo
Asa la berenjena. Pela, machaca.|Tomate, ajo, comino. Junta, reduce.|Aceite crudo, cilantro.|Mezze. Marrakech en un cuenco.
La berenjena se asa, no se hierve. El humo es medio zaalouk.
---
muamba|Muamba de galinha|Muamba de galinha|Angola|Luanda|africa|picante,umami,dulce|5,8,3,3,7,7|70|6|fácil|fiesta,consuelo|angola,palma,pollo
Pollo|1.2 kg|pollo;Aceite de palma|80 ml|aceite;Ocra|200 g|okra;Calabaza|300 g|calabaza;Ajo y chile|al ras|ajo;Arroz|para servir|arroz
Dora el pollo en palma.|Ajo, chile, calabaza, ocra.|40 minutos. Arroz.|Luanda se reconoce en el rojo de palma.
La palma no se sustituye con sofrito. Es el color y el país.
---
matoke|Matoke|Matoke|Uganda|Kampala|africa|dulce,cremoso,umami|2,6,2,4,5,5|50|4|fácil|consuelo|uganda,platano,cacahuete
Plátano verde (matoke)|8|platano;Pasta de cacahuete|100 g|cacahuete;Cebolla y tomate|al ras|tomate;Cilantro|un ramito|cilantro;Chile|1|chile;Hojas de plátano|para vapor|platano
Vapor de plátanos en su hoja. Machaca.|Salsa de cacahuete.|Se come como ñoquis de plátano, con salsa.|Uganda de diario.
El plátano verde, no el maduro. El maduro es otro país.
---
nyama-choma|Nyama choma|Nyama choma|Kenia|Nairobi|africa|ahumado,picante,fresco|4,8,5,1,6,6|50|4|fácil|fiesta|kenia,parrilla,cabra
Cabrito o res|1 kg|res;Sal gruesa|al ras|sal;Kachumbari: tomate, cebolla, lima|al gusto|tomate;Ugali|para servir|maiz;Pili pili|al gusto|chile;Cilantro|un ramito|cilantro
Carne al carbón, sal, tiempo.|Kachumbari fresco.|Ugali para recoger el jugo.|Nairobi de viernes. Nyama choma es la parrilla, no la marinada.
Poca marinada. La cabra buena se asume; la sal, el fuego y el kachumbari hablan.
---
poulet-dg|Poulet DG|Poulet DG|Camerún|Yaundé|africa|dulce,umami,picante|4,7,3,4,6,6|55|4|fácil|fiesta|camerun,pollo,platano
Pollo|1.2 kg|pollo;Plátano maduro|4|platano;Pimiento, zanahoria, cebolla|al ras|cebolla;Ajo y jengibre|al ras|ajo;Salsa de tomate|3 cdas|tomate;Aceite|para freír|aceite
Fríe el pollo. Fríe el plátano.|Sofrito, verdura, pollo y plátano juntos 10 minutos.|DG: directeur général. El pollo de los que mandan, y de los que no.
El plátano maduro se fríe aparte. Si se cocina todo junto desde el inicio, se pone papilla.
---
asaro|Asaro|Asaro|Nigeria|Lagos|africa|picante,umami,cremoso|6,7,3,3,6,6|45|4|fácil|consuelo|nigeria,name,palma
Ñame|800 g|papa;Aceite de palma|4 cdas|aceite;Pescado ahumado|100 g|pescado;Chile y cebolla|al ras|chile;Tomate|2|tomate;Espinaca|un puñado|espinaca
Ñame en cubos, agua, palma, chile.|Machaca a mitad. Pescado ahumado.|Espinaca al final.|El porridge de Ñame que Lagos desayuna.
Que quede con trozos. Puré total es otro plato.
---
light-soup|Light soup|Light soup|Ghana|Kumasi|africa|picante,umami,citrico|7,8,5,2,4,7|70|6|fácil|consuelo|ghana,cabra,tomate
Cabra o pollo|1 kg|cordero;Tomate, jengibre, chile|al ras|tomate;Cebolla|2|cebolla;Fufu|para servir|papa;Clavo y selim|al ras|clavo;Sal|al ras|sal
Licúa tomate, jengibre, chile. Carne.|Caldo claro, 45 minutos. Espuma.|Fufu. Light no significa suave: significa caldo, no crema.
El jengibre va generoso. Sin él, es caldo de carne y basta.
"""


def esc(s: str) -> str:
    return s.replace("\\", "\\\\").replace('"', '\\"')


def emit_one(block: str) -> str:
    lines = [ln for ln in block.strip().split("\n") if ln.strip() != ""]
    if len(lines) < 4:
        raise SystemExit(f"bad block ({len(lines)}): {lines[:2]}")
    meta = lines[0].split("|")
    (slug, name, local, country, city, region, flavors, prof, time, serv, diff, moods, tags) = meta
    ings = []
    for part in lines[1].split(";"):
        bits = part.split("|")
        if len(bits) != 3:
            raise SystemExit(f"bad ing {slug}: {part}")
        item, amount, key = bits
        ings.append((item, amount, key))
    steps = lines[2].split("|")
    if len(lines) >= 5:
        story, tip = lines[3], lines[4]
    else:
        if len(steps) > 3:
            story = steps[-1]
            steps = steps[:-1]
        else:
            story = f"{name} es un plato de {city}, {country}."
        tip = lines[3]
    allowed_fl = {"umami","picante","citrico","ahumado","herbal","dulce","cremoso","fresco"}
    fl_list = [f if f in allowed_fl else "umami" for f in flavors.split(",")]
    fl = ", ".join(f'"{f}"' for f in fl_list)
    mo = ", ".join(f'"{m}"' for m in moods.split(","))
    ta = ", ".join(f'"{t}"' for t in tags.split(","))
    pic, uma, aci, dul, gra, aro = prof.split(",")
    ing_js = ",\n      ".join(
        f'{{ item: "{esc(i)}", amount: "{esc(a)}", key: "{esc(k)}" }}' for i, a, k in ings
    )
    st_js = ",\n      ".join(f'"{esc(s)}"' for s in steps)
    return f"""  {{
    slug: "{slug}",
    name: "{esc(name)}",
    nameLocal: "{esc(local)}",
    country: "{esc(country)}",
    city: "{esc(city)}",
    regionId: "{region}",
    flavors: [{fl}],
    profile: {{ picante: {pic}, umami: {uma}, acido: {aci}, dulce: {dul}, grasa: {gra}, aroma: {aro} }},
    timeMin: {time},
    servings: {serv},
    difficulty: "{diff}",
    moods: [{mo}],
    ingredients: [
      {ing_js}
    ],
    steps: [
      {st_js}
    ],
    story: "{esc(story)}",
    tip: "{esc(tip)}",
    image: "/dishes/{slug}.jpg",
    tags: [{ta}],
  }}"""


blocks = [b for b in RAW.split("---") if b.strip()]
parts = [emit_one(b) for b in blocks]
out = (
    'import type { Recipe } from "./recipe-types";\n\n'
    "export const WAVE: Recipe[] = [\n"
    + ",\n".join(parts)
    + "\n];\n"
)
path = Path("/workspace/src/lib/catalog-wave.ts")
path.write_text(out)
print("wrote", path, "recipes", len(parts))
