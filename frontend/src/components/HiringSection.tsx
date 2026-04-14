import { Link } from "react-router-dom";
import { useSiteContent } from "@/content/SiteContentContext";
import MediaAsset from "@/components/MediaAsset";

export default function HiringSection() {
  const { content } = useSiteContent();

  return (
    <section className="section-space section-shell">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-5 border border-border bg-secondary/30 p-8 md:p-10">
          <p className="eyebrow mb-4">Hiring</p>
          <h2 className="font-editorial text-4xl md:text-5xl mb-5">
            {content.hiring.heading}
          </h2>
          <p className="text-muted-foreground leading-relaxed mb-8">
            {content.hiring.summary}
          </p>
          <MediaAsset
            src={content.hiring.heroImage || content.galleryItems[0]?.src}
            alt="Hiring"
            className="w-full h-44 object-cover border border-border mb-8 dark:brightness-75"
          />
          <Link to="/careers" className="text-sm text-accent">
            View open roles →
          </Link>
        </div>
        <div className="lg:col-span-6 lg:col-start-7 space-y-4">
          {content.hiring.roles.map((role) => (
            <article
              key={`${role.title}-${role.location}`}
              className="border border-border p-6 md:p-7"
            >
              <h3 className="font-editorial text-2xl">{role.title}</h3>
              <p className="text-sm text-muted-foreground mt-2">
                {role.location} · {role.type}
              </p>
              <MediaAsset
                src={role.image || content.galleryItems[0]?.src}
                alt={role.title}
                className="w-full h-36 object-cover border border-border mt-4 dark:brightness-75"
              />
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
