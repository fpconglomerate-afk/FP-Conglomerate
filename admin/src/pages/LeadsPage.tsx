import { useCallback, useEffect, useState } from "react";
import { ChevronRight, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { getPublicApiBaseUrl, getStaffToken, staffDelete, staffFetch } from "@/lib/elevateApi";
import {
  getLeadId,
  leadDisplayName,
  leadFieldLines,
  leadMessagePreview,
  leadPreviewMeta,
} from "../lib/leadDisplay.ts";
import { toastRequestFailed } from "../lib/toastMessages.ts";
import { toast } from "sonner";

type UnknownRecord = Record<string, unknown>;

function normalizeLeadsPayload(data: unknown): UnknownRecord[] {
  if (Array.isArray(data)) return data as UnknownRecord[];
  if (data && typeof data === "object") {
    const o = data as Record<string, unknown>;
    const list = o.items ?? o.leads ?? o.data ?? o.results;
    if (Array.isArray(list)) return list as UnknownRecord[];
  }
  return [];
}

export default function LeadsPage() {
  const [rows, setRows] = useState<UnknownRecord[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [detailOpen, setDetailOpen] = useState(false);
  const [selected, setSelected] = useState<UnknownRecord | null>(null);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [deleting, setDeleting] = useState(false);

  const token = getStaffToken();
  const apiConfigured = Boolean(getPublicApiBaseUrl());

  const load = useCallback(async () => {
    if (!token || !apiConfigured) return;
    setLoading(true);
    setError(null);
    try {
      const res = await staffFetch("/v1/leads?limit=50");
      if (res.status === 401) return;
      if (!res.ok) {
        const t = await res.text();
        throw new Error(t || res.statusText);
      }
      const data = (await res.json()) as unknown;
      setRows(normalizeLeadsPayload(data));
    } catch (e) {
      const msg = e instanceof Error ? e.message : "Something went wrong while loading inquiries.";
      setError(msg);
      toastRequestFailed("Couldn’t load inquiries", e);
    } finally {
      setLoading(false);
    }
  }, [token, apiConfigured]);

  useEffect(() => {
    void load();
  }, [load]);

  const openDetail = (row: UnknownRecord) => {
    setSelected(row);
    setDetailOpen(true);
  };

  const closeDetail = () => {
    setDetailOpen(false);
    setSelected(null);
  };

  const confirmDelete = async () => {
    if (!selected) return;
    const id = getLeadId(selected);
    if (!id) {
      toast.error("This inquiry can’t be removed", {
        description: "Try refreshing the page. If it keeps happening, contact support.",
      });
      setDeleteOpen(false);
      return;
    }
    setDeleting(true);
    try {
      await staffDelete(`/v1/leads/${id}`);
      setRows((prev) => (prev ? prev.filter((r) => getLeadId(r) !== id) : null));
      toast.success("Inquiry removed");
      setDeleteOpen(false);
      closeDetail();
    } catch (e) {
      toastRequestFailed("Couldn’t remove this inquiry", e);
    } finally {
      setDeleting(false);
    }
  };

  if (!apiConfigured) {
    return (
      <main className="p-4 sm:p-6">
        <p className="text-muted-foreground text-sm max-w-lg">
          This admin app isn’t connected to the server yet. Ask the person who manages your website hosting to add the
          API address in the admin environment settings.
        </p>
      </main>
    );
  }

  const count = rows?.length ?? 0;
  const detailLines = selected ? leadFieldLines(selected) : [];
  const receivedLine = detailLines.find((l) => l.label === "Received");

  return (
    <main className="p-4 sm:p-6">
      <div className="mx-auto max-w-3xl space-y-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <p className="eyebrow mb-1">Inquiries</p>
            <h2 className="font-editorial text-3xl text-foreground">Contact form submissions</h2>
            <p className="text-sm text-muted-foreground mt-2 max-w-xl">
              Tap a row for the full message. The same notifications can go to the email you set under Notifications.
            </p>
          </div>
          <Button type="button" variant="outline" size="sm" onClick={() => void load()} disabled={loading}>
            Refresh
          </Button>
        </div>

        {loading ? (
          <p className="text-sm text-muted-foreground">Loading…</p>
        ) : error ? (
          <p className="text-sm text-destructive">{error}</p>
        ) : count === 0 ? (
          <Card>
            <CardContent className="py-10 text-center text-sm text-muted-foreground">
              No submissions yet. When someone uses the contact form on your website, their message will show up here.
            </CardContent>
          </Card>
        ) : (
          <ul className="space-y-3">
            {rows!.map((row, i) => (
              <LeadPreviewRow key={String(getLeadId(row) ?? `lead-${i}`)} row={row} onOpen={() => openDetail(row)} />
            ))}
          </ul>
        )}
      </div>

      <Dialog open={detailOpen} onOpenChange={(o) => !o && closeDetail()}>
        <DialogContent className="max-h-[min(90vh,720px)] overflow-y-auto sm:max-w-lg">
          <DialogHeader>
            <DialogTitle className="font-editorial text-left text-2xl pr-8">
              {selected ? leadDisplayName(selected) : ""}
            </DialogTitle>
            {receivedLine ? (
              <p className="text-left text-sm text-muted-foreground">{receivedLine.value}</p>
            ) : null}
          </DialogHeader>
          <div className="space-y-4 py-2">
            {detailLines
              .filter((l) => l.label !== "Received" && l.label !== "Name")
              .map((line) => (
                <div key={`${line.label}-${line.value.slice(0, 40)}`} className="space-y-1">
                  <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">{line.label}</p>
                  {line.emphasis === "message" ? (
                    <p className="text-sm text-foreground whitespace-pre-wrap leading-relaxed">{line.value}</p>
                  ) : (
                    <p className="text-sm text-foreground break-words">{line.value}</p>
                  )}
                </div>
              ))}
          </div>
          <DialogFooter className="flex-col gap-2 sm:flex-row sm:justify-between">
            <Button
              type="button"
              variant="destructive"
              className="gap-2"
              onClick={() => setDeleteOpen(true)}
              disabled={!selected || !getLeadId(selected)}
            >
              <Trash2 className="h-4 w-4" aria-hidden />
              Delete inquiry
            </Button>
            <Button type="button" variant="outline" onClick={() => closeDetail()}>
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <AlertDialog open={deleteOpen} onOpenChange={setDeleteOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Remove this inquiry?</AlertDialogTitle>
            <AlertDialogDescription>
              This removes it from your list. You can’t undo this action.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={deleting}>Cancel</AlertDialogCancel>
            <Button
              type="button"
              variant="destructive"
              disabled={deleting}
              onClick={() => void confirmDelete()}
            >
              {deleting ? "Removing…" : "Remove"}
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </main>
  );
}

function LeadPreviewRow({ row, onOpen }: { row: UnknownRecord; onOpen: () => void }) {
  const title = leadDisplayName(row);
  const meta = leadPreviewMeta(row);
  const preview = leadMessagePreview(row, 140);

  return (
    <li>
      <button
        type="button"
        onClick={onOpen}
        className="w-full text-left rounded-xl border border-border/80 bg-card p-4 shadow-sm transition-colors hover:bg-muted/40 hover:border-border focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
      >
        <div className="flex gap-3 sm:gap-4">
          <div className="min-w-0 flex-1 space-y-1">
            <p className="font-medium text-foreground truncate">{title}</p>
            <p className="text-xs text-muted-foreground sm:text-sm">{meta}</p>
            <p className="text-sm text-foreground/90 line-clamp-2 leading-snug">{preview}</p>
          </div>
          <ChevronRight className="h-5 w-5 shrink-0 text-muted-foreground mt-1" aria-hidden />
        </div>
      </button>
    </li>
  );
}
