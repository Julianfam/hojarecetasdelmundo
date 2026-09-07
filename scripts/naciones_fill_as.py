AS = r"""
Corea del Norte|Pionyang|asia-este|naengmyeon-pyongyang|Naengmyeon de Pionyang|평양냉면|fideo|citrico,umami,fresco|40|ligero,consuelo|Fideos de alforfón*300 g*fideos;Caldo frío*500 ml*res;Pepino y huevo*al ras*huevo
Corea del Norte|Pionyang|asia-este|onban-pyongyang|Onban|온반|arroz|umami,herbal|30|consuelo|Arroz*2 tazas*arroz;Caldo de pollo*400 ml*pollo;Kimchi*al lado*chile
Corea del Norte|Pionyang|asia-este|mandu-norte|Mandu norteño|만두|empanada|umami,herbal|40|consuelo,fiesta|Masa*20*trigo;Cerdo y napa*al ras*cerdo
Corea del Norte|Pionyang|asia-este|injo-kogi-bap|Injo kogi bap|인조고기밥|arroz|umami,herbal|35|consuelo|Arroz*2 tazas*arroz;Proteína de soja*150 g*tofu;Salsa de soya*al ras*soya
China|Shanghái|asia-este|shengjianbao|Shengjianbao|生煎包|empanada|umami,ahumado,cremoso|40|fiesta,consuelo|Masa*12*trigo;Cerdo y caldo*al ras*cerdo
China|Sichuan|asia-este|twice-cooked-pork|Cerdo dos veces cocido|回锅肉|estofado|picante,umami,ahumado|40|fiesta,consuelo|Panceta*400 g*cerdo;Doubanjiang*2 cdas*chile
China|Hangzhou|asia-este|dongpo-rou|Dongpo rou|东坡肉|estofado|dulce,umami,ahumado|150|impresionar,consuelo|Panceta*600 g*cerdo;Soya y vino shaoxing*al ras*soya
China|Xi'an|asia-este|biangbiang-mian|Biangbiang mian|油泼面|fideo|picante,umami,herbal|30|fiesta,consuelo|Fideos anchos*300 g*fideos;Chile y aceite*al ras*chile
China|Pekín|asia-este|zhajiangmian|Zhajiangmian|炸酱面|fideo|umami,ahumado,picante|25|consuelo,fiesta|Fideos*300 g*fideos;Carne y pasta de soja*al ras*cerdo
China|Cantón|asia-este|claypot-rice-gd|Arroz en cazuela|煲仔饭|arroz|ahumado,umami,dulce|40|consuelo,fiesta|Arroz*300 g*arroz;Salchicha china y pollo*al ras*cerdo
China|Cantón|asia-este|siu-mai-gd|Siu mai|烧卖|empanada|umami,cremoso|30|fiesta,ligero|Masa*16*trigo;Cerdo y camarón*al ras*cerdo
China|Jiangxi|asia-este|hong-shao-rou-jx|Hong shao rou|红烧肉|estofado|dulce,umami,ahumado|70|consuelo,fiesta|Panceta*500 g*cerdo;Soya y azúcar*al ras*soya
China|Xi'an|asia-este|rou-jia-mo|Rou jia mo|肉夹馍|pan|umami,picante,ahumado|35|fiesta|Pan mo*2*trigo;Carne estofada*300 g*res
China|Sichuan|asia-este|suan-cai-yu|Suan cai yu|酸菜鱼|caldo|picante,citrico,umami|40|consuelo,fiesta|Pescado*500 g*pescado;Mostaza fermentada*200 g*cebolla;Chile*al ras*chile
China|Sichuan|asia-este|malatang|Malatang|麻辣烫|caldo|picante,umami,herbal|25|fiesta,ligero|Caldo picante*800 ml*chile;Verdura y tofu*al ras*tofu
China|Cantón|asia-este|tangyuan-gd|Tangyuan|汤圆|postre|dulce,cremoso|30|fiesta,consuelo|Arroz glutinoso*200 g*arroz;Sésamo negro*al ras*cacahuete
China|Cantón|asia-este|mooncake-gd|Pastel de luna|月饼|postre|dulce,cremoso|60|fiesta|Masa*8*trigo;Pasta de loto*al ras*azucar
Japón|Tokio|asia-este|unagi-don|Unagi don|鰻丼|arroz|ahumado,dulce,umami|30|impresionar,fiesta|Anguila*2*pescado;Salsa tare*al ras*soya;Arroz*2 tazas*arroz
Japón|Tokio|asia-este|karaage|Karaage|唐揚げ|frito|umami,citrico|25|fiesta,ligero|Pollo*500 g*pollo;Jengibre y soya*al ras*soya
Japón|Kioto|asia-este|chawanmushi|Chawanmushi|茶碗蒸し|caldo|umami,cremoso|25|ligero,impresionar|Huevo*4*huevo;Dashi*400 ml*pescado;Camarón*al ras*camaron
Japón|Yamanashi|asia-este|hoto|Hōtō|ほうとう|fideo|umami,herbal,cremoso|40|consuelo|Fideos anchos*300 g*fideos;Calabaza y miso*al ras*papa
Japón|Nagano|asia-este|sansai-soba|Sansai soba|山菜そば|fideo|herbal,umami,fresco|25|ligero,consuelo|Soba*300 g*fideos;Brotes de montaña*al ras*cilantro
Japón|Kobe|asia-este|wagyu-tataki|Wagyu tataki|和牛たたき|crudo|umami,ahumado,citrico|15|impresionar,ligero|Wagyu*300 g*res;Ponzu*al ras*limon
Japón|Tokio|asia-este|ochazuke|Ochazuke|お茶漬け|arroz|umami,herbal,fresco|10|ligero,consuelo|Arroz*2 tazas*arroz;Té o dashi*300 ml*agua;Salmón*al ras*pescado
Japón|Nagoya|asia-este|misonikomi-udon|Misonikomi udon|味噌煮込みうどん|fideo|umami,cremoso|35|consuelo|Udon*300 g*fideos;Miso hatcho*3 cdas*soya
Japón|Tokio|asia-este|hiyashi-chuka|Hiyashi chūka|冷やし中華|fideo|citrico,fresco,umami|20|ligero|Fideos fríos*300 g*fideos;Huevo, jamón y pepino*al ras*huevo
Japón|Tokio|asia-este|hayashi-rice|Hayashi rice|ハヤシライス|arroz|umami,dulce,cremoso|40|consuelo|Arroz*2 tazas*arroz;Res y salsa demi*al ras*res
Japón|Osaka|asia-este|taiyaki|Taiyaki|たい焼き|postre|dulce,cremoso|20|fiesta,ligero|Masa*4 peces*trigo;Anko*al ras*azucar
Japón|Tokio|asia-este|kayaku-gohan|Kayaku gohan|加薬ご飯|arroz|umami,herbal|35|consuelo|Arroz*300 g*arroz;Pollo, zanahoria y seta*al ras*pollo
Corea del Sur|Seúl|asia-este|samgyeopsal|Samgyeopsal|삼겹살|brasa|ahumado,umami,picante|30|fiesta|Panceta*500 g*cerdo;Ssamjang y lechuga*al ras*chile
Corea del Sur|Seúl|asia-este|gamjatang|Gamjatang|감자탕|caldo|picante,umami,herbal|80|consuelo,fiesta|Espinazo de cerdo*700 g*cerdo;Papa y perilla*al ras*papa
Corea del Sur|Seúl|asia-este|kimbap|Kimbap|김밥|arroz|umami,fresco,herbal|30|ligero,fiesta|Alga y arroz*4 rollos*arroz;Huevo, pepino y zanahoria*al ras*huevo
Corea del Sur|Busan|asia-este|haemul-pajeon|Haemul pajeon|해물파전|frito|umami,citrico,herbal|25|fiesta,ligero|Masa de cebolleta*2*trigo;Calamar y camarón*al ras*camaron
Corea del Sur|Seúl|asia-este|naengmyeon-seoul|Naengmyeon de Seúl|냉면|fideo|citrico,picante,fresco|30|ligero,consuelo|Fideos de alforfón*300 g*fideos;Caldo frío*500 ml*res;Gochutang*al gusto*chile
Corea del Sur|Seúl|asia-este|bossam|Bossam|보쌈|brasa|umami,picante,fresco|50|fiesta,impresionar|Panceta cocida*500 g*cerdo;Kimchi de rábano*al ras*chile
Corea del Sur|Chuncheon|asia-este|dakgalbi|Dakgalbi|닭갈비|estofado|picante,umami,dulce|35|fiesta|Pollo*500 g*pollo;Gochujang y col*al ras*chile
Corea del Sur|Seúl|asia-este|bungeoppang|Bungeoppang|붕어빵|postre|dulce,cremoso|15|fiesta,ligero|Masa*6 peces*trigo;Anko*al ras*azucar
Corea del Sur|Seúl|asia-este|sikhye|Sikhye|식혜|bebida|dulce,fresco|40|consuelo,ligero|Arroz malt*80 g*arroz;Agua*800 ml*agua
Taiwán|Tainan|asia-este|oyster-omelette-tw|Oyster omelette|蚵仔煎|frito|umami,cremoso,picante|20|fiesta,ligero|Ostra*200 g*camaron;Huevo y almidón*al ras*huevo
Taiwán|Taipéi|asia-este|gua-bao|Gua bao|割包|pan|umami,dulce,cremoso|30|fiesta|Pan al vapor*4*trigo;Panceta*300 g*cerdo;Cacahuete y cilantro*al ras*cacahuete
Taiwán|Taipéi|asia-este|popcorn-chicken-tw|Pollo frito taiwanés|鹹酥雞|frito|umami,picante,herbal|25|fiesta|Pollo*400 g*pollo;Albahaca y pimienta*al ras*cilantro
Taiwán|Taichung|asia-este|pineapple-cake-tw|Pastel de piña|鳳梨酥|postre|dulce,citrico|50|fiesta,consuelo|Masa*12*trigo;Piña confitada*al ras*fruta
Taiwán|Taipéi|asia-este|lu-rou-fan|Lū ròu fàn|滷肉飯|arroz|umami,dulce,ahumado|45|consuelo,fiesta|Arroz*2 tazas*arroz;Cerdo picado estofado*250 g*cerdo;Huevo marinado*2*huevo
Taiwán|Taichung|asia-este|suncake-tw|Sun cake|太陽餅|postre|dulce,cremoso|40|consuelo|Hojaldre*8*trigo;Maltosa*al ras*azucar
Taiwán|Taipéi|asia-este|stinky-tofu-tw|Tofu maloliente|臭豆腐|frito|umami,picante,citrico|20|fiesta|Tofu fermentado*300 g*tofu;Salsa agridulce*al ras*chile
Vietnam|Hoi An|asia-este|cao-lau|Cao lầu|Cao lầu|fideo|umami,herbal,citrico|30|consuelo,ligero|Fideos cao lau*250 g*fideos;Cerdo*200 g*cerdo;Hierbas*un manojo*cilantro
Vietnam|Quang Nam|asia-este|mi-quang|Mì Quảng|Mì Quảng|fideo|umami,picante,herbal|35|consuelo,fiesta|Fideos amarillos*250 g*fideos;Camarón y cerdo*al ras*camaron
Vietnam|Saigón|asia-este|bun-rieu|Bún riêu|Bún riêu|fideo|citrico,umami,picante|45|consuelo|Fideos de arroz*300 g*fideos;Cangrejo y tomate*al ras*camaron
Vietnam|Saigón|asia-este|bo-luc-lac|Bò lúc lắc|Bò lúc lắc|brasa|umami,citrico,ahumado|20|fiesta,ligero|Solomillo*400 g*res;Soya y lima*al ras*soya
Vietnam|Saigón|asia-este|goi-cuon|Gỏi cuốn|Gỏi cuốn|crudo|fresco,herbal,citrico|20|ligero,fiesta|Papel de arroz*8*arroz;Camarón y hierba*al ras*camaron
Vietnam|Saigón|asia-este|che-ba-mau|Chè ba màu|Chè ba màu|postre|dulce,cremoso|25|ligero,consuelo|Frijol y jalea*al ras*frijol;Leche de coco*150 ml*coco
Vietnam|Saigón|asia-este|hu-tieu|Hủ tiếu|Hủ tiếu|fideo|umami,herbal,citrico|35|consuelo|Fideos*300 g*fideos;Cerdo y camarón*al ras*cerdo
Vietnam|Saigón|asia-este|banh-xeo|Bánh xèo|Bánh xèo|frito|citrico,umami,herbal|25|fiesta,ligero|Masa de arroz y cúrcuma*4*arroz;Camarón y brote*al ras*camaron
Vietnam|Hanoi|asia-este|nem-ran|Nem rán|Nem rán|frito|umami,herbal,citrico|30|fiesta|Rollo frito*8*trigo;Cerdo y seta*al ras*cerdo
Mongolia|Ulán Bator|asia-este|khuushuur|Khuushuur|Хуушуур|empanada|umami,ahumado|35|fiesta,consuelo|Masa*8*trigo;Cordero picado*300 g*cordero
Mongolia|Ulán Bator|asia-este|tsuivan|Tsuivan|Цуйван|fideo|umami,herbal,ahumado|40|consuelo,fiesta|Fideos estirados*300 g*fideos;Cordero y zanahoria*al ras*cordero
Mongolia|Ulán Bator|asia-este|khorkhog|Khorkhog|Хорхог|estofado|ahumado,umami|120|fiesta,impresionar|Cordero*1 kg*cordero;Piedras calientes y papa*al ras*papa
Mongolia|Ulán Bator|asia-este|airag|Airag|Айраг|bebida|citrico,cremoso|10|fiesta,ligero|Leche de yegua fermentada*400 ml*leche
India|Cachemira|asia-sur|rogan-josh|Rogan josh|रोगन जोश|estofado|picante,umami,ahumado|80|fiesta,consuelo|Cordero*700 g*cordero;Kashmiri chile*2 cdas*chile;Yogur*150 g*yogurt
India|Delhi|asia-sur|malai-kofta|Malai kofta|मलाई कोफ्ता|curry|cremoso,dulce,umami|45|impresionar,consuelo|Kofta de papa y panir*8*papa;Crema y tomate*al ras*leche
India|Mumbai|asia-sur|vada-pav|Vada pav|वडा पाव|pan|picante,umami|20|fiesta,ligero|Pav*2*trigo;Batata vada*2*papa;Chutney verde*al ras*cilantro
India|Mumbai|asia-sur|pav-bhaji|Pav bhaji|पाव भाजी|estofado|picante,umami,cremoso|35|fiesta,consuelo|Verdura majada*400 g*papa;Pav y mantequilla*al ras*trigo
India|Mumbai|asia-sur|misal-pav|Misal pav|मिसळ पाव|estofado|picante,umami|30|fiesta,consuelo|Brotes de frijol*250 g*frijol;Usal picante y farsan*al ras*chile
India|Calcuta|asia-sur|kathi-roll|Kathi roll|काठी रोल|pan|picante,umami,citrico|20|fiesta,ligero|Paratha*2*trigo;Kebab y cebolla*al ras*res
India|Hyderabad|asia-sur|haleem-hyd|Haleem|حلیم|estofado|cremoso,umami,picante|150|consuelo,fiesta|Trigo y lenteja*al ras*trigo;Cordero*400 g*cordero;Ghee*3 cdas*leche
India|Mumbai|asia-sur|keema-pav|Keema pav|कीमा पाव|estofado|picante,umami|30|fiesta,consuelo|Carne picada*400 g*res;Pav*2*trigo;Guisante*un puñado*frijol
India|Mysore|asia-sur|mysore-pak|Mysore pak|ಮೈಸೂರು ಪಾಕ್|postre|dulce,cremoso|30|fiesta|Garbanzo en harina*150 g*garbanzo;Ghee y azúcar*al ras*leche
India|Chennai|asia-sur|filter-coffee-in|Café filtrado|Filter coffee|bebida|dulce,cremoso,ahumado|10|consuelo|Café*20 g*chocolate;Leche*150 ml*leche
India|Kerala|asia-sur|fish-moilee|Fish moilee|മീൻ മോളി|curry|cremoso,citrico,picante|35|fiesta,ligero|Pescado*500 g*pescado;Coco*300 ml*coco;Curry leaf*al ras*cilantro
India|Guyarat|asia-sur|dhokla|Dhokla|ઢોકળા|desayuno|citrico,umami,fresco|35|ligero,consuelo|Harina de garbanzo fermentada*250 g*garbanzo;Mostaza y cilantro*al ras*cilantro
India|Calcuta|asia-sur|rasgulla|Rasgulla|রসগোল্লা|postre|dulce,cremoso|40|fiesta,consuelo|Chhena*200 g*queso;Almíbar*al ras*azucar
Tailandia|Bangkok|asia-sur|boat-noodles|Boat noodles|ก๋วยเตี๋ยวเรือ|fideo|picante,umami,citrico|30|consuelo,fiesta|Fideos*250 g*fideos;Res o cerdo*200 g*res;Sangre y albahaca*al ras*cilantro
Tailandia|Bangkok|asia-sur|moo-ping|Moo ping|หมูปิ้ง|brasa|ahumado,dulce,umami|25|fiesta,ligero|Cerdo*400 g*cerdo;Soya y leche de coco*al ras*soya
Tailandia|Bangkok|asia-sur|khao-pad|Khao pad|ข้าวผัด|arroz|umami,citrico,picante|15|fiesta,ligero|Arroz*2 tazas*arroz;Huevo y cangrejo*al ras*huevo
Tailandia|Isan|asia-sur|gai-yang|Gai yang|ไก่ย่าง|brasa|ahumado,citrico,picante|40|fiesta|Pollo*1*pollo;Cilantro y pimienta*al ras*cilantro
Tailandia|Bangkok|asia-sur|kanom-krok|Kanom krok|ขนมครก|postre|dulce,cremoso|25|ligero,consuelo|Arroz y coco*20*coco;Cebolleta o maíz*al ras*maiz
Tailandia|Isan|asia-sur|nam-tok-moo|Nam tok moo|น้ำตกหมู|crudo|picante,citrico,herbal|20|fiesta,ligero|Cerdo a la brasa*300 g*cerdo;Arroz tostado y lima*al ras*limon
Tailandia|Bangkok|asia-sur|yen-ta-fo|Yen ta fo|เย็นตาโฟ|fideo|picante,citrico,umami|30|consuelo|Fideos*250 g*fideos;Salsa rosa y tofu*al ras*tofu
Tailandia|Chiang Mai|asia-sur|sai-ua|Sai ua|ไส้อั่ว|brasa|picante,herbal,ahumado|30|fiesta|Salchicha de cerdo*400 g*cerdo;Lemongrass y chile*al ras*chile
Indonesia|Surabaya|asia-sur|rawon|Rawon|Rawon|caldo|umami,ahumado,herbal|70|consuelo,fiesta|Res*500 g*res;Keluak*4*chocolate;Brotes*al ras*cebolla
Indonesia|Yakarta|asia-sur|soto-ayam|Soto ayam|Soto ayam|caldo|umami,herbal,citrico|45|consuelo|Pollo*600 g*pollo;Fideos y lima*al ras*fideos
Indonesia|Yakarta|asia-sur|gado-gado|Gado-gado|Gado-gado|crudo|cremoso,picante,fresco|25|ligero,fiesta|Verdura escaldada*400 g*cebolla;Salsa de cacahuete*al ras*cacahuete
Indonesia|Bali|asia-sur|sate-lilit|Sate lilit|Sate lilit|brasa|ahumado,picante,herbal|30|fiesta|Pescado picado*400 g*pescado;Coco y lemongrass*al ras*coco
Indonesia|Bali|asia-sur|babi-guling|Babi guling|Babi guling|brasa|ahumado,picante,herbal|180|fiesta,impresionar|Cerdo*2 kg*cerdo;Basegalang y cúrcuma*al ras*jengibre
Indonesia|Yakarta|asia-sur|bakso|Bakso|Bakso|caldo|umami,herbal|40|consuelo,fiesta|Albóndiga*12*res;Caldo y fideos*al ras*fideos
Indonesia|Yakarta|asia-sur|nasi-uduk|Nasi uduk|Nasi uduk|arroz|cremoso,umami,herbal|35|consuelo,fiesta|Arroz*300 g*arroz;Coco y pandan*al ras*coco
Indonesia|Yogyakarta|asia-sur|gudeg-plus-yog|Gudeg de Yogya|Gudeg|estofado|dulce,cremoso,umami|180|consuelo,fiesta|Yaca joven*500 g*yuca;Coco y téak*al ras*coco
Indonesia|Yakarta|asia-sur|klepon|Klepon|Klepon|postre|dulce,cremoso|30|fiesta,consuelo|Arroz glutinoso*200 g*arroz;Gula javanesa y coco*al ras*coco
Malasia|Penang|asia-sur|char-kway-teow|Char kway teow|炒粿條|fideo|ahumado,picante,umami|20|fiesta|Fideos de arroz*300 g*fideos;Camarón y cha kue*al ras*camaron
Malasia|Penang|asia-sur|nasi-kandar|Nasi kandar|Nasi kandar|arroz|picante,umami,cremoso|30|fiesta,consuelo|Arroz*2 tazas*arroz;Curry de pescado o pollo*al ras*pollo
Malasia|Kajang|asia-sur|satay-kajang|Satay Kajang|Satay Kajang|brasa|ahumado,picante,dulce|30|fiesta|Brochetas de pollo*12*pollo;Salsa de cacahuete*al ras*cacahuete
Malasia|Penang|asia-sur|asam-laksa|Asam laksa|Assam laksa|fideo|citrico,picante,umami|40|consuelo,fiesta|Fideos*250 g*fideos;Caballa y tamarindo*al ras*pescado
Malasia|Penang|asia-sur|hokkien-mee-pg|Hokkien mee|福建麵|fideo|umami,picante,ahumado|30|consuelo,fiesta|Fideos*300 g*fideos;Camarón y calamar*al ras*camaron
Malasia|Kuala Lumpur|asia-sur|bak-kut-teh|Bak kut teh|肉骨茶|caldo|umami,herbal,picante|70|consuelo|Costilla de cerdo*600 g*cerdo;Especias chinas*al ras*clavo
Malasia|Kuala Lumpur|asia-sur|rojak-my|Rojak|Rojak|crudo|citrico,picante,dulce|15|ligero,fiesta|Fruta y verdura*400 g*fruta;Pasta de camarón y cacahuete*al ras*cacahuete
Filipinas|Cebú|asia-sur|lechon-cebu|Lechón cebuano|Lechón|brasa|ahumado,citrico,umami|240|fiesta,impresionar|Cerdo*2 kg*cerdo;Tanglad y ajo*al ras*ajo
Filipinas|Pampanga|asia-sur|sisig|Sisig|Sisig|frito|umami,picante,citrico|40|fiesta|Cara de cerdo*400 g*cerdo;Calamansi y chile*al ras*limon
Filipinas|Manila|asia-sur|pancit-canton|Pancit canton|Pancit canton|fideo|umami,citrico,herbal|25|fiesta,consuelo|Fideos*300 g*fideos;Pollo y verdura*al ras*pollo
Filipinas|Manila|asia-sur|lumpia-shanghai|Lumpia Shanghai|Lumpia|frito|umami,citrico|30|fiesta|Rollo*16*trigo;Cerdo picado*300 g*cerdo
Filipinas|Bacolod|asia-sur|chicken-inasal|Chicken inasal|Inasal|brasa|ahumado,citrico,dulce|40|fiesta|Pollo*1*pollo;Annatto y calamansi*al ras*limon
Filipinas|Manila|asia-sur|bibingka|Bibingka|Bibingka|postre|dulce,cremoso|40|consuelo,fiesta|Harina de arroz*250 g*arroz;Coco y queso*al ras*coco
Filipinas|Manila|asia-sur|tapsilog|Tapsilog|Tapsilog|desayuno|umami,ahumado,dulce|25|consuelo,fiesta|Carne tapa*200 g*res;Arroz frito y huevo*al ras*arroz
Singapur|Singapur|asia-sur|chilli-crab|Chilli crab|Chilli crab|estofado|picante,dulce,umami|40|fiesta,impresionar|Cangrejo*800 g*camaron;Salsa de chile y huevo*al ras*chile
Singapur|Singapur|asia-sur|katong-laksa|Katong laksa|Laksa|fideo|picante,cremoso,umami|35|consuelo,fiesta|Fideos*250 g*fideos;Coco y sambal*al ras*coco
Singapur|Singapur|asia-sur|chye-tow-kway|Carrot cake|菜头粿|frito|umami,ahumado,picante|20|fiesta,ligero|Pastel de rábano*400 g*papa;Huevo y salsa negra*al ras*huevo
Singapur|Singapur|asia-sur|bak-kut-teh-sg|Bak kut teh singapurense|肉骨茶|caldo|umami,herbal|60|consuelo|Costilla*600 g*cerdo;Pimienta blanca*al ras*chile
Singapur|Singapur|asia-sur|ice-kachang|Ice kachang|Ais kacang|postre|dulce,fresco,cremoso|10|ligero,fiesta|Hielo raspado*1 vaso*agua;Frijol, jalea y sirope*al ras*frijol
Camboya|Nom Pen|asia-sur|kuy-teav|Kuy teav|គុយទាវ|fideo|umami,herbal,citrico|35|consuelo|Fideos de arroz*250 g*fideos;Cerdo y brote*al ras*cerdo
Camboya|Nom Pen|asia-sur|bai-sach-chrouk|Bai sach chrouk|បាយសាច់ជ្រូក|arroz|ahumado,dulce,umami|25|consuelo,desayuno|Arroz*2 tazas*arroz;Cerdo a la parrilla*250 g*cerdo;Pepino*al ras*cebolla
Camboya|Nom Pen|asia-sur|nom-banh-chok|Nom banh chok|នំបញ្ចុក|fideo|herbal,citrico,picante|30|ligero,consuelo|Fideos de arroz*250 g*fideos;Salsa de pescado y lemongrass*al ras*pescado
Camboya|Nom Pen|asia-sur|lok-lak|Lok lak|ឡុកឡាក់|brasa|umami,citrico,ahumado|20|fiesta,ligero|Res*400 g*res;Pimienta y lima*al ras*limon
Laos|Vientián|asia-sur|khao-piak-sen|Khao piak sen|ເຂົ້າປຽກເສັ້ນ|fideo|umami,herbal,citrico|40|consuelo|Fideos de arroz*250 g*fideos;Pollo*400 g*pollo
Laos|Vientián|asia-sur|tam-mak-hoong|Tam mak hoong|ຕຳໝາກຫຸ່ງ|crudo|picante,citrico,fresco|15|ligero,fiesta|Papaya verde*1*fruta;Padaek y lima*al ras*limon
Laos|Vientián|asia-sur|ping-gai|Ping gai|ປີ້ງໄກ່|brasa|ahumado,citrico,picante|35|fiesta|Pollo*1*pollo;Lemongrass y pimienta*al ras*cilantro
Laos|Luang Prabang|asia-sur|or-lam|Or lam|ເອາະຫຼາມ|estofado|herbal,picante,umami|50|consuelo,fiesta|Búfalo o res*400 g*res;Berenjena y chile seco*al ras*chile
Myanmar|Yangón|asia-sur|mohinga|Mohinga|မုန့်ဟင်းခါး|fideo|umami,citrico,herbal|45|consuelo,desayuno|Fideos de arroz*250 g*fideos;Caldo de pescado*800 ml*pescado;Plátano tierno*al ras*platano
Myanmar|Mandalay|asia-sur|ohno-khao-swe|Ohn no khao swe|အုန်းနို့ခေါက်ဆွဲ|fideo|cremoso,picante,umami|40|consuelo|Fideos*250 g*fideos;Coco y pollo*al ras*coco
Myanmar|Taunggyi|asia-sur|shan-noodles|Shan noodles|ရှမ်းခေါက်ဆွဲ|fideo|umami,herbal,picante|30|consuelo,ligero|Fideos de arroz*250 g*fideos;Cerdo y tomate*al ras*cerdo
Myanmar|Yangón|asia-sur|mont-lin-maya|Mont lin maya|မုန့်လင်မယား|postre|dulce,cremoso|25|fiesta,ligero|Masa de arroz*20*arroz;Guisante y coco*al ras*frijol
Pakistán|Peshawar|asia-sur|chapli-kebab|Chapli kebab|چپلی کباب|brasa|picante,ahumado,umami|30|fiesta|Carne picada*400 g*res;Tomate y cilantro*al ras*cilantro
Pakistán|Lahore|asia-sur|haleem-lhr|Haleem lahoreño|حلیم|estofado|cremoso,umami,picante|150|consuelo,fiesta|Trigo y dal*al ras*trigo;Res*400 g*res
Pakistán|Baluchistán|asia-sur|sajji|Sajji|سجّی|brasa|ahumado,umami|120|fiesta,impresionar|Cordero*1.5 kg*cordero;Sal y comino*al ras*comino
Pakistán|Lahore|asia-sur|paye|Paye|پائے|caldo|umami,cremoso,picante|180|consuelo,fiesta|Patas de res*800 g*res;Garam masala*al ras*comino
Pakistán|Karachi|asia-sur|seekh-kebab-khi|Seekh kebab|سیخ کباب|brasa|ahumado,picante,umami|25|fiesta|Carne picada*400 g*res;Chile y cilantro*al ras*cilantro
Pakistán|Lahore|asia-sur|lassi-lhr|Lassi|لسی|bebida|dulce,cremoso,fresco|8|ligero,consuelo|Yogur*300 g*yogurt;Azúcar o sal*al gusto*azucar
Bangladesh|Daca|asia-sur|kacchi-biryani|Kacchi biryani|কাচ্চি বিরিয়ানি|arroz|ahumado,picante,umami|90|fiesta,impresionar|Arroz basmati*350 g*arroz;Cordero*600 g*cordero;Azafrán*una pizca*azafran
Bangladesh|Daca|asia-sur|panta-bhat|Panta bhat|পান্তা ভাত|arroz|citrico,umami,fresco|10|ligero,consuelo|Arroz fermentado*2 tazas*arroz;Cebolla y chile*al ras*chile
Bangladesh|Chittagong|asia-sur|shutki-bhat|Shutki|শুঁটকি|estofado|umami,picante,ahumado|35|consuelo,fiesta|Pescado seco*200 g*pescado;Cebolla y chile*al ras*cebolla
Bangladesh|Khulna|asia-sur|chingri-malai|Chingri malai curry|চিংড়ি মালাই|curry|cremoso,picante,umami|35|fiesta,impresionar|Camarón*400 g*camaron;Coco*300 ml*coco
Bangladesh|Daca|asia-sur|mishti-doi|Mishti doi|মিষ্টি দই|postre|dulce,cremoso|40|consuelo,fiesta|Yogur*400 g*yogurt;Azúcar de palma*80 g*azucar
Bangladesh|Daca|asia-sur|fuchka-bd|Fuchka|ফুচকা|crudo|picante,citrico,fresco|15|fiesta,ligero|Puri*16*trigo;Tamarindo y garbanzo*al ras*garbanzo
Sri Lanka|Colombo|asia-sur|kottu-roti|Kottu roti|කොත්තු|fideo|picante,umami,ahumado|25|fiesta|Godamba roti*2*trigo;Pollo y huevo*al ras*pollo
Sri Lanka|Colombo|asia-sur|lamprais|Lamprais|Lamprais|arroz|picante,umami,ahumado|70|fiesta,impresionar|Arroz*300 g*arroz;Curry mixto*al ras*pollo;Hoja de plátano*2*platano
Sri Lanka|Galle|asia-sur|ambul-thiyal|Ambul thiyal|ඇඹුල් තියල්|estofado|citrico,picante,ahumado|40|fiesta|Pescado*500 g*pescado;Goraka*3*limon;Pimienta*al ras*chile
Sri Lanka|Colombo|asia-sur|watalappan|Watalappan|වටලප්පන්|postre|dulce,cremoso|50|fiesta,consuelo|Coco*300 ml*coco;Azúcar de palma y huevo*al ras*huevo
Sri Lanka|Colombo|asia-sur|pol-sambol|Pol sambol|පොල් සම්බෝල්|crudo|picante,citrico,fresco|10|ligero,fiesta|Coco rallado*100 g*coco;Chile y lima*al ras*chile
Sri Lanka|Colombo|asia-sur|string-hoppers|String hoppers|ඉඳි ආප්ප|desayuno|umami,cremoso|30|consuelo|Fideos de arroz*250 g*arroz;Sambar o curry*para servir*lenteja
Nepal|Katmandú|asia-sur|thukpa-np|Thukpa|थुक्पा|fideo|umami,picante,herbal|40|consuelo|Fideos*250 g*fideos;Res o pollo*300 g*res
Nepal|Katmandú|asia-sur|chatamari|Chatamari|चतामरी|pan|umami,cremoso|25|ligero,fiesta|Masa de arroz*4*arroz;Huevo y carne*al ras*huevo
Nepal|Katmandú|asia-sur|sel-roti|Sel roti|सेल रोटी|frito|dulce,cremoso|30|fiesta,consuelo|Masa de arroz*8 anillos*arroz;Ghee*para freír*leche
Nepal|Katmandú|asia-sur|gundruk-ko-jhol|Gundruk|गुन्द्रुक|caldo|citrico,herbal,umami|30|consuelo,ligero|Gundruk fermentado*80 g*cilantro;Tomate y papa*al ras*tomate
Nepal|Katmandú|asia-sur|choila|Choila|छोइला|crudo|picante,ahumado,citrico|25|fiesta,ligero|Búfalo o pollo*300 g*res;Timur y cilantro*al ras*chile
Afganistán|Kabul|asia-sur|mantu-af|Mantu|منتو|empanada|umami,cremoso,herbal|50|fiesta,consuelo|Masa*20*trigo;Cordero*300 g*cordero;Yogur y dal*al ras*yogurt
Afganistán|Kabul|asia-sur|ashak|Ashak|اشک|empanada|herbal,cremoso,umami|50|consuelo,fiesta|Masa*20*trigo;Puerro*200 g*cebolla;Yogur y carne*al ras*yogurt
Afganistán|Kabul|asia-sur|bolani|Bolani|بولانی|empanada|umami,herbal,picante|30|fiesta,ligero|Masa*6*trigo;Papa o puerro*al ras*papa
Afganistán|Kabul|asia-sur|chainaki|Chainaki|چاینکی|estofado|umami,picante,herbal|90|consuelo|Cordero*500 g*cordero;Garbanzo y tomate*al ras*garbanzo
Afganistán|Kabul|asia-sur|firni-af|Firni|فرنی|postre|dulce,cremoso|30|consuelo,fiesta|Leche*500 ml*leche;Almendra y cardamomo*al ras*clavo
Turquía|Estambul|medio-oriente|iskender-kebap|İskender|İskender|brasa|umami,picante,cremoso|30|fiesta,impresionar|Döner*300 g*res;Pide y salsa de tomate*al ras*tomate;Yogur*al ras*yogurt
Turquía|Kayseri|medio-oriente|manti-turcos|Mantı|Mantı|empanada|umami,cremoso,picante|50|consuelo,fiesta|Masa*40*trigo;Carne*200 g*res;Yogur y menta*al ras*yogurt
Turquía|Estambul|medio-oriente|simit|Simit|Simit|pan|umami,dulce|35|ligero,consuelo|Masa*4*trigo;Sésamo y pekmez*al ras*azucar
Turquía|Estambul|medio-oriente|balik-ekmek|Balık ekmek|Balık ekmek|pan|umami,citrico,fresco|15|fiesta,ligero|Pan*2*trigo;Caballa a la brasa*2*pescado;Cebolla y limón*al ras*limon
Turquía|Ankara|medio-oriente|mercimek-corbasi|Mercimek çorbası|Mercimek çorbası|caldo|umami,citrico,herbal|35|consuelo|Lenteja roja*200 g*lenteja;Limón y menta*al ras*limon
Turquía|Gaziantep|medio-oriente|testi-kebabi|Testi kebabı|Testi kebabı|estofado|umami,picante,ahumado|90|impresionar,fiesta|Cordero*500 g*cordero;Tomate y pimiento*al ras*tomate
Turquía|Sanliurfa|medio-oriente|cig-kofte|Çiğ köfte|Çiğ köfte|crudo|picante,herbal,citrico|25|fiesta,ligero|Burgol*250 g*trigo;Isot y limón*al ras*chile
Líbano|Beirut|medio-oriente|kafta-beirut|Kafta|كفتة|brasa|ahumado,herbal,umami|25|fiesta|Cordero picado*400 g*cordero;Perejil y cebolla*al ras*cilantro
Líbano|Beirut|medio-oriente|daoud-basha|Daoud basha|داود باشا|estofado|umami,picante,herbal|50|consuelo,fiesta|Albóndiga*12*cordero;Salsa de tomate*al ras*tomate
Líbano|Beirut|medio-oriente|riz-a-djej|Riz a djej|رز مع دجاج|arroz|umami,ahumado,herbal|50|fiesta,consuelo|Arroz*300 g*arroz;Pollo*1*pollo;Piñón y canela*al ras*clavo
Líbano|Beirut|medio-oriente|sfouf|Sfouf|سفوف|postre|dulce,herbal|40|consuelo,fiesta|Sémola*250 g*trigo;Cúrcuma y tahini*al ras*jengibre
Líbano|Beirut|medio-oriente|jallab|Jallab|جلاب|bebida|dulce,fresco|8|ligero,fiesta|Sirope de dátil*60 ml*azucar;Agua de rosas y piñón*al ras*fruta
Irán|Teherán|medio-oriente|tahchin|Tahchin|ته‌چین|arroz|ahumado,cremoso,umami|70|fiesta,impresionar|Arroz*350 g*arroz;Yogur, azafrán y pollo*al ras*yogurt
Irán|Teherán|medio-oriente|ash-reshteh|Āsh reshteh|آش رشته|caldo|herbal,umami,cremoso|60|consuelo,fiesta|Fideos*150 g*fideos;Legumbre y kashk*al ras*lenteja
Irán|Teherán|medio-oriente|zereshk-polo|Zereshk polo|زرشک پلو|arroz|citrico,ahumado,umami|55|fiesta,impresionar|Arroz*300 g*arroz;Bérbero y pollo*al ras*pollo
Irán|Teherán|medio-oriente|dizi|Dizi|دیزی|estofado|umami,herbal|180|consuelo,fiesta|Cordero*500 g*cordero;Garbanzo y tomate*al ras*garbanzo
Irán|Shiraz|medio-oriente|faloodeh|Faloodeh|فالوده|postre|dulce,citrico,fresco|20|ligero,fiesta|Fideos de almidón*100 g*fideos;Agua de rosas y limón*al ras*limon
Irán|Shiraz|medio-oriente|baghali-polo|Baghali polo|باقالی پلو|arroz|herbal,umami|50|fiesta,consuelo|Arroz*300 g*arroz;Habas y eneldo*al ras*frijol
Israel|Jerusalén|medio-oriente|malawach|Malawach|מלאווח|pan|cremoso,umami|25|consuelo,desayuno|Hojaldre frito*2*trigo;Huevo y tomate*al ras*huevo
Israel|Jerusalén|medio-oriente|jachnun|Jachnun|ג'חנון|pan|dulce,cremoso,umami|720|consuelo,desayuno|Masa*4*trigo;Huevo y tomate*al ras*huevo
Israel|Tel Aviv|medio-oriente|schnitzel-il|Schnitzel israelí|שניצל|frito|umami,citrico|25|fiesta,consuelo|Pechuga empanada*2*pollo;Tahini y ensalada*al ras*yogurt
Israel|Jerusalén|medio-oriente|rugelach|Rugelach|רוגלך|postre|dulce,cremoso|45|consuelo,fiesta|Masa*12*trigo;Chocolate o canela*al ras*chocolate
Palestina|Nablus|medio-oriente|knafeh-nablus|Knafeh de Nablus|كنافة نابلسية|postre|dulce,cremoso,citrico|40|fiesta,impresionar|Kataifi*250 g*trigo;Queso nabulsi*300 g*queso
Palestina|Jerusalén|medio-oriente|qidreh|Qidreh|قدرة|arroz|ahumado,umami,herbal|90|fiesta,consuelo|Arroz*300 g*arroz;Cordero*500 g*cordero;Garbanzo*1 taza*garbanzo
Palestina|Ramala|medio-oriente|freekeh-soup-ps|Sopa de freekeh|فريكة|caldo|umami,herbal,ahumado|50|consuelo|Freekeh*150 g*trigo;Pollo*400 g*pollo
Palestina|Gaza|medio-oriente|sumagiyya|Sumagiyya|سماقية|estofado|citrico,umami,herbal|60|consuelo,fiesta|Res o cordero*400 g*res;Zumaque y chard*al ras*limon
Siria|Alepo|medio-oriente|kabab-halabi|Kabab halabi|كباب حلبي|brasa|ahumado,picante,umami|30|fiesta|Cordero picado*400 g*cordero;Pimiento y tomate*al ras*tomate
Siria|Damasco|medio-oriente|fatteh-damas|Fatteh|فتّة|pan|cremoso,umami,citrico|25|consuelo,fiesta|Pan frito*2*trigo;Garbanzo y yogur*al ras*garbanzo
Siria|Damasco|medio-oriente|yabrak|Yabrak|يبرق|estofado|herbal,umami,citrico|70|fiesta,consuelo|Hojas de parra*30*cilantro;Arroz y cordero*al ras*arroz
Siria|Alepo|medio-oriente|barazek|Barazek|برازق|postre|dulce,cremoso|40|fiesta,consuelo|Masa*20*trigo;Sésamo y pistacho*al ras*cacahuete
Jordania|Ammán|medio-oriente|galayet-bandora|Galayet bandora|قلاية بندورة|estofado|umami,picante,herbal|25|consuelo,ligero|Tomate*6*tomate;Ajo y chile*al ras*ajo
Jordania|Ammán|medio-oriente|maqlooba-jo|Maqluba jordana|مقلوبة|arroz|umami,ahumado,herbal|70|fiesta,consuelo|Arroz*300 g*arroz;Berenjena y pollo*al ras*pollo
Irak|Bagdad|medio-oriente|quzi|Quzi|قوزي|arroz|ahumado,umami,dulce|120|fiesta,impresionar|Cordero*1 kg*cordero;Arroz y almendra*al ras*arroz
Irak|Bagdad|medio-oriente|pacha-iq|Pacha|باجة|estofado|umami,ahumado,herbal|180|consuelo,fiesta|Cabeza y patas*800 g*cordero;Pan*para servir*trigo
Irak|Bagdad|medio-oriente|kleicha|Kleicha|كليجة|postre|dulce,herbal|45|fiesta|Masa*16*trigo;Dátil y cardamomo*al ras*fruta
Irak|Bagdad|medio-oriente|tashreeb|Tashreeb|تشريب|caldo|umami,picante,herbal|60|consuelo|Caldo de cordero*800 ml*cordero;Pan y garbanzo*al ras*garbanzo
Yemen|Saná|medio-oriente|fahsa|Fahsa|فحسة|estofado|picante,umami,herbal|50|consuelo,fiesta|Cordero deshebrado*400 g*cordero;Hilbeh*al ras*chile
Yemen|Adén|medio-oriente|zurbiyan|Zurbiyan|زربيان|arroz|ahumado,picante,umami|70|fiesta|Arroz*300 g*arroz;Cordero*500 g*cordero;Patata*2*papa
Yemen|Saná|medio-oriente|bint-al-sahn|Bint al-sahn|بنت الصحن|postre|dulce,cremoso|50|fiesta,consuelo|Masa hojaldrada*1*trigo;Miel y ghee*al ras*azucar
Yemen|Saná|medio-oriente|shafoot|Shafoot|شفوت|crudo|citrico,cremoso,herbal|15|ligero,consuelo|Lahoh*4*trigo;Yogur y cilantro*al ras*yogurt
Arabia Saudita|Riad|medio-oriente|saleeg|Saleeg|سليق|arroz|cremoso,umami|70|consuelo,fiesta|Arroz*300 g*arroz;Pollo y leche*al ras*pollo
Arabia Saudita|Yeda|medio-oriente|mutabbaq-sa|Mutabbaq|مطبق|empanada|umami,picante,herbal|30|fiesta|Masa*4*trigo;Huevo y carne*al ras*huevo
Arabia Saudita|Riad|medio-oriente|jareesh|Jareesh|جريش|estofado|cremoso,umami,herbal|90|consuelo,fiesta|Trigo partido*250 g*trigo;Pollo*400 g*pollo
Arabia Saudita|Riad|medio-oriente|matazeez|Matazeez|مطازيز|empanada|umami,herbal|55|consuelo,fiesta|Dumplings*20*trigo;Cordero y calabaza*al ras*cordero
Armenia|Ereván|medio-oriente|harissa-am|Harissa armenia|Հարիսա|estofado|cremoso,umami|150|consuelo,fiesta|Trigo*250 g*trigo;Pollo o cordero*400 g*pollo
Armenia|Ereván|medio-oriente|ghapama|Ghapama|Ղափամա|postre|dulce,cremoso,herbal|70|fiesta|Calabaza*1*papa;Arroz, pasa y miel*al ras*arroz
Armenia|Ereván|medio-oriente|gata-am|Gata|Գաթա|postre|dulce,cremoso|50|fiesta,consuelo|Masa*1*trigo;Relleno de harina y mantequilla*al ras*azucar
Uzbekistán|Taskent|asia-sur|shashlik-uz|Shashlik uzbeko|Shashlik|brasa|ahumado,umami|30|fiesta|Cordero*500 g*cordero;Cebolla*2*cebolla
Uzbekistán|Taskent|asia-sur|dimlama|Dimlama|Dimlama|estofado|umami,herbal,dulce|90|consuelo,fiesta|Cordero*500 g*cordero;Verdura en capas*al ras*papa
Kirguistán|Biskek|asia-sur|ashlyanfu|Ashlyanfu|Ашлян-фу|fideo|citrico,picante,fresco|25|ligero,consuelo|Fideos de almidón*250 g*fideos;Vinagre y chile*al ras*chile
Kirguistán|Biskek|asia-sur|samsa-kg|Samsa kirguís|Самса|empanada|umami,ahumado|40|fiesta,consuelo|Masa*6*trigo;Cordero y cola gorda*al ras*cordero
Tayikistán|Dusambé|asia-sur|shakarob|Shakarob|Шакароб|crudo|citrico,fresco,umami|15|ligero|Tomate y cebolla*al ras*tomate;Non*2*trigo
Turkmenistán|Asjabad|asia-sur|gutap|Gutap|Gutap|empanada|herbal,umami|30|fiesta,ligero|Masa*6*trigo;Espinaca o carne*al ras*cilantro
Azerbaiyán|Bakú|medio-oriente|dushbara|Düşbərə|Düşbərə|empanada|umami,herbal,citrico|50|consuelo|Masa*40*trigo;Cordero*200 g*cordero;Menta*al ras*cilantro
Azerbaiyán|Bakú|medio-oriente|pakhlava-az|Pakhlava azerí|Pakhlava|postre|dulce,cremoso|60|fiesta|Filo*20 hojas*trigo;Nuez y azafrán*al ras*cacahuete
Emiratos Árabes Unidos|Dubái|medio-oriente|chebab|Chebab|خباب|desayuno|dulce,cremoso,ahumado|20|consuelo|Panqueque*6*trigo;Sirope de dátil*al ras*azucar
Emiratos Árabes Unidos|Abu Dabi|medio-oriente|tharid|Tharid|ثريد|estofado|umami,herbal|60|consuelo,fiesta|Pan*4*trigo;Cordero y garbanzo*al ras*cordero
Catar|Doha|medio-oriente|sago-dessert-qa|Sago catarí|ساجو|postre|dulce,cremoso|25|consuelo|Sago*80 g*yuca;Azafrán y cardamomo*al ras*azafran
Kuwait|Kuwait|medio-oriente|magluba-kw|Maqluba kuwaití|مقلوبة|arroz|umami,ahumado|70|fiesta|Arroz*300 g*arroz;Berenjena y pollo*al ras*pollo
Omán|Mascate|medio-oriente|madrouba-om|Madrouba omaní|مضروبة|estofado|cremoso,umami,ahumado|80|consuelo|Arroz majado*250 g*arroz;Pollo*400 g*pollo
Omán|Mascate|medio-oriente|lokhemat|Lokhemat|لقيمات|postre|dulce,cremoso|25|fiesta|Masa frita*20*trigo;Sirope de dátil*al ras*azucar
Baréin|Manama|medio-oriente|ghuzi-bh|Ghuzi|قوزي|arroz|ahumado,umami,dulce|120|fiesta,impresionar|Cordero*1 kg*cordero;Arroz y almendra*al ras*arroz
Maldivas|Malé|asia-sur|mas-riha|Mas riha|މަސްރިހަ|curry|picante,cremoso,umami|30|consuelo,fiesta|Atún*400 g*pescado;Coco y chile*al ras*coco
Maldivas|Malé|asia-sur|hedhikaa|Hedhikaa|ހެދިކާ|frito|picante,umami|25|fiesta,ligero|Masa*12*trigo;Atún y coco*al ras*pescado
Brunei|Bandar Seri Begawan|asia-sur|daging-masak-lada|Daging masak lada hitam|Daging lada|estofado|picante,umami,ahumado|45|fiesta|Res*500 g*res;Pimienta negra*2 cdas*chile
Brunei|Bandar Seri Begawan|asia-sur|ambuyat-plus|Ambuyat con cacah|Ambuyat|arroz|umami,cremoso|25|consuelo,fiesta|Sagú*150 g*yuca;Salsa de durian o pescado*al ras*pescado
Timor Oriental|Dili|asia-sur|tukir|Tukir|Tukir|estofado|umami,picante,herbal|40|consuelo|Carne*400 g*res;Tamarindo y chile*al ras*limon
Timor Oriental|Dili|asia-sur|catupa|Catupa|Catupa|arroz|cremoso,umami|50|fiesta,consuelo|Arroz glutinoso*250 g*arroz;Coco*200 ml*coco;Hoja*4*platano
Bután|Timbu|asia-este|kewa-datshi|Kewa datshi|ཀེ་ཝ་དར་ཚིལ|estofado|picante,cremoso,umami|25|consuelo|Papa*400 g*papa;Queso y chile*al ras*queso
Bután|Timbu|asia-este|momo-bhutan|Momos butaneses|མོག་མོག|empanada|umami,picante|40|fiesta,consuelo|Masa*16*trigo;Carne o queso*al ras*res
""".strip("\n")
