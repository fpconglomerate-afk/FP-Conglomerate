import { useEffect, useState } from "react";
import { Monitor, Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

export default function ThemeToggle() {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const cycleTheme = () => {
    if (theme === "system") setTheme("light");
    else if (theme === "light") setTheme("dark");
    else setTheme("system");
  };

  const isSystem = theme === "system";
  const label = isSystem
    ? `Follow system appearance (${resolvedTheme === "dark" ? "dark" : "light"})`
    : resolvedTheme === "dark"
      ? "Dark theme (click for system)"
      : "Light theme (click for dark)";

  return (
    <button
      type="button"
      onClick={cycleTheme}
      className="inline-flex h-9 w-9 items-center justify-center border border-border text-foreground hover:bg-secondary transition-colors"
      aria-label={label}
      title={label}
      aria-busy={!mounted}
    >
      {!mounted ? (
        <span className="size-4" aria-hidden />
      ) : isSystem ? (
        <Monitor size={16} strokeWidth={1.75} aria-hidden />
      ) : resolvedTheme === "dark" ? (
        <Sun size={16} aria-hidden />
      ) : (
        <Moon size={16} aria-hidden />
      )}
    </button>
  );
}
