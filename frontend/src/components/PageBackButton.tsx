import { ArrowLeft } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";
import { getHierarchyParent } from "@/navigation/siteHierarchy";

type PageBackButtonProps = {
  /** Hierarchical parent route (preferred). If omitted, derived from the current path. */
  fallbackTo?: string;
  className?: string;
};

export default function PageBackButton({
  fallbackTo,
  className = "",
}: PageBackButtonProps) {
  const navigate = useNavigate();
  const location = useLocation();

  const handleBack = () => {
    const target = fallbackTo ?? getHierarchyParent(location.pathname);

    if (/^https?:\/\//i.test(target)) {
      window.location.assign(target);
      return;
    }

    navigate(target);
  };

  return (
    <button
      type="button"
      onClick={handleBack}
      className={`inline-flex items-center gap-2 border border-border bg-background px-3 py-2 text-xs tracking-wide uppercase text-foreground hover:bg-secondary hover:border-[hsl(var(--premium))] transition-colors ${className}`}
      aria-label="Go back"
    >
      <ArrowLeft size={14} />
      Back
    </button>
  );
}
