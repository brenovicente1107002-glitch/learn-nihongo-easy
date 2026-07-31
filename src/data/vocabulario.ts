import type { JlptLevel } from "./kanji";

export type VocabItem = {
  word: string;
  reading: string;
  meaning: string;
  type: string;
  level: JlptLevel;
};

const parse = (level: JlptLevel, raw: string): VocabItem[] =>
  raw
    .trim()
    .split("\n")
    .map((l) => l.trim())
    .filter(Boolean)
    .map((line) => {
      const [word = "", reading = "", meaning = "", type = "substantivo"] = line.split("|");
      return {
        word: word.trim(),
        reading: reading.trim(),
        meaning: meaning.trim(),
        type: type.trim(),
        level,
      };
    });

const n5 = `
こんにちは|konnichiwa|olá / boa tarde|saudação
おはよう|ohayou|bom dia|saudação
こんばんは|konbanwa|boa noite (chegada)|saudação
おやすみなさい|oyasuminasai|boa noite (dormir)|saudação
さようなら|sayounara|adeus|saudação
ありがとう|arigatou|obrigado|saudação
すみません|sumimasen|com licença / desculpe|saudação
はじめまして|hajimemashite|prazer em conhecer|saudação
いただきます|itadakimasu|antes de comer|expressão
ごちそうさま|gochisousama|depois de comer|expressão
私|watashi|eu|pronome
あなた|anata|você|pronome
彼|kare|ele|pronome
彼女|kanojo|ela|pronome
水|mizu|água|substantivo
お茶|ocha|chá|substantivo
ご飯|gohan|arroz / refeição|substantivo
魚|sakana|peixe|substantivo
肉|niku|carne|substantivo
猫|neko|gato|substantivo
犬|inu|cachorro|substantivo
本|hon|livro|substantivo
学校|gakkou|escola|substantivo
先生|sensei|professor|substantivo
学生|gakusei|estudante|substantivo
友達|tomodachi|amigo|substantivo
家|ie|casa|substantivo
車|kuruma|carro|substantivo
電車|densha|trem|substantivo
駅|eki|estação|substantivo
今日|kyou|hoje|tempo
明日|ashita|amanhã|tempo
昨日|kinou|ontem|tempo
毎日|mainichi|todos os dias|tempo
時間|jikan|tempo / hora|tempo
食べる|taberu|comer|verbo
飲む|nomu|beber|verbo
見る|miru|ver / olhar|verbo
聞く|kiku|ouvir / perguntar|verbo
話す|hanasu|falar|verbo
読む|yomu|ler|verbo
書く|kaku|escrever|verbo
行く|iku|ir|verbo
来る|kuru|vir|verbo
する|suru|fazer|verbo
買う|kau|comprar|verbo
分かる|wakaru|entender|verbo
良い|yoi / ii|bom|adjetivo
悪い|warui|ruim|adjetivo
新しい|atarashii|novo|adjetivo
古い|furui|velho|adjetivo
大きい|ookii|grande|adjetivo
小さい|chiisai|pequeno|adjetivo
高い|takai|alto / caro|adjetivo
安い|yasui|barato|adjetivo
難しい|muzukashii|difícil|adjetivo
易しい|yasashii|fácil|adjetivo
元気|genki|saudável / animado|adjetivo
静か|shizuka|silencioso|adjetivo
`;

const n4 = `
用事|youji|compromisso / tarefa|substantivo
約束|yakusoku|promessa|substantivo
経験|keiken|experiência|substantivo
理由|riyuu|razão|substantivo
生活|seikatsu|vida cotidiana|substantivo
社会|shakai|sociedade|substantivo
文化|bunka|cultura|substantivo
歴史|rekishi|história|substantivo
産業|sangyou|indústria|substantivo
交通|koutsuu|trânsito / transporte|substantivo
機会|kikai|oportunidade|substantivo
将来|shourai|futuro|substantivo
夢|yume|sonho|substantivo
準備|junbi|preparação|substantivo
説明|setsumei|explicação|substantivo
連絡|renraku|contato / aviso|substantivo
心配|shinpai|preocupação|substantivo
興味|kyoumi|interesse|substantivo
意見|iken|opinião|substantivo
気持ち|kimochi|sentimento|substantivo
運ぶ|hakobu|transportar|verbo
`;

const n4b = `
運ぶ|hakobu|transportar|verbo
働く|hataraku|trabalhar|verbo
急ぐ|isogu|apressar-se|verbo
決める|kimeru|decidir|verbo
比べる|kuraberu|comparar|verbo
続ける|tsuzukeru|continuar|verbo
始める|hajimeru|começar|verbo
終わる|owaru|terminar|verbo
考える|kangaeru|pensar / considerar|verbo
調べる|shiraberu|pesquisar|verbo
伝える|tsutaeru|transmitir|verbo
集める|atsumeru|reunir|verbo
選ぶ|erabu|escolher|verbo
届く|todoku|chegar (objeto)|verbo
慣れる|nareru|acostumar-se|verbo
複雑|fukuzatsu|complicado|adjetivo
簡単|kantan|simples|adjetivo
大切|taisetsu|importante|adjetivo
安全|anzen|seguro|adjetivo
危険|kiken|perigoso|adjetivo
自由|jiyuu|livre|adjetivo
必要|hitsuyou|necessário|adjetivo
無理|muri|impossível / forçado|adjetivo
だいたい|daitai|aproximadamente|advérbio
そろそろ|sorosoro|em breve|advérbio
なるべく|narubeku|se possível|advérbio
やっぱり|yappari|como esperado|advérbio
`;

const n3 = `
影響|eikyou|influência|substantivo
状況|joukyou|situação|substantivo
可能性|kanousei|possibilidade|substantivo
方法|houhou|método|substantivo
結果|kekka|resultado|substantivo
原因|genin|causa|substantivo
目的|mokuteki|objetivo|substantivo
努力|doryoku|esforço|substantivo
責任|sekinin|responsabilidade|substantivo
関係|kankei|relação|substantivo
環境|kankyou|ambiente|substantivo
政治|seiji|política|substantivo
経済|keizai|economia|substantivo
文句|monku|reclamação|substantivo
態度|taido|atitude|substantivo
印象|inshou|impressão|substantivo
判断|handan|julgamento|substantivo
確認|kakunin|confirmação|substantivo
提案|teian|proposta|substantivo
記録|kiroku|registro|substantivo
含む|fukumu|incluir|verbo
増える|fueru|aumentar|verbo
減る|heru|diminuir|verbo
守る|mamoru|proteger|verbo
断る|kotowaru|recusar|verbo
認める|mitomeru|reconhecer|verbo
求める|motomeru|buscar|verbo
`;

const n3b = `
表す|arawasu|expressar|verbo
生じる|shoujiru|surgir|verbo
異なる|kotonaru|diferir|verbo
偶然|guuzen|coincidência|advérbio
実際|jissai|na realidade|advérbio
一方|ippou|por outro lado|conector
つまり|tsumari|ou seja|conector
たとえば|tatoeba|por exemplo|conector
しかも|shikamo|além disso|conector
ただし|tadashi|porém / exceto|conector
豊か|yutaka|abundante|adjetivo
派手|hade|chamativo|adjetivo
地味|jimi|discreto|adjetivo
真剣|shinken|sério|adjetivo
`;

const n2 = `
概念|gainen|conceito|substantivo
傾向|keikou|tendência|substantivo
分野|bunya|área / campo|substantivo
制度|seido|sistema (institucional)|substantivo
需要|juyou|demanda|substantivo
供給|kyoukyuu|oferta|substantivo
効率|kouritsu|eficiência|substantivo
基準|kijun|critério / padrão|substantivo
要素|youso|elemento|substantivo
構造|kouzou|estrutura|substantivo
現象|genshou|fenômeno|substantivo
矛盾|mujun|contradição|substantivo
根拠|konkyo|fundamento / base|substantivo
対象|taishou|alvo / objeto|substantivo
条件|jouken|condição|substantivo
実施|jisshi|implementação|substantivo
維持|iji|manutenção|substantivo
促進|sokushin|promoção|substantivo
削減|sakugen|redução|substantivo
検討|kentou|análise / exame|substantivo
及ぼす|oyobosu|exercer (influência)|verbo
占める|shimeru|ocupar (proporção)|verbo
補う|oginau|complementar|verbo
妨げる|samatageru|impedir|verbo
訴える|uttaeru|apelar / processar|verbo
巡る|meguru|circular / girar em torno|verbo
著しい|ichijirushii|notável|adjetivo
乏しい|toboshii|escasso|adjetivo
妥当|datou|adequado / válido|adjetivo
明確|meikaku|claro / preciso|adjetivo
`;

const n1 = `
把握|haaku|compreensão / domínio|substantivo
覚悟|kakugo|determinação / preparo mental|substantivo
葛藤|kattou|conflito interno|substantivo
洞察|dousatsu|perspicácia|substantivo
概略|gairyaku|resumo / esboço|substantivo
兆候|choukou|indício|substantivo
懸念|kenen|apreensão|substantivo
遂行|suikou|execução (de tarefa)|substantivo
是正|zesei|correção|substantivo
逸脱|itsudatsu|desvio|substantivo
緩和|kanwa|flexibilização|substantivo
凝縮|gyoushuku|condensação|substantivo
拮抗|kikkou|rivalidade equilibrada|substantivo
渦中|kachuu|no meio do turbilhão|substantivo
潜在|senzai|latente|substantivo
顕著|kencho|marcante|adjetivo
曖昧|aimai|ambíguo|adjetivo
厳密|genmitsu|rigoroso|adjetivo
巧妙|koumyou|engenhoso|adjetivo
円滑|enkatsu|harmonioso / sem atrito|adjetivo
賄う|makanau|prover / cobrir custos|verbo
培う|tsuchikau|cultivar (habilidade)|verbo
遮る|saegiru|bloquear|verbo
慕う|shitau|admirar / ansiar por|verbo
仕える|tsukaeru|servir (alguém)|verbo
綻びる|hokorobiru|desfazer-se / desabrochar|verbo
覆す|kutsugaesu|derrubar / reverter|verbo
凌ぐ|shinogu|superar / suportar|verbo
如実に|nyojitsu ni|vividamente|advérbio
一概に|ichigai ni|de modo geral|advérbio
`;

export const vocabulario: VocabItem[] = [
  ...parse("N5", n5),
  ...parse("N4", n4),
  ...parse("N4", n4b),
  ...parse("N3", n3),
  ...parse("N3", n3b),
  ...parse("N2", n2),
  ...parse("N1", n1),
].filter((v, i, arr) => v.meaning !== "-" && arr.findIndex((o) => o.word === v.word) === i);

export const vocabByLevel = (level: JlptLevel) => vocabulario.filter((v) => v.level === level);
