import { useSearchParams } from "react-router-dom";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import CmsBlogPage from "./CmsBlogPage.tsx";
import CmsHiringPage from "./CmsHiringPage.tsx";

export default function CmsMarketingPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const tab = searchParams.get("tab") === "hiring" ? "hiring" : "blog";

  return (
    <main className="p-4 sm:p-6">
      <div className="mx-auto max-w-6xl space-y-6">
        <div>
          <p className="eyebrow mb-1">CMS</p>
          <h2 className="font-editorial text-3xl text-foreground">Marketing content</h2>
          <p className="text-sm text-muted-foreground mt-1 max-w-2xl">
            Manage blog posts and hiring listings in one place (Elevate API).
          </p>
        </div>
        <Tabs
          value={tab}
          onValueChange={(v) => {
            if (v === "blog") {
              setSearchParams({});
            } else {
              setSearchParams({ tab: v });
            }
          }}
          className="w-full"
        >
          <TabsList className="grid w-full max-w-md grid-cols-2 sm:inline-flex sm:w-auto">
            <TabsTrigger value="blog">Blog posts</TabsTrigger>
            <TabsTrigger value="hiring">Hiring</TabsTrigger>
          </TabsList>
          <TabsContent value="blog" className="mt-6 focus-visible:outline-none">
            <CmsBlogPage embedded />
          </TabsContent>
          <TabsContent value="hiring" className="mt-6 focus-visible:outline-none">
            <CmsHiringPage embedded />
          </TabsContent>
        </Tabs>
      </div>
    </main>
  );
}
