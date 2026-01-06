import type { Metadata } from "next";
import localFont from "next/font/local";
import { Space_Grotesk, Outfit } from "next/font/google";
import "../styles/globals.scss";
import { ViewTransitions } from "next-view-transitions"
//import { useEffect, useState } from "react";

import Header from '../components/Header';

const signature = localFont({
  src: '../public/fonts/Simple Signature - TTF.ttf',
  variable: '--font-signature',
  display: 'swap',
});

const fancyTitle = localFont({
  src: '../public/fonts/Ruigslay.ttf',
  variable: '--font-fancy-title',
  display: 'swap',
});

const links = localFont({
  src: '../public/fonts/AltMono-Light.otf',
  variable: '--font-links',
  display: 'swap',
});

const wobbleTitle = localFont({
  src: '../public/fonts/ExpressionistaDemo-6R47A.ttf',
  variable: '--font-wobble-title',
  display: 'swap',
});

const fanfarron = localFont({
  src: '../public/fonts/Fanfarron.otf',
  variable: '--font-fanfarron',
  display: 'swap',
});

const stretch = localFont({
  src: '../public/fonts/StretchPro.otf',
  variable: '--font-stretch',
  display: 'swap',
});

const text = localFont({
  src: '../public/fonts/Helvetica.ttf',
  variable: '--font-text',
  display: 'swap',
});

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-space-grotesk',
  display: 'swap',
});

const outfit = Outfit({
  subsets: ['latin'],
  variable: '--font-outfit',
  display: 'swap',
});

const charter = localFont({
  src: '../public/fonts/Charter Regular.otf',
  variable: '--font-charter',
  display: 'swap',
});

export const metadata: Metadata = {
  title: "Portfolio",
  description: "Portfolio of Daniel Busse",
  icons: {
    icon: '/favicon.ico'
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ViewTransitions>
      <html lang="en">
        <body className={`${signature.variable} ${fancyTitle.variable} ${links.variable} ${wobbleTitle.variable} ${fanfarron.variable} ${stretch.variable} ${text.variable} ${charter.variable} ${spaceGrotesk.variable} ${outfit.variable}`}>
          <Header/>
          {children}
        </body>
      </html>
    </ViewTransitions>
  );
}
