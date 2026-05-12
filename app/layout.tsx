import type { Metadata } from 'next';
import { Poppins } from 'next/font/google';

import './globals.css';

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  display: 'swap',
  variable: '--font-poppins'
});

export const metadata: Metadata = {
  metadataBase: new URL('https://pratyushdeosingh.netlify.app'),
  title: 'Pratyush Deo Singh | Computer Science Student',
  description:
    'Portfolio of Pratyush Deo Singh, Computer Science Student at VIT Chennai. Passionate about building innovative solutions through code.',
  keywords: ['Pratyush Deo Singh', 'Portfolio', 'Computer Science', 'VIT Chennai', 'Developer', 'C++', 'Python'],
  authors: [{ name: 'Pratyush Deo Singh' }],
  alternates: {
    canonical: '/'
  },
  openGraph: {
    type: 'website',
    url: '/',
    title: 'Pratyush Deo Singh | Computer Science Student',
    description:
      'Portfolio of Pratyush Deo Singh, Computer Science Student at VIT Chennai. Passionate about building innovative solutions through code.',
    siteName: 'Pratyush Deo Singh Portfolio',
    images: [
      {
        url: '/og-image.svg',
        width: 1200,
        height: 630,
        alt: 'Pratyush Deo Singh portfolio preview'
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Pratyush Deo Singh | Computer Science Student',
    description:
      'Portfolio of Pratyush Deo Singh, Computer Science Student at VIT Chennai. Passionate about building innovative solutions through code.',
    images: ['/og-image.svg']
  },
  icons: {
    icon: '/favicon.svg'
  }
};

export const viewport = {
  themeColor: '#020617'
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={poppins.variable}>{children}</body>
    </html>
  );
}
