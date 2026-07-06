// text/dot get `light:` variants because the *-300/*-400 shades used on the
// dark theme wash out on a light background.
export const EVENT_STYLES: Record<string, { bg: string; border: string; text: string; dot: string }> = {
    blue: {
        bg: "bg-blue-500/[0.18] light:bg-blue-500/[0.12]",
        border: "border-blue-500/[0.35]",
        text: "text-blue-300 light:text-blue-800",
        dot: "bg-blue-400 light:bg-blue-600",
    },
    red: {
        bg: "bg-red-500/[0.18] light:bg-red-500/[0.12]",
        border: "border-red-500/[0.35]",
        text: "text-red-300 light:text-red-800",
        dot: "bg-red-400 light:bg-red-600",
    },
    green: {
        bg: "bg-green-500/[0.18] light:bg-green-500/[0.12]",
        border: "border-green-500/[0.35]",
        text: "text-green-300 light:text-green-800",
        dot: "bg-green-400 light:bg-green-600",
    },
    purple: {
        bg: "bg-purple-500/[0.18] light:bg-purple-500/[0.12]",
        border: "border-purple-500/[0.35]",
        text: "text-purple-300 light:text-purple-800",
        dot: "bg-purple-400 light:bg-purple-600",
    },
    orange: {
        bg: "bg-orange-500/[0.18] light:bg-orange-500/[0.12]",
        border: "border-orange-500/[0.35]",
        text: "text-orange-300 light:text-orange-800",
        dot: "bg-orange-400 light:bg-orange-600",
    },
    emerald: {
        bg: "bg-emerald-500/[0.18] light:bg-emerald-500/[0.12]",
        border: "border-emerald-500/[0.35]",
        text: "text-emerald-300 light:text-emerald-800",
        dot: "bg-emerald-400 light:bg-emerald-600",
    },
    cyan: {
        bg: "bg-cyan-500/[0.18] light:bg-cyan-500/[0.12]",
        border: "border-cyan-500/[0.35]",
        text: "text-cyan-300 light:text-cyan-800",
        dot: "bg-cyan-400 light:bg-cyan-600",
    },
    amber: {
        bg: "bg-amber-500/[0.18] light:bg-amber-500/[0.12]",
        border: "border-amber-500/[0.35]",
        text: "text-amber-300 light:text-amber-800",
        dot: "bg-amber-400 light:bg-amber-600",
    },
    pink: {
        bg: "bg-pink-500/[0.18] light:bg-pink-500/[0.12]",
        border: "border-pink-500/[0.35]",
        text: "text-pink-300 light:text-pink-800",
        dot: "bg-pink-400 light:bg-pink-600",
    },
    indigo: {
        bg: "bg-indigo-500/[0.18] light:bg-indigo-500/[0.12]",
        border: "border-indigo-500/[0.35]",
        text: "text-indigo-300 light:text-indigo-800",
        dot: "bg-indigo-400 light:bg-indigo-600",
    },
    default: {
        bg: "bg-slate-400/[0.18] light:bg-slate-500/[0.12]",
        border: "border-slate-400/[0.35]",
        text: "text-slate-300 light:text-slate-800",
        dot: "bg-slate-400 light:bg-slate-600",
    },
};
