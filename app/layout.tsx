import type { Metadata, Viewport } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'UncleSam Tours | Curated Tour Packages',
  description: 'Explore signature tour packages to Japan (Nagoya, Tokyo, Hakone) and beyond.',
};

export const viewport: Viewport = {
  themeColor: '#000000',
  colorScheme: 'dark',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark bg-black">
      <body className="bg-black text-white antialiased min-h-screen flex flex-col">
        {children}
      </body>
    </html>
  );
}