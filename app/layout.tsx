import type { Metadata } from "next";
import "../styles/globals.scss";
import { ViewTransitions } from "next-view-transitions"
import { useEffect, useState } from "react";

import Header from '../components/Header';


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
        <body>
          <Header/>
          {children}
        </body>
      </html>
    </ViewTransitions>
  );
}
