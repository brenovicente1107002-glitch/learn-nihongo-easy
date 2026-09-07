import type { JlptLevel } from "./kanji";
import type { VocabItem } from "./vocabulario";

/**
 * Vocabulário extra de aprofundamento, organizado do N5 ao N1.
 * Formato: palavra|leitura|significado|tipo
 */

const n5 = `
毎朝|まいあつ|toda manhã|advérbio
毎晩|まいばん|toda noite|advérbio
毎週|まいしゅう|toda semana|advérbio
毎月|まいつき|todo mês|advérbio
毎年|まいとし|todo ano|advérbio
今朝|けさ|hoje de manhã|substantivo
今晩|こんばん|esta noite|substantivo
昨夜|ゆうべ|ontem à noite|substantivo
明後日|あさって|depois de amanhã|substantivo
一昨日|おととい|anteontem|substantivo
時々|ときどき|às vezes|advérbio
大体|だいたい|geralmente|advérbio
全然|ぜんぜん|de jeito nenhum|advérbio
もちろん|もちろん|claro|advérbio
本当に|ほんとうに|de verdade|advérbio
少し|すこし|um pouco|advérbio
沢山|たくさん|muito|advérbio
一番|いちばん|o mais|advérbio
一緒に|いっしょに|juntos|advérbio
初めて|はじめて|pela primeira vez|advérbio
玄関|げんかん|entrada da casa|substantivo
台所|だいどころ|cozinha|substantivo
風呂|ふろ|banho|substantivo
庭|にわ|jardim|substantivo
部屋|へや|quarto|substantivo
窓|まど|janela|substantivo
机|つくえ|escrivaninha|substantivo
椅子|いす|cadeira|substantivo
鍵|かぎ|chave|substantivo
時計|とけい|relógio|substantivo
眼鏡|めがね|óculos|substantivo
傘|かさ|guarda-chuva|substantivo
荷物|にもつ|bagagem|substantivo
切符|きっぷ|passagem|substantivo
地図|ちず|mapa|substantivo
写真|しゃしん|foto|substantivo
手紙|てがみ|carta|substantivo
葉書|はがき|cartão postal|substantivo
封筒|ふうとう|envelope|substantivo
電話番号|でんわばんごう|número de telefone|substantivo
名前|なまえ|nome|substantivo
住所|じゅうしょ|endereço|substantivo
誕生日|たんじょうび|aniversário|substantivo
プレゼント|ぷれぜんと|presente|substantivo
仕事|しごと|trabalho|substantivo
休み|やすみ|descanso|substantivo
授業|じゅぎょう|aula|substantivo
試験|しけん|prova|substantivo
宿題|しゅくだい|lição de casa|substantivo
質問|しつもん|pergunta|substantivo
答え|こたえ|resposta|substantivo
意味|いみ|significado|substantivo
漢字|かんじ|kanji|substantivo
言葉|ことば|palavra|substantivo
文|ぶん|frase|substantivo
町|まち|cidade|substantivo
村|むら|vila|substantivo
国|くに|país|substantivo
外国|がいこく|exterior|substantivo
空港|くうこう|aeroporto|substantivo
駅前|えきまえ|frente da estação|substantivo
角|かど|esquina|substantivo
橋|はし|ponte|substantivo
道|みち|caminho|substantivo
入口|いりぐち|entrada|substantivo
出口|でぐち|saída|substantivo
階段|かいだん|escada|substantivo
店|みせ|loja|substantivo
八百屋|やおや|verdureira|substantivo
肉屋|にくや|açougue|substantivo
魚屋|さかなや|peixaria|substantivo
本屋|ほんや|livraria|substantivo
花屋|はなや|floricultura|substantivo
パン屋|ぱんや|padaria|substantivo
喫茶店|きっさてん|cafeteria|substantivo
居酒屋|いざかや|bar japonês|substantivo
塩|しお|sal|substantivo
砂糖|さとう|açúcar|substantivo
醤油|しょうゆ|shoyu|substantivo
味噌|みそ|missô|substantivo
豆腐|とうふ|tofu|substantivo
納豆|なっとう|nattō|substantivo
卵焼き|たまごやき|omelete japonês|substantivo
味噌汁|みそしる|sopa de missô|substantivo
焼き魚|やきざかな|peixe grelhado|substantivo
天ぷら|てんぷら|tempurá|substantivo
そば|そば|macarrão de trigo sarraceno|substantivo
うどん|うどん|macarrão udon|substantivo
カレー|かれー|curry|substantivo
弁当|べんとう|marmita|substantivo
おにぎり|おにぎり|bolinho de arroz|substantivo
熱い|あつい|quente|adjetivo
冷たい|つめたい|frio|adjetivo
温い|ぬるい|morno|adjetivo
厚い|あつい|grosso|adjetivo
薄い|うすい|fino|adjetivo
重い|おもい|pesado|adjetivo
軽い|かるい|leve|adjetivo
強い|つよい|forte|adjetivo
弱い|よわい|fraco|adjetivo
明るい|あかるい|claro|adjetivo
暗い|くらい|escuro|adjetivo
広い|ひろい|espaçoso|adjetivo
狭い|せまい|estreito|adjetivo
深い|ふかい|profundo|adjetivo
浅い|あさい|raso|adjetivo
丸い|まるい|redondo|adjetivo
細い|ほそい|magro|adjetivo
太い|ふとい|gordo|adjetivo
硬い|かたい|duro|adjetivo
柔らかい|やわらかい|macio|adjetivo
汚い|きたない|sujo|adjetivo
`;

const n4 = `
経験|けいけん|experiência|substantivo
習慣|しゅうかん|hábito|substantivo
予定|よてい|programação|substantivo
約束|やくそく|promessa|substantivo
相談|そうだん|consulta|substantivo
連絡|れんらく|contato|substantivo
案内|あんない|orientação|substantivo
紹介|しょうかい|apresentação|substantivo
説明|せつめい|explicação|substantivo
準備|じゅんび|preparação|substantivo
練習|れんしゅう|treino|substantivo
復習|ふくしゅう|revisão|substantivo
予習|よしゅう|estudo prévio|substantivo
卒業|そつぎょう|formatura|substantivo
入学|にゅうがく|ingresso na escola|substantivo
受験|じゅけん|exame de admissão|substantivo
会議|かいぎ|reunião|substantivo
残業|ざんぎょう|hora extra|substantivo
出張|しゅっちょう|viagem a trabalho|substantivo
転勤|てんきん|transferência de trabalho|substantivo
給料|きゅうりょう|salário|substantivo
貯金|ちょきん|poupança|substantivo
買い物|かいもの|compras|substantivo
割引|わりびき|desconto|substantivo
値段|ねだん|preço|substantivo
無料|むりょう|grátis|substantivo
有料|ゆうりょう|pago|substantivo
注文|ちゅうもん|pedido|substantivo
勘定|かんじょう|conta|substantivo
お釣り|おつり|troco|substantivo
レシート|れしいと|recibo|substantivo
定期券|ていきけん|passe mensal|substantivo
乗り換え|のりかえ|baldeação|substantivo
遅刻|ちこく|atraso|substantivo
故障|こしょう|pane|substantivo
事故|じこ|acidente|substantivo
火事|かじ|incêndio|substantivo
地震|じしん|terremoto|substantivo
台風|たいふう|tufão|substantivo
雷|かみなり|trovão|substantivo
洪水|こうずい|enchente|substantivo
空気|くうき|ar|substantivo
温度|おんど|temperatura|substantivo
湿度|しつど|umidade|substantivo
天気予報|てんきよほう|previsão do tempo|substantivo
季節|きせつ|estação do ano|substantivo
桜|さくら|flor de cerejeira|substantivo
紅葉|もみじ|folhas de outono|substantivo
祭り|まつり|festival|substantivo
花火|はなび|fogos de artifício|substantivo
正月|しょうがつ|ano novo|substantivo
祝日|しゅくじつ|feriado|substantivo
文化|ぶんか|cultura|substantivo
伝統|でんとう|tradição|substantivo
習う|ならう|aprender|verbo
慣れる|なれる|se acostumar|verbo
間違える|まちがえる|errar|verbo
直す|なおす|consertar|verbo
片付ける|かたづける|arrumar|verbo
手伝う|てつだう|ajudar|verbo
迎える|むかえる|receber alguém|verbo
送る|おくる|enviar|verbo
届ける|とどける|entregar|verbo
預ける|あずける|deixar aos cuidados|verbo
預かる|あずかる|ficar responsável|verbo
借りる|かりる|emprestar de|verbo
返す|かえす|devolver|verbo
払う|はらう|pagar|verbo
貯める|ためる|economizar|verbo
増える|ふえる|aumentar|verbo
減る|へる|diminuir|verbo
変わる|かわる|mudar|verbo
続ける|つづける|continuar|verbo
止める|やめる|parar de fazer|verbo
諦める|あきらめる|desistir|verbo
頑張る|がんばる|se esforçar|verbo
謝る|あやまる|pedir desculpas|verbo
褒める|ほめる|elogiar|verbo
叱る|しかる|repreender|verbo
怒る|おこる|ficar com raiva|verbo
笑う|わらう|rir|verbo
泣く|なく|chorar|verbo
困る|こまる|estar em apuros|verbo
驚く|おどろく|se surpreender|verbo
心配する|しんぱいする|se preocupar|verbo
安心する|あんしんする|se tranquilizar|verbo
大事|だいじ|importante|adjetivo
大切|たいせつ|precioso|adjetivo
丁寧|ていねい|educado|adjetivo
不便|ふべん|inconveniente|adjetivo
便利|べんり|prático|adjetivo
複雑|ふくざつ|complicado|adjetivo
簡単|かんたん|simples|adjetivo
危険|きけん|perigoso|adjetivo
安全|あんぜん|seguro|adjetivo
暇|ひま|livre|adjetivo
真面目|まじめ|sério|adjetivo
`;

const n3 = `
環境|かんきょう|meio ambiente|substantivo
社会|しゃかい|sociedade|substantivo
経済|けいざい|economia|substantivo
政治|せいじ|política|substantivo
法律|ほうりつ|lei|substantivo
制度|せいど|sistema|substantivo
技術|ぎじゅつ|tecnologia|substantivo
科学|かがく|ciência|substantivo
研究|けんきゅう|pesquisa|substantivo
調査|ちょうさ|investigação|substantivo
結果|けっか|resultado|substantivo
原因|げんいん|causa|substantivo
影響|えいきょう|influência|substantivo
効果|こうか|efeito|substantivo
目的|もくてき|objetivo|substantivo
目標|もくひょう|meta|substantivo
計画|けいかく|plano|substantivo
方法|ほうほう|método|substantivo
手段|しゅだん|meio|substantivo
状況|じょうきょう|situação|substantivo
状態|じょうたい|condição|substantivo
条件|じょうけん|condição|substantivo
機会|きかい|oportunidade|substantivo
可能性|かのうせい|possibilidade|substantivo
問題|もんだい|problema|substantivo
課題|かだい|tarefa|substantivo
解決|かいけつ|solução|substantivo
対策|たいさく|contramedida|substantivo
意見|いけん|opinião|substantivo
考え|かんがえ|pensamento|substantivo
感じ|かんじ|sensação|substantivo
気持ち|きもち|sentimento|substantivo
印象|いんしょう|impressão|substantivo
記憶|きおく|memória|substantivo
想像|そうぞう|imaginação|substantivo
理解|りかい|compreensão|substantivo
説得力|せっとくりょく|persuasão|substantivo
表現|ひょうげん|expressão|substantivo
内容|ないよう|conteúdo|substantivo
詳細|しょうさい|detalhes|substantivo
情報|じょうほう|informação|substantivo
知識|ちしき|conhecimento|substantivo
能力|のうりょく|capacidade|substantivo
才能|さいのう|talento|substantivo
努力|どりょく|esforço|substantivo
成功|せいこう|sucesso|substantivo
失敗|しっぱい|fracasso|substantivo
成長|せいちょう|crescimento|substantivo
変化|へんか|mudança|substantivo
進歩|しんぽ|progresso|substantivo
発展|はってん|desenvolvimento|substantivo
増加|ぞうか|aumento|substantivo
減少|げんしょう|redução|substantivo
比較|ひかく|comparação|substantivo
差|さ|diferença|substantivo
関係|かんけい|relação|substantivo
信頼|しんらい|confiança|substantivo
協力|きょうりょく|cooperação|substantivo
競争|きょうそう|competição|substantivo
争い|あらそい|disputa|substantivo
平和|へいわ|paz|substantivo
考える|かんがえる|pensar|verbo
比べる|くらべる|comparar|verbo
選ぶ|えらぶ|escolher|verbo
決める|きめる|decidir|verbo
決まる|きまる|ser decidido|verbo
認める|みとめる|reconhecer|verbo
許す|ゆるす|perdoar|verbo
断る|ことわる|recusar|verbo
受け入れる|うけいれる|aceitar|verbo
支える|ささえる|apoiar|verbo
助ける|たすける|socorrer|verbo
守る|まもる|proteger|verbo
壊す|こわす|quebrar|verbo
直る|なおる|ser consertado|verbo
生まれる|うまれる|nascer|verbo
育つ|そだつ|crescer|verbo
育てる|そだてる|criar|verbo
亡くなる|なくなる|falecer|verbo
進める|すすめる|fazer avançar|verbo
戻る|もどる|voltar|verbo
繰り返す|くりかえす|repetir|verbo
含む|ふくむ|incluir|verbo
除く|のぞく|excluir|verbo
足りる|たりる|ser suficiente|verbo
余る|あまる|sobrar|verbo
間に合う|まにあう|chegar a tempo|verbo
気づく|きづく|perceber|verbo
思い出す|おもいだす|lembrar|verbo
確かめる|たしかめる|confirmar|verbo
適切|てきせつ|adequado|adjetivo
正確|せいかく|preciso|adjetivo
曖昧|あいまい|vago|adjetivo
明確|めいかく|claro|adjetivo
重要|じゅうよう|importante|adjetivo
必要|ひつよう|necessário|adjetivo
可能|かのう|possível|adjetivo
不可能|ふかのう|impossível|adjetivo
普通|ふつう|comum|adjetivo
特別|とくべつ|especial|adjetivo
珍しい|めずらしい|raro|adjetivo
立派|りっぱ|excelente|adjetivo
`;

const n2 = `
概念|がいねん|conceito|substantivo
理論|りろん|teoria|substantivo
仮説|かせつ|hipótese|substantivo
証拠|しょうこ|evidência|substantivo
論理|ろんり|lógica|substantivo
矛盾|むじゅん|contradição|substantivo
基準|きじゅん|critério|substantivo
標準|ひょうじゅん|padrão|substantivo
原則|げんそく|princípio|substantivo
方針|ほうしん|diretriz|substantivo
政策|せいさく|política pública|substantivo
戦略|せんりゃく|estratégia|substantivo
戦術|せんじゅつ|tática|substantivo
組織|そしき|organização|substantivo
構造|こうぞう|estrutura|substantivo
機能|きのう|função|substantivo
役割|やくわり|papel|substantivo
責任|せきにん|responsabilidade|substantivo
義務|ぎむ|obrigação|substantivo
権利|けんり|direito|substantivo
自由|じゆう|liberdade|substantivo
平等|びょうどう|igualdade|substantivo
公正|こうせい|justiça|substantivo
倫理|りんり|ética|substantivo
道徳|どうとく|moral|substantivo
価値観|かちかん|valores|substantivo
常識|じょうしき|senso comum|substantivo
識見|しきけん|discernimento|substantivo
見識|けんしき|conhecimento amplo|substantivo
教養|きょうよう|cultura geral|substantivo
専門|せんもん|especialidade|substantivo
分野|ぶんや|área|substantivo
領域|りょういき|domínio|substantivo
範囲|はんい|alcance|substantivo
限度|げんど|limite|substantivo
境界|きょうかい|fronteira|substantivo
段階|だんかい|etapa|substantivo
過程|かてい|processo|substantivo
傾向|けいこう|tendência|substantivo
現象|げんしょう|fenômeno|substantivo
要因|よういん|fator|substantivo
要素|ようそ|elemento|substantivo
特徴|とくちょう|característica|substantivo
特質|とくしつ|propriedade|substantivo
本質|ほんしつ|essência|substantivo
実態|じったい|realidade|substantivo
実情|じつじょう|situação real|substantivo
背景|はいけい|contexto|substantivo
前提|ぜんてい|pressuposto|substantivo
根拠|こんきょ|fundamento|substantivo
把握する|はあくする|compreender|verbo
検討する|けんとうする|considerar|verbo
検証する|けんしょうする|verificar|verbo
分析する|ぶんせきする|analisar|verbo
評価する|ひょうかする|avaliar|verbo
批判する|ひはんする|criticar|verbo
主張する|しゅちょうする|afirmar|verbo
提案する|ていあんする|propor|verbo
実施する|じっしする|implementar|verbo
実行する|じっこうする|executar|verbo
達成する|たっせいする|alcançar|verbo
維持する|いじする|manter|verbo
改善する|かいぜんする|melhorar|verbo
改革する|かいかくする|reformar|verbo
促進する|そくしんする|promover|verbo
抑制する|よくせいする|conter|verbo
防止する|ぼうしする|prevenir|verbo
対応する|たいおうする|lidar com|verbo
貢献する|こうけんする|contribuir|verbo
参加する|さんかする|participar|verbo
著しい|いちじるしい|notável|adjetivo
顕著|けんちょ|marcante|adjetivo
微妙|びみょう|sutil|adjetivo
曖昧|あいまい|ambíguo|adjetivo
厳密|げんみつ|rigoroso|adjetivo
客観的|きゃっかんてき|objetivo|adjetivo
主観的|しゅかんてき|subjetivo|adjetivo
合理的|ごうりてき|racional|adjetivo
効率的|こうりつてき|eficiente|adjetivo
`;

const n1 = `
概念化|がいねんか|conceituação|substantivo
抽象|ちゅうしょう|abstração|substantivo
普遍|ふへん|universalidade|substantivo
必然|ひつぜん|inevitabilidade|substantivo
偶然|ぐうぜん|acaso|substantivo
逆説|ぎゃくせつ|paradoxo|substantivo
風刺|ふうし|sátira|substantivo
皮肉|ひにく|ironia|substantivo
含蓄|がんちく|profundidade implícita|substantivo
幽玄|ゆうげん|beleza sutil|substantivo
侘寂|わびさび|estética da imperfeição|substantivo
恩恵|おんけい|benefício|substantivo
弊害|へいがい|efeito nocivo|substantivo
犠牲|ぎせい|sacrifício|substantivo
損失|そんしつ|perda|substantivo
恩義|おんぎ|dívida de gratidão|substantivo
信義|しんぎ|fidelidade|substantivo
節度|せつど|moderação|substantivo
度量|どりょう|tolerância|substantivo
気概|きがい|coragem|substantivo
意地|いじ|teimosia|substantivo
矜持|きょうじ|orgulho digno|substantivo
自負|じふ|autoconfiança|substantivo
慢心|まんしん|arrogância|substantivo
偏見|へんけん|preconceito|substantivo
固定観念|こていかんねん|estereótipo|substantivo
刷り込み|すりこみ|condicionamento|substantivo
錯覚|さっかく|ilusão|substantivo
矛盾点|むじゅんてん|ponto de contradição|substantivo
極意|ごくい|segredo da arte|substantivo
神髄|しんずい|essência profunda|substantivo
醍醐味|だいごみ|verdadeiro encanto|substantivo
醸成|じょうせい|amadurecimento|substantivo
醸し出す|かもしだす|exalar|verbo
遂げる|とげる|realizar|verbo
成し遂げる|なしとげる|consumar|verbo
貫く|つらぬく|levar adiante|verbo
貫徹する|かんてつする|cumprir integralmente|verbo
全うする|まっとうする|cumprir plenamente|verbo
果たす|はたす|cumprir|verbo
携わる|たずさわる|dedicar-se a|verbo
携える|たずさえる|portar|verbo
仕える|つかえる|servir|verbo
奉る|たてまつる|oferecer reverentemente|verbo
賜る|たまわる|receber de superior|verbo
授かる|さずかる|ser agraciado|verbo
疎か|おろそか|negligente|adjetivo
疎遠|そえん|distante|adjetivo
密か|ひそか|secreto|adjetivo
端的|たんてき|direto|adjetivo
曖昧模糊|あいまいもこ|obscuro|adjetivo
画期的|かっきてき|revolucionário|adjetivo
普遍的|ふへんてき|universal|adjetivo
圧倒的|あっとうてき|esmagador|adjetivo
致命的|ちめいてき|fatal|adjetivo
画一|かくいつ|uniforme|adjetivo
希薄|きはく|raro|adjetivo
緻密|ちみつ|minucioso|adjetivo
精巧|せいこう|elaborado|adjetivo
巧妙|こうみょう|engenhoso|adjetivo
狡猾|こうかつ|astuto|adjetivo
強固|きょうこ|sólido|adjetivo
脆弱|ぜいじゃく|frágil|adjetivo
膨大|ぼうだい|enorme|adjetivo
些細|ささい|trivial|adjetivo
微々たる|びびたる|insignificante|adjetivo
甚だしい|はなはだしい|extremo|adjetivo
著しい|いちじるしい|considerável|adjetivo
芳しい|かんばしい|favorável|adjetivo
好ましい|このましい|desejável|adjetivo
望ましい|のぞましい|ideal|adjetivo
厳か|おごそか|solene|adjetivo
淑やか|しとやか|gracioso|adjetivo
健やか|すこやか|saudável|adjetivo
爽やか|さわやか|refrescante|adjetivo
穏やか|おだやか|calmo|adjetivo
和やか|なごやか|harmonioso|adjetivo
朗らか|ほがらか|alegre|adjetivo
`;

const parseExtra = (level: JlptLevel, raw: string): VocabItem[] =>
  raw
    .trim()
    .split("\n")
    .map((l) => l.trim())
    .filter(Boolean)
    .map((line) => {
      const [word = "", reading = "", meaning = "", type = "substantivo"] = line.split("|");
      return { word, reading, meaning, type, level };
    });

/** palavras extras de aprofundamento por nível */
export const vocabularioExtra: VocabItem[] = [
  ...parseExtra("N5", n5),
  ...parseExtra("N4", n4),
  ...parseExtra("N3", n3),
  ...parseExtra("N2", n2),
  ...parseExtra("N1", n1),
];
