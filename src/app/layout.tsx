import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Sidebar } from "@/components/layout/sidebar";
import { LanguageProvider } from "@/context/LanguageContext";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  title: "CozyTale Blueprint",
  description: "Interactive Technical Design for Hytale Mod",
};

import { AuthProvider } from "@/context/AuthContext";

import { Header } from "@/components/layout/header";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.variable} font-sans flex min-h-screen bg-slate-950 text-slate-50 selection:bg-purple-500/30`}>
        <LanguageProvider>
          <AuthProvider>
            <Sidebar />
            <div className="flex-1 relative flex flex-col min-w-0 min-h-0 overflow-hidden">
              <Header />
              <div className="fluid-bg absolute inset-0 pointer-events-none" />
              <main className="flex-1 min-h-0 overflow-y-auto p-8 lg:p-12 relative z-10 scroll-smooth">
                {children}
              </main>
            </div>
          </AuthProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}
