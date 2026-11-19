import type { Metadata, Viewport } from "next";
import Link from "next/link";
import "@fontsource/cormorant-garamond/500.css";
import "@fontsource/cormorant-garamond/500-italic.css";
import "@fontsource/manrope/400.css";
import "@fontsource/manrope/600.css";
import "@fontsource/manrope/700.css";
import "./globals.css";

export const metadata: Metadata = {
  title: "TRUNFO Shop · A próxima jogada da sua loja no TikTok Shop",
  description:
    "Margem real, métricas explicadas e a próxima jogada para sellers de TikTok Shop na Europa. Uma ferramenta Bel Valle.",
};

export const viewport: Viewport = {
  themeColor: "#4a1321",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-PT">
      <body className="min-h-screen">
        <header className="bg-marsala-deep text-ivory">
          <div className="mx-auto flex max-w-5xl items-center justify-between px-5 py-4">
            <Link href="/" className="flex items-baseline gap-2">
              <span className="font-display text-2xl tracking-wide">TRUNFO</span>
              <span className="text-xs font-semibold uppercase tracking-[0.2em] text-amber">Shop</span>
            </Link>
            <nav className="flex gap-5 text-sm">
              <Link href="/calculadora" className="hover:text-gold-light">
                Calculadora
              </Link>
              <Link href="/metricas" className="hover:text-gold-light">
                Métricas
              </Link>
            </nav>
          </div>
        </header>
        <main>{children}</main>
        <footer className="mt-16 border-t border-line">
          <div className="mx-auto max-w-5xl px-5 py-6 text-xs text-warm-gray">
            TRUNFO Shop by Bel Valle · Ferramenta independente, sem ligação oficial ao TikTok ou à ByteDance.
            Os cálculos dependem dos dados que escreve; confirme taxas e regras no Seller Center do seu mercado.
          </div>
        </footer>
      </body>
    </html>
  );
}
