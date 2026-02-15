"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, Sprout, Package, Egg, Factory, UtensilsCrossed, Flower2, Box, ExternalLink } from "lucide-react";
import { GlassCard } from "@/components/ui/glass-card";
import { type Item, type ItemCategory } from "@/data/items";
import { useLanguage } from "@/context/LanguageContext";
import { cn } from "@/lib/utils";

interface ItemModalProps {
    item: Item | null;
    isOpen: boolean;
    onClose: () => void;
}

const CATEGORY_ICONS: Record<ItemCategory, React.ElementType> = {
    crops: Sprout,
    seeds: Package,
    animal_products: Egg,
    processing_machines: Factory,
    artisan_goods: Factory,
    dishes: UtensilsCrossed,
    forage: Flower2,
    materials: Box,
};

const CATEGORY_LABELS: Record<ItemCategory, { en: string; pt: string }> = {
    crops: { en: "Crops", pt: "Colheitas" },
    seeds: { en: "Seeds", pt: "Sementes" },
    animal_products: { en: "Animal Products", pt: "Produtos Animais" },
    processing_machines: { en: "Machines", pt: "Máquinas" },
    artisan_goods: { en: "Artisan Goods", pt: "Produtos Artesanais" },
    dishes: { en: "Dishes", pt: "Pratos" },
    forage: { en: "Forage", pt: "Coleta" },
    materials: { en: "Materials", pt: "Materiais" },
};

export function ItemModal({ item, isOpen, onClose }: ItemModalProps) {
    const { language } = useLanguage();

    if (!item) return null;

    const Icon = CATEGORY_ICONS[item.category];
    const displayName = language === "pt" && item.namePt ? item.namePt : item.name;
    const displayCategory = language === "pt" ? CATEGORY_LABELS[item.category].pt : CATEGORY_LABELS[item.category].en;
    const description = language === "pt" && item.descriptionPt ? item.descriptionPt : item.description;

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
                    />

                    {/* Modal */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 20 }}
                        transition={{ type: "spring", duration: 0.5, bounce: 0.3 }}
                        className="fixed z-50 w-full max-w-lg pointer-events-none flex items-center justify-center"
                    >
                        <GlassCard
                            className="w-full pointer-events-auto relative overflow-hidden bg-slate-900/80 border-white/10 shadow-2xl shadow-purple-900/20"
                        >
                            {/* Header Image / Icon Area */}
                            <div className={cn(
                                "h-32 w-full flex items-center justify-center relative overflow-hidden",
                                item.game === "stardew"
                                    ? "bg-gradient-to-br from-amber-500/20 via-orange-500/10 to-transparent"
                                    : "bg-gradient-to-br from-cyan-500/20 via-blue-500/10 to-transparent"
                            )}>
                                <div className="absolute inset-0 bg-grid-white/[0.05] [mask-image:linear-gradient(0deg,transparent,black)]" />

                                <motion.div
                                    initial={{ scale: 0.8, opacity: 0 }}
                                    animate={{ scale: 1, opacity: 1 }}
                                    transition={{ delay: 0.1 }}
                                    className={cn(
                                        "p-4 rounded-2xl backdrop-blur-md border shadow-xl relative z-10",
                                        item.game === "stardew"
                                            ? "bg-amber-500/20 border-amber-500/30 text-amber-300"
                                            : "bg-cyan-500/20 border-cyan-500/30 text-cyan-300"
                                    )}
                                >
                                    <Icon className="w-12 h-12" />
                                </motion.div>

                                <button
                                    onClick={onClose}
                                    className="absolute top-4 right-4 p-2 rounded-full bg-black/20 hover:bg-black/40 text-white/60 hover:text-white transition-colors backdrop-blur-md"
                                >
                                    <X className="w-5 h-5" />
                                </button>
                            </div>

                            {/* Content */}
                            <div className="p-6 space-y-6">
                                <div>
                                    <div className="flex items-start justify-between gap-4">
                                        <div>
                                            <h2 className="text-2xl font-semibold text-white tracking-tight">{displayName}</h2>
                                            <p className="text-white/50 flex items-center gap-2 text-sm mt-1">
                                                <span>{displayCategory}</span>
                                                <span>•</span>
                                                <span className={cn(
                                                    "px-2 py-0.5 rounded-full text-xs font-medium",
                                                    item.game === "stardew"
                                                        ? "bg-amber-500/10 text-amber-300 ring-1 ring-amber-500/20"
                                                        : "bg-cyan-500/10 text-cyan-300 ring-1 ring-cyan-500/20"
                                                )}>
                                                    {item.game === "stardew" ? "Stardew Valley" : "Hytale"}
                                                </span>
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                {description && (
                                    <p className="text-white/70 leading-relaxed text-sm">
                                        {description}
                                    </p>
                                )}

                                <div className="grid grid-cols-2 gap-4">
                                    <div className="p-3 rounded-xl bg-white/5 border border-white/5 space-y-1">
                                        <p className="text-xs text-white/40 uppercase tracking-wider font-medium">
                                            {language === "pt" ? "Valor Base" : "Base Value"}
                                        </p>
                                        <p className="text-white font-medium flex items-center gap-1">
                                            {item.value !== undefined ? (
                                                <>
                                                    <span className="text-lg">{item.value}</span>
                                                    <span className="text-sm text-amber-400">g</span>
                                                </>
                                            ) : (
                                                <span className="text-white/50">-</span>
                                            )}
                                        </p>
                                    </div>
                                    <div className="p-3 rounded-xl bg-white/5 border border-white/5 space-y-1">
                                        <p className="text-xs text-white/40 uppercase tracking-wider font-medium">
                                            {language === "pt" ? "Fonte" : "Source"}
                                        </p>
                                        <p className="text-white font-medium flex items-center gap-2">
                                            {item.source || <span className="text-white/50">-</span>}
                                            {item.source && <ExternalLink className="w-3 h-3 text-white/30" />}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </GlassCard>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}
