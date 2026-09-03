import type { VocabItem } from "./vocabulario";

/** Tema (assunto) de uma unidade de lições, no estilo "Comida", "Viagem", etc. */
export type Tema = {
  slug: string;
  nome: string;
  emoji: string;
  re: RegExp;
};

/**
 * A ordem importa: o primeiro tema que casar com o significado da palavra vence.
 * Temas mais específicos vêm primeiro.
 */
export const temas: Tema[] = [
  {
    slug: "saudacoes",
    nome: "Saudações",
    emoji: "👋",
    re: /\b(ol(á|a)|bom dia|boa (tarde|noite)|tchau|at(é|e) (logo|mais)|obrigad|desculp|licen(ç|c)a|por favor|prazer|sauda(ç|c)(ã|a)o|apresenta(ç|c)(ã|a)o|cumpriment)/i,
  },
  {
    slug: "comida",
    nome: "Comida",
    emoji: "🍜",
    re: /\b(comida|comer|arroz|p(ã|a)o|carne|peixe|sopa|macarr(ã|a)o|bolo|fruta|ma(ç|c)(ã|a)|legume|verdura|ovo|doce|sal|a(ç|c)(ú|u)car|tempero|refei(ç|c)(ã|a)o|almo(ç|c)o|jantar|caf(é|e) da manh(ã|a)|lanche|sushi|ramen|curry|sabor|gostos)/i,
  },
  {
    slug: "restaurante",
    nome: "Restaurante",
    emoji: "🍽️",
    re: /\b(restaurante|bebida|beber|(á|a)gua|ch(á|a)\b|caf(é|e)|leite|suco|cerveja|sak(ê|e)|vinho|gar(ç|c)om|card(á|a)pio|conta|copo|prato|garfo|colher|pauzinho|tigela|pedido|reserva|mesa)\b/i,
  },
  {
    slug: "viagem",
    nome: "Viagem",
    emoji: "✈️",
    re: /\b(viagem|viajar|passeio|turista|hotel|pousada|mala|passaporte|bilhete|passagem|mapa|guia|souvenir|excurs(ã|a)o|f(é|e)rias|praia|montanha|templo|santu(á|a)rio|estrangeir|pa(í|i)s|exterior)\b/i,
  },
  {
    slug: "transporte",
    nome: "Transporte",
    emoji: "🚃",
    re: /\b(carro|trem|(ô|o)nibus|bicicleta|avi(ã|a)o|navio|barco|metr(ô|o)|t(á|a)xi|esta(ç|c)(ã|a)o|aeroporto|porto|plataforma|dirigir|andar de|linha|parada)\b/i,
  },
  {
    slug: "cidade",
    nome: "Na cidade",
    emoji: "🏙️",
    re: /\b(cidade|rua|avenida|banco|correio|hospital|farm(á|a)cia|loja|mercado|supermercado|shopping|biblioteca|museu|cinema|parque|pra(ç|c)a|delegacia|esquina|bairro|endere(ç|c)o|pr(é|e)dio|edif(í|i)cio)\b/i,
  },
  {
    slug: "casa",
    nome: "Em casa",
    emoji: "🏠",
    re: /\b(casa|apartamento|quarto|sala|cozinha|banheiro|jardim|janela|porta|cama|mesa|cadeira|arm(á|a)rio|geladeira|chuveiro|limpar|arrumar|banho|dormir|acordar|m(ó|o)vel)\b/i,
  },
  {
    slug: "familia",
    nome: "Família",
    emoji: "👨‍👩‍👧",
    re: /\b(fam(í|i)lia|m(ã|a)e|pai|filh|irm(ã|a)o|irm(ã|a)|av(ô|o)|av(ó|o)|tio|tia|primo|esposa|marido|beb(ê|e)|crian(ç|c)a|parente|casament)/i,
  },
  {
    slug: "pessoas",
    nome: "Pessoas",
    emoji: "🧑",
    re: /\b(pessoa|gente|amigo|colega|vizinho|homem|mulher|senhor|senhora|jovem|adulto|namorad|conhecid|estranho|nome|idade)\b/i,
  },
  {
    slug: "escola",
    nome: "Escola",
    emoji: "🎒",
    re: /\b(escola|universidade|aula|professor|aluno|estudante|estudar|li(ç|c)(ã|a)o|prova|exame|caderno|livro|dicion(á|a)rio|l(á|a)pis|caneta|papel|kanji|palavra|frase|dever|nota|turma|sala de aula)\b/i,
  },
  {
    slug: "trabalho",
    nome: "Trabalho",
    emoji: "💼",
    re: /\b(trabalh|emprego|empresa|escrit(ó|o)rio|reuni(ã|a)o|chefe|cliente|neg(ó|o)cio|projeto|contrato|sal(á|a)rio|dinheiro|pre(ç|c)o|conta|documento|relat(ó|o)rio|carreira|profiss(ã|a)o)/i,
  },
  {
    slug: "compras",
    nome: "Compras",
    emoji: "🛍️",
    re: /\b(comprar|vender|compra|venda|caro|barato|desconto|troco|dinheiro|cart(ã|a)o|moeda|nota fiscal|tamanho|prova(r|dor))\b/i,
  },
  {
    slug: "roupas",
    nome: "Roupas",
    emoji: "👕",
    re: /\b(roupa|camisa|camiseta|sapato|cal(ç|c)a|casaco|chap(é|e)u|vestido|saia|quimono|meia|(ó|o)culos|bolsa|rel(ó|o)gio|anel|vestir|usar)\b/i,
  },
  {
    slug: "corpo",
    nome: "Corpo e saúde",
    emoji: "🩺",
    re: /\b(corpo|cabe(ç|c)a|m(ã|a)o|p(é|e)\b|olho|orelha|boca|nariz|bra(ç|c)o|perna|dente|cabelo|est(ô|o)mago|dor|doen(ç|c)a|doente|rem(é|e)dio|m(é|e)dico|sa(ú|u)de|febre|resfriad)/i,
  },
  {
    slug: "tempo",
    nome: "Tempo e datas",
    emoji: "🕐",
    re: /\b(hora|minuto|segundo|dia|semana|m(ê|e)s|ano|hoje|amanh(ã|a)|ontem|manh(ã|a)|tarde|noite|cedo|segunda|ter(ç|c)a|quarta|quinta|sexta|s(á|a)bado|domingo|calend(á|a)rio|rel(ó|o)gio|data|per(í|i)odo|(é|e)poca)\b/i,
  },
  {
    slug: "clima",
    nome: "Clima e natureza",
    emoji: "🌤️",
    re: /\b(chuva|neve|vento|sol|c(é|e)u|nuvem|clima|tempo (bom|ruim)|calor|frio|quente|(á|a)rvore|flor|rio|mar|lago|montanha|estrela|lua|natureza|esta(ç|c)(ã|a)o do ano|primavera|ver(ã|a)o|outono|inverno)\b/i,
  },
  {
    slug: "animais",
    nome: "Animais",
    emoji: "🐕",
    re: /\b(animal|cachorro|c(ã|a)o\b|gato|p(á|a)ssaro|peixe|cavalo|vaca|porco|coelho|inseto|rato|urso|macaco)\b/i,
  },
  {
    slug: "lazer",
    nome: "Lazer",
    emoji: "🎧",
    re: /\b(m(ú|u)sica|filme|jogo|jogar|esporte|futebol|beisebol|nata(ç|c)(ã|a)o|dan(ç|c)a|festa|festival|hobby|foto|desenho|pintura|cantar|tocar|passear|divertid|descansar|f(é|e)rias)\b/i,
  },
  {
    slug: "sentimentos",
    nome: "Sentimentos",
    emoji: "💙",
    re: /\b(feliz|alegr|triste|medo|raiva|saudade|amor|gostar|odiar|cansad|preocupa|nervos|calmo|surpres|sentiment|emo(ç|c)(ã|a)o|vontade|sonho|esperan(ç|c)a)/i,
  },
  {
    slug: "tecnologia",
    nome: "Tecnologia",
    emoji: "📱",
    re: /\b(telefone|celular|computador|internet|e-?mail|site|c(â|a)mera|televis(ã|a)o|r(á|a)dio|m(á|a)quina|aparelho|tela|senha|aplicativo|dados)\b/i,
  },
  {
    slug: "acoes",
    nome: "Ações do dia a dia",
    emoji: "🏃",
    re: /\b(fazer|ir|vir|voltar|sair|entrar|abrir|fechar|come(ç|c)ar|terminar|esperar|encontrar|procurar|dar|receber|levar|trazer|ouvir|falar|dizer|ler|escrever|ver|olhar|pensar|lembrar|esquecer)\b/i,
  },
];

const temaFallback: Tema = { slug: "geral", nome: "Palavras úteis", emoji: "📚", re: /.^/ };

/** Descobre o tema de uma palavra a partir da tradução em português. */
export const temaDe = (v: VocabItem): Tema =>
  temas.find((t) => t.re.test(v.meaning)) ?? temaFallback;

export const temaPorSlug = (slug: string): Tema =>
  temas.find((t) => t.slug === slug) ?? temaFallback;
