import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { ThemeProvider } from 'next-themes';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { HistoryContextProvider } from '@/context/HistoryContext';

import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-primary',
});

export const metadata: Metadata = {
  title: 'Nepali Date Converter',
  description: 'Convert dates between Nepali (BS) and English (AD) calendars. Free Nepali date converter tool.',
  keywords: ['nepali date converter', 'BS to AD', 'AD to BS', 'nepali calendar', 'bikram sambat', 'date converter'],
  authors: [{ name: 'Nepali Date Converter' }],
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
  openGraph: {
    title: 'Nepali Date Converter',
    description: 'Convert dates between Nepali (BS) and English (AD) calendars',
    url: 'https://www.nepalidateconverter.net',
    siteName: 'Nepali Date Converter',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Nepali Date Converter',
    description: 'Convert dates between Nepali (BS) and English (AD) calendars',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`motion-safe:scroll-smooth ${inter.variable}`} suppressHydrationWarning>
      <body className={`tracking-tight antialiased`}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <HistoryContextProvider>
            <div className="min-h-screen flex flex-col">
              <Header />
              {children}
              <Footer />
            </div>
          </HistoryContextProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
