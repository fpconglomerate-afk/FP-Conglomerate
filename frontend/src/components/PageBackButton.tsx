import { ArrowLeft } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";

type PageBackButtonProps = {
  fallbackTo?: string;
  className?: string;
};

type NavState = {
  from?: string;
};

export default function PageBackButton({
  fallbackTo = "/",
  className = "",
}: PageBackButtonProps) {
  const navigate = useNavigate();
  const location = useLocation();
  const state = (location.state ?? {}) as NavState;

  const handleBack = () => {
    if (state.from && state.from !== location.pathname) {
      navigate(state.from);
      return;
    }

    if (window.history.length > 1) {
      navigate(-1);
      return;
    }

    if (/^https?:\/\//i.test(fallbackTo)) {
      window.location.assign(fallbackTo);
      return;
    }

    navigate(fallbackTo);
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
