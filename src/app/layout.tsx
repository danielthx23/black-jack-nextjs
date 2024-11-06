import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: 'Simulador de Blackjack',
  description: 'Um simples simulador de Blackjack usando Next.js e a Deck of Cards API.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt">
      <body className="bg-blue-600 text-white min-h-screen flex items-center justify-center">
        <div className="bg-gray-800 p-6 rounded-lg shadow-lg w-full max-w-3xl">
          <header className="text-center mb-6">
            <h1 className="text-3xl font-bold">Simulador de Blackjack</h1>
            <p className="text-gray-400">Tente chegar o mais próximo de 21 sem ultrapassar!</p>
          </header>
          <main>{children}</main>
          <footer className="text-center text-sm mt-6 text-gray-500">
            Powered by Deck of Cards API
            <br />
            Desenvolvido por <a className='text-white' href="https://github.com/danielthx23" target="_blank">Daniel Saburo Akiyama</a>
          </footer>
        </div>
      </body>
    </html>
  );
}

