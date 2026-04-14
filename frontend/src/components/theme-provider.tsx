import * as React from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  return (
    <NextThemesProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      enableColorScheme
      storageKey="fp-conglomerate-ui-theme"
      disableTransitionOnChange
    >
      {children}
    </NextThemesProvider>
  );
}
