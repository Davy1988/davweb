import './globals.css';
import type { Metadata } from 'next';
import { Montserrat } from 'next/font/google';
import Header from '@/components/header/Header';
import { Toaster } from '@/components/ui/toaster';
import { Analytics } from '@vercel/analytics/react';

const montserrat = Montserrat({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Home',
  description:
    'Experienced Frontend Developer and Software Quality Assurance with over five years of experience in the industry. Proven track record of designing and developing engaging websites that drive business growth. Seeking a challenging role that allows me to leverage my skills and expertise to contribute to the success of an organization.',
  keywords:
    'Flutter, Frontend Developer, Software Quality, David Manuel, Davy1988',
  authors: [{ name: 'David Manuel Seco Osorio' }],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const bodyClass: string =
    'h-screen w-screen overflow-y-auto xl:overflow-y-hidden overflow-x-hidden p-6 sm:p-10 md:p-12 lg:p-12';

  return (
    <html lang='en'>
      <body className={`${montserrat.className} ${bodyClass}`}>
        <Header />
        <main className='mx-6 h-full'>
          {children}
          <Analytics />
        </main>
        <Toaster />
      </body>
    </html>
  );
}
