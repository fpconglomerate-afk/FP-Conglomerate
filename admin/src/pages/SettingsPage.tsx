import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { normalizeItems, staffGet, staffPatch } from "@/lib/elevateApi";
import type { SiteAdmin } from "@/lib/elevateApiTypes";
import { toast } from "sonner";

function orgEmailFromResponse(raw: unknown): string {
  if (!raw || typeof raw !== "object") return "";
  const o = raw as Record<string, unknown>;
  const v = o.leadsNotificationEmail ?? o.leads_notification_email;
  return typeof v === "string" ? v : "";
}

function normalizeSiteRow(raw: unknown): SiteAdmin | null {
  if (!raw || typeof raw !== "object") return null;
  const o = raw as Record<string, unknown>;
  const rawId = o.id ?? o.siteId ?? o.site_id;
  const id = typeof rawId === "string" ? rawId : typeof rawId === "number" ? String(rawId) : "";
  if (!id) return null;
  const email = o.leadsNotificationEmail ?? o.leads_notification_email;
  return {
    id,
    organizationId: typeof o.organizationId === "string" ? o.organizationId : undefined,
    label:
      typeof o.label === "string"
        ? o.label
        : typeof o.name === "string"
          ? o.name
          : typeof o.slug === "string"
            ? o.slug
            : undefined,
    leadsNotificationEmail: typeof email === "string" || email === null ? (email as string | null) : undefined,
  };
}

export default function SettingsPage() {
  const [orgEmail, setOrgEmail] = useState("");
  const [sites, setSites] = useState<SiteAdmin[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    let cancelled = false;
    void (async () => {
      try {
        const orgRaw = await staffGet<unknown>("/v1/admin/organization");
        if (cancelled) return;
        setOrgEmail(orgEmailFromResponse(orgRaw));

        const rawSites = await staffGet<unknown>("/v1/admin/sites");
        if (cancelled) return;
        const list = normalizeItems<unknown>(rawSites);
        const mapped = list.map(normalizeSiteRow).filter((s): s is SiteAdmin => s != null);
        setSites(mapped);
      } catch (e) {
        toast.error("Failed to load settings", {
          description: e instanceof Error ? e.message : String(e),
        });
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  const saveOrg = async () => {
    setSaving(true);
    try {
      await staffPatch("/v1/admin/organization", {
        leadsNotificationEmail: orgEmail.trim() || null,
      });
      toast.success("Organization updated");
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Save failed");
    } finally {
      setSaving(false);
    }
  };

  const saveSiteEmail = async (siteId: string, email: string) => {
    try {
      await staffPatch(`/v1/admin/sites/${siteId}`, {
        leadsNotificationEmail: email.trim() || null,
      });
      toast.success("Site updated");
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Save failed");
    }
  };

  return (
    <main className="p-4 sm:p-6">
      <div className="mx-auto max-w-3xl space-y-8">
          <div>
            <p className="eyebrow mb-1">Elevate</p>
            <h2 className="font-editorial text-3xl text-foreground">Lead notification emails</h2>
            <p className="text-sm text-muted-foreground mt-2">
              Server resolves site override first, then organization fallback. Requires Resend on the API.
            </p>
          </div>

          {loading ? (
            <p className="text-sm text-muted-foreground">Loading…</p>
          ) : (
            <>
              <Card>
                <CardHeader>
                  <CardTitle className="font-editorial text-xl">Organization fallback</CardTitle>
                  <CardDescription>GET/PATCH /v1/admin/organization</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="org-email">leadsNotificationEmail</Label>
                    <Input
                      id="org-email"
                      type="email"
                      value={orgEmail}
                      onChange={(e) => setOrgEmail(e.target.value)}
                      placeholder="ops@example.com"
                    />
                  </div>
                  <Button type="button" onClick={() => void saveOrg()} disabled={saving}>
                    Save organization
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="font-editorial text-xl">Sites</CardTitle>
                  <CardDescription>Per-site override — PATCH /v1/admin/sites/:siteId</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  {sites.length === 0 ? (
                    <p className="text-sm text-muted-foreground">
                      No sites returned for this organization. Seed or create sites in the Elevate API (publishable site
                      keys are tied to sites). Organization email above still applies as the fallback when no site
                      override exists.
                    </p>
                  ) : (
                    sites.map((site) => (
                      <SiteEmailRow
                        key={site.id}
                        site={site}
                        onSave={(email) => void saveSiteEmail(site.id, email)}
                      />
                    ))
                  )}
                </CardContent>
              </Card>
            </>
          )}
        </div>
    </main>
  );
}

function SiteEmailRow({ site, onSave }: { site: SiteAdmin; onSave: (email: string) => void }) {
  const [val, setVal] = useState(site.leadsNotificationEmail ?? "");
  useEffect(() => {
    setVal(site.leadsNotificationEmail ?? "");
  }, [site.leadsNotificationEmail]);

  return (
    <div className="rounded-lg border border-border/80 p-4 space-y-2">
      <p className="text-sm font-medium">{site.label ?? site.id}</p>
      <div className="flex flex-col sm:flex-row gap-2 sm:items-end">
        <div className="flex-1 space-y-1">
          <Label className="text-xs text-muted-foreground">leadsNotificationEmail</Label>
          <Input type="email" value={val} onChange={(e) => setVal(e.target.value)} placeholder="optional" />
        </div>
        <Button type="button" variant="secondary" onClick={() => onSave(val)}>
          Save
        </Button>
      </div>
    </div>
  );
}
