import { useState, useMemo } from "react";
import { Languages, Search, X } from "lucide-react";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
} from "@/components/ui/dialog";
import { PHRASE_CATEGORIES } from "@/data/phrases";
import type { Phrase } from "@/data/phrases";

const ALL_CATEGORY_ID = "all";

function PhraseCard({ phrase }: { phrase: Phrase }) {
    return (
        <div className="rounded-xl border border-white/[0.08] bg-white/[0.03] p-4 space-y-3 hover:bg-white/[0.06] transition-colors">
            <p className="text-sm font-semibold text-white/90">{phrase.spanish}</p>

            <div className="space-y-2">
                <div className="flex items-start gap-2">
                    <span className="text-base leading-none mt-0.5 shrink-0">🇬🇧</span>
                    <p className="text-sm text-white/70">{phrase.english}</p>
                </div>

                <div className="flex items-start gap-2">
                    <span className="text-base leading-none mt-0.5 shrink-0">🇫🇷</span>
                    <div>
                        <p className="text-sm text-white/70">{phrase.french}</p>
                        <p className="text-xs text-blue-400/70 italic mt-0.5">
                            /{phrase.frenchPronunciation}/
                        </p>
                    </div>
                </div>

                <div className="flex items-start gap-2">
                    <span className="text-base leading-none mt-0.5 shrink-0">🇳🇱</span>
                    <div>
                        <p className="text-sm text-white/70">{phrase.dutch}</p>
                        <p className="text-xs text-orange-400/70 italic mt-0.5">
                            /{phrase.dutchPronunciation}/
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export function Phrasebook() {
    const [open, setOpen] = useState(false);
    const [activeCategory, setActiveCategory] = useState(ALL_CATEGORY_ID);
    const [search, setSearch] = useState("");

    const filteredPhrases = useMemo(() => {
        const categories =
            activeCategory === ALL_CATEGORY_ID
                ? PHRASE_CATEGORIES
                : PHRASE_CATEGORIES.filter((c) => c.id === activeCategory);

        if (!search.trim()) return categories;

        const q = search.toLowerCase();
        return categories
            .map((cat) => ({
                ...cat,
                phrases: cat.phrases.filter(
                    (p) =>
                        p.spanish.toLowerCase().includes(q) ||
                        p.english.toLowerCase().includes(q) ||
                        p.french.toLowerCase().includes(q) ||
                        p.dutch.toLowerCase().includes(q)
                ),
            }))
            .filter((cat) => cat.phrases.length > 0);
    }, [activeCategory, search]);

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <button
                onClick={() => setOpen(true)}
                className="p-2 rounded-full hover:bg-white/10 active:bg-white/15 transition-colors"
                aria-label="Frases útiles"
                title="Frases útiles"
            >
                <Languages className="w-5 h-5 text-white/70" />
            </button>

            <DialogContent
                showCloseButton={false}
                className="bg-[#1c1c1e]/95 backdrop-blur-2xl border border-white/[0.12] shadow-2xl text-white p-0 overflow-hidden flex flex-col
                    max-md:!fixed max-md:!inset-0 max-md:!translate-x-0 max-md:!translate-y-0 max-md:!top-0 max-md:!left-0 max-md:!max-w-none max-md:!w-screen max-md:!h-dvh max-md:!rounded-none max-md:!border-0
                    md:rounded-2xl md:max-w-4xl md:w-[90vw] md:max-h-[85vh]"
            >
                <DialogHeader className="px-5 pt-5 pb-0 shrink-0">
                    <div className="flex items-center justify-between">
                        <DialogTitle className="text-xl font-semibold text-white tracking-tight flex items-center gap-2">
                            <Languages className="w-5 h-5 text-blue-400" />
                            Frases de Viaje
                        </DialogTitle>
                        <button
                            onClick={() => setOpen(false)}
                            className="md:hidden p-2 -mr-2 rounded-full hover:bg-white/10 transition-colors"
                            aria-label="Cerrar"
                        >
                            <X className="w-5 h-5 text-white/60" />
                        </button>
                    </div>
                    <DialogDescription className="text-white/50 text-sm mt-1">
                        Frases comunes en inglés, francés y neerlandés
                    </DialogDescription>

                    <div className="relative mt-3">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
                        <input
                            type="text"
                            placeholder="Buscar frase..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="w-full pl-9 pr-4 py-2.5 rounded-xl bg-white/[0.06] border border-white/[0.08] text-sm text-white placeholder:text-white/30 focus:outline-none focus:ring-1 focus:ring-blue-500/40 focus:border-blue-500/30 transition-all"
                        />
                        {search && (
                            <button
                                onClick={() => setSearch("")}
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-white/30 hover:text-white/60"
                            >
                                <X className="w-3.5 h-3.5" />
                            </button>
                        )}
                    </div>

                    <div className="flex gap-2 mt-3 pb-3 overflow-x-auto scrollbar-hide">
                        <button
                            onClick={() => setActiveCategory(ALL_CATEGORY_ID)}
                            className={`shrink-0 px-3 py-1.5 rounded-full text-xs font-medium transition-all ${activeCategory === ALL_CATEGORY_ID
                                ? "bg-blue-500/20 text-blue-400 border border-blue-500/30"
                                : "bg-white/[0.05] text-white/50 border border-white/[0.08] hover:bg-white/[0.08] hover:text-white/70"
                                }`}
                        >
                            Todas
                        </button>
                        {PHRASE_CATEGORIES.map((cat) => (
                            <button
                                key={cat.id}
                                onClick={() => setActiveCategory(cat.id)}
                                className={`shrink-0 px-3 py-1.5 rounded-full text-xs font-medium transition-all ${activeCategory === cat.id
                                    ? "bg-blue-500/20 text-blue-400 border border-blue-500/30"
                                    : "bg-white/[0.05] text-white/50 border border-white/[0.08] hover:bg-white/[0.08] hover:text-white/70"
                                    }`}
                            >
                                {cat.emoji} {cat.label}
                            </button>
                        ))}
                    </div>
                </DialogHeader>

                <div className="flex-1 overflow-y-auto px-5 pb-5 space-y-6 min-h-0">
                    {filteredPhrases.length === 0 ? (
                        <div className="flex flex-col items-center justify-center py-16 text-white/30">
                            <Search className="w-8 h-8 mb-3" />
                            <p className="text-sm">No se encontraron frases</p>
                        </div>
                    ) : (
                        filteredPhrases.map((category) => (
                            <div key={category.id}>
                                <h3 className="text-sm font-semibold text-white/60 uppercase tracking-wider mb-3 flex items-center gap-2">
                                    <span>{category.emoji}</span>
                                    {category.label}
                                </h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                    {category.phrases.map((phrase, i) => (
                                        <PhraseCard key={`${category.id}-${i}`} phrase={phrase} />
                                    ))}
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </DialogContent>
        </Dialog>
    );
}
