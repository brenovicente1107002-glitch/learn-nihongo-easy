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
    "title": "〜は",
    "explanation": "Partícula de tópico, indica o assunto da frase. O que vem antes de は é o tópico sobre o qual se fala.",
    "pattern": "Substantivo + は",
    "level": "N5",
    "examples": [
      {
        "jp": "私は学生です。",
        "romaji": "Watashi wa gakusei desu.",
        "pt": "Eu sou estudante."
      },
      {
        "jp": "これは本です。",
        "romaji": "Kore wa hon desu.",
        "pt": "Isto é um livro."
      }
    ]
  },
  {
    "title": "〜です",
    "explanation": "Verbo copulativo formal, usado para afirmar ou descrever algo. Equivalente ao 'ser' ou 'estar' em português.",
    "pattern": "Substantivo/Adjetivo な + です",
    "level": "N5",
    "examples": [
      {
        "jp": "私は田中です。",
        "romaji": "Watashi wa Tanaka desu.",
        "pt": "Eu sou Tanaka."
      },
      {
        "jp": "これは高いです。",
        "romaji": "Kore wa takai desu.",
        "pt": "Isto é caro."
      }
    ]
  },
  {
    "title": "〜です (negativo)",
    "explanation": "Forma negativa de です, usada para negar uma afirmação ou descrição.",
    "pattern": "Substantivo/Adjetivo な + ではありません / じゃありません",
    "level": "N5",
    "examples": [
      {
        "jp": "私は学生ではありません。",
        "romaji": "Watashi wa gakusei dewa arimasen.",
        "pt": "Eu não sou estudante."
      },
      {
        "jp": "これは本じゃありません。",
        "romaji": "Kore wa hon ja arimasen.",
        "pt": "Isto não é um livro."
      }
    ]
  },
  {
    "title": "〜ですか",
    "explanation": "Partícula de pergunta, transforma uma frase afirmativa em interrogativa. Equivale ao ponto de interrogação.",
    "pattern": "Sentença + か",
    "level": "N5",
    "examples": [
      {
        "jp": "これはペンですか。",
        "romaji": "Kore wa pen desu ka.",
        "pt": "Isto é uma caneta?"
      },
      {
        "jp": "あなたは日本人ですか。",
        "romaji": "Anata wa nihonjin desu ka.",
        "pt": "Você é japonês?"
      }
    ]
  },
  {
    "title": "〜の",
    "explanation": "Partícula de posse/pertencimento, indica que o segundo substantivo pertence ou está relacionado ao primeiro. Também pode ligar substantivos para formar uma ideia composta.",
    "pattern": "Substantivo 1 + の + Substantivo 2",
    "level": "N5",
    "examples": [
      {
        "jp": "私の本です。",
        "romaji": "Watashi no hon desu.",
        "pt": "É o meu livro."
      },
      {
        "jp": "日本の車です。",
        "romaji": "Nihon no kuruma desu.",
        "pt": "É um carro japonês."
      }
    ]
  },
  {
    "title": "これ/それ/あれ",
    "explanation": "Pronomes demonstrativos: これ (isto, perto do falante), それ (isso, perto do ouvinte), あれ (aquilo, longe de ambos).",
    "pattern": "これ/それ/あれ + は + Substantivo + です",
    "level": "N5",
    "examples": [
      {
        "jp": "これは何ですか。",
        "romaji": "Kore wa nan desu ka.",
        "pt": "O que é isto?"
      },
      {
        "jp": "あれは私の傘です。",
        "romaji": "Are wa watashi no kasa desu.",
        "pt": "Aquela é minha sombrinha."
      }
    ]
  },
  {
    "title": "この/その/あの",
    "explanation": "Determinantes demonstrativos: この (este), その (esse), あの (aquele). Sempre vêm antes de um substantivo.",
    "pattern": "この/その/あの + Substantivo",
    "level": "N5",
    "examples": [
      {
        "jp": "この本は面白いです。",
        "romaji": "Kono hon wa omoshiroi desu.",
        "pt": "Este livro é interessante."
      },
      {
        "jp": "あの人は誰ですか。",
        "romaji": "Ano hito wa dare desu ka.",
        "pt": "Quem é aquela pessoa?"
      }
    ]
  },
  {
    "title": "どこ/だれ/いつ/なに",
    "explanation": "Palavras interrogativas: どこ (onde), だれ (quem), いつ (quando), なに (o que).",
    "pattern": "どこ/だれ/いつ/なに + ですか",
    "level": "N5",
    "examples": [
      {
        "jp": "あなたの家はどこですか。",
        "romaji": "Anata no ie wa doko desu ka.",
        "pt": "Onde é sua casa?"
      },
      {
        "jp": "この人は誰ですか。",
        "romaji": "Kono hito wa dare desu ka.",
        "pt": "Quem é esta pessoa?"
      }
    ]
  },
  {
    "title": "〜に",
    "explanation": "Partícula que indica localização (existência), direção ou ponto no tempo. Usado com verbos de existência (あります/います) e movimento.",
    "pattern": "Substantivo (lugar/tempo) + に",
    "level": "N5",
    "examples": [
      {
        "jp": "部屋に本があります。",
        "romaji": "Heya ni hon ga arimasu.",
        "pt": "Há um livro no quarto."
      },
      {
        "jp": "私は日本に行きます。",
        "romaji": "Watashi wa Nihon ni ikimasu.",
        "pt": "Eu vou para o Japão."
      }
    ]
  },
  {
    "title": "あります/います",
    "explanation": "Verbos de existência: あります (para objetos inanimados) e います (para seres vivos). Indicam que algo existe ou está em um determinado local.",
    "pattern": "Substantivo + が + あります/います",
    "level": "N5",
    "examples": [
      {
        "jp": "机の上に鉛筆があります。",
        "romaji": "Tsukue no ue ni enpitsu ga arimasu.",
        "pt": "Há um lápis em cima da mesa."
      },
      {
        "jp": "部屋に猫がいます。",
        "romaji": "Heya ni neko ga imasu.",
        "pt": "Há um gato no quarto."
      }
    ]
  },
  {
    "title": "〜と",
    "explanation": "Partícula que significa 'e' (para listar substantivos) ou 'com' (para indicar companhia).",
    "pattern": "Substantivo 1 + と + Substantivo 2",
    "level": "N5",
    "examples": [
      {
        "jp": "パンと牛乳を買いました。",
        "romaji": "Pan to gyuunyuu o kaimashita.",
        "pt": "Comprei pão e leite."
      },
      {
        "jp": "友達と話しました。",
        "romaji": "Tomodachi to hanashimashita.",
        "pt": "Falei com um amigo."
      }
    ]
  },
  {
    "title": "〜も",
    "explanation": "Partícula que significa 'também' ou 'nem' (em frases negativas). Expressa inclusão ou exclusão.",
    "pattern": "Substantivo + も",
    "level": "N5",
    "examples": [
      {
        "jp": "私も学生です。",
        "romaji": "Watashi mo gakusei desu.",
        "pt": "Eu também sou estudante."
      },
      {
        "jp": "ビールもワインも飲みません。",
        "romaji": "Biiru mo wain mo nomimasen.",
        "pt": "Não bebo nem cerveja nem vinho."
      }
    ]
  },
  {
    "title": "〜を",
    "explanation": "Partícula de objeto direto, marca o objeto de um verbo transitivo. Indica o que recebe a ação do verbo.",
    "pattern": "Substantivo + を + Verbo Transitivo",
    "level": "N5",
    "examples": [
      {
        "jp": "ご飯を食べます。",
        "romaji": "Gohan o tabemasu.",
        "pt": "Eu como arroz/refeição."
      },
      {
        "jp": "本を読みます。",
        "romaji": "Hon o yomimasu.",
        "pt": "Eu leio um livro."
      }
    ]
  },
  {
    "title": "〜へ",
    "explanation": "Partícula que indica direção ou destino. É sinônimo de に quando se refere a movimento para um local.",
    "pattern": "Substantivo (destino) + へ",
    "level": "N5",
    "examples": [
      {
        "jp": "学校へ行きます。",
        "romaji": "Gakkou e ikimasu.",
        "pt": "Eu vou para a escola."
      },
      {
        "jp": "日本へ旅行します。",
        "romaji": "Nihon e ryokou shimasu.",
        "pt": "Eu viajo para o Japão."
      }
    ]
  },
  {
    "title": "〜で",
    "explanation": "Partícula que indica o local onde uma ação ocorre ou o meio/instrumento utilizado para a ação.",
    "pattern": "Substantivo (local/meio) + で",
    "level": "N5",
    "examples": [
      {
        "jp": "図書館で勉強します。",
        "romaji": "Toshokan de benkyou shimasu.",
        "pt": "Estudo na biblioteca."
      },
      {
        "jp": "バスで会社に行きます。",
        "romaji": "Basu de kaisha ni ikimasu.",
        "pt": "Vou para a empresa de ônibus."
      }
    ]
  },
  {
    "title": "〜から〜まで",
    "explanation": "Partículas que indicam 'de ... até ...'. Usadas para especificar um ponto de partida e um ponto final (no espaço ou tempo).",
    "pattern": "Local/Tempo + から + Local/Tempo + まで",
    "level": "N5",
    "examples": [
      {
        "jp": "東京から大阪まで行きます。",
        "romaji": "Tokyo kara Osaka made ikimasu.",
        "pt": "Eu vou de Tóquio até Osaka."
      },
      {
        "jp": "午前9時から午後5時まで働きます。",
        "romaji": "Gozen kuji kara gogo goji made hatarakimasu.",
        "pt": "Trabalho das 9h da manhã até as 5h da tarde."
      }
    ]
  },
  {
    "title": "〜ね",
    "explanation": "Partícula de final de frase que busca confirmação ou concorda com o ouvinte, criando um tom amigável. Equivalente a 'né?' ou 'não é mesmo?'.",
    "pattern": "Sentença + ね",
    "level": "N5",
    "examples": [
      {
        "jp": "この映画は面白いですね。",
        "romaji": "Kono eiga wa omoshiroi desu ne.",
        "pt": "Este filme é interessante, não é?"
      },
      {
        "jp": "いい天気ですね。",
        "romaji": "Ii tenki desu ne.",
        "pt": "O tempo está bom, né?"
      }
    ]
  },
  {
    "title": "〜よ",
    "explanation": "Partícula de final de frase que enfatiza ou fornece uma nova informação ao ouvinte. Equivalente a 'Eu te digo' ou 'Olha só'.",
    "pattern": "Sentença + よ",
    "level": "N5",
    "examples": [
      {
        "jp": "明日は休みですよ。",
        "romaji": "Ashita wa yasumi desu yo.",
        "pt": "Amanhã é folga, viu."
      },
      {
        "jp": "この店はおいしいですよ。",
        "romaji": "Kono mise wa oishii desu yo.",
        "pt": "Esta loja é gostosa, eu te garanto."
      }
    ]
  },
  {
    "title": "〜ませんか",
    "explanation": "Usado para fazer um convite ou sugestão. É uma forma educada de perguntar 'por que não fazemos isso?'",
    "pattern": "Verbo na forma ます-stem + ませんか",
    "level": "N5",
    "examples": [
      {
        "jp": "一緒に映画を見ませんか。",
        "romaji": "Issho ni eiga o mimasen ka.",
        "pt": "Por que não assistimos a um filme juntos?"
      },
      {
        "jp": "コーヒーを飲みませんか。",
        "romaji": "Kōhii o nomimasen ka.",
        "pt": "Gostaria de tomar um café?"
      }
    ]
  },
  {
    "title": "〜ましょう",
    "explanation": "Usado para fazer uma sugestão ou para expressar uma intenção de fazer algo junto com o ouvinte. Significa 'vamos fazer'.",
    "pattern": "Verbo na forma ます-stem + ましょう",
    "level": "N5",
    "examples": [
      {
        "jp": "行きましょう。",
        "romaji": "Ikimashou.",
        "pt": "Vamos!"
      },
      {
        "jp": "一緒に勉強しましょう。",
        "romaji": "Issho ni benkyou shimashou.",
        "pt": "Vamos estudar juntos."
      }
    ]
  },
  {
    "title": "〜に あります・います",
    "explanation": "Indica a localização de objetos inanimados (あります) e seres vivos (います).",
    "pattern": "Substantivo + に + あります / います",
    "level": "N5",
    "examples": [
      {
        "jp": "つくえの上に本があります。",
        "romaji": "Tsukue no ue ni hon ga arimasu.",
        "pt": "Há um livro em cima da mesa."
      },
      {
        "jp": "へやに猫がいます。",
        "romaji": "Heya ni neko ga imasu.",
        "pt": "Tem um gato no quarto."
      }
    ]
  },
  {
    "title": "〜ながら",
    "explanation": "Indica que duas ações estão acontecendo simultaneamente, sendo a ação principal a que vem depois de ながら.",
    "pattern": "Verbo (forma ます, sem ます) + ながら",
    "level": "N5",
    "examples": [
      {
        "jp": "音楽を聞きながら勉強します。",
        "romaji": "Ongaku o kikinagara benkyō shimasu.",
        "pt": "Eu estudo enquanto ouço música."
      },
      {
        "jp": "コーヒーを飲みながら話しましょう。",
        "romaji": "Kōhī o nomimagata hanashimashō.",
        "pt": "Vamos conversar enquanto tomamos café."
      }
    ]
  },
  {
    "title": "〜ましょうか",
    "explanation": "Oferece ajuda ou propõe uma ação ao interlocutor, esperando uma resposta.",
    "pattern": "Verbo (forma ます, sem ます) + ましょうか",
    "level": "N5",
    "examples": [
      {
        "jp": "手伝いましょうか。",
        "romaji": "Tetsudaimashō ka.",
        "pt": "Posso ajudar?"
      },
      {
        "jp": "荷物を持ちましょうか。",
        "romaji": "Nimotsu o mochimashō ka.",
        "pt": "Posso carregar sua bagagem?"
      }
    ]
  },
  {
    "title": "〜たいです",
    "explanation": "Expressa um desejo ou vontade de fazer algo.",
    "pattern": "Verbo (forma ます, sem ます) + たいです",
    "level": "N5",
    "examples": [
      {
        "jp": "日本に行きたいです。",
        "romaji": "Nihon ni ikitai desu.",
        "pt": "Eu quero ir para o Japão."
      },
      {
        "jp": "おいしいものを食べたいです。",
        "romaji": "Oishii mono o tabetai desu.",
        "pt": "Eu quero comer coisas gostosas."
      }
    ]
  },
  {
    "title": "〜が ほしいです",
    "explanation": "Expressa o desejo de possuir ou ter algo.",
    "pattern": "Substantivo + が ほしいです",
    "level": "N5",
    "examples": [
      {
        "jp": "新しい携帯電話がほしいです。",
        "romaji": "Atarashii keitaidenwa ga hoshii desu.",
        "pt": "Eu quero um celular novo."
      },
      {
        "jp": "時間がほしいです。",
        "romaji": "Jikan ga hoshii desu.",
        "pt": "Eu quero tempo."
      }
    ]
  },
  {
    "title": "〜に 行きます・来ます・帰ります",
    "explanation": "Indica o destino de movimento (ir, vir, voltar).",
    "pattern": "Lugar + に + 行きます / 来ます / 帰ります",
    "level": "N5",
    "examples": [
      {
        "jp": "学校に行きます。",
        "romaji": "Gakkō ni ikimasu.",
        "pt": "Eu vou para a escola."
      },
      {
        "jp": "家に帰ります。",
        "romaji": "Ie ni kaerimasu.",
        "pt": "Eu volto para casa."
      }
    ]
  },
  {
    "title": "〜を します",
    "explanation": "Indica a ação de fazer ou praticar algo (esportes, trabalhos, etc.).",
    "pattern": "Substantivo + を します",
    "level": "N5",
    "examples": [
      {
        "jp": "テニスをします。",
        "romaji": "Tenisu o shimasu.",
        "pt": "Eu jogo tênis."
      },
      {
        "jp": "仕事をします。",
        "romaji": "Shigoto o shimasu.",
        "pt": "Eu trabalho."
      }
    ]
  },
  {
    "title": "〜が できます",
    "explanation": "Indica a capacidade de fazer algo, a formação de algo ou que algo está pronto.",
    "pattern": "Substantivo + が できます",
    "level": "N5",
    "examples": [
      {
        "jp": "日本語ができます。",
        "romaji": "Nihongo ga dekimasu.",
        "pt": "Eu consigo falar japonês."
      },
      {
        "jp": "新しい駅ができました。",
        "romaji": "Atarashii eki ga dekimashita.",
        "pt": "Uma nova estação foi construída."
      }
    ]
  },
  {
    "title": "〜が 好きです",
    "explanation": "Expressa que se gosta de algo.",
    "pattern": "Substantivo + が 好きです",
    "level": "N5",
    "examples": [
      {
        "jp": "犬が好きです。",
        "romaji": "Inu ga suki desu.",
        "pt": "Eu gosto de cachorros."
      },
      {
        "jp": "サッカーが好きです。",
        "romaji": "Sakkā ga suki desu.",
        "pt": "Eu gosto de futebol."
      }
    ]
  },
  {
    "title": "〜が 嫌いです",
    "explanation": "Expressa que se não gosta ou detesta algo.",
    "pattern": "Substantivo + が 嫌いです",
    "level": "N5",
    "examples": [
      {
        "jp": "虫が嫌いです。",
        "romaji": "Mushi ga kirai desu.",
        "pt": "Eu odeio insetos."
      },
      {
        "jp": "勉強が嫌いです。",
        "romaji": "Benkyō ga kirai desu.",
        "pt": "Eu não gosto de estudar."
      }
    ]
  },
  {
    "title": "〜が 上手です",
    "explanation": "Expressa que alguém é bom ou hábil em algo.",
    "pattern": "Substantivo + が 上手です",
    "level": "N5",
    "examples": [
      {
        "jp": "彼は絵が上手です。",
        "romaji": "Kare wa e ga jōzu desu.",
        "pt": "Ele é bom em desenhar."
      },
      {
        "jp": "彼女は歌が上手です。",
        "romaji": "Kanojo wa uta ga jōzu desu.",
        "pt": "Ela canta bem."
      }
    ]
  },
  {
    "title": "〜が 下手です",
    "explanation": "Expressa que alguém é ruim ou pouco hábil em algo.",
    "pattern": "Substantivo + が 下手です",
    "level": "N5",
    "examples": [
      {
        "jp": "私は料理が下手です。",
        "romaji": "Watashi wa ryōri ga heta desu.",
        "pt": "Eu sou ruim em cozinhar."
      },
      {
        "jp": "彼は日本語が下手です。",
        "romaji": "Kare wa Nihongo ga heta desu.",
        "pt": "Ele é ruim em japonês."
      }
    ]
  },
  {
    "title": "〜たり〜たり します",
    "explanation": "Lista algumas ações típicas que ocorrem, sem necessariamente listar todas ou em ordem cronológica.",
    "pattern": "Verbo (forma た) + り + Verbo (forma た) + り します",
    "level": "N5",
    "examples": [
      {
        "jp": "休みの日に本を読んだり、映画を見たりします。",
        "romaji": "Yasumi no hi ni hon o yondari, eiga o mitari shimasu.",
        "pt": "Nos dias de folga, eu leio livros, assisto filmes, etc."
      },
      {
        "jp": "週末は買い物に行ったり、友達と会ったりします。",
        "romaji": "Shūmatsu wa kaimono ni ittari, tomodachi to attari shimasu.",
        "pt": "No fim de semana, eu vou às compras, encontro amigos, etc."
      }
    ]
  },
  {
    "title": "〜に なります",
    "explanation": "Indica uma mudança de estado ou condição, tornando-se algo.",
    "pattern": "Adjetivo い (sem い) + くなります / Adjetivo な (sem な) + に なります / Substantivo + に なります",
    "level": "N5",
    "examples": [
      {
        "jp": "寒くなりました。",
        "romaji": "Samuku narimashita.",
        "pt": "Ficou frio."
      },
      {
        "jp": "医者になりました。",
        "romaji": "Isha ni narimashita.",
        "pt": "Ele se tornou médico."
      }
    ]
  },
  {
    "title": "〜を あげます・もらいます・くれます",
    "explanation": "Expressa ações de dar (あげます), receber (もらいます) e alguém dar para o falante (くれます).",
    "pattern": "A + は/が + B + に + Substantivo + を あげます (A dá para B) / A + は/が + B + に/から + Substantivo + を もらいます (A recebe de B) / B + が + 私 + に + Substantivo + を くれます (B dá para mim)",
    "level": "N5",
    "examples": [
      {
        "jp": "私は友達に本をあげました。",
        "romaji": "Watashi wa tomodachi ni hon o agemashita.",
        "pt": "Eu dei um livro para meu amigo."
      },
      {
        "jp": "友達が私にプレゼントをくれました。",
        "romaji": "Tomodachi ga watashi ni purezento o kuremashita.",
        "pt": "Meu amigo me deu um presente."
      }
    ]
  },
  {
    "title": "〜から",
    "explanation": "Indica o ponto de partida de um movimento ou a origem de algo. Também pode indicar a causa ou razão.",
    "pattern": "Substantivo + から",
    "level": "N5",
    "examples": [
      {
        "jp": "東京から来ました。",
        "romaji": "Tōkyō kara kimashita.",
        "pt": "Eu vim de Tóquio."
      },
      {
        "jp": "病気だから、学校を休みます。",
        "romaji": "Byōki dakara, gakkō o yasumimasu.",
        "pt": "Como estou doente, faltarei à escola."
      }
    ]
  },
  {
    "title": "〜まで",
    "explanation": "Indica o ponto final de um movimento ou a duração até um certo limite.",
    "pattern": "Substantivo + まで",
    "level": "N5",
    "examples": [
      {
        "jp": "家まで歩きます。",
        "romaji": "Ie made arukimasu.",
        "pt": "Eu ando até em casa."
      },
      {
        "jp": "9時から5時まで働きます。",
        "romaji": "Kuji kara goji made hatarakimasu.",
        "pt": "Eu trabalho das 9h às 17h."
      }
    ]
  },
  {
    "title": "〜てください",
    "explanation": "Usado para fazer um pedido ou dar uma instrução de forma polida.",
    "pattern": "verbo (te-form) + ください",
    "level": "N5",
    "examples": [
      {
        "jp": "座ってください。",
        "romaji": "Suwatte kudasai.",
        "pt": "Por favor, sente-se."
      },
      {
        "jp": "この本を読んでください。",
        "romaji": "Kono hon o yonde kudasai.",
        "pt": "Por favor, leia este livro."
      }
    ]
  },
  {
    "title": "〜てもいいですか",
    "explanation": "Usado para pedir permissão para fazer algo.",
    "pattern": "verbo (te-form) + もいいですか",
    "level": "N5",
    "examples": [
      {
        "jp": "ここに入ってもいいですか。",
        "romaji": "Koko ni haitte mo ii desu ka.",
        "pt": "Posso entrar aqui?"
      },
      {
        "jp": "写真をとってもいいですか。",
        "romaji": "Shashin o totte mo ii desu ka.",
        "pt": "Posso tirar fotos?"
      }
    ]
  },
  {
    "title": "〜てはいけません",
    "explanation": "Expressa proibição, ou seja, que algo não deve ser feito.",
    "pattern": "verbo (te-form) + はいけません",
    "level": "N5",
    "examples": [
      {
        "jp": "ここでタバコを吸ってはいけません。",
        "romaji": "Koko de tabako o sutte wa ikemasen.",
        "pt": "Não se pode fumar aqui."
      },
      {
        "jp": "遅れてはいけません。",
        "romaji": "Okurete wa ikemasen.",
        "pt": "Não se atrase."
      }
    ]
  },
  {
    "title": "〜ています (situação atual)",
    "explanation": "Descreve um estado resultante de uma ação ou uma característica permanente.",
    "pattern": "verbo (te-form) + います",
    "level": "N5",
    "examples": [
      {
        "jp": "私は結婚しています。",
        "romaji": "Watashi wa kekkon shite imasu.",
        "pt": "Eu sou casado(a)."
      },
      {
        "jp": "めがねをかけています。",
        "romaji": "Megane o kakete imasu.",
        "pt": "Eu estou usando óculos."
      }
    ]
  },
  {
    "title": "〜ています (hábito/ação repetida)",
    "explanation": "Indica uma ação habitual ou algo que se faz regularmente.",
    "pattern": "verbo (te-form) + います",
    "level": "N5",
    "examples": [
      {
        "jp": "毎日日本語を勉強しています。",
        "romaji": "Mainichi Nihongo o benkyō shite imasu.",
        "pt": "Eu estudo japonês todos os dias."
      },
      {
        "jp": "テニスをしています。",
        "romaji": "Tenisu o shite imasu.",
        "pt": "Eu jogo tênis (habitualmente)."
      }
    ]
  },
  {
    "title": "〜が",
    "explanation": "Conjunção que significa 'mas' ou 'e', conectando duas orações, muitas vezes com contraste ou adicionando informações.",
    "pattern": "oração 1 + が + oração 2",
    "level": "N5",
    "examples": [
      {
        "jp": "この本は高いですが、面白いです。",
        "romaji": "Kono hon wa takai desu ga, omoshiroi desu.",
        "pt": "Este livro é caro, mas interessante."
      },
      {
        "jp": "コーヒーを飲みましたが、まだ眠いです。",
        "romaji": "Kōhī o nomimashita ga, mada nemui desu.",
        "pt": "Eu tomei café, mas ainda estou com sono."
      }
    ]
  },
  {
    "title": "〜が (para indicar o objeto de desejo/habilidade)",
    "explanation": "A partícula が é usada para indicar o objeto de verbos de desejo, preferência, habilidade ou posse.",
    "pattern": "substantivo + が + 欲しいです / 好きです / 分かります etc.",
    "level": "N5",
    "examples": [
      {
        "jp": "新しい車が欲しいです。",
        "romaji": "Atarashii kuruma ga hoshii desu.",
        "pt": "Eu quero um carro novo."
      },
      {
        "jp": "日本語が分かります。",
        "romaji": "Nihongo ga wakarimasu.",
        "pt": "Eu entendo japonês."
      }
    ]
  },
  {
    "title": "〜を (partícula de objeto direto)",
    "explanation": "A partícula を marca o objeto direto de um verbo transitivo, indicando o alvo da ação.",
    "pattern": "substantivo + を + verbo transitivo",
    "level": "N5",
    "examples": [
      {
        "jp": "水を飲みます。",
        "romaji": "Mizu o nomimasu.",
        "pt": "Eu bebo água."
      },
      {
        "jp": "本を読みます。",
        "romaji": "Hon o yomimasu.",
        "pt": "Eu leio um livro."
      }
    ]
  },
  {
    "title": "〜に (direção, destino)",
    "explanation": "A partícula に indica o destino ou a direção para onde se move.",
    "pattern": "local + に + verbos de movimento (行きます、来ます、帰ります)",
    "level": "N5",
    "examples": [
      {
        "jp": "日本に行きます。",
        "romaji": "Nihon ni ikimasu.",
        "pt": "Eu vou para o Japão."
      },
      {
        "jp": "家へ帰ります。",
        "romaji": "Ie e kaerimasu.",
        "pt": "Eu volto para casa."
      }
    ]
  },
  {
    "title": "〜に (local de existência)",
    "explanation": "A partícula に indica o local onde algo ou alguém existe.",
    "pattern": "objeto/pessoa + が + local + に + います/あります",
    "level": "N5",
    "examples": [
      {
        "jp": "机の上に本があります。",
        "romaji": "Tsukue no ue ni hon ga arimasu.",
        "pt": "Há um livro em cima da mesa."
      },
      {
        "jp": "部屋に猫がいます。",
        "romaji": "Heya ni neko ga imasu.",
        "pt": "Há um gato no quarto."
      }
    ]
  },
  {
    "title": "〜で (lugar de ação)",
    "explanation": "A partícula で indica o lugar onde uma ação ocorre.",
    "pattern": "local + で + verbo (ação)",
    "level": "N5",
    "examples": [
      {
        "jp": "図書館で勉強します。",
        "romaji": "Toshokan de benkyō shimasu.",
        "pt": "Eu estudo na biblioteca."
      },
      {
        "jp": "レストランでご飯を食べます。",
        "romaji": "Resutoran de gohan o tabemasu.",
        "pt": "Eu como no restaurante."
      }
    ]
  },
  {
    "title": "〜で (meio, instrumento)",
    "explanation": "A partícula で indica o meio, instrumento ou método pelo qual uma ação é realizada.",
    "pattern": "meio/instrumento + で + verbo",
    "level": "N5",
    "examples": [
      {
        "jp": "電車で会社に行きます。",
        "romaji": "Densha de kaisha ni ikimasu.",
        "pt": "Eu vou para o trabalho de trem."
      },
      {
        "jp": "鉛筆で書きます。",
        "romaji": "Enpitsu de kakimasu.",
        "pt": "Eu escrevo com um lápis."
      }
    ]
  },
  {
    "title": "〜と (com quem)",
    "explanation": "A partícula と é usada para indicar com quem se faz algo, significando 'com'.",
    "pattern": "pessoa + と + verbo",
    "level": "N5",
    "examples": [
      {
        "jp": "友達と話します。",
        "romaji": "Tomodachi to hanashimasu.",
        "pt": "Eu falo com meu amigo."
      },
      {
        "jp": "家族と旅行します。",
        "romaji": "Kazoku to ryokō shimasu.",
        "pt": "Eu viajo com minha família."
      }
    ]
  },
  {
    "title": "〜と (e, e)",
    "explanation": "A partícula と é usada para listar substantivos de forma exaustiva, significando 'e'.",
    "pattern": "substantivo A + と + substantivo B",
    "level": "N5",
    "examples": [
      {
        "jp": "りんごときゅうりを買いました。",
        "romaji": "Ringo to kyūri o kaimashita.",
        "pt": "Comprei maçãs e pepinos."
      },
      {
        "jp": "ペンとノートがあります。",
        "romaji": "Pen to nōto ga arimasu.",
        "pt": "Tenho uma caneta e um caderno."
      }
    ]
  },
  {
    "title": "〜へ (direção)",
    "explanation": "A partícula へ (lê-se 'e') é usada para indicar a direção ou destino de um movimento. É intercambiável com に na maioria dos casos, mas へ enfatiza mais a direção.",
    "pattern": "local + へ + verbos de movimento (行きます、来ます、帰ります)",
    "level": "N5",
    "examples": [
      {
        "jp": "学校へ行きます。",
        "romaji": "Gakkō e ikimasu.",
        "pt": "Eu vou para a escola."
      },
      {
        "jp": "日本へ来ました。",
        "romaji": "Nihon e kimashita.",
        "pt": "Eu vim para o Japão."
      }
    ]
  },
  {
    "title": "〜から (de, origem)",
    "explanation": "A partícula から indica o ponto de partida de uma ação ou o local de origem.",
    "pattern": "origem/ponto de partida + から",
    "level": "N5",
    "examples": [
      {
        "jp": "日本から来ました。",
        "romaji": "Nihon kara kimashita.",
        "pt": "Eu vim do Japão."
      },
      {
        "jp": "8時から働き始めます。",
        "romaji": "Hachi-ji kara hataraki hajimemasu.",
        "pt": "Começo a trabalhar a partir das 8 horas."
      }
    ]
  },
  {
    "title": "〜しか〜ない",
    "explanation": "Expressa a ideia de 'só isso/aquilo e nada mais', indicando limitação. Geralmente usado com verbos na forma negativa.",
    "pattern": "Substantivo/Quantidade + しか + Verbo na forma negativa",
    "level": "N5",
    "examples": [
      {
        "jp": "私は日本語が少ししか話せません。",
        "romaji": "Watashi wa Nihongo ga sukoshi shika hanasemasen.",
        "pt": "Eu só falo um pouco de japonês."
      },
      {
        "jp": "この店にはパンしかありません。",
        "romaji": "Kono mise ni wa pan shika arimasen.",
        "pt": "Nesta loja, só tem pão."
      }
    ]
  },
  {
    "title": "〜やすい / 〜にくい",
    "explanation": "〜やすい significa 'fácil de fazer'. 〜にくい significa 'difícil de fazer' ou 'complicado'.",
    "pattern": "Verbo na forma 'masu' (sem 'masu') + やすい / にくい",
    "level": "N5",
    "examples": [
      {
        "jp": "この本は読みやすいです。",
        "romaji": "Kono hon wa yomiyasui desu.",
        "pt": "Este livro é fácil de ler."
      },
      {
        "jp": "この漢字は書きにくいです。",
        "romaji": "Kono kanji wa kakinikui desu.",
        "pt": "Este kanji é difícil de escrever."
      }
    ]
  },
  {
    "title": "〜ている",
    "explanation": "Indica uma ação contínua (estou fazendo), um estado resultante (estou casado), ou uma ação habitual (trabalho lá).",
    "pattern": "Verbo na forma 'te' + いる",
    "level": "N5",
    "examples": [
      {
        "jp": "今、本を読んでいます。",
        "romaji": "Ima, hon o yonde imasu.",
        "pt": "Agora, estou lendo um livro."
      },
      {
        "jp": "彼は結婚しています。",
        "romaji": "Kare wa kekkon shite imasu.",
        "pt": "Ele está casado."
      }
    ]
  },
  {
    "title": "〜てから",
    "explanation": "Indica uma sequência de eventos, significando 'depois de fazer algo'. A segunda ação ocorre após a primeira ser completamente finalizada.",
    "pattern": "Verbo na forma 'te' + から",
    "level": "N5",
    "examples": [
      {
        "jp": "ご飯を食べてから、寝ます。",
        "romaji": "Gohan o tabete kara, nemasu.",
        "pt": "Depois de comer, vou dormir."
      },
      {
        "jp": "シャワーを浴びてから、出かけます。",
        "romaji": "Shawā o abite kara, dekakemasu.",
        "pt": "Depois de tomar banho, vou sair."
      }
    ]
  },
  {
    "title": "〜たり〜たりする",
    "explanation": "Lista algumas ações como exemplos de um conjunto maior de ações que são feitas ou aconteceram. Significa 'fazer coisas como... e...'.",
    "pattern": "Verbo na forma 'ta' + り + Verbo na forma 'ta' + り + する",
    "level": "N5",
    "examples": [
      {
        "jp": "週末は映画を見たり、本を読んだりします。",
        "romaji": "Shūmatsu wa eiga o mitari, hon o yondari shimasu.",
        "pt": "No fim de semana, faço coisas como assistir filmes e ler livros."
      },
      {
        "jp": "休みの日は寝たり、散歩したりします。",
        "romaji": "Yasumi no hi wa netari, sanpo shitari shimasu.",
        "pt": "Nos dias de folga, faço coisas como dormir e passear."
      }
    ]
  },
  {
    "title": "〜つもりです",
    "explanation": "Expressa intenção ou plano futuro. Significa 'pretendo fazer...' ou 'tenho a intenção de fazer...'.",
    "pattern": "Verbo na forma simples + つもりです",
    "level": "N5",
    "examples": [
      {
        "jp": "来年、日本へ行くつもりです。",
        "romaji": "Rainen, Nihon e iku tsumori desu.",
        "pt": "Pretendo ir ao Japão no próximo ano."
      },
      {
        "jp": "明日、新しい靴を買うつもりです。",
        "romaji": "Ashita, atarashii kutsu o kau tsumori desu.",
        "pt": "Amanhã, pretendo comprar sapatos novos."
      }
    ]
  },
  {
    "title": "〜ほうがいい",
    "explanation": "Dá conselhos, significando 'É melhor fazer...' ou 'Seria melhor não fazer...'.",
    "pattern": "Verbo na forma 'ta' (para conselho positivo) ou Verbo na forma negativa simples (para conselho negativo) + ほうがいい",
    "level": "N5",
    "examples": [
      {
        "jp": "早く寝たほうがいいですよ。",
        "romaji": "Hayaku neta hō ga ii desu yo.",
        "pt": "É melhor dormir cedo."
      },
      {
        "jp": "そんなにたくさん食べないほうがいいですよ。",
        "romaji": "Sonna ni takusan tabenai hō ga ii desu yo.",
        "pt": "É melhor não comer tanto assim."
      }
    ]
  },
  {
    "title": "〜でしょう / 〜だろう",
    "explanation": "Expressa probabilidade, suposição ou confirmação. でしょう é mais formal que だろう.",
    "pattern": "Verbo/Adjetivo na forma simples + でしょう / だろう",
    "level": "N5",
    "examples": [
      {
        "jp": "明日は雨が降るでしょう。",
        "romaji": "Ashita wa ame ga furu deshō.",
        "pt": "Provavelmente choverá amanhã."
      },
      {
        "jp": "彼は日本人だろう。",
        "romaji": "Kare wa Nihonjin darō.",
        "pt": "Ele deve ser japonês."
      }
    ]
  },
  {
    "title": "〜と思います",
    "explanation": "Expressa a opinião ou pensamento do falante. Significa 'Eu acho que...' ou 'Eu penso que...'.",
    "pattern": "Verbo/Adjetivo na forma simples + と思います",
    "level": "N5",
    "examples": [
      {
        "jp": "この映画は面白いと思います。",
        "romaji": "Kono eiga wa omoshiroi to omoimasu.",
        "pt": "Eu acho que este filme é interessante."
      },
      {
        "jp": "明日は晴れると思います。",
        "romaji": "Ashita wa hareru to omoimasu.",
        "pt": "Eu acho que amanhã fará sol."
      }
    ]
  },
  {
    "title": "〜と言っていました",
    "explanation": "Reporta o que outra pessoa disse. Significa 'Ele/Ela disse que...'.",
    "pattern": "Verbo/Adjetivo na forma simples + と言っていました",
    "level": "N5",
    "examples": [
      {
        "jp": "田中さんは明日来ると言っていました。",
        "romaji": "Tanaka-san wa ashita kuru to itte imashita.",
        "pt": "O Sr. Tanaka disse que virá amanhã."
      },
      {
        "jp": "母は「早く家に帰りなさい」と言っていました。",
        "romaji": "Haha wa 'Hayaku ie ni kaerinasai' to itte imashita.",
        "pt": "Minha mãe disse 'Volte para casa cedo'."
      }
    ]
  },
  {
    "title": "〜ないでください",
    "explanation": "Pede para alguém não fazer algo de forma educada. É uma forma de proibição ou pedido negativo.",
    "pattern": "Verbo na forma negativa 'nai' (sem 'i') + でください",
    "level": "N5",
    "examples": [
      {
        "jp": "ここに入らないでください。",
        "romaji": "Koko ni hairanai de kudasai.",
        "pt": "Por favor, não entre aqui."
      },
      {
        "jp": "忘れ物をしないでください。",
        "romaji": "Wasuremono o shinai de kudasai.",
        "pt": "Por favor, não esqueça nada."
      }
    ]
  },
  {
    "title": "〜なかった",
    "explanation": "Forma passada da negação de verbos (e adjetivos 'i'), significando 'não fiz' ou 'não era'.",
    "pattern": "Verbo na forma negativa simples (sem 'i') + なかった",
    "level": "N5",
    "examples": [
      {
        "jp": "昨日、学校に行きませんでした。(Formal)",
        "romaji": "Kinō, gakkō ni ikimasen deshita.",
        "pt": "Ontem, eu não fui à escola."
      },
      {
        "jp": "昨日は寒くなかったです。",
        "romaji": "Kinō wa samukunakatta desu.",
        "pt": "Ontem não estava frio."
      }
    ]
  },
  {
    "title": "〜なくてはいけません",
    "explanation": "Indica uma obrigação ou necessidade, significando 'ter que fazer...' ou 'deve-se fazer...'.",
    "pattern": "Verbo na forma negativa 'nai' (sem 'i') + なくてはいけません",
    "level": "N5",
    "examples": [
      {
        "jp": "宿題をしなければいけません。",
        "romaji": "Shukudai o shinakereba ikemasen.",
        "pt": "Tenho que fazer a lição de casa."
      },
      {
        "jp": "明日は早く起きなくてはいけません。",
        "romaji": "Ashita wa hayaku okinakute wa ikemasen.",
        "pt": "Amanhã tenho que acordar cedo."
      }
    ]
  },
  {
    "title": "〜なくてもいいです",
    "explanation": "Indica que não há necessidade de fazer algo, significando 'não precisa fazer...' ou 'não é necessário fazer...'.",
    "pattern": "Verbo na forma negativa 'nai' (sem 'i') + なくてもいいです",
    "level": "N5",
    "examples": [
      {
        "jp": "行かなくてもいいです。",
        "romaji": "Ikanakute mo ii desu.",
        "pt": "Não precisa ir."
      },
      {
        "jp": "日曜日は働かなくてもいいです。",
        "romaji": "Nichiyōbi wa hatarakanakute mo ii desu.",
        "pt": "No domingo, não precisa trabalhar."
      }
    ]
  },
  {
    "title": "〜ので",
    "explanation": "Similar a 'から', mas um pouco mais formal e menos direto, dando uma razão. Geralmente usado em situações onde você está explicando algo.",
    "pattern": "Sentença (forma simples para verbos/adjetivos i, +na para adjetivos na/substantivos) + ので",
    "level": "N5",
    "examples": [
      {
        "jp": "電車が遅れたので、遅刻しました。",
        "romaji": "Densha ga okureta node, chikoku shimashita.",
        "pt": "Como o trem atrasou, cheguei atrasado."
      },
      {
        "jp": "日本語が話せるので、困りません。",
        "romaji": "Nihongo ga hanaseru node, komarimasen.",
        "pt": "Como falo japonês, não tenho problemas."
      }
    ]
  },
  {
    "title": "〜なければなりません",
    "explanation": "Significa 'deve' ou 'ter que'. Expressa uma obrigação forte.",
    "pattern": "[verbo nai-form sem い]なければなりません",
    "level": "N5",
    "examples": [
      {
        "jp": "宿題をしなければなりません。",
        "romaji": "Shukudai o shinakereba narimasen.",
        "pt": "Eu tenho que fazer a lição de casa."
      },
      {
        "jp": "薬を飲まなければなりません。",
        "romaji": "Kusuri o nomanakereba narimasen.",
        "pt": "Eu tenho que tomar o remédio."
      }
    ]
  },
  {
    "title": "〜と言いました / 〜と言います",
    "explanation": "Usado para citar o que alguém disse. Significa 'disse que' ou 'diz que'.",
    "pattern": "[forma simples]と言いました / と言います",
    "level": "N5",
    "examples": [
      {
        "jp": "彼は「行きます」と言いました。",
        "romaji": "Kare wa 'Ikimasu' to iimashita.",
        "pt": "Ele disse 'eu vou'."
      },
      {
        "jp": "先生は「よく勉強しなさい」と言います。",
        "romaji": "Sensei wa 'Yoku benkyō shinasai' to iimasu.",
        "pt": "O professor diz 'estudem bastante'."
      }
    ]
  },
  {
    "title": "〜後で",
    "explanation": "Significa 'depois de'. Indica que uma ação ou evento ocorre após outro.",
    "pattern": "[verbo ta-form / substantivo の]後で",
    "level": "N5",
    "examples": [
      {
        "jp": "宿題をした後で遊びます。",
        "romaji": "Shukudai o shita ato de asobimasu.",
        "pt": "Eu brinco depois de fazer a lição de casa."
      },
      {
        "jp": "仕事の後で飲みに行きましょう。",
        "romaji": "Shigoto no ato de nomi ni ikimashō.",
        "pt": "Vamos beber depois do trabalho."
      }
    ]
  },
  {
    "title": "〜たり〜たりします",
    "explanation": "Lista algumas ações típicas entre várias, implicando que outras ações também podem ocorrer. Significa 'fazer isso e aquilo'.",
    "pattern": "[verbo ta-form]たり [verbo ta-form]たりします",
    "level": "N5",
    "examples": [
      {
        "jp": "休みの日は、本を読んだり映画を見たりします。",
        "romaji": "Yasumi no hi wa, hon o yondari eiga o mitari shimasu.",
        "pt": "Nos dias de folga, eu leio livros, assisto a filmes, entre outras coisas."
      },
      {
        "jp": "週末は、買い物に行ったり友達と会ったりします。",
        "romaji": "Shūmatsu wa, kaimono ni ittari tomodachi to attari shimasu.",
        "pt": "No fim de semana, eu vou às compras e encontro amigos, entre outras coisas."
      }
    ]
  },
  {
    "title": "〜方",
    "explanation": "Significa 'o modo de fazer' ou 'como fazer'. Usado para descrever um método ou maneira.",
    "pattern": "[verbo stem]方",
    "level": "N5",
    "examples": [
      {
        "jp": "この漢字の書き方を教えてください。",
        "romaji": "Kono kanji no kakikata o oshiete kudasai.",
        "pt": "Por favor, me ensine como escrever este kanji."
      },
      {
        "jp": "この料理の作り方を知っていますか。",
        "romaji": "Kono ryōri no tsukurikata o shitte imasu ka.",
        "pt": "Você sabe como fazer este prato?"
      }
    ]
  },
  {
    "title": "〜やすい",
    "explanation": "Significa 'fácil de fazer'. Indica que uma ação é fácil de ser executada.",
    "pattern": "[verbo stem]やすい",
    "level": "N5",
    "examples": [
      {
        "jp": "この本は読みやすいです。",
        "romaji": "Kono hon wa yomiyasui desu.",
        "pt": "Este livro é fácil de ler."
      },
      {
        "jp": "このパソコンは使いやすいです。",
        "romaji": "Kono pasokon wa tsukaiyasui desu.",
        "pt": "Este computador é fácil de usar."
      }
    ]
  },
  {
    "title": "〜にくい",
    "explanation": "Significa 'difícil de fazer'. Indica que uma ação é difícil de ser executada.",
    "pattern": "[verbo stem]にくい",
    "level": "N5",
    "examples": [
      {
        "jp": "この漢字は書きにくいです。",
        "romaji": "Kono kanji wa kakinikui desu.",
        "pt": "Este kanji é difícil de escrever."
      },
      {
        "jp": "この靴は歩きにくいです。",
        "romaji": "Kono kutsu wa arukinikui desu.",
        "pt": "Este sapato é difícil de andar."
      }
    ]
  },
  {
    "title": "〜しか〜ません",
    "explanation": "Significa 'apenas', 'somente'. Sempre usado com um verbo na forma negativa, enfatizando a exclusividade.",
    "pattern": "[substantivo]しか [verbo negativo]",
    "level": "N5",
    "examples": [
      {
        "jp": "私は日本語しか話せません。",
        "romaji": "Watashi wa Nihongo shika hanasemasen.",
        "pt": "Eu só falo japonês."
      },
      {
        "jp": "彼女はコーヒーしか飲みません。",
        "romaji": "Kanojo wa kōhī shika nomimasen.",
        "pt": "Ela só bebe café."
      }
    ]
  },
  {
    "title": "〜そうです (aparência)",
    "explanation": "Expressa que algo parece ser de certa forma, com base na observação. Significa 'parece que'.",
    "pattern": "[verbo stem / adjetivo い sem い / adjetivo な sem な]そうです",
    "level": "N5",
    "examples": [
      {
        "jp": "雨が降りそうです。",
        "romaji": "Ame ga furisō desu.",
        "pt": "Parece que vai chover."
      },
      {
        "jp": "このケーキはおいしそうです。",
        "romaji": "Kono kēki wa oishisō desu.",
        "pt": "Este bolo parece delicioso."
      }
    ]
  },
  {
    "title": "〜そうです (informação)",
    "explanation": "Usado para relatar informações que foram ouvidas de outra pessoa. Significa 'disseram que' ou 'ouvi dizer que'.",
    "pattern": "[forma simples]そうです",
    "level": "N5",
    "examples": [
      {
        "jp": "ニュースによると、明日台風が来るそうです。",
        "romaji": "Nyūsu ni yoru to, ashita taifū ga kuru sō desu.",
        "pt": "De acordo com as notícias, disseram que um tufão virá amanhã."
      },
      {
        "jp": "彼は結婚するそうです。",
        "romaji": "Kare wa kekkon suru sō desu.",
        "pt": "Ouvi dizer que ele vai se casar."
      }
    ]
  },
  {
    "title": "〜でしょう (pergunta)",
    "explanation": "Usado para confirmar algo que o falante acredita ser verdade, esperando concordância. Significa 'não é?' ou 'certo?'.",
    "pattern": "[forma simples]でしょう？",
    "level": "N5",
    "examples": [
      {
        "jp": "この映画、面白いでしょう？",
        "romaji": "Kono eiga, omoshiroi deshō?",
        "pt": "Este filme é interessante, não é?"
      },
      {
        "jp": "明日は晴れるでしょう？",
        "romaji": "Ashita wa hareru deshō?",
        "pt": "Amanhã fará sol, certo?"
      }
    ]
  },
  {
    "title": "〜にする",
    "explanation": "Significa 'decidir por' ou 'escolher'. Usado para expressar uma decisão tomada.",
    "pattern": "[substantivo]にする",
    "level": "N5",
    "examples": [
      {
        "jp": "コーヒーにします。",
        "romaji": "Kōhī ni shimasu.",
        "pt": "Eu vou querer café."
      },
      {
        "jp": "日本に行くことにしました。",
        "romaji": "Nihon ni iku koto ni shimashita.",
        "pt": "Eu decidi ir para o Japão."
      }
    ]
  },
  {
    "title": "〜てもいい",
    "explanation": "Expressa permissão ou que algo é aceitável. 'Pode (fazer) X'.",
    "pattern": "Verbo Te-form + もいい",
    "level": "N4",
    "examples": [
      {
        "jp": "食べてもいいですか。",
        "romaji": "Tabete mo ii desu ka.",
        "pt": "Posso comer?"
      },
      {
        "jp": "ここで写真を撮ってもいいです。",
        "romaji": "Koko de shashin o totte mo ii desu.",
        "pt": "Pode tirar fotos aqui."
      }
    ]
  },
  {
    "title": "〜てはいけない",
    "explanation": "Expressa proibição. 'Não pode (fazer) X'.",
    "pattern": "Verbo Te-form + はいけない",
    "level": "N4",
    "examples": [
      {
        "jp": "ここでタバコを吸ってはいけません。",
        "romaji": "Koko de tabako o sutte wa ikemasen.",
        "pt": "Não pode fumar aqui."
      },
      {
        "jp": "遅れてはいけません。",
        "romaji": "Okurete wa ikemasen.",
        "pt": "Não pode se atrasar."
      }
    ]
  },
  {
    "title": "〜なければならない / なければいけない",
    "explanation": "Expressa obrigação. 'Precisa fazer X' ou 'Tem que fazer X'.",
    "pattern": "Verbo Forma Negativa (removendo -ない) + なければならない/いけない",
    "level": "N4",
    "examples": [
      {
        "jp": "宿題をしなければなりません。",
        "romaji": "Shukudai o shinakereba narimasen.",
        "pt": "Tenho que fazer a lição de casa."
      },
      {
        "jp": "日本語を毎日勉強しなければいけません。",
        "romaji": "Nihongo o mainichi benkyou shinakereba ikemasen.",
        "pt": "Preciso estudar japonês todos os dias."
      }
    ]
  },
  {
    "title": "〜なくてもいい",
    "explanation": "Expressa que não é necessário fazer algo. 'Não precisa fazer X'.",
    "pattern": "Verbo Forma Negativa (removendo -ない) + なくてもいい",
    "level": "N4",
    "examples": [
      {
        "jp": "行かなくてもいいです。",
        "romaji": "Ikanakute mo ii desu.",
        "pt": "Não precisa ir."
      },
      {
        "jp": "無理しなくてもいいですよ。",
        "romaji": "Muri shinakute mo ii desu yo.",
        "pt": "Não precisa se esforçar tanto."
      }
    ]
  },
  {
    "title": "〜たほうがいい",
    "explanation": "Dá um conselho, 'É melhor fazer X'.",
    "pattern": "Verbo Forma Curta Passada (Ta-form) + ほうがいい",
    "level": "N4",
    "examples": [
      {
        "jp": "早く寝たほうがいいですよ。",
        "romaji": "Hayaku neta hou ga ii desu yo.",
        "pt": "É melhor você ir dormir cedo."
      },
      {
        "jp": "もっと練習したほうがいい。",
        "romaji": "Motto renshuu shita hou ga ii.",
        "pt": "É melhor praticar mais."
      }
    ]
  },
  {
    "title": "〜ないほうがいい",
    "explanation": "Dá um conselho para não fazer algo, 'É melhor não fazer X'.",
    "pattern": "Verbo Forma Curta Negativa + ほうがいい",
    "level": "N4",
    "examples": [
      {
        "jp": "遅くまで起きないほうがいい。",
        "romaji": "Osoku made okinai hou ga ii.",
        "pt": "É melhor não ficar acordado até tarde."
      },
      {
        "jp": "甘いものを食べないほうがいいですよ。",
        "romaji": "Amai mono o tabenai hou ga ii desu yo.",
        "pt": "É melhor não comer doces."
      }
    ]
  },
  {
    "title": "〜とき",
    "explanation": "Significa 'quando' ou 'na época em que X'. Descreve o momento em que algo acontece.",
    "pattern": "Verbo Forma Curta / Substantivo の / Adjetivo い / Adjetivo な + とき",
    "level": "N4",
    "examples": [
      {
        "jp": "日本へ来たとき、日本語が話せませんでした。",
        "romaji": "Nihon e kita toki, nihongo ga hanasemasen deshita.",
        "pt": "Quando vim para o Japão, não conseguia falar japonês."
      },
      {
        "jp": "暇なとき、本を読みます。",
        "romaji": "Hima na toki, hon o yomimasu.",
        "pt": "Quando estou livre, leio livros."
      }
    ]
  },
  {
    "title": "〜たら",
    "explanation": "Expressa uma condição hipotética ou sequencial. 'Se X, então Y' ou 'Depois que X, Y'.",
    "pattern": "Verbo Forma Curta Passada (Ta-form) + ら",
    "level": "N4",
    "examples": [
      {
        "jp": "雨が降ったら、行きません。",
        "romaji": "Ame ga futtara, ikimasen.",
        "pt": "Se chover, não irei."
      },
      {
        "jp": "宿題が終わったら、遊びに行こう。",
        "romaji": "Shukudai ga owattara, asobi ni ikou.",
        "pt": "Depois que terminar a lição de casa, vamos sair para brincar."
      }
    ]
  },
  {
    "title": "〜なら",
    "explanation": "Usado para dar conselhos ou fazer uma pergunta baseada em uma informação anterior. 'Se for o caso de X, então Y'.",
    "pattern": "Verbo Forma Curta / Substantivo / Adjetivo + なら",
    "level": "N4",
    "examples": [
      {
        "jp": "日本へ行くなら、寿司を食べたほうがいいですよ。",
        "romaji": "Nihon e iku nara, sushi o tabeta hou ga ii desu yo.",
        "pt": "Se você vai para o Japão, é melhor comer sushi."
      },
      {
        "jp": "田中さんなら、もう帰りました。",
        "romaji": "Tanaka-san nara, mou kaerimashita.",
        "pt": "Se é o Tanaka-san, ele já voltou para casa."
      }
    ]
  },
  {
    "title": "〜前に",
    "explanation": "Significa 'antes de X'.",
    "pattern": "Verbo Forma Curta Presente + 前に / Substantivo の + 前に",
    "level": "N4",
    "examples": [
      {
        "jp": "寝る前に、歯を磨きます。",
        "romaji": "Neru mae ni, ha o migakimasu.",
        "pt": "Antes de dormir, escovo os dentes."
      },
      {
        "jp": "食事の前に、手を洗います。",
        "romaji": "Shokuji no mae ni, te o araimasu.",
        "pt": "Antes da refeição, lavo as mãos."
      }
    ]
  },
  {
    "title": "〜間に",
    "explanation": "Significa 'enquanto X' ou 'durante X'. Indica que algo acontece enquanto outra coisa está em andamento.",
    "pattern": "Verbo Forma Curta Presente / Substantivo の / Adjetivo い / Adjetivo な + 間に",
    "level": "N4",
    "examples": [
      {
        "jp": "私が寝ている間に、電話がかかってきました。",
        "romaji": "Watashi ga nete iru aida ni, denwa ga kakatte kimashita.",
        "pt": "Enquanto eu dormia, o telefone tocou."
      },
      {
        "jp": "夏休みの間に、旅行に行きたいです。",
        "romaji": "Natsuyasumi no aida ni, ryokou ni ikitai desu.",
        "pt": "Quero viajar durante as férias de verão."
      }
    ]
  },
  {
    "title": "〜し",
    "explanation": "Lista razões ou fatos que contribuem para uma conclusão ou situação. 'E além disso...' ou 'Não só... como também...'.",
    "pattern": "Verbo Forma Curta / Substantivo だ / Adjetivo い / Adjetivo な + し",
    "level": "N4",
    "examples": [
      {
        "jp": "彼は頭がいいし、優しいし、人気があります。",
        "romaji": "Kare wa atama ga ii shi, yasashii shi, ninki ga arimasu.",
        "pt": "Ele é inteligente, gentil e popular."
      },
      {
        "jp": "このレストランは美味しいし、安いし、よく行きます。",
        "romaji": "Kono resutoran wa oishii shi, yasui shi, yoku ikimasu.",
        "pt": "Este restaurante é gostoso e barato, então vou lá frequentemente."
      }
    ]
  },
  {
    "title": "〜でしょう",
    "explanation": "Usado para expressar suposição ou pedir confirmação educadamente. 'Não é?' ou 'Provavelmente'.",
    "pattern": "Verbo Forma Curta / Substantivo / Adjetivo + でしょう",
    "level": "N4",
    "examples": [
      {
        "jp": "明日は晴れるでしょう。",
        "romaji": "Ashita wa hareru deshou.",
        "pt": "Provavelmente fará sol amanhã."
      },
      {
        "jp": "これは美味しいでしょう？",
        "romaji": "Kore wa oishii deshou?",
        "pt": "Isso é gostoso, não é?"
      }
    ]
  },
  {
    "title": "〜ているところだ / 〜たところだ / 〜ところだ",
    "explanation": "Indica o estágio de uma ação. 〜ているところだ (fazendo agora), 〜たところだ (acabou de fazer), 〜ところだ (prestes a fazer).",
    "pattern": "Verbo 〜ている + ところだ / Verbo た + ところだ / Verbo Dicionário + ところだ",
    "level": "N4",
    "examples": [
      {
        "jp": "今、ご飯を食べているところです。",
        "romaji": "Ima, gohan o tabete iru tokoro desu.",
        "pt": "Estou comendo agora."
      },
      {
        "jp": "ちょうど家を出たところです。",
        "romaji": "Choudo ie o deta tokoro desu.",
        "pt": "Acabei de sair de casa."
      }
    ]
  },
  {
    "title": "〜ばかり",
    "explanation": "Indica que algo acabou de acontecer ou que algo é a única coisa que está sendo feita. 'Acabei de fazer X' ou 'Só X'.",
    "pattern": "Verbo た + ばかり / Substantivo + ばかり",
    "level": "N4",
    "examples": [
      {
        "jp": "彼はさっき日本から帰ってきたばかりです。",
        "romaji": "Kare wa sakki Nihon kara kaette kita bakari desu.",
        "pt": "Ele acabou de voltar do Japão agora mesmo."
      },
      {
        "jp": "最近は忙しくて、仕事ばかりしています。",
        "romaji": "Saikin wa isogashikute, shigoto bakari shite imasu.",
        "pt": "Ultimamente estou ocupado, só tenho trabalhado."
      }
    ]
  },
  {
    "title": "〜はずだ",
    "explanation": "Expressa expectativa forte ou suposição baseada em evidências. 'Deve ser X' ou 'É para ser X'.",
    "pattern": "Verbo Forma Curta / Substantivo の / Adjetivo い / Adjetivo な + はずだ",
    "level": "N4",
    "examples": [
      {
        "jp": "彼はもうすぐ来るはずです。",
        "romaji": "Kare wa mou sugu kuru hazu desu.",
        "pt": "Ele deve chegar em breve."
      },
      {
        "jp": "この店は美味しいはずですよ。",
        "romaji": "Kono mise wa oishii hazu desu yo.",
        "pt": "Este restaurante deve ser bom."
      }
    ]
  },
  {
    "title": "〜つもりだ",
    "explanation": "Expressa intenção ou plano. 'Pretendo fazer X' ou 'Tenho a intenção de X'.",
    "pattern": "Verbo Dicionário / Verbo Forma Curta Negativa + つもりだ",
    "level": "N4",
    "examples": [
      {
        "jp": "来年、日本へ行くつもりです。",
        "romaji": "Rainen, Nihon e iku tsumori desu.",
        "pt": "No ano que vem, pretendo ir para o Japão."
      },
      {
        "jp": "たばこはもう吸わないつもりです。",
        "romaji": "Tabako wa mou suwanai tsumori desu.",
        "pt": "Não pretendo mais fumar."
      }
    ]
  },
  {
    "title": "〜なければならない",
    "explanation": "Expressa uma obrigação ou necessidade, 'precisa fazer', 'deve fazer'.",
    "pattern": "動詞ない形 + なければならない",
    "level": "N4",
    "examples": [
      {
        "jp": "日本語を勉強しなければなりません。",
        "romaji": "Nihongo o benkyō shinakereba narimasen.",
        "pt": "Preciso estudar japonês."
      },
      {
        "jp": "薬を飲まなければなりません。",
        "romaji": "Kusuri o nomanakereba narimasen.",
        "pt": "Preciso tomar o remédio."
      }
    ]
  },
  {
    "title": "〜方 (かた)",
    "explanation": "Indica o 'modo' ou 'maneira' de fazer algo. Ex.: modo de cozinhar, forma de usar.",
    "pattern": "動詞ます形 (ますを削除) + 方",
    "level": "N4",
    "examples": [
      {
        "jp": "この漢字の読み方を知っていますか。",
        "romaji": "Kono kanji no yomikata o shitte imasu ka.",
        "pt": "Você sabe a forma de ler este kanji?"
      },
      {
        "jp": "料理の作り方を教えてください。",
        "romaji": "Ryōri no tsukurikata o oshiete kudasai.",
        "pt": "Por favor, me ensine a maneira de cozinhar."
      }
    ]
  },
  {
    "title": "〜ようになる",
    "explanation": "Indica uma mudança no estado ou habilidade, 'passar a fazer', 'tornar-se capaz de fazer'.",
    "pattern": "動詞辞書形/ない形 + ようになる",
    "level": "N4",
    "examples": [
      {
        "jp": "日本語が話せるようになりました。",
        "romaji": "Nihongo ga hanaseru yō ni narimashita.",
        "pt": "Passei a conseguir falar japonês."
      },
      {
        "jp": "泳げるようになりました。",
        "romaji": "Oyogeru yō ni narimashita.",
        "pt": "Passei a conseguir nadar."
      }
    ]
  },
  {
    "title": "〜ようにする",
    "explanation": "Expressa um esforço para fazer ou não fazer algo, 'tentar fazer', 'procurar fazer'.",
    "pattern": "動詞辞書形/ない形 + ようにする",
    "level": "N4",
    "examples": [
      {
        "jp": "毎日運動するようにしています。",
        "romaji": "Mainichi undō suru yō ni shite imasu.",
        "pt": "Eu me esforço para fazer exercícios todos os dias."
      },
      {
        "jp": "遅刻しないようにしてください。",
        "romaji": "Chikoku shinai yō ni shite kudasai.",
        "pt": "Por favor, procure não se atrasar."
      }
    ]
  },
  {
    "title": "〜と言いました",
    "explanation": "Usado para relatar o que alguém disse, 'disse que'.",
    "pattern": "普通形 + と言いました",
    "level": "N4",
    "examples": [
      {
        "jp": "彼は明日来ると言いました。",
        "romaji": "Kare wa ashita kuru to iimashita.",
        "pt": "Ele disse que virá amanhã."
      },
      {
        "jp": "先生は宿題が多いと言いました。",
        "romaji": "Sensei wa shukudai ga ooi to iimashita.",
        "pt": "O professor disse que tem muita lição de casa."
      }
    ]
  },
  {
    "title": "〜間に (あいだに)",
    "explanation": "Significa 'enquanto' ou 'durante', indicando que algo acontece em um período de tempo.",
    "pattern": "動詞辞書形/ている形 + 間に / 名詞 + の間に",
    "level": "N4",
    "examples": [
      {
        "jp": "私が寝ている間に、彼は帰りました。",
        "romaji": "Watashi ga nete iru aida ni, kare wa kaerimashita.",
        "pt": "Ele voltou enquanto eu estava dormindo."
      },
      {
        "jp": "夏休みの間に旅行したいです。",
        "romaji": "Natsuyasumi no aida ni ryokō shitai desu.",
        "pt": "Quero viajar durante as férias de verão."
      }
    ]
  },
  {
    "title": "〜時 (とき)",
    "explanation": "Significa 'quando', indicando o momento em que algo acontece.",
    "pattern": "普通形 + 時",
    "level": "N4",
    "examples": [
      {
        "jp": "日本へ行った時、お寺を見ました。",
        "romaji": "Nihon e itta toki, otera o mimashita.",
        "pt": "Quando fui ao Japão, visitei templos."
      },
      {
        "jp": "眠い時、コーヒーを飲みます。",
        "romaji": "Nemui toki, kōhī o nomimasu.",
        "pt": "Quando estou com sono, bebo café."
      }
    ]
  },
  {
    "title": "〜そうです (伝聞)",
    "explanation": "Usado para relatar o que você ouviu ou leu, 'parece que', 'diz-se que'.",
    "pattern": "普通形 + そうです",
    "level": "N4",
    "examples": [
      {
        "jp": "明日、雪が降るそうです。",
        "romaji": "Ashita, yuki ga furu sō desu.",
        "pt": "Diz-se que vai nevar amanhã."
      },
      {
        "jp": "彼は来月結婚するそうです。",
        "romaji": "Kare wa raigetsu kekkon suru sō desu.",
        "pt": "Parece que ele vai se casar no próximo mês."
      }
    ]
  },
  {
    "title": "〜そうです (様態)",
    "explanation": "Indica que algo 'parece' de determinada forma com base na observação visual. Não se usa com い形容詞 e な形容詞 que descrevem aparência (e.g. きれい, いい).",
    "pattern": "動詞ます形 (ますを削除) + そうです / い形容詞 (いを削除) + そうです / な形容詞 (なを削除) + そうです",
    "level": "N4",
    "examples": [
      {
        "jp": "このケーキは美味しそうです。",
        "romaji": "Kono kēki wa oishisō desu.",
        "pt": "Este bolo parece delicioso."
      },
      {
        "jp": "雨が降りそうです。",
        "romaji": "Ame ga furisō desu.",
        "pt": "Parece que vai chover."
      }
    ]
  },
  {
    "title": "〜そう（です）",
    "explanation": "Expressa que algo 'parece' ou 'ao que tudo indica' possui certa característica ou vai acontecer, baseado em observação.",
    "pattern": "adjetivo-i (sem o い) + そう; adjetivo-na (sem o な) + そう; verbo (forma-masu, sem o masu) + そう",
    "level": "N4",
    "examples": [
      {
        "jp": "このケーキは美味しそうです。",
        "romaji": "Kono kēki wa oishisō desu.",
        "pt": "Este bolo parece delicioso."
      },
      {
        "jp": "雨が降りそうです。",
        "romaji": "Ame ga furisō desu.",
        "pt": "Parece que vai chover."
      }
    ]
  },
  {
    "title": "〜てみる",
    "explanation": "Significa 'tentar fazer algo' ou 'fazer algo para ver o que acontece', expressando uma experimentação.",
    "pattern": "verbo (forma-te) + みる",
    "level": "N4",
    "examples": [
      {
        "jp": "その本を読んでみます。",
        "romaji": "Sono hon o yonde mimasu.",
        "pt": "Vou tentar ler aquele livro."
      },
      {
        "jp": "新しいレストランに行ってみましょう。",
        "romaji": "Atarashī resutoran ni itte mimashō.",
        "pt": "Vamos tentar ir ao restaurante novo."
      }
    ]
  },
  {
    "title": "〜てしまう",
    "explanation": "Indica que uma ação foi concluída completamente (com sentimento de finalização ou arrependimento) ou aconteceu inesperadamente.",
    "pattern": "verbo (forma-te) + しまう",
    "level": "N4",
    "examples": [
      {
        "jp": "宿題を全部やってしまいました。",
        "romaji": "Shukudai o zenbu yatte shimaimashita.",
        "pt": "Terminei todo o dever de casa (completamente)."
      },
      {
        "jp": "財布をなくしてしまいました。",
        "romaji": "Saifu o nakushite shimaimashita.",
        "pt": "Acabei perdendo minha carteira (infelizmente)."
      }
    ]
  },
  {
    "title": "〜前に (まえに)",
    "explanation": "Indica que uma ação ocorre 'antes de' outra, estabelecendo uma ordem cronológica.",
    "pattern": "verbo (forma de dicionário) + 前に; substantivo + の前に",
    "level": "N4",
    "examples": [
      {
        "jp": "寝る前に歯を磨きます。",
        "romaji": "Neru mae ni ha o migakimasu.",
        "pt": "Escovo os dentes antes de dormir."
      },
      {
        "jp": "ご飯を食べる前に手を洗ってください。",
        "romaji": "Gohan o taberu mae ni te o aratte kudasai.",
        "pt": "Por favor, lave as mãos antes de comer."
      }
    ]
  },
  {
    "title": "〜た後で (たあとで)",
    "explanation": "Significa 'depois de' ou 'após', indicando que uma ação ocorre após a conclusão de outra.",
    "pattern": "verbo (forma-ta) + 後で; substantivo + の後で",
    "level": "N4",
    "examples": [
      {
        "jp": "宿題が終わった後で遊びに行きます。",
        "romaji": "Shukudai ga owatta ato de asobi ni ikimasu.",
        "pt": "Vou sair para brincar depois que terminar o dever de casa."
      },
      {
        "jp": "シャワーを浴びた後で寝ます。",
        "romaji": "Shawā o abita ato de nemasu.",
        "pt": "Vou dormir depois de tomar banho."
      }
    ]
  },
  {
    "title": "〜だろう / 〜でしょう",
    "explanation": "Expressa conjectura ou probabilidade, significando 'provavelmente', 'deve ser' ou 'eu me pergunto'. でしょう é mais formal.",
    "pattern": "verbo (forma simples) + だろう/でしょう; substantivo + だろう/でしょう; adjetivo-i + だろう/でしょう; adjetivo-na + だろう/でしょう",
    "level": "N4",
    "examples": [
      {
        "jp": "明日は雨が降るだろう。",
        "romaji": "Ashita wa ame ga furu darō.",
        "pt": "Provavelmente choverá amanhã."
      },
      {
        "jp": "彼は学生でしょう。",
        "romaji": "Kare wa gakusei deshō.",
        "pt": "Ele deve ser um estudante."
      }
    ]
  },
  {
    "title": "〜でしょう (como pergunta)",
    "explanation": "Usado para confirmar uma informação ou buscar a concordância do ouvinte, geralmente com uma entonação crescente.",
    "pattern": "verbo (forma simples) + でしょう; substantivo + でしょう; adjetivo-i + でしょう; adjetivo-na + でしょう",
    "level": "N4",
    "examples": [
      {
        "jp": "これはあなたの本でしょう？",
        "romaji": "Kore wa anata no hon deshō?",
        "pt": "Este é o seu livro, não é?"
      },
      {
        "jp": "今日は寒いでしょう？",
        "romaji": "Kyō wa samui deshō?",
        "pt": "Está frio hoje, não está?"
      }
    ]
  },
  {
    "title": "〜でしょう (como sugestão ou convite)",
    "explanation": "Usado para fazer uma sugestão ou convite de forma educada, com um tom de 'que tal fazermos X?'.",
    "pattern": "verbo (forma volitiva) + でしょう",
    "level": "N4",
    "examples": [
      {
        "jp": "一緒に映画を見に行きましょう。",
        "romaji": "Issho ni eiga o mi ni ikimashō.",
        "pt": "Vamos juntos ao cinema."
      },
      {
        "jp": "そろそろ帰りましょう。",
        "romaji": "Sorosoro kaerimashō.",
        "pt": "Vamos voltar para casa, está na hora."
      }
    ]
  },
  {
    "title": "〜かもしれない",
    "explanation": "Expressa uma possibilidade, significando 'talvez' ou 'pode ser que'.",
    "pattern": "verbo (forma simples) + かもしれない; substantivo + かもしれない; adjetivo-i + かもしれない; adjetivo-na + かもしれない",
    "level": "N4",
    "examples": [
      {
        "jp": "明日は雨が降るかもしれません。",
        "romaji": "Ashita wa ame ga furu kamo shiremasen.",
        "pt": "Talvez chova amanhã."
      },
      {
        "jp": "彼はパーティーに来ないかもしれません。",
        "romaji": "Kare wa pātī ni konai kamo shiremasen.",
        "pt": "Pode ser que ele não venha à festa."
      }
    ]
  },
  {
    "title": "〜てあげる / てくれる / てもらう",
    "explanation": "てあげる: X faz algo por Y (X a Y); てくれる: X faz algo por Y (Y agradece X); てもらう: Y recebe uma ação de X (Y recebe de X).",
    "pattern": "Xが Yに V-てあげる; Xが Yに V-てくれる; Yが Xに V-てもらう",
    "level": "N4",
    "examples": [
      {
        "jp": "私は友達に本を貸してあげました。",
        "romaji": "Watashi wa tomodachi ni hon o kashite agemashita.",
        "pt": "Eu emprestei um livro para meu amigo."
      },
      {
        "jp": "友達が私に本を貸してくれました。",
        "romaji": "Tomodachi ga watashi ni hon o kashite kuremashita.",
        "pt": "Meu amigo me emprestou um livro."
      }
    ]
  },
  {
    "title": "〜と (condicional)",
    "explanation": "Indica uma condição que, se cumprida, leva a um resultado certo ou natural, como uma regra ou fato.",
    "pattern": "verbo (forma de dicionário) + と",
    "level": "N4",
    "examples": [
      {
        "jp": "このボタンを押すと、ドアが開きます。",
        "romaji": "Kono botan o osu to, doa ga akimasu.",
        "pt": "Se você apertar este botão, a porta se abrirá."
      },
      {
        "jp": "春になると、桜が咲きます。",
        "romaji": "Haru ni naru to, sakura ga sakimasu.",
        "pt": "Quando chega a primavera, as cerejeiras florescem."
      }
    ]
  },
  {
    "title": "〜てある",
    "explanation": "Indica que uma ação foi realizada e seu resultado permanece em um estado presente. Sugere uma preparação ou propósito.",
    "pattern": "Verbo Transitivo [forma TE] + ある",
    "level": "N4",
    "examples": [
      {
        "jp": "窓が開けてあります。",
        "romaji": "Mado ga akete arimasu.",
        "pt": "A janela está aberta (por alguém, com um propósito)."
      },
      {
        "jp": "テーブルの上に本が置いてあります。",
        "romaji": "Tēburu no ue ni hon ga oite arimasu.",
        "pt": "Um livro está posto em cima da mesa."
      }
    ]
  },
  {
    "title": "〜ておく",
    "explanation": "Significa 'fazer algo com antecedência para um propósito futuro', 'deixar algo em um determinado estado' ou 'fazer algo e deixar como está'.",
    "pattern": "Verbo [forma TE] + おく",
    "level": "N4",
    "examples": [
      {
        "jp": "テストの前に復習しておきます。",
        "romaji": "Tesuto no mae ni fukushū shite okimasu.",
        "pt": "Vou revisar antes da prova."
      },
      {
        "jp": "ビールは冷蔵庫に入れておいてください。",
        "romaji": "Bīru wa reizōko ni irete oite kudasai.",
        "pt": "Por favor, coloque a cerveja na geladeira."
      }
    ]
  },
  {
    "title": "〜はず（だ）",
    "explanation": "Significa 'deve ser' ou 'é esperado que seja', expressando uma forte expectativa ou convicção baseada em alguma informação ou razão.",
    "pattern": "Verbo [forma simples] + はずだ / い-Adjetivo + はずだ / な-Adjetivo + なはずだ / Substantivo + のはずだ",
    "level": "N4",
    "examples": [
      {
        "jp": "彼はもうすぐ来るはずです。",
        "romaji": "Kare wa mō sugu kuruはずdesu.",
        "pt": "Ele deve chegar em breve."
      },
      {
        "jp": "この店は美味しいはずですよ。",
        "romaji": "Kono mise wa oishiiはずdesu yo.",
        "pt": "Este restaurante deve ser bom, sabe."
      }
    ]
  },
  {
    "title": "〜の間に / 〜間に",
    "explanation": "Significa 'enquanto' ou 'durante'. Indica que algo acontece em um período de tempo em que outra ação ou estado está ocorrendo.",
    "pattern": "Verbo [forma simples] + 間に / い-Adjetivo + 間に / な-Adjetivo + な間に / Substantivo + の間に",
    "level": "N4",
    "examples": [
      {
        "jp": "私がシャワーを浴びている間に、電話が鳴りました。",
        "romaji": "Watashi ga shawā o abite iru aida ni, denwa ga narimashita.",
        "pt": "Enquanto eu tomava banho, o telefone tocou."
      },
      {
        "jp": "夏休みの間に、旅行に行きたいです。",
        "romaji": "Natsuyasumi no aida ni, ryokō ni ikitai desu.",
        "pt": "Quero viajar durante as férias de verão."
      }
    ]
  },
  {
    "title": "〜やすい / 〜にくい (Substantivo + が)",
    "explanation": "Expressa que um substantivo específico é 'fácil/difícil de' ser afetado por um verbo.",
    "pattern": "Substantivo + が + Verbo [forma MASU sem MASU] + やすい / にくい",
    "level": "N4",
    "examples": [
      {
        "jp": "この服は汚れやすいです。",
        "romaji": "Kono fuku wa yogoreyasui desu.",
        "pt": "Esta roupa suja facilmente."
      },
      {
        "jp": "このプラスチックは壊れにくいです。",
        "romaji": "Kono purasuchikku wa kowarenikui desu.",
        "pt": "Este plástico é difícil de quebrar."
      }
    ]
  },
  {
    "title": "〜ようとする",
    "explanation": "Significa 'tentar fazer algo' ou 'estar prestes a fazer algo'. Implica um esforço ou intenção.",
    "pattern": "Verbo [forma volitiva] + とする",
    "level": "N4",
    "examples": [
      {
        "jp": "彼は一生懸命に日本語を勉強しようとしています。",
        "romaji": "Kare wa isshōkenmei ni Nihongo o benkyō shiyō to shite imasu.",
        "pt": "Ele está tentando estudar japonês com muito esforço."
      },
      {
        "jp": "電車が今、出発しようとしています。",
        "romaji": "Densha ga ima, shuppatsu shiyō to shite imasu.",
        "pt": "O trem está prestes a partir agora."
      }
    ]
  },
  {
    "title": "〜つもり（だ）",
    "explanation": "Expressa a intenção ou plano do falante. Significa 'pretendo' ou 'tenho a intenção de'.",
    "pattern": "Verbo [forma simples] + つもりだ / な-Adjetivo + なつもりだ / Substantivo + のつもりだ",
    "level": "N4",
    "examples": [
      {
        "jp": "来年、日本へ行くつもりです。",
        "romaji": "Rainen, Nihon e iku tsumori desu.",
        "pt": "Pretendo ir para o Japão no ano que vem."
      },
      {
        "jp": "私は健康のために毎日運動するつもりです。",
        "romaji": "Watashi wa kenkō no tame ni mainichi undō suru tsumori desu.",
        "pt": "Pretendo fazer exercícios todos os dias para a saúde."
      }
    ]
  },
  {
    "title": "〜予定（だ）",
    "explanation": "Expressa um plano ou agendamento definido. Significa 'está programado para' ou 'há um plano de'.",
    "pattern": "Verbo [forma simples] + 予定だ / な-Adjetivo + な予定だ / Substantivo + の予定だ",
    "level": "N4",
    "examples": [
      {
        "jp": "会議は３時に始まる予定です。",
        "romaji": "Kaigi wa san-ji ni hajimaru yotei desu.",
        "pt": "A reunião está programada para começar às 3h."
      },
      {
        "jp": "来週、旅行に行く予定です。",
        "romaji": "Raishū, ryokō ni iku yotei desu.",
        "pt": "Tenho planos de viajar na próxima semana."
      }
    ]
  },
  {
    "title": "〜ために",
    "explanation": "Expressa o propósito ou a razão de uma ação. Significa 'para' ou 'a fim de'.",
    "pattern": "Verbo [forma simples] + ために / Substantivo + のために",
    "level": "N4",
    "examples": [
      {
        "jp": "健康のために、毎日運動しています。",
        "romaji": "Kenkō no tame ni, mainichi undō shite imasu.",
        "pt": "Para a saúde, faço exercícios todos os dias."
      },
      {
        "jp": "日本語を勉強するために日本へ行きました。",
        "romaji": "Nihongo o benkyō suru tame ni Nihon e ikimashita.",
        "pt": "Fui para o Japão para estudar japonês."
      }
    ]
  },
  {
    "title": "〜のに",
    "explanation": "Expressa uma ideia de 'apesar de' ou 'embora', indicando uma contradição ou um resultado inesperado. Também pode ser usado para expressar surpresa ou queixa.",
    "pattern": "Verbo [forma simples] + のに / い-Adjetivo + のに / な-Adjetivo + なのに / Substantivo + なのに",
    "level": "N4",
    "examples": [
      {
        "jp": "雨が降っているのに、傘を持っていません。",
        "romaji": "Ame ga futte iru no ni, kasa o motte imasen.",
        "pt": "Embora esteja chovendo, não tenho guarda-chuva."
      },
      {
        "jp": "彼は勉強したのに、試験に落ちました。",
        "romaji": "Kare wa benkyō shita no ni, shiken ni ochimashita.",
        "pt": "Apesar de ter estudado, ele falhou na prova."
      }
    ]
  },
  {
    "title": "〜までに",
    "explanation": "Indica um prazo ou limite de tempo para que uma ação seja concluída. A ação deve ser feita antes desse tempo.",
    "pattern": "N + までに",
    "level": "N4",
    "examples": [
      {
        "jp": "会議は3時までに終わります。",
        "romaji": "Kaigi wa sanji made ni owarimasu.",
        "pt": "A reunião terminará até as 3 horas."
      },
      {
        "jp": "来週までにレポートを提出してください。",
        "romaji": "Raishuu made ni repōto o teishutsu shite kudasai.",
        "pt": "Por favor, entregue o relatório até a próxima semana."
      }
    ]
  },
  {
    "title": "〜そうだ (伝聞)",
    "explanation": "Indica que o falante ouviu falar de algo. É usado para reportar informações que foram obtidas de terceiros.",
    "pattern": "V (forma simples) + そうだ; いA + そうだ; なA + だそうだ; N + だそうだ",
    "level": "N4",
    "examples": [
      {
        "jp": "田中さんは来週結婚するそうだ。",
        "romaji": "Tanaka-san wa raishuu kekkon suru sou da.",
        "pt": "Ouvi dizer que o Sr. Tanaka vai se casar na próxima semana."
      },
      {
        "jp": "彼は日本語が上手だそうだ。",
        "romaji": "Kare wa Nihongo ga jouzu da sou da.",
        "pt": "Ouvi dizer que ele é bom em japonês."
      }
    ]
  },
  {
    "title": "〜そうだ (様態)",
    "explanation": "Indica que algo parece ser de uma certa maneira, com base na aparência visual ou em uma impressão imediata. Não pode ser usado para descrever sensações internas.",
    "pattern": "V (masu-stem) + そうだ; いA (remove い) + そうだ; なA (remove な) + そうだ",
    "level": "N4",
    "examples": [
      {
        "jp": "このケーキは美味しそうだね。",
        "romaji": "Kono kēki wa oishisou da ne.",
        "pt": "Este bolo parece gostoso, não é?"
      },
      {
        "jp": "今にも雨が降りそうだ。",
        "romaji": "Ima ni mo ame ga furisou da.",
        "pt": "Parece que vai chover a qualquer momento."
      }
    ]
  },
  {
    "title": "〜らしい",
    "explanation": "Expressa uma conjectura baseada em evidências, indicando que algo parece ser, ou é típico de, uma determinada coisa ou pessoa.",
    "pattern": "V (forma simples) + らしい; いA + らしい; なA + らしい; N + らしい",
    "level": "N4",
    "examples": [
      {
        "jp": "彼は日本人らしい。",
        "romaji": "Kare wa Nihonjin rashii.",
        "pt": "Ele parece ser japonês. / Ele é bem japonês."
      },
      {
        "jp": "今日は春らしい暖かい日だ。",
        "romaji": "Kyou wa haru rashii atatakai hi da.",
        "pt": "Hoje é um dia quente típico de primavera."
      }
    ]
  },
  {
    "title": "〜でしょう (conjectura)",
    "explanation": "Expressa conjectura ou suposição do falante, de forma mais polida que 'だろう'. Também pode ser usado para buscar confirmação.",
    "pattern": "V (forma simples) + でしょう; いA + でしょう; なA + でしょう; N + でしょう",
    "level": "N4",
    "examples": [
      {
        "jp": "明日は晴れるでしょう。",
        "romaji": "Ashita wa hareru deshou.",
        "pt": "Provavelmente fará sol amanhã."
      },
      {
        "jp": "これはあなたのペンでしょう？",
        "romaji": "Kore wa anata no pen deshou?",
        "pt": "Esta é sua caneta, não é?"
      }
    ]
  },
  {
    "title": "〜でしょ (coloquial)",
    "explanation": "É a forma coloquial de 'でしょう', usada para buscar confirmação de forma mais informal.",
    "pattern": "V (forma simples) + でしょ; いA + でしょ; なA + でしょ; N + でしょ",
    "level": "N4",
    "examples": [
      {
        "jp": "これ、美味しいでしょ？",
        "romaji": "Kore, oishii desho?",
        "pt": "Isso é gostoso, não é?"
      },
      {
        "jp": "明日、パーティーに行くでしょ？",
        "romaji": "Ashita, pātī ni iku desho?",
        "pt": "Você vai à festa amanhã, não vai?"
      }
    ]
  },
  {
    "title": "〜はずがない",
    "explanation": "Expressa uma forte negação, indicando que algo é impossível ou altamente improvável. 'Não tem como'.",
    "pattern": "V (forma simples) + はずがない; いA + はずがない; なA + なはずがない; N + のはずがない",
    "level": "N4",
    "examples": [
      {
        "jp": "あんなに勉強しなかったのに、合格するはずがない。",
        "romaji": "Anna ni benkyou shinakatta noni, goukaku suru hazu ga nai.",
        "pt": "Não tem como ele passar, já que não estudou tanto."
      },
      {
        "jp": "こんなに簡単な問題が解けないはずがない。",
        "romaji": "Konna ni kantan na mondai ga tokenai hazu ga nai.",
        "pt": "Não tem como não resolver um problema tão fácil assim."
      }
    ]
  },
  {
    "title": "〜ようと思う",
    "explanation": "Expressa a intenção ou a decisão de fazer algo. 'しようと思う' (decidi fazer).",
    "pattern": "V (volitional form) + と思う",
    "level": "N4",
    "examples": [
      {
        "jp": "来年、日本へ行こうと思っています。",
        "romaji": "Rainen, Nihon e ikou to omotte imasu.",
        "pt": "Estou pensando em ir para o Japão no ano que vem."
      },
      {
        "jp": "もっと日本語を勉強しようと思っています。",
        "romaji": "Motto Nihongo o benkyou shiyou to omotte imasu.",
        "pt": "Estou pensando em estudar mais japonês."
      }
    ]
  },
  {
    "title": "〜がる",
    "explanation": "Usado para descrever a emoção ou o desejo de uma terceira pessoa, quando observável por seu comportamento ou expressão. Não pode ser usado com o próprio falante.",
    "pattern": "いA (remove い) + がる; なA (remove な) + がる",
    "level": "N4",
    "examples": [
      {
        "jp": "子供がアイスクリームを食べたがっている。",
        "romaji": "Kodomo ga aisukurīmu o tabetagatte iru.",
        "pt": "A criança está querendo comer sorvete."
      },
      {
        "jp": "彼女は寒がっている。",
        "romaji": "Kanojo wa samugatte iru.",
        "pt": "Ela está sentindo frio (pelo que parece)."
      }
    ]
  },
  {
    "title": "〜のようだ / 〜のように / 〜のような",
    "explanation": "Compara uma coisa a outra, indicando semelhança. 'ようだ' é como um adjetivo-na, 'ように' é como um advérbio, 'のような' modifica um substantivo.",
    "pattern": "N + のようだ / のように / のような",
    "level": "N4",
    "examples": [
      {
        "jp": "彼の声は天使のようだ。",
        "romaji": "Kare no koe wa tenshi no you da.",
        "pt": "A voz dele é como a de um anjo."
      },
      {
        "jp": "彼は子供のように泣いた。",
        "romaji": "Kare wa kodomo no you ni naita.",
        "pt": "Ele chorou como uma criança."
      }
    ]
  },
  {
    "title": "〜だろう・でしょう",
    "explanation": "Expressa probabilidade ou conjectura sobre algo, similar a 'deve ser' ou 'provavelmente'. ですでしょう é mais formal que だろう.",
    "pattern": "verbo/i-adjetivo (forma simples) + だろう・でしょう | na-adjetivo/substantivo + だろう・でしょう",
    "level": "N4",
    "examples": [
      {
        "jp": "明日は雨が降るだろう。",
        "romaji": "Ashita wa ame ga furu darou.",
        "pt": "Provavelmente choverá amanhã."
      },
      {
        "jp": "彼はもう帰ったでしょう。",
        "romaji": "Kare wa mou kaetta deshou.",
        "pt": "Ele já deve ter voltado."
      }
    ]
  },
  {
    "title": "〜すぎる",
    "explanation": "Indica que algo é 'demais', 'excessivo' ou 'em excesso'. Pode ser negativo ou positivo dependendo do contexto.",
    "pattern": "verbo (forma masu sem masu) + すぎる | i-adjetivo (sem い) + すぎる | na-adjetivo (sem な) + すぎる",
    "level": "N4",
    "examples": [
      {
        "jp": "このケーキは甘すぎる。",
        "romaji": "Kono keeki wa amasugiru.",
        "pt": "Este bolo é doce demais."
      },
      {
        "jp": "食べすぎるとお腹が痛くなるよ。",
        "romaji": "Tabesugiru to onaka ga itaku naru yo.",
        "pt": "Se você comer demais, sua barriga vai doer."
      }
    ]
  },
  {
    "title": "〜やすい・にくい",
    "explanation": "やす(い) indica que algo é 'fácil de fazer' ou 'propenso a', enquanto にく(い) indica que é 'difícil de fazer' ou 'resistente a'.",
    "pattern": "verbo (forma masu sem masu) + やすい・にくい",
    "level": "N4",
    "examples": [
      {
        "jp": "この本はとても読みやすい。",
        "romaji": "Kono hon wa totemo yomiyasui.",
        "pt": "Este livro é muito fácil de ler."
      },
      {
        "jp": "このペンは書きにくい。",
        "romaji": "Kono pen wa kakinikui.",
        "pt": "Esta caneta é difícil de escrever."
      }
    ]
  },
  {
    "title": "〜たばかり",
    "explanation": "Indica que uma ação acabou de acontecer, há pouco tempo. 'Acabou de fazer'.",
    "pattern": "verbo (forma ta) + ばかり",
    "level": "N4",
    "examples": [
      {
        "jp": "日本に来たばかりです。",
        "romaji": "Nihon ni kita bakari desu.",
        "pt": "Acabei de chegar no Japão."
      },
      {
        "jp": "彼は今、ご飯を食べたばかりだ。",
        "romaji": "Kare wa ima, gohan wo tabeta bakari da.",
        "pt": "Ele acabou de comer agora."
      }
    ]
  },
  {
    "title": "〜みたいだ",
    "explanation": "Indica similaridade ou aparência. 'Parece que', 'é como se', 'tipo'. Pode ser usado para comparações ou para expressar incerteza.",
    "pattern": "verbo/i-adjetivo (forma simples) + みたいだ | na-adjetivo (sem な) + みたいだ | substantivo + みたいだ",
    "level": "N4",
    "examples": [
      {
        "jp": "この猫は犬みたいだ。",
        "romaji": "Kono neko wa inu mitai da.",
        "pt": "Este gato parece um cachorro."
      },
      {
        "jp": "雨が降るみたいだね。",
        "romaji": "Ame ga furu mitai da ne.",
        "pt": "Parece que vai chover, não é?"
      }
    ]
  },
  {
    "title": "〜んです・のです",
    "explanation": "Usado para explicar, dar uma razão ou para buscar uma explicação. Adiciona ênfase e um tom de investigação ou justificação.",
    "pattern": "verbo/i-adjetivo (forma simples) + んです・のです | na-adjetivo (sem な) + なんです・なのです | substantivo + なんです・なのです",
    "level": "N4",
    "examples": [
      {
        "jp": "どうして遅れたんですか。",
        "romaji": "Dōshite okureta n desu ka.",
        "pt": "Por que você se atrasou?"
      },
      {
        "jp": "お腹が痛いんです。",
        "romaji": "Onaka ga itai n desu.",
        "pt": "É que minha barriga dói."
      }
    ]
  },
  {
    "title": "〜予定だ",
    "explanation": "Indica um plano ou programação, algo que está 'previsto' ou 'agendado'. Mais formal que つもりだ.",
    "pattern": "verbo (forma simples) + 予定だ | substantivo + の予定だ",
    "level": "N4",
    "examples": [
      {
        "jp": "来週、旅行に行く予定です。",
        "romaji": "Raishū, ryokō ni iku yotei desu.",
        "pt": "Tenho planos de viajar na próxima semana."
      },
      {
        "jp": "会議は3時に始まる予定だ。",
        "romaji": "Kaigi wa san-ji ni hajimaru yotei da.",
        "pt": "A reunião está programada para começar às 3 horas."
      }
    ]
  },
  {
    "title": "〜ことにする",
    "explanation": "Indica uma decisão que a pessoa tomou para si mesma. 'Decidi fazer'.",
    "pattern": "verbo (forma simples) + ことにする",
    "level": "N4",
    "examples": [
      {
        "jp": "毎日、日本語を勉強することにした。",
        "romaji": "Mainichi, Nihongo wo benkyō suru koto ni shita.",
        "pt": "Decidi estudar japonês todos os dias."
      },
      {
        "jp": "来年から禁煙することにする。",
        "romaji": "Rainen kara kin'en suru koto ni suru.",
        "pt": "Decidi parar de fumar a partir do próximo ano."
      }
    ]
  },
  {
    "title": "〜ことになる",
    "explanation": "Indica que algo foi decidido por outros ou por circunstâncias, não pela própria vontade. 'Ficou decidido que', 'acabou por ser'.",
    "pattern": "verbo (forma simples) + ことになる",
    "level": "N4",
    "examples": [
      {
        "jp": "来月、大阪へ転勤することになりました。",
        "romaji": "Raigetsu, Ōsaka e tenkin suru koto ni narimashita.",
        "pt": "Ficou decidido que serei transferido para Osaka no próximo mês."
      },
      {
        "jp": "来週の会議は中止になることになった。",
        "romaji": "Raishū no kaigi wa chūshi ni naru koto ni natta.",
        "pt": "A reunião da próxima semana acabou sendo cancelada."
      }
    ]
  },
  {
    "title": "〜ように・〜になる",
    "explanation": "Indica uma mudança de estado ou habilidade. 〜ようになる significa 'se tornar capaz de fazer', 〜になる significa 'se tornar (adjetivo/substantivo)'.",
    "pattern": "verbo (forma potencial) + ように・〜になる | substantivo + になる | adjetivo + になる",
    "level": "N4",
    "examples": [
      {
        "jp": "日本語が話せるようになりました。",
        "romaji": "Nihongo ga hanaseru yō ni narimashita.",
        "pt": "Passei a ser capaz de falar japonês."
      },
      {
        "jp": "だんだん寒くなってきた。",
        "romaji": "Dandan samuku natte kita.",
        "pt": "Está ficando cada vez mais frio."
      }
    ]
  },
  {
    "title": "〜ようだ / 〜みたいだ",
    "explanation": "Significa 'parece que', 'como se', 'tal como'. Indica uma semelhança ou uma suposição baseada em observação.",
    "pattern": "Verbo/Adjetivo (Plain form) + ようだ / みたいだ; Substantivo + の + ようだ / みたいだ",
    "level": "N3",
    "examples": [
      {
        "jp": "彼は日本人ではないようだ。",
        "romaji": "Kare wa nihonjin de wa nai yō da.",
        "pt": "Ele parece não ser japonês."
      },
      {
        "jp": "雪が降るみたいだ。",
        "romaji": "Yuki ga furu mitai da.",
        "pt": "Parece que vai nevar."
      }
    ]
  },
  {
    "title": "〜ことになっている",
    "explanation": "Indica uma regra, um costume, um plano fixo ou uma decisão tomada por outros ou por um grupo. Significa 'está decidido que'.",
    "pattern": "Verbo Plain form + ことになっている",
    "level": "N3",
    "examples": [
      {
        "jp": "会議は3時に始まることになっている。",
        "romaji": "Kaigi wa sanji ni hajimaru koto ni natte iru.",
        "pt": "A reunião está marcada para começar às 3h."
      },
      {
        "jp": "日本では左側通行することになっている。",
        "romaji": "Nihon de wa hidarigawa tsūkō suru koto ni natte iru.",
        "pt": "No Japão, é regra dirigir pela esquerda."
      }
    ]
  },
  {
    "title": "〜あいだに",
    "explanation": "Significa 'enquanto', 'durante o período em que'. Uma ação ocorre dentro de um período em que outra coisa está acontecendo.",
    "pattern": "Verbo/Adjetivo (Plain form) + あいだに; Substantivo + の + あいだに",
    "level": "N3",
    "examples": [
      {
        "jp": "母がいないあいだに、部屋を掃除しました。",
        "romaji": "Haha ga inai aida ni, heya wo sōji shimashita.",
        "pt": "Limpei o quarto enquanto minha mãe não estava."
      },
      {
        "jp": "夏休みのあいだに、旅行に行きます。",
        "romaji": "Natsuyasumi no aida ni, ryokō ni ikimasu.",
        "pt": "Viajarei durante as férias de verão."
      }
    ]
  },
  {
    "title": "〜てからでないと / 〜てからでなければ",
    "explanation": "Significa 'a não ser que (faça X), não (pode fazer Y)'. Indica uma condição necessária para a ação posterior.",
    "pattern": "Verbo Te-form + からでないと / からでなければ",
    "level": "N3",
    "examples": [
      {
        "jp": "許可をもらってからでないと、入れません。",
        "romaji": "Kyoka wo moratte kara de nai to, hairimasen.",
        "pt": "A menos que você receba permissão, não pode entrar."
      },
      {
        "jp": "日本語を勉強してからでなければ、日本で働くことは難しい。",
        "romaji": "Nihongo wo benkyō shite kara de nakereba, Nihon de hataraku koto wa muzukashii.",
        "pt": "A menos que você estude japonês, é difícil trabalhar no Japão."
      }
    ]
  },
  {
    "title": "〜ところだ",
    "explanation": "Indica o momento exato em que uma ação ocorre: 'acabar de fazer', 'estar prestes a fazer' ou 'estar fazendo no momento'.",
    "pattern": "Verbo (Plain form) + ところだ",
    "level": "N3",
    "examples": [
      {
        "jp": "今、食べる (たべる) ところです。",
        "romaji": "Ima, taberu tokoro desu.",
        "pt": "Estou prestes a comer agora."
      },
      {
        "jp": "今、食べている (たべている) ところです。",
        "romaji": "Ima, tabete iru tokoro desu.",
        "pt": "Estou comendo agora (no meio da ação)."
      }
    ]
  },
  {
    "title": "〜ばかりに",
    "explanation": "Significa 'apenas porque', 'justamente porque'. Indica que uma causa levou a um resultado negativo inesperado ou indesejado.",
    "pattern": "Verbo/Adjetivo (Plain form) + ばかりに; Substantivo + である + ばかりに",
    "level": "N3",
    "examples": [
      {
        "jp": "少し遅れたばかりに、電車に乗り遅れてしまった。",
        "romaji": "Sukoshi okureta bakari ni, densha ni noriokurete shimatta.",
        "pt": "Apenas porque me atrasei um pouco, perdi o trem."
      },
      {
        "jp": "お金がないばかりに、旅行に行けなかった。",
        "romaji": "Okane ga nai bakari ni, ryokō ni ikenakatta.",
        "pt": "Apenas porque não tinha dinheiro, não pude viajar."
      }
    ]
  },
  {
    "title": "〜ものだから / 〜もので",
    "explanation": "Usado para dar uma razão ou desculpa de forma mais informal e com um tom um pouco mais suave do que 'から' ou 'ので'.",
    "pattern": "Verbo/Adjetivo (Plain form) + ものだから / もので; Substantivo + な + ものだから / もので",
    "level": "N3",
    "examples": [
      {
        "jp": "頭が痛かったものだから、学校を休みました。",
        "romaji": "Atama ga itakatta mono dakara, gakkō wo yasumimashita.",
        "pt": "Como eu estava com dor de cabeça, faltei à escola."
      },
      {
        "jp": "子供なので、知らないものですから。",
        "romaji": "Kodomo nano de, shiranai mono desu kara.",
        "pt": "Como sou criança, não sei."
      }
    ]
  },
  {
    "title": "〜始める",
    "explanation": "Indica o início de uma ação ou estado. (Verbo auxiliar)",
    "pattern": "動詞のます形 + 始める",
    "level": "N3",
    "examples": [
      {
        "jp": "雨が降り始めた。",
        "romaji": "Ame ga furi hajimeta.",
        "pt": "Começou a chover."
      },
      {
        "jp": "彼女は話し始めた。",
        "romaji": "Kanojo wa hanashi hajimeta.",
        "pt": "Ela começou a falar."
      }
    ]
  },
  {
    "title": "〜終わる",
    "explanation": "Indica o fim de uma ação. (Verbo auxiliar)",
    "pattern": "動詞のます形 + 終わる",
    "level": "N3",
    "examples": [
      {
        "jp": "本を読み終わった。",
        "romaji": "Hon o yomi owatta.",
        "pt": "Terminei de ler o livro."
      },
      {
        "jp": "宿題がやり終わった。",
        "romaji": "Shukudai ga yari owatta.",
        "pt": "Terminei de fazer o dever de casa."
      }
    ]
  },
  {
    "title": "〜続ける",
    "explanation": "Indica a continuidade de uma ação ou estado. (Verbo auxiliar)",
    "pattern": "動詞のます形 + 続ける",
    "level": "N3",
    "examples": [
      {
        "jp": "彼は日本語を勉強し続けている。",
        "romaji": "Kare wa Nihongo o benkyou shi tsuzukete iru.",
        "pt": "Ele continua estudando japonês."
      },
      {
        "jp": "雨が降り続いている。",
        "romaji": "Ame ga furi tsuzukete iru.",
        "pt": "A chuva continua caindo."
      }
    ]
  },
  {
    "title": "〜ていく",
    "explanation": "Indica uma ação que se afasta do falante, uma mudança gradual ou a continuidade de uma ação para o futuro.",
    "pattern": "動詞のて形 + いく",
    "level": "N3",
    "examples": [
      {
        "jp": "これから寒くなっていくでしょう。",
        "romaji": "Kore kara samuku natte iku deshou.",
        "pt": "A partir de agora, provavelmente ficará mais frio."
      },
      {
        "jp": "私たちはこの問題を解決していかなければならない。",
        "romaji": "Watashitachi wa kono mondai o kaiketsu shite ikanakereba naranai.",
        "pt": "Temos que ir resolvendo este problema."
      }
    ]
  },
  {
    "title": "〜てくる",
    "explanation": "Indica uma ação que se aproxima do falante, uma mudança gradual que ocorre até o presente ou a continuidade de uma ação desde o passado até o presente.",
    "pattern": "動詞のて形 + くる",
    "level": "N3",
    "examples": [
      {
        "jp": "だんだん暖かくなってきた。",
        "romaji": "Dandan atatakaku natte kita.",
        "pt": "Pouco a pouco, foi ficando mais quente."
      },
      {
        "jp": "日本に来てから、ずっと日本語を勉強してきた。",
        "romaji": "Nihon ni kite kara, zutto Nihongo o benkyou shite kita.",
        "pt": "Desde que vim para o Japão, tenho estudado japonês o tempo todo."
      }
    ]
  },
  {
    "title": "〜うちに",
    "explanation": "Significa 'enquanto' ou 'antes que', indicando que algo deve ser feito enquanto uma condição específica ainda existe, ou que algo inesperado acontece durante um período.",
    "pattern": "名詞 + のうちに / 動詞の辞書形/て形 + いる + うちに / い形容詞 + うちに",
    "level": "N3",
    "examples": [
      {
        "jp": "明るいうちに家に帰りましょう。",
        "romaji": "Akarui uchi ni ie ni kaerimashou.",
        "pt": "Vamos para casa enquanto ainda está claro."
      },
      {
        "jp": "若いうちにいろいろな経験をしておいたほうがいい。",
        "romaji": "Wakai uchi ni iroirona keiken o shite oita hou ga ii.",
        "pt": "É melhor ter várias experiências enquanto se é jovem."
      }
    ]
  },
  {
    "title": "〜ところ",
    "explanation": "Indica o momento exato em que uma ação está prestes a começar (辞書形), está em andamento (ている形) ou acabou de terminar (た形).",
    "pattern": "動詞の辞書形/て形 + いる/た形 + ところ",
    "level": "N3",
    "examples": [
      {
        "jp": "これから出かけるところです。",
        "romaji": "Kore kara dekakeru tokoro desu.",
        "pt": "Estou prestes a sair agora."
      },
      {
        "jp": "ちょうどご飯を食べているところだ。",
        "romaji": "Choudo gohan o tabete iru tokoro da.",
        "pt": "Estou exatamente no meio de comer."
      }
    ]
  },
  {
    "title": "〜にとって",
    "explanation": "Indica o ponto de vista ou a perspectiva de alguém/algo. Significa 'para' ou 'em relação a'.",
    "pattern": "Substantivo + にとって",
    "level": "N3",
    "examples": [
      {
        "jp": "私にとって、日本語の勉強はとても楽しいです。",
        "romaji": "Watashi ni totte, Nihongo no benkyō wa totemo tanoshī desu.",
        "pt": "Para mim, estudar japonês é muito divertido."
      },
      {
        "jp": "この仕事は彼にとって、とても大切です。",
        "romaji": "Kono shigoto wa kare ni totte, totemo taisetsu desu.",
        "pt": "Este trabalho é muito importante para ele."
      }
    ]
  },
  {
    "title": "〜に比べて",
    "explanation": "Usado para fazer uma comparação, indicando 'em comparação com'.",
    "pattern": "Substantivo + に比べて",
    "level": "N3",
    "examples": [
      {
        "jp": "去年に比べて、今年は暑いです。",
        "romaji": "Kyonen ni kurabete, kotoshi wa atsui desu.",
        "pt": "Em comparação com o ano passado, este ano está quente."
      },
      {
        "jp": "東京は大阪に比べて、人が多い。",
        "romaji": "Tōkyō wa Ōsaka ni kurabete, hito ga ooi.",
        "pt": "Tóquio tem mais pessoas em comparação com Osaka."
      }
    ]
  },
  {
    "title": "〜として",
    "explanation": "Indica a função, papel ou posição de alguém/algo. Significa 'como' ou 'na qualidade de'.",
    "pattern": "Substantivo + として",
    "level": "N3",
    "examples": [
      {
        "jp": "私は教師として働いています。",
        "romaji": "Watashi wa kyōshi to shite hataraite imasu.",
        "pt": "Eu trabalho como professor."
      },
      {
        "jp": "この本は参考書として使えます。",
        "romaji": "Kono hon wa sankōsho to shite tsukaemasu.",
        "pt": "Este livro pode ser usado como livro de referência."
      }
    ]
  },
  {
    "title": "〜だけでなく〜も",
    "explanation": "Significa 'não só... mas também...', indicando que algo se aplica a mais de uma coisa.",
    "pattern": "Sentença/Forma simples + だけでなく + Sentença/Forma simples + も",
    "level": "N3",
    "examples": [
      {
        "jp": "彼女は歌が上手なだけでなく、ダンスも得意だ。",
        "romaji": "Kanojo wa uta ga jōzu na dake de naku, dansu mo tokui da.",
        "pt": "Ela não só canta bem, mas também é boa em dança."
      },
      {
        "jp": "このレストランは料理がおいしいだけでなく、サービスも素晴らしい。",
        "romaji": "Kono resutoran wa ryōri ga oishii dake de naku, sābisu mo subarashii.",
        "pt": "Este restaurante não só tem comida deliciosa, mas o serviço também é ótimo."
      }
    ]
  },
  {
    "title": "〜わけだ",
    "explanation": "Usado para explicar a razão lógica ou a consequência óbvia de algo. Significa 'é por isso que', 'significa que'.",
    "pattern": "Forma simples + わけだ",
    "level": "N3",
    "examples": [
      {
        "jp": "彼は病気なので、来られないわけだ。",
        "romaji": "Kare wa byōki nanode, korarenai wake da.",
        "pt": "Ele está doente, é por isso que não pode vir."
      },
      {
        "jp": "毎日練習したから、上手になったわけだ。",
        "romaji": "Mainichi renshū shita kara, jōzu ni natta wake da.",
        "pt": "Eu pratiquei todos os dias, por isso fiquei bom."
      }
    ]
  },
  {
    "title": "〜わけがない",
    "explanation": "Expressa forte negação ou descrença, indicando que algo é impossível ou inconcebível. Significa 'não há como', 'é impossível que'.",
    "pattern": "Forma simples + わけがない",
    "level": "N3",
    "examples": [
      {
        "jp": "そんなに難しい問題、彼に解けるわけがない。",
        "romaji": "Sonna ni muzukashii mondai, kare ni tokeru wake ga nai.",
        "pt": "Um problema tão difícil, não há como ele resolvê-lo."
      },
      {
        "jp": "今日中にこの仕事を終わらせるわけがない。",
        "romaji": "Kyō-jū ni kono shigoto wo owaraseru wake ga nai.",
        "pt": "Não há como terminar este trabalho até o fim do dia."
      }
    ]
  },
  {
    "title": "〜というより",
    "explanation": "Usado para corrigir ou refinar uma afirmação, indicando que a segunda opção é mais precisa. Significa 'mais do que', 'em vez de dizer que'.",
    "pattern": "Forma simples + というより",
    "level": "N3",
    "examples": [
      {
        "jp": "彼は優しいというより、おとなしい人だ。",
        "romaji": "Kare wa yasashii to iu yori, otonashii hito da.",
        "pt": "Ele é mais uma pessoa calma do que gentil."
      },
      {
        "jp": "これは趣味というより、ライフワークだ。",
        "romaji": "Kore wa shumi to iu yori, raifu wāku da.",
        "pt": "Isso é mais um trabalho de vida do que um hobby."
      }
    ]
  },
  {
    "title": "〜ということだ",
    "explanation": "Usado para resumir ou parafrasear uma informação, ou para expressar uma conclusão. Significa 'significa que', 'entendi que'.",
    "pattern": "Forma simples + ということだ",
    "level": "N3",
    "examples": [
      {
        "jp": "明日は雨が降るということだ。",
        "romaji": "Ashita wa ame ga furu to iu koto da.",
        "pt": "Significa que amanhã vai chover."
      },
      {
        "jp": "彼女は結婚したということだ。",
        "romaji": "Kanojo wa kekkon shita to iu koto da.",
        "pt": "Entendi que ela se casou."
      }
    ]
  },
  {
    "title": "〜によると／〜では",
    "explanation": "Usado para citar a fonte de uma informação, significando 'de acordo com' ou 'segundo'.",
    "pattern": "Substantivo + によると / Substantivo + では",
    "level": "N3",
    "examples": [
      {
        "jp": "天気予報によると、明日は晴れるそうです。",
        "romaji": "Tenki yohō ni yoru to, ashita wa hareru sō desu.",
        "pt": "De acordo com a previsão do tempo, parece que amanhã estará ensolarado."
      },
      {
        "jp": "ニュースでは、地震があったと言っていた。",
        "romaji": "Nyūsu de wa, jishin ga atta to itte ita.",
        "pt": "No noticiário, disseram que houve um terremoto."
      }
    ]
  },
  {
    "title": "〜さえ〜ば",
    "explanation": "Expressa uma condição mínima necessária para que algo aconteça, significando 'se apenas... então...'.",
    "pattern": "Substantivo + さえ + 動詞ば形 / い形容詞 + ければ / な形容詞 + ならば / 動詞 (ます形) + さえすれば",
    "level": "N3",
    "examples": [
      {
        "jp": "お金さえあれば、何でも買える。",
        "romaji": "Okane sae areba, nan demo kaeru.",
        "pt": "Se eu tiver dinheiro, posso comprar qualquer coisa."
      },
      {
        "jp": "あなたがそばにいてくれさえすれば、私は幸せです。",
        "romaji": "Anata ga soba ni ite kure sae sureba, watashi wa shiawase desu.",
        "pt": "Se você apenas ficar ao meu lado, eu serei feliz."
      }
    ]
  },
  {
    "title": "〜というのは",
    "explanation": "Usado para definir ou explicar um termo ou conceito. Significa 'o que X significa é'.",
    "pattern": "Substantivo/Frase + というのは",
    "level": "N3",
    "examples": [
      {
        "jp": "「愛」というのは、人に尽くすことだ。",
        "romaji": "'Ai' to iu no wa, hito ni tsukusu koto da.",
        "pt": "O que 'amor' significa é dedicar-se aos outros."
      },
      {
        "jp": "JLPTというのは、日本語能力試験のことです。",
        "romaji": "JLPT to iu no wa, Nihongo Nōryoku Shiken no koto desu.",
        "pt": "O que JLPT significa é o Teste de Proficiência na Língua Japonesa."
      }
    ]
  },
  {
    "title": "〜たびに",
    "explanation": "Indica que algo acontece sempre que outra coisa ocorre. Significa 'toda vez que'.",
    "pattern": "Verbo (辞書形) + たびに / Substantivo + のたびに",
    "level": "N3",
    "examples": [
      {
        "jp": "この曲を聞くたびに、学生時代を思い出す。",
        "romaji": "Kono kyoku wo kiku tabi ni, gakusei jidai wo omoidasu.",
        "pt": "Toda vez que ouço esta música, me lembro dos meus tempos de estudante."
      },
      {
        "jp": "彼は出張のたびに、お土産を買ってきてくれる。",
        "romaji": "Kare wa shutchō no tabi ni, omiyage wo katte kite kureru.",
        "pt": "Toda vez que ele viaja a trabalho, ele me traz um souvenir."
      }
    ]
  },
  {
    "title": "〜ば〜ほど",
    "explanation": "Indica que quanto mais uma coisa acontece, mais a outra também ocorre. Significa 'quanto mais... mais...'.",
    "pattern": "動詞ば形 + 動詞辞書形 + ほど / い形容詞 + ければ + い形容詞 + ほど / な形容詞 + ならば + な形容詞 + なほど",
    "level": "N3",
    "examples": [
      {
        "jp": "勉強すればするほど、日本語が上手になる。",
        "romaji": "Benkyō sureba suru hodo, Nihongo ga jōzu ni naru.",
        "pt": "Quanto mais você estuda, melhor você fica em japonês."
      },
      {
        "jp": "多ければ多いほど、いい。",
        "romaji": "Ookereba ooi hodo, ii.",
        "pt": "Quanto mais, melhor."
      }
    ]
  },
  {
    "title": "〜ほど",
    "explanation": "Usado para expressar um grau ou extensão, significando 'tanto quanto', 'ao ponto de'. Também pode ser usado em comparações para expressar 'quanto mais...'.",
    "pattern": "動詞辞書形 + ほど / い形容詞 + ほど / な形容詞 + な + ほど / Substantivo + ほど",
    "level": "N3",
    "examples": [
      {
        "jp": "泣きたいほど悲しい。",
        "romaji": "Nakitai hodo kanashii.",
        "pt": "Estou tão triste que quero chorar."
      },
      {
        "jp": "こんなに美味しい料理は他にないほどだ。",
        "romaji": "Konna ni oishii ryōri wa hoka ni nai hodo da.",
        "pt": "Esta comida é tão deliciosa que não há outra igual."
      }
    ]
  },
  {
    "title": "〜まま",
    "explanation": "Indica que uma ação ou estado permanece inalterado. Significa 'como está', 'sem mudar'.",
    "pattern": "動詞 (た形) + まま / 動詞 (ない形) + まま / い形容詞 + まま / な形容詞 + な + まま / Substantivo + の + まま",
    "level": "N3",
    "examples": [
      {
        "jp": "靴を履いたまま家に入った。",
        "romaji": "Kutsu wo haita mama ie ni haitta.",
        "pt": "Entre na casa com os sapatos calçados."
      },
      {
        "jp": "電気がついたまま寝てしまった。",
        "romaji": "Denki ga tsuita mama nete shimatta.",
        "pt": "Acabei dormindo com as luzes acesas."
      }
    ]
  },
  {
    "title": "〜ことになった",
    "explanation": "Indica que uma decisão ou um plano foi estabelecido por terceiros ou por uma situação. Significa 'ficou decidido que', 'foi determinado que'.",
    "pattern": "動詞辞書形 + ことになった / 動詞ない形 + ことになった",
    "level": "N3",
    "examples": [
      {
        "jp": "来月から大阪に転勤することになった。",
        "romaji": "Raigetsu kara Ōsaka ni tenkin suru koto ni natta.",
        "pt": "Ficou decidido que eu serei transferido para Osaka a partir do próximo mês."
      },
      {
        "jp": "会議は来週に延期することになった。",
        "romaji": "Kaigi wa raishū ni enki suru koto ni natta.",
        "pt": "Ficou decidido que a reunião será adiada para a próxima semana."
      }
    ]
  },
  {
    "title": "〜ままにする",
    "explanation": "Significa 'deixar como está' ou 'manter no mesmo estado'.",
    "pattern": "動詞 (た形) + ままにする / 動詞 (ない形) + ままにする / い形容詞 + ままにする / な形容詞 + な + ままにする / Substantivo + の + ままにする",
    "level": "N3",
    "examples": [
      {
        "jp": "この部屋は汚れたままにしておいてください。",
        "romaji": "Kono heya wa yogoreta mama ni shite oite kudasai.",
        "pt": "Por favor, deixe este quarto sujo como está."
      },
      {
        "jp": "ドアは開けたままにしておいた。",
        "romaji": "Doa wa aketa mama ni shite oita.",
        "pt": "Deixei a porta aberta."
      }
    ]
  },
  {
    "title": "〜によって／により",
    "explanation": "Indica o agente (por meio de), o método (através de), a causa (devido a) ou a variação (dependendo de).",
    "pattern": "Substantivo + によって／により",
    "level": "N3",
    "examples": [
      {
        "jp": "この本は多くの人によって読まれています。",
        "romaji": "Kono hon wa ōku no hito ni yotte yomarete imasu.",
        "pt": "Este livro é lido por muitas pessoas."
      },
      {
        "jp": "国によって習慣が異なります。",
        "romaji": "Kuni ni yotte shūkan ga kotonarimasu.",
        "pt": "Os costumes diferem de país para país."
      }
    ]
  },
  {
    "title": "〜はずがない／わけがない",
    "explanation": "Expressa uma forte negação ou descrença, significando 'não há como', 'é impossível' ou 'não é provável'.",
    "pattern": "Verbo (forma simples) + はずがない／わけがない\nAdjetivo い + はずがない／わけがない\nAdjetivo な (omitindo な) + なはずがない／なわけがない\nSubstantivo + のはずがない／なわけがない",
    "level": "N3",
    "examples": [
      {
        "jp": "こんな簡単な問題ができるはずがない。",
        "romaji": "Konna kantan na mondai ga dekiru hazu ga nai.",
        "pt": "Não há como você não conseguir fazer um problema tão fácil."
      },
      {
        "jp": "彼は嘘をつくわけがない。",
        "romaji": "Kare wa uso o tsuku wake ga nai.",
        "pt": "Não há como ele mentir."
      }
    ]
  },
  {
    "title": "〜わけにはいかない",
    "explanation": "Indica que, por alguma razão (moral, social, etc.), não se pode fazer algo, significando 'não posso fazer (algo)' ou 'não devo fazer (algo)'.",
    "pattern": "Verbo (forma dit.) + わけにはいかない",
    "level": "N3",
    "examples": [
      {
        "jp": "試験があるので、休むわけにはいかない。",
        "romaji": "Shiken ga aru node, yasumu wake ni wa ikanai.",
        "pt": "Tenho uma prova, então não posso faltar."
      },
      {
        "jp": "彼女の秘密を話すわけにはいかない。",
        "romaji": "Kanojo no himitsu o hanasu wake ni wa ikanai.",
        "pt": "Não posso contar o segredo dela."
      }
    ]
  },
  {
    "title": "〜ないわけにはいかない",
    "explanation": "Indica que, por alguma razão, é preciso fazer algo, significando 'não posso deixar de fazer (algo)' ou 'é preciso fazer (algo)'.",
    "pattern": "Verbo (forma nai) + わけにはいかない",
    "level": "N3",
    "examples": [
      {
        "jp": "親として、子供を守らないわけにはいかない。",
        "romaji": "Oya to shite, kodomo o mamoranai wake ni wa ikanai.",
        "pt": "Como pai, não posso deixar de proteger meus filhos."
      },
      {
        "jp": "部長に頼まれたら、手伝わないわけにはいかない。",
        "romaji": "Buchō ni tanomaretara, tetsudawanai wake ni wa ikanai.",
        "pt": "Se o chefe me pedir, não posso deixar de ajudar."
      }
    ]
  },
  {
    "title": "〜ことだ",
    "explanation": "Usado para dar conselhos ou sugestões, significando 'o melhor é fazer (algo)' ou 'deve-se fazer (algo)'.",
    "pattern": "Verbo (forma dit.) + ことだ",
    "level": "N3",
    "examples": [
      {
        "jp": "健康のためには、毎日運動することだ。",
        "romaji": "Kenkō no tame ni wa, mainichi undō suru koto da.",
        "pt": "Para a saúde, o melhor é se exercitar todos os dias."
      },
      {
        "jp": "日本語を上達させるには、たくさん話すことだ。",
        "romaji": "Nihongo o jōtatsu saseru ni wa, takusan hanasu koto da.",
        "pt": "Para melhorar o japonês, o melhor é falar muito."
      }
    ]
  },
  {
    "title": "〜ことがある／こともある",
    "explanation": "Indica que algo acontece ocasionalmente ou é uma possibilidade, significando 'às vezes (acontece)' ou 'pode acontecer'.",
    "pattern": "Verbo (forma dit.) + ことがある／こともある",
    "level": "N3",
    "examples": [
      {
        "jp": "休日は一人で映画を見に行くことがある。",
        "romaji": "Kyūjitsu wa hitori de eiga o mi ni iku koto ga aru.",
        "pt": "Nos feriados, às vezes vou sozinho ao cinema."
      },
      {
        "jp": "風邪を引いて、熱が出ることもある。",
        "romaji": "Kaze o hiite, netsu ga deru koto mo aru.",
        "pt": "Às vezes, quando pego um resfriado, também tenho febre."
      }
    ]
  },
  {
    "title": "〜ようだ／みたいだ",
    "explanation": "Expressa uma suposição baseada em evidências ou uma comparação, significando 'parece que', 'aparentemente' ou 'como se'.",
    "pattern": "Verbo (forma dit.) + ようだ／みたいだ\nAdjetivo い + ようだ／みたいだ\nAdjetivo な + なようだ／みたいだ\nSubstantivo + のようだ／みたいだ",
    "level": "N3",
    "examples": [
      {
        "jp": "彼は疲れているようだ。",
        "romaji": "Kare wa tsukarete iru yō da.",
        "pt": "Ele parece estar cansado."
      },
      {
        "jp": "あの人は子供みたいにわがままだ。",
        "romaji": "Ano hito wa kodomo mitai ni wagamama da.",
        "pt": "Aquela pessoa é egoísta como uma criança."
      }
    ]
  },
  {
    "title": "〜ようだ／みたいだ (como substantivo)",
    "explanation": "Modifica um substantivo, indicando semelhança ou exemplo, significando 'como (um) ...', 'parecido com (um) ...' ou 'tipo de...'.",
    "pattern": "Verbo (forma dit.) + ような／みたい な + Substantivo\nAdjetivo い + ような／みたい な + Substantivo\nAdjetivo な + なような／みたいな + Substantivo\nSubstantivo + のような／みたいな + Substantivo",
    "level": "N3",
    "examples": [
      {
        "jp": "彼は太陽のような明るい人です。",
        "romaji": "Kare wa taiyō no yō na akarui hito desu.",
        "pt": "Ele é uma pessoa brilhante como o sol."
      },
      {
        "jp": "これは夢みたいな話だ。",
        "romaji": "Kore wa yume mitai na hanashi da.",
        "pt": "Esta é uma história como um sonho."
      }
    ]
  },
  {
    "title": "〜らしい (como advérbio)",
    "explanation": "Indica que algo é feito ou se comporta de uma maneira que é típica ou característica de algo, significando 'de forma característica', 'tipicamente'.",
    "pattern": "Substantivo + らしく + Verbo/Adjetivo",
    "level": "N3",
    "examples": [
      {
        "jp": "彼は男らしく振る舞った。",
        "romaji": "Kare wa otoko rashiku furumatta.",
        "pt": "Ele se comportou como um homem."
      },
      {
        "jp": "自分らしく生きるのが一番だ。",
        "romaji": "Jibun rashiku ikiru no ga ichiban da.",
        "pt": "Viver de forma autêntica é o melhor."
      }
    ]
  },
  {
    "title": "〜ばかりでなく",
    "explanation": "Significa 'não só... mas também', indicando que algo não é apenas de uma maneira, mas também de outra.",
    "pattern": "Verbo (forma dit.) + ばかりでなく\nAdjetivo い + ばかりでなく\nAdjetivo な + なばかりでなく\nSubstantivo + ばかりでなく",
    "level": "N3",
    "examples": [
      {
        "jp": "彼は歌がうまいばかりでなく、ダンスも上手だ。",
        "romaji": "Kare wa uta ga umai bakari de naku, dansu mo jōzu da.",
        "pt": "Ele não só canta bem, mas também dança bem."
      },
      {
        "jp": "この町は景色がいいばかりでなく、食べ物も美味しい。",
        "romaji": "Kono machi wa keshiki ga ii bakari de naku, tabemono mo oishii.",
        "pt": "Esta cidade não só tem belas paisagens, mas a comida também é deliciosa."
      }
    ]
  },
  {
    "title": "〜一方だ",
    "explanation": "Indica que algo está em um estado de mudança contínua e unidirecional, significando 'estar cada vez mais' ou 'continuar a (fazer/ser)'.",
    "pattern": "Verbo (forma dit.) + 一方だ",
    "level": "N3",
    "examples": [
      {
        "jp": "最近、日本語の勉強が楽しくなる一方だ。",
        "romaji": "Saikin, Nihongo no benkyō ga tanoshiku naru ippō da.",
        "pt": "Ultimamente, estudar japonês tem ficado cada vez mais divertido."
      },
      {
        "jp": "世界の人口は増える一方だ。",
        "romaji": "Sekai no jinkō wa fueru ippō da.",
        "pt": "A população mundial continua a crescer."
      }
    ]
  },
  {
    "title": "〜どころではない",
    "explanation": "Indica que não é o momento ou a situação apropriada para fazer algo, ou que algo está muito longe de ser verdade.",
    "pattern": "Verbo (forma dit.) + どころではない\nSubstantivo + どころではない",
    "level": "N3",
    "examples": [
      {
        "jp": "忙しくて、テレビを見るどころではない。",
        "romaji": "Isogashikute, terebi o miru dokoro dewa nai.",
        "pt": "Estou tão ocupado que não é hora de assistir TV."
      },
      {
        "jp": "給料が上がるどころか、下がってしまった。",
        "romaji": "Kyūryō ga agaru dokoro ka, sagatte shimatta.",
        "pt": "Longe de o salário aumentar, ele diminuiu."
      }
    ]
  },
  {
    "title": "〜どころか",
    "explanation": "Expressa que o oposto do que foi esperado ou sugerido é verdade, ou que a situação é ainda mais extrema, significando 'muito pelo contrário', 'longe de' ou 'nem sequer'.",
    "pattern": "Verbo (forma dit.) + どころか\nAdjetivo い + どころか\nAdjetivo な (omitindo な) + どころか\nSubstantivo + どころか",
    "level": "N3",
    "examples": [
      {
        "jp": "彼は漢字が書けるどころか、ひらがなも書けない。",
        "romaji": "Kare wa kanji ga kakeru dokoro ka, hiragana mo kakenai.",
        "pt": "Longe de ele saber escrever kanji, ele nem consegue escrever hiragana."
      },
      {
        "jp": "給料が上がるどころか、下がってしまった。",
        "romaji": "Kyūryō ga agaru dokoro ka, sagatte shimatta.",
        "pt": "Longe de o salário aumentar, ele diminuiu."
      }
    ]
  },
  {
    "title": "〜につれて／にしたがって",
    "explanation": "Indica que, à medida que uma coisa muda, outra também muda, significando 'à medida que' ou 'conforme'.",
    "pattern": "Verbo (forma dit.) + につれて／にしたがって\nSubstantivo + につれて／にしたがって",
    "level": "N3",
    "examples": [
      {
        "jp": "時間が経つにつれて、彼の話が面白くなった。",
        "romaji": "Jikan ga tatsu ni tsurete, kare no hanashi ga omoshiroku natta.",
        "pt": "À medida que o tempo passava, a história dele ficava mais interessante."
      },
      {
        "jp": "新しい技術の発展にしたがって、生活は便利になる。",
        "romaji": "Atarashii gijutsu no hatten ni shitagatte, seikatsu wa benri ni naru.",
        "pt": "Conforme o desenvolvimento de novas tecnologias, a vida se torna mais conveniente."
      }
    ]
  },
  {
    "title": "〜に対して",
    "explanation": "Expressa uma relação de oposição ou contraste, ou indica o alvo de uma ação ou sentimento.",
    "pattern": "名詞 + に対して",
    "level": "N3",
    "examples": [
      {
        "jp": "先生は学生の質問に対して、丁寧に答えた。",
        "romaji": "Sensei wa gakusei no shitsumon ni taishite, teinei ni kotaeta.",
        "pt": "O professor respondeu cuidadosamente à pergunta do aluno."
      },
      {
        "jp": "彼女は誰に対しても親切だ。",
        "romaji": "Kanojo wa dare ni taishite mo shinsetsu da.",
        "pt": "Ela é gentil com qualquer um."
      }
    ]
  },
  {
    "title": "〜から〜にかけて",
    "explanation": "Indica um período de tempo ou uma extensão espacial que vai de um ponto a outro de forma aproximada.",
    "pattern": "名詞 + から + 名詞 + にかけて",
    "level": "N3",
    "examples": [
      {
        "jp": "今夜から明日朝にかけて、雨が降るでしょう。",
        "romaji": "Kon'ya kara ashita asa ni kakete, ame ga furu deshō.",
        "pt": "Desde esta noite até amanhã de manhã, provavelmente vai chover."
      },
      {
        "jp": "この地域は春から夏にかけて、花が美しい。",
        "romaji": "Kono chiiki wa haru kara natsu ni kakete, hana ga utsukushii.",
        "pt": "Esta região, da primavera ao verão, tem flores bonitas."
      }
    ]
  },
  {
    "title": "〜を始め",
    "explanation": "Significa 'começando por X', indicando que X é um exemplo representativo de um grupo maior.",
    "pattern": "名詞 + を始め",
    "level": "N3",
    "examples": [
      {
        "jp": "この店では野菜を始め、魚や肉など様々な食材が手に入る。",
        "romaji": "Kono mise de wa yasai o hajime, sakana ya niku nado samazama na shokuzai ga te ni hairu.",
        "pt": "Nesta loja, começando por vegetais, você pode encontrar diversos ingredientes como peixe e carne."
      },
      {
        "jp": "日本には東京を始め、美しい都市がたくさんある。",
        "romaji": "Nihon ni wa Tōkyō o hajime, utsukushii toshi ga takusan aru.",
        "pt": "No Japão, começando por Tóquio, há muitas cidades bonitas."
      }
    ]
  },
  {
    "title": "〜をめぐって",
    "explanation": "Indica que uma discussão, disputa ou problema gira em torno de algo.",
    "pattern": "名詞 + をめぐって",
    "level": "N3",
    "examples": [
      {
        "jp": "そのニュースをめぐって、様々な意見が交わされた。",
        "romaji": "Sono nyūsu o megutte, samazama na iken ga kawasareta.",
        "pt": "Diversas opiniões foram trocadas sobre aquela notícia."
      },
      {
        "jp": "土地の所有権をめぐって、争いが起きている。",
        "romaji": "Tochi no shoyūken o megutte, arasoi ga okiteiru.",
        "pt": "Há uma disputa sobre a propriedade da terra."
      }
    ]
  },
  {
    "title": "〜にもかかわらず",
    "explanation": "Significa 'apesar de' ou 'não obstante', expressando que uma situação inesperada ocorreu apesar de algo.",
    "pattern": "普通形 + にもかかわらず (な形容詞: であるにもかかわらず / 名詞: であるにもかかわらず)",
    "level": "N3",
    "examples": [
      {
        "jp": "雨が降っているにもかかわらず、彼は出かけた。",
        "romaji": "Ame ga futte iru ni mo kakawarazu, kare wa dekaketa.",
        "pt": "Apesar de estar chovendo, ele saiu."
      },
      {
        "jp": "病気であるにもかかわらず、彼女は仕事に行った。",
        "romaji": "Byōki de aru ni mo kakawarazu, kanojo wa shigoto ni itta.",
        "pt": "Apesar de estar doente, ela foi trabalhar."
      }
    ]
  },
  {
    "title": "〜限り",
    "explanation": "Expressa uma condição de 'enquanto' ou 'enquanto houver', indicando que uma situação continuará sob uma determinada condição.",
    "pattern": "動詞普通形 / い形容詞普通形 / な形容詞である / 名詞である + 限り",
    "level": "N3",
    "examples": [
      {
        "jp": "私が生きている限り、あなたを守る。",
        "romaji": "Watashi ga ikite iru kagiri, anata o mamoru.",
        "pt": "Enquanto eu estiver vivo, vou protegê-lo."
      },
      {
        "jp": "私が知っている限りでは、彼は独身だ。",
        "romaji": "Watashi ga shitte iru kagiri de wa, kare wa dokushin da.",
        "pt": "Até onde eu sei, ele é solteiro."
      }
    ]
  },
  {
    "title": "〜のみ",
    "explanation": "Significa 'apenas' ou 'somente', com um tom mais formal que だけ.",
    "pattern": "名詞 / 動詞連体形 + のみ",
    "level": "N3",
    "examples": [
      {
        "jp": "参加できるのは、会員のみです。",
        "romaji": "Sanka dekiru no wa, kaiin nomi desu.",
        "pt": "Os que podem participar são apenas os membros."
      },
      {
        "jp": "この問題は私のみが知っている。",
        "romaji": "Kono mondai wa watashi nomi ga shitte iru.",
        "pt": "Apenas eu sei sobre este problema."
      }
    ]
  },
  {
    "title": "〜といえば",
    "explanation": "Usado para mudar de assunto, introduzir um tópico relacionado ou expressar uma associação quando algo é mencionado.",
    "pattern": "名詞 / 普通形 + といえば",
    "level": "N3",
    "examples": [
      {
        "jp": "日本食といえば、寿司が有名だ。",
        "romaji": "Nihonshoku to ieba, sushi ga yūmei da.",
        "pt": "Falando em comida japonesa, sushi é famoso."
      },
      {
        "jp": "あの映画といえば、もう見た？",
        "romaji": "Ano eiga to ieba, mō mita?",
        "pt": "Falando naquele filme, você já viu?"
      }
    ]
  },
  {
    "title": "〜に決まっている",
    "explanation": "Expressa uma forte convicção de que algo é definitivamente verdade ou acontecerá, sem dúvida.",
    "pattern": "普通形 + に決まっている (な形容詞: だに決まっている / 名詞: だに決まっている)",
    "level": "N3",
    "examples": [
      {
        "jp": "こんなに難しい問題は、私には解けるに決まっている。",
        "romaji": "Konna ni muzukashii mondai wa, watashi ni wa tokeru ni kimatte iru.",
        "pt": "Um problema tão difícil como este, com certeza não consigo resolver."
      },
      {
        "jp": "明日、彼が来るに決まっている。",
        "romaji": "Ashita, kare ga kuru ni kimatte iru.",
        "pt": "Ele com certeza virá amanhã."
      }
    ]
  },
  {
    "title": "〜とみられる",
    "explanation": "Significa 'é considerado que' ou 'parece que', usado para expressar uma conclusão baseada em evidências, mas sem total certeza (comumente em notícias).",
    "pattern": "普通形 + とみられる (な形容詞: だとみられる / 名詞: だとみられる)",
    "level": "N3",
    "examples": [
      {
        "jp": "その事故の原因は、スピードの出しすぎだとみられている。",
        "romaji": "Sono jiko no gen'in wa, supīdo no dashisugi da to mirareru.",
        "pt": "A causa do acidente é considerada excesso de velocidade."
      },
      {
        "jp": "彼は犯人ではないとみられている。",
        "romaji": "Kare wa hannin de wa nai to mirareru.",
        "pt": "Ele não é considerado o criminoso."
      }
    ]
  },
  {
    "title": "〜に応じて",
    "explanation": "Significa 'de acordo com' ou 'em resposta a', indicando que algo muda ou é feito conforme uma determinada condição.",
    "pattern": "名詞 + に応じて",
    "level": "N3",
    "examples": [
      {
        "jp": "給料は経験に応じて決まる。",
        "romaji": "Kyūryō wa keiken ni ōjite kimaru.",
        "pt": "O salário é determinado de acordo com a experiência."
      },
      {
        "jp": "顧客のニーズに応じて、サービスを改善する。",
        "romaji": "Kokyaku no nīzu ni ōjite, sābisu o kaizen suru.",
        "pt": "Melhorar os serviços de acordo com as necessidades dos clientes."
      }
    ]
  },
  {
    "title": "〜において",
    "explanation": "Significa 'em' ou 'no que diz respeito a', usado para indicar local, tempo ou domínio de uma ação ou situação (mais formal que で ou に).",
    "pattern": "名詞 + において",
    "level": "N3",
    "examples": [
      {
        "jp": "会議は3階の会議室において行われます。",
        "romaji": "Kaigi wa san-kai no kaigishitsu ni oite okonawaremasu.",
        "pt": "A reunião será realizada na sala de reuniões do terceiro andar."
      },
      {
        "jp": "この点において、彼の意見には賛成できない。",
        "romaji": "Kono ten ni oite, kare no iken ni wa sansei dekinai.",
        "pt": "Neste ponto, não consigo concordar com a opinião dele."
      }
    ]
  },
  {
    "title": "〜に伴って",
    "explanation": "Significa 'junto com' ou 'à medida que', indicando que uma coisa acontece em conjunto ou como consequência de outra.",
    "pattern": "名詞 + に伴って / 動詞辞書形 + に伴って",
    "level": "N3",
    "examples": [
      {
        "jp": "経済発展に伴って、環境問題も深刻になった。",
        "romaji": "Keizai hatten ni tomonatte, kankyō mondai mo shinkoku ni natta.",
        "pt": "Junto com o desenvolvimento econômico, os problemas ambientais também se tornaram sérios."
      },
      {
        "jp": "技術の進歩に伴って、私たちの生活は便利になった。",
        "romaji": "Gijutsu no shinpo ni tomonatte, watashitachi no seikatsu wa benri ni natta.",
        "pt": "À medida que a tecnologia avança, nossas vidas se tornaram mais convenientes."
      }
    ]
  },
  {
    "title": "〜によって",
    "explanation": "Indica o agente de uma ação passiva, o meio ou método, a causa ou a variação dependendo da situação.",
    "pattern": "名詞 + によって",
    "level": "N3",
    "examples": [
      {
        "jp": "この本は山田さんによって書かれた。",
        "romaji": "Kono hon wa Yamada-san ni yotte kakareta.",
        "pt": "Este livro foi escrito pelo Sr. Yamada."
      },
      {
        "jp": "人によって意見が違う。",
        "romaji": "Hito ni yotte iken ga chigau.",
        "pt": "As opiniões variam de pessoa para pessoa."
      }
    ]
  },
  {
    "title": "〜に基づいて",
    "explanation": "Significa 'baseado em' ou 'fundamentado em', indicando que algo é feito ou decidido com base em certos princípios ou fatos.",
    "pattern": "名詞 + に基づいて",
    "level": "N3",
    "examples": [
      {
        "jp": "この計画は最新のデータに基づいて作成された。",
        "romaji": "Kono keikaku wa saishin no dēta ni motozuite sakusei sareta.",
        "pt": "Este plano foi elaborado com base nos dados mais recentes."
      },
      {
        "jp": "彼は経験に基づいて判断を下した。",
        "romaji": "Kare wa keiken ni motozuite handan o kudashita.",
        "pt": "Ele tomou uma decisão com base em sua experiência."
      }
    ]
  },
  {
    "title": "〜かねない",
    "explanation": "Expressa a preocupação de que algo negativo ou indesejável possa acontecer, 'pode vir a...'.",
    "pattern": "動詞ます形 + かねない",
    "level": "N3",
    "examples": [
      {
        "jp": "そんなことをしたら、失敗しかねない。",
        "romaji": "Sonna koto o shitara, shippai shi kanenai.",
        "pt": "Se fizer algo assim, pode vir a falhar."
      },
      {
        "jp": "このままでは、彼は病気になりかねない。",
        "romaji": "Kono mama de wa, kare wa byōki ni nari kanenai.",
        "pt": "Desse jeito, ele pode vir a ficar doente."
      }
    ]
  },
  {
    "title": "〜てばかり",
    "explanation": "Indica que uma ação é feita repetidamente ou que a pessoa só faz aquilo. Pode ter um sentido negativo de excesso.",
    "pattern": "動詞のて形＋ばかり",
    "level": "N3",
    "examples": [
      {
        "jp": "彼はゲームをしてばかりいる。",
        "romaji": "Kare wa gēmu o shite bakari iru.",
        "pt": "Ele só joga videogame."
      },
      {
        "jp": "毎日食べてばかりいると太るよ。",
        "romaji": "Mainichi tabete bakari iru to futoru yo.",
        "pt": "Se você só comer todo dia, vai engordar."
      }
    ]
  },
  {
    "title": "〜てばかりいる",
    "explanation": "Enfatiza a continuidade de uma ação repetitiva ou exclusiva, com uma conotação de tédio, irritação ou surpresa.",
    "pattern": "動詞のて形＋ばかりいる",
    "level": "N3",
    "examples": [
      {
        "jp": "一日中寝てばかりいると体がなまるよ。",
        "romaji": "Ichinichijū nete bakari iru to karada ga namaru yo.",
        "pt": "Se você ficar o dia inteiro só dormindo, seu corpo vai enferrujar."
      },
      {
        "jp": "彼はいつも文句を言ってばかりいる。",
        "romaji": "Kare wa itsumo monku o itte bakari iru.",
        "pt": "Ele está sempre apenas reclamando."
      }
    ]
  },
  {
    "title": "〜てほしい",
    "explanation": "Expressa o desejo do falante de que outra pessoa faça algo.",
    "pattern": "動詞のて形＋ほしい",
    "level": "N3",
    "examples": [
      {
        "jp": "もう少しゆっくり話してほしい。",
        "romaji": "Mō sukoshi yukkuri hanashite hoshii.",
        "pt": "Eu gostaria que você falasse um pouco mais devagar."
      },
      {
        "jp": "この問題を解決してほしいです。",
        "romaji": "Kono mondai o kaiketsu shite hoshii desu.",
        "pt": "Eu quero que você resolva este problema."
      }
    ]
  },
  {
    "title": "〜てやる",
    "explanation": "Expressa que o falante faz algo para alguém ou um animal de nível inferior ou para quem não se tem muito respeito, ou para um amigo íntimo.",
    "pattern": "動詞のて形＋やる",
    "level": "N3",
    "examples": [
      {
        "jp": "犬に餌をやってください。",
        "romaji": "Inu ni esa o yatte kudasai.",
        "pt": "Por favor, alimente o cachorro."
      },
      {
        "jp": "弟の宿題を手伝ってやった。",
        "romaji": "Otōto no shukudai o tetsudatte yatta.",
        "pt": "Ajudei meu irmão mais novo com o dever de casa."
      }
    ]
  },
  {
    "title": "〜とか",
    "explanation": "Usado para listar exemplos não exaustivos, significando 'e coisas do tipo' ou 'como... ou...'.",
    "pattern": "名詞＋とか / 動詞・形容詞の普通形＋とか",
    "level": "N3",
    "examples": [
      {
        "jp": "休日は映画を見たり、本を読んだりとかして過ごします。",
        "romaji": "Kyūjitsu wa eiga o mitari, hon o yondari toka shite sugoshimasu.",
        "pt": "Nos dias de folga, eu assisto filmes, leio livros, etc."
      },
      {
        "jp": "今日の夕食はカレーとかラーメンとかどう？",
        "romaji": "Kyō no yūshoku wa karē toka rāmen toka dō?",
        "pt": "Que tal curry ou ramen para o jantar de hoje?"
      }
    ]
  },
  {
    "title": "〜とのこと",
    "explanation": "Forma mais casual de relatar uma informação, como 'ouvi dizer que...' ou 'fui informado que...'.",
    "pattern": "普通形＋とのこと",
    "level": "N3",
    "examples": [
      {
        "jp": "社長は会議に参加できないとのことです。",
        "romaji": "Shachō wa kaigi ni sanka dekinai to no koto desu.",
        "pt": "Fui informado que o presidente não poderá participar da reunião."
      },
      {
        "jp": "田中さんは来週出張とのことでした。",
        "romaji": "Tanaka-san wa raishū shutchō to no koto deshita.",
        "pt": "Fui informado que a Sra. Tanaka estará em viagem de negócios na próxima semana."
      }
    ]
  },
  {
    "title": "〜として〜ない",
    "explanation": "Expressa a ideia de 'nem um(a) sequer' ou 'não há nada como'. Enfatiza a ausência completa de algo.",
    "pattern": "名詞＋として＋（動詞の可能形）ない",
    "level": "N3",
    "examples": [
      {
        "jp": "彼女は誰にも話していないし、友達としても話せない。",
        "romaji": "Kanojo wa dare ni mo hanashite inai shi, tomodachi to shite mo hanasenai.",
        "pt": "Ela não conversou com ninguém, e nem como amiga consegue conversar."
      },
      {
        "jp": "この問題は、専門家として解決できない。",
        "romaji": "Kono mondai wa, senmonka to shite kaiketsu dekinai.",
        "pt": "Este problema, nem mesmo como especialista, consigo resolver."
      }
    ]
  },
  {
    "title": "〜にあたって",
    "explanation": "Usado para indicar uma ocasião ou momento importante, significando 'ao/para (fazer algo)' ou 'no momento de'. Mais formal que 〜時に.",
    "pattern": "動詞の辞書形＋にあたって / 名詞＋にあたって",
    "level": "N3",
    "examples": [
      {
        "jp": "新しい仕事を始めるにあたって、目標を立てた。",
        "romaji": "Atarashii shigoto o hajimeru ni atatte, mokuhyō o tateta.",
        "pt": "Ao iniciar um novo trabalho, estabeleci metas."
      },
      {
        "jp": "開会にあたって、一言ご挨拶申し上げます。",
        "romaji": "Kaikai ni atatte, hitokoto goaisatsu mōshiagemasu.",
        "pt": "No momento da abertura, gostaria de fazer um breve discurso."
      }
    ]
  },
  {
    "title": "〜に加えて",
    "explanation": "Significa 'além de' ou 'em adição a'. Usado para adicionar um elemento a uma lista ou situação existente.",
    "pattern": "名詞＋に加えて / 動詞・形容詞の普通形＋のに加えて",
    "level": "N3",
    "examples": [
      {
        "jp": "日本語に加えて、英語も話せます。",
        "romaji": "Nihongo ni kuwaete, Eigo mo hanasemasu.",
        "pt": "Além do japonês, também falo inglês."
      },
      {
        "jp": "彼は頭が良いのに加えて、運動もできる。",
        "romaji": "Kare wa atama ga ii no ni kuwaete, undō mo dekiru.",
        "pt": "Além de ser inteligente, ele também é bom em esportes."
      }
    ]
  },
  {
    "title": "〜に代わって / 〜にかわって",
    "explanation": "Significa 'em vez de', 'no lugar de' ou 'em nome de'. Indica uma substituição de pessoa ou coisa.",
    "pattern": "名詞＋に代わって",
    "level": "N3",
    "examples": [
      {
        "jp": "社長に代わって、私がご挨拶させていただきます。",
        "romaji": "Shachō ni kawatte, watashi ga goaisatsu sasete itadakimasu.",
        "pt": "Em nome do presidente, farei o discurso."
      },
      {
        "jp": "パソコンが壊れたので、古いものに代わって新しいのを買った。",
        "romaji": "Pasokon ga kowareta node, furui mono ni kawatte atarashii no o katta.",
        "pt": "Como o computador quebrou, comprei um novo em vez do antigo."
      }
    ]
  },
  {
    "title": "〜に関して",
    "explanation": "Significa 'a respeito de', 'em relação a' ou 'sobre'. Usado para indicar o tópico ou assunto.",
    "pattern": "名詞＋に関して",
    "level": "N3",
    "examples": [
      {
        "jp": "この問題に関して、ご意見をお願いします。",
        "romaji": "Kono mondai ni kanshite, goiken o onegai shimasu.",
        "pt": "A respeito deste problema, por favor, me dê sua opinião."
      },
      {
        "jp": "彼は歴史に関して詳しい。",
        "romaji": "Kare wa rekishi ni kanshite kuwashii.",
        "pt": "Ele é bem informado sobre história."
      }
    ]
  },
  {
    "title": "〜に際して",
    "explanation": "Usado para indicar uma ocasião ou momento importante, geralmente formal. Significa 'ao/para (fazer algo)' ou 'no momento de'. Similar a にあたって.",
    "pattern": "動詞の辞書形＋に際して / 名詞＋に際して",
    "level": "N3",
    "examples": [
      {
        "jp": "卒業に際して、先生に感謝の言葉を述べた。",
        "romaji": "Sotsugyō ni際shite, sensei ni kansha no kotoba o nobete.",
        "pt": "Por ocasião da formatura, expressei minhas palavras de gratidão ao professor."
      },
      {
        "jp": "留学するに際して、必要な書類を準備した。",
        "romaji": "Ryūgaku suru ni際shite, hitsuyō na shorui o junbi shita.",
        "pt": "Ao ir estudar no exterior, preparei os documentos necessários."
      }
    ]
  },
  {
    "title": "〜によると／〜によれば",
    "explanation": "Indica a fonte de uma informação. Significa 'segundo', 'de acordo com'.",
    "pattern": "substantivo + によると／によれば",
    "level": "N3",
    "examples": [
      {
        "jp": "天気予報によると、明日は晴れるそうです。",
        "romaji": "Tenki yohō ni yoru to, ashita wa hareru sō desu.",
        "pt": "De acordo com a previsão do tempo, amanhã fará sol."
      },
      {
        "jp": "彼の話によれば、その事件は先週起こったらしい。",
        "romaji": "Kare no hanashi ni yoreba, sono jiken wa senshū okotta rashii.",
        "pt": "Segundo a história dele, o incidente aconteceu na semana passada."
      }
    ]
  },
  {
    "title": "〜だけでなく",
    "explanation": "Expressa que algo não é apenas uma coisa, mas também outra. Significa 'não só... mas também'.",
    "pattern": "substantivo/forma simples do verbo/adjetivo い/adjetivo な + だけでなく",
    "level": "N3",
    "examples": [
      {
        "jp": "彼女は歌が上手なだけでなく、ダンスも素晴らしい。",
        "romaji": "Kanojo wa uta ga jōzu na dake de naku, dansu mo subarashii.",
        "pt": "Ela não é só boa em cantar, mas também em dançar."
      },
      {
        "jp": "このレストランは美味しいだけでなく、値段も手頃だ。",
        "romaji": "Kono resutoran wa oishii dake de naku, nedan mo tegoro da.",
        "pt": "Este restaurante não é só delicioso, mas o preço também é razoável."
      }
    ]
  },
  {
    "title": "〜はずがない / 〜わけがない",
    "explanation": "Expressa a impossibilidade ou improbabilidade de algo. Significa 'não há como', 'não é possível que'.",
    "pattern": "forma simples do verbo/adjetivo い/adjetivo な + はずがない / わけがない",
    "level": "N3",
    "examples": [
      {
        "jp": "彼は日本語を勉強したことがないから、話せるはずがない。",
        "romaji": "Kare wa Nihongo o benkyō shita koto ga nai kara, hanaseru hazu ga nai.",
        "pt": "Ele nunca estudou japonês, então não há como ele falar."
      },
      {
        "jp": "そんな簡単な問題ができないわけがない。",
        "romaji": "Son'na kantan na mondai ga dekinai wake ga nai.",
        "pt": "Não há como não conseguir resolver um problema tão simples."
      }
    ]
  },
  {
    "title": "〜ことはない",
    "explanation": "Indica que não é necessário fazer algo. Significa 'não precisa', 'não é necessário'.",
    "pattern": "forma simples do verbo + ことはない",
    "level": "N3",
    "examples": [
      {
        "jp": "急ぐことはないよ。まだ時間があるから。",
        "romaji": "Isogu koto wa nai yo. Mada jikan ga aru kara.",
        "pt": "Não precisa se apressar. Ainda temos tempo."
      },
      {
        "jp": "心配することはない。きっとうまくいくよ。",
        "romaji": "Shinpai suru koto wa nai. Kitto umaku iku yo.",
        "pt": "Não precisa se preocupar. Com certeza vai dar tudo certo."
      }
    ]
  },
  {
    "title": "〜に違いない",
    "explanation": "Expressa uma forte convicção ou certeza. Significa 'com certeza', 'sem dúvida'.",
    "pattern": "forma simples do verbo/adjetivo い/adjetivo な + に違いない",
    "level": "N3",
    "examples": [
      {
        "jp": "あの人は日本人だから、日本語が話せるに違いない。",
        "romaji": "Ano hito wa Nihonjin da kara, Nihongo ga hanaseru ni chigainai.",
        "pt": "Aquela pessoa é japonesa, então com certeza fala japonês."
      },
      {
        "jp": "彼の表情からすると、何か悪いことがあったに違いない。",
        "romaji": "Kare no hyōjō kara suru to, nani ka warui koto ga atta ni chigainai.",
        "pt": "Pela expressão dele, algo ruim deve ter acontecido, sem dúvida."
      }
    ]
  },
  {
    "title": "〜Nに比べて",
    "explanation": "Compara duas coisas ou pessoas. Significa 'em comparação com', 'comparado a'.",
    "pattern": "substantivo + に比べて",
    "level": "N3",
    "examples": [
      {
        "jp": "東京は大阪に比べて物価が高い。",
        "romaji": "Tōkyō wa Ōsaka ni kurabete bukka ga takai.",
        "pt": "Tóquio tem um custo de vida mais alto em comparação com Osaka."
      },
      {
        "jp": "去年に比べて今年は雨が多い。",
        "romaji": "Kyonen ni kurabete kotoshi wa ame ga ōi.",
        "pt": "Este ano chove mais em comparação com o ano passado."
      }
    ]
  },
  {
    "title": "〜Nに対して",
    "explanation": "Compara duas coisas ou ideias, contrastando-as. Significa 'enquanto', 'ao passo que'.",
    "pattern": "substantivo + に対して",
    "level": "N3",
    "examples": [
      {
        "jp": "兄は外向的なのに対して、弟は内向的だ。",
        "romaji": "Ani wa gaikōteki na no ni taishite, otōto wa naikōteki da.",
        "pt": "Enquanto meu irmão mais velho é extrovertido, meu irmão mais novo é introvertido."
      },
      {
        "jp": "彼はスポーツが得意であるのに対して、私は苦手だ。",
        "romaji": "Kare wa supōtsu ga tokui de aru no ni taishite, watashi wa nigate da.",
        "pt": "Enquanto ele é bom em esportes, eu sou ruim."
      }
    ]
  },
  {
    "title": "〜に対して (〜にたいして)",
    "explanation": "Indica o alvo ou o objeto em relação ao qual uma ação, atitude ou sentimento é direcionado. Pode significar 'em relação a', 'para com' ou 'contra'.",
    "pattern": "substantivo + に対して",
    "level": "N3",
    "examples": [
      {
        "jp": "先生は学生の質問に対して丁寧に答えた。",
        "romaji": "Sensei wa gakusei no shitsumon ni taishite teinei ni kotaeta.",
        "pt": "O professor respondeu cuidadosamente à pergunta do aluno."
      },
      {
        "jp": "彼女はどんな困難に対しても決して諦めない。",
        "romaji": "Kanojo wa donna konnan ni taishite mo kesshite akiramenai.",
        "pt": "Ela nunca desiste, não importa a dificuldade."
      }
    ]
  },
  {
    "title": "〜に比べて (〜にくらべて)",
    "explanation": "Usado para fazer uma comparação, indicando que algo é diferente ou tem uma característica diferente em relação a outro. Significa 'em comparação com'.",
    "pattern": "substantivo + に比べて",
    "level": "N3",
    "examples": [
      {
        "jp": "東京は大阪に比べて物価が高い。",
        "romaji": "Tōkyō wa Ōsaka ni kurabete bukka ga takai.",
        "pt": "Tóquio tem um custo de vida mais alto em comparação com Osaka."
      },
      {
        "jp": "去年に比べて今年は雨が多い。",
        "romaji": "Kyonen ni kurabete kotoshi wa ame ga ooi.",
        "pt": "Este ano choveu mais em comparação com o ano passado."
      }
    ]
  },
  {
    "title": "〜にかわって / 〜にかわり (〜にかわって / 〜にかわり)",
    "explanation": "Significa 'em vez de', 'no lugar de', 'em substituição a'. Indica que algo ou alguém substitui outro.",
    "pattern": "substantivo + にかわって / にかわり",
    "level": "N3",
    "examples": [
      {
        "jp": "社長にかわって私がご挨拶いたします。",
        "romaji": "Shachō ni kawatte watashi ga go-aisatsu itashimasu.",
        "pt": "Em vez do presidente, eu farei o discurso de saudação."
      },
      {
        "jp": "現金にかわり、クレジットカードで支払った。",
        "romaji": "Genkin ni kawari, kurejitto kādo de shiharatta.",
        "pt": "Paguei com cartão de crédito em vez de dinheiro."
      }
    ]
  },
  {
    "title": "〜に応じて (〜におうじて)",
    "explanation": "Significa 'de acordo com', 'em conformidade com', 'em resposta a'. Indica que algo muda ou é feito de acordo com uma situação ou condição.",
    "pattern": "substantivo + に応じて",
    "level": "N3",
    "examples": [
      {
        "jp": "お客様のご要望に応じて、プランを調整いたします。",
        "romaji": "Okyakusama no go-yōbō ni ōjite, puran o chōsei itashimasu.",
        "pt": "Ajustaremos o plano de acordo com as necessidades do cliente."
      },
      {
        "jp": "能力に応じて給料が決まる。",
        "romaji": "Nōryoku ni ōjite kyūryō ga kimaru.",
        "pt": "O salário é determinado de acordo com a habilidade."
      }
    ]
  },
  {
    "title": "〜に沿って (〜にそって)",
    "explanation": "Significa 'ao longo de', 'seguindo', 'de acordo com'. Usado para indicar que uma ação ou plano segue uma linha, regra ou instrução.",
    "pattern": "substantivo + に沿って",
    "level": "N3",
    "examples": [
      {
        "jp": "地図に沿って進んでください。",
        "romaji": "Chizu ni sotte susunde kudasai.",
        "pt": "Por favor, siga o mapa."
      },
      {
        "jp": "会社の規則に沿って業務を進める。",
        "romaji": "Kaisha no kisoku ni sotte gyōmu o susumeru.",
        "pt": "Conduzir o trabalho de acordo com as regras da empresa."
      }
    ]
  },
  {
    "title": "〜をめぐって (〜をめぐって)",
    "explanation": "Significa 'em torno de', 'em relação a', 'sobre'. Usado para indicar que um debate, controvérsia ou evento gira em torno de um determinado assunto.",
    "pattern": "substantivo + をめぐって",
    "level": "N3",
    "examples": [
      {
        "jp": "その問題は国会をめぐって議論された。",
        "romaji": "Sono mondai wa kokkai o megutte giron sareta.",
        "pt": "Essa questão foi debatida no parlamento."
      },
      {
        "jp": "財産をめぐって兄弟で争っている。",
        "romaji": "Zaisan o megutte kyōdai de arasoitsukete iru.",
        "pt": "Os irmãos estão brigando por causa da herança."
      }
    ]
  },
  {
    "title": "〜から〜にかけて (〜から〜にかけて)",
    "explanation": "Indica um intervalo aproximado de tempo ou espaço, significando 'de ... a ...' ou 'entre ... e ...'.",
    "pattern": "período de tempo/local + から + período de tempo/local + にかけて",
    "level": "N3",
    "examples": [
      {
        "jp": "昨夜から今朝にかけて雪が降った。",
        "romaji": "Sakuya kara kesa ni kakete yuki ga futta.",
        "pt": "Nevou da noite passada até esta manhã."
      },
      {
        "jp": "夏休みは8月から9月にかけてです。",
        "romaji": "Natsuyasumi wa hachigatsu kara kugatsu ni kakete desu.",
        "pt": "As férias de verão são de agosto a setembro."
      }
    ]
  },
  {
    "title": "〜にわたって / 〜にわたり (〜にわたって / 〜にわたり)",
    "explanation": "Indica que algo se estende por toda uma área ou período de tempo. Significa 'por toda', 'ao longo de', 'durante'.",
    "pattern": "substantivo (que indica amplitude) + にわたって / にわたり",
    "level": "N3",
    "examples": [
      {
        "jp": "その会議は3時間にわたって行われた。",
        "romaji": "Sono kaigi wa san-jikan ni watatte okonawareta.",
        "pt": "A reunião foi realizada por três horas."
      },
      {
        "jp": "彼の作品は世代にわたり愛されている。",
        "romaji": "Kare no sakuhin wa sedai ni watari aisarete iru.",
        "pt": "Sua obra é amada por gerações."
      }
    ]
  },
  {
    "title": "〜を通して / 〜を通じて (〜をとおして / 〜をつうじて)",
    "explanation": "Indica um meio ou método pelo qual algo é realizado, ou que algo se estende por um período. Significa 'através de', 'por meio de', 'durante todo'.",
    "pattern": "substantivo + を通して / を通じて",
    "level": "N3",
    "examples": [
      {
        "jp": "インターネットを通して世界中の情報が得られる。",
        "romaji": "Intānetto o tōshite sekaijū no jōhō gaえられる.",
        "pt": "Informações de todo o mundo podem ser obtidas através da internet."
      },
      {
        "jp": "彼は一年を通して研究に打ち込んだ。",
        "romaji": "Kare wa ichinen o tōshite kenkyū ni uchikonda.",
        "pt": "Ele se dedicou à pesquisa durante todo o ano."
      }
    ]
  },
  {
    "title": "〜限り (〜かぎり)",
    "explanation": "Significa 'enquanto', 'enquanto houver', 'até o limite de'. Indica uma condição ou limite.",
    "pattern": "verbo (forma do dicionário/ない形) + 限り, substantivo + の限り, adjetivo い + 限り, adjetivo な + な限り",
    "level": "N3",
    "examples": [
      {
        "jp": "私が知っている限りでは、彼は独身です。",
        "romaji": "Watashi ga shitte iru kagiri de wa, kare wa dokushin desu.",
        "pt": "Pelo que eu sei, ele é solteiro."
      },
      {
        "jp": "この薬を飲む限り、痛みが抑えられる。",
        "romaji": "Kono kusuri o nomu kagiri, itami ga osaerareru.",
        "pt": "Enquanto eu tomar este remédio, a dor será controlada."
      }
    ]
  },
  {
    "title": "〜に限り / 〜に限って (〜にかぎり / 〜にかぎって)",
    "explanation": "Significa 'apenas para', 'somente para', 'exclusivamente para'. Indica uma restrição ou exceção.",
    "pattern": "substantivo + に限り / に限って",
    "level": "N3",
    "examples": [
      {
        "jp": "このサービスは会員に限りご利用いただけます。",
        "romaji": "Kono sābisu wa kaiin ni kagiri go-riyō itadakemasu.",
        "pt": "Este serviço está disponível apenas para membros."
      },
      {
        "jp": "どうして私に限ってこんな不幸なことが起こるのだろう。",
        "romaji": "Dōshite watashi ni kagitte konna fukō na koto ga okoru no darō.",
        "pt": "Por que algo tão infeliz acontece apenas comigo?"
      }
    ]
  },
  {
    "title": "〜に加えて (〜にくわえて)",
    "explanation": "Significa 'além de', 'em adição a', 'juntamente com'. Usado para adicionar um elemento a algo que já existe.",
    "pattern": "substantivo + に加えて",
    "level": "N3",
    "examples": [
      {
        "jp": "日本語に加えて、英語も話せます。",
        "romaji": "Nihongo ni kuwaete, eigo mo hanasemasu.",
        "pt": "Além do japonês, consigo falar inglês."
      },
      {
        "jp": "彼女は美しさに加えて才能も持ち合わせている。",
        "romaji": "Kanojo wa utsukushisa ni kuwaete sainō mo mochiawasete iru.",
        "pt": "Além da beleza, ela também possui talento."
      }
    ]
  },
  {
    "title": "〜とともに (〜とともに)",
    "explanation": "Significa 'junto com', 'ao mesmo tempo que', 'à medida que'. Pode indicar companhia ou mudança simultânea.",
    "pattern": "substantivo + とともに, verbo (forma do dicionário) + とともに",
    "level": "N3",
    "examples": [
      {
        "jp": "家族とともに旅行に行った。",
        "romaji": "Kazoku to tomo ni ryokō ni itta.",
        "pt": "Fui viajar com a família."
      },
      {
        "jp": "年をとるとともに記憶力が衰える。",
        "romaji": "Toshi o toru to tomo ni kiokuryoku ga otorōru.",
        "pt": "À medida que envelhecemos, a memória diminui."
      }
    ]
  },
  {
    "title": "〜に連れて / 〜につれて (〜につれて / 〜につれて)",
    "explanation": "Indica que uma mudança ocorre em paralelo com outra. Significa 'à medida que', 'conforme'.",
    "pattern": "verbo (forma do dicionário) + に連れて / につれて, substantivo + に連れて / につれて",
    "level": "N3",
    "examples": [
      {
        "jp": "時間が経つにつれて、寒くなってきた。",
        "romaji": "Jikan ga tatsu ni tsurete, samuku natte kita.",
        "pt": "À medida que o tempo passava, ficou mais frio."
      },
      {
        "jp": "山が高くなるにつれて、景色が美しくなった。",
        "romaji": "Yama ga takaku naru ni tsurete, keshiki ga utsukushiku natta.",
        "pt": "Conforme a montanha ficava mais alta, a paisagem se tornava mais bonita."
      }
    ]
  },
  {
    "title": "〜に伴って / 〜に伴い (〜にともなって / 〜にともない)",
    "explanation": "Indica que algo acontece junto com outro evento ou mudança. Significa 'acompanhado por', 'com', 'devido a'.",
    "pattern": "verbo (forma do dicionário) + に伴って / に伴い, substantivo + に伴って / に伴い",
    "level": "N3",
    "examples": [
      {
        "jp": "経済成長に伴って、環境問題も深刻化した。",
        "romaji": "Keizai seichō ni tomonatte, kankyō mondai mo shinkokuka shita.",
        "pt": "Com o crescimento econômico, os problemas ambientais também se agravaram."
      },
      {
        "jp": "人口増加に伴い、住宅不足が問題となっている。",
        "romaji": "Jinkō zōka ni tomonai, jūgaku busoku ga mondai to natte iru.",
        "pt": "Com o aumento da população, a falta de moradias tornou-se um problema."
      }
    ]
  },
  {
    "title": "〜につれて (〜につれて)",
    "explanation": "Expressa que à medida que algo muda, outra coisa também muda em consequência. Significa 'à medida que', 'conforme'.",
    "pattern": "verbo (forma do dicionário) + につれて, substantivo + につれて",
    "level": "N3",
    "examples": [
      {
        "jp": "時間が経つにつれて、寒くなってきた。",
        "romaji": "Jikan ga tatsu ni tsurete, samuku natte kita.",
        "pt": "À medida que o tempo passava, ficou mais frio."
      },
      {
        "jp": "山が高くなるにつれて、景色が美しくなった。",
        "romaji": "Yama ga takaku naru ni tsurete, keshiki ga utsukushiku natta.",
        "pt": "Conforme a montanha ficava mais alta, a paisagem se tornava mais bonita."
      }
    ]
  },
  {
    "title": "〜に先立って / 〜に先立ち (〜にさきだって / 〜にさきだち)",
    "explanation": "Indica que algo acontece antes de outro evento importante ou oficial. Significa 'antes de', 'em preparação para'.",
    "pattern": "substantivo + に先立って / に先立ち, 動詞 (辞書形) + に先立って / に先立ち",
    "level": "N3",
    "examples": [
      {
        "jp": "会議に先立って、資料が配布された。",
        "romaji": "Kaigi ni sakidatte, shiryō ga haifu sareta.",
        "pt": "Antes da reunião, os materiais foram distribuídos."
      },
      {
        "jp": "出発に先立ち、安全確認を行った。",
        "romaji": "Shuppatsu ni sakidachi, anzen kakunin o okonatta.",
        "pt": "Antes de partir, verificamos a segurança."
      }
    ]
  },
  {
    "title": "〜に際して / 〜に際し (〜にさいして / 〜にさいし)",
    "explanation": "Indica o momento ou ocasião em que algo importante acontece. Significa 'no momento de', 'ao fazer'.",
    "pattern": "動詞 (辞書形) + に際して / に際し, 名詞 + に際して / に際し",
    "level": "N3",
    "examples": [
      {
        "jp": "新製品の開発に際して、多くの課題があった。",
        "romaji": "Shinseihin no kaihatsu ni saishite, ooku no kadai ga atta.",
        "pt": "No desenvolvimento do novo produto, houve muitos desafios."
      },
      {
        "jp": "ご卒業に際し、心よりお祝い申し上げます。",
        "romaji": "Go-sotsugyō ni saishi, kokoro yori oiwai mōshiagemasu.",
        "pt": "Por ocasião da sua formatura, desejo as minhas mais sinceras felicitações."
      }
    ]
  },
  {
    "title": "〜に対して / 〜に対し",
    "explanation": "Expressa que algo é feito 'em relação a' ou 'em contraste com' outra coisa. Pode indicar direção, alvo ou contraste.",
    "pattern": "名詞 + に対して / に対し",
    "level": "N2",
    "examples": [
      {
        "jp": "お客様に対して失礼な態度をとってはいけません。",
        "romaji": "Okyaku-sama ni taishite shitsurei na taido o totte wa ikemasen.",
        "pt": "Não se deve ter uma atitude rude em relação aos clientes."
      },
      {
        "jp": "兄は外交的な性格なのに対し、弟は内気だ。",
        "romaji": "Ani wa gaikōteki na seikaku na no ni taishi, otōto wa uchiki da.",
        "pt": "Enquanto meu irmão mais velho tem uma personalidade extrovertida, meu irmão mais novo é tímido."
      }
    ]
  },
  {
    "title": "〜に比べて / 〜に比べ",
    "explanation": "Indica uma comparação, significando 'em comparação com' ou 'comparado a'.",
    "pattern": "名詞 + に比べて / に比べ",
    "level": "N2",
    "examples": [
      {
        "jp": "去年に比べて、今年の夏はとても暑い。",
        "romaji": "Kyonen ni kurabete, kotoshi no natsu wa totemo atsui.",
        "pt": "Comparado ao ano passado, o verão deste ano está muito quente."
      },
      {
        "jp": "東京は物価が高いが、地方都市に比べれば家賃は安い。",
        "romaji": "Tōkyō wa bukka ga takai ga, chihō toshi ni kurabereba yachin wa yasui.",
        "pt": "Em Tóquio, os preços são altos, mas o aluguel é barato em comparação com as cidades do interior."
      }
    ]
  },
  {
    "title": "〜によって / 〜により",
    "explanation": "Pode indicar o meio, a causa, a depender de, ou o agente de uma ação passiva.",
    "pattern": "名詞 + によって / により",
    "level": "N2",
    "examples": [
      {
        "jp": "この絵はピカソによって描かれたものです。",
        "romaji": "Kono e wa Pikaso ni yotte egakareta mono desu.",
        "pt": "Esta pintura foi feita por Picasso."
      },
      {
        "jp": "研究によって新しい事実が明らかになった。",
        "romaji": "Kenkyū ni yotte atarashii jijitsu ga akiraka ni natta.",
        "pt": "Novos fatos foram revelados pela pesquisa."
      }
    ]
  },
  {
    "title": "〜っけ",
    "explanation": "Usado para recordar ou confirmar algo que se esqueceu ou para pedir uma confirmação casual. É uma forma informal.",
    "pattern": "動詞 / い形容詞 / な形容詞 / 名詞 + 普通形 + っけ",
    "level": "N2",
    "examples": [
      {
        "jp": "今日の会議、何時からだっけ？",
        "romaji": "Kyō no kaigi, nanji kara dakke?",
        "pt": "A reunião de hoje, que horas é mesmo?"
      },
      {
        "jp": "彼、結婚したんだっけ？",
        "romaji": "Kare, kekkon shita n'dakke?",
        "pt": "Ele se casou, não foi?"
      }
    ]
  },
  {
    "title": "〜ものだ / 〜ものではない",
    "explanation": "Expressa uma regra geral, um senso comum, um conselho ou uma lembrança nostálgica. 'ものではない' indica algo que não se deve fazer.",
    "pattern": "動詞-辞書形 + ものだ / ものではない",
    "level": "N2",
    "examples": [
      {
        "jp": "人の話は最後まで聞くものだ。",
        "romaji": "Hito no hanashi wa saigo made kiku mono da.",
        "pt": "Deve-se ouvir a fala das pessoas até o fim."
      },
      {
        "jp": "目上の人にそんな口の利き方をするものではない。",
        "romaji": "Meue no hito ni sonna kuchi no kikikata o suru mono de wa nai.",
        "pt": "Não se deve falar daquela maneira com pessoas mais velhas/superiores."
      }
    ]
  },
  {
    "title": "〜につれて / 〜にしたがって",
    "explanation": "Expressa que uma mudança acontece progressivamente em conjunto com outra. Quanto mais (A), mais (B) acontece.",
    "pattern": "動詞の辞書形 / 名詞 + につれて / にしたがって",
    "level": "N2",
    "examples": [
      {
        "jp": "時間が経つにつれて、彼女の気持ちも変わっていった。",
        "romaji": "Jikan ga tatsu ni tsurete, kanojo no kimochi mo kawatte itta.",
        "pt": "Conforme o tempo passava, os sentimentos dela também mudavam."
      },
      {
        "jp": "山が高くなるにしたがって、気温が下がった。",
        "romaji": "Yama ga takaku naru ni shitagatte, kion ga sagatta.",
        "pt": "Conforme a montanha ficava mais alta, a temperatura diminuía."
      }
    ]
  },
  {
    "title": "〜とともに",
    "explanation": "Significa 'junto com' ou 'ao mesmo tempo que'. Pode indicar que duas coisas acontecem simultaneamente ou que uma acontece em associação com a outra.",
    "pattern": "名詞 / 動詞の辞書形 + とともに",
    "level": "N2",
    "examples": [
      {
        "jp": "家族とともに、新しい家に引っ越した。",
        "romaji": "Kazoku to tomo ni, atarashii ie ni hikoshita.",
        "pt": "Junto com minha família, me mudei para uma casa nova."
      },
      {
        "jp": "経済が発展するとともに、環境問題も深刻になった。",
        "romaji": "Keizai ga hatten suru to tomo ni, kankyō mondai mo shinkoku ni natta.",
        "pt": "À medida que a economia se desenvolvia, os problemas ambientais também se tornaram sérios."
      }
    ]
  },
  {
    "title": "〜かねる",
    "explanation": "Expressa que é difícil ou impossível fazer algo, geralmente devido a motivos emocionais ou éticos, apesar da vontade de fazê-lo. É uma forma educada de recusar.",
    "pattern": "動詞のマス形 (ますを削除) + かねる",
    "level": "N2",
    "examples": [
      {
        "jp": "お客様のご要望には、お応えしかねます。",
        "romaji": "Okyaku-sama no go-yōbō ni wa, o-kotae shikanemasu.",
        "pt": "Não podemos atender aos pedidos dos clientes (é difícil atendê-los)."
      },
      {
        "jp": "個人的なことなので、ここではお話ししかねます。",
        "romaji": "Kojin-teki na koto na node, koko de wa o-hanashi shikanemasu.",
        "pt": "Como é algo pessoal, não posso falar sobre isso aqui."
      }
    ]
  },
  {
    "title": "〜得る / 〜得ない",
    "explanation": "Significa 'é possível fazer' (得る) ou 'não é possível fazer' (得ない). Indica a possibilidade ou impossibilidade de algo.",
    "pattern": "動詞のマス形 (ますを削除) + 得る / 得ない",
    "level": "N2",
    "examples": [
      {
        "jp": "この問題は、解決し得る。",
        "romaji": "Kono mondai wa, kaiketsu shi-uru.",
        "pt": "É possível resolver este problema."
      },
      {
        "jp": "そんなことはあり得ない。",
        "romaji": "Sonna koto wa ari-enai.",
        "pt": "Tal coisa é impossível (não pode acontecer)."
      }
    ]
  },
  {
    "title": "〜に基づいて / 〜に基づき",
    "explanation": "Significa 'baseado em' ou 'fundamentado em'. Indica que algo é feito ou estabelecido com base em uma fundação, regra ou dado.",
    "pattern": "名詞 + に基づいて / に基づき",
    "level": "N2",
    "examples": [
      {
        "jp": "この研究は、正確なデータに基づいて行われた。",
        "romaji": "Kono kenkyū wa, seikaku na dēta ni motozuite okonawareta.",
        "pt": "Esta pesquisa foi realizada com base em dados precisos."
      },
      {
        "jp": "法律に基づき、この決定がなされました。",
        "romaji": "Hōritsu ni motozuki, kono kettei ga nasaremashita.",
        "pt": "Esta decisão foi tomada com base na lei."
      }
    ]
  },
  {
    "title": "〜にわたって / 〜にわたり",
    "explanation": "Indica que algo se estende por toda uma determinada área, período de tempo ou gama. Significa 'por todo', 'ao longo de' ou 'durante'.",
    "pattern": "名詞 (期間、範囲) + にわたって / にわたり",
    "level": "N2",
    "examples": [
      {
        "jp": "会議は3時間にわたって行われた。",
        "romaji": "Kaigi wa san-jikan ni watatte okonawareta.",
        "pt": "A reunião foi realizada por três horas."
      },
      {
        "jp": "そのニュースは全国にわたって報じられた。",
        "romaji": "Sono nyūsu wa zenkoku ni watatte hōjirareta.",
        "pt": "Essa notícia foi divulgada por todo o país."
      }
    ]
  },
  {
    "title": "〜をめぐって / 〜をめぐる",
    "explanation": "Significa 'em torno de', 'em relação a' ou 'sobre'. Indica que um debate, discussão ou evento acontece tendo um determinado tópico ou questão como centro.",
    "pattern": "名詞 + をめぐって / をめぐる + 名詞",
    "level": "N2",
    "examples": [
      {
        "jp": "遺産をめぐって、親族間で争いが起こった。",
        "romaji": "Isan o megutte, shinzoku-kan de arasoi ga okotta.",
        "pt": "Uma disputa ocorreu entre os parentes em torno da herança."
      },
      {
        "jp": "その事件をめぐる報道が過熱している。",
        "romaji": "Sono jiken o meguru hōdō ga kanetsu shite iru.",
        "pt": "A cobertura da mídia em relação a esse incidente está esquentando."
      }
    ]
  },
  {
    "title": "〜からには",
    "explanation": "Significa 'já que', 'uma vez que'. Expressa que, dado uma determinada condição, uma certa ação ou responsabilidade é natural ou esperada.",
    "pattern": "普通形 (名詞/な形容詞 + である) + からには",
    "level": "N2",
    "examples": [
      {
        "jp": "約束したからには、守らなければならない。",
        "romaji": "Yakusoku shita kara ni wa, mamoranakereba naranai.",
        "pt": "Já que prometi, preciso cumprir."
      },
      {
        "jp": "リーダーであるからには、責任を持つべきだ。",
        "romaji": "Rīdā de aru kara ni wa, sekinin o motsu beki da.",
        "pt": "Já que é o líder, deve assumir a responsabilidade."
      }
    ]
  },
  {
    "title": "〜わけにはいかない / 〜わけにもいかない",
    "explanation": "Significa 'não posso/devo fazer (por motivos internos ou externos)' ou 'não posso evitar fazer (por motivos externos)'. Expressa uma impossibilidade moral, social ou prática.",
    "pattern": "動詞の辞書形 / 動詞のナイ形 + わけにはいかない / わけにもいかない",
    "level": "N2",
    "examples": [
      {
        "jp": "試験中なので、遊んでいるわけにはいかない。",
        "romaji": "Shiken-chū na node, asonde iru wake ni wa ikanai.",
        "pt": "Como é período de exames, não posso ficar brincando."
      },
      {
        "jp": "彼に頼まれたので、断るわけにもいかない。",
        "romaji": "Kare ni tanomareta node, kotowaru wake ni mo ikanai.",
        "pt": "Como ele me pediu, não posso recusar."
      }
    ]
  },
  {
    "title": "〜を抜きにしては",
    "explanation": "Significa 'sem (isso), não seria possível'. Expressa que uma determinada coisa é indispensável para que outra aconteça ou exista.",
    "pattern": "名詞 + を抜きにしては",
    "level": "N2",
    "examples": [
      {
        "jp": "彼の協力抜きにしては、このプロジェクトは成功しなかっただろう。",
        "romaji": "Kare no kyōryoku nuki ni shite wa, kono purojekuto wa seikō shinakatta darō.",
        "pt": "Sem a colaboração dele, este projeto não teria sido bem-sucedido."
      },
      {
        "jp": "家族の支え抜きにしては、ここまで来られなかった。",
        "romaji": "Kazoku no sasae nuki ni shite wa, koko made korarenakatta.",
        "pt": "Sem o apoio da minha família, eu não teria chegado até aqui."
      }
    ]
  },
  {
    "title": "〜を始め / 〜をはじめとして",
    "explanation": "Significa 'começando por', 'incluindo' ou 'especialmente'. Apresenta um exemplo representativo de uma lista de itens ou pessoas.",
    "pattern": "名詞 + を始め / をはじめとして",
    "level": "N2",
    "examples": [
      {
        "jp": "田中さんを始め、多くの人がパーティーに来た。",
        "romaji": "Tanaka-san o hajime, ooku no hito ga pātī ni kita.",
        "pt": "Começando pelo Sr. Tanaka, muitas pessoas vieram à festa."
      },
      {
        "jp": "東京をはじめとして、日本の大都市の物価は高い。",
        "romaji": "Tōkyō o hajime to shite, Nihon no daitoshi no bukka wa takai.",
        "pt": "Começando por Tóquio, o custo de vida nas grandes cidades do Japão é alto."
      }
    ]
  },
  {
    "title": "〜に限り / 〜に限って",
    "explanation": "Significa 'somente para', 'apenas no caso de'. Restringe uma ação ou situação a um grupo ou circunstância específica.",
    "pattern": "名詞 + に限り / に限って",
    "level": "N2",
    "examples": [
      {
        "jp": "このサービスは会員に限りご利用いただけます。",
        "romaji": "Kono sābisu wa kaiin ni kagiri go-riyō itadakemasu.",
        "pt": "Este serviço está disponível apenas para membros."
      },
      {
        "jp": "なぜか、私に限っていつも悪いことが起こる。",
        "romaji": "Nazeka, watashi ni kagitte itsumo warui koto ga okoru.",
        "pt": "Por algum motivo, só comigo coisas ruins sempre acontecem."
      }
    ]
  },
  {
    "title": "〜に他ならない",
    "explanation": "Significa 'nada mais é do que', 'não é outra coisa senão'. Enfatiza que algo é verdade e não há outra explicação ou causa.",
    "pattern": "名詞 + に他ならない",
    "level": "N2",
    "examples": [
      {
        "jp": "彼の成功は、努力の成果に他ならない。",
        "romaji": "Kare no seikō wa, doryoku no seika ni hoka naranai.",
        "pt": "O sucesso dele nada mais é do que o resultado de seu esforço."
      },
      {
        "jp": "この事実は、彼の無知に他ならない。",
        "romaji": "Kono jijitsu wa, kare no muchi ni hoka naranai.",
        "pt": "Este fato não é outra coisa senão a ignorância dele."
      }
    ]
  },
  {
    "title": "〜ばかりか",
    "explanation": "Significa 'não apenas... mas também'. Indica que algo não é apenas de uma maneira, mas também de outra, adicionando algo inesperado ou ainda mais significativo.",
    "pattern": "普通形 (名詞 + である) + ばかりか",
    "level": "N2",
    "examples": [
      {
        "jp": "彼は英語ばかりか、フランス語も話せる。",
        "romaji": "Kare wa Eigo bakari ka, Furansugo mo hanaseru.",
        "pt": "Ele não só fala inglês, mas também francês."
      },
      {
        "jp": "この料理は美味しいばかりか、体にも良い。",
        "romaji": "Kono ryōri wa oishii bakari ka, karada ni mo ii.",
        "pt": "Esta comida não só é deliciosa, mas também faz bem para a saúde."
      }
    ]
  },
  {
    "title": "〜はもちろん / 〜はもとより",
    "explanation": "Significa 'claro que' ou 'nem se fala de'. Indica que algo é óbvio, e além disso, outra coisa também é verdadeira ou válida.",
    "pattern": "名詞 + はもちろん / はもとより",
    "level": "N2",
    "examples": [
      {
        "jp": "お酒はもちろん、タバコもやめた。",
        "romaji": "Osake wa mochiron, tabako mo yameta.",
        "pt": "Claro que parei de beber, e também de fumar."
      },
      {
        "jp": "この製品は性能はもとより、デザインも優れている。",
        "romaji": "Kono seihin wa seinō wa motoyori, dezain mo sugurete iru.",
        "pt": "Este produto, claro que tem bom desempenho, e o design também é excelente."
      }
    ]
  },
  {
    "title": "〜にしたがって",
    "explanation": "Indica seguir uma ordem, instrução ou regra. Significa 'de acordo com' ou 'seguindo'.",
    "pattern": "動詞の辞書形/名詞＋にしたがって",
    "level": "N2",
    "examples": [
      {
        "jp": "説明書にしたがって、組み立ててください。",
        "romaji": "Setsumeisho ni shitagatte, kumitatete kudasai.",
        "pt": "Por favor, monte de acordo com o manual de instruções."
      },
      {
        "jp": "先生の指示にしたがって、練習しました。",
        "romaji": "Sensei no shiji ni shitagatte, renshū shimashita.",
        "pt": "Praticamos de acordo com as instruções do professor."
      }
    ]
  },
  {
    "title": "〜に反して",
    "explanation": "Significa 'ao contrário de' ou 'em oposição a'. Indica que algo é o oposto do esperado ou do que foi dito.",
    "pattern": "名詞＋に反して",
    "level": "N2",
    "examples": [
      {
        "jp": "予想に反して、試験は簡単だった。",
        "romaji": "Yosō ni hanshite, shiken wa kantan datta.",
        "pt": "Ao contrário do esperado, a prova foi fácil."
      },
      {
        "jp": "期待に反して、結果は良くなかった。",
        "romaji": "Kitai ni hanshite, kekka wa yokunakatta.",
        "pt": "Ao contrário das expectativas, o resultado não foi bom."
      }
    ]
  },
  {
    "title": "〜を問わず",
    "explanation": "Significa 'independentemente de' ou 'não importa'. Indica que algo se aplica a todos, sem distinção.",
    "pattern": "名詞＋を問わず",
    "level": "N2",
    "examples": [
      {
        "jp": "性別を問わず、応募を受け付けます。",
        "romaji": "Seibetsu o towazu, ōbo o uketsukemasu.",
        "pt": "Aceitamos inscrições independentemente do sexo."
      },
      {
        "jp": "経験の有無を問わず、大歓迎です。",
        "romaji": "Keiken no umu o towazu, dai kangei desu.",
        "pt": "São muito bem-vindos, independentemente da experiência."
      }
    ]
  },
  {
    "title": "〜にかかわらず",
    "explanation": "Significa 'independentemente de' ou 'não importa'. Semelhante a 〜を問わず, mas com foco em opções ou escolhas.",
    "pattern": "名詞＋にかかわらず",
    "level": "N2",
    "examples": [
      {
        "jp": "天候にかかわらず、明日のイベントは開催されます。",
        "romaji": "Tenkō ni kakawarazu, ashita no ibento wa kaisai saremasu.",
        "pt": "Independentemente do tempo, o evento de amanhã será realizado."
      },
      {
        "jp": "経験にかかわらず、誰でも参加できます。",
        "romaji": "Keiken ni kakawarazu, dare demo sanka dekimasu.",
        "pt": "Independentemente da experiência, qualquer um pode participar."
      }
    ]
  },
  {
    "title": "〜を通して / 〜を通じて",
    "explanation": "Significa 'através de' ou 'por meio de'. Indica que algo é feito ou acontece usando um meio ou canal.",
    "pattern": "名詞＋を通して/を通じて",
    "level": "N2",
    "examples": [
      {
        "jp": "インターネットを通して、世界中の情報が得られる。",
        "romaji": "Intānetto o tōshite, sekaijū no jōhō gaえられる.",
        "pt": "Através da internet, pode-se obter informações de todo o mundo."
      },
      {
        "jp": "友人を通じて、彼と知り合った。",
        "romaji": "Yūjin o tsūjite, kare to shiriatta.",
        "pt": "Eu o conheci através de um amigo."
      }
    ]
  },
  {
    "title": "〜に限らず",
    "explanation": "Significa 'não apenas' ou 'não limitado a'. Indica que algo não se restringe a um determinado caso, mas se aplica mais amplamente.",
    "pattern": "名詞＋に限らず",
    "level": "N2",
    "examples": [
      {
        "jp": "この店は週末に限らず、いつも混んでいる。",
        "romaji": "Kono mise wa shūmatsu ni kagirazu, itsumo konde iru.",
        "pt": "Esta loja está sempre lotada, não apenas nos fins de semana."
      },
      {
        "jp": "若者に限らず、幅広い年代の人に人気がある。",
        "romaji": "Wakamono ni kagirazu, habahiroi nendai no hito ni ninki ga aru.",
        "pt": "É popular não apenas entre os jovens, mas também entre pessoas de várias idades."
      }
    ]
  },
  {
    "title": "〜にわたって",
    "explanation": "Significa 'por toda a' ou 'ao longo de'. Indica que algo se estende por uma ampla área, período de tempo ou gama.",
    "pattern": "名詞＋にわたって",
    "level": "N2",
    "examples": [
      {
        "jp": "会議は3時間にわたって行われた。",
        "romaji": "Kaigi wa san jikan ni watatte okonawareta.",
        "pt": "A reunião durou por três horas."
      },
      {
        "jp": "この地震は広範囲にわたって被害をもたらした。",
        "romaji": "Kono jishin wa kōhani ni watatte higai o motarashita.",
        "pt": "Este terremoto causou danos em uma vasta área."
      }
    ]
  },
  {
    "title": "〜というものだ",
    "explanation": "Expressa uma conclusão, um julgamento ou uma opinião forte sobre algo, muitas vezes com um tom de surpresa ou crítica.",
    "pattern": "普通形＋というものだ",
    "level": "N2",
    "examples": [
      {
        "jp": "そんなことをするのは、子供だましというものだ。",
        "romaji": "Sonna koto o suru no wa, kodomo damashi to iu mono da.",
        "pt": "Fazer algo assim é enganar uma criança."
      },
      {
        "jp": "こんな簡単な問題が解けないなんて、もったいないというものだ。",
        "romaji": "Konna kantan na mondai ga tokenai nante, mottainai to iu mono da.",
        "pt": "Não conseguir resolver um problema tão fácil é um desperdício."
      }
    ]
  },
  {
    "title": "〜というものでもない",
    "explanation": "Expressa que uma afirmação não é totalmente verdade, nem se aplica a todas as situações. Significa 'não é que seja necessariamente'.",
    "pattern": "普通形＋というものでもない",
    "level": "N2",
    "examples": [
      {
        "jp": "努力すれば必ず成功するというものでもない。",
        "romaji": "Doryoku sureba kanarazu seikō suru to iu mono dewa nai.",
        "pt": "Não é que o esforço necessariamente leve ao sucesso."
      },
      {
        "jp": "日本語が話せれば、日本で生活できるというものでもない。",
        "romaji": "Nihongo ga hanasereba, Nihon de seikatsu dekiru to iu mono dewa nai.",
        "pt": "Não é que se você falar japonês, você necessariamente consiga viver no Japão."
      }
    ]
  },
  {
    "title": "〜に越したことはない",
    "explanation": "Significa que é melhor que algo aconteça ou que algo esteja em um determinado estado, mas não é uma obrigação.",
    "pattern": "動詞普通形・い形・な形＋に越したことはない",
    "level": "N2",
    "examples": [
      {
        "jp": "健康であることに越したことはない。",
        "romaji": "Kenkou de aru koto ni koshita koto wa nai.",
        "pt": "É melhor estar saudável."
      },
      {
        "jp": "安いに越したことはないが、品質も重要だ。",
        "romaji": "Yasui ni koshita koto wa nai ga, hinshitsu mo juuyou da.",
        "pt": "É melhor que seja barato, mas a qualidade também é importante."
      }
    ]
  },
  {
    "title": "〜までもない／〜までもなく",
    "explanation": "Indica que não há necessidade de fazer algo, pois é óbvio ou desnecessário.",
    "pattern": "動詞辞書形＋までもない／名詞＋までもなく",
    "level": "N2",
    "examples": [
      {
        "jp": "言うまでもなく、彼は天才だ。",
        "romaji": "Iu made mo naku, kare wa tensai da.",
        "pt": "Nem preciso dizer, ele é um gênio."
      },
      {
        "jp": "確認するまでもないことだ。",
        "romaji": "Kakunin suru made mo nai koto da.",
        "pt": "É algo que não precisa ser confirmado."
      }
    ]
  },
  {
    "title": "〜といったところだ",
    "explanation": "Indica que algo está em um certo nível ou grau, geralmente um nível médio ou máximo esperado.",
    "pattern": "名詞＋といったところだ",
    "level": "N2",
    "examples": [
      {
        "jp": "私の日本語は、日常会話ができるといったところだ。",
        "romaji": "Watashi no Nihongo wa, nichijou kaiwa ga dekiru to itta tokoro da.",
        "pt": "Meu japonês é, no máximo, capaz de ter uma conversa diária."
      },
      {
        "jp": "彼の収入は、月20万円といったところだろう。",
        "romaji": "Kare no shuunyuu wa, tsuki nijuuman-en to itta tokoro darou.",
        "pt": "A renda dele deve ser de cerca de 200.000 ienes por mês."
      }
    ]
  },
  {
    "title": "〜にもまして",
    "explanation": "Indica que algo é ainda mais do que o esperado ou do que algo anterior.",
    "pattern": "名詞＋にもまして",
    "level": "N2",
    "examples": [
      {
        "jp": "今日の暑さは昨日にもまして厳しい。",
        "romaji": "Kyou no atsusa wa kinou ni mo mashite kibishii.",
        "pt": "O calor de hoje é ainda mais intenso que o de ontem."
      },
      {
        "jp": "彼女の笑顔は、何にもまして美しい。",
        "romaji": "Kanojo no egao wa, nani ni mo mashite utsukushii.",
        "pt": "O sorriso dela é mais bonito do que qualquer outra coisa."
      }
    ]
  },
  {
    "title": "〜といったらない",
    "explanation": "Expressa um grau extremo de algo, além da descrição ou imaginação. Geralmente usado com sentimentos negativos.",
    "pattern": "名詞・い形・な形＋といったらない",
    "level": "N2",
    "examples": [
      {
        "jp": "彼のわがままさといったらない。",
        "romaji": "Kare no wagamama-sa to ittara nai.",
        "pt": "O egoísmo dele é indescritível."
      },
      {
        "jp": "この料理のおいしさといったらなかった。",
        "romaji": "Kono ryouri no oishisa to ittara nakatta.",
        "pt": "O quão deliciosa esta comida era, era indescritível."
      }
    ]
  },
  {
    "title": "〜を禁じ得ない",
    "explanation": "Significa que não se pode conter uma emoção ou sentimento, geralmente riso, lágrimas ou surpresa.",
    "pattern": "名詞＋を禁じ得ない",
    "level": "N2",
    "examples": [
      {
        "jp": "彼の真剣な顔を見て、笑いを禁じ得なかった。",
        "romaji": "Kare no shinken na kao o mite, warai o kinji enai katta.",
        "pt": "Ao ver o rosto sério dele, não pude conter o riso."
      },
      {
        "jp": "感動のあまり、涙を禁じ得なかった。",
        "romaji": "Kandou no amari, namida o kinji enai katta.",
        "pt": "Devido à emoção, não pude conter as lágrimas."
      }
    ]
  },
  {
    "title": "〜を余儀なくされる／〜を余儀なくさせる",
    "explanation": "Significa que se é forçado a fazer algo, ou que algo força a fazer algo.",
    "pattern": "名詞＋を余儀なくされる／名詞＋を余儀なくさせる",
    "level": "N2",
    "examples": [
      {
        "jp": "会社の倒産で、彼は転職を余儀なくされた。",
        "romaji": "Kaisha no tousan de, kare wa tenshoku o yogi naku sareta.",
        "pt": "Devido à falência da empresa, ele foi forçado a mudar de emprego."
      },
      {
        "jp": "突然の事故が、計画の変更を余儀なくさせた。",
        "romaji": "Totsuzen no jiko ga, keikaku no henkou o yogi naku saseta.",
        "pt": "O acidente repentino forçou a mudança dos planos."
      }
    ]
  },
  {
    "title": "〜にたる",
    "explanation": "Significa que algo é digno de, ou merecedor de. (Forma mais formal que 〜に値する)",
    "pattern": "動詞辞書形＋にたる／名詞＋にたる",
    "level": "N2",
    "examples": [
      {
        "jp": "彼の意見は、聞くにたるものだ。",
        "romaji": "Kare no iken wa, kiku ni taru mono da.",
        "pt": "A opinião dele é digna de ser ouvida."
      },
      {
        "jp": "信頼にたる人物。",
        "romaji": "Shinrai ni taru jinbutsu.",
        "pt": "Uma pessoa digna de confiança."
      }
    ]
  },
  {
    "title": "〜の至り",
    "explanation": "Expressa o auge ou o extremo de um sentimento ou estado, geralmente positivo e formal.",
    "pattern": "名詞＋の至り",
    "level": "N2",
    "examples": [
      {
        "jp": "このような素晴らしい賞をいただき、光栄の至りです。",
        "romaji": "Kono you na subarashii shou o itadaki, kouei no itari desu.",
        "pt": "Receber um prêmio tão maravilhoso é uma grande honra."
      },
      {
        "jp": "若気の至りで、無謀なことをしてしまった。",
        "romaji": "Wakage no itari de, mubou na koto o shite shimatta.",
        "pt": "Foi um excesso de juventude, acabei fazendo algo imprudente."
      }
    ]
  },
  {
    "title": "〜の極み",
    "explanation": "Expressa o auge ou o extremo de um sentimento ou estado, geralmente negativo e formal.",
    "pattern": "名詞＋の極み",
    "level": "N2",
    "examples": [
      {
        "jp": "彼の行動は、まさに傲慢の極みだ。",
        "romaji": "Kare no koudou wa, masa ni gouman no kiwami da.",
        "pt": "As ações dele são o auge da arrogância."
      },
      {
        "jp": "このような悲劇は、残念の極みです。",
        "romaji": "Kono you na higeki wa, zannen no kiwami desu.",
        "pt": "Uma tragédia como esta é o cúmulo da tristeza."
      }
    ]
  },
  {
    "title": "〜をものともせず",
    "explanation": "Significa que alguém faz algo sem se importar ou ser incomodado por uma dificuldade ou obstáculo.",
    "pattern": "名詞＋をものともせず",
    "level": "N2",
    "examples": [
      {
        "jp": "彼は病気をものともせず、仕事を続けた。",
        "romaji": "Kare wa byouki o mono to mo sezu, shigoto o tsuzuketa.",
        "pt": "Ele continuou trabalhando, sem se importar com a doença."
      },
      {
        "jp": "嵐をものともせず、船は進んだ。",
        "romaji": "Arashi o mono to mo sezu, fune wa susunda.",
        "pt": "O barco seguiu em frente, sem se intimidar com a tempestade."
      }
    ]
  },
  {
    "title": "〜をよそに",
    "explanation": "Significa que alguém age independentemente da situação ou dos sentimentos dos outros, sem se importar.",
    "pattern": "名詞＋をよそに",
    "level": "N2",
    "examples": [
      {
        "jp": "家族の心配をよそに、彼は旅に出た。",
        "romaji": "Kazoku no shinpai o yoso ni, kare wa tabi ni deta.",
        "pt": "Ignorando a preocupação da família, ele partiu em uma viagem."
      },
      {
        "jp": "周囲の反対をよそに、計画は実行された。",
        "romaji": "Shuui no hantai o yoso ni, keikaku wa jikkou sareta.",
        "pt": "Ignorando a oposição ao redor, o plano foi executado."
      }
    ]
  },
  {
    "title": "〜ではあるまいし",
    "explanation": "Significa 'não é como se fosse...' ou 'não é como se...'. Expressa a ideia de que algo não é adequado porque a situação não é como se pensa.",
    "pattern": "名詞＋ではあるまいし／動詞普通形＋ではあるまいし",
    "level": "N2",
    "examples": [
      {
        "jp": "子供ではあるまいし、そんなことで泣くな。",
        "romaji": "Kodomo de wa arumai shi, sonna koto de nakuna.",
        "pt": "Você não é criança, não chore por uma coisa dessas."
      },
      {
        "jp": "初心者ではあるまいし、これくらいのことはできるだろう。",
        "romaji": "Shoshinsha de wa arumai shi, kore kurai no koto wa dekiru darou.",
        "pt": "Você não é um iniciante, deve conseguir fazer algo assim."
      }
    ]
  },
  {
    "title": "〜にかまけて",
    "explanation": "Significa estar tão ocupado ou absorvido em algo que negligencia outras coisas importantes.",
    "pattern": "名詞＋にかまけて",
    "level": "N2",
    "examples": [
      {
        "jp": "仕事にかまけて、家族との時間をあまり取れなかった。",
        "romaji": "Shigoto ni kamakete, kazoku to no jikan o amari torenakatta.",
        "pt": "Absorvido pelo trabalho, não consegui passar muito tempo com a família."
      },
      {
        "jp": "遊びにかまけて、勉強がおろそかになった。",
        "romaji": "Asobi ni kamakete, benkyou ga orosoka ni natta.",
        "pt": "Fiquei tão focado em brincar que negligenciei os estudos."
      }
    ]
  },
  {
    "title": "〜をおいてほかにない",
    "explanation": "Significa 'não há outro além de...' ou 'o único...'. Expressa que a pessoa ou coisa é a única adequada para algo.",
    "pattern": "名詞＋をおいてほかにない",
    "level": "N2",
    "examples": [
      {
        "jp": "この仕事を任せられるのは、彼をおいてほかにない。",
        "romaji": "Kono shigoto o makaserareru no wa, kare o oite hoka ni nai.",
        "pt": "Não há ninguém além dele a quem se possa confiar este trabalho."
      },
      {
        "jp": "彼女の美しさは、世界中の誰をおいてもほかにない。",
        "romaji": "Kanojo no utsukushisa wa, sekaijuu no dare o oite mo hoka ni nai.",
        "pt": "A beleza dela é incomparável a qualquer outra pessoa no mundo."
      }
    ]
  },
  {
    "title": "〜なくしては",
    "explanation": "Significa 'sem... não se pode...' ou 'sem... não seria possível...'. Expressa que algo é indispensável para outra coisa.",
    "pattern": "名詞＋なくしては",
    "level": "N2",
    "examples": [
      {
        "jp": "あなたの協力なくしては、この計画は成功しなかっただろう。",
        "romaji": "Anata no kyouryoku naku shite wa, kono keikaku wa seikou shinakatta darou.",
        "pt": "Sem a sua cooperação, este plano não teria tido sucesso."
      },
      {
        "jp": "努力なくしては、目標達成はありえない。",
        "romaji": "Doryoku naku shite wa, mokuhyou tassei wa arienai.",
        "pt": "Sem esforço, alcançar o objetivo é impossível."
      }
    ]
  },
  {
    "title": "〜ずにはおかない",
    "explanation": "Significa que algo certamente acontecerá ou que alguém certamente fará algo, por influência ou inevitabilidade.",
    "pattern": "動詞ない形＋ずにはおかない",
    "level": "N2",
    "examples": [
      {
        "jp": "彼の冗談は、人々を笑わせずにはおかない。",
        "romaji": "Kare no joudan wa, hitobito o warawasezu ni wa okanai.",
        "pt": "As piadas dele fazem as pessoas rirem, inevitavelmente."
      },
      {
        "jp": "あの映画は、見る者の心を揺さぶらずにはおかないだろう。",
        "romaji": "Ano eiga wa, miru mono no kokoro o yusaburazu ni wa okanai darou.",
        "pt": "Aquele filme certamente irá emocionar o coração de quem o assistir."
      }
    ]
  },
  {
    "title": "〜をもって",
    "explanation": "Indica o meio, o instrumento ou o limite de tempo para fazer algo. (Formal)",
    "pattern": "名詞＋をもって",
    "level": "N2",
    "examples": [
      {
        "jp": "本日をもって、この店は閉店します。",
        "romaji": "Honjitsu o motte, kono mise wa heiten shimasu.",
        "pt": "A partir de hoje, esta loja fechará."
      },
      {
        "jp": "実力をもって勝負する。",
        "romaji": "Jitsuryoku o motte shoubu suru.",
        "pt": "Competir com base na sua própria capacidade."
      }
    ]
  },
  {
    "title": "〜に足りる",
    "explanation": "Significa que algo é suficiente para, ou que algo vale a pena. (Mais comum que 〜にたる)",
    "pattern": "動詞辞書形＋に足りる／名詞＋に足りる",
    "level": "N2",
    "examples": [
      {
        "jp": "彼の言葉は、信じるに足りる。",
        "romaji": "Kare no kotoba wa, shinjiru ni tariru.",
        "pt": "As palavras dele são dignas de crédito."
      },
      {
        "jp": "このデータは、結論を出すに足りる。",
        "romaji": "Kono deeta wa, ketsuron o dasu ni tariru.",
        "pt": "Esses dados são suficientes para tirar uma conclusão."
      }
    ]
  },
  {
    "title": "〜といえども",
    "explanation": "Significa 'mesmo que seja...' ou 'ainda que...'. Indica que, apesar de uma condição, o resultado é o contrário do esperado ou esperado de outra forma.",
    "pattern": "名詞・普通形＋といえども",
    "level": "N2",
    "examples": [
      {
        "jp": "ベテランといえども、油断はできない。",
        "romaji": "Beteran to iedomo, yudan wa dekinai.",
        "pt": "Mesmo sendo um veterano, não se pode descuidar."
      },
      {
        "jp": "子どもといえども、やってはいけないことと教えるべきだ。",
        "romaji": "Kodomo to iedomo, yatte wa ikenai koto to oshieru beki da.",
        "pt": "Mesmo sendo criança, deve-se ensinar o que não se deve fazer."
      }
    ]
  },
  {
    "title": "〜につれて",
    "explanation": "Expressa uma mudança gradual em algo que ocorre em paralelo com outra mudança.",
    "pattern": "動詞普通形・名詞＋につれて",
    "level": "N2",
    "examples": [
      {
        "jp": "時間が経つにつれて、寒くなってきた。",
        "romaji": "Jikan ga tatsu ni tsurete, samuku natte kita.",
        "pt": "À medida que o tempo passava, ficava mais frio."
      },
      {
        "jp": "年を取るにつれて、体力は衰える。",
        "romaji": "Toshi wo toru ni tsurete, tairyoku wa otorōeru.",
        "pt": "À medida que envelhecemos, a força física diminui."
      }
    ]
  },
  {
    "title": "〜ばかりだ",
    "explanation": "Indica uma tendência contínua de piora, similar a 一方だ, mas geralmente com um sentido mais negativo.",
    "pattern": "動詞辞書形＋ばかりだ",
    "level": "N2",
    "examples": [
      {
        "jp": "病状は悪くなるばかりだ。",
        "romaji": "Byōjō wa waruku naru bakari da.",
        "pt": "A condição da doença só piora."
      },
      {
        "jp": "ストレスが溜まるばかりで、何も良いことがない。",
        "romaji": "Sutoresu ga tamaru bakari de, nani mo yoi koto ga nai.",
        "pt": "Só acumulo estresse, e nada de bom acontece."
      }
    ]
  },
  {
    "title": "〜と同時に",
    "explanation": "Significa 'ao mesmo tempo que' ou 'juntamente com', indicando que duas ações ou estados ocorrem simultaneamente.",
    "pattern": "動詞辞書形・名詞＋と同時に",
    "level": "N2",
    "examples": [
      {
        "jp": "チャイムが鳴ると同時に、生徒たちは教室から飛び出した。",
        "romaji": "Chaimu ga naru to dōji ni, seito-tachi wa kyōshitsu kara tobīdashita.",
        "pt": "Ao mesmo tempo que o sinal tocou, os alunos correram para fora da sala de aula."
      },
      {
        "jp": "彼は社長であると同時に、優れた研究者でもある。",
        "romaji": "Kare wa shachō de aru to dōji ni, sugureta kenkyūsha de mo aru.",
        "pt": "Ele é presidente e, ao mesmo tempo, um excelente pesquisador."
      }
    ]
  },
  {
    "title": "〜かわりに",
    "explanation": "Significa 'em vez de' ou 'em troca de', indicando uma substituição ou um sacrifício por algo.",
    "pattern": "動詞辞書形・名詞＋の＋かわりに",
    "level": "N2",
    "examples": [
      {
        "jp": "車で来るかわりに、電車で行きました。",
        "romaji": "Kuruma de kuru kawari ni, densha de ikimashita.",
        "pt": "Em vez de vir de carro, fui de trem."
      },
      {
        "jp": "忙しいかわりに、給料が高い。",
        "romaji": "Isogashii kawari ni, kyūryō ga takai.",
        "pt": "Em troca de ser ocupado, o salário é alto."
      }
    ]
  },
  {
    "title": "〜に沿って",
    "explanation": "Significa 'ao longo de' ou 'de acordo com', indicando que algo segue uma linha, um plano ou uma regra.",
    "pattern": "名詞＋に沿って",
    "level": "N2",
    "examples": [
      {
        "jp": "川に沿って歩いた。",
        "romaji": "Kawa ni sotte aruita.",
        "pt": "Caminhei ao longo do rio."
      },
      {
        "jp": "会社の規則に沿って行動してください。",
        "romaji": "Kaisha no kisoku ni sotte kōdō shite kudasai.",
        "pt": "Por favor, aja de acordo com as regras da empresa."
      }
    ]
  },
  {
    "title": "〜ないこともない",
    "explanation": "Significa 'não é que não seja' ou 'não é impossível', indicando uma possibilidade fraca ou uma concessão.",
    "pattern": "動詞ない形＋こともない",
    "level": "N2",
    "examples": [
      {
        "jp": "努力すれば、合格できないこともない。",
        "romaji": "Doryoku sureba, gōkaku dekinai koto mo nai.",
        "pt": "Se você se esforçar, não é impossível passar."
      },
      {
        "jp": "彼の意見も理解できないこともない。",
        "romaji": "Kare no iken mo rikai dekinai koto mo nai.",
        "pt": "Não é que eu não consiga entender a opinião dele."
      }
    ]
  },
  {
    "title": "〜ないではいられない",
    "explanation": "Significa 'não consigo evitar fazer' ou 'tenho que fazer', expressando uma forte necessidade ou desejo de fazer algo.",
    "pattern": "動詞ない形＋ではいられない",
    "level": "N2",
    "examples": [
      {
        "jp": "彼の話を聞くと、笑わないではいられない。",
        "romaji": "Kare no hanashi wo kiku to, warawanai de wa irarenai.",
        "pt": "Ao ouvir a história dele, não consigo evitar rir."
      },
      {
        "jp": "好きな音楽を聴いていると、歌わないではいられない。",
        "romaji": "Suki na ongaku wo kiite iru to, utawanai de wa irarenai.",
        "pt": "Quando ouço a música que gosto, não consigo evitar cantar."
      }
    ]
  },
  {
    "title": "〜ざるを得ない",
    "explanation": "Significa 'não ter escolha a não ser fazer' ou 'ser obrigado a fazer', indicando uma ação que precisa ser tomada por força de circunstâncias.",
    "pattern": "動詞ない形（ないを除く）＋ざるを得ない （する → せざるを得ない）",
    "level": "N2",
    "examples": [
      {
        "jp": "仕事が忙しくて、残業せざるを得ない。",
        "romaji": "Shigoto ga isogashikute, zangyō sezaru wo enai.",
        "pt": "Estou ocupado com o trabalho, então sou obrigado a fazer hora extra."
      },
      {
        "jp": "この状況では、計画を変更せざるを得ない。",
        "romaji": "Kono jōkyō de wa, keikaku wo henkō sezaru wo enai.",
        "pt": "Nesta situação, somos obrigados a mudar o plano."
      }
    ]
  },
  {
    "title": "〜ものだから",
    "explanation": "Porque (razão para uma desculpa ou justificação). Usado para explicar a razão de algo, muitas vezes com um tom de desculpa ou justificativa.",
    "pattern": "普通形 (名詞・な形は「な」)＋ものだから",
    "level": "N2",
    "examples": [
      {
        "jp": "昨日、熱があったものだから、学校を休んでしまいました。",
        "romaji": "Kinō, netsu ga atta mono dakara, gakkō o yasunde shimaimashita.",
        "pt": "Ontem, como eu estava com febre, faltei à escola."
      },
      {
        "jp": "渋滞していたものだから、遅れてしまいました。",
        "romaji": "Jūtai shite ita mono dakara, okurete shimaimashita.",
        "pt": "Como estava engarrafado, acabei me atrasando."
      }
    ]
  },
  {
    "title": "〜ものがある",
    "explanation": "Há algo (de um certo sentimento ou característica). Expressa a existência de um certo sentimento ou característica em algo.",
    "pattern": "動詞の辞書形/い形容詞の辞書形/な形容詞語幹＋ものがある",
    "level": "N2",
    "examples": [
      {
        "jp": "彼の話は感動するものがある。",
        "romaji": "Kare no hanashi wa kandō suru mono ga aru.",
        "pt": "A história dele tem algo de emocionante."
      },
      {
        "jp": "この絵には不思議なものがある。",
        "romaji": "Kono e ni wa fushigina mono ga aru.",
        "pt": "Há algo misterioso nesta pintura."
      }
    ]
  },
  {
    "title": "〜ことか / 〜ことだろう",
    "explanation": "Quão (enfatiza um sentimento forte). Usado para expressar um sentimento forte de admiração, surpresa, emoção, etc.",
    "pattern": "疑問詞＋普通形＋ことか / ことだろう",
    "level": "N2",
    "examples": [
      {
        "jp": "どれほどこの日を待ち望んだことか！",
        "romaji": "Dore hodo kono hi o machinozonda koto ka!",
        "pt": "O quanto eu esperei por este dia!"
      },
      {
        "jp": "どれほど助かったことだろう。",
        "romaji": "Dore hodo tasukatta koto darō.",
        "pt": "O quanto fui ajudado!"
      }
    ]
  },
  {
    "title": "〜ことだから",
    "explanation": "Porque (é uma pessoa ou coisa como tal). Usado para expressar uma suposição ou inferência com base no caráter ou natureza de alguém/algo.",
    "pattern": "名詞＋のことだから",
    "level": "N2",
    "examples": [
      {
        "jp": "彼のことだから、きっと成功するだろう。",
        "romaji": "Kare no koto dakara, kitto seikō suru darō.",
        "pt": "Como é ele, com certeza terá sucesso."
      },
      {
        "jp": "真面目な彼女のことだから、心配ないだろう。",
        "romaji": "Majime na kanojo no koto dakara, shinpai nai darō.",
        "pt": "Como ela é diligente, não deve haver preocupação."
      }
    ]
  },
  {
    "title": "〜ことなく",
    "explanation": "Sem fazer (algo). Expressa que uma ação foi realizada sem a ocorrência de outra ação.",
    "pattern": "動詞の辞書形＋ことなく",
    "level": "N2",
    "examples": [
      {
        "jp": "彼は一度も休むことなく仕事を続けた。",
        "romaji": "Kare wa ichido mo yasumu koto naku shigoto o tsuzuketa.",
        "pt": "Ele continuou a trabalhar sem nunca descansar."
      },
      {
        "jp": "彼は誰にも相談することなく、留学を決めた。",
        "romaji": "Kare wa dare ni mo sōdan suru koto naku, ryūgaku o kimeta.",
        "pt": "Ele decidiu estudar no exterior sem consultar ninguém."
      }
    ]
  },
  {
    "title": "〜ものの",
    "explanation": "Embora (mas). Indica uma concessão, ou seja, que algo é verdade, mas há uma ressalva ou um resultado inesperado.",
    "pattern": "普通形 (名詞は「である」/な形容詞は「である」)＋ものの",
    "level": "N2",
    "examples": [
      {
        "jp": "彼は勉強したものの、テストは不合格だった。",
        "romaji": "Kare wa benkyō shita mono no, tesuto wa fugōkaku datta.",
        "pt": "Embora ele tenha estudado, ele falhou no teste."
      },
      {
        "jp": "春になったものの、まだ寒い日が続いている。",
        "romaji": "Haru ni natta mono no, mada samui hi ga tsuzuite iru.",
        "pt": "Embora tenha chegado a primavera, os dias frios ainda continuam."
      }
    ]
  },
  {
    "title": "〜ものなら",
    "explanation": "Se fosse possível (gostaria de fazer). Expressa um desejo forte de fazer algo, sabendo que é difícil ou impossível.",
    "pattern": "動詞の可能形＋ものなら",
    "level": "N2",
    "examples": [
      {
        "jp": "できるものなら、もう一度あの頃に戻りたい。",
        "romaji": "Dekiru mono nara, mō ichido ano koro ni modoritai.",
        "pt": "Se fosse possível, eu gostaria de voltar àquela época mais uma vez."
      },
      {
        "jp": "あの人に会えるものなら、ぜひ会って謝りたい。",
        "romaji": "Ano hito ni aeru mono nara, zehi atte ayamaritai.",
        "pt": "Se eu pudesse encontrar aquela pessoa, eu gostaria de encontrá-la e me desculpar."
      }
    ]
  },
  {
    "title": "〜かと思うと / 〜かと思ったら",
    "explanation": "Assim que (imediatamente depois). Indica que uma ação ou evento acontece imediatamente após outro, muitas vezes de forma inesperada.",
    "pattern": "動詞のた形＋かと思うと / かと思ったら",
    "level": "N2",
    "examples": [
      {
        "jp": "彼は部屋に入ってきたかと思うと、すぐに電話をかけ始めた。",
        "romaji": "Kare wa heya ni haitte kita ka to omou to, sugu ni denwa o kake hajimeta.",
        "pt": "Assim que ele entrou no quarto, ele imediatamente começou a ligar."
      },
      {
        "jp": "雨が降ったかと思ったら、すぐにやんだ。",
        "romaji": "Ame ga futta ka to omottara, sugu ni yanda.",
        "pt": "Assim que choveu, parou imediatamente."
      }
    ]
  },
  {
    "title": "〜か〜ないかのうちに",
    "explanation": "Mal (mal tinha feito algo quando...). Expressa que uma ação mal foi concluída quando outra ação ou evento ocorreu quase simultaneamente.",
    "pattern": "動詞の辞書形＋か＋動詞のない形＋かのうちに",
    "level": "N2",
    "examples": [
      {
        "jp": "彼はベッドに入るか入らないかのうちに、眠ってしまった。",
        "romaji": "Kare wa beddo ni hairu ka hairanai ka no uchi ni, nemutte shimatta.",
        "pt": "Mal ele entrou na cama, ele adormeceu."
      },
      {
        "jp": "ベルが鳴るか鳴らないかのうちに、子供たちは教室を飛び出した。",
        "romaji": "Beru ga naru ka naranai ka no uchi ni, kodomo-tachi wa kyōshitsu o tobīdashita.",
        "pt": "Mal a campainha tocou, as crianças saíram correndo da sala de aula."
      }
    ]
  },
  {
    "title": "〜のみならず",
    "explanation": "Não só (mas também). Semelhante a 〜ばかりか, mas com um tom um pouco mais formal. Indica que algo é verdade, e ainda mais, outra coisa também é verdade.",
    "pattern": "普通形 (名詞・な形は「である」も可)＋のみならず",
    "level": "N2",
    "examples": [
      {
        "jp": "彼は学力のみならず、人間性も優れている。",
        "romaji": "Kare wa gakuryoku nomi narazu, ningensei mo sugurete iru.",
        "pt": "Ele não só é excelente academicamente, mas também tem uma ótima personalidade."
      },
      {
        "jp": "この問題は日本のみならず、世界中で大きな課題となっている。",
        "romaji": "Kono mondai wa Nihon nomi narazu, sekaijū de ōkina kadai to natte iru.",
        "pt": "Este problema não é apenas no Japão, mas também se tornou um grande desafio em todo o mundo."
      }
    ]
  },
  {
    "title": "〜はおろか",
    "explanation": "Nem mesmo (muito menos). Indica que uma coisa óbvia não é possível, então outra coisa menos provável é ainda mais impossível.",
    "pattern": "名詞＋はおろか",
    "level": "N2",
    "examples": [
      {
        "jp": "彼は漢字はおろか、ひらがなも書けない。",
        "romaji": "Kare wa kanji wa oroka, hiragana mo kakenai.",
        "pt": "Ele não pode nem escrever hiragana, muito menos kanji."
      },
      {
        "jp": "その店は定休日におろか、平日でも閉まっていることが多い。",
        "romaji": "Sono mise wa teikyūbi ni oroka, heijitsu demo shimatte iru koto ga ōi.",
        "pt": "Aquela loja, nem mesmo nos dias de folga, mas muitas vezes está fechada mesmo nos dias de semana."
      }
    ]
  },
  {
    "title": "〜ようがない / 〜ようもない",
    "explanation": "Não há como (fazer algo). Indica que não há um método, maneira ou possibilidade de realizar uma ação.",
    "pattern": "動詞のます形＋ようがない / ようもない",
    "level": "N2",
    "examples": [
      {
        "jp": "この状況では、どうすることもできない。",
        "romaji": "Kono jōkyō de wa, dō suru koto mo dekinai.",
        "pt": "Nesta situação, não há como fazer nada."
      },
      {
        "jp": "彼の気持ちは、言葉では表現しようがない。",
        "romaji": "Kare no kimochi wa, kotoba de wa hyōgen shiyō ga nai.",
        "pt": "Os sentimentos dele são impossíveis de expressar em palavras."
      }
    ]
  },
  {
    "title": "〜に至る",
    "explanation": "Significa 'chegar a um ponto' ou 'culminar em'. Indica que uma situação progrediu até um certo estágio.",
    "pattern": "動辞書形／名 ＋ に至る",
    "level": "N2",
    "examples": [
      {
        "jp": "議論は夜遅くまで続き、ついに解決に至った。",
        "romaji": "Giron wa yoru osoku made tsuzuki, tsui ni kaiketsu ni itatta.",
        "pt": "A discussão continuou até tarde da noite e finalmente chegou a uma solução."
      },
      {
        "jp": "彼女は努力の末、夢を実現するに至った。",
        "romaji": "Kanojo wa doryoku no sue, yume o jitsugen suru ni itatta.",
        "pt": "Após muito esforço, ela conseguiu realizar seu sonho."
      }
    ]
  },
  {
    "title": "〜にかかわる",
    "explanation": "Significa 'estar relacionado a' ou 'afetar'. Indica que algo tem uma ligação importante com outra coisa.",
    "pattern": "名 ＋ にかかわる",
    "level": "N2",
    "examples": [
      {
        "jp": "これは会社の将来にかかわる重要な問題だ。",
        "romaji": "Kore wa kaisha no shōrai ni kakawaru jūyō na mondai da.",
        "pt": "Este é um problema importante que afeta o futuro da empresa."
      },
      {
        "jp": "彼の発言は、我々の名誉にかかわる。",
        "romaji": "Kare no hatsugen wa, wareware no meiyo ni kakawaru.",
        "pt": "A declaração dele afeta nossa honra."
      }
    ]
  },
  {
    "title": "〜にしろ／にせよ",
    "explanation": "Significa 'quer seja... quer seja...' ou 'mesmo que'. Usado para apresentar duas ou mais possibilidades, indicando que o resultado é o mesmo independentemente da escolha.",
    "pattern": "動普通形／い形い／な形な／名 ＋ にしろ／にせよ",
    "level": "N2",
    "examples": [
      {
        "jp": "行くにしろ行かないにしろ、連絡は必要だ。",
        "romaji": "Iku ni shiro ikanai ni shiro, renraku wa hitsuyō da.",
        "pt": "Vá ou não vá, o contato é necessário."
      },
      {
        "jp": "良いにせよ悪いにせよ、結果を受け入れるしかない。",
        "romaji": "Yoi ni seyo warui ni seyo, kekka o ukeireru shika nai.",
        "pt": "Seja bom ou ruim, não há outra opção a não ser aceitar o resultado."
      }
    ]
  },
  {
    "title": "〜に過ぎない",
    "explanation": "Significa 'não passar de' ou 'meramente'. Expressa que algo é apenas um certo grau ou quantidade, sem maior importância.",
    "pattern": "動普通形／名 ＋ に過ぎない",
    "level": "N2",
    "examples": [
      {
        "jp": "それは単なるうわさに過ぎない。",
        "romaji": "Sore wa tan'naru uwasa ni suginai.",
        "pt": "Isso não passa de um boato."
      },
      {
        "jp": "彼はまだ学生に過ぎない。",
        "romaji": "Kare wa mada gakusei ni suginai.",
        "pt": "Ele não passa de um estudante ainda."
      }
    ]
  },
  {
    "title": "〜に基づき／に基づいて",
    "explanation": "Significa 'baseado em' ou 'de acordo com'. Indica a base ou fundamento para uma ação ou julgamento.",
    "pattern": "名 ＋ に基づき／に基づいて",
    "level": "N2",
    "examples": [
      {
        "jp": "この計画は、最新のデータに基づいて作られた。",
        "romaji": "Kono keikaku wa, saishin no dēta ni motodzuite tsukurareta.",
        "pt": "Este plano foi feito com base nos dados mais recentes."
      },
      {
        "jp": "法律に基づき、正しく判断しなければならない。",
        "romaji": "Hōritsu ni motodzuki, tadashiku handan shinakereba naranai.",
        "pt": "Devemos julgar corretamente com base na lei."
      }
    ]
  },
  {
    "title": "〜にほかならない",
    "explanation": "Significa 'não é nada além de' ou 'nada mais do que'. Usado para enfatizar a verdadeira natureza de algo.",
    "pattern": "名 ＋ にほかならない",
    "level": "N2",
    "examples": [
      {
        "jp": "彼の成功は、努力のたまものにほかならない。",
        "romaji": "Kare no seikō wa, doryoku no tamashii ni hokanaranai.",
        "pt": "O sucesso dele não é nada além do fruto de seu esforço."
      },
      {
        "jp": "この状況は、彼の無責任さにほかならない。",
        "romaji": "Kono jōkyō wa, kare no musekinin-sa ni hokanaranai.",
        "pt": "Essa situação não é nada além da irresponsabilidade dele."
      }
    ]
  },
  {
    "title": "〜を込めて",
    "explanation": "Significa 'com' ou 'cheio de'. Indica que uma ação é realizada com um certo sentimento ou emoção.",
    "pattern": "名 ＋ を込めて",
    "level": "N2",
    "examples": [
      {
        "jp": "心を込めて手紙を書いた。",
        "romaji": "Kokoro o komete tegami o kaita.",
        "pt": "Escrevi a carta com todo o meu coração."
      },
      {
        "jp": "感謝の気持ちを込めて、プレゼントを贈った。",
        "romaji": "Kansha no kimochi o komete, purezento o okutta.",
        "pt": "Dei um presente com um sentimento de gratidão."
      }
    ]
  },
  {
    "title": "〜を機に",
    "explanation": "Significa 'aproveitando a oportunidade de' ou 'tomando algo como ponto de partida'. Indica que algo é usado como gatilho para uma nova ação.",
    "pattern": "名 ＋ を機に",
    "level": "N2",
    "examples": [
      {
        "jp": "転職を機に、新しい趣味を始めた。",
        "romaji": "Tenshoku o ki ni, atarashii shumi o hajimeta.",
        "pt": "Aproveitando a oportunidade de mudar de emprego, comecei um novo hobby."
      },
      {
        "jp": "大学入学を機に、一人暮らしを始めた。",
        "romaji": "Daigaku nyūgaku o ki ni, hitori gurashi o hajimeta.",
        "pt": "Aproveitando a oportunidade de entrar na universidade, comecei a morar sozinho."
      }
    ]
  },
  {
    "title": "〜を皮切りに",
    "explanation": "Significa 'começando com' ou 'tendo como ponto de partida'. Indica o primeiro item de uma série de eventos semelhantes.",
    "pattern": "名 ＋ を皮切りに",
    "level": "N2",
    "examples": [
      {
        "jp": "東京公演を皮切りに、全国ツアーが始まった。",
        "romaji": "Tōkyō kōen o kawagiri ni, zenkoku tsuā ga hajimatta.",
        "pt": "Começando com a apresentação em Tóquio, a turnê nacional teve início."
      },
      {
        "jp": "彼女のヒット曲を皮切りに、次々と人気曲が生まれた。",
        "romaji": "Kanojo no hitto kyoku o kawagiri ni, tsugitsugi to ninki kyoku ga umareta.",
        "pt": "Começando com o sucesso dela, uma após a outra, canções populares nasceram."
      }
    ]
  },
  {
    "title": "〜を最中に",
    "explanation": "Significa 'no meio de' ou 'no auge de'. Indica que algo acontece durante a ocorrência de outra coisa, muitas vezes de forma inesperada.",
    "pattern": "動ている形／名 ＋ の最中に",
    "level": "N2",
    "examples": [
      {
        "jp": "会議の最中に、突然電話が鳴った。",
        "romaji": "Kaigi no saichū ni, totsuzen denwa ga natta.",
        "pt": "No meio da reunião, o telefone tocou de repente."
      },
      {
        "jp": "食事の最中に、来客があった。",
        "romaji": "Shokuji no saichū ni, raikyaku ga atta.",
        "pt": "No meio da refeição, tivemos uma visita."
      }
    ]
  },
  {
    "title": "〜を境に",
    "explanation": "Significa 'a partir de' ou 'desde'. Indica um ponto de virada após o qual algo muda significativamente.",
    "pattern": "名 ＋ を境に",
    "level": "N2",
    "examples": [
      {
        "jp": "あの事件を境に、彼の人生は大きく変わった。",
        "romaji": "Ano jiken o sakai ni, kare no jinsei wa ookiku kawatta.",
        "pt": "A partir daquele incidente, a vida dele mudou drasticamente."
      },
      {
        "jp": "高校卒業を境に、故郷を離れた。",
        "romaji": "Kōkō sotsugyō o sakai ni, kokyō o hanareta.",
        "pt": "A partir da formatura do ensino médio, ele deixou sua cidade natal."
      }
    ]
  },
  {
    "title": "〜といい〜といい",
    "explanation": "Significa 'tanto... quanto...' ou 'seja... seja...'. Usado para apresentar dois ou mais exemplos que ilustram uma característica comum.",
    "pattern": "名 ＋ といい ＋ 名 ＋ といい",
    "level": "N2",
    "examples": [
      {
        "jp": "彼の部屋は、広さといい、景色といい、素晴らしい。",
        "romaji": "Kare no heya wa, hirosa to ii, keshiki to ii, subarashii.",
        "pt": "O quarto dele, tanto em termos de espaço quanto de vista, é maravilhoso."
      },
      {
        "jp": "味といい、値段といい、このレストランは最高だ。",
        "romaji": "Aji to ii, nedan to ii, kono resutoran wa saikō da.",
        "pt": "Tanto em termos de sabor quanto de preço, este restaurante é o melhor."
      }
    ]
  },
  {
    "title": "〜とあいまって",
    "explanation": "Significa 'juntamente com' ou 'em combinação com'. Indica que dois ou mais fatores se combinam para produzir um resultado.",
    "pattern": "名 ＋ とあいまって",
    "level": "N2",
    "examples": [
      {
        "jp": "彼の努力と才能とが相まって、成功を収めた。",
        "romaji": "Kare no doryoku to sainō to ga aimatte, seikō o osameta.",
        "pt": "O esforço dele, juntamente com seu talento, resultou em sucesso."
      },
      {
        "jp": "美しい景色と新鮮な空気とが相まって、最高の旅行になった。",
        "romaji": "Utsukushii keshiki to shinsen na kūki to ga aimatte, saikō no ryokō ni natta.",
        "pt": "A bela paisagem e o ar fresco, juntos, fizeram da viagem a melhor."
      }
    ]
  },
  {
    "title": "〜とばかりに",
    "explanation": "Significa 'como se dissesse' ou 'como se quisesse mostrar'. Expressa que a ação de alguém dá a entender algo, sem que seja explicitamente dito.",
    "pattern": "動普通形／い形い／な形な／名 ＋ とばかりに",
    "level": "N2",
    "examples": [
      {
        "jp": "「もう結構だ」とばかりに、彼は席を立った。",
        "romaji": "'Mō kekkō da' to bakari ni, kare wa seki o tatta.",
        "pt": "Como se dissesse 'já chega', ele se levantou da cadeira."
      },
      {
        "jp": "「早く食べろ」とばかりに、母は私を急かした。",
        "romaji": "'Hayaku tabero' to bakari ni, haha wa watashi o sekashita.",
        "pt": "Como se dissesse 'coma logo', minha mãe me apressou."
      }
    ]
  },
  {
    "title": "〜に即して",
    "explanation": "De acordo com, em conformidade com. Usado para indicar que algo está em linha com uma regra, realidade ou situação.",
    "pattern": "名詞 ＋ に即して",
    "level": "N2",
    "examples": [
      {
        "jp": "事実に基づいて、事件を調査した。",
        "romaji": "Jijitsu ni motodzuite, jiken o chōsa shita.",
        "pt": "Investigamos o incidente com base nos fatos."
      },
      {
        "jp": "現場の状況に即して、対応を考える。",
        "romaji": "Genba no jōkyō ni sokushite, taiō o kangaeru.",
        "pt": "Pensar em como responder de acordo com a situação no local."
      }
    ]
  },
  {
    "title": "〜に至るまで",
    "explanation": "Até mesmo (chegar a um ponto extremo). Expressa que algo abrange um grande escopo, incluindo um item específico ou um ponto extremo.",
    "pattern": "名詞 ＋ に至るまで",
    "level": "N2",
    "examples": [
      {
        "jp": "彼女は料理の準備から片付けに至るまで、全てを一人でこなした。",
        "romaji": "Kanojo wa ryōri no junbi kara katazuke ni itaru made, subete o hitori de konashita.",
        "pt": "Ela fez tudo sozinha, desde a preparação da comida até a limpeza."
      },
      {
        "jp": "子供から大人に至るまで、多くの人々がそのイベントを楽しんだ。",
        "romaji": "Kodomo kara otona ni itaru made, ōku no hitobito ga sono ibento o tanoshinda.",
        "pt": "Muitas pessoas, de crianças a adultos, desfrutaram do evento."
      }
    ]
  },
  {
    "title": "〜を余儀なくされる",
    "explanation": "Ser forçado a, ser obrigado a. Indica que uma situação força alguém a fazer algo contra sua vontade.",
    "pattern": "名詞 ＋ を余儀なくされる",
    "level": "N2",
    "examples": [
      {
        "jp": "会社の倒産により、彼は退職を余儀なくされた。",
        "romaji": "Kaisha no tōsan ni yori, kare wa taishoku o yoginaku sareta.",
        "pt": "Devido à falência da empresa, ele foi forçado a se demitir."
      },
      {
        "jp": "悪天候のため、試合は中止を余儀なくされた。",
        "romaji": "Akutenkō no tame, shiai wa chūshi o yoginaku sareta.",
        "pt": "Devido ao mau tempo, o jogo foi forçado a ser cancelado."
      }
    ]
  },
  {
    "title": "〜を皮切りに（して）",
    "explanation": "Começando com, tomando (algo) como ponto de partida. Indica o início de uma série de eventos ou ações.",
    "pattern": "名詞 ＋ を皮切りに（して）",
    "level": "N2",
    "examples": [
      {
        "jp": "このイベントは東京を皮切りに、全国各地で開催される。",
        "romaji": "Kono ibento wa Tōkyō o kawakiri ni, zenkoku kaku chi de kaisai sareru.",
        "pt": "Este evento será realizado em todo o país, começando por Tóquio."
      },
      {
        "jp": "彼のデビュー曲を皮切りに、次々とヒット曲を生み出した。",
        "romaji": "Kare no debyūkyoku o kawakiri ni, tsugi tsugi to hitto kyoku o umi dashita.",
        "pt": "A partir da sua música de estreia, ele produziu uma série de sucessos."
      }
    ]
  },
  {
    "title": "〜を他所に",
    "explanation": "Ignorando, sem se importar com (a situação alheia). Sinônimo de 〜をよそに, enfatiza o distanciamento da situação.",
    "pattern": "名詞 ＋ を他所に",
    "level": "N2",
    "examples": [
      {
        "jp": "周りの心配を他所に、彼は自分の道を進んだ。",
        "romaji": "Mawari no shinpai o yoso ni, kare wa jibun no michi o susunda.",
        "pt": "Ignorando a preocupação dos outros, ele seguiu seu próprio caminho."
      },
      {
        "jp": "政府の批判を他所に、その企業は新たな事業を開始した。",
        "romaji": "Seifu no hihan o yoso ni, sono kigyō wa arata na jigyō o kaishi shita.",
        "pt": "Ignorando as críticas do governo, aquela empresa iniciou um novo negócio."
      }
    ]
  },
  {
    "title": "〜を顧みず",
    "explanation": "Sem se importar com, sem levar em conta. Usado quando alguém faz algo sem considerar as consequências ou o perigo.",
    "pattern": "名詞 ＋ を顧みず",
    "level": "N2",
    "examples": [
      {
        "jp": "彼は危険を顧みず、子供を助け出した。",
        "romaji": "Kare wa kiken o kaerimizu, kodomo o tasukedashita.",
        "pt": "Ele resgatou a criança sem se importar com o perigo."
      },
      {
        "jp": "自分の健康を顧みず、彼は働き続けた。",
        "romaji": "Jibun no kenkō o kaerimizu, kare wa hataraki tsuzuketa.",
        "pt": "Sem se importar com a própria saúde, ele continuou a trabalhar."
      }
    ]
  },
  {
    "title": "〜を踏まえて",
    "explanation": "Com base em, levando em consideração. Indica que uma decisão ou ação é tomada após analisar uma situação ou informação.",
    "pattern": "名詞 ＋ を踏まえて",
    "level": "N2",
    "examples": [
      {
        "jp": "これまでの経験を踏まえて、新しい計画を立てる。",
        "romaji": "Kore made no keiken o fumaete, atarashii keikaku o tateru.",
        "pt": "Com base nas experiências anteriores, farei um novo plano."
      },
      {
        "jp": "お客様のご意見を踏まえて、サービスを改善します。",
        "romaji": "Okyaku-sama no go-iken o fumaete, sābisu o kaizen shimasu.",
        "pt": "Melhoraremos o serviço levando em consideração as opiniões dos clientes."
      }
    ]
  },
  {
    "title": "〜はさておき",
    "explanation": "Deixando de lado, para não falar de. Indica que um tópico é deixado de lado momentaneamente para focar em outro.",
    "pattern": "名詞 ＋ はさておき",
    "level": "N2",
    "examples": [
      {
        "jp": "冗談はさておき、本題に入りましょう。",
        "romaji": "Jōdan wa sateoki, hondai ni hairimashō.",
        "pt": "Deixando as brincadeiras de lado, vamos ao assunto principal."
      },
      {
        "jp": "金額はさておき、品質はとても良い。",
        "romaji": "Kingaku wa sateoki, hinshitsu wa totemo yoi.",
        "pt": "Deixando o preço de lado, a qualidade é muito boa."
      }
    ]
  },
  {
    "title": "〜はともかく（として）",
    "explanation": "Independentemente de, deixando de lado. Similar a 〜はさておき, mas pode ter um tom mais de 'não é tão importante quanto'.",
    "pattern": "名詞 ＋ はともかく（として）",
    "level": "N2",
    "examples": [
      {
        "jp": "味はともかく、この料理は見た目が悪い。",
        "romaji": "Aji wa tomokaku, kono ryōri wa mitame ga warui.",
        "pt": "Independentemente do sabor, a aparência deste prato é ruim."
      },
      {
        "jp": "値段はともかく、このデザインは素晴らしい。",
        "romaji": "Nedan wa tomokaku, kono dezain wa subarashii.",
        "pt": "Deixando o preço de lado, este design é maravilhoso."
      }
    ]
  },
  {
    "title": "〜は否めない",
    "explanation": "É inegável que, não se pode negar que. Expressa a certeza de que algo é verdade, mesmo que possa ser negativo.",
    "pattern": "普通形 ＋ は否めない",
    "level": "N2",
    "examples": [
      {
        "jp": "彼の努力は認めるが、結果が出なかったことは否めない。",
        "romaji": "Kare no doryoku wa mitomeru ga, kekka ga denakatta koto wa inamenai.",
        "pt": "Admito o esforço dele, mas é inegável que não houve resultados."
      },
      {
        "jp": "多少のミスはあったが、彼の貢献は否めない事実だ。",
        "romaji": "Tashō no misu wa atta ga, kare no kōken wa inamenai jijitsu da.",
        "pt": "Houve alguns erros, mas sua contribuição é um fato inegável."
      }
    ]
  },
  {
    "title": "〜ばこそ",
    "explanation": "É precisamente porque (causa forte). Enfatiza fortemente a razão ou motivo para uma ação ou resultado.",
    "pattern": "動詞仮定形・い形容詞仮定形・な形容詞なら・名詞であれば ＋ ばこそ",
    "level": "N2",
    "examples": [
      {
        "jp": "愛していればこそ、厳しいことも言う。",
        "romaji": "Aishiteireba koso, kibishii koto mo iu.",
        "pt": "É precisamente porque amo, que digo coisas duras."
      },
      {
        "jp": "努力したればこそ、合格できたのだ。",
        "romaji": "Doryoku shitareba koso, gōkaku dekita no da.",
        "pt": "Foi precisamente porque me esforcei que consegui passar."
      }
    ]
  },
  {
    "title": "〜てやまない",
    "explanation": "Expressa um desejo ou sentimento forte e contínuo, sem cessar. Indica que o falante sente aquilo profundamente.",
    "pattern": "動詞て形 + やまない",
    "level": "N1",
    "examples": [
      {
        "jp": "彼の成功を願ってやまない。",
        "romaji": "Kare no seikō o negatte yamanai.",
        "pt": "Eu desejo ardentemente o sucesso dele."
      },
      {
        "jp": "故郷への思いは募ってやまない。",
        "romaji": "Kokyō e no omoi wa tsunotte yamanai.",
        "pt": "Meus sentimentos pela minha cidade natal crescem sem parar."
      }
    ]
  },
  {
    "title": "〜まみれ",
    "explanation": "Indica que algo está completamente coberto ou sujo com a coisa especificada. Geralmente usado para coisas indesejáveis ou negativas.",
    "pattern": "名詞 + まみれ",
    "level": "N1",
    "examples": [
      {
        "jp": "彼は泥まみれになって帰ってきた。",
        "romaji": "Kare wa doro mamire ni natte kaette kita.",
        "pt": "Ele voltou para casa todo sujo de lama."
      },
      {
        "jp": "汗まみれで練習に励んだ。",
        "romaji": "Ase mamire de renshū ni hagenda.",
        "pt": "Ele se esforçou no treino, todo coberto de suor."
      }
    ]
  },
  {
    "title": "〜にあたって / にあたり",
    "explanation": "Significa 'ao fazer', 'por ocasião de'. Usado para indicar uma ocasião ou oportunidade importante, geralmente formal.",
    "pattern": "名詞 + にあたって / にあたり ; 動詞辞書形 + にあたって / にあたり",
    "level": "N1",
    "examples": [
      {
        "jp": "新しい事業を始めるにあたって、ご挨拶申し上げます。",
        "romaji": "Atarashii jigyō o hajimeru ni atatte, goaisatsu mōshiagemasu.",
        "pt": "Ao iniciar um novo negócio, gostaria de fazer um pronunciamento."
      },
      {
        "jp": "卒業にあたり、先生方に感謝の言葉を述べたい。",
        "romaji": "Sotsugyō ni atari, senseigata ni kansha no kotoba o nobetsutai.",
        "pt": "Por ocasião da formatura, gostaria de expressar minha gratidão aos professores."
      }
    ]
  },
  {
    "title": "〜をものともせずに",
    "explanation": "Significa 'desafiando', 'apesar de'. Indica que alguém faz algo com grande dificuldade ou obstáculo, sem se deixar abater.",
    "pattern": "名詞 + をものともせずに",
    "level": "N1",
    "examples": [
      {
        "jp": "彼は病気をものともせずに研究を続けた。",
        "romaji": "Kare wa byōki o monotomo sezuni kenkyū o tsuzuketa.",
        "pt": "Ele continuou sua pesquisa apesar de sua doença."
      },
      {
        "jp": "嵐をものともせずに、船は航海を続けた。",
        "romaji": "Arashi o monotomo sezuni, fune wa kōkai o tsuzuketa.",
        "pt": "O navio continuou sua viagem, desafiando a tempestade."
      }
    ]
  },
  {
    "title": "〜にかこつけて",
    "explanation": "Significa 'sob o pretexto de', 'usando como desculpa'. Indica que alguém usa um motivo aparente para fazer algo, geralmente com segundas intenções.",
    "pattern": "名詞 + にかこつけて",
    "level": "N1",
    "examples": [
      {
        "jp": "彼は仕事にかこつけて、彼女に会っていた。",
        "romaji": "Kare wa shigoto ni kakotsukete, kanojo ni atte ita.",
        "pt": "Ele estava encontrando a namorada usando o trabalho como desculpa."
      },
      {
        "jp": "病気にかこつけて、会議を欠席した。",
        "romaji": "Byōki ni kakotsukete, kaigi o kesseki shita.",
        "pt": "Ele faltou à reunião sob o pretexto de doença."
      }
    ]
  },
  {
    "title": "〜とあっては",
    "explanation": "Significa 'se for o caso de', 'dado que'. Expressa que, em uma situação particular, não há outra opção a não ser agir de uma certa forma.",
    "pattern": "普通形 + とあっては",
    "level": "N1",
    "examples": [
      {
        "jp": "子供の頼みとあっては、断れない。",
        "romaji": "Kodomo no tanomi to atte wa, kotowarenai.",
        "pt": "Se for o pedido de uma criança, não posso recusar."
      },
      {
        "jp": "皆が反対するとあっては、計画を変更せざるを得ない。",
        "romaji": "Mina ga hantai suru to atte wa, keikaku o henkō sezaruoenai.",
        "pt": "Dado que todos se opõem, somos forçados a mudar o plano."
      }
    ]
  },
  {
    "title": "〜と相まって",
    "explanation": "Significa 'combinado com', 'juntamente com'. Indica que duas coisas se unem para criar um efeito ou resultado específico.",
    "pattern": "名詞 + と相まって",
    "level": "N1",
    "examples": [
      {
        "jp": "美しい景色と相まって、音楽がさらに心に響いた。",
        "romaji": "Utsukushii keshiki to aimatte, ongaku ga sarani kokoro ni hibiita.",
        "pt": "Combinada com a bela paisagem, a música ressoou ainda mais em meu coração."
      },
      {
        "jp": "努力と運が相まって、成功を収めた。",
        "romaji": "Doryoku to un ga aimatte, seikō o osameta.",
        "pt": "Esforço e sorte combinados resultaram em sucesso."
      }
    ]
  },
  {
    "title": "〜につけ",
    "explanation": "Significa 'toda vez que', 'sempre que'. Indica que um certo evento ou sentimento ocorre sempre que uma determinada situação acontece.",
    "pattern": "動詞辞書形 + につけ ; 名詞 + につけ",
    "level": "N1",
    "examples": [
      {
        "jp": "この曲を聞くにつけ、故郷を思い出す。",
        "romaji": "Kono kyoku o kiku ni tsuke, kokyō o omoidasu.",
        "pt": "Toda vez que ouço esta música, lembro-me da minha cidade natal."
      },
      {
        "jp": "嬉しいにつけ悲しいにつけ、彼はいつも私のそばにいた。",
        "romaji": "Ureshii ni tsuke kanashii ni tsuke, kare wa itsumo watashi no soba ni ita.",
        "pt": "Seja na alegria ou na tristeza, ele sempre esteve ao meu lado."
      }
    ]
  },
  {
    "title": "〜にひきかえ",
    "explanation": "Significa 'em contraste com', 'em oposição a'. Usado para comparar duas situações e enfatizar a diferença.",
    "pattern": "名詞 + にひきかえ ; 普通形 + のにひきかえ",
    "level": "N1",
    "examples": [
      {
        "jp": "兄は社交的なのにひきかえ、弟は内気だ。",
        "romaji": "Ani wa shakōteki nanoni hikikae, otōto wa uchiki da.",
        "pt": "Em contraste com o irmão mais velho que é sociável, o irmão mais novo é tímido."
      },
      {
        "jp": "昨日の晴天にひきかえ、今日は大雨だ。",
        "romaji": "Kinō no seiten ni hikikae, kyō wa ōame da.",
        "pt": "Em contraste com o céu limpo de ontem, hoje é uma chuva forte."
      }
    ]
  },
  {
    "title": "〜を余儀なくされる / 余儀なくさせる",
    "explanation": "Significa 'ser forçado a' (余儀なくされる) ou 'forçar a' (余儀なくさせる). Indica que não há outra escolha a não ser fazer algo, devido a uma situação externa.",
    "pattern": "名詞 + を余儀なくされる / 余儀なくさせる",
    "level": "N1",
    "examples": [
      {
        "jp": "彼は病気のため、引退を余儀なくされた。",
        "romaji": "Kare wa byōki no tame, intai o yoginaku sareta.",
        "pt": "Ele foi forçado a se aposentar devido à doença."
      },
      {
        "jp": "悪天候が試合の中止を余儀なくさせた。",
        "romaji": "Akutenkō ga shiai no chūshi o yoginaku saseta.",
        "pt": "O mau tempo forçou o cancelamento do jogo."
      }
    ]
  },
  {
    "title": "〜もさることながら",
    "explanation": "Significa 'não só... mas também', 'embora... seja verdade, o mais importante é'. Indica que um item é importante, mas outro é ainda mais.",
    "pattern": "名詞 + もさることながら",
    "level": "N1",
    "examples": [
      {
        "jp": "デザインもさることながら、機能性も優れている。",
        "romaji": "Dezain mo saru koto nagara, kinōsei mo sugurete iru.",
        "pt": "Não só o design, mas a funcionalidade também é excelente."
      },
      {
        "jp": "味もさることながら、値段も手頃だ。",
        "romaji": "Aji mo saru koto nagara, nedan mo tegoro da.",
        "pt": "Não só o sabor, mas o preço também é razoável."
      }
    ]
  },
  {
    "title": "〜ごとき / 〜ごとく",
    "explanation": "Significa 'como' ou 'assim como', geralmente usado para comparações poéticas ou formais. Também pode ser pejorativo.",
    "pattern": "名詞 + ごとき / 動詞基本形 + ごとく",
    "level": "N1",
    "examples": [
      {
        "jp": "夢のごとき日々が過ぎ去った。",
        "romaji": "Yume no gotoki hibi ga sugisatta.",
        "pt": "Dias como um sonho se passaram."
      },
      {
        "jp": "彼のごとき愚か者には何を言っても無駄だ。",
        "romaji": "Kare no gotoki orokamono ni wa nani o itte mo muda da.",
        "pt": "É inútil dizer qualquer coisa a um tolo como ele."
      }
    ]
  },
  {
    "title": "〜ならいざしらず",
    "explanation": "Significa 'se fosse... até entenderia, mas...', indicando que uma situação é aceitável, mas outra não.",
    "pattern": "名詞 / 動詞基本形 + ならいざしらず",
    "level": "N1",
    "examples": [
      {
        "jp": "子供ならいざしらず、大人なのにこんなことをするなんて信じられない。",
        "romaji": "Kodomo nara iza shirazu, otona na noni konna koto o suru nante shinjirarenai.",
        "pt": "Se fosse uma criança, até entenderia, mas sendo um adulto, não consigo acreditar que faça uma coisa dessas."
      },
      {
        "jp": "昔ならいざしらず、今はインターネットで何でも調べられる。",
        "romaji": "Mukashi nara iza shirazu, ima wa intānetto de nan demo shiraberareru.",
        "pt": "Se fosse antigamente, até entenderia, mas agora pode-se pesquisar qualquer coisa na internet."
      }
    ]
  },
  {
    "title": "〜までもない / 〜までもなく",
    "explanation": "Significa 'não há necessidade de' ou 'sem a necessidade de', indicando que algo é óbvio ou desnecessário.",
    "pattern": "動詞基本形 + までもない / 名詞 + までもなく",
    "level": "N1",
    "examples": [
      {
        "jp": "言うまでもなく、彼が一番だ。",
        "romaji": "Iu made mo naku, kare ga ichiban da.",
        "pt": "É óbvio, ele é o melhor."
      },
      {
        "jp": "説明するまでもなく、誰でもわかることだ。",
        "romaji": "Setsumei suru made mo naku, dare demo wakaru koto da.",
        "pt": "Não há necessidade de explicar, qualquer um entende."
      }
    ]
  },
  {
    "title": "〜ていては",
    "explanation": "Significa 'se continuar fazendo isso, não será bom' ou 'se essa situação persistir...', expressando uma condição negativa e as suas consequências.",
    "pattern": "動詞て形 + いては",
    "level": "N1",
    "examples": [
      {
        "jp": "こんなにだらだらしていては、間に合わないよ。",
        "romaji": "Konna ni daradara shite ite wa, maniawanai yo.",
        "pt": "Se continuar a vadiar assim, não vai chegar a tempo."
      },
      {
        "jp": "このままでは、目標達成は難しいだろう。",
        "romaji": "Kono mama de wa, mokuhyō tassei wa muzukashii darō.",
        "pt": "Se continuar assim, será difícil atingir o objetivo."
      }
    ]
  },
  {
    "title": "〜こととて",
    "explanation": "Significa 'porque (é a situação de)', 'já que', usado para dar uma razão ou desculpa de forma um pouco mais formal.",
    "pattern": "名詞 + のこととて / 動詞基本形 + こととて",
    "level": "N1",
    "examples": [
      {
        "jp": "初めてのこととて、多少の失敗は許されるだろう。",
        "romaji": "Hajimete no koto tote, tashō no shippai wa yurusareru darō.",
        "pt": "Já que é a primeira vez, alguns pequenos erros serão perdoados."
      },
      {
        "jp": "子供のこととて、悪気はないのだろう。",
        "romaji": "Kodomo no koto tote, warugi wa nai no darō.",
        "pt": "Como é uma criança, provavelmente não há malícia."
      }
    ]
  },
  {
    "title": "〜と言わず〜と言わず",
    "explanation": "Significa 'não importa A ou B', 'tanto A quanto B', indicando que algo se aplica a uma variedade de coisas, abrangendo extremos.",
    "pattern": "名詞A + と言わず + 名詞B + と言わず",
    "level": "N1",
    "examples": [
      {
        "jp": "朝と言わず夜と言わず、いつも勉強している。",
        "romaji": "Asa to iwazu yoru to iwazu, itsumo benkyō shite iru.",
        "pt": "Tanto de manhã quanto de noite, ele está sempre a estudar."
      },
      {
        "jp": "男と言わず女と言わず、皆がそのニュースに驚いた。",
        "romaji": "Otoko to iwazu onna to iwazu, mina ga sono nyūsu ni odoroita.",
        "pt": "Tanto homens quanto mulheres, todos ficaram surpresos com a notícia."
      }
    ]
  },
  {
    "title": "〜べくして",
    "explanation": "Significa 'como era de se esperar', 'naturalmente', indicando que um resultado era inevitável ou predestinado.",
    "pattern": "動詞基本形 + べくして (ない形は使えない)",
    "level": "N1",
    "examples": [
      {
        "jp": "彼は努力を重ねた。成功するべくして成功したのだ。",
        "romaji": "Kare wa doryoku o kasaneta. Seikō suru beku shite seikō shita no da.",
        "pt": "Ele se esforçou muito. O sucesso dele era inevitável."
      },
      {
        "jp": "多くの問題があった。破綻するべくして破綻した。",
        "romaji": "Ōku no mondai ga atta. Hatan suru beku shite hatan shita.",
        "pt": "Havia muitos problemas. O fracasso era inevitável."
      }
    ]
  },
  {
    "title": "〜でなくてなんだろう",
    "explanation": "Significa 'o que mais poderia ser senão...?', expressando que algo é definitivamente uma determinada coisa, sem dúvida.",
    "pattern": "名詞 + でなくてなんだろう",
    "level": "N1",
    "examples": [
      {
        "jp": "これが愛でなくてなんだろう。",
        "romaji": "Kore ga ai de nakute nandarō.",
        "pt": "O que mais poderia ser isso senão amor?"
      },
      {
        "jp": "彼の行動は、まさに勇気でなくてなんだろうか。",
        "romaji": "Kare no kōdō wa, masa ni yūki de nakute nandarō ka.",
        "pt": "As ações dele, o que mais poderiam ser senão pura coragem?"
      }
    ]
  },
  {
    "title": "〜といったらありはしない",
    "explanation": "Significa 'é extremamente', 'não há limite para', usado para expressar um grau extremo de uma qualidade ou sentimento negativo.",
    "pattern": "形容詞い形 + といったらありはしない / な形容詞語幹 + といったらありはしない",
    "level": "N1",
    "examples": [
      {
        "jp": "あの時の彼の態度といったらありはしない。",
        "romaji": "Ano toki no kare no taido to ittara ari wa shinai.",
        "pt": "A atitude dele naquela hora era inacreditável de tão ruim."
      },
      {
        "jp": "テストの点数が悪くて、がっかりするといったらありはしない。",
        "romaji": "Tesuto no tensū ga warukute, gakkari suru to ittara ari wa shinai.",
        "pt": "A nota do teste foi ruim, e o meu desapontamento é indescritível."
      }
    ]
  },
  {
    "title": "〜にしては",
    "explanation": "Significa 'para ser...', 'considerando que é...', expressando que algo é inesperado em relação à sua condição ou característica.",
    "pattern": "名詞 / 動詞基本形 + にしては",
    "level": "N1",
    "examples": [
      {
        "jp": "彼は子供にしてはよく知っている。",
        "romaji": "Kare wa kodomo ni shite wa yoku shitte iru.",
        "pt": "Para ser uma criança, ele sabe muito bem."
      },
      {
        "jp": "初めてにしては、上手にできたね。",
        "romaji": "Hajimete ni shite wa, jōzu ni dekita ne.",
        "pt": "Para a primeira vez, fizeste bem, não?"
      }
    ]
  },
  {
    "title": "〜に至って / 〜に至っては",
    "explanation": "Significa 'quando a situação chegou a...', 'quando a coisa chegou a esse ponto', indicando um estágio final ou crítico.",
    "pattern": "名詞 / 動詞基本形 + に至って / に至っては",
    "level": "N1",
    "examples": [
      {
        "jp": "事ここに至っては、もう後戻りはできない。",
        "romaji": "Koto koko ni itatte wa, mō atomodori wa dekinai.",
        "pt": "Quando a situação chegou a este ponto, não há mais como voltar atrás."
      },
      {
        "jp": "病気が悪化するに至って、手術を決意した。",
        "romaji": "Byōki ga akka suru ni itatte, shujutsu o ketsui shita.",
        "pt": "Quando a doença piorou, decidi fazer a cirurgia."
      }
    ]
  },
  {
    "title": "〜を限りに",
    "explanation": "Significa 'até o limite de', 'no último... de', indicando o fim de um período ou o último momento de algo.",
    "pattern": "名詞 (時間・場所) + を限りに",
    "level": "N1",
    "examples": [
      {
        "jp": "本日を限りに、閉店いたします。",
        "romaji": "Honjitsu o kagiri ni, heiten itashimasu.",
        "pt": "A partir de hoje, fecharemos a loja."
      },
      {
        "jp": "この大会を限りに引退します。",
        "romaji": "Kono taikai o kagiri ni intai shimasu.",
        "pt": "A partir deste torneio, vou reformar-me."
      }
    ]
  },
  {
    "title": "〜たるもの",
    "explanation": "Significa 'como alguém que é X', 'se você é X', indicando a qualidade ou responsabilidade esperada de tal pessoa.",
    "pattern": "名詞 + たるもの",
    "level": "N1",
    "examples": [
      {
        "jp": "医者たるもの、患者の命を最優先に考えるべきだ。",
        "romaji": "Isha taru mono, kanja no inochi o sai yūsen ni kangaeru beki da.",
        "pt": "Como médico, deve-se considerar a vida do paciente a principal prioridade."
      },
      {
        "jp": "社会人たるもの、TPOをわきまえる必要がある。",
        "romaji": "Shakaijin taru mono, TPO o wakimaeru hitsuyō ga aru.",
        "pt": "Como membro da sociedade, é necessário saber se portar de acordo com a ocasião."
      }
    ]
  },
  {
    "title": "〜に足らない",
    "explanation": "Significa 'não é suficiente para X', 'não vale a pena X'. É o oposto de 〜に足りる.",
    "pattern": "動詞辞書形 / 名詞 + に足らない",
    "level": "N1",
    "examples": [
      {
        "jp": "そんな小さなことで悩むに足らない。",
        "romaji": "Son'na chiisana koto de nayamu ni taranai.",
        "pt": "Não vale a pena se preocupar com uma coisa tão pequena."
      },
      {
        "jp": "彼の意見は聞くに足らない。",
        "romaji": "Kare no iken wa kiku ni taranai.",
        "pt": "A opinião dele não vale a pena ser ouvida."
      }
    ]
  },
  {
    "title": "〜を余儀なくされる / 〜を余儀なくさせる",
    "explanation": "Significa 'ser forçado a X', 'ser obrigado a X' (ser). A forma 'させる' significa 'forçar X a alguém'.",
    "pattern": "名詞 + を余儀なくされる / 動詞辞書形 + ことを余儀なくさせる",
    "level": "N1",
    "examples": [
      {
        "jp": "会社の倒産により、彼は転職を余儀なくされた。",
        "romaji": "Kaisha no tōsan ni yori, kare wa tenshoku o yoginaku sareta.",
        "pt": "Devido à falência da empresa, ele foi forçado a mudar de emprego."
      },
      {
        "jp": "悪天候が試合の中止を余儀なくさせた。",
        "romaji": "Akutenkō ga shiai no chūshi o yoginaku saseta.",
        "pt": "O mau tempo forçou o cancelamento da partida."
      }
    ]
  },
  {
    "title": "〜ないまでも",
    "explanation": "Significa 'mesmo que não chegue a X', 'se não for X, pelo menos Y'. Indica um limite ou um mínimo aceitável.",
    "pattern": "動詞ない形 + までも",
    "level": "N1",
    "examples": [
      {
        "jp": "合格しないまでも、精一杯頑張りたい。",
        "romaji": "Gōkaku shinai made mo, seiippai ganbaritai.",
        "pt": "Mesmo que eu não seja aprovado, quero dar o meu melhor."
      },
      {
        "jp": "全部読めないまでも、大事なところだけでも読んでおこう。",
        "romaji": "Zenbu yomenai made mo, daiji na tokoro dake demo yonde okō.",
        "pt": "Mesmo que eu não consiga ler tudo, lerei pelo menos as partes importantes."
      }
    ]
  },
  {
    "title": "〜とあって",
    "explanation": "Significa 'como era X', 'visto que era X'. Apresenta uma razão ou circunstância especial que leva a uma determinada situação.",
    "pattern": "普通形 (名詞/な形容詞は「だ」が付かない) + とあって",
    "level": "N1",
    "examples": [
      {
        "jp": "今日は休日とあって、公園は多くの人で賑わっていた。",
        "romaji": "Kyō wa kyūjitsu to atte, kōen wa ōku no hito de nigiwatte ita.",
        "pt": "Como hoje era feriado, o parque estava lotado de pessoas."
      },
      {
        "jp": "子供のすることとあって、大目に見てやってください。",
        "romaji": "Kodomo no suru koto to atte, ōme ni mite yatte kudasai.",
        "pt": "Visto que é coisa de criança, por favor, seja mais tolerante."
      }
    ]
  },
  {
    "title": "〜をおして",
    "explanation": "Significa 'apesar de X', 'contrariando X'. Indica que algo é feito contra uma condição desfavorável ou uma regra.",
    "pattern": "名詞 + をおして",
    "level": "N1",
    "examples": [
      {
        "jp": "彼は多忙をおして、ボランティア活動に参加した。",
        "romaji": "Kare wa tabō o oshite, borantia katsudō ni sanka shita.",
        "pt": "Apesar da sua agenda lotada, ele participou de atividades voluntárias."
      },
      {
        "jp": "医師の忠告をおして、旅行に出かけた。",
        "romaji": "Ishi no chūkoku o oshite, ryokō ni dekaketa.",
        "pt": "Contrariando o conselho do médico, ele foi viajar."
      }
    ]
  },
  {
    "title": "〜だに",
    "explanation": "Significa 'até mesmo X', 'apenas X já'. Enfatiza que uma pequena ação ou menção de algo já é suficiente para causar uma emoção ou efeito.",
    "pattern": "動詞辞書形 / 名詞 + だに",
    "level": "N1",
    "examples": [
      {
        "jp": "夢にだに思わなかったことが現実になった。",
        "romaji": "Yume ni dani omowanakatta koto ga genjitsu ni natta.",
        "pt": "Algo que eu nem sonhava se tornou realidade."
      },
      {
        "jp": "聞くだに恐ろしい話だ。",
        "romaji": "Kiku dani osoroshii hanashi da.",
        "pt": "É uma história assustadora só de ouvir."
      }
    ]
  },
  {
    "title": "〜べくもない",
    "explanation": "Significa 'não há como X', 'não é possível X'. Expressa que uma ação ou situação é impossível ou altamente improvável.",
    "pattern": "動詞辞書形 + べくもない",
    "level": "N1",
    "examples": [
      {
        "jp": "今の彼には、成功は望むべくもない。",
        "romaji": "Ima no kare ni wa, seikō wa nozomu beku mo nai.",
        "pt": "Para ele agora, o sucesso não é nem um pouco provável."
      },
      {
        "jp": "このような状況では、平和な解決は期待するべくもない。",
        "romaji": "Kono yō na jōkyō de wa, heiwa na kaiketsu wa kitai suru beku mo nai.",
        "pt": "Nesta situação, não há como esperar uma solução pacífica."
      }
    ]
  },
  {
    "title": "〜かたがた",
    "explanation": "Significa 'aproveitando a oportunidade para X', 'fazendo X e Y ao mesmo tempo'. Indica que se realiza uma ação e, no mesmo processo, outra.",
    "pattern": "名詞 + かたがた",
    "level": "N1",
    "examples": [
      {
        "jp": "散歩がてら、郵便局へ立ち寄った。",
        "romaji": "Sanpo gatara, yūbinkyoku e tachiyotta.",
        "pt": "Aproveitando o passeio, passei nos correios."
      },
      {
        "jp": "お礼かたがた、ご挨拶に伺いました。",
        "romaji": "Orei katagata, goaisatsu ni ukagaimashita.",
        "pt": "Aproveitando para agradecer, vim cumprimentá-lo."
      }
    ]
  },
  {
    "title": "〜ともなると / 〜ともなれば",
    "explanation": "Significa 'quando se trata de X', 'se chegar a X'. Indica que uma situação muda ou se torna mais séria ou complexa ao atingir um certo nível ou estágio.",
    "pattern": "名詞 + ともなると / ともなれば",
    "level": "N1",
    "examples": [
      {
        "jp": "プロともなると、技術だけでなく精神力も問われる。",
        "romaji": "Puro tomo naru to, gijutsu dake naku seishinryoku mo towareru.",
        "pt": "Quando se trata de um profissional, não só a técnica, mas também a força mental é exigida."
      },
      {
        "jp": "夏休みともなれば、海水浴場は多くの人で賑わう。",
        "romaji": "Natsuyasumi tomo nareba, kaisuiyokujō wa ōku no hito de nigiwau.",
        "pt": "Quando chega a temporada de férias de verão, a praia fica lotada de pessoas."
      }
    ]
  },
  {
    "title": "〜なり",
    "explanation": "Significa 'assim que/logo que (aconteceu)', indicando uma ação imediata após outra, ou 'fazer algo como (se fosse) um (determinado) estado'. Também pode indicar 'seja (isto) ou seja (aquilo)'.",
    "pattern": "動詞の辞書形＋なり／名詞＋なり",
    "level": "N1",
    "examples": [
      {
        "jp": "彼はコーヒーを一口飲むなり、吐き出してしまった。",
        "romaji": "Kare wa kōhī o hitokuchi nomu nari, hakidashite shimatta.",
        "pt": "Assim que ele deu um gole no café, ele o cuspiu."
      },
      {
        "jp": "彼女は私を見るなり、笑い出した。",
        "romaji": "Kanojo wa watashi o miru nari, warai dashita.",
        "pt": "Assim que ela me viu, começou a rir."
      }
    ]
  },
  {
    "title": "〜まじき",
    "explanation": "Significa 'não deve ser (tal coisa)' ou 'imperdoável para (tal coisa)'. Expressa um forte sentimento de que algo é inapropriado ou inaceitável para uma determinada pessoa ou situação.",
    "pattern": "動詞の辞書形＋まじき＋名詞",
    "level": "N1",
    "examples": [
      {
        "jp": "プロの選手として、あのような発言は許すまじき行為だ。",
        "romaji": "Puro no senshu to shite, ano yō na hatsugen wa yurusu majiki kōi da.",
        "pt": "Como atleta profissional, aquela declaração é um ato imperdoável."
      },
      {
        "jp": "公務員として、あってはまじき行為だ。",
        "romaji": "Kōmuin to shite, atte wa majiki kōi da.",
        "pt": "Como funcionário público, é um ato que não deveria acontecer."
      }
    ]
  },
  {
    "title": "〜に足りない",
    "explanation": "Significa 'não vale a pena (fazer/considerar)' ou 'não é suficiente para'. Indica que algo não tem valor ou peso para ser levado em conta.",
    "pattern": "動詞の辞書形＋に足りない／名詞＋に足りない",
    "level": "N1",
    "examples": [
      {
        "jp": "その程度の情報では、信頼するに足りない。",
        "romaji": "Sono teido no jōhō de wa, shinrai suru ni tarinai.",
        "pt": "Com esse nível de informação, não é suficiente para confiar."
      },
      {
        "jp": "彼の意見は、聞くに足りないものだった。",
        "romaji": "Kare no iken wa, kiku ni tarinai mono datta.",
        "pt": "A opinião dele não era digna de ser ouvida."
      }
    ]
  },
  {
    "title": "〜にはあたらない",
    "explanation": "Significa 'não é necessário/não se aplica a', indicando que algo não é digno de uma determinada reação ou consideração.",
    "pattern": "動詞の辞書形＋にはあたらない／名詞＋にはあたらない",
    "level": "N1",
    "examples": [
      {
        "jp": "彼の失敗は、そこまで心配するにはあたらない。",
        "romaji": "Kare no shippai wa, soko made shinpai suru ni wa ataranai.",
        "pt": "O fracasso dele não é motivo para tanta preocupação."
      },
      {
        "jp": "ほんの些細なことなので、褒めるにはあたらない。",
        "romaji": "Honno sasai na koto na node, homeru ni wa ataranai.",
        "pt": "É uma coisa tão insignificante que não vale a pena elogiar."
      }
    ]
  },
  {
    "title": "〜を余儀なくされる／余儀なくさせる",
    "explanation": "Significa 'ser forçado a (fazer algo)' (れる) ou 'forçar alguém a (fazer algo)' (させる). Indica que uma circunstância externa levou a uma ação inevitável.",
    "pattern": "名詞＋を余儀なくされる／余儀なくさせる",
    "level": "N1",
    "examples": [
      {
        "jp": "会社の倒産により、彼は退職を余儀なくされた。",
        "romaji": "Kaisha no tōsan ni yori, kare wa taishoku o yoginaku sareta.",
        "pt": "Devido à falência da empresa, ele foi forçado a se demitir."
      },
      {
        "jp": "悪天候が試合の中止を余儀なくさせた。",
        "romaji": "Akutenkō ga shiai no chūshi o yoginaku saseta.",
        "pt": "O mau tempo forçou o cancelamento da partida."
      }
    ]
  },
  {
    "title": "〜に則って",
    "explanation": "Similar a '〜に即して', mas enfatiza seguir uma regra, princípio ou tradição. 'Seguindo/em conformidade com (regra/princípio)'.",
    "pattern": "名詞＋に則って",
    "level": "N1",
    "examples": [
      {
        "jp": "会社の規則に則って、業務を進める。",
        "romaji": "Kaisha no kisoku ni nottotte, gyōmu o susumeru.",
        "pt": "Progrediremos com o trabalho seguindo as regras da empresa."
      },
      {
        "jp": "伝統に則って、結婚式が行われた。",
        "romaji": "Dentō ni nottotte, kekkonshiki ga okonawareta.",
        "pt": "A cerimônia de casamento foi realizada de acordo com a tradição."
      }
    ]
  },
  {
    "title": "〜を振り出しに",
    "explanation": "Significa 'começando com (algo)/tendo (algo) como ponto de partida'. Indica o início de uma série de eventos ou ações.",
    "pattern": "名詞＋を振り出しに",
    "level": "N1",
    "examples": [
      {
        "jp": "このイベントを振り出しに、全国でキャンペーンを行う。",
        "romaji": "Kono ibento o furidashi ni, zenkoku de kyanpēn o okonau.",
        "pt": "Começando com este evento, realizaremos uma campanha nacional."
      },
      {
        "jp": "大学を卒業したのを振り出しに、彼は世界中を旅した。",
        "romaji": "Daigaku o sotsugyō shita no o furidashi ni, kare wa sekaijū o tabi shita.",
        "pt": "Começando com a graduação na universidade, ele viajou pelo mundo."
      }
    ]
  },
  {
    "title": "〜なり〜なり",
    "explanation": "Significa \"seja X ou seja Y\", oferecendo opções ou alternativas, geralmente com uma sugestão de que qualquer uma delas servirá.",
    "pattern": "V辞書形／N + なり + V辞書形／N + なり",
    "level": "N1",
    "examples": [
      {
        "jp": "わからないことがあったら、先生に聞くなり、友達に聞くなりしてください。",
        "romaji": "Wakaranai koto ga attara, sensei ni kiku nari, tomodachi ni kiku nari shite kudasai.",
        "pt": "Se tiver algo que não entende, por favor, pergunte ao professor ou a um amigo."
      },
      {
        "jp": "困ったときは、親になり、兄弟になり、相談できる人がいるといい。",
        "romaji": "Komatta toki wa, oya ni nari, kyoudai ni nari, soudan dekiru hito ga iru to ii.",
        "pt": "Quando estiver com problemas, é bom ter alguém com quem possa conversar, seja seus pais ou seus irmãos."
      }
    ]
  },
  {
    "title": "〜なりに／なりの",
    "explanation": "Significa \"à sua maneira\", \"dentro dos seus limites\" ou \"no seu próprio estilo\", indicando que algo é feito de forma particular ou limitada a certas condições.",
    "pattern": "V辞書形／N + なりに／なりの",
    "level": "N1",
    "examples": [
      {
        "jp": "私なりに頑張ってみたけれど、やはりうまくいかなかった。",
        "romaji": "Watashi nari ni ganbatte mita keredo, yahari umaku ikanakatta.",
        "pt": "Tentei fazer o meu melhor do meu jeito, mas ainda assim não deu certo."
      },
      {
        "jp": "彼は彼なりの考えを持っているから、尊重すべきだ。",
        "romaji": "Kare wa kare nari no kangae wo motte iru kara, sonkei suru beki da.",
        "pt": "Ele tem suas próprias ideias, então devemos respeitá-las."
      }
    ]
  },
  {
    "title": "〜てからというもの",
    "explanation": "Significa \"desde que X aconteceu, Y tem acontecido consistentemente\", indicando uma mudança significativa que ocorreu e tem continuado desde um certo ponto no tempo.",
    "pattern": "Vて + からというもの",
    "level": "N1",
    "examples": [
      {
        "jp": "この会社に入ってからというもの、毎日が充実している。",
        "romaji": "Kono kaisha ni haitte kara to iu mono, mainichi ga juujitsu shite iru.",
        "pt": "Desde que entrei nesta empresa, todos os dias têm sido gratificantes."
      },
      {
        "jp": "彼と出会ってからというもの、私の人生は大きく変わった。",
        "romaji": "Kare to deatte kara to iu mono, watashi no jinsei wa ookiku kawatta.",
        "pt": "Desde que o conheci, minha vida mudou muito."
      }
    ]
  },
  {
    "title": "〜であろうと／であろうが",
    "explanation": "Significa \"seja X ou não\", \"não importa se X\", indicando que uma condição ou situação não afeta o resultado ou a conclusão.",
    "pattern": "N／なA + であろうと／であろうが",
    "level": "N1",
    "examples": [
      {
        "jp": "理由がなんであろうと、遅刻は許されない。",
        "romaji": "Riyuu ga nan de arou to, chikoku wa yurusarenai.",
        "pt": "Qualquer que seja a razão, atrasos não são permitidos."
      },
      {
        "jp": "彼が天才であろうが、努力しなければ成功しない。",
        "romaji": "Kare ga tensai de arou ga, doryoku shinakereba seikou shinai.",
        "pt": "Mesmo que ele seja um gênio, se não se esforçar, não terá sucesso."
      }
    ]
  },
  {
    "title": "〜に堪えない",
    "explanation": "Significa \"não poder suportar\", \"não poder aguentar\", expressando que algo é tão intenso ou doloroso que não pode ser suportado.",
    "pattern": "N + に堪えない",
    "level": "N1",
    "examples": [
      {
        "jp": "彼の話は聞くに堪えないほどひどかった。",
        "romaji": "Kare no hanashi wa kiku ni taenai hodo hidokatta.",
        "pt": "A história dele era tão terrível que não se podia ouvir."
      },
      {
        "jp": "見るに堪えないほどの光景が目の前に広がっていた。",
        "romaji": "Miru ni taenai hodo no koukei ga me no mae ni hirogatte ita.",
        "pt": "Uma cena insuportável de se ver se estendia diante dos meus olhos."
      }
    ]
  },
  {
    "title": "〜に堪える",
    "explanation": "Significa \"ser digno de\", \"merecer\", indicando que algo é bom o suficiente para suportar ou ser submetido a uma determinada ação.",
    "pattern": "N + に堪える",
    "level": "N1",
    "examples": [
      {
        "jp": "この絵は鑑賞に堪える美術品だ。",
        "romaji": "Kono e wa kanshou ni taeru bijutsuhin da.",
        "pt": "Esta pintura é uma obra de arte digna de apreciação."
      },
      {
        "jp": "この本は読むに堪える価値がある。",
        "romaji": "Kono hon wa yomu ni taeru kachi ga aru.",
        "pt": "Este livro tem um valor que merece ser lido."
      }
    ]
  },
  {
    "title": "〜を強いられる",
    "explanation": "Significa \"ser forçado a\" ou \"ser compelido a fazer X\", indicando que alguém é obrigado a suportar algo difícil ou fazer algo contra sua vontade.",
    "pattern": "N + を強いられる",
    "level": "N1",
    "examples": [
      {
        "jp": "彼は望まない転勤を強いられた。",
        "romaji": "Kare wa nozomanai tenkin wo shiirareta.",
        "pt": "Ele foi forçado a uma transferência indesejada."
      },
      {
        "jp": "災害で避難生活を強いられている人々が多い。",
        "romaji": "Saigai de hinan seikatsu wo shiirarete iru hitobito ga ooi.",
        "pt": "Muitas pessoas estão sendo forçadas a viver como evacuados devido ao desastre."
      }
    ]
  },
  {
    "title": "〜に忍びない",
    "explanation": "Significa \"não ter coragem de fazer X\" ou \"não suportar fazer X\", expressando que se sente tão mal que não consegue realizar uma ação.",
    "pattern": "V辞書形 + に忍びない",
    "level": "N1",
    "examples": [
      {
        "jp": "彼の苦しむ姿は見るに忍びない。",
        "romaji": "Kare no kurushimu sugata wa miru ni shinobinai.",
        "pt": "Não consigo suportar vê-lo sofrer."
      },
      {
        "jp": "せっかく作ってくれた料理を捨てるに忍びない。",
        "romaji": "Sekkaku tsukutte kureta ryouri wo suteru ni shinobinai.",
        "pt": "Não consigo ter coragem de jogar fora a comida que ele fez com tanto esforço."
      }
    ]
  },
  {
    "title": "〜に至って",
    "explanation": "Expressa que uma situação chegou a um ponto extremo ou a um resultado inesperado, muitas vezes negativo, e que uma ação foi finalmente tomada.",
    "pattern": "動詞普通形＋に至って / 名詞＋に至って",
    "level": "N1",
    "examples": [
      {
        "jp": "事態が悪化するに至って、ようやく政府は対策に乗り出した。",
        "romaji": "Jitai ga akka suru ni itatte, yōyaku seifu wa taisaku ni noridashita.",
        "pt": "Quando a situação piorou, o governo finalmente tomou medidas."
      },
      {
        "jp": "彼が病気に倒れるに至って、家族はその重要性に気づいた。",
        "romaji": "Kare ga byōki ni taoreru ni itatte, kazoku wa sono jūyōsei ni kidzuita.",
        "pt": "Quando ele adoeceu, a família percebeu sua importância."
      }
    ]
  },
  {
    "title": "〜に至っては",
    "explanation": "Utilizado para destacar um exemplo extremo ou surpreendente dentro de um grupo, mostrando que a situação é ainda mais notável ou pior para esse caso específico.",
    "pattern": "名詞＋に至っては",
    "level": "N1",
    "examples": [
      {
        "jp": "最近の若者は読書離れが進んでいる。漫画に至っては、ほとんど読まないそうだ。",
        "romaji": "Saikin no wakamono wa dokusho banare ga susunde iru. Manga ni itatte wa, hotondo yomanai sō da.",
        "pt": "Os jovens de hoje estão se afastando da leitura. Quanto aos mangás, dizem que quase não os leem."
      },
      {
        "jp": "彼女はスポーツ万能だが、水泳に至ってはプロ級だ。",
        "romaji": "Kanojo wa supōtsu bannō da ga, suiei ni itatte wa puro-kyū da.",
        "pt": "Ela é boa em todos os esportes, mas na natação, ela é de nível profissional."
      }
    ]
  },
  {
    "title": "〜てまえ",
    "explanation": "Significa que, devido a uma situação específica (um compromisso, a presença de alguém, etc.), não se pode deixar de fazer algo ou não se pode agir de determinada maneira.",
    "pattern": "動詞普通形＋てまえ / 名詞＋の＋てまえ",
    "level": "N1",
    "examples": [
      {
        "jp": "みんなの前で発表すると言った手前、もう後には引けない。",
        "romaji": "Minna no mae de happyō suru to itta temae, mō ato ni wa hikenai.",
        "pt": "Como eu disse que faria a apresentação na frente de todos, não posso mais voltar atrás."
      },
      {
        "jp": "先生という手前、生徒に悪い手本を見せるわけにはいかない。",
        "romaji": "Sensei to iu temae, seito ni warui tehon o miseru wake ni wa ikanai.",
        "pt": "Como sou um professor, não posso dar um mau exemplo aos alunos."
      }
    ]
  },
  {
    "title": "〜の感をぬぐえない",
    "explanation": "Significa que não se pode apagar ou remover a sensação de que algo é verdade, mesmo que se tente negá-lo, geralmente uma sensação negativa.",
    "pattern": "名詞＋の感をぬぐえない",
    "level": "N1",
    "examples": [
      {
        "jp": "彼の言動には、不信の感をぬぐえない。",
        "romaji": "Kare no gendō ni wa, fushin no kan o nuguenai.",
        "pt": "Em suas palavras e ações, não consigo apagar a sensação de desconfiança."
      },
      {
        "jp": "この報告書には、不十分さの感をぬぐえない部分がある。",
        "romaji": "Kono hōkokusho ni wa, fujūbun-sa no kan o nuguenai bubun ga aru.",
        "pt": "Há partes neste relatório que não consigo deixar de sentir que são insuficientes."
      }
    ]
  },
  {
    "title": "〜がてら",
    "explanation": "Significa 'aproveitando para...', indicando que se faz algo principal e, ao mesmo tempo, outra coisa secundária.",
    "pattern": "動詞ます形＋がてら / 名詞＋がてら",
    "level": "N1",
    "examples": [
      {
        "jp": "散歩がてら、スーパーに寄ってきた。",
        "romaji": "Sanpo ga tera, sūpā ni yotte kita.",
        "pt": "Aproveitando o passeio, dei uma passada no supermercado."
      },
      {
        "jp": "買い物がてら、友人の家に立ち寄った。",
        "romaji": "Kaimono ga tera, yūjin no ie ni tachiyotta.",
        "pt": "Aproveitando as compras, dei uma passada na casa de um amigo."
      }
    ]
  },
  {
    "title": "〜まかり通る",
    "explanation": "Significa 'passar livremente', 'ser aceito sem restrições', muitas vezes com uma conotação negativa de algo indesejável que prevalece.",
    "pattern": "名詞＋が＋まかり通る",
    "level": "N1",
    "examples": [
      {
        "jp": "この会社では、不正がまかり通っている。",
        "romaji": "Kono kaisha de wa, fusei ga makaritōtte iru.",
        "pt": "Nesta empresa, a corrupção prevalece livremente."
      },
      {
        "jp": "彼の意見ばかりがまかり通って、他の人の意見は聞かれない。",
        "romaji": "Kare no iken bakari ga makaritōtte, hoka no hito no iken wa kikarenai.",
        "pt": "Somente a opinião dele prevalece, e as opiniões dos outros não são ouvidas."
      }
    ]
  },
  {
    "title": "〜といい",
    "explanation": "Indica que algo é bom de determinada maneira, ou que seria bom que algo acontecesse.",
    "pattern": "普通形 + といい",
    "level": "N1",
    "examples": [
      {
        "jp": "この料理は温かいうちに食べるといい。",
        "romaji": "Kono ryōri wa atatakai uchi ni taberu to ii.",
        "pt": "Seria bom comer esta comida enquanto está quente."
      },
      {
        "jp": "もっと早く決断するとよかったといい。",
        "romaji": "Motto hayaku ketsudan suru to yokatta to ii.",
        "pt": "Seria bom ter decidido mais cedo."
      }
    ]
  },
  {
    "title": "〜というところだ / 〜といったところだ",
    "explanation": "Indica que algo é aproximadamente ou no máximo de determinado grau ou tipo.",
    "pattern": "名詞 + というところだ / といったところだ",
    "level": "N1",
    "examples": [
      {
        "jp": "給料は平均で月30万円というところだ。",
        "romaji": "Kyūryō wa heikin de tsuki sanjū man en to iu tokoro da.",
        "pt": "O salário médio é de cerca de 300.000 ienes por mês."
      },
      {
        "jp": "今日の参加者は10人といったところだろう。",
        "romaji": "Kyō no sanka-sha wa jūnin to itta tokoro darō.",
        "pt": "Os participantes de hoje devem ser cerca de 10 pessoas."
      }
    ]
  },
  {
    "title": "〜とはいえ",
    "explanation": "Embora; apesar de. Expressa uma concessão, muitas vezes com uma nuance de contra-expectativa.",
    "pattern": "普通形 + とはいえ",
    "level": "N1",
    "examples": [
      {
        "jp": "春とはいえ、まだまだ寒い日もある。",
        "romaji": "Haru to wa ie, madamada samui hi mo aru.",
        "pt": "Embora seja primavera, ainda há dias frios."
      },
      {
        "jp": "初心者とはいえ、よく頑張ったね。",
        "romaji": "Shoshinsha to wa ie, yoku ganbatta ne.",
        "pt": "Mesmo sendo um iniciante, você se esforçou muito, não é?"
      }
    ]
  },
  {
    "title": "〜とみるや",
    "explanation": "Assim que; tão logo. Indica que uma ação é realizada imediatamente após observar ou perceber algo.",
    "pattern": "動詞辞書形 + とみるや",
    "level": "N1",
    "examples": [
      {
        "jp": "彼女は彼が帰って来たとみるや、すぐに駆け寄った。",
        "romaji": "Kanojo wa kare ga kaette kita to miru ya, sugu ni kake yotta.",
        "pt": "Assim que ela o viu voltar, correu imediatamente para ele."
      },
      {
        "jp": "チャンスとみるや、彼はためらわず行動した。",
        "romaji": "Chansu to miru ya, kare wa tamerawazu kōdō shita.",
        "pt": "Assim que ele viu uma chance, agiu sem hesitar."
      }
    ]
  },
  {
    "title": "〜には及ばない",
    "explanation": "Não precisa; não há necessidade. Indica que algo não é necessário ou que não atinge um certo nível.",
    "pattern": "動詞辞書形 / 名詞 + には及ばない",
    "level": "N1",
    "examples": [
      {
        "jp": "わざわざお越しいただくには及びません。",
        "romaji": "Wazawaza okoshi itadaku ni wa oyobimasen.",
        "pt": "Não há necessidade de vir especialmente."
      },
      {
        "jp": "彼の才能は私には及ばない。",
        "romaji": "Kare no sainō wa watashi ni wa oyobanai.",
        "pt": "O talento dele não se compara ao meu."
      }
    ]
  },
  {
    "title": "〜の至りだ",
    "explanation": "O auge de; o cúmulo de. Expressa o mais alto grau de um sentimento ou estado.",
    "pattern": "名詞 + の至りだ",
    "level": "N1",
    "examples": [
      {
        "jp": "このような名誉をいただき、光栄の至りです。",
        "romaji": "Kono yō na meiyo o itadaki, kōei no itari desu.",
        "pt": "É a maior honra receber tal prestígio."
      },
      {
        "jp": "彼の無知にはあきれるの至りだ。",
        "romaji": "Kare no muchi ni wa akireru no itari da.",
        "pt": "A ignorância dele é o cúmulo."
      }
    ]
  },
  {
    "title": "〜の極みだ",
    "explanation": "O extremo de; o ápice de. Semelhante a 〜の至りだ, expressa o ponto máximo de algo, geralmente negativo.",
    "pattern": "名詞 + の極みだ",
    "level": "N1",
    "examples": [
      {
        "jp": "彼の行為は、自己中心的の極みだ。",
        "romaji": "Kare no kōi wa, jiko-chūshinteki no kiwami da.",
        "pt": "A atitude dele é o auge do egoísmo."
      },
      {
        "jp": "この美しい景色は、感動の極みだ。",
        "romaji": "Kono utsukushii keshiki wa, kandō no kiwami da.",
        "pt": "Esta paisagem maravilhosa é o ápice da emoção."
      }
    ]
  },
  {
    "title": "〜の他ならない",
    "explanation": "Não é nada além de; nada mais que. Enfatiza que algo é puramente uma determinada coisa e nada mais.",
    "pattern": "名詞 + の他ならない",
    "level": "N1",
    "examples": [
      {
        "jp": "彼の成功は努力の他ならない。",
        "romaji": "Kare no seikō wa doryoku no hoka naranai.",
        "pt": "O sucesso dele não é nada além de esforço."
      },
      {
        "jp": "この噂は彼女の嫉妬の他ならない。",
        "romaji": "Kono uwasa wa kanojo no shitto no hoka naranai.",
        "pt": "Este rumor não é nada além do ciúme dela."
      }
    ]
  },
  {
    "title": "〜がまかり通る",
    "explanation": "Passar livremente; ser aceito sem questionamento. Expressa que algo, geralmente negativo ou irracional, é permitido ou comum em uma situação.",
    "pattern": "名詞 + がまかり通る",
    "level": "N1",
    "examples": [
      {
        "jp": "この会社では不正がまかり通っている。",
        "romaji": "Kono kaisha de wa fusei ga makaritōtteiru.",
        "pt": "Nesta empresa, a corrupção é tolerada."
      },
      {
        "jp": "彼の理屈の通らない意見がまかり通るはずがない。",
        "romaji": "Kare no rikutsu no tōranai iken ga makaritōru hazu ga nai.",
        "pt": "Não há como a opinião irracional dele ser aceita."
      }
    ]
  },
  {
    "title": "〜ばそれまでだ",
    "explanation": "Se isso acontecer, então é o fim; não há mais nada a fazer. Expressa que se uma condição for cumprida, tudo se torna inútil ou sem sentido.",
    "pattern": "動詞仮定形＋ばそれまでだ",
    "level": "N1",
    "examples": [
      {
        "jp": "努力しても結果が出なければそれまでだ。",
        "romaji": "Doryoku shite mo kekka ga denakereba sore made da.",
        "pt": "Se você se esforçar mas não obtiver resultados, então é o fim (tudo foi em vão)."
      },
      {
        "jp": "命を落とせばそれまでだ。",
        "romaji": "Inochi o otoseba sore made da.",
        "pt": "Se você perder a vida, então é o fim."
      }
    ]
  },
  {
    "title": "〜をものともせず(に)",
    "explanation": "Desafiando; sem se importar com; superando. Indica que alguém realiza algo difícil ou perigoso sem se deixar abater por obstáculos.",
    "pattern": "名詞＋をものともせず(に)",
    "level": "N1",
    "examples": [
      {
        "jp": "彼は病気をものともせずに、マラソンを完走した。",
        "romaji": "Kare wa byōki o mono to mo sezu ni, marason o kansō shita.",
        "pt": "Ele terminou a maratona sem se importar com a doença."
      },
      {
        "jp": "厳しい批判をものともせずに、自分の意見を主張した。",
        "romaji": "Kibishii hihan o mono to mo sezu ni, jibun no iken o shuchō shita.",
        "pt": "Ele defendeu sua opinião, desafiando as duras críticas."
      }
    ]
  },
  {
    "title": "〜ともなると",
    "explanation": "Quando chega a; quando se torna. Indica que, ao atingir um certo nível, idade ou estágio, uma situação ou comportamento muda ou se torna aparente.",
    "pattern": "名詞＋ともなると",
    "level": "N1",
    "examples": [
      {
        "jp": "社長ともなると、責任は重い。",
        "romaji": "Shachō to mo naru to, sekinin wa omoi.",
        "pt": "Quando se torna presidente de uma empresa, a responsabilidade é grande."
      },
      {
        "jp": "専門家ともなると、細かいことにも気づく。",
        "romaji": "Senmonka to mo naru to, komakai koto ni mo kizuku.",
        "pt": "Quando se torna um especialista, percebe-se até os detalhes mais sutis."
      }
    ]
  },
  {
    "title": "〜にかなう",
    "explanation": "Estar de acordo com; ser adequado para; satisfazer. Usado para expressar que algo se encaixa em um padrão, expectativa ou desejo.",
    "pattern": "名詞＋にかなう",
    "level": "N1",
    "examples": [
      {
        "jp": "彼は私の理想にかなう人だ。",
        "romaji": "Kare wa watashi no risō ni kanau hito da.",
        "pt": "Ele é a pessoa que se encaixa no meu ideal."
      },
      {
        "jp": "この製品は、お客様のニーズにかなう。",
        "romaji": "Kono seihin wa, okyakusama no nīzu ni kanau.",
        "pt": "Este produto satisfaz as necessidades dos clientes."
      }
    ]
  },
  {
    "title": "〜にたえる",
    "explanation": "Ser digno de; valer a pena; suportar. Indica que algo tem a qualidade ou resistência necessária para uma determinada finalidade ou para suportar algo.",
    "pattern": "名詞＋にたえる",
    "level": "N1",
    "examples": [
      {
        "jp": "彼の演技は鑑賞にたえるものだった。",
        "romaji": "Kare no engi wa kanshō ni taeru mono datta.",
        "pt": "A atuação dele valeu a pena ser vista (era digna de apreciação)."
      },
      {
        "jp": "この椅子は重さにたえるように作られている。",
        "romaji": "Kono isu wa omosa ni taeru yō ni tsukurarete iru.",
        "pt": "Esta cadeira é feita para suportar peso."
      }
    ]
  },
  {
    "title": "〜かと思いきや",
    "explanation": "Significa 'pensei que seria..., mas na verdade foi o oposto', expressando uma surpresa ou decepção com o resultado.",
    "pattern": "動詞普通形／イ形容詞普通形／ナ形容詞語幹＋かと思いきや",
    "level": "N1",
    "examples": [
      {
        "jp": "もうすぐ完成するかと思いきや、まだ半分もできていなかった。",
        "romaji": "Mō sugu kansei suru ka to omoikiya, mada hanbun mo dekite inakatta.",
        "pt": "Pensei que estaria quase pronto, mas na verdade, nem metade estava feita."
      },
      {
        "jp": "雨が降ってきたかと思いきや、すぐにやんで晴れてきた。",
        "romaji": "Ame ga futte kita ka to omoikiya, sugu ni yande harete kita.",
        "pt": "Pensei que ia chover, mas logo parou e o sol apareceu."
      }
    ]
  },
  {
    "title": "〜べく",
    "explanation": "Significa 'a fim de', 'com o propósito de', indicando uma intenção ou objetivo. É uma expressão formal e literária.",
    "pattern": "動詞辞書形＋べく（する → すべく）",
    "level": "N1",
    "examples": [
      {
        "jp": "彼女は夢を実現すべく、毎日努力を続けている。",
        "romaji": "Kanojo wa yume o jitsugen su-beku, mainichi doryoku o tsuzukete iru.",
        "pt": "Ela continua se esforçando todos os dias para realizar seu sonho."
      },
      {
        "jp": "世界平和を願うべく、多くの人々が活動している。",
        "romaji": "Sekai heiwa o negau beku, ooku no hitobito ga katsudō shite iru.",
        "pt": "Muitas pessoas estão agindo a fim de desejar a paz mundial."
      }
    ]
  },
  {
    "title": "〜からある",
    "explanation": "Significa 'pelo menos...', 'e mais', indicando que um número é grande ou significativo, muitas vezes superando as expectativas.",
    "pattern": "数詞＋からある",
    "level": "N1",
    "examples": [
      {
        "jp": "その絵は１億円からある価値があると言われている。",
        "romaji": "Sono e wa ichi-oku-en kara aru kachi ga aru to iwarete iru.",
        "pt": "Diz-se que aquela pintura tem um valor de pelo menos 100 milhões de ienes."
      },
      {
        "jp": "あの人は１００キロからある重い荷物を一人で運んだ。",
        "romaji": "Ano hito wa hyakku kiro kara aru omoi nimotsu o hitori de hakonda.",
        "pt": "Aquela pessoa carregou sozinha uma bagagem pesada de pelo menos 100 quilos."
      }
    ]
  },
  {
    "title": "〜といったら（ありゃしない）",
    "explanation": "Expressa uma intensidade extrema de um sentimento ou estado negativo, algo que não pode ser superado.",
    "pattern": "名詞／イ形容詞普通形／ナ形容詞語幹＋といったら（ありゃしない）",
    "level": "N1",
    "examples": [
      {
        "jp": "彼のわがままといったらありゃしない。",
        "romaji": "Kare no wagamama to ittara aryashinai.",
        "pt": "O egoísmo dele é inigualável (não tem limites)."
      },
      {
        "jp": "あの店の料理のおいしさといったら、もう最高だ。",
        "romaji": "Ano mise no ryōri no oishisa to ittara, mō saikō da.",
        "pt": "O quão deliciosa é a comida daquele restaurante é indescritível (simplesmente excelente)."
      }
    ]
  },
  {
    "title": "〜にしたところで",
    "explanation": "Significa 'mesmo que seja...', 'mesmo no caso de...', indicando que mesmo considerando uma certa pessoa ou situação, o resultado não muda.",
    "pattern": "名詞＋にしたところで",
    "level": "N1",
    "examples": [
      {
        "jp": "彼にしたところで、解決策は見つからないだろう。",
        "romaji": "Kare ni shita tokoro de, kaiketsusaku wa mitsukaranai darō.",
        "pt": "Mesmo para ele, provavelmente não será encontrada uma solução."
      },
      {
        "jp": "この値段にしたところで、十分安いとは言えない。",
        "romaji": "Kono nedan ni shita tokoro de, jūbun yasui to wa ienai.",
        "pt": "Mesmo considerando este preço, não se pode dizer que seja suficientemente barato."
      }
    ]
  },
  {
    "title": "〜をおいて",
    "explanation": "Significa 'exceto por...', 'tirando...', 'apenas...', expressando que ninguém ou nada mais pode ser comparado ou é adequado para a situação.",
    "pattern": "名詞＋をおいて",
    "level": "N1",
    "examples": [
      {
        "jp": "彼をおいて、この仕事を任せられる人はいない。",
        "romaji": "Kare o oite, kono shigoto o makaserareru hito wa inai.",
        "pt": "Não há ninguém além dele a quem eu possa confiar este trabalho."
      },
      {
        "jp": "彼女の歌声をおいて、こんなに感動する歌はない。",
        "romaji": "Kanojo no utagoe o oite, konna ni kandō suru uta wa nai.",
        "pt": "Não há música que me emocione tanto quanto a voz dela."
      }
    ]
  }
];


export const gramaticaByLevel = (level: JlptLevel) => gramatica.filter((g) => g.level === level);
