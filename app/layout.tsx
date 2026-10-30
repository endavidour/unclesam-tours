import type { Metadata, Viewport } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'UncleSam Tours | Curated Tour Packages',
  description: 'Explore signature tour packages to Japan (Nagoya, Tokyo, Hakone) and beyond.',
};

export const viewport: Viewport = {
  themeColor: '#000000',
  colorScheme: 'light',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="bg-white">
      <body className="bg-white text-zinc-900 antialiased min-h-screen flex flex-col">
        {children}
      </body>
    </html>
  );
}