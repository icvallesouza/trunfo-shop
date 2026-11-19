// Calculadora de margem real por venda (motor OFERTA).
// Todas as percentagens entram como números de 0 a 100.
// Regra TRUNFO: nenhuma taxa da plataforma é inventada. O seller escreve
// as comissões que vê no Seller Center dele.

export type EntradaMargem = {
  precoComIva: number; // preço de venda mostrado ao cliente, com IVA
  descontoSeller: number; // % de desconto pago pelo seller
  iva: number; // % de IVA do produto no país do comprador
  custoProduto: number; // custo do produto por unidade, sem IVA
  portesSeller: number; // portes pagos pelo seller por encomenda
  embalagem: number; // embalagem e outros custos fixos por encomenda
  comissaoPlataforma: number; // % de comissões e taxas da plataforma
  taxaFixaPlataforma: number; // taxa fixa por encomenda, se existir
  comissaoAfiliado: number; // % de comissão do afiliado (0 se venda própria)
  reservaDevolucoes: number; // % do preço reservado para devoluções e reembolsos
  anuncioPorVenda: number; // custo de anúncio por venda (0 se orgânico)
};

export type ResultadoMargem = {
  precoPago: number; // o que o cliente paga, com IVA, depois do desconto
  ivaValor: number;
  receitaSemIva: number;
  comissaoPlataformaValor: number;
  comissaoAfiliadoValor: number;
  reservaDevolucoesValor: number;
  custosVariaveis: number; // tudo menos anúncios
  margemAntesAnuncios: number; // = CPA de equilíbrio
  lucroPorVenda: number;
  margemPercent: number; // lucro / receita sem IVA
  roiEquilibrio: number | null; // GMV / gasto em anúncios para lucro zero
  veredicto: "vende" | "corrige" | "nao-vende";
};

const arred = (n: number) => Math.round(n * 100) / 100;

export function calcularMargem(e: EntradaMargem): ResultadoMargem {
  const precoPago = e.precoComIva * (1 - e.descontoSeller / 100);
  const receitaSemIva = precoPago / (1 + e.iva / 100);
  const ivaValor = precoPago - receitaSemIva;

  // As comissões são calculadas sobre o valor pago pelo cliente.
  // O seller deve confirmar a base de cálculo no Seller Center do mercado dele.
  const comissaoPlataformaValor = precoPago * (e.comissaoPlataforma / 100) + e.taxaFixaPlataforma;
  const comissaoAfiliadoValor = precoPago * (e.comissaoAfiliado / 100);
  const reservaDevolucoesValor = precoPago * (e.reservaDevolucoes / 100);

  const custosVariaveis =
    e.custoProduto +
    e.portesSeller +
    e.embalagem +
    comissaoPlataformaValor +
    comissaoAfiliadoValor +
    reservaDevolucoesValor;

  const margemAntesAnuncios = receitaSemIva - custosVariaveis;
  const lucroPorVenda = margemAntesAnuncios - e.anuncioPorVenda;
  const margemPercent = receitaSemIva > 0 ? (lucroPorVenda / receitaSemIva) * 100 : 0;
  const roiEquilibrio = margemAntesAnuncios > 0 ? precoPago / margemAntesAnuncios : null;

  // Critério do semáforo (regra TRUNFO, não benchmark da plataforma):
  // prejuízo = não vende; menos de 10% de margem = corrige; acima = vende.
  let veredicto: ResultadoMargem["veredicto"] = "vende";
  if (lucroPorVenda <= 0) veredicto = "nao-vende";
  else if (margemPercent < 10) veredicto = "corrige";

  return {
    precoPago: arred(precoPago),
    ivaValor: arred(ivaValor),
    receitaSemIva: arred(receitaSemIva),
    comissaoPlataformaValor: arred(comissaoPlataformaValor),
    comissaoAfiliadoValor: arred(comissaoAfiliadoValor),
    reservaDevolucoesValor: arred(reservaDevolucoesValor),
    custosVariaveis: arred(custosVariaveis),
    margemAntesAnuncios: arred(margemAntesAnuncios),
    lucroPorVenda: arred(lucroPorVenda),
    margemPercent: Math.round(margemPercent * 10) / 10,
    roiEquilibrio: roiEquilibrio === null ? null : Math.round(roiEquilibrio * 100) / 100,
    veredicto,
  };
}
