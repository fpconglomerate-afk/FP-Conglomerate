import { NavLink } from "react-router-dom";
import { cn } from "@/lib/utils";

const groups: { heading: string; items: { to: string; label: string }[] }[] = [
  { heading: "Overview", items: [{ to: "/leads", label: "Inquiries" }] },
  { heading: "Configuration", items: [{ to: "/settings", label: "Notifications" }] },
  {
    heading: "CMS",
    items: [
      { to: "/cms/blog", label: "Blog" },
      { to: "/cms/hiring", label: "Hiring" },
      { to: "/cms/portfolio", label: "Portfolio" },
    ],
  },
  { heading: "Local", items: [{ to: "/content", label: "Site content" }] },
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
      <nav className="flex-1 space-y-6 overflow-y-auto px-3 py-4" aria-label="Admin">
        {groups.map((g) => (
          <div key={g.heading}>
            <p className="mb-2 px-2 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground/90">
              {g.heading}
            </p>
            <ul className="space-y-0.5">
              {g.items.map((item) => (
                <li key={item.to}>
                  <NavLink
                    to={item.to}
                    end
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
          </div>
        ))}
      </nav>
    </div>
  );
}
