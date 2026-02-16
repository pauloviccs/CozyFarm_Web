"use client";

import { useLanguage } from "@/context/LanguageContext";
import { GlassCard } from "@/components/ui/glass-card";
import { ITEMS, type ItemCategory } from "@/data/items";
import { Search, Copy, Check } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

export default function ItemIDsPage() {
    const { t, language } = useLanguage();
    const [search, setSearch] = useState("");
    const [copiedId, setCopiedId] = useState<string | null>(null);

    const hytaleItems = ITEMS.filter(item => item.game === "hytale" && item.hytaleId);

    const filteredItems = hytaleItems.filter(item => {
        const name = language === "pt" && item.namePt ? item.namePt : item.name;
        const matchesSearch =
            name.toLowerCase().includes(search.toLowerCase()) ||
            item.name.toLowerCase().includes(search.toLowerCase()) ||
            item.hytaleId?.toLowerCase().includes(search.toLowerCase());
        return matchesSearch;
    });

    const handleCopy = (id: string) => {
        navigator.clipboard.writeText(id);
        setCopiedId(id);
        setTimeout(() => setCopiedId(null), 2000);
    };

    const groupedItems = filteredItems.reduce((acc, item) => {
        const cat = item.category;
        if (!acc[cat]) acc[cat] = [];
        acc[cat].push(item);
        return acc;
    }, {} as Record<ItemCategory, typeof ITEMS>);

    return (
        <div className="space-y-8 max-w-4xl mx-auto pb-20 px-8 lg:px-12 pt-24 lg:pt-32">
            <div className="flex flex-col gap-2">
                <h1 className="text-4xl font-light text-white tracking-tight">
                    {language === "pt" ? "IDs de Itens Hytale" : "Hytale Item IDs"}
                </h1>
                <p className="text-white/60 text-lg font-light max-w-2xl leading-relaxed">
                    {language === "pt"
                        ? "Lista completa de identificadores de itens para uso em comandos, scripts e configurações de mod."
                        : "Complete list of item identifiers for use in commands, scripts, and mod configurations."}
                </p>
            </div>

            <GlassCard className="p-6 backdrop-blur-xl bg-slate-900/80 border-white/10">
                <div className="relative group">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Search className="h-5 w-5 text-white/40 group-focus-within:text-purple-400 transition-colors" />
                    </div>
                    <input
                        type="text"
                        placeholder={language === "pt" ? "Buscar por nome ou ID..." : "Search by name or ID..."}
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="block w-full pl-10 pr-3 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-white/30 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50 transition-all shadow-sm hover:bg-white/10"
                    />
                </div>
            </GlassCard>

            <div className="space-y-8">
                {Object.entries(groupedItems).map(([category, items]) => (
                    <div key={category} className="space-y-4">
                        <h2 className="text-xl font-medium text-white/80 capitalize border-b border-white/10 pb-2">
                            {category.replace("_", " ")}
                        </h2>
                        <div className="grid gap-3">
                            {items.map((item) => (
                                <GlassCard
                                    key={item.id}
                                    className="p-4 flex items-center justify-between group hover:bg-white/5 transition-colors border-white/5"
                                >
                                    <div>
                                        <div className="font-medium text-white">
                                            {language === "pt" && item.namePt ? item.namePt : item.name}
                                        </div>
                                        <div className="text-xs text-white/40 font-mono mt-0.5">
                                            {item.name}
                                        </div>
                                    </div>

                                    <button
                                        onClick={() => item.hytaleId && handleCopy(item.hytaleId)}
                                        className={cn(
                                            "flex items-center gap-2 px-3 py-1.5 rounded-lg font-mono text-sm transition-all",
                                            copiedId === item.hytaleId
                                                ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/30"
                                                : "bg-slate-950/50 text-purple-300 border border-purple-500/20 hover:border-purple-500/50 hover:bg-purple-500/10"
                                        )}
                                        title={language === "pt" ? "Clique para copiar" : "Click to copy"}
                                    >
                                        {item.hytaleId}
                                        {copiedId === item.hytaleId ? (
                                            <Check className="w-3.5 h-3.5" />
                                        ) : (
                                            <Copy className="w-3.5 h-3.5 opacity-50 group-hover:opacity-100 transition-opacity" />
                                        )}
                                    </button>
                                </GlassCard>
                            ))}
                        </div>
                    </div>
                ))}

                {filteredItems.length === 0 && (
                    <div className="text-center py-12 text-white/40">
                        {language === "pt" ? "Nenhum item encontrado." : "No items found."}
                    </div>
                )}
            </div>
        </div>
    );
}
