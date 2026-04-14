import { useScrollReveal } from "@/hooks/useScrollReveal";
import { Link } from "react-router-dom";

export default function About() {
  const { ref, isVisible } = useScrollReveal(0.15);

  return (
    <section id="about" className="section-space section-shell section-transition" ref={ref}>
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-14 lg:gap-10 items-start">
        <div
          className={`lg:col-span-4 transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <p className="eyebrow mb-8">About FP Conglomerate</p>
          <blockquote className="font-editorial text-3xl md:text-4xl text-foreground leading-[1.2]">
            "We do not just make promises.
            <span className="text-accent"> We deliver with trust and audacity."</span>
          </blockquote>
        </div>

        <div
          className={`lg:col-span-7 lg:col-start-6 transition-all duration-700 delay-200 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <div className="space-y-8 text-muted-foreground text-[1.03rem] leading-[1.85]">
            <p>
              FP Conglomerate is a parent group created to bridge the trust gap in
              service delivery. Our institutions serve different markets, but they
              operate with one group standard for accountability and quality.
            </p>
            <p>
              From ministry and humanitarian response to electronics, media, real
              estate, and hospitality, we focus on practical solutions that improve
              lives and strengthen confidence in what we deliver.
            </p>
            <p>
              Trust, Excellence, Integrity, and Service are more than values to us.
              They are daily operating requirements across every business unit.
            </p>
          </div>
          <Link to="/about" className="inline-block mt-10 text-sm text-accent">
            Learn more about our story and mission →
          </Link>
        </div>
      </div>
    </section>
  );
}
