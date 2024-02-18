import type { Metadata } from "next";
import "./globals.css";
import { Providers } from "./providers";

import { IBM_Plex_Mono } from "./fonts";

export const metadata: Metadata = {
  title: "",
  description: "",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <Providers>
    <html lang="en">
      <body className={`${IBM_Plex_Mono.className}`}>
          {children}
      </body>
    </html>
    </Providers>
  );
}
