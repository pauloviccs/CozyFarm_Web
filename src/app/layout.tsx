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
import { LoadingProvider } from "@/context/LoadingContext";
import { LoadingScreen } from "@/components/ui/LoadingScreen";
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
            <LoadingProvider>
              <LoadingScreen />
              <Sidebar />
              <div className="flex-1 relative flex flex-col">
                <div className="absolute top-0 w-full z-50">
                  <Header />
                </div>
                <div className="fluid-bg absolute inset-0 pointer-events-none fixed" />
                <main className="flex-1 relative z-10 scroll-smooth">
                  {children}
                </main>
              </div>
            </LoadingProvider>
          </AuthProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}
