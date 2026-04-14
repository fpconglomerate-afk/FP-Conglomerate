import { useScrollReveal } from "@/hooks/useScrollReveal";

const stats = [
  { value: "98%", label: "Service Delivery Target" },
  { value: "5", label: "Integrated Business Units" },
  { value: "2026", label: "Group Launch Year" },
  { value: "Africa-Focused", label: "Service and Impact Ambition" },
];

export default function ImpactStats() {
  const { ref, isVisible } = useScrollReveal(0.15);

  return (
    <section
      id="impact"
      className="section-space bg-foreground"
      ref={ref}
    >
      <div className="section-shell">
        <div
          className={`mb-20 md:mb-24 transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <p className="eyebrow text-background/70 mb-5">Our Impact</p>
          <h2 className="font-editorial text-4xl md:text-6xl text-background max-w-3xl">
            Credibility is built when words are matched by action.
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px bg-background/10">
          {stats.map((stat, i) => (
            <div
              key={stat.label}
              className={`p-10 md:p-12 bg-foreground/40 transition-all duration-700 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
              }`}
              style={{ transitionDelay: `${200 + i * 150}ms` }}
            >
              <span className="font-editorial text-5xl md:text-6xl lg:text-7xl text-accent block mb-4">
                {stat.value}
              </span>
              <span className="text-sm text-background/70 tracking-wide">
                {stat.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
