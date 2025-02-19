import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './reset.css';
import './globals.css';

export const metadata: Metadata = {
  title: 'the news inspira!',
  description: 'gerador de mensagens inspiradoras no padrão do estagiário',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
