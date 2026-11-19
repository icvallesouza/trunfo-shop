import type { Metadata } from "next";
import Calculadora from "@/components/Calculadora";

export const metadata: Metadata = {
  title: "Calculadora de margem real · TRUNFO Shop",
};

export default function PaginaCalculadora() {
  return (
    <div className="mx-auto max-w-5xl px-5 py-10">
      <p className="text-xs font-semibold uppercase tracking-[0.25em] text-amber">Motor Oferta</p>
      <h1 className="mt-2 font-display text-4xl md:text-5xl">Este produto dá lucro?</h1>
      <p className="mt-3 max-w-2xl text-ink/75">
        GMV não é lucro. Preencha os números de um produto e veja quanto sobra de cada venda, quanto pode pagar em
        anúncios e qual o ROI mínimo para não perder dinheiro.
      </p>
      <div className="mt-8">
        <Calculadora />
      </div>
    </div>
  );
}
