// Mercados do TikTok Shop na Europa usados pelo TRUNFO.
// O IVA é a taxa normal do país, só como ponto de partida: o seller
// confirma sempre a taxa do seu produto (há taxas reduzidas por categoria).

export type Pais = {
  codigo: string;
  nome: string;
  moeda: "EUR" | "GBP" | "PLN";
  ivaNormal: number; // em percentagem
  lingua: string;
};

export const PAISES: Pais[] = [
  { codigo: "PT", nome: "Portugal", moeda: "EUR", ivaNormal: 23, lingua: "pt-PT" },
  { codigo: "ES", nome: "Espanha", moeda: "EUR", ivaNormal: 21, lingua: "es-ES" },
  { codigo: "FR", nome: "França", moeda: "EUR", ivaNormal: 20, lingua: "fr-FR" },
  { codigo: "DE", nome: "Alemanha", moeda: "EUR", ivaNormal: 19, lingua: "de-DE" },
  { codigo: "IT", nome: "Itália", moeda: "EUR", ivaNormal: 22, lingua: "it-IT" },
  { codigo: "IE", nome: "Irlanda", moeda: "EUR", ivaNormal: 23, lingua: "en-IE" },
  { codigo: "NL", nome: "Países Baixos", moeda: "EUR", ivaNormal: 21, lingua: "nl-NL" },
  { codigo: "BE", nome: "Bélgica", moeda: "EUR", ivaNormal: 21, lingua: "nl-BE" },
  { codigo: "AT", nome: "Áustria", moeda: "EUR", ivaNormal: 20, lingua: "de-AT" },
  { codigo: "PL", nome: "Polónia", moeda: "PLN", ivaNormal: 23, lingua: "pl-PL" },
  { codigo: "UK", nome: "Reino Unido", moeda: "GBP", ivaNormal: 20, lingua: "en-GB" },
];

export function paisPorCodigo(codigo: string): Pais {
  return PAISES.find((p) => p.codigo === codigo) ?? PAISES[0];
}
