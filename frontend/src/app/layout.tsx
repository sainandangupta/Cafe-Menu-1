import type { Metadata, Viewport } from 'next';
import './globals.css';
import { MusicProvider } from '@/context/MusicContext';

export const metadata: Metadata = {
  title: 'Velvet Bean Cafe & Waffleria | Digital QR Menu',
  description: 'Explore our artisan menu: Delicious Food & Burgers, Signature Thick Shakes & Coolers, and Warm Belgian Pocket Waffles & Desserts.',
  openGraph: {
    title: 'Velvet Bean Cafe & Waffleria — Digital Menu',
    description: 'Scan & Browse our full cafe menu with live prices, photos, and ratings.',
    type: 'website',
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full antialiased scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Outfit:wght@400;500;600;700;800;900&family=Plus+Jakarta+Sans:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-full flex flex-col font-sans">
        <MusicProvider>
          {children}
        </MusicProvider>
      </body>
    </html>
  );
}
