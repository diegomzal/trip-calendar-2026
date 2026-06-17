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
                "spanish": "Un vaso de agua, por favor",
                "french": "Un verre d'eau, s'il vous plaît",
                "frenchPronunciation": "ön VER DÓ sil vu PLÉ",
                "dutch": "Een glas water, alstublieft",
                "dutchPronunciation": "en JLAS VA-ter als-tu-BLÍFT",
                "italian": "Un bicchiere d'acqua, per favore",
                "italianPronunciation": "un bi-KIÉ-re DÁ-kua per fa-VÓ-re"
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
                "spanish": "Llame a la policía",
                "french": "Appelez la police",
                "frenchPronunciation": "a-pe-LÉ la po-LÍS",
                "dutch": "Bel de politie",
                "dutchPronunciation": "bel de po-LI-tsi",
                "italian": "Chiami la polizia",
                "italianPronunciation": "KIÁ-mi la po-li-TSÍ-a"
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
            }
        ]
    }
];
