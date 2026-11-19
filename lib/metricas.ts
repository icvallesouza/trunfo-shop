// Explicador de métricas TRUNFO Shop (pt-PT).
// Escrito de raiz, em linguagem de lojista. Regras:
// - nenhum número "bom" inventado: a comparação é com a própria loja
//   e com o benchmark da categoria quando o painel do seller o mostrar;
// - as fórmulas e janelas podem variar por painel: o seller confirma
//   a definição exibida no Seller Center ou no Ads Manager.

export type Metrica = {
  id: string;
  sigla: string;
  nome: string;
  oQueE: string;
  calculo: string;
  ondeVer: string;
  comoLer: string;
  seCair: string;
  erroComum: string;
  motor: "ROTA" | "CÓDIGO" | "OFERTA" | "VITRINE" | "PALCO" | "REDE" | "OPERAÇÃO" | "ESCALA";
};

export const METRICAS: Metrica[] = [
  {
    id: "gmv",
    sigla: "GMV",
    nome: "Volume bruto de vendas",
    oQueE: "Tudo o que os clientes pagaram pelas encomendas, antes de tirar custos, comissões, devoluções ou impostos.",
    calculo: "Soma do valor das encomendas no período. Alguns painéis contam encomendas feitas, outros só as pagas.",
    ondeVer: "Área de dados do Seller Center, no resumo da loja, por produto, por vídeo e por LIVE.",
    comoLer: "Compare com a mesma janela anterior (esta semana contra a semana passada) e veja de onde veio: vídeo, LIVE, afiliados ou anúncios.",
    seCair: "Descubra primeiro qual fonte caiu. Menos visualizações é problema de conteúdo; as mesmas visualizações com menos vendas é problema de oferta ou de página do produto.",
    erroComum: "Achar que GMV é o que fica no bolso. Uma loja pode crescer em GMV e perder dinheiro.",
    motor: "ESCALA",
  },
  {
    id: "encomendas",
    sigla: "Encomendas pagas",
    nome: "Encomendas pagas",
    oQueE: "Número de encomendas que o cliente chegou a pagar.",
    calculo: "Contagem de encomendas com pagamento confirmado no período.",
    ondeVer: "Área de dados do Seller Center e gestão de encomendas.",
    comoLer: "Leia junto com o ticket médio: mais encomendas com ticket mais baixo pode dar o mesmo GMV.",
    seCair: "Veja se caiu o tráfego (menos gente a ver o produto) ou a conversão (as mesmas pessoas a comprar menos).",
    erroComum: "Contar encomendas que depois foram canceladas ou devolvidas como vendas garantidas.",
    motor: "ESCALA",
  },
  {
    id: "ticket",
    sigla: "Ticket médio",
    nome: "Valor médio por encomenda",
    oQueE: "Quanto cada cliente gasta, em média, numa encomenda.",
    calculo: "GMV pago ÷ número de encomendas pagas.",
    ondeVer: "Calcule com os dois números do Seller Center ou veja no resumo, se o painel o mostrar.",
    comoLer: "Um ticket mais alto dilui os portes e a embalagem, que são custos por encomenda.",
    seCair: "Teste kits (2 ou 3 unidades), um produto complementar ou portes grátis a partir de um valor.",
    erroComum: "Subir o ticket com descontos que comem a margem. Confirme na calculadora antes.",
    motor: "OFERTA",
  },
  {
    id: "ctr",
    sigla: "CTR",
    nome: "Taxa de clique",
    oQueE: "De quem viu o produto, quantos tocaram nele para saber mais.",
    calculo: "Cliques no produto ÷ impressões (vezes que o produto foi mostrado) × 100. Confirme no painel se a base são impressões ou visualizações.",
    ondeVer: "Dados por produto, por vídeo e por LIVE no Seller Center; nos anúncios, no TikTok Ads Manager.",
    comoLer: "Compare com os seus outros produtos e vídeos, e com a média da categoria se o painel a mostrar.",
    seCair: "O problema está no que a pessoa vê antes de tocar: os primeiros segundos do vídeo, a demonstração, a foto principal ou o preço mostrado.",
    erroComum: "Comparar CTR de anúncio com CTR orgânico. As bases e as janelas são diferentes.",
    motor: "VITRINE",
  },
  {
    id: "cvr",
    sigla: "CVR",
    nome: "Taxa de conversão",
    oQueE: "De quem tocou no produto, quantos compraram.",
    calculo: "Encomendas ÷ cliques no produto (ou visitas à página do produto) × 100. O denominador muda de painel para painel.",
    ondeVer: "Dados por produto e por LIVE no Seller Center.",
    comoLer: "CTR bom com CVR baixo quer dizer: o conteúdo atrai, mas a página ou a oferta não convencem.",
    seCair: "Reveja preço, portes, avaliações, fotos, descrição e se o produto mostrado no vídeo é igual ao do card.",
    erroComum: "Pôr mais anúncios num produto que não converte. Mais tráfego numa página fraca só aumenta o custo.",
    motor: "OFERTA",
  },
  {
    id: "gpm",
    sigla: "GPM",
    nome: "GMV por mil visualizações",
    oQueE: "Quanto dinheiro em vendas cada mil visualizações geram. Junta atração e conversão num só número.",
    calculo: "GMV ÷ visualizações (ou impressões) × 1.000. Confirme a base no painel.",
    ondeVer: "Dados de vídeo e de LIVE no Seller Center.",
    comoLer: "Serve para comparar vídeos, LIVEs e criadores entre si: o que tem GPM mais alto merece mais distribuição.",
    seCair: "Separe a causa: se o CTR caiu, mexa no conteúdo; se o CVR caiu, mexa na oferta.",
    erroComum: "Olhar só para visualizações. Um vídeo viral com GPM baixo pode vender menos do que um vídeo pequeno com GPM alto.",
    motor: "ESCALA",
  },
  {
    id: "roi",
    sigla: "ROI / ROAS",
    nome: "Retorno dos anúncios",
    oQueE: "Quantos euros de vendas entram por cada euro gasto em anúncios.",
    calculo: "GMV atribuído aos anúncios ÷ gasto em anúncios. Um ROI de 5 quer dizer 5 € em vendas por cada 1 € gasto.",
    ondeVer: "TikTok Ads Manager, nas campanhas de Shop (por exemplo GMV Max), com a janela de atribuição indicada no painel.",
    comoLer: "Compare sempre com o ROI de equilíbrio do produto, que a calculadora TRUNFO dá. Acima dele há lucro; abaixo há prejuízo.",
    seCair: "Antes de mexer no orçamento, veja se o problema é o criativo (CTR), a página (CVR) ou o preço.",
    erroComum: "Pensar que ROI 1,0 é empatar. Com ROI 1,0 os anúncios pagam-se a si próprios, mas o produto, as comissões e os portes ficam por pagar.",
    motor: "ESCALA",
  },
  {
    id: "cpa",
    sigla: "CPA",
    nome: "Custo por venda",
    oQueE: "Quanto custa, em anúncios, conseguir uma encomenda.",
    calculo: "Gasto em anúncios ÷ número de encomendas atribuídas.",
    ondeVer: "TikTok Ads Manager.",
    comoLer: "O CPA máximo que pode pagar é a margem antes de anúncios de cada venda. A calculadora mostra esse valor.",
    seCair: "Um CPA a descer é boa notícia, desde que a qualidade das encomendas (cancelamentos e devoluções) se mantenha.",
    erroComum: "Fixar um CPA alvo sem saber a margem do produto.",
    motor: "OFERTA",
  },
  {
    id: "devolucoes",
    sigla: "Cancelamentos e devoluções",
    nome: "Taxa de cancelamento e devolução",
    oQueE: "Parte das encomendas que não chega a virar dinheiro: canceladas, devolvidas ou reembolsadas.",
    calculo: "Encomendas canceladas ou devolvidas ÷ encomendas totais × 100, na mesma janela.",
    ondeVer: "Gestão de encomendas e de devoluções no Seller Center, e indicadores de saúde da loja.",
    comoLer: "Leia por produto: um só produto com muitas devoluções pode estragar a margem e a saúde da conta.",
    seCair: "Se está a subir, compare o que o vídeo promete com o que chega ao cliente, e reveja prazos de envio e embalagem.",
    erroComum: "Calcular a margem sem reservar dinheiro para devoluções. A calculadora tem esse campo.",
    motor: "OPERAÇÃO",
  },
  {
    id: "afiliado",
    sigla: "Comissão de afiliado",
    nome: "Comissão de afiliado",
    oQueE: "A percentagem que o criador recebe por cada venda feita pelo conteúdo dele.",
    calculo: "Percentagem definida pelo seller no plano de afiliados, aplicada às vendas atribuídas ao criador. Confirme a base de cálculo no Seller Center.",
    ondeVer: "Área de afiliados do Seller Center.",
    comoLer: "A comissão certa é a que a margem aguenta e que ainda atrai criadores. Simule na calculadora antes de subir.",
    seCair: "Se os criadores não pegam no produto, a comissão pode não ser o problema: veja amostras, briefing e o próprio produto.",
    erroComum: "Pagar comissão alta e anúncios na mesma venda sem fazer as contas.",
    motor: "REDE",
  },
  {
    id: "margem",
    sigla: "Margem de contribuição",
    nome: "Margem de contribuição",
    oQueE: "O que sobra de cada venda depois de tirar o IVA e todos os custos variáveis. É o dinheiro que paga a estrutura e o lucro.",
    calculo: "Receita sem IVA − produto − portes − embalagem − comissões − afiliado − reserva de devoluções − anúncios.",
    ondeVer: "Não aparece no Seller Center: calcule-a na calculadora TRUNFO.",
    comoLer: "É a métrica que decide se um produto merece escala.",
    seCair: "Reveja preço, kit, portes e comissões antes de cortar qualidade.",
    erroComum: "Confundir margem com GMV ou com o valor que a plataforma transfere.",
    motor: "OFERTA",
  },
  {
    id: "saude",
    sigla: "Saúde da conta",
    nome: "Saúde da conta e da loja",
    oQueE: "Os indicadores com que a plataforma avalia a loja: cumprimento de regras, envios, atendimento e experiência do comprador.",
    calculo: "Cada indicador tem a sua regra, definida pela plataforma para o seu mercado.",
    ondeVer: "Área de saúde da conta e de desempenho da loja no Seller Center.",
    comoLer: "Trate um aviso como prioridade: uma conta com problemas perde distribuição e pode ser limitada.",
    seCair: "Leia o aviso, corrija a causa (produto, conteúdo, envio ou atendimento) e consulte a política oficial do seu mercado.",
    erroComum: "Aplicar regras de outro país. As políticas mudam por mercado.",
    motor: "CÓDIGO",
  },
];
