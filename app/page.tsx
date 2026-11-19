import Link from "next/link";

const FERRAMENTAS = [
  {
    href: "/calculadora",
    rotulo: "Oferta",
    titulo: "Calculadora de margem real",
    texto: "Quanto sobra de cada venda depois do IVA, comissões, afiliado, portes, devoluções e anúncios. E o ROI mínimo para não perder dinheiro.",
    estado: "Disponível",
  },
  {
    href: "/metricas",
    rotulo: "Escala",
    titulo: "Métricas explicadas",
    texto: "GMV, CTR, CVR, GPM, ROI e companhia em linguagem de lojista: o que são, onde as ver e o que fazer quando caem.",
    estado: "Disponível",
  },
  {
    href: null,
    rotulo: "Vitrine",
    titulo: "Estúdio de conteúdo",
    texto: "Título, descrição, ganchos e roteiro na língua do comprador, com as frases de risco assinaladas.",
    estado: "Em breve",
  },
  {
    href: null,
    rotulo: "Rede",
    titulo: "Plano de afiliados",
    texto: "O criador certo, a comissão que a margem aguenta e a mensagem de convite.",
    estado: "Em breve",
  },
];

export default function Home() {
  return (
    <>
      <section className="bg-marsala-deep text-ivory">
        <div className="mx-auto max-w-5xl px-5 pb-16 pt-12">
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-gold">TikTok Shop · Europa</p>
          <div className="mt-2 h-px w-16 bg-gold" />
          <h1 className="mt-6 font-display text-5xl leading-[1.05] md:text-7xl">
            O Seller Center executa. <br />
            <em className="text-gold">O TRUNFO decide.</em>
          </h1>
          <p className="mt-6 max-w-xl text-lg text-ivory/80">
            A sua loja não precisa de mais informação. Precisa de saber qual é a próxima jogada, com margem e no seu
            mercado.
          </p>
          <Link
            href="/calculadora"
            className="mt-8 inline-block bg-gold px-6 py-3 text-sm font-semibold uppercase tracking-wider text-marsala-deep hover:bg-gold-light"
          >
            Calcular a margem de um produto
          </Link>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-5 py-12">
        <h2 className="font-display text-3xl">As ferramentas</h2>
        <div className="mt-6 grid gap-4 md:grid-cols-2">
          {FERRAMENTAS.map((f) => {
            const conteudo = (
              <div className="h-full border border-line bg-white p-6 transition hover:border-gold">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold uppercase tracking-[0.2em] text-amber">{f.rotulo}</span>
                  <span className="text-xs text-warm-gray">{f.estado}</span>
                </div>
                <h3 className="mt-3 font-display text-2xl">{f.titulo}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink/75">{f.texto}</p>
              </div>
            );
            return f.href ? (
              <Link key={f.titulo} href={f.href}>
                {conteudo}
              </Link>
            ) : (
              <div key={f.titulo} className="opacity-70">
                {conteudo}
              </div>
            );
          })}
        </div>
      </section>
    </>
  );
}
