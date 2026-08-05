import type { JlptLevel } from "./kanji";

export type VocabItem = {
  word: string;
  reading: string;
  meaning: string;
  type: string;
  level: JlptLevel;
};

/** Fica só com a primeira forma escrita da palavra (evita "川; 河" e prefixos "～"). */
const limparPalavra = (raw: string): string =>
  (raw.split(/[;；/]/)[0] ?? raw).replace(/[～~]/g, "").trim();

/**
 * Limpa a tradução: remove repetições, cortes em inglês e listas longas,
 * deixando no máximo duas acepções em português.
 */
const limparSignificado = (raw: string): string => {
  const partes = raw
    .split(/[;；,/]/)
    .map((p) =>
      p
        .replace(/\(.*?\)/g, "")
        .replace(/\s+/g, " ")
        .trim(),
    )
    .filter(Boolean);

  const vistos = new Set<string>();
  const unicos = partes.filter((p) => {
    const chave = p.toLowerCase();
    if (vistos.has(chave)) return false;
    vistos.add(chave);
    return true;
  });

  const texto = unicos.slice(0, 2).join(", ") || raw.trim();
  return texto.charAt(0).toLowerCase() + texto.slice(1);
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
        word: limparPalavra(word),
        reading: limparPalavra(reading),
        meaning: limparSignificado(meaning),
        type: type.trim(),
        level,
      };
    })
    .filter((v) => v.word.length > 0 && v.meaning.length > 0);

const n5 = `
～がる|～がる|sentir|verbo
軽い|かるい|leve / não sério / menor|adjetivo
カレー|カレー|curry|substantivo
カレンダー|カレンダー|calendário|substantivo
川; 河|かわ|rio|substantivo
～側|～がわ|lado|expressão
可愛い|かわいい|fofo, adorável|adjetivo
漢字|かんじ|kanji; caractere chinês|substantivo
木|き|árvore; madeira; lenha|substantivo
黄色|きいろ|amarelo|substantivo
黄色い|きいろい|amarelo|adjetivo
消える|きえる|desaparecer, sumir|verbo
聞く|きく|ouvir; escutar; perguntar|verbo
北|きた|norte|substantivo
ギター|ギター|guitarra|substantivo
汚い|きたない|sujo, imundo, imundo|adjetivo
喫茶店|きっさてん|café|substantivo
切手|きって|selos postais|substantivo
切符|きっぷ|uma passagem|substantivo
昨日|きのう|ontem|advérbio
九|きゅう|nove|contador
牛肉|ぎゅうにく|carne bovina|substantivo
牛乳|ぎゅうにゅう|leite|substantivo
今日|きょう|hoje|substantivo
教室|きょうしつ|sala de aula|substantivo
兄弟|きょうだい|irmãos (humilde); irmãos e irmãs|substantivo
去年|きょねん|ano passado|substantivo
嫌い|きらい|antipatia|substantivo
切る|きる|cortar; desligar (telefone)|verbo
着る|きる|vestir (roupas acima da cintura); usar|verbo
綺麗|きれい|bonito, limpo, arrumado|adjetivo
キロ; キログラム|キロ; キログラム|quilo; quilograma|substantivo
キロ; キロメートル|キロ; キロメートル|quilo; quilômetro|substantivo
銀行|ぎんこう|banco|substantivo
金曜日|きんようび|sexta-feira|substantivo
薬|くすり|remédio|substantivo
下さい|ください|por favor (com verbo te-form)|expressão
果物|くだもの|fruta|substantivo
口|くち|vaga de emprego; boca|substantivo
靴|くつ|sapatos, calçados|substantivo
靴下|くつした|meias|substantivo
国|くに|país; local de origem|substantivo
曇り|くもり|nebulosidade, tempo nublado|substantivo
曇る|くもる|tornar-se nublado, tornar-se escuro|verbo
暗い|くらい|escuro, sombrio|adjetivo
～くらい; ぐらい|～くらい; ぐらい|aproximadamente (quantidade)|expressão
クラス|クラス|uma classe|substantivo
グラム|グラム|grama|substantivo
来る|くる|vir|verbo
車|くるま|carro, veículo|substantivo
黒|くろ|preto|substantivo
黒い|くろい|preto; escuro|adjetivo
警官|けいかん|policial|substantivo
今朝|けさ|esta manhã|advérbio
消す|けす|apagar, deletar, desligar energia|verbo
結構|けっこう|esplêndido; o suficiente, toleravelmente|adjetivo
結婚|けっこん (する)|casamento (casar-se)|substantivo
月曜日|げつようび|segunda-feira|substantivo
玄関|げんかん|entrada (de uma casa ou edifício)|substantivo
元気|げんき|saúde (saudável), enérgico|adjetivo
一昨日|おととい|anteontem|expressão
おととし|おととし|ano retrasado|expressão
大人|おとな|adulto|substantivo
お腹|おなか|estômago|substantivo
同じ|おなじ|mesmo / idêntico|adjetivo
お兄さん|おにいさん|irmão mais velho (de outra pessoa, formal)|substantivo
お姉さん|おねえさん|irmã mais velha (formal)|substantivo
伯母さん; 叔母さん|おばさん|tia|substantivo
おばあさん|おばあさん|avó / idosa|substantivo
お風呂|おふろ|banho|substantivo
お弁当|おべんとう|marmita|substantivo
覚える|おぼえる|aprender / memorizar / lembrar / decorar|verbo
おまわりさん|おまわりさん|policial (termo amigável)|substantivo
重い|おもい|pesado / sério|adjetivo
面白い|おもしろい|interessante / engraçado|adjetivo
泳ぐ|およぐ|nadar|verbo
降りる|おりる|descer / sair|verbo
終る|おわる|terminar / fechar|verbo
音楽|おんがく|música|substantivo
女|おんな|mulher / feminino|substantivo
女の子|おんなのこ|menina|substantivo
～回|～かい|vez(es)|contador
～階|～かい|andar(es)|contador
外国|がいこく|país estrangeiro / exterior|substantivo
外国人|がいこくじん|estrangeiro|substantivo
会社|かいしゃ|empresa / corporação|substantivo
階段|かいだん|escada(s)|substantivo
買い物|かいもの|compras|substantivo
買う|かう|comprar|verbo
返す|かえす|devolver (algo)|verbo
帰る|かえる|voltar / ir para casa|verbo
顔|かお|rosto|substantivo
かかる|かかる|levar (tempo, dinheiro)|verbo
鍵|かぎ|fechadura / chave|substantivo
書く|かく|escrever|verbo
学生|がくせい|estudante|substantivo
～か月|～かげつ|mês(es)|contador
掛ける|かける|colocar (óculos) / pendurar (na parede)|verbo
かける|かける|ligar (telefone) / sentar|verbo
傘|かさ|guarda-chuva / sombrinha|substantivo
貸す|かす|emprestar|verbo
風|かぜ|vento / brisa|substantivo
風邪|かぜ|resfriado / gripe|substantivo
方|かた|pessoa (honorífico) / jeito|substantivo
家族|かぞく|família / membros da família|substantivo
片仮名|かたかな|katakana|substantivo
～月|～がつ|mês (do ano)|contador
学校|がっこう|escola|substantivo
カップ|カップ|xícara|substantivo
家庭|かてい|lar / família|substantivo
角|かど|canto (mesa, esquina)|substantivo
かばん|かばん|bolsa / cesta|substantivo
花瓶|かびん|vaso (de flores)|substantivo
かぶる|かぶる|usar (chapéu na cabeça)|verbo
紙|かみ|papel|substantivo
カメラ|カメラ|câmera|substantivo
火曜日|かようび|terça-feira|substantivo
辛い|からい|picante / salgado|adjetivo
体|からだ|corpo / saúde|substantivo
借りる|かりる|pegar emprestado / dever|verbo
五日|いつか|cinco dias; quinto dia do mês|expressão
一緒|いっしょ|junto|advérbio
五つ|いつつ|cinco coisas|expressão
いつも|いつも|sempre / usualmente / todas as vezes|advérbio
犬|いぬ|cachorro|substantivo
今|いま|agora|advérbio
意味|いみ|significado / sentido|substantivo
妹|いもうと|irmã mais nova|substantivo
嫌|いや|desagradável / detestável / que não gosto|adjetivo
入口|いりぐち|entrada|substantivo
居る|いる|haver (animado); existir|verbo
要る|いる|precisar|verbo
入れる|いれる|colocar dentro|verbo
色|いろ|cor|substantivo
色々|いろいろ|vários|adjetivo
上|うえ|acima / em cima de / sobre|expressão
後ろ|うしろ|atrás / por trás|substantivo
薄い|うすい|fino / fraco|adjetivo
歌|うた|canção|substantivo
歌う|うたう|cantar|verbo
うち|うち|casa / lar|substantivo
生まれる|うまれる|nascer|verbo
海|うみ|mar / praia|substantivo
売る|うる|vender|verbo
うるさい|うるさい|barulhento / irritante|adjetivo
上着|うわぎ|casaco / jaqueta|substantivo
絵|え|pintura / quadro / desenho|substantivo
映画|えいが|filme / cinema|substantivo
映画館|えいがかん|cinemas / sala de cinema|substantivo
英語|えいご|inglês|substantivo
ええ|ええ|sim|saudação
駅|えき|estação|substantivo
エレベーター|エレベーター|elevador|substantivo
～円|～えん|iene|contador
鉛筆|えんぴつ|lápis|substantivo
お～|お～|hon. / pref. de cortesia|partícula
美味しい|おいしい|delicioso / gostoso|adjetivo
多い|おおい|muito / há muitos|adjetivo
大きい|おおきい|grande / largo|adjetivo
大きな|おおきな|grande|adjetivo
大勢|おおぜい|muita gente|substantivo
お母さん|おかあさん|mãe|substantivo
お菓子|おかし|doces / balas / lanche|substantivo
お金|おかね|dinheiro|substantivo
起きる|おきる|acordar; acontecer|verbo
置く|おく|colocar / pôr|verbo
奥さん|おくさん|esposa (de outro)|substantivo
お酒|おさけ|saquê / álcool|substantivo
お皿|おさら|prato / louça|substantivo
伯父; 叔父さん|おじさん|tio / homem de meia-idade|substantivo
おじいさん|おじいさん|avô / idoso|substantivo
教える|おしえる|ensinar / informar / instruir|verbo
押す|おす|empurrar / apertar|verbo
遅い|おそい|lento / tarde|adjetivo
お茶|おちゃ|chá (verde)|substantivo
お手洗い|おてあらい|banheiro / lavabo|substantivo
お父さん|おとうさん|pai|substantivo
弟|おとうと|irmão mais novo|substantivo
男|おとこ|homem / masculino|substantivo
男の子|おとこのこ|menino|substantivo
ああ|ああ|Ah!, Oh!|expressão
会う|あう|encontrar, ver|verbo
青|あお|azul|substantivo
青い|あおい|azul|adjetivo
赤|あか|vermelho|substantivo
赤い|あかい|vermelho|adjetivo
明るい|あかるい|brilhante; alegre|adjetivo
秋|あき|outono|substantivo
開く|あく|abrir|verbo
開ける|あける|abrir (v.t.)|verbo
上げる|あげる|levantar, erguer|verbo
朝|あさ|manhã|substantivo
朝御飯|あさごはん|café da manhã|substantivo
明後日|あさって|depois de amanhã|substantivo
足; 脚|あし|pé; perna|substantivo
明日|あした|amanhã|substantivo
あそこ|あそこ|ali, acolá, aquele lugar|advérbio
遊ぶ|あそぶ|brincar; passar tempo agradavelmente; sair|verbo
暖かい|あたたかい|quente (clima)|adjetivo
頭|あたま|cabeça|substantivo
新しい|あたらしい|novo|adjetivo
あちら|あちら|por aqui (polido)|advérbio
暑い|あつい|quente (clima)|adjetivo
熱い|あつい|quente (objetos)|adjetivo
厚い|あつい|gentil, caloroso, grosso, profundo|adjetivo
あっち|あっち|ali|advérbio
後|あと|depois (mais tarde); no futuro; o resto; desde então|advérbio
あなた|あなた|você|pronome
兄|あに|irmão mais velho (humilde)|substantivo
姉|あね|irmã mais velha (humilde)|substantivo
アパート|アパート|apartamento (abreviação)|substantivo
あの|あの|aquele ali; daquele jeito; hum...|adjetivo
浴びる|あびる|tomar banho, tomar ducha|verbo
危ない|あぶない|perigoso, crítico|adjetivo
甘い|あまい|generoso, doce|adjetivo
余り|あまり|não muito; excedente|advérbio
雨|あめ|chuva|substantivo
飴|あめ|bala (dura)|substantivo
洗う|あらう|lavar|verbo
在る|ある|ser, ter|verbo
有る|ある|ser, ter|verbo
歩く|あるく|andar|verbo
あれ|あれ|aquele (ali)|pronome
いい; よい|いい; よい|bom|adjetivo
いいえ|いいえ|não, de jeito nenhum|expressão
言う|いう|dizer|verbo
家|いえ|casa, lar|substantivo
いかが|いかが|como, de que maneira|advérbio
行く|いく; ゆく|ir|verbo
いくつ|いくつ|quantos, qual a idade|contador
いくら|いくら|quanto, quantos|contador
池|いけ|lago|substantivo
医者|いしゃ|médico; doutor|substantivo
椅子|いす|cadeira|substantivo
忙しい|いそがしい|ocupado (pessoas, dias)|adjetivo
痛い|いたい|machucado; dolorido; dormente|adjetivo
一|いち|um|contador
一日|いちにち|um dia (duração)|substantivo
一番|いちばん|melhor (o mais); primeiro; número um|advérbio
いつ|いつ|quando|advérbio
自転車|じてんしゃ|bicicleta|substantivo
自動車|じどうしゃ|automóvel|substantivo
死ぬ|しぬ|morrer|verbo
字引|じびき|dicionário|substantivo
自分|じぶん|eu mesmo; si mesmo|pronome
閉まる|しまる|fechar; fechar-se|verbo
閉める|しめる|fechar; fechar-se|verbo
締める|しめる|amarrar; apertar; afivelar|verbo
じゃ; じゃあ|じゃ; じゃあ|bem; então|expressão
写真|しゃしん|uma foto; uma fotografia|substantivo
シャツ|シャツ|camisa|substantivo
シャワー|シャワー|chuveiro|substantivo
十|じゅう|dez|contador
～中|～じゅう|durante; enquanto|conector
～週間|～しゅうかん|~ semanas|contador
授業|じゅぎょう|aula; classe|substantivo
宿題|しゅくだい|lição de casa; dever de casa|substantivo
上手|じょうず|ser bom em; habilidoso|adjetivo
丈夫|じょうぶ|forte; sólido; durável|adjetivo
醤油|しょうゆ|molho de soja|substantivo
食堂|しょくどう|cantina; refeitório|substantivo
知る|しる|saber; conhecer; entender|verbo
白|しろ|branco|substantivo
白い|しろい|branco|adjetivo
～人|～じん|~ pessoa|contador
新聞|しんぶん|jornal|substantivo
水曜日|すいようび|quarta-feira|substantivo
吸う|すう|respirar; sugar|verbo
スカート|スカート|saia|substantivo
好き|すき|gostar; afeição; amor|substantivo
～すぎ|～すぎ|passado; exceder; demais|conector
少ない|すくない|pouco; alguns|adjetivo
すぐに|すぐに|imediatamente; em breve|advérbio
少し|すこし|pouco; alguns|advérbio
涼しい|すずしい|fresco; refrescante (clima)|adjetivo
～ずつ|～ずつ|~ de cada vez|conector
ストーブ|ストーブ|aquecedor; estufa|substantivo
スプーン|スプーン|colher|substantivo
スポーツ|スポーツ|esporte(s)|substantivo
ズボン|ズボン|calças|substantivo
住む|すむ|morar; residir|verbo
する|する|fazer; tentar; vestir (peças pequenas)|verbo
座る|すわる|sentar|verbo
背|せい|altura; estatura|substantivo
生徒|せいと|aluno; estudante|substantivo
セーター|セーター|suéter|substantivo
石鹸|せっけん|sabão|substantivo
背広|せびろ|terno masculino|substantivo
狭い|せまい|estreito; não espaçoso|adjetivo
ゼロ|ゼロ|zero|contador
千|せん|mil|contador
先月|せんげつ|mês passado|substantivo
先週|せんしゅう|semana passada|substantivo
先生|せんせい|professor; mestre; doutor|substantivo
洗濯|せんたく|lavagem; lavanderia|substantivo
全部|ぜんぶ|tudo; inteiro; todo|substantivo
そう; そうです|そう; そうです|sim; parece; é o caso|expressão
掃除|そうじ (する)|limpeza; varredura|substantivo
そうして; そして|そうして; そして|e; assim; então|conector
そこ|そこ|aquele lugar; lá; fundo|pronome
晴れ|はれ|céu limpo, ensolarado|substantivo
晴れる|はれる|estar ensolarado|verbo
半|はん|metade / ~ e meia|advérbio
晩|ばん|noite, entardecer|substantivo
～番|～ばん|melhor / ~º lugar|expressão
パン|パン|pão|substantivo
ハンカチ|ハンカチ|lenço|substantivo
番号|ばんごう|número / série de dígitos|substantivo
晩御飯|ばんごはん|jantar / refeição noturna|substantivo
半分|はんぶん|metade|substantivo
東|ひがし|leste|substantivo
～匹|～ひき|contagem de animais pequenos|contador
引く|ひく|puxar / subtrair|verbo
弾く|ひく|tocar (instrumento de cordas ou piano)|verbo
低い|ひくい|baixo, curto|adjetivo
飛行機|ひこうき|avião|substantivo
左|ひだり|esquerda|substantivo
人|ひと|homem, pessoa|substantivo
一つ|ひとつ|uma coisa|pronome
一月|ひとつき|um mês|substantivo
一人|ひとり|uma pessoa|pronome
暇|ひま|tempo livre, lazer|substantivo
百|ひゃく|cem|substantivo
病院|びょういん|hospital|substantivo
病気|びょうき|doença, enfermidade|substantivo
平仮名|ひらがな|hiragana|substantivo
昼|ひる|meio-dia, dia|substantivo
昼御飯|ひるごはん|almoço / refeição do meio-dia|substantivo
広い|ひろい|espaçoso, largo, amplo|adjetivo
フィルム|フィルム|rolo de filme|substantivo
封筒|ふうとう|envelope|substantivo
プール|プール|piscina|substantivo
フォーク|フォーク|garfo|substantivo
吹く|ふく|soprar|verbo
服|ふく|roupas|substantivo
二つ|ふたつ|duas coisas|pronome
豚肉|ぶたにく|carne de porco|substantivo
二人|ふたり|duas pessoas|pronome
二日|ふつか|dois dias / segundo dia do mês|substantivo
太い|ふとい|gordo, grosso|adjetivo
冬|ふゆ|inverno|substantivo
降る|ふる|cair (chuva, neve, etc.)|verbo
古い|ふるい|velho, antigo|adjetivo
～分|～ふん|minutos|expressão
文章|ぶんしょう|frase, texto|substantivo
ページ|ページ|página|substantivo
下手|へた|inábil, ruim|adjetivo
ベッド|ベッド|cama|substantivo
ペット|ペット|animal de estimação|substantivo
部屋|へや|quarto|substantivo
辺|へん|área, vizinhança|substantivo
ペン|ペン|caneta|substantivo
勉強|べんきょう (する)|estudar|verbo
便利|べんり|conveniente, prático|adjetivo
帽子|ぼうし|chapéu, boné|substantivo
ボールペン|ボールペン|caneta esferográfica|substantivo
ポケット|ポケット|bolso|substantivo
欲しい|ほしい|querer, precisar de|adjetivo
ポスト|ポスト|caixa de correio / posto, posição|substantivo
細い|ほそい|fino, esguio, delicado|adjetivo
手|て|mão|substantivo
テープ|テープ|fita|substantivo
テープレコーダー|テープレコーダー|gravador de fita|substantivo
テーブル|テーブル|mesa|substantivo
出かける|でかける|sair; partir|verbo
手紙|てがみ|carta|substantivo
できる|できる|ser capaz de (realizar)|verbo
出口|でぐち|saída|substantivo
テスト|テスト|teste|substantivo
では|では|então, bem, assim|conector
デパート|デパート|loja de departamentos|substantivo
でも|でも|mas, porém|conector
出る|でる|aparecer, sair|verbo
テレビ|テレビ|televisão, TV|substantivo
天気|てんき|tempo|substantivo
電気|でんき|eletricidade, luz (elétrica)|substantivo
電車|でんしゃ|trem elétrico|substantivo
電話|でんわ|telefone|substantivo
戸|と|porta (estilo japonês)|substantivo
～度|～ど|contador para ocorrências; ~ grau; ~ ponto|contador
ドア|ドア|porta (estilo ocidental)|substantivo
トイレ|トイレ|banheiro; vaso sanitário|substantivo
どう|どう|como, de que maneira|advérbio
どうして|どうして|por quê, por qual razão|advérbio
どうぞ|どうぞ|por favor, gentilmente, com certeza|expressão
動物|どうぶつ|animal|substantivo
どうも|どうも|Obrigado; de alguma forma; não importa o quanto se tente|expressão
遠い|とおい|longe, distante|adjetivo
十日|とおか|dez dias; décimo dia do mês|contador
時々|ときどき|às vezes|advérbio
時計|とけい|relógio de pulso; relógio|substantivo
どこ|どこ|onde, que lugar|pronome
所|ところ|lugar|substantivo
年|とし|ano, idade|substantivo
図書館|としょかん|biblioteca|substantivo
どちら|どちら|qual (um) (direção); onde (polido)|pronome
どっち|どっち|qual um, qual direção|pronome
とても|とても|muito, grandemente, extremamente|advérbio
どなた|どなた|quem (polido)|pronome
隣|となり|ao lado de, na casa ao lado|advérbio
どの|どの|qual|pronome
飛ぶ|とぶ|voar, pular|verbo
止まる|とまる|parar|verbo
友達|ともだち|amigo|substantivo
土曜日|どようび|sábado|substantivo
鳥|とり|frango (lit., pássaro)|substantivo
鶏肉|とりにく|carne de frango|substantivo
取る|とる|pegar (uma aula); obter (uma nota)|verbo
撮る|とる|tirar (uma foto), fazer (um filme)|verbo
どれ|どれ|qual um|pronome
どんな|どんな|que, que tipo de|adjetivo
ない|ない|não há, não tem|adjetivo
ナイフ|ナイフ|faca|substantivo
中|なか|dentro, meio, entre|substantivo
長い|ながい|longo, extenso|adjetivo
鳴く|なく|fazer som (animal)|verbo
無くす|なくす|perder algo|verbo
なぜ|なぜ|por quê (o mesmo que どうして)|advérbio
夏|なつ|verão|substantivo
夏休み|なつやすみ|férias de verão|substantivo
～など|～など|etcétera / e outros|expressão
七つ|ななつ|sete coisas|substantivo
何|なん; なに|o quê|pronome
七日|なのか|sete dias / sétimo dia do mês|substantivo
名前|なまえ|nome|substantivo
習う|ならう|aprender|verbo
並ぶ|ならぶ|ficar em fila / enfileirar-se|verbo
並べる|ならべる|colocar lado a lado / enfileirar|verbo
なる|なる|tornar-se / vir a ser|verbo
何～|なん～|que tipo de ~|expressão
二|に|dois|substantivo
にぎやか|にぎやか|agitado / movimentado|adjetivo
肉|にく|carne|substantivo
西|にし|oeste|substantivo
～日|～にち|~ dia do mês / por ~ dias|expressão
日曜日|にちようび|domingo|substantivo
荷物|にもつ|bagagem / mala|substantivo
ニュース|ニュース|notícias|substantivo
庭|にわ|jardim|substantivo
脱ぐ|ぬぐ|tirar (roupa)|verbo
温い|ぬるい|morno / tibio|adjetivo
ネクタイ|ネクタイ|gravata|substantivo
猫|ねこ|gato|substantivo
寝る|ねる|dormir / ir dormir / ir para a cama|verbo
～年|～ねん|~ anos|expressão
ノート|ノート|caderno|substantivo
登る|のぼる|escalar / subir|verbo
飲み物|のみもの|bebida / refresco|substantivo
飲む|のむ|beber|verbo
乗る|のる|entrar em / andar de / embarcar|verbo
歯|は|dente|substantivo
パーティー|パーティー|uma festa|substantivo
はい|はい|sim|saudação
～杯|～はい|~ taças / ~ copos|contador
灰皿|はいざら|cinzeiro|substantivo
入る|はいる|entrar / conter / caber|verbo
葉書|はがき|cartão postal|substantivo
はく|はく|vestir (itens abaixo da cintura)|verbo
箱|はこ|caixa|substantivo
橋|はし|ponte|substantivo
箸|はし|hashi / pauzinhos|substantivo
始まる|はじまる|começar|verbo
初め; 始め|はじめ|começo / início|substantivo
初めて|はじめて|pela primeira vez|advérbio
走る|はしる|correr|verbo
バス|バス|ônibus / banho / baixo|substantivo
バター|バター|manteiga|substantivo
二十歳|はたち|20 anos de idade|substantivo
働く|はたらく|trabalhar|verbo
八|はち|oito|substantivo
二十日|はつか|vinte dias / vigésimo (dia do mês)|substantivo
花|はな|flor|substantivo
鼻|はな|nariz|substantivo
話|はなし|conversa / história|substantivo
話す|はなす|falar|verbo
母|はは|mãe|substantivo
早い|はやい|cedo|adjetivo
速い|はやい|rápido / veloz|adjetivo
春|はる|primavera|substantivo
貼る|はる|colar / afixar / pregar|verbo
～個|～こ|contador para itens pequenos / contador genérico|contador
五|ご|cinco|substantivo
～語|～ご|palavra, língua|substantivo
公園|こうえん|parque|substantivo
交差点|こうさてん|cruzamento|substantivo
紅茶|こうちゃ|chá preto|substantivo
交番|こうばん|posto policial|substantivo
声|こえ|voz|substantivo
コート|コート|casaco; quadra (tênis)|substantivo
コーヒー|コーヒー|café|substantivo
ここ|ここ|aqui, este lugar|advérbio
午後|ごご|tarde, P.M.|substantivo
九日|ここのか|nove dias; nono dia do mês|substantivo
九つ|ここのつ|nove coisas|substantivo
午前|ごぜん|manhã, A.M.|substantivo
答える|こたえる|responder, replicar|verbo
こちら|こちら|esta pessoa (educado); este caminho (educado)|pronome
こっち|こっち|esta pessoa; esta direção; este lado|pronome
コップ|コップ|copo, caneca|substantivo
今年|ことし|este ano|substantivo
言葉|ことば|língua; palavra(s); expressão(ões)|substantivo
子供|こども|criança(s)|substantivo
この|この|este|pronome
御飯|ごはん|arroz (cozido); refeição|substantivo
コピーする|コピーする|copiar|verbo
困る|こまる|estar incomodado, ter dificuldade|verbo
これ|これ|este|pronome
～ころ; ～ごろ|～ころ; ～ごろ|cerca de, por volta de, aproximadamente (tempo)|partícula
今月|こんげつ|este mês|substantivo
今週|こんしゅう|esta semana|substantivo
こんな|こんな|tal, como isto|adjetivo
今晩|こんばん|esta noite, esta tarde|substantivo
さあ|さあ|ora, bem|expressão
～歳|～さい|~ anos de idade|expressão
財布|さいふ|carteira|substantivo
魚|さかな|peixe|substantivo
先|さき|futuro; recente, anterior|substantivo
咲く|さく|florescer|verbo
作文|さくぶん|ensaio; composição|substantivo
差す|さす|levantar (estender) as mãos, erguer (ex: guarda-chuva)|verbo
～冊|～さつ|contador para livros|contador
雑誌|ざっし|revista, jornal|substantivo
砂糖|さとう|açúcar|substantivo
寒い|さむい|frio (em referência ao clima)|adjetivo
さ来年|さらいねん|daqui a dois anos|substantivo
～さん|～さん|Sr. ~, Sra. ~|expressão
三|さん|três|substantivo
散歩|さんぽ (する)|caminhada, passeio|substantivo
四|し|quatro|substantivo
～時|～じ|~ horas (hora)|expressão
塩|しお|sal|substantivo
しかし|しかし|contudo; mas|conector
時間|じかん|tempo|substantivo
～時間|～じかん|~ horas|expressão
仕事|しごと|trabalho, emprego, ocupação|substantivo
辞書|じしょ|dicionário|substantivo
静か|しずか|quieto, calmo|adjetivo
下|した|embaixo, abaixo, por baixo|expressão
七|しち|sete|substantivo
質問|しつもん|pergunta, questionamento|substantivo
そちら|そちら|lá, ali|advérbio
そっち|そっち|lá, ali|advérbio
外|そと|fora, exterior|substantivo
その|その|esse, essa, isso|pronome
そば|そば|perto, próximo, ao lado; macarrão de trigo sarraceno|substantivo
空|そら|céu|substantivo
それ|それ|esse, essa, isso|pronome
それから|それから|e então, depois disso|conector
それでは|それでは|nesse caso, bem então|expressão
～台|～だい|contador para veículos; máquinas|contador
大学|だいがく|faculdade, universidade|substantivo
大使館|たいしかん|embaixada|substantivo
大丈夫|だいじょうぶ|Está ok, tudo bem; Não se preocupe; Está tudo sob controle|expressão
大好き|だいすき|muito gostável, gostar muito|adjetivo
大切|たいせつ|importante|adjetivo
台所|だいどころ|cozinha|substantivo
大変|たいへん|muito; difícil, duro|adjetivo
高い|たかい|alto, grande; caro|adjetivo
～だけ|～だけ|apenas, somente|partícula
沢山|たくさん|muito, bastante|advérbio
タクシー|タクシー|táxi|substantivo
出す|だす|tirar; entregar|verbo
～たち|～たち|sufixo de plural|partícula
立つ|たつ|levantar-se, ficar de pé|verbo
たて|たて|comprimento, altura|substantivo
建物|たてもの|edifício|substantivo
楽しい|たのしい|agradável, divertido|adjetivo
頼む|たのむ|pedir, solicitar (um favor)|verbo
たばこ|たばこ|tabaco, cigarros|substantivo
多分|たぶん|talvez, provavelmente, quem sabe|advérbio
食べ物|たべもの|comida|substantivo
食べる|たべる|comer|verbo
卵|たまご|ovo|substantivo
誰|だれ|quem|pronome
誰か|だれか|alguém|pronome
誕生日|たんじょうび|aniversário|substantivo
段々|だんだん|gradualmente, aos poucos|advérbio
小さい|ちいさい|pequeno, pouco|adjetivo
小さな|ちいさな|pequeno, pouco|adjetivo
近い|ちかい|perto, próximo, curto|adjetivo
違う|ちがう|diferente; diferir; errado|verbo
近く|ちかく|perto, nas proximidades|advérbio
地下鉄|ちかてつ|metrô, trem subterrâneo|substantivo
地図|ちず|mapa|substantivo
父|ちち|pai|substantivo
茶色|ちゃいろ|marrom|substantivo
茶碗|ちゃわん|tigela de arroz|substantivo
丁度|ちょうど|exatamente, bem na hora|advérbio
ちょっと|ちょっと|um pouco, ligeiramente|advérbio
使う|つかう|usar|verbo
疲れる|つかれる|cansar-se, ficar fatigado|verbo
次|つぎ|próximo, seguinte|substantivo
着く|つく|chegar em, alcançar|verbo
机|つくえ|escrivaninha, mesa|substantivo
作る|つくる|fazer, criar|verbo
つける|つける|acender (uma luz); pegar|verbo
勤める|つとめる|trabalhar (para)|verbo
つまらない|つまらない|chato, tedioso; insignificante|adjetivo
冷たい|つめたい|frio (objetos, pessoas)|adjetivo
強い|つよい|forte, poderoso|adjetivo
野菜|やさい|vegetal|substantivo
易しい|やさしい|fácil / simples / comum|adjetivo
安い|やすい|barato / em conta|adjetivo
休み|やすみ|feriado / folga / ausência|substantivo
休む|やすむ|descansar / ter folga / faltar|verbo
八つ|やっつ|oito coisas|contador
山|やま|montanha|substantivo
やる|やる|fazer / dar (a animais de estimação, pais, irmãos, etc.)|verbo
夕方|ゆうがた|fim de tarde / noite|substantivo
夕飯|ゆうはん|jantar / ceia|substantivo
郵便局|ゆうびんきょく|agência dos correios|substantivo
昨夜|ゆうべ|noite passada|substantivo
有名|ゆうめい|famoso|adjetivo
雪|ゆき|neve|substantivo
ゆっくりと|ゆっくりと|lentamente / à vontade|advérbio
八日|ようか|oito dias / oitavo dia do mês|contador
洋服|ようふく|roupa ocidental|substantivo
よく|よく|frequentemente / muito / bem|advérbio
横|よこ|ao lado / lado / largura|substantivo
四日|よっか|quatro dias / quarto dia do mês|contador
四つ|よっつ|quatro coisas|contador
呼ぶ|よぶ|chamar / convidar|verbo
読む|よむ|ler|verbo
夜|よる|noite|substantivo
弱い|よわい|fraco|adjetivo
来月|らいげつ|mês que vem|substantivo
来週|らいしゅう|semana que vem|substantivo
来年|らいねん|ano que vem|substantivo
ラジオ|ラジオ|rádio|substantivo
ラジオカセ|ラジオカセ|rádio cassete|substantivo
りっぱ|りっぱ|esplêndido / fino|adjetivo
留学生|りゅうがくせい|estudante internacional|substantivo
両親|りょうしん|pais (ambos)|substantivo
料理|りょうり|culinária / cozinha|substantivo
旅行|りょこう|viagem|substantivo
零|れい|zero|contador
冷蔵庫|れいぞうこ|geladeira|substantivo
レコード|レコード|disco / disco de vinil|substantivo
レストラン|レストラン|restaurante|substantivo
練習|れんしゅう (する)|praticar|verbo
廊下|ろうか|corredor|substantivo
六|ろく|seis|contador
ワイシャツ|ワイシャツ|camisa social|substantivo
若い|わかい|jovem|adjetivo
分かる|わかる|entender|verbo
忘れる|わすれる|esquecer|verbo
私|わたし|eu|pronome
渡す|わたす|entregar / atravessar|verbo
渡る|わたる|atravessar / passar por|verbo
悪い|わるい|mau / pecaminoso / inferior|adjetivo
ボタン|ボタン|botão|substantivo
ホテル|ホテル|hotel|substantivo
本|ほん|livro|substantivo
～本|～ほん|contagem (cilindro longo)|contador
本棚|ほんだな|estante de livros|substantivo
本当|ほんとう|real / verdadeiro|adjetivo
～枚|～まい|contagem (plano)|contador
毎朝|まいあさ|toda manhã|expressão
毎月|まいげつ; まいつき|todo mês / mensalmente|expressão
毎週|まいしゅう|toda semana|expressão
毎日|まいにち|todo dia|expressão
毎年|まいねん; まいとし|todo ano / anualmente|expressão
毎晩|まいばん|toda noite|expressão
前|まえ|antes / em frente|expressão
～前|～まえ|na frente de ~|expressão
曲る|まがる|virar / dobrar|verbo
まずい|まずい|ruim (comida) / desagradável (gosto)|adjetivo
また|また|e / além disso|conector
まだ|まだ|ainda / além disso|advérbio
町|まち|cidade / vila|substantivo
待つ|まつ|esperar|verbo
まっすぐ|まっすぐ|reto / direto|advérbio
マッチ|マッチ|fósforo|substantivo
窓|まど|janela|substantivo
丸い; 円い|まるい|redondo / circular|adjetivo
万|まん|dez mil|contador
万年筆|まんねんひつ|caneta-tinteiro|substantivo
磨く|みがく|escovar (dentes) / polir|verbo
右|みぎ|lado direito|substantivo
短い|みじかい|curto (comprimento)|adjetivo
水|みず|água|substantivo
店|みせ|loja / estabelecimento|substantivo
見せる|みせる|mostrar / exibir|verbo
道|みち|estrada / rua / caminho / direção|substantivo
三日|みっか|três dias / terceiro dia do mês|substantivo
三つ|みっつ|três coisas|contador
緑|みどり|verde|substantivo
皆さん|みなさん|todos vocês / todo mundo|pronome
南|みなみ|Sul|substantivo
耳|みみ|orelha|substantivo
見る|みる|ver / olhar|verbo
みんな|みんな|todos / todo mundo / toda gente|pronome
六日|むいか|seis dias / sexto dia do mês|substantivo
向こう|むこう|além / lá|advérbio
難しい|むずかしい|difícil|adjetivo
六つ|むっつ|seis coisas|contador
村|むら|aldeia|substantivo
目|め|olho(s)|substantivo
メートル|メートル|metro|substantivo
眼鏡|めがね|óculos|substantivo
もう|もう|já / de novo / mais|advérbio
木曜日|もくようび|quinta-feira|substantivo
もしもし|もしもし|Alô? (telefone)|saudação
持つ|もつ|segurar / carregar / possuir|verbo
もっと|もっと|mais|advérbio
物|もの|coisa (concreta)|substantivo
門|もん|portão|substantivo
問題|もんだい|problema|substantivo
～屋|～や|loja de ~|substantivo
八百屋|やおや|quitanda / verdureiro|substantivo
`;

const n4 = `
踏む|ふむ|pisar / pisar em|verbo
～区|～く|distrito / bairro / distrito|substantivo
すっと|すっと|reto / rapidamente|advérbio
盗む|ぬすむ|roubar / furtar|verbo
大抵|たいてい|geralmente / usualmente|advérbio
とうとう|とうとう|finalmente / enfim|advérbio
ガソリン|ガソリン|gasolina|substantivo
鳴る|なる|soar / tocar|verbo
しっかり|しっかり|firmemente / steady|advérbio
生きる|いきる|viver|verbo
苦い|にがい|amargo|adjetivo
沸く|わく|ferver / esquentar|verbo
意見|いけん|opinião / ponto de vista / ideia|substantivo
やはり; やっぱり|やはり; やっぱり|como pensei / com certeza|advérbio
漫画|まんが|mangá / quadrinhos / desenho animado|substantivo
ステレオ|ステレオ|estéreo|substantivo
医学|いがく|ciência médica|substantivo
テキスト|テキスト|texto / livro didático|substantivo
折る|おる|quebrar / dobrar|verbo
～会|～かい|reunião de ~|expressão
うかがう|うかがう|perguntar|verbo
聞こえる|きこえる|ser ouvido / ser audível|verbo
僕|ぼく|eu (usado por homens)|pronome
必ず|かならず|certamente / com certeza|advérbio
壊す|こわす|quebrar / estragar|verbo
怒る|おこる|ficar com raiva / repreender|verbo
床屋|とこや|barbearia|substantivo
オートバイ|オートバイ|motocicleta|substantivo
運動|うんどうする|exercício|verbo
止む|やむ|cessar / parar|verbo
もし|もし|se|conector
表|おもて|superfície / frente / exterior|substantivo
大学生|だいがくせい|estudante universitário|substantivo
運転手|うんてんしゅ|motorista|substantivo
予習|よしゅう|preparação de aulas|substantivo
心配|しんぱいする|preocupação / cuidado|verbo
別|べつ|distinção / diferente|adjetivo
非常に|ひじょうに|extremamente / muito|advérbio
お宅|おたく|casa (de outra pessoa) / lar|substantivo
柔らかい|やわらかい|macio / tenro|adjetivo
拾う|ひろう|pegar / encontrar|verbo
～ございます|～ございます|ser (polido) / existir|verbo
気|き|espírito / humor|substantivo
比べる|くらべる|comparar|verbo
ほとんど|ほとんど|principalmente / quase|advérbio
つもり|つもり|intenção / plano|substantivo
郊外|こうがい|subúrbio / arredores|substantivo
だめ|だめ|inútil / sem valor / sem esperança|adjetivo
売り場|うりば|local de venda|substantivo
正月|しょうがつ|Ano Novo / Dia de Ano Novo|substantivo
規則|きそく|regra / regulamento|substantivo
うん|うん|sim (informal) / tudo bem|expressão
発音|はつおん|pronúncia|substantivo
焼く|やく|assar / grelhar|verbo
屋上|おくじょう|telhado|substantivo
失礼|しつれい|falta de educação / descortesia / Com licença|substantivo
ごみ|ごみ|lixo / escória|substantivo
アフリカ|アフリカ|África|substantivo
点|てん|marca / pontuação / nota / ponto / ponto|substantivo
一生懸命|いっしょうけんめい|muito / com todo o esforço|advérbio
今度|こんど|agora / desta vez / futuro próximo / em breve / na próxima vez|advérbio
機会|きかい|chance / oportunidade|substantivo
建てる|たてる|construir|verbo
複雑|ふくざつ|complexidade / complicação|substantivo
彼|かれ|ele / namorado|pronome
いらっしゃる|いらっしゃる|ir / vir / estar (honorífico)|verbo
布団|ふとん|futon|substantivo
大事|だいじ|importante / valioso / assunto sério|adjetivo
贈り物|おくりもの|presente / dádiva|substantivo
泥棒|どろぼう|ladrão / assaltante|substantivo
逃げる|にげる|fugir / escapar / correr|verbo
だから|だから|então / portanto|conector
残念|ざんねん|lamentável / pesar / pena|adjetivo
畳|たたみ|tatame|substantivo
丁寧|ていねい|polido / cuidadoso / cortês|adjetivo
地理|ちり|geografia|substantivo
さっき|さっき|há pouco / um pouco atrás|advérbio
怖い|こわい|assustador / temível|adjetivo
包む|つつむ|embrulhar / cobrir|verbo
なるべく|なるべく|o máximo possível / se possível|advérbio
無理|むり|impossível / irrazoável|adjetivo
サンドイッチ|サンドイッチ|sanduíche|substantivo
会議室|かいぎしつ|sala de conferências|substantivo
品物|しなもの|mercadoria / produto|substantivo
人形|にんぎょう|boneca / figura|substantivo
利用|りよう|uso / utilização|substantivo
飾る|かざる|decorar / enfeitar|verbo
恥ずかしい|はずかしい|envergonhado / tímido|adjetivo
いくら～ても|いくら～ても|mesmo que / por mais que|expressão
用事|ようじ|assunto / compromisso / tarefa|substantivo
ビル|ビル|prédio|substantivo
けんかする|けんかする|discutir / brigar|verbo
頑張る|がんばる|esforçar-se / dar o melhor de si|verbo
投げる|なげる|lançar / jogar|verbo
故障|こしょうする|quebra / avaria|substantivo
力|ちから|força / poder|substantivo
受ける|うける|receber / pegar|verbo
気分|きぶん|sensação / humor|substantivo
間違える|まちがえる|errar / cometer um erro|verbo
そんな|そんな|tal / assim|pronome
星|ほし|estrela|substantivo
場合|ばあい|caso / situação|substantivo
やっと|やっと|finalmente / por fim|advérbio
足りる|たりる|ser suficiente / bastar|verbo
行う|おこなう|realizar / conduzir|verbo
ぶどう|ぶどう|uvas|substantivo
無くなる|なくなる|desaparecer / perder-se|verbo
準備|じゅんびする|preparar|verbo
世界|せかい|mundo|substantivo
住所|じゅうしょ|endereço / residência|substantivo
再来月|さらいげつ|daqui a dois meses|expressão
林|はやし|bosque / floresta|substantivo
倍|ばい|dobro / vezes|contador
痩せる|やせる|emagrecer / perder peso|verbo
線|せん|linha / fio|substantivo
戦争|せんそう|guerra|substantivo
決める|きめる|decidir|verbo
調べる|しらべる|verificar / pesquisar|verbo
寝坊|ねぼう|dormir até tarde|substantivo
パパ|パパ|papai|substantivo
光る|ひかる|brilhar / reluzir|verbo
夫|おっと|marido|substantivo
雲|くも|nuvem|substantivo
坂|さか|ladeira / colina|substantivo
～(て) しまう|～(て) しまう|terminar / acabar por|expressão
飛行場|ひこうじょう|aeroporto|substantivo
柔道|じゅうどう|judô|substantivo
決して|けっして|nunca|advérbio
事務所|じむしょ|escritório|substantivo
連絡|れんらく|comunicação / contato|substantivo
おつり|おつり|troco / sobra / saldo|substantivo
チェックする|チェックする|verificar|verbo
会話|かいわ|conversa|substantivo
空気|くうき|ar / atmosfera|substantivo
交通|こうつう|tráfego / transporte|substantivo
ワープロ|ワープロ|processador de texto|substantivo
喜ぶ|よろこぶ|alegrar-se / ficar contente|verbo
急行|きゅうこう|trem expresso|substantivo
皆|みな|todos|pronome
味|あじ|sabor / gosto|substantivo
空港|くうこう|aeroporto|substantivo
手袋|てぶくろ|luvas|substantivo
校長|こうちょう|diretor / reitor|substantivo
ごちそう|ごちそう|banquete / tratamento|substantivo
踊り|おどり|dança|substantivo
興味|きょうみ|interesse|substantivo
引っ越す|ひっこす|mudar-se|verbo
冷房|れいぼう|refrigeração / ar condicionado|substantivo
都合|つごう|circunstâncias / conveniência|substantivo
遠慮|えんりょする|hesitar / reservar-se|verbo
亡くなる|なくなる|falecer|verbo
科学|かがく|ciência|substantivo
はっきり|はっきり|claramente / distintamente|advérbio
差し上げる|さしあげる|dar (humilde)|verbo
気持ち|きもち|sentimento / sensação / humor|substantivo
祖父|そふ|avô|substantivo
港|みなと|porto|substantivo
予約|よやく|reserva|substantivo
凄い|すごい|incrível / ótimo|adjetivo
入学|にゅうがくする|matrícula / admissão|verbo
片付ける|かたづける|arrumar / organizar|verbo
写す|うつす|copiar / fotografar|verbo
パソコン|パソコン|computador pessoal|substantivo
部長|ぶちょう|gerente de departamento|substantivo
火事|かじ|incêndio|substantivo
足す|たす|adicionar|verbo
教会|きょうかい|igreja|substantivo
彼ら|かれら|eles|pronome
一杯|いっぱい|cheio / ao máximo|adjetivo
アメリカ|アメリカ|América|substantivo
男性|だんせい|homem / masculino|substantivo
理由|りゆう|razão / motivo|substantivo
生産|せいさんする|produção / produzir|verbo
着物|きもの|quimono / vestido tradicional japonês|substantivo
おもちゃ|おもちゃ|brinquedo|substantivo
暮れる|くれる|escurecer / terminar|verbo
釣る|つる|pescar|verbo
～ちゃん|～ちゃん|sufixo carinhoso (feminino)|partícula
打つ|うつ|bater / golpear|verbo
あんな|あんな|tal / como aquele|adjetivo
謝る|あやまる|pedir desculpas|verbo
昼間|ひるま|durante o dia / dia|substantivo
教育|きょういく|educação|substantivo
女性|じょせい|mulher|substantivo
米|こめ|arroz cru|substantivo
邪魔|じゃま|impedimento / intrusão|substantivo
国際|こくさい|internacional|adjetivo
隅|すみ|canto|substantivo
伺う|うかがう|visitar / perguntar (humilde)|verbo
再来週|さらいしゅう|daqui a duas semanas|expressão
夢|ゆめ|sonho|substantivo
喉|のど|garganta|substantivo
最近|さいきん|recentemente / ultimamente / nos últimos anos|advérbio
周り|まわり|arredores / em volta|substantivo
歴史|れきし|história|substantivo
不便|ふべん|incômodo / inconveniência|substantivo
血|ち|sangue|substantivo
～続ける|～つづける|continuar fazendo|verbo
毛|け|cabelo / pelo|substantivo
ひどい|ひどい|terrível / horrível / cruel|adjetivo
例えば|たとえば|por exemplo|expressão
中々|なかなか|muito / bastante|advérbio
随分|ずいぶん|extremamente|advérbio
～やすい|～やすい|fácil de fazer|expressão
押し入れ|おしいれ|armário / closet|substantivo
電灯|でんとう|luz elétrica|substantivo
叱る|しかる|repreender / ralhar|verbo
サンダル|サンダル|sandália|substantivo
びっくりする|びっくりする|ficar surpreso|verbo
うまい|うまい|delicioso / habilidoso / sortudo|adjetivo
変える|かえる|mudar / alterar|verbo
講堂|こうどう|auditório|substantivo
子|こ|criança|substantivo
沸かす|わかす|ferver / aquecer|verbo
レジ|レジ|caixa registradora|substantivo
しばらく|しばらく|um tempo / um pouco|advérbio
特に|とくに|particularmente / especialmente|advérbio
空く|あく|abrir / ficar vazio|verbo
計画|けいかくする|plano / projeto|substantivo
通り|とおり|rua|substantivo
下着|したぎ|roupa íntima / lingerie|substantivo
経済|けいざい|economia / finanças|substantivo
こう|こう|assim / desta forma|advérbio
是非|ぜひ|certamente / sem falta|advérbio
裏|うら|verso / lado de trás|substantivo
為|ため|bem / em ordem a / para|conector
おいでになる|おいでになる|ser (hon.)|verbo
変わる|かわる|mudar / transformar-se|verbo
以外|いがい|exceto / além de|conector
済む|すむ|terminar / acabar|verbo
ハンバーグ|ハンバーグ|hambúrguer (bife)|substantivo
市|し|cidade|substantivo
引き出し|ひきだし|gaveta|substantivo
遊び|あそび|brincadeira / jogo|substantivo
支度|したくする|preparação|substantivo
～始める|～はじめる|começar a fazer|verbo
見える|みえる|ser visível / vir (pol.)|verbo
十分|じゅうぶん|suficiente / bastante|adjetivo
音|おと|som / nota|substantivo
きっと|きっと|certamente / com certeza|advérbio
まず|まず|primeiro / para começar|advérbio
遠く|とおく|longe|advérbio
大体|だいたい|aproximadamente / geralmente|advérbio
折れる|おれる|quebrar / dobrar / ceder|verbo
正しい|ただしい|correto / certo|adjetivo
輸入|ゆにゅう|importação|substantivo
返事|へんじ|resposta / réplica|substantivo
都|と|metropolitano|adjetivo
産業|さんぎょう|indústria|substantivo
伝える|つたえる|transmitir / contar|verbo
～製|～せい|feito em|expressão
注意|ちゅうい|cuidado / atenção|substantivo
台風|たいふう|tufão|substantivo
日|ひ|sol / luz do sol / dia|substantivo
～軒|～けん|contador para casas|contador
そう|そう|realmente / é mesmo? / sim|advérbio
通る|とおる|passar (por) / atravessar|verbo
過ぎる|すぎる|exceder / ir além|verbo
レポート; リポート|レポート; リポート|relatório|substantivo
葉|は|folha|substantivo
必要|ひつよう|necessário|adjetivo
課長|かちょう|gerente de seção|substantivo
地震|じしん|terremoto|substantivo
すると|すると|e / então|conector
止める|やめる|terminar / parar|verbo
ガラス|ガラス|vidro / painel|substantivo
～学部|～がくぶ|departamento de uma universidade|expressão
厳しい|きびしい|difícil / rigoroso / estrito|adjetivo
エスカレーター|エスカレーター|escada rolante|substantivo
人口|じんこう|população|substantivo
月|つき|lua|substantivo
絹|きぬ|seda|substantivo
ちっとも|ちっとも|nem um pouco|advérbio
深い|ふかい|profundo / profundo|adjetivo
壊れる|こわれる|ser quebrado / quebrar|verbo
揺れる|ゆれる|tremer / balançar|verbo
落る|おちる|cair / deixar cair|verbo
できるだけ|できるだけ|o máximo possível / o quanto for possível|advérbio
悲しい|かなしい|triste / melancólico|adjetivo
中学校|ちゅうがっこう|escola secundária (japonesa)|substantivo
ガス|ガス|gás|substantivo
祈る|いのる|orar / desejar|verbo
盛ん|さかん|próspero / ativo / florescente|adjetivo
アルバイト|アルバイト|emprego de meio período|substantivo
起こす|おこす|acordar (alguém)|verbo
致す|いたす|fazer (humilde)|verbo
噛む|かむ|morder / mastigar|verbo
赤ちゃん|あかちゃん|bebê / infante|substantivo
浅い|あさい|raso / superficial|adjetivo
嘘|うそ|mentira|substantivo
小説|しょうせつ|romance|substantivo
親|おや|pai / mãe|substantivo
それに|それに|além disso / além disso|conector
西洋|せいよう|Ocidente / países ocidentais|substantivo
思う|おもう|pensar / sentir|verbo
パート (タイム)|パート (タイム)|meio período|substantivo
時代|じだい|era / período / época|substantivo
申し上げる|もうしあげる|dizer / contar (humilde)|verbo
～式|～しき|cerimônia / estilo|expressão
出席|しゅっせきする|presença|verbo
～家|～か|pessoa especializada em|expressão
迎える|むかえる|receber / encontrar / cumprimentar|verbo
触る|さわる|tocar / sentir|verbo
建て|～だて|~ andares / moradia separada|expressão
社長|しゃちょう|presidente de uma empresa|substantivo
動物園|どうぶつえん|zoológico|substantivo
捕まえる|つかまえる|pegar / prender|verbo
季節|きせつ|estação (do ano)|substantivo
寄る|よる|parar por|verbo
決まる|きまる|ser decidido / fixo|verbo
小学校|しょうがっこう|escola primária|substantivo
客|きゃく|convidado / cliente|substantivo
昔|むかし|dias antigos / passado|substantivo
美しい|うつくしい|bonito / encantador|adjetivo
捨てる|すてる|jogar fora (lixo) / despejar / descartar|verbo
なさる|なさる|fazer (honorífico)|verbo
事|こと|coisa(s) / matéria(s) / fato(s)|substantivo
どんどん|どんどん|rapidamente e constantemente / em ritmo acelerado|advérbio
試合|しあい|partida / jogo / competição|substantivo
適当|てきとう|adequação / adequação|substantivo
素晴らしい|すばらしい|maravilhoso / fantástico|adjetivo
美術館|びじゅつかん|galeria de arte / museu de arte|substantivo
文法|ぶんぽう|gramática|substantivo
終わり|おわり|fim|substantivo
壁|かべ|parede|substantivo
一度|いちど|uma vez / uma vez|contador
お礼|おれい|expressão de gratidão / agradecimento / presente de agradecimento / reverência|substantivo
親切|しんせつ|gentileza|substantivo
知らせる|しらせる|notificar|verbo
歯医者|はいしゃ|dentista|substantivo
熱心|ねっしん|entusiasmo|substantivo
始める|はじめる|começar / iniciar|verbo
もらう|もらう|receber|verbo
泣く|なく|chorar|verbo
治る|なおる|melhorar / recuperar-se de doença (intransitivo)|verbo
熱|ねつ|febre / temperatura|substantivo
お祭り|おまつり|festival|substantivo
水道|すいどう|serviço de água / linha de água|substantivo
匂い|におい|odor / cheiro|substantivo
ベル|ベル|sino|substantivo
赤ん坊|あかんぼう|bebê|substantivo
おかしい|おかしい|estranho / bizarro / engraçado|adjetivo
事故|じこ|acidente|substantivo
変|へん|estranho / bizarro|adjetivo
辞典|じてん|enciclopédia / livro de referência|substantivo
残る|のこる|permanecer (intransitivo) / ser deixado|verbo
立てる|たてる|colocar de pé / erguer|verbo
くれる|くれる|dar / fazer por|verbo
～員|～いん|membro de ~|expressão
原因|げんいん|causa / origem / fonte|substantivo
驚く|おどろく|surpreender-se / ficar pasmo|verbo
いただく|頂く|comer (modesto) / beber (modesto) / receber (humilde)|verbo
祖母|そぼ|avó|substantivo
場所|ばしょ|lugar / local|substantivo
答|こたえ|resposta / retorno|substantivo
もちろん|もちろん|certamente / é claro|advérbio
漬ける|つける|mergulhar / umedecer / marinar|verbo
受付|うけつけ|balcão de recepção (ista)|substantivo
内|うち|dentro / em|partícula
スクリーン|スクリーン|tela|substantivo
増える|ふえる|aumentar / multiplicar|verbo
または|または|ou / alternativamente|conector
けがする|けがする|lesão (em ser animado) / machucar|verbo
以下|いか|menos que / abaixo|partícula
選ぶ|えらぶ|escolher / selecionar|verbo
～ばかり|～ばかり|acabou de fazer ~ / somente|expressão
心|こころ|coração / mente|substantivo
～だす|～だす|começar a fazer ~|expressão
サラダ|サラダ|salada|substantivo
届ける|とどける|entregar (transitivo)|verbo
挨拶|あいさつする|cumprimentar / cumprimento|verbo
景色|けしき|cenário / paisagem|substantivo
確か|たしか|se eu me lembro corretamente / certo, definitivo|expressão
ステーキ|ステーキ|bife|substantivo
食料品|しょくりょうひん|gêneros alimentícios / mantimentos|substantivo
森|もり|floresta|substantivo
以内|いない|dentro de / menos de|expressão
予定|よてい|planos / arranjo, horário|substantivo
オーバー|オーバー|casaco comprido / mais de, excesso, exagero|substantivo
乾く|かわく|secar|verbo
石|いし|pedra|substantivo
思い出す|おもいだす|relembrar / lembrar|verbo
踊る|おどる|dançar|verbo
細かい|こまかい|pequeno / fino, minucioso|adjetivo
塗る|ぬる|pintar / rebocar|verbo
ご主人|ごしゅじん|marido (dele, dela)|substantivo
珍しい|めずらしい|incomum / raro|adjetivo
用|よう|recado / tarefa, negócio (para cuidar)|substantivo
公務員|こうむいん|funcionário público / servidor público|substantivo
お嬢さん|おじょうさん|senhorita (educado)|substantivo
用意|ようい|preparação|substantivo
探す|さがす|procurar / buscar, almejar|verbo
形|かたち|forma|substantivo
運転|うんてんする|dirigir|verbo
すっかり|すっかり|completamente / totalmente|advérbio
アナウンサー|アナウンサー|locutor|substantivo
お土産|おみやげ|lembrança / souvenir|substantivo
消しゴム|けしゴム|borracha|substantivo
旅館|りょかん|pousada japonesa|substantivo
海岸|かいがん|costa / beira-mar|substantivo
寂しい|さびしい|solitário / solitário|adjetivo
火|ひ|fogo|substantivo
育てる|そだてる|criar / educar|verbo
味噌|みそ|miso, pasta de feijão|substantivo
お祝い|おいわい|congratulação / celebração|substantivo
乗り物|のりもの|veículo|substantivo
案内|あんないする|informação / orientação|verbo
通う|かよう|ir e vir / trabalhar (em um local fixo)|verbo
連れる|つれる|levar (uma pessoa)|verbo
技術|ぎじゅつ|técnica / tecnologia, habilidade|substantivo
小鳥|ことり|passarinho|substantivo
下宿|げしゅく|alojamento / pensão|substantivo
ジャム|ジャム|geleia|substantivo
招待|しょうたいする|convite|verbo
鏡|かがみ|espelho|substantivo
はず|はず|deveria ser assim|expressão
法律|ほうりつ|lei|substantivo
進む|すすむ|avançar / prosseguir|verbo
楽む|たのしむ|aproveitar / desfrutar|verbo
貿易|ぼうえき|comércio|substantivo
反対|はんたい|oposição / resistência|substantivo
おる|おる|estar (forma humilde)|verbo
申す|もうす|chamar-se (forma humilde)|verbo
試験|しけん|exame|substantivo
真面目|まじめ|diligente / sério|adjetivo
ごらんになる|ごらんになる|ver (forma honorífica)|verbo
店員|てんいん|vendedor / empregado de loja|substantivo
泊まる|とまる|ficar (dormir)|verbo
よろしい|よろしい|bom / OK, tudo bem (formal)|adjetivo
今夜|こんや|esta noite|advérbio
くださる|くださる|dar, conferir|verbo
息子|むすこ|filho|substantivo
お子さん|おこさん|criança (de outra pessoa)|substantivo
会場|かいじょう|local, lugar de reunião|substantivo
笑う|わらう|rir, sorrir|verbo
運ぶ|はこぶ|transportar, carregar|verbo
文学|ぶんがく|literatura|substantivo
光|ひかり|luz|substantivo
お見舞い|おみまい|visita (a doente)|substantivo
席|せき|assento|substantivo
～様|～さま|Sr., Sra., Srta.|saudação
ご存じ|ごぞんじ|conhecimento, saber|substantivo
下る|さがる|descer, cair|verbo
字|じ|letra; caractere|substantivo
アジア|アジア|Ásia|substantivo
褒める|ほめる|elogiar, dizer coisas boas|verbo
あ|あ|Ah|expressão
最も|もっとも|mais, o mais|advérbio
合う|あう|caber, combinar|verbo
～代|～だい|~ era; período|expressão
最後|さいご|último, fim|substantivo
値段|ねだん|preço|substantivo
退院|たいいんする|alta hospitalar|verbo
展覧会|てんらんかい|exposição|substantivo
久しぶり|ひさしぶり|há muito tempo; pela primeira vez em muito tempo|expressão
カーテン|カーテン|cortina|substantivo
汽車|きしゃ|trem (a vapor)|substantivo
遅れる|おくれる|atrasar-se, ficar atrasado|verbo
見つかる|みつかる|ser encontrado, ser descoberto|verbo
召し上がる|めしあがる|comer, beber (honorífico)|verbo
太る|ふとる|engordar|verbo
注射|ちゅうしゃ|injeção|substantivo
様|よう|maneira, modo, tipo|substantivo
～おき|～おき|a cada ~|expressão
最初|さいしょ|início, primeiro|substantivo
御～|ご～|honorífico ~|expressão
安心|あんしん|paz de espírito, alívio|substantivo
直る|なおる|ser consertado, ser corrigido|verbo
集める|あつめる|coletar, juntar, montar|verbo
直す|なおす|corrigir; consertar|verbo
続く|つづく|ser continuado|verbo
先輩|せんぱい|seniores (em um grupo)|substantivo
約束|やくそく|arranjo, compromisso, promessa|substantivo
世話|せわする|cuidar; cuidar de|verbo
近所|きんじょ|vizinhança|substantivo
将来|しょうらい|futuro; perspectivas|substantivo
億|おく|cem milhões|contador
数学|すうがく|matemática|substantivo
文化|ぶんか|cultura|substantivo
払う|はらう|pagar|verbo
習慣|しゅうかん|costume (cultural)|substantivo
焼ける|やける|queimar, ser assado|verbo
君|きみ|você (informal, para homens)|pronome
冷える|ひえる|esfriar, ficar frio|verbo
点く|つく|ser iniciado, ser ligado|verbo
この間|このあいだ|outro dia, recentemente|advérbio
格好|かっこう|aparência, modo, forma, postura|substantivo
かまう|かまう|importar-se, preocupar-se|verbo
続ける|つづける|continuar, manter|verbo
落す|おとす|deixar cair, perder|verbo
込む|こむ|estar lotado / encher / abarrotar|verbo
この頃|このごろ|estes dias / hoje em dia|advérbio
訪ねる|たずねる|visitar|verbo
下げる|さげる|abaixar / descer / pendurar|verbo
花見|はなみ|apreciar flores de cerejeira|expressão
途中|とちゅう|no caminho / no meio|advérbio
入院|にゅういんする|hospitalização / internar-se|substantivo
乗り換える|のりかえる|trocar (de trem) / mudar (de ônibus)|verbo
別れる|わかれる|despedir-se de / separar-se|verbo
～町|～ちょう|a cidade de ~|expressão
安全|あんぜん|segurança / salvaguarda|substantivo
看護婦|かんごふ|enfermeira (feminino)|substantivo
見物|けんぶつ|visita turística / passeios|substantivo
相談|そうだんする|consulta / aconselhamento|substantivo
ガソリンスタンド|ガソリンスタンド|posto de gasolina|substantivo
テニス|テニス|tênis|substantivo
眠る|ねむる|dormir|verbo
上がる|あがる|subir / aumentar|verbo
翻訳|ほんやく|tradução / traduzir|substantivo
食事|しょくじする|refeição / fazer uma refeição|substantivo
お陰|おかげ|graças a / devido a|expressão
娘|むすめ|filha (humilde)|substantivo
湯|ゆ|água quente|substantivo
競争|きょうそう|competição / disputa|substantivo
会議|かいぎ|reunião de negócios / conferência|substantivo
湖|みずうみ|lago|substantivo
集まる|あつまる|reunir-se / juntar-se|verbo
～にくい|～にくい|difícil de fazer ~|expressão
生活|せいかつする|vida / viver|substantivo
糸|いと|fio / linha|substantivo
関係|かんけい|relação / conexão|substantivo
ピアノ|ピアノ|piano|substantivo
～目|～め|número ~ de sequência / ~º|expressão
番組|ばんぐみ|programa de transmissão|substantivo
急|きゅう|urgente / repentino / íngreme|adjetivo
棚|たな|prateleiras / estante|substantivo
木綿|もめん|algodão|substantivo
輸出|ゆしゅつする|exportar|verbo
タイプ|タイプ|tipo / estilo|substantivo
すり|すり|batedor de carteira|substantivo
嬉しい|うれしい|feliz / contente|adjetivo
アルコール|アルコール|álcool|substantivo
ソフト|ソフト|macio / chapéu macio / software|adjetivo
神社|じんじゃ|santuário xintoísta|substantivo
大分|だいぶ|bastante / consideravelmente|advérbio
楽しみ|たのしみ|prazer / diversão|substantivo
趣味|しゅみ|hobby / passatempo|substantivo
電報|でんぽう|telegrama|substantivo
家内|かない|esposa (própria)|substantivo
指|ゆび|dedo|substantivo
これから|これから|a partir de agora / depois disto|advérbio
たまに|たまに|ocasionalmente / às vezes|advérbio
社会|しゃかい|sociedade|substantivo
出発|しゅっぱつする|partida|verbo
拝見|はいけんする|ver, olhar (humilde, polido)|verbo
割れる|われる|quebrar|verbo
背中|せなか|costas|substantivo
新聞社|しんぶんしゃ|empresa de jornal|substantivo
いじめる|いじめる|importunar, atormentar|verbo
回る、回す|まわる、まわす|girar, rodar|verbo
～君|～くん|Sr. (júnior), mestre|expressão
おっしゃる|おっしゃる|dizer (honorífico)|verbo
眠い|ねむい|sonolento, sonolento|adjetivo
濡れる|ぬれる|molhar-se|verbo
倒れる|たおれる|cair, desabar|verbo
スーパー (マーケット)|スーパー (マーケット)|supermercado|substantivo
アクセサリー|アクセサリー|acessório|substantivo
考える|かんがえる|pensar, considerar|verbo
向かう|むかう|encarar, ir em direção a|verbo
自由|じゆう|liberdade|substantivo
仕方|しかた|jeito, maneira|substantivo
首|くび|pescoço|substantivo
程|ほど|grau, extensão|substantivo
代わり|かわり|substituto, reposição|substantivo
失敗|しっぱい|falha, erro|substantivo
工業|こうぎょう|indústria|substantivo
移る|うつる|mover-se, transferir-se|verbo
スーツケース|スーツケース|mala|substantivo
ひげ|ひげ|barba|substantivo
研究室|けんきゅうしつ|escritório do professor, laboratório|substantivo
工場|こうじょう|fábrica|substantivo
紹介|しょうかい|introdução|substantivo
けれど; けれども|けれど; けれども|mas, embora|conector
舟|ふね|navio, barco|substantivo
動く|うごく|mover-se|verbo
～(に) ついて|～(に) ついて|sobre, a respeito de|partícula
コンサート|コンサート|concerto|substantivo
虫|むし|inseto|substantivo
優しい|やさしい|gentil, amável, fácil|adjetivo
コンピュータ; コンピューター|コンピュータ; コンピューター|computador|substantivo
植える|うえる|plantar|verbo
両方|りょうほう|ambos os lados, ambas as partes|substantivo
汚れる|よごれる|sujar-se|verbo
水泳|すいえい|natação|substantivo
経験|けいけんする|experiência|verbo
勝つ|かつ|vencer, ganhar|verbo
砂|すな|areia|substantivo
警察|けいさつ|polícia, delegacia|substantivo
取り替える|とりかえる|trocar, substituir|verbo
急ぐ|いそぐ|apressar-se, correr|verbo
簡単|かんたん|simples|adjetivo
参る|まいる|ir, vir (humilde)|verbo
全然|ぜんぜん|de jeito nenhum; completamente|advérbio
特別|とくべつ|especial|adjetivo
復習|ふくしゅう|revisão|substantivo
間に合う|まにあう|estar a tempo|verbo
役に立つ|やくにたつ|ser útil, ser útil|verbo
もうすぐ|もうすぐ|em breve; em alguns momentos; dias|advérbio
真中|まんなか|meio, centro|substantivo
戻る|もどる|retornar, voltar|verbo
研究|けんきゅう|estudo, pesquisa|substantivo
ケーキ|ケーキ|bolo|substantivo
草|くさ|grama|substantivo
お金持ち|かねもち; おかねもち|pessoa rica|substantivo
説明|せつめい|explicação|substantivo
島|しま|ilha|substantivo
道具|どうぐ|ferramenta|substantivo
滑る|すべる|escorregar / deslizar|verbo
それほど|それほど|tanto assim; até esse ponto|advérbio
以上|いじょう|mais que; é tudo|expressão
～まま|～まま|como está / sem mudar|expressão
特急|とっきゅう|trem expresso limitado|substantivo
プレゼント|プレゼント|presente, brinde|substantivo
～(に) よると|～(に) よると|segundo ~ / de acordo com ~|expressão
妻|つま|esposa (humilde)|substantivo
帰り|かえり|retorno, volta|substantivo
具合|ぐあい|condição; estado; saúde|substantivo
堅; 硬; 固い|かたい|sólido, duro, firme|adjetivo
駐車場|ちゅうしゃじょう|estacionamento|substantivo
スーツ|スーツ|terno|substantivo
危険|きけん|perigo, risco, ameaça|substantivo
髪|かみ|cabelo|substantivo
天気予報|てんきよほう|previsão do tempo|substantivo
彼女|かのじょ|namorada; ela|pronome
間|あいだ|espaço, intervalo|substantivo
卒業|そつぎょう|formatura|substantivo
それで|それで|e então; por causa disso|conector
枝|えだ|galho, graveto|substantivo
専門|せんもん|especialidade; curso principal|substantivo
そろそろ|そろそろ|gradualmente, logo|advérbio
送る|おくる|enviar, despachar|verbo
あげる|あげる|dar (para alguém de status igual ou inferior)|verbo
騒ぐ|さわぐ|fazer barulho, agitar-se|verbo
尋ねる|たずねる|perguntar, inquirir|verbo
放送|ほうそうする|transmissão; radiodifusão|verbo
政治|せいじ|política|substantivo
市民|しみん|cidadão|substantivo
ファックス|ファックス|fax|substantivo
負ける|まける|perder (um jogo); ser derrotado|verbo
指輪|ゆびわ|anel (de dedo)|substantivo
田舎|いなか|zona rural, campo|substantivo
見つける|みつける|descobrir, achar|verbo
高校生|こうこうせい|estudante do ensino médio|substantivo
講義|こうぎ|aula, palestra|substantivo
そんなに|そんなに|tanto assim; desse jeito|advérbio
昼休み|ひるやすみ|intervalo para almoço|substantivo
忘れ物|わすれもの|objeto esquecido, coisa perdida|substantivo
下りる|おりる|descer, sair|verbo
腕|うで|braço|substantivo
訳|わけ|razão; explicação|substantivo
承知|しょうちする|consentir, aceitar|verbo
日記|にっき|diário, jornal|substantivo
高校; 高等学校|こうこう; こうとうがっこう|ensino médio|substantivo
似る|にる|parecer, ser semelhante|verbo
～おわる|～おわる|terminar de fazer ~|expressão
暖房|だんぼう|aquecimento|substantivo
留守|るす|ausência; não estar em casa|substantivo
割合|わりあい|taxa, proporção, porcentagem|substantivo
寺|てら|templo budista|substantivo
慣れる|なれる|acostumar-se a|verbo
普通|ふつう|comum; usual|adjetivo
手伝う|てつだう|ajudar|verbo
なるほど|なるほど|entendo; compreendo agora|expressão
`;

const n3 = `
作法|さほう|maneiras / etiqueta|substantivo
様々|さまざま|variado / diverso|adjetivo
冷ます|さます|esfriar (algo)|verbo
覚ます|さます|despertar (algo)|verbo
冷める|さめる|esfriar (algo) / diminuir|verbo
覚める|さめる|acordar|verbo
左右|さゆう|esquerda e direita / influência|substantivo
皿|さら|prato, louça|substantivo
更に|さらに|além disso, ademais|advérbio
去る|さる|sair, ir embora|verbo
猿|さる|macaco|substantivo
騒ぎ|さわぎ|tumulto, distúrbio|substantivo
参加|さんか|participação|substantivo
参考|さんこう|referência, consulta|substantivo
賛成|さんせい|aprovação, acordo|substantivo
酸性|さんせい|acidez|substantivo
酸素|さんそ|oxigênio|substantivo
氏|し|sobrenome, linhagem|substantivo
詩|し|poema; poesia|substantivo
幸せ|しあわせ|felicidade, bênção|substantivo
ジーンズ|ジーンズ|jeans|substantivo
ジェット機|ジェットき|avião a jato|substantivo
四角|しかく|quadrado|substantivo
直に|じかに|imediatamente, prontamente, diretamente|advérbio
しかも|しかも|além disso, ademais, além|conector
四季|しき|quatro estações|substantivo
直|じき|imediatamente, logo, em breve|advérbio
時期|じき|tempo, estação, período|substantivo
支給|しきゅう|pagamento, subsídio|substantivo
至急|しきゅう|urgente, premente|adjetivo
しきりに|しきりに|frequentemente, repetidamente, ansiosamente|advérbio
刺激|しげき|estímulo, ímpeto, incentivo|substantivo
資源|しげん|recursos|substantivo
事件|じけん|evento, caso, incidente|substantivo
時刻|じこく|hora, momento|substantivo
自殺|じさつ|suicídio|substantivo
事実|じじつ|fato, verdade, realidade|substantivo
支出|ししゅつ|despesa, gastos|substantivo
事情|じじょう|circunstâncias, situação, razões|substantivo
詩人|しじん|poeta|substantivo
自身|じしん|si mesmo|pronome
沈む|しずむ|afundar; sentir-se deprimido|verbo
自然|しぜん|natureza, espontâneo|substantivo
思想|しそう|pensamento, ideia|substantivo
舌|した|língua|substantivo
次第|しだい|ordem; circunstâncias; imediatamente|substantivo
従う|したがう|obedecer (às regras), cumprir|verbo
したがって|したがって|portanto, consequentemente|conector
親しい|したしい|íntimo, próximo (ex: amigo)|adjetivo
質|しつ|qualidade, natureza (de pessoa)|substantivo
失業|しつぎょう|desemprego|substantivo
湿気|しっけ|umidade, umidade, mofo|substantivo
実験|じっけん|trabalho de laboratório; experimento|substantivo
実現|じつげん|implementação, materialização, realização|substantivo
実行|じっこう|prática, execução (ex: programa), realização|substantivo
実際|じっさい|de fato; na verdade|advérbio
実施|じっし|implementação, executar, operação|substantivo
湿度|しつど|umidade|substantivo
じっと|じっと|pacientemente, quietamente|advérbio
実に|じつに|realmente, verdadeiramente, certamente|advérbio
実は|じつは|na verdade; de fato|advérbio
失望|しつぼう|decepção, desespero|substantivo
実力|じつりょく|habilidade; força|substantivo
支店|してん|filial|substantivo
指導|しどう|liderança, orientação, treinamento|substantivo
自動|じどう|automático, auto-movimento|adjetivo
児童|じどう|crianças, juvenil|substantivo
品|しな|coisa, artigo, mercadoria|substantivo
支配|しはい|regra, controle, direção|substantivo
芝居|しばい|peça, drama|substantivo
しばしば|しばしば|frequentemente, repetidamente, de novo e de novo|advérbio
芝生|しばふ|gramado|substantivo
支払|しはらい|pagamento|substantivo
支払う|しはらう|pagar|verbo
死亡|しぼう|morte|substantivo
資本|しほん|fundos, capital|substantivo
姉妹|しまい|irmãs|substantivo
しまった (かん)|しまった (かん)|Droga!|expressão
自慢|じまん|orgulho, exibição|substantivo
地味|じみ|discreto, simples, conservador|adjetivo
示す|しめす|mostrar, indicar|verbo
占める|しめる|ocupar; contar para|verbo
湿る|しめる|estar molhado, estar úmido|verbo
霜|しも|geada|substantivo
借金|しゃっきん|dívida, empréstimo, passivo|substantivo
しゃべる|しゃべる|falar, conversar, tagarelar|verbo
週|しゅう|semana|substantivo
州|しゅう|estado, província|substantivo
銃|じゅう|arma|substantivo
周囲|しゅうい|arredores, circunferência, vizinhança|substantivo
収穫|しゅうかく|colheita, safra|substantivo
宗教|しゅうきょう|religião|substantivo
重視|じゅうし|importância, ênfase|substantivo
就職|しゅうしょく|encontrar emprego|substantivo
ジュース|ジュース|suco, refrigerante; dois|substantivo
修正|しゅうせい|emenda, correção|substantivo
重体|じゅうたい|gravemente doente, estado crítico|substantivo
渋滞|じゅうたい|congestionamento (tráfego), atraso|substantivo
重大|じゅうだい|sério, importante|adjetivo
住宅|じゅうたく|moradia, residência|substantivo
集団|しゅうだん|grupo, massa|substantivo
集中|しゅうちゅう|concentração, foco da mente|substantivo
収入|しゅうにゅう|renda, receita|substantivo
住民|じゅうみん|moradores, residentes|substantivo
重要|じゅうよう|importante, essencial|adjetivo
修理|しゅうり|reparo, conserto|substantivo
主義|しゅぎ|doutrina, causa, princípio|substantivo
宿泊|しゅくはく|alojamento|substantivo
手術|しゅじゅつ|operação cirúrgica|substantivo
首相|しゅしょう|Primeiro-Ministro|substantivo
手段|しゅだん|meios, maneira, medida|substantivo
主張|しゅちょう|alegação, insistência, afirmação|substantivo
出場|しゅつじょう|participação|substantivo
出身|しゅっしん|vir de|substantivo
出版|しゅっぱん|publicação|substantivo
首都|しゅと|cidade capital|substantivo
主婦|しゅふ|dona de casa|substantivo
主要|しゅよう|principal, chefe|adjetivo
需要|じゅよう|demanda|substantivo
種類|しゅるい|variedade, tipo|substantivo
順|じゅん|ordem, vez|substantivo
瞬間|しゅんかん|momento, segundo|substantivo
順調|じゅんちょう|indo bem|adjetivo
順番|じゅんばん|vez (na fila), ordem das coisas|substantivo
使用|しよう|uso, aplicação, emprego, utilização|substantivo
小|しょう|pequeno|adjetivo
章|しょう|capítulo, seção; medalha|substantivo
深刻|しんこく|sério|adjetivo
診察|しんさつ|exame médico|expressão
人種|じんしゅ|raça|substantivo
信じる|しんじる|acreditar|verbo
人生|じんせい|vida|substantivo
親戚|しんせき|parente|substantivo
新鮮|しんせん|fresco|adjetivo
心臓|しんぞう|coração|substantivo
身体|しんたい|corpo|substantivo
身長|しんちょう|altura|substantivo
慎重|しんちょう|cuidadoso/prudente/cauteloso|adjetivo
審判|しんぱん|árbitro/juiz/julgamento|substantivo
人物|じんぶつ|personagem/talento|substantivo
進歩|しんぽ|melhora/progresso/desenvolvimento|substantivo
親友|しんゆう|amigo íntimo|substantivo
信用|しんよう|confiança/dependência|substantivo
信頼|しんらい|confiança/crença|substantivo
心理|しんり|mentalidade|substantivo
人類|じんるい|humanidade/gênero humano|substantivo
巣|す|ninho/local de reprodução|substantivo
酢|す|vinagre|substantivo
図|ず|figura/desenho/ilustração|substantivo
水準|すいじゅん|nível/padrão|substantivo
推薦|すいせん|recomendação|substantivo
スイッチ|スイッチ|interruptor|substantivo
睡眠|すいみん|sono|substantivo
数|すう|número/figura|substantivo
数字|すうじ|numeral/algarismo|substantivo
スープ|スープ|sopa|substantivo
末|すえ|fim/pó|substantivo
姿|すがた|figura/forma/aparência|substantivo
スキー|スキー|esqui|substantivo
救う|すくう|salvar/ajudar|verbo
すくなくとも|すくなくとも|pelo menos|advérbio
優れる|すぐれる|superar/superar/exceler|verbo
スケート|スケート|patins/patinação|substantivo
スケジュール|スケジュール|agenda/cronograma|substantivo
少しも|すこしも|nada/nem um pouco|advérbio
過ごす|すごす|passar/gastar (tempo)|verbo
筋|すじ|músculo/fio/linha|substantivo
進める|すすめる|avançar/promover/acelerar|verbo
勧める|すすめる|instar/recomendar|verbo
スター|スター|estrela|substantivo
スタイル|スタイル|estilo|substantivo
スタンド|スタンド|suporte|substantivo
頭痛|ずつう|dor de cabeça|substantivo
ずっと|ずっと|muito/todo o tempo/consecutivamente|advérbio
すっぱい|すっぱい|azedo|adjetivo
すてき|すてき|adorável/ótimo|adjetivo
既に|すでに|já|advérbio
すなわち|すなわち|isto é/ou seja/por exemplo|conector
スピーチ|スピーチ|discurso|substantivo
全て|すべて|tudo/o todo/inteiramente|advérbio
済ませる|すませる|terminar|verbo
墨|すみ|tinta|substantivo
すみません (かん)|すみません (かん)|desculpe/com licença|saudação
澄む|すむ|clarear/tornar transparente|verbo
清む|すむ|clarear/tornar transparente|verbo
刷る|する|imprimir|verbo
為る|する|fazer/tentar|verbo
賞|しょう|prêmio, recompensa|substantivo
障害|しょうがい|obstáculo, impedimento|substantivo
奨学金|しょうがくきん|bolsa de estudos|substantivo
乗客|じょうきゃく|passageiro|substantivo
上京|じょうきょう|indo para a capital (Tóquio)|expressão
状況|じょうきょう|situação, estado de coisas|substantivo
条件|じょうけん|condições, termos|substantivo
正午|しょうご|meio-dia|substantivo
正直|しょうじき|honestidade, integridade, franqueza|substantivo
常識|じょうしき|senso comum|substantivo
少女|しょうじょ|garota, moça|substantivo
少々|しょうしょう|um pouco; pouco tempo|advérbio
症状|しょうじょう|sintomas, condição|substantivo
生じる|しょうじる|ocorrer, surgir, ser gerado|verbo
状態|じょうたい|condição, situação|substantivo
上達|じょうたつ|melhora, avanço|substantivo
冗談|じょうだん|piada|substantivo
上等|じょうとう|primeira classe, muito bom|adjetivo
衝突|しょうとつ|colisão, conflito|substantivo
商人|しょうにん|comerciante, vendedor, mercador|substantivo
承認|しょうにん|reconhecimento, aprovação|substantivo
少年|しょうねん|meninos, jovens|substantivo
商売|しょうばい|comércio, negócio, negócios|substantivo
消費|しょうひ|consumo, despesa|substantivo
商品|しょうひん|mercadoria, produto|substantivo
賞品|しょうひん|prêmio, troféu|substantivo
消防|しょうぼう|combate a incêndios, corpo de bombeiros|substantivo
情報|じょうほう|informação, inteligência (militar)|substantivo
証明|しょうめい|prova, verificação|substantivo
省略|しょうりゃく|omissão, abreviação, resumo|substantivo
女王|じょおう|rainha|substantivo
職|しょく|emprego|substantivo
職業|しょくぎょう|ocupação, negócio|substantivo
食卓|しょくたく|mesa de jantar|substantivo
食品|しょくひん|alimento, produto alimentício|substantivo
植物|しょくぶつ|planta, vegetação|substantivo
食物|しょくもつ|alimento, produto alimentício|substantivo
食欲|しょくよく|apetite (por comida)|substantivo
食料|しょくりょう|comida|substantivo
食糧|しょくりょう|provisões, rações|substantivo
書斎|しょさい|escritório, escritório|substantivo
女子|じょし|mulher, garota|substantivo
助手|じょしゅ|ajudante, assistente|substantivo
徐々に|じょじょに|lentamente, pouco a pouco|advérbio
署名|しょめい|assinatura|substantivo
書物|しょもつ|livros|substantivo
女優|じょゆう|atriz|substantivo
処理|しょり|processamento, tratamento, disposição|substantivo
書類|しょるい|documentos, papéis oficiais|substantivo
知らせ|しらせ|aviso|substantivo
尻|しり|nádegas, traseiro|substantivo
知合い|しりあい|conhecido|substantivo
印|しるし|marca; símbolo; evidência|substantivo
城|しろ|castelo|substantivo
進学|しんがく|ir para a universidade|substantivo
神経|しんけい|nervo, sensibilidade|substantivo
真剣|しんけん|seriedade, empenho|substantivo
信仰|しんこう|fé (religiosa), crença|substantivo
信号|しんごう|semáforo, sinal, semáforo|substantivo
人工|じんこう|artificial, feito pelo homem, obra humana|adjetivo
鋭い|するどい|pontiagudo, afiado|adjetivo
すれ違う|すれちがう|passar um pelo outro|verbo
ずれる|ずれる|mover, sair do ponto|verbo
正|せい|verdadeiro, regular|adjetivo
生|せい|nascimento|substantivo
性|せい|sexo, gênero|substantivo
姓|せい|sobrenome, nome de família|substantivo
所為|せい|causa, razão, culpa|substantivo
税|ぜい|imposto|substantivo
性格|せいかく|caráter, personalidade|substantivo
正確|せいかく|preciso, pontualidade, exato|adjetivo
世紀|せいき|século|substantivo
請求|せいきゅう|reclamação, demanda, pedido|substantivo
税金|ぜいきん|imposto, taxa|substantivo
清潔|せいけつ|limpo|adjetivo
制限|せいげん|restrição, contenção, limitação|substantivo
成功|せいこう|sucesso, acerto|substantivo
正式|せいしき|oficial, formal|adjetivo
性質|せいしつ|natureza, propriedade, disposição|substantivo
精神|せいしん|mente, alma, espírito|substantivo
成人|せいじん|adulto|substantivo
精々|せいぜい|no máximo, no melhor dos casos|advérbio
成績|せいせき|nota (em uma prova), histórico escolar|substantivo
製造|せいぞう|fabricação, produção|substantivo
贅沢|ぜいたく|luxo, extravagância|substantivo
成長|せいちょう|crescimento|substantivo
生長|せいちょう|crescimento|substantivo
制度|せいど|sistema, instituição|substantivo
青年|せいねん|juventude, jovem|substantivo
生年月日|せいねんがっぴ|data de nascimento|substantivo
製品|せいひん|bens manufaturados, produtos acabados|substantivo
政府|せいふ|governo, administração|substantivo
生物|せいぶつ|ser vivo, organismo|substantivo
生命|せいめい|vida|substantivo
整理|せいり|ordenação, arranjo|substantivo
咳|せき|tosse|substantivo
石炭|せきたん|carvão|substantivo
責任|せきにん|dever, responsabilidade|substantivo
石油|せきゆ|petróleo, querosene|substantivo
世間|せけん|mundo, sociedade|substantivo
説|せつ|teoria|substantivo
積極的|せっきょくてき|positivo, ativo, proativo|adjetivo
設計|せっけい|plano, projeto|substantivo
絶対|ぜったい|definitivamente, sem falta, absolutismo|advérbio
セット|セット|conjunto|substantivo
愛|あい|amor|substantivo
相変わらず|あいかわらず|como sempre, como de costume|advérbio
愛情|あいじょう|amor, afeição|substantivo
合図|あいず|sinal, indicação|substantivo
アイスクリーム|アイスクリーム|sorvete|substantivo
愛する|あいする|amar|verbo
相手|あいて|parceiro; destinatário; com quem se fala|substantivo
あいにく|あいにく|infelizmente|advérbio
遭う|あう|encontrar, deparar-se (nuance indesejável)|verbo
アウト|アウト|fora|expressão
明かり|あかり|luz de lampião, luz (em geral)|substantivo
空き|あき|vaga, espaço|substantivo
明らか|あきらか|óbvio, claro|adjetivo
諦める|あきらめる|desistir, abandonar|verbo
飽きる|あきる|cansar-se de, perder o interesse em|verbo
握手|あくしゅ|aperto de mão|substantivo
悪魔|あくま|demônio, diabo, espírito maligno|substantivo
明ける|あける|amanhecer, clarear|verbo
揚げる|あげる|levantar, fritar|verbo
挙げる|あげる|levantar; listar, citar|verbo
預かる|あずかる|guardar (algo) para (alguém)|verbo
預ける|あずける|entregar à custódia, depositar|verbo
汗|あせ|suor, transpiração|substantivo
与える|あたえる|dar, conceder|verbo
温かい|あたたかい|quente, morno|adjetivo
暖まる|あたたまる|aquecer-se|verbo
温まる|あたたまる|aquecer-se, ficar morno|verbo
暖める|あたためる|aquecer (alguém/algo), esquentar (alguém/algo)|verbo
温める|あたためる|aquecer, esquentar|verbo
辺り|あたり|vizinhança, arredores|substantivo
当たり前|あたりまえ|usual, comum, óbvio|adjetivo
当たる|あたる|ser atingido, ter sucesso|verbo
あちこち|あちこち|aqui e ali, por toda parte|advérbio
扱う|あつかう|tratar, manusear, lidar com|verbo
集まり|あつまり|reunião, encontro, coleção|substantivo
当てる|あてる|atingir; aplicar a|verbo
跡|あと|vestígio; ruína; cicatriz|substantivo
穴|あな|buraco, fenda|substantivo
油|あぶら|óleo|substantivo
脂|あぶら|gordura|substantivo
誤り|あやまり|erro, engano|substantivo
粗|あら|defeito, falha, imperfeição|substantivo
嵐|あらし|tempestade, borrasca|substantivo
争う|あらそう|disputar, argumentar, lutar|verbo
新た|あらた|novo, fresco, renovado|adjetivo
あらゆる|あらゆる|todos, cada|adjetivo
表す|あらわす|expressar, mostrar|verbo
現す|あらわす|mostrar, aparecer, revelar|verbo
著す|あらわす|escrever, publicar|verbo
現れ|あらわれ|expressão, indicação, sinal|substantivo
現れる|あらわれる|aparecer (v.i.), tornar-se visível; expressar|verbo
ありがとう|ありがとう|Obrigado|saudação
在る; 有る|ある|viver, ser, existir|verbo
或|ある|um certo..., algum...|pronome
あるいは|あるいは|ou, talvez|conector
アルバム|アルバム|álbum|substantivo
泡|あわ|bolha, espuma|substantivo
合わせる|あわせる|combinar, unir|verbo
慌てる|あわてる|confundir-se, entrar em pânico|verbo
哀れ|あわれ|desamparado, pena, patético|adjetivo
案|あん|plano, esquema, proposta|substantivo
案外|あんがい|inesperadamente, surpreendentemente|advérbio
暗記|あんき|memorização, decorar|substantivo
安定|あんてい|estabilidade, equilíbrio|substantivo
あんなに|あんなに|tanto, a esse ponto, a esse grau|advérbio
あんまり|あんまり|não muito, não tanto|advérbio
胃|い|estômago|substantivo
委員|いいん|membro do comitê|substantivo
意外|いがい|inesperado, surpreendente|adjetivo
行き|いき|ida, o ato de ir|substantivo
息|いき|sopro, respiração|substantivo
勢い|いきおい|força, vigor, ímpeto|substantivo
生き物|いきもの|ser vivo, criatura|substantivo
いけない|いけない|não deve, mau, errado|adjetivo
医師|いし|médico, doutor|substantivo
意思|いし|intenção, propósito|substantivo
意志|いし|vontade, volição|substantivo
維持|いじ|manutenção, preservação|substantivo
意識|いしき|consciência, sentidos|substantivo
異常|いじょう|estranheza, anormalidade, desordem|substantivo
意地悪|いじわる|malicioso, mau, desagradável|adjetivo
泉|いずみ|nascente, fonte|substantivo
いずれ|いずれ|onde, qual, quem|pronome
以前|いぜん|no passado; antes|advérbio
板|いた|tábua, prancha|substantivo
偉大|いだい|grandeza|substantivo
抱く|いだく|segurar, abraçar, abrigar|verbo
いたずら|いたずら|travessura, piada|substantivo
いただきます|いただきます|expressão de gratidão antes das refeições|expressão
痛み|いたみ|dor, dor, ferida|substantivo
至る|いたる|vir, chegar|verbo
位置|いち|lugar, posição|substantivo
一時|いちじ|por um tempo, temporariamente|advérbio
一度に|いちどに|de uma vez|advérbio
市場|いちば|mercado, bazar|substantivo
いつか|いつか|algum dia, um dia|advérbio
一家|いっか|família, clã|substantivo
一種|いっしゅ|uma espécie, um tipo, uma variedade|substantivo
一瞬|いっしゅん|um momento, um instante|substantivo
一生|いっしょう|ao longo da vida|substantivo
一層|いっそう|muito mais, ainda mais|advérbio
一体|いったい|um objeto; corpo; o que diabos?; geralmente|substantivo
一致|いっち|acordo; conformidade|substantivo
いつでも|いつでも|a qualquer momento, sempre|advérbio
いつのまにか|いつのまにか|antes que se saiba|advérbio
一般|いっぱん|geral, médio|adjetivo
一方|いっぽう|por outro lado; enquanto isso|conector
いつまでも|いつまでも|para sempre, para o bem, eternamente|advérbio
移動|いどう|migração, movimento|substantivo
従兄弟|いとこ|primo (masculino)|substantivo
従姉妹|いとこ|prima (feminina)|substantivo
稲|いね|planta de arroz|substantivo
居眠り|いねむり|cochilo, adormecer|substantivo
命|いのち|vida|substantivo
違反|いはん|violação (da lei), infração|substantivo
衣服|いふく|roupas|substantivo
居間|いま|sala de estar|substantivo
今に|いまに|em breve, logo|advérbio
今にも|いまにも|a qualquer momento, logo|advérbio
イメージ|イメージ|imagem de alguém|substantivo
否|いや|não, os não|pronome
以来|いらい|desde, a partir de agora|advérbio
依頼|いらい|pedido; dependência|substantivo
いらいら|いらいら|ficando nervoso, irritação|substantivo
いらっしゃい|いらっしゃい|bem-vindo|saudação
医療|いりょう|cuidados médicos, tratamento médico|substantivo
岩|いわ|rocha|substantivo
祝い|いわい|celebração, festival|substantivo
祝う|いわう|parabenizar, celebrar|verbo
言わば|いわば|por assim dizer|expressão
いわゆる|いわゆる|o chamado, por assim dizer|expressão
インク|インク|tinta|substantivo
印刷|いんさつ|impressão|substantivo
印象|いんしょう|impressão|substantivo
引退|いんたい|aposentadoria|substantivo
インタビュー|インタビュー|entrevista|substantivo
引用|いんよう|citação / citação|substantivo
ウイスキー|ウイスキー|uísque|substantivo
うがい|うがい|gargarejo|substantivo
受け取る|うけとる|receber / aceitar|verbo
動かす|うごかす|mover / mudar|verbo
兎|うさぎ|coelho|substantivo
牛|うし|gado / vaca|substantivo
失う|うしなう|perder / privar-se|verbo
疑う|うたがう|duvidar / desconfiar|verbo
宇宙|うちゅう|universo / cosmos / espaço|substantivo
討つ|うつ|atacar / vingar|verbo
撃つ|うつ|atacar / atirar|verbo
うっかり|うっかり|acidentalmente / sem querer|advérbio
映す|うつす|projetar / refletir / lançar (sombra)|verbo
訴える|うったえる|reclamar / apelar / processar (uma pessoa)|verbo
写る|うつる|ser fotografado / ser projetado|verbo
映る|うつる|ser refletido / sair (foto)|verbo
うなる|うなる|gemer / choramingar|verbo
奪う|うばう|roubar / privar|verbo
馬|うま|cavalo / bispo promovido (no xadrez japonês conhecido como shogi)|substantivo
生まれ|うまれ|nascimento / local de nascimento|substantivo
有無|うむ|sim ou não / presença ou ausência|substantivo
梅|うめ|ameixa / menor (de um sistema de classificação de três níveis)|substantivo
埋める|うめる|enterrar / preencher / preencher (um assento, um cargo vago)|verbo
裏切る|うらぎる|trair / virar traidor|verbo
羨ましい|うらやましい|invejoso / invejável|adjetivo
売れる|うれる|ser vendido|verbo
噂|うわさ|rumor / fofoca|substantivo
運|うん|sorte / fortuna|substantivo
柄|え|cabo (de uma espada, adaga, etc.), pega|substantivo
永遠|えいえん|eternidade / perpétuo / imortalidade|substantivo
永久|えいきゅう|eternidade / perpétuo / imortalidade|substantivo
影響|えいきょう|influência / efeito|substantivo
営業|えいぎょう|negócios / comércio / gestão|substantivo
衛星|えいせい|satélite|substantivo
栄養|えいよう|nutrição / sustento|substantivo
笑顔|えがお|sorriso (no rosto)|substantivo
描く|えがく|desenhar / retratar / descrever|verbo
餌|えさ|ração / isca|substantivo
エネルギー|エネルギー|energia (ALE: energie)|substantivo
得る|える|obter / ganhar / vencer / aprender|verbo
円|えん|círculo / iene|substantivo
延期|えんき|adiamento / prorrogação|substantivo
演技|えんぎ|atuação / performance|substantivo
援助|えんじょ|assistência / ajuda / apoio|substantivo
エンジン|エンジン|motor|substantivo
演説|えんぜつ|discurso / alocução|substantivo
演奏|えんそう|performance musical|substantivo
老い|おい|velhice / os idosos|substantivo
追い付く|おいつく|alcançar / alcançar (com)|verbo
王|おう|rei|substantivo
追う|おう|perseguir / correr atrás|verbo
応援|おうえん|ajuda / assistência / ajuda|substantivo
王様|おうさま|rei|substantivo
王子|おうじ|príncipe|substantivo
応じる|おうじる|adaptar / responder / cumprir|verbo
横断|おうだん|travessia|substantivo
終える|おえる|terminar / acabar|verbo
大いに|おおいに|muito / consideravelmente (o mesmo que 大変 (たいへん)), grandemente|advérbio
開始|かいし|início / começo / princípio|substantivo
解釈|かいしゃく|explicação / interpretação|substantivo
外出|がいしゅつ|saída / passear|substantivo
改善|かいぜん|melhora / aprimoramento|substantivo
快適|かいてき|agradável / confortável|adjetivo
回復|かいふく|recuperação / reabilitação|substantivo
飼う|かう|ter (pet) / criar / alimentar|verbo
帰す|かえす|mandar de volta / devolver|verbo
代える|かえる|trocar / substituir|verbo
替える|かえる|trocar / substituir|verbo
換える|かえる|trocar / substituir|verbo
反る|かえる|empenar / curvar|verbo
香り|かおり|aroma / fragrância|substantivo
画家|がか|pintor|substantivo
抱える|かかえる|segurar (nos braços)|verbo
価格|かかく|preço / valor|substantivo
化学|かがく|química|substantivo
輝く|かがやく|brilhar / cintilar|verbo
係|かかり|responsável|substantivo
罹る|かかる|sofrer de|verbo
限る|かぎる|restringir / limitar|verbo
掻く|かく|coçar|verbo
嗅ぐ|かぐ|cheirar / farejar|verbo
家具|かぐ|móveis|substantivo
学|がく|aprendizado / conhecimento|substantivo
額|がく|montante / moldura|substantivo
覚悟|かくご|resolução / prontidão|substantivo
確実|かくじつ|certeza / confiabilidade|substantivo
学者|がくしゃ|erudito|substantivo
学習|がくしゅう|estudo / aprendizado|substantivo
隠す|かくす|esconder / ocultar|verbo
拡大|かくだい|ampliação / aumento|substantivo
確認|かくにん|confirmação / verificação|substantivo
学問|がくもん|erudição / estudo|substantivo
隠れる|かくれる|esconder-se / estar escondido|verbo
影|かげ|sombra / outro lado|substantivo
陰|かげ|sombra / outro lado|substantivo
欠ける|かける|faltar / carecer|verbo
加減|かげん|ajuste / condição|substantivo
過去|かこ|passado|substantivo
籠|かご|cesta / gaiola|substantivo
囲む|かこむ|cercar / rodear|verbo
火災|かさい|incêndio / fogo|substantivo
重なる|かさなる|empilhar / sobrepor|verbo
重ねる|かさねる|empilhar / sobrepor|verbo
飾り|かざり|decoração / ornamento|substantivo
貸し|かし|empréstimo / aluguel|substantivo
菓子|かし|doce / bala|substantivo
家事|かじ|doméstico / afazeres domésticos|substantivo
賢い|かしこい|sábio / esperto|adjetivo
歌手|かしゅ|cantor|substantivo
稼ぐ|かせぐ|ganhar (dinheiro) / trabalhar|verbo
数える|かぞえる|contar|verbo
型|かた|molde / modelo / estilo|substantivo
肩|かた|ombro|substantivo
堅い|かたい|duro / firme|adjetivo
硬い|かたい|duro / firme|adjetivo
方々|かたがた|pessoas|pronome
片付く|かたづく|arrumar / resolver|verbo
刀|かたな|espada / sabre|substantivo
覆う|おおう|cobrir / esconder / ocultar|verbo
大家|おおや|proprietário / senhorio|substantivo
丘|おか|colina / elevação|substantivo
沖|おき|mar aberto / alto mar|substantivo
奥|おく|interior / parte interna|substantivo
贈る|おくる|presentear / dar para / premiar|verbo
起こる|おこる|ocorrer / acontecer|verbo
押える|おさえる|parar / conter / pressionar para baixo|verbo
幼い|おさない|muito jovem / infantil|adjetivo
収める|おさめる|armazenar / pagar / fornecer|verbo
納める|おさめる|armazenar / pagar / fornecer|verbo
治める|おさめる|governar / gerenciar / subjugar|verbo
お辞儀|おじぎ|curva / inclinação|substantivo
お洒落|おしゃれ|elegantemente vestido / antenado com a moda|adjetivo
お喋り|おしゃべり|tagarelice / conversa|substantivo
汚染|おせん|poluição / contaminação|substantivo
恐らく|おそらく|talvez / possivelmente|advérbio
恐れる|おそれる|temer / ter medo de|verbo
恐ろしい|おそろしい|terrível / medonho|adjetivo
教わる|おそわる|ser ensinado|verbo
お互い|おたがい|mutuamente / recíproco / um ao outro|pronome
穏やか|おだやか|calmo / gentil / quieto|adjetivo
男の人|おとこのひと|homem|substantivo
大人しい|おとなしい|obediente / dócil / quieto|adjetivo
劣る|おとる|ficar para trás / ser inferior a|verbo
鬼|おに|ogro / demônio / 'pegador' (em um jogo de pega-pega)|substantivo
帯|おび|faixa / cinto|substantivo
お昼|おひる|almoço / meio-dia|substantivo
オフィス|オフィス|escritório|substantivo
溺れる|おぼれる|afogar-se / entregar-se a|verbo
お前|おまえ|você / sua presença (de uma pessoa importante)|pronome
おめでとう|おめでとう|Parabéns! / uma ocasião auspiciosa!|saudação
お目に掛かる|おめにかかる|encontrar ~ / ver ~|expressão
思い付く|おもいつく|pensar em / ter uma ideia|verbo
思い出|おもいで|memórias / recordações / lembrança|substantivo
主に|おもに|principalmente / primariamente|advérbio
思わず|おもわず|involuntário / espontâneo|adjetivo
泳ぎ|およぎ|natação|substantivo
およそ|およそ|cerca de / mais ou menos / aproximadamente|advérbio
及ぼす|およぼす|exercer / causar / empregar|verbo
下す|おろす|abaixar / soltar para baixo|verbo
降ろす|おろす|tirar para baixo / lançar / soltar|verbo
卸す|おろす|vender por atacado / ralado (legumes)|verbo
恩|おん|favor / obrigação / dívida de gratidão|substantivo
温暖|おんだん|calor / aquecimento|substantivo
温度|おんど|temperatura|substantivo
可|か|passável / aceitável|adjetivo
蚊|か|mosquito|substantivo
課|か|departamento / divisão|substantivo
カー|カー|carro|substantivo
カード|カード|cartão / coalhada|substantivo
貝|かい|concha / marisco|substantivo
害|がい|prejuízo / dano|substantivo
会員|かいいん|membro / a associação|substantivo
絵画|かいが|pintura / quadro|substantivo
海外|かいがい|estrangeiro / no exterior / transoceânico|adjetivo
会計|かいけい|conta / finanças|substantivo
解決|かいけつ|solução / resolução|substantivo
会合|かいごう|reunião / assembleia|substantivo
外交|がいこう|diplomacia|substantivo
語る|かたる|falar / contar / recitar|verbo
勝ち|かち|vitória / vencer|substantivo
価値|かち|valor / mérito|substantivo
がっかり|がっかり|decepcionado / desanimado|adjetivo
活気|かっき|vigor / vivacidade|substantivo
楽器|がっき|instrumento musical|substantivo
学期|がっき|período escolar|substantivo
活動|かつどう|ação / atividade|substantivo
活躍|かつやく|atividade / sucesso|substantivo
活用|かつよう|uso prático / conjugação|substantivo
仮定|かてい|suposição / hipótese|substantivo
過程|かてい|processo|substantivo
課程|かてい|currículo / curso|substantivo
悲しむ|かなしむ|triste / lamentar|verbo
必ずしも|かならずしも|necessariamente|advérbio
かなり|かなり|consideravelmente / bastante|advérbio
金|かね|ouro / dinheiro|substantivo
鐘|かね|sino|substantivo
可能|かのう|possível|adjetivo
株|かぶ|ação / toco|substantivo
被る|かぶる|usar / cobrir|verbo
我慢|がまん|paciência / perseverança|substantivo
神|かみ|deus|substantivo
雷|かみなり|trovão|substantivo
髪の毛|かみのけ|cabelo|substantivo
科目|かもく|disciplina escolar|substantivo
かもしれない|かもしれない|talvez|expressão
かゆい|かゆい|coceira|adjetivo
歌謡|かよう|canção / balada|substantivo
殻|から|casca / concha|substantivo
刈る|かる|cortar / ceifar|verbo
河|かわ|rio|substantivo
皮|かわ|pele / couro|substantivo
革|かわ|couro|substantivo
可愛そう|かわいそう|pobre / coitado|adjetivo
可愛らしい|かわいらしい|adorável / meigo|adjetivo
乾かす|かわかす|secar|verbo
渇く|かわく|ter sede / secar|verbo
代る|かわる|substituir / tomar o lugar de|verbo
缶|かん|lata|substantivo
勘|かん|intuição / percepção|substantivo
考え|かんがえ|pensamento / ideia|substantivo
感覚|かんかく|sensação / sentido|substantivo
間隔|かんかく|intervalo / espaço|substantivo
観客|かんきゃく|público / espectador|substantivo
環境|かんきょう|ambiente / circunstância|substantivo
歓迎|かんげい|boas-vindas / recepção|substantivo
観光|かんこう|turismo / passeios|substantivo
観察|かんさつ|observação / exame|substantivo
感じ|かんじ|sentimento / impressão|substantivo
感謝|かんしゃ|gratidão / agradecimento|substantivo
患者|かんじゃ|paciente|substantivo
勘定|かんじょう|cálculo / contagem|substantivo
感情|かんじょう|emoção / sentimento|substantivo
感じる|かんじる|sentir / perceber|verbo
感心|かんしん|admiração|substantivo
関心|かんしん|interesse / preocupação|substantivo
関する|かんする|concernir / relacionar-se|verbo
完成|かんせい|completo / conclusão|substantivo
完全|かんぜん|perfeição / completude|substantivo
乾燥|かんそう|seco / árido / desidratado|adjetivo
感想|かんそう|impressões / pensamentos|substantivo
感動|かんどう|estar profundamente comovido / excitação|substantivo
監督|かんとく|supervisão / controle / diretor(a)|substantivo
管理|かんり|controle / gestão|substantivo
完了|かんりょう|conclusão / fim|substantivo
関連|かんれん|relação / conexão / relevância|substantivo
議員|ぎいん|membro do parlamento|substantivo
記憶|きおく|memória / recordação|substantivo
気温|きおん|temperatura (do tempo)|substantivo
機械|きかい|máquina / maquinário|substantivo
器械|きかい|instrumento|substantivo
議会|ぎかい|parlamento|substantivo
期間|きかん|período / prazo|substantivo
機関|きかん|motor / instituição|substantivo
企業|きぎょう|indústria / negócio|substantivo
効く|きく|ser eficaz|verbo
期限|きげん|prazo / limite|substantivo
機嫌|きげん|humor / temperamento / ânimo|substantivo
気候|きこう|clima|substantivo
岸|きし|margem / costa / praia|substantivo
生地|きじ|tecido / massa crua|substantivo
記事|きじ|artigo / notícia|substantivo
技師|ぎし|engenheiro(a) / técnico(a)|substantivo
記者|きしゃ|repórter|substantivo
傷|きず|ferida / lesão / mágoa|substantivo
期待|きたい|expectativa / antecipação / esperança|substantivo
気体|きたい|vapor / gás|substantivo
帰宅|きたく|retornar para casa|substantivo
貴重|きちょう|precioso / valioso|adjetivo
議長|ぎちょう|presidente / presidente da mesa|substantivo
きちんと|きちんと|precisamente / exatamente|advérbio
きつい|きつい|apertado / intenso|adjetivo
気付く|きづく|perceber / reconhecer / dar-se conta|verbo
気に入る|きにいる|gostar / ficar satisfeito|verbo
記入|きにゅう|entrada / preenchimento de formulário|substantivo
記念|きねん|comemoração / memória|substantivo
機能|きのう|função / capacidade|substantivo
気の毒|きのどく|pena / lamentável|adjetivo
寄付|きふ|contribuição / doação|substantivo
希望|きぼう|esperança / desejo / aspiração|substantivo
基本|きほん|básico / base|substantivo
決まり|きまり|resolução / conclusão / regra|substantivo
気味|きみ|tendência / aparência de|expressão
奇妙|きみょう|estranho / bizarro / curioso|adjetivo
義務|ぎむ|dever / obrigação / responsabilidade|substantivo
疑問|ぎもん|questão / problema / dúvida|substantivo
逆|ぎゃく|reverso / oposto|substantivo
キャプテン|キャプテン|capitão|substantivo
キャンプ|キャンプ|acampamento|substantivo
旧|きゅう|ex-|expressão
級|きゅう|classe / série / patente|substantivo
球|きゅう|globo / esfera / bola|substantivo
休暇|きゅうか|férias / feriado / dia de folga|substantivo
休憩|きゅうけい|descanso / pausa / intervalo|substantivo
急激|きゅうげき|repentino / precipitado / radical|adjetivo
吸収|きゅうしゅう|absorção / sucção|substantivo
救助|きゅうじょ|alívio / ajuda / resgate|substantivo
急速|きゅうそく|rápido (ex: progresso)|adjetivo
休息|きゅうそく|descanso / alívio / relaxamento|substantivo
急に|きゅうに|súbito|advérbio
給料|きゅうりょう|salário / vencimentos|substantivo
器用|きよう|habilidoso / jeitoso|adjetivo
教科書|きょうかしょ|livro didático|substantivo
競技|きょうぎ|jogo / partida / competição|substantivo
行儀|ぎょうぎ|maneiras / comportamento|substantivo
供給|きょうきゅう|suprimento / provisão|substantivo
教授|きょうじゅ|ensino / professor|substantivo
強調|きょうちょう|ênfase / destaque|substantivo
共通|きょうつう|comum / mútuo|substantivo
共同|きょうどう|cooperação / colaboração|substantivo
恐怖|きょうふ|medo / terror|substantivo
協力|きょうりょく|cooperação / colaboração|substantivo
強力|きょうりょく|poderoso / forte|adjetivo
許可|きょか|permissão / aprovação|substantivo
局|きょく|escritório / estação (TV, rádio)|substantivo
巨大|きょだい|enorme / gigantesco|adjetivo
嫌う|きらう|odiar / detestar|verbo
霧|きり|neblina / nevoeiro|substantivo
切れ|きれ|pano / pedaço / corte|substantivo
切れる|きれる|cortar bem / ser afiado; quebrar|verbo
記録|きろく|registro / ata|substantivo
議論|ぎろん|argumento / discussão|substantivo
銀|ぎん|prata|substantivo
禁煙|きんえん|Proibido fumar|expressão
金額|きんがく|valor / quantia|substantivo
金庫|きんこ|cofre / caixa forte|substantivo
禁止|きんし|proibição / veto|substantivo
金銭|きんせん|dinheiro / numerário|substantivo
金属|きんぞく|metal|substantivo
近代|きんだい|tempos modernos|substantivo
緊張|きんちょう|tensão / nervosismo|substantivo
筋肉|きんにく|músculo|substantivo
金融|きんゆう|finanças / mercado financeiro|substantivo
句|く|frase|substantivo
食う|くう|comer (vulgar)|verbo
偶然|ぐうぜん|acaso / por sorte|advérbio
臭い|くさい|fedorento / cheiro ruim|adjetivo
鎖|くさり|corrente|substantivo
腐る|くさる|apodrecer / estragar|verbo
癖|くせ|hábito (mau) / peculiaridade|substantivo
管|くだ|tubo / cano|substantivo
具体|ぐたい|concreto / tangível|adjetivo
下り|くだり|trem de descida|substantivo
苦痛|くつう|dor / agonia|substantivo
ぐっすり|ぐっすり|profundamente adormecido|advérbio
区別|くべつ|distinção / diferenciação|substantivo
組|くみ|turma / equipe / conjunto|substantivo
組合|くみあい|associação / sindicato|substantivo
組む|くむ|montar / juntar|verbo
汲む|くむ|tirar / pegar (água, etc.)|verbo
酌む|くむ|servir saquê|verbo
悔しい|くやしい|lamentável / frustrante|adjetivo
位|くらい|nível / posto / cerca de|substantivo
暮らし|くらし|vida / modo de vida|substantivo
クラシック|クラシック|clássico(s)|substantivo
暮らす|くらす|viver / arranjar-se|verbo
グラス|グラス|copo / grama|substantivo
グランド|グランド|glândula / grandioso / terra (elétrica)|substantivo
クリーム|クリーム|creme|substantivo
繰り返す|くりかえす|repetir / fazer de novo|verbo
クリスマス|クリスマス|Natal|substantivo
狂う|くるう|enlouquecer / sair de ordem|verbo
グループ|グループ|grupo|substantivo
苦しい|くるしい|difícil / extenuante|adjetivo
苦しむ|くるしむ|sofrer / gemer / preocupar-se|verbo
暮れ|くれ|fim de ano|substantivo
苦労|くろう|dificuldade / sofrimento|substantivo
加える|くわえる|acrescentar / somar / adicionar|verbo
咥える|くわえる|segurar na boca|verbo
詳しい|くわしい|detalhado / completo / preciso|adjetivo
加わる|くわわる|juntar-se / aderir|verbo
訓|くん|leitura japonesa de caractere chinês|substantivo
軍|ぐん|exército / força / tropas|substantivo
郡|ぐん|condado / distrito|substantivo
軍隊|ぐんたい|exército / tropas|substantivo
訓練|くんれん|prática / treino|substantivo
計|けい|plano / soma / total|substantivo
敬意|けいい|respeito / honra|substantivo
経営|けいえい|gerenciamento / administração|substantivo
景気|けいき|condição / estado / negócio|substantivo
傾向|けいこう|tendência / inclinação|substantivo
警告|けいこく|advertência|substantivo
計算|けいさん|cálculo / conta|substantivo
掲示|けいじ|aviso / boletim|substantivo
刑事|けいじ|caso criminal / detetive|substantivo
芸術|げいじゅつ|arte / belas artes|substantivo
契約|けいやく|contrato / acordo|substantivo
経由|けいゆ|via / passando por|conector
ケース|ケース|caso|substantivo
ゲーム|ゲーム|jogo|substantivo
劇|げき|drama / peça|substantivo
劇場|げきじょう|teatro|substantivo
化粧|けしょう|maquiagem|substantivo
けち|けち|avareza / pão-duro|substantivo
血液|けつえき|sangue|substantivo
結果|けっか|resultado / consequência|substantivo
欠陥|けっかん|defeito / falha|substantivo
結局|けっきょく|afinal / eventualmente|advérbio
決心|けっしん|determinação / resolução|substantivo
欠席|けっせき|ausência / falta de comparência|substantivo
決定|けってい|decisão / determinação|substantivo
欠点|けってん|falta / defeito / fraqueza|substantivo
結論|けつろん|conclusão|substantivo
煙|けむり|fumaça / vapor|substantivo
蹴る|ける|chutar|verbo
券|けん|bilhete / certificado|substantivo
県|けん|prefeitura|substantivo
見解|けんかい|opinião / ponto de vista|substantivo
限界|げんかい|limite / fronteira|substantivo
現金|げんきん|dinheiro / espécie|substantivo
言語|げんご|linguagem|substantivo
健康|けんこう|saúde / saudável|substantivo
検査|けんさ|inspeção / exame|substantivo
現在|げんざい|agora / presente / atual|advérbio
現実|げんじつ|realidade|substantivo
現象|げんしょう|fenômeno|substantivo
現状|げんじょう|condição presente / status quo|substantivo
建設|けんせつ|construção / fundação|substantivo
現代|げんだい|hoje / dias atuais|substantivo
建築|けんちく|construção / arquitetura|substantivo
見当|けんとう|estimativa / palpite|substantivo
検討|けんとう|consideração / exame / investigação|substantivo
現場|げんば|local / cena / campo|substantivo
憲法|けんぽう|constituição|substantivo
権利|けんり|direito / privilégio|substantivo
碁|ご|Go (jogo de tabuleiro)|substantivo
恋|こい|amor / paixão terna|substantivo
濃い|こい|forte / denso / espesso|adjetivo
恋人|こいびと|amante / namorado(a)|substantivo
幸運|こううん|boa sorte / fortuna|substantivo
講演|こうえん|palestra / discurso|substantivo
効果|こうか|efeito / resultado|substantivo
硬貨|こうか|moeda|substantivo
高価|こうか|preço alto|substantivo
豪華|ごうか|luxuoso / deslumbrante / extravagante|adjetivo
合格|ごうかく|sucesso / aprovação|substantivo
交換|こうかん|troca / permuta|substantivo
航空|こうくう|aviação / voo|substantivo
光景|こうけい|cena / espetáculo|substantivo
合計|ごうけい|soma total / montante total|substantivo
攻撃|こうげき|ataque / golpe / ofensiva|substantivo
貢献|こうけん|contribuição / serviços|substantivo
広告|こうこく|anúncio / publicidade|substantivo
交際|こうさい|amizade / associação / conhecimento|substantivo
校舎|こうしゃ|edifício escolar|substantivo
後者|こうしゃ|o último / o segundo|pronome
公正|こうせい|justiça / imparcialidade|substantivo
構成|こうせい|organização / composição|substantivo
高速|こうそく|alta velocidade / marcha alta|substantivo
行動|こうどう|ação / conduta / comportamento|substantivo
強盗|ごうとう|roubo / assalto|substantivo
後輩|こうはい|membros juniores de um grupo|substantivo
幸福|こうふく|felicidade / bem-aventurança|substantivo
公平|こうへい|justiça / imparcialidade|substantivo
候補|こうほ|candidatura|substantivo
考慮|こうりょ|consideração / levando em conta|substantivo
越える|こえる|exceder / cruzar / atravessar|verbo
超える|こえる|exceder / cruzar / atravessar|verbo
コーチ|コーチ|treinador|substantivo
コード|コード|código / cabo / acorde|substantivo
氷|こおり|gelo / granizo|substantivo
凍る|こおる|congelar / estar congelado / solidificar|verbo
ゴール|ゴール|gol|substantivo
誤解|ごかい|mal-entendido|substantivo
語学|ごがく|estudo de línguas|substantivo
呼吸|こきゅう|respiração / respiração|substantivo
故郷|こきょう|terra natal / cidade natal|substantivo
極|ごく|muito / bastante|advérbio
国語|こくご|língua nacional|substantivo
国籍|こくせき|nacionalidade|substantivo
黒板|こくばん|quadro negro|substantivo
克服|こくふく|conquista / superar|substantivo
国民|こくみん|nacional / povo / cidadão|substantivo
穀物|こくもつ|grão / cereal / milho|substantivo
腰|こし|quadril / cintura|substantivo
胡椒|こしょう|pimenta|substantivo
個人|こじん|indivíduo / pessoa particular|substantivo
越す|こす|passar por / exceder|verbo
超す|こす|cruzar / passar / superar|verbo
国家|こっか|estado, país, nação|substantivo
国会|こっかい|Dieta Nacional, parlamento, congresso|substantivo
国境|こっきょう|fronteira nacional ou estadual|substantivo
骨折|こっせつ|fratura óssea|substantivo
小包|こづつみ|pacote, encomenda|substantivo
琴|こと|harpa japonesa|substantivo
異なる|ことなる|diferir, variar|verbo
諺|ことわざ|provérbio, ditado|substantivo
断る|ことわる|recusar, declinar, dispensar|verbo
粉|こな|farinha, pó|substantivo
好み|このみ|gosto, predileção, escolha|substantivo
好む|このむ|gostar, preferir|verbo
こぼす|こぼす|derramar, derramar|verbo
こぼれる|こぼれる|transbordar, derramar|verbo
塵|ごみ|lixo, detrito|substantivo
小麦|こむぎ|trigo|substantivo
ごめんなさい|ごめんなさい|com licença, desculpe-me, sinto muito|saudação
小屋|こや|cabana, barraco, galpão|substantivo
これら|これら|estes|pronome
殺す|ころす|matar|verbo
転ぶ|ころぶ|cair, tombar|verbo
今回|こんかい|agora, desta vez, recentemente|advérbio
今後|こんご|de agora em diante, doravante|advérbio
混雑|こんざつ|confusão, congestionamento|substantivo
こんなに|こんなに|tão, assim, desta maneira|advérbio
困難|こんなん|dificuldade, aflição|substantivo
こんにちは|こんにちは|olá, bom dia|saudação
婚約|こんやく|noivado, compromisso|substantivo
混乱|こんらん|caos, confusão, desordem|substantivo
差|さ|diferença, variação|substantivo
サービス|サービス|serviço, sistema de suporte; bens ou serviços gratuitos|substantivo
際|さい|na ocasião de, circunstâncias|substantivo
最高|さいこう|mais alto, supremo, o máximo|adjetivo
財産|ざいさん|propriedade, fortuna, bens|substantivo
最終|さいしゅう|último, final|adjetivo
最中|さいちゅう|no meio de|expressão
最低|さいてい|mínimo, mais baixo, pior|adjetivo
才能|さいのう|talento, habilidade|substantivo
裁判|さいばん|julgamento, decisão|substantivo
材料|ざいりょう|ingredientes, material|substantivo
幸い|さいわい|felizmente; sorte|advérbio
サイン|サイン|autógrafo; placa; seno|substantivo
境|さかい|fronteira, limite, estado mental|substantivo
逆らう|さからう|ir contra, opor-se, desobedecer|verbo
盛り|さかり|porção, serviço (de comida)|substantivo
作業|さぎょう|trabalho, operação, fabricação|substantivo
裂く|さく|rasgar, dividir|verbo
昨|さく|último (ano), ontem|adjetivo
作品|さくひん|obra, opus, produção|substantivo
作物|さくもつ|produtos (ex: agrícolas), colheitas|substantivo
桜|さくら|flor de cerejeira, cerejeira|substantivo
酒|さけ|álcool, saquê|substantivo
叫ぶ|さけぶ|gritar, clamar|verbo
避ける|さける|evitar (contato físico); afastar, evitar|verbo
支える|ささえる|apoiar, segurar, sustentar|verbo
刺さる|ささる|espetar, ficar preso|verbo
刺す|さす|picada, mordida (ex: inseto), picar, esfaquear|verbo
指す|さす|apontar,|verbo
挿す|さす|inserir, colocar, enxertar|verbo
注す|さす|derramar (bebida), servir (bebidas)|verbo
射す|さす|brilhar, atingir|verbo
座席|ざせき|assento|substantivo
誘う|さそう|convidar, seduzir|verbo
札|さつ|nota, conta|substantivo
作家|さっか|autor, escritor|substantivo
作曲|さっきょく|composição|substantivo
ざっと|ざっと|aproximadamente|advérbio
さっぱり|さっぱり|sentindo-se renovado, limpo|adjetivo
さて|さて|bem, agora|expressão
砂漠|さばく|deserto|substantivo
差別|さべつ|discriminação, diferenciação|substantivo
ママ|ママ|Mamãe|substantivo
豆|まめ|feijão, ervilha|substantivo
守る|まもる|proteger, cumprir|verbo
迷う|まよう|estar confuso, perder-se|verbo
丸|まる|círculo, cheio|substantivo
まるで|まるで|exatamente como|advérbio
万一|まんいち|por acaso|advérbio
満足|まんぞく|satisfação|substantivo
身|み|corpo, parte principal|substantivo
実|み|fruto, resultado|substantivo
見送り|みおくり|despedida|substantivo
味方|みかた|aliado, apoiador|substantivo
見事|みごと|esplêndido, magnífico|adjetivo
ミス|ミス|erro, Srta.|substantivo
満ちる|みちる|estar cheio, amadurecer|verbo
密|みつ|denso, próximo|adjetivo
認める|みとめる|reconhecer, aprovar|verbo
見舞い|みまい|visita de condolências/preocupação|substantivo
土産|みやげ|souvenir, lembrança|substantivo
妙|みょう|estranho, incomum|adjetivo
未来|みらい|futuro|substantivo
魅力|みりょく|charme, fascínio|substantivo
診る|みる|examinar (um paciente)|verbo
ミルク|ミルク|leite|substantivo
無|む|nada, zero|substantivo
向かい|むかい|de frente, oposto|adjetivo
迎え|むかえ|encontro, quem busca|substantivo
向く|むく|ficar de frente|verbo
剥く|むく|descascar, tirar a pele|verbo
向ける|むける|virar para, apontar|verbo
無視|むし|desconsiderar, ignorar|verbo
蒸し暑い|むしあつい|úmido, abafado|adjetivo
虫歯|むしば|cárie, dente podre|substantivo
寧ろ|むしろ|antes, melhor|advérbio
蒸す|むす|cozinhar no vapor, estar abafado|verbo
結ぶ|むすぶ|amarrar, ligar|verbo
無駄|むだ|futilidade, inutilidade|substantivo
夢中|むちゅう|viciado, obcecado|adjetivo
胸|むね|seio, peito|substantivo
無料|むりょう|grátis, sem custo|adjetivo
芽|め|broto|substantivo
明確|めいかく|claro, definitivo|adjetivo
名刺|めいし|cartão de visita|substantivo
名詞|めいし|substantivo|substantivo
命じる|めいじる|ordenar, nomear|verbo
名人|めいじん|mestre, perito|substantivo
命令|めいれい|ordem, comando|substantivo
迷惑|めいわく|problema, incômodo|substantivo
目上|めうえ|superior, sênior|substantivo
礼儀|れいぎ|maneiras, cortesia, etiqueta|substantivo
冷静|れいせい|calmo, frieza|substantivo
列|れつ|fila, linha, fileira|substantivo
列車|れっしゃ|trem (normal)|substantivo
レベル|レベル|nível|substantivo
連想|れんそう|associação (de ideias), sugestão|substantivo
連続|れんぞく|consecutivo, continuidade, contínuo|substantivo
老人|ろうじん|idoso, pessoa idosa|substantivo
労働|ろうどう|trabalho, mão de obra|substantivo
ロケット|ロケット|pingente, foguete|substantivo
論じる|ろんじる|argumentar, discutir|verbo
論争|ろんそう|controvérsia, disputa|substantivo
論文|ろんぶん|tese, artigo|substantivo
輪|わ|anel, aro, círculo|substantivo
ワイン|ワイン|vinho|substantivo
わがまま|わがまま|egoísmo, teimosia|substantivo
別れ|わかれ|despedida, separação, adeus|substantivo
分かれる|わかれる|ramificar, divergir de|verbo
脇|わき|lado|substantivo
湧く|わく|ferver, aquecer|verbo
分ける|わける|dividir, separar|verbo
わざと|わざと|de propósito|advérbio
僅か|わずか|apenas, meramente, um pouco|adjetivo
話題|わだい|tópico, assunto|substantivo
笑い|わらい|riso, gargalhada, sorriso|substantivo
割る|わる|dividir, quebrar|verbo
悪口|わるくち|abuso, insulto|substantivo
我々|われわれ|nós|pronome
湾|わん|baía, golfo, enseada|substantivo
椀|わん|tigela|substantivo
碗|わん|tigela|substantivo
悪|あく|mal, maldade|substantivo
当り|あたり|acerto, sucesso, atingir o alvo|substantivo
アップ|アップ|para cima|advérbio
宛てる|あてる|endereçar, colocar|verbo
アンケート|アンケート|questionário, pesquisa|substantivo
異|い|diferença (de opinião)|substantivo
意|い|vontade|substantivo
医院|いいん|consultório médico, clínica|substantivo
怒り|いかり|raiva|substantivo
粋|いき|chique, estilo, pureza|substantivo
意地|いじ|disposição, espírito, teimosia, apetite|substantivo
依然|いぜん|ainda, até agora|advérbio
傷める|いためる|danificar, prejudicar, estragar|verbo
炒める|いためる|refogar|verbo
一帯|いったい|uma região, todo o lugar|substantivo
異動|いどう|mudança, transferência|substantivo
衣料|いりょう|roupas, vestuário|substantivo
渦|うず|redemoinho|substantivo
埋まる|うまる|ser enterrado, ser preenchido|verbo
産む|うむ|dar à luz (v.t.), parir, produzir|verbo
縁|えん|acaso, laço, relacionamento|substantivo
尾|お|cauda, crista|substantivo
負う|おう|carregar, dever|verbo
遅れ|おくれ|atraso, demora|substantivo
教え|おしえ|ensinamentos, doutrina|substantivo
驚き|おどろき|surpresa, espanto, maravilha|substantivo
織る|おる|tecer|verbo
欠く|かく|faltar, rachar|verbo
核|かく|núcleo, caroço|substantivo
格|かく|status, caráter, caso|substantivo
学歴|がくれき|histórico acadêmico|substantivo
駆ける|かける|correr|verbo
賭ける|かける|apostar, arriscar, jogar|verbo
課題|かだい|assunto, tema, tarefa|substantivo
片付け|かたづけ|arrumar, terminar|substantivo
加味|かみ|tempero, aromatizante|substantivo
借り|かり|empréstimo, dívida, débito|substantivo
狩り|かり|caça|substantivo
～観|かん|sentimento, visão|expressão
癌|がん|câncer|substantivo
刊行|かんこう|publicação, edição|substantivo
慣行|かんこう|prática costumeira, hábito, evento tradicional|substantivo
歓声|かんせい|grito de alegria, grito|substantivo
官僚|かんりょう|burocrata, burocracia|substantivo
器官|きかん|órgão (do corpo, instrumento)|substantivo
季刊|きかん|trimestral (ex: revista)|substantivo
起源|きげん|origem, começo, ascensão|substantivo
機構|きこう|mecanismo, organização|substantivo
築く|きずく|construir, estabelecer|verbo
規制|きせい|regulamento|substantivo
丘陵|きゅうりょう|colina|substantivo
協議|きょうぎ|conferência, discussão, negociação|substantivo
享受|きょうじゅ|aproveitamento, recebimento|substantivo
協調|きょうちょう|cooperação, conciliação, harmonia|substantivo
切り|きり|limites, lugar para parar|substantivo
菌|きん|germe, bactéria|substantivo
近視|きんし|miopia|substantivo
苦|く|problema, preocupação, dificuldade|substantivo
群|ぐん|grupo|substantivo
刑|けい|pena, sentença, punição|substantivo
経緯|けいい|sequência de eventos, curso|substantivo
計器|けいき|medidor, calibre|substantivo
契機|けいき|oportunidade, chance|substantivo
携帯|けいたい|carregar algo; telefone celular|substantivo
形態|けいたい|forma, formato, figura|substantivo
血管|けっかん|vaso sanguíneo|substantivo
決行|けっこう|realização (com resolução), execução (ex: de um plano)|verbo
件|けん|assunto, caso, item|substantivo
減少|げんしょう|diminuição, redução, declínio|substantivo
公演|こうえん|apresentação pública, show|substantivo
後悔|こうかい|arrependimento, remorso|substantivo
航海|こうかい|navegar, viagem|substantivo
拘束|こうそく|restrição, contenção|substantivo
荒廃|こうはい|ruína|substantivo
降伏|こうふく|capitulação, rendição, submissão|substantivo
興奮|こうふん|excitação, estimulação|substantivo
語句|ごく|palavras, frases|substantivo
個々|ここ|individual, um a um|advérbio
故人|こじん|o falecido|substantivo
小銭|こぜに|moedas, troco|substantivo
ことによると|ことによると|dependendo das circunstâncias|expressão
コンテスト|コンテスト|concurso|substantivo
採集|さいしゅう|coleta, recolha|substantivo
作|さく|uma obra, uma colheita|substantivo
策|さく|plano, política|substantivo
設備|せつび|equipamento, dispositivo, instalações|substantivo
絶滅|ぜつめつ|destruição, extinção|substantivo
節約|せつやく|economizar, poupar|substantivo
攻める|せめる|atacar, assaltar|verbo
責める|せめる|condenar / culpar / criticar|verbo
善|ぜん|bom / virtude|substantivo
全|ぜん|todo / inteiro|adjetivo
全員|ぜんいん|todos os membros|substantivo
専攻|せんこう|curso / especialidade|substantivo
全国|ぜんこく|toda a nação / nacional|substantivo
洗剤|せんざい|detergente|substantivo
先日|せんじつ|outro dia / há poucos dias|advérbio
前者|ぜんしゃ|o primeiro / o anterior|pronome
選手|せんしゅ|jogador / atleta|substantivo
全身|ぜんしん|corpo inteiro / retrato de corpo inteiro|substantivo
前進|ぜんしん|avanço / progresso|substantivo
センター|センター|centro|substantivo
全体|ぜんたい|todo / totalidade|substantivo
選択|せんたく|seleção / escolha|substantivo
宣伝|せんでん|publicidade / propaganda|substantivo
象|ぞう|elefante|substantivo
騒音|そうおん|barulho / ruído|substantivo
増加|ぞうか|aumento / adição|substantivo
操作|そうさ|operação / gestão|substantivo
想像|そうぞう|imaginação / suposição|substantivo
相続|そうぞく|sucessão / herança|substantivo
装置|そうち|equipamento / instalação|substantivo
相当|そうとう|consideravelmente / bastante / valendo ~|advérbio
速度|そくど|velocidade / ritmo|substantivo
底|そこ|fundo / sola|substantivo
そこで|そこで|então / portanto|conector
組織|そしき|organização / estrutura|substantivo
そして|そして|e então / e assim|conector
注ぐ|そそぐ|derramar / verter|verbo
育つ|そだつ|ser criado / crescer|verbo
そっくり|そっくり|exatamente igual / idêntico|adjetivo
そっと|そっと|suavemente / gentilmente|advérbio
袖|そで|manga (de roupa)|substantivo
備える|そなえる|preparar / fornecer|verbo
具える|そなえる|ser equipado com|verbo
そのうえ|そのうえ|além disso / além do mais|conector
そのうち|そのうち|em breve / eventualmente|advérbio
そのまま|そのまま|como está / sem mudar|advérbio
蕎麦|そば|soba (macarrão de trigo sarraceno)|substantivo
ソファー|ソファー|sofá / divã|substantivo
粗末|そまつ|humilde / grosseiro|adjetivo
それぞれ|それぞれ|cada / respectivamente|advérbio
それでも|それでも|mesmo assim / contudo|conector
それと|それと|e / também|conector
それとも|それとも|ou / ou então|conector
揃う|そろう|estar completo / ser igual|verbo
揃える|そろえる|colocar em ordem / arrumar|verbo
損|そん|perda / desvantagem|substantivo
損害|そんがい|dano / prejuízo|substantivo
尊敬|そんけい|respeito / reverência|substantivo
存在|そんざい|existência / ser|substantivo
尊重|そんちょう|respeito / consideração|substantivo
田|た|campo de arroz|substantivo
他|た|outro|pronome
対|たい|par / casal|substantivo
大|だい|grande / maior|adjetivo
題|だい|título / tema|substantivo
体育|たいいく|educação física / ginástica|substantivo
体温|たいおん|temperatura corporal|substantivo
大会|たいかい|convenção, torneio, reunião em massa|substantivo
大気|たいき|atmosfera|substantivo
代金|だいきん|preço, custo|substantivo
退屈|たいくつ|tédio, chato|adjetivo
滞在|たいざい|estadia, permanência|substantivo
大使|たいし|embaixador|substantivo
大した|たいした|significativo, grande, considerável|adjetivo
体重|たいじゅう|peso (corporal)|substantivo
対象|たいしょう|alvo, objeto, sujeito|substantivo
対照|たいしょう|contraste, antítese, comparação|substantivo
大臣|だいじん|ministro do gabinete|substantivo
対する|たいする|enfrentar, confrontar, opor-se|verbo
大戦|たいせん|grande guerra, grande batalha|substantivo
態度|たいど|atitude, maneira|substantivo
大統領|だいとうりょう|presidente|substantivo
大半|たいはん|maioria, a maior parte|advérbio
代表|だいひょう|representante, delegação|substantivo
大部分|だいぶぶん|maior parte, maioria|substantivo
タイプライター|タイプライター|máquina de escrever|substantivo
逮捕|たいほ|prisão, apreensão, captura|substantivo
題名|だいめい|título|substantivo
ダイヤ|ダイヤ|horário (ferroviário); diamante|substantivo
太陽|たいよう|sol|substantivo
平ら|たいら|planicidade, nível, liso|adjetivo
代理|だいり|representação, procuração, deputado|substantivo
大陸|たいりく|continente|substantivo
倒す|たおす|derrubar, vencer|verbo
タオル|タオル|toalha (de mão)|substantivo
だが|だが|mas, porém|conector
互い|たがい|mútuo, um ao outro|adjetivo
高める|たかめる|aumentar, levantar, impulsionar|verbo
宝|たから|tesouro|substantivo
宅|たく|casa, lar|substantivo
炊く|たく|ferver, cozinhar|verbo
焚く|たく|queimar, acender, fazer fogo|verbo
だけど|だけど|mas, porém|conector
たしか|たしか|certo, seguro, se me lembro corretamente|adjetivo
確かめる|たしかめる|apurar, ter certeza|verbo
多少|たしょう|um pouco|advérbio
助かる|たすかる|ser salvo; ajudar (v.i.)|verbo
助ける|たすける|ajudar (v.t.), salvar, resgatar|verbo
ただ|ただ|gratuitamente; apenas; somente|advérbio
只|ただ|grátis, meramente, somente|advérbio
唯|ただ|mera, única, simples|adjetivo
戦い|たたかい|batalha, luta|substantivo
戦う|たたかう|lutar, competir, batalhar|verbo
叩く|たたく|golpear, bater|verbo
直ちに|ただちに|imediatamente, sem demora|advérbio
畳む|たたむ|dobrar (roupas)|verbo
立ち上がる|たちあがる|levantar-se|verbo
立場|たちば|ponto de vista, posição, situação|substantivo
建つ|たつ|estar de pé; ser construído (v.i.), erguer, ser erguido|verbo
経つ|たつ|passar (tempo)|verbo
達する|たっする|alcançar, chegar a|verbo
だって|だって|mas, porque, mesmo|conector
たっぷり|たっぷり|cheio, em abundância, amplo|advérbio
たとえ|たとえ|mesmo que, não importa, embora|conector
谷|たに|vale|substantivo
他人|たにん|pessoa não relacionada, estranho|substantivo
種|たね|semente; material; causa|substantivo
束|たば|bando, feixe, maço|substantivo
足袋|たび|meia japonesa (com dedo separado)|substantivo
度|たび|contador para ocorrências|contador
旅|たび|viagem, jornada|substantivo
たびたび|たびたび|frequentemente, repetidamente|advérbio
玉|たま|bola, esfera, moeda|substantivo
弾|たま|bala, tiro|substantivo
偶|たま|par, amigo, número par|substantivo
騙す|だます|enganar, trapacear|verbo
偶々|たまたま|inesperadamente, acidentalmente|advérbio
たまらない|たまらない|intolerável, insuportável|adjetivo
溜まる|たまる|acumular, juntar|verbo
黙る|だまる|ficar em silêncio|verbo
試し|ためし|teste, prova|substantivo
試す|ためす|tentar, testar|verbo
溜める|ためる|acumular, juntar|verbo
便り|たより|notícia, carta|substantivo
頼る|たよる|confiar em, depender de|verbo
段|だん|degrau, escada, nível|substantivo
単位|たんい|crédito (em curso); unidade|substantivo
単語|たんご|palavra; vocabulário|substantivo
男子|だんし|jovem homem|substantivo
単純|たんじゅん|simplicidade|substantivo
誕生|たんじょう|nascimento|substantivo
ダンス|ダンス|dança|substantivo
団体|だんたい|organização, associação|substantivo
担当|たんとう|encarregado, responsável|substantivo
単なる|たんなる|mero, simples|adjetivo
単に|たんに|simplesmente, meramente|advérbio
地|ち|terra|substantivo
地位|ちい|posição (social), status|substantivo
地域|ちいき|área, região|substantivo
チーズ|チーズ|queijo|substantivo
チーム|チーム|equipe|substantivo
知恵|ちえ|sabedoria, inteligência|substantivo
地下|ちか|subterrâneo, porão|substantivo
違い|ちがい|diferença, discrepância|substantivo
違いない|ちがいない|com certeza, sem dúvida|expressão
近頃|ちかごろ|ultimamente, recentemente|advérbio
地球|ちきゅう|Terra|substantivo
地区|ちく|distrito, seção|substantivo
遅刻|ちこく|atraso, chegar tarde|substantivo
知事|ちじ|governador prefetural|substantivo
知識|ちしき|conhecimento, informação|substantivo
父親|ちちおや|pai|substantivo
知能|ちのう|inteligência, raciocínio|substantivo
地平線|ちへいせん|horizonte|substantivo
地方|ちほう|área, localidade|substantivo
茶|ちゃ|chá|substantivo
チャンス|チャンス|chance, oportunidade|substantivo
ちゃんと|ちゃんと|perfeitamente, corretamente|advérbio
注|ちゅう|anotação, nota explicativa|substantivo
中央|ちゅうおう|central, centro|substantivo
中学|ちゅうがく|ginásio, escola secundária|substantivo
中古|ちゅうこ|usado, de segunda mão|adjetivo
中止|ちゅうし|suspensão, parada|substantivo
駐車|ちゅうしゃ|estacionamento|substantivo
昼食|ちゅうしょく|almoço|substantivo
中心|ちゅうしん|centro, núcleo|substantivo
注目|ちゅうもく|atenção, observação|substantivo
注文|ちゅうもん|pedido / ordem|substantivo
長期|ちょうき|longo período|substantivo
調査|ちょうさ|pesquisa / investigação|substantivo
調子|ちょうし|condição / estado / sintonia|substantivo
頂上|ちょうじょう|topo / cume / pico|substantivo
ちょうだい|ちょうだい|dê-me (col.)|expressão
貯金|ちょきん|poupança|substantivo
直接|ちょくせつ|direto / imediato|adjetivo
著者|ちょしゃ|autor|substantivo
散らす|ちらす|espalhar / dispersar|verbo
散る|ちる|cair / espalhar (ex: flores)|verbo
遂に|ついに|finalmente / enfim|advérbio
通過|つうか|passagem / transição|substantivo
通貨|つうか|moeda|substantivo
通学|つうがく|ir para a escola|verbo
通勤|つうきん|ir para o trabalho|verbo
通行|つうこう|passagem / trânsito|substantivo
通じる|つうじる|conduzir / comunicar|verbo
通信|つうしん|comunicação / correspondência|substantivo
通訳|つうやく|interpretação / intérprete|substantivo
捕まる|つかまる|ser preso / ser pego|verbo
掴む|つかむ|agarrar / pegar / apreender|verbo
疲れ|つかれ|cansaço / fadiga|substantivo
付き合い|つきあい|socialização / amizade|substantivo
付合う|つきあう|associar-se / acompanhar / dar-se bem com|verbo
次々|つぎつぎ|sucessivamente / um após o outro|advérbio
付く|つく|aderir / ser anexado|verbo
就く|つく|assentar / ocupar (lugar) / estudar (com mestre)|verbo
突く|つく|empurrar / golpear / cutucar|verbo
次ぐ|つぐ|vir depois / ficar em segundo lugar|verbo
付ける|つける|anexar / juntar / adicionar|verbo
着ける|つける|colocar / usar (roupa); chegar|verbo
伝わる|つたわる|ser transmitido / ser passado|verbo
土|つち|terra / solo|substantivo
続き|つづき|continuação / sequência|substantivo
包み|つつみ|pacote / embrulho|substantivo
勤め|つとめ|trabalho / emprego|substantivo
務め|つとめ|dever / obrigação|substantivo
繋がる|つながる|ser conectado / ser relacionado|verbo
繋ぐ|つなぐ|amarrar / prender / conectar|verbo
繋げる|つなげる|conectar|verbo
常に|つねに|sempre|advérbio
翼|つばさ|asas|substantivo
つまり|つまり|em outras palavras / em suma|conector
罪|つみ|crime / falha / indiscrição|substantivo
積む|つむ|empilhar / acumular|verbo
詰める|つめる|empacotar / encurtar / elaborar (detalhes)|verbo
積もる|つもる|empilhar / acumular|verbo
梅雨|つゆ|estação chuvosa|substantivo
釣|つり|pesca|substantivo
連れ|つれ|companhia / acompanhante|substantivo
出|で|saída / graduação|substantivo
出会い|であい|encontro / encontro|substantivo
出合い|であい|encontro|substantivo
出会う|であう|encontrar por acaso / encontrar / deparar-se com|verbo
提案|ていあん|proposta / sugestão|substantivo
定期|ていき|prazo fixo|substantivo
抵抗|ていこう|resistência / oposição|substantivo
提出|ていしゅつ|apresentação / submissão|substantivo
停電|ていでん|falha de eletricidade|substantivo
有利|ゆうり|vantajoso, melhor|adjetivo
床|ゆか|piso|substantivo
愉快|ゆかい|agradável, feliz|adjetivo
譲る|ゆずる|passar, ceder, entregar|verbo
豊か|ゆたか|abundante, rico, farto|adjetivo
茹でる|ゆでる|cozinhar (em água fervente)|verbo
許す|ゆるす|permitir, conceder, aprovar|verbo
夜明け|よあけ|amanhecer, alvorada|substantivo
酔う|よう|embriagar-se|verbo
容易|ようい|fácil, simples|adjetivo
容器|ようき|recipiente, vasilha|substantivo
陽気|ようき|estação, tempo, alegria|substantivo
要求|ようきゅう|pedido, exigência|substantivo
用心|ようじん|cuidado, precaução, atenção|substantivo
様子|ようす|aspecto, estado, aparência|substantivo
要するに|ようするに|em suma, afinal, em resumo|expressão
要素|ようそ|elemento|substantivo
要点|ようてん|ponto principal, essência|substantivo
曜日|ようび|dia da semana|substantivo
ヨーロッパ|ヨーロッパ|Europa|substantivo
予期|よき|expectativa, previsão|substantivo
横切る|よこぎる|atravessar|verbo
汚す|よごす|sujar, poluir|verbo
予算|よさん|orçamento, estimativa|substantivo
止す|よす|cessar, desistir|verbo
寄せる|よせる|coletar, juntar, aproximar|verbo
予測|よそく|previsão, estimativa|substantivo
ヨット|ヨット|iate|substantivo
夜中|よなか|meia-noite|substantivo
世の中|よのなか|mundo, sociedade|substantivo
余分|よぶん|extra, excedente, supérfluo|adjetivo
予報|よほう|previsão, noticiário|substantivo
予防|よぼう|prevenção, profilaxia|substantivo
読み|よみ|leitura|substantivo
嫁|よめ|noiva, nora|substantivo
余裕|よゆう|excesso, sobra, folga|substantivo
より|より|torcer, enrolar|verbo
因る|よる|vir de, depender de|verbo
喜び|よろこび|alegria, prazer|substantivo
よろしく (かん)|よろしく (かん)|melhores cumprimentos, por favor lembre-se de mim|saudação
来|らい～|próximo ~|conector
ライター|ライター|isqueiro; escritor|substantivo
楽|らく|conforto, facilidade|substantivo
ラケット|ラケット|raquete|substantivo
利益|りえき|lucros, ganhos|substantivo
理解|りかい|entendimento, compreensão|substantivo
陸|りく|terra, terra firme|substantivo
利口|りこう|esperto, inteligente|adjetivo
離婚|りこん|divórcio|substantivo
理想|りそう|ideal|substantivo
率|りつ|taxa, proporção, percentual|substantivo
留学|りゅうがく|estudar no exterior|verbo
流行|りゅうこう|moda, moda passageira, prevalente|adjetivo
量|りょう|quantidade, volume|substantivo
寮|りょう|dormitório, alojamento|substantivo
両替|りょうがえ|troca de dinheiro|substantivo
料金|りょうきん|taxa, preço, tarifa|substantivo
例|れい|exemplo, caso|substantivo
礼|れい|gratidão, reverência|substantivo
例外|れいがい|exceção|substantivo
程度|ていど|grau, quantidade, nível|substantivo
停留所|ていりゅうじょ|parada de ônibus ou bonde|substantivo
デート|デート|encontro|expressão
敵|てき|inimigo, rival|substantivo
出来事|できごと|incidente, evento|substantivo
適する|てきする|caber, adequar-se|verbo
適切|てきせつ|apropriado, adequado, relevância|adjetivo
適度|てきど|moderado|adjetivo
適用|てきよう|aplicação|substantivo
できれば|できれば|se possível|expressão
手品|てじな|truque de mágica|substantivo
ですから|ですから|portanto|conector
鉄|てつ|ferro|substantivo
哲学|てつがく|filosofia|substantivo
手伝い|てつだい|ajuda, ajudante, assistente|substantivo
徹底|てってい|minúcia, completude|substantivo
鉄道|てつどう|ferrovia; estrada de ferro|substantivo
徹夜|てつや|ficar acordado a noite toda, noite sem dormir|substantivo
手間|てま|tempo, trabalho|substantivo
デモ|デモ|demo, demonstração|substantivo
典型|てんけい|tipo, padrão, arquetípico|substantivo
天候|てんこう|tempo (meteorológico)|substantivo
電子|でんし|elétron; eletrônico|substantivo
テント|テント|tenda|substantivo
伝統|でんとう|tradição, convenção|substantivo
天然|てんねん|natureza, espontaneidade|substantivo
問い|とい|pergunta, questão|substantivo
党|とう|partido (político)|substantivo
塔|とう|torre, pagode|substantivo
答案|とうあん|papel de exame, roteiro de exame|substantivo
同一|どういつ|identidade, mesma coisa, similaridade|substantivo
銅貨|どうか|moeda de cobre|substantivo
当時|とうじ|naquela época, naqueles dias|advérbio
動詞|どうし|verbo|substantivo
同時|どうじ|simultâneo(s), mesmo tempo|advérbio
どうしても|どうしても|a qualquer custo, não importa o quê, não importa o quanto se tente|advérbio
どうぞよろしく|どうぞよろしく|prazer em conhecê-lo|saudação
到着|とうちゃく|chegada|substantivo
道徳|どうとく|moral|substantivo
投票|とうひょう|votação, enquete|substantivo
東洋|とうよう|Oriente|substantivo
同様|どうよう|idêntico, mesmo (tipo), como|adjetivo
童謡|どうよう|canção infantil, rima infantil|substantivo
同僚|どうりょう|colega; colega de trabalho|substantivo
道路|どうろ|estrada|substantivo
通す|とおす|deixar passar, negligenciar, continuar|verbo
通り過ぎる|とおりすぎる|passar, atravessar|verbo
都会|とかい|cidade|substantivo
溶く|とく|dissolver (tinta)|verbo
解く|とく|desamarrar; responder, resolver|verbo
退く|どく|recuar, ceder, retirar-se|verbo
毒|どく|veneno, tóxico|substantivo
得意|とくい|orgulho, triunfo, prosperidade|substantivo
読書|どくしょ|leitura|substantivo
独身|どくしん|solteiro, não casado|adjetivo
特徴|とくちょう|característica(s); traço(s)|substantivo
特長|とくちょう|ponto forte, mérito|substantivo
独特|どくとく|peculiaridade, singularidade, característica|substantivo
独立|どくりつ|independência (por exemplo, Dia da Indep.), autossuficiência|substantivo
溶ける|とける|derreter, descongelar, dissolver|verbo
飯|めし|refeições, comida|substantivo
滅多に|めったに|raramente|advérbio
メモ|メモ|memorando, nota|substantivo
面|めん|face, lado, superfície, página|substantivo
綿|めん|algodão|substantivo
免許|めんきょ|licença, permissão, certificado|substantivo
面接|めんせつ|entrevista|substantivo
面倒|めんどう|problema, cuidado|substantivo
メンバー|メンバー|membro|substantivo
申し込む|もうしこむ|candidatar-se, fazer uma aplicação|verbo
申し訳|もうしわけ|desculpa, pedido de desculpas|substantivo
毛布|もうふ|cobertor|substantivo
燃える|もえる|queimar|verbo
目的|もくてき|propósito, objetivo, meta|substantivo
目標|もくひょう|marca, objetivo, alvo|substantivo
文字|もじ|letra (do alfabeto), caractere|substantivo
もしかすると|もしかすると|talvez, por acaso|advérbio
もしも|もしも|se|conector
持ち上げる|もちあげる|levantar, erguer, bajular|verbo
用いる|もちいる|usar, fazer uso de|verbo
もったいない|もったいない|desperdiçador; mais do que merece, indigno de|adjetivo
尤も|もっとも|muito certo, plausível, natural|adjetivo
元|もと|origem, original; antigo|substantivo
基|もと|base|substantivo
素|もと|primo|substantivo
戻す|もどす|restaurar, recolocar, retornar|verbo
基づく|もとづく|ser fundamentado em, ser baseado em|verbo
求める|もとめる|solicitar, pedir; buscar, procurar|verbo
者|もの|pessoa|substantivo
物音|ものおと|sons|substantivo
物語|ものがたり|conto, história, lenda|substantivo
物事|ものごと|coisas, tudo|substantivo
燃やす|もやす|queimar|verbo
模様|もよう|padrão, figura, design|substantivo
文句|もんく|reclamação|substantivo
やがて|やがて|em breve, logo, finalmente|advérbio
役|やく|papel, posição|substantivo
約|やく|aproximadamente, cerca de, alguns|advérbio
訳す|やくす|traduzir|verbo
役割|やくわり|atribuição de partes, papel, deveres|substantivo
家賃|やちん|aluguel|substantivo
厄介|やっかい|problema, fardo, cuidado|substantivo
宿|やど|pousada, alojamento|substantivo
雇う|やとう|empregar, contratar|verbo
屋根|やね|telhado|substantivo
破る|やぶる|rasgar; violar; derrotar|verbo
破れる|やぶれる|ser rasgado, desgastar-se|verbo
辞める|やめる|aposentar-se|verbo
やや|やや|um pouco, parcialmente, um tanto|advérbio
唯一|ゆいいつ|único, só, exclusivo|adjetivo
勇気|ゆうき|coragem, bravura, audácia|substantivo
友好|ゆうこう|amizade|substantivo
有効|ゆうこう|válido, eficaz|adjetivo
優秀|ゆうしゅう|superioridade, excelência|substantivo
優勝|ゆうしょう|vitória geral, campeonato|substantivo
友情|ゆうじょう|amizade, companheirismo|substantivo
友人|ゆうじん|amigo (formal)|substantivo
有能|ゆうのう|capaz, competente, eficiente|adjetivo
郵便|ゆうびん|correio, serviço postal|substantivo
ユーモア|ユーモア|humor|substantivo
解ける|とける|desamarrar / soltar|verbo
どこか|どこか|algum lugar / em algum lugar|advérbio
ところが|ところが|no entanto / contudo / embora|conector
ところで|ところで|a propósito / aliás / e se|conector
登山|とざん|escalada / montanhismo|substantivo
都市|とし|cidade / urbe|substantivo
年月|としつき|tempo / anos|substantivo
図書|としょ|livros|substantivo
年寄|としより|idosos / velhos|substantivo
閉じる|とじる|fechar / cerrar|verbo
途端|とたん|no momento / logo que|advérbio
土地|とち|terreno / lote / solo|substantivo
突然|とつぜん|de repente / subitamente|advérbio
トップ|トップ|topo|substantivo
届く|とどく|chegar / alcançar|verbo
とにかく|とにかく|de qualquer forma / em todo caso|advérbio
飛ばす|とばす|pular / omitir|verbo
飛び出す|とびだす|saltar para fora / sair correndo|verbo
留める|とめる|prender / desligar|verbo
泊める|とめる|hospedar alguém|verbo
友|とも|amigo / companheiro|substantivo
共に|ともに|juntos / participando|advérbio
虎|とら|tigre|substantivo
ドライブ|ドライブ|passeio / dirigir|substantivo
トラック|トラック|caminhão / pista|substantivo
ドラマ|ドラマ|drama|substantivo
トランプ|トランプ|baralho de cartas|substantivo
取り上げる|とりあげる|pegar / confiscar|verbo
努力|どりょく|esforço / diligência|substantivo
トレーニング|トレーニング|treinamento / exercício|substantivo
ドレス|ドレス|vestido|substantivo
取れる|とれる|sair / ser removido|verbo
泥|どろ|lama|substantivo
トン|トン|tonelada|contador
とんでもない|とんでもない|absurdo / nem pensar!|expressão
どんなに|どんなに|quão / o quanto|advérbio
トンネル|トンネル|túnel|substantivo
名|な|nome / reputação|substantivo
内容|ないよう|conteúdo / detalhe|substantivo
なお|なお|ainda / ainda assim|advérbio
仲|なか|relação / relacionamento|substantivo
流す|ながす|drenar / flutuar / derramar|verbo
半ば|なかば|metade / meio|substantivo
仲間|なかま|companheiro / colega|substantivo
中身|なかみ|conteúdo / substância|substantivo
中味|なかみ|conteúdo / interior|substantivo
眺め|ながめ|cenário / vista|substantivo
眺める|ながめる|contemplar / olhar|verbo
流れ|ながれ|fluxo / corrente|substantivo
流れる|ながれる|fluir / ser arrastado|verbo
亡くす|なくす|perder alguém|verbo
殴る|なぐる|bater / golpear|verbo
無し|なし|sem|partícula
なぜなら|なぜなら|porque|conector
謎|なぞ|enigma / mistério|substantivo
納得|なっとく|consenso / compreensão|substantivo
何か|なにか|algo|pronome
なにも|なにも|nada|pronome
鍋|なべ|panela|substantivo
怠ける|なまける|ser preguiçoso / negligenciar|verbo
波|なみ|onda|substantivo
涙|なみだ|lágrima|substantivo
悩む|なやむ|angustiar-se / preocupar-se / afligir-se|verbo
鳴らす|ならす|tocar (sino) / soar|verbo
生る|なる|dar fruto / frutificar|verbo
馴れる|なれる|acostumar-se / habituar-se / domesticar-se|verbo
縄|なわ|corda / cordame|substantivo
何で|なんで|por quê / para quê|advérbio
何でも|なんでも|à vontade / tudo|expressão
何とか|なんとか|de alguma forma / de um jeito ou de outro|expressão
似合う|にあう|combinar / assentar / ficar bem|verbo
煮える|にえる|ferver / cozinhar / estar cozido|verbo
苦手|にがて|ser fraco (em) / ter aversão (a) / não gostar (de)|adjetivo
握る|にぎる|agarrar / pegar / moldar (sushi)|verbo
日常|にちじょう|cotidiano / comum / rotineiro|substantivo
日光|にっこう|luz do sol / sol|substantivo
日中|にっちゅう|durante o dia / em pleno dia|substantivo
にっこり|にっこり|sorrir (docemente) / sorrir / dar um sorriso|advérbio
日本|にっぽん|Japão|substantivo
入場|にゅうじょう|entrada / admissão / acesso|substantivo
煮る|にる|cozinhar / ferver|verbo
人気|にんき|popularidade|substantivo
人間|にんげん|ser humano / pessoa|substantivo
抜く|ぬく|extrair / omitir / arrancar|verbo
抜ける|ぬける|sair / cair / ser omitido|verbo
布|ぬの|pano / tecido|substantivo
濡らす|ぬらす|molhar / encharcar|verbo
根|ね|raiz|substantivo
値|ね|valor / preço / custo|substantivo
願い|ねがい|desejo / pedido / súplica|substantivo
願う|ねがう|desejar / querer / pedir|verbo
鼠|ねずみ|rato / camundongo|substantivo
熱帯|ねったい|trópicos|substantivo
熱中|ねっちゅう|entusiasmo / fervor / obcecação|substantivo
年間|ねんかん|anual / por ano|substantivo
年中|ねんじゅう|durante todo o ano / sempre / todos os dias|advérbio
年代|ねんだい|era / período / década|substantivo
年齢|ねんれい|idade / anos|substantivo
野|の|campo / pasto|substantivo
能|のう|ser habilidoso (em) / bem / adequadamente|adjetivo
農家|のうか|fazendeiro / família de agricultores|substantivo
農業|のうぎょう|agricultura|substantivo
農民|のうみん|agricultores / camponeses|substantivo
能力|のうりょく|habilidade / capacidade / faculdade|substantivo
ノー|ノー|não|partícula
軒|のき|beiral|substantivo
残す|のこす|deixar (para trás) / poupar / reservar|verbo
残り|のこり|restante / sobra|substantivo
乗せる|のせる|colocar em cima / embarcar|verbo
載せる|のせる|colocar em cima / publicar|verbo
覗く|のぞく|espiar / dar uma olhada|verbo
除く|のぞく|remover / excluir / exceto|verbo
望み|のぞみ|desejo / esperança|substantivo
望む|のぞむ|desejar / querer / ver|verbo
ノック|ノック|batida / knock; fungo (beisebol)|substantivo
伸ばす|のばす|esticar / estender / alcançar|verbo
延ばす|のばす|esticar / estender / alargar|verbo
伸びる|のびる|esticar-se / progredir / crescer|verbo
延びる|のびる|ser prorrogado / ser estendido|verbo
述べる|のべる|declarar / expressar / mencionar|verbo
上る|のぼる|subir / ir para cima / escalar|verbo
昇る|のぼる|subir / ir para cima|verbo
載る|のる|aparecer / ser registrado|verbo
のんびり|のんびり|tranquilo / despreocupado|adjetivo
場|ば|lugar / campo (física)|substantivo
はあ (かん)|はあ (かん)|(suspiro)|expressão
パーセント|パーセント|por cento|substantivo
灰|はい|cinza|substantivo
バイオリン|バイオリン|violino|substantivo
ハイキング|ハイキング|caminhada|substantivo
配達|はいたつ|entrega / distribuição|substantivo
パイプ|パイプ|cano / canais (oficiais ou não)|substantivo
俳優|はいゆう|ator / atriz / performer|substantivo
パイロット|パイロット|piloto|substantivo
生える|はえる|crescer / brotar; cortar (dentes)|verbo
墓|はか|túmulo / sepultura|substantivo
馬鹿|ばか|bobo / idiota|substantivo
博士|はかせ|doutorado / PhD / doutor|substantivo
計る|はかる|medir / pesar / pesquisar|verbo
量る|はかる|medir / pesar / pesquisar|verbo
測る|はかる|medir / pesar / pesquisar|verbo
掃く|はく|varrer / escovar / juntar|verbo
吐く|はく|vomitar / expelir|verbo
拍手|はくしゅ|aplausos / bater palmas|substantivo
莫大|ばくだい|enorme / vasto|adjetivo
爆発|ばくはつ|explosão / detonação / erupção|substantivo
博物館|はくぶつかん|museu|substantivo
激しい|はげしい|violento / veemente / intenso|adjetivo
はさみ|はさみ|tesoura|substantivo
破産|はさん|falência (pessoal)|substantivo
端|はし|fim (de rua) / beira / margem|substantivo
始まり|はじまり|origem / começo|substantivo
パス|パス|caminho / passe (em jogos)|substantivo
外す|はずす|desprender / remover|verbo
パスポート|パスポート|passaporte|substantivo
外れる|はずれる|desconectar / sair (de marcha)|verbo
旗|はた|bandeira|substantivo
肌|はだ|pele|substantivo
裸|はだか|nu / nu|adjetivo
畑|はたけ|campo / horta|substantivo
働き|はたらき|trabalho / labuta|substantivo
バッグ|バッグ|bolsa / saco|substantivo
発見|はっけん|descoberta / detecção / achado|substantivo
発行|はっこう|emissão (de publicações)|substantivo
発車|はっしゃ|partida (de um veículo)|substantivo
発射|はっしゃ|disparo / tiro / descarga|substantivo
罰する|ばっする|punir / penalizar|verbo
発達|はったつ|desenvolvimento / crescimento|substantivo
ばったり|ばったり|inesperadamente / por acaso|advérbio
発展|はってん|desenvolvimento / crescimento / progresso|substantivo
発表|はっぴょう|anúncio / publicação / apresentação|substantivo
発明|はつめい|invenção|substantivo
派手|はで|chamativo / extravagante / espalhafatoso|adjetivo
話し合う|はなしあう|discutir / conversar juntos|verbo
離す|はなす|separar / afastar|verbo
放す|はなす|separar / libertar|verbo
離れる|はなれる|separar-se / afastar-se / estar distante|verbo
放れる|はなれる|sair / libertar-se / cortar laços|verbo
羽|はね|asa|substantivo
羽根|はね|pena|substantivo
幅|はば|largura / abrangência|substantivo
母親|ははおや|mãe|substantivo
省く|はぶく|omitir / eliminar|verbo
場面|ばめん|cena / cenário|substantivo
流行る|はやる|ser popular / estar na moda|verbo
腹|はら|abdômen / barriga / estômago|substantivo
原|はら|campo / planície|substantivo
バランス|バランス|equilíbrio|substantivo
針|はり|agulha / ponteiro|substantivo
範囲|はんい|extensão / escopo / alcance|substantivo
反抗|はんこう|oposição / resistência|substantivo
犯罪|はんざい|crime|substantivo
ハンサム|ハンサム|bonito|adjetivo
反省|はんせい|reflexão / reconsideração / arrependimento|substantivo
判断|はんだん|julgamento / decisão|substantivo
犯人|はんにん|ofensor / criminoso|substantivo
販売|はんばい|venda / comercialização|substantivo
灯|ひ|luz|substantivo
ビール|ビール|cerveja|substantivo
被害|ひがい|dano / prejuízo|substantivo
比較|ひかく|comparação|substantivo
ピクニック|ピクニック|piquenique|substantivo
悲劇|ひげき|tragédia|substantivo
飛行|ひこう|aviação / voo|substantivo
膝|ひざ|joelho / colo|substantivo
非常|ひじょう|emergência / extraordinário / incomum|substantivo
美人|びじん|pessoa bonita (mulher)|substantivo
日付|ひづけ|data / datar|substantivo
引越し|ひっこし|mudança de residência|substantivo
必死|ひっし|desespero / frenético / resultado inevitável|adjetivo
ぴったり|ぴったり|exatamente / arrumadamente / pontualmente|advérbio
引っ張る|ひっぱる|puxar / esticar / arrastar|verbo
否定|ひてい|negação / desmentido|substantivo
ビデオ|ビデオ|vídeo / videocassete|substantivo
一言|ひとこと|uma palavra|expressão
人込み|ひとごみ|multidão|substantivo
等しい|ひとしい|igual|adjetivo
独り|ひとり|sozinho / solteiro|adjetivo
一人一人|ひとりひとり|um por um / cada|expressão
批判|ひはん|crítica|substantivo
批評|ひひょう|crítica / resenha / comentário|substantivo
秘密|ひみつ|segredo / sigilo|substantivo
微妙|びみょう|delicado / sutil|adjetivo
紐|ひも|corda / barbante|substantivo
冷やす|ひやす|esfriar / refrigerar|verbo
費用|ひよう|custo / despesa|substantivo
秒|びょう|segundo|contador
評価|ひょうか|avaliação / estima|substantivo
表現|ひょうげん|expressão / apresentação|substantivo
表情|ひょうじょう|expressão facial|substantivo
平等|びょうどう|igualdade / imparcialidade / uniformidade|substantivo
評判|ひょうばん|fama / reputação|substantivo
表面|ひょうめん|superfície / exterior / face|substantivo
広がる|ひろがる|espalhar-se / estender-se / alcançar|verbo
広げる|ひろげる|espalhar / estender / expandir / ampliar|verbo
広める|ひろめる|alargar / propagar|verbo
瓶|びん|garrafa|substantivo
便|びん|maneira / meio / voo|substantivo
ピン|ピン|alfinete|substantivo
不|ふ|não- / in- / prefixo negativo|partícula
分|ぶ|dividir, parte|substantivo
不安|ふあん|ansiedade, inquietação|substantivo
風景|ふうけい|cenário, paisagem|substantivo
夫婦|ふうふ|casal, marido e mulher|substantivo
笛|ふえ|flauta, apito|substantivo
不可|ふか|errado, mau, impossível|adjetivo
深まる|ふかまる|aprofundar-se|verbo
武器|ぶき|arma, armamento|substantivo
拭く|ふく|limpar, secar|verbo
服装|ふくそう|roupas, traje|substantivo
含む|ふくむ|conter, incluir|verbo
含める|ふくめる|incluir|verbo
袋|ふくろ|saco, bolsa|substantivo
不幸|ふこう|infelicidade, tristeza, desgraça|substantivo
節|ふし|melodia, tom, nó|substantivo
無事|ぶじ|segurança, paz|substantivo
不思議|ふしぎ|mistério, curiosidade|substantivo
不自由|ふじゆう|desconforto, deficiência, inconveniência|substantivo
夫人|ふじん|esposa, Sra., senhora|substantivo
婦人|ふじん|mulher|substantivo
不正|ふせい|injustiça, falta de imparcialidade|substantivo
防ぐ|ふせぐ|defender (contra), proteger, prevenir|verbo
不足|ふそく|insuficiência, escassez|substantivo
舞台|ぶたい|palco (teatro)|substantivo
双子|ふたご|gêmeos, um gêmeo|substantivo
再び|ふたたび|novamente, mais uma vez, uma segunda vez|advérbio
普段|ふだん|em situações cotidianas, geralmente, normalmente|advérbio
不通|ふつう|bloqueio, interrupção, parada|substantivo
物価|ぶっか|preços (de bens/consumidor)|substantivo
ぶつかる|ぶつかる|bater, colidir com|verbo
ぶつける|ぶつける|bater, golpear forte, atingir e atacar|verbo
物質|ぶっしつ|material, substância|substantivo
物理|ぶつり|física|substantivo
筆|ふで|pincel de escrita|substantivo
ふと|ふと|de repente, acidentalmente, incidentalmente|advérbio
部分|ぶぶん|porção, seção, parte|substantivo
不平|ふへい|reclamação, descontentamento, insatisfação|substantivo
不満|ふまん|insatisfação, descontentamento, reclamações|substantivo
増やす|ふやす|aumentar (v.t.), acrescentar|verbo
殖やす|ふやす|aumentar, acrescentar|verbo
プラス|プラス|mais|substantivo
プラスチック|プラスチック|plástico|substantivo
プラン|プラン|plano|substantivo
不利|ふり|desvantagem, inconveniente|substantivo
振る|ふる|acenar, sacudir; espalhar; escalar (ator)|verbo
震える|ふるえる|tremer, sacudir, estremecer|verbo
ブレーキ|ブレーキ|freio|substantivo
触れる|ふれる|tocar, sentir, violar|verbo
プロ|プロ|profissional|substantivo
文|ぶん|sentença|substantivo
雰囲気|ふんいき|atmosfera (ex: musical), humor, ambiente|substantivo
分析|ぶんせき|análise|substantivo
文明|ぶんめい|civilização|substantivo
分野|ぶんや|campo, esfera|substantivo
塀|へい|muro, cerca|substantivo
平均|へいきん|equilíbrio, balanço, média|substantivo
平和|へいわ|paz|substantivo
別に|べつに|particularmente, nada|advérbio
減らす|へらす|diminuir, reduzir|verbo
減る|へる|diminuir (em tamanho ou número), reduzir|verbo
ベルト|ベルト|cinto|substantivo
変化|へんか|mudança / variação / turno|substantivo
ペンキ|ペンキ|tinta|substantivo
変更|へんこう|mudança / modificação / alteração|substantivo
ベンチ|ベンチ|banco|substantivo
弁当|べんとう|marmita|substantivo
法|ほう|Lei / Ato|substantivo
棒|ぼう|poste / vara / bastão|substantivo
冒険|ぼうけん|risco / empreendimento / aventura|substantivo
方向|ほうこう|direção / rumo / caminho|substantivo
報告|ほうこく|relatório / informação|substantivo
宝石|ほうせき|gema / joia|substantivo
包装|ほうそう|embalagem / embrulho|substantivo
豊富|ほうふ|abundância / fartura|substantivo
方法|ほうほう|método / meio / técnica|substantivo
訪問|ほうもん|chamada / visita|substantivo
吠える|ほえる|latir / uivar|verbo
ボーイ|ボーイ|bagageiro / rapaz|substantivo
ボート|ボート|barco a remo|substantivo
ホーム|ホーム|plataforma / casa|substantivo
ボール|ボール|bola / tigela|substantivo
誇り|ほこり|orgulho|substantivo
埃|ほこり|poeira|substantivo
保証|ほしょう|garantia / segurança / garantia|substantivo
保存|ほぞん|preservação / conservação|substantivo
歩道|ほどう|calçada|substantivo
仏|ほとけ|Buda|substantivo
骨|ほね|osso|substantivo
炎|ほのお|chama|substantivo
頬|ほほ|bochecha|substantivo
ほぼ|ほぼ|quase / aproximadamente|advérbio
微笑む|ほほえむ|sorrir|verbo
堀|ほり|fosso / canal|substantivo
濠|ほり|fosso|substantivo
本人|ほんにん|a própria pessoa|pronome
本物|ほんもの|artigo genuíno|substantivo
ぼんやり|ぼんやり|fraco / vago / impreciso|adjetivo
まあ|まあ|bem / pois|expressão
マーケット|マーケット|mercado|substantivo
マイク|マイク|microfone|substantivo
迷子|まいご|criança perdida|substantivo
マイナス|マイナス|menos|partícula
任せる|まかせる|confiar a / deixar para|verbo
巻く|まく|enrolar / espiral / rolar|verbo
蒔く|まく|semear (sementes)|verbo
撒く|まく|espalhar / polvilhar / semear|verbo
幕|まく|cortina / ato (em peça)|substantivo
負け|まけ|derrota / perda|substantivo
孫|まご|neto / neta|substantivo
まさか|まさか|de forma alguma|advérbio
まさに|まさに|certamente / com certeza|advérbio
混ざる|まざる|ser misturado / misturar-se com|verbo
交ざる|まざる|ser misturado / misturar-se com|verbo
混じる|まじる|ser misturado / misturar-se com|verbo
交じる|まじる|ser misturado / misturar-se com|verbo
増す|ます|aumentar / ganhar|verbo
貧しい|まずしい|pobre / necessitado|adjetivo
マスター|マスター|dono de bar / mestre|substantivo
ますます|ますます|cada vez mais / mais e mais|advérbio
混ぜる|まぜる|misturar / mexer|verbo
交ぜる|まぜる|ser misturado, ser misturado com|verbo
街|まち|cidade; rua, estrada|substantivo
間違い|まちがい|erro|substantivo
松|まつ|pinheiro|substantivo
真っ赤|まっか|vermelho vivo, ruborizado (rosto)|adjetivo
全く|まったく|realmente, completamente|advérbio
祭|まつり|festival, festa|substantivo
まとまる|まとまる|ser recolhido, ser decidido, estar em ordem|verbo
まとめる|まとめる|colocar em ordem, recolher, levar a uma conclusão|verbo
学ぶ|まなぶ|aprender; estudar|verbo
真似|まね|mímica, imitação, comportamento|substantivo
招く|まねく|convidar|verbo
まぶしい|まぶしい|ofuscante, radiante|adjetivo
柵|さく|cerca, paliçada|substantivo
裂ける|さける|rachar, rasgar, arrebentar|verbo
裁く|さばく|julgar|verbo
酸化|さんか|oxidação|substantivo
死|し|morte, falecimento|substantivo
資格|しかく|qualificações, requisitos, capacidades|substantivo
視覚|しかく|senso de visão, visão|substantivo
指揮|しき|comando, direção|substantivo
磁気|じき|magnetismo|substantivo
磁器|じき|porcelana, louça|substantivo
自己|じこ|eu, si mesmo|pronome
字体|じたい|fonte, letra|substantivo
辞退|じたい|recusa|substantivo
視点|してん|opinião, ponto de vista, ponto visual|substantivo
脂肪|しぼう|gordura, graxa|substantivo
志望|しぼう|desejo, anseio, ambição|substantivo
衆|しゅう|massas, povo|substantivo
住|じゅう|moradia, vivendo|substantivo
修飾|しゅうしょく|ornamentação; modificação (gram)|substantivo
私用|しよう|uso pessoal, negócios privados|substantivo
仕様|しよう|maneira, método, especificação|substantivo
情|じょう|sentimentos, emoção, paixão|substantivo
生涯|しょうがい|vida inteira|substantivo
上司|じょうし|superior|substantivo
正体|しょうたい|forma natural, as verdadeiras cores, o verdadeiro caráter|substantivo
照明|しょうめい|iluminação|substantivo
女史|じょし|Sra.|saudação
助詞|じょし|(gram) partícula(s), posposição|partícula
ショック|ショック|choque|substantivo
進行|しんこう|avanço|substantivo
新興|しんこう|emergente, em desenvolvimento, nascente|adjetivo
振興|しんこう|promoção, encorajamento|substantivo
申告|しんこく|relatório, declaração|substantivo
真理|しんり|verdade|substantivo
水洗|すいせん|descarga (sanitária)|substantivo
ストレス|ストレス|estresse|substantivo
擦る|する|esfregar, roçar|verbo
正規|せいき|regular, legítimo|adjetivo
精巧|せいこう|elaborado, delicado, requintado|adjetivo
精算|せいさん|cálculo exato, ajuste|substantivo
成年|せいねん|maioridade, idade adulta|substantivo
声明|せいめい|declaração, proclamação|substantivo
姓名|せいめい|nome completo|substantivo
生理|せいり|fisiologia, menstruação|substantivo
膳|ぜん|mesa (pequena), bandeja, refeição|substantivo
禅|ぜん|Zen (Budismo)|substantivo
選挙|せんきょ|eleição|substantivo
非行|ひこう|delinquência, má conduta|substantivo
票|ひょう|rótulo, cédula, sinal|substantivo
広まる|ひろまる|espalhar-se, ser propagado|verbo
深める|ふかめる|aprofundar, intensificar|verbo
福|ふく|boa sorte|substantivo
振り|ふり|estilo, maneira|substantivo
経る|へる|passar, transcorrer, vivenciar|verbo
保護|ほご|cuidado, proteção, abrigo|substantivo
保障|ほしょう|garantia, segurança, certificado|substantivo
補償|ほしょう|compensação, reparação|substantivo
ほっと|ほっと|sentir-se aliviado|expressão
前もって|まえもって|antecipadamente, previamente|advérbio
膜|まく|membrana, filme|substantivo
マスコミ|マスコミ|comunicação de massa|substantivo
股|また|coxa, virilha|substantivo
マッサージ|マッサージ|massagem|substantivo
見掛ける|みかける|ver (por acaso), notar, vislumbrar|verbo
捲る|めくる|virar, folhear um livro|verbo
メッセージ|メッセージ|mensagem|substantivo
野党|やとう|partido de oposição|substantivo
優|ゆう|superioridade, alta qualidade|substantivo
有機|ゆうき|orgânico|adjetivo
世|よ|mundo, sociedade, geração|substantivo
良い|よい|bom, agradável|adjetivo
予想|よそう|expectativa, antecipação, previsão|substantivo
弱まる|よわまる|enfraquecer, ficar emaciado, ficar desanimado|verbo
弱める|よわめる|enfraquecer|verbo
ラベル|ラベル|rótulo|substantivo
ルール|ルール|regra|substantivo
枠|わく|moldura, slide|substantivo
表示|ひょうじ|exibição, indicação|substantivo
先行|せんこう|precedente, ir primeiro|verbo
選考|せんこう|seleção, triagem|substantivo
相|そう|aspecto, fase, semblante|substantivo
沿う|そう|correr ao longo, seguir|verbo
添う|そう|acompanhar, cumprir|verbo
僧|そう|monge, padre|substantivo
像|ぞう|estátua, imagem|substantivo
捜査|そうさ|busca, investigação|substantivo
操縦|そうじゅう|gerenciamento, controle, manipulação|substantivo
創造|そうぞう|criação|substantivo
隊|たい|partido, tropas|substantivo
退学|たいがく|abandono escolar|substantivo
タイトル|タイトル|título|substantivo
ダウン|ダウン|para baixo|adjetivo
高まる|たかまる|aumentar, crescer, montar|verbo
断つ|たつ|cortar, romper|verbo
盾|たて|escudo|substantivo
例え|たとえ|exemplo; mesmo que|expressão
チャイム|チャイム|sino|substantivo
挑戦|ちょうせん|desafio, desafio|substantivo
治療|ちりょう|tratamento médico|substantivo
接ぐ|つぐ|juntar; emendar; assentar (ossos); enxertar (árvores)|verbo
継ぐ|つぐ|suceder (alguém em um negócio ou herança)|verbo
摘む|つむ|colher, apanhar, podar|verbo
露|つゆ|orvalho|substantivo
強まる|つよまる|fortalecer, ganhar força|verbo
強める|つよめる|fortalecer, enfatizar|verbo
データ|データ|dados|substantivo
デザイン|デザイン|design|substantivo
デザート|デザート|sobremesa|substantivo
転校|てんこう|mudar de escola|verbo
伝言|でんごん|mensagem verbal|substantivo
と|と|e|conector
問う|とう|perguntar, questionar|verbo
棟|とう|cumeeira (de telhado)|substantivo
倒産|とうさん|falência, insolvência|substantivo
同士|どうし|um ao outro, companheiro, camarada|pronome
同志|どうし|mesma mente, camarada, alma gêmea|substantivo
当然|とうぜん|óbvio; natural|adjetivo
動揺|どうよう|perturbação, agitação, choque|substantivo
説く|とく|explicar, advogar|verbo
綴じる|とじる|atar, arquivar|verbo
供|とも|acompanhante, atendente, companheiro, comitiva|substantivo
並|なみ|médio (ex. tamanho de porção, qualidade, preço, etc.), comum|adjetivo
慣らす|ならす|acostumar|verbo
馴らす|ならす|domesticar, domar|verbo
難|なん|dificuldade, dificuldades, defeito|substantivo
年鑑|ねんかん|anuário|substantivo
脳|のう|cérebro, memória|substantivo
臨む|のぞむ|olhar para, enfrentar, comparecer (função)|verbo
肺|はい|pulmão|substantivo
～敗|はい|contador para perda, derrota|contador
映える|はえる|brilhar, parecer atraente, parecer bonito|verbo
諮る|はかる|consultar, conferenciar|verbo
図る|はかる|planejar, tentar, conceber, desenhar, referir A a B|verbo
生やす|はやす|crescer, cultivar, usar barba|verbo
班|はん|grupo, partido, seção (militar)|substantivo
判|はん|tamanho (de papel ou livros)|substantivo
版|はん|edição|substantivo
碑|ひ|monumento de pedra com inscrição|substantivo
`;

const n2 = `
〜 (まる) ごと|〜 (まる) ごと|todo ~, tudo de ~|expressão
(かさを～) さす|(かさを～) さす|abrir; segurar (um guarda-chuva)|verbo
〜(日本) 式|～(にほん) しき|costume, estilo|expressão
～位|～い|~º lugar|expressão
～いち (にほんいち)|～いち (にほんいち)|Nº 1 ~ (em)|expressão
～園|～えん|jardim ~ (especialmente feito pelo homem)|expressão
～おしまい (おわり)|～おしまい (おわり)|acabar ~|expressão
～下|～か|sob ~|expressão
～化|～か|ação de tornar algo|expressão
～科|～か|família, grupo, curso|expressão
～歌|～か|canção de ~|expressão
～画|～が|pintura, quadro|expressão
～外|～がい|fora de ~|expressão
～難い|～がたい|difícil de fazer ~|expressão
～がち|～がち|tende a fazer ~|expressão
～刊|～かん|~ emitido (revista, jornal)|expressão
～間|～かん|entre, durante|expressão
～巻|～かん|volume|expressão
～館|～かん|salão ~, edifício ~|expressão
～感|～かん|sentimento, senso, impressão|expressão
～期|～き|~ idade, ~ período|expressão
～器|～き|dispositivo, equipamento|expressão
～機|～き|máquina|expressão
～気味|～ぎみ|ligeiramente ~|expressão
～教|～きょう|religião|expressão
～行|～ぎょう|linha, fila|expressão
～業|～ぎょう|tipo de negócio|expressão
～きる|～きる|ainda assim, levar adiante|verbo
～切れ|～きれ|fora de estoque, esgotado|expressão
～口|～くち|abertura / entrada / saída|substantivo
～形|～けい|forma de|substantivo
～系|～けい|sistema / linhagem / grupo|substantivo
～圏|～けん|bloco / esfera / área|substantivo
～校|～こう|contador para escola|contador
～港|～こう|porto|substantivo
～号|～ごう|contador para revista / nome de navio|contador
～国|～こく|nação de|substantivo
～毎|～ごと|cada / todo|conector
～山|～さん|nome de montanha|substantivo
～産|～さん|feito em|substantivo
～史|～し|história de|substantivo
～紙|～し|jornal / tipo de papel|substantivo
～寺|～じ|nome de templo|substantivo
～時間目|～じかんめ|hora / período|contador
～室|～しつ|contador para sala|contador
～車|～しゃ|carro|substantivo
～者|～しゃ|pessoa|substantivo
～社|～しゃ|contador para empresa|contador
～手|～しゅ|jogador / quem faz|substantivo
～酒|～しゅ|tipo de bebida alcoólica|substantivo
～集|～しゅう|coleção de|substantivo
～所|～しょ|lugar|substantivo
～女|～じょ|contador para irmãs|contador
～省|～しょう|tipo de ministério|substantivo
～商|～しょう|mercador / negócio|substantivo
～勝|～しょう|contador para vitória|contador
～条|～じょう|artigo|contador
～場|～じょう|campo / terreno|substantivo
～畳|～じょう|contador para tatames / tapetes|contador
～色|～しょく|tipo de cor|substantivo
～過ぎる|～すぎる|demais / muito|verbo
～済|～ずみ|terminado|adjetivo
～席|～せき|contador para assentos|contador
～船|～せん|contador para navios|contador
～戦|～せん|contador para jogos / partidas|contador
～沿い|～そい|ao longo de|conector
～艘|～そう|contador para navios|contador
～足|～そく|contador para sapatos|contador
～だらけ|～だらけ|estar cheio de / estar repleto de|expressão
～団|～だん|grupo / corpo / equipe|substantivo
～着|～ちゃく|contador para roupas / lugar de chegada|contador
～庁|～ちょう|escritório / agência|substantivo
～兆|～ちょう|trilhão|substantivo
～長|～ちょう|líder / chefe|substantivo
～帳|～ちょう|livro / caderno|substantivo
～丁目|～ちょうめ|distrito / quarteirão|substantivo
～通|～つう|contador para cartas|contador
～遣い|～づかい|uso de|substantivo
～付|～つき|com|conector
～続く|～つづく|seguir / continuar|verbo
～辛い|～づらい|difícil de fazer|adjetivo
～滴|～てき|gota|substantivo
～点|～てん|contador para pontuações|contador
～頭|～とう|contador para animais|contador
～等|～とう|nível / lugar|substantivo
～島|～とう|tipo de ilhas|substantivo
～道|～どう|tipo de caminho / estrada|substantivo
～通り|～とおり|de acordo com / seguindo / rua|conector
～ところ|～ところ|prestes a fazer|expressão
～内|～ない|dentro de ~|expressão
～年生|～ねんせい|contador para ano escolar|contador
～泊|～はく|contador para estadia (ex: 2 noites)|contador
～発|～はつ|contador para balas|contador
～番目|～ばんめ|~º|expressão
～費|～ひ|custo de ~|expressão
～病|～びょう|tipo de doença|expressão
～部|～ぶ|parte ~|expressão
～風|～ふう|estilo ~|expressão
～振り|～ぶり|após um intervalo de ~|expressão
～遍|～へん|vez|contador
～弁|～べん|fala, dialeto|expressão
～歩|～ほ|passo, pisada|expressão
～ぽい|～ぽい|~zinho|expressão
～ほう (ひかく)|～ほう (ひかく)|(em comparação)|expressão
～みたい|～みたい|parece ~|expressão
～向け|～むけ|para ~|expressão
～名|～めい|contador para pessoas|contador
～もち|～もち|pessoa que tem ~|expressão
～問|～もん|contador para perguntas|contador
～夜|～や|contador para noites|contador
～流|～りゅう|moda, maneira, jeito|expressão
～料|～りょう|tarifa, taxa|expressão
～領|～りょう|território|expressão
～力|～りょく|poder de ~|expressão
～論|～ろん|teoria|expressão
～羽|～わ|contador para coelhos; pássaros|contador
アイデア; アイディア|アイデア; アイディア|ideia|substantivo
あいまい|あいまい|vago, ambíguo|adjetivo
扇ぐ|あおぐ|abanar, agitar|verbo
青白い|あおじろい|pálido|adjetivo
呆れる|あきれる|ficar chocado, horrorizado|verbo
アクセント|アクセント|acento|substantivo
あくび|あくび|bocejo|substantivo
飽くまで|あくまで|até o fim, obstinadamente|advérbio
明くる～|あくる～|próximo, seguinte|adjetivo
明け方|あけがた|amanhecer|substantivo
憧れる|あこがれる|ansiar por, desejar|verbo
朝寝坊|あさねぼう|dormir demais, levantador tardio|substantivo
足跡|あしあと|impressão digital, pegada|substantivo
足元|あしもと|aos pés de alguém|expressão
味わう|あじわう|provar, saborear|verbo
あちらこちら|あちらこちら|aqui e ali|advérbio
厚かましい|あつかましい|insolente, sem vergonha|adjetivo
圧縮|あっしゅく|compressão, condensação, pressão|substantivo
宛名|あてな|endereço, direção|substantivo
当てはまる|あてはまる|ser aplicável, enquadrar-se (numa categoria)|verbo
当てはめる|あてはめる|aplicar, adaptar|verbo
暴れる|あばれる|agir violentamente, furioso|verbo
あぶる|あぶる|assar, torrar|verbo
あふれる|あふれる|inundar, transbordar|verbo
雨戸|あまど|porta contra tempestade de correr|substantivo
甘やかす|あまやかす|mimar, estragar|verbo
余る|あまる|sobrar, estar em excesso|verbo
編み物|あみもの|tricô|substantivo
あみもの|あみもの|tricô, teia|substantivo
編む|あむ|tricotar|verbo
危うい|あやうい|perigoso, crítico|adjetivo
怪しい|あやしい|suspeito, duvidoso, incerto|adjetivo
荒い|あらい|áspero, rude, selvagem|adjetivo
粗い|あらい|grosse, áspero|adjetivo
粗筋|あらすじ|resumo, sinopse|substantivo
改めて|あらためて|outra vez, novamente|advérbio
改める|あらためる|mudar, reformar, revisar|verbo
あらわす|あらわす|escrever, publicar|verbo
有難い|ありがたい|grato, agradecido, apreciado|adjetivo
あれこれ|あれこれ|uma coisa ou outra, isto e aquilo|pronome
荒れる|あれる|estar tempestuoso, estar áspero, estar arruinado|verbo
慌ただしい|あわただしい|ocupado, apressado|adjetivo
安易|あんい|de ânimo leve, despreocupado|adjetivo
アンテナ|アンテナ|antena|substantivo
言い出す|いいだす|começar a falar, sugerir|verbo
言い付ける|いいつける|dizer, ordenar|verbo
意義|いぎ|significado, importância|substantivo
生き生き|いきいき|vívido, animado|adjetivo
いきなり|いきなり|de repente, subitamente|advérbio
幾～|いく～|vários ~|contador
育児|いくじ|cuidados infantis, amamentação|substantivo
幾分|いくぶん|um pouco, ligeiramente|advérbio
生け花|いけばな|arranjo de flores|substantivo
以後|いご|depois disso; a partir de agora; doravante|advérbio
イコール|イコール|igual|adjetivo
以降|いこう|a partir de, doravante|advérbio
勇ましい|いさましい|corajoso, valente|adjetivo
衣食住|いしょくじゅう|comida, roupa e abrigo|substantivo
いちいち|いちいち|um por um, separadamente|advérbio
一応|いちおう|tentativamente, por enquanto|advérbio
一段と|いちだんと|muito mais, maior|advérbio
一流|いちりゅう|primeira classe, principal|adjetivo
一昨年|いっさくねん|ano retrasado|substantivo
一斉|いっせい|simultâneo, tudo de uma vez|advérbio
一旦|いったん|uma vez, por um momento|advérbio
一定|いってい|fixo, estabelecido, regular|adjetivo
行っていらっしゃい|いっていらっしゃい|tenha um bom dia, até logo|saudação
いってきます|いってきます|Eu vou e volto, "Estou indo, até logo"|saudação
いってまいります|いってまいります|Eu vou e volto, "Estou indo, até logo"|saudação
行ってらっしゃい|いってらっしゃい|tenha um bom dia, até logo|saudação
移転|いてん|mudança, transferência|substantivo
井戸|いど|poço de água|substantivo
緯度|いど|latitude (navegação)|substantivo
威張る|いばる|ter orgulho, pavonear-se|verbo
嫌がる|いやがる|relutante, não gostar|verbo
いよいよ|いよいよ|cada vez mais, finalmente|advérbio
煎る|いる|assar, torrar|verbo
炒る|いる|assar, torrar|verbo
入れ物|いれもの|recipiente, caixa|substantivo
インキ|インキ|tinta|substantivo
引力|いんりょく|gravidade|substantivo
ウーマン|ウーマン|mulher|substantivo
ウール|ウール|lã|substantivo
ウエートレス|ウエートレス|garçonete|substantivo
植木|うえき|arbustos de jardim, árvores, planta em vaso|substantivo
飢える|うえる|passar fome|verbo
浮ぶ|うかぶ|flutuar, vir à superfície, vir à mente|verbo
浮かべる|うかべる|flutuar; expressar|verbo
浮く|うく|flutuar|verbo
承る|うけたまわる|ouvir, ser informado, saber|verbo
受取|うけとり|recibo|substantivo
受け持つ|うけもつ|encarregar-se de|verbo
薄暗い|うすぐらい|fracamente iluminado, sombrio|adjetivo
解説|かいせつ|explicação / comentário|substantivo
改造|かいぞう|reforma / remodelação|substantivo
開通|かいつう|abertura / inaugurado|substantivo
回転|かいてん|rotação / virada|substantivo
解答|かいとう|resposta / solução|substantivo
回答|かいとう|resposta / retorno|substantivo
外部|がいぶ|exterior / externo|substantivo
解放|かいほう|libertação / emancipação|substantivo
開放|かいほう|abertura / liberalização|substantivo
海洋|かいよう|oceano|substantivo
概論|がいろん|introdução / visão geral|substantivo
却って|かえって|ao contrário / em vez disso|advérbio
家屋|かおく|casa / edifício|substantivo
係わる|かかわる|envolver-se / estar envolvido|verbo
書留|かきとめ|correio registrado|substantivo
書取|かきとり|ditado|substantivo
垣根|かきね|cerca viva|substantivo
限り|かぎり|limite / o máximo possível|substantivo
各～|かく～|cada / todo|pronome
架空|かくう|imaginário / ficção|adjetivo
各自|かくじ|indivíduo / cada um|pronome
拡充|かくじゅう|expansão|substantivo
学術|がくじゅつ|ciência / aprendizado|substantivo
各地|かくち|várias partes do país|substantivo
拡張|かくちょう|expansão / extensão|substantivo
角度|かくど|ângulo|substantivo
学年|がくねん|ano escolar / série escolar|substantivo
学部|がくぶ|departamento (universitário)|substantivo
格別|かくべつ|excepcional|adjetivo
確率|かくりつ|probabilidade|substantivo
学力|がくりょく|conhecimento / aprendizado|substantivo
掛け算|かけざん|multiplicação|substantivo
かけざん|かけざん|multiplicação|substantivo
可決|かけつ|aprovação / adoção|substantivo
火口|かこう|cratera (vulcânica)|substantivo
下降|かこう|descida / queda|substantivo
火山|かざん|vulcão|substantivo
かしこまりました|かしこまりました|Certamente|saudação
貸し出し|かしだし|empréstimo / cessão|substantivo
過失|かしつ|erro / negligência|substantivo
果実|かじつ|fruta|substantivo
貸間|かしま|quarto para alugar|substantivo
貸家|かしや|casa para alugar|substantivo
箇所|かしょ|lugar / ponto|substantivo
かしょ|かしょ|passagem / local|substantivo
過剰|かじょう|excesso / super-|substantivo
かじる|かじる|roer / morder|verbo
課税|かぜい|tributação / imposto|substantivo
カセット|カセット|cassete|substantivo
下線|かせん|sublinhado / sublinhar|substantivo
加速|かそく|aceleração|substantivo
加速度|かそくど|aceleração|substantivo
かたかな|かたかな|katakana|substantivo
かたづく|かたづく|arrumar / resolver|verbo
塊|かたまり|bloco / massa|substantivo
固まる|かたまる|endurecer / solidificar|verbo
片道|かたみち|só de ida|substantivo
傾く|かたむく|inclinar-se / tender|verbo
片寄る|かたよる|ser parcial / inclinar-se|verbo
学科|がっか|matéria de estudo / curso|substantivo
お気の毒に|おきのどくに|Sinto muito|expressão
屋外|おくがい|ao ar livre|substantivo
送り仮名|おくりがな|sufixo em kana|substantivo
お元気で|おげんきで|Cuide-se|expressão
怠る|おこたる|negligenciar / falhar|verbo
押さえる|おさえる|apertar / segurar / pressionar / segurar firme / cobrir / agarrar / prender|verbo
お先に|おさきに|antes de você|expressão
伯父|おじ|tio (mais velho)|substantivo
叔父|おじ|tio (mais novo)|substantivo
惜しい|おしい|lamentável / decepcionante|adjetivo
伯父さん|おじさん|senhor de meia-idade / tio|substantivo
小父さん|おじさん|senhor de meia-idade / tio|substantivo
叔父さん|おじさん|senhor de meia-idade / tio|substantivo
お邪魔します|おじゃまします|Com licença (por incomodar)|expressão
お世話になりました|おせわになりました|Eu estive sob seus cuidados|expressão
お大事に|おだいじに|Cuide-se / Melhoras|expressão
落着く|おちつく|acalmar-se / assentar-se|verbo
お出掛け|おでかけ|passeio|substantivo
お手伝いさん|おてつだいさん|empregada doméstica|substantivo
脅かす|おどかす|ameaçar / coagir|verbo
落し物|おとしもの|objeto perdido|substantivo
驚かす|おどろかす|surpreender / assustar|verbo
お願いします|おねがいします|Por favor (lit., eu peço)|expressão
各々|おのおの|cada / todo / qualquer um|pronome
伯母|おば|tia (mais velha)|substantivo
叔母|おば|tia (mais nova)|substantivo
小母さん|おばさん|senhora / moça|substantivo
おはよう|おはよう|Bom dia|saudação
お参り|おまいり|adoração / visita ao santuário|substantivo
お待たせしました|おまたせしました|Desculpe por fazê-lo esperar|expressão
お待ちください|おまちください|Por favor, espere um momento|expressão
おまちどおさま|おまちどおさま|Desculpe por fazê-lo esperar|expressão
おめでたい|おめでたい|feliz evento / motivo de parabéns|adjetivo
思い掛けない|おもいがけない|inesperado / casual|adjetivo
思い切り|おもいきり|com toda a força / resignação / resolução|substantivo
思い込む|おもいこむ|estar sob a impressão de que / estar convencido de que|verbo
思いっ切り|おもいっきり|muito / completamente|advérbio
思いっきり|おもいっきり|o melhor que se pode / com toda a força|verbo
重たい|おもたい|pesado / maciço / sério|adjetivo
お休み|おやすみ|feriado / ausência / Boa noite|substantivo
おやつ|おやつ|lanche entre refeições / refresco da tarde|substantivo
親指|おやゆび|polegar|substantivo
オルガン|オルガン|órgão|substantivo
恩恵|おんけい|bênção / benefício|substantivo
温室|おんしつ|estufa|substantivo
温泉|おんせん|spa / fonte termal|substantivo
温帯|おんたい|zona temperada|substantivo
御中|おんちゅう|Srs. / Aos cuidados de|partícula
女の人|おんなのひと|mulher|substantivo
カーブ|カーブ|curva / bola curva (beisebol)|substantivo
外～|がい～|estrangeiro ~ / fora ~|expressão
開会|かいかい|abertura de uma reunião|substantivo
会館|かいかん|salão de reuniões / salão de assembléias|substantivo
改札|かいさつ|verificação de bilhetes|substantivo
解散|かいさん|dissolução / término|substantivo
海水浴|かいすいよく|banho de mar / banho de água salgada|substantivo
回数|かいすう|número de vezes / frequência|substantivo
回数券|かいすうけん|carnê de bilhetes|substantivo
改正|かいせい|revisão / emenda / alteração|substantivo
快晴|かいせい|bom tempo|substantivo
基準|きじゅん|padrão, base, critério|substantivo
規準|きじゅん|padrão, base, critério|substantivo
起床|きしょう|levantar, sair da cama|verbo
着せる|きせる|vestir (roupa)|verbo
基礎|きそ|fundação, base|substantivo
基地|きち|base|substantivo
きっかけ|きっかけ|gatilho, deixa, pista|substantivo
切っ掛け|きっかけ|chance, início, deixa, desculpa, motivo, ímpeto, ocasião|substantivo
ぎっしり|ぎっしり|apertado, completamente|advérbio
基盤|きばん|fundação, base|substantivo
客席|きゃくせき|assento de convidado|substantivo
客間|きゃくま|sala de estar, quarto de hóspedes|substantivo
ギャング|ギャング|gangue|substantivo
キャンパス|キャンパス|campus|substantivo
休業|きゅうぎょう|fechamento, paralisação, feriado|substantivo
休講|きゅうこう|aula cancelada|substantivo
給与|きゅうよ|salário|substantivo
休養|きゅうよう|descanso, pausa, recreação|substantivo
清い|きよい|claro, puro, nobre|adjetivo
強化|きょうか|fortalecer, intensificar, reforçar|verbo
境界|きょうかい|limite, fronteira|substantivo
共産～|きょうさん～|comunista ~|adjetivo
行事|ぎょうじ|evento, função|substantivo
恐縮|きょうしゅく|desculpe incomodar|expressão
教養|きょうよう|cultura, educação, sofisticação|substantivo
行列|ぎょうれつ|fila, procissão; matriz (matemática)|substantivo
漁業|ぎょぎょう|pesca (indústria)|substantivo
曲線|きょくせん|curva|substantivo
規律|きりつ|ordem, regras, lei|substantivo
斬る|きる|decapitar, assassinar|verbo
気を付ける|きをつける|ter cuidado, prestar atenção, cuidar|expressão
金魚|きんぎょ|peixe dourado|substantivo
クーラー|クーラー|ar condicionado|substantivo
区域|くいき|zona, distrito, área|substantivo
空～|くう～|vazio ~|adjetivo
偶数|ぐうすう|número par|substantivo
空想|くうそう|sonho acordado, fantasia|substantivo
空中|くうちゅう|céu, ar|substantivo
釘|くぎ|prego|substantivo
区切る|くぎる|pontuar, cortar, demarcar|verbo
櫛|くし|pente|substantivo
くしゃみ|くしゃみ|espirro|substantivo
苦情|くじょう|reclamação, queixa, resmungo|substantivo
苦心|くしん|dor, trabalho árduo|substantivo
屑|くず|lixo, sucata|substantivo
崩す|くずす|destruir, trocar (dinheiro)|verbo
薬指|くすりゆび|dedo anelar|substantivo
崩れる|くずれる|colapsar, desmoronar|verbo
砕く|くだく|quebrar, esmagar|verbo
砕ける|くだける|quebrar, ser quebrado|verbo
くたびれる|くたびれる|ficar cansado, desgastar|verbo
くだらない|くだらない|inútil, estúpido, sem valor|adjetivo
唇|くちびる|lábio|substantivo
口紅|くちべに|batom|substantivo
くっつく|くっつく|aderir a, ficar perto de|verbo
くっつける|くっつける|anexar|verbo
くどい|くどい|verboso, importuno, pesado (sabor)|adjetivo
句読点|くとうてん|pontos de pontuação|substantivo
配る|くばる|distribuir, entregar|verbo
工夫|くふう|dispositivo, artifício, engenhosidade|substantivo
区分|くぶん|divisão, seção, classificação|substantivo
組合せ|くみあわせ|combinação|substantivo
組み立てる|くみたてる|montar, armar, construir|verbo
悔やむ|くやむ|arrepender-se, lamentar|verbo
クリーニング|クリーニング|limpeza, lavagem a seco, lavanderia|substantivo
くるむ|くるむ|ser envolvido, embrulhar|verbo
くれぐれも|くれぐれも|repetidamente, sinceramente, encarecidamente|advérbio
稽古|けいこ|prática, treinamento, estudo|substantivo
敬語|けいご|linguagem honorífica|substantivo
蛍光灯|けいこうとう|lâmpada fluorescente|substantivo
形式|けいしき|forma, formalidade, formato|substantivo
継続|けいぞく|continuação|substantivo
毛糸|けいと|lã para tricô|substantivo
経度|けいど|longitude|substantivo
系統|けいとう|sistema, genealogia|substantivo
芸能|げいのう|entretenimento público, artes cênicas|substantivo
競馬|けいば|corridas de cavalos|substantivo
警備|けいび|defesa, guarda, policiamento, segurança|substantivo
形容詞|けいようし|adjetivo|substantivo
形容動詞|けいようどうし|substantivo adjetival, quasi-adjetivo|substantivo
外科|げか|departamento cirúrgico|substantivo
毛皮|けがわ|pele, couro, pelúcia|substantivo
激増|げきぞう|aumento repentino|substantivo
下車|げしゃ|desembarque, sair (de um veículo)|substantivo
下旬|げじゅん|terceira parte do mês|substantivo
下水|げすい|drenagem, esgoto, vala, sarjeta, sistema de esgoto|substantivo
削る|けずる|cortar pouco a pouco, tirar uma porcentagem|verbo
桁|けた|coluna, viga, dígito|substantivo
下駄|げた|calçado japonês, tamancos de madeira|substantivo
血圧|けつあつ|pressão sanguínea|substantivo
月給|げっきゅう|salário mensal|substantivo
傑作|けっさく|obra-prima, melhor trabalho|substantivo
月末|げつまつ|fim do mês|substantivo
気配|けはい|indicação, sinal, indício|substantivo
下品|げひん|vulgar, indecente, grosseiro|adjetivo
下品(な)|げひん(な)|vulgar|adjetivo
煙い|けむい|enfumaçado|adjetivo
険しい|けわしい|íngreme, acidentado; severo|adjetivo
現～|げん～|presente, em exercício|expressão
見学|けんがく|visita para estudo, observação|substantivo
謙虚|けんきょ|modéstia, humildade|substantivo
原稿|げんこう|manuscrito, cópia|substantivo
原産|げんさん|local de origem|substantivo
原始|げんし|origem, primitivo|substantivo
研修|けんしゅう|treinamento|substantivo
厳重|げんじゅう|rigoroso, severo, firme|adjetivo
謙遜|けんそん|humilde, humildade, modéstia|substantivo
県庁|けんちょう|prefeitura|substantivo
限度|げんど|limite, fronteira|substantivo
現に|げんに|realmente, de fato|advérbio
顕微鏡|けんびきょう|microscópio|substantivo
懸命|けんめい|entusiasmo, esforço|substantivo
原理|げんり|princípio, teoria, verdade fundamental|substantivo
原料|げんりょう|matérias-primas|substantivo
小～|こ～|pequeno ~|expressão
コース|コース|curso|substantivo
コーラス|コーラス|coro|substantivo
恋しい|こいしい|querido, amado; sentir falta|adjetivo
高～|こう～|alto (nível) ~|expressão
工員|こういん|trabalhador de fábrica|substantivo
強引|ごういん|forçoso, assertivo, insistente|adjetivo
公害|こうがい|poluição, perturbação pública|substantivo
高級|こうきゅう|alta classe, primeira qualidade|adjetivo
公共|こうきょう|público, comunitário|substantivo
工芸|こうげい|artes industriais, artesanato|substantivo
孝行|こうこう|piedade filial|substantivo
交差|こうさ|cruzamento, cruzar|substantivo
講師|こうし|palestrante, professor|substantivo
工事|こうじ|obras de construção|substantivo
公式|こうしき|fórmula, formalidade, oficial|substantivo
口実|こうじつ|desculpa, pretexto|substantivo
こうして|こうして|assim, desta forma|advérbio
公衆|こうしゅう|o público|substantivo
香水|こうすい|perfume|substantivo
功績|こうせき|conquistas, mérito|substantivo
光線|こうせん|feixe, raio de luz|substantivo
高層|こうそう|alto, arranha-céu|adjetivo
構造|こうぞう|estrutura, construção|substantivo
交替|こうたい|mudança, alívio, alteração|substantivo
交代|こうたい|alternância, mudança, alívio, revezamento, turno, substituição, revezamento|substantivo
耕地|こうち|terra arável|substantivo
交通機関|こうつうきかん|instalações de transporte|substantivo
校庭|こうてい|pátio escolar|substantivo
肯定|こうてい|positivo, afirmação|substantivo
高度|こうど|altitude, altura; avançado|substantivo
高等|こうとう|alta classe, alta categoria|adjetivo
合同|ごうどう|combinação, incorporação|substantivo
高等学校|こうとうがっこう|escola secundária superior|substantivo
公表|こうひょう|anúncio oficial, proclamação|substantivo
鉱物|こうぶつ|mineral|substantivo
公務|こうむ|assuntos oficiais, negócios públicos|substantivo
項目|こうもく|item, rubrica|substantivo
紅葉|こうよう|cores de outono (das folhas)|substantivo
こうよう もみじ|こうよう もみじ|(maple japonês)|substantivo
合理|ごうり|racional, lógico|adjetivo
交流|こうりゅう|troca; corrente alternada|substantivo
合流|ごうりゅう|confluência, fusão, junção|substantivo
効力|こうりょく|efeito, eficácia|substantivo
焦がす|こがす|queimar, chamuscar|verbo
国王|こくおう|rei|substantivo
こくせき|こくせき|nacionalidade|substantivo
国立|こくりつ|nacional, estadual|adjetivo
ご苦労様|ごくろうさま|Obrigado pelo seu trabalho árduo|saudação
焦げる|こげる|queimar, ser queimado|verbo
凍える|こごえる|congelar, sentir frio, ser congelado|verbo
心当たり|こころあたり|ter conhecimento de, acaso saber|expressão
心得る|こころえる|entender, ter conhecimento completo|verbo
腰掛け|こしかけ|assento, banco|substantivo
腰掛|こしかけ|assento, banco|substantivo
腰掛ける|こしかける|sentar-se|verbo
五十音|ごじゅうおん|silabário japonês|substantivo
こしらえる|こしらえる|fazer, fabricar|verbo
個体|こたい|um indivíduo|substantivo
ごちそうさま|ごちそうさま|Obrigado pela refeição|saudação
こちらこそ|こちらこそ|sou eu quem deveria dizer o mesmo|expressão
小遣い|こづかい|dinheiro de bolso, mesada|substantivo
コック|コック|cozinheiro; torneira|substantivo
こっそり|こっそり|furtivamente, secretamente|advérbio
古典|こてん|clássicos|substantivo
言付ける|ことづける|deixar uma mensagem|verbo
言葉遣い|ことばづかい|discurso, expressão, vocabulário|substantivo
こないだ|こないだ|outro dia, recentemente, ultimamente|advérbio
御無沙汰|ごぶさた|não escrever ou contatar por um tempo|expressão
ゴム|ゴム|chiclete, borracha|substantivo
御免|ごめん|recusando (algo); perdão, desculpe|expressão
ごめんください|ごめんください|Posso entrar?, Tem alguém aí?|expressão
小指|こゆび|dedo mínimo|substantivo
堪える|こらえる|suportar, aguentar, tolerar|verbo
娯楽|ごらく|prazer, diversão, recreação|substantivo
御覧|ごらん|(hon.) olhar, inspeção, tentar|expressão
コレクション|コレクション|coleção; correção|substantivo
転がす|ころがす|rolar|verbo
転がる|ころがる|rolar, cair|verbo
紺|こん|azul marinho, azul escuro|adjetivo
今～|こん～|este, atual|expressão
コンクール|コンクール|concurso (FRE: concours)|substantivo
コンクリート|コンクリート|concreto|substantivo
混合|こんごう|mistura, mistura|substantivo
コンセント|コンセント|consentimento; tomada|substantivo
献立|こんだて|menu|substantivo
こんばんは|こんばんは|boa noite|saudação
サークル|サークル|círculo, clube esportivo (e.g., em uma empresa)|substantivo
再～|さい～|re ~|expressão
最～|さい～|o mais ~|expressão
在学|ざいがく|cursando (escola)|verbo
再三|さいさん|repetidamente, de novo e de novo|advérbio
祭日|さいじつ|feriado nacional, dia de festival|substantivo
催促|さいそく|demanda, urgir (ação), pressionar por|verbo
採点|さいてん|marcação, pontuação|substantivo
災難|さいなん|calamidade, infortúnio|substantivo
裁縫|さいほう|costura|substantivo
材木|ざいもく|madeira, toras|substantivo
サイレン|サイレン|sirene|substantivo
逆さ|さかさ|inverso, de cabeça para baixo|adjetivo
逆様|さかさま|inverso, de cabeça para baixo|adjetivo
捜す|さがす|procurar, buscar, olhar por|verbo
遡る|さかのぼる|voltar, datar de; ascender|verbo
酒場|さかば|bar, salão de bar|substantivo
一昨昨日|さきおととい|anteontem, três dias atrás|advérbio
先程|さきほど|há pouco tempo|advérbio
索引|さくいん|índice, índices|substantivo
作者|さくしゃ|autor, artista|substantivo
削除|さくじょ|eliminação, exclusão|substantivo
作成|さくせい|criação, preparação, fazer|substantivo
作製|さくせい|fabricação, produção|substantivo
探る|さぐる|procurar, buscar, investigar|verbo
囁く|ささやく|sussurrar, murmurar|verbo
匙|さじ|colher|substantivo
座敷|ざしき|sala de tatami|substantivo
差し支え|さしつかえ|obstáculo, impedimento|substantivo
差し引き|さしひき|dedução, saldo|substantivo
刺身|さしみ|peixe cru fatiado|substantivo
流石|さすが|de fato, verdadeiramente, como esperado|advérbio
撮影|さつえい|fotografar|substantivo
雑音|ざつおん|ruído (estridente, áspero)|substantivo
さっさと|さっさと|rapidamente|advérbio
早速|さっそく|imediatamente, sem demora, prontamente|advérbio
錆|さび|ferrugem (cor)|substantivo
錆びる|さびる|enferrujar, tornar-se enferrujado|verbo
座布団|ざぶとん|almofada (japonesa)|substantivo
妨げる|さまたげる|perturbar, prevenir|verbo
さようなら|さようなら|adeus|expressão
サラリーマン|サラリーマン|salaried man, empregado de empresa|substantivo
騒がしい|さわがしい|barulhento|adjetivo
さわやか|さわやか|fresco, refrescante|adjetivo
三角|さんかく|triângulo, triangular|substantivo
算数|さんすう|aritmética|substantivo
産地|さんち|área produtora|substantivo
サンプル|サンプル|amostra|substantivo
山林|さんりん|floresta de montanha|substantivo
シーズン|シーズン|temporada (esportiva)|substantivo
シーツ|シーツ|lençol|substantivo
仕上がる|しあがる|ser finalizado|verbo
明明後日|しあさって|depois de amanhã|substantivo
寺院|じいん|templo|substantivo
しいんと (する)|しいんと (する)|silencioso|adjetivo
自衛|じえい|autodefesa|substantivo
塩辛|しおから|salgado (sabor)|adjetivo
塩辛い|しおからい|salgado (sabor)|adjetivo
司会|しかい|apresentador, presidente|substantivo
しかく しかくい|しかく しかくい|quadrado|adjetivo
四角い|しかくい|quadrado|adjetivo
仕方がない|しかたがない|não pode ser ajudado, é inevitável|expressão
時間割|じかんわり|quadro de horários, horário|substantivo
敷地|しきち|local|substantivo
敷く|しく|espalhar, estender|verbo
茂る|しげる|crescer espesso|verbo
持参|じさん|levar, tomar, carregar|substantivo
磁石|じしゃく|ímã|substantivo
四捨五入|ししゃごにゅう|arredondamento (frações)|substantivo
始終|しじゅう|continuamente, sempre, constantemente|advérbio
自習|じしゅう|autoestudo|substantivo
静まる|しずまる|acalmar-se, acalmar-se|verbo
姿勢|しせい|atitude; postura|substantivo
自然科学|しぜんかがく|ciência natural|substantivo
時速|じそく|velocidade (por hora)|substantivo
子孫|しそん|descendente, prole|substantivo
死体|したい|cadáver|substantivo
下書き|したがき|cópia rascunhada, rascunho|substantivo
自宅|じたく|a própria casa|substantivo
下町|したまち|partes antigas da cidade|substantivo
自治|じち|autogoverno, autonomia|substantivo
室～|しつ～|sala|expressão
実感|じっかん|sentimentos, realização|substantivo
しつこい|しつこい|insistente, teimoso|adjetivo
実習|じっしゅう|prática, treinamento|substantivo
実績|じっせき|realizações, resultados reais|substantivo
執筆|しっぴつ|escrita|substantivo
実物|じつぶつ|uma coisa real|substantivo
しっぽ|しっぽ|cauda (animal)|substantivo
実用|じつよう|uso prático, utilidade|substantivo
実例|じつれい|exemplo, instância|substantivo
しつれいしました (かん)|しつれいしました (かん)|Com licença., Desculpe.|expressão
失恋|しつれん|coração partido, amor não correspondido|substantivo
指定|してい|designação, especificação, atribuição|substantivo
私鉄|してつ|ferrovia privada|substantivo
縛る|しばる|amarrar, ligar|verbo
地盤|じばん|o chão|substantivo
しびれる|しびれる|ficar dormente|verbo
紙幣|しへい|dinheiro em papel, notas, contas|substantivo
学会|がっかい|conferência acadêmica|substantivo
学級|がっきゅう|turma / classe|substantivo
担ぐ|かつぐ|carregar (nos ombros)|verbo
括弧|かっこ|parênteses / colchetes|substantivo
活字|かつじ|tipo de impressão|substantivo
勝手に|かってに|arbitrariamente / por conta própria|advérbio
活力|かつりょく|vitalidade / energia|substantivo
仮名|かな|kana|substantivo
仮名遣い|かなづかい|ortografia kana / escrita silábica|substantivo
加熱|かねつ|aquecimento|substantivo
兼ねる|かねる|servir a duas ou mais funções simultaneamente|verbo
カバー|カバー|capa (ex: de livro)|substantivo
過半数|かはんすう|maioria|substantivo
かび (～がはえる)|かび (～がはえる)|mofo, bolor|substantivo
被せる|かぶせる|cobrir (com algo)|verbo
釜|かま|panela de ferro / chaleira|substantivo
構いません|かまいません|não me importo / está tudo bem|expressão
紙屑|かみくず|papel de sucata|substantivo
神様|かみさま|deus|substantivo
剃刀|かみそり|lâmina de barbear|substantivo
ガム|ガム|chiclete|substantivo
貨物|かもつ|carga / frete|substantivo
カラー|カラー|colarinho / cor|substantivo
からかう|からかう|ridicularizar / zombar de|verbo
空っぽ|からっぽ|vazio / oco|substantivo
かるた|かるた|baralho de cartas|substantivo
枯れる|かれる|murchar / morrer (planta)|verbo
カロリー|カロリー|caloria|substantivo
可愛がる|かわいがる|amar / ser afetuoso|verbo
為替|かわせ|ordem de pagamento / câmbio|substantivo
瓦|かわら|telha|substantivo
換気|かんき|ventilação|substantivo
感激|かんげき|emoção profunda / impressão / inspiração|substantivo
関西|かんさい|Kansai (meia sudoeste do Japão)|substantivo
元日|がんじつ|Dia de Ano Novo|substantivo
鑑賞|かんしょう|apreciação|substantivo
感ずる|かんずる|sentir / perceber|verbo
間接|かんせつ|indireto / indireção|adjetivo
観測|かんそく|observação|substantivo
寒帯|かんたい|zona frigida|substantivo
勘違い|かんちがい|mal-entendido / erro de cálculo|substantivo
官庁|かんちょう|escritório governamental / autoridades|substantivo
缶詰|かんづめ|conserva / enlatado|substantivo
乾電池|かんでんち|pilha seca / bateria|substantivo
関東|かんとう|Kanto (meia leste do Japão)|substantivo
観念|かんねん|ideia / noção; senso|substantivo
乾杯|かんぱい|Saúde! (um brinde)|saudação
看板|かんばん|sinal / placa|substantivo
看病|かんびょう|enfermagem (de um paciente)|substantivo
冠|かんむり|coroa / grinalda|substantivo
漢和|かんわ|caractere chinês-japonês (ex: dicionário)|substantivo
気圧|きあつ|pressão atmosférica|substantivo
着替え|きがえ|troca de roupa / muda de roupa|substantivo
着替える|きがえる|trocar de roupa|verbo
機関車|きかんしゃ|locomotiva / motor|substantivo
飢饉|ききん|fome / escassez|substantivo
器具|きぐ|instrumento|substantivo
記号|きごう|símbolo / código|substantivo
刻む|きざむ|picar / esculpir / gravar|verbo
儀式|ぎしき|cerimônia / rito / ritual|substantivo
しぼむ|しぼむ|murchar / definhar|verbo
萎む|しぼむ|murchar / definhar|verbo
絞る|しぼる|apertar / espremer|verbo
縞|しま|risca / listra|substantivo
しみじみ|しみじみ|profundamente / intensamente / com razão|advérbio
氏名|しめい|nome completo|substantivo
締切|しめきり|prazo / data limite|substantivo
締め切り|しめきり|prazo / data limite / fechamento / fim|substantivo
締め切る|しめきる|fechar / cancelar|verbo
しめた (かん)|しめた (かん)|entendi / certo / bom|expressão
しめる|しめる|estar molhado / ficar molhado|verbo
地面|じめん|solo / terra / superfície da terra|substantivo
ジャーナリスト|ジャーナリスト|jornalista|substantivo
社会科学|しゃかいかがく|ciência social|substantivo
しゃがむ|しゃがむ|agachar / ajoelhar|verbo
蛇口|じゃぐち|torneira|substantivo
弱点|じゃくてん|ponto fraco / fraqueza|substantivo
車庫|しゃこ|garagem / galpão de carros|substantivo
車掌|しゃしょう|condutor (de trem)|substantivo
写生|しゃせい|esboço / desenho da natureza|substantivo
社説|しゃせつ|editorial|substantivo
しゃっくり|しゃっくり|soluço|substantivo
シャッター|シャッター|obturador|substantivo
しゃぶる|しゃぶる|sugar / chupar / mascar|verbo
車輪|しゃりん|roda (de carro)|substantivo
洒落|しゃれ|piada / trocadilho / gracejo|substantivo
じゃんけん|じゃんけん|jogo de pedra, papel, tesoura|expressão
重～|じゅう～|pesado ~|expressão
集会|しゅうかい|reunião / assembleia|substantivo
住居|じゅうきょ|moradia / casa / residência / endereço|substantivo
集金|しゅうきん|cobrança de dinheiro|substantivo
集合|しゅうごう|reunião / assembleia|substantivo
習字|しゅうじ|caligrafia|substantivo
修繕|しゅうぜん|reparo / conserto|substantivo
じゅうたん (カーペット)|じゅうたん (カーペット)|tapete|substantivo
終点|しゅうてん|estação final / última parada (de trem)|substantivo
重点|じゅうてん|ponto importante / enfatizar / ênfase|substantivo
就任|しゅうにん|inauguração / assunção de cargo|substantivo
周辺|しゅうへん|circunferência / periférico|substantivo
重役|じゅうやく|diretor / executivo sênior|substantivo
終了|しゅうりょう|fim / encerramento / término|substantivo
重量|じゅうりょう|peso pesado|substantivo
重力|じゅうりょく|gravidade|substantivo
熟語|じゅくご|idioma / composto de kanji|substantivo
祝日|しゅくじつ|feriado nacional|substantivo
縮小|しゅくしょう|redução / encurtamento|substantivo
受験|じゅけん|prestar um exame / fazer um exame|substantivo
主語|しゅご|sujeito (gramatical)|substantivo
主人|しゅじん|marido (de alguém)|substantivo
出勤|しゅっきん|ir para o trabalho / estar no trabalho|substantivo
述語|じゅつご|predicado|substantivo
出張|しゅっちょう|viagem oficial / viagem de negócios|substantivo
寿命|じゅみょう|expectativa de vida / tempo de vida|substantivo
主役|しゅやく|papel principal / papel de destaque|substantivo
受話器|じゅわき|aparelho (de telefone)|substantivo
循環|じゅんかん|circulação / rotação / ciclo|substantivo
巡査|じゅんさ|policial|substantivo
順々|じゅんじゅん|em ordem / por vez|advérbio
順序|じゅんじょ|ordem / sequência / procedimento|substantivo
純情|じゅんじょう|coração puro / ingenuidade|substantivo
純粋|じゅんすい|puro / genuíno / sem misturas|adjetivo
初～|しょ～|primeiro ~|expressão
諸～|しょ～|vários ~|expressão
女～|じょ～|coisas feitas por mulheres|expressão
省～|しょう～|economizando ~|expressão
消化|しょうか|digestão|substantivo
小学生|しょうがくせい|aluno do ensino fundamental|substantivo
しょうがない|しょうがない|Não vale a pena ~|expressão
将棋|しょうぎ|xadrez japonês|substantivo
蒸気|じょうき|vapor / névoa|substantivo
定規|じょうぎ|régua (de medição)|substantivo
上級|じょうきゅう|nível avançado / alta categoria / sênior|substantivo
商業|しょうぎょう|comércio / negócio|substantivo
消極的|しょうきょくてき|passivo|adjetivo
賞金|しょうきん|prêmio em dinheiro / recompensa monetária|substantivo
上下|じょうげ|alto e baixo / para cima e para baixo|substantivo
障子|しょうじ|porta deslizante de papel|substantivo
商社|しょうしゃ|empresa comercial|substantivo
乗車|じょうしゃ|pegar um trem / embarcar|substantivo
上旬|じょうじゅん|primeiros 10 dias do mês|substantivo
小数|しょうすう|fração / decimal|substantivo
生ずる|しょうずる|causar / surgir / ser gerado|verbo
商店|しょうてん|loja / firma comercial|substantivo
焦点|しょうてん|foco / ponto|substantivo
消毒|しょうどく|desinfecção|substantivo
勝敗|しょうはい|vitória ou derrota / resultado (de batalha)|substantivo
蒸発|じょうはつ|evaporação; desaparecimento inexplicável|substantivo
上品|じょうひん|refinado / elegante / bem-educado|adjetivo
勝負|しょうぶ|vitória ou derrota / jogo|substantivo
小便|しょうべん|urina / mijar (coloquial)|substantivo
消防署|しょうぼうしょ|quartel de bombeiros|substantivo
正味|しょうみ|líquido (peso)|substantivo
正面|しょうめん|frente|substantivo
消耗|しょうもう|exaustão / consumo|substantivo
初級|しょきゅう|nível elementar|substantivo
助教授|じょきょうじゅ|professor assistente|substantivo
食塩|しょくえん|sal de cozinha|substantivo
職人|しょくにん|artesão / artesão|substantivo
職場|しょくば|local de trabalho|substantivo
初旬|しょじゅん|primeiros 10 dias do mês|substantivo
書籍|しょせき|livro / publicação|substantivo
食器|しょっき|utensílios de mesa|substantivo
ショップ|ショップ|uma loja|substantivo
書店|しょてん|livraria|substantivo
書道|しょどう|caligrafia|substantivo
初歩|しょほ|elementos / rudimentos|substantivo
白髪|しらが|cabelo branco ou grisalho / clareamento de cabelo da moda|substantivo
シリーズ|シリーズ|série|substantivo
知り合い|しりあい|conhecido|substantivo
私立|しりつ|privado (estabelecimento)|adjetivo
資料|しりょう|materiais / dados|substantivo
汁|しる|suco / sopa|substantivo
素人|しろうと|leigo / amador / novato|substantivo
しわ (かおの～)|しわ (かおの～)|rugas / vincos|substantivo
芯|しん|núcleo / coração / pavio|substantivo
新幹線|しんかんせん|Shinkansen / "Trem Bala"|substantivo
真空|しんくう|vácuo|substantivo
人事|じんじ|recursos humanos / gestão de pessoal|substantivo
心身|しんしん|mente e corpo|substantivo
信ずる|しんずる|acreditar|verbo
申請|しんせい|aplicação, pedido, petição|substantivo
人造|じんぞう|feito pelo homem, sintético, artificial|adjetivo
寝台|しんだい|cama|substantivo
診断|しんだん|diagnóstico|substantivo
侵入|しんにゅう|invasão, ataque, invasão|substantivo
人文科学|じんぶんかがく|ciências sociais, humanidades|substantivo
人命|じんめい|vida (humana)|substantivo
深夜|しんや|tarde da noite|substantivo
森林|しんりん|floresta, bosque|substantivo
親類|しんるい|parente(s)|substantivo
針路|しんろ|curso, direção|substantivo
神話|しんわ|mito, lenda|substantivo
水産|すいさん|produtos marinhos, pesca|substantivo
炊事|すいじ|cozinhar|substantivo
水蒸気|すいじょうき|vapor d'água, vapor|substantivo
水素|すいそ|hidrogênio|substantivo
垂直|すいちょく|vertical, perpendicular|adjetivo
推定|すいてい|presunção, suposição, estimativa|substantivo
水滴|すいてき|gota d'água|substantivo
水筒|すいとう|cantil, frasco, garrafa de água|substantivo
随筆|ずいひつ|ensaios, escritos diversos|substantivo
水分|すいぶん|umidade|substantivo
水平|すいへい|nível, horizontal|adjetivo
水平線|すいへいせん|horizonte|substantivo
水面|すいめん|superfície da água|substantivo
水曜|すいよう|quarta-feira|substantivo
図々しい|ずうずうしい|atrevido, sem vergonha|adjetivo
ずうっと|ずうっと|o tempo todo, todo o caminho|advérbio
末っ子|すえっこ|filho mais novo|substantivo
スカーフ|スカーフ|lenço|substantivo
図鑑|ずかん|livro ilustrado|substantivo
隙|すき|momento de descuido, chance|substantivo
杉|すぎ|cedro japonês|substantivo
好き嫌い|すききらい|gostos e desgostos, gosto|substantivo
好き好き|すきずき|questão de gosto|substantivo
透き通る|すきとおる|ser (ficar) transparente|verbo
隙間|すきま|rachadura, fenda, abertura|substantivo
スクール|スクール|escola|substantivo
少なくとも|すくなくとも|pelo menos|advérbio
図形|ずけい|figura|substantivo
鈴|すず|sino|substantivo
涼む|すずむ|refrescar-se|verbo
スタート|スタート|começo|substantivo
スチュワーデス|スチュワーデス|aeromoça|substantivo
すっきり|すっきり|elegante, claro, arrumado|adjetivo
ステージ|ステージ|palco; apresentação|substantivo
ストッキング|ストッキング|meias|substantivo
ストップ|ストップ|parar|substantivo
素直|すなお|obediente, dócil, manso|adjetivo
頭脳|ずのう|cabeça, cérebro, intelecto|substantivo
スピーカー|スピーカー|alto-falante|substantivo
図表|ずひょう|gráfico, diagrama, gráfico|substantivo
スマート|スマート|inteligente, estiloso, esbelto|adjetivo
住まい|すまい|moradia, casa|substantivo
すまない|すまない|desculpe|expressão
相撲|すもう|sumô|substantivo
スライド|スライド|slide|substantivo
ずらす|ずらす|adiar, atrasar|verbo
ずらり|ずらり|em fila, em linha|advérbio
スリッパ|スリッパ|chinelos|substantivo
狡い|ずるい|astuto / esperto / traiçoeiro|adjetivo
寸法|すんぽう|medida / tamanho / dimensão|substantivo
税関|ぜいかん|alfândega|substantivo
製作|せいさく|fabricação / produção|substantivo
制作|せいさく|obra (ex: filme, livro)|substantivo
清書|せいしょ|cópia limpa|substantivo
青少年|せいしょうねん|juventude / jovem|substantivo
整数|せいすう|inteiro|substantivo
清掃|せいそう|limpeza|substantivo
生存|せいぞん|existência / ser / sobrevivência|substantivo
政党|せいとう|partido político|substantivo
性能|せいのう|capacidade / habilidade|substantivo
整備|せいび|manutenção / revisão|substantivo
成分|せいぶん|ingrediente / componente / composição|substantivo
性別|せいべつ|sexo / gênero|substantivo
正方形|せいほうけい|quadrado|substantivo
正門|せいもん|portão principal / entrada principal|substantivo
成立|せいりつ|formação / estabelecimento / conclusão|substantivo
西暦|せいれき|Era Cristã / depois (de Cristo) (A.D.)|substantivo
背負う|せおう|carregar nas costas ou ombros / ser sobrecarregado com|verbo
赤道|せきどう|equador|substantivo
折角|せっかく|com esforço / com grande cuidado / muito esperado|advérbio
接近|せっきん|aproximação / chegada|substantivo
接する|せっする|atender / associar-se|verbo
せっせと|せっせと|arduamente / ativamente|advérbio
接続|せつぞく|conexão / união / junção / ligação; troca de trens|substantivo
瀬戸物|せともの|cerâmica / louça / porcelana|substantivo
ぜひとも|ぜひとも|de qualquer forma / por todos os meios (com o sentido de não aceitar 'não' como resposta)|advérbio
迫る|せまる|aproximar-se / pressionar|verbo
ゼミ|ゼミ|seminário|substantivo
せめて|せめて|pelo menos|advérbio
セメント|セメント|cimento|substantivo
台詞|せりふ|discurso / falas / falas de alguém / observações|substantivo
栓|せん|tampa / rolha / torneira|substantivo
前～|ぜん～|ex- / último ~ / passado ~|expressão
前後|ぜんご|frente e verso / antes e depois|substantivo
全集|ぜんしゅう|obras completas|substantivo
扇子|せんす|leque dobrável|substantivo
専制|せんせい|despotismo / autocracia|substantivo
先々月|せんせんげつ|mês retrasado|substantivo
先々週|せんせんしゅう|duas semanas antes|substantivo
先祖|せんぞ|ancestral / antepassado|substantivo
先端|せんたん|ponta / extremidade pontiaguda|substantivo
センチ|センチ|centímetro|contador
先頭|せんとう|cabeça / liderança / vanguarda|substantivo
全般|ぜんぱん|todo / geral|adjetivo
扇風機|せんぷうき|ventilador elétrico|substantivo
洗面|せんめん|lavar o rosto / refrescar-se|substantivo
全力|ぜんりょく|toda a força / toda a energia|substantivo
線路|せんろ|linha / trilho / leito de estrada|substantivo
総～|そう～|bruto / geral / inteiro|expressão
相違|そうい|diferença / discrepância / variação|substantivo
そういえば|そういえば|aliás / o que me lembra...|conector
雑巾|ぞうきん|pano de chão / pano de poeira|substantivo
増減|ぞうげん|aumento e diminuição / flutuação|substantivo
倉庫|そうこ|armazém / depósito|substantivo
相互|そうご|mútuo / recíproco|adjetivo
創作|そうさく|produção / criação / obra|substantivo
葬式|そうしき|funeral|substantivo
造船|ぞうせん|construção naval|substantivo
騒々しい|そうぞうしい|barulhento, ruidoso / desordoroso|adjetivo
増大|ぞうだい|aumento, crescimento|substantivo
そうっと|そうっと|suavemente, cautelosamente, gentilmente|advérbio
送別|そうべつ|despedida, adeus|substantivo
草履|ぞうり|sandálias japonesas (calçado)|substantivo
総理大臣|そうりだいじん|Primeiro-Ministro|substantivo
送料|そうりょう|frete, porte|substantivo
属する|ぞくする|pertencer a, estar sob|verbo
続々|ぞくぞく|sucessivamente, um após o outro|advérbio
速達|そくたつ|expresso, entrega especial|substantivo
測定|そくてい|medição|substantivo
測量|そくりょう|medição, levantamento|substantivo
速力|そくりょく|velocidade|substantivo
素質|そしつ|talento, capacidade|substantivo
祖先|そせん|ancestral(is)|substantivo
そそっかしい|そそっかしい|descuidado, desajeitado|adjetivo
卒直|そっちょく|franco, sincero, honesto|adjetivo
率直|そっちょく|franco, sincero, direto, aberto, direto, falador|adjetivo
そのころ|そのころ|naqueles dias, naquela época, então|advérbio
そのため|そのため|daí, por essa razão|conector
その他|そのほか|além disso, ademais|conector
剃る|そる|barbear|verbo
それなのに|それなのに|embora, ainda que|conector
それなら|それなら|Se for esse o caso..., Se assim for..., Sendo assim...|expressão
それはいけませんね (かん)|それはいけませんね (かん)|isso não é bom|expressão
逸れる|それる|desviar-se (mudar) de assunto, perder-se|verbo
算盤|そろばん|ábaco|substantivo
存じる|ぞんじる|saber (humilde)|verbo
存ずる|ぞんずる|saber (humilde)|verbo
損得|そんとく|perda e ganho, vantagem e desvantagem|substantivo
第～|だい～|º|contador
タイア|タイア|pneu|substantivo
だいいち (とりわけ)|だいいち (とりわけ)|primeiro, primordial, #1|advérbio
大学院|だいがくいん|pós-graduação, mestrado|substantivo
大工|だいく|carpinteiro|substantivo
体系|たいけい|sistema, organização|substantivo
太鼓|たいこ|tambor, pandeiro|substantivo
対策|たいさく|contraplano, contramedida|substantivo
大して|たいして|muito (não tão), muito (não)|advérbio
大小|だいしょう|tamanho|substantivo
体制|たいせい|ordem, sistema, estrutura|substantivo
体積|たいせき|capacidade, volume|substantivo
大層|たいそう|muito, grandemente|advérbio
体操|たいそう|ginástica, exercícios físicos, calistenia|substantivo
大木|たいぼく|árvore grande|substantivo
代名詞|だいめいし|pronome|substantivo
ダイヤグラム|ダイヤグラム|diagrama|substantivo
ダイヤモンド|ダイヤモンド|diamante|substantivo
ダイヤル|ダイヤル|dial|substantivo
対立|たいりつ|confronto, oposição, antagonismo|substantivo
田植え|たうえ|plantio de arroz|substantivo
絶えず|たえず|constantemente|advérbio
楕円|だえん|elipse|substantivo
耕す|たがやす|arar, lavrar, cultivar|verbo
滝|たき|cachoeira|substantivo
蓄える|たくわえる|economizar, armazenar, estocar|verbo
竹|たけ|bambu|substantivo
ただいま|ただいま|Estou em casa!|saudação
但し|ただし|mas, porém, desde que|conector
立ち止まる|たちどまる|parar, deter-se, ficar parado|verbo
たちまち|たちまち|instantaneamente, subitamente, de uma vez|advérbio
脱線|だっせん|descaracterização, digressão|substantivo
妥当|だとう|apropriado, adequado|adjetivo
例える|たとえる|comparar, assemelhar|verbo
頼もしい|たのもしい|confiável, promissor|adjetivo
ダブル|ダブル|duplo|adjetivo
ダム|ダム|barragem|substantivo
溜息|ためいき|suspiro|substantivo
ためらう|ためらう|hesitar|verbo
だらしない|だらしない|desleixado, solto|adjetivo
足る|たる|ser suficiente, ser bastante|verbo
短～|たん～|curto ~|expressão
段階|だんかい|graduação, estágio|substantivo
短期|たんき|curto prazo|substantivo
炭鉱|たんこう|mina de carvão|substantivo
短所|たんしょ|defeito, ponto fraco|substantivo
たんす|たんす|cômoda, guarda-roupa|substantivo
淡水|たんすい|água doce|substantivo
断水|だんすい|interrupção de água|substantivo
単数|たんすう|singular|substantivo
団地|だんち|complexo habitacional|substantivo
断定|だんてい|conclusão, decisão|substantivo
短編|たんぺん|curto (ex: história, filme)|adjetivo
田ぼ|たんぼ|campo de arroz|substantivo
誓う|ちかう|jurar, prometer|verbo
地下水|ちかすい|água subterrânea|substantivo
近々|ちかぢか|em breve, logo|advérbio
近付ける|ちかづける|aproximar, colocar perto|verbo
近寄る|ちかよる|aproximar-se, chegar perto|verbo
力強い|ちからづよい|poderoso, forte, vigoroso|adjetivo
ちぎる|ちぎる|rasgar, picar (fruta)|verbo
地質|ちしつ|geológico|substantivo
知人|ちじん|conhecido, amigo|substantivo
地帯|ちたい|área, zona|substantivo
縮む|ちぢむ|encolher, ser contraído|verbo
縮める|ちぢめる|encurtar, reduzir, encolher|verbo
縮れる|ちぢれる|ser ondulado, ser cacheado|verbo
チップ|チップ|gorjeta; chip|substantivo
地点|ちてん|local, ponto num mapa|substantivo
地名|ちめい|nome de lugar|substantivo
茶色い|ちゃいろい|marrom|adjetivo
着々|ちゃくちゃく|constantemente, firmemente|advérbio
中間|ちゅうかん|meio, intermediário|substantivo
中旬|ちゅうじゅん|meados do mês|substantivo
抽象|ちゅうしょう|abstrato|adjetivo
中世|ちゅうせい|Idade Média, medieval|substantivo
中性|ちゅうせい|gênero neutro, neutro|substantivo
中途|ちゅうと|no meio, a meio caminho|advérbio
中年|ちゅうねん|meia-idade|substantivo
チョーク|チョーク|giz|substantivo
長～|ちょう～|longo ~|expressão
超過|ちょうか|excesso, ser mais que|substantivo
彫刻|ちょうこく|escultura, entalhe, gravura|substantivo
長所|ちょうしょ|ponto forte, mérito|substantivo
長女|ちょうじょ|filha mais velha|substantivo
調整|ちょうせい|regulação, ajuste, afinação|substantivo
調節|ちょうせつ|regulação, ajuste, controle|substantivo
長短|ちょうたん|comprimento, longo e curto|substantivo
頂点|ちょうてん|topo, cume|substantivo
長男|ちょうなん|filho mais velho|substantivo
長方形|ちょうほうけい|retângulo / oblongo|substantivo
調味料|ちょうみりょう|condimento / tempero|substantivo
直後|ちょくご|imediatamente após|expressão
直線|ちょくせん|linha reta|substantivo
直前|ちょくぜん|pouco antes|expressão
直通|ちょくつう|conexão direta|substantivo
直流|ちょくりゅう|corrente contínua|substantivo
貯蔵|ちょぞう|armazenamento / preservação|substantivo
直角|ちょっかく|ângulo reto|substantivo
直径|ちょっけい|diâmetro|substantivo
散らかす|ちらかす|espalhar / desarrumar|verbo
散らかる|ちらかる|estar desarrumado / estar em desordem|verbo
塵紙|ちりがみ|papel higiênico / lenço de papel|substantivo
追加|ついか|adição / suplemento|substantivo
ついで|ついで|oportunidade / ocasião|substantivo
つうか|つうか|moeda / curso|substantivo
通ずる|つうずる|conduzir / levar a|verbo
通知|つうち|aviso / notificação|substantivo
通帳|つうちょう|livreto bancário|substantivo
通用|つうよう|uso popular / circulação|substantivo
通路|つうろ|corredor / passagem|substantivo
突き当たり|つきあたり|fim (de rua)|substantivo
突き当たる|つきあたる|dar de cara com / colidir com|verbo
月日|つきひ|tempo / dias e noites|substantivo
突っ込む|つっこむ|mergulhar em / enfiar|verbo
務める|つとめる|servir / atuar|verbo
努める|つとめる|tentar / esforçar-se|verbo
綱|つな|corda|substantivo
繋がり|つながり|conexão / ligação|substantivo
粒|つぶ|grão / partícula|substantivo
潰す|つぶす|esmagar / desperdiçar|verbo
潰れる|つぶれる|ser esmagado / ir à falência|verbo
つまずく|つまずく|tropeçar|verbo
躓く|つまずく|tropeçar / esbarrar|verbo
詰まる|つまる|estar bloqueado / estar cheio|verbo
爪|つめ|unha|substantivo
艶|つや|brilho / verniz|substantivo
強気|つよき|firme / forte|adjetivo
釣り合う|つりあう|equilibrar-se / harmonizar-se|verbo
吊る|つる|pendurar|verbo
吊す|つるす|pendurar|verbo
テーマ|テーマ|tema / tópico|substantivo
手洗い|てあらい|banheiro / lavatório|substantivo
低～|てい～|baixo ~|expressão
定員|ていいん|capacidade / número fixo de pessoal|substantivo
定価|ていか|preço estabelecido|substantivo
低下|ていか|queda / declínio|substantivo
定期券|ていきけん|passe de estudante / bilhete de temporada|substantivo
定休日|ていきゅうび|dia de folga regular|substantivo
停止|ていし|suspensão / interrupção|substantivo
停車|ていしゃ|parada (de trem)|substantivo
出入り|でいり|ida e vinda / movimento|substantivo
出入口|でいりぐち|entrada e saída|substantivo
出入り口|でいりぐち|entrada e saída|substantivo
手入れ|ていれ|reparos / manutenção|substantivo
出来上がり|できあがり|pronto / acabado|expressão
出来上がる|できあがる|estar pronto / estar acabado|verbo
的確|てきかく|preciso / exato|adjetivo
適確|てきかく|preciso / exato|adjetivo
手首|てくび|pulso|substantivo
凸凹|でこぼこ|irregularidade / aspereza / rugosidade|substantivo
手頃|てごろ|moderado / prático|adjetivo
手ごろ|てごろ|prático / conveniente / razoável|adjetivo
弟子|でし|aluno / discípulo / aprendiz|substantivo
でたらめ|でたらめ|bobagem / aleatório|substantivo
手帳|てちょう|caderno|substantivo
鉄橋|てっきょう|ponte de ferro|substantivo
手続き|てつづき|procedimento / formalidade|substantivo
鉄砲|てっぽう|arma / espingarda|substantivo
テニスコート|テニスコート|quadra de tênis|substantivo
手拭い|てぬぐい|toalha de banho|substantivo
手前|てまえ|antes / este lado|advérbio
出迎え|でむかえ|recepção / encontro|substantivo
出迎える|でむかえる|encontrar / cumprimentar|verbo
照らす|てらす|iluminar / brilhar sobre|verbo
照る|てる|brilhar|verbo
展開|てんかい|desenvolvimento / expansão|substantivo
伝記|でんき|biografia|substantivo
電球|でんきゅう|lâmpada|substantivo
点数|てんすう|pontos / nota / placar|substantivo
伝染|でんせん|contágio|substantivo
電池|でんち|bateria|substantivo
電柱|でんちゅう|poste de telefone / poste de luz|substantivo
点々|てんてん|aqui e ali / pouco a pouco|advérbio
転々|てんてん|de um para outro|advérbio
天皇|てんのう|Imperador do Japão|substantivo
電波|でんぱ|onda eletromagnética|substantivo
テンポ|テンポ|ritmo|substantivo
電流|でんりゅう|corrente elétrica|substantivo
電力|でんりょく|energia elétrica|substantivo
問い合わせ|といあわせ|inquérito / consulta|substantivo
銅|どう|cobre|substantivo
同～|どう～|mesmo ~|expressão
どういたしまして (かん)|どういたしまして (かん)|de nada|saudação
統一|とういつ|unidade / consolidação|substantivo
同格|どうかく|mesmo ranking / igualdade|substantivo
峠|とうげ|cume / passagem (de montanha)|substantivo
統計|とうけい|estatísticas|substantivo
動作|どうさ|ação / movimento|substantivo
東西|とうざい|Leste e Oeste / país inteiro|substantivo
当日|とうじつ|dia designado / o próprio dia|substantivo
投書|とうしょ|carta ao editor / contribuição|substantivo
登場|とうじょう|entrada (em palco)|substantivo
どうせ|どうせ|de qualquer forma / de qualquer maneira|advérbio
灯台|とうだい|farol|substantivo
盗難|とうなん|roubo / furto|substantivo
当番|とうばん|estar de plantão|substantivo
等分|とうぶん|divisão em partes iguais|substantivo
透明|とうめい|transparência / limpeza|substantivo
灯油|とうゆ|querosene / óleo de lamparina|substantivo
童話|どうわ|conto de fadas|substantivo
通り掛かる|とおりかかる|passar por acaso|verbo
溶かす|とかす|derreter / dissolver|verbo
尖る|とがる|afilar / ficar pontudo|verbo
どきどき|どきどき|palpitação / bater rápido|advérbio
特殊|とくしゅ|especial / único|adjetivo
特色|とくしょく|característica / destaque|substantivo
特定|とくてい|específico / particular|adjetivo
特売|とくばい|promoção especial|substantivo
溶け込む|とけこむ|derreter em / se tornar parte de|verbo
退ける|どける|desalojar, afastar|verbo
床の間|とこのま|alcova|substantivo
所々|ところどころ|aqui e ali, em algumas partes|expressão
都心|としん|coração da cidade|substantivo
戸棚|とだな|armário, despensa|substantivo
とっくに|とっくに|há muito tempo, já|advérbio
どっと|どっと|subitamente, de repente|advérbio
整う|ととのう|estar preparado, estar em ordem, estar arrumado|verbo
留まる|とどまる|estar fixo; permanecer, ficar (no mesmo lugar)|verbo
怒鳴る|どなる|gritar, berrar|verbo
殿|どの|Senhor (principalmente ao dirigir-se a alguém em um envelope)|substantivo
飛び込む|とびこむ|pular para dentro, saltar para dentro, mergulhar em|verbo
ともかく|ともかく|de qualquer forma, de qualquer maneira,Anyway|conector
捕える|とらえる|agarrar, capturar, prender|verbo
取り入れる|とりいれる|colher, receber, adotar|verbo
取り消す|とりけす|cancelar|verbo
取り出す|とりだす|tirar, pegar|verbo
採る|とる|adotar (medida, proposta); colher (fruta)|verbo
捕る|とる|pegar, capturar (peixe)|verbo
丼|どんぶり|tigela de porcelana, tigela de arroz com comida por cima|substantivo
内科|ないか|clínica de internista, medicina interna|substantivo
内線|ないせん|extensão telefônica|substantivo
ナイロン|ナイロン|nylon|substantivo
仲直り|なかなおり|reconciliação, fazer as pazes com|substantivo
長引く|ながびく|ser prolongado, arrastar-se|verbo
中指|なかゆび|dedo médio|substantivo
仲良し|なかよし|amigo íntimo, amigo do peito|substantivo
慰める|なぐさめる|consolar, acalentar|verbo
為す|なす|realizar, fazer|verbo
謎謎|なぞなぞ|charada|substantivo
傾らか|なだらか|gradual, suave|adjetivo
懐かしい|なつかしい|querido, desejado, sentido falta|adjetivo
撫でる|なでる|escovar suavemente, acariciar|verbo
斜め|ななめ|diagonal, oblíquo|adjetivo
なにしろ|なにしろ|de qualquer forma, em qualquer caso|conector
何しろ|なにしろ|em qualquer caso, de qualquer forma, como você sabe, pois você vê, particularmente|conector
何々|なになに|tal e tal, O quê?|expressão
何分|なにぶん|por todos os meios, por favor|expressão
生意気|なまいき|impertinente, insolente|adjetivo
生意気な|なまいきな|impertinente, atrevido, cínico, insolente, audacioso, arrogante, petulante, brash|adjetivo
並木|なみき|árvore na beira da estrada, fileira de árvores|substantivo
倣う|ならう|imitar, seguir, emular|verbo
南極|なんきょく|polo sul, Antártico|substantivo
なんとなく|なんとなく|de alguma forma ou de outra, por uma razão ou outra|advérbio
なんとも|なんとも|nada (com verbo neg.; bastante, nem um pouco)|advérbio
何とも|なんとも|realmente, muito, extremamente, terrivelmente, terrivelmente (não) nada, (não) de todo, (não) um pouco|advérbio
ナンバー|ナンバー|número|substantivo
南米|なんべい|América do Sul|substantivo
南北|なんぼく|sul e norte|substantivo
匂う|におう|ser fragrante, cheirar|verbo
逃がす|にがす|soltar, libertar, deixar escapar|verbo
憎い|にくい|odiável, abominável, detestável|adjetivo
憎む|にくむ|odiar, detestar|verbo
憎らしい|にくらしい|odioso, odioso|adjetivo
にこにこ|にこにこ|sorrir docemente, sorridente|advérbio
濁る|にごる|tornar-se lamacento, ficar turvo|verbo
虹|にじ|arco-íris|substantivo
日時|にちじ|data e hora|substantivo
日用品|にちようひん|necessidades diárias|substantivo
日課|にっか|trabalho diário, rotina diária|substantivo
薄める|うすめる|diluir / adiguar|verbo
打合せ|うちあわせ|reunião de negócios / arranjo prévio|substantivo
打ち消す|うちけす|negar / anular|verbo
うどん|うどん|udon (macarrão japonês)|substantivo
うなずく|うなずく|acenar|verbo
敬う|うやまう|respeitar / honrar|verbo
裏返す|うらがえす|virar do avesso / virar|verbo
裏口|うらぐち|porta dos fundos / entrada dos fundos|substantivo
占う|うらなう|prever / adivinhar|verbo
恨み|うらみ|ressentimento|substantivo
恨む|うらむ|amaldiçoar / sentir amargura|verbo
羨む|うらやむ|invejar|verbo
売上|うりあげ|valor vendido / receita|substantivo
売り上げ|うりあげ|valor vendido / vendas / receita / faturamento|substantivo
売り切れ|うりきれ|esgotado|substantivo
売り切れる|うりきれる|esgotar-se|verbo
売行き|うれゆき|vendas|substantivo
売れ行き|うれゆき|vendas / demanda|substantivo
うろうろ|うろうろ|vagar / andar sem rumo|advérbio
上～|うわ～|superior ~|expressão
運河|うんが|canal / via aquática|substantivo
うんと|うんと|muito / bastante|advérbio
英文|えいぶん|frase em inglês|substantivo
英和|えいわ|inglês-japonês|adjetivo
ええと|ええと|hum... / bem...|expressão
液体|えきたい|líquido / fluido|substantivo
エチケット|エチケット|etiqueta|substantivo
絵の具|えのぐ|cores / tintas|substantivo
エプロン|エプロン|avental|substantivo
偉い|えらい|grande / notável / excelente|adjetivo
宴会|えんかい|festa / banquete|substantivo
園芸|えんげい|horticultura / jardinagem|substantivo
演劇|えんげき|peça (teatral)|substantivo
円周|えんしゅう|circunferência|substantivo
遠足|えんそく|passeio / excursão / piquenique|substantivo
延長|えんちょう|extensão / prolongamento|substantivo
煙突|えんとつ|chaminé|substantivo
オーケストラ|オーケストラ|orquestra|substantivo
オートメーション|オートメーション|automação|substantivo
追いかける|おいかける|perseguir / correr atrás de|verbo
追い越す|おいこす|ultrapassar / deixar para trás|verbo
オイル|オイル|óleo|substantivo
王女|おうじょ|princesa|substantivo
応ずる|おうずる|responder / atender|verbo
応接|おうせつ|recepção|substantivo
応対|おうたい|recebimento / atendimento|substantivo
往復|おうふく|ida e volta / bilhete de ida e volta|substantivo
欧米|おうべい|Europa e América / Ocidente|substantivo
応用|おうよう|aplicação / uso prático|substantivo
おおざっぱ|おおざっぱ|grosseiro / geral|adjetivo
大通り|おおどおり|rua principal|substantivo
大凡|おおよそ|aproximadamente / cerca de|advérbio
お帰り|おかえり|retorno / bem-vindo|substantivo
おかけください|おかけください|por favor, sente-se|expressão
おかげさまで|おかげさまで|graças a Deus / graças a você|expressão
おかず|おかず|acompanhamento / prato secundário|substantivo
おかまいなく|おかまいなく|por favor, não se incomode|expressão
拝む|おがむ|adorar / rezar|verbo
お代わり|おかわり|repetição / mais uma xícara|substantivo
補う|おぎなう|compensar / suprir|verbo
日程|にってい|agenda|substantivo
鈍い|にぶい|sem brilho / apático / lento|adjetivo
入社|にゅうしゃ|admissão em empresa|substantivo
女房|にょうぼう|esposa|substantivo
睨む|にらむ|encarar / vigiar|verbo
俄|にわか|súbito / abrupto / inesperado|adjetivo
縫う|ぬう|costurar|verbo
ねじ|ねじ|parafuso|substantivo
捩る|ねじる|torcer|verbo
ネックレス|ネックレス|colar|substantivo
熱する|ねっする|aquecer|verbo
寝間着|ねまき|roupa de dormir|substantivo
寝巻|ねまき|roupa de dormir|substantivo
狙い|ねらい|alvo / mira|substantivo
狙う|ねらう|mirar|verbo
年度|ねんど|ano / ano fiscal|substantivo
農産物|のうさんぶつ|produto agrícola|substantivo
農村|のうそん|comunidade agrícola|substantivo
濃度|のうど|concentração / densidade|substantivo
農薬|のうやく|químicos agrícolas|substantivo
能率|のうりつ|eficiência|substantivo
のこぎり|のこぎり|serra|substantivo
残らず|のこらず|completamente / sem exceção|advérbio
上り|のぼり|trem ascendente / subida|substantivo
糊|のり|cola / pasta / amido|substantivo
乗換|のりかえ|transferência (trens, ônibus)|substantivo
乗り換え|のりかえ|transferência (trens, ônibus)|substantivo
乗り越し|のりこし|passar (a estação)|substantivo
のろのろ|のろのろ|lentamente / vagarosamente|advérbio
呑気|のんき|despreocupado / otimista / descuidado|adjetivo
はい (かん)|はい (かん)|sim|expressão
灰色|はいいろ|cinza / cinzento|substantivo
俳句|はいく|haicai|substantivo
売店|ばいてん|loja / barraca|substantivo
バイバイ|バイバイ|tchau tchau|saudação
売買|ばいばい|comércio / compra e venda|substantivo
這う|はう|rastejar / engatinhar|verbo
剥す|はがす|arrancar / descascar / rasgar|verbo
剥がす|はがす|arrancar / descascar / rasgar / despir / tirar a pele / despojar / destacar / desconectar|verbo
ばからしい|ばからしい|absurdo|adjetivo
秤|はかり|balança / máquina de pesar|substantivo
吐き気|はきけ|náusea / enjoo|substantivo
はきはき|はきはき|claramente|advérbio
歯車|はぐるま|engrenagem / roda dentada|substantivo
バケツ|バケツ|balde|substantivo
挟まる|はさまる|ficar preso entre / ser apanhado em|verbo
挟む|はさむ|pinçar / segurar entre / inserir|verbo
梯子|はしご|escada|substantivo
始めに|はじめに|para começar / antes de tudo|advérbio
初めに|はじめに|para começar / antes de tudo|advérbio
はじめまして|はじめまして|Prazer em conhecê-lo|saudação
斜|はす|diagonal|adjetivo
パターン|パターン|padrão|substantivo
肌着|はだぎ|roupa íntima|substantivo
果して|はたして|como esperado / realmente|advérbio
果たして|はたして|como esperado / como se pensava / com certeza|advérbio
鉢|はち|tigela / pote|substantivo
発|はつ|partir (trem, avião)|verbo
×|ばつ|cruza|substantivo
発揮|はっき|exibição / demonstração / mostra|substantivo
一～|ひと～|um~|expressão
人差指|ひとさしゆび|dedo indicador|substantivo
一通り|ひととおり|geral / brevemente|adjetivo
人通り|ひとどおり|tráfego de pedestres|substantivo
ひとまず|ひとまず|por ora / por enquanto|advérbio
瞳|ひとみ|pupila (do olho)|substantivo
一休み|ひとやすみ|uma pausa|substantivo
独り言|ひとりごと|um monólogo / falar sozinho|substantivo
ひとりでに|ひとりでに|por si só / automaticamente / naturalmente|advérbio
ビニール|ビニール|vinil|substantivo
皮肉|ひにく|cinismo / sarcasmo|substantivo
日日|ひにち|data|substantivo
日にち|ひにち|data (de um evento planejado, ato, etc.) / dia|substantivo
捻る|ひねる|torcer / girar|verbo
日の入り|ひのいり|pôr do sol|substantivo
日の出|ひので|nascer do sol|substantivo
響き|ひびき|eco / som|substantivo
響く|ひびく|ressoar; afetar|verbo
皮膚|ひふ|pele|substantivo
ひゃっかじてん|ひゃっかじてん|enciclopédia|substantivo
百科事典|ひゃっかじてん|enciclopédia|substantivo
美容|びよう|beleza (de figura ou forma)|substantivo
表紙|ひょうし|capa frontal / encadernação|substantivo
標識|ひょうしき|placa / marca|substantivo
標準|ひょうじゅん|padrão / nível|substantivo
標本|ひょうほん|exemplo / espécime|substantivo
評論|ひょうろん|crítica / resenha|substantivo
ビルディング|ビルディング|edifício|substantivo
昼寝|ひるね|cochilo (em casa) / sesta|substantivo
広さ|ひろさ|extensão|substantivo
広場|ひろば|praça|substantivo
広々|ひろびろ|extenso / espaçoso|adjetivo
ピンク|ピンク|rosa|substantivo
便箋|びんせん|papel de carta / material de escrita|substantivo
瓶詰|びんづめ|engarrafamento / engarrafado|substantivo
ファスナー|ファスナー|zíper / fecho|substantivo
風船|ふうせん|balão|substantivo
不運|ふうん|azar / infortúnio / má sorte|substantivo
不規則|ふきそく|irregularidade / instabilidade|substantivo
普及|ふきゅう|difusão / disseminação|substantivo
付近|ふきん|vizinhança / proximidade|substantivo
副～|ふく～|vice-|expressão
副詞|ふくし|advérbio|substantivo
複写|ふくしゃ|cópia / duplicata|substantivo
複数|ふくすう|plural / múltiplo|substantivo
ふくめる|ふくめる|incluir / instruir / fazer entender|verbo
膨らます|ふくらます|inchar / expandir / inflar|verbo
膨らむ|ふくらむ|expandir / inchar (para fora) / ficar inflado|verbo
不潔|ふけつ|sujo / imundo|adjetivo
更ける|ふける|ficar tarde / avançar (o tempo)|verbo
符号|ふごう|sinal / marca / símbolo|substantivo
夫妻|ふさい|casal / marido e mulher|substantivo
塞がる|ふさがる|estar tampado / estar fechado|verbo
塞ぐ|ふさぐ|tapar / fechar / bloquear|verbo
ふざける|ふざける|brincar / folgar / divertir-se|verbo
無沙汰|ぶさた|negligenciar em manter contato|substantivo
武士|ぶし|guerreiro / samurai|substantivo
部首|ぶしゅ|radical (de um caractere kanji)|substantivo
襖|ふすま|tela deslizante|substantivo
附属|ふぞく|anexado / pertencente / afiliado|adjetivo
バック|バック|costas|substantivo
発想|はっそう|ideia; modo de pensar|substantivo
発電|はつでん|geração|substantivo
発売|はつばい|venda|substantivo
話合い|はなしあい|discussão; conversa|substantivo
話し合い|はなしあい|discussão; conversa; conferência|substantivo
話し掛ける|はなしかける|abordar alguém; falar (com alguém)|verbo
話中|はなしちゅう|falando; linha ocupada|expressão
甚だしい|はなはだしい|extremo; excessivo; terrível|adjetivo
花火|はなび|fogos de artifício|substantivo
花嫁|はなよめ|noiva|substantivo
ばね|ばね|molas|substantivo
跳ねる|はねる|pular; saltar|verbo
破片|はへん|fragmento; pedaço quebrado|substantivo
歯磨き|はみがき|escovar os dentes; pasta de dente|substantivo
はめる|はめる|colocar; inserir; vestir|verbo
早口|はやくち|falar rápido|adjetivo
払い込む|はらいこむ|depositar; pagar|verbo
払い戻す|はらいもどす|reembolsar; pagar de volta|verbo
針金|はりがね|fio|substantivo
張り切る|はりきる|estar animado; estar cheio de vigor|verbo
反～|はん～|anti~; contra~|expressão
反映|はんえい|reflexão; influência|substantivo
半径|はんけい|raio|substantivo
判子|はんこ|selo (usado para assinatura)|substantivo
万歳|ばんざい|banzai; Viva!|saudação
判事|はんじ|juiz; justiça|substantivo
番地|ばんち|número da casa; endereço|substantivo
パンツ|パンツ|cueca|substantivo
バンド|バンド|banda|substantivo
半島|はんとう|península|substantivo
ハンドル|ハンドル|manípulo; volante|substantivo
非～|ひ～|anti~; contra~; an~; não~|expressão
日当たり|ひあたり|exposição ao sol; local ensolarado|substantivo
日帰り|ひがえり|viagem de um dia|substantivo
比較的|ひかくてき|comparativamente; relativamente|advérbio
日陰|ひかげ|sombra|substantivo
ぴかぴか|ぴかぴか|brilhar; cintilar|adjetivo
引受る|ひきうける|empreender; aceitar; assumir|verbo
引き返す|ひきかえす|voltar; retornar; reverter|verbo
引算|ひきざん|subtração|substantivo
引き出す|ひきだす|puxar para fora; retirar; sacar|verbo
引き止める|ひきとめる|deter; impedir; segurar|verbo
卑怯|ひきょう|covardia; mesquinhez; injustiça|substantivo
引分け|ひきわけ|empate (em competição); jogo empatado|substantivo
引き分け|ひきわけ|empate (em competição); jogo empatado|substantivo
陽射|ひざし|luz do sol; raios do sol|substantivo
日差し|ひざし|luz do sol|substantivo
肘|ひじ|cotovelo|substantivo
ピストル|ピストル|pistola|substantivo
ビタミン|ビタミン|vitamina|substantivo
ぴたり|ぴたり|exatamente; justo|advérbio
引っ掛かる|ひっかかる|ser pego em; ficar preso em|verbo
筆記|ひっき|tomar notas; escrever|substantivo
引っ繰り返す|ひっくりかえす|virar; derrubar; derrubar|verbo
引っ繰り返る|ひっくりかえる|ser virado; ser derrubado; tombar; ser revertido|verbo
引っ越し|ひっこし|mudança (de residência, escritório, etc.); mudança de residência|substantivo
引っ込む|ひっこむ|recuar; afundar; ceder|verbo
筆者|ひっしゃ|escritor; autor|substantivo
必需品|ひつじゅひん|necessidades; essencial|substantivo
方言|ほうげん|dialeto|substantivo
坊さん|ぼうさん|monge budista|substantivo
防止|ぼうし|prevenção / impedimento|substantivo
方針|ほうしん|objetivo / plano / política|substantivo
法則|ほうそく|lei / regra|substantivo
包帯|ほうたい|ligadura / atadura|substantivo
膨大|ぼうだい|enorme / vasto|adjetivo
包丁|ほうちょう|faca de cozinha|substantivo
方程式|ほうていしき|equação|substantivo
防犯|ぼうはん|prevenção de crime|substantivo
方面|ほうめん|direção / área|substantivo
坊や|ぼうや|menino|substantivo
放る|ほうる|soltar / deixar ir|verbo
朗らか|ほがらか|alegre / radiante|adjetivo
朗らか(な)|ほがらか(な)|alegre / claro (céu, dia)|adjetivo
牧場|ぼくじょう|fazenda (gado) / pasto|substantivo
牧畜|ぼくちく|pecuária|substantivo
保健|ほけん|saúde / higiene|substantivo
募集|ぼしゅう|recrutamento|substantivo
干す|ほす|secar / arejar|verbo
ポスター|ポスター|pôster|substantivo
北極|ほっきょく|Polo Norte|substantivo
坊っちゃん|ぼっちゃん|filho (de outros)|substantivo
掘る|ほる|cavar / escavar|verbo
彫る|ほる|esculpir / cinzelar|verbo
ぼろ|ぼろ|trapo / roupa esfarrapada|substantivo
盆|ぼん|Festa dos Mortos / bandeja|substantivo
盆地|ぼんち|bacia (geográfica)|substantivo
ほんの～|ほんの～|apenas / tão somente|advérbio
本部|ほんぶ|quartel general|substantivo
本来|ほんらい|essencialmente / naturalmente|advérbio
まあまあ|まあまあ|mais ou menos / razoável|advérbio
毎～|まい～|cada|partícula
枚数|まいすう|número de objetos planos|substantivo
毎度|まいど|cada vez / olá (no comércio)|saudação
まく|まく|enrolar / girar|verbo
枕|まくら|travesseiro|substantivo
曲げる|まげる|dobrar / curvar|verbo
まごまご|まごまご|confuso / sem saber o que fazer|adjetivo
摩擦|まさつ|atrito / roçar|substantivo
まざる|まざる|misturar-se / associar-se|verbo
まじる|まじる|misturar-se / associar-se|verbo
マスク|マスク|máscara|substantivo
まぜる|まぜる|misturar / mexer|verbo
またぐ|またぐ|montar a cavalo / passar por cima|verbo
跨ぐ|またぐ|cruzar / montar / passar por cima|verbo
待合室|まちあいしつ|sala de espera|substantivo
待ち合わせる|まちあわせる|encontrar-se (em local e hora marcados)|verbo
街角|まちかど|esquina da rua|substantivo
真っ暗|まっくら|escuridão total|adjetivo
真っ黒|まっくろ|negro como azeviche|adjetivo
真っ青|まっさお|azul escuro / pálido (de susto)|adjetivo
真っ先|まっさき|o primeiro / o começo|advérbio
真っ白|まっしろ|branco puro|adjetivo
祭る|まつる|divinizar / consagrar|verbo
窓口|まどぐち|guichê / balcão|substantivo
真似る|まねる|imitar / mimetizar|verbo
まぶた|まぶた|pálpebra|substantivo
マフラー|マフラー|cachecol|substantivo
間も無く|まもなく|em breve / logo|advérbio
付属|ふぞく|anexado / afiliado / pertencente|verbo
蓋|ふた|tampa / tampa / cobertura|substantivo
物騒|ぶっそう|perigoso / perturbado / inseguro|adjetivo
ぶつぶつ|ぶつぶつ|resmungar / reclamar em voz baixa|expressão
船便|ふなびん|correio marítimo (navio)|substantivo
部品|ぶひん|peças / acessórios|substantivo
吹雪|ふぶき|nevasca|substantivo
父母|ふぼ|pai e mãe, pais|substantivo
踏切|ふみきり|cruzamento de ferrovia / linha de partida / cruzamento|substantivo
麓|ふもと|pé (de montanha) / base / fundo|substantivo
フライパン|フライパン|frigideira|substantivo
ブラウス|ブラウス|blusa|substantivo
ぶらさげる|ぶらさげる|pendurar / suspender / balançar|verbo
ブラシ|ブラシ|escova|substantivo
プラットホーム|プラットホーム|plataforma|substantivo
フリー|フリー|livre / grátis|adjetivo
振り仮名|ふりがな|chave de pronúncia|substantivo
振り向く|ふりむく|virar o rosto / virar-se|verbo
プリント|プリント|impressão / folheto|substantivo
古～|ふる～|velho ~|adjetivo
古里|ふるさと|cidade natal / local de nascimento|substantivo
振舞う|ふるまう|comportar-se / conduzir-se|verbo
ブローチ|ブローチ|broche|substantivo
プログラム|プログラム|programa|substantivo
風呂敷|ふろしき|pano para embrulhar|substantivo
ふわふわ|ふわふわ|leve / macio|adjetivo
噴火|ふんか|erupção|substantivo
分解|ぶんかい|análise / desmontagem|substantivo
文芸|ぶんげい|literatura / arte e literatura|substantivo
文献|ぶんけん|literatura / livros (referência)|substantivo
噴水|ふんすい|fonte (de água)|substantivo
分数|ぶんすう|fração (em matemática)|substantivo
文体|ぶんたい|estilo literário|substantivo
分布|ぶんぷ|distribuição|substantivo
文房具|ぶんぼうぐ|papelaria|substantivo
文脈|ぶんみゃく|contexto|substantivo
分量|ぶんりょう|quantidade / porção|substantivo
分類|ぶんるい|classificação|substantivo
閉会|へいかい|encerramento|substantivo
平気|へいき|calma / tranquilidade / desinteresse|substantivo
並行|へいこう|lado a lado / concorrente / ao mesmo tempo|adjetivo
平日|へいじつ|dia de semana|substantivo
兵隊|へいたい|soldado|substantivo
平凡|へいぼん|comum / ordinário|adjetivo
平野|へいや|planície / campo aberto|substantivo
凹む|へこむ|amassado / entalhado|verbo
へそ|へそ|umbigo|substantivo
隔てる|へだてる|ser excluído|verbo
別荘|べっそう|vila / casa de férias / casa de verão|substantivo
別々|べつべつ|separadamente / individualmente|advérbio
ベテラン|ベテラン|veterano|substantivo
ヘリコプター|ヘリコプター|helicóptero|substantivo
編集|へんしゅう|edição / compilação / editorial|substantivo
便所|べんじょ|banheiro / lavatório|substantivo
ペンチ|ペンチ|alicate (lit: pinças)|substantivo
ボーナス|ボーナス|bônus|substantivo
防～|ぼう～|prevenção de ~|expressão
望遠鏡|ぼうえんきょう|telescópio|substantivo
方角|ほうがく|direção / caminho|substantivo
箒|ほうき|vassoura|substantivo
間もなく|まもなく|em breve / logo / logo depois|advérbio
マラソン|マラソン|maratona|substantivo
稀|まれ|raro / pouco comum / escasso|adjetivo
回り道|まわりみち|desvio|substantivo
満員|まんいん|lotado / sem vagas / esgotado|substantivo
マンション|マンション|apartamento / condomínio|substantivo
満点|まんてん|nota perfeita / pontuação máxima|substantivo
未～|み～|não ainda ~|expressão
見上げる|みあげる|olhar para cima / admirar|verbo
見送る|みおくる|despedir / acompanhar / deixar passar|verbo
見下ろす|みおろす|olhar de cima / menosprezar|verbo
見掛け|みかけ|aparência externa|substantivo
三日月|みかづき|lua crescente|substantivo
岬|みさき|cabo / promontório|substantivo
みじめ|みじめ|triste / lamentável / miserável|adjetivo
惨めな|みじめな|miserável / infeliz / triste|adjetivo
ミシン|ミシン|máquina de costura|substantivo
自ら|みずから|por si mesmo / pessoalmente|pronome
水着|みずぎ|traje de banho|substantivo
店屋|みせや|loja / boteco|substantivo
見出し|みだし|título / cabeçalho|substantivo
道順|みちじゅん|itinerário / rota|substantivo
みっともない|みっともない|vergonhoso / indecente|adjetivo
見詰める|みつめる|encarar / fitar|verbo
見直す|みなおす|rever / olhar novamente|verbo
見慣れる|みなれる|estar acostumado a ver / ser familiar com|verbo
醜い|みにくい|feio / desagradável|adjetivo
実る|みのる|dar frutos / amadurecer|verbo
身分|みぶん|posição / status|substantivo
見本|みほん|amostra / modelo|substantivo
見舞う|みまう|visitar / perguntar pela saúde|verbo
未満|みまん|menos que / insuficiente|expressão
名字|みょうじ|sobrenome / nome de família|substantivo
ミリ (メートル)|ミリ (メートル)|mili-|expressão
民間|みんかん|privado / civil|adjetivo
民主～|みんしゅ～|democrático-|expressão
民謡|みんよう|canção folclórica|substantivo
無限|むげん|infinito / ilimitado|adjetivo
無地|むじ|liso / liso|adjetivo
矛盾|むじゅん|contradição / inconsistência|substantivo
無数|むすう|incontáveis / sem número|adjetivo
紫|むらさき|roxo / violeta|substantivo
群れ|むれ|multidão / bando / rebanho|substantivo
姪|めい|sobrinha|substantivo
名～|めい～|famoso ~|expressão
名作|めいさく|obra-prima / obra famosa|substantivo
名所|めいしょ|lugar famoso / atração turística|substantivo
迷信|めいしん|superstição|substantivo
命ずる|めいずる|comandar / nomear|verbo
名物|めいぶつ|produto famoso / especialidade|substantivo
銘々|めいめい|cada um / individualmente|advérbio
恵まれる|めぐまれる|ser abençoado com / ser rico em|verbo
巡る|めぐる|dar a volta / circular|verbo
目指す|めざす|apontar para / ter em vista|verbo
目覚し|めざまし|despertador|substantivo
目下|めした|atualmente / agora|advérbio
目印|めじるし|marca / sinal / ponto de referência|substantivo
目立つ|めだつ|ser notável / se destacar|verbo
めちゃくちゃ|めちゃくちゃ|absurdo / bagunçado / arruinado|adjetivo
めっきり|めっきり|notavelmente / consideravelmente|advérbio
めでたい|めでたい|feliz, auspicioso, alegre|adjetivo
メニュー|メニュー|cardápio|substantivo
めまい|めまい|tontura, vertigem|substantivo
目安|めやす|critério, objetivo|substantivo
免税|めんぜい|isenção fiscal|substantivo
面積|めんせき|área, superfície|substantivo
面倒臭い|めんどうくさい|incômodo de fazer, cansativo|expressão
モーター|モーター|motor|substantivo
儲かる|もうかる|ser lucrativo, render lucro|verbo
儲ける|もうける|ganhar, ter (gerar, procriar) um filho|verbo
申し訳ない|もうしわけない|imperdoável, sinto muito|expressão
木材|もくざい|madeira, lenha|substantivo
目次|もくじ|sumário, índice|substantivo
潜る|もぐる|mergulhar, passar por; evadir, esconder|verbo
もしかしたら|もしかしたら|talvez, quem sabe, por acaso|advérbio
もたれる|もたれる|apoiar-se, inclinar-se sobre|verbo
凭れる|もたれる|apoiar-se, inclinar-se sobre, reclinar-se sobre|verbo
モダン|モダン|moderno|adjetivo
餅|もち|bolo de arroz glutinoso|substantivo
モデル|モデル|modelo|substantivo
元々|もともと|originalmente, por natureza, desde o início|advérbio
物置|ものおき|depósito, quarto de armazenamento|substantivo
物語る|ものがたる|contar, indicar|verbo
物差し|ものさし|régua, medida|substantivo
物凄い|ものすごい|assombroso, impressionante, em grande medida|adjetivo
モノレール|モノレール|monotrilho|substantivo
揉む|もむ|esfregar, amassar, enrugar|verbo
もやす|もやす|queimar|verbo
催し|もよおし|evento, festividades, função|substantivo
盛る|もる|servir (comida); encher; prescrever|verbo
問答|もんどう|perguntas e respostas, diálogo|substantivo
やかましい|やかましい|ser exigente, ser excessivamente crítico|verbo
喧しい|やかましい|barulhento, alto, estrondoso, alvoroçado|adjetivo
夜間|やかん|à noite, noturno|advérbio
やかん|やかん|chaleira|substantivo
役者|やくしゃ|ator|substantivo
役所|やくしょ|escritório do governo, repartição pública|substantivo
役人|やくにん|oficial do governo|substantivo
薬品|やくひん|medicamentos, produtos químicos|substantivo
役目|やくめ|dever, tarefa|substantivo
火傷|やけど|queimadura, escaldão|substantivo
夜行|やこう|trem noturno, viagem noturna|substantivo
矢印|やじるし|seta indicadora|substantivo
やたらに|やたらに|aleatoriamente, imprudentemente, cegamente|advérbio
薬局|やっきょく|farmácia, drogaria|substantivo
やっつける|やっつける|atacar (um inimigo), vencer, finalizar|verbo
やっぱり|やっぱり|afinal, de qualquer forma|advérbio
家主|やぬし|proprietário, senhorio|substantivo
破く|やぶく|rasgar|verbo
やむをえない|やむをえない|não pode ser evitado, inevitável|expressão
軟らかい|やわらかい|macio, tenro, mole|adjetivo
遊園地|ゆうえんち|parque de diversões|substantivo
夕刊|ゆうかん|jornal da noite|substantivo
郵送|ゆうそう|envio pelo correio|substantivo
夕立|ゆうだち|chuva repentina da tarde|substantivo
夕日|ゆうひ|sol da tarde, sol poente|substantivo
悠々|ゆうゆう|calmo, tranquilo, tranquilo|adjetivo
有料|ゆうりょう|pago, com pedágio|adjetivo
浴衣|ゆかた|roupão de banho, quimono informal de verão|substantivo
行方|ゆくえ|paradeiro, para onde vai|substantivo
列島|れっとう|corrente de ilhas|substantivo
煉瓦|れんが|tijolo|substantivo
連合|れんごう|união, aliança|substantivo
レンズ|レンズ|lente|substantivo
ローマ字|ローマじ|romanização, letras romanas|substantivo
ろうそく|ろうそく|vela|substantivo
録音|ろくおん|gravação (de áudio)|substantivo
ロッカー|ロッカー|armário|substantivo
ロビー|ロビー|hall de entrada, saguão|substantivo
論ずる|ろんずる|argumentar, discutir|verbo
和～|わ～|estilo japonês|expressão
和英|わえい|japonês-inglês|substantivo
我～|わが～|nosso(a)|pronome
若々しい|わかわかしい|jovem, jovial|adjetivo
詫びる|わびる|pedir desculpas|verbo
和服|わふく|roupas japonesas|substantivo
割合に|わりあいに|relativamente, comparativamente|advérbio
割算|わりざん|divisão (matemática)|substantivo
割と|わりと|relativamente, comparativamente|advérbio
割引|わりびき|desconto|substantivo
ワンピース|ワンピース|vestido de uma peça|substantivo
湯気|ゆげ|vapor|substantivo
輸血|ゆけつ|transfusão de sangue|substantivo
輸送|ゆそう|transporte/transporte|substantivo
油断|ゆだん|negligência/despreparo|substantivo
湯飲み|ゆのみ|xícara de chá|substantivo
湯飲|ゆのみ|xícara de chá|substantivo
緩い|ゆるい|frouxo/lento/preguiçoso|adjetivo
溶岩|ようがん|lava|substantivo
用語|ようご|termo/terminologia|substantivo
要旨|ようし|essência/resumo|substantivo
幼児|ようじ|bebê/criança|substantivo
容積|ようせき|capacidade/volume|substantivo
幼稚|ようち|infância/infantil|substantivo
幼稚園|ようちえん|jardim de infância|substantivo
用途|ようと|uso/utilidade|substantivo
洋品店|ようひんてん|loja de roupas|substantivo
養分|ようぶん|nutriente/nutrição|substantivo
羊毛|ようもう|lã|substantivo
漸く|ようやく|finalmente/finalmente/difícilmente|advérbio
要領|ようりょう|essência/esboço|substantivo
翌～|よく～|próximo ~|expressão
欲張り|よくばり|ganancioso|adjetivo
余計|よけい|demais/desnecessário/excesso|advérbio
よこす|よこす|enviar/encaminhar; entregar|verbo
よごす|よごす|desonrar/poluir; sujar/manchar|verbo
余所|よそ|outro lugar/em outro lugar|advérbio
四つ角|よつかど|esquina/cruzamento|substantivo
酔っ払い|よっぱらい|bêbado|substantivo
予備|よび|preparação/reserva|substantivo
呼び掛ける|よびかける|chamar/abordar; dirigir-se (a uma multidão); apelar|verbo
呼び出す|よびだす|convocar/chamar|verbo
蘇る|よみがえる|ressuscitar/reviver|verbo
慶ぶ|よろこぶ|ficar feliz/deleitar-se|verbo
来日|らいにち|vinda ao Japão/visita ao Japão|substantivo
落第|らくだい|reprovação/desistência|substantivo
ラッシュアワー|ラッシュアワー|hora do rush|substantivo
欄|らん|coluna (de texto)|substantivo
ランチ|ランチ|almoço|substantivo
ランニング|ランニング|corrida; regata|substantivo
乱暴|らんぼう|rude/violento/grosseiro|adjetivo
理科|りか|ciências|substantivo
利害|りがい|vantagens e desvantagens/interesse|substantivo
リズム|リズム|ritmo|substantivo
リットル|リットル|litro|substantivo
リポート|リポート|relatório/artigo|substantivo
リボン|リボン|fita|substantivo
略す|りゃくす|abreviar|verbo
流域|りゅういき|bacia (de rio)|substantivo
両～|りょう～|ambos ~|expressão
両側|りょうがわ|ambos os lados|substantivo
漁師|りょうし|pescador|substantivo
領事|りょうじ|cônsul|substantivo
領収|りょうしゅう|recibo/comprovante|substantivo
臨時|りんじ|temporário/especial/extraordinário|adjetivo
留守番|るすばん|cuidar de casa/zelador|substantivo
零点|れいてん|zero/nenhuma marca|substantivo
冷凍|れいとう|congelamento/refrigeração|substantivo
レインコート|レインコート|capa de chuva|substantivo
レクリェーション|レクリェーション|recreação|substantivo
レジャー|レジャー|lazer|substantivo
`;

const n1 = `
現像|げんぞう|revelação (de filme)|substantivo
原則|げんそく|princípio, regra geral|substantivo
見地|けんち|ponto de vista|substantivo
現地|げんち|local real, local|substantivo
限定|げんてい|limite, restrição|substantivo
原点|げんてん|origem (coordenadas, ponto de partida)|substantivo
原典|げんてん|original, fonte|substantivo
原爆|げんばく|bomba atômica|substantivo
原文|げんぶん|o texto, original|substantivo
厳密|げんみつ|estrito, próximo|adjetivo
賢明|けんめい|sabedoria, inteligência, prudência|substantivo
倹約|けんやく|poupança, economia, frugalidade|substantivo
原油|げんゆ|petróleo bruto|substantivo
兼用|けんよう|uso múltiplo, uso combinado|substantivo
権力|けんりょく|poder (político), autoridade, influência|substantivo
言論|げんろん|discussão, fala|substantivo
故～|こ～|falecido(a), finado(a)|expressão
語彙|ごい|vocabulário, glossário|substantivo
恋する|こいする|apaixonar-se por, amar|verbo
甲|こう|1º em classificação; carapaça|substantivo
～光|～こう|luz|expressão
好意|こうい|boa vontade, favor, cortesia|substantivo
行為|こうい|ato, feito, conduta|substantivo
合意|ごうい|acordo, consentimento, entendimento mútuo|substantivo
工学|こうがく|engenharia|substantivo
抗議|こうぎ|protesto, objeção|substantivo
合議|ごうぎ|consulta, conferência|substantivo
皇居|こうきょ|Palácio Imperial|substantivo
好況|こうきょう|condições prósperas, economia saudável|substantivo
鉱業|こうぎょう|indústria de mineração|substantivo
興業|こうぎょう|iniciar um negócio; indústria|substantivo
高原|こうげん|planalto|substantivo
交互|こうご|mútuo, recíproco, alternado|adjetivo
煌々と|こうこうと|brilhantemente|advérbio
考古学|こうこがく|arqueologia|substantivo
工作|こうさく|artesanato, manobra|substantivo
耕作|こうさく|cultivo, agricultura|substantivo
鉱山|こうざん|mina|substantivo
講習|こうしゅう|curso curto, treinamento|substantivo
口述|こうじゅつ|declaração verbal|expressão
控除|こうじょ|subsídio, dedução|substantivo
交渉|こうしょう|negociação|substantivo
高尚|こうしょう|alto, nobre, refinado|adjetivo
向上|こうじょう|elevação, melhoria, progresso|substantivo
行進|こうしん|marcha, parada|substantivo
香辛料|こうしんりょう|especiarias|substantivo
降水|こうすい|chuva, precipitação|substantivo
洪水|こうずい|inundação|substantivo
合成|ごうせい|sintético, misto|adjetivo
公然|こうぜん|abertamente|advérbio
抗争|こうそう|disputa, resistência|substantivo
構想|こうそう|plano, enredo, ideia, concepção|substantivo
後退|こうたい|retirada, backspace|substantivo
光沢|こうたく|lustre, acabamento brilhante (de fotografias)|substantivo
公団|こうだん|corporação pública|substantivo
好調|こうちょう|satisfatório, em boa forma|adjetivo
口頭|こうとう|oral|substantivo
講読|こうどく|leitura|substantivo
購読|こうどく|assinatura|substantivo
購入|こうにゅう|compra, comprar|substantivo
公認|こうにん|reconhecimento oficial, autorização|substantivo
光熱費|こうねつひ|custo de combustível e luz|substantivo
購買|こうばい|compra, comprar|substantivo
好評|こうひょう|popularidade, reputação favorável|substantivo
交付|こうふ|entrega, fornecimento (com cópias)|substantivo
公募|こうぼ|apelo público, contribuição pública|substantivo
巧妙|こうみょう|engenhoso, habilidoso, esperto|adjetivo
公用|こうよう|negócios do governo, uso público, despesa pública|substantivo
小売|こうり|varejo|substantivo
効率|こうりつ|eficiência|substantivo
公立|こうりつ|instituição pública|substantivo
護衛|ごえい|guarda, comboio, escolta|substantivo
コーナー|コーナー|canto|substantivo
小柄|こがら|pequeno, diminuto|adjetivo
小切手|こぎって|cheque|substantivo
国産|こくさん|produtos domésticos|substantivo
国定|こくてい|patrocinado pelo estado, nacional|adjetivo
告白|こくはく|confissão, reconhecimento|substantivo
国防|こくぼう|defesa nacional|substantivo
国有|こくゆう|propriedade nacional|substantivo
極楽|ごくらく|paraíso|substantivo
国連|こくれん|ONU, Nações Unidas|substantivo
焦げ茶|こげちゃ|marrom escuro|substantivo
語源|ごげん|raiz da palavra, derivação da palavra, etimologia|substantivo
心地|ここち|sentimento, sensação, humor|substantivo
心得|こころえ|conhecimento, informação|substantivo
心掛け|こころがけ|prontidão, intenção, objetivo|substantivo
心掛ける|こころがける|ter em mente, ter como objetivo fazer|verbo
志|こころざし|vontade, intenção, motivo|substantivo
志す|こころざす|planejar, pretender, aspirar a|verbo
心強い|こころづよい|reconfortante, tranquilizador|adjetivo
心細い|こころぼそい|impotente, sem esperança, desencorajador|adjetivo
試み|こころみ|tentativa, experimento|substantivo
試みる|こころみる|tentar, testar|verbo
快い|こころよい|agradável, agradável|adjetivo
誤差|ごさ|erro|substantivo
ございます (かん)|ございます (かん)|ser (polido, existir)|verbo
孤児|こじ|órfão|substantivo
こじれる|こじれる|complicar-se, piorar|verbo
こす (みずを～)|こす (みずを～)|coar, filtrar|verbo
梢|こずえ|topo de árvore|substantivo
個性|こせい|individualidade, personalidade|substantivo
戸籍|こせき|censo, registro familiar|substantivo
古代|こだい|tempos antigos|substantivo
こたつ|こたつ|mesa com aquecedor|substantivo
こだわる|こだわる|se preocupar com, ser particular sobre|verbo
誇張|こちょう|exagero|substantivo
こつ (をつかむ)|こつ (をつかむ)|segredo, truque|substantivo
滑稽|こっけい|engraçado, cômico|adjetivo
国交|こっこう|relações diplomáticas|substantivo
骨董品|こっとうひん|antiguidades|substantivo
固定|こてい|fixação, fixo|substantivo
事柄|ことがら|assunto, coisa, caso|substantivo
孤独|こどく|solidão, isolamento|substantivo
ことごとく|ことごとく|totalmente, inteiramente|advérbio
言付け|ことづけ|deixar um recado|expressão
殊に|ことに|especialmente, acima de tudo|advérbio
粉々|こなごな|em pedacinhos|advérbio
好ましい|このましい|agradável, desejável|adjetivo
碁盤|ごばん|tabuleiro de Go|substantivo
個別|こべつ|caso particular|substantivo
ごまかす|ごまかす|enganar, falsificar|verbo
細やか|こまやか|pouco, modesto|adjetivo
コマーシャル|コマーシャル|comercial|substantivo
込める|こめる|incluir, colocar|verbo
コメント|コメント|comentário|substantivo
籠もる|こもる|isolar-se, ser confinado|verbo
固有|こゆう|característico, próprio|adjetivo
暦|こよみ|calendário|substantivo
凝らす|こらす|concentrar, dedicar|verbo
ごらんなさい (かん)|ごらんなさい (かん)|olhe, tente fazer|expressão
孤立|こりつ|isolamento, desamparo|substantivo
懲りる|こりる|aprender com a experiência, se desiludir|verbo
凝る|こる|endurecer, enrijecer|verbo
根気|こんき|paciência, perseverança|substantivo
根拠|こんきょ|base, fundamento|substantivo
混血|こんけつ|mestiço|substantivo
コンタクト (レンズ)|コンタクト (レンズ)|contato, lente de contato|substantivo
昆虫|こんちゅう|inseto|substantivo
根底|こんてい|raiz, base, fundamento|substantivo
混同|こんどう|confusão, mistura|substantivo
コントラスト|コントラスト|contraste|substantivo
コントロール|コントロール|controle|substantivo
コンパス|コンパス|bússola|substantivo
根本|こんぽん|fundação, raiz, base|substantivo
財|ざい|fortuna, riqueza|substantivo
再会|さいかい|reencontro, reunião|substantivo
災害|さいがい|calamidade, desastre|substantivo
細菌|さいきん|bacilo, bactéria, germe|substantivo
細工|さいく|trabalho, habilidade, truque|substantivo
採掘|さいくつ|mineração|substantivo
サイクル|サイクル|ciclo|substantivo
採決|さいけつ|votação|substantivo
再建|さいけん|reconstrução|substantivo
再現|さいげん|reprodução, retorno, renascimento|substantivo
財源|ざいげん|fonte de fundos, recursos|substantivo
在庫|ざいこ|estoque|substantivo
採算|さいさん|lucro|substantivo
サイズ|サイズ|tamanho|substantivo
原形|げんけい|forma original / forma base|substantivo
原型|げんけい|protótipo / modelo / arquetípico|substantivo
権限|けんげん|poder / autoridade / jurisdição|substantivo
現行|げんこう|presente / atual / em operação|substantivo
健在|けんざい|em boa saúde / bem|adjetivo
原作|げんさく|obra original|substantivo
検事|けんじ|promotor público|substantivo
原子|げんし|átomo|substantivo
元首|げんしゅ|governante / soberano|substantivo
原書|げんしょ|documento original|substantivo
懸賞|けんしょう|oferecer prêmios / ganhar / recompensa|substantivo
健全|けんぜん|saúde / solidez / saudável|substantivo
元素|げんそ|elemento|substantivo
同調|どうちょう|simpatia / concordar com / alinhamento|substantivo
到底|とうてい|(não conseguir) de forma alguma|advérbio
動的|どうてき|dinâmico / cinético|adjetivo
尊い|とうとい|precioso / valioso / nobre|adjetivo
貴い|とうとい|precioso / valioso / nobre|adjetivo
同等|どうとう|igualdade / igual / mesmo posto|substantivo
堂々|どうどう|magnífico / grandioso / impressionante|adjetivo
尊ぶ|とうとぶ|valorizar / prezar / estimar|verbo
どうにか|どうにか|de alguma forma / de um jeito ou de outro|advérbio
投入|とうにゅう|jogar / investimento / fazer (um circuito elétrico)|verbo
導入|どうにゅう|introdução / trazer / conduzir|substantivo
当人|とうにん|a pessoa em questão / a dita pessoa|substantivo
同封|どうふう|anexo (ex: em uma carta)|substantivo
逃亡|とうぼう|fuga|substantivo
冬眠|とうみん|hibernação / sono de inverno|substantivo
同盟|どうめい|aliança / união / liga|substantivo
どうやら|どうやら|parece que / de alguma forma|advérbio
動力|どうりょく|potência / força motriz / força dinâmica|substantivo
登録|とうろく|registro / registrar / registro|substantivo
討論|とうろん|discussão / debate|substantivo
遠ざかる|とおざかる|ir para longe / afastar-se|verbo
遠回り|とおまわり|desvio / caminho indireto|substantivo
トーン|トーン|tom|substantivo
とかく|とかく|de qualquer forma / de qualquer maneira / em qualquer caso|advérbio
とがめる|とがめる|culpar / repreender|verbo
時折|ときおり|às vezes|advérbio
とぎれる|とぎれる|pausar / ser interrompido|verbo
研ぐ|とぐ|afiçar / moer / polir|verbo
特技|とくぎ|talento especial / habilidade|substantivo
独裁|どくさい|ditadura / despotismo|substantivo
特産|とくさん|especialidade / produto especial|substantivo
独自|どくじ|original / peculiar / característico|adjetivo
特集|とくしゅう|reportagem / edição especial / especial|substantivo
独占|どくせん|monopólio|substantivo
独創|どくそう|originalidade|substantivo
得点|とくてん|pontuação / pontos feitos|substantivo
特派|とくは|enviar especialmente / enviado especial|substantivo
特有|とくゆう|característico (de) / peculiar (a)|adjetivo
とげ (をさす)|とげ (をさす)|espinho|substantivo
遂げる|とげる|realizar / alcançar / executar|verbo
～どころか|～どころか|em vez de / longe de|conector
年頃|としごろ|idade / idade de casar / adolescência|substantivo
戸締り|とじまり|fechamento / trancar as portas|substantivo
途上|とじょう|em rota / no meio do caminho|substantivo
土台|どだい|fundação / base / fundamento|substantivo
途絶える|とだえる|cessar / terminar / acabar|verbo
特許|とっきょ|permissão especial / patente|substantivo
再生|さいせい|reprodução, regeneração, ressuscitação|substantivo
財政|ざいせい|economia, finanças|substantivo
最善|さいぜん|o melhor possível|adjetivo
採択|さいたく|adoção, seleção, escolha|substantivo
栽培|さいばい|cultivo|substantivo
再発|さいはつ|retorno, recaída, recorrência|substantivo
細胞|さいぼう|célula|substantivo
採用|さいよう|uso, adoção|substantivo
遮る|さえぎる|interromper, interceptar, obstruir|verbo
さえずる|さえずる|cantar, chilrear, gorjear|verbo
冴える|さえる|ser claro, ser brilhante, ser habilidoso|verbo
竿|さお|haste, vara (ex: para secar roupa)|substantivo
栄える|さかえる|florescer, prosperar, prosperar|verbo
差額|さがく|saldo, diferença, margem|substantivo
杯|さかずき|taça de vinho|substantivo
逆立ち|さかだち|parada de mão, parada de cabeça|substantivo
さきに (いぜん)|さきに (いぜん)|antes, mais cedo que, previamente|advérbio
詐欺|さぎ|fraude, trapaça|substantivo
削減|さくげん|corte, redução|substantivo
錯誤|さくご|erro|substantivo
作戦|さくせん|operações militares, táticas, estratégia|substantivo
叫び|さけび|grito, grito, clamor|substantivo
捧げる|ささげる|levantar, dar, oferecer|verbo
差し掛かる|さしかかる|aproximar-se, chegar perto|verbo
指図|さしず|instrução, mandato|substantivo
差し出す|さしだす|apresentar, submeter, estender|verbo
差し支える|さしつかえる|interferir, impedir|verbo
授ける|さずける|conceder, premiar, ensinar|verbo
摩する|さする|esfregar, acariciar|verbo
さぞ (さぞや。さぞかし)|さぞ (さぞや。さぞかし)|tenho certeza, certamente, sem dúvida|advérbio
定まる|さだまる|tornar-se resolvido, ser fixado|verbo
定める|さだめる|decidir, determinar|verbo
座談会|ざだんかい|simpósio, discussão em mesa redonda|substantivo
雑|ざつ|grosso, grosseiro|adjetivo
雑貨|ざっか|bens diversos, bens gerais|substantivo
殺人|さつじん|assassinato|substantivo
察する|さっする|adivinhar, sentir, julgar|verbo
雑談|ざつだん|conversar, conversa fiada|substantivo
さっと|さっと|subitamente, suavemente|advérbio
さっぱりする|さっぱりする|refrescar-se|expressão
悟る|さとる|atingir a iluminação, compreender|verbo
座標|ざひょう|coordenadas|substantivo
さほど|さほど|não muito, não tanto|advérbio
サボる|サボる|matar (aulas); vadiar no trabalho; passar o tempo à toa|verbo
寒気|さむけ|calafrio, arrepio, frio|substantivo
侍|さむらい|samurai|substantivo
さも|さも|com entusiasmo, com satisfação|advérbio
作用|さよう|operação, efeito, função|substantivo
さらう (こどもを～)|さらう (こどもを～)|sequestrar (crianças)|verbo
障る|さわる|impedir, interferir com, afetar|verbo
酸|さん|ácido|substantivo
山岳|さんがく|montanhas|substantivo
参議院|さんぎいん|Câmara dos Conselheiros|substantivo
産休|さんきゅう|licença maternidade|substantivo
サンキュー|サンキュー|obrigado|saudação
残金|ざんきん|dinheiro restante|substantivo
産後|さんご|pós-parto, após o parto|substantivo
残酷|ざんこく|crueldade, aspereza|substantivo
産出|さんしゅつ|rendimento, produzir|substantivo
参照|さんしょう|referência, consulta, consulta|substantivo
特権|とっけん|privilégio, direito especial|substantivo
とっさに|とっさに|imediatamente|advérbio
突如|とつじょ|subitamente, de repente|advérbio
とって|とって|cabo, pega, maçaneta|substantivo
突破|とっぱ|rompimento, avanço, penetração|substantivo
土手|どて|dique, margem|substantivo
届|とどけ|relatório, notificação, registro|substantivo
滞る|とどこおる|estagnar, atrasar|verbo
整える|ととのえる|arrumar, preparar, angariar dinheiro|verbo
唱える|となえる|recitar, cantar, invocar|verbo
殿様|とのさま|senhor feudal|substantivo
土俵|どひょう|arena, ringue|substantivo
扉|とびら|porta, entrada|substantivo
溝|どぶ|vala, sarjeta, brecha|substantivo
徒歩|とほ|andar, ir a pé|substantivo
土木|どぼく|obras públicas|substantivo
とぼける|とぼける|fingir ignorância, fazer o tolo|verbo
乏しい|とぼしい|escasso, escasso, pobre|adjetivo
富|とみ|riqueza, fortuna|substantivo
富む|とむ|ser rico, enriquecer|verbo
共稼ぎ|ともかせぎ|ganhar juntos, sustentar-se juntos|substantivo
伴う|ともなう|acompanhar, trazer consigo|verbo
共働き|ともばたらき|dupla renda, ambos trabalhando|substantivo
ドライ|ドライ|seco|adjetivo
ドライクリーニング|ドライクリーニング|lavagem a seco|substantivo
ドライバー|ドライバー|motorista, chave de fenda|substantivo
ドライブイン|ドライブイン|drive-in|substantivo
トラブル|トラブル|problema|substantivo
トランジスター|トランジスター|transistor|substantivo
とりあえず|とりあえず|imediatamente, primeiramente, por ora|advérbio
取扱|とりあつかい|tratamento, manuseio, gestão|substantivo
取り扱う|とりあつかう|tratar, manusear, negociar|verbo
鳥居|とりい|portão torii|substantivo
取り替え|とりかえ|troca, intercâmbio|substantivo
取り組む|とりくむ|enfrentar, lutar, lidar com|verbo
取締り|とりしまり|controle, repressão, supervisão|substantivo
取り締まる|とりしまる|reprimir, controlar, supervisionar|verbo
取り調べる|とりしらべる|investigar, examinar|verbo
取り立てる|とりたてる|coletar, extorquir|verbo
取り次ぐ|とりつぐ|atuar como agente, anunciar, transmitir|verbo
取り付ける|とりつける|instalar, obter acordo|verbo
取り除く|とりのぞく|remover, retirar, separar|verbo
取引|とりひき|transações, negócios|substantivo
取り巻く|とりまく|cercar, rodear, envolver|verbo
取り混ぜる|とりまぜる|misturar, juntar|verbo
取り戻す|とりもどす|recuperar, reaver|verbo
取り寄せる|とりよせる|pedir, encomendar|verbo
ドリル|ドリル|broca|substantivo
副|とりわけ|especialmente, acima de tudo|advérbio
とろける|とろける|derreter; ser encantado|verbo
鈍感|どんかん|insensibilidade, estupidez|substantivo
とんだ|とんだ|terrível, horrível, grave, absolutamente não|adjetivo
度忘れ|どわすれ|lapsus de memória, esquecer por um momento|substantivo
問屋|とんや|armazém, loja de atacado|substantivo
内閣|ないかく|gabinete, (governo)|substantivo
乃至|ないし|de...a, entre...e, ou|conector
内緒|ないしょ|segredo, privacidade, secreto|substantivo
内心|ないしん|pensamentos mais íntimos, intenção real, coração mais íntimo|substantivo
内蔵|ないぞう|órgão interno; embutido|substantivo
ナイター|ナイター|jogo sob os holofotes (ex: beisebol), jogo noturno|substantivo
参上|さんじょう|visita|substantivo
残高|ざんだか|saldo / resto|substantivo
サンタクロース|サンタクロース|Papai Noel|substantivo
桟橋|さんばし|cais / molhe / pier|substantivo
賛美|さんび|louvor / adoração|substantivo
山腹|さんぷく|encosta / encosta da montanha|substantivo
産婦人科|さんふじんか|departamento de maternidade e ginecologia|substantivo
産物|さんぶつ|produto / resultado / fruto|substantivo
山脈|さんみゃく|cordilheira / cadeia de montanhas|substantivo
仕上がり|しあがり|acabamento / fim / conclusão|substantivo
仕上|しあげ|acabamento / retoques finais|substantivo
仕上げる|しあげる|terminar / completar|verbo
飼育|しいく|criação / criação / criação|substantivo
強いて|しいて|ousar / insistir|verbo
シート|シート|assento / folha|substantivo
ジーパン|ジーパン|jeans|substantivo
仕入れる|しいれる|fazer estoque / reabastecer estoque / adquirir|verbo
強いる|しいる|forçar / obrigar / coagir|verbo
潮|しお|maré|substantivo
歯科|しか|odontologia|substantivo
自我|じが|eu / ego|substantivo
自覚|じかく|consciente de si / autoconsciente|adjetivo
仕掛|しかけ|dispositivo / truque / mecanismo|substantivo
仕掛ける|しかける|colocar / armar / travar|verbo
しかしながら|しかしながら|no entanto / contudo|conector
色彩|しきさい|cor|substantivo
式場|しきじょう|salão cerimonial / local de cerimônia|substantivo
しきたり|しきたり|costume / prática convencional / tradição|substantivo
事業|じぎょう|projeto / empreendimento / negócio|substantivo
軽蔑|けいべつ|escrutínio / desprezo|substantivo
経歴|けいれき|histórico pessoal / carreira|substantivo
経路|けいろ|curso / rota / canal|substantivo
けがらわしい|けがらわしい|sujo / injusto|adjetivo
劇団|げきだん|companhia de teatro / trupe|substantivo
激励|げきれい|encorajamento|substantivo
ゲスト|ゲスト|convidado|substantivo
獣|けだもの|fera / bruto|substantivo
決|けつ|decisão / voto|substantivo
決意|けつい|decisão / determinação|substantivo
結核|けっかく|tuberculose|substantivo
決議|けつぎ|resolução / voto / decisão|substantivo
結合|けつごう|combinação / união|substantivo
決算|けっさん|balanço / acerto de contas|substantivo
月謝|げっしゃ|taxa mensal de mensalidade|substantivo
決勝|けっしょう|finais (em esportes)|substantivo
結晶|けっしょう|cristal / cristalização|substantivo
結成|けっせい|formação|substantivo
結束|けっそく|união / unidade|substantivo
げっそり|げっそり|desanimado / perdendo peso|adjetivo
決断|けつだん|decisão / determinação|substantivo
月賦|げっぷ|parcela mensal|substantivo
欠乏|けつぼう|escassez|substantivo
蹴飛ばす|けとばす|chutar / chutar (alguém)|verbo
けなす|けなす|falar mal de|verbo
煙たい|けむたい|enfumaçado / sentindo-se estranho|adjetivo
煙る|けむる|fumar (por exemplo, fogo)|verbo
家来|けらい|servidor / comitiva / servo|substantivo
下痢|げり|diarreia|substantivo
権威|けんい|autoridade / poder / influência|substantivo
兼業|けんぎょう|ocupar dois empregos ao mesmo tempo|substantivo
鈍る|にぶる|amadurecer / afrouxar / embotar|verbo
にも関わらず|にもかかわらず|apesar de|expressão
ニュアンス|ニュアンス|nuance|substantivo
ニュー|ニュー|novo|adjetivo
入手|にゅうしゅ|obtenção / aquisição|substantivo
入賞|にゅうしょう|ganhar prêmio / ganhar lugar|substantivo
入浴|にゅうよく|banho|substantivo
尿|にょう|urina|substantivo
認識|にんしき|reconhecimento / percepção|substantivo
妊娠|にんしん|concepção / gravidez|substantivo
任務|にんむ|dever / missão / tarefa|substantivo
任命|にんめい|nomeação / indicação|substantivo
抜かす|ぬかす|omitir / pular|verbo
抜け出す|ぬけだす|escapar / sair furtivamente / sobressair|verbo
主|ぬし|dono / mestre / deus|substantivo
沼|ぬま|pântano / charco / lagoa|substantivo
音色|ねいろ|timbre / cor de som|substantivo
値打ち|ねうち|valor / utilidade / preço|substantivo
ネガ|ネガ|negativo (fotográfico)|substantivo
寝かせる|ねかせる|colocar para dormir / deitar / fermentar|verbo
ねじまわし|ねじまわし|chave de fenda|substantivo
捩れる|ねじれる|torcer / distorcer|verbo
妬む|ねたむ|ter ciúmes / invejar|verbo
ねだる|ねだる|importunar / exigir|verbo
熱意|ねつい|zelo / entusiasmo|substantivo
熱湯|ねっとう|água fervente|substantivo
熱量|ねつりょう|valor calorífico|substantivo
粘り|ねばり|pegajosidade / viscosidade|substantivo
粘る|ねばる|ser pegajoso / persistir / insistir|verbo
値引き|ねびき|redução de preço / desconto|substantivo
根回し|ねまわし|acordos prévios / preparativos|substantivo
眠たい|ねむたい|sonolento|adjetivo
練る|ねる|amassar / refinar / polir|verbo
念|ねん|sentido / sentimento / desejo|substantivo
年賀|ねんが|saudações de Ano Novo / cartão de Ano Novo|substantivo
念願|ねんがん|desejo ardente / petição sincera|substantivo
年号|ねんごう|nome de era / número do ano|substantivo
燃焼|ねんしょう|queima / combustão|substantivo
年長|ねんちょう|sênior / mais velho|substantivo
燃料|ねんりょう|combustível|substantivo
年輪|ねんりん|anel anual de árvore|substantivo
ノイローゼ|ノイローゼ|neurose|substantivo
農耕|のうこう|agricultura / lavoura|substantivo
農場|のうじょう|fazenda / granja|substantivo
農地|のうち|terra agrícola|substantivo
納入|のうにゅう|pagamento / fornecimento|substantivo
逃す|のがす|deixar escapar / libertar|verbo
逃れる|のがれる|escapar|verbo
軒並|のきなみ|fila de casas / uniformemente|substantivo
望ましい|のぞましい|desejável / esperado|adjetivo
乗っ取る|のっとる|capturar / ocupar / tomar|verbo
のどか|のどか|tranquilo / calmo / quieto|adjetivo
罵る|ののしる|falar mal de / abusar|verbo
延べ|のべ|futuros / crédito / total|substantivo
飲み込む|のみこむ|engolir / entender|verbo
乗り込む|のりこむ|entrar / embarcar / invadir|verbo
刃|は|lâmina / espada|substantivo
～派|～は|grupo / partido / seção|partícula
バー|バー|bar|substantivo
把握|はあく|compreensão / apóio / noção|substantivo
パート|パート|emprego de meio período|substantivo
廃棄|はいき|descarte / abandono / lixo|substantivo
配給|はいきゅう|distribuição / rações|substantivo
ばい菌|ばいきん|bactéria / germe|substantivo
配偶者|はいぐうしゃ|cônjuge / companheiro(a)|substantivo
拝啓|はいけい|prezado(a) (em carta formal)|saudação
背景|はいけい|fundo / cenário / ambiente|substantivo
背後|はいご|traseira / costas|substantivo
廃止|はいし|abolição / revogação|substantivo
拝借|はいしゃく|empréstimo (humilde)|verbo
排除|はいじょ|exclusão / remoção / rejeição|substantivo
賠償|ばいしょう|compensação / indenização|substantivo
排水|はいすい|drenagem|substantivo
敗戦|はいせん|derrota / perda de guerra|substantivo
配置|はいち|arranjo / disposição|substantivo
配布|はいふ|distribuição|substantivo
配分|はいぶん|distribuição / alocação|substantivo
敗北|はいぼく|derrota|verbo
倍率|ばいりつ|ampliação / amplificador|substantivo
配慮|はいりょ|consideração / preocupação / solicitude|substantivo
配列|はいれつ|arranjo / matriz|substantivo
破壊|はかい|destruição|substantivo
いたわる|いたわる|compadecer-se de / consolar / cuidar de|verbo
一概に|いちがいに|incondicionalmente / necessariamente|advérbio
著しい|いちじるしい|notável / considerável|adjetivo
一同|いちどう|todos os presentes / todos os envolvidos / todos nós|pronome
一部分|いちぶぶん|uma parte / uma porção|substantivo
一別|いちべつ|despedida|substantivo
一面|いちめん|um lado / o outro lado|substantivo
一目|いちもく|um olhar / um vislumbre|substantivo
一様|いちよう|uniforme / semelhante / igual|adjetivo
一律|いちりつ|uniforme / igual|adjetivo
一連|いちれん|uma série / uma corrente / um resma (de papel)|substantivo
一括|いっかつ|tudo junto / lote|advérbio
一気|いっき|de uma vez / num gole|advérbio
一挙に|いっきょに|de uma vez / com um único movimento|advérbio
一見|いっけん|uma olhada / um vislumbre / primeiro encontro|substantivo
一切|いっさい|sem exceção / o todo|advérbio
一心|いっしん|uma mente / com atenção total|advérbio
いっそ|いっそ|preferivelmente / mais cedo / seria melhor|advérbio
一変|いっぺん|mudança completa|substantivo
意図|いと|intenção / objetivo / plano|substantivo
営む|いとなむ|realizar / administrar um negócio|verbo
挑む|いどむ|desafiar|verbo
稲光|いなびかり|relâmpago|substantivo
祈り|いのり|oração / súplica|substantivo
いびき|いびき|ronco|substantivo
今更|いまさら|agora / de novo|advérbio
未だ|いまだ|ainda / ainda assim|advérbio
移民|いみん|emigrante / imigrante|substantivo
嫌々|いやいや|relutantemente / de forma alguma / sem vontade|advérbio
卑しい|いやしい|ganancioso / vulgar / humilde|adjetivo
いやに|いやに|terrívelmente / muito|advérbio
いやらしい|いやらしい|desagradável / nojento / indecente|adjetivo
意欲|いよく|vontade / desejo / ambição|substantivo
威力|いりょく|poder / força / autoridade|substantivo
衣類|いるい|roupas / vestuário / trajes|substantivo
異論|いろん|opinião diferente / objeção|substantivo
印鑑|いんかん|carimbo / selo|substantivo
陰気|いんき|melancolia / aziago|substantivo
隠居|いんきょ|aposentadoria; aposentado|substantivo
インターチェンジ|インターチェンジ|intercâmbio; cruzamento|substantivo
インターナショナル|インターナショナル|internacional|adjetivo
インターフォン|インターフォン|interfone; campainha|substantivo
インテリ|インテリ|intelectual; elitista|substantivo
インフォメーション|インフォメーション|informação|substantivo
インフレ|インフレ|inflação|substantivo
受かる|うかる|passar; ser aprovado|verbo
受け入れ|うけいれ|recebimento; aceitação|substantivo
受け入れる|うけいれる|aceitar; receber|verbo
受け継ぐ|うけつぐ|herdar; suceder|verbo
受け付ける|うけつける|ser aceito; receber (um pedido)|verbo
受け止める|うけとめる|pegar; reagir a; encarar|verbo
受身|うけみ|passivo; voz passiva|substantivo
受持ち|うけもち|responsabilidade; assunto sob responsabilidade|substantivo
動き|うごき|movimento; atividade; tendência|substantivo
嘘つき|うそつき|mentiroso|substantivo
うたた寝|うたたね|cochilar; soneca|substantivo
打ち明ける|うちあける|confessar; abrir o jogo|verbo
打ち切る|うちきる|parar; abortar; descontinuar; encerrar|verbo
打ち消し|うちけし|negação; desmentido; negativo|substantivo
打ち込む|うちこむ|dedicar-se a; atirar em|verbo
団扇|うちわ|leque|substantivo
内訳|うちわけ|detalhes; discriminação; classificação|substantivo
写し|うつし|cópia; duplicata|substantivo
訴え|うったえ|ação judicial; queixa|substantivo
うっとうしい|うっとうしい|cansativo; irritante|adjetivo
うつむく|うつむく|olhar para baixo; curvar-se|verbo
空ろ|うつろ|oco; vazio; sem expressão|adjetivo
器|うつわ|tigela; vasilha; recipiente|substantivo
腕前|うでまえ|habilidade; destreza; facilidade|substantivo
雨天|うてん|tempo chuvoso|substantivo
促す|うながす|instar; sugerir; exigir|verbo
うぬぼれ|うぬぼれ|pretensão; vaidade; arrogância|substantivo
生まれつき|うまれつき|por natureza; por nascimento; nativo|advérbio
埋め込む|うめこむ|embutir; implantar|verbo
梅干し|うめぼし|ameixa em conserva; umêboshi|substantivo
裏返し|うらがえし|do avesso; reverso|substantivo
売り出し|うりだし|liquidação; promoção|substantivo
売り出す|うりだす|colocar à venda; comercializar|verbo
潤う|うるおう|ficar úmido; lucrar com|verbo
浮気|うわき|caso extraconjugal; trair|substantivo
上回る|うわまわる|exceder|verbo
植わる|うわる|ser plantado|verbo
運営|うんえい|gerenciamento; administração; operação|substantivo
うんざり|うんざり|tedioso; chato; estar farto de|adjetivo
運送|うんそう|transporte; frete|substantivo
運賃|うんちん|taxa de frete; despesas de envio; tarifa (de passageiro)|substantivo
云々|うんぬん|e assim por diante; e assim por diante|conector
運搬|うんぱん|transporte; carreto|substantivo
運命|うんめい|destino|substantivo
運輸|うんゆ|transporte|substantivo
運用|うんよう|uso; aplicação; uso prático|substantivo
エアメール|エアメール|correio aéreo|substantivo
～営|～えい|~gerido|expressão
英字|えいじ|letra inglesa (caractere)|substantivo
映写|えいしゃ|projeção|substantivo
映像|えいぞう|reflexo; imagem|substantivo
英雄|えいゆう|herói; grande homem|substantivo
液|えき|líquido; fluido|substantivo
閲覧|えつらん|inspeção, referência, navegar|substantivo
獲物|えもの|caça, despojos, troféu|substantivo
襟|えり|pescoço, colarinho|substantivo
エレガント|エレガント|elegante|adjetivo
円滑|えんかつ|harmonia, suavidade|substantivo
縁側|えんがわ|varanda, alpendre, varanda, corredor aberto|substantivo
沿岸|えんがん|costa, margem|substantivo
婉曲|えんきょく|eufemístico, indireto, insinuante|adjetivo
演出|えんしゅつ|produção, direção|substantivo
エンジニア|エンジニア|engenheiro|substantivo
演じる|えんじる|atuar, representar, interpretar|verbo
演ずる|えんずる|atuar, representar, interpretar|verbo
沿線|えんせん|ao longo da linha férrea|substantivo
縁談|えんだん|proposta de casamento|substantivo
遠方|えんぽう|longa distância, lugar distante|substantivo
円満|えんまん|harmonia, paz, suavidade|substantivo
追い込む|おいこむ|enxotar, encurralar, conduzir|verbo
追い出す|おいだす|expulsar, expulsar|verbo
於いて|おいて|em, em, sobre|partícula
老いる|おいる|envelhecer, ficar velho|verbo
応急|おうきゅう|emergência|substantivo
黄金|おうごん|ouro|substantivo
往診|おうしん|visita médica, visita domiciliar|substantivo
応募|おうぼ|assinatura, inscrição|substantivo
おおい (かん)|おおい (かん)|ei|saudação
大方|おおかた|quase todos, maioria|advérbio
大柄|おおがら|tamanho grande, padrão grande|substantivo
おおげさ|おおげさ|grandioso, exagerado|adjetivo
大筋|おおすじ|esboço, resumo|substantivo
大空|おおぞら|céu, o céu|substantivo
オートマチック|オートマチック|automático|adjetivo
大幅|おおはば|largura total, grande escala, drástico|substantivo
おおまかな|おおまかな|aproximado, rascunho|adjetivo
大水|おおみず|inundação|substantivo
公|おおやけ|público|substantivo
犯す|おかす|perpetrar, violar|verbo
侵す|おかす|invadir, atacar, invadir|verbo
臆病|おくびょう|covardia, timidez|substantivo
遅らす|おくらす|retardar, atrasar|verbo
厳か|おごそか|majestoso, digno|adjetivo
行い|おこない|conduta, comportamento, ação|substantivo
おごる (ゆうしょくを～)|おごる (ゆうしょくを～)|oferecer (uma refeição)|verbo
収まる|おさまる|resolver-se; ser obtido|verbo
納まる|おさまる|resolver-se; ser obtido|verbo
治まる|おさまる|estar em paz, acalmar-se|verbo
お産|おさん|parto|substantivo
押し切る|おしきる|ter sua própria maneira|verbo
押し込む|おしこむ|empurrar para dentro, aglomerar-se em|verbo
惜しむ|おしむ|ser frugal, valorizar, lamentar|verbo
押し寄せる|おしよせる|empurrar para o lado, avançar sobre|verbo
雄|おす|macho (animal)|substantivo
御世辞|おせじ|elogio, lisonja|substantivo
襲う|おそう|atacar|verbo
遅くとも|おそくとも|no máximo|advérbio
恐れ|おそれ|medo, horror|substantivo
恐れ入る|おそれいる|sentir-se maravilhado, sentir-se pequeno|expressão
おだてる|おだてる|elogiar|verbo
落ち込む|おちこむ|ficar deprimido|verbo
落ち着き|おちつき|calma, compostura|substantivo
落葉|おちば|folhas caídas|substantivo
内部|ないぶ|interior, interno / dentro|substantivo
内乱|ないらん|guerra civil, conflito doméstico|substantivo
内陸|ないりく|interior, terra adentro|substantivo
苗|なえ|muda de arroz|substantivo
なおさら|なおさら|ainda mais, ainda menor|advérbio
流し|ながし|pia|substantivo
長々|ながなが|longo, demorado, muito longo|adjetivo
中程|なかほど|meio, no meio do caminho|substantivo
渚|なぎさ|beira da água, praia, margem|substantivo
嘆く|なげく|suspira, lamenta, entristece|verbo
投げ出す|なげだす|abandonar, jogar fora|verbo
仲人|なこうど|casamenteiro, intermediário|substantivo
和やか|なごやか|suave, calmo, harmonioso|adjetivo
名残|なごり|restos, vestígios, memória|substantivo
情け|なさけ|simpatia, compaixão|substantivo
情無い|なさけない|miserável, lamentável, vergonhoso|adjetivo
情深い|なさけぶかい|de coração terno, compassivo|adjetivo
詰る|なじる|repreender, repreender, dizer fora|verbo
名高い|なだかい|famoso, celebrado, conhecido|adjetivo
雪崩|なだれ|avalanche|substantivo
懐く|なつく|tornar-se emocionalmente apegado|verbo
名付ける|なづける|nomear|verbo
何気ない|なにげない|casualmente, sem preocupação|adjetivo
なにとぞ|なにとぞ|por favor, gentilmente, por todos os meios|advérbio
なにより|なにより|mais, melhor|advérbio
ナプキン|ナプキン|guardanapo|substantivo
名札|なふだ|placa de nome, crachá|substantivo
生臭い|なまぐさい|cheirando a peixe ou sangue, peixe ou carne|adjetivo
生温い|なまぬるい|morno, meia-medida|adjetivo
生身|なまみ|carne viva, carne e sangue, o vivo|substantivo
鉛|なまり|chumbo (o metal)|substantivo
滑らか|なめらか|suavidade, aspecto vítreo|substantivo
嘗める|なめる|lamber; experimentar; zombar de|verbo
悩ましい|なやましい|sugestivo, melancólico, lânguido|adjetivo
悩ます|なやます|incomodar, assediar, molestar|verbo
悩み|なやみ|problema(s), preocupação, aflição|substantivo
並びに|ならびに|e|conector
成り立つ|なりたつ|consistir em; ser prático (lógico, viável, viável), ser concluído, ser verdadeiro|verbo
なるたけ|なるたけ|o máximo possível, se possível|advérbio
慣れ|なれ|prática, experiência|substantivo
馴々しい|なれなれしい|familiarizado, tornar-se íntimo|adjetivo
～なんか|～なんか|nem um pouco ~|partícula
ナンセンス|ナンセンス|absurdo|substantivo
何だか|なんだか|um pouco, um tanto, de alguma forma|advérbio
なんだかんだ|なんだかんだ|uma coisa ou outra|advérbio
なんなり|なんなり|qualquer coisa, o que quer que seja|pronome
荷|に|carga, bagagem, carga|substantivo
似通う|にかよう|parecer-se de perto|verbo
にきび|にきび|espinha, acne|substantivo
賑わう|にぎわう|prosperar, florescer, ser lotado de gente|verbo
憎しみ|にくしみ|ódio|substantivo
肉親|にくしん|relação de sangue, parente de sangue|substantivo
肉体|にくたい|o corpo, a carne|substantivo
逃げ出す|にげだす|fugir, escapar de|verbo
西日|にしび|sol poente|substantivo
滲む|にじむ|manchar, borrar, espalhar|verbo
にせ物|にせもの|imitação, falsificação|substantivo
日夜|にちや|dia e noite, sempre|advérbio
荷造り|にづくり|empacotamento, enfardamento, encaixotamento|substantivo
担う|になう|carregar no ombro, suportar (fardo), segurar (arma)|verbo
乙|おつ|segundo|adjetivo
お使い|おつかい|recado|substantivo
おっかない|おっかない|assustador / amedrontador|adjetivo
お手上げ|おてあげ|desistir / render-se|expressão
おどおど|おどおど|covardemente / acovardado|advérbio
脅す|おどす|ameaçar / intimidar|verbo
訪れる|おとずれる|visitar|verbo
お供|おとも|acompanhante / servo|substantivo
衰える|おとろえる|enfraquecer / decair|verbo
同い年|おないどし|mesma idade|substantivo
自ずから|おのずから|naturalmente / espontaneamente|advérbio
怯える|おびえる|assustar-se / amedrontar-se|verbo
おびただしい|おびただしい|abundantemente / inúmeros|adjetivo
帯びる|おびる|portar / carregar / assumir|verbo
お袋|おふくろ|mãe|substantivo
覚え|おぼえ|memória / noção / experiência|substantivo
おまけ|おまけ|brinde / algo extra|substantivo
お宮|おみや|santuário xintoísta|substantivo
おむつ|おむつ|fralda|substantivo
思い付き|おもいつき|ideia / plano / sugestão|substantivo
趣|おもむき|sabor / aparência / peculiar|substantivo
赴く|おもむく|ir / dirigir-se|verbo
重んじる|おもんじる|respeitar / honrar / estimar|verbo
重んずる|おもんずる|honrar / respeitar / valorizar|verbo
親父|おやじ|pai / velho / chefe|substantivo
及び|および|e / bem como|conector
及ぶ|およぶ|alcançar / estender|verbo
折|おり|ocasião / oportunidade|substantivo
檻|おり|gaiola / curral / cela|substantivo
オリエンテーション|オリエンテーション|orientação|substantivo
折り返す|おりかえす|dobrar / retornar|verbo
織物|おりもの|têxtil / tecido|substantivo
俺|おれ|eu|pronome
愚か|おろか|tolo / estúpido|adjetivo
おろそか|おろそか|negligência / descuido|substantivo
おんぶ|おんぶ|carregar nas costas|expressão
オンライン|オンライン|online|advérbio
温和|おんわ|gentil / ameno / moderado|adjetivo
我|が～|ego|substantivo
カーペット|カーペット|carpete|substantivo
～界|～かい|mundo / círculo / reino|expressão
～街|～がい|cidade|expressão
改悪|かいあく|deterioração / piora|substantivo
海運|かいうん|transporte marítimo|substantivo
外貨|がいか|moeda estrangeira|substantivo
改革|かいかく|reforma / inovação|substantivo
貝殻|かいがら|concha|substantivo
外観|がいかん|aparência / exterior|substantivo
階級|かいきゅう|classe / patente / série|substantivo
海峡|かいきょう|estreito|substantivo
会見|かいけん|entrevista / conferência|substantivo
介護|かいご|enfermagem / cuidado|substantivo
開催|かいさい|realização / abertura|substantivo
回収|かいしゅう|coleta / recuperação|substantivo
改修|かいしゅう|reparo / melhoria|substantivo
怪獣|かいじゅう|monstro|substantivo
解除|かいじょ|cancelamento / liberação|substantivo
外相|がいしょう|Ministro das Relações Exteriores|substantivo
害する|がいする|prejudicar / ofender|verbo
概説|がいせつ|declaração geral / esboço|substantivo
回送|かいそう|encaminhamento|substantivo
階層|かいそう|classe / nível / estrato / hierarquia|substantivo
開拓|かいたく|cultivo / pioneiro|substantivo
会談|かいだん|conversa / entrevista|substantivo
改定|かいてい|reforma|substantivo
改訂|かいてい|revisão|substantivo
ガイド|ガイド|guia|substantivo
街道|かいどう|rodovia|substantivo
該当|がいとう|correspondente / em conformidade / aplicável|adjetivo
街頭|がいとう|na rua|expressão
ガイドブック|ガイドブック|guia de viagem|substantivo
介入|かいにゅう|intervenção|substantivo
概念|がいねん|ideia geral / conceito / noção|substantivo
開発|かいはつ|desenvolvimento / exploração|substantivo
海抜|かいばつ|altitude|substantivo
介抱|かいほう|cuidar / dar atenção|verbo
解剖|かいぼう|dissecação / autópsia|substantivo
外来|がいらい|importado / ambulatório|adjetivo
回覧|かいらん|circulação|substantivo
概略|がいりゃく|esboço / resumo / ideia geral|substantivo
海流|かいりゅう|corrente oceânica|substantivo
改良|かいりょう|melhoria / reforma|substantivo
回路|かいろ|circuito (elétrico)|substantivo
海路|かいろ|rota marítima|substantivo
省みる|かえりみる|refletir|verbo
顧みる|かえりみる|olhar para trás / rever / voltar|verbo
顔付き|かおつき|expressão facial|substantivo
課外|かがい|extracurricular|adjetivo
掲げる|かかげる|erguer / hastear / içar|verbo
かかと|かかと|calcanhar (de sapato)|substantivo
書き取る|かきとる|escrever / anotar / tomar ditado|verbo
掻き回す|かきまわす|mexer / agitar / perturbar|verbo
かく (はじを)|かく (はじを)|humilhar-se|expressão
学芸|がくげい|artes e ciências / humanidades|substantivo
格差|かくさ|diferença / disparidade|substantivo
拡散|かくさん|espalhamento / difusão|substantivo
学士|がくし|graduado universitário|substantivo
各種|かくしゅ|todo tipo / toda sorte|adjetivo
隔週|かくしゅう|a cada duas semanas|advérbio
確信|かくしん|convicção / confiança|substantivo
革新|かくしん|reforma / inovação|substantivo
学説|がくせつ|teoria|substantivo
確定|かくてい|fixo / decisão|adjetivo
カクテル|カクテル|coquetel|substantivo
獲得|かくとく|aquisição / posse|substantivo
楽譜|がくふ|partitura (música)|substantivo
確保|かくほ|garantia / assegurar / garantir|verbo
革命|かくめい|revolução|substantivo
確立|かくりつ|estabelecimento / criação|substantivo
賭|かけ|aposta / jogo / risco|substantivo
掛～|かけ～|crédito|substantivo
～掛け|～かけ|suporte / cabide|substantivo
崖|がけ|penhasco|substantivo
駆け足|かけあし|correr rápido / a passo acelerado|substantivo
家計|かけい|economia doméstica / finanças familiares|substantivo
駆けっこ|かけっこ|corrida (de pés)|substantivo
加工|かこう|fabricação / processamento / tratamento|substantivo
化合|かごう|combinação química|substantivo
かさばる|かさばる|ser volumoso|verbo
かさむ|かさむ|amontoar-se / aumentar|verbo
箇条書|かじょうがき|lista com marcadores|expressão
微か|かすか|fraco/vago/tenue|adjetivo
霞む|かすむ|embaçar/nevoar|verbo
火星|かせい|Marte|substantivo
化石|かせき|fóssil/petrificação|substantivo
河川|かせん|rios|substantivo
化繊|かせん|fibras sintéticas|substantivo
過疎|かそ|despovoamento|substantivo
片～|かた～|único/só|expressão
片言|かたこと|poucas palavras/fragmentado|expressão
傾ける|かたむける|inclinar/virar|verbo
固める|かためる|endurecer/fortificar|verbo
傍ら|かたわら|ao lado/enquanto|advérbio
花壇|かだん|canteiro de flores|substantivo
家畜|かちく|animais domésticos/gado|substantivo
且つ|かつ|e/além disso|conector
がっくり|がっくり|desanimado/abatido|adjetivo
合唱|がっしょう|coro/canto em coro|substantivo
がっしり|がっしり|firmemente/solidamente|advérbio
合致|がっち|acordo/concordância|substantivo
がっちり|がっちり|solidamente/firmemente|advérbio
かつて|かつて|uma vez/antes/antigamente|advérbio
勝手|かって|cozinha; do seu jeito/egoísmo|substantivo
カット|カット|corte|substantivo
活発|かっぱつ|vigor/ativo|substantivo
合併|がっぺい|fusão/combinação|substantivo
カテゴリー|カテゴリー|categoria|substantivo
叶う|かなう|realizar-se/vir a ser|verbo
叶える|かなえる|realizar/conceder|verbo
金槌|かなづち|martelo (de ferro)|substantivo
かなわない|かなわない|ser incapaz/não poder|expressão
加入|かにゅう|adesão/tornar-se membro|substantivo
予て|かねて|anteriormente/já|advérbio
庇う|かばう|proteger/cobrir|verbo
株式|かぶしき|ações/títulos|substantivo
かぶれる|かぶれる|ter uma reação/ser influenciado|verbo
花粉|かふん|pólen|substantivo
貨幣|かへい|dinheiro/moeda|substantivo
構える|かまえる|armar/estabelecer|verbo
過密|かみつ|superlotação/densamente povoado|substantivo
噛み切る|かみきる|morder e cortar/roer|verbo
カムバック|カムバック|volta por cima|substantivo
カメラマン|カメラマン|cinegrafista|substantivo
粥|かゆ|mingau de arroz|substantivo
体付き|からだつき|tipo físico/silhueta|substantivo
絡む|からむ|envolver/enredar|verbo
かりに|かりに|temporariamente; se/supondo|advérbio
カルテ|カルテ|prontuário médico|substantivo
ガレージ|ガレージ|garagem|substantivo
過労|かろう|excesso de trabalho/estresse|substantivo
かろうじて|かろうじて|mal/quase não|advérbio
交す|かわす|trocar/permutar|verbo
代る代る|かわるがわる|alternadamente/em revezamento|advérbio
簡易|かんい|simplicidade/facilidade|substantivo
灌漑|かんがい|irrigação|substantivo
眼科|がんか|oftalmologia|substantivo
眼球|がんきゅう|globo ocular|substantivo
玩具|がんぐ|brinquedo|substantivo
簡潔|かんけつ|concisão/simplicidade|substantivo
還元|かんげん|redução/devolução|substantivo
看護|かんご|enfermagem|substantivo
漢語|かんご|palavra chinesa / palavra sino-japonesa|substantivo
頑固|がんこ|teimosia / obstinação|substantivo
勧告|かんこく|conselho / recomendação|substantivo
換算|かんさん|conversão / troca|substantivo
監視|かんし|observação / vigilância|substantivo
慣習|かんしゅう|costume (histórico)|substantivo
観衆|かんしゅう|espectadores / público|substantivo
願書|がんしょ|formulário de inscrição|substantivo
干渉|かんしょう|interferência / intervenção|substantivo
頑丈|がんじょう|sólido / forte|adjetivo
感触|かんしょく|tato / sensação|substantivo
肝心|かんじん|essencial / fundamental|adjetivo
肝腎|かんじん|essencial / fundamental|adjetivo
関税|かんぜい|alfândega / imposto|substantivo
岩石|がんせき|rocha|substantivo
感染|かんせん|infecção / contágio|substantivo
幹線|かんせん|linha principal / linha tronco|substantivo
簡素|かんそ|simplicidade / singeleza|substantivo
観点|かんてん|ponto de vista|substantivo
感度|かんど|sensibilidade / severidade (terremoto)|substantivo
カンニング|カンニング|trapaça / cola|substantivo
元年|がんねん|primeiro ano (de um reinado)|substantivo
幹部|かんぶ|gerência / executivo|substantivo
完ぺき|かんぺき|perfeição / completude|substantivo
勘弁|かんべん|perdão / clemência|substantivo
感無量|かんむりょう|profundo sentimento / cheio de emoção|expressão
勧誘|かんゆう|convite / persuasão|substantivo
関与|かんよ|participação / envolvimento|substantivo
寛容|かんよう|tolerância / generosidade|substantivo
元来|がんらい|originalmente / naturalmente|advérbio
観覧|かんらん|visualização / exibição|substantivo
慣例|かんれい|costume / precedente|substantivo
還暦|かんれき|aniversário de 60 anos|substantivo
貫禄|かんろく|presença / dignidade|substantivo
緩和|かんわ|alívio / mitigação|substantivo
議案|ぎあん|projeto de lei|substantivo
危害|きがい|dano / perigo|substantivo
企画|きかく|planejamento / projeto|substantivo
規格|きかく|padrão / norma|substantivo
着飾る|きかざる|vestir-se bem / enfeitado|verbo
気兼ね|きがね|hesitação / constrangimento|substantivo
気軽|きがる|alegre / descontraído|adjetivo
危機|きき|crise|substantivo
聞き取り|ききとり|compreensão auditiva|substantivo
効き目|ききめ|efeito / virtude|substantivo
帰京|ききょう|retorno a Tóquio|verbo
戯曲|ぎきょく|peça / drama|substantivo
基金|ききん|fundo / fundação|substantivo
喜劇|きげき|comédia / peça cômica|substantivo
議決|ぎけつ|resolução / decisão|substantivo
棄権|きけん|abstenção de voto / renúncia|substantivo
既婚|きこん|casado|adjetivo
気障|きざ|afetação / esnobismo|substantivo
記載|きさい|menção / registro|substantivo
兆|きざし|sinal / presságio|substantivo
気質|きしつ|caráter / temperamento|substantivo
期日|きじつ|data fixa / data de liquidação|substantivo
きしむ|きしむ|ranger / chiar|verbo
議事堂|ぎじどう|prédio da Dieta|substantivo
記述|きじゅつ|descrição|substantivo
気象|きしょう|clima / tempo|substantivo
傷付く|きずつく|ficar magoado / ser ferido / se machucar|verbo
傷付ける|きずつける|ferir / magoar (sentimentos)|verbo
犠牲|ぎせい|sacrifício|substantivo
汽船|きせん|navio a vapor|substantivo
寄贈|きぞう|doação / apresentação|substantivo
偽造|ぎぞう|falsificação / fabricação / contrafação|substantivo
貴族|きぞく|nobre / aristocrata|substantivo
議題|ぎだい|tópico de discussão / agenda|substantivo
鍛える|きたえる|forjar / treinar / disciplinar|verbo
気立て|きだて|bom caráter / bondoso|adjetivo
きちっと|きちっと|exatamente / perfeitamente|advérbio
几帳面|きちょうめん|metódico / pontual / estável|adjetivo
きっかり|きっかり|exatamente / precisamente|advérbio
きっちり|きっちり|precisamente / apertado|advérbio
きっぱり|きっぱり|claramente / abertamente / distintamente|advérbio
規定|きてい|regulamento / provisões|substantivo
起点|きてん|ponto de partida|substantivo
軌道|きどう|órbita / trilha|substantivo
技能|ぎのう|habilidade técnica / capacidade|substantivo
規範|きはん|modelo / padrão / exemplo|substantivo
気品|きひん|graça / elegância|substantivo
気風|きふう|caráter / traços / ethos|substantivo
起伏|きふく|ondulação|substantivo
規模|きぼ|escala / escopo / plano / estrutura|substantivo
気まぐれ|きまぐれ|capricho / instabilidade de temperamento|substantivo
生真面目|きまじめ|sério / sinceridade|adjetivo
期末|きまつ|fim de semestre / fim de período|substantivo
きまりわるい|きまりわるい|sentir-se constrangido / envergonhado|adjetivo
記名|きめい|assinatura / registro|substantivo
規約|きやく|acordo / regras / código|substantivo
脚色|きゃくしょく|adaptação (de obra literária para cinema, etc.)|substantivo
逆転|ぎゃくてん|mudança (súbita) / reversão / reviravolta|substantivo
脚本|きゃくほん|roteiro / peça|substantivo
華奢|きゃしゃ|delicado / esguio|adjetivo
客観|きゃっかん|objetivo|adjetivo
キャッチ|キャッチ|capturar|verbo
キャリア|キャリア|carreira / funcionário público de carreira|substantivo
救援|きゅうえん|resgate / socorro / reforço|substantivo
休学|きゅうがく|afastamento temporário da escola|substantivo
究極|きゅうきょく|último / final / eventual|adjetivo
窮屈|きゅうくつ|apertado / estreito / formal|adjetivo
球根|きゅうこん|bulbo (de planta)|substantivo
救済|きゅうさい|ajuda / socorro / alívio|substantivo
給仕|きゅうじ|garçom|substantivo
給食|きゅうしょく|merenda escolar / fornecimento de refeição|substantivo
休戦|きゅうせん|trégua / armistício|substantivo
宮殿|きゅうでん|palácio|substantivo
旧知|きゅうち|velho amigo / antiga amizade|substantivo
窮乏|きゅうぼう|pobreza|substantivo
寄与|きよ|contribuição / serviço|substantivo
強|きょう|forte|adjetivo
～狂|～きょう|maníaco / fã / entusiasta|expressão
驚異|きょうい|maravilha / milagre|substantivo
教科|きょうか|disciplina / currículo|substantivo
協会|きょうかい|associação / sociedade / organização|substantivo
共学|きょうがく|coeducação|substantivo
共感|きょうかん|simpatia / compreensão|substantivo
境遇|きょうぐう|ambiente / circunstâncias|substantivo
教訓|きょうくん|lição, preceito, instrução moral|substantivo
強行|きょうこう|forçar, execução|substantivo
強硬|きょうこう|firme, vigoroso, teimoso|adjetivo
教材|きょうざい|materiais de ensino|substantivo
凶作|きょうさく|má colheita, safra ruim|substantivo
業者|ぎょうしゃ|comerciante, mercador|substantivo
教習|きょうしゅう|treinamento, instrução|substantivo
郷愁|きょうしゅう|nostalgia, saudade de casa|substantivo
教職|きょうしょく|profissão de professor|substantivo
興じる|きょうじる|divertir-se, festejar|verbo
強制|きょうせい|obrigação, compulsão, execução|substantivo
行政|ぎょうせい|administração|substantivo
業績|ぎょうせき|conquista, trabalho, contribuição|substantivo
共存|きょうぞん|coexistência|substantivo
協定|きょうてい|acordo, pacto, contrato|substantivo
郷土|きょうど|terra natal|substantivo
脅迫|きょうはく|ameaça, coerção|substantivo
業務|ぎょうむ|negócios, deveres, trabalho|substantivo
共鳴|きょうめい|ressonância, simpatia|substantivo
郷里|きょうり|local de nascimento, cidade natal|substantivo
強烈|きょうれつ|forte, intenso, severo|adjetivo
共和|きょうわ|republicanismo, cooperação|substantivo
局限|きょくげん|limite, localizar|substantivo
極端|きょくたん|extremo, extremidade|substantivo
居住|きょじゅう|residência|substantivo
拒絶|きょぜつ|recusa, rejeição|substantivo
漁船|ぎょせん|barco de pesca|substantivo
漁村|ぎょそん|vila de pescadores|substantivo
拒否|きょひ|negação, rejeição, recusa|substantivo
許容|きょよう|permissão, perdão|substantivo
清らか|きよらか|limpo, puro, casto|adjetivo
きらびやか|きらびやか|deslumbrante, vistoso, cintilante|adjetivo
～きり|～きり|apenas|partícula
義理|ぎり|dívida de gratidão, obrigação|substantivo
切替|きりかえ|troca, conversão, alternância|substantivo
気流|きりゅう|corrente atmosférica|substantivo
切れ目|きれめ|interrupção, pausa, lacuna|substantivo
疑惑|ぎわく|dúvida, receio, suspeita|substantivo
極めて|きわめて|extremamente, muito|advérbio
近眼|きんがん|miopia|substantivo
緊急|きんきゅう|urgente, premente, emergência|adjetivo
近郊|きんこう|subúrbios, periferia|substantivo
均衡|きんこう|equilíbrio, balanço|substantivo
禁じる|きんじる|proibir|verbo
勤勉|きんべん|indústria, diligência|substantivo
吟味|ぎんみ|exame, investigação cuidadosa|substantivo
勤務|きんむ|serviço, dever, trabalho|substantivo
禁物|きんもつ|tabu, coisa proibida|substantivo
勤労|きんろう|trabalho, esforço, serviço diligente|substantivo
クイズ|クイズ|quiz|substantivo
食い違う|くいちがう|cruzar-se, diferir|verbo
空間|くうかん|espaço, sala, espaço aéreo|substantivo
空腹|くうふく|fome|substantivo
区画|くかく|divisão, seção, área|substantivo
区間|くかん|seção|substantivo
茎|くき|caule|substantivo
区切り|くぎり|fim, parada, pontuação|substantivo
くぐる|くぐる|passar por; dar a volta|verbo
くじ (～をひく)|くじ (～をひく)|loteria, sorteio|substantivo
くじびき|くじびき|loteria, sorteio|substantivo
くすぐったい|くすぐったい|coceguinha|adjetivo
愚痴|ぐち|reclamação sem propósito, lamúria|substantivo
口吟む|くちずさむ|cantarolar|verbo
嘴|くちばし|bico|substantivo
朽ちる|くちる|apodrecer, decair|verbo
覆す|くつがえす|derrubar, virar, reverter|verbo
くっきり|くっきり|claramente, nitidamente, marcadamente|advérbio
屈折|くっせつ|dobra, refração, indentação|substantivo
ぐっと|ぐっと|firmemente, muito, mais|advérbio
首飾り|くびかざり|colar, adorno de pescoço|substantivo
首輪|くびわ|colar, gargantilha|substantivo
組み込む|くみこむ|incorporar, incluir, cortar (impressão)|verbo
組み合わせる|くみあわせる|juntar, combinar, unir|verbo
蔵|くら|armazém, adega|substantivo
グレー|グレー|cinza|substantivo
クレーン|クレーン|guindaste|substantivo
玄人|くろうと|especialista, profissional|substantivo
黒字|くろじ|lucro, saldo positivo|substantivo
軍艦|ぐんかん|navio de guerra, couraçado|substantivo
軍事|ぐんじ|assuntos militares|substantivo
君主|くんしゅ|monarca, soberano|substantivo
群集|ぐんしゅう|grupo, multidão, bando|substantivo
群衆|ぐんしゅう|grupo, multidão, bando|substantivo
軍備|ぐんび|armamento, preparativos militares|substantivo
軍服|ぐんぷく|uniforme militar ou naval|substantivo
芸|げい|arte, habilidade, performance|substantivo
経過|けいか|passagem, progresso|substantivo
軽快|けいかい|leve, animado, casual|adjetivo
警戒|けいかい|alerta, vigilância, advertência|substantivo
敬具|けいぐ|Atenciosamente|saudação
軽減|けいげん|redução, diminuição|substantivo
掲載|けいさい|aparição, publicação (ex: artigo em jornal)|substantivo
傾斜|けいしゃ|inclinação, inclinação, declive|substantivo
形成|けいせい|formação|substantivo
形勢|けいせい|condição, situação, perspectiva|substantivo
軽率|けいそつ|imprudente, descuidado, precipitado|adjetivo
刑罰|けいばつ|julgamento, pena, punição|substantivo
経費|けいひ|despesas, custo, desembolso|substantivo
警部|けいぶ|inspetor de polícia|substantivo
転換|てんかん|converter, desviar|verbo
転居|てんきょ|mudança de residência|substantivo
転勤|てんきん|transferência (para outro escritório de uma empresa)|substantivo
点検|てんけん|inspeção, exame, verificação|substantivo
電源|でんげん|fonte de eletricidade, energia (ex: botão da TV)|substantivo
天国|てんごく|paraíso, céu, Reino dos Céus|substantivo
天才|てんさい|gênio|substantivo
天災|てんさい|calamidade natural, desastre|substantivo
展示|てんじ|exposição, mostra|substantivo
伝説|でんせつ|tradição, lenda, folclore|substantivo
点線|てんせん|linha pontilhada|substantivo
転じる|てんじる|virar, mudar|verbo
転ずる|てんずる|virar, mudar|verbo
天体|てんたい|corpo celeste|substantivo
伝達|でんたつ|transmissão (ex: notícias, comunicação, entrega)|substantivo
天地|てんち|céu e terra, o universo|substantivo
てんで|てんで|nem um pouco, completamente, inteiramente|advérbio
転任|てんにん|mudança de posto|substantivo
展望|てんぼう|vista, perspectiva, panorama|substantivo
伝来|でんらい|ancestral, hereditário, importado|adjetivo
転落|てんらく|queda, degradação|substantivo
愛想|あいそう|sociabilidade|substantivo
間柄|あいだがら|relacionamento|substantivo
合間|あいま|intervalo|substantivo
敢えて|あえて|ousar / arriscar / desafiar|verbo
仰ぐ|あおぐ|olhar para cima / respeitar; pedir|verbo
垢|あか|sujeira, imundície|substantivo
赤字|あかじ|déficit, ir no vermelho|substantivo
明かす|あかす|revelar; ficar acordado|verbo
赤らむ|あからむ|ficar vermelho, corar|verbo
上がり|あがり|subida; renda; término, parada|substantivo
諦め|あきらめ|resignação, reconciliação, consolo|substantivo
アクセル|アクセル|acelerador|substantivo
あくどい|あくどい|exagerado, vulgar, perverso|adjetivo
顎|あご|queixo|substantivo
憧れ|あこがれ|anseio, desejo, aspiração|substantivo
麻|あさ|cânhamo|substantivo
あざ|あざ|marca de nascença, hematoma|substantivo
浅ましい|あさましい|vergonhoso, mesquinho, desprezível|adjetivo
欺く|あざむく|enganar|verbo
鮮やか|あざやか|vívido, claro|adjetivo
嘲笑う|あざわらう|escarnecer, ridicularizar|verbo
悪しからず|あしからず|não me leve a mal, mas..., desculpe|expressão
味わい|あじわい|sabor, prazer|substantivo
焦る|あせる|apressar-se, ficar impaciente|verbo
あせる (こえが～)|あせる (こえが～)|desvanecer, descolorir|verbo
値する|あたいする|valer a pena, merecer|verbo
悪化|あっか|deterioração, piora|substantivo
扱い|あつかい|tratamento, serviço|substantivo
呆気ない|あっけない|insuficiente, rápido demais (curto, longo, etc.)|adjetivo
あっさり|あっさり|facilmente, prontamente, rapidamente|advérbio
斡旋|あっせん|boas relações, mediação|substantivo
圧倒|あっとう|sobrecarregar, oprimir|verbo
圧迫|あっぱく|pressão, coerção, opressão|substantivo
あつらえる|あつらえる|encomendar, fazer um pedido|verbo
圧力|あつりょく|estresse, pressão|substantivo
当て|あて|expectativas; depender|substantivo
～宛|～あて|para... (por exemplo, em uma carta)|partícula
当て字|あてじ|caractere fonético equivalente, caractere substituto|substantivo
跡継ぎ|あとつぎ|herdeiro, sucessor|substantivo
後回し|あとまわし|adiar, postergar|substantivo
油絵|あぶらえ|pintura a óleo|substantivo
アプローチ|アプローチ|abordagem (em golfe)|substantivo
あべこべ|あべこべ|contrário, oposto, inverso|adjetivo
甘える|あまえる|agir como criança mimada, bajular|verbo
雨具|あまぐ|capa de chuva|substantivo
甘口|あまくち|sabor doce|substantivo
アマチュア|アマチュア|amador|substantivo
網|あみ|rede|substantivo
操る|あやつる|manipular, operar, puxar as cordas|verbo
危ぶむ|あやぶむ|temer, ter receios, ser duvidoso|verbo
あやふや|あやふや|incerto, vago, ambíguo|adjetivo
過ち|あやまち|falha, erro, indiscrição|substantivo
誤る|あやまる|cometer um erro|verbo
歩み|あゆみ|passo, progresso, história|substantivo
歩む|あゆむ|andar|verbo
予め|あらかじめ|com antecedência, previamente|advérbio
荒らす|あらす|danificar; invadir|verbo
争い|あらそい|disputa, briga, conflito|substantivo
改まる|あらたまる|ser renovado; ser formal|verbo
荒っぽい|あらっぽい|grosseiro, rude|adjetivo
問い合わせる|といあわせる|perguntar, buscar informação|verbo
当～|とう～|nosso(a)|expressão
胴|どう|tronco, corpo, estrutura|substantivo
同意|どうい|acordo, consentimento / mesmo significado|substantivo
動員|どういん|mobilização|substantivo
同感|どうかん|concordância, mesma opinião / mesmo sentimento|substantivo
陶器|とうき|cerâmica, louça|substantivo
討議|とうぎ|debate, discussão|substantivo
動機|どうき|motivo, incentivo|substantivo
等級|とうきゅう|grau, classe|substantivo
同級|どうきゅう|mesma série, mesma classe|substantivo
同居|どうきょ|morar junto|substantivo
登校|とうこう|comparecimento (à escola)|substantivo
統合|とうごう|integração, unificação, síntese|substantivo
動向|どうこう|tendência, movimento, atitude|substantivo
投資|とうし|investimento|substantivo
同情|どうじょう|simpatia, compaixão / simpatizar|substantivo
道場|どうじょう|dojo, salão de artes marciais / mandala|substantivo
統制|とうせい|regulamentação, controle|substantivo
当選|とうせん|ser eleito, ganhar o prêmio|substantivo
逃走|とうそう|fuga, deserção, escapada|substantivo
統率|とうそつ|comando, liderança|substantivo
到達|とうたつ|alcançar, atingir, chegada|substantivo
統治|とうち|governo, reinado, domínio|substantivo
仕切る|しきる|dividir, separar, demarcar|verbo
資金|しきん|fundos, capital|substantivo
軸|じく|eixo, haste, vara|substantivo
しくじる|しくじる|falhar, fracassar, cometer um erro|verbo
仕組|しくみ|estrutura, mecanismo|substantivo
死刑|しけい|pena de morte|substantivo
湿気る|しける|estar úmido, estar molhado|verbo
施行|しこう|execução, operação|substantivo
思考|しこう|pensamento|substantivo
志向|しこう|intenção, objetivo|substantivo
嗜好|しこう|gosto, preferência|substantivo
事項|じこう|assunto(s), item(s), fato(s)|substantivo
時刻表|じこくひょう|quadro de horários, horário (de trem)|substantivo
地獄|じごく|inferno|substantivo
時差|じさ|diferença de horário|substantivo
自在|じざい|livremente, à vontade|advérbio
視察|しさつ|inspeção, observação|substantivo
資産|しさん|propriedade, fortuna, bens|substantivo
支持|しじ|apoio, suporte|substantivo
自主|じしゅ|independência, autonomia|substantivo
自首|じしゅ|rendição, entregar-se|substantivo
刺繍|ししゅう|bordado|substantivo
辞職|じしょく|demissão, renúncia|substantivo
雫|しずく|gota (de água)|substantivo
システム|システム|sistema|substantivo
沈める|しずめる|afundar, submergir|verbo
施設|しせつ|estabelecimento, instalação|substantivo
事前|じぜん|prévia, antes, com antecedência|advérbio
子息|しそく|filho(a) (honorífico)|substantivo
持続|じぞく|continuação, resistência|substantivo
自尊心|じそんしん|autoestima, arrogância|substantivo
慕う|したう|anseiar, adorar|verbo
下心|したごころ|intenção secreta, motivo|substantivo
下地|したじ|base, alicerce|substantivo
親しむ|したしむ|ser íntimo de, fazer amizade|verbo
下調べ|したしらべ|investigação preliminar|substantivo
アラブ|アラブ|árabe|substantivo
霰|あられ|granizo|substantivo
有り様|ありさま|estado, condição|substantivo
ありのまま|ありのまま|a verdade, como é, francamente|expressão
ありふれる|ありふれる|comum, ordinário, rotineiro|adjetivo
アルカリ|アルカリ|álcali|substantivo
アルミ|アルミ|alumínio|substantivo
アワー|アワー|hora|substantivo
合わす|あわす|juntar, encarar, unir|verbo
～合せ|～あわせ|em tudo|expressão
アンコール|アンコール|encore|substantivo
暗殺|あんさつ|assassinato|substantivo
暗算|あんざん|aritmética mental|substantivo
暗示|あんじ|sugestão, dica|substantivo
案じる|あんじる|estar ansioso, ponderar|verbo
安静|あんせい|descanso|substantivo
案の定|あんのじょう|com certeza, como sempre|expressão
いい加減|いいかげん|aleatório, irresponsável|adjetivo
言い訳|いいわけ|desculpa, explicação|substantivo
イェス|イェス|sim; Jesus|expressão
家出|いえで|fugir de casa|substantivo
生かす|いかす|manter vivo; fazer uso de|verbo
いかに|いかに|como, de que maneira|advérbio
いかにも|いかにも|verdadeiramente, realmente|advérbio
異議|いぎ|objeção, discordância, protesto|substantivo
生き甲斐|いきがい|algo pelo qual se vive, muito importante|substantivo
行き違い|いきちがい|mal-entendido, desacordo|substantivo
意気込む|いきごむ|entusiasmar-se com|verbo
育成|いくせい|criação, treinamento, cultivo|substantivo
幾多|いくた|muitos, numerosos|adjetivo
(花を〜) 生ける, 活ける|(はなを～) いける|arranjar (flores)|verbo
異見|いけん|opinião diferente, objeção|substantivo
意向|いこう|intenção, ideia, inclinação|substantivo
移行|いこう|mudança para|substantivo
いざ|いざ|agora, venha (agora), momento crucial|expressão
移住|いじゅう|migração, imigração|substantivo
衣装|いしょう|roupa, traje, vestuário|substantivo
いじる|いじる|tocar, mexer em|verbo
異性|いせい|o sexo oposto|substantivo
遺跡|いせき|ruínas históricas|substantivo
依存|いぞん|dependência, dependente, confiança|substantivo
委託|いたく|consignar (mercadorias), confiar|verbo
いたって|いたって|muito, extremamente|advérbio
出世|しゅっせ|promoção, carreira de sucesso, destaque|substantivo
出題|しゅつだい|propor uma questão|substantivo
出動|しゅつどう|mobilização, ação|substantivo
出費|しゅっぴ|despesas, desembolsos|substantivo
出品|しゅっぴん|exposição, display|substantivo
主導|しゅどう|liderança principal|substantivo
主任|しゅにん|pessoa encarregada, oficial responsável|substantivo
首脳|しゅのう|chefe, líder|substantivo
守備|しゅび|defesa|substantivo
手法|しゅほう|técnica|substantivo
樹木|じゅもく|árvores e arbustos, arbor|substantivo
樹立|じゅりつ|estabelecer, criar|verbo
準急|じゅんきゅう|expresso local (trem)|substantivo
準じる|じゅんじる|seguir, conformar-se, aplicar-se a|verbo
～署|～しょ|departamento|expressão
～症|～しょう|doença|expressão
～証|～しょう|prova, certificado|expressão
済ます|すます|terminar / resolver / dispensar|verbo
すみやか|すみやか|rápido|adjetivo
スラックス|スラックス|calças|substantivo
ずらっと|ずらっと|em fila / em linha|advérbio
ずるずる|ずるずる|arrastando / som de fungada|advérbio
ずれ|ずれ|diferença / lacuna|substantivo
すれちがい|すれちがい|encontro casual|substantivo
擦れる|すれる|esfregar / irritar|verbo
すんなり|すんなり|passar sem objeção / esguio|advérbio
生育|せいいく|crescimento / desenvolvimento / criação|substantivo
成育|せいいく|crescimento / criação|substantivo
成果|せいか|resultados / frutos|substantivo
正解|せいかい|correto / resposta certa / solução|adjetivo
正義|せいぎ|justiça / direito / retidão|substantivo
生計|せいけい|meio de vida / sustento|substantivo
政権|せいけん|administração (política) / poder político|substantivo
星座|せいざ|constelação|substantivo
制裁|せいさい|contenção / sanções / punição|substantivo
政策|せいさく|medidas políticas / política|substantivo
生死|せいし|vida e morte|substantivo
静止|せいし|imobilidade / repouso / ficar parado|substantivo
誠実|せいじつ|sincero / honesto / leal|adjetivo
成熟|せいじゅく|maturidade / maturação|substantivo
青春|せいしゅん|juventude / primavera da vida / adolescente|substantivo
清純|せいじゅん|pureza / inocência|substantivo
聖書|せいしょ|Bíblia|substantivo
正常|せいじょう|normalidade / normal|substantivo
制する|せいする|controlar / comandar|verbo
整然|せいぜん|ordenado / regular / bem organizado|adjetivo
盛装|せいそう|vestir-se bem / usar roupas ricas|verbo
盛大|せいだい|grandioso / próspero / magnífico|adjetivo
清濁|せいだく|bem e mal / pureza e impureza|substantivo
制定|せいてい|promulgação / estabelecimento / criação|substantivo
静的|せいてき|estático|adjetivo
製鉄|せいてつ|fabricação de ferro|substantivo
晴天|せいてん|tempo bom|substantivo
正当|せいとう|justo / devido / adequado|adjetivo
制服|せいふく|uniforme|substantivo
征服|せいふく|conquista / subjugação / superação|substantivo
製法|せいほう|método de fabricação / receita / fórmula|substantivo
精密|せいみつ|preciso / exato / detalhado / minucioso|adjetivo
税務署|ぜいむしょ|repartição de impostos|substantivo
制約|せいやく|limitação / restrições|substantivo
勢力|せいりょく|influência / poder / força / poder|substantivo
整列|せいれつ|formar fila / alinhar-se|verbo
セール|セール|promoção / liquidação|substantivo
急かす|せかす|apressar / urgir|verbo
伜|せがれ|filho / meu filho|substantivo
責務|せきむ|dever / obrigação|substantivo
セクション|セクション|seção|substantivo
世辞|せじ|elogio / lisonja|substantivo
世帯|せたい|domicílio / lar|substantivo
是正|ぜせい|correção / revisão|substantivo
世代|せだい|geração|substantivo
切開|せっかい|abertura / corte|substantivo
セックス|セックス|sexo|substantivo
切実|せつじつ|urgente / sério / severo / agudo|adjetivo
接触|せっしょく|toque / contato|substantivo
接続詞|せつぞくし|conjunção|substantivo
設置|せっち|estabelecimento / instituição|substantivo
審査|しんさ|julgamento, inspeção, exame|substantivo
人材|じんざい|homem de talento|substantivo
紳士|しんし|cavalheiro|substantivo
真実|しんじつ|verdade, realidade|substantivo
信者|しんじゃ|crente, devoto|substantivo
真珠|しんじゅ|pérola|substantivo
進出|しんしゅつ|avanço, progresso|substantivo
心情|しんじょう|mentalidade, estado de espírito|substantivo
新人|しんじん|cara nova, novato|substantivo
神聖|しんせい|santidade, sacralidade, dignidade|substantivo
親善|しんぜん|amizade, boa vontade|substantivo
真相|しんそう|verdade, situação real|substantivo
迅速|じんそく|rápido, veloz, pronto|adjetivo
人体|じんたい|corpo humano|substantivo
新築|しんちく|edifício novo, construção nova|substantivo
心中|しんじゅう|suicídio duplo|substantivo
進呈|しんてい|apresentação, oferta|substantivo
進展|しんてん|progresso, desenvolvimento|substantivo
神殿|しんでん|templo, lugar sagrado|substantivo
進度|しんど|progresso, avanço|substantivo
振動|しんどう|oscilação, vibração|substantivo
新入生|しんにゅうせい|aluno novo, estudante do primeiro ano, calouro|substantivo
信任|しんにん|confiança, crédito|substantivo
神秘|しんぴ|mistério, enigma|substantivo
辛抱|しんぼう|paciência, resistência|substantivo
人民|じんみん|povo, público|substantivo
侵略|しんりゃく|agressão, invasão, ataque|substantivo
診療|しんりょう|exame e tratamento médico|substantivo
水源|すいげん|fonte de rio|substantivo
推進|すいしん|propulsão, força motriz|substantivo
吹奏|すいそう|tocar instrumentos de sopro|verbo
推測|すいそく|palpite, conjectura|substantivo
水田|すいでん|campo de arroz (alagado)|substantivo
推理|すいり|raciocínio, inferência, gênero de mistério ou detetive|substantivo
数詞|すうし|numeral|substantivo
崇拝|すうはい|adoração, culto|substantivo
据え付ける|すえつける|instalar, equipar, montar|verbo
据える|すえる|colocar, depositar, assentar|verbo
すがすがしい|すがすがしい|fresco, revigorante|adjetivo
救い|すくい|ajuda, auxílio, alívio|substantivo
すくう (みずを～)|すくう (みずを～)|colher (água)|verbo
健やか|すこやか|vigoroso, saudável, são|adjetivo
濯ぐ|すすぐ|enxaguar, lavar|verbo
進み|すすみ|progresso, avanço|substantivo
裾|すそ|bainha (de calça), barra (de saia), corte de cabelo|substantivo
スタジオ|スタジオ|estúdio|substantivo
スチーム|スチーム|vapor|substantivo
ストライキ|ストライキ|greve|substantivo
スト|スト|greve|substantivo
ストロー|ストロー|canudo|substantivo
ストロボ|ストロボ|estroboscópio (lâmpada estroboscópica)|substantivo
すばしこい|すばしこい|ágil, esperto, rápido|adjetivo
素早い|すばやい|rápido, veloz|adjetivo
ずばり|ずばり|decisivamente, sem rodeios, francamente|advérbio
スプリング|スプリング|mola|substantivo
スペース|スペース|espaço|substantivo
ずぶぬれ|ずぶぬれ|ensopado, encharcado|adjetivo
スポーツカー|スポーツカー|carro esportivo|substantivo
澄ます|すます|limpar, purificar, escutar atentamente|verbo
清ます|すます|limpar, purificar, escutar atentamente|verbo
折衷|せっちゅう|compromisso / mistura / ecletismo|substantivo
設定|せってい|estabelecimento / criação|substantivo
説得|せっとく|persuasão|substantivo
切ない|せつない|doloroso / difícil / triste|adjetivo
絶版|ぜっぱん|esgotado|substantivo
設立|せつりつ|estabelecimento / fundação|substantivo
攻め|せめ|ataque / ofensa|substantivo
ゼリー|ゼリー|geleia|substantivo
セレモニー|セレモニー|cerimônia|substantivo
世論|せろん|opinião pública|substantivo
繊維|せんい|fibra / têxtil|substantivo
全快|ぜんかい|recuperação completa da saúde|substantivo
宣教|せんきょう|missão religiosa|substantivo
宣言|せんげん|declaração / proclamação|substantivo
戦災|せんさい|danos de guerra|substantivo
専修|せんしゅう|especialização|substantivo
戦術|せんじゅつ|tática|substantivo
センス|センス|senso (de música, estilo, tato, etc.)|substantivo
潜水|せんすい|mergulho|substantivo
全盛|ぜんせい|auge da prosperidade|substantivo
先代|せんだい|predecessor familiar / geração anterior|substantivo
先だって|せんだって|recentemente / outro dia|advérbio
先着|せんちゃく|primeira chegada|substantivo
前提|ぜんてい|preâmbulo / premissa / pré-requisito|substantivo
先天的|せんてんてき|inerente / congênito / hereditário|adjetivo
前途|ぜんと|perspectivas futuras / o caminho a seguir|substantivo
戦闘|せんとう|batalha / luta / combate|substantivo
潜入|せんにゅう|infiltração / entrar furtivamente|substantivo
船舶|せんぱく|navio|substantivo
全滅|ぜんめつ|aniquilação|substantivo
専用|せんよう|uso exclusivo / uso pessoal|substantivo
占領|せんりょう|ocupação / posse|substantivo
善良|ぜんりょう|bondade / virtude|substantivo
戦力|せんりょく|potencial de guerra|substantivo
前例|ぜんれい|precedente|substantivo
相応|そうおう|adequação / cabimento|substantivo
総会|そうかい|assembleia geral|substantivo
創刊|そうかん|lançamento (ex: jornal, primeira edição)|substantivo
雑木|ぞうき|vários tipos de árvores pequenas / árvores sortidas|substantivo
早急|そうきゅう|urgente|adjetivo
増強|ぞうきょう|reforçar / aumentar|verbo
送金|そうきん|remessa / envio de dinheiro|substantivo
走行|そうこう|condução de um veículo com rodas (ex: carro, viagem)|substantivo
総合|そうごう|síntese / generalização|substantivo
捜索|そうさく|busca (especialmente por alguém ou algo perdido, investigação)|substantivo
蔵相|ぞうしょう|Ministro das Finanças|substantivo
装飾|そうしょく|ornamento|substantivo
増進|ぞうしん|promoção / aumento / avanço|substantivo
相対|そうたい|relativo|adjetivo
壮大|そうだい|magnífico / grandioso / majestoso|adjetivo
騒動|そうどう|luta / motim / rebelião|substantivo
遭難|そうなん|desastre / naufrágio / acidente|substantivo
相場|そうば|preço de mercado / especulação / estimativa|substantivo
装備|そうび|equipamento|substantivo
創立|そうりつ|estabelecimento / fundação|substantivo
添える|そえる|adicionar a / anexar / acompanhar|verbo
ソース|ソース|fonte|substantivo
即座に|そくざに|imediatamente / logo em seguida|advérbio
促進|そくしん|promoção / aceleração / encorajamento|substantivo
即する|そくする|conformar-se a / concordar com / ser adaptado a|verbo
束縛|そくばく|restrição / restrição / confinamento|substantivo
側面|そくめん|lado / lateral|substantivo
損う|そこなう|prejudicar / machucar|verbo
そこら|そこら|em todo lugar / em algum lugar|advérbio
素材|そざい|matéria-prima / assunto|substantivo
阻止|そし|obstrução / impedimento|substantivo
訴訟|そしょう|litígio / processo judicial|substantivo
育ち|そだち|criação / crescimento|substantivo
措置|そち|medida / passo|substantivo
ソックス|ソックス|meias|substantivo
素っ気無い|そっけない|frio / curto / rude|adjetivo
外方|そっぽ|desviar o olhar|expressão
備え付ける|そなえつける|equipar / fornecer|verbo
備わる|そなわる|ser equipado com|verbo
具わる|そなわる|ser equipado com|verbo
聳える|そびえる|erguer-se / pairar|verbo
素朴|そぼく|simplicidade / ingenuidade|substantivo
背く|そむく|desobedecer / ir contra|verbo
染まる|そまる|ser tingido|verbo
染める|そめる|tingir / colorir|verbo
そらす|そらす|desviar / entortar|verbo
そり (～にのる)|そり (～にのる)|trenó|substantivo
それゆえ|それゆえ|portanto / por isso|conector
ソロ|ソロ|solo|substantivo
揃い|そろい|conjunto / uniforme|substantivo
ぞんざい|ぞんざい|rude / descuidado|adjetivo
損失|そんしつ|perda|substantivo
存続|そんぞく|duração / continuação|substantivo
ダース|ダース|dúzia|contador
対応|たいおう|lidar com / resposta|verbo
退化|たいか|degeneração / retrocesso|substantivo
大概|たいがい|em geral / principalmente|advérbio
体格|たいかく|físico / constituição|substantivo
大金|たいきん|grande quantia de dinheiro|substantivo
待遇|たいぐう|tratamento / recepção|substantivo
対決|たいけつ|confronto / confronto|substantivo
体験|たいけん|experiência pessoal|substantivo
対抗|たいこう|oposição / antagonismo|substantivo
退治|たいじ|extermínio|substantivo
大衆|たいしゅう|público em geral|substantivo
対処|たいしょ|lidar com / resolver|verbo
退職|たいしょく|aposentadoria|substantivo
題する|だいする|intitular / nomear|verbo
態勢|たいせい|atitude / tendências|substantivo
対談|たいだん|diálogo / conversa|substantivo
大胆|だいたん|ousado / audacioso|adjetivo
対等|たいとう|equivalente / par|adjetivo
台無し|だいなし|bagunça / arruinado|expressão
滞納|たいのう|inadimplência / atraso|substantivo
対比|たいひ|contraste / comparação|substantivo
タイピスト|タイピスト|digitador(a)|substantivo
大部|たいぶ|maior parte / bastante|advérbio
大便|だいべん|fezes|substantivo
代弁|だいべん|falar em nome de outro|verbo
待望|たいぼう|muito esperado / espera|substantivo
台本|だいほん|roteiro / libreto|substantivo
タイマー|タイマー|temporizador|substantivo
怠慢|たいまん|negligência / descuido|substantivo
タイミング|タイミング|tempo / cadência|substantivo
タイム|タイム|tempo|substantivo
タイムリー|タイムリー|oportuno, corrida impulsionada (beisebol), RBI|substantivo
対面|たいめん|entrevista, reunião|substantivo
代用|だいよう|substituição|substantivo
体力|たいりょく|força física|substantivo
タイル|タイル|ladrilho, azulejo|substantivo
対話|たいわ|conversa, diálogo|substantivo
耐える|たえる|suportar, aguentar|verbo
絶える|たえる|extinguir-se, desaparecer|verbo
断える|たえる|cessar, extinguir-se|verbo
打開|だかい|solução, avanço|substantivo
焚火|たきび|fogueira|substantivo
妥協|だきょう|compromisso, ceder|substantivo
たくましい|たくましい|robusto, forte, firme|adjetivo
巧み|たくみ|habilidade, perspicácia|substantivo
丈|たけ|comprimento, altura|substantivo
打撃|だげき|golpe, dano; rebatida (beisebol)|substantivo
妥結|だけつ|acordo|substantivo
駄作|ださく|obra pobre|substantivo
足し算|たしざん|adição|substantivo
多数決|たすうけつ|voto majoritário|substantivo
助け|たすけ|assistência, ajuda|substantivo
携わる|たずさわる|estar envolvido em, participar|verbo
漂う|ただよう|flutuar, pairar, espalhar-se|verbo
立ち去る|たちさる|ir embora, partir|verbo
立ち寄る|たちよる|parar rapidamente, dar uma passada|verbo
抱っこ|だっこ|abraço (de criança)|substantivo
達者|たっしゃ|habilidoso, em boa saúde|adjetivo
脱出|だっしゅつ|fuga, evasão|substantivo
脱する|だっする|escapar de, sair de|verbo
達成|たっせい|realização, conquista|substantivo
脱退|だったい|secessão, retirada|substantivo
だったら|だったら|se for o caso|expressão
立て替える|たてかえる|pagar adiantado, pagar por outro|verbo
建前|たてまえ|posição; atitude pública; princípio|substantivo
奉る|たてまつる|oferecer, fazer respeitosamente|verbo
だと|だと|se for o caso|expressão
他動詞|たどうし|verbo transitivo (objeto direto)|substantivo
辿り着く|たどりつく|chegar, conseguir de alguma forma|verbo
辿る|たどる|seguir (estrada), perseguir (curso), acompanhar|verbo
束ねる|たばねる|amarrar em um feixe, controlar|verbo
だぶだぶ|だぶだぶ|largo, folgado|adjetivo
他方|たほう|outro lado, por outro lado|advérbio
多忙|たぼう|ocupado, atarefado|adjetivo
給う|たまう|receber, conceder|verbo
魂|たましい|alma, espírito|substantivo
溜まり|たまり|coletado, ponto de encontro, atrasos|substantivo
賜る|たまわる|conceder, outorgar|verbo
保つ|たもつ|manter, preservar, sustentar|verbo
たやすい|たやすい|fácil, simples, leve|adjetivo
多様|たよう|diversidade, variedade|substantivo
だるい|だるい|lento, sentir-se pesado (cansado), lânguido|adjetivo
弛み|たるみ|folga, afrouxamento|substantivo
弛む|たるむ|afrouxar, soltar, relaxar|verbo
垂れる|たれる|pendurar, cair; pingar|verbo
タレント|タレント|talento, estrela, personalidade|substantivo
タワー|タワー|torre|substantivo
単一|たんいつ|único, simples, só|adjetivo
短歌|たんか|poema japonês de 31 sílabas|substantivo
担架|たんか|maca, padiola|substantivo
短気|たんき|temperamento explosivo, impaciência|substantivo
団結|だんけつ|unidade, união, solidariedade|substantivo
探検|たんけん|exploração, expedição|substantivo
断言|だんげん|afirmação, declaração, assertiva|substantivo
短縮|たんしゅく|redução, abreviação, encurtamento|substantivo
断然|だんぜん|firmemente, absolutamente, definitivamente|advérbio
炭素|たんそ|carbono|substantivo
短大|たんだい|faculdade comunitária, faculdade júnior|substantivo
単調|たんちょう|monotonia, monotonia, monotonia|substantivo
単独|たんどく|único, solitário|adjetivo
旦那|だんな|marido, senhor (de casa)|substantivo
短波|たんぱ|onda curta|substantivo
蛋白質|たんぱくしつ|proteína|substantivo
ダンプ|ダンプ|caminhão basculante|substantivo
断面|だんめん|seção transversal, corte|substantivo
弾力|だんりょく|elasticidade, flexibilidade|substantivo
治安|ちあん|ordem pública, segurança|substantivo
チームワーク|チームワーク|trabalho em equipe|substantivo
チェンジ|チェンジ|mudança|substantivo
違える|ちがえる|mudar, alterar|verbo
畜産|ちくさん|pecuária, criação de animais|substantivo
畜生|ちくしょう|besta, animal, maldição|substantivo
蓄積|ちくせき|acumulação, acúmulo, estoque|substantivo
地形|ちけい|forma de relevo, característica geográfica, topografia|substantivo
知性|ちせい|inteligência|substantivo
乳|ちち|leite, seio, volta|substantivo
縮まる|ちぢまる|encurtar-se, contrair-se, encolher-se|verbo
秩序|ちつじょ|ordem, regularidade|substantivo
窒息|ちっそく|sufocação|substantivo
知的|ちてき|intelectual|adjetivo
着手|ちゃくしゅ|embarque, início, lançamento|substantivo
着色|ちゃくしょく|coloração, tingimento|substantivo
着席|ちゃくせき|sentar-se, sentar|verbo
着目|ちゃくもく|atenção, foco|substantivo
着陸|ちゃくりく|aterrissagem, pouso|substantivo
着工|ちゃっこう|início de obras|substantivo
茶の間|ちゃのま|sala de estar (estilo japonês)|substantivo
茶の湯|ちゃのゆ|cerimônia do chá|substantivo
ちやほや|ちやほや|mimado, bajulado, mimado|verbo
チャンネル|チャンネル|canal|substantivo
宙返り|ちゅうがえり|pirueta, mortal|substantivo
中継|ちゅうけい|revezamento, transmissão|substantivo
忠告|ちゅうこく|aconselhamento, advertência|substantivo
中傷|ちゅうしょう|difamação, calúnia, difamação|substantivo
中枢|ちゅうすう|centro, eixo, núcleo|substantivo
抽選|ちゅうせん|loteria, rifa, sorteio|substantivo
中断|ちゅうだん|interrupção, suspensão, pausa|substantivo
中毒|ちゅうどく|envenenamento|substantivo
中腹|ちゅうふく|meia encosta, a meio caminho da montanha|substantivo
中立|ちゅうりつ|neutralidade|substantivo
中和|ちゅうわ|neutralização, contraposição|verbo
～著|～ちょ|escrito por|conector
腸|ちょう|intestinos, entranhas|substantivo
蝶|ちょう|borboleta|substantivo
超|ちょう|super-, ultra-, hiper-|expressão
調印|ちょういん|assinatura, selo|substantivo
聴覚|ちょうかく|audição, sentido da audição|substantivo
長官|ちょうかん|chefe, secretário (governo)|substantivo
聴講|ちょうこう|assistência a palestras, auditoria|substantivo
徴収|ちょうしゅう|cobrança, imposto|substantivo
聴診器|ちょうしんき|estetoscópio|substantivo
調停|ちょうてい|arbitragem, conciliação, mediação|substantivo
重複|ちょうふく|duplicação, repetição, sobreposição|substantivo
長編|ちょうへん|longo (e.g., romance, filme)|adjetivo
重宝|ちょうほう|conveniente, útil|adjetivo
調理|ちょうり|cozinha|substantivo
調和|ちょうわ|harmonia|substantivo
ちょくちょく|ちょくちょく|frequentemente, de vez em quando|advérbio
直面|ちょくめん|confronto|substantivo
著書|ちょしょ|obra literária, livro|substantivo
貯蓄|ちょちく|poupança|substantivo
直感|ちょっかん|intuição, instinto|substantivo
著名|ちょめい|bem conhecido, notável, celebrado|adjetivo
ちらっと|ちらっと|de relance, por acaso|advérbio
塵取り|ちりとり|pá de lixo|substantivo
賃金|ちんぎん|salários|substantivo
沈殿|ちんでん|precipitação, deposição, sedimentação|substantivo
沈没|ちんぼつ|naufrágio, afundamento|substantivo
沈黙|ちんもく|silêncio, reticência|substantivo
陳列|ちんれつ|exposição, mostruário, mostra|substantivo
追及|ついきゅう|investigação, inquérito|substantivo
追跡|ついせき|perseguição|substantivo
追放|ついほう|exílio, banimento|substantivo
費やす|ついやす|gastar, dedicar, desperdiçar|verbo
墜落|ついらく|queda, queda|substantivo
痛感|つうかん|sentir profundamente, realizar completamente|expressão
通常|つうじょう|comum, normal, usual|adjetivo
痛切|つうせつ|agudo, profundo|adjetivo
杖|つえ|bengala|substantivo
使い道|つかいみち|uso|substantivo
仕える|つかえる|servir, trabalhar para|verbo
司る|つかさどる|governar, administrar|verbo
つかの間|つかのま|momento, breve momento|substantivo
月並|つきなみ|convencional, banal, comum|adjetivo
継目|つぎめ|junta, costura|substantivo
尽きる|つきる|esgotar-se, acabar|verbo
尽くす|つくす|esgotar, acabar; dedicar, servir|verbo
つくづく|つくづく|completamente, realmente|advérbio
作り|つくり|maquiagem, estrutura, físico|substantivo
造り|つくり|maquiagem, estrutura, físico|substantivo
繕う|つくろう|remendar, reparar|verbo
付け加える|つけくわえる|adicionar uma coisa a outra|verbo
告げる|つげる|informar|verbo
つじつま (はなしの～)|つじつま (はなしの～)|coerência, consistência|substantivo
筒|つつ|cano, tubo|substantivo
突っ突く|つっつく|dar um toque, incentivar|verbo
謹む|つつしむ|ser cuidadoso, ser casto ou discreto|verbo
突っ張る|つっぱる|apoiar, ficar rígido; empurrar (o oponente), aderir (à opinião), insistir em|verbo
務まる|つとまる|ser igual, ser adequado|verbo
勤め先|つとめさき|local de trabalho|substantivo
努めて|つとめて|faça um esforço!, trabalhe duro!|advérbio
津波|つなみ|tsunami, onda gigante|substantivo
つねる|つねる|beliscar|verbo
募る|つのる|convidar, solicitar ajuda, participação, etc|verbo
唾|つば|saliva, cuspe, escarro|substantivo
呟く|つぶやく|resmungar, murmurar|verbo
つぶら|つぶら|redondo, rotundo|adjetivo
つぶる (めを～)|つぶる (めを～)|fechar os olhos|verbo
壷|つぼ|jarro, pote, vaso|substantivo
蕾|つぼみ|botão, botão de flor|substantivo
連なる|つらなる|estender-se, esticar-se, ficar em fila|verbo
～嬢|～じょう|jovem mulher|substantivo
上位|じょうい|superior / mais alto|substantivo
上演|じょうえん|performance artística|substantivo
城下|じょうか|terra perto do castelo|substantivo
消去|しょうきょ|eliminação / exclusão|substantivo
上空|じょうくう|céu / ar superior|substantivo
衝撃|しょうげき|choque / impacto / colisão|substantivo
証言|しょうげん|evidência / testemunho|substantivo
証拠|しょうこ|evidência / prova|substantivo
照合|しょうごう|verificação / confronto|substantivo
詳細|しょうさい|detalhe / particularidade|substantivo
上昇|じょうしょう|subida / ascensão|substantivo
昇進|しょうしん|promoção|substantivo
称する|しょうする|chamar-se / intitular-se|verbo
情勢|じょうせい|estado das coisas / situação|substantivo
消息|しょうそく|notícia / rumor / circunstâncias|substantivo
承諾|しょうだく|consentimento / acordo|substantivo
情緒|じょうちょ|emoção / sentimento|substantivo
象徴|しょうちょう|símbolo|substantivo
小児科|しょうにか|pediatria|substantivo
使用人|しようにん|empregado / servo|substantivo
情熱|じょうねつ|paixão / entusiasmo|substantivo
譲歩|じょうほ|concessão / compromisso|substantivo
条約|じょうやく|tratado / pacto|substantivo
勝利|しょうり|vitória / triunfo|substantivo
上陸|じょうりく|pouso / desembarque|substantivo
蒸溜|じょうりゅう|destilação|substantivo
奨励|しょうれい|incentivo / promoção|substantivo
ショー|ショー|show|substantivo
除外|じょがい|exclusão / exceção|substantivo
職員|しょくいん|membro da equipe / pessoal|substantivo
植民地|しょくみんち|colônia|substantivo
職務|しょくむ|deveres profissionais|substantivo
諸君|しょくん|Senhoras e senhores!|expressão
助言|じょげん|conselho / sugestão|substantivo
徐行|じょこう|andando devagar|expressão
所在|しょざい|paradeiro / localização|substantivo
所持|しょじ|posse / detenção|substantivo
所属|しょぞく|afiliado a / pertencente a|substantivo
処置|しょち|tratamento / medida|substantivo
しょっちゅう|しょっちゅう|sempre / constantemente|advérbio
所定|しょてい|fixo / prescrito|adjetivo
所得|しょとく|renda / rendimento|substantivo
処罰|しょばつ|punição|substantivo
初版|しょはん|primeira edição|substantivo
書評|しょひょう|resenha de livro|substantivo
処分|しょぶん|descarte / punição|substantivo
庶民|しょみん|plebe / gente comum|substantivo
庶務|しょむ|assuntos gerais|substantivo
所有|しょゆう|posse / propriedade|substantivo
調べ|しらべ|investigação / consulta|substantivo
自立|じりつ|independência / autossuficiência|substantivo
記す|しるす|anotar / escrever|verbo
指令|しれい|ordens / diretrizes|substantivo
～心|～しん|mente de ~|partícula
陣|じん|formação de batalha / acampamento|substantivo
進化|しんか|evolução / progresso|substantivo
人格|じんかく|personalidade / caráter|substantivo
審議|しんぎ|deliberação|substantivo
新婚|しんこん|recém-casado|adjetivo
発言|はつげん|manifestação / fala / proposta|substantivo
バッジ|バッジ|distintivo|substantivo
発生|はっせい|surto / nascer / ocorrência|substantivo
仕立てる|したてる|costurar / fazer / preparar|verbo
下取り|したどり|dar como entrada / permuta|substantivo
下火|したび|baixo / desvanecendo / declinando|adjetivo
実家|じっか|casa dos pais|substantivo
失格|しっかく|desqualificação / eliminação / incapacidade|substantivo
質疑|しつぎ|pergunta|substantivo
失脚|しっきゃく|perder posição / ser derrubado / cair|substantivo
実業家|じつぎょうか|industrialista / empresário|substantivo
シック|シック|elegante|adjetivo
じっくり|じっくり|deliberadamente / cuidadosamente|advérbio
躾|しつけ|disciplina / treinamento|substantivo
躾ける|しつける|disciplinar / ensinar boas maneiras|verbo
実践|じっせん|prática / colocar em prática|substantivo
質素|しっそ|simplicidade / modéstia / frugalidade|substantivo
実態|じったい|verdade / fato|substantivo
失調|しっちょう|falta de harmonia / desequilíbrio|substantivo
嫉妬|しっと|ciúme|substantivo
実費|じっぴ|custo real / preço de custo|substantivo
指摘|してき|apontar / identificação|substantivo
自転|じてん|rotação / giro|substantivo
助動詞|じょどうし|verbo auxiliar|substantivo
淑やか|しとやか|graciosa|adjetivo
萎びる|しなびる|murchar / desvanecer|verbo
シナリオ|シナリオ|cenário|substantivo
しなやか|しなやか|flexível / elástico|adjetivo
屎尿|しにょう|resíduos humanos|substantivo
地主|じぬし|proprietário de terras|substantivo
凌ぐ|しのぐ|superar / suportar|verbo
芝|しば|gramado|substantivo
始発|しはつ|primeiro trem|substantivo
耳鼻科|じびか|otorrinolaringologia|substantivo
私物|しぶつ|propriedade privada / efeitos pessoais|substantivo
しぶとい|しぶとい|tenaz / teimoso|adjetivo
司法|しほう|administração da justiça|substantivo
始末|しまつ|descarte / arrumação posterior|substantivo
染みる|しみる|ensopar / penetrar|verbo
使命|しめい|missão / recado / mensagem|substantivo
地元|じもと|local|substantivo
視野|しや|campo de visão / perspectiva|substantivo
弱|じゃく|delicado / flexível|adjetivo
社交|しゃこう|vida social|substantivo
ジャズ|ジャズ|jazz|substantivo
謝絶|しゃぜつ|recusa|substantivo
社宅|しゃたく|casa da empresa|substantivo
若干|じゃっかん|alguns / poucos|pronome
三味線|しゃみせん|violão japonês de três cordas|substantivo
斜面|しゃめん|declive / superfície inclinada|substantivo
砂利|じゃり|cascalho / lastro / pedras|substantivo
洒落る|しゃれる|contar piada / brincar com palavras; elegante|verbo
ジャンパー|ジャンパー|jaqueta|substantivo
ジャンプ|ジャンプ|salto|substantivo
ジャンボ|ジャンボ|jumbo|adjetivo
ジャンル|ジャンル|gênero|substantivo
私有|しゆう|propriedade privada|substantivo
～宗|～しゅう|seita|expressão
収益|しゅうえき|ganhos / rendimentos / retorno|substantivo
修学|しゅうがく|aprendizado|substantivo
周期|しゅうき|ciclo, período|substantivo
衆議院|しゅうぎいん|Câmara dos Deputados, Câmara Baixa|substantivo
就業|しゅうぎょう|emprego, início do trabalho|substantivo
従業員|じゅうぎょういん|empregado, trabalhador|substantivo
集計|しゅうけい|totalização, agregado|substantivo
襲撃|しゅうげき|ataque, investida, incursão|substantivo
収支|しゅうし|receitas e despesas|substantivo
終始|しゅうし|do começo ao fim; consistente(mente)|advérbio
修士|しゅうし|mestrado|substantivo
従事|じゅうじ|engajar-se, perseguir, seguir|verbo
終日|しゅうじつ|o dia todo|advérbio
充実|じゅうじつ|plenitude, perfeição|substantivo
収集|しゅうしゅう|recolha, coleção|substantivo
十字路|じゅうじろ|cruzamento|substantivo
執着|しゅうじゃく|apego, adesão, tenacidade|substantivo
柔軟|じゅうなん|flexível|adjetivo
収容|しゅうよう|acomodação; assento; custódia|substantivo
従来|じゅうらい|até agora, até o momento, tradicional|advérbio
守衛|しゅえい|guarda de segurança, porteiro|substantivo
主演|しゅえん|estrelando, interpretando o papel principal|verbo
主観|しゅかん|subjetividade, sujeito, ego|substantivo
修行|しゅぎょう|busca por conhecimento, treinamento, prática ascética|substantivo
塾|じゅく|escola preparatória (cursinho)|substantivo
祝賀|しゅくが|celebração, parabéns|substantivo
宿命|しゅくめい|destino, fado, predestinação|substantivo
手芸|しゅげい|artesanato|substantivo
主権|しゅけん|soberania|substantivo
主催|しゅさい|organização, patrocínio, hospedar|verbo
取材|しゅざい|cobertura, coleta de dados|substantivo
趣旨|しゅし|objetivo, significado|substantivo
種々|しゅじゅ|variedade|substantivo
主食|しゅしょく|alimento básico|substantivo
主人公|しゅじんこう|protagonista|substantivo
主体|しゅたい|sujeito, constituinte principal|substantivo
主題|しゅだい|sujeito, tema, motivo|substantivo
出演|しゅつえん|ator principal, aparição no palco|substantivo
出血|しゅっけつ|sangramento|substantivo
出現|しゅつげん|aparição, chegada|substantivo
出産|しゅっさん|parto|substantivo
出社|しゅっしゃ|ir para o trabalho|verbo
出生|しゅっしょう|nascimento|substantivo
微量|びりょう|quantidade minúscula, quantidade extremamente pequena|substantivo
昼飯|ひるめし|almoço (refeição do meio-dia)|substantivo
比例|ひれい|proporção|substantivo
疲労|ひろう|fadiga, cansaço|substantivo
敏感|びんかん|sensibilidade, suscetibilidade, sensível (a)|adjetivo
貧困|ひんこん|pobreza, falta|substantivo
品質|ひんしつ|qualidade|substantivo
貧弱|ひんじゃく|pobre, escasso, insubstancial|adjetivo
品種|ひんしゅ|raça, tipo, variedade|substantivo
ヒント|ヒント|dica|substantivo
頻繁|ひんぱん|frequência|substantivo
貧乏|びんぼう|pobreza, indigente, pobre|substantivo
ファイト|ファイト|luta|substantivo
ファイル|ファイル|arquivo; portfólio|substantivo
ファン|ファン|fã|substantivo
不意|ふい|repentino, abrupto, inesperado|adjetivo
フィルタ|フィルタ|filtro|substantivo
封|ふう|selo|substantivo
封鎖|ふうさ|bloqueio, congelamento (de fundos)|substantivo
連中|れんちゅう|colegas, companhia, muito|substantivo
レントゲン|レントゲン|raio-x|substantivo
連邦|れんぽう|comunidade, federação|substantivo
連盟|れんめい|liga, união, aliança|substantivo
老衰|ろうすい|senilidade, decaimento senil|substantivo
朗読|ろうどく|leitura em voz alta, recitação|substantivo
浪費|ろうひ|desperdício, extravagância|substantivo
労力|ろうりょく|trabalho, esforço, problema|substantivo
ロープウエイ|ロープウエイ|teleférico|substantivo
ロープ|ロープ|corda|substantivo
ろくな|ろくな|satisfatório, decente|adjetivo
露骨|ろこつ|franco, direto; conspícuo; óbvio, sugestivo|adjetivo
ロマンチック|ロマンチック|romântico|adjetivo
論議|ろんぎ|discussão|substantivo
論理|ろんり|lógica|substantivo
惑星|わくせい|planeta|substantivo
技|わざ|arte, técnica|substantivo
わざわざ|わざわざ|ter o trabalho de (fazer), fazer algo especialmente em vez de incidentalmente|expressão
煩わしい|わずらわしい|incômodo, problemático, complicado|adjetivo
渡り鳥|わたりどり|pássaro migratório, ave de passagem|substantivo
ワット|ワット|watt|substantivo
詫び|わび|pedido de desculpas|substantivo
和文|わぶん|texto japonês, frase em japonês|substantivo
藁|わら|palha|substantivo
～割|～わり|~ por cento|contador
割当|わりあて|atribuição, alocação, cota|substantivo
割込む|わりこむ|interromper, perturbar|verbo
悪者|わるもの|vilão, malandro|substantivo
捗る|はかどる|progredir, avançar (no trabalho), progredir|verbo
はかない|はかない|efêmero, momentâneo, passageiro|adjetivo
ばかばかしい|ばかばかしい|estúpido|adjetivo
破棄|はき|revogação, anulação, quebra (ex: tratado)|substantivo
剥ぐ|はぐ|arrancar, descascar, rasgar|verbo
迫害|はくがい|perseguição|substantivo
薄弱|はくじゃく|fraqueza, debilidade, fraco|adjetivo
白状|はくじょう|confissão|substantivo
漠然|ばくぜん|obscuro, vago, equívoco|adjetivo
爆弾|ばくだん|bomba|substantivo
爆破|ばくは|explosão, estourar|substantivo
暴露|ばくろ|divulgação, exposição, revelação|substantivo
励ます|はげます|encorajar, animar, levantar (a voz)|verbo
励む|はげむ|ser zeloso, fazer um esforço|verbo
剥げる|はげる|sair, ser desgastado, desbotar, descolorir|verbo
化ける|ばける|disfarçar, assumir a forma de|verbo
派遣|はけん|envio, mandar|substantivo
恥|はじ|vergonha, embaraço|substantivo
パジャマ|パジャマ|pijama|substantivo
恥じらう|はじらう|sentir vergonha, ser tímido, corar|verbo
恥じる|はじる|sentir vergonha|verbo
橋渡し|はしわたし|construção de pontes, mediação|substantivo
弾む|はずむ|saltar, ser encorajado, gastar muito|verbo
破損|はそん|dano|substantivo
裸足|はだし|descalço|adjetivo
果たす|はたす|realizar, cumprir, executar, alcançar|verbo
蜂蜜|はちみつ|mel|substantivo
パチンコ|パチンコ|pachinko|substantivo
罰|ばつ|punição, penalidade|substantivo
発育|はついく|crescimento (físico), desenvolvimento|substantivo
発芽|はつが|germinação|substantivo
発掘|はっくつ|escavação, exumação; descoberta (ex: novo talento)|substantivo
貫く|つらぬく|perfurar / atravessar|verbo
連ねる|つらねる|ligar / juntar / unir|verbo
釣り鐘|つりがね|sino de templo|substantivo
吊り革|つりかわ|alça de mão|substantivo
手当|てあて|subsídio / compensação; tratamento|substantivo
定義|ていぎ|definição|substantivo
提供|ていきょう|oferta / patrocínio de programa|substantivo
提携|ていけい|cooperação / parceria / negócio conjunto|substantivo
体裁|ていさい|decência / estilo / forma / aparência|substantivo
提示|ていじ|apresentação / exposição / sugestão / citação|substantivo
ティシュペーパー|ティシュペーパー|lenço de papel|substantivo
定食|ていしょく|almoço com preço fixo / refeição completa / jantar|substantivo
訂正|ていせい|correção / revisão|substantivo
停滞|ていたい|estagnação / congestionamento / lentidão / retenção|substantivo
邸宅|ていたく|mansão / residência|substantivo
定年|ていねん|idade de aposentadoria|substantivo
堤防|ていぼう|dique / barragem|substantivo
手遅れ|ておくれ|tarde demais / tratamento tardio|expressão
でかい|でかい|enorme / gigantesco|adjetivo
手掛かり|てがかり|dica / pista / chave|substantivo
手掛ける|てがける|lidar com / gerenciar / trabalhar com|verbo
手数|てかず|trabalho / mão de obra / manuseio|substantivo
手軽|てがる|fácil / simples / barato|adjetivo
適応|てきおう|adaptação / acomodação / conformidade|substantivo
適宜|てきぎ|adequado / apropriado|advérbio
適性|てきせい|aptidão|substantivo
できもの|できもの|ferida / furúnculo / erupção|substantivo
手際|てぎわ|desempenho / habilidade / tato|substantivo
出くわす|でくわす|encontrar por acaso / deparar-se com|verbo
手順|てじゅん|processo / procedimento / protocolo|substantivo
手錠|てじょう|algemas|substantivo
デコレーション|デコレーション|decoração|substantivo
手近|てぢか|próximo / à mão / familiar|adjetivo
てっきり|てっきり|certamente / com certeza / sem dúvida|advérbio
鉄鋼|てっこう|ferro e aço|substantivo
デッサン|デッサン|esboço / rascunho|substantivo
徹する|てっする|dedicar-se a / acreditar em|verbo
てっぺん|てっぺん|topo / cume / ápice|substantivo
鉄棒|てつぼう|barra de ferro / pé-de-cabra / barra fixa|substantivo
出直し|でなおし|ajuste / retoque|substantivo
掌|てのひら|palma da mão|substantivo
手配|てはい|providência / busca (policial)|substantivo
手筈|てはず|arranjo / plano / programa|substantivo
手引|てびき|orientação / guia / introdução|substantivo
手本|てほん|modelo / padrão|substantivo
手回し|てまわし|preparações / arranjos|substantivo
手元|てもと|dinheiro em mãos ou em casa / habilidade usual|substantivo
デモンストレーション|デモンストレーション|demonstração|substantivo
照り返す|てりかえす|refletir / devolver luz|verbo
テレックス|テレックス|telex / teletipo|substantivo
手分け|てわけ|divisão do trabalho|substantivo
天|てん|céu / paraíso|substantivo
田園|でんえん|campo / zona rural|substantivo
天下|てんか|mundo / país inteiro|substantivo
転回|てんかい|revolução / rotação|substantivo
連休|れんきゅう|feriados consecutivos|substantivo
レンジ|レンジ|fogão / fogão a gás|substantivo
連日|れんじつ|todos os dias|advérbio
連帯|れんたい|solidariedade|substantivo
レンタカー|レンタカー|carro alugado|substantivo
妨害|ぼうがい|perturbação, obstrução, interferência|substantivo
法学|ほうがく|lei, jurisprudência|substantivo
封建|ほうけん|feudal|adjetivo
豊作|ほうさく|colheita abundante, safra recorde|substantivo
方策|ほうさく|plano, política|substantivo
奉仕|ほうし|atendimento, serviço|substantivo
方式|ほうしき|formulário, método, sistema|substantivo
放射|ほうしゃ|radiação, emissão|substantivo
放射能|ほうしゃのう|radioatividade|substantivo
報酬|ほうしゅう|remuneração, recompensa, recompensa|substantivo
放出|ほうしゅつ|liberação, emitir|verbo
報じる|ほうじる|informar, relatar|verbo
報ずる|ほうずる|informar, relatar|verbo
紡績|ぼうせき|fiação|substantivo
呆然|ぼうぜん|atônito, surpreso|adjetivo
放置|ほうち|deixar como está, deixar sozinho, negligenciar|verbo
膨張|ぼうちょう|expansão, inchaço, aumento|substantivo
法廷|ほうてい|sala de tribunal|substantivo
報道|ほうどう|cobertura, relatório|substantivo
冒頭|ぼうとう|início, começo, início|substantivo
暴動|ぼうどう|insurreição, motim, levante|substantivo
褒美|ほうび|recompensa, prêmio|substantivo
暴風|ぼうふう|tempestade, tempestade de vento, vendaval|substantivo
葬る|ほうむる|enterrar, sepultar|verbo
放り込む|ほうりこむ|jogar dentro|verbo
放り出す|ほうりだす|jogar fora, desistir, abandonar|verbo
暴力|ぼうりょく|violência|substantivo
飽和|ほうわ|saturação|substantivo
ホース|ホース|mangueira|substantivo
ポーズ|ポーズ|pausa|substantivo
ホール|ホール|salão; buraco|substantivo
保温|ほおん|reter o calor, manter o calor, isolamento térmico|substantivo
捕獲|ほかく|captura, apreensão|substantivo
保管|ほかん|custódia, guarda, armazenamento|substantivo
補給|ほきゅう|fornecimento, suprimento, reabastecimento|substantivo
補強|ほきょう|reforço|substantivo
募金|ぼきん|arrecadação de fundos, coleta de fundos|substantivo
牧師|ぼくし|pastor, ministro, clérigo|substantivo
捕鯨|ほげい|caça à baleia|substantivo
惚ける|ぼける|envelhecer, desvanecer|verbo
保険|ほけん|seguro, garantia|substantivo
母校|ぼこう|alma mater|substantivo
母国|ぼこく|país natal|substantivo
誇る|ほこる|se orgulhar de, gabar-se de|verbo
綻びる|ほころびる|desfazer-se nas costuras, sorrir amplamente|verbo
干し～|ほし～|seco ~|adjetivo
ポジション|ポジション|posição|substantivo
干し物|ほしもの|roupa seca ao sol|substantivo
保守|ほしゅ|conservador, manutenção|adjetivo
補充|ほじゅう|suplementação, reabastecimento, reabastecimento|substantivo
補助|ほじょ|assistência, apoio, auxiliar|substantivo
舗装|ほそう|pavimento, superfície da estrada|substantivo
補足|ほそく|suplemento, complemento|substantivo
墓地|ぼち|cemitério, cemitério|substantivo
発作|ほっさ|convulsão, ataque|substantivo
没収|ぼっしゅう|confiscado|verbo
発足|ほっそく|início, inauguração|substantivo
ポット|ポット|pote|substantivo
ほっぺた|ほっぺた|bochecha|substantivo
ぼつぼつ|ぼつぼつ|gradualmente, aqui e ali, manchas|advérbio
風車|ふうしゃ|moinho de vento|substantivo
風習|ふうしゅう|costume|substantivo
風俗|ふうぞく|costumes / indústria do sexo|substantivo
ブーツ|ブーツ|botas|substantivo
風土|ふうど|clima, características naturais|substantivo
ブーム|ブーム|auge|substantivo
フォーム|フォーム|espuma / formulário|substantivo
部下|ぶか|subordinado|substantivo
不可欠|ふかけつ|indispensável, essencial|adjetivo
ぶかぶか|ぶかぶか|muito grande, largo|adjetivo
不吉|ふきつ|sinistro, má sorte|adjetivo
不況|ふきょう|recessão, depressão|substantivo
布巾|ふきん|pano de prato|substantivo
複合|ふくごう|composto, complexo|substantivo
福祉|ふくし|bem-estar, assistência social|substantivo
覆面|ふくめん|máscara, véu|substantivo
膨れる|ふくれる|inchar, inflar|verbo
不景気|ふけいき|recessão, tempos difíceis|substantivo
耽る|ふける|deleitar-se, entregar-se a|verbo
老ける|ふける|envelhecer|verbo
富豪|ふごう|pessoa rica, milionário|substantivo
布告|ふこく|decreto, proclamação|substantivo
ブザー|ブザー|campainha|substantivo
負債|ふさい|dívida, passivo|substantivo
不在|ふざい|ausência|substantivo
ふさわしい|ふさわしい|apropriado, adequado|adjetivo
不順|ふじゅん|irregularidade, falta de estação|substantivo
負傷|ふしょう|ferimento, lesão|substantivo
侮辱|ぶじょく|insulto, desprezo|substantivo
不審|ふしん|suspeito, dúvida|adjetivo
不振|ふしん|inativo, estagnação|substantivo
武装|ぶそう|armamento, armado|substantivo
負担|ふたん|fardo, carga|substantivo
不調|ふちょう|má condição, distúrbio|substantivo
復活|ふっかつ|revival, restauração|substantivo
物議|ぶつぎ|discussão pública, crítica|substantivo
復旧|ふっきゅう|restauração, reabilitação|substantivo
復興|ふっこう|renascimento, reconstrução|substantivo
物資|ぶっし|bens, materiais|substantivo
仏像|ぶつぞう|imagem budista, estátua|substantivo
物体|ぶったい|objeto|substantivo
沸騰|ふっとう|fervura, ebulição|substantivo
不当|ふとう|injusto, impróprio|adjetivo
不動産|ふどうさん|imóveis, propriedade|substantivo
無難|ぶなん|segurança, prudência|adjetivo
赴任|ふにん|nomeação para novo cargo|substantivo
腐敗|ふはい|apodrecimento, corrupção|substantivo
不評|ふひょう|má reputação, impopularidade|substantivo
不服|ふふく|insatisfação, desaprovação|substantivo
普遍|ふへん|universalidade, ubiquidade|substantivo
踏まえる|ふまえる|ser baseado em, ter origem em|verbo
踏み込む|ふみこむ|entrar, invadir|verbo
不明|ふめい|desconhecido, ambíguo|adjetivo
部門|ぶもん|departamento, categoria|substantivo
扶養|ふよう|apoio, sustento|substantivo
ふらふら|ふらふら|instável, tonto|adjetivo
ぶらぶら|ぶらぶら|pendurar, passear|adjetivo
振り返る|ふりかえる|virar a cabeça, olhar para trás|verbo
振り出し|ふりだし|ponto de partida, emissão (de cheque)|substantivo
不良|ふりょう|ruindade, delinquente|substantivo
没落|ぼつらく|ruína, queda, colapso|substantivo
施す|ほどこす|dar, conduzir, executar|verbo
ほとり|ほとり|vizinhança de lago; rio|substantivo
ぼやく|ぼやく|resmungar, reclamar|verbo
ぼやける|ぼやける|tornar-se escuro, tornar-se borrado|verbo
保養|ほよう|preservação da saúde, recuperação, recreação|substantivo
捕虜|ほりょ|prisioneiro de guerra|substantivo
ボルト|ボルト|volt; parafuso|substantivo
滅びる|ほろびる|ser arruinado, perecer, ser destruído|verbo
滅ぼす|ほろぼす|destruir, derrubar, arruinar|verbo
本格|ほんかく|propriedade, escala completa|substantivo
本館|ほんかん|edifício principal|substantivo
本気|ほんき|seriedade, verdade, santidade|substantivo
本国|ほんごく|um próprio país|substantivo
本質|ほんしつ|essência, verdadeira natureza, realidade|substantivo
本体|ほんたい|substância, corpo, tronco|substantivo
本音|ほんね|intenção real, motivo|substantivo
本能|ほんのう|instinto|substantivo
本場|ほんば|lar, melhor lugar, genuíno|substantivo
ポンプ|ポンプ|bomba|substantivo
本文|ほんぶん|texto (de documento), corpo (de carta)|substantivo
本名|ほんみょう|nome real|substantivo
マーク|マーク|marca|substantivo
マイ～|マイ～|meu ~, um próprio ~|pronome
マイクロフォン|マイクロフォン|microfone|substantivo
埋蔵|まいぞう|propriedade enterrada, tesouro escondido|substantivo
舞う|まう|dançar, flutuar, girar|verbo
真上|まうえ|bem acima, diretamente sobre a cabeça|advérbio
前売|まえうり|venda antecipada, reserva|substantivo
前置き|まえおき|prefácio, introdução|substantivo
任す|まかす|confiar, deixar para uma pessoa|verbo
負かす|まかす|derrotar|verbo
賄う|まかなう|dar pensão, fornecer refeições, pagar|verbo
紛らわしい|まぎらわしい|confuso, enganador, ambíguo|adjetivo
紛れる|まぎれる|ser desviado, escorregar para dentro|verbo
真心|まごころ|sinceridade, devoção|substantivo
まごつく|まごつく|ser confuso, ser confuso|verbo
誠|まこと|verdade, fé, fidelidade|substantivo
誠に|まことに|de fato, realmente (muito polido), absolutamente|advérbio
まさしく|まさしく|certamente, sem dúvida, evidentemente|advérbio
勝る|まさる|excelcer, ultrapassar, superar em rivalidade|verbo
～増し|～まし|~ aumento|conector
交える|まじえる|misturar, conversar com, cruzar (espadas)|verbo
真下|ました|bem embaixo, diretamente abaixo|advérbio
まして|まして|ainda mais, ainda menos (com verbo neg.), para não mencionar|advérbio
交わる|まじわる|cruzar, interceptar, misturar-se com|verbo
麻酔|ますい|anestesia|substantivo
またがる (うまを～)|またがる (うまを～)|montar a cavalo|verbo
待ち合わせ|まちあわせ|compromisso|substantivo
待ち遠しい|まちどおしい|ansioso por|adjetivo
待ち望む|まちのぞむ|olhar ansiosamente por, esperar ansiosamente por|verbo
まちまち|まちまち|vários, diferentes|adjetivo
末期|まっき|leito de morte, hora da morte|substantivo
真っ二つ|まっぷたつ|em duas partes iguais|advérbio
まと|まと|marca, alvo|substantivo
纏まり|まとまり|conclusão, acordo, consistência|substantivo
纏め|まとめ|acordo, conclusão|substantivo
免れる|まぬがれる|escapar de, ser isento|verbo
招き|まねき|convite|substantivo
瞬き|まばたき|piscar, cintilar (de estrelas), piscar (de luz)|substantivo
浮力|ふりょく|flutuabilidade|substantivo
武力|ぶりょく|força armada / poder militar / força|substantivo
ブル|ブル|touro|substantivo
震わせる|ふるわせる|estar tremendo / fazer tremer|verbo
無礼|ぶれい|desrespeitoso / rude|adjetivo
付録|ふろく|apêndice / suplemento|substantivo
フロント|フロント|frente|substantivo
憤慨|ふんがい|indignação / ressentimento|substantivo
文化財|ぶんかざい|bens culturais / propriedade cultural|substantivo
分業|ぶんぎょう|divisão do trabalho / especialização / linha de montagem|substantivo
文語|ぶんご|linguagem escrita / linguagem literária|substantivo
分散|ぶんさん|dispersão / descentralização / variância|substantivo
分子|ぶんし|numerador / molécula|substantivo
紛失|ふんしつ|perda de algo|substantivo
噴出|ふんしゅつ|jato / erupção / espumar|substantivo
文書|ぶんしょ|documento / escrita|substantivo
紛争|ふんそう|disputa / problema / conflito|substantivo
ふんだん|ふんだん|abundante / farto / generoso|adjetivo
分担|ぶんたん|cota / partilha|substantivo
奮闘|ふんとう|luta árdua / esforço vigoroso|substantivo
分配|ぶんぱい|divisão / partilha|substantivo
分母|ぶんぼ|denominador|substantivo
粉末|ふんまつ|pó fino|substantivo
分離|ぶんり|separação / desprendimento / segregação|substantivo
分裂|ぶんれつ|cisão / divisão / rompimento|substantivo
ペア|ペア|par / pera|substantivo
兵器|へいき|armas / armamento|substantivo
閉口|へいこう|fechar a boca / ficar sem fala|expressão
閉鎖|へいさ|fechamento / encerramento / paralisação|substantivo
兵士|へいし|soldado|substantivo
平常|へいじょう|normal / usual|adjetivo
平方|へいほう|quadrado (ex: metro quadrado)|substantivo
並列|へいれつ|arranjo / paralelo / lado a lado|substantivo
ベース|ベース|base / baixo|substantivo
辟易|へきえき|recuar / encolher-se / sucumbir / ser assustado|verbo
ぺこぺこ|ぺこぺこ|ser bajulador / ter muita fome|verbo
ベスト|ベスト|melhor; colete|substantivo
ベストセラー|ベストセラー|best-seller|substantivo
隔たる|へだたる|ser distante|verbo
へりくだる|へりくだる|humilhar-se e elogiar o ouvinte|verbo
弁解|べんかい|explicação / justificação / desculpa|substantivo
変革|へんかく|mudança / reforma|substantivo
返還|へんかん|retorno / restauração|substantivo
便宜|べんぎ|conveniência / acomodação|substantivo
偏見|へんけん|preconceito / visão limitada|substantivo
弁護|べんご|defesa / argumentação|substantivo
返済|へんさい|reembolso / pagamento|substantivo
弁償|べんしょう|compensação / reparação / reembolso|substantivo
変遷|へんせん|mudança / transição / vicissitudes|substantivo
返答|へんとう|resposta|substantivo
変動|へんどう|mudança / flutuação|substantivo
弁論|べんろん|discussão / debate / argumento|substantivo
穂|ほ|espiga (de planta) / cabeça (de planta)|substantivo
保育|ほいく|amamentação / cuidado / criação|substantivo
ボイコット|ボイコット|boicote|substantivo
ポイント|ポイント|ponto|substantivo
法案|ほうあん|projeto de lei|substantivo
防衛|ぼうえい|defesa / proteção / autodefesa|substantivo
防火|ぼうか|prevenção de incêndio / combate a incêndio / à prova de fogo|substantivo
崩壊|ほうかい|colapso / decaimento / desmoronamento|substantivo
麻痺|まひ|paralisia, paralisia, dormência|substantivo
～まみれ|～まみれ|coberto com (por, em)~|expressão
眉|まゆ|sobrancelha|substantivo
鞠|まり|bola|substantivo
丸ごと|まるごと|inteiro, todo, completamente|advérbio
まるっきり|まるっきり|completamente, perfeitamente, como se|advérbio
丸々|まるまる|completamente|advérbio
丸める|まるめる|tornar redondo, arredondar, enrolar|verbo
満月|まんげつ|lua cheia|substantivo
満場|まんじょう|unânime, toda a audiência|adjetivo
真ん前|まんまえ|bem na frente, debaixo do nariz|advérbio
真ん丸い|まんまるい|perfeitamente circular|adjetivo
真ん円い|まんまるい|perfeitamente redondo|adjetivo
～味|～み|~sabor (sensação de gosto)|expressão
見合い|みあい|entrevista formal de casamento|substantivo
見合わせる|みあわせる|trocar olhares; adiar|verbo
見落とす|みおとす|negligenciar, deixar de notar|verbo
未開|みかい|terra selvagem, região atrasada, incivilizado|adjetivo
味覚|みかく|gosto, paladar, senso de gosto|substantivo
幹|みき|tronco (de árvore)|substantivo
見苦しい|みぐるしい|desagradável, feio|adjetivo
見込み|みこみ|perspectivas, expectativa, esperança|substantivo
未婚|みこん|solteiro(a)|adjetivo
未熟|みじゅく|inexperiência, não qualificado, imaturo|adjetivo
微塵|みじん|partícula, átomo|substantivo
水気|みずけ|umidade, mormaço|substantivo
ミスプリント|ミスプリント|erro de impressão|substantivo
みすぼらしい|みすぼらしい|desgastado, decadente|adjetivo
ミセス|ミセス|Sra.|saudação
見せびらかす|みせびらかす|exibir, ostentar|verbo
見せ物|みせもの|show, exposição|substantivo
満たす|みたす|satisfazer, agradar, encher, cumprir|verbo
乱す|みだす|desordenar, desarranjar, perturbar|verbo
乱れる|みだれる|confundir-se, desordenar-se, perturbar-se|verbo
未知|みち|ainda não conhecido|adjetivo
身近|みぢか|próximo a si mesmo, perto, familiar|adjetivo
導く|みちびく|ser guiado, ser mostrado|verbo
密集|みっしゅう|multidão, formação cerrada, denso|adjetivo
密接|みっせつ|conectado, próximo, íntimo|adjetivo
密度|みつど|densidade|substantivo
見積もり|みつもり|estimativa, cotação|substantivo
未定|みてい|ainda não fixado, não decidido, pendente|adjetivo
見通し|みとおし|perspectiva, vista desobstruída, perspectiva|substantivo
見なす|みなす|considerar como, tratar|verbo
源|みなもと|fonte, origem|substantivo
見習う|みならう|seguir o exemplo de outro|verbo
身なり|みなり|aparência pessoal|substantivo
峰|みね|pico, crista|substantivo
身の上|みのうえ|o futuro de alguém, o bem-estar de alguém, a história pessoal de alguém|substantivo
見逃す|みのがす|perder, negligenciar, deixar solto|verbo
身の回り|みのまわり|aparência pessoal, pertences pessoais|substantivo
見計らう|みはからう|escolher a critério próprio|verbo
見晴らし|みはらし|vista|substantivo
身振り|みぶり|gesto|substantivo
脈|みゃく|pulso|substantivo
ミュージック|ミュージック|música|substantivo
未練|みれん|afeto persistente, apego, arrependimento(s)|substantivo
見渡す|みわたす|olhar sobre, inspecionar (cena), ter uma visão ampla de|verbo
民宿|みんしゅく|casa particular que oferece hospedagem e refeições para turistas|substantivo
民族|みんぞく|povo, raça|substantivo
民俗|みんぞく|costumes populares|substantivo
無意味|むいみ|sem sentido / sem significado|expressão
ムード|ムード|humor|substantivo
無口|むくち|reticência|substantivo
婿|むこ|genro|substantivo
無効|むこう|inválido / sem efeito / indisponível|adjetivo
無言|むごん|silêncio|substantivo
無邪気|むじゃき|inocência / simplicidade|substantivo
むしる|むしる|arrancar / colher / rasgar|verbo
結び|むすび|final / conclusão / união|substantivo
結び付き|むすびつき|conexão / relação|substantivo
結び付く|むすびつく|ser conectado ou relacionado / unir-se|verbo
結び付ける|むすびつける|combinar / unir / amarrar / prender com um nó|verbo
無線|むせん|sem fio / rádio|substantivo
無駄遣い|むだづかい|desperdiçar dinheiro / esbanjar dinheiro|verbo
無断|むだん|sem permissão / sem aviso|advérbio
無知|むち|ignorância|substantivo
無茶|むちゃ|absurdo / irracional|adjetivo
無茶苦茶|むちゃくちゃ|confuso / bagunçado / misturado / irracional|adjetivo
空しい|むなしい|vazio / fútil / vão|adjetivo
無念|むねん|desapontamento / arrependimento|substantivo
無能|むのう|ineficiência / incompetência|substantivo
無闇に|むやみに|irrazão / absurdamente / aleatoriamente|advérbio
無用|むよう|inútil / desnecessário|adjetivo
斑|むら|irregularidade / inconsistência / irregularidade|substantivo
群がる|むらがる|amontoar-se / reunir-se|verbo
無論|むろん|claro / naturalmente|advérbio
名産|めいさん|produto notado|substantivo
名称|めいしょう|nome|substantivo
命中|めいちゅう|acerto|substantivo
明白|めいはく|óbvio / claro|adjetivo
名簿|めいぼ|lista de nomes|substantivo
名誉|めいよ|honra / crédito / prestígio|substantivo
明瞭|めいりょう|clareza|substantivo
明朗|めいろう|brilhante / claro / alegre|adjetivo
メーカー|メーカー|fabricante|substantivo
目方|めかた|peso|substantivo
恵み|めぐみ|bênção|substantivo
恵む|めぐむ|abençoar / ter piedade de|verbo
目覚しい|めざましい|brilhante / notável|adjetivo
目覚める|めざめる|acordar|verbo
召す|めす|chamar / mandar buscar / vestir|verbo
雌|めす|fêmea (animal)|substantivo
目付き|めつき|olhar / expressão dos olhos / olhos|substantivo
滅亡|めつぼう|queda / colapso / destruição|substantivo
メディア|メディア|mídia|substantivo
目途|めど|meta / perspectiva|substantivo
目盛|めもり|escala / graduações|substantivo
メロディー|メロディー|melodia|substantivo
面会|めんかい|entrevista|substantivo
免除|めんじょ|isenção / exoneração / dispensa|substantivo
面する|めんする|fazer face a / dar para|verbo
面目|めんぼく|rosto / honra / reputação|substantivo
～網|～もう|rede|expressão
設ける|もうける|criar / estabelecer|verbo
申し入れる|もうしいれる|propor / sugerir|verbo
申込|もうしこみ|pedido / solicitação / proposta|substantivo
申出|もうしで|pedido / reivindicação / relatório|substantivo
申し出る|もうしでる|relatar para / dizer / sugerir|verbo
申し分|もうしぶん|objeção / falhas|substantivo
盲点|もうてん|ponto cego|substantivo
猛烈|もうれつ|violento / veemente / fúria|adjetivo
モーテル|モーテル|motel|substantivo
もがく|もがく|lutar / debater-se / impacientar-se|verbo
目録|もくろく|catálogo / lista|substantivo
目論見|もくろみ|plano / esquema / intenção|substantivo
模型|もけい|modelo / manequim|substantivo
模索|もさく|tatear / buscar|substantivo
もしかして|もしかして|talvez / por acaso|advérbio
もしくは|もしくは|ou / caso contrário|conector
もたらす|もたらす|trazer / causar|verbo
持ち切り|もちきり|tópico / assunto do momento|substantivo
専ら|もっぱら|inteiramente / exclusivamente|advérbio
もてなす|もてなす|receber / hospedar|verbo
もてる|もてる|ser popular / ser bem quisto|verbo
モニター|モニター|monitor|substantivo
物好き|ものずき|curiosidade (ociosa)|substantivo
物足りない|ものたりない|insatisfeito / insatisfatório|adjetivo
もはや|もはや|já / agora|advérbio
模範|もはん|modelo / exemplo|substantivo
模倣|もほう|imitação / cópia|substantivo
もめる|もめる|discordar / disputar|verbo
腿|もも|coxa|substantivo
催す|もよおす|realizar / promover|verbo
漏らす|もらす|vazar / revelar|verbo
盛り上がる|もりあがる|animar-se / inchar / crescer|verbo
漏る|もる|vazar / escorrer|verbo
漏れる|もれる|vazar / escapar / filtrar|verbo
脆い|もろい|frágil / quebradiço / sensível|adjetivo
もろに|もろに|completamente / inteiramente|advérbio
矢|や|flecha|substantivo
野外|やがい|campo / periferia / ar livre|substantivo
～薬|～やく|remédio|expressão
夜具|やぐ|roupeiro / enxoval|substantivo
役職|やくしょく|cargo / posição gerencial|substantivo
役場|やくば|prefeitura|substantivo
やけに|やけに|bastante / muito|advérbio
屋敷|やしき|mansão|substantivo
養う|やしなう|criar / manter / cultivar|verbo
野心|やしん|ambição / aspiração|substantivo
安っぽい|やすっぽい|barato / de mau gosto|adjetivo
休める|やすめる|descansar / suspender|verbo
野生|やせい|selvagem|adjetivo
奴|やつ|cara / sujeito|pronome
闇|やみ|escuridão / duvidoso / ilegal|substantivo
病む|やむ|adoecer / estar doente|verbo
ややこしい|ややこしい|complicado / confuso|adjetivo
やりとおす|やりとおす|levar a cabo / concluir|verbo
やりとげる|やりとげる|realizar / consumar|verbo
和らげる|やわらげる|suavizar / moderar / aliviar|verbo
ヤング|ヤング|jovem|adjetivo
～油|～ゆ|óleo|expressão
優位|ゆうい|predominância / superioridade|substantivo
憂鬱|ゆううつ|depressão / melancolia|substantivo
有益|ゆうえき|benéfico / lucrativo|adjetivo
優越|ゆうえつ|supremacia / predominância|substantivo
勇敢|ゆうかん|bravura / heroísmo|substantivo
夕暮れ|ゆうぐれ|entardecer / crepúsculo|substantivo
融資|ゆうし|financiamento / empréstimo|substantivo
有する|ゆうする|possuir / ter|verbo
優勢|ゆうせい|superioridade, poder superior, predominância|substantivo
優先|ゆうせん|preferência, prioridade|substantivo
誘導|ゆうどう|orientação, condução, indução|substantivo
融通|ゆうずう|adaptabilidade, versatilidade, finanças|substantivo
優美|ゆうび|graça, refinamento, elegância|substantivo
有望|ゆうぼう|boas perspectivas, cheio de esperança, promissor|adjetivo
遊牧|ゆうぼく|nomadismo|substantivo
夕焼け|ゆうやけ|pôr do sol|substantivo
有力|ゆうりょく|influência, proeminência; potente|adjetivo
幽霊|ゆうれい|fantasma, espectro, aparição|substantivo
誘惑|ゆうわく|tentação, atração, isca|substantivo
故|ゆえ|razão, causa, circunstâncias|substantivo
歪む|ゆがむ|distorcer, ser torto, ser distorcido|verbo
揺さぶる|ゆさぶる|sacudir, balançar, balançar, oscilar|verbo
ゆとり|ゆとり|reserva, opulência, tempo (de sobra)|substantivo
ユニーク|ユニーク|único|adjetivo
ユニフォーム|ユニフォーム|uniforme|substantivo
指差す|ゆびさす|apontar para|verbo
弓|ゆみ|arco|substantivo
揺らぐ|ゆらぐ|oscilar, balançar, tremer|verbo
緩む|ゆるむ|ficar solto, afrouxar|verbo
緩める|ゆるめる|afrouxar, desacelerar|verbo
緩やか|ゆるやか|benevolente|adjetivo
要因|よういん|fator primário, causa principal|substantivo
溶液|ようえき|solução|substantivo
用件|ようけん|assunto, negócio|substantivo
養護|ようご|proteção, enfermagem, cuidado protetor|substantivo
用紙|ようし|formulário|substantivo
様式|ようしき|estilo, forma, padrão|substantivo
要する|ようする|exigir, requerer, levar|verbo
要請|ようせい|reclamação, demanda, pedido, aplicação|substantivo
様相|ようそう|aspecto|substantivo
用品|ようひん|artigos, suprimentos, peças|substantivo
洋風|ようふう|estilo ocidental|substantivo
用法|ようほう|instruções, regras de uso|substantivo
要望|ようぼう|demanda por, pedido|substantivo
余暇|よか|lazer, tempo livre, tempo de sobra|substantivo
予感|よかん|pressentimento, pressentimento|substantivo
余興|よきょう|show secundário, entretenimento|substantivo
預金|よきん|depósito, conta bancária|substantivo
欲|よく|ganância, vontades|substantivo
抑圧|よくあつ|contenção, opressão, supressão|substantivo
浴室|よくしつ|banheiro, banho|substantivo
抑制|よくせい|controle, contenção, supressão|substantivo
欲深い|よくふかい|ganancioso|adjetivo
欲望|よくぼう|desejo, apetite|substantivo
予言|よげん|previsão, promessa, prognosticação|substantivo
横綱|よこづな|campeão de sumô|substantivo
汚れ|よごれ|sujeira, imundície|substantivo
よし (かん)|よし (かん)|tudo bem!|expressão
良し|よし|tudo bem!|expressão
善し悪し|よしあし|bom ou ruim, méritos ou deméritos, qualidade|substantivo
余所見|よそみ|olhar para o lado, olhar para o lado|substantivo
余地|よち|lugar, espaço, margem|substantivo
よって (よりどころ)|よって (よりどころ)|portanto, consequentemente|conector
与党|よとう|partido governante, partido no poder, governo|substantivo
呼び止める|よびとめる|chamar para parar|verbo
夜更し|よふかし|ficar acordado até tarde, manter longas horas|substantivo
夜更け|よふけ|tarde da noite|substantivo
余程|よほど|muito, bastante, em grande extensão, totalmente|advérbio
微笑|びしょう|sorriso|substantivo
密か|ひそか|secreto / particular / furtivo|adjetivo
浸す|ひたす|ensopar / mergulhar / encharcar|verbo
ひたすら|ひたすら|apenas / seriamente / atentamente|advérbio
左利き|ひだりきき|ser canhoto / bebedor de saquê / canhoto|substantivo
引っ掻く|ひっかく|arranhar|verbo
必修|ひっしゅう|obrigatório (disciplina)|adjetivo
びっしょり|びっしょり|ensopado / encharcado|adjetivo
必然|ひつぜん|inevitável / necessário|adjetivo
匹敵|ひってき|comparando com / rival / igual|verbo
一息|ひといき|uma respiração / uma pausa / um esforço|substantivo
人影|ひとかげ|sombra de homem / alma|substantivo
人柄|ひとがら|personalidade / caráter|substantivo
一頃|ひところ|uma vez / há algum tempo|advérbio
人質|ひとじち|refém|substantivo
一筋|ひとすじ|uma linha / seriamente / cegamente / diretamente|advérbio
人目|ひとめ|vislumbre / olhar público|substantivo
日取り|ひどり|data marcada / dia marcado|substantivo
雛|ひな|pássaro jovem / pintinho / boneca|substantivo
雛祭|ひなまつり|Festival das Meninas (bonecas)|substantivo
日向|ひなた|lugar ensolarado / ao sol|substantivo
非難|ひなん|culpa / ataque / crítica|substantivo
避難|ひなん|refúgio / encontrar abrigo|substantivo
日の丸|ひのまる|a bandeira japonesa|substantivo
火花|ひばな|faísca|substantivo
ひび (かべの～)|ひび (かべの～)|rachadura / fissura / falha|substantivo
悲鳴|ひめい|grunhido / grito|substantivo
冷やかす|ひやかす|brincar / zombar / alfinetar / esfriar / refrigerar|verbo
日焼け|ひやけ|queimadura de sol|substantivo
標語|ひょうご|lema / slogan / palavra de ordem|substantivo
描写|びょうしゃ|representação / descrição / retrato|substantivo
ひょっと|ひょっと|possivelmente / acidentalmente|advérbio
びら|びら|folheto / panfleto|substantivo
平たい|ひらたい|plano / uniforme / nivelado|adjetivo
びり|びり|último da lista / no fundo|advérbio
比率|ひりつ|razão / proporção / porcentagem|substantivo
読み上げる|よみあげる|ler em voz alta / chamar lista|verbo
～寄り|～より|perto de/em direção a|expressão
寄り掛かる|よりかかる|inclinar-se em/apoiar-se em/contar com|verbo
弱る|よわる|enfraquecer/ficar aflito/emagrecer|verbo
来場|らいじょう|comparecimento|substantivo
ライス|ライス|arroz|substantivo
酪農|らくのう|pecuária leiteira|substantivo
落下|らっか|queda/descer|substantivo
楽観|らっかん|otimismo|substantivo
ランプ|ランプ|lâmpada; rampa|substantivo
濫用|らんよう|abuso/uso excessivo|substantivo
リード|リード|liderança; palheta|substantivo
理屈|りくつ|teoria/razão|substantivo
利子|りし|juros|substantivo
利潤|りじゅん|lucro/retorno|substantivo
理性|りせい|razão/senso|substantivo
利息|りそく|juros|substantivo
立体|りったい|corpo sólido|substantivo
立方|りっぽう|cubo|substantivo
立法|りっぽう|legislação/elaboração de leis|substantivo
利点|りてん|vantagem/ponto a favor|substantivo
略奪|りゃくだつ|saque/pilhagem|substantivo
略語|りゃくご|abreviação/acrónimo|substantivo
流通|りゅうつう|circulação/distribuição|substantivo
領域|りょういき|área/território/região|substantivo
了解|りょうかい|compreensão/consentimento/entendimento|substantivo
領海|りょうかい|águas territoriais|substantivo
両極|りょうきょく|ambos os extremos/polos norte e sul|substantivo
良好|りょうこう|favorável/satisfatório|adjetivo
良識|りょうしき|bom senso|substantivo
良質|りょうしつ|boa qualidade/qualidade superior|substantivo
了承|りょうしょう|reconhecimento/entendimento|substantivo
良心|りょうしん|consciência|substantivo
領地|りょうち|território|substantivo
領土|りょうど|território/posse|substantivo
両立|りょうりつ|compatibilidade/coexistência|substantivo
旅客|りょかく|passageiro|substantivo
旅券|りょけん|passaporte|substantivo
履歴|りれき|histórico/fundo/log|substantivo
理論|りろん|teoria|substantivo
林業|りんぎょう|silvicultura|substantivo
類|るい|tipo/classe/família|substantivo
類推|るいすい|analogia|substantivo
類似|るいじ|análogo|adjetivo
ルーズ|ルーズ|solto|adjetivo
冷酷|れいこく|crueldade/frieza/implacável|substantivo
冷蔵|れいぞう|refrigeração|substantivo
冷淡|れいたん|frieza/indiferença|substantivo
レース|レース|corrida; renda|substantivo
レギュラー|レギュラー|regular|adjetivo
レッスン|レッスン|lição|substantivo
レディー|レディー|senhora|substantivo
レバー|レバー|alavanca; fígado|substantivo
恋愛|れんあい|amor/romance|substantivo
バッテリー|バッテリー|bateria|substantivo
バット|バット|taco; tanque/barril|substantivo
発病|はつびょう|ataque/tornar-se doente|substantivo
初耳|はつみみ|algo ouvido pela primeira vez|substantivo
果て|はて|fim/extremo/limite|substantivo
果てる|はてる|terminar/ser finalizado/ser esgotado|verbo
ばてる|ばてる|cansado, exausto / desgastado|verbo
パトカー|パトカー|carro de patrulha|substantivo
甚だ|はなはだ|muito, grandemente, extremamente|advérbio
華々しい|はなばなしい|brilhante, magnífico, espetacular|adjetivo
花びら|はなびら|pétala|substantivo
華やか|はなやか|brilhante, magnífico, vistoso|adjetivo
阻む|はばむ|impedir, deter, opor-se|verbo
浜|はま|praia, costa|substantivo
浜辺|はまべ|praia, beira-mar|substantivo
はまる|はまる|encaixar, ajustar-se, caber|verbo
早める|はやめる|apressar, acelerar|verbo
腹立ち|はらだち|raiva, indignação|substantivo
原っぱ|はらっぱ|campo aberto, terreno baldio, planície|substantivo
はらはら|はらはら|apreensivo, ansioso|expressão
ばらまく|ばらまく|espalhar, disseminar|verbo
張り紙|はりがみ|aviso, cartaz|substantivo
遥か|はるか|longe, distante|adjetivo
破裂|はれつ|explosão, ruptura, rompimento|substantivo
腫れる|はれる|inchar, edemaciar|verbo
繁栄|はんえい|prosperidade, florescimento|substantivo
版画|はんが|gravura, xilogravura|substantivo
ハンガー|ハンガー|cabide|substantivo
反感|はんかん|antipatia, aversão, animosidade|substantivo
反響|はんきょう|eco, reverberação, repercussão|substantivo
パンク|パンク|furo, pneu furado; punk|substantivo
反撃|はんげき|contra-ataque, contraofensiva|substantivo
判決|はんけつ|sentença, decisão judicial, julgamento|substantivo
反射|はんしゃ|reflexão, reverberação|substantivo
繁盛|はんじょう|prosperidade, florescimento, sucesso|substantivo
繁殖|はんしょく|proliferação, reprodução, multiplicação|substantivo
反する|はんする|contrariar, opor-se, contradizer|verbo
判定|はんてい|julgamento, decisão, veredito|substantivo
万人|ばんにん|todas as pessoas, todo mundo|substantivo
晩年|ばんねん|últimos anos, velhice|substantivo
反応|はんのう|reação, resposta|substantivo
万能|ばんのう|todo-poderoso, onipotente, polivalente|adjetivo
半端|はんぱ|fragmento, fração, incompletude|substantivo
反発|はんぱつ|repulsão, rejeição, oposição|substantivo
反乱|はんらん|rebelião, revolta, levante|substantivo
氾濫|はんらん|transbordamento, inundação|substantivo
美|び|beleza|substantivo
ひいては|ひいては|não apenas... mas também, além disso, consequentemente|conector
ビールス|ビールス|vírus|substantivo
控室|ひかえしつ|sala de espera|substantivo
控える|ひかえる|conter-se; anotar|verbo
悲観|ひかん|pessimismo, desânimo|substantivo
引き上げる|ひきあげる|retirar, sair, afastar-se|verbo
率いる|ひきいる|liderar, comandar|verbo
引き起こす|ひきおこす|causar|verbo
引下げる|ひきさげる|abaixar, reduzir, retirar|verbo
引きずる|ひきずる|arrastar, prolongar|verbo
引取る|ひきとる|levar de volta; adotar; partir|verbo
否決|ひけつ|rejeição, negação|substantivo
日頃|ひごろ|normalmente, habitualmente|advérbio
久しい|ひさしい|longo, demorado, antigo|adjetivo
悲惨|ひさん|tragédia, desastre; miséria, lastimável|substantivo
ビジネス|ビジネス|negócios|substantivo
比重|ひじゅう|densidade específica|substantivo
美術|びじゅつ|arte, belas-artes|substantivo
秘書|ひしょ|secretário(a) particular|substantivo
`;

export const vocabulario: VocabItem[] = [
  ...parse("N5", n5),
  ...parse("N4", n4),
  ...parse("N3", n3),
  ...parse("N2", n2),
  ...parse("N1", n1),
];

export const vocabByLevel = (level: JlptLevel) => vocabulario.filter((v) => v.level === level);
