import { test } from "node:test";
import assert from "node:assert/strict";
import { calcularMargem, type EntradaMargem } from "./margem.ts";

const base: EntradaMargem = {
  precoComIva: 24.6,
  descontoSeller: 0,
  iva: 23,
  custoProduto: 6,
  portesSeller: 3,
  embalagem: 0.5,
  comissaoPlataforma: 10,
  taxaFixaPlataforma: 0,
  comissaoAfiliado: 15,
  reservaDevolucoes: 5,
  anuncioPorVenda: 0,
};

test("separa o IVA do preço pago", () => {
  const r = calcularMargem(base);
  assert.equal(r.receitaSemIva, 20);
  assert.equal(r.ivaValor, 4.6);
});

test("soma custos e calcula a margem antes de anúncios", () => {
  const r = calcularMargem(base);
  // comissão 2,46 + afiliado 3,69 + devoluções 1,23 + 6 + 3 + 0,5 = 16,88
  assert.equal(r.custosVariaveis, 16.88);
  assert.equal(r.margemAntesAnuncios, 3.12);
  assert.equal(r.lucroPorVenda, 3.12);
  assert.equal(r.margemPercent, 15.6);
  assert.equal(r.veredicto, "vende");
});

test("ROI de equilíbrio = preço pago / margem antes de anúncios", () => {
  const r = calcularMargem(base);
  assert.equal(r.roiEquilibrio, 7.88); // 24,6 / 3,12
});

test("anúncio acima da margem dá prejuízo", () => {
  const r = calcularMargem({ ...base, anuncioPorVenda: 4 });
  assert.equal(r.lucroPorVenda, -0.88);
  assert.equal(r.veredicto, "nao-vende");
});

test("margem baixa pede correção", () => {
  const r = calcularMargem({ ...base, anuncioPorVenda: 2 });
  assert.equal(r.veredicto, "corrige");
});

test("desconto do seller reduz o preço pago antes do IVA", () => {
  const r = calcularMargem({ ...base, descontoSeller: 10 });
  assert.equal(r.precoPago, 22.14);
  assert.equal(r.receitaSemIva, 18);
});

test("sem margem não há ROI de equilíbrio", () => {
  const r = calcularMargem({ ...base, custoProduto: 30 });
  assert.equal(r.roiEquilibrio, null);
});
