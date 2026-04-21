import { NavLink } from "react-router-dom";
import { cn } from "@/lib/utils";

/** Single flat menu — no separate “Site content” section; all entries at the same level. */
const menuItems: { to: string; label: string; end?: boolean }[] = [
  { to: "/leads", label: "Inquiries" },
  { to: "/cms/marketing", label: "Blog & hiring" },
  { to: "/cms/portfolio", label: "Portfolio" },
];

type AdminSidebarNavProps = {
  /** Close mobile sheet after navigation */
  onNavigate?: () => void;
  className?: string;
};

export default function AdminSidebarNav({ onNavigate, className }: AdminSidebarNavProps) {
  return (
    <div className={cn("flex h-full flex-col", className)}>
      <div className="border-b border-border/80 px-4 py-5">
        <p className="font-editorial text-xl tracking-tight text-foreground">FP</p>
        <p className="text-[11px] font-medium uppercase tracking-[0.2em] text-muted-foreground">Staff admin</p>
      </div>
      <nav className="flex-1 overflow-y-auto px-3 py-4" aria-label="Admin">
        <ul className="space-y-0.5">
          {menuItems.map((item) => (
            <li key={item.to}>
              <NavLink
                to={item.to}
                end={item.end ?? true}
                onClick={() => onNavigate?.()}
                className={({ isActive }) =>
                  cn(
                    "block rounded-md px-2.5 py-2 text-sm transition-colors",
                    isActive
                      ? "bg-muted font-medium text-foreground shadow-sm"
                      : "text-muted-foreground hover:bg-muted/60 hover:text-foreground",
                  )
                }
              >
                {item.label}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}
