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
  const { user, completedItems, markItemsAsCompleted, markItemsAsIncomplete } = useAuth();
  const [search, setSearch] = useState("");
  const [gameFilter, setGameFilter] = useState<GameSource | "all">("all");
  const [categoryFilter, setCategoryFilter] = useState<ItemCategory | "all">("all");
  const [completionFilter, setCompletionFilter] = useState<"all" | "completed" | "incomplete">("all");
  const [compareMode, setCompareMode] = useState(false);
  const [selectedItem, setSelectedItem] = useState<Item | null>(null);

  // Selection Mode State
  const [isSelectionMode, setIsSelectionMode] = useState(false);
  const [selectedItems, setSelectedItems] = useState<Set<string>>(new Set());

  // Items that exist in BOTH games
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

  // Selection Handlers
  const toggleSelectionMode = () => {
    if (isSelectionMode) {
      setIsSelectionMode(false);
      setSelectedItems(new Set());
    } else {
      setIsSelectionMode(true);
    }
  };

  const toggleItemSelection = (id: string) => {
    const newSelected = new Set(selectedItems);
    if (newSelected.has(id)) {
      newSelected.delete(id);
    } else {
      newSelected.add(id);
    }
    setSelectedItems(newSelected);
  };

  const selectAll = () => {
    const allIds = new Set(filteredItems.map(i => i.id));
    setSelectedItems(allIds);
  };

  const deselectAll = () => {
    setSelectedItems(new Set());
  };

  const handleBatchComplete = async () => {
    await markItemsAsCompleted(Array.from(selectedItems));
    setSelectedItems(new Set());
    setIsSelectionMode(false);
  };

  const handleBatchIncomplete = async () => {
    await markItemsAsIncomplete(Array.from(selectedItems));
    setSelectedItems(new Set());
    setIsSelectionMode(false);
  };

  return (
    <div className="space-y-8 max-w-7xl mx-auto pb-20 px-8 lg:px-12 pt-24 lg:pt-32">
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

        {/* Filters & Actions Toolbar */}
        <GlassCard className="p-6 space-y-6 backdrop-blur-xl bg-slate-900/80 border-white/10 shadow-2xl">
          {/* Top Row: Search and Primary Controls */}
          <div className="flex flex-col lg:flex-row gap-4 justify-between items-start lg:items-center">
            {/* Search Input */}
            <div className="relative w-full lg:max-w-md group">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-white/40 group-focus-within:text-purple-400 transition-colors" />
              </div>
              <input
                type="text"
                placeholder={language === "pt" ? "Buscar por nome..." : "Search by name..."}
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="block w-full pl-10 pr-3 py-2.5 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-white/30 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50 transition-all shadow-sm hover:bg-white/10"
              />
            </div>

            {/* Action Buttons Group */}
            <div className="flex flex-wrap items-center gap-2 w-full lg:w-auto justify-end">
              {/* Selection Mode Toggle */}
              {user && (
                <button
                  onClick={toggleSelectionMode}
                  className={cn(
                    "px-3 py-2 rounded-lg text-sm font-medium transition-all border flex items-center gap-2",
                    isSelectionMode
                      ? "bg-amber-500/20 border-amber-500/50 text-amber-200 shadow-[0_0_10px_rgba(245,158,11,0.1)]"
                      : "bg-white/5 border-white/10 text-white/60 hover:bg-white/10 hover:text-white"
                  )}
                  title={isSelectionMode ? (language === "pt" ? "Cancelar Seleção" : "Cancel Selection") : (language === "pt" ? "Modo de Seleção" : "Selection Mode")}
                >
                  <Box className="w-4 h-4" />
                  <span className="hidden sm:inline">{isSelectionMode ? t("items.cancel_selection") : t("items.select_mode")}</span>
                </button>
              )}

              {/* Compare Toggle */}
              <button
                onClick={() => setCompareMode(!compareMode)}
                className={cn(
                  "px-3 py-2 rounded-lg text-sm font-medium transition-all border flex items-center gap-2",
                  compareMode
                    ? "bg-cyan-500/20 border-cyan-500/50 text-cyan-200 shadow-[0_0_10px_rgba(6,182,212,0.1)]"
                    : "bg-white/5 border-white/10 text-white/60 hover:bg-white/10 hover:text-white"
                )}
                title={language === "pt" ? "Mostrar apenas itens compartilhados" : "Show shared items only"}
              >
                <GitCompare className="w-4 h-4" />
                <span className="hidden sm:inline">{language === "pt" ? "Comparar" : "Compare"}</span>
              </button>
            </div>
          </div>

          <div className="h-px bg-white/5 w-full" />

          {/* Middle Row: Filter Groups */}
          <div className="flex flex-col md:flex-row gap-6 justify-between items-start md:items-center">
            {/* Game Source Filter */}
            <div className="space-y-2 w-full md:w-auto">
              <label className="text-[10px] uppercase tracking-wider font-semibold text-white/30 pl-1">
                {language === "pt" ? "Origem" : "Source"}
              </label>
              <div className="flex bg-slate-950/50 p-1 rounded-xl border border-white/5 w-full md:w-auto overflow-x-auto">
                {(["all", "stardew", "hytale"] as const).map((g) => (
                  <button
                    key={g}
                    onClick={() => setGameFilter(g)}
                    className={cn(
                      "flex-1 md:flex-none px-4 py-1.5 rounded-lg text-xs font-medium transition-all whitespace-nowrap",
                      gameFilter === g
                        ? "bg-purple-500 text-white shadow-lg"
                        : "text-white/40 hover:text-white hover:bg-white/5"
                    )}
                  >
                    {g === "all" ? (language === "pt" ? "Todos" : "All") : g === "stardew" ? "Stardew Valley" : "Hytale"}
                  </button>
                ))}
              </div>
            </div>

            {/* Status Filter (Logged In) */}
            {user && (
              <div className="space-y-2 w-full md:w-auto">
                <label className="text-[10px] uppercase tracking-wider font-semibold text-white/30 pl-1">
                  {language === "pt" ? "Estado" : "Status"}
                </label>
                <div className="flex bg-slate-950/50 p-1 rounded-xl border border-white/5 w-full md:w-auto overflow-x-auto">
                  {(["all", "incomplete", "completed"] as const).map((filter) => (
                    <button
                      key={filter}
                      onClick={() => setCompletionFilter(filter)}
                      className={cn(
                        "flex-1 md:flex-none px-4 py-1.5 rounded-lg text-xs font-medium transition-all whitespace-nowrap",
                        completionFilter === filter
                          ? "bg-emerald-500 text-white shadow-lg"
                          : "text-white/40 hover:text-white hover:bg-white/5"
                      )}
                    >
                      {filter === "all"
                        ? (language === "pt" ? "Todos" : "All")
                        : filter === "completed"
                          ? (language === "pt" ? "Completos" : "Completed")
                          : (language === "pt" ? "Pendentes" : "Pending")}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Categories */}
          <div className="space-y-3">
            <label className="text-[10px] uppercase tracking-wider font-semibold text-white/30 pl-1">
              {language === "pt" ? "Categorias" : "Categories"}
            </label>
            <div className="flex flex-wrap gap-2">
              {(["all", ...Object.keys(CATEGORY_LABELS)] as (ItemCategory | "all")[]).map((cat) => {
                const Icon = cat !== "all" ? CATEGORY_ICONS[cat] : null;
                const isActive = categoryFilter === cat;
                return (
                  <button
                    key={cat}
                    onClick={() => setCategoryFilter(cat)}
                    className={cn(
                      "px-3 py-2 rounded-lg text-xs font-medium transition-all border flex items-center gap-2",
                      isActive
                        ? "bg-white/10 border-white/20 text-white shadow-sm"
                        : "bg-transparent border-transparent text-white/40 hover:bg-white/5 hover:text-white/80"
                    )}
                  >
                    {Icon && <Icon className={cn("w-3.5 h-3.5", isActive ? "text-purple-400" : "opacity-50")} />}
                    {cat === "all" ? (language === "pt" ? "Todas" : "All") : getCategoryLabel(cat)}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Selection Bar */}
          {isSelectionMode && (
            <div className="pt-4 mt-2 border-t border-white/10 animate-in fade-in zoom-in-95 duration-200">
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-amber-500/10 border border-amber-500/20 rounded-xl p-3">
                <div className="flex items-center gap-3">
                  <div className="bg-amber-500/20 p-2 rounded-lg text-amber-200">
                    <CheckCircle className="w-5 h-5" />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-sm font-medium text-amber-100">
                      {t("items.selected_count").replace("{count}", selectedItems.size.toString())}
                    </span>
                    <div className="flex gap-3 text-xs">
                      <button onClick={selectAll} className="text-amber-200/60 hover:text-amber-200 underline transition-colors">
                        {t("items.select_all")}
                      </button>
                      <button onClick={deselectAll} className="text-amber-200/60 hover:text-amber-200 underline transition-colors">
                        {t("items.deselect_all")}
                      </button>
                    </div>
                  </div>
                </div>

                <div className="flex gap-2 w-full sm:w-auto">
                  <button
                    onClick={handleBatchIncomplete}
                    disabled={selectedItems.size === 0}
                    className="flex-1 sm:flex-none px-4 py-2 rounded-lg bg-slate-900/50 hover:bg-slate-900 text-white/70 hover:text-white text-xs font-medium transition-colors border border-white/5 disabled:opacity-50"
                  >
                    {t("items.mark_incomplete")}
                  </button>
                  <button
                    onClick={handleBatchComplete}
                    disabled={selectedItems.size === 0}
                    className="flex-1 sm:flex-none px-4 py-2 rounded-lg bg-emerald-500 hover:bg-emerald-600 text-white text-xs font-medium transition-all shadow-lg shadow-emerald-500/20 disabled:opacity-50 flex items-center justify-center gap-2"
                  >
                    <CheckCircle className="w-3.5 h-3.5" />
                    {t("items.mark_complete")}
                  </button>
                </div>
              </div>
            </div>
          )}

        </GlassCard>

        {/* Results Grid */}
        <div className="space-y-4">
          <p className="text-sm text-white/50">
            {filteredItems.length} {language === "pt" ? "itens encontrados" : "items found"}
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {filteredItems.map((item) => {
              const Icon = CATEGORY_ICONS[item.category];
              const isCompleted = completedItems.has(item.id);
              const isSelected = selectedItems.has(item.id);

              return (
                <GlassCard
                  key={item.id}
                  variant="hoverable"
                  className={cn(
                    "p-4 flex flex-col gap-2 min-h-[100px] transition-all duration-300 relative group",
                    isCompleted && "border-emerald-500/30 bg-emerald-500/5 shadow-[0_0_15px_rgba(16,185,129,0.1)]",
                    isSelectionMode && isSelected && "ring-2 ring-amber-500 ring-offset-2 ring-offset-slate-900 bg-amber-500/5",
                    isSelectionMode && !isSelected && "opacity-60 hover:opacity-100"
                  )}
                  onClick={() => {
                    if (isSelectionMode) {
                      toggleItemSelection(item.id);
                    } else {
                      setSelectedItem(item);
                    }
                  }}
                >
                  {/* Selection Checkbox Overlay */}
                  {isSelectionMode && (
                    <div className={cn(
                      "absolute top-3 right-3 w-5 h-5 rounded-md border transition-all z-10 flex items-center justify-center",
                      isSelected
                        ? "bg-amber-500 border-amber-500 text-slate-900"
                        : "bg-black/40 border-white/20 group-hover:border-white/50"
                    )}>
                      {isSelected && <CheckCircle className="w-3.5 h-3.5 fill-current" />}
                    </div>
                  )}

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

                    {!isSelectionMode && (
                      <span className={cn(
                        "text-xs px-2 py-0.5 rounded-full shrink-0",
                        item.game === "stardew" ? "bg-amber-500/20 text-amber-300" : "bg-cyan-500/20 text-cyan-300"
                      )}>
                        {item.game === "stardew" ? "SV" : "HY"}
                      </span>
                    )}
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
