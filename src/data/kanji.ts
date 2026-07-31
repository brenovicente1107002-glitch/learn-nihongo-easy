export type JlptLevel = "N5" | "N4" | "N3" | "N2" | "N1";

export const jlptLevels: JlptLevel[] = ["N5", "N4", "N3", "N2", "N1"];

export const jlptInfo: Record<JlptLevel, { title: string; description: string }> = {
  N5: {
    title: "N5 — Iniciante",
    description: "Kana completo, ~100 kanji, ~800 palavras. Frases simples do dia a dia.",
  },
  N4: {
    title: "N4 — Básico",
    description: "~300 kanji, ~1.500 palavras. Conversas cotidianas e forma casual.",
  },
  N3: {
    title: "N3 — Intermediário",
    description: "~650 kanji, ~3.700 palavras. Ponte entre o básico e o avançado.",
  },
  N2: {
    title: "N2 — Intermediário avançado",
    description: "~1.000 kanji, ~6.000 palavras. Jornais, notícias e ambiente de trabalho.",
  },
  N1: {
    title: "N1 — Avançado",
    description: "~2.000 kanji, ~10.000 palavras. Textos abstratos, literários e acadêmicos.",
  },
};

export type Kanji = {
  char: string;
  meaning: string;
  readings: string[];
  level: JlptLevel;
};

const parse = (level: JlptLevel, raw: string): Kanji[] =>
  raw
    .trim()
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean)
    .map((line) => {
      const [char = "", meaning = "", readings = ""] = line.split("|");
      return {
        char: char.trim(),
        meaning: meaning.trim(),
        readings: readings.split(",").map((r) => r.trim()),
        level,
      };
    });

const n5 = `
一|um|ichi,hitotsu
二|dois|ni,futatsu
三|três|san,mittsu
四|quatro|shi,yon
五|cinco|go,itsutsu
六|seis|roku,muttsu
七|sete|shichi,nana
八|oito|hachi,yattsu
九|nove|kyuu,kokonotsu
十|dez|juu,tou
百|cem|hyaku
千|mil|sen,chi
万|dez mil|man,ban
円|iene/círculo|en,marui
日|dia/sol|nichi,hi,bi
月|mês/lua|getsu,tsuki
火|fogo|ka,hi
水|água|sui,mizu
木|árvore|moku,ki
金|ouro/dinheiro|kin,kane
土|terra|do,tsuchi
年|ano|nen,toshi
時|hora|ji,toki
分|minuto/dividir|fun,wakeru
半|metade|han,nakaba
今|agora|kon,ima
週|semana|shuu
曜|dia da semana|you
朝|manhã|chou,asa
昼|meio-dia|chuu,hiru
夜|noite|ya,yoru
毎|cada|mai
午|meio-dia|go
前|antes/frente|zen,mae
後|depois/atrás|go,ato,ushiro
人|pessoa|jin,nin,hito
男|homem|dan,otoko
女|mulher|jo,onna
子|criança|shi,ko
父|pai|fu,chichi
母|mãe|bo,haha
友|amigo|yuu,tomo
名|nome|mei,na
先|antes/ponta|sen,saki
生|vida/nascer|sei,ikiru,umareru
学|estudar|gaku,manabu
校|escola|kou
語|língua|go,kataru
本|livro/origem|hon,moto
書|escrever|sho,kaku
読|ler|doku,yomu
話|falar/história|wa,hanasu
聞|ouvir/perguntar|bun,kiku
言|dizer|gen,iu
見|ver|ken,miru
行|ir|kou,iku
来|vir|rai,kuru
帰|voltar para casa|ki,kaeru
出|sair|shutsu,deru
入|entrar|nyuu,hairu
立|ficar de pé|ritsu,tatsu
休|descansar|kyuu,yasumu
食|comer|shoku,taberu
飲|beber|in,nomu
買|comprar|bai,kau
売|vender|bai,uru
車|carro|sha,kuruma
電|eletricidade|den
駅|estação|eki
社|empresa/santuário|sha,yashiro
店|loja|ten,mise
国|país|koku,kuni
外|fora|gai,soto
内|dentro|nai,uchi
上|acima|jou,ue,noboru
下|abaixo|ka,shita,kudaru
中|meio/dentro|chuu,naka
大|grande|dai,ookii
小|pequeno|shou,chiisai
高|alto/caro|kou,takai
安|barato/tranquilo|an,yasui
新|novo|shin,atarashii
古|velho|ko,furui
長|longo/chefe|chou,nagai
多|muito|ta,ooi
少|pouco|shou,sukunai
好|gostar|kou,suki
白|branco|haku,shiroi
黒|preto|koku,kuroi
赤|vermelho|seki,akai
青|azul|sei,aoi
山|montanha|san,yama
川|rio|sen,kawa
田|arrozal|den,ta
花|flor|ka,hana
天|céu|ten,ame
気|espírito/energia|ki,ke
雨|chuva|u,ame
右|direita|u,migi
左|esquerda|sa,hidari
北|norte|hoku,kita
南|sul|nan,minami
東|leste|tou,higashi
西|oeste|sei,nishi
口|boca|kou,kuchi
目|olho|moku,me
耳|orelha|ji,mimi
手|mão|shu,te
足|pé/bastar|soku,ashi
体|corpo|tai,karada
何|o quê|ka,nani
`;

const n4 = `
会|encontrar|kai,au
同|mesmo|dou,onaji
事|coisa/assunto|ji,koto
自|próprio|ji,mizukara
社|sociedade|sha
発|partir/emitir|hatsu
者|pessoa (sufixo)|sha,mono
地|terra/local|chi,ji
業|negócio/indústria|gyou,waza
方|direção/pessoa|hou,kata
新|novo|shin,arata
場|lugar|jou,ba
員|membro|in
立|estabelecer|ritsu,tatsu
開|abrir|kai,hiraku
手|mão/habilidade|shu,te
力|força|ryoku,chikara
問|pergunta|mon,tou
代|geração/substituir|dai,kawari
明|claro/brilhante|mei,akarui
動|mover|dou,ugoku
京|capital|kyou
目|olho/meta|moku,me
通|passar/comutar|tsuu,tooru
言|palavra|gen,koto
理|razão/lógica|ri
田|campo|den,ta
主|principal/dono|shu,nushi
題|tópico|dai
不|não (negativo)|fu,bu
成|tornar-se|sei,naru
機|máquina/oportunidade|ki
場|cena|jou
作|fazer/criar|saku,tsukuru
用|usar|you,mochiiru
持|segurar|ji,motsu
待|esperar|tai,matsu
急|pressa|kyuu,isogu
乗|montar/embarcar|jou,noru
使|usar|shi,tsukau
運|transportar/sorte|un,hakobu
送|enviar|sou,okuru
着|vestir/chegar|chaku,kiru
歩|caminhar|ho,aruku
走|correr|sou,hashiru
起|levantar|ki,okiru
寝|dormir|shin,neru
働|trabalhar|dou,hataraku
借|pegar emprestado|shaku,kariru
貸|emprestar|tai,kasu
返|devolver|hen,kaesu
思|pensar|shi,omou
知|saber|chi,shiru
考|considerar|kou,kangaeru
教|ensinar|kyou,oshieru
習|aprender|shuu,narau
研|pesquisar|ken
究|investigar|kyuu
試|tentar/testar|shi,tamesu
験|experimentar|ken
質|qualidade/pergunta|shitsu
答|responder|tou,kotaeru
説|explicar/teoria|setsu
親|pai/íntimo|shin,oya
兄|irmão mais velho|kei,ani
弟|irmão mais novo|tei,otouto
姉|irmã mais velha|shi,ane
妹|irmã mais nova|mai,imouto
`;

const n3 = `
政|política|sei
議|deliberação|gi
民|povo|min
連|conectar|ren,tsuranaru
対|contra/par|tai
部|parte/seção|bu
合|combinar|gou,au
市|cidade/mercado|shi
内|interno|nai,uchi
相|mútuo/aspecto|sou,ai
定|decidir/fixo|tei,sadameru
回|voltar/vez|kai,mawaru
選|escolher|sen,erabu
米|arroz/EUA|bei,kome
実|fruto/realidade|jitsu,mi
関|relação/barreira|kan,seki
決|decidir|ketsu,kimeru
全|tudo/completo|zen,mattaku
表|superfície/expressar|hyou,omote
戦|guerra/lutar|sen,tatakau
経|passar/gerir|kei,heru
最|o mais|sai,mottomo
現|atual/aparecer|gen,arawareru
調|investigar/tom|chou,shiraberu
化|mudança|ka,bakeru
当|acertar/este|tou,ataru
約|promessa/cerca de|yaku
必|necessário|hitsu,kanarazu
要|necessidade/exigir|you,kaname
求|buscar|kyuu,motomeru
性|natureza/gênero|sei
制|controlar/sistema|sei
反|oposto|han,soru
種|tipo/semente|shu,tane
続|continuar|zoku,tsuzuku
放|soltar/liberar|hou,hanasu
比|comparar|hi,kuraberu
非|não/injusto|hi
支|apoiar/ramo|shi,sasaeru
残|restar|zan,nokoru
点|ponto|ten
師|mestre/professor|shi
念|pensamento|nen
給|fornecer|kyuu
断|cortar/recusar|dan,kotowaru
評|avaliar|hyou
認|reconhecer|nin,mitomeru
確|certeza|kaku,tashika
違|diferir/errado|i,chigau
守|proteger|shu,mamoru
迷|se perder/hesitar|mei,mayou
慣|acostumar|kan,nareru
`;

const n2 = `
価|valor/preço|ka
益|benefício|eki
革|reforma/couro|kaku,kawa
供|oferecer|kyou,sonaeru
均|média/igual|kin
筋|músculo/linha|kin,suji
勤|serviço/trabalhar|kin,tsutomeru
互|mútuo|go,tagai
控|abster/anotar|kou,hikaeru
攻|atacar|kou,semeru
豪|opulento/forte|gou
穀|grão|koku
込|incluir/entrar|komu
婚|casamento|kon
債|dívida|sai
歳|idade/ano|sai
載|carregar/publicar|sai,noseru
剤|remédio/dose|zai
咲|florescer|saku
惨|miserável|san
賛|elogiar/apoiar|san
氏|senhor/clã|shi,uji
執|executar/apegar|shitsu,toru
趣|gosto/hobby|shu,omomuki
需|demanda|ju
儒|confucionismo|ju
充|preencher|juu,ateru
柔|suave/flexível|juu,yawarakai
獣|besta|juu,kemono
巡|patrulhar/circular|jun,meguru
盾|escudo|jun,tate
瞬|instante|shun,matataku
償|compensar|shou,tsugunau
礁|recife|shou
鐘|sino|shou,kane
壌|solo|jou
畳|tatami/dobrar|jou,tatamu
飾|decorar|shoku,kazaru
殖|multiplicar|shoku,fueru
拭|limpar/enxugar|shoku,fuku
辱|humilhação|joku,hazukashimeru
伸|esticar|shin,nobiru
辛|picante/duro|shin,karai
審|julgar/examinar|shin
震|tremer|shin,furueru
薪|lenha|shin,takigi
尽|esgotar|jin,tsukusu
迅|rápido|jin
陣|formação/campo|jin
`;

const n1 = `
且|além disso|katsu
劣|inferior|retsu,otoru
拐|sequestrar|kai
劾|acusar|gai
懐|nostalgia/peito|kai,natsukashii
邪|maligno|ja,yokoshima
遮|bloquear|sha,saegiru
蛇|serpente|ja,hebi
酌|servir bebida|shaku,kumu
爵|título nobre|shaku
朱|vermelho vivo|shu
狩|caçar|shu,karu
殊|especial|shu,koto
珠|pérola|shu,tama
儒|erudito|ju
囚|prisioneiro|shuu
臭|cheiro ruim|shuu,kusai
愁|tristeza|shuu,ureeru
酬|recompensa|shuu
醜|feio|shuu,minikui
汁|caldo/sopa|juu,shiru
充|suficiente|juu
渋|adstringente/relutante|juu,shibui
銃|arma de fogo|juu
叔|tio/tia|shuku
淑|graciosa|shuku
粛|solene|shuku
塾|escola preparatória|juku
俊|talentoso|shun
准|semi/aprovar|jun
循|circular|jun
殉|martírio|jun
潤|umedecer/lucro|jun,uruou
遵|obedecer|jun
如|como/igual|jo,nyo
叙|narrar/conferir|jo
徐|gradualmente|jo
升|medida (shou)|shou,masu
抄|extrato|shou
肖|semelhança|shou
尚|ainda/nobre|shou,nao
宵|começo da noite|shou,yoi
症|sintoma/doença|shou
祥|auspicioso|shou
渉|negociar/atravessar|shou
訟|processo/litígio|shou
彰|claro/elogiar|shou
`;

export const kanji: Kanji[] = [
  ...parse("N5", n5),
  ...parse("N4", n4),
  ...parse("N3", n3),
  ...parse("N2", n2),
  ...parse("N1", n1),
];

export const kanjiByLevel = (level: JlptLevel) => kanji.filter((k) => k.level === level);
