import type { Metadata } from "next";
import Link from "next/link";
import { METRICAS } from "@/lib/metricas";

export const metadata: Metadata = {
  title: "Métricas explicadas · TRUNFO Shop",
};

const SECOES = [
  { chave: "calculo", titulo: "Como se calcula" },
  { chave: "ondeVer", titulo: "Onde ver" },
  { chave: "comoLer", titulo: "Como ler" },
  { chave: "seCair", titulo: "Se cair" },
] as const;

export default function PaginaMetricas() {
  return (
    <div className="mx-auto max-w-5xl px-5 py-10">
      <p className="text-xs font-semibold uppercase tracking-[0.25em] text-amber">Motor Escala</p>
      <h1 className="mt-2 font-display text-4xl md:text-5xl">As métricas, sem siglas soltas</h1>
      <p className="mt-3 max-w-2xl text-ink/75">
        O que cada número do Seller Center quer dizer, como o ler e o que fazer quando cai. Compare sempre com a sua
        própria loja: o TRUNFO não inventa números &quot;bons&quot;.
      </p>

      <nav className="mt-6 flex flex-wrap gap-2">
        {METRICAS.map((m) => (
          <a
            key={m.id}
            href={`#${m.id}`}
            className="border border-line bg-white px-3 py-1 text-xs font-semibold hover:border-gold"
          >
            {m.sigla}
          </a>
        ))}
      </nav>

      <div className="mt-8 space-y-5">
        {METRICAS.map((m) => (
          <article key={m.id} id={m.id} className="scroll-mt-6 border border-line bg-white">
            <header className="border-b border-line p-5">
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <h2 className="font-display text-3xl">
                  {m.sigla}
                  {m.sigla !== m.nome && <span className="ml-3 text-lg italic text-ink/60">{m.nome}</span>}
                </h2>
                <span className="text-xs font-semibold uppercase tracking-[0.2em] text-amber">Motor {m.motor}</span>
              </div>
              <p className="mt-2 text-ink/80">{m.oQueE}</p>
            </header>
            <dl className="grid gap-4 p-5 sm:grid-cols-2">
              {SECOES.map((s) => (
                <div key={s.chave}>
                  <dt className="text-xs font-semibold uppercase tracking-[0.15em] text-warm-gray">{s.titulo}</dt>
                  <dd className="mt-1 text-sm leading-relaxed">{m[s.chave]}</dd>
                </div>
              ))}
            </dl>
            <p className="border-t border-line bg-ivory px-5 py-3 text-sm">
              <span className="font-semibold text-marsala">Erro comum: </span>
              {m.erroComum}
            </p>
          </article>
        ))}
      </div>

      <div className="mt-10 border border-gold bg-marsala-deep p-6 text-ivory">
        <p className="font-display text-2xl">Já sabe ler os números. Agora veja se o produto dá lucro.</p>
        <Link href="/calculadora" className="mt-4 inline-block bg-gold px-5 py-2 text-sm font-semibold text-marsala-deep">
          Abrir a calculadora
        </Link>
      </div>
    </div>
  );
}
