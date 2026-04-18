import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useSiteContent } from "@/content/SiteContentContext";
import MediaAsset from "@/components/MediaAsset";
import { useElevateHiringPositions } from "@/hooks/elevateQueries";
import { isPublicCmsEnabled } from "@/lib/elevateApi";
import type { HiringPositionPublic } from "@/lib/elevateApiTypes";

export default function CareersPage() {
  const { content } = useSiteContent();
  const orgCms = isPublicCmsEnabled();
  const { data: apiRoles, isLoading, isError } = useElevateHiringPositions();

  const useApi = orgCms && !isError && apiRoles && apiRoles.length > 0;
  const staticRoles = content.hiring.roles;

  return (
    <>
      <Navbar />
      <main className="pt-32 pb-28">
        <section className="section-shell">
          <p className="eyebrow mb-5">Careers</p>
          <h1 className="font-editorial text-5xl md:text-7xl max-w-4xl">{content.hiring.heading}</h1>
          <p className="mt-8 text-lg text-muted-foreground max-w-2xl">{content.hiring.summary}</p>
          {orgCms && isLoading && (
            <p className="mt-4 text-sm text-muted-foreground">Loading open roles…</p>
          )}
          <MediaAsset
            src={content.hiring.heroImage || content.galleryItems[0]?.src}
            alt="Hiring"
            className="w-full h-[240px] md:h-[380px] object-cover mt-10 border border-border dark:brightness-75"
          />
        </section>

        <section className="section-shell py-20 md:py-24">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
            {useApi
              ? apiRoles!.map((role: HiringPositionPublic, index: number) => {
                  const raw = role as Record<string, unknown>;
                  const applyUrl =
                    typeof raw.application_url === "string" ? raw.application_url : role.applicationUrl;
                  return (
                  <article
                    key={role.id ?? `${role.title}-${index}`}
                    className={`border border-border p-7 md:p-8 ${
                      index % 2 === 0 ? "lg:col-span-5 bg-secondary/25" : "lg:col-span-6 lg:col-start-7"
                    }`}
                  >
                    <h2 className="font-editorial text-3xl">{role.title}</h2>
                    <p className="text-sm text-muted-foreground mt-3">{role.location ?? "—"}</p>
                    {role.description ? (
                      <p className="text-sm text-muted-foreground mt-6 whitespace-pre-wrap">{role.description}</p>
                    ) : null}
                    {applyUrl ? (
                      <p className="mt-6">
                        <a
                          href={applyUrl}
                          className="text-sm font-medium text-accent underline-offset-4 hover:underline"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          Apply for this role
                        </a>
                      </p>
                    ) : null}
                    <p className="text-sm text-muted-foreground mt-6">
                      {applyUrl
                        ? `For questions, contact ${content.brand.contactEmail}.`
                        : `To apply, send your CV and a short statement of fit to ${content.brand.contactEmail}.`}
                    </p>
                    {role.imageUrl ? (
                      <MediaAsset
                        src={role.imageUrl}
                        alt={role.title}
                        className="w-full h-40 object-cover border border-border mt-6 dark:brightness-75"
                      />
                    ) : (
                      <MediaAsset
                        src={content.galleryItems[0]?.src ?? ""}
                        alt={role.title}
                        className="w-full h-40 object-cover border border-border mt-6 dark:brightness-75"
                      />
                    )}
                  </article>
                  );
                })
              : staticRoles.map((role, index) => (
                  <article
                    key={`${role.title}-${index}`}
                    className={`border border-border p-7 md:p-8 ${
                      index % 2 === 0 ? "lg:col-span-5 bg-secondary/25" : "lg:col-span-6 lg:col-start-7"
                    }`}
                  >
                    <h2 className="font-editorial text-3xl">{role.title}</h2>
                    <p className="text-sm text-muted-foreground mt-3">
                      {role.location} · {role.type}
                    </p>
                    <p className="text-sm text-muted-foreground mt-6">
                      To apply, send your CV and a short statement of fit to {content.brand.contactEmail}.
                    </p>
                    <MediaAsset
                      src={role.image || content.galleryItems[0]?.src}
                      alt={role.title}
                      className="w-full h-40 object-cover border border-border mt-6 dark:brightness-75"
                    />
                  </article>
                ))}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">
            {(content.pageImages?.careers ?? []).map((image, index) => (
              <MediaAsset
                key={`${image}-${index}`}
                src={image}
                alt={`Careers visual ${index + 1}`}
                className="w-full h-56 md:h-72 object-cover border border-border dark:brightness-75"
              />
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
