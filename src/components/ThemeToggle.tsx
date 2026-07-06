import { Moon, Sun } from "lucide-react";
import { useTheme } from "@/hooks/useTheme";

export function ThemeToggle() {
    const { theme, toggleTheme } = useTheme();

    return (
        <button
            onClick={toggleTheme}
            className="p-2 rounded-full hover:bg-white/10 active:bg-white/15 transition-colors"
            aria-label={theme === "dark" ? "Cambiar a modo claro" : "Cambiar a modo oscuro"}
            title={theme === "dark" ? "Modo claro" : "Modo oscuro"}
        >
            {theme === "dark" ? (
                <Sun className="w-5 h-5 text-white/70" />
            ) : (
                <Moon className="w-5 h-5 text-white/70" />
            )}
        </button>
    );
}
