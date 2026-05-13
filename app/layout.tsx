import type { Metadata, Viewport } from 'next';
import { Inter, JetBrains_Mono } from 'next/font/google';
import './globals.css';
import { SmoothScroll } from '@/app/components/effects/smooth-scroll';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
  preload: true
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-jetbrains',
  preload: true
});

export const metadata: Metadata = {
  metadataBase: new URL('https://pratyushdeosingh.netlify.app'),
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
    url: 'https://pratyushdeosingh.netlify.app',
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
    icon: '/favicon.svg',
    shortcut: '/favicon.svg',
    apple: '/favicon.svg'
  },
  manifest: '/manifest.json',
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
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#050505' }
  ],
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  colorScheme: 'dark light'
};

const structuredData = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: 'Pratyush Deo Singh',
  url: 'https://pratyushdeosingh.netlify.app',
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
    <html lang="en" className={`${inter.variable} ${jetbrainsMono.variable}`}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://pratyushdeosingh.netlify.app" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </head>
      <body className="min-h-screen bg-background font-sans antialiased">
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}
