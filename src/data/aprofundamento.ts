import type { VocabItem } from "./vocabulario";
import type { GrammarPoint } from "./gramatica";
/** Supplementary pedagogical levels, not official JLPT lists. */
export const vocabularioAprofundamento: VocabItem[] = [
  {
    "word": "おかわり",
    "reading": "おかわり",
    "meaning": "mais uma porção",
    "type": "substantivo",
    "level": "N5"
  },
  {
    "word": "持ち物",
    "reading": "もちもの",
    "meaning": "pertences",
    "type": "substantivo",
    "level": "N5"
  },
  {
    "word": "入口",
    "reading": "いりぐち",
    "meaning": "entrada",
    "type": "substantivo",
    "level": "N5"
  },
  {
    "word": "出口",
    "reading": "でぐち",
    "meaning": "saída",
    "type": "substantivo",
    "level": "N5"
  },
  {
    "word": "弁当箱",
    "reading": "べんとうばこ",
    "meaning": "recipiente de marmita",
    "type": "substantivo",
    "level": "N5"
  },
  {
    "word": "乗り換え",
    "reading": "のりかえ",
    "meaning": "baldeação",
    "type": "substantivo",
    "level": "N4"
  },
  {
    "word": "忘れ物",
    "reading": "わすれもの",
    "meaning": "objeto esquecido",
    "type": "substantivo",
    "level": "N4"
  },
  {
    "word": "待ち合わせ",
    "reading": "まちあわせ",
    "meaning": "encontro combinado",
    "type": "substantivo",
    "level": "N4"
  },
  {
    "word": "日帰り",
    "reading": "ひがえり",
    "meaning": "ida e volta no mesmo dia",
    "type": "substantivo",
    "level": "N4"
  },
  {
    "word": "作り方",
    "reading": "つくりかた",
    "meaning": "modo de preparo",
    "type": "substantivo",
    "level": "N4"
  },
  {
    "word": "食品ロス",
    "reading": "しょくひんろす",
    "meaning": "desperdício de alimentos",
    "type": "substantivo",
    "level": "N3"
  },
  {
    "word": "防災用品",
    "reading": "ぼうさいようひん",
    "meaning": "suprimentos para emergências",
    "type": "substantivo",
    "level": "N3"
  },
  {
    "word": "働き方",
    "reading": "はたらきかた",
    "meaning": "modo de trabalhar",
    "type": "substantivo",
    "level": "N3"
  },
  {
    "word": "混雑状況",
    "reading": "こんざつじょうきょう",
    "meaning": "situação de lotação",
    "type": "substantivo",
    "level": "N3"
  },
  {
    "word": "生活習慣",
    "reading": "せいかつしゅうかん",
    "meaning": "hábitos de vida",
    "type": "substantivo",
    "level": "N3"
  },
  {
    "word": "意思決定",
    "reading": "いしけってい",
    "meaning": "tomada de decisão",
    "type": "substantivo",
    "level": "N2"
  },
  {
    "word": "費用対効果",
    "reading": "ひようたいこうか",
    "meaning": "relação custo-benefício",
    "type": "substantivo",
    "level": "N2"
  },
  {
    "word": "合意形成",
    "reading": "ごういけいせい",
    "meaning": "construção de consenso",
    "type": "substantivo",
    "level": "N2"
  },
  {
    "word": "再生可能",
    "reading": "さいせいかのう",
    "meaning": "renovável",
    "type": "adjetivo",
    "level": "N2"
  },
  {
    "word": "持続可能",
    "reading": "じぞくかのう",
    "meaning": "sustentável",
    "type": "adjetivo",
    "level": "N2"
  },
  {
    "word": "説明責任",
    "reading": "せつめいせきにん",
    "meaning": "responsabilidade de prestar contas",
    "type": "substantivo",
    "level": "N1"
  },
  {
    "word": "利益相反",
    "reading": "りえきそうはん",
    "meaning": "conflito de interesses",
    "type": "substantivo",
    "level": "N1"
  },
  {
    "word": "機会損失",
    "reading": "きかいそんしつ",
    "meaning": "perda de oportunidade",
    "type": "substantivo",
    "level": "N1"
  },
  {
    "word": "是正措置",
    "reading": "ぜせいそち",
    "meaning": "medida corretiva",
    "type": "substantivo",
    "level": "N1"
  },
  {
    "word": "予見可能性",
    "reading": "よけんかのうせい",
    "meaning": "previsibilidade",
    "type": "substantivo",
    "level": "N1"
  }
];
export const gramaticaAprofundamento: GrammarPoint[] = [
  {
    "level": "N5",
    "title": "Lugar da ação com で",
    "pattern": "Lugar + で + verbo",
    "explanation": "Marca onde uma ação acontece.",
    "examples": [
      {
        "jp": "図書館で本を読みます。",
        "romaji": "Toshokan de hon o yomimasu.",
        "pt": "Leio um livro na biblioteca."
      }
    ]
  },
  {
    "level": "N5",
    "title": "Pedido no restaurante",
    "pattern": "Substantivo + をください",
    "explanation": "Pedido educado de um objeto ou alimento.",
    "examples": [
      {
        "jp": "水をください。",
        "romaji": "Mizu o kudasai.",
        "pt": "Água, por favor."
      }
    ]
  },
  {
    "level": "N4",
    "title": "Sequência com てから",
    "pattern": "Verbo na forma て + から",
    "explanation": "A segunda ação acontece depois da primeira.",
    "examples": [
      {
        "jp": "ご飯を食べてから、勉強します。",
        "romaji": "Gohan o tabete kara, benkyou shimasu.",
        "pt": "Depois de comer, estudo."
      }
    ]
  },
  {
    "level": "N4",
    "title": "Preparação com ておく",
    "pattern": "Verbo na forma て + おく",
    "explanation": "Fazer algo antecipadamente como preparação.",
    "examples": [
      {
        "jp": "ホテルを予約しておきます。",
        "romaji": "Hoteru o yoyaku shite okimasu.",
        "pt": "Reservo o hotel com antecedência."
      }
    ]
  },
  {
    "level": "N3",
    "title": "Mudança com ようになる",
    "pattern": "Verbo potencial + ようになる",
    "explanation": "Mudança de capacidade ou hábito.",
    "examples": [
      {
        "jp": "日本語の新聞が読めるようになりました。",
        "romaji": "Nihongo no shinbun ga yomeru you ni narimashita.",
        "pt": "Passei a conseguir ler jornais em japonês."
      }
    ]
  },
  {
    "level": "N3",
    "title": "Conclusão com わけだ",
    "pattern": "Forma simples + わけだ",
    "explanation": "Conclusão lógica a partir de uma informação anterior.",
    "examples": [
      {
        "jp": "毎日練習しているから、上手なわけです。",
        "romaji": "Mainichi renshuu shite iru kara, jouzu na wake desu.",
        "pt": "Como pratica todos os dias, é compreensível que seja habilidoso."
      }
    ]
  },
  {
    "level": "N2",
    "title": "Contraste com ものの",
    "pattern": "Forma simples + ものの",
    "explanation": "Reconhece um fato e apresenta um resultado contrário ao esperado.",
    "examples": [
      {
        "jp": "予約したものの、予定が変わって行けませんでした。",
        "romaji": "Yoyaku shita mono no, yotei ga kawatte ikemasen deshita.",
        "pt": "Embora tivesse feito a reserva, meus planos mudaram e não pude ir."
      }
    ]
  },
  {
    "level": "N2",
    "title": "Nem sempre: とは限らない",
    "pattern": "Forma simples + とは限らない",
    "explanation": "Nega que uma afirmação seja sempre verdadeira.",
    "examples": [
      {
        "jp": "値段が高いからといって、品質がよいとは限りません。",
        "romaji": "Nedan ga takai kara to itte, hinshitsu ga yoi to wa kagirimasen.",
        "pt": "Só porque o preço é alto, a qualidade não é necessariamente boa."
      }
    ]
  },
  {
    "level": "N1",
    "title": "Decisão com を踏まえて",
    "pattern": "Substantivo + を踏まえて",
    "explanation": "Considerar fatos como base para uma decisão.",
    "examples": [
      {
        "jp": "調査の結果を踏まえて、計画を見直す必要があります。",
        "romaji": "Chousa no kekka o fumaete, keikaku o minaosu hitsuyou ga arimasu.",
        "pt": "É necessário reavaliar o plano levando em conta os resultados da pesquisa."
      }
    ]
  },
  {
    "level": "N1",
    "title": "Objetivo formal com べく",
    "pattern": "Verbo no dicionário + べく（する → すべく）",
    "explanation": "Objetivo de uma ação deliberada em linguagem formal.",
    "examples": [
      {
        "jp": "問題を解決すべく、専門家と協議を重ねました。",
        "romaji": "Mondai o kaiketsu subeku, senmonka to kyougi o kasanemashita.",
        "pt": "Realizamos várias discussões com especialistas para resolver o problema."
      }
    ]
  }
];
