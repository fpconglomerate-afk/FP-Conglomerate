import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import CloudinaryImageField from "../../components/CloudinaryImageField.tsx";
import { Button } from "@/components/ui/button";
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
import type { HiringPositionAdmin } from "@/lib/elevateApiTypes";
import { toastRequestFailed } from "../../lib/toastMessages.ts";
import { toast } from "sonner";

export default function CmsHiringPage() {
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
  const [type, setType] = useState("");
  const [description, setDescription] = useState("");
  const [imageMediaAssetId, setImageMediaAssetId] = useState<string | undefined>();

  const reset = () => {
    setEditing(null);
    setTitle("");
    setLocation("");
    setType("");
    setDescription("");
    setImageMediaAssetId(undefined);
  };

  const openEdit = (r: HiringPositionAdmin) => {
    setEditing(r);
    setTitle(String(r.title ?? ""));
    setLocation(String(r.location ?? ""));
    setType(String(r.type ?? ""));
    setDescription(String(r.description ?? ""));
    setImageMediaAssetId(typeof r.imageMediaAssetId === "string" ? r.imageMediaAssetId : undefined);
    setOpen(true);
  };

  const save = async () => {
    if (!canWrite) return;
    const payload: Record<string, unknown> = {
      title: title.trim(),
      location: location.trim() || null,
      type: type.trim() || null,
      description: description.trim() || null,
      imageMediaAssetId: imageMediaAssetId ?? null,
    };
    try {
      if (editing?.id) {
        await staffPatch(`/v1/admin/hiring-positions/${editing.id}`, payload);
        toast.success("Updated");
      } else {
        await staffPost("/v1/admin/hiring-positions", payload);
        toast.success("Created");
      }
      setOpen(false);
      reset();
      await qc.invalidateQueries({ queryKey: ["admin", "hiring-positions"] });
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Save failed");
    }
  };

  const remove = async (id: string) => {
    if (!canWrite) return;
    if (!confirm("Delete?")) return;
    try {
      await staffDelete(`/v1/admin/hiring-positions/${id}`);
      toast.success("Deleted");
      await qc.invalidateQueries({ queryKey: ["admin", "hiring-positions"] });
    } catch (e) {
      toastRequestFailed("Couldn’t delete this role", e);
    }
  };

  return (
    <>
      <main className="p-4 sm:p-6">
        <div className="mx-auto max-w-6xl space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <p className="eyebrow mb-1">CMS</p>
              <h2 className="font-editorial text-3xl text-foreground">Hiring positions</h2>
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
                    <th className="p-3">Type</th>
                    <th className="p-3 w-40">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {(rows ?? []).map((r) => (
                    <tr key={String(r.id)} className="border-b border-border/70">
                      <td className="p-3">{r.title}</td>
                      <td className="p-3">{r.location}</td>
                      <td className="p-3">{r.type}</td>
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
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{editing ? "Edit position" : "New position"}</DialogTitle>
          </DialogHeader>
          <div className="space-y-3 py-2">
            <div className="space-y-1">
              <Label>Title</Label>
              <Input value={title} onChange={(e) => setTitle(e.target.value)} />
            </div>
            <div className="space-y-1">
              <Label>Location</Label>
              <Input value={location} onChange={(e) => setLocation(e.target.value)} />
            </div>
            <div className="space-y-1">
              <Label>Type</Label>
              <Input value={type} onChange={(e) => setType(e.target.value)} />
            </div>
            <div className="space-y-1">
              <Label>Description</Label>
              <Textarea value={description} onChange={(e) => setDescription(e.target.value)} rows={5} />
            </div>
            <div className="space-y-1">
              <Label>Image</Label>
              <CloudinaryImageField onAssetId={setImageMediaAssetId} context="hiring" />
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
