import 'bootstrap/dist/css/bootstrap.css';
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import BootstrapClient from './components/BootstrapClient';
import NavBar from "./components/NavBar";


const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Davide Morelli",
  description: "My portfolio website",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <NavBar />
        {children}
        </body>
      <BootstrapClient />
    </html>
  );
}
