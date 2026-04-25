import type { Metadata, Viewport } from 'next';
import { Analytics } from '@vercel/analytics/next';
import { Plus_Jakarta_Sans } from 'next/font/google';
import Script from 'next/script';
import { ThemeProvider } from '@/components/ThemeProvider';
import Header from '@/components/sections/Header';
import Footer from '@/components/sections/Footer';
import { Toaster } from '@/components/ui/toaster';
import { organizationSchema } from '@/data/schemaData';
import './globals.css';

const jakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
});

export const metadata: Metadata = {
  title: {
    default: 'Quick Money Tool | Free Finance Calculators & Guides for South Africans',
    template: '%s | Quick Money Tool',
  },
  description:
    'Your personal finance guide for South Africa. Free calculators for SARS income tax, vehicle finance, loans, and retirement savings, plus research-based guides reviewed by tax professionals.',
  keywords: [
    'personal finance guide south africa',
    'financial calculator south africa',
    'sars tax calculator',
    'paye calculator',
    'vehicle finance calculator',
    'home loan calculator',
    'bond calculator south africa',
    'retirement savings calculator',
    'car payment calculator',
    'income tax calculator',
    'free financial tools',
    'money guide south africa',
    'financial advice SA',
  ],
  metadataBase: new URL('https://www.quickmoneytool.com'),
  manifest: '/manifest.json',
  icons: {
    icon: [
      { url: '/logo-32.png', sizes: '32x32', type: 'image/png' },
      { url: '/logo-192-192.png', sizes: '192x192', type: 'image/png' },
      { url: '/logo-512-512.png', sizes: '512x512', type: 'image/png' },
    ],
    apple: [{ url: '/logo-180.png', sizes: '180x180', type: 'image/png' }],
    shortcut: ['/logo-32.png'],
  },
  openGraph: {
    type: 'website',
    siteName: 'Quick Money Tool',
    locale: 'en_ZA',
  },
  twitter: {
    card: 'summary_large_image',
    site: '@quickmoneytool',
    creator: '@quickmoneytool',
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#0f172a' },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en-ZA" data-scroll-behavior="smooth" suppressHydrationWarning>
      <head>
        <meta
          name="google-site-verification"
          content="quickmoneytool-verified"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
        <Script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-7185526762692935"
          crossOrigin="anonymous"
          strategy="lazyOnload"
        />
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-42NMWE8582"
          strategy="lazyOnload"
        />
        <Script id="google-analytics" strategy="lazyOnload">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-42NMWE8582');
          `}
        </Script>
      </head>
      <body className={jakarta.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange={false}
        >
          <div className="min-h-screen bg-background text-foreground transition-colors duration-500">
            <Toaster />
            <Header />
            <main>{children}</main>
            <Footer />
          </div>
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  );
}
