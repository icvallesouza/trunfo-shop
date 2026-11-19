"use client";

import { useMemo, useState } from "react";
import { calcularMargem, type EntradaMargem } from "@/lib/margem";
import { PAISES, paisPorCodigo } from "@/lib/paises";

type Campo = {
  chave: keyof EntradaMargem;
  rotulo: string;
  ajuda: string;
  tipo: "dinheiro" | "percent";
};

const CAMPOS_VENDA: Campo[] = [
  { chave: "precoComIva", rotulo: "Preço de venda (com IVA)", ajuda: "O preço que o cliente vê no card.", tipo: "dinheiro" },
  { chave: "descontoSeller", rotulo: "Desconto pago por si", ajuda: "Cupões ou promoções que saem da sua margem.", tipo: "percent" },
  { chave: "iva", rotulo: "IVA do produto", ajuda: "Preenchido com a taxa normal do país. Confirme a do seu produto.", tipo: "percent" },
];

const CAMPOS_CUSTOS: Campo[] = [
  { chave: "custoProduto", rotulo: "Custo do produto", ajuda: "Por unidade, sem IVA.", tipo: "dinheiro" },
  { chave: "portesSeller", rotulo: "Portes pagos por si", ajuda: "Por encomenda. 0 se o cliente paga.", tipo: "dinheiro" },
  { chave: "embalagem", rotulo: "Embalagem e outros", ajuda: "Caixa, etiqueta, brinde, por encomenda.", tipo: "dinheiro" },
];

const CAMPOS_PLATAFORMA: Campo[] = [
  { chave: "comissaoPlataforma", rotulo: "Comissões e taxas da plataforma", ajuda: "Some as percentagens que vê no Seller Center do seu mercado.", tipo: "percent" },
  { chave: "taxaFixaPlataforma", rotulo: "Taxa fixa por encomenda", ajuda: "Só se o seu mercado tiver. Senão, 0.", tipo: "dinheiro" },
  { chave: "comissaoAfiliado", rotulo: "Comissão de afiliado", ajuda: "0 se a venda é do seu próprio conteúdo.", tipo: "percent" },
  { chave: "reservaDevolucoes", rotulo: "Reserva para devoluções", ajuda: "Parte do preço guardada para devoluções e reembolsos.", tipo: "percent" },
  { chave: "anuncioPorVenda", rotulo: "Anúncios por venda", ajuda: "Quanto gasta em anúncios para fazer uma venda. 0 se orgânico.", tipo: "dinheiro" },
];

const INICIAL: EntradaMargem = {
  precoComIva: 0,
  descontoSeller: 0,
  iva: 23,
  custoProduto: 0,
  portesSeller: 0,
  embalagem: 0,
  comissaoPlataforma: 0,
  taxaFixaPlataforma: 0,
  comissaoAfiliado: 0,
  reservaDevolucoes: 0,
  anuncioPorVenda: 0,
};

const VEREDICTO = {
  vende: {
    titulo: "Vende",
    texto: "Há margem para pagar a operação. Pode testar com conteúdo e afiliados.",
    cor: "bg-emerald-700",
  },
  corrige: {
    titulo: "Corrige antes de escalar",
    texto: "Sobra pouco por venda. Reveja preço, kit, portes ou comissões antes de pôr anúncios.",
    cor: "bg-amber",
  },
  "nao-vende": {
    titulo: "Assim não vende",
    texto: "Cada venda dá prejuízo. Mude o preço, o custo ou o canal antes de investir.",
    cor: "bg-marsala",
  },
} as const;

export default function Calculadora() {
  const [codigoPais, setCodigoPais] = useState("PT");
  const [entrada, setEntrada] = useState<EntradaMargem>(INICIAL);
  const pais = paisPorCodigo(codigoPais);

  const fmt = useMemo(
    () => new Intl.NumberFormat("pt-PT", { style: "currency", currency: pais.moeda }),
    [pais.moeda],
  );

  const r = calcularMargem(entrada);
  const preenchido = entrada.precoComIva > 0;
  const v = VEREDICTO[r.veredicto];

  function mudarPais(codigo: string) {
    setCodigoPais(codigo);
    setEntrada((e) => ({ ...e, iva: paisPorCodigo(codigo).ivaNormal }));
  }

  function mudar(chave: keyof EntradaMargem, valor: string) {
    const n = Number(valor.replace(",", "."));
    setEntrada((e) => ({ ...e, [chave]: Number.isFinite(n) && n >= 0 ? n : 0 }));
  }

  const bloco = (titulo: string, campos: Campo[]) => (
    <fieldset className="border border-line bg-white p-5">
      <legend className="px-1 text-xs font-semibold uppercase tracking-[0.2em] text-amber">{titulo}</legend>
      <div className="grid gap-4 sm:grid-cols-2">
        {campos.map((c) => (
          <label key={c.chave} className="block">
            <span className="text-sm font-semibold">{c.rotulo}</span>
            <div className="mt-1 flex items-center border border-line focus-within:border-gold">
              <input
                type="number"
                inputMode="decimal"
                min={0}
                step="0.01"
                value={entrada[c.chave] === 0 ? "" : entrada[c.chave]}
                placeholder="0"
                onChange={(ev) => mudar(c.chave, ev.target.value)}
                className="w-full bg-transparent px-3 py-2 outline-none"
              />
              <span className="px-3 text-sm text-warm-gray">{c.tipo === "percent" ? "%" : pais.moeda}</span>
            </div>
            <span className="mt-1 block text-xs text-ink/60">{c.ajuda}</span>
          </label>
        ))}
      </div>
    </fieldset>
  );

  const linha = (rotulo: string, valor: number, negativo = false) => (
    <div className="flex justify-between py-1.5 text-sm">
      <span className="text-ink/70">{rotulo}</span>
      <span>{negativo && valor > 0 ? "− " : ""}{fmt.format(valor)}</span>
    </div>
  );

  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_380px]">
      <div className="space-y-5">
        <label className="block border border-line bg-white p-5">
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-amber">País do comprador</span>
          <select
            value={codigoPais}
            onChange={(ev) => mudarPais(ev.target.value)}
            className="mt-2 w-full border border-line bg-transparent px-3 py-2"
          >
            {PAISES.map((p) => (
              <option key={p.codigo} value={p.codigo}>
                {p.nome} · IVA normal {p.ivaNormal}% · {p.moeda}
              </option>
            ))}
          </select>
        </label>
        {bloco("Venda", CAMPOS_VENDA)}
        {bloco("Custos do produto", CAMPOS_CUSTOS)}
        {bloco("Plataforma, afiliados e anúncios", CAMPOS_PLATAFORMA)}
      </div>

      <aside className="lg:sticky lg:top-6 lg:self-start">
        <div className="border border-line bg-white">
          {preenchido ? (
            <>
              <div className={`${v.cor} p-5 text-ivory`}>
                <p className="text-xs font-semibold uppercase tracking-[0.2em] opacity-80">Veredicto</p>
                <p className="mt-1 font-display text-3xl">{v.titulo}</p>
                <p className="mt-1 text-sm opacity-90">{v.texto}</p>
              </div>
              <div className="p-5">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-warm-gray">Lucro por venda</p>
                <p className="font-display text-5xl">{fmt.format(r.lucroPorVenda)}</p>
                <p className="text-sm text-ink/70">{r.margemPercent.toLocaleString("pt-PT")}% da receita sem IVA</p>

                <div className="mt-5 border-t border-line pt-3">
                  {linha("Cliente paga", r.precoPago)}
                  {linha("IVA", r.ivaValor, true)}
                  {linha("Receita sem IVA", r.receitaSemIva)}
                  {linha("Produto, portes e embalagem", entrada.custoProduto + entrada.portesSeller + entrada.embalagem, true)}
                  {linha("Plataforma", r.comissaoPlataformaValor, true)}
                  {linha("Afiliado", r.comissaoAfiliadoValor, true)}
                  {linha("Reserva de devoluções", r.reservaDevolucoesValor, true)}
                  {linha("Anúncios", entrada.anuncioPorVenda, true)}
                </div>

                <div className="mt-4 grid grid-cols-2 gap-3 border-t border-line pt-4">
                  <div>
                    <p className="text-xs text-warm-gray">CPA máximo</p>
                    <p className="font-semibold">{fmt.format(Math.max(r.margemAntesAnuncios, 0))}</p>
                    <p className="text-xs text-ink/60">O máximo que pode gastar em anúncios por venda.</p>
                  </div>
                  <div>
                    <p className="text-xs text-warm-gray">ROI mínimo</p>
                    <p className="font-semibold">{r.roiEquilibrio === null ? "—" : r.roiEquilibrio.toLocaleString("pt-PT")}</p>
                    <p className="text-xs text-ink/60">Abaixo disto, os anúncios dão prejuízo.</p>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <div className="p-6">
              <p className="font-display text-2xl">Comece pelo preço</p>
              <p className="mt-2 text-sm text-ink/70">
                Escreva o preço de venda e os custos. O resultado aparece aqui à medida que preenche.
              </p>
            </div>
          )}
        </div>
        <p className="mt-3 text-xs leading-relaxed text-ink/60">
          As comissões são calculadas sobre o valor pago pelo cliente. Confirme a base de cálculo e as taxas no Seller
          Center do seu mercado. O semáforo é um critério TRUNFO (menos de 10% de margem pede correção), não uma regra
          da plataforma.
        </p>
      </aside>
    </div>
  );
}
