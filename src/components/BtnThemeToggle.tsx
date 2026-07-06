import { Sun, Moon } from "react-feather";
import type { BtnThemeToggleProps } from "../types/Types";

export default function BtnThemeToggle({ theme, setTheme }: BtnThemeToggleProps) {
    return (
        <button
            className={`
                bg-transparent rounded-full border-none text-text
                cursor-pointer
                p-2
            `}
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            aria-label={`Switch to ${theme === "light" ? "dark" : "light"} mode`}>
            {theme === "light" ? <Moon size={20} strokeWidth={2} /> : <Sun size={20} strokeWidth={2} />}
        </button>
    );
}