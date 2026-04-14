import { Link } from "react-router-dom";
import { useScrollReveal } from "@/hooks/useScrollReveal";

export default function CTASection() {
  const { ref, isVisible } = useScrollReveal(0.2);

  return (
    <section className="section-space section-shell" ref={ref}>
      <div className="border border-border bg-secondary/35 p-10 md:p-16 lg:p-20">
        <div
          className={`transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <p className="eyebrow mb-5">Partnerships</p>
          <h2 className="font-editorial text-4xl sm:text-5xl md:text-6xl text-foreground leading-[1.08] max-w-4xl">
            Build With a Group That Takes Trust Personally.
          </h2>
          <div className="brand-divider w-24 mt-7" />
          <p className="mt-8 text-muted-foreground max-w-2xl leading-relaxed text-lg">
            Planning a partnership, project, or long-term collaboration? Tell us your
            priorities and we will route your request to the right unit.
          </p>
          <div className="mt-12">
            <Link
              to="/contact"
              className="inline-block bg-foreground text-background px-10 py-4 text-sm font-medium tracking-wide hover:bg-foreground/90 transition-colors duration-300"
            >
              Contact Our Team
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
