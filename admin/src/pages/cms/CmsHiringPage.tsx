import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogDescription,
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
import type { HiringPositionAdmin } from "@/lib/elevateApiTypes";
import { toastCmsDeleted, toastCmsSaved, toastRequestFailed } from "../../lib/toastMessages.ts";
import { toast } from "sonner";

type CmsHiringPageProps = {
  embedded?: boolean;
};

export default function CmsHiringPage({ embedded = false }: CmsHiringPageProps) {
  const qc = useQueryClient();
  const canWrite = staffCanWrite();
  const { data: rows, isLoading } = useQuery({
    queryKey: ["admin", "hiring-positions"],
    queryFn: async () => {
      const raw = await staffGet<unknown>("/v1/admin/hiring-positions");
      return normalizeItems<HiringPositionAdmin>(raw);
    },
  });

  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<HiringPositionAdmin | null>(null);
  const [title, setTitle] = useState("");
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");
  const [applicationUrl, setApplicationUrl] = useState("");
  const [isPublished, setIsPublished] = useState(true);
  const [sortOrder, setSortOrder] = useState(0);
  const [saving, setSaving] = useState(false);

  const reset = () => {
    setEditing(null);
    setTitle("");
    setLocation("");
    setDescription("");
    setApplicationUrl("");
    setIsPublished(true);
    setSortOrder(0);
  };

  const openEdit = (r: HiringPositionAdmin) => {
    setEditing(r);
    setTitle(String(r.title ?? ""));
    setLocation(String(r.location ?? ""));
    setDescription(String(r.description ?? ""));
    const raw = r as Record<string, unknown>;
    setApplicationUrl(String(r.applicationUrl ?? raw.application_url ?? ""));
    setIsPublished(Boolean(r.isPublished ?? raw.is_published ?? true));
    const so = r.sortOrder ?? raw.sort_order;
    setSortOrder(typeof so === "number" && !Number.isNaN(so) ? so : 0);
    setOpen(true);
  };

  const save = async () => {
    if (!canWrite) return;
    const titleText = title.trim();
    if (titleText.length < 1) {
      toast.error("Role title is required", {
        description: "Enter the role title before saving.",
      });
      return;
    }
    const desc = description.trim();
    if (desc.length < 1) {
      toast.error("Description is required", {
        description: "Add a short description so candidates understand this role.",
      });
      return;
    }
    const app = applicationUrl.trim();
    if (app) {
      try {
        void new URL(app);
      } catch {
        toast.error("Invalid application URL", {
          description: "Enter a full URL (https://…) or leave the field empty.",
        });
        return;
      }
    }
    const payload: Record<string, unknown> = {
      title: titleText,
      description: desc,
      location: location.trim() || null,
      applicationUrl: app || null,
      isPublished,
      sortOrder,
    };
    setSaving(true);
    try {
      if (editing?.id) {
        await staffPatch(`/v1/admin/hiring-positions/${editing.id}`, payload);
        toastCmsSaved("Hiring role", false);
      } else {
        await staffPost("/v1/admin/hiring-positions", payload);
        toastCmsSaved("Hiring role", true);
      }
      setOpen(false);
      reset();
      await qc.invalidateQueries({ queryKey: ["admin", "hiring-positions"] });
    } catch (e) {
      toastRequestFailed(
        "Couldn’t save this role",
        e,
        "We could not save this hiring role. Please check the fields and try again.",
      );
    } finally {
      setSaving(false);
    }
  };

  const remove = async (id: string) => {
    if (!canWrite) return;
    if (!confirm("Delete?")) return;
    try {
      await staffDelete(`/v1/admin/hiring-positions/${id}`);
      toastCmsDeleted("Hiring role");
      await qc.invalidateQueries({ queryKey: ["admin", "hiring-positions"] });
    } catch (e) {
      toastRequestFailed(
        "Couldn’t delete this role",
        e,
        "We could not delete this hiring role right now. Please refresh and try again.",
      );
    }
  };

  const hiringSection = (
    <>
      <div className="mx-auto max-w-6xl space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              {!embedded ? <p className="eyebrow mb-1">CMS</p> : null}
              <h2 className="font-editorial text-3xl text-foreground">Hiring positions</h2>
              <p className="text-sm text-muted-foreground mt-1 max-w-2xl">
                Matches Elevate: title, description, location, application URL, published, sort order.
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
                New position
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
                    <th className="p-3">Location</th>
                    <th className="p-3">Published</th>
                    <th className="p-3 min-w-[7rem]">Apply</th>
                    <th className="p-3 w-40">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {(rows ?? []).map((r) => {
                    const raw = r as Record<string, unknown>;
                    const applyUrl =
                      typeof raw.application_url === "string" ? raw.application_url : r.applicationUrl;
                    return (
                    <tr key={String(r.id)} className="border-b border-border/70">
                      <td className="p-3">{r.title}</td>
                      <td className="p-3">{r.location ?? "—"}</td>
                      <td className="p-3">
                        {raw.is_published === false || r.isPublished === false ? "No" : "Yes"}
                      </td>
                      <td className="p-3 max-w-[12rem] truncate">
                        {applyUrl ? (
                          <a
                            href={applyUrl}
                            className="text-accent underline-offset-2 hover:underline"
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            Link
                          </a>
                        ) : (
                          "—"
                        )}
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
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{editing ? "Edit position" : "New position"}</DialogTitle>
            <DialogDescription className="sr-only">
              Form to create or edit a hiring position for the Elevate API.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-3 py-2">
            <div className="space-y-1">
              <Label htmlFor="hire-title">Title</Label>
              <Input id="hire-title" value={title} onChange={(e) => setTitle(e.target.value)} />
            </div>
            <div className="space-y-1">
              <Label htmlFor="hire-desc">Description</Label>
              <Textarea
                id="hire-desc"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={5}
                required
              />
            </div>
            <div className="space-y-1">
              <Label htmlFor="hire-loc">Location</Label>
              <Input id="hire-loc" value={location} onChange={(e) => setLocation(e.target.value)} />
            </div>
            <div className="space-y-1">
              <Label htmlFor="hire-app">Application URL</Label>
              <Input
                id="hire-app"
                type="url"
                inputMode="url"
                placeholder="https://…"
                value={applicationUrl}
                onChange={(e) => setApplicationUrl(e.target.value)}
              />
            </div>
            <div className="flex items-center gap-2">
              <Checkbox
                id="hire-pub"
                checked={isPublished}
                onCheckedChange={(v) => setIsPublished(v === true)}
              />
              <Label htmlFor="hire-pub" className="text-sm font-normal cursor-pointer">
                Published
              </Label>
            </div>
            <div className="space-y-1">
              <Label htmlFor="hire-sort">Sort order</Label>
              <Input
                id="hire-sort"
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
              <Button type="button" disabled={saving} onClick={() => void save()}>
                {saving ? "Saving..." : "Save"}
              </Button>
            ) : null}
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );

  if (embedded) {
    return hiringSection;
  }

  return (
    <main className="p-4 sm:p-6">
      {hiringSection}
    </main>
  );
}
