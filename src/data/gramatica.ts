import type { JlptLevel } from "./kanji";

export type GrammarPoint = {
  title: string;
  explanation: string;
  pattern: string;
  level: JlptLevel;
  examples: { jp: string; romaji: string; pt: string }[];
};

export const gramatica: GrammarPoint[] = [
  {
    title: "Estrutura básica da frase",
    explanation:
      "A ordem padrão em japonês é Sujeito + Objeto + Verbo. O verbo sempre fica no final da frase.",
    pattern: "S + O + V",
    level: "N5",
    examples: [
      { jp: "私は寿司を食べます。", romaji: "Watashi wa sushi wo tabemasu.", pt: "Eu como sushi." },
      { jp: "彼は本を読みます。", romaji: "Kare wa hon wo yomimasu.", pt: "Ele lê um livro." },
    ],
  },
  {
    title: "Partícula は (wa)",
    explanation: "Marca o tópico da frase. Escreve-se は, mas lê-se 'wa' nessa função.",
    pattern: "Tópico + は + ...",
    level: "N5",
    examples: [
      { jp: "私は学生です。", romaji: "Watashi wa gakusei desu.", pt: "Eu sou estudante." },
      { jp: "今日は暑いです。", romaji: "Kyou wa atsui desu.", pt: "Hoje está quente." },
    ],
  },
  {
    title: "Partícula を (wo)",
    explanation: "Marca o objeto direto da ação, usada antes de verbos transitivos.",
    pattern: "Objeto + を + Verbo",
    level: "N5",
    examples: [
      { jp: "水を飲みます。", romaji: "Mizu wo nomimasu.", pt: "Eu bebo água." },
      {
        jp: "日本語を勉強します。",
        romaji: "Nihongo wo benkyou shimasu.",
        pt: "Eu estudo japonês.",
      },
    ],
  },
  {
    title: "Partículas に e で",
    explanation:
      "に indica destino, hora ou existência; で indica o lugar onde uma ação acontece ou o meio usado.",
    pattern: "Lugar + に/で",
    level: "N5",
    examples: [
      { jp: "学校に行きます。", romaji: "Gakkou ni ikimasu.", pt: "Vou para a escola." },
      {
        jp: "図書館で勉強します。",
        romaji: "Toshokan de benkyou shimasu.",
        pt: "Estudo na biblioteca.",
      },
    ],
  },
  {
    title: "です e perguntas com か",
    explanation:
      "です é a cópula polida ('ser/estar'). Para perguntar, acrescente か ao final, sem inverter a ordem.",
    pattern: "N/Adj + です(か)",
    level: "N5",
    examples: [
      { jp: "これは本です。", romaji: "Kore wa hon desu.", pt: "Isto é um livro." },
      { jp: "学生ですか。", romaji: "Gakusei desu ka?", pt: "Você é estudante?" },
    ],
  },
  {
    title: "Adjetivos い e な",
    explanation:
      "い-adjetivos conjugam sozinhos (高い→高くない). な-adjetivos precisam de な antes do substantivo.",
    pattern: "い-adj + N / な-adj + な + N",
    level: "N5",
    examples: [
      { jp: "高い山です。", romaji: "Takai yama desu.", pt: "É uma montanha alta." },
      { jp: "静かな部屋。", romaji: "Shizuka na heya.", pt: "Um quarto silencioso." },
    ],
  },
  {
    title: "Forma て + ください",
    explanation: "Usada para pedir algo de forma educada.",
    pattern: "V-て + ください",
    level: "N5",
    examples: [
      {
        jp: "ちょっと待ってください。",
        romaji: "Chotto matte kudasai.",
        pt: "Espere um pouco, por favor.",
      },
      { jp: "見せてください。", romaji: "Misete kudasai.", pt: "Mostre-me, por favor." },
    ],
  },
  {
    title: "〜たい (querer fazer)",
    explanation: "Anexado à raiz masu do verbo, expressa desejo do falante.",
    pattern: "V-raiz + たい",
    level: "N5",
    examples: [
      { jp: "日本へ行きたいです。", romaji: "Nihon e ikitai desu.", pt: "Quero ir ao Japão." },
      { jp: "寿司が食べたい。", romaji: "Sushi ga tabetai.", pt: "Quero comer sushi." },
    ],
  },
  {
    title: "〜ている (ação em curso / estado)",
    explanation: "Indica ação em andamento ou estado resultante de uma ação.",
    pattern: "V-て + いる",
    level: "N4",
    examples: [
      {
        jp: "今、勉強しています。",
        romaji: "Ima, benkyou shite imasu.",
        pt: "Estou estudando agora.",
      },
      { jp: "彼は結婚しています。", romaji: "Kare wa kekkon shite imasu.", pt: "Ele é casado." },
    ],
  },
  {
    title: "Forma potencial (poder fazer)",
    explanation: "Verbos る → られる; verbos う → forma え + る. する → できる.",
    pattern: "V-potencial",
    level: "N4",
    examples: [
      { jp: "日本語が話せます。", romaji: "Nihongo ga hanasemasu.", pt: "Consigo falar japonês." },
      {
        jp: "刺身が食べられますか。",
        romaji: "Sashimi ga taberaremasu ka?",
        pt: "Você consegue comer sashimi?",
      },
    ],
  },
  {
    title: "〜なければならない (obrigação)",
    explanation: "Expressa algo que deve ser feito. Versão casual: 〜なきゃ / 〜ないと.",
    pattern: "V-ない (sem い) + ければならない",
    level: "N4",
    examples: [
      {
        jp: "早く帰らなければなりません。",
        romaji: "Hayaku kaeranakereba narimasen.",
        pt: "Preciso voltar cedo.",
      },
      {
        jp: "薬を飲まないといけない。",
        romaji: "Kusuri wo nomanai to ikenai.",
        pt: "Tenho que tomar o remédio.",
      },
    ],
  },
  {
    title: "〜たら / 〜ば (condicional)",
    explanation: "たら indica 'se/quando' com foco no resultado; ば é mais hipotético e formal.",
    pattern: "V-たら / V-ば",
    level: "N4",
    examples: [
      {
        jp: "雨が降ったら、行きません。",
        romaji: "Ame ga futtara, ikimasen.",
        pt: "Se chover, não vou.",
      },
      { jp: "安ければ買います。", romaji: "Yasukereba kaimasu.", pt: "Se for barato, eu compro." },
    ],
  },
  {
    title: "〜と思う (achar que)",
    explanation: "Expressa opinião. O verbo antes de と fica na forma simples.",
    pattern: "Forma simples + と思う",
    level: "N4",
    examples: [
      { jp: "彼は来ると思います。", romaji: "Kare wa kuru to omoimasu.", pt: "Acho que ele vem." },
      { jp: "難しいと思った。", romaji: "Muzukashii to omotta.", pt: "Achei difícil." },
    ],
  },
  {
    title: "Forma passiva 〜られる",
    explanation: "Indica que o sujeito sofre a ação; muitas vezes com nuance de incômodo.",
    pattern: "V-passiva",
    level: "N4",
    examples: [
      {
        jp: "先生に褒められました。",
        romaji: "Sensei ni homeraremashita.",
        pt: "Fui elogiado pelo professor.",
      },
      { jp: "雨に降られた。", romaji: "Ame ni furareta.", pt: "Fui pego pela chuva." },
    ],
  },
  {
    title: "〜ようになる / 〜ことにする",
    explanation:
      "ようになる marca mudança gradual de estado ou habilidade; ことにする marca uma decisão pessoal.",
    pattern: "V-辞書 + ようになる / ことにする",
    level: "N3",
    examples: [
      {
        jp: "漢字が読めるようになった。",
        romaji: "Kanji ga yomeru you ni natta.",
        pt: "Passei a conseguir ler kanji.",
      },
      {
        jp: "毎朝走ることにしました。",
        romaji: "Maiasa hashiru koto ni shimashita.",
        pt: "Decidi correr toda manhã.",
      },
    ],
  },
  {
    title: "〜わけだ / 〜はずだ",
    explanation: "わけだ explica uma conclusão lógica; はずだ indica expectativa fundamentada.",
    pattern: "Forma simples + わけだ / はずだ",
    level: "N3",
    examples: [
      {
        jp: "彼は日本育ちだ。上手なわけだ。",
        romaji: "Kare wa Nihon sodachi da. Jouzu na wake da.",
        pt: "Ele cresceu no Japão. Por isso é bom.",
      },
      {
        jp: "もう着いているはずです。",
        romaji: "Mou tsuite iru hazu desu.",
        pt: "Ele já deve ter chegado.",
      },
    ],
  },
  {
    title: "〜ながら / 〜たびに",
    explanation: "ながら indica ações simultâneas; たびに indica 'toda vez que'.",
    pattern: "V-raiz + ながら / V-辞書 + たびに",
    level: "N3",
    examples: [
      {
        jp: "音楽を聞きながら勉強する。",
        romaji: "Ongaku wo kikinagara benkyou suru.",
        pt: "Estudo ouvindo música.",
      },
      {
        jp: "会うたびに背が伸びる。",
        romaji: "Au tabi ni se ga nobiru.",
        pt: "Toda vez que o vejo, está mais alto.",
      },
    ],
  },
  {
    title: "〜ば〜ほど",
    explanation: "Expressa proporção: quanto mais X, mais Y.",
    pattern: "V-ば + V-辞書 + ほど",
    level: "N3",
    examples: [
      {
        jp: "練習すればするほど上手になる。",
        romaji: "Renshuu sureba suru hodo jouzu ni naru.",
        pt: "Quanto mais pratica, melhor fica.",
      },
      {
        jp: "安ければ安いほどいい。",
        romaji: "Yasukereba yasui hodo ii.",
        pt: "Quanto mais barato, melhor.",
      },
    ],
  },
  {
    title: "〜に基づいて / 〜をめぐって",
    explanation: "に基づいて = com base em; をめぐって = em torno de (um tema em disputa).",
    pattern: "N + に基づいて / をめぐって",
    level: "N2",
    examples: [
      {
        jp: "データに基づいて判断する。",
        romaji: "Deeta ni motozuite handan suru.",
        pt: "Julgar com base nos dados.",
      },
      {
        jp: "法案をめぐって議論が続く。",
        romaji: "Houan wo megutte giron ga tsuzuku.",
        pt: "O debate continua em torno do projeto de lei.",
      },
    ],
  },
  {
    title: "〜わけではない / 〜どころか",
    explanation:
      "わけではない nega parcialmente uma suposição; どころか indica que a realidade é o oposto, e em grau maior.",
    pattern: "Forma simples + わけではない / どころか",
    level: "N2",
    examples: [
      {
        jp: "嫌いなわけではない。",
        romaji: "Kirai na wake dewa nai.",
        pt: "Não é que eu não goste.",
      },
      {
        jp: "休むどころか、もっと働いた。",
        romaji: "Yasumu dokoro ka, motto hataraita.",
        pt: "Longe de descansar, trabalhei mais.",
      },
    ],
  },
  {
    title: "〜次第 / 〜上で",
    explanation: "次第 = assim que / dependendo de; 上で = depois de (e com base nisso).",
    pattern: "V-raiz + 次第 / V-た + 上で",
    level: "N2",
    examples: [
      {
        jp: "着き次第、連絡します。",
        romaji: "Tsuki shidai, renraku shimasu.",
        pt: "Assim que chegar, aviso.",
      },
      {
        jp: "検討した上で決めます。",
        romaji: "Kentou shita ue de kimemasu.",
        pt: "Decidirei depois de analisar.",
      },
    ],
  },
  {
    title: "〜ざるを得ない / 〜てやまない",
    explanation:
      "ざるを得ない = não ter escolha senão; てやまない = sentimento intenso e contínuo (formal).",
    pattern: "V-ない (raiz) + ざるを得ない",
    level: "N1",
    examples: [
      {
        jp: "認めざるを得ない。",
        romaji: "Mitomezaru wo enai.",
        pt: "Não tenho como não admitir.",
      },
      {
        jp: "成功を願ってやみません。",
        romaji: "Seikou wo negatte yamimasen.",
        pt: "Desejo sinceramente seu sucesso.",
      },
    ],
  },
  {
    title: "〜きらいがある / 〜にたえない",
    explanation:
      "きらいがある = tem a tendência (negativa) de; にたえない = insuportável / não digno de.",
    pattern: "V-辞書 + きらいがある",
    level: "N1",
    examples: [
      {
        jp: "彼は物事を悲観するきらいがある。",
        romaji: "Kare wa monogoto wo hikan suru kirai ga aru.",
        pt: "Ele tende a ver tudo de forma pessimista.",
      },
      {
        jp: "見るにたえない光景。",
        romaji: "Miru ni taenai koukei.",
        pt: "Uma cena insuportável de se ver.",
      },
    ],
  },
  {
    title: "〜ともなると / 〜であれ",
    explanation: "ともなると = quando se chega a tal ponto/posição; であれ = seja qual for.",
    pattern: "N + ともなると / であれ",
    level: "N1",
    examples: [
      {
        jp: "社長ともなると責任が重い。",
        romaji: "Shachou to mo naru to sekinin ga omoi.",
        pt: "Quando se é presidente, a responsabilidade é grande.",
      },
      {
        jp: "理由が何であれ、遅刻は遅刻だ。",
        romaji: "Riyuu ga nan de are, chikoku wa chikoku da.",
        pt: "Seja qual for o motivo, atraso é atraso.",
      },
    ],
  },
];

export const gramaticaByLevel = (level: JlptLevel) => gramatica.filter((g) => g.level === level);
