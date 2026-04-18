import { useCallback, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { getPublicApiBaseUrl, getStaffToken, staffFetch } from "@/lib/elevateApi";
import { leadDisplayName, leadFieldLines } from "../lib/leadDisplay.ts";
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

  return (
    <main className="p-4 sm:p-6">
      <div className="mx-auto max-w-3xl space-y-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <p className="eyebrow mb-1">Inquiries</p>
            <h2 className="font-editorial text-3xl text-foreground">Contact form submissions</h2>
            <p className="text-sm text-muted-foreground mt-2 max-w-xl">
              Messages people send from the public contact form appear here. The same notifications can go to the email
              you set under Settings → notification email.
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
          <ul className="space-y-4">
            {rows!.map((row, i) => (
              <LeadCard key={String(row.id ?? row.leadId ?? `lead-${i}`)} row={row} />
            ))}
          </ul>
        )}
      </div>
    </main>
  );
}

function LeadCard({ row }: { row: UnknownRecord }) {
  const title = leadDisplayName(row);
  const lines = leadFieldLines(row);
  const received = lines.find((l) => l.label === "Received");

  return (
    <li>
      <Card className="border-border/80 shadow-sm overflow-hidden">
        <CardHeader className="pb-2">
          <CardTitle className="font-editorial text-xl">{title}</CardTitle>
          {received ? (
            <CardDescription>{received.value}</CardDescription>
          ) : (
            <CardDescription className="sr-only">Submission details</CardDescription>
          )}
        </CardHeader>
        <CardContent className="space-y-4 pt-0">
          {lines
            .filter((l) => l.label !== "Received" && l.label !== "Name")
            .map((line) => (
              <div key={`${line.label}-${line.value.slice(0, 24)}`} className="space-y-1">
                <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">{line.label}</p>
                {line.emphasis === "message" ? (
                  <p className="text-sm text-foreground whitespace-pre-wrap leading-relaxed">{line.value}</p>
                ) : (
                  <p className="text-sm text-foreground break-words">{line.value}</p>
                )}
              </div>
            ))}
        </CardContent>
      </Card>
    </li>
  );
}
