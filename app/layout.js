import "./globals.css";

export const metadata = {
  title: "AllenareFacile - Crea il tuo allenamento di calcio",
  description: "Piattaforma per allenatori di calcio: scegli gli esercizi, costruisci la sessione e stampa la scheda allenamento.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="it">
      <body>{children}</body>
    </html>
  );
}
