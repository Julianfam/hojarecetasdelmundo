#!/usr/bin/env python3
"""Build atlas-naciones.ts: 1000 world dishes across every nation."""
from __future__ import annotations

import re
import unicodedata
from collections import Counter
from pathlib import Path

ROOT = Path("/workspace")
SRC = ROOT / "src/lib"

FAMILIES = {
    "empanada", "maiz", "caldo", "estofado", "arroz", "fideo", "brasa",
    "curry", "frito", "pan", "crudo", "desayuno", "postre", "bebida",
}
FLAVORS = {"umami", "picante", "citrico", "ahumado", "herbal", "dulce", "cremoso", "fresco"}
MOODS = {"consuelo", "fiesta", "ligero", "impresionar"}
REGIONS = {
    "latam", "caribe", "norte", "asia-este", "asia-sur",
    "medio-oriente", "mediterraneo", "europa", "africa",
}

CANON = {
    "Canada": "Canadá",
    "Turquia": "Turquía",
    "Japon": "Japón",
    "Etiopia": "Etiopía",
    "Sudafrica": "Sudáfrica",
    "Iran": "Irán",
    "Libano": "Líbano",
    "RDC": "República Democrática del Congo",
    "Congo": "República del Congo",
    "Santo Tome": "Santo Tomé y Príncipe",
    "Emiratos Arabes Unidos": "Emiratos Árabes Unidos",
    "Azerbaiyan": "Azerbaiyán",
    "Kirguistan": "Kirguistán",
    "Tayikistan": "Tayikistán",
    "Turkmenistan": "Turkmenistán",
    "Uzbekistan": "Uzbekistán",
    "Barein": "Baréin",
    "Oman": "Omán",
    "Butan": "Bután",
    "Benin": "Benín",
    "Niger": "Níger",
    "Papua Nueva Guinea": "Papúa Nueva Guinea",
    "San Cristobal y Nieves": "San Cristóbal y Nieves",
    "Santa Lucia": "Santa Lucía",
    "Islas Salomon": "Islas Salomón",
    "Corea del Norte": "Corea del Norte",
    "Luxemburgo": "Luxemburgo",
    "Guinea Bisau": "Guinea-Bisáu",
    "Guinea-Bisau": "Guinea-Bisáu",
    "Republica Centroafricana": "República Centroafricana",
    "Sudan del Sur": "Sudán del Sur",
    "Micronesia": "Micronesia",
    "Islas Marshall": "Islas Marshall",
}

STORY = {
    "caldo": "{city} pone el hueso a hervir manso. {name} es el invierno de {country} en un plato hondo.",
    "estofado": "{city} tapa la olla y espera. {name} no se apura: {country} cabe en la salsa.",
    "brasa": "El carbón de {city} firma {name}. En {country} el fuego es el restaurante.",
    "arroz": "{name} se mide en granos. {city} no admite un arroz tibio.",
    "fideo": "El hilo llega a {city}. {name} se come antes de que se enfríe.",
    "curry": "Las especias se tuestan en {city}. {name} es {country} sin disculpas.",
    "maiz": "El maíz se cierra en {city}. {name} se come de pie, con salsa que gotea.",
    "empanada": "{city} sella el borde. {name} cabe en la mano: el relleno es el pasaporte.",
    "frito": "El aceite de {city} suena. {name} se come al minuto o ya es otra receta.",
    "pan": "{name} se abre con las dos manos. {city} no usa cubiertos para esto.",
    "crudo": "El reloj manda en {city}. {name} no sobrevive a la espera.",
    "desayuno": "{name} abre el día en {city}. El café no se negocia.",
    "postre": "{name} cierra la mesa de {country}. {city} endulza sin pedir permiso.",
    "bebida": "{name} es {city} en un vaso. El perfume llega antes que el trago.",
}


def existing_slugs() -> set[str]:
    slugs: set[str] = set()
    for p in SRC.glob("*.ts"):
        if p.name == "atlas-naciones.ts":
            continue
        text = p.read_text()
        slugs.update(re.findall(r'slug:\s*"([^"]+)"', text))
        slugs.update(re.findall(r'dish\("([^"]+)"', text))
        if p.name.startswith("atlas-") and p.name != "atlas-expand.ts":
            slugs.update(re.findall(r'^\s*\["([a-z0-9][a-z0-9-]*)"', text, re.M))
    return {s for s in slugs if s and " " not in s}


def fold_slug(slug: str) -> str:
    s = unicodedata.normalize("NFD", slug)
    s = "".join(c for c in s if unicodedata.category(c) != "Mn")
    s = s.lower().replace("ñ", "n")
    s = re.sub(r"[^a-z0-9]+", "-", s)
    return s.strip("-")


def ts_str(s: str) -> str:
    return '"' + s.replace("\\", "\\\\").replace('"', '\\"') + '"'


def story_for(family: str, name: str, country: str, city: str) -> str:
    tpl = STORY.get(family, "{city} cocina {name}. {country} se come en este plato.")
    return tpl.format(name=name, country=country, city=city)


RAW: list[tuple] = []


def add(country, city, region, slug, name, local, family, flavors, time, moods, ings):
    RAW.append((country, city, region, slug, name, local, family, flavors, str(time), moods, ings))


def ingest(blob: str, label: str) -> None:
    for line in blob.splitlines():
        line = line.strip()
        if not line or line.startswith("#"):
            continue
        parts = line.split("|")
        if len(parts) != 11:
            raise SystemExit(f"bad {label} fields={len(parts)}: {line[:90]}")
        add(*parts)


# ---------- NEW NATIONS (and thin ones) ----------
NEW = r"""
Libia|Trípoli|africa|sharba-libia|Shorba libia|شوربة|caldo|umami,herbal,picante|50|consuelo|Cordero*400 g*cordero;Fideos*80 g*fideos;Cilantro*un manojo*cilantro
Libia|Bengasi|africa|bazeen|Bazeen|بازين|estofado|umami,herbal|80|consuelo,fiesta|Cebada*300 g*trigo;Cordero*600 g*cordero;Tomate*2*tomate
Libia|Trípoli|africa|osban|Osban|عصبان|estofado|umami,herbal,picante|90|fiesta|Tripas de cordero*600 g*cordero;Arroz*150 g*arroz;Hierbabuena*un manojo*cilantro
Libia|Misurata|africa|mbakbaka|Mbakbaka|مبكبكة|fideo|umami,picante|40|consuelo,fiesta|Pasta corta*300 g*fideos;Cordero*400 g*cordero;Tomate y harissa*al ras*tomate
Libia|Trípoli|africa|asida-libia|Asida|عصيدة|postre|dulce,cremoso|25|consuelo,fiesta|Sémola*200 g*trigo;Mantequilla y miel*al ras*leche
Libia|Trípoli|africa|shakshuka-libia|Shakshuka libia|شكشوكة|desayuno|picante,umami,citrico|25|consuelo|Huevos*4*huevo;Tomate y pimiento*al ras*tomate;Harissa*1 cda*chile
Libia|Ghadames|africa|couscous-libio|Cuscús libio|كسكسي|estofado|umami,herbal|70|fiesta,consuelo|Cuscús*300 g*trigo;Cordero*500 g*cordero;Garbanzo*1 taza*garbanzo
Sudán|Jartum|africa|ful-sudani|Ful sudani|فول سوداني|desayuno|umami,citrico,picante|30|consuelo|Habas*400 g*frijol;Limón y comino*al ras*limon;Aceite de sésamo*2 cdas*aceite
Sudán|Omdurmán|africa|kisra|Kisra|كسرة|pan|umami,fresco|40|consuelo|Sorgo fermentado*300 g*trigo;Sal*al gusto*sal
Sudán|Jartum|africa|gorraasa|Gorraasa|قراصة|pan|umami,cremoso|25|consuelo|Harina*300 g*trigo;Levadura*8 g*trigo;Ghee*para pintar*leche
Sudán|Puerto Sudán|africa|shorba-sudanesa|Shorba sudanesa|شوربة|caldo|umami,herbal|50|consuelo|Cordero*400 g*cordero;Cacahuete*80 g*cacahuete;Lima*1*limon
Sudán|Jartum|africa|asida-sudan|Asida sudanesa|عصيدة|estofado|umami,herbal|35|consuelo|Sorgo*250 g*trigo;Mullah de carne*para servir*res
Sudán|Kassala|africa|gured-merakh|Gured merakh|قرض مريخ|brasa|ahumado,picante|40|fiesta|Hígado de cordero*400 g*cordero;Cebolla y chile*al ras*cebolla
Eritrea|Asmara|africa|zigni|Zigni|ዝግኒ|estofado|picante,umami,ahumado|80|fiesta,consuelo|Res*700 g*res;Berbere*3 cdas*chile;Tomate*2*tomate
Eritrea|Asmara|africa|tsebhi-derho|Tsebhi derho|ጸብሒ ደርሆ|estofado|picante,umami|70|fiesta|Pollo*1*pollo;Berbere*2 cdas*chile;Huevos duros*4*huevo
Eritrea|Massawa|africa|kitcha-fit-fit|Kitcha fit-fit|ኪቻ ፍትፍት|desayuno|umami,picante|20|consuelo|Pan ázimo*4*trigo;Berbere y ghee*al ras*chile
Eritrea|Asmara|africa|injera-eritreo|Injera eritreo|እንጀራ|pan|umami,citrico,fresco|48|consuelo,fiesta|Teff*300 g*trigo;Agua*400 ml*agua
Eritrea|Asmara|africa|alicha|Alicha|ኣሊቻ|estofado|herbal,umami|50|ligero,consuelo|Col y zanahoria*500 g*cebolla;Cúrcuma*1 cdita*jengibre;Patata*2*papa
Somalia|Mogadiscio|africa|bariis-iskukaris|Bariis iskukaris|باريس|arroz|ahumado,umami,dulce|50|fiesta,consuelo|Arroz basmati*300 g*arroz;Cordero*500 g*cordero;Xawaash*2 cdas*comino
Somalia|Hargeisa|africa|canjeero|Canjeero|كمبرو|desayuno|cremoso,dulce|25|consuelo|Harina fermentada*250 g*trigo;Azúcar y ghee*al ras*azucar
Somalia|Mogadiscio|africa|suqaar|Suqaar|سقار|brasa|umami,picante,ahumado|30|fiesta|Res en cubos*500 g*res;Pimiento y comino*al ras*cebolla
Somalia|Bosaso|africa|sambusa-somali|Sambusa|سمبوسة|empanada|picante,umami|40|fiesta|Masa*12*trigo;Carne y cebolla*al ras*res;Cilantro*un golpe*cilantro
Somalia|Mogadiscio|africa|maraq|Maraq|مرق|caldo|umami,herbal|60|consuelo|Cordero*500 g*cordero;Patata y zanahoria*al ras*papa
Somalia|Kismaayo|africa|cambuulo|Cambuulo|مبولو|desayuno|dulce,cremoso,umami|45|consuelo|Frijol azuki*250 g*frijol;Azúcar y mantequilla*al ras*azucar
Mauritania|Nuakchot|africa|thieb-mauritano|Thieb mauritano|تييب|arroz|umami,citrico,picante|70|fiesta,consuelo|Pescado*600 g*pescado;Arroz*300 g*arroz;Tamarindo*2 cdas*limon
Mauritania|Atar|africa|mechoui-mauritano|Mechoui|مشوي|brasa|ahumado,umami|180|fiesta,impresionar|Cordero entero*1*cordero;Comino y mantequilla*al ras*comino
Mauritania|Nuakchot|africa|couscous-hassani|Cuscús hassaní|كسكس|estofado|umami,herbal|80|fiesta|Cuscús*300 g*trigo;Cordero*500 g*cordero;Nabo y zanahoria*al ras*papa
Mauritania|Nuadibú|africa|dried-fish-stew|Caldero de pescado seco|مارو|estofado|umami,picante|50|consuelo|Pescado seco*300 g*pescado;Tomate*2*tomate;Chile*2*chile
Botsuana|Gaborone|africa|seswaa|Seswaa|Seswaa|estofado|umami,ahumado|180|fiesta,consuelo|Res o cabra*1 kg*res;Sal*al gusto*sal;Cebolla*1*cebolla
Botsuana|Maun|africa|pap-botsuana|Pap|Bogobe|arroz|umami,cremoso|30|consuelo|Harina de maíz*300 g*maiz;Agua*800 ml*agua
Botsuana|Gaborone|africa|morogo|Morogo|Morogo|crudo|herbal,fresco|20|ligero|Hojas silvestres*400 g*cilantro;Cebolla*1*cebolla;Tomate*1*tomate
Botsuana|Francistown|africa|vetkoek|Vetkoek|Magwinya|frito|dulce,cremoso|30|fiesta|Masa frita*8*trigo;Carne picada o mermelada*al ras*res
Namibia|Windhoek|africa|kapana|Kapana|Kapana|brasa|ahumado,picante,umami|25|fiesta|Res a la brasa*500 g*res;Chili seco*al gusto*chile
Namibia|Swakopmund|africa|potjiekos-namibia|Potjiekos|Potjiekos|estofado|umami,ahumado|120|consuelo,fiesta|Res*700 g*res;Verduras de raíz*al ras*papa;Cerveza*200 ml*cebolla
Namibia|Windhoek|africa|biltong-plato|Biltong a la mesa|Biltong|crudo|ahumado,umami|20|ligero,fiesta|Biltong de res*200 g*res;Limón*1*limon
Namibia|Lüderitz|africa|kingklip-brasa|Kingklip a la brasa|Kingklip|brasa|ahumado,citrico,fresco|30|ligero,impresionar|Kingklip*600 g*pescado;Limón y mantequilla*al ras*limon
Zimbabue|Harare|africa|sadza|Sadza|Sadza|arroz|umami,cremoso|25|consuelo|Harina de maíz*300 g*maiz;Agua*900 ml*agua
Zimbabue|Bulawayo|africa|nyama|Nyama yehuku|Nyama|estofado|umami,picante|50|fiesta,consuelo|Pollo*800 g*pollo;Tomate y cebolla*al ras*tomate
Zimbabue|Harare|africa|muriwo|Muriwo unedovi|Muriwo|estofado|herbal,cremoso,umami|30|ligero,consuelo|Berza*400 g*cilantro;Mantequilla de cacahuete*3 cdas*cacahuete
Zimbabue|Victoria Falls|africa|kapenta|Kapenta|Kapenta|frito|umami,ahumado,picante|20|fiesta|Pescaditos secos*250 g*pescado;Cebolla y tomate*al ras*cebolla
Zambia|Lusaka|africa|nshima|Nshima|Nshima|arroz|umami,cremoso|25|consuelo|Harina de maíz*300 g*maiz;Agua*900 ml*agua
Zambia|Livingstone|africa|ifisashi|Ifisashi|Ifisashi|estofado|cremoso,herbal,umami|35|consuelo,ligero|Hojas de calabaza*400 g*cilantro;Cacahuete molido*100 g*cacahuete
Zambia|Kitwe|africa|chikanda|Chikanda|Chikanda|frito|umami,herbal|40|fiesta|Tubérculo de orquídea*300 g*papa;Cacahuete*80 g*cacahuete
Zambia|Lusaka|africa|kapenta-zambia|Kapenta zambiano|Kapenta|estofado|umami,picante|25|consuelo|Kapenta*250 g*pescado;Tomate*2*tomate
Malaui|Lilongüe|africa|nsima|Nsima|Nsima|arroz|umami,cremoso|25|consuelo|Harina de maíz*300 g*maiz;Agua*900 ml*agua
Malaui|Mangochi|africa|chambo|Chambo a la brasa|Chambo|brasa|ahumado,citrico,fresco|30|fiesta,ligero|Tilapia del lago*2*pescado;Limón*2*limon
Malaui|Zomba|africa|kondowole|Kondowole|Kondowole|arroz|umami,cremoso|30|consuelo|Harina de yuca*300 g*yuca;Agua*800 ml*agua
Malaui|Blantyre|africa|thobwa|Thobwa|Thobwa|bebida|dulce,cremoso|40|consuelo,fiesta|Maíz y mijo fermentados*200 g*maiz;Azúcar*al gusto*azucar
Ruanda|Kigali|africa|ugali-ruanda|Ugali ruandés|Ugali|arroz|umami,cremoso|25|consuelo|Harina de maíz*300 g*maiz;Agua*800 ml*agua
Ruanda|Kigali|africa|brochettes-kigali|Brochettes de Kigali|Brochettes|brasa|ahumado,picante,umami|30|fiesta|Res*500 g*res;Pimiento*2*cebolla;Pili pili*al gusto*chile
Ruanda|Gisenyi|africa|isombe|Isombe|Isombe|estofado|herbal,umami|40|consuelo|Hojas de yuca*400 g*yuca;Cebolla y aceite de palma*al ras*cebolla
Ruanda|Butare|africa|matoke-ruanda|Matoke|Matoke|estofado|dulce,umami|35|consuelo|Plátano verde*6*platano;Frijol*1 taza*frijol
Burundi|Gitega|africa|ubugari|Ubugari|Ubugari|arroz|umami,cremoso|25|consuelo|Harina de mandioca*300 g*yuca;Agua*800 ml*agua
Burundi|Buyumbura|africa|ndagala|Ndagala|Ndagala|frito|umami,ahumado,picante|20|fiesta|Pescaditos del Tanganica*300 g*pescado;Cebolla*1*cebolla
Burundi|Buyumbura|africa|beans-plantain|Frijoles con plátano|Ibishyimbo|estofado|umami,dulce|40|consuelo|Frijoles*250 g*frijol;Plátano*3*platano
República Democrática del Congo|Kinsasa|africa|pondu|Pondu|Pondu|estofado|herbal,umami,picante|70|consuelo,fiesta|Hojas de yuca*500 g*yuca;Aceite de palma*4 cdas*aceite;Pescado ahumado*150 g*pescado
República Democrática del Congo|Lubumbashi|africa|fufu-congo|Fufu congoleño|Fufu|arroz|umami,cremoso|30|consuelo|Yuca*400 g*yuca;Plátano*200 g*platano
República Democrática del Congo|Kinsasa|africa|liboke|Liboke de poisson|Liboke|brasa|ahumado,citrico,herbal|40|fiesta,impresionar|Pescado*600 g*pescado;Hoja de plátano*4*platano;Pimentón*al ras*chile
República Democrática del Congo|Kisangani|africa|moambe-congo|Moambe|Poulet à la moambe|estofado|cremoso,umami,picante|70|fiesta,consuelo|Pollo*1*pollo;Pasta de palma*150 g*aceite;Arroz*para servir*arroz
República Democrática del Congo|Kinsasa|africa|saka-saka|Saka-saka|Saka-saka|estofado|herbal,umami|45|consuelo|Hojas de yuca*400 g*yuca;Cacahuete*80 g*cacahuete
República del Congo|Brazzaville|africa|poulet-nyembwe|Poulet nyembwe|Poulet nyembwe|estofado|cremoso,umami,picante|65|fiesta|Pollo*1*pollo;Salsa de palma*150 g*aceite
República del Congo|Pointe-Noire|africa|saka-saka-congo|Saka saka|Saka saka|estofado|herbal,umami|40|consuelo|Hojas de yuca*400 g*yuca;Pescado ahumado*120 g*pescado
República del Congo|Brazzaville|africa|maboke|Maboké|Maboké|brasa|ahumado,citrico|35|fiesta|Pescado en hoja*600 g*pescado;Chile y cebolla*al ras*chile
Gabón|Libreville|africa|nyembwe-gabon|Nyembwe gabonés|Nyembwe|estofado|cremoso,umami|70|fiesta,consuelo|Pollo*1*pollo;Salsa de palma*150 g*aceite;Yuca*para servir*yuca
Gabón|Port-Gentil|africa|poisson-braise-gabon|Pescado braseado|Poisson braisé|brasa|ahumado,citrico,picante|30|fiesta|Pescado entero*1*pescado;Pimentón y limón*al ras*limon
Gabón|Libreville|africa|odika|Sopa odika|Odika|caldo|umami,herbal|50|consuelo|Nuez odika*80 g*cacahuete;Carne ahumada*300 g*res
Benín|Cotonú|africa|pate-benin|Pâté de maíz|Pâté|arroz|umami,cremoso|30|consuelo|Harina de maíz*300 g*maiz;Salsa de tomate*para servir*tomate
Benín|Porto Novo|africa|sauce-arachide-benin|Salsa de cacahuete|Moyo|estofado|cremoso,umami,picante|45|consuelo,fiesta|Cacahuete molido*150 g*cacahuete;Pollo*600 g*pollo
Benín|Ouidah|africa|ablo|Ablo|Ablo|pan|dulce,cremoso|40|consuelo|Arroz fermentado*250 g*arroz;Azúcar*1 cda*azucar
Benín|Cotonú|africa|djenkoume|Djenkoumé|Djenkoumé|arroz|umami,picante|35|fiesta|Harina de maíz tostada*250 g*maiz;Pollo tomato*para servir*pollo
Togo|Lomé|africa|fufu-togo|Fufu togolés|Fufu|arroz|umami,cremoso|30|consuelo|Ñame*500 g*papa;Salsa de cacahuete*para servir*cacahuete
Togo|Kara|africa|peanut-soup-togo|Sopa de cacahuete|Sauce d'arachide|caldo|cremoso,umami,picante|50|consuelo|Cacahuete*150 g*cacahuete;Pollo*500 g*pollo;Tomate*2*tomate
Togo|Lomé|africa|akume|Akumé|Akumé|arroz|umami,cremoso|25|consuelo|Harina de maíz*300 g*maiz;Salsa de okra*para servir*cebolla
Burkina Faso|Uagadugú|africa|to-burkina|Tô|Tô|arroz|umami,cremoso|25|consuelo|Mijo o maíz*300 g*maiz;Salsa de okra*para servir*cebolla
Burkina Faso|Bobo-Dioulasso|africa|riz-gras-burkina|Riz gras|Riz gras|arroz|umami,picante,ahumado|45|fiesta,consuelo|Arroz*300 g*arroz;Carne*400 g*res;Tomate*2*tomate
Burkina Faso|Uagadugú|africa|poulet-bicyclette|Poulet bicyclette|Poulet bicyclette|brasa|ahumado,picante|40|fiesta|Pollo de corral*1*pollo;Pimentón*al ras*chile
Níger|Niamey|africa|djerma|Riz au gras djerma|Djerma|arroz|umami,picante|50|fiesta|Arroz*300 g*arroz;Res*400 g*res;Chile*2*chile
Níger|Zinder|africa|dambou|Dambou|Dambou|arroz|herbal,umami|35|consuelo,ligero|Cuscús de mijo*250 g*trigo;Moringa*un manojo*cilantro
Níger|Agadez|africa|tassada|Tassda de cabra|Tassda|estofado|umami,ahumado|90|fiesta|Cabra*700 g*cordero;Cebolla*2*cebolla
Chad|Yamena|africa|daraba|Daraba|Daraba|estofado|cremoso,umami,herbal|50|consuelo,fiesta|Okra*300 g*cebolla;Cacahuete*100 g*cacahuete;Pescado seco*150 g*pescado
Chad|Moundou|africa|boule-mil|Boule de mijo|Boule|arroz|umami,cremoso|25|consuelo|Mijo*300 g*trigo;Salsa de okra*para servir*cebolla
Chad|Yamena|africa|jarret-boeuf|Jarret de bœuf|Jarret|estofado|umami,ahumado|120|consuelo,fiesta|Jarrete*800 g*res;Tomate*2*tomate
Guinea|Conakri|africa|fouti|Fouti|Fouti|estofado|umami,herbal,picante|40|consuelo|Okra*300 g*cebolla;Pescado ahumado*200 g*pescado;Arroz*para servir*arroz
Guinea|Kankan|africa|poulet-kankan|Poulet yassa guineano|Yassa|estofado|citrico,ahumado,umami|55|fiesta|Pollo*1*pollo;Cebolla*4*cebolla;Limón*3*limon
Guinea|Conakri|africa|rice-sauce-graine|Salsa graine|Sauce graine|estofado|cremoso,umami,picante|60|fiesta|Palma*150 g*aceite;Carne*500 g*res
Sierra Leona|Freetown|africa|cassava-leaf|Cassava leaf stew|Plasas|estofado|herbal,cremoso,umami|70|consuelo,fiesta|Hojas de yuca*400 g*yuca;Pescado ahumado*200 g*pescado;Cacahuete*80 g*cacahuete
Sierra Leona|Bo|africa|jollof-sierra|Jollof de Sierra Leona|Jollof|arroz|picante,umami,ahumado|50|fiesta|Arroz*300 g*arroz;Tomate*3*tomate;Pollo*500 g*pollo
Sierra Leona|Freetown|africa|groundnut-soup-sl|Sopa de maní|Groundnut soup|caldo|cremoso,umami,picante|50|consuelo|Cacahuete*150 g*cacahuete;Pollo*500 g*pollo
Liberia|Monrovia|africa|palava-sauce|Palava sauce|Palava|estofado|herbal,umami,picante|45|consuelo,fiesta|Hojas de yute*400 g*cilantro;Pescado ahumado*150 g*pescado;Aceite de palma*3 cdas*aceite
Liberia|Gbarnga|africa|jollof-liberia|Jollof liberiano|Jollof|arroz|picante,umami|50|fiesta|Arroz*300 g*arroz;Pollo*500 g*pollo;Tomate*2*tomate
Liberia|Monrovia|africa|dumboy|Dumboy|Dumboy|arroz|umami,cremoso|35|consuelo|Yuca majada*400 g*yuca;Sopa de pimienta*para servir*chile
Gambia|Banjul|africa|benachin|Benachin|Benachin|arroz|umami,picante,citrico|70|fiesta,consuelo|Pescado*600 g*pescado;Arroz*300 g*arroz;Tomate y tamarindo*al ras*tomate
Gambia|Serekunda|africa|domoda|Domoda|Domoda|estofado|cremoso,umami,picante|55|consuelo,fiesta|Cacahuete*150 g*cacahuete;Res*500 g*res;Tomate*2*tomate
Gambia|Banjul|africa|superkanja|Supakanja|Supakanja|caldo|herbal,umami,picante|50|consuelo|Okra*300 g*cebolla;Pescado ahumado*150 g*pescado;Palma*2 cdas*aceite
Cabo Verde|Mindelo|africa|cachupa|Cachupa|Cachupa|estofado|umami,ahumado,herbal|180|consuelo,fiesta|Maíz seco*250 g*maiz;Frijol*150 g*frijol;Cerdo y atún*al ras*cerdo
Cabo Verde|Praia|africa|pastel-cabo|Pastel de atún|Pastel|empanada|umami,citrico,picante|40|fiesta|Masa*12*trigo;Atún*250 g*pescado;Cebolla*1*cebolla
Cabo Verde|Mindelo|africa|jagacida|Jagacida|Jagacida|arroz|umami,ahumado|40|consuelo,fiesta|Arroz*300 g*arroz;Frijol*150 g*frijol;Chorizo*120 g*cerdo
Cabo Verde|São Vicente|africa|grogue-ponche|Ponche de grogue|Grogue|bebida|dulce,citrico|10|fiesta|Grogue*60 ml*azucar;Lima y miel*al ras*limon
Mauricio|Port Louis|africa|dholl-puri|Dholl puri|Dholl puri|pan|umami,herbal,picante|40|fiesta,ligero|Harina y dal*300 g*trigo;Rougaille*para servir*tomate
Mauricio|Port Louis|africa|rougaille|Rougaille saucisse|Rougaille|estofado|picante,citrico,umami|35|fiesta,consuelo|Salchicha*400 g*cerdo;Tomate*3*tomate;Tomillo y chile*al ras*chile
Mauricio|Mahébourg|africa|vindaye-poisson|Vindaye de poisson|Vindaye|estofado|picante,citrico,ahumado|40|fiesta|Pescado frito*500 g*pescado;Mostaza y cúrcuma*al ras*jengibre;Vinagre*3 cdas*limon
Mauricio|Port Louis|africa|gateau-piment|Gâteau piment|Gâteau piment|frito|picante,umami,herbal|25|fiesta|Dal partido*200 g*lenteja;Chile y cilantro*al ras*chile
Seychelles|Victoria|africa|kari-koko|Kari koko|Kari koko|curry|cremoso,picante,umami|40|fiesta,ligero|Pescado*500 g*pescado;Leche de coco*400 ml*coco;Curry leaf*al ras*cilantro
Seychelles|Mahé|africa|grilled-bourzwa|Bourzwa a la parrilla|Bourzwa|brasa|ahumado,citrico,fresco|30|impresionar,ligero|Pargo rojo*1*pescado;Limón y chile*al ras*limon
Seychelles|La Digue|africa|ladob-banann|Ladob banann|Ladob|postre|dulce,cremoso|35|consuelo|Plátano maduro*4*platano;Leche de coco*300 ml*coco;Nuez moscada*1 pizca*canela
Comoras|Moroni|africa|langouste-vanille|Langosta a la vainilla|Langouste à la vanille|brasa|dulce,umami,cremoso|35|impresionar,fiesta|Langosta*2*camaron;Vainilla*1 rama*azucar;Mantequilla*40 g*leche
Comoras|Mutamudu|africa|mataba-comoras|Mataba|Mataba|estofado|herbal,cremoso,umami|45|consuelo|Hojas de yuca*400 g*yuca;Leche de coco*300 ml*coco
Comoras|Moroni|africa|pilaou-comoras|Pilaou|Pilaou|arroz|ahumado,umami,picante|50|fiesta|Arroz*300 g*arroz;Carne*400 g*res;Clavo y cardamomo*al ras*clavo
Yibuti|Yibuti|africa|skoudehkaris|Skoudehkaris|Skoudehkaris|arroz|ahumado,umami,picante|55|fiesta,consuelo|Arroz*300 g*arroz;Cordero*500 g*cordero;Comino y cardamomo*al ras*comino
Yibuti|Yibuti|africa|fah-fah|Fah-fah|Fah-fah|caldo|umami,herbal|60|consuelo|Cabrito*500 g*cordero;Verduras*al ras*papa
Santo Tomé y Príncipe|Santo Tomé|africa|calulu-stp|Calulu|Calulu|estofado|herbal,umami,picante|55|consuelo,fiesta|Pescado seco*250 g*pescado;Hojas de yuca*300 g*yuca;Aceite de palma*3 cdas*aceite
Santo Tomé y Príncipe|Santo Tomé|africa|blabla|Blablá|Blablá|postre|dulce,cremoso|40|consuelo|Plátano*4*platano;Coco*100 g*coco
Santo Tomé y Príncipe|Príncipe|africa|moqueca-principe|Moqueca de Príncipe|Moqueca|estofado|cremoso,citrico,umami|40|fiesta|Pescado*600 g*pescado;Leche de coco*300 ml*coco;Tomate*2*tomate
Guinea Ecuatorial|Malabo|africa|succotash-ge|Succotash|Succotash|estofado|umami,herbal|40|consuelo|Frijol y maíz*al ras*frijol;Pescado ahumado*150 g*pescado
Guinea Ecuatorial|Bata|africa|pepe-soup-ge|Pepe soup|Pepe soup|caldo|picante,umami|40|consuelo,fiesta|Pescado*500 g*pescado;Chile*4*chile;Nuez de kola*al ras*cacahuete
Lesoto|Maseru|africa|papa-lesoto|Papa|Papa|arroz|umami,cremoso|25|consuelo|Harina de maíz*300 g*maiz;Agua*900 ml*agua
Lesoto|Maseru|africa|moroho|Moroho|Moroho|estofado|herbal,umami|25|ligero,consuelo|Hojas silvestres*400 g*cilantro;Cebolla*1*cebolla
Esuatini|Mbabane|africa|sishwala|Sishwala|Sishwala|arroz|umami,cremoso|25|consuelo|Harina de maíz*300 g*maiz;Agua*900 ml*agua
Esuatini|Manzini|africa|karoo-stew|Estofado de cabra|Inyama|estofado|umami,ahumado|90|fiesta,consuelo|Cabra*700 g*cordero;Cebolla y tomate*al ras*cebolla
""".strip("\n")

def main() -> None:
    import sys as _sys
    _sys.path.insert(0, str(Path(__file__).resolve().parent))
    from naciones_more import MORE as MORE_BLOB, EXTRA as EXTRA_BLOB
    from naciones_fill import FILL as FILL_BLOB

    ingest(NEW, "NEW")
    ingest(MORE_BLOB, "MORE")
    ingest(EXTRA_BLOB, "EXTRA")
    ingest(FILL_BLOB, "FILL")

    deny = existing_slugs()
    seen: set[str] = set()
    out: list[str] = []
    by_country: Counter = Counter()
    skipped = 0
    errors: list[str] = []

    for country, city, region, slug, name, local, family, flavors, time, moods, ings in RAW:
        country = CANON.get(country, country)
        slug = fold_slug(slug)
        family = family.strip()
        region = region.strip()
        if family not in FAMILIES:
            errors.append(f"bad family {family} ({slug})")
            continue
        if region not in REGIONS:
            errors.append(f"bad region {region} ({slug})")
            continue
        flav = [f.strip() for f in flavors.split(",") if f.strip() in FLAVORS] or ["umami"]
        mood = [m.strip() for m in moods.split(",") if m.strip() in MOODS] or ["consuelo"]
        if not slug or slug in deny or slug in seen:
            skipped += 1
            continue
        try:
            t = int(time)
        except ValueError:
            errors.append(f"bad time {time} ({slug})")
            continue
        if "*" not in ings:
            errors.append(f"ings need item*amount*key ({slug})")
            continue
        seen.add(slug)
        by_country[country] += 1
        story = story_for(family, name, country, city)
        tuple_src = ", ".join([
            ts_str(slug), ts_str(name), ts_str(local or name), ts_str(country),
            ts_str(city), ts_str(region), ts_str(family), ts_str(",".join(flav)),
            str(t), ts_str(",".join(mood)), ts_str(ings), ts_str(story),
        ])
        out.append(f"  [{tuple_src}],")

    text = (
        'import type { AtlasSeed } from "./atlas-expand";\n\n'
        "export const ATLAS_NACIONES: AtlasSeed[] = [\n"
        + "\n".join(out)
        + "\n];\n"
    )
    dest = SRC / "atlas-naciones.ts"
    dest.write_text(text)
    print("WROTE", dest)
    print("NEW_RECIPES", len(out))
    print("SKIPPED", skipped)
    print("NATIONS_IN_WAVE", len(by_country))
    for name, n in by_country.most_common():
        print(f"  {n:3d} {name}")
    if errors:
        print("ERRORS", len(errors))
        for e in errors[:40]:
            print(" ", e)


if __name__ == "__main__":
    main()
