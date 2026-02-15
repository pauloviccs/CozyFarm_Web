"use client";

import { Languages } from "lucide-react";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/context/LanguageContext";

export function LanguageToggle() {
  const { language, toggleLanguage } = useLanguage();

  return (
    <button
      onClick={toggleLanguage}
      className={cn(
        "fixed top-6 right-8 z-50 flex items-center gap-2 px-4 py-2 rounded-xl",
        "border border-white/10 bg-slate-950/80 backdrop-blur-xl",
        "text-white/80 hover:text-white hover:bg-white/10 transition-all",
        "shadow-lg shadow-black/20"
      )}
      title={language === "pt" ? "Mudar para English" : "Switch to Português"}
    >
      <Languages className="w-4 h-4 text-purple-300" />
      <span className="text-sm font-medium">
        {language === "pt" ? "PT" : "EN"}
      </span>
    </button>
  );
}
