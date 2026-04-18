import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import CloudinaryImageField from "../../components/CloudinaryImageField.tsx";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  normalizeItems,
  staffCanWrite,
  staffDelete,
  staffGet,
  staffPatch,
  staffPost,
} from "@/lib/elevateApi";
import type { PortfolioProjectAdmin } from "@/lib/elevateApiTypes";
import { toastRequestFailed } from "../../lib/toastMessages.ts";

export default function CmsPortfolioPage() {
  const qc = useQueryClient();
  const canWrite = staffCanWrite();
  const { data: rows, isLoading } = useQuery({
    queryKey: ["admin", "portfolio-projects"],
    queryFn: async () => {
      const raw = await staffGet<unknown>("/v1/admin/portfolio-projects");
      return normalizeItems<PortfolioProjectAdmin>(raw);
    },
  });

  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<PortfolioProjectAdmin | null>(null);
  const [title, setTitle] = useState("");
  const [summary, setSummary] = useState("");
  const [body, setBody] = useState("");
  const [imageMediaAssetId, setImageMediaAssetId] = useState<string | undefined>();
  const [isPublished, setIsPublished] = useState(true);
  const [sortOrder, setSortOrder] = useState(0);

  const reset = () => {
    setEditing(null);
    setTitle("");
    setSummary("");
    setBody("");
    setImageMediaAssetId(undefined);
    setIsPublished(true);
    setSortOrder(0);
  };

  const openEdit = (r: PortfolioProjectAdmin) => {
    setEditing(r);
    setTitle(String(r.title ?? ""));
    setSummary(String(r.summary ?? ""));
    setBody(String(r.body ?? ""));
    setImageMediaAssetId(typeof r.imageMediaAssetId === "string" ? r.imageMediaAssetId : undefined);
    const raw = r as Record<string, unknown>;
    setIsPublished(Boolean(r.isPublished ?? raw.is_published ?? true));
    const so = r.sortOrder ?? raw.sort_order;
    setSortOrder(typeof so === "number" && !Number.isNaN(so) ? so : 0);
    setOpen(true);
  };

  const save = async () => {
    if (!canWrite) return;
    const payload: Record<string, unknown> = {
      title: title.trim(),
      summary: summary.trim() || null,
      body: body.trim() || null,
      imageMediaAssetId: imageMediaAssetId ?? null,
      isPublished,
      sortOrder,
    };
    try {
      if (editing?.id) {
        await staffPatch(`/v1/admin/portfolio-projects/${editing.id}`, payload);
        toast.success("Updated");
      } else {
        await staffPost("/v1/admin/portfolio-projects", payload);
        toast.success("Created");
      }
      setOpen(false);
      reset();
      await qc.invalidateQueries({ queryKey: ["admin", "portfolio-projects"] });
    } catch (e) {
      toastRequestFailed("Couldn’t save this project", e);
    }
  };

  const remove = async (id: string) => {
    if (!canWrite) return;
    if (!confirm("Delete?")) return;
    try {
      await staffDelete(`/v1/admin/portfolio-projects/${id}`);
      toast.success("Deleted");
      await qc.invalidateQueries({ queryKey: ["admin", "portfolio-projects"] });
    } catch (e) {
      toastRequestFailed("Couldn’t delete this project", e);
    }
  };

  return (
    <>
      <main className="p-4 sm:p-6">
        <div className="mx-auto max-w-6xl space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <p className="eyebrow mb-1">CMS</p>
              <h2 className="font-editorial text-3xl text-foreground">Portfolio projects</h2>
              <p className="text-sm text-muted-foreground mt-1 max-w-2xl">
                Elevate stores title, summary, body, image, published, and sort order. Per-project URL slugs are not
                persisted by the API — the public site lists projects by organization.
              </p>
            </div>
            {canWrite ? (
              <Button
                type="button"
                onClick={() => {
                  reset();
                  setOpen(true);
                }}
              >
                New project
              </Button>
            ) : null}
          </div>
          {isLoading ? (
            <p className="text-sm text-muted-foreground">Loading…</p>
          ) : (
            <div className="rounded-lg border border-border overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border bg-muted/40 text-left">
                    <th className="p-3">Title</th>
                    <th className="p-3 font-mono text-xs">Id</th>
                    <th className="p-3 w-40">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {(rows ?? []).map((r) => (
                    <tr key={String(r.id)} className="border-b border-border/70">
                      <td className="p-3">{r.title}</td>
                      <td className="p-3 font-mono text-xs max-w-[10rem] truncate" title={r.id}>
                        {r.id ?? "—"}
                      </td>
                      <td className="p-3 flex gap-2">
                        <Button type="button" variant="outline" size="sm" onClick={() => openEdit(r)}>
                          Edit
                        </Button>
                        {canWrite && r.id ? (
                          <Button type="button" variant="destructive" size="sm" onClick={() => remove(r.id!)}>
                            Delete
                          </Button>
                        ) : null}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </main>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{editing ? "Edit project" : "New project"}</DialogTitle>
          </DialogHeader>
          <div className="space-y-3 py-2">
            <div className="space-y-1">
              <Label>Title</Label>
              <Input value={title} onChange={(e) => setTitle(e.target.value)} />
            </div>
            <div className="space-y-1">
              <Label>Summary</Label>
              <Textarea value={summary} onChange={(e) => setSummary(e.target.value)} rows={3} />
            </div>
            <div className="space-y-1">
              <Label>Body</Label>
              <Textarea value={body} onChange={(e) => setBody(e.target.value)} rows={6} />
            </div>
            <div className="space-y-1">
              <Label>Image</Label>
              <CloudinaryImageField onAssetId={setImageMediaAssetId} context="portfolio" />
            </div>
            <div className="flex items-center gap-2">
              <Checkbox
                id="port-pub"
                checked={isPublished}
                onCheckedChange={(v) => setIsPublished(v === true)}
              />
              <Label htmlFor="port-pub" className="text-sm font-normal cursor-pointer">
                Published
              </Label>
            </div>
            <div className="space-y-1">
              <Label htmlFor="port-sort">Sort order</Label>
              <Input
                id="port-sort"
                type="number"
                min={0}
                step={1}
                value={Number.isNaN(sortOrder) ? "" : sortOrder}
                onChange={(e) => setSortOrder(parseInt(e.target.value, 10) || 0)}
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            {canWrite ? (
              <Button type="button" onClick={() => void save()}>
                Save
              </Button>
            ) : null}
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
