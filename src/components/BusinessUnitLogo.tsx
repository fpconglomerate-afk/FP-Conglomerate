import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import type { BusinessUnit } from "@/content/brand";

type BusinessUnitLogoProps = {
  unit: BusinessUnit;
  className?: string;
};

export default function BusinessUnitLogo({ unit, className }: BusinessUnitLogoProps) {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const isDark = mounted && resolvedTheme === "dark";
  const logoSrc = isDark
    ? unit.logoDark ?? unit.logo ?? unit.logoLight
    : unit.logoLight ?? unit.logo ?? unit.logoDark;

  if (!logoSrc) {
    return null;
  }

  return (
    <img
      src={logoSrc}
      alt={`${unit.name} logo`}
      className={className ?? "h-10 w-auto object-contain"}
    />
  );
}
