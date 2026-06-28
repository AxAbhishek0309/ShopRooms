import { create } from "zustand";

type Theme = "light" | "dark" | "system";

interface ThemeState {
  theme: Theme;
  resolved: "light" | "dark";
  setTheme: (theme: Theme) => void;
  init: () => void;
}

const resolve = (theme: Theme): "light" | "dark" => {
  if (theme === "system") {
    if (typeof window === "undefined") return "light";
    return window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light";
  }
  return theme;
};

const apply = (resolved: "light" | "dark") => {
  if (typeof document === "undefined") return;
  document.documentElement.classList.toggle("dark", resolved === "dark");
};

export const useThemeStore = create<ThemeState>((set, get) => ({
  theme: "system",
  resolved: "light",
  setTheme: (theme) => {
    if (typeof window !== "undefined") {
      localStorage.setItem("shoprooms-theme", theme);
    }
    const resolved = resolve(theme);
    apply(resolved);
    set({ theme, resolved });
  },
  init: () => {
    if (typeof window === "undefined") return;
    const stored = (localStorage.getItem("shoprooms-theme") as Theme) || "system";
    const resolved = resolve(stored);
    apply(resolved);
    set({ theme: stored, resolved });
    const mq = window.matchMedia("(prefers-color-scheme: dark)");
    mq.addEventListener("change", () => {
      if (get().theme === "system") {
        const r = resolve("system");
        apply(r);
        set({ resolved: r });
      }
    });
  },
}));
