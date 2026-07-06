import { useCallback, useEffect, useState } from "react";

export type Theme = "dark" | "light";

function getStoredTheme(): Theme {
    return localStorage.getItem("theme") === "light" ? "light" : "dark";
}

export function useTheme() {
    const [theme, setTheme] = useState<Theme>(getStoredTheme);

    useEffect(() => {
        document.documentElement.classList.toggle("light", theme === "light");
        localStorage.setItem("theme", theme);
    }, [theme]);

    const toggleTheme = useCallback(() => {
        setTheme((t) => (t === "dark" ? "light" : "dark"));
    }, []);

    return { theme, toggleTheme };
}
