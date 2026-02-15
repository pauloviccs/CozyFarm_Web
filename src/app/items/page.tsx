"use client";

import { useState, useMemo } from "react";
import { GlassCard } from "@/components/ui/glass-card";
import { ItemModal } from "@/components/ui/ItemModal";
import { useLanguage } from "@/context/LanguageContext";
import { ITEMS, type Item, type GameSource, type ItemCategory } from "@/data/items";
import { Search, Package, Sprout, Factory, Wheat, Egg, UtensilsCrossed, Flower2, Box, GitCompare, CheckCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { useAuth } from "@/context/AuthContext";

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

export default function ItemsPage() {
  const { t, language } = useLanguage();
  const { user, completedItems } = useAuth();
  const [search, setSearch] = useState("");
  const [gameFilter, setGameFilter] = useState<GameSource | "all">("all");
  const [categoryFilter, setCategoryFilter] = useState<ItemCategory | "all">("all");
  const [completionFilter, setCompletionFilter] = useState<"all" | "completed" | "incomplete">("all");
  const [compareMode, setCompareMode] = useState(false);
  const [selectedItem, setSelectedItem] = useState<Item | null>(null);

  // Items that exist in BOTH games (matched by normalized English name)
  const sharedItemNames = useMemo(() => {
    const svNames = new Set(ITEMS.filter((i) => i.game === "stardew").map((i) => i.name.toLowerCase().trim()));
    const hyNames = new Set(ITEMS.filter((i) => i.game === "hytale").map((i) => i.name.toLowerCase().trim()));
    return new Set([...svNames].filter((n) => hyNames.has(n)));
  }, []);

  const filteredItems = useMemo(() => {
    return ITEMS.filter((item) => {
      const name = language === "pt" && item.namePt ? item.namePt : item.name;
      const matchesSearch = !search || name.toLowerCase().includes(search.toLowerCase()) || item.name.toLowerCase().includes(search.toLowerCase());
      const matchesGame = gameFilter === "all" || item.game === gameFilter;
      const matchesCategory = categoryFilter === "all" || item.category === categoryFilter;
      const matchesCompare = !compareMode || sharedItemNames.has(item.name.toLowerCase().trim());

      const isCompleted = completedItems.has(item.id);
      const matchesCompletion =
        completionFilter === "all" ||
        (completionFilter === "completed" && isCompleted) ||
        (completionFilter === "incomplete" && !isCompleted);

      return matchesSearch && matchesGame && matchesCategory && matchesCompare && matchesCompletion;
    });
  }, [search, gameFilter, categoryFilter, compareMode, sharedItemNames, language, completionFilter, completedItems]);

  const getItemDisplayName = (item: Item) => (language === "pt" && item.namePt ? item.namePt : item.name);

  const getCategoryLabel = (cat: ItemCategory) => (language === "pt" ? CATEGORY_LABELS[cat].pt : CATEGORY_LABELS[cat].en);

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      <section className="space-y-6">
        <div className="flex flex-col gap-2">
          <h1 className="text-4xl font-light text-white tracking-tight">
            {language === "pt" ? "Banco de Itens" : "Item Database"}
          </h1>
          <p className="text-white/60 text-lg font-light max-w-3xl leading-relaxed">
            {language === "pt"
              ? "Itens de agricultura, processamento e culinária de Stardew Valley e Hytale. Use os filtros para encontrar itens específicos."
              : "Agriculture, processing, and cooking items from Stardew Valley and Hytale. Use filters to find specific items."}
          </p>
        </div>

        {/* Filters */}
        <GlassCard className="p-6 space-y-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
              <input
                type="text"
                placeholder={language === "pt" ? "Buscar itens..." : "Search items..."}
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-white/40 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500/50"
              />
            </div>
            <div className="flex gap-2 flex-wrap items-center">
              {(["all", "stardew", "hytale"] as const).map((g) => (
                <button
                  key={g}
                  onClick={() => setGameFilter(g)}
                  className={cn(
                    "px-4 py-2 rounded-lg text-sm font-medium transition-all border",
                    gameFilter === g
                      ? "bg-purple-500/20 border-purple-500 text-purple-200"
                      : "bg-white/5 border-white/10 text-white/60 hover:bg-white/10 hover:text-white"
                  )}
                >
                  {g === "all" ? (language === "pt" ? "Todos" : "All") : g === "stardew" ? "Stardew Valley" : "Hytale"}
                </button>
              ))}
              <button
                onClick={() => setCompareMode(!compareMode)}
                className={cn(
                  "px-4 py-2 rounded-lg text-sm font-medium transition-all border flex items-center gap-2",
                  compareMode
                    ? "bg-cyan-500/20 border-cyan-500 text-cyan-200"
                    : "bg-white/5 border-white/10 text-white/60 hover:bg-white/10 hover:text-white"
                )}
                title={language === "pt" ? "Mostrar apenas itens que existem em ambos os jogos" : "Show only items that exist in both games"}
              >
                <GitCompare className="w-4 h-4" />
                {language === "pt" ? "Comparar" : "Compare"}
              </button>

              {/* Completion Filter (Only if logged in) */}
              {user && (
                <div className="flex bg-white/5 rounded-lg border border-white/10 p-1">
                  {(["all", "incomplete", "completed"] as const).map((filter) => (
                    <button
                      key={filter}
                      onClick={() => setCompletionFilter(filter)}
                      className={cn(
                        "px-3 py-1.5 rounded-md text-xs font-medium transition-all",
                        completionFilter === filter
                          ? "bg-white/10 text-white shadow-sm"
                          : "text-white/40 hover:text-white/70"
                      )}
                    >
                      {filter === "all"
                        ? (language === "pt" ? "Todos" : "All")
                        : filter === "completed"
                          ? (language === "pt" ? "Completos" : "Completed")
                          : (language === "pt" ? "Pendentes" : "Incomplete")}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
          <div className="flex flex-wrap gap-2">
            {(["all", ...Object.keys(CATEGORY_LABELS)] as (ItemCategory | "all")[]).map((cat) => {
              const Icon = cat !== "all" ? CATEGORY_ICONS[cat] : null;
              return (
                <button
                  key={cat}
                  onClick={() => setCategoryFilter(cat)}
                  className={cn(
                    "px-3 py-1.5 rounded-lg text-xs font-medium transition-all border flex items-center gap-2",
                    categoryFilter === cat
                      ? "bg-emerald-500/20 border-emerald-500 text-emerald-200"
                      : "bg-white/5 border-white/10 text-white/50 hover:bg-white/10 hover:text-white"
                  )}
                >
                  {Icon && <Icon className="w-3.5 h-3.5" />}
                  {cat === "all" ? (language === "pt" ? "Todas" : "All") : getCategoryLabel(cat)}
                </button>
              );
            })}
          </div>
        </GlassCard>

        {/* Results */}
        <div className="space-y-4">
          <p className="text-sm text-white/50">
            {filteredItems.length} {language === "pt" ? "itens encontrados" : "items found"}
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {filteredItems.map((item) => {
              const Icon = CATEGORY_ICONS[item.category];
              const isCompleted = completedItems.has(item.id);
              return (
                <GlassCard
                  key={item.id}
                  variant="hoverable"
                  className={cn(
                    "p-4 flex flex-col gap-2 min-h-[100px] transition-all duration-500",
                    isCompleted && "border-emerald-500/30 bg-emerald-500/5 shadow-[0_0_15px_rgba(16,185,129,0.1)]"
                  )}
                  onClick={() => setSelectedItem(item)}
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex items-center gap-2 min-w-0">
                      <div className={cn(
                        "p-2 rounded-lg shrink-0 transition-colors",
                        isCompleted
                          ? "bg-emerald-500/20 text-emerald-400"
                          : item.game === "stardew" ? "bg-amber-500/20 text-amber-400" : "bg-cyan-500/20 text-cyan-400"
                      )}>
                        {isCompleted ? <CheckCircle className="w-4 h-4" /> : <Icon className="w-4 h-4" />}
                      </div>
                      <div className="min-w-0">
                        <h3 className={cn("font-medium truncate transition-colors", isCompleted ? "text-emerald-200" : "text-white")}>
                          {getItemDisplayName(item)}
                        </h3>
                        <p className="text-xs text-white/40">{getCategoryLabel(item.category)}</p>
                      </div>
                    </div>
                    <span className={cn(
                      "text-xs px-2 py-0.5 rounded-full shrink-0",
                      item.game === "stardew" ? "bg-amber-500/20 text-amber-300" : "bg-cyan-500/20 text-cyan-300"
                    )}>
                      {item.game === "stardew" ? "SV" : "HY"}
                    </span>
                  </div>
                  {(item.value !== undefined || item.source) && (
                    <div className="flex flex-wrap gap-2 text-xs text-white/50 mt-auto pt-2 border-t border-white/5">
                      {item.value !== undefined && item.value > 0 && (
                        <span>{item.value}g</span>
                      )}
                      {item.source && <span>• {item.source}</span>}
                    </div>
                  )}
                </GlassCard>
              );
            })}
          </div>
        </div>
      </section>

      <ItemModal
        item={selectedItem}
        isOpen={!!selectedItem}
        onClose={() => setSelectedItem(null)}
      />
    </div>
  );
}
