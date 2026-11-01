import type { Metadata, Viewport } from 'next';
import './globals.css';
import { MusicProvider } from '@/context/MusicContext';
import { Outfit, Plus_Jakarta_Sans } from "next/font/google";
import { cn } from "@/lib/utils";

const outfit = Outfit({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800', '900'],
  variable: '--font-heading',
  display: 'swap',
});

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-sans',
  display: 'swap',
});

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
    <html
      lang="en"
      className={cn(
        "h-full antialiased scroll-smooth",
        outfit.variable,
        plusJakartaSans.variable
      )}
    >
      <body className={cn("min-h-full flex flex-col font-sans", outfit.variable, plusJakartaSans.variable)}>
        <MusicProvider>
          {children}
        </MusicProvider>
      </body>
    </html>
  );
}
