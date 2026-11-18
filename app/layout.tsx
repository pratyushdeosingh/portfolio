import type { Metadata, Viewport } from 'next';
import { Mona_Sans, Playfair_Display } from 'next/font/google';
import './globals.css';
import { SmoothScroll } from '@/app/components/effects/smooth-scroll';
import { Loader } from '@/app/components/effects/loader';

// '' on Vercel, '/portfolio' on GitHub Pages (see next.config.ts).
const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? '';

const monaSans = Mona_Sans({
  subsets: ['latin'],
  display: 'swap',
  axes: ['wdth'],
  variable: '--font-mona',
  preload: true
});

const playfair = Playfair_Display({
  subsets: ['latin'],
  display: 'swap',
  style: ['normal', 'italic'],
  variable: '--font-playfair',
  preload: true
});

export const metadata: Metadata = {
  metadataBase: new URL('https://pratyushdeosingh.vercel.app'),
  title: 'Pratyush Deo Singh | Computer Science Student & Developer',
  description:
    'Portfolio of Pratyush Deo Singh, Computer Science Student at VIT Chennai. Passionate about building innovative solutions through code.',
  keywords: [
    'Pratyush Deo Singh',
    'Portfolio',
    'Computer Science',
    'VIT Chennai',
    'Developer',
    'C++',
    'Python',
    'Data Structures',
    'Algorithms',
    'Web Development',
    'Next.js',
    'React'
  ],
  authors: [{ name: 'Pratyush Deo Singh', url: 'https://github.com/pratyushdeosingh' }],
  creator: 'Pratyush Deo Singh',
  alternates: {
    canonical: '/'
  },
  openGraph: {
    type: 'website',
    url: 'https://pratyushdeosingh.vercel.app',
    title: 'Pratyush Deo Singh | Computer Science Student & Developer',
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
    title: 'Pratyush Deo Singh | Computer Science Student & Developer',
    description:
      'Portfolio of Pratyush Deo Singh, Computer Science Student at VIT Chennai. Passionate about building innovative solutions through code.',
    images: ['/og-image.svg']
  },
  icons: {
    icon: `${basePath}/favicon.svg`,
    shortcut: `${basePath}/favicon.svg`,
    apple: `${basePath}/favicon.svg`
  },
  manifest: `${basePath}/manifest.json`,
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1
    }
  }
};

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#f4f4ed' },
    { media: '(prefers-color-scheme: dark)', color: '#282c20' }
  ],
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  colorScheme: 'light'
};

const structuredData = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: 'Pratyush Deo Singh',
  url: 'https://pratyushdeosingh.vercel.app',
  jobTitle: 'Computer Science Student',
  alumniOf: {
    '@type': 'CollegeOrUniversity',
    name: 'VIT Chennai'
  },
  knowsAbout: [
    'C',
    'C++',
    'Python',
    'Java',
    'Data Structures',
    'Algorithms',
    'Web Development',
    'HTML',
    'CSS',
    'JavaScript',
    'React',
    'Next.js',
    'Databases'
  ],
  sameAs: ['https://github.com/pratyushdeosingh', 'https://www.linkedin.com/in/pratyushdeosingh/']
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${monaSans.variable} ${playfair.variable}`}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://pratyushdeosingh.vercel.app" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </head>
      <body className="min-h-screen bg-cream font-sans text-ink antialiased">
        <Loader />
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}
