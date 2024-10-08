import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Providers from "./providers/provider";
import { QueryClient } from '@tanstack/react-query'
import QueryProvider from "./lib/tanstack/provider";
import SessionProvider from './components/SessionProvider'


const inter = Inter({ subsets: ["latin"] });
const client = new QueryClient();

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <SessionProvider>
          <QueryProvider>
            <Providers>
              {children}
              <script src="https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.10.377/pdf.min.js"></script>
            </Providers>
          </QueryProvider>   
        </SessionProvider>
        </body>
    </html>

  );
}
