import type { Metadata } from 'next';
import { DM_Sans, DM_Serif_Display } from 'next/font/google';
import './globals.css';
import { ThemeProvider } from '@/context/ThemeContext';
import JsonLd from '@/components/JsonLd';
import BookingModal from '@/components/BookingModal';

const dmSans = DM_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-sans',
  display: 'swap',
});

const dmSerif = DM_Serif_Display({
  subsets: ['latin'],
  weight: ['400'],
  variable: '--font-display',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Abdullah Saleh | SEO Growth Specialist',
  description: 'Abdullah Saleh is an SEO Growth Specialist helping businesses scale organic rankings, answer engine visibility, and generative AI search presence.',
  keywords: [
    'Abdullah Saleh',
    'SEO Growth Specialist',
    'SEO expert Bangladesh',
    'AEO specialist',
    'GEO expert',
    'Technical SEO',
    'Meta Ads',
  ],
  authors: [{ name: 'Abdullah Saleh' }],
  metadataBase: new URL('https://ahsan-jannat.netlify.app'),
  alternates: {
    canonical: '/',
  },
  icons: {
    icon: [
      { url: '/favicon.ico' },
      { url: '/assets/images/favicon.png', type: 'image/png' },
    ],
    apple: '/assets/images/favicon.png',
    shortcut: '/favicon.ico',
  },
  openGraph: {
    title: 'Abdullah Saleh | SEO Growth Specialist',
    description: 'Driving organic growth through Search, Answer & Generative Engine Optimization.',
    url: 'https://ahsan-jannat.netlify.app/',
    siteName: 'Abdullah Saleh Portfolio',
    images: [
      {
        url: '/assets/images/abdullah.jpg',
        width: 800,
        height: 600,
        alt: 'Abdullah Saleh Portrait',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Abdullah Saleh | SEO Growth Specialist',
    description: 'SEO Growth Specialist helping brands rank on Google, appear in AI answers, and grow with Meta Ads.',
    images: ['/assets/images/abdullah.jpg'],
  },
  other: {
    'indexnow-key': 'cc02b558a0bd4a69ae052b226cbe50e5',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" data-theme="light" data-style="sage" className={`${dmSans.variable} ${dmSerif.variable}`}>
      <head>
        <JsonLd />
      </head>
      <body className="antialiased">
        <ThemeProvider>
          {children}
          <BookingModal />
        </ThemeProvider>
      </body>
    </html>
  );
}
