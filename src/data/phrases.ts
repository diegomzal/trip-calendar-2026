export interface Phrase {
    spanish: string;
    french: string;
    frenchPronunciation: string;
    dutch: string;
    dutchPronunciation: string;
    italian: string;
    italianPronunciation: string;
}

export interface PhraseCategory {
    id: string;
    label: string;
    emoji: string;
    phrases: Phrase[];
}

export const PHRASE_CATEGORIES: PhraseCategory[] = [
    {
        "id": "greetings",
        "label": "Saludos",
        "emoji": "👋",
        "phrases": [
            {
                "spanish": "Hola",
                "french": "Bonjour",
                "frenchPronunciation": "bon-YÚUR",
                "dutch": "Hallo",
                "dutchPronunciation": "JA-ló",
                "italian": "Ciao",
                "italianPronunciation": "CHÁO"
            },
            {
                "spanish": "Buenos días",
                "french": "Bonjour",
                "frenchPronunciation": "bon-YÚUR",
                "dutch": "Goedemorgen",
                "dutchPronunciation": "JU-de-MOR-jen",
                "italian": "Buongiorno",
                "italianPronunciation": "buon-YÓR-no"
            },
            {
                "spanish": "Buenas noches",
                "french": "Bonsoir",
                "frenchPronunciation": "bon-SUÁR",
                "dutch": "Goedenavond",
                "dutchPronunciation": "JU-den-A-vont",
                "italian": "Buonasera",
                "italianPronunciation": "buo-na-SÉ-ra"
            },
            {
                "spanish": "Adiós",
                "french": "Au revoir",
                "frenchPronunciation": "o re-VUÁR",
                "dutch": "Tot ziens",
                "dutchPronunciation": "tot SÍNS",
                "italian": "Arrivederci",
                "italianPronunciation": "a-rri-ve-DÉR-chi"
            },
            {
                "spanish": "Sí / No",
                "french": "Oui / Non",
                "frenchPronunciation": "UÍ / NON",
                "dutch": "Ja / Nee",
                "dutchPronunciation": "YA / NÉ",
                "italian": "Sì / No",
                "italianPronunciation": "SÍ / NO"
            },
            {
                "spanish": "Perdón / Disculpe",
                "french": "Pardon / Excusez-moi",
                "frenchPronunciation": "par-DÓN / eks-kü-SÉ muá",
                "dutch": "Pardon / Sorry",
                "dutchPronunciation": "par-DÓN / SO-rri",
                "italian": "Scusi",
                "italianPronunciation": "SCÚ-si"
            },
            {
                "spanish": "Por favor",
                "french": "S'il vous plaît",
                "frenchPronunciation": "sil vu PLÉ",
                "dutch": "Alstublieft",
                "dutchPronunciation": "als-tu-BLÍFT",
                "italian": "Per favore",
                "italianPronunciation": "per fa-VÓ-re"
            },
            {
                "spanish": "Gracias",
                "french": "Merci",
                "frenchPronunciation": "mer-SÍ",
                "dutch": "Dank u wel",
                "dutchPronunciation": "dank u VEL",
                "italian": "Grazie",
                "italianPronunciation": "GRÁ-tsie"
            },
            {
                "spanish": "De nada",
                "french": "De rien",
                "frenchPronunciation": "de RIÉN",
                "dutch": "Graag gedaan",
                "dutchPronunciation": "jráj je-DÁN",
                "italian": "Prego",
                "italianPronunciation": "PRÉ-go"
            },
            {
                "spanish": "Mucho gusto",
                "french": "Enchanté(e)",
                "frenchPronunciation": "an-shan-TÉ",
                "dutch": "Aangenaam",
                "dutchPronunciation": "ÁN-je-nám",
                "italian": "Piacere",
                "italianPronunciation": "pia-CHÉ-re"
            }
        ]
    },
    {
        "id": "restaurant",
        "label": "Restaurante",
        "emoji": "🍽️",
        "phrases": [
            {
                "spanish": "Una mesa para dos, por favor",
                "french": "Une table pour deux, s'il vous plaît",
                "frenchPronunciation": "ün TABL pur DÖ sil vu PLÉ",
                "dutch": "Een tafel voor twee, alstublieft",
                "dutchPronunciation": "en TA-fel vór TVÉ als-tu-BLÍFT",
                "italian": "Un tavolo per due, per favore",
                "italianPronunciation": "un TÁ-vo-lo per DÚ-e per fa-VÓ-re"
            },
            {
                "spanish": "La cuenta, por favor",
                "french": "L'addition, s'il vous plaît",
                "frenchPronunciation": "la-di-SIÓN sil vu PLÉ",
                "dutch": "De rekening, alstublieft",
                "dutchPronunciation": "de RE-ke-ning als-tu-BLÍFT",
                "italian": "Il conto, per favore",
                "italianPronunciation": "il CÓN-to per fa-VÓ-re"
            },
            {
                "spanish": "¿Qué me recomienda?",
                "french": "Qu'est-ce que vous recommandez?",
                "frenchPronunciation": "kes ke vu re-ko-man-DÉ",
                "dutch": "Wat raadt u aan?",
                "dutchPronunciation": "vat RÁT u AN",
                "italian": "Cosa mi consiglia?",
                "italianPronunciation": "CÓ-sa mi con-SÍ-llia"
            },
            {
                "spanish": "Soy alérgico/a a...",
                "french": "Je suis allergique à...",
                "frenchPronunciation": "ye sui a-ler-YÍK a",
                "dutch": "Ik ben allergisch voor...",
                "dutchPronunciation": "ik ben a-LER-jis vór",
                "italian": "Sono allergico/a a...",
                "italianPronunciation": "SÓ-no a-LÉR-yi-co a"
            },
            {
                "spanish": "Soy vegetariano/a",
                "french": "Je suis végétarien(ne)",
                "frenchPronunciation": "ye sui ve-ye-ta-RIÉN",
                "dutch": "Ik ben vegetariër",
                "dutchPronunciation": "ik ben ve-je-TA-ri-er",
                "italian": "Sono vegetariano/a",
                "italianPronunciation": "SÓ-no ve-ye-ta-RIÁ-no"
            },
            {
                "spanish": "Un vaso de agua, por favor",
                "french": "Un verre d'eau, s'il vous plaît",
                "frenchPronunciation": "ön VER DÓ sil vu PLÉ",
                "dutch": "Een glas water, alstublieft",
                "dutchPronunciation": "en JLAS VA-ter als-tu-BLÍFT",
                "italian": "Un bicchiere d'acqua, per favore",
                "italianPronunciation": "un bi-KIÉ-re DÁ-kua per fa-VÓ-re"
            },
            {
                "spanish": "Un café / un capuchino, por favor",
                "french": "Un café, s'il vous plaît",
                "frenchPronunciation": "ön ka-FÉ sil vu PLÉ",
                "dutch": "Een koffie, alstublieft",
                "dutchPronunciation": "en KO-fi als-tu-BLÍFT",
                "italian": "Un caffè / un cappuccino, per favore",
                "italianPronunciation": "un ka-FÉ / un ka-pu-CHÍ-no per fa-VÓ-re"
            },
            {
                "spanish": "Dos cervezas, por favor",
                "french": "Deux bières, s'il vous plaît",
                "frenchPronunciation": "dö BIÉR sil vu PLÉ",
                "dutch": "Twee biertjes, alstublieft",
                "dutchPronunciation": "tvé BÍR-ches als-tu-BLÍFT",
                "italian": "Due birre, per favore",
                "italianPronunciation": "DÚ-e BÍ-rre per fa-VÓ-re"
            },
            {
                "spanish": "Un cono con dos sabores",
                "french": "Un cône avec deux boules",
                "frenchPronunciation": "ön KÓN a-VEK dö BUL",
                "dutch": "Een hoorntje met twee smaken",
                "dutchPronunciation": "en JÓRN-che met tvé SMA-ken",
                "italian": "Un cono con due gusti",
                "italianPronunciation": "un CÓ-no kon DÚ-e GÚS-ti"
            },
            {
                "spanish": "Para llevar, por favor",
                "french": "À emporter, s'il vous plaît",
                "frenchPronunciation": "a am-por-TÉ sil vu PLÉ",
                "dutch": "Om mee te nemen, alstublieft",
                "dutchPronunciation": "om MÉ te NE-men als-tu-BLÍFT",
                "italian": "Da portare via, per favore",
                "italianPronunciation": "da por-TÁ-re VÍ-a per fa-VÓ-re"
            },
            {
                "spanish": "Está delicioso",
                "french": "C'est délicieux",
                "frenchPronunciation": "se de-li-SIÖ",
                "dutch": "Het is heerlijk",
                "dutchPronunciation": "jet is JÉR-lek",
                "italian": "È buonissimo",
                "italianPronunciation": "É buo-NÍ-ssi-mo"
            },
            {
                "spanish": "¿Tienen menú en español?",
                "french": "Avez-vous un menu en espagnol?",
                "frenchPronunciation": "a-VÉ vu ön me-NÜ an es-pa-ÑÓL",
                "dutch": "Heeft u een menu in het Spaans?",
                "dutchPronunciation": "héft u en me-NÜ in jet SPÁNS",
                "italian": "Avete il menù in spagnolo?",
                "italianPronunciation": "a-VÉ-te il me-NÚ in spa-ÑÓ-lo"
            }
        ]
    },
    {
        "id": "transport",
        "label": "Transporte",
        "emoji": "🚆",
        "phrases": [
            {
                "spanish": "¿Dónde está la estación de tren?",
                "french": "Où est la gare?",
                "frenchPronunciation": "u é la GÁR",
                "dutch": "Waar is het treinstation?",
                "dutchPronunciation": "vár is jet TRÉIN-sta-sion",
                "italian": "Dov'è la stazione dei treni?",
                "italianPronunciation": "do-VÉ la sta-TSIÓ-ne dei TRÉ-ni"
            },
            {
                "spanish": "¿Dónde está la estación de metro?",
                "french": "Où est la station de métro?",
                "frenchPronunciation": "u é la sta-SIÓN de me-TRÓ",
                "dutch": "Waar is het metrostation?",
                "dutchPronunciation": "vár is jet ME-tro-sta-sion",
                "italian": "Dov'è la fermata della metro?",
                "italianPronunciation": "do-VÉ la fer-MÁ-ta DÉ-lla MÉ-tro"
            },
            {
                "spanish": "Un billete a..., por favor",
                "french": "Un billet pour..., s'il vous plaît",
                "frenchPronunciation": "ön bi-YÉ pur... sil vu PLÉ",
                "dutch": "Een kaartje naar..., alstublieft",
                "dutchPronunciation": "en KÁRT-ye nár... als-tu-BLÍFT",
                "italian": "Un biglietto per..., per favore",
                "italianPronunciation": "un bi-LLIÉ-tto per... per fa-VÓ-re"
            },
            {
                "spanish": "¿A qué hora sale el próximo tren?",
                "french": "À quelle heure part le prochain train?",
                "frenchPronunciation": "a kel ÖR par le pro-SHÉN TRÉN",
                "dutch": "Hoe laat vertrekt de volgende trein?",
                "dutchPronunciation": "ju LÁT ver-TREKT de VOL-jen-de TRÉIN",
                "italian": "A che ora parte il prossimo treno?",
                "italianPronunciation": "a ke Ó-ra PÁR-te il PRÓ-ssi-mo TRÉ-no"
            },
            {
                "spanish": "¿De qué andén sale el tren?",
                "french": "De quel quai part le train?",
                "frenchPronunciation": "de kel KÉ par le TRÉN",
                "dutch": "Van welk spoor vertrekt de trein?",
                "dutchPronunciation": "van velk SPÓR ver-TREKT de TRÉIN",
                "italian": "Da quale binario parte il treno?",
                "italianPronunciation": "da KUÁ-le bi-NÁ-rio PÁR-te il TRÉ-no"
            },
            {
                "spanish": "¿Debo validar el billete?",
                "french": "Dois-je composter le billet?",
                "frenchPronunciation": "duá-ye kom-pos-TÉ le bi-YÉ",
                "dutch": "Moet ik mijn kaartje valideren?",
                "dutchPronunciation": "mut ik méin KÁRT-ye va-li-DE-ren",
                "italian": "Devo convalidare il biglietto?",
                "italianPronunciation": "DÉ-vo con-va-li-DÁ-re il bi-LLIÉ-tto"
            },
            {
                "spanish": "¿Cuánto cuesta?",
                "french": "Combien ça coûte?",
                "frenchPronunciation": "kom-BIÉN sa KÚT",
                "dutch": "Hoeveel kost het?",
                "dutchPronunciation": "JU-vél KOST jet",
                "italian": "Quanto costa?",
                "italianPronunciation": "KUÁN-to CÓS-ta"
            },
            {
                "spanish": "¿Este tren va a...?",
                "french": "Ce train va à...?",
                "frenchPronunciation": "se TRÉN va a",
                "dutch": "Gaat deze trein naar...?",
                "dutchPronunciation": "ját DE-ze TRÉIN nár",
                "italian": "Questo treno va a...?",
                "italianPronunciation": "KUÉS-to TRÉ-no va a"
            }
        ]
    },
    {
        "id": "hotel",
        "label": "Hotel",
        "emoji": "🏨",
        "phrases": [
            {
                "spanish": "Tengo una reserva a nombre de...",
                "french": "J'ai une réservation au nom de...",
                "frenchPronunciation": "yé ün re-ser-va-SIÓN o NÓM de",
                "dutch": "Ik heb een reservering op naam van...",
                "dutchPronunciation": "ik jep en re-ser-VE-ring op NÁM van",
                "italian": "Ho una prenotazione a nome di...",
                "italianPronunciation": "o Ú-na pre-no-ta-TSIÓ-ne a NÓ-me di"
            },
            {
                "spanish": "¿A qué hora es el check-out?",
                "french": "À quelle heure est le départ?",
                "frenchPronunciation": "a kel ÖR é le de-PÁR",
                "dutch": "Hoe laat is het uitchecken?",
                "dutchPronunciation": "ju LÁT is jet ÁUT-che-ken",
                "italian": "A che ora è il check-out?",
                "italianPronunciation": "a ke Ó-ra É il chek-ÁUT"
            },
            {
                "spanish": "¿Podemos dejar las maletas?",
                "french": "Pouvons-nous laisser nos bagages?",
                "frenchPronunciation": "pu-VÓN nu le-SÉ no ba-GÁSH",
                "dutch": "Kunnen we onze koffers achterlaten?",
                "dutchPronunciation": "KÜ-nen ve ON-ze KO-fers AJ-ter-la-ten",
                "italian": "Possiamo lasciare le valigie?",
                "italianPronunciation": "po-SSIÁ-mo la-SHÁ-re le va-LÍ-ye"
            },
            {
                "spanish": "¿El desayuno está incluido?",
                "french": "Le petit-déjeuner est-il inclus?",
                "frenchPronunciation": "le pe-TÍ de-yö-NÉ e-TÍL en-KLÜ",
                "dutch": "Is het ontbijt inbegrepen?",
                "dutchPronunciation": "is jet ont-BÉIT in-be-JRE-pen",
                "italian": "La colazione è inclusa?",
                "italianPronunciation": "la co-la-TSIÓ-ne É in-CLÚ-sa"
            },
            {
                "spanish": "El aire acondicionado no funciona",
                "french": "La climatisation ne fonctionne pas",
                "frenchPronunciation": "la kli-ma-ti-sa-SIÓN ne fonk-SIÓN pa",
                "dutch": "De airco werkt niet",
                "dutchPronunciation": "de ÉR-ko VERKT nít",
                "italian": "L'aria condizionata non funziona",
                "italianPronunciation": "LÁ-ria con-di-tsio-NÁ-ta non fun-TSIÓ-na"
            },
            {
                "spanish": "¿Me puede llamar un taxi?",
                "french": "Pouvez-vous m'appeler un taxi?",
                "frenchPronunciation": "pu-VÉ vu ma-pe-LÉ ön tak-SÍ",
                "dutch": "Kunt u een taxi voor me bellen?",
                "dutchPronunciation": "künt u en TAK-si vór me BE-len",
                "italian": "Può chiamarmi un taxi?",
                "italianPronunciation": "puó kia-MÁR-mi un TÁK-si"
            }
        ]
    },
    {
        "id": "tickets",
        "label": "Museos y entradas",
        "emoji": "🎟️",
        "phrases": [
            {
                "spanish": "Tenemos entradas reservadas",
                "french": "Nous avons une réservation",
                "frenchPronunciation": "nu-sa-VÓN ün re-ser-va-SIÓN",
                "dutch": "We hebben een reservering",
                "dutchPronunciation": "ve JE-ben en re-ser-VE-ring",
                "italian": "Abbiamo la prenotazione",
                "italianPronunciation": "a-BIÁ-mo la pre-no-ta-TSIÓ-ne"
            },
            {
                "spanish": "¿Hay descuento para estudiantes?",
                "french": "Y a-t-il une réduction pour les étudiants?",
                "frenchPronunciation": "ya-TÍL ün re-dük-SIÓN pur le-se-tü-DIÁN",
                "dutch": "Is er korting voor studenten?",
                "dutchPronunciation": "is er KOR-ting vór stü-DEN-ten",
                "italian": "C'è uno sconto per studenti?",
                "italianPronunciation": "CHÉ Ú-no SCÓN-to per stu-DÉN-ti"
            },
            {
                "spanish": "¿A qué hora cierran?",
                "french": "À quelle heure fermez-vous?",
                "frenchPronunciation": "a kel ÖR fer-MÉ vu",
                "dutch": "Hoe laat sluit u?",
                "dutchPronunciation": "ju LÁT SLÁUT u",
                "italian": "A che ora chiudete?",
                "italianPronunciation": "a ke Ó-ra kiu-DÉ-te"
            },
            {
                "spanish": "¿Se pueden tomar fotos?",
                "french": "Peut-on prendre des photos?",
                "frenchPronunciation": "pö-TÓN PRANDR de fo-TÓ",
                "dutch": "Mag ik foto's maken?",
                "dutchPronunciation": "maj ik FO-tos MA-ken",
                "italian": "Si possono fare foto?",
                "italianPronunciation": "si PÓ-sso-no FÁ-re FÓ-to"
            },
            {
                "spanish": "¿Dónde es la entrada / la salida?",
                "french": "Où est l'entrée / la sortie?",
                "frenchPronunciation": "u é lan-TRÉ / la sor-TÍ",
                "dutch": "Waar is de ingang / uitgang?",
                "dutchPronunciation": "vár is de IN-jang / ÁUT-jang",
                "italian": "Dov'è l'ingresso / l'uscita?",
                "italianPronunciation": "do-VÉ lin-GRÉ-sso / lu-SHÍ-ta"
            },
            {
                "spanish": "¿Hay audioguía en español?",
                "french": "Y a-t-il un audioguide en espagnol?",
                "frenchPronunciation": "ya-TÍL ön o-dio-GUÍD an es-pa-ÑÓL",
                "dutch": "Is er een audiogids in het Spaans?",
                "dutchPronunciation": "is er en AU-dio-jits in jet SPÁNS",
                "italian": "C'è l'audioguida in spagnolo?",
                "italianPronunciation": "CHÉ lau-dio-GUÍ-da in spa-ÑÓ-lo"
            }
        ]
    },
    {
        "id": "emergencies",
        "label": "Emergencias",
        "emoji": "🆘",
        "phrases": [
            {
                "spanish": "Necesito ayuda",
                "french": "J'ai besoin d'aide",
                "frenchPronunciation": "yé be-SUÉN DÉD",
                "dutch": "Ik heb hulp nodig",
                "dutchPronunciation": "ik jep JULP NO-dij",
                "italian": "Ho bisogno di aiuto",
                "italianPronunciation": "o bi-SÓ-ño di a-YÚ-to"
            },
            {
                "spanish": "Es una emergencia (llamen al 112)",
                "french": "C'est une urgence",
                "frenchPronunciation": "se-TÜN ür-YÁNS",
                "dutch": "Het is een noodgeval",
                "dutchPronunciation": "jet is en NÓT-je-val",
                "italian": "È un'emergenza",
                "italianPronunciation": "É u-ne-mer-YÉN-tsa"
            },
            {
                "spanish": "Llame a la policía",
                "french": "Appelez la police",
                "frenchPronunciation": "a-pe-LÉ la po-LÍS",
                "dutch": "Bel de politie",
                "dutchPronunciation": "bel de po-LI-tsi",
                "italian": "Chiami la polizia",
                "italianPronunciation": "KIÁ-mi la po-li-TSÍ-a"
            },
            {
                "spanish": "Me robaron",
                "french": "On m'a volé",
                "frenchPronunciation": "on ma vo-LÉ",
                "dutch": "Ik ben bestolen",
                "dutchPronunciation": "ik ben be-STO-len",
                "italian": "Mi hanno derubato",
                "italianPronunciation": "mi Á-nno de-ru-BÁ-to"
            },
            {
                "spanish": "¿Dónde está el hospital?",
                "french": "Où est l'hôpital?",
                "frenchPronunciation": "u é lo-pi-TÁL",
                "dutch": "Waar is het ziekenhuis?",
                "dutchPronunciation": "vár is jet SÍ-ken-jaus",
                "italian": "Dov'è l'ospedale?",
                "italianPronunciation": "do-VÉ los-pe-DÁ-le"
            },
            {
                "spanish": "No me siento bien",
                "french": "Je ne me sens pas bien",
                "frenchPronunciation": "ye ne me SÁN pa BIÉN",
                "dutch": "Ik voel me niet goed",
                "dutchPronunciation": "ik VUL me nít JUT",
                "italian": "Non mi sento bene",
                "italianPronunciation": "non mi SÉN-to BÉ-ne"
            },
            {
                "spanish": "He perdido mi pasaporte",
                "french": "J'ai perdu mon passeport",
                "frenchPronunciation": "yé per-DÜ mon pas-PÓR",
                "dutch": "Ik ben mijn paspoort kwijt",
                "dutchPronunciation": "ik ben méin PAS-port kvéit",
                "italian": "Ho perso il mio passaporto",
                "italianPronunciation": "o PÉR-so il MÍ-o pa-ssa-PÓR-to"
            }
        ]
    },
    {
        "id": "health",
        "label": "Salud y farmacia",
        "emoji": "💊",
        "phrases": [
            {
                "spanish": "¿Dónde hay una farmacia?",
                "french": "Où y a-t-il une pharmacie?",
                "frenchPronunciation": "u ya-TÍL ün far-ma-SÍ",
                "dutch": "Waar is een apotheek?",
                "dutchPronunciation": "vár is en a-po-TÉK",
                "italian": "Dov'è una farmacia?",
                "italianPronunciation": "do-VÉ Ú-na far-ma-CHÍ-a"
            },
            {
                "spanish": "Necesito algo para el dolor de cabeza",
                "french": "J'ai besoin de quelque chose pour le mal de tête",
                "frenchPronunciation": "yé be-SUÉN de kel-ke SHÓS pur le MAL de TET",
                "dutch": "Ik heb iets nodig tegen hoofdpijn",
                "dutchPronunciation": "ik jep íts NO-dij TE-jen JÓFT-pein",
                "italian": "Mi serve qualcosa per il mal di testa",
                "italianPronunciation": "mi SÉR-ve kual-CÓ-sa per il MAL di TÉS-ta"
            },
            {
                "spanish": "Me duele el estómago",
                "french": "J'ai mal au ventre",
                "frenchPronunciation": "yé MAL o VANTR",
                "dutch": "Ik heb buikpijn",
                "dutchPronunciation": "ik jep BÁUK-pein",
                "italian": "Ho mal di pancia",
                "italianPronunciation": "o MAL di PÁN-cha"
            },
            {
                "spanish": "Necesito un médico",
                "french": "J'ai besoin d'un médecin",
                "frenchPronunciation": "yé be-SUÉN dön med-SÉN",
                "dutch": "Ik heb een dokter nodig",
                "dutchPronunciation": "ik jep en DOK-ter NO-dij",
                "italian": "Ho bisogno di un medico",
                "italianPronunciation": "o bi-SÓ-ño di un MÉ-di-co"
            },
            {
                "spanish": "Tengo seguro médico de viaje",
                "french": "J'ai une assurance voyage",
                "frenchPronunciation": "yé ün a-sü-RÁNS vua-YÁSH",
                "dutch": "Ik heb een reisverzekering",
                "dutchPronunciation": "ik jep en RÉIS-ver-se-ke-ring",
                "italian": "Ho un'assicurazione di viaggio",
                "italianPronunciation": "o u-na-ssi-cu-ra-TSIÓ-ne di VIÁ-yo"
            },
            {
                "spanish": "Bloqueador solar",
                "french": "De la crème solaire",
                "frenchPronunciation": "de la KREM so-LÉR",
                "dutch": "Zonnebrandcrème",
                "dutchPronunciation": "SO-ne-brant-krem",
                "italian": "La crema solare",
                "italianPronunciation": "la CRÉ-ma so-LÁ-re"
            }
        ]
    },
    {
        "id": "shopping",
        "label": "Compras",
        "emoji": "🛍️",
        "phrases": [
            {
                "spanish": "¿Cuánto cuesta esto?",
                "french": "Combien coûte ceci?",
                "frenchPronunciation": "kom-BIÉN KÚT se-SÍ",
                "dutch": "Hoeveel kost dit?",
                "dutchPronunciation": "JU-vél KOST dit",
                "italian": "Quanto costa questo?",
                "italianPronunciation": "KUÁN-to CÓS-ta KUÉS-to"
            },
            {
                "spanish": "¿Aceptan tarjeta de crédito?",
                "french": "Acceptez-vous les cartes de crédit?",
                "frenchPronunciation": "ak-sep-TÉ vu le KART de kre-DÍ",
                "dutch": "Accepteert u creditcards?",
                "dutchPronunciation": "ak-sep-TÉRT u KRE-dit-karts",
                "italian": "Accettate carte di credito?",
                "italianPronunciation": "a-che-TTÁ-te CÁR-te di CRÉ-di-to"
            },
            {
                "spanish": "¿Puedo probármelo?",
                "french": "Puis-je l'essayer?",
                "frenchPronunciation": "puiy le-se-YÉ",
                "dutch": "Mag ik het passen?",
                "dutchPronunciation": "maj ik jet PA-sen",
                "italian": "Posso provarlo?",
                "italianPronunciation": "PÓ-sso pro-VÁR-lo"
            },
            {
                "spanish": "¿Tiene una talla más grande / más pequeña?",
                "french": "Avez-vous une taille plus grande / plus petite?",
                "frenchPronunciation": "a-VÉ vu ün TÁY plü GRAND / plü pe-TÍT",
                "dutch": "Heeft u een grotere / kleinere maat?",
                "dutchPronunciation": "héft u en JRO-te-re / KLÉI-ne-re MÁT",
                "italian": "Avete una taglia più grande / più piccola?",
                "italianPronunciation": "a-VÉ-te Ú-na TÁ-llia piú GRÁN-de / piú PÍ-cco-la"
            },
            {
                "spanish": "¿Puede darme una bolsa?",
                "french": "Puis-je avoir un sac?",
                "frenchPronunciation": "puiy a-VUÁR ön SAK",
                "dutch": "Mag ik een tas?",
                "dutchPronunciation": "maj ik en TAS",
                "italian": "Mi può dare una busta?",
                "italianPronunciation": "mi PUÓ DÁ-re Ú-na BÚS-ta"
            },
            {
                "spanish": "Solo estoy mirando",
                "french": "Je regarde juste",
                "frenchPronunciation": "ye re-GÁRD YÜST",
                "dutch": "Ik kijk alleen maar",
                "dutchPronunciation": "ik KÉIK a-LÉN már",
                "italian": "Sto solo guardando",
                "italianPronunciation": "sto SÓ-lo guar-DÁN-do"
            },
            {
                "spanish": "¿Hacen tax free?",
                "french": "Faites-vous la détaxe?",
                "frenchPronunciation": "FET vu la de-TÁKS",
                "dutch": "Doet u aan tax free?",
                "dutchPronunciation": "dut u án taks FRÍ",
                "italian": "Fate il tax free?",
                "italianPronunciation": "FÁ-te il taks FRÍ"
            }
        ]
    },
    {
        "id": "money",
        "label": "Dinero y números",
        "emoji": "💶",
        "phrases": [
            {
                "spanish": "Uno, dos, tres",
                "french": "Un, deux, trois",
                "frenchPronunciation": "ÖN, DÖ, TRUÁ",
                "dutch": "Eén, twee, drie",
                "dutchPronunciation": "ÉN, TVÉ, DRÍ",
                "italian": "Uno, due, tre",
                "italianPronunciation": "Ú-no, DÚ-e, TRE"
            },
            {
                "spanish": "Cuatro, cinco, seis",
                "french": "Quatre, cinq, six",
                "frenchPronunciation": "KATR, SENK, SIS",
                "dutch": "Vier, vijf, zes",
                "dutchPronunciation": "VÍR, VÉIF, SES",
                "italian": "Quattro, cinque, sei",
                "italianPronunciation": "KUÁ-ttro, CHÍN-kue, SÉI"
            },
            {
                "spanish": "Siete, ocho, nueve, diez",
                "french": "Sept, huit, neuf, dix",
                "frenchPronunciation": "SET, UÍT, NÖF, DIS",
                "dutch": "Zeven, acht, negen, tien",
                "dutchPronunciation": "SE-ven, AJT, NE-jen, TÍN",
                "italian": "Sette, otto, nove, dieci",
                "italianPronunciation": "SÉ-tte, Ó-tto, NÓ-ve, DIÉ-chi"
            },
            {
                "spanish": "¿Puedo pagar en efectivo?",
                "french": "Puis-je payer en espèces?",
                "frenchPronunciation": "puiy pe-YÉ an es-PÉS",
                "dutch": "Kan ik contant betalen?",
                "dutchPronunciation": "kan ik kon-TANT be-TA-len",
                "italian": "Posso pagare in contanti?",
                "italianPronunciation": "PÓ-sso pa-GÁ-re in con-TÁN-ti"
            },
            {
                "spanish": "¿Dónde hay un cajero automático?",
                "french": "Où y a-t-il un distributeur?",
                "frenchPronunciation": "u ya-TÍL ön dis-tri-bü-TÖR",
                "dutch": "Waar is er een geldautomaat?",
                "dutchPronunciation": "vár is er en JELT-au-to-mát",
                "italian": "Dov'è un bancomat?",
                "italianPronunciation": "do-VÉ un BÁN-co-mat"
            },
            {
                "spanish": "Es demasiado caro",
                "french": "C'est trop cher",
                "frenchPronunciation": "se tro SHER",
                "dutch": "Dat is te duur",
                "dutchPronunciation": "dat is te DÜR",
                "italian": "È troppo caro",
                "italianPronunciation": "É TRÓ-ppo CÁ-ro"
            },
            {
                "spanish": "¿Me puede hacer un descuento?",
                "french": "Pouvez-vous me faire une réduction?",
                "frenchPronunciation": "pu-VÉ vu me FER ün re-dük-SIÓN",
                "dutch": "Kunt u korting geven?",
                "dutchPronunciation": "künt u KOR-ting JE-ven",
                "italian": "Mi può fare uno sconto?",
                "italianPronunciation": "mi puó FÁ-re Ú-no SCÓN-to"
            }
        ]
    },
    {
        "id": "directions",
        "label": "Direcciones",
        "emoji": "🗺️",
        "phrases": [
            {
                "spanish": "¿Dónde está...?",
                "french": "Où est...?",
                "frenchPronunciation": "u É",
                "dutch": "Waar is...?",
                "dutchPronunciation": "vár IS",
                "italian": "Dov'è...?",
                "italianPronunciation": "do-VÉ"
            },
            {
                "spanish": "Estoy perdido/a",
                "french": "Je suis perdu(e)",
                "frenchPronunciation": "ye sui per-DÜ",
                "dutch": "Ik ben verdwaald",
                "dutchPronunciation": "ik ben ver-DVÁLD",
                "italian": "Mi sono perso/a",
                "italianPronunciation": "mi SÓ-no PÉR-so"
            },
            {
                "spanish": "¿Puede mostrarme en el mapa?",
                "french": "Pouvez-vous me montrer sur la carte?",
                "frenchPronunciation": "pu-VÉ vu me mon-TRÉ sür la KÁRT",
                "dutch": "Kunt u het op de kaart laten zien?",
                "dutchPronunciation": "künt u jet op de KÁRT LA-ten sín",
                "italian": "Me lo può mostrare sulla mappa?",
                "italianPronunciation": "me lo PUÓ mos-TRÁ-re SÚ-lla MÁ-ppa"
            },
            {
                "spanish": "A la izquierda / a la derecha",
                "french": "À gauche / à droite",
                "frenchPronunciation": "a GÓSH / a DRUÁT",
                "dutch": "Links / rechts",
                "dutchPronunciation": "LINKS / REJTS",
                "italian": "A sinistra / a destra",
                "italianPronunciation": "a si-NÍS-tra / a DÉS-tra"
            },
            {
                "spanish": "Todo recto",
                "french": "Tout droit",
                "frenchPronunciation": "tu DRUÁ",
                "dutch": "Rechtdoor",
                "dutchPronunciation": "REJT-dor",
                "italian": "Sempre dritto",
                "italianPronunciation": "SÉM-pre DRÍ-tto"
            },
            {
                "spanish": "¿Está lejos / cerca?",
                "french": "C'est loin / près?",
                "frenchPronunciation": "se LUÉN / PRE",
                "dutch": "Is het ver / dichtbij?",
                "dutchPronunciation": "is jet VER / dijt-BÉI",
                "italian": "È lontano / vicino?",
                "italianPronunciation": "É lon-TÁ-no / vi-CHÍ-no"
            },
            {
                "spanish": "¿Cuánto se tarda a pie?",
                "french": "Combien de temps à pied?",
                "frenchPronunciation": "kom-BIÉN de TAN a PIÉ",
                "dutch": "Hoe lang is het lopen?",
                "dutchPronunciation": "ju LANG is jet LO-pen",
                "italian": "Quanto ci vuole a piedi?",
                "italianPronunciation": "KUÁN-to chi VUÓ-le a PIÉ-di"
            }
        ]
    },
    {
        "id": "general",
        "label": "General",
        "emoji": "💬",
        "phrases": [
            {
                "spanish": "No hablo francés / italiano / neerlandés",
                "french": "Je ne parle pas français / italien / néerlandais",
                "frenchPronunciation": "ye ne PARL pa fran-SÉ / i-ta-LIÉN / ne-er-lan-DÉ",
                "dutch": "Ik spreek geen Frans / Italiaans / Nederlands",
                "dutchPronunciation": "ik SPRÉK jén FRANS / i-ta-li-ÁNS / NE-der-lants",
                "italian": "Non parlo francese / italiano / olandese",
                "italianPronunciation": "non PÁR-lo fran-CHÉ-se / i-ta-LIÁ-no / o-lan-DÉ-se"
            },
            {
                "spanish": "¿Habla usted español?",
                "french": "Parlez-vous espagnol?",
                "frenchPronunciation": "par-LÉ vu es-pa-ÑÓL",
                "dutch": "Spreekt u Spaans?",
                "dutchPronunciation": "sprékt u SPÁNS",
                "italian": "Parla spagnolo?",
                "italianPronunciation": "PÁR-la spa-ÑÓ-lo"
            },
            {
                "spanish": "No entiendo",
                "french": "Je ne comprends pas",
                "frenchPronunciation": "ye ne kom-PRÁN pa",
                "dutch": "Ik begrijp het niet",
                "dutchPronunciation": "ik be-JRÉIP jet nít",
                "italian": "Non capisco",
                "italianPronunciation": "non ca-PÍS-co"
            },
            {
                "spanish": "¿Puede repetir, por favor?",
                "french": "Pouvez-vous répéter, s'il vous plaît?",
                "frenchPronunciation": "pu-VÉ vu re-pe-TÉ sil vu PLÉ",
                "dutch": "Kunt u dat herhalen, alstublieft?",
                "dutchPronunciation": "künt u dat jer-JA-len als-tu-BLÍFT",
                "italian": "Può ripetere, per favore?",
                "italianPronunciation": "PUÓ ri-PÉ-te-re per fa-VÓ-re"
            },
            {
                "spanish": "¿Dónde está el baño?",
                "french": "Où sont les toilettes?",
                "frenchPronunciation": "u son le tua-LÉT",
                "dutch": "Waar is het toilet?",
                "dutchPronunciation": "vár is jet tua-LÉT",
                "italian": "Dov'è il bagno?",
                "italianPronunciation": "do-VÉ il BÁ-ño"
            },
            {
                "spanish": "¿Tiene Wi-Fi?",
                "french": "Avez-vous le Wi-Fi?",
                "frenchPronunciation": "a-VÉ vu le uai-FÁI",
                "dutch": "Heeft u Wi-Fi?",
                "dutchPronunciation": "héft u uai-fái",
                "italian": "Avete il Wi-Fi?",
                "italianPronunciation": "a-VÉ-te il uái-fái"
            },
            {
                "spanish": "¿Nos puede tomar una foto?",
                "french": "Pouvez-vous nous prendre en photo?",
                "frenchPronunciation": "pu-VÉ vu nu PRANDR an fo-TÓ",
                "dutch": "Kunt u een foto van ons maken?",
                "dutchPronunciation": "künt u en FO-to van ons MA-ken",
                "italian": "Ci può fare una foto?",
                "italianPronunciation": "chi puó FÁ-re Ú-na FÓ-to"
            }
        ]
    }
];
