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

/** Deixa no máximo duas acepções em português, sem barras e sem duplicatas. */
const limparSignificado = (raw: string): string => {
  const partes = raw
    .split(/[;/,]/)
    .map((p) => p.replace(/\(.*?\)/g, "").replace(/\s+/g, " ").trim())
    .filter(Boolean);
  const vistos = new Set<string>();
  const unicos = partes.filter((p) => {
    const k = p.toLowerCase();
    if (vistos.has(k)) return false;
    vistos.add(k);
    return true;
  });
  const texto = unicos.slice(0, 2).join(", ") || raw.trim();
  return texto.charAt(0).toLowerCase() + texto.slice(1);
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
        meaning: limparSignificado(meaning),
        readings: readings.split(",").map((r) => r.trim()),
        level,
      };
    });

const n5 = `
日|dia / sol / Japão|にち,じつ,ひ,び,か
一|um|いち,いつ,ひと,ひとつ
国|País / terra / nação|こく,くに
人|pessoa|じん,にん,ひと,り,と
年|Ano|ねん,とし
大|grande / enorme|だい,たい,おお,おおきい,おおいに
十|dez|じゅう,じっ,じゅっ,とお,と
二|dois|に,じ,ふた,ふたつ,ふたたび
本|livro / presente / real|ほん,もと
中|em / interior / médio|ちゅう,なか,うち,あたる
長|Longo / ambicionar / líder|ちょう,ながい,おさ
出|saída / deixa|しゅつ,すい,でる,で,だす
三|três|さん,ぞう,み,みつ,みっつ
時|tempo / hora|じ,とき,どき
行|ir / viagem / viajar|こう,ぎょう,あん,いく,ゆく,ゆき
見|ver / esperanças / oportunidades|けん,みる,みえる,みせる
月|mês / lua|げつ,がつ,つき
後|atrás / costas / mais tarde|ご,こう,のち,うしろ,うしろ
前|em frente / antes|ぜん,まえ,まえ
生|vida / genuína / nascimento|せい,しょう,いきる,いかす,いける
五|cinco|ご,いつ,いつつ
間|intervalo / espaço|かん,けん,あいだ,ま,あい
上|acima / para cima / sobre|じょう,しょう,しゃん,うえ,うえ,うわ
東|Oriente|とう,ひがし
四|quatro|し,よ,よつ,よっつ
今|agora|こん,きん,いま
金|ouro|きん,こん,ごん,かね,かな,がね
九|nove|きゅう,く,ここの,ここのつ
入|entrar / inserir|にゅう,じゅ,いる,いる,いり
学|estudo / aprendizagem / ciência|がく,まなぶ
高|Caro / alto|こう,たかい,たか,だか
円|círculo / iene / redondo|えん,まるい,まる,まど
子|criança|し,す,つ,こ,こ,ね
外|Exterior|がい,げ,そと,ほか,はずす
八|Oito|はち,や,やつ,やっつ
六|seis|ろく,りく,む,むつ,むっつ
下|baixo / abaixo / descende|か,げ,した,しも,もと
来|Vir / devido / próximo|らい,たい,くる,きたる,きたす
気|espírito / mente|き,け,いき
小|Pequeno / pouco|しょう,ちいさい,こ,お
七|Sete|しち,なな,ななつ,なの
山|montanha|さん,せん,やま
話|Conversar / falar uma língua / conto|わ,はなす,はなし
女|mulher / fêmea|じょ,にょ,にょう,おんな,め
北|norte|ほく,きた
午|meio-dia|ご,うま
百|cem|ひゃく,びゃく,もも
書|escrever|しょ,かく,がき,がき
先|antes / prévio / na frente|せん,さき,まず
名|nome / fama / distinção|めい,みょう,な,な
川|corrente / rio|せん,かわ
千|Mil|せん,ち
水|água|すい,みず,みず
半|metade / médio / número ímpar|はん,なかば
男|masculino|だん,なん,おとこ,お
西|oeste / Espanha|せい,さい,す,にし
電|eletricidade|でん
校|exame / escola / impressão|こう,きょう
語|palavra / discurso / língua|ご,かたる,かたらう
土|solo / terra / chão|ど,と,つち
木|árvore / madeira|ぼく,もく,き,こ
聞|escutar / perguntar / escuta|ぶん,もん,きく,きこえる
食|comer / comida / alimento|しょく,じき,くう,くらう,たべる
車|carro|しゃ,くるま
何|que|か,なに,なん,なに
南|sul|なん,な,みなみ
万|dez mil|まん,ばん,よろず
毎|todo|まい,ごと,ごとに
白|branco|はく,びゃく,しろ,しら,しろい
天|paraíso / ceú / imperiais|てん,あまつ,あめ,あま
母|mãe / materno|ぼ,はは,も
火|fogo|か,ひ,び,ほ
右|Direita|う,ゆう,みぎ
読|leia|どく,とく,とう,よむ,よみ
友|amigo|ゆう,とも
左|Esquerda|さ,しゃ,ひだり
休|descanso / dia desligado / aposentar|きゅう,やすむ,やすまる,やすめる
父|pai|ふ,ちち
雨|chuva|う,あめ,あま,さめ
`;

const n4 = `
会|encontro / reunião / festa|かい,え,あう,あわせる,あつまる
同|mesmo / concorda / igual|どう,おなじ
事|matéria / coisa / fato|じ,ず,こと,つかう,つかえる
自|a si próprio|じ,し,みずから,おのずから,おのずと
社|companhia / firme / escritório|しゃ,やしろ
発|liberar / partida / publicar|はつ,ほつ,たつ,あばく,おこる
者|alguém / pessoa|しゃ,もの
地|terra / chão|ち,じ
業|negócios / vocação / artes|ぎょう,ごう,わざ
方|direção / pessoa / alternativa|ほう,かた,かた,がた
新|novo|しん,あたらしい,あらた,あら
場|localização / lugar|じょう,ちょう,ば
員|empregado / membro / número|いん
立|Ficar de pé / levantar-se|りつ,りゅう,りっとる,たつ,たつ,たち
開|abrir / desdobrar / deslacrar|かい,ひらく,ひらき,びらき
手|mão|しゅ,ず,て,て,て
力|força / forte / esforço|りょく,りき,りい,ちから
問|perguntar / pergunta / problema|もん,とう,とい,とん
代|substituto / mudança / convertido|だい,たい,かわる,かわる,かわり
明|brilhante / luz|めい,みょう,みん,あかり,あかるい,あかるむ
動|mover / movimento / mudança|どう,うごく,うごかす
京|capital / 10 elevado a 16|きょう,けい,きん,みやこ
目|olho / classe / olhar|もく,ぼく,め,め,ま
通|tráfego / passar através de / avenida|つう,つ,とおる,とおり,とおり
言|Dizer / palavras|げん,ごん,いう,こと
理|lógica / arranjo / razão|り,ことわり
体|corpo / substância / objeto|たい,てい,からだ,かたち
田|campo de arroz / arroz sem beneficiar|でん,た
主|senhor / chefe / mestre|しゅ,す,しゅう,ぬし,おも,あるじ
題|tópico / assunto|だい
意|idéia / mente / coração|い
不|Prefixo negativo / negativa / não|ふ,ぶ
作|fazer / produção / preparar|さく,さ,つくる,つくり,づくり
用|utilizar / negócios / serviço|よう,もちいる
度|graus / ocorrência / tempo|ど,と,たく,たび,たい
強|Forte / poderoso / forçar|きょう,ごう,つよい,つよまる,つよめる
公|público / príncipe / oficial|こう,く,おおやけ
持|segurar / ter|じ,もつ,もち,もてる
野|planícies / campo / rústico|や,しょ,の,の
以|Por meios de / porque / em visão de|い,もって
思|pensar|し,おもう,おもえらく,おぼす
家|casa / lar|か,け,いえ,や,うち
世|geração / mundo / sociedade|せい,せ,そう,よ
多|muitos / frequentar / muito|た,おおい,まさに,まさる
正|corrigir / justiça / correto|せい,しょう,ただしい,ただす,まさ
安|relaxar / calmo / baixo|あん,やすい,やすまる,やす
院|instituição / templo / mansão|いん
心|coração / mente / espírito|しん,こころ,ごころ
界|mundo|かい
教|ensinar / fé / doutrina|きょう,おしえる,おそわる
文|sentença / literatura / estilo|ぶん,もん,ふみ,あや
元|começo / tempo anterior / origem|げん,がん,もと
重|pesado / empilhar / pilha de caixas|じゅう,ちょう,え,おもい,おもり
近|perto / cedo / consangüíneo|きん,こん,ちかい
考|considerar / refletir|こう,かんがえる,かんがえ
画|gravura|が,かく,え,えがく,かくする,かぎる
海|oceano / mar|かい,うみ
売|Vender|ばい,うる,うれる
知|saber / sabedoria|ち,しる,しらせる
道|Caminho / estrada / rua|どう,とう,みち,いう
集|juntar / reunião / congregar|しゅう,あつまる,あつめる,つどう
別|separar / ramo desligado / divergir|べつ,わかれる,わける
物|coisa / objeto / matéria|ぶつ,もつ,もの,もの
使|Uso / usar|し,つかう,つかい,つかい
品|bens / refinamento / dignidade|ひん,ほん,しな
計|desenho / plano / esquema|けい,はかる,はからう
死|morte / dados|し,しぬ,しに
特|Especial|とく
私|particular / Eu / me|し,わたくし,わたし
始|iniciar / começar|し,はじめる,はじめる,はじまる
朝|manhã / disnastia / regime|ちょう,あさ
運|carregar / sorte / destino|うん,はこぶ
終|fim / terminar|しゅう,おわる,おわる,おわる
台|pedestal / stand / sufixo para contagem de para máquinas e veículos|だい,たい,うてな,われ,つかさ
広|largo / vasto / espaçoso|こう,ひろい,ひろまる,ひろめる
住|reside / vida / habita|じゅう,ぢゅう,ちゅう,すむ,すまう,ずまい
真|verdadeiro / realidade / seita do Budismo|しん,ま,ま,まこと
有|possuir / ter / existir|ゆう,う,ある
口|boca|こう,く,くち
少|poucos / pequenos|しょう,すくない,すこし
町|aldeia / cidade / bloco|ちょう,まち
料|taxa / materiais|りょう
工|ofício / construção|こう,く,ぐ
建|Construção|けん,こん,たてる,たて,だて
空|esvaziar / ceú / desocupado|くう,そら,あく,あき
急|apressar / emergência / repentina|きゅう,いそぐ,いそぎ,せく
止|parada|し,とまる,どまり,とめる
送|acompanhante / enviar|そう,おくる
切|corte / talho / afiar|せつ,さい,きる,きる,きり
転|revolver / voltar a ser / mudança|てん,ころがる,ころげる,ころがす
研|polir / estudar / afiar|けん,とぐ
足|perna / pé / ser suficiente|そく,あし,たりる,たる
究|pesquisa / estudo|きゅう,く,きわめる
楽|música / conforto / facilidade|がく,らく,ごう,たのしい,たのしむ,このむ
起|despertar / acordar / levantar|き,おきる,おこる,おこす
着|vestir / chegar / usar|ちゃく,じゃく,きる,ぎ,きせる
店|loja / comércio|てん,みせ,たな
病|mal / doente|びょう,へい,やむ,やみ,やまい
質|substância / qualidade / matéria|しつ,しち,ち,たち,ただす,もと
待|esperar / contar com|たい,まつ,まち
試|teste / tentativa / testar|し,こころみる,ためす
族|tribo / família|ぞく
銀|prata|ぎん,しろがね
早|cedo / rápido|そう,さっ,はやい,はや,はや
映|reflitir / reflexão / projeção|えい,うつる,うつす,はえる
親|pai / intimidade / parente|しん,おや,おや,したしい
験|verificação / efeito / teste|けん,げん,あかし,しるし,ためす
英|Inglaterra / Inglês|えい,はなぶさ
医|doutor / remédio|い,いやす,いする,くすし
仕|atender / ação / oficial|し,じ,つかえる
去|foi / passado / deixar|きょ,こ,さる,さる
味|sabor / gosto|み,あじ,あじわう
写|cópia / foto / descrever|しゃ,じゃ,うつす,うつる,うつ
字|caracter / letra / palavra|じ,あざ,あざな,な
答|solução / resposta|とう,こたえる,こたえ
夜|noite / à noite|や,よ,よる
音|som / barulho|おん,いん,のん,おと,ね
注|derramar / irrigar / verter (lágrimas)|ちゅう,そそぐ,さす,つぐ
帰|Retôrno a casa / chegar em / conduzir-se|き,かえる,かえす,おくる
古|velho|こ,ふるい,ふる,ふるす
歌|canção / cantar|か,うた,うたう
買|comprar|ばい,かう
悪|mal / ruim / falso|あく,お,わるい,わる,あし
図|mapa / desenho / plano|ず,と,え,はかる
週|semana|しゅう
室|quarto / apartamento / câmara|しつ,むろ
歩|passeio|ほ,ぶ,ふ,あるく,あゆむ
風|vento / ar / estilo|ふう,ふ,かぜ,かざ,かぜ
紙|Papel|し,かみ
黒|preto|こく,くろ,くろずむ,くろい
花|flor|か,け,はな
春|primaveril / primavera (estação)|しゅん,はる
赤|vermelho|せき,しゃく,あか,あか,あかい
青|verde / azul / imaturo|せい,しょう,あお,あお,あおい
館|edifício / mansão / edifício grande|かん,やかた,たて
屋|teto / casa / loja|おく,や
色|cor|しょく,しき,いろ
走|Correr / corrida|そう,はしる
秋|outono|しゅう,あき,とき
夏|verão|か,が,げ,なつ
習|aprender|しゅう,じゅ,ならう,ならい
駅|estação|えき
洋|oceano / estilo ocidental|よう
旅|viagem / jornada|りょ,たび
服|vestuário / permitir / obedecer|ふく
夕|Noite|せき,ゆう
借|pedir emprestado / aluguel|しゃく,かりる
曜|dia útil|よう
飲|beber / fumar / tomar|いん,おん,のむ,のみ
肉|carne|にく,しし
貸|Emprestar|たい,かす,かし,かし
堂|câmara pública / corredor|どう
鳥|Pássaro / sufixo para nomes de pássaros.|ちょう,とり
飯|refeição / arroz cozido|はん,めし
勉|esforço|べん,つとめる
冬|Inverno|とう,ふゆ
昼|dia / meio-dia|ちゅう,ひる
茶|chá|ちゃ,さ
弟|irmão mais jovem|てい,だい,で,おとうと
牛|Vaca|ぎゅう,うし
魚|peixe|ぎょ,うお,さかな,ざかな
兄|irmão mais velho / irmão maior|けい,きょう,あに
犬|Cão|けん,いぬ,いぬ
妹|irmã mais jovem|まい,いもうと
姉|irmã mais velha|し,あね,はは
漢|Sino- / China|かん
`;

const n3 = `
政|política / governo|せい,しょう,まつりごと,まん
議|deliberação / consulta / debate|ぎ
民|pessoas / nação / assuntos|みん,たみ
連|Levar pelo caminho / primazia / unir|れん,つらなる,つらねる,つれる
対|vis-um-vis / contrário / até mesmo|たい,つい,あいて,こたえる,そろい
部|seção / biro / departamento|ぶ,べ
合|encaixe / unir|ごう,がっ,かっ,あう,あう,あい
市|mercado / cidade|し,いち
内|interior / dentro / entre|ない,だい,うち
相|inter- / mútuo / juntamente|そう,しょう,あい
定|determinar / fixar / estabelecer|てい,じょう,さだめる,さだまる,さだか
回|-vêzes / redondo / jogo|かい,え,まわる,まわる,まわり
選|eleger / selecionar / escolher|せん,えらぶ
米|arroz / EUA|べい,まい,めえとる,こめ,よね
実|realidade / verdade|じつ,しつ,み,みのる,まこと
関|conexão / obstáculo / passagem|かん,せき,ぜき,かかわる
決|decida / fixar / concordar sobre|けつ,きめる,ぎめ,きまる
全|inteiro / todo / tudo|ぜん,まったく,すべて
表|superfície / tabela / gráfico|ひょう,おもて,おもて,あらわす
戦|guerra / batalha / disputa|せん,いくさ,たたかう,おののく
経|sutra / longitude / passar através de|けい,きょう,きん,へる,たつ,たていと
最|Capacidade máxima / maior / extremo|さい,しゅ,もっとも,つま
現|presente / exist6encia / realidade|げん,あらわれる,あらわす,うつつ
調|canção / tom / métrica|ちょう,しらべる,しらべ,ととのう
化|mudança / tomar a forma de / influência|か,け,ばける,ばかす,ふける
当|golpear / direita / apropriada|とう,あたる,あたり,あてる
約|promessa / aproximadamente / recuar|やく,つづまる,つづめる,つづまやか
首|pescoço|しゅ,くび
法|método / lei / regra|ほう,はっ,ほっ,のり
性|sexo / gênero / natureza|せい,しょう,さが
要|necessidade / ponto principal / essência|よう,いる,かなめ
制|sistema / lei / regra|せい
治|reino / estar em paz / acalmar-se|じ,ち,おさめる,おさまる,なおる
務|tarefa / deveres|む,つとめる
成|tornar-se / obter / crescer|せい,じょう,なる,なす,なす
期|período / tempo / data|き,ご
取|tomar / trazer / recolher|しゅ,とる,とり,とり
都|metropole / capital|と,つ,みやこ
和|harmonia / estilo Japonês / paz|わ,お,か,やわらぐ,やわらげる,なごむ
機|mecanismo / oportunidade / ocasião|き,はた
平|até mesmo / apartamento / paz|へい,びょう,ひょう,たいら,だいら,ひら
加|somar / adição / aumento|か,くわえる,くわわる
受|aceitar / sofrer / atender (telefone)|じゅ,うける,うけ,うかる
続|continuar / série / sequela|ぞく,しょく,こう,つづく,つづける,つぐない
進|avanço / continuar / progresso|しん,すすむ,すすめる
数|número / vigor / destino|すう,す,さく,かず,かぞえる,しばしば
記|escriba / contar / narrativa|き,しるす
初|primeiros tempos / começo|しょ,はじめ,はじめて,はつ
指|dedo / apontar para / indicar|し,ゆび,さす,さし
権|autoridade / força / direitos|けん,ごん,おもり,かり,はかる
支|ramo / apoio / sustentar|し,ささえる,つかえる,かう
産|produtos / dar a luz / nascer|さん,うむ,うまれる,うぶ
点|ponto / marca / ponto decimal|てん,つける,つく,たてる
報|relatório / notícias / recompensa|ほう,むくいる
済|fim / terminar / desculpável|さい,せい,すむ,ずみ,ずみ
活|vivo / resuscitação / existência|かつ,いきる,いかす,いける
原|prado / original / primitivo|げん,はら
共|juntamente / ambos (em afirm.) / nenhum (em neg.)|きょう,とも,ともに,ども
得|ganho / obtem / achado|とく,える,うる
解|solucionar / notas / chave|かい,げ,とく,とかす,とける
交|Misturar-se / misturando / associação|こう,まじわる,まじえる,まじる
資|bens / recursos / capital|し
予|de antemão / prévio / eu mesmo|よ,しゃ,あらかじめ
向|Aquele lá / em frente / além de|こう,むく,むい,むき
際|ocasião / lado / margem|さい,きわ,ぎわ
勝|vitória / vencer / prevalecer|しょう,かつ,がち,まさる
面|máscara / rosto / recursos|めん,べん,おも,おもて,つら
告|revelação / contar / informar|こく,つげる
反|anti-|はん,ほん,たん,そる,そらす,かえす
判|julgamento / assinatura / selo|はん,ばん,わかる
認|reconhecer / testemunhar / discernir|にん,みとめる,したためる
参|confuso / visitando / visitar|さん,しん,まいる,まい,まじわる
利|lucro / vantagem / benefício|り,きく
組|associação / trança / trançart|そ,くむ,くみ,ぐみ
信|fé / verdade / fidelidade|しん
在|existir / arredores / subúrbios|ざい,ある
件|romance / caso / matéria|けん,くだん
側|lado / inclinação / opõe|そく,かわ,がわ,そば
任|responsabilidade / dever / termo|にん,まかせる,まかす
引|puxar / rebocar / sacudir|いん,ひく,ひき,ひき
求|solicitação / desejar / deseja para|きゅう,ぐ,もとめる
所|Lugar|しょ,ところ,ところ,どころ
次|próximo / pedido / seqüência|じ,し,つぐ,つぎ
昨|ontem / prévio / anterior|さく
論|argumento / discurso|ろん
官|burocracia / o governo|かん
増|aumentar / somar / ganhar|ぞう,ます,まし,ふえる
係|pessoa em carga / conexão / dever|けい,かかる,かかり,がかり
感|emoção / sentimento / sensação|かん
情|sentimentos / emoção / paixão|じょう,せい,なさけ
投|arremessar / descartar / desembaraçar|とう,なげる,なげ
示|espetáculo / indicar / apontar|じ,し,しめす
変|raro / mudança / estranhar|へん,かわる,かわり,かえる
打|bater / acesso / batida|だ,だあす,うつ,うち,ぶつ
直|retidão / honestidade / franqueza|ちょく,じき,じか,ただちに,なおす,なおす
両|ambos / moeda Japonesa antiga / nº de veículos|りょう,てる,ふたつ
式|estilo / cerimônia / rito|しき
確|garantia / firme / sólido|かく,こう,たしか,たしかめる
果|fruta / recompensa / levar a cabo|か,はたす,はたす,はたす
容|conteúdo / forma / aparência|よう,いれる
必|invariavelmente / inevitável / certo|ひつ,かならず
演|performance / ato / jogo|えん
歳|Fim de ano / idade / ocasião|さい,せい,とし,とせ,よわい
争|lutar / disputar / discutir|そう,あらそう,いかでか
談|discutir / conversar|だん
能|capacidade / talento / habilidade|のう,よく
位|posição / grau / trono|い,くらい,ぐらい
置|colocação / por / colocar|ち,おく,おき
流|corrente / afundar / fluxo|りゅう,る,ながれる,ながれ,ながす
格|condição / posição / capacidade|かく,こう,きゃく
疑|dúvida / desconfiança / é suspeito|ぎ,うたがう
過|sobrepujar / exceder / ir além de|か,すぎる,すぎる,すぎ
局|junta / escritório / caso|きょく,つぼね
放|libertar / liberação / fogo|ほう,はなす,っぱなし,はなつ
常|regular / normal / comum|じょう,つね,とこ
状|condicional / condições / circunstâncias|じょう
球|bola / esfera|きゅう,たま
職|posto / emprego / trabalho|しょく,そく
与|conferir / participar em / prêmio|よ,あたえる,あずかる,くみする
供|submeter / oferecer / presentear|きょう,く,くう,そなえる,とも,ども
役|dever / guerra / campanha|やく,えき
構|postura / construção / fingir|こう,かまえる,かまう
割|proporção / comparativamente / divide|かつ,わる,わり,わり
費|despesa / custo / gastar|ひ,ついやす,ついえる
付|aderir / anexar|ふ,つける,つける,づける
由|porquanto / por conseguinte / uma razão|ゆ,ゆう,ゆい,よし,よる
説|rumor / opinião / teoria|せつ,ぜい,とく
難|impossível / difícil / dificuldade|なん,かたい,がたい,むずかしい
優|ternura / superar / superação|ゆう,う,やさしい,すぐれる,まさる
夫|marido / homem|ふ,ふう,ぶ,おっと,それ
収|renda / obter / colheita|しゅう,おさめる,おさまる
断|desligamento / decadência / recusa|だん,たつ,ことわる,さだめる
石|pedra|せき,しゃく,こく,いし
違|diferença / diferir|い,ちがう,ちがい,ちがえる
消|extinguir / apagar / desligar|しょう,きえる,けす
神|Deus / mente / alma|しん,じん,かみ,かん,こう
番|vez / número em uma série|ばん,つがい
規|padrão / medida|き
術|arte / técnica / habilidade|じゅつ,すべ
備|equipe / provisão / preparação|び,そなえる,そなわる,つぶさに
宅|casa / lar / residência|たく
害|dano / injúria|がい
配|distribuir / cônjuge / exílio|はい,くばる
警|advertir / mandamentos|けい,いましめる
育|educar / crescer / levantar|いく,そだつ,そだち,そだてる
席|assento / esteira / ocasião|せき,むしろ
訪|invocar / visitar / melhorar|ほう,おとずれる,たずねる,とう
乗|viagem / força / multiplicação|じょう,しょう,のる,のり,のせる
残|restante / restos / balança|ざん,さん,のこる,のこす,そこなう
想|conceito / pensar / idéia|そう,そ,おもう
声|Voz|せい,しょう,こえ,こわ
念|desejo / sentido / idéia|ねん
助|ajuda / resgate / auxiliar|じょ,たすける,たすかる,すける
労|trabalho / agradecer / recompensar|ろう,ろうする,いたわる,いたずき
例|exemplo / costume / uso|れい,たとえる
然|Tipos de objetos / assim / se assim|ぜん,ねん,しか,しかり,しかし
限|limite / restringir / o melhor possível|げん,かぎる,かぎり,かぎり
追|caçar / afastar / seguir|つい,おう
商|Fazer um acordo / vender / comerciante|しょう,あきなう
葉|folha / avião / ponta|よう,は
伝|transmitir / progredir / andar ao longo|でん,てん,つたわる,つたえる,つたう
働|trabalho|どう,はたらく
形|forma / formulário / estilo|けい,ぎょう,かた,がた,かたち
景|cenário / visão|けい
落|cair / gotejar / descer|らく,おちる,おち,おとす
好|apaixonado / agradável / gostar|こう,このむ,すく,よい
退|retirada / sacar / retirar|たい,しりぞく,しりぞける,ひく
頭|cabeça / sufixo para contagem de animais grandes|とう,ず,と,あたま,かしら,がしら
負|derrotar / negativa / menos|ふ,まける,まかす,おう
渡|transito / vau / balsa|と,わたる,わたる,わたす
失|erro / falta / desvantagem|しつ,うしなう,うせる
差|distinção / diferença / variação|さ,さす,さし
末|não ainda / fim / fechar|まつ,ばつ,すえ
守|vigia / protege / defende|しゅ,す,まもる,まもり,もり
若|jovem / se / talvez|じゃく,にゃく,にゃ,わかい,わか,もしくわ
種|espécie / tipo / classe|しゅ,たね,ぐさ
美|beleza / bela|び,み,うつくしい
命|destino / comando / decreto|めい,みょう,いのち
福|benção / fortuna / sorte|ふく
望|ambição / lua cheia / esperança|ぼう,もう,のぞむ,もち
非|Prefixo negativo in- / erro / negativa|ひ,あらず
観|perspectiva / olhar / aparecimento|かん,みる,しめす
察|convidado / presumir / conjecturar|さつ
段|grau / passos / escada|だん,たん
横|De lado / lado / horizontal|おう,よこ
深|fundo / aumentar / intensificar|しん,ふかい,ぶかい,ふかまる
申|tem a honra para|しん,もうす,もうし,さる
様|Senhor / estilo / modos|よう,しょう,さま,さん
財|propriedade / dinheiro / riqueza|ざい,さい,ぞく,たから
港|Porto (navios)|こう,みなと
識|discriminação / saber / escrever|しき,しる,しるす
呼|chamada / chamar para / convidar|こ,よぶ
達|efetuar / alcançar / chegar|たつ,だ,たち
良|bom / agradável / hábil|りょう,よい,よい,いい
候|clima / estação / tempo|こう,そうろう
程|extensão / grau / lei|てい,ほど,ほど
満|cheio / bastante / orgulho|まん,ばん,みちる,みつ,みたす
敗|falha / derrota / mudança na sorte|はい,やぶれる
値|preço / custo / valor|ち,ね,あたい
突|apunhalar / perfurar / empurrar|とつ,か,つく
光|raio / luz|こう,ひかる,ひかり
路|caminho / rota / estrada|ろ,る,じ,みち
科|departamento / curso / seção|か
積|volume / produto (x*y) / terras|せき,つむ,づみ,つもる
他|outro / outrem / os outros|た,ほか
処|dispor / administrar / lidar com|しょ,ところ,こ,おる
太|gordo / grande / espesso|たい,た,ふとい,ふとる
客|convidado / visitante / cliente|きゃく,かく
否|negue / não / recusa|ひ,いな,いや
師|perito / professor / mestre|し,いくさ
登|subir / escalar|とう,と,どう,のぼる,あがる
易|Fácil / ler a sorte / pronto para|えき,い,やさしい,やすい
速|rápido / apressar|そく,はやい,はや,はやめる
存|supor / estar atento / acreditar|そん,ぞん,ながらえる,ある,たもつ
飛|voar / pular (páginas) / dispersar|ひ,とぶ,とばす,とばす
殺|matar / assassinato / açougueiro|さつ,さい,せつ,ころす,ごろし,そぐ
号|apelido / número / item|ごう,さけぶ,よびな
単|Simples / um / solteiro|たん,ひとえ
座|agachar / assento / almofada|ざ,すわる
破|arrancar / rasgar / lágrima|は,やぶる,やぶれる,われる
除|excluir / divisão (mat.) / remover|じょ,じ,のぞく,よけ
完|perfeito / acabamento / fim|かん
降|descer / precipitar / queda|こう,ご,おりる,おろす,ふる
責|culpa / condenar / censurar|せき,せめる
捕|pegar / capturar|ほ,とらえる,とらわれる,とる
危|perigoso / medo / desconforto|き,あぶない,あやうい,あやぶむ
給|salário / pagamento / presente|きゅう,たまう,たもう,たまえ
苦|sofrimento / experiência / preocupar|く,くるしい,ぐるしい,くるしむ
迎|receber bem / reunião / saudar|げい,むかえる
園|parque / jardim / quintal|えん,その
具|ferramenta / utensílio / meios|ぐ,そなえる,つぶさに
辞|pedir demissão / palavra / termo|じ,やめる,いなむ
因|causa / fator / seja associado com|いん,よる,ちなむ
馬|Cavalo|ば,うま,うま,ま
愛|amor / afeição / favorito|あい,いとしい,かなしい,めでる
富|riqueza / enriquecer / abundante|ふ,ふう,とむ,とみ
彼|ele / que / o|ひ,かれ,かの,かの
未|já- / não ainda / até aqui|み,び,いまだ,まだ,ひつじ
舞|dançar / fugir / círculo|ぶ,まう,まう,まい
亡|falecido / agonizante / atrasado|ぼう,もう,ない,なき,ほろびる
冷|fresco / frio (cerveja / pessoa)|れい,つめたい,ひえる,ひや
適|raro / ocasional / conveniente|てき,かなう
婦|dama / mulher / esposa|ふ,よめ
寄|aproximar / juntar / colecionar|き,よる,より,よせる
込|apinhado / misturar / em volume|こむ,こむ,こみ
顔|rosto / expressão|がん,かお
類|espécie / tipo / variedade|るい,たぐい
余|demais / eu mesmo / excedente|よ,あまる,あまり,あます
王|rei / regra / magnata|おう,のう
返|retornar / responder / desvanecer|へん,かえす,かえす,かえる
妻|esposa / cônjuge|さい,つま
背|estatura / altura / costas|はい,せ,せい,そむく
熱|calor / temperatura / febre|ねつ,あつい
宿|pousada / alojamento / estação de retransmissor|しゅく,やど,やどる,やどす
薬|remédio / produto químico / esmalte|やく,くすり
険|íngreme / lugar inacessível / posição inexpugnável|けん,けわしい
頼|confiança / solicitação|らい,たのむ,たのもしい,たよる
覚|memorizar / aprender / recordar|かく,おぼえる,さます,さめる
船|barco|せん,ふね,ふな
途|rota / caminho / estrada|と,みち
許|permitir / aprovar|きょ,ゆるす,もと
抜|deslizar / extrato / arrancar|ばつ,はつ,はい,ぬく,ぬく,ぬき
便|conveniência|べん,びん,たより
留|deter / segurar / parar|りゅう,る,とめる,とまる,とどめる
罪|culpa / pecado / crime|ざい,つみ
努|Trabalho duro / diligente|ど,つとめる
精|refinado / fantasma / fada|せい,しょう,しらげる,くわしい
散|dispersar / espalhar / gastar|さん,ちる,ちらす,ちらす
静|calmo|せい,じょう,しず,しずか,しずまる
婚|casamento|こん
喜|Alegrar-se / ter prazer em|き,よろこぶ,よろこばす
浮|boiando / bóia / subir para superfície|ふ,うく,うかれる,うかぶ
絶|descontinuar / além de / romper|ぜつ,たえる,たやす,たつ
幸|felicidade / benção / fortuna|こう,さいわい,さち,しあわせ
押|empurrar / parada / checar|おう,おす,おし,おっ
倒|Queda de regime / queda / colapso|とう,たおれる,だおれ,たおす
等|etc. / e assim por diante / classe (1º|とう,ひとしい,など,ら
老|velho / velhice / envelhecer|ろう,おいる,ふける
曲|tender / música / melodia|きょく,まがる,まげる,くま
払|pagamento / limpar / podar|ふつ,ひつ,ほつ,はらう,はらい,ばらい
庭|jardim / quintal|てい,にわ
徒|júnior / vazio / vaidade|と,いたずら,あだ
勤|diligência / tornar-se empregado / servir|きん,ごん,つとめる,づとめ,つとまる
遅|atrasado / lento / costas|ち,おくれる,おくらす,おそい
居|residir / existir / viver com|きょ,こ,いる,い,おる
雑|misto|ざつ,ぞう,まじえる,まじる
招|aceno / convidar / encontro|しょう,まねく
困|dúvida / torna-se angustiado / aborrecido|こん,こまる
欠|falta / intervalo / falha|けつ,けん,かける,かく
更|ficar atrasado / horário noturno / certamente|こう,さら,さらに,ふける
刻|escultura / picar / fatiar|こく,きざむ,きざみ
賛|aprovar / elogiar / título ou inscrição em gravura|さん,たすける,たたえる
抱|abraço / abraçar / segura em braços|ほう,だく,いだく,かかえる
犯|crime / pecado / ofensa|はん,ぼん,おかす
恐|medo / temer / temor|きょう,おそれる,おそる,おそろしい
息|hálito / respiração / filho|そく,いき
遠|distante / longe|えん,おん,とおい
戻|re- / volta / reverter|れい,もどす,もどる
願|petição / solicitação / voto|がん,ねがう,ねがい
絵|gravura / desenho / pintura|かい,え
越|superar / exceder / Vietnã|えつ,おつ,こす,こす,ごし
欲|ambicionar / cobiça / ambição|よく,ほっする,ほしい
痛|dor / ferida / injúria|つう,いたい,いたむ,いたましい
笑|risada|しょう,わらう,えむ
互|mutuamente / reciprocamente / juntamente|ご,たがい,かたみに
束|pacote / molho / feixe|そく,たば,たばねる,つか
似|formação / lembra / falsificar|じ,にる,ひる
列|arquivo / fila / posição|れつ,れ
探|tatear / pesquisar / procurar|たん,さぐる,さがす
逃|escapar / fugir / esquivar|とう,にげる,にがす,のがす
遊|Jogo / jogar|ゆう,ゆ,あそぶ,あそばす
迷|desviado / estar perplexo / em dúvida|めい,まよう
夢|sonho / visão / ilusão|む,ぼう,ゆめ,ゆめみる,くらい
君|rapaz / sufixo p/ nome|くん,きみ,ぎみ
閉|fechado / fechar|へい,とじる,とざす,しめる
緒|faixa / começo / início|しょ,ちょ,お,いとぐち
折|dobrar / quebrar / fraturar|せつ,しゃく,おる,おり,おり
草|grama / erva daninha / ervas|そう,くさ,くさ,ぐさ
暮|meio de vida / ganhar a vida / gastar tempo|ぼ,くれる,くらす
酒|sake / álcool|しゅ,さけ,さか
悲|célula de cadeia / enlutar / triste|ひ,かなしい,かなしむ
晴|Limpar o tempo|せい,はれる,はれ,はれ
掛|pendurar / suspender / depender|かい,けい,かける,かける,かけ
到|chegar / continuar / alcançar|とう,いたる
寝|sono / descanso / cama|しん,ねる,ねかす,いぬ
暗|escuridão / desaparecer / sombra|あん,くらい,くらむ,くれる
盗|roubar / roubo / furtar|とう,ぬすむ,ぬすみ
吸|chupar / inalar / sugar|きゅう,すう
陽|brilho do sol / princípio do yang / positivo|よう,ひ
御|honrado / manipular / governar|ぎょ,ご,おん,お,み
歯|dentes / dentes de engrenagens|し,よわい,は,よわい
忘|Esquecer|ぼう,わすれる
雪|neve|せつ,ゆき
吹|sopro / respirar / emitir|すい,ふく
娘|filha / moça|じょう,むすめ,こ
誤|erro / errar / fazer errado|ご,あやまる,あやまる
洗|lavar / indagar / sondar|せん,あらう
慣|acostumado / acostuma-se a / torna-se experimentado|かん,なれる,ならす
礼|saudação / reverência / cerimônia|れい,らい
窓|janela / vidraça|そう,す,まど,てんまど,けむだし
昔|Era uma vez / antiquidade / tempos antigos|せき,しゃく,むかし
貧|pobreza / pobre|ひん,びん,まずしい
怒|Zangado / ofender-se|ど,ぬ,いかる,おこる
泳|nadar|えい,およぐ
祖|antecessor / pioneiro / fundador|そ
杯|Copo cheio / garrafa de vinho / garrafa|はい,さかずき
疲|exaurido / exausto / cansado|ひ,つかれる,づかれ,つからす
皆|todo / tudo|かい,みな,みんな
鳴|gorjeio / choro / latido|めい,なく,なる,ならす
腹|abdômen / estômago / barriga|ふく,はら
煙|fumaça|えん,けむる,けむり,けむい
眠|sono / morrer / sonolento|みん,ねむる,ねむい
怖|terrível / assustar-se / medroso|ふ,ほ,こわい,こわがる,おじる
耳|ouvido|じ,みみ
頂|colocar na cabeça / receber / topo da cabeça|ちょう,いただく,いただき
箱|caixa / tórax / caixa de papelão|そう,はこ
晩|Cair da noite / anoitecer / noite|ばん
寒|Frio|かん,さむい
髪|cabelo da cabeça|はつ,かみ
忙|ocupado / incansável|ぼう,もう,いそがしい,せわしい,おそれる
才|gênio / anos antigos|さい
靴|sapatos|か,くつ
恥|vergonha / desonra|ち,はじる,はじ,はじらう
偶|acidentalmente / número par / par|ぐう,たま
偉|admirável / grandeza / notável|い,えらい
猫|Gato|びょう,ねこ
幾|quantos / quanto / quão longe|き,いく,いくつ,いくら
`;

const n2 = `
党|partido / facção / claque|とう,なかま,むら
協|co- / cooperação|きょう
総|geral / inteiro / todo|そう,すべて,すべて,ふさ
区|waº / distrito|く,おう,こう
領|jurisdição / domínio / território|りょう,えり
県|Condado / prefeitura (região)|けん,かける
設|estabelecimento / provisão / preparar|せつ,もうける
改|reforma / mudança / modificar|かい,あらためる,あらたまる
府|burgo / região urbana / altocomissariado|ふ
査|investigar|さ
委|comitê / confiar a / deixar para|い,ゆだねる
軍|exército / força / tropas|ぐん,いくさ
団|grupo / associação|だん,とん,かたまり,まるい
各|cada / todo / um ou outro|かく,おのおの
島|ilha|とう,しま
革|couro / torna-se sério / pele|かく,かわ
村|cidade / aldeia|そん,むら
勢|forças / energia / vigor militar|せい,ぜい,いきおい,はずみ
減|definhar / decréscimo / reduzir|げん,へる,へらす
再|outra vez / duas vezes / segundo tempo|さい,さ,ふたたび
税|imposto / dever|ぜい
営|ocupação / acampamento / desempenhar|えい,いとなむ,いとなみ
比|comparar / corrida / razão|ひ,くらべる
防|desligar / defender / proteger|ぼう,ふせぐ
補|suplemento / oferta / cumprir|ほ,おぎなう
境|limite / borda / região|きょう,けい,さかい
導|orientação / conduzindo / conduta|どう,みちびく
副|vice- / duplicar / cópia|ふく
算|calcular / advinhar / número|さん,そろ
輸|transportar / enviar / estar inferiorizado|ゆ,しゅ
述|Mencionar / explanar / falar|じゅつ,のべる
線|linha / trilha|せん,すじ
農|agricultura / fazendeiros|のう
州|estado / província|しゅう,す,す
武|guerreiro / militar / cavalaria|ぶ,む,たけ,たけし
象|elefante / modelar / imitar|しょう,ぞう,かたどる
域|série / região / limites|いき
額|testa / tablete / placa|がく,ひたい
欧|Europa|おう,うたう,はく
担|Levar nas costas / carregar / levantar|たん,かつぐ,になう
準|semi- / corresponder-se / proporcional para|じゅん,じゅんじる,じゅんずる,なぞらえる
賞|prêmio / recompensa / elogio|しょう,ほめる
辺|arredores / limite / borda|へん,あたり,ほとり,べ
造|criar / fazer / estrutura|ぞう,つくる,つくり,づくり
被|incorrer / cobrir / velar|ひ,こうむる,おおう,かぶる
技|habilidade / arte / ofício|ぎ,わざ
低|abaixe / humilde / curto|てい,ひくい,ひくめる,ひくまる
復|restaurar / retornar / reverter|ふく,また
移|trocar / mover / mudança|い,うつる,うつす
個|indivíduo / sufixo para contagem de para artigos|こ,か
門|portões|もん,かど,と
課|capítulo / lição / seção|か
脳|cérebro / memória|のう,どう,のうずる
極|postes / acordo / conclusão|きょく,ごく,きわめる,きわまる,きわまり
含|incluir / ter em conta / compreender|がん,ふくむ,ふくめる
蔵|armazém / esconder / possuir|ぞう,そう,くら,おさめる,かくれる
量|quantidade / medida / peso|りょう,はかる
型|bolor / tipo / modelo|けい,かた,がた
況|condição / situação|きょう,まして,いわんや,おもむき
針|agulha / alfinete / grampo|しん,はり
専|exclusividade / exclusivo / principalmente|せん,もっぱら
谷|vale|こく,たに,きわまる
史|história / crônica|し
階|Andar de edifícios / grau / sufixo para contagem de andares de um edifício|かい,きざはし
管|flauta / tubo / instrumento de sopro|かん,くだ
兵|soldado / particular / tropas|へい,ひょう,つわもの
接|tocar / contato / juntar|せつ,しょう,つぐ
細|franzino / emagrecer / afinar|さい,ほそい,ほそる,こまか
効|mérito / eficácia / eficiência|こう,きく,ききめ,ならう
丸|arredondar / cheio / mês|がん,まる,まるめる,まるい
湾|golfo / baía / pequena enseada|わん,いりえ
録|gravar|ろく,しるす,とる
省|foco / ministério de governo / umservar|せい,しょう,かえりみる,はぶく
旧|tempos antigos / coisas antigas / amigo velho|きゅう,ふるい,もと
橋|ponte|きょう,はし
岸|Praia|がん,きし
周|circunferência / circuito / volta|しゅう,まわり
材|tábuas / registro / pau|ざい
戸|Porta|こ,と
央|centro / médio|おう
券|Bilhete|けん
編|acumulo / tricotar / trançar|へん,あむ,あみ
捜|Pesquisar / esperar / localizar|そう,しゅ,しゅう,さがす
竹|bambu|ちく,たけ
超|transcender / ótimo / ultra-|ちょう,こえる,こす
並|fila / e / além disso|へい,ほう,なみ,なみ,ならべる
療|cura / curar|りょう
採|escolher / pegar / trazer|さい,とる
森|floresta / mata|しん,もり
競|imitar / competir com / oferta|きょう,けい,きそう,せる,くらべる
介|comprimir em / marisco / meio|かい
根|raiz / radical / verruga|こん,ね,ね
販|negociar / vender / comercializar|はん
歴|currículo / continuação / passagem de tempo|れき,れっき
将|líder / comandante / general|しょう,そう,まさに,はた,まさ
幅|laço / largura|ふく,はば
般|carregador / carregar / todo|はん
貿|comercializar / trocar|ぼう
講|conferência / clube / associação|こう
林|bosque / floresta|りん,はやし
装|vestes / vestido / fingir|そう,しょう,よそおう,よそおい
諸|vários / muitos / juntamente|しょ,もろ
劇|drama / jogo|げき
河|rio|か,かわ
航|navegar / vela / travessia|こう
鉄|ferro|てつ,くろがね
児|recém-nascido / criança / filhote|じ,に,げい,こ,こ,っこ
禁|proibição / proibir / banir|きん
印|selo / carimbo / marca|いん,しるし,じるし,しるす
逆|invertido / inverter / travesso|ぎゃく,げき,さか,さかさ,さからう
換|trocar / turno / carga|かん,かえる,かえる,かわる
久|tempo longo / estória antiga|きゅう,く,ひさしい
短|curto / brevidade / falta|たん,みじかい
油|petróleo / gordura / óleo|ゆ,ゆう,あぶら
暴|explosão / enfurecer / preocupação|ぼう,ばく,あばく,あばれる
輪|roda / argola / círculo|りん,わ
占|Ler a sorte / advinhar / previsão|せん,しめる,うらなう
植|planta|しょく,うえる,うわる
清|puro / purificar / limpar|せい,しょう,しん,きよい,きよまる,きよめる
倍|Duplicar / duas vezes / tempos|ばい
均|nível / média|きん,ならす
億|cem milhões / 10 elevado a 8|おく
圧|pressão / empurrar / inundar|あつ,えん,おう,おす,へす,おさえる
芸|técnica / arte / ofício|げい,うん,うえる,のり,わざ
署|assinatura / escritório do govêrno / estação de polícia|しょ
伸|expandir / esticar / extender|しん,のびる,のばす,のべる
停|parada / parando|てい,とめる,とまる
爆|bomba / explodir / estouro|ばく,はぜる
陸|terra|りく,ろく,おか
玉|jóia / bola / gota|ぎょく,たま,たま,だま
波|ondas / vagas / Polônia|は,なみ
帯|Faixa / cinto / obi|たい,おびる,おび
延|prolongar / esticar|えん,のびる,のべる,のべ
羽|penas / sufixo para contagem de pássaros / coelhos|う,は,わ,はね
固|endurecer / aglomerar / coágulo|こ,かためる,かたまる,かたまり
則|regra / seguir / basear em|そく,のっとる
乱|distúrbio / guerra / desordenar|らん,ろん,みだれる,みだる,みだす
普|vasto / universal(mente) / geralmente|ふ,あまねく,あまねし
測|braça / plano / esquema|そく,はかる
豊|abundante / rico / excelente|ほう,ぶ,ゆたか,とよ
厚|rico / pesado / espesso|こう,あつい,あか
齢|idade|れい,よわい,とし
囲|circundar / sitiar / loja|い,かこむ,かこう,かこい
卒|soldado / particular / dados|そつ,しゅつ,そっする,おえる,おわる
略|abreviação / omissão / contornar|りゃく,ほぼ,はぶく,おかす
承|aquiescer / escutar / ser informado|しょう,じょう,うけたまわる,うける
順|obedecer / pedido / volta|じゅん
岩|rochedo / rocha / penhedo|がん,いわ
練|prática / brilho / treinar|れん,ねる,ねり
軽|ligeiramente / insignificante / sem importância|けい,きょう,きん,かるい,かろやか,かろんじる
了|Completar / fim|りょう
庁|escritório de governo|ちょう,てい,やくしょ
城|Castelo|じょう,せい,しろ
患|aflição / doença / sofrer de|かん,わずらう
層|estrato / classe social / camada|そう
版|Imprimir / edição / impressão|はん
令|pedidos / leis antigas / comando|れい
角|ângulo / canto / chifre|かく,かど,つの
絡|enroscar / enrolar / ser apanhado em|らく,からむ,からまる
損|prejuízo / perda / desvantagem|そん,そこなう,そこなう,そこなう
募|recrutar / campanha / juntar (contribuições)|ぼ,つのる
裏|costas / no meio de / em|り,うら
仏|Buddha / o morto / França|ぶつ,ふつ,ほとけ
績|façanhas / casulo intacto (sem desenrolar)|せき
築|fabricar / construção / construir|ちく,きずく
貨|frete / bens / propriedade|か,たから
混|misturar / mistura / confundir|こん,まじる,まじり,まざる
昇|ascender|しょう,のぼる
池|lagoa / cisterna / conjunto|ち,いけ
血|sangue|けつ,ち
温|morno|おん,あたたか,あたたかい,あたたまる
季|estações|き
星|estrela / ponto / marca|せい,しょう,ほし,ぼし
永|eternidade / ambicionar|えい,ながい
著|renomado / publico / notável|ちょ,ちゃく,あらわす,いちじるしい
誌|Documentos / registros|し
庫|depósito / armazém|こ,く,くら
刊|publicar / gravar / cunhar|かん
像|estátua / gravura / imagem|ぞう
香|incenso / cheiro / perfume|こう,きょう,か,かおり,かおる
坂|rampa / inclinação / morro|はん,さか
底|único / fundo / profundidade|てい,そこ
布|Linho / pano|ふ,ぬの
寺|Templo Budista|じ,てら
宇|Beira de telhado / teto / casa|う
巨|grande / enorme / gigantesco|きょ
震|tremor / agitar / tremer|しん,ふるう,ふるえる
希|esperança / pedir / solicitação|き,け,まれ
触|contato / tocar / sentir|しょく,ふれる,さわる,さわ
依|confiante / contar com / consequentemente|い,え,よる
籍|inscrever / registro do domicilio / sócio|せき
汚|sujo / poluir / desgraça|お,けがす,けがれる,けがらわしい
枚|folha de... / sufixo para contagem de para objetos finos / chatos ou folhas|まい,ばい
複|duplicação / duplicar / composto|ふく
郵|correio / parada de diligência|ゆう
仲|Relacionamento / entre (algo)|ちゅう,なか
栄|florescer / prosperidade / honra|えい,よう,さかえる,はえ,ばえ
札|etiqueta / dinheiro de papel / número de contratos|さつ,ふだ
板|prancha / junta / prato|はん,ばん,いた
骨|esqueleto / osso / permanecer|こつ,ほね
傾|inclinar / inclinação / tendência|けい,かたむく,かたむける,かたぶく
届|entregar / alcançar / chegar|かい,とどける,とどけ,とどく
巻|rolo / volume / livro|かん,けん,まく,まき,まき
燃|queimadura / chama / ardor|ねん,もえる,もやす,もす
跡|trilhas / marca / impressão|せき,あと
包|movimentar / embrulhar / capa|ほう,つつむ,くるむ
駐|Viajar com paradas / residir em / residente|ちゅう
弱|frágil / fraco|じゃく,よわい,よわる,よわまる
紹|Introduzir / herdar / ajudar|しょう
雇|emprego / alugar|こ,やとう
替|troca / reserva / substituto|たい,かえる,かえ,かわる
預|depósito / custódia / deixa com|よ,あずける,あずかる
焼|assar / queimar|しょう,やく,やき,やき
簡|simplicidade / brevidade|かん,けん,えらぶ,ふだ
章|insígnia / capítulo / composição|しょう
臓|entranhas / víscera / tripas|ぞう,はらわた
律|ritmo / lei / regulamento|りつ,りち,れつ
贈|presentes / enviar / dar|ぞう,そう,おくる
照|iluminar / brilhar / comparar|しょう,てる,てらす,てれる
薄|diluir / fraco / ralo (chá)|はく,うすい,うす,うす
群|bando / grupo / multidão|ぐん,むれる,むれ,むら
秒|segundo (1/ 60 minuto)|びょう
奥|coração / interior|おう,おく,おくまる,くま
詰|empacotado / fechar / pressionar|きつ,きち,つめる,つめ,づめ
双|par / conjunto / comparação|そう,ふた,たぐい,ならぶ
刺|espinho / furar / esfaquear|し,さす,ささる,さし
純|genuíno / pureza / inocência|じゅん
翌|o seguinte / próximo|よく
快|confortável / agradável / alegre|かい,こころよい
片|unilateral / folha de papel / folha (árvore)|へん,かた,かた
敬|temor / respeito / honra|けい,きょう,うやまう
悩|dificuldade / preocupação / perigo|のう,なやむ,なやます,なやましい
泉|Fonte / nascente|せん,いずみ
皮|pelego / pele / esconder|ひ,かわ
漁|pesca / pescaria|ぎょ,りょう,あさる
荒|Abandonado no mato / selvagem / rude|こう,あらい,あら,あれる
貯|poupança / loja / por em|ちょ,ためる,たくわえる
硬|duro / rígido|こう,かたい
埋|enterrar / ocupar-se / embutido|まい,うめる,うまる,うもれる
柱|pilar / poste / cilindro|ちゅう,はしら
祭|Festival / ritual / oferecer orações|さい,まつる,まつり,まつり
袋|sacola / bolsa / saco|たい,だい,ふくろ
筆|Pincel de escrever / escrever / pincel|ひつ,ふで
訓|instrução / leitura Japonesa de caracteres / explicação|くん,きん,おしえる,よむ,くんずる
浴|banhar / favorecer-se / aquecer-se ao sol|よく,あびる,あびせる
童|juvenil / criança|どう,わらべ
宝|tesouro / riqueza / valores|ほう,たから
封|carimbo / fechamento|ふう,ほう
胸|seio / peito / tórax|きょう,むね,むな
砂|Areia|さ,しゃ,すな
塩|Sal|えん,しお
賢|sábio / inteligente / sabedoria|けん,かしこい
腕|braço / capacidade / talento|わん,うで
兆|portento / 10 elevado a 12 / trilhão|ちょう,きざす,きざし
床|cama / andar / estofamento|しょう,とこ,ゆか
毛|peles / cabelo / pena|もう,け
緑|Verde|りょく,ろく,みどり
尊|honrado / precioso / valioso|そん,たっとい,とうとい,たっとぶ
祝|celebre / congratula|しゅく,しゅう,いわう
柔|macio / ponto fraco / gentileza|じゅう,にゅう,やわらか,やわらかい,やわ
殿|Sr. / corredor / mansão|でん,てん,との,どの
濃|concentrado / grosso / espesso|のう,こい
液|fluido / líquido / suco|えき
衣|vestuário / roupas / vestindo|い,え,ころも,きぬ,ぎ
肩|Ombro|けん,かた
零|zero / entornar / inundação|れい,ぜろ,こぼす,こぼれる
幼|infância|よう,おさない
荷|bagagem / pau para carregar no ombro / carregar (carga)|か,に
泊|durante a noite / propor / navegar ancorado|はく,とまる,とめる
黄|amarelo|こう,おう,き,こ
甘|doce / seduzir / mimar|かん,あまい,あまえる,あまやかす
臣|servente / servo / subalterno|しん,じん
浅|raso / frívolo / superficial|せん,あさい
掃|varrer / escovar|そう,しゅ,はく
雲|nuvem|うん,くも,ぐも
掘|cavar / cova / escavar|くつ,ほる
捨|descarte / gastar / desembaraçar|しゃ,すてる
軟|macio|なん,やわらか,やわらかい
沈|afundar / submergir / abaixar|ちん,じん,しずむ,しずめる
凍|congelado / congelar / refrigerar|とう,こおる,こごえる,こごる
乳|leite / peitos|にゅう,ちち,ち
恋|romance / apaixonar-se / sentir saudades|れん,こう,こい,こいしい
紅|carmesim / vermelho forte|こう,く,べに,くれない,あかい
郊|periferia / subúrbios / área rural|こう
腰|lombo / cadeiras / cintura|よう,こし
炭|carvão|たん,すみ
踊|salto / dança / saltar|よう,おどる
冊|tome / sufixo para contagem de para livros / volume|さつ,さく,ふみ
勇|coragem / torcer / estar em altos espíritos|ゆう,いさむ
械|artefato / trava / máquina|かい,かせ
菜|legume / salada / verduras|さい,な
珍|estranho / curioso / raro|ちん,めずらしい,たから
卵|ovo / óvulo / desovar|らん,たまご
湖|lago|こ,みずうみ
喫|consumir / comer / beber|きつ,のむ
干|sêco / ressecar|かん,ほす,ほし,ぼし
虫|inseto / bichinho / temperamento|ちゅう,き,むし
刷|impressão / imprimir|さつ,する,ずり,ずり
湯|água quente / banho / fonte quente|とう,ゆ
溶|derreter / dissolver / fundir (neve)|よう,とける,とかす,とく
鉱|mineral / minerar|こう,あらがね
涙|lágrimas / simpatia|るい,れい,なみだ
匹|igual / cabeça / sufixo para contagem de para pequenos animais|ひつ,ひき
孫|neto / descendentes|そん,まご
鋭|apontar / afiar / fio|えい,するどい
枝|ramagem / ramo / galho|し,えだ
塗|pintura / gesso / emplastar|と,ぬる,ぬり,まみれる
軒|apartamentos / sufixo para contagem de casas / beiral de telhados|けん,のき
毒|veneno / vírus / envenenamento|どく
叫|grito / exclamar / gritar|きょう,さけぶ
拝|venerar / adorar / orar para|はい,おがむ,おろがむ
氷|estalactite / gelo / granizo|ひょう,こおり,ひ,こおる
乾|seca / dessecar / evaporar|かん,けん,かわく,かわかす,ほす
棒|vara / pau / poste|ぼう
祈|orar / rogar|き,いのる
拾|pegar / juntar / achado|しゅう,じゅう,ひろう
粉|farinha / pó / poeira|ふん,デシメートル,こ,こな
糸|contexto|し,いと
綿|Algodão|めん,わた
汗|suar / transpirar|かん,あせ
銅|cobre|どう,あかがね
湿|umidade / úmido / molhar|しつ,しゅう,しめる,しめす,うるおう
瓶|Vaso de flores / garrafa / garrafinha|びん,かめ
咲|flor / florescimento|しょう,さく,ざき
召|seduzir / chamada / mandar chamar|しょう,めす
缶|Lata / pote / recipiente|かん,かま
隻|vasos / peixe / pássaros|せき
脂|gordura / graxa / sêbo|し,あぶら
蒸|vapor / calor / quente|じょう,せい,むす,むれる,むらす
肌|textura / pele / corpo|き,はだ
耕|plantar / agricultura / cultivar|こう,たがやす
鈍|tolo / lento / estúpido|どん,にぶい,にぶる,にぶ
泥|lama / lodo / aderir|でい,ない,で,どろ,なずむ
隅|esquina / canto|ぐう,すみ
灯|lâmpada / luz / sufixo p/ contagem de luzes|とう,ひ,ほ,ともしび
辛|picante / quente / amargo|しん,からい,つらい,づらい
磨|moer / polir / explorar|ま,みがく,する
麦|cevada / trigo|ばく,むぎ
姓|sobrenome|せい,しょう
筒|cilindro / tubo / cano|とう,つつ
鼻|nariz / focinho / tromba|び,はな
粒|graões / gota / sufixo para contagem de partículas pequeninas|りゅう,つぶ
詞|parte de discurso / palavras / poesia|し,ことば
胃|estômago / barriga / colheita|い
畳|esteira do tatami / sufixo para contagem de esteiras de tatami / dobrar|じょう,ちょう,たたむ,たたみ,かさなる
机|mesa / escrivaninha|き,つくえ
膚|pele / corpo / grão|ふ,はだ
濯|lavanderia / lavar / verter em|たく,すすぐ,ゆすぐ
塔|pagode / torre / campanário|とう
沸|borbulhar / ferver / agitação|ふつ,わく,わかす
灰|cinzas / suco adstringente / cremar|かい,はい
菓|doce / bolos / frutas|か
帽|boné / chapéu|ぼう,もう,ずきん,おおう
枯|encolher / secar / ressecar|こ,かれる,からす
涼|fresco e agradável / refrescante|りょう,すずしい,すずむ,すずやか
舟|barco / nave / navio|しゅう,ふね,ふな,ぶね
貝|Marisco / conchas|ばい,かい
符|símbolo / signo / marca|ふ
憎|odiar / detesta|ぞう,にくむ,にくい,にくらしい
皿|Prato(tipo) / porção / prato (objeto)|べい,さら
肯|acordo / consentir / concordar com|こう,がえんじる
燥|ressecar / secar|そう,はしゃぐ
畜|criação / aves domésticas|ちく
挟|Um pouco / entre|きょう,しょう,はさむ,はさまる,わきばさむ
曇|tempo nublado / nublar|どん,くもる
滴|gota / gotejar|てき,しずく,したたる
伺|retribuir visita / perguntar / indagar|し,うかがう
`;

const n1 = `
分|parte / minuto / segmento|ぶん,ふん,ぶ,わける,わけ,わかれる
氏|nome de família / sobrenome / clã|し,うじ,うじ
的|Centro do alvo / marca / alvo|てき,まと
統|global / relacionamento / controlar|とう,すべる,ほびる
保|proteger garantia / guarda / preservar|ほ,ほう,たもつ
第|Prefixo p/ números ordinais / residência|だい,てい
結|laço / unir / contrato|けつ,けち,むすぶ,ゆう,ゆわえる
派|facção / grupo / partido|は
案|plano / sugestão / esboço|あん,つくえ
策|esquema / plano / política|さく
基|fundamentais / radicais (Quim.) / comtador para máquinas|き,もと,もとい
価|valor / preço|か,け,あたい
提|propor / levar junto / carregar na mão|てい,ちょう,だい,さげる
挙|levantar / plano / projeto|きょ,あげる,あがる,こぞる
応|Candidatar-se / resposta / sim|おう,よう,のう,あたる,まさに,こたえる
無|Sem valor / nada / não sou/ estou|む,ぶ,ない
企|empreenda / esquema / projeto|き,くわだてる,たくらむ
検|examinar / investigar|けん,しらべる
藤|glicina (planta)|とう,どう,ふじ
沢|brejo|たく,さわ,うるおい,うるおす
裁|alfaiate / juiz / decisão|さい,たつ,さばく
証|evidência / prova / certificado|しょう,あかし
援|encorajar / ajudar / salvar|えん
可|aceitável / não deve não / faz|か,こく,べき,べし
身|alguém / pessoa / fase da vida|しん,み
施|esmola / aplicar ataduras / adminatração de 1º socorros|し,せ,ほどこす
井|poço|せい,しょう,い
護|salvaguardar / proteger|ご,まもる
展|desdobrar / expandir|てん
態|atitude / condição / figura|たい,わざと
鮮|fresca / viva / limpa|せん,あざやか
視|inspeção / avaliar / ver|し,みる
条|artigo / cláusula / item|じょう,ちょう,でき,えだ,すじ
幹|Tronco de árvore|かん,みき
独|solteiro / só / espontaneamente|どく,とく,ひとり
宮|Templo Shinto / constelação / palácio|きゅう,ぐう,く,みや
率|razão / valor / proporção|そつ,りつ,しゅつ,ひきいる
衛|defesa / proteção|えい,え
張|alongar / sufixo para contagem de para arcos & instrumentos de corda / esticar|ちょう,はる,はり,ばり
監|fiscalizar / oficial / escritório do govêrno|かん
環|argola / círculo / elo|かん,わ
審|Inquérito / juiz / julgamento|しん,つまびらか,つぶさに
義|retidão / justiça / moralidade|ぎ
訴|acusação / processo / queixar-se de dor|そ,うったえる
株|Tora / tronco / sufixo para contagem de para pequenas plantas|しゅ,かぶ
姿|figura / formulário / forma|し,すがた
閣|torre / edifício alto / palácio|かく
韓|antigua región de China / Corea|かん,から,いげた
衆|massas / grandes números / multidão|しゅう,しゅ,おおい
評|avaliar / críticar / comentário|ひょう
岡|monte / colina / cima de una colina|こう,おか
影|sombra / silhueta / fantasma|えい,かげ
松|pinheiro|しょう,まつ
撃|batida / ataque / derrota|げき,うつ
佐|assistente / ajuda|さ
核|núcleo / centro / cerne|かく
整|organizar / arranjar / canção|せい,ととのえる,ととのう
融|dissolver / derreter|ゆう,とける,とかす
製|feito em... / manufaturado|せい
票|voto / rótulo / bilhete|ひょう
渉|vau / balsa / porto|しょう,わたる
響|eco / som / ressoar|きょう,ひびく
阪|cuesta / pendiente / abreviación de Osaka|はん,さか
推|conjecturar / inferir / convidado|すい,おす
請|solicitar / convidar / perguntar|せい,しん,しょう,こう,うける
器|utensilio / vasol / receptaculo|き,うつわ
士|cavalheiro / samurai|し,さむらい
討|castigar / atacar / derrotar|とう,うつ
攻|agressão / ataque|こう,せめる
崎|promontorio / cabo / ponta|き,さき,さい,みさき
督|técnico / comando / desejo|とく
授|comunicar / instruir / bolsa|じゅ,さずける,さずかる
催|patrocinador / manter (um encontro) / oferecer (um jantar)|さい,もようす,もよおす
及|alcance fora / exerce / exercício|きゅう,およぶ,および,および
憲|Constituição / lei|けん
離|separar / separação / digressão|り,はなれる,はなす
激|violento / obtem excitado / enraged|げき,はげしい
摘|pouco / escolher / puxão|てき,つむ
系|linhagem / sistema|けい
批|Críticar / bater|ひ
郎|filho / sufixo para contagem de filhos|ろう,りょう,おとこ
健|saudável / saúde / vigor|けん,すこやか
盟|aliança / juramento|めい
従|acompanhar / obedecer / submeter a|じゅう,しょう,じゅ,したがう,したがえる,より
修|disciplina / estudo / mestre|しゅう,しゅ,おさめる,おさまる
隊|regimento / partido / companhia|たい
織|tecer / tecido|しょく,しき,おる,おり,おり
拡|alargar / extender / expandir|かく,こう,ひろがる,ひろげる,ひろめる
故|casualidade / especialmente / intencionalmente|こ,ゆえ,ふるい,もと
振|agitar / onda / sacudir|しん,ふる,ぶる,ふり
弁|válvula / petala / trança|べん,へん,かんむり,わきまえる,わける
就|colocar / tomar partido / lado de um contrato|しゅう,じゅ,つく,つける
異|incomum / esquisito / estranho|い,こと,ことなる,け
献|oferta / sufixo p/ contagem de bebidas / presente|けん,こん,たてまつる
厳|severo / estrito / seriedade|げん,ごん,おごそか,きびしい,いかめしい
維|fibra / laço / corda|い
浜|praia / costa|ひん,はま
遺|legar / deixar para trás / reservar|い,ゆい,のこす
塁|fundamentos / base / proteção|るい,らい,すい,とりで
邦|Terra natal / país / Japão|ほう,くに
素|elementar / princípio / descoberto|そ,す,もと
遣|despacho / enviar / dar|けん,つかう,つかい,づかい
抗|confrontar / resistir / desafiar|こう,あらがう
模|imitação / cópia / burla|も,ぼ
雄|masculino / másculo / herói|ゆう,お,おす,おん
益|benefício / ganho / lucro|えき,やく,ます
緊|tenso / apertado / de confiança|きん,しめる,しまる
標|Sinal de tráfego / carimbo / marca|ひょう,しるべ,しるし
宣|proclamar / dizer / anunciar|せん,のたまう
昭|brilhar / brilhante|しょう
廃|cancelar / obsoleto / trégua|はい,すたれる,すたる
江|riacho / pequena baía em lagos / baía|こう,え
僚|colega / oficial / companheiro|りょう
吉|boa sorte / prazer / congratulações|きち,きつ,よし
盛|estrondo / prosperar / copular|せい,じょう,もる,さかる,さかん
皇|imperador|こう,おう
臨|considerar / enfrentar / reunião|りん,のぞむ
踏|passo / atropelar / persistir|とう,ふむ,ふまえる
壊|demolição / quebrar / destruir|かい,え,こわす,こわれる,やぶる
債|laço / empréstimo / dívida|さい
興|entreter / reviver / recuperar|こう,きょう,おこる,おこす
源|fonte / origem|げん,みなもと
儀|cerimônia / regra / romance|ぎ
創|gênese / ferir / dano|そう,しょう,つくる,はじめる,きず
障|impedir / ferido / dano|しょう,さわる
継|herdar / ser bem-sucedido / remendo|けい,つぐ,まま
筋|músculo / tendão / nervo|きん,すじ
狙|apuntar a / dirigirse a / ver la situación|そ,しょ,ねらう,ねらい
闘|luta / guerra|とう,たたかう,あらそう
葬|enterro / enterra / declive|そう,ほうむる
避|Evadir-se / evitar / prevenir-se|ひ,さける,よける
司|diretor / oficial / escritório do govt|し,つかさどる
康|facilidade / paz|こう
善|bom / virtuoso / bondade|ぜん,よい,いい,よく
逮|compreender / caçar|たい
迫|Urgir / forçar / esporear|はく,せまる
惑|enganar / desilusão / perplexidade|わく,まどう
崩|Demolir / murchar / aplainar|ほう,くずれる,くずれ,くずす
紀|crônica / contos / narrativa|き
聴|escutar / teimoso / investigação cuidadosa|ちょう,てい,きく,ゆるす
脱|despir / remover / escapar de|だつ,ぬぐ,ぬげる
級|classe / posição / grau|きゅう
博|Dr. / comando / estima|はく,ばく
締|apertar / amarrar / fechar|てい,しまる,しまり,しめる
救|salvação / salva / ajudar|きゅう,すくう
執|tenaz / segurar / agarrar|しつ,しゅう,とる
房|moita / franja / punhado|ぼう,ふさ
撤|remover / retirar / desarmar|てつ
削|Avião / afiar / descascar|さく,けずる,はつる,そぐ
密|segredo / densidade / pormenor|みつ,ひそか
措|por de lado / desistir / suspender|そ,おく
志|intenção / plano / resolver|し,シリング,こころざす,こころざし
載|carga / multiplicação / força|さい,のせる,のる
陣|acampamento / arranjo na batalha / posições|じん
我|ego / Eu / egoísta|が,われ,わ,わが
為|mudança / benefício / bem-estar|い,ため,なる,なす
抑|reprimir / bem / agora|よく,おさえる
幕|cortina / pano p/ decoração / atuar em peças teatrais|まく,ばく,とばり
染|tinta / cor / pintura|せん,そめる,ぞめ,ぞめ
奈|Nara / ¿que tal? / ¿por qué?|な,ない,だい,いかん,からなし
傷|machucado / ferido / ferir|しょう,きず,いたむ,いためる
択|escolher / selecionar / eleger|たく,えらぶ
秀|superar / excelência / beleza|しゅう,ひいでる
徴|indicações / sinal / presságios|ちょう,ち,しるし
弾|Bala (arma) / fanhoso / sacudidela|だん,たん,ひく,ひき,はずむ
償|reparação / compensação / recompensa|しょう,つぐなう
功|realização / méritos / sucesso|こう,く,いさお
拠|apoio para os pés / baseado em / segue|きょ,こ,よる
秘|segredo / esconder|ひ,ひめる,ひそか,かくす
拒|repelir / recusar / rejeitar|きょ,ご,こばむ
刑|Punir / penalidade / sentença|けい
塚|morro / monte|ちょう,つか,づか
致|fazer / enviar / transmitir|ち,いたす
繰|curva / bobina / giro|そう,くる
尾|rabo / fim / sufixo para contagem de p/ peixes|び,お
描|esboço / compor / escrever|びょう,えがく,かく
鈴|pequeno sino / campainha|れい,りん,すず
盤|bandeija / taça rasa / tijela|ばん
項|parágrafo / nuca / cláusula|こう,うなじ
喪|perda / luto|そう,も
伴|consorte / acompanhar / trazer com|はん,ばん,ともなう
養|alimentar / educar / cultivar|よう,りょう,やしなう
懸|suspender / pendurar / 10%|けん,け,かける,かかる
街|bulevar / rua / cidade|がい,かい,まち
契|penhor / promessa / voto|けい,ちぎる
掲|colocar (um aviso) / propor / alçar|けい,かかげる
躍|saltar / dançar / pular|やく,おどる
棄|desembaraço / gastar / descartar|き,すてる
邸|residência / mansão|てい,やしき
縮|encolher / contrair / enrugar|しゅく,ちぢむ,ちぢまる,ちぢめる
還|devolver / voltar|かん,かえる
属|pertencer / gênero / oficial subordinado|ぞく,しょく,さかん,つく,やから
慮|prudência / pensamento / assunto|りょ,おもんぱくる,おもんぱかる
枠|moldura / estrutura / carretel|わく
恵|favor / benção / graça|けい,え,めぐむ,めぐみ
露|orvalho / lágrimas / mortalidade|ろ,ろう,つゆ
沖|oceano aberto / mar aberto / subir no ceú|ちゅう,おき,おきつ,ちゅうする
緩|afrouxar / relaxar / diminuir|かん,ゆるい,ゆるやか,ゆるむ
節|nó / estação / período|せつ,せち,ふし,ぶし,のっと
需|demanda / solicitação / necessidade|じゅ
射|dispare / brilha dentro / sobre|しゃ,いる,さす,うつ
購|assinatura / compra|こう
揮|agitar / onda / sacudir|き,ふるう
充|divida / encher|じゅう,あてる,みたす
貢|tributo / apoiar / financiar|こう,く,みつぐ
鹿|venado / ciervo|ろく,しか,か
却|ao invés / ao contrário / melhor|きゃく,かえって,しりぞく,しりぞける
端|margem / origem / fim|たん,はし,は,はた
賃|taxa / alugar / aluguel|ちん
獲|prender / obter / achar|かく,える
郡|condado / distrito / comarca|ぐん,こおり
併|unir / reúnir / coletivo|へい,あわせる
徹|penetrar / limpar / furar|てつ
貴|precioso / valor / prêmio|き,たっとい,とうとい,たっとぶ
埼|cabo / espita / promontorio|き,さき,さい,みさき
衝|colidir / o mais forte / rodovia|しょう,つく
焦|apressar / impaciente / irritar|しょう,こげる,こがす,こがれる
奪|roubar / tomar pela força / apropriar-se|だつ,うばう
災|desastre / calamidade / desgraça|さい,わざわい
浦|baía / riacho / pequena baía|ほ,うら
析|picar / dividir / lágrima|せき
譲|adiar / mudança / transferir|じょう,ゆずる
称|apelação / elogio / admirar|しょう,たたえる,となえる,あげる
納|acordo / obtem / colheita|のう,なっ,な,おさめる,おさめる,おさまる
樹|Madeira-de-lei / madeira|じゅ,き
挑|desafio / lutar para / fazer amor|ちょう,いどむ
誘|atrair / primazia / tentação|ゆう,さそう,いざなう
紛|distrair / ser incorreto para / desviar-se|ふん,まぎれる,まぎれ,まぎらす
至|clímax / chegar / continuar|し,いたる
宗|religião / seita / denominação|しゅう,そう,むね
促|estimular / desejo / imprensa|そく,うながす
慎|humildade / cuidado / discreto|しん,つつしむ,つつましい,つつし
控|retirar / extrair / devolver|こう,ひかえる,ひかえ
握|agarrar / segurar / moldar sushi|あく,にぎる
宙|aéreo / ar / espaço|ちゅう
俊|sagaz / gênio / excelência|しゅん
銭|moeda / .01 iene / dinheiro|せん,ぜん,ぜに,すき
渋|adstringente / hesitar / relutante|じゅう,しゅう,しぶ,しぶい,しぶる
銃|Armas / arma de fogo|じゅう,つつ
操|manobra / manipular / opera|そう,さん,みさお,あやつる
携|portátil / carregar (na mão) / armado com|けい,たずさえる,たずさわる
診|checkup / vendo / diagnosticar|しん,みる
託|consignar / solicitar / confiar|たく,かこつける,かこつ,かこつける
撮|instantâneo / tirar fotos|さつ,とる,つまむ,どり
誕|natividade / nascer / decadência|たん
侵|usurpar / invadir / raid|しん,おかす
括|fechar / amarrar / prisão|かつ,くくる
謝|pedir desculpas / agradecer / recusar|しゃ,あやまる
孝|piedade filial / respeito pelas crianças|こう,きょう
駆|dirigir / corrida / galope|く,かける,かる
透|transparente / permeear / filtrar|とう,すく,すかす,すける
津|abrigo / porto / balsa|しん,つ
壁|parede / forro / cerca|へき,かべ
稲|planta de arroz|とう,て,いね,いな
仮|fingimento / temporário / interim|か,け,かり,かり
裂|partir / arrancar / lágrimas|れつ,さく,さける,ぎれ
敏|inteligência / ágil / alerta|びん,さとい
是|somente assim / isto / certo|ぜ,し,これ,この,ここ
排|repudiar / excluir / expelir|はい
裕|fértil / rico / abundante|ゆう
堅|de confiança / apertado / duro|けん,かたい,がたい
訳|traduzir / razão / circunstância|やく,わけ
芝|gramado / relva|し,しば
綱|amarrio / classe (gênero em biologia) / corda|こう,つな
典|código / cerimônia / lei|てん,でん
賀|congratulações / prazer|が
扱|cabo / entreter / debulhar|そう,きゅう,あつかい,あつかう,あつかる
顧|recordar / revisão / auto-examinar|こ,かえりみる
看|Observar / superviosionar|かん,みる
訟|processar / acusar|しょう
戒|mandamentos|かい,いましめる
祉|bem-estar / felicidade|し
誉|reputação / elogio / honra|よ,ほまれ,ほめる
歓|deleite / prazer|かん,よろこぶ
奏|tocar música / audiência / completar|そう,かなでる
勧|persuadir / recomendar / aconselhar|かん,けん,すすめる
騒|vociferante / barulhento / clamor|そう,さわぐ,うれい,さわがしい
閥|grupo / linhagem / pedigree|ばつ
甲|armadura / alto (voz) / Um grau|こう,かん,きのえ
縄|corda de palha / corda|じょう,なわ,ただす
郷|cidade natal / aldeia / lugar de nascimento|きょう,ごう,さと
揺|balançar / agitar / oscilação|よう,ゆれる,ゆる,ゆらぐ
免|Desculpar / demissão|めん,まぬかれる,まぬがれる
既|previamente / já / há muito tempo|き,すでに
薦|recomendar / esteira / aconselhar|せん,すすめる
隣|vizinho|りん,となる,となり
華|esplendor / flor / pétala|か,け,はな
範|modelo / exemplo|はん
隠|esconder / esconderijo / capa|いん,おん,かくす,かくし,かくれる
徳|benevolência / virtude / bondade|とく
哲|filosofia / clarear|てつ,さとい,あきらか
杉|cedro|さん,すぎ
里|aldeia / casa paterna / légua|り,さと
釈|explicação|しゃく,せき,とく,すてる,ゆるす
己|Próprio / cobra / serpente|こ,き,おのれ,つちのと,な
妥|suave / paz / corrupção|だ
威|intimidar / dignidade / majestade|い,おどす,おどし,おどかす
豪|predominar / grande / poderoso|ごう,えらい
熊|oso|ゆう,くま
滞|estagnar / demorar-se / atrasar-se|たい,てい,とどこおる
微|delicado / miudeza / insignificancia|び,かすか
隆|corcova / alto / nobre|りゅう
症|sintomas / doença|しょう
暫|temporariamente / por enquanto / momento|ざん,しばらく
忠|lealdade / fidelidade|ちゅう
倉|depósito / armazém / porão|そう,くら
肝|fígado / vísceras / nervo|かん,きも
喚|Gritar / choro / grito|かん,わめく
沿|correr ao lado / seguir ao longo / beira|えん,そう,ぞい
妙|estranho / seleto / afeminado|みょう,びょう,たえ
唱|canto / recital / gritar|しょう,となえる
索|corda / cabo|さく
誠|sinceridade / advertir / avisar|せい,まこと
襲|ataque / avançar / ser bem-sucedido|しゅう,おそう,かさね
懇|sociável / espécie / cordial|こん,ねんごろ
俳|haiku / ator|はい
柄|projeto / modelo / construção|へい,がら,え,つか
驚|maravilha / ser surpreendido / assustadoa|きょう,おどろく,おどろかす
麻|cânhamo / linho|ま,まあ,あさ
剤|dose / remédio / droga|ざい,すい,せい,かる,けずる
瀬|corredeiras / corrente / torrente|らい,せ
趣|essência / continuar para / tender|しゅ,おもむき,おもむく
陥|colapso / desmoronar / ruir|かん,おちいる,おとしいれる
斎|purificação / comida de Budistas / quarto|さい,とき,つつしむ,ものいみ
貫|furar / medida de peso com 8 1/ 3 lbs / penetrar|かん,つらぬく,ぬく,ぬき
仙|Eremita / mago / centavo|せん,せんと
慰|consolo / divertimento / sedução|い,なぐさめる,なぐさむ
序|prefácio / começo / pedido|じょ,ついで,ついで
旬|decameron / 10 dias / estação (para produtos específicos|じゅん,しゅん
兼|Concorrentemente / e|けん,かねる,かねる
聖|santo / sagrado / sábio|せい,しょう,ひじり
旨|delicioso / sabor / mostra um gosto para|し,むね,うまい
即|instante / a saber / como está|そく,つく,つける,すなわち
柳|salgueiro|りゅう,やなぎ
舎|casa de campo / pousada / cabana|しゃ,せき,やどる
偽|falsidade / mentira / enganar|ぎ,か,いつわる,にせ,いつわり
較|contraste / comparar|かく,こう,くらべる
覇|hegemonia / supremacia / liderança|は,はく,はたがしら
畑|fazenda / campo / jardim|はた,はたけ,ばたけ
詳|detalhado / cheio / bem-informado|しょう,くわしい,つまびらか
抵|resistir / alcançar / tocar|てい
脅|ameaçar / coagir|きょう,おびやかす,おどす,おどかす
茂|Coberto de plantas / cresce forte / luxuriante|も,しげる
犠|Sacrifício|ぎ,き,いけにえ
旗|bandeira nacional / bandeira / padrão|き,はた
距|Longa distância|きょ,へだたる,けづめ
雅|elegante / benévolo / gracioso|が,みやび
飾|decorar / ornamento / adornar|しょく,かざる,かざり
網|enredar / rede|もう,あみ
竜|dragão imperial|りゅう,りょう,ろう,たつ,いせ
詩|poema / poesia|し,うた
繁|luxuriante / espesso / coberto de vegetação|はん,しげる,しげく
翼|asa / avião / flanco|よく,つばさ
茨|espina / zarza|し,じ,いばら,かや,くさぶき
潟|lagoa|せき,かた,がた
敵|inimigo / adversário|てき,かたき,あだ,かなう
魅|fascinação / charme / fascinar|み
嫌|desgostar / detestar / odiar|けん,げん,きらう,きらい,いや
斉|ajustado / da mesma forma / igual|せい,さい,そろう,ひとしい,ひとしく
敷|espalhar / pavimentar / assentar|ふ,しく,しき
擁|abraçar / possuir / proteger|よう
圏|esfera / círculo / raio|けん,かこい
酸|ácido / amargo / azedo|さん,すい
罰|penalidade / punição|ばつ,ばち,はつ,ばっする
滅|destruir / arruinar / extinguir|めつ,ほろびる,ほろぶ,ほろぼす
礎|Pedra angular / pedra de fundação|そ,いしずえ
腐|prodre / apodrecer / azedar|ふ,くさる,くさる,くされる
脚|derrapagens / perna / armação|きゃく,きゃ,かく,あし
潮|maré / água salgada / oportunidade|ちょう,しお,うしお
梅|ameixa|ばい,うめ
尽|acabar / exaurir / terminar|じん,さん,つくす,つくす,づくし
僕|me / a mim / Eu (masculino)|ぼく,しもべ
桜|cerejeira|おう,よう,さくら
滑|Escorregadio / deslizar / escorregar|かつ,こつ,すべる,なめらか
孤|órfão / só|こ
炎|inflamação / chama / fogo|えん,ほのお
賠|compensação / indenização|ばい
句|frase / cláusula / sentença|く
寿|longevidade / congratulações / vida natural|じゅ,す,しゅう,ことぶき,ことぶく,ことほぐ
鋼|aço|こう,はがね
頑|tolo / teimoso / firmamente|がん,かたく
鎖|cadeias / ferros / conexão|さ,くさり,とざす
彩|colorindo / pintura / maquilagem|さい,いろどる
摩|escoriação / raspar / polir|ま,まする,さする,する
励|encorajar / estar diligente / inspirar|れい,はげむ,はげます
縦|vertical / comprimento / altura|じゅう,たて
輝|brilho / luzir / centelha|き,かがやく
蓄|acumular / ter uma concubina / fonógrafo|ちく,たくわえる
軸|eixo / pivô / talo|じく
巡|patrulhar / dar uma volta / circunferência|じゅん,めぐる,めぐり
稼|salário / trabalhar / ganhar dinheiro|か,かせぐ
瞬|pestanejar / piscar|しゅん,またたく,まじろぐ
砲|canhão / arma|ほう
噴|irromper / repuxo / emitir|ふん,ふく
誇|contar vantagem / estar orgulhoso / orgulho|こ,ほこる
祥|auspicioso / felicidade / bons auspícios|しょう,さいわい,きざし,よい
牲|Sacrifício animal / oferta|せい
秩|regularidade / salário / pedido|ちつ
帝|soberano / o imperador / Deus|てい,みかど
唆|tentação / sedução / instigar|さ,そそる,そそのかす
阻|demover / separar de / previnir|そ,はばむ
泰|pacífico / calma / paz|たい
賄|suborno / conselho (adm.) / oferta|わい,まかなう
撲|tapa / bater / acesso|ぼく
堀|trincheira / fosso / canal|くつ,ほり
菊|crisântemo|きく
絞|estrangular / apertar / torcer|こう,しぼる,しめる,しまる
縁|afinidade / relação / conexão|えん,ねん,ふち,ふちどる,ゆかり
唯|somente / unicamente / meramente|ゆい,い,ただ
膨|inchar / engordar / espesso|ぼう,ふくらむ,ふくれる
矢|dardo / flecha|し,や
耐|A prova de / duradouro|たい,たえる
塾|escola p/ reforço / escola particular|じゅく
漏|vazamento / escapar / tempo|ろう,もる,もれる,もらす
慶|júbilo / congratular / regozijar-se|けい,よろこび
猛|feroz / enfurecer / acelerar|もう
芳|perfume / calmante / cheiroso|ほう,かんばしい
懲|penal / castigar / punir|ちょう,こりる,こらす,こらしめる
剣|sabre / espada / lâmina|けん,つるぎ
彰|patente / clarear|しょう
棋|peça de xadrez / xadrez Japonês / shogi|き,ご
丁|rua / departamento / cidade|ちょう,てい,ちん,ひのと
恒|constância / sempre|こう,つね,つねに
揚|levantar / fritar em gordura funda|よう,あげる,あげ,あがる
冒|risco / enfrentar / desafiar|ぼう,おかす
曽|antes / anteriormente / hasta ahora|そう,そ,ぞう,かつ,かつて,すなわち
倫|ética / companheiro|りん
陳|exibição / estado / relacionar|ちん,ひねる
憶|lembrança / pensar / recordar|おく
潜|submergir / esconder / ocultar|せん,ひそむ,もぐる,かくれる
梨|peral / pera|り,なし
仁|humanidade / virtude / benevolência|じん,に,にん
克|Superar / bondoso / habilmente|こく,かつ
岳|ponto / pico / montanha|がく,たけ
概|contorno / condição / aproximação|がい,おおむね
拘|prisão / prender / interessada|こう,かかわる
墓|tumba / túmulo|ぼ,はか
黙|silêncio / tornar-se silencioso / parar de falar|もく,ぼく,だまる,もだす
須|instante / desear / anhelar|す,しゅ,すべからく,すべし,ひげ
偏|parcial / lado / lado esquerdo|へん,かたよる
雰|atmosfera / nevoeiro|ふん
遇|entrevista / convite / entreter|ぐう,あう
諮|Consultar-se|し,はかる
狭|limitar / estreitar / contrair|きょう,こう,せまい,せばめる,せばまる
卓|eminente / tabela / mesa|たく
亀|tortuga|き,きゅう,きん,かめ
糧|provisões / comida / pão|りょう,ろう,かて
簿|registro / registrar em livros|ぼ
炉|lareira / forno / fornalha|ろ,いろり
牧|raça / importar-se / guiar|ぼく,まき
殊|particularmente / especialmente / excepcionalmente|しゅ,こと
殖|aumentar / aumento / multiplicar|しょく,ふえる,ふやす
艦|navio de guerra|かん
輩|camarada / companheiro / colega|はい,ばら,やから,やかい
穴|buraco / orifício / brecha|けつ,あな
奇|estranho / estranheza / curiousidade|き,くしき,あやしい,くし
慢|ridículo / preguiçoso|まん
鶴|grulla / cigüeña|かく,つる
謀|conspirar / engano / impor|ぼう,む,はかる,たばかる,はかりごと
暖|caloroso|だん,のん,あたたか,あたたかい,あたたまる
拍|aplauso / batida (música)|はく,ひょう
朗|melódico / limpa / alegre|ろう,ほがらか,あきらか
丈|comprimento / 10 pés / medida|じょう,たけ,だけ
寛|tolerante / leniente / generosidade|かん,くつろぐ,ひろい,ゆるやか
覆|emborcar / capa / matiz|ふく,おおう,くつがえす,くつがえる
胞|placenta / bolsa / estojo|ほう
泣|choro / chorar / lamento|きゅう,なく
隔|isolar / alternar / distância|かく,へだてる,へだたる
浄|limpar / purificar / limpeza|じょう,せい,きよめる,きよい
没|afogar / afundar / esconder|ぼつ,もつ,おぼれる,しずむ,ない
暇|tempo livre / descanso / lazer|か,ひま,いとま
肺|pulmões|はい
貞|correto / casto / constância|てい,さだ
鑑|espécime / se precaver / aprender o|かん,かんがみる,かがみ
飼|domesticar / levantar / guardar|し,かう
陰|matiz / yin / negativa|いん,かげ,かげる
銘|inscrição / assinatura (de artesão)|めい
随|seguir / embora / não obstante|ずい,まにまに,したがう
烈|severo / furioso / veemente|れつ,はげしい
尋|indagar / aprofundar / procurar|じん,たずねる,ひろ
稿|esboço / cópia / manuscrito|こう,わら,したがき
丹|Ferrugem / colorido / vermelho|たん,に
啓|revelar / abrir / dizer|けい,ひらく,さとす
丘|morro / colina|きゅう,おか
棟|Trave horizontal / sulcar|とう,むね,むな
壌|muito / terra / solo|じょう,つち
漫|desenho animado / involuntariamente / no interesse de a si próprio|まん,みだりに,そぞろ
玄|misterioso / oculto|げん,くろ,くろい
粘|grudento / aglutinado / gorduroso|ねん,ねばる
悟|Iluminação (budismo) / perceber / discernir|ご,さとる
舗|Loja|ほ
妊|gravidez|にん,じん,はらむ,みごもる
熟|maturar / amadurecer / amadurecimento|じゅく,うれる
恩|graça / gentileza / bondade|おん
騰|inflação / avançar / ir|とう,あがる,のぼる
往|viagem / caça embora / deixada ir|おう,いく,いにしえ,さきに
豆|feijões / ervilha / nanico|とう,ず,まめ,まめ
遂|consumir / efetuar / atingir|すい,とげる,ついに
狂|lunático / louco / insano|きょう,くるう,くるおしい,くるおしい
栃|castaño de indias|とち
岐|ramo cortado / bifurcação / cena|き,ぎ
陛|alteza / degraus (do trono)|へい
緯|horizontal / trama / esquerda & direita|い,よこいと,ぬき
培|cultivar / alimentar|ばい,つちかう
衰|decadência / decadente / enfraquecer|すい,おとろえる
艇|Barco a remo / pequeno barco|てい
屈|encruzilhada / curva / hesitação|くつ,かがむ,かがめる
径|diâmetro / caminho / método|けい,みち,こみち,さしわたし
淡|magro / desmaiar / passageiro|たん,あわい
抽|puxão / puxar / extrato|ちゅう,ひき
披|expor / abrir|ひ
廷|quadras / quadra imperial / escritório de governo|てい
錦|brocado / vestido fino / bello|きん,にしき
准|quase- / semi- / associar|じゅん
暑|sufocante / quente / calor de verão|しょ,あつい
奨|exortar / desejar / encorajar|しょう,そう,すすめる
浸|imergir / ensopar / mergulhar|しん,ひたす,ひたる,つかる
剰|excedente / além disso|じょう,あまつさえ,あまり,あまる
胆|Bexiga irritadaa / coragem / orgãos internos|たん,きも
繊|delgado / fino / kimono fino (espessura)|せん
駒|potro / caballo / pieza (shogi)|く,こま
虚|vazio / vacuidade / despreparo|きょ,こ,むなしい,うつろ
霊|espíritos / alma / fantasmas|れい,りょう,たま
帳|caderno / livro contábil / álbum|ちょう,とばり
悔|Arrepender-se / lamentar|かい,くいる,くやむ,くやしい
諭|repreensão / advertir / carga|ゆ,さとす
惨|desprezível / desastre / crueldade|さん,ざん,みじめ,いたむ,むごい
虐|tiranizar / oprimir|ぎゃく,しいたげる
翻|sacudidela / virar / onda|ほん,はん,ひるがえる,ひるがえす
墜|colisão / queda|つい,おちる,おつ
沼|pântano / lago / charco|しょう,ぬま
据|establecer / situar / emplazar|きょ,すえる,すわる
肥|fertilizar / engordar / fértil|ひ,こえる,こえ,こやす
徐|gradualmente / lentamente / deliberadamente|じょ,おもむろに
糖|açúcar|とう
搭|juntar / carregar (um veículo) / viagem|とう
盾|escudo / brasão / escusa|じゅん,たて
脈|veia / pulso / esperança|みゃく,すじ
滝|cachoeira / corredeira / cascata|ろう,そう,たき
軌|Sulco de rodas / roda / trilha|き
俵|bolsa / fardo / sacola|ひょう,たわら
妨|perturbar / prevenir / atrasar|ぼう,さまたげる
擦|arranhar / esfregar / coçar|さつ,する,すれる,ずれ
鯨|baleia|げい,くじら
荘|palacete / pousada / casa de campo|そう,しょう,ちゃん,ほうき,おごそか
諾|consentir / consentimento / acordo|だく
雷|trovão / raio|らい,かみなり,いかずち,いかづち
漂|rumo / bóiar (em líquido)|ひょう,ただよう
懐|bolso / sentimentos / coração|かい,え,ふところ,なつかしい,なつかしむ
勘|intuição / percepção|かん
栽|plantação / planta|さい
拐|seqüestrar / falsificar|かい
駄|Incômodo / bando de cavalos / carga de cavalos|だ,た
添|anexar / acompanhar / casa|てん,そえる,そう
冠|coroa / melhor / inigualável|かん,かんむり
斜|diagonal / inclinado / oblíquo|しゃ,ななめ,はす
鏡|espelho / espéculo / cano principal|きょう,けい,かがみ
浪|vagabundando / ondas / vagas|ろう
亜|Ásia / próxima / o que vem depois|あ,つぐ
覧|Ler com atenção / ver|らん,みる
詐|mentira / falsidade / enganar|さ,いつわる
壇|podium / palco / púlpito|だん,たん
勲|ato meritório / mérito|くん,いさお
魔|bruxa / demônio / espírito do mal|ま
酬|recompensar / recompensa / retribuição|しゅう,しゅ,とう,むくいる
紫|roxo / violeta|し,むらさき
紋|Brazão de família / figuras|もん
卸|venda por atacado|しゃ,おろす,おろし,おろし
奮|revigorar / florescer|ふん,ふるう
欄|coluna / corrimão / vazio|らん,てすり
逸|desviar-se / indolência / lazer|いつ,それる,そらす,はぐれる
涯|horizonte / costa|がい,はて
拓|limpar (a terra) / abrir / abrir (terra)|たく,ひらく
眼|globo ocular|がん,げん,まなこ,め
獄|prisão / cadeia|ごく
尚|estima / além disso / ainda|しょう,なお
阜|colina / montículo / grande|ふ,ふう
彫|cinzelar / esculpir / cinzel|ちょう,ほる,ぼり
穏|calma / tranquilidade / moderação|おん,おだやか
顕|aparecer / existente|けん,あきらか,あらわれる
巧|hábil / engenhoso|こう,たくみ,たくむ,うまい
矛|alabarda / armas / carro alegórico|む,ぼう,ほこ
垣|barreira / cerca / parede|えん,かき
欺|engano / fraude / iludir|ぎ,あざむく
釣|pesca / peixe / pegar|ちょう,つる,つり,つり
粧|cosméticos / enfeitar-se|しょう
葛|arrowroot / kudzu|かつ,かち,つづら,くず
粛|solenemente / calmamente / suavemente|しゅく,すく,つつしむ
愚|tolo / tolice / disparate|ぐ,おろか
遭|encontro / reunião / festa|そう,あう,あわせる
架|eregir / moldura / monte|か,かける,かかる
鬼|fantasma / diabo / demônio|き,おに,おに
庶|mais comum / tudo / bastardo|しょ
稚|jovem / imaturo|ち,じ,いとけない,おさない,おくて
滋|nutrir / mais & mais / ser luxuriante|じ,し
幻|fantasma / visão / sonho|げん,まぼろし
煮|ferver / cozinhar|しゃ,にる,に,にえる
姫|princesa|き,ひめ,ひめ
誓|voto / jurar / penhor|せい,ちかう
把|agarre / pacote / punhado|は,わ
践|pisar / dar um passo / passar por cima|せん,ふむ
呈|mostrar / oferecer / apresentar|てい
疎|desviar / rude / negligenciar|そ,しょ,うとい,うとむ,まばら
仰|Rosto para cima / melhorar / depender|ぎょう,こう,あおぐ,おおせ,おっしゃる
剛|robusto / vigor|ごう
疾|ligeiramente|しつ,はやい
征|subjugar / atacar rebeldes / coletar impostos|せい
砕|quebrar / quebrado / esmagar|さい,くだく,くだける
謡|Canto de teatro noh|よう,うたい,うたう
嫁|Casar / noiva|か,よめ,とつぐ,いく
謙|Desvanecer-se / ficar humilde / comdescender|けん,へりくだる
后|imperatriz / rainha / depois|こう,ご,きさき
嘆|suspiro / lamento / pesar|たん,なげく,なげかわしい
菌|germe / fungo / bactérias|きん
鎌|hoz / guadaña|れん,けん,かま
巣|ninho / viveiro / colméia|そう,す,すくう
頻|repetidamente / recorrente|ひん,しきりに
琴|harpa / koto (mus.)|きん,ごん,こと
班|esquadra / corpos (mil.) / unidade|はん
棚|prateleira / apoio / moldura|ほう,たな,だな
潔|incorrupto / puro / limpar|けつ,いさぎよい
酷|injusto / cruel / severo|こく,ひどい
宰|supervisionar / administrador / regra|さい
廊|corredor / ala / torre|ろう
寂|isolamento / calmamente / amadurecer|じゃく,せき,さび,さびしい,さびれる
伏|prostrado / curva abaixo / proa|ふく,ふせる,ふす
碁|Jogo de Go|ご
俗|vulgar / costumes / maneiras|ぞく
漠|vago / obscurecer / deserto|ばく
邪|malvado / injustiça / errado|じゃ,よこしま
晶|faísca / claro / cristalino|しょう
墨|tinta preta / tinta da Índia / pau de tinta|ぼく,すみ
鎮|tranqüilizar / centros para preservação da paz|ちん,しずめる,しずまる,おさえ
洞|gruta / caverna / escavação|どう,ほら
履|calçado / sapatos / botas|り,はく
劣|inferioridade / está inferiorizado / piorar|れつ,おとる
那|abundante / ¿qué?|な,だ,なに,なんぞ,いかん
殴|assalto / ataque / batida|おう,なぐる
娠|grávida / gravidez|しん
奉|observância / oferecer / presente|ほう,ぶ,たてまつる,まつる,ほうずる
憂|melancolia / luto / lamento|ゆう,うれえる,うれい,うい
朴|simples / cru / planície|ぼく,ほう,ほお,えのき
亭|pavilhão / restaurante / mansão|てい,ちん
怪|Suspeito / mistério / aparição|かい,け,あやしい,あやしむ
酔|bêbado / sentir-se mal / envenenado|すい,よう,よい,よ
惜|compaixão / poupar / frugal|せき,おしい,おしむ
穫|colheita / colher|かく
佳|bom / belo / excelente|か
潤|molhado / molhar-se / lucrar|じゅん,うるおう,うるおす,うるむ
悼|lamento / sentir pesar|とう,いたむ
乏|privação / escasso / limitado|ぼう,とぼしい,ともしい
該|Acima declarado / o dito / isso específico|がい
赴|continuar / obterm / tornar-se|ふ,おもむく
桑|amora|そう,くわ
髄|Tutano / medula / miolo|ずい
虎|tigre|こ,とら
盆|bacia / bandeja|ぼん
穂|espiga (grão) / penacho (planta) / crista (onda)|すい,ほ
壮|robusto / másculo / prosperidade|そう,さかん
堤|represa / dique|てい,つつみ
飢|faminto / morrer de fome|き,うえる
傍|espectador / além disso / enquanto|ぼう,かたわら,わき,おか
疫|epidemia|えき,やく
累|acumular / envolvimento / problemas|るい
痴|tolo / estúpido|ち,しれる,おろか
搬|Correia transportadora / carregar / transportar|はん
癒|restabelecimento / cura / saciar (sede)|ゆ,いえる,いやす,いやす
寸|medição / medida valendo pés/ 10|すん
郭|cercado / quarteirão / fortificação|かく,くるわ
尿|Urina|にょう,ゆばり,いばり,しと
凶|vilão / mau / sorte ruim|きょう
吐|cuspir / vômito / arroto|と,はく,つく
宴|banquete / festa|えん,うたげ
賓|V.I.P. / convidado especial|ひん
虜|cativo / bárbaro / epíteto ofensivo ao inimigo|りょ,ろ,とりこ,とりく
陶|cerâmica / porcelana|とう,すえ
鐘|sino / gongo / carrilhão|しょう,かね
憾|remorso / pesar / estar triste|かん,うらむ
畿|capital / alrededores de la capital / antigua capital china|き,みやこ
磁|imã / porcelana|じ
弥|más aún / progresivamente|み,び,や,いや,いよいよ
昆|descendentes / irmão mais velho|こん
粗|grosseiro / rude / áspero|そ,あらい,あら
訂|revisar / corrigir / decidir|てい,ただす
芽|botão / broto / brotar|が,め
尻|asentaderas / trasero / culo|こう,しり
傘|guarda-chuva|さん,かさ
騎|cavaleiro / equitação / sufixo para contagem de cavalos|き
寧|melhor / preferivelmente|ねい,むしろ
循|sequencial / companheiro|じゅん
忍|suporte / carregar / tolerar|にん,しのぶ,しのばせる
怠|negligenciar / preguiça|たい,おこたる,なまける
如|semelhança / gostar / tal como|じょ,にょ,ごとし
寮|dormitório / hospedaria / palacete|りょう
鉛|primazia|えん,なまり
珠|pérola / gema / jóia|しゅ,たま
凝|congelar / geada / rígida|ぎょう,こる,こらす,こごらす
苗|Muda (planta) / broto|びょう,みょう,なえ,なわ
獣|animal / besta|じゅう,けもの,けだもの
哀|patético / pesar / pena|あい,あわれ,あわれむ,かなしい
跳|pulo / saltar / pular|ちょう,はねる,とぶ,とび
匠|artesão / carpinteiro|しょう,たくみ
垂|declínio / suspender / pendurar|すい,たれる,たらす,たれ
蛇|cobra / serpente / bebedor duro|じゃ,だ,い,へび
澄|lucidez / limpar-se / limpar|ちょう,すむ,すます,すます
縫|costurar / cozer / borda|ほう,ぬう
僧|Monge budista|そう
眺|fitar / observar / olhar|ちょう,ながめる
唐|T'ang / China|とう,から
呉|dê / fazer alguma coisa para|ご,くれる,くれ
凡|medíocre|ぼん,はん,およそ,おうよそ,すべて
憩|recesso / descanso / relaxar|けい,いこい,いこう
媛|mujer bella / princesa|えん,ひめ
溝|ranhura / canal / encanamento|こう,みぞ
恭|respeito / reverencia|きょう,うやうやしい
刈|corte / acerto / aparar|がい,かい,かる
睡|sonolento / sono / morte|すい,ねむる,ねむい
錯|confundir / mistura / está em desordem|さく,しゃく
伯|chefe / conta / conde|はく
穀|cereais / grão|こく
柿|persimmon|し,かき
陵|mausoleo / túmulo imperial|りょう,みささぎ
霧|nevoeiro / névoa / neblina|む,ぼう,ぶ,きり
魂|alma / espírito|こん,たましい,たま
弊|abuso / mau / mal|へい
妃|rainha / princesa|ひ,きさき
舶|Navio de linha regular / nave|はく
餓|Morrer de fome / com fome / sede|が,うえる
腎|riñón / cosa importante|じん
窮|endurecer / destituído / sofrer|きゅう,きょう,きわめる,きわまる,きわまり
掌|manipular / regra / administrar|しょう,てのひら,たなごころ
麗|amável / companheiro|れい,うるわしい,うららか
臭|fedendo / cheiro de doença / parecer suspeito|しゅう,くさい,くさい,におう
釜|caldero / cacerola / olla|ふ,かま
悦|êxtase / prazer|えつ,よろこぶ,よろこばす
刃|lâmina / espada / margem|じん,にん,は,やいば,きる
縛|atar / prender / unir|ばく,しばる
暦|calendário / almanaque|れき,りゃく,こよみ
宜|melhores cumprimentos / bons|ぎ,よろしい,よろしく
盲|cortina / homem cego / ignorante|もう,めくら
粋|chique / estilo / pureza|すい,いき
辱|embaraçar / humilhar / envergonhar|じょく,はずかしめる
轄|controlar / cunha|かつ,くさび
猿|Macaco|えん,さる
弦|Corda (arco / violão) / corda|げん,つる
窒|tampar / obstruir / colocar um batoque|ちつ
炊|cozinhar / ferver|すい,たく,だき
洪|dilúvio / enchente / vasto|こう
摂|indireto / substituto / agir além de|せつ,しょう,おさめる,かねる,とる
飽|saciado / cansado de / entediado|ほう,あきる,あかす,あく
冗|supérfluo / inútil|じょう
桃|pêssegueiro|とう,もも
狩|caçar / incursão / juntar|しゅ,かる,かり,がり
朱|vermelhão / zinabre / escarlate|しゅ,あけ
渦|redemoinho / turbilhão|か,うず
紳|sire / cavalheiro / artigos p/ cavalheiros|しん
枢|dobradiça / pivô / porta|すう,しゅ,とぼそ,からくり
碑|lápide / monumento|ひ,いしぶみ
鍛|forjar / disciplinar / treinar|たん,きたえる
刀|espada / sabre / faca|とう,かたな,そり
鼓|tambor / batida / despertar|こ,つづみ
裸|descoberto / nu / parcialmente vestido|ら,はだか
猶|além disso / ainda|ゆう,ゆ,なお
塊|grumo / montículo / reboco|かい,け,かたまり,つちくれ
旋|rotação / ir de uma lado para outro|せん,めぐる,いばり
弓|arquear / arco (arma / violino)|きゅう,ゆみ
幣|Caixa / maus hábitos / prefixo p/ expressar humildade|へい,ぬさ
膜|membrana|まく
扇|Leque. Leque de dobrar|せん,おうぎ
脇|axila / sobaco / flanco|きょう,わき,わけ
腸|intestinos / abdomen / tripas|ちょう,はらわた,わた
槽|barril / balde / tanque|そう,ふね
鍋|cazuela / cacerola / fondo (cazuela)|か,なべ
慈|misericórdia|じ,いつくしむ
伐|Derrotado / bater / ataque|ばつ,はつ,か,きる,そむく,うつ
漬|Por em conserva / ensopar / umedecer|し,つける,つかる,づけ
糾|torcer / perguntar / investigar|きゅう,ただす
墳|túmulo / montículo|ふん
坪|Unidade de área de 3 / 31 m2|へい,つぼ
紺|azul escuro / azul-marinho|こん
慌|desconcertado / ser confundido / perder a cabeça|こう,あわてる,あわただしい
娯|recreação / prazer|ご
舌|língua / lingueta de inst. de sopro / lingueta de fechadura|ぜつ,した
羅|gaze / seda fina / Roma|ら,うすもの
坊|menino / residência do padre / padre|ぼう,ぼっ
峡|Garganta (montanha) / ravina|きょう,こう,はざま
俸|estipêndio / salário|ほう
厘|Antiga unidade / milésimo de yen / 0|りん
峰|reunião de cúpula / pico|ほう,みね,ね
醸|fermentar / causa|じょう,かもす
弔|condolencias / velório / funeral|ちょう,とむらう,とぶらう
乙|o último / duplicar / engenhoso|おつ,いつ,おと,きのと
汁|sopa / suco / caldo|じゅう,しる,しる,つゆ
尼|Freira|に,あま
遍|em toda parte / tempos / amplamente|へん,あまねく
衡|equilíbrio / vara de medição / escala|こう
薫|fragrante / perfumado / fumaça (cigs)|くん,かおる
瓦|teja|が,かわら,ぐらむ
猟|caçada / disparar / caçar|りょう,かり,かる
羊|carneiro|よう,ひつじ
款|Boa-vontade / artigo / seção|かん
閲|revier / inspeção / revisão|えつ,けみする
偵|espião|てい
喝|rouco / ralhar|かつ
敢|ousar / frágil / lamentável|かん,あえて,あえない,あえず
胎|útero|たい
酵|fermentação|こう
憤|estimulado / resentido / estar indignado|ふん,いきどおる
豚|Carne de porco / porco|とん,ぶた
遮|interceptar / interromper / obstruir|しゃ,さえぎる
扉|porta frontal / página de título / página frontal|ひ,とびら
硫|enxofre|りゅう
赦|absolvição / perdão|しゃ
挫|aplastamiento / torcedura / desaliento|ざ,さ,くじく,くじける
窃|discrição / roubar / segredo|せつ,ぬすむ,ひそか
泡|bolhas / espuma|ほう,あわ
又|ou outra vez / além disso / na outra mão|ゆう,また,また,またの
慨|arrependimento / entristecer-se / suspiro|がい
紡|Girar|ぼう,つむぐ
恨|lamento / rancor / resentimento|こん,うらむ,うらめしい
肪|obeso / gordura|ぼう
扶|ajudar / ajuda / auxiliar|ふ,たすける
戯|brincadeira / jogo / esporte|ぎ,げ,たわむれる,ざれる,じゃれる
忌|luto / odiar / detestável|き,いむ,いみ,いまわしい
濁|sonoro / sujidade / errado|だく,じょく,にごる,にごす
奔|tumulto / correria|ほん,はしる
斗|concha grande / concha p/ sake / medida de volume|と,とう
迅|rápido / ligeiro|じん
肖|semelhança|しょう,あやかる
鉢|taça / balde de arroz / pote|はち,はつ
朽|decair / apodrecer / permanecer recluso|きゅう,くちる
殻|casca / concha de noz|かく,こく,ばい,から,がら
享|receber / sofrer / atender (telefone)|きょう,こう,うける
藩|clã / cerca|はん
沙|arena / gravilla / desierto|さ,しゃ,すな,よなげる
媒|mediador / ir entre|ばい,なこうど
鶏|Frango / galinha|けい,にわとり,とり
禅|Zen / meditação silenciosa|ぜん,せん,しずか,ゆずる
嘱|confiar / solicitação / enviar uma mensagem|しょく,しょくする,たのむ
胴|tronco / torso / casco (navio)|どう
迭|transferir / alternar|てつ
挿|inserir / inserido / enxertar|そう,さす,はさむ
嵐|tormenta / tempestad / aire fresco de montaña|らん,あらし
椎|roble / mazo|つい,すい,つち,うつ
絹|seda|けん,きぬ
陪|cortesia / seguir / acompanhar|ばい
剖|divida|ぼう
譜|nota musical / música / nota|ふ
悠|permanência / tempo longo / distante|ゆう
淑|gracioso / puro / suave|しゅく,しとやか
帆|Vela|はん,ほ
暁|aurora / amanhecer / no evento|ぎょう,きょう,あかつき,さとる
傑|grandeza / excelência|けつ,すぐれる
笛|flauta / clarinete / assobio|てき,ふえ
奴|serva / escrava / dama de companhia|ど,やつ,やっこ
誰|quién / alguien|すい,だれ,たれ,た
錠|fechadura / cadeado / correntes|じょう
拳|puño (cerrado)|けん,げん,こぶし
遷|transição / mover / mudança|せん,うつる,うつす,みやこがえ
拙|Mal-ajambrado / desajeitado / inábil|せつ,つたない
侍|garçom / samurai / esperar sobre|じ,し,さむらい,はべる
尺|shaku / pé Japonês / medida|しゃく
峠|pico de montanha / passagem de montanha / clímax|とうげ
篤|caloroso / humano / sério|とく,あつい
渇|sede / seca / ressecar-se|かつ,かわく
俺|yo / yo mismo|えん,おれ,われ
叔|tio / juventude|しゅく
雌|feminino / fêmea|し,め,めす,めん
堪|Opor-se / suportar / apoiar|かん,たん,たえる,たまる,こらえる
叙|confira / relaciona / narra|じょ,ついず,ついで
酢|vinagre / azedo / ácido|さく,す
吟|declamar / cantar / recital|ぎん
逓|Em cadeia / em fila / enviar|てい,かわる,たがいに
痕|mark / foot print|こん,あと
袖|manga (ropa) / ala (edificio) / extensión|しゅう,そで
甚|tremendamente / muito / grande|じん,はなはだ,はなはだしい
妖|sospechoso / dudoso / hechicero|よう,あやしい,なまめく,わざわい
闇|oscuro / sombrío / poco claro|あん,おん,やみ,くらい
崇|Adorar (divindade) / respeitar / reverenciar|すう,あがめる
漆|verniz / envernizar|しつ,うるし
岬|cabo / ponta / promontorio|こう,みさき
癖|maneirismo / hábito / vício|へき,くせ,くせに
愉|prazer / feliz / júbilo|ゆ,たのしい,たのしむ
捉|atrapar / capturar / agarrar|そく,さく,とらえる
礁|recife / rocha submersa|しょう
屯|quarteis / estação de polícia / acampamento|とん,たむろ
姻|matrimônio / casa|いん
賭|apuesta / apostar|と,かける,かけ
擬|imitar / alvo (uma arma) / nomear|ぎ,まがい,もどき
塀|cerca / parede|へい,べい
唇|Lábios|しん,くちびる
睦|íntimo / amistoso|ぼく,もく,むつまじい,むつむ,むつぶ
閑|lazer|かん
幽|isolar / confina para um quarto|ゆう,ふかい,かすか,くらい
曹|caçula / amigo|そう,ぞう
詠|recital / poema / canção|えい,よむ,うたう
卑|humilde / ordinário / vil|ひ,いやしい,いやしむ,いやしめる
侮|desdém / desprezo / desprezar|ぶ,あなどる,あなずる
鋳|calcular / cunhar moedas|ちゅう,い,しゅ,いる
抹|esfregar / pintura / apagar|まつ
尉|oficial militar / carcereiro / velho|い,じょう
隷|escravo / servo / prisioneiro|れい,したがう,しもべ
禍|calamidade / desgraça / mal|か,わざわい
酪|produtos lácteos / creme / caldo|らく
茎|caule / talo|けい,きょう,くき
汎|pan-|はん,ぶ,ふう,ただよう,ひろい
頃|tiempo / aproximadamente / hacia|けい,きょう,ころ,ごろ,しばらく
帥|comandante / tropas líder / governador|すい
逝|partir / morrer|せい,ゆく,いく
汽|vapor|き
謎|adivinanza / acertijo / enigma|めい,べい,なぞ
匿|esconda / abrigo / escudo|とく,かくまう
爪|uña / garra / zarpa|そう,つめ,つま
鍵|llave / tecla (piano / órgano|けん,かぎ
襟|colarinho / pescoço / lapela|きん,えり
蛍|pirilampo / vaga-lume|けい,ほたる
寡|viúva / minoria / poucos|か
痢|diarréia|り
庸|lugar comum / comum / emprego|よう
坑|buraco / furo|こう
藍|índigo|らん,あい
賊|assaltante / rebelde / traidor|ぞく
搾|espremer|さく,しぼる
臼|mortero|きゅう,ぐ,うす,うすづく
畔|Sulco p/ plantar arroz / represa p/ plantar arroz|はん,あぜ,くろ,ほとり
唄|canción / balada (acompañada de shamisen)|ばい,うた,うたう
孔|Cavidade / buraco / fenda|こう,く,あな
呂|columna vertebral / espinazo|ろ,りょ,せぼね
拷|torturar / golpear / batida|ごう
嬢|Jovem / moça / senhorita|じょう,むすめ
渓|corrente de montanha / vale|けい,たに,たにがわ
翁|velho venerável|おう,おきな
廉|pechincha / razão / carga|れん
牙|colmillo|が,げ,きば,は
謹|discreto / reverentemente / humildemente|きん,つつしむ
瞳|pupila|どう,とう,ひとみ
湧|hervir / fermentar|ゆう,よう,ゆ,わく
窯|fornalha / forno|よう,かま
褒|elogio / enaltecer|ほう,ほめる
醜|sujo / feio / vergonha|しゅう,みにくい,しこ
升|Medida p/ caixa / 1.8 litro|しょう,ます
殉|martírio / sair por pedir demissão|じゅん
煩|ansiedade / dificuldade / preocupação|はん,ぼん,わずらう,わずらわす,うるさがる
枕|almohada / prefacio a una frase o charla|ちん,しん,まくら
劾|censura / investigação criminal|がい
堕|degenerado / descender|だ,おちる,くずす,くずれる
丼|tazón / cuenco|とん,たん,しょう,どんぶり
租|tarifa / coletar impostos / pedir emprestado|そ
桟|andaime / ripa / moldura|さん,せん,かけはし
惧|fear / be afraid of / dread|く,ぐ,おそれる
婿|noivo / genro|せい,むこ
慕|Consumir-se / sentir saudades / amar|ぼ,したう
罷|deixar / parada / sacar|ひ,まかり,やめる
矯|retificar / endireitar / corrigir|きょう,ためる
某|assim-e-assim / um / um certo|ぼう,それがし,なにがし
囚|cativo / criminoso / prisão|しゅう,とらわれる
虹|arco iris|こう,にじ
泌|Esvair-se / fluxo / ensopar|ひつ,ひ
漸|firmemente / gradualmente avançando / finalmente|ぜん,ようやく,やや,ようよう
膳|mesita baja / bandeja (para comida) / comida|ぜん,せん,かしわ,すすめる,そなえる
蚊|mosquito|ぶん,か
厄|infeliz / desgraça / sorte ruim|やく
藻|algas / planta flutuante|そう,も
嫡|esposa legítima / descendência direta (não-bastarda)|ちゃく,てき
呪|maldición / hechizo / maldecir|じゅ,しゅ,しゅう,まじなう,のろい,まじない
斬|cortar / decapitar / matar (a espada)|ざん,さん,せん,きる
怨|grudge / show resentment / be jealous|えん,おん,うん,うらむ,うらみ,うらめしい
串|broqueta / espetón|かん,けん,せん,くし,つらぬく
嚇|ameaça / dignidade / majestade|かく,おどす
凸|convexo / ímpar|とつ,でこ
腫|tumor / swelling|しゅ,しょう,はれる,はれ,はらす
韻|rime / elegância / tom|いん
霜|geada|そう,しも
餅|pastel de pasta de arroz|へい,ひょう,もち,もちい
硝|nitrato / salitre|しょう
箸|palillos (para comer o cocinar)|ちょ,ちゃく,はし
勅|pedido imperial|ちょく,いましめる,みことのり
棺|Caixão fúnebre / caixa fechada|かん
儒|Confucianista|じゅ
斑|mancha / mota / manchado|はん,ふ,まだら
摯|gift / seriousness|し,いたる
愁|perigo / pesar / lamento|しゅう,うれえる,うれい
楼|vigia / vigilância / alto edifício|ろう,たかどの
眉|ceja / forma de la cabeza|び,み,まゆ
薪|combustível / lenha / acender fogo|しん,たきぎ,まき
堆|torre alta de cosas apiladas / lugar alto mar adentro|たい,つい,うずたかい
褐|marrom / kimono felpudo|かつ
賜|concessão / presente / vantagem|し,たまわる,たまう,たもう
繕|cerzir / reparar / consertar|ぜん,つくろう
栓|Rolha / tampa / tampão|せん
芯|interior / entrañas (cuerpo / cosa)|しん
蜜|miel / néctar / melaza|みつ,びつ
凹|côncavo / concavidade / afundado|おう,くぼむ,へこむ,ぼこ
艶|encantador / cautivador / lustroso|えん,つや,なまめかしい,あでやか
股|entrepierna / ingle / muslo|こ,また,もも
匂|oler / fragante / oloroso|におう,におい,におわせる
玩|jugar / juguete / tratar cuidadosamente|がん,もちあそぶ,もてあそぶ
錬|tempera / refinar / broca|れん,ねる
蜂|avispa / abeja / avispón|ほう,はち
衷|íntimo / coração / mente|ちゅう
逐|perseguir / afastar / caçar|ちく
斥|rejeitado / recuo / retirada|せき,しりぞける
詔|decreto imperial|しょう,みことのり
椅|silla / asiento|い
叱|regañina / reproche / regañar|しつ,しち,しかる
挨|empujar / acercarse|あい,ひらく
憧|añorar / anhelar / suspirar por|しょう,とう,どう,あこがれる
宵|Pouco tempo / noite / noite antecipada|しょう,よい
妄|desilusão / desnecessariamente / sem autoridade|もう,ぼう,みだりに
酌|Trabalhar em bares / servindo sake / o anfitrião|しゃく,くむ
蚕|bicho-da-seda|さん,てん,かいこ,こ
餌|comida / comida para animales / cebo|じ,に,え,えば,えさ
頒|partição / compreende|はん,わかつ
肢|membros / braços & pernas|し
謄|mimeográfo / cópia|とう
脊|columna vertebral / espina dorsal / espalda|せき,せ,せい
嗣|herdeiro / é bem-sucedido|し
凄|uncanny / weird / threatening|せい,さい,さむい,すごい,すさまじい
嫉|jealous / envy|しつ,そねむ,ねたむ,にくむ
膝|rodilla|しつ,ひざ
恣|selfish / arbitrary|し,ほしいまま
畝|sulco|ぼう,ほ,も,せ,うね
抄|extrato / seleção / resumo|しょう
麺|tallarines / harina de trigo|めん,べん,むぎこ
戴|poner encima / coronar / recibir agradecidamente|たい,いただく
爽|refrescante / vigorizante / resonante|そう,あきらか,さわやか,たがう
裾|pernera / dobladillo / pie (montaña)|きょ,こ,すそ
惰|preguiçoso / ociosidade|だ
蛮|bárbaro|ばん,えびす
旺|floreciente / exitoso / bello|おう,きょう,ごう,かがやき,うつくしい,さかん
冥|oscuro / incomprensible / profundo|めい,みょう,くらい
壱|Um|いち,いつ,ひとつ
瑠|lapislázuli|る,りゅう
侯|marques / senhor / daimyo|こう
麓|pie de la montaña|ろく,ふもと
弧|Arco|こ
稽|pensamiento / consideración / comparación|けい,かんがえる,とどめる
蹴|patada / rechazo / dar una patada|しゅく,しゅう,ける
訃|obituary|ふ,しらせ
剥|come off / peel / fade|はく,ほく,へぐ,へずる,むく
蓋|cover / lid / flap|がい,かい,こう,ふた,けだし,おおう
畏|fear / majestic / graciously|い,おそれる,かしこまる,かしこ
喉|garganta|こう,のど
附|fixar / anexar / referir-se a|ふ,つける,つく
但|entretanto / mas|たん,ただし
芋|batata|う,いも
拭|barrer / fregar / limpiar|しょく,しき,ぬぐう,ふく
頬|carrillo / moflete / mejilla|きょう,ほお,ほほ
婆|senhora / avó / ama de leite|ば,ばば,ばあ
貼|pegar / engomar / aplicar|てん,ちょう,はる,つく
倣|emular / imitar|ほう,ならう
諦|truth / clarity / abandon|てい,たい,あきらめる,つまびらか,まこと
煎|broil / parch / roast|せん,せんじる,いる,にる
緻|fine (i.e. not coarse)|ち,こまかい
哺|cultivar / cuidar / llevarse a la boca|ほ,はぐくむ,ふくむ
罵|abuse / insult|ば,ののしる
乞|petición / imploración / invitación|こつ,きつ,き,こう
倹|frugal / economia / econômico|けん,つましい,つづまやか
嗅|smell / sniff / scent|きゅう,かぐ
蔑|ignore / despise / neglect|べつ,ないがしろ,なみする,くらい
繭|casulo|けん,まゆ,きぬ
且|outrossim / também / além disso|しょ,そ,しょう,かつ
丙|terceira classe / 3º / 3º signo do calendário Chinês|へい,ひのえ
伎|habilidad / técnica|ぎ,き,わざ,わざおぎ
侶|companion / follower|りょ,ろ,とも
傲|be proud|ごう,おごる,あなどる
僅|meramente / simplemente / un poquito|きん,ごん,わずか
冶|fundición / fundir|や,いる
刹|temple|せち,せつ,さつ
剝|come off / peel / fade|はく,はぐ,むく,はげる
勃|repentino / inesperado / súbito|ぼつ,ほつ,おこる,にわかに
勾|be bent / slope / capture|こう,く,かぎ,まがる
吏|oficial / um oficial|り
咽|garganta / sofoco / atragantamiento|いん,えん,えつ,むせぶ,むせる,のど
唾|saliva / sputum|だ,た,つば,つばき
喩|ejemplo / persuasión / ejemplificar|ゆ,たとえる,さとす
嘲|ridicule / insult|ちょう,とう,あざける
塑|modelo / moldura|そ,でく
塞|close / shut / cover|そく,さい,ふさぐ,とりで,みちる
塡|fill in / fill up / make good|てん,ちん,はまる,うずめる,はめる
填|fill in|てん,ちん,はまる,はめる,うずめる
墾|terra cultivada|こん,はる,ひらく
妬|jealous / envy|と,つ,ねたむ,そねむ,つもる
宛|algo así como / enteramente / completamente|えん,あてる,あて,づつ
崖|acantilado / precipicio / despeñadero|がい,げ,ぎ,がけ,きし,はて
巾|paño / tela / anchura|きん,ふく,おおい,ちきり,きれ
弄|play with / tamper / trifle with|ろう,る,いじくる,ろうする,いじる
弐|II / dois / segundo|に,じ,ふたつ,そえ
彙|same kind / collect / classify|い,はりねずみ
慄|fear|りつ,ふるえる,おそれる,おののく
憬|yearn for / aspire to / admire|けい,あこがれる
戚|pariente (de sangre) / cuerpo|そく,せき,いたむ,うれえる,みうち
拉|Latin / kidnap / crush|らつ,ら,ろう,らっする,ひしぐ,くだく
拶|acercarse / ser inminente|さつ,せまる
捗|make progress|ちょく,ほ,はかどる
捻|twirl / twist / play with|ねん,じょう,ねじる,ねじる,ひねくる
斤|machado / 1.32 lb / felino|きん
旦|alba / mañana / amanecer|たん,だん,あきらか,あきら,ただし
昧|dark / foolish|まい,ばい,くらい,むさぼる
曖|dark / not clear|あい,くらい
朕|plural majestático (nós ao invés de eu) / nós do imperador|ちん
柵|stockade / fence / weir|さく,さん,しがらむ,しがらみ,とりで
桁|beam / girder / spar|こう,けた
梗|for the most part / close up / flower stem|こう,きょう,ふさぐ,やまにれ,おおむね
楷|modelo / patrón / correcto|かい
毀|break / destroy / censure|き,こぼつ,こわす,こぼれる
氾|desbordarse / extenderse|はん,ひろがる
汰|clasificar / seleccionar|た,たい,おごる,にごる,よなげる
沃|fertility|よう,よく,おく,そそぐ
淫|lewdness / licentiousness|いん,ひたす,ほしいまま,みだら
溺|ahogo / éxtasis / entusiasmo|でき,じょう,にょう,いばり,おぼれる
潰|crush / smash / break|かい,え,つぶす,つぶれる,ついえる
濫|excessivo / inundação / espalhar por|らん,みだりに,みだりがましい
爵|barão / nobreza / posição na nobreza|しゃく
璃|lapislázuli / vidrioso|り
璧|sphere / ball|へき,たま
璽|selo imperial|じ
痘|varíola / catapora|とう
痩|get thin|そう,ちゅう,しゅう,やせる
瘍|swelling / boil / tumor|よう,かさ
瞭|claro / luminoso|りょう,あきらか
窟|cavern|くつ,こつ,いわや,いはや,あな
箇|sufixo para contagem de coisas em geral|か,こ
箋|paper / label / letter|せん,ふだ
籠|cesto / canasta / palanquín|ろう,る,かご,こめる,こもる
綻|comenzar a abrirse / despojarse / florecer|たん,ほころびる
羞|feel ashamed|しゅう,はじる,すすめる,はずかしい
羨|envious / be jealous / covet|せん,えん,うらやむ,あまり
耗|decréscimo|もう,こう
肘|elbow / arm|ちゅう,ひじ
腺|glándula|せん
臆|pecho / mente / adivinar|おく,よく,むね,おくする
舷|gunwale|げん,ふなばた,ふなべり
苛|torment / scold / chastise|か,いじめる,さいなむ,いらだつ
萎|wither / droop / lame|い,な,しおれる,しなびる
蔽|cover / shade / mantle|へい,へつ,ふつ,おおう,おおい
虞|Mal-estar / medo / ansiedade|ぐ,おそれ,おもんぱかる,はかる
詣|llegada / visita a un templo / llegar|けい,げい,けいする,まいる,いたる
詮|discussion / methods called for / selection|せん,せんずる,かい,あきらか
諧|harmony|かい,かなう,やわらぐ
謁|platéia / audiência (com o rei)|えつ
貌|form / appearance / countenance|ぼう,ばく,かたち,かたどる
貪|covet / indulge in|たん,どん,とん,むさぼる
賂|bribe|ろ,まいない,まいなう
賦|ode / prosa / poema|ふ,ぶ
踪|remains / clue / footprint|そう,しょう,あと
辣|pungent / spicy / harsh|らつ,からい
遜|humble / modest|そん,したがう,へりくだる,ゆずる
遡|río arriba / ir río arriba / ir hacia atrás|そ,さく,さかのぼる
遵|aceitar e executar / seguir / obedecer|じゅん
酎|sake|ちゅう,ちゅ,かもす
醒|awake / be disillusioned / sober up|せい,さます,さめる
采|forma / apariencia / colorido|さい,とる,いろどり
錮|confinement / to tie|こ,ふさぐ
隙|grieta / hendidura / fisura|げき,きゃく,けき,すき,すく,すかす
頓|de pronto / de repente / de una vez|とん,とつ,にわかに,とんと,つまずく
頰|cheeks / jaw|きょう,ほお,ほほ
顎|jaw / chin / gill|がく,あご,あぎと
骸|huesos / restos mortales / cadáver|がい,かい,むくろ
鬱|gloom / depression / melancholy|うつ,うっする,ふさぐ,しげる
𠮟|scold / reprove|—
`;

export const kanji: Kanji[] = [
  ...parse("N5", n5),
  ...parse("N4", n4),
  ...parse("N3", n3),
  ...parse("N2", n2),
  ...parse("N1", n1),
];

export const kanjiByLevel = (level: JlptLevel) => kanji.filter((k) => k.level === level);
