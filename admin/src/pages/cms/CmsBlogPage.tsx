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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  normalizeItems,
  staffCanWrite,
  staffDelete,
  staffGet,
  staffPatch,
  staffPost,
} from "@/lib/elevateApi";
import type { BlogPostAdmin } from "@/lib/elevateApiTypes";
import { toastRequestFailed } from "../../lib/toastMessages.ts";
import { toast } from "sonner";

const SLUG_RE = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

export default function CmsBlogPage() {
  const qc = useQueryClient();
  const canWrite = staffCanWrite();
  const { data: posts, isLoading } = useQuery({
    queryKey: ["admin", "blog-posts"],
    queryFn: async () => {
      const raw = await staffGet<unknown>("/v1/admin/blog-posts");
      return normalizeItems<BlogPostAdmin>(raw);
    },
  });

  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<BlogPostAdmin | null>(null);
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [excerpt, setExcerpt] = useState("");
  const [body, setBody] = useState("");
  const [status, setStatus] = useState("draft");
  const [coverMediaAssetId, setCoverMediaAssetId] = useState<string | undefined>();

  const resetForm = () => {
    setEditing(null);
    setTitle("");
    setSlug("");
    setExcerpt("");
    setBody("");
    setStatus("draft");
    setCoverMediaAssetId(undefined);
  };

  const openNew = () => {
    resetForm();
    setOpen(true);
  };

  const openEdit = (p: BlogPostAdmin) => {
    setEditing(p);
    setTitle(String(p.title ?? ""));
    setSlug(String(p.slug ?? ""));
    setExcerpt(String(p.excerpt ?? ""));
    setBody(String(p.body ?? ""));
    setStatus(String(p.status ?? "draft"));
    setCoverMediaAssetId(typeof p.coverMediaAssetId === "string" ? p.coverMediaAssetId : undefined);
    setOpen(true);
  };

  const save = async () => {
    if (!canWrite) return;
    const s = slug.trim();
    if (!SLUG_RE.test(s)) {
      toast.error("Check the web address (slug)", {
        description: "Use only lowercase letters, numbers, and hyphens.",
      });
      return;
    }
    const bodyText = body.trim();
    if (bodyText.length < 1) {
      toast.error("Body is required", {
        description: "The API requires at least one character in the post body.",
      });
      return;
    }
    const payload: Record<string, unknown> = {
      title: title.trim(),
      slug: s,
      excerpt: excerpt.trim() || null,
      body: bodyText,
      status,
      coverMediaAssetId: coverMediaAssetId ?? null,
    };
    if (status === "published") {
      payload.publishedAt =
        (typeof editing?.publishedAt === "string" && editing.publishedAt) || new Date().toISOString();
    } else {
      payload.publishedAt = null;
    }
    try {
      if (editing?.id) {
        await staffPatch(`/v1/admin/blog-posts/${editing.id}`, payload);
        toast.success("Post updated");
      } else {
        await staffPost("/v1/admin/blog-posts", payload);
        toast.success("Post created");
      }
      setOpen(false);
      resetForm();
      await qc.invalidateQueries({ queryKey: ["admin", "blog-posts"] });
    } catch (e) {
      toastRequestFailed("Couldn’t save this post", e);
    }
  };

  const remove = async (id: string) => {
    if (!canWrite) return;
    if (!confirm("Delete this post?")) return;
    try {
      await staffDelete(`/v1/admin/blog-posts/${id}`);
      toast.success("Deleted");
      await qc.invalidateQueries({ queryKey: ["admin", "blog-posts"] });
    } catch (e) {
      toastRequestFailed("Couldn’t delete this post", e);
    }
  };

  return (
    <>
      <main className="p-4 sm:p-6">
        <div className="mx-auto max-w-6xl space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <p className="eyebrow mb-1">CMS</p>
              <h2 className="font-editorial text-3xl text-foreground">Blog posts</h2>
              <p className="text-sm text-muted-foreground mt-1">
                Only team members with editor access can add or change posts.
              </p>
            </div>
            {canWrite ? (
              <Button type="button" onClick={openNew}>
                New post
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
                    <th className="p-3 font-medium">Title</th>
                    <th className="p-3 font-medium">Slug</th>
                    <th className="p-3 font-medium">Status</th>
                    <th className="p-3 font-medium w-40">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {(posts ?? []).map((p) => (
                    <tr key={String(p.id)} className="border-b border-border/70">
                      <td className="p-3">{p.title}</td>
                      <td className="p-3 font-mono text-xs">{p.slug}</td>
                      <td className="p-3">{p.status}</td>
                      <td className="p-3 flex flex-wrap gap-2">
                        <Button type="button" variant="outline" size="sm" onClick={() => openEdit(p)}>
                          Edit
                        </Button>
                        {canWrite ? (
                          <Button type="button" variant="destructive" size="sm" onClick={() => p.id && remove(p.id)}>
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
            <DialogTitle>{editing ? "Edit post" : "New post"}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-2">
            <div className="space-y-2">
              <Label htmlFor="title">Title</Label>
              <Input id="title" value={title} onChange={(e) => setTitle(e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="slug">Slug</Label>
              <Input id="slug" value={slug} onChange={(e) => setSlug(e.target.value)} placeholder="my-post" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="excerpt">Excerpt</Label>
              <Textarea id="excerpt" value={excerpt} onChange={(e) => setExcerpt(e.target.value)} rows={3} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="body">Body (required)</Label>
              <Textarea id="body" value={body} onChange={(e) => setBody(e.target.value)} rows={8} />
              <p className="text-xs text-muted-foreground">The API requires at least one character. Empty posts cannot be saved.</p>
            </div>
            <div className="space-y-2">
              <Label>Status</Label>
              <Select value={status} onValueChange={setStatus}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="draft">draft</SelectItem>
                  <SelectItem value="published">published</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Cover image (Cloudinary)</Label>
              <CloudinaryImageField onAssetId={setCoverMediaAssetId} context="blog-cover" />
              {coverMediaAssetId ? (
                <p className="text-xs font-mono text-muted-foreground">coverMediaAssetId: {coverMediaAssetId}</p>
              ) : null}
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
