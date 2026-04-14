import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useSiteContent } from "@/content/SiteContentContext";
import { defaultSiteContent, type SiteContent } from "@/content/brand";
import PageBackButton from "@/components/PageBackButton";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";

function cloneContent(content: SiteContent): SiteContent {
  return JSON.parse(JSON.stringify(content)) as SiteContent;
}

function fileToDataUrl(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result || ""));
    reader.onerror = () => reject(new Error("Unable to read file"));
    reader.readAsDataURL(file);
  });
}

const controlFile =
  "flex h-10 w-full rounded-md border border-input bg-background px-3 py-1.5 text-sm text-foreground file:mr-3 file:rounded-md file:border-0 file:bg-muted file:px-3 file:py-1.5 file:text-sm file:font-medium";

function MediaField({
  value,
  onChange,
  placeholder,
}: {
  value: string;
  onChange: (next: string) => void;
  placeholder?: string;
}) {
  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    const dataUrl = await fileToDataUrl(file);
    onChange(dataUrl);
  };

  return (
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
      <Input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder || "Media URL or data URL"}
        className="font-mono text-xs md:text-sm"
      />
      <input type="file" accept="image/*,video/*" onChange={handleFileChange} className={cn(controlFile)} />
    </div>
  );
}

type AdminPageProps = {
  /** Marketing site origin for “Back” when there is no in-app history */
  publicSiteFallback?: string;
};

export default function AdminPage({ publicSiteFallback = "http://localhost:8080" }: AdminPageProps) {
  const { content, setContent, resetContent } = useSiteContent();
  const [draft, setDraft] = useState<SiteContent>(() => cloneContent(content));
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    setDraft(cloneContent(content));
  }, [content]);

  const saveChanges = () => {
    setContent(draft);
    setSaved(true);
    setTimeout(() => setSaved(false), 1800);
  };

  const resetToDefault = () => {
    resetContent();
    setDraft(cloneContent(defaultSiteContent));
  };

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-muted/35 pb-24">
        <div className="section-shell pt-28 md:pt-32">
          <PageBackButton className="mb-6" fallbackTo={publicSiteFallback} />
        </div>

        <Tabs defaultValue="overview" className="w-full">
          <div className="sticky top-20 z-40 border-b border-border/80 bg-background/90 shadow-sm backdrop-blur-md supports-[backdrop-filter]:bg-background/75">
            <div className="section-shell space-y-4 py-4">
              <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
                <div className="min-w-0">
                  <p className="eyebrow mb-2">Admin</p>
                  <h1 className="font-editorial text-3xl tracking-tight text-foreground md:text-4xl lg:text-5xl">
                    Content dashboard
                  </h1>
                  <p className="mt-2 max-w-2xl text-sm text-muted-foreground">
                    Edit copy and media. Save to publish to this browser; use Reset to restore defaults. The admin app
                    uses its own origin, so drafts are separate from the public site until you wire a shared backend.
                  </p>
                </div>
                <div className="flex shrink-0 flex-wrap gap-2">
                  <Button type="button" variant="outline" size="default" onClick={resetToDefault}>
                    Reset to default
                  </Button>
                  <Button type="button" onClick={saveChanges}>
                    Save changes
                  </Button>
                </div>
              </div>

              <TabsList
                className={cn(
                  "h-auto w-full min-h-11 justify-start gap-1 rounded-xl border border-border/60 bg-muted/50 p-1.5",
                  "inline-flex max-w-full flex-nowrap overflow-x-auto overflow-y-hidden [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden",
                  "md:flex-wrap md:overflow-visible",
                )}
              >
                <TabsTrigger value="overview" className="shrink-0 rounded-lg px-3 py-2 text-xs sm:text-sm">
                  Brand &amp; hero
                </TabsTrigger>
                <TabsTrigger value="units" className="shrink-0 rounded-lg px-3 py-2 text-xs sm:text-sm">
                  Business units
                </TabsTrigger>
                <TabsTrigger value="hiring" className="shrink-0 rounded-lg px-3 py-2 text-xs sm:text-sm">
                  Hiring
                </TabsTrigger>
                <TabsTrigger value="content" className="shrink-0 rounded-lg px-3 py-2 text-xs sm:text-sm">
                  Services &amp; blog
                </TabsTrigger>
                <TabsTrigger value="media" className="shrink-0 rounded-lg px-3 py-2 text-xs sm:text-sm">
                  Gallery &amp; pages
                </TabsTrigger>
              </TabsList>
            </div>
          </div>

          <div className="section-shell space-y-6 py-8 md:py-10">
            {saved && (
              <div
                className="rounded-lg border border-accent/40 bg-accent/10 px-4 py-3 text-sm text-foreground"
                role="status"
              >
                Changes saved and published for this browser.
              </div>
            )}

            <TabsContent value="overview" className="mt-0 space-y-6 focus-visible:outline-none">
              <div className="grid gap-6 lg:grid-cols-2">
                <Card className="border-border/80 shadow-sm">
                  <CardHeader>
                    <CardTitle className="font-editorial text-xl">Brand</CardTitle>
                    <CardDescription>Name, tagline, and contact details shown across the site.</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="brand-name">Brand name</Label>
                      <Input
                        id="brand-name"
                        value={draft.brand.name}
                        onChange={(e) => setDraft({ ...draft, brand: { ...draft.brand, name: e.target.value } })}
                        placeholder="Brand name"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="brand-tagline">Tagline</Label>
                      <Input
                        id="brand-tagline"
                        value={draft.brand.tagline}
                        onChange={(e) => setDraft({ ...draft, brand: { ...draft.brand, tagline: e.target.value } })}
                        placeholder="Tagline"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="brand-email">Contact email</Label>
                      <Input
                        id="brand-email"
                        type="email"
                        value={draft.brand.contactEmail}
                        onChange={(e) =>
                          setDraft({ ...draft, brand: { ...draft.brand, contactEmail: e.target.value } })
                        }
                        placeholder="Contact email"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="brand-phone">Phone</Label>
                      <Input
                        id="brand-phone"
                        value={draft.brand.phone}
                        onChange={(e) => setDraft({ ...draft, brand: { ...draft.brand, phone: e.target.value } })}
                        placeholder="Phone"
                      />
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-border/80 shadow-sm">
                  <CardHeader>
                    <CardTitle className="font-editorial text-xl">Hero</CardTitle>
                    <CardDescription>Homepage hero headline, highlight, and primary call to action.</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="hero-headline">Headline</Label>
                      <Input
                        id="hero-headline"
                        value={draft.hero.headline}
                        onChange={(e) => setDraft({ ...draft, hero: { ...draft.hero, headline: e.target.value } })}
                        placeholder="Hero headline"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="hero-highlight">Highlighted text</Label>
                      <Input
                        id="hero-highlight"
                        value={draft.hero.highlightedText}
                        onChange={(e) =>
                          setDraft({ ...draft, hero: { ...draft.hero, highlightedText: e.target.value } })
                        }
                        placeholder="Hero highlighted text"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="hero-subtext">Subtext</Label>
                      <Textarea
                        id="hero-subtext"
                        value={draft.hero.subtext}
                        onChange={(e) => setDraft({ ...draft, hero: { ...draft.hero, subtext: e.target.value } })}
                        className="min-h-[110px]"
                        placeholder="Hero subtext"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="hero-cta">CTA label</Label>
                      <Input
                        id="hero-cta"
                        value={draft.hero.cta}
                        onChange={(e) => setDraft({ ...draft, hero: { ...draft.hero, cta: e.target.value } })}
                        placeholder="Hero CTA"
                      />
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="units" className="mt-0 space-y-6 focus-visible:outline-none">
              <Card className="border-border/80 shadow-sm">
                <CardHeader>
                  <CardTitle className="font-editorial text-xl">Business units</CardTitle>
                  <CardDescription>
                    Narratives, hero and gallery media, and imagery for each unit subpage.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-8">
                  {draft.businessUnits.map((unit, index) => (
                    <div key={unit.id}>
                      {index > 0 && <Separator className="mb-8" />}
                      <div className="rounded-xl border border-border/70 bg-card/50 p-4 md:p-6">
                        <p className="mb-4 text-xs font-medium uppercase tracking-wider text-muted-foreground">
                          Unit · {unit.id}
                        </p>
                        <div className="space-y-4">
                          <div className="space-y-2">
                            <Label htmlFor={`unit-name-${unit.id}`}>Name</Label>
                            <Input
                              id={`unit-name-${unit.id}`}
                              value={unit.name}
                              onChange={(e) => {
                                const next = cloneContent(draft);
                                next.businessUnits[index].name = e.target.value;
                                setDraft(next);
                              }}
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor={`unit-statement-${unit.id}`}>Statement</Label>
                            <Textarea
                              id={`unit-statement-${unit.id}`}
                              value={unit.statement}
                              onChange={(e) => {
                                const next = cloneContent(draft);
                                next.businessUnits[index].statement = e.target.value;
                                setDraft(next);
                              }}
                              className="min-h-[72px]"
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor={`unit-details-${unit.id}`}>Details</Label>
                            <Textarea
                              id={`unit-details-${unit.id}`}
                              value={unit.details}
                              onChange={(e) => {
                                const next = cloneContent(draft);
                                next.businessUnits[index].details = e.target.value;
                                setDraft(next);
                              }}
                              className="min-h-[90px]"
                            />
                          </div>
                          <div className="space-y-2">
                            <Label>Hero media</Label>
                            <MediaField
                              value={unit.heroImage}
                              onChange={(value) => {
                                const next = cloneContent(draft);
                                next.businessUnits[index].heroImage = value;
                                setDraft(next);
                              }}
                              placeholder="Unit hero image/video URL"
                            />
                          </div>
                          <div className="space-y-3">
                            <Label>Gallery</Label>
                            <div className="grid grid-cols-1 gap-4 xl:grid-cols-3">
                              {unit.gallery.map((image, galleryIndex) => (
                                <div
                                  key={`${unit.id}-gallery-${galleryIndex}`}
                                  className="rounded-lg border border-border/60 bg-background/80 p-3"
                                >
                                  <p className="mb-2 text-xs text-muted-foreground">Image {galleryIndex + 1}</p>
                                  <MediaField
                                    value={image}
                                    onChange={(value) => {
                                      const next = cloneContent(draft);
                                      next.businessUnits[index].gallery[galleryIndex] = value;
                                      setDraft(next);
                                    }}
                                    placeholder={`Gallery image ${galleryIndex + 1}`}
                                  />
                                </div>
                              ))}
                            </div>
                          </div>
                          <div className="space-y-3">
                            <Label>Subpages</Label>
                            <div className="grid gap-4 md:grid-cols-2">
                              {unit.subPages.map((subPage, subIndex) => (
                                <div
                                  key={`${unit.id}-${subPage.slug}`}
                                  className="rounded-lg border border-dashed border-border/80 p-4"
                                >
                                  <p className="mb-3 text-sm font-medium text-foreground">{subPage.title}</p>
                                  <MediaField
                                    value={subPage.image}
                                    onChange={(value) => {
                                      const next = cloneContent(draft);
                                      next.businessUnits[index].subPages[subIndex].image = value;
                                      setDraft(next);
                                    }}
                                    placeholder="Subpage image/video URL"
                                  />
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="hiring" className="mt-0 space-y-6 focus-visible:outline-none">
              <Card className="border-border/80 shadow-sm">
                <CardHeader>
                  <CardTitle className="font-editorial text-xl">Hiring &amp; careers</CardTitle>
                  <CardDescription>Careers section copy, hero media, and open roles.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="hiring-heading">Heading</Label>
                    <Input
                      id="hiring-heading"
                      value={draft.hiring.heading}
                      onChange={(e) => setDraft({ ...draft, hiring: { ...draft.hiring, heading: e.target.value } })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="hiring-summary">Summary</Label>
                    <Textarea
                      id="hiring-summary"
                      value={draft.hiring.summary}
                      onChange={(e) => setDraft({ ...draft, hiring: { ...draft.hiring, summary: e.target.value } })}
                      className="min-h-[90px]"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Hero media</Label>
                    <MediaField
                      value={draft.hiring.heroImage}
                      onChange={(value) => setDraft({ ...draft, hiring: { ...draft.hiring, heroImage: value } })}
                      placeholder="Hiring hero image/video URL"
                    />
                  </div>
                  <Separator />
                  <div className="space-y-4">
                    <Label className="text-base">Roles</Label>
                    {draft.hiring.roles.map((role, index) => (
                      <div
                        key={`${role.title}-${index}`}
                        className="grid grid-cols-1 gap-4 rounded-xl border border-border/60 bg-muted/20 p-4 lg:grid-cols-2"
                      >
                        <div className="space-y-2 lg:col-span-2">
                          <Label htmlFor={`role-title-${index}`}>Title</Label>
                          <Input
                            id={`role-title-${index}`}
                            value={role.title}
                            onChange={(e) => {
                              const next = cloneContent(draft);
                              next.hiring.roles[index].title = e.target.value;
                              setDraft(next);
                            }}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor={`role-location-${index}`}>Location</Label>
                          <Input
                            id={`role-location-${index}`}
                            value={role.location}
                            onChange={(e) => {
                              const next = cloneContent(draft);
                              next.hiring.roles[index].location = e.target.value;
                              setDraft(next);
                            }}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor={`role-type-${index}`}>Type</Label>
                          <Input
                            id={`role-type-${index}`}
                            value={role.type}
                            onChange={(e) => {
                              const next = cloneContent(draft);
                              next.hiring.roles[index].type = e.target.value;
                              setDraft(next);
                            }}
                          />
                        </div>
                        <div className="space-y-2 lg:col-span-2">
                          <Label>Role image</Label>
                          <MediaField
                            value={role.image}
                            onChange={(value) => {
                              const next = cloneContent(draft);
                              next.hiring.roles[index].image = value;
                              setDraft(next);
                            }}
                            placeholder="Role image URL"
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="content" className="mt-0 space-y-6 focus-visible:outline-none">
              <div className="grid gap-6 xl:grid-cols-2">
                <Card className="border-border/80 shadow-sm">
                  <CardHeader>
                    <CardTitle className="font-editorial text-xl">Services</CardTitle>
                    <CardDescription>Service area titles, summaries, and media.</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {draft.serviceAreas.map((service, index) => (
                      <div key={`${service.title}-${index}`} className="rounded-xl border border-border/70 p-4">
                        <div className="space-y-2">
                          <Label htmlFor={`svc-title-${index}`}>Title</Label>
                          <Input
                            id={`svc-title-${index}`}
                            value={service.title}
                            onChange={(e) => {
                              const next = cloneContent(draft);
                              next.serviceAreas[index].title = e.target.value;
                              setDraft(next);
                            }}
                          />
                        </div>
                        <div className="mt-3 space-y-2">
                          <Label htmlFor={`svc-summary-${index}`}>Summary</Label>
                          <Textarea
                            id={`svc-summary-${index}`}
                            value={service.summary}
                            onChange={(e) => {
                              const next = cloneContent(draft);
                              next.serviceAreas[index].summary = e.target.value;
                              setDraft(next);
                            }}
                            className="min-h-[72px]"
                          />
                        </div>
                        <div className="mt-3 space-y-2">
                          <Label>Media</Label>
                          <MediaField
                            value={service.image}
                            onChange={(value) => {
                              const next = cloneContent(draft);
                              next.serviceAreas[index].image = value;
                              setDraft(next);
                            }}
                            placeholder="Service image/video URL"
                          />
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>

                <Card className="border-border/80 shadow-sm">
                  <CardHeader>
                    <CardTitle className="font-editorial text-xl">Blog</CardTitle>
                    <CardDescription>Post titles, excerpts, and featured images.</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {draft.blogPosts.map((post, index) => (
                      <div key={`${post.title}-${index}`} className="rounded-xl border border-border/70 p-4">
                        <div className="space-y-2">
                          <Label htmlFor={`blog-title-${index}`}>Title</Label>
                          <Input
                            id={`blog-title-${index}`}
                            value={post.title}
                            onChange={(e) => {
                              const next = cloneContent(draft);
                              next.blogPosts[index].title = e.target.value;
                              setDraft(next);
                            }}
                          />
                        </div>
                        <div className="mt-3 space-y-2">
                          <Label htmlFor={`blog-excerpt-${index}`}>Excerpt</Label>
                          <Textarea
                            id={`blog-excerpt-${index}`}
                            value={post.excerpt}
                            onChange={(e) => {
                              const next = cloneContent(draft);
                              next.blogPosts[index].excerpt = e.target.value;
                              setDraft(next);
                            }}
                            className="min-h-[72px]"
                          />
                        </div>
                        <div className="mt-3 space-y-2">
                          <Label>Image</Label>
                          <MediaField
                            value={post.image}
                            onChange={(value) => {
                              const next = cloneContent(draft);
                              next.blogPosts[index].image = value;
                              setDraft(next);
                            }}
                            placeholder="Blog image URL"
                          />
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="media" className="mt-0 space-y-6 focus-visible:outline-none">
              <Card className="border-border/80 shadow-sm">
                <CardHeader>
                  <CardTitle className="font-editorial text-xl">Global gallery</CardTitle>
                  <CardDescription>Captions and media for the main gallery grid.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {draft.galleryItems.map((item, index) => (
                    <div key={`${item.caption}-${index}`} className="rounded-xl border border-border/70 p-4 md:p-5">
                      <div className="space-y-2">
                        <Label htmlFor={`gal-cap-${index}`}>Caption</Label>
                        <Input
                          id={`gal-cap-${index}`}
                          value={item.caption}
                          onChange={(e) => {
                            const next = cloneContent(draft);
                            next.galleryItems[index].caption = e.target.value;
                            setDraft(next);
                          }}
                        />
                      </div>
                      <div className="mt-3 space-y-2">
                        <Label>Media</Label>
                        <MediaField
                          value={item.src}
                          onChange={(value) => {
                            const next = cloneContent(draft);
                            next.galleryItems[index].src = value;
                            setDraft(next);
                          }}
                          placeholder="Gallery image/video URL"
                        />
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              <Card className="border-border/80 shadow-sm">
                <CardHeader>
                  <CardTitle className="font-editorial text-xl">Page image sets</CardTitle>
                  <CardDescription>Background and supporting media keyed by page.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  {Object.entries(draft.pageImages).map(([pageName, images]) => (
                    <div key={pageName} className="rounded-xl border border-border/70 p-4 md:p-6">
                      <p className="mb-4 text-sm font-semibold capitalize text-foreground">{pageName}</p>
                      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                        {images.map((image, imageIndex) => (
                          <div key={`${pageName}-${imageIndex}`} className="space-y-2">
                            <Label className="text-xs text-muted-foreground">
                              Slot {imageIndex + 1}
                            </Label>
                            <MediaField
                              value={image}
                              onChange={(value) => {
                                const next = cloneContent(draft);
                                next.pageImages[pageName as keyof SiteContent["pageImages"]][imageIndex] = value;
                                setDraft(next);
                              }}
                              placeholder={`${pageName} media ${imageIndex + 1}`}
                            />
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </TabsContent>
          </div>
        </Tabs>
      </main>
      <Footer />
    </>
  );
}
