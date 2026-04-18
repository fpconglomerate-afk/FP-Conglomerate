import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { normalizeItems, staffGet, staffPatch } from "@/lib/elevateApi";
import type { SiteAdmin } from "@/lib/elevateApiTypes";
import { toastRequestFailed } from "../lib/toastMessages.ts";
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
        toastRequestFailed("Couldn’t load notification settings", e);
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
      toast.success("Notification email saved", {
        description:
          "This is the address that should receive alerts when someone submits your public contact form (when email delivery is enabled on your server).",
      });
    } catch (e) {
      toastRequestFailed("Couldn’t save notification email", e);
    } finally {
      setSaving(false);
    }
  };

  const saveSiteEmail = async (siteId: string, email: string) => {
    try {
      await staffPatch(`/v1/admin/sites/${siteId}`, {
        leadsNotificationEmail: email.trim() || null,
      });
      toast.success("Website notification saved", {
        description: "If you use more than one website, this inbox can receive alerts for this site instead of the main address.",
      });
    } catch (e) {
      toastRequestFailed("Couldn’t save this website’s email", e);
    }
  };

  return (
    <main className="p-4 sm:p-6">
      <div className="mx-auto max-w-3xl space-y-8">
        <div>
          <p className="eyebrow mb-1">Notifications</p>
          <h2 className="font-editorial text-3xl text-foreground">Who receives contact form emails?</h2>
          <p className="text-sm text-muted-foreground mt-2 max-w-2xl">
            Set the inbox where you want to be notified when someone fills out the contact form on your marketing
            website. If your account has more than one website listed below, you can use a different address for each.
          </p>
        </div>

        {loading ? (
          <p className="text-sm text-muted-foreground">Loading…</p>
        ) : (
          <>
            <Card>
              <CardHeader>
                <CardTitle className="font-editorial text-xl">Main notification email</CardTitle>
                <CardDescription>
                  Default address for new form submissions. Use an inbox your team checks regularly.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="org-email">Email address</Label>
                  <Input
                    id="org-email"
                    type="email"
                    value={orgEmail}
                    onChange={(e) => setOrgEmail(e.target.value)}
                    placeholder="you@yourcompany.com"
                  />
                </div>
                <Button type="button" onClick={() => void saveOrg()} disabled={saving}>
                  Save
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="font-editorial text-xl">Per-website email (optional)</CardTitle>
                <CardDescription>
                  Only appears when your organization has more than one website in the system.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {sites.length === 0 ? (
                  <p className="text-sm text-muted-foreground max-w-prose">
                    No separate websites are listed for your account yet. The main email above applies everywhere. If you
                    expect to see websites here, your technical contact may still be finishing setup.
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
      <p className="text-sm font-medium">{site.label ?? `Website ${site.id}`}</p>
      <div className="flex flex-col sm:flex-row gap-2 sm:items-end">
        <div className="flex-1 space-y-1">
          <Label className="text-xs text-muted-foreground">Notification email for this site</Label>
          <Input type="email" value={val} onChange={(e) => setVal(e.target.value)} placeholder="Optional override" />
        </div>
        <Button type="button" variant="secondary" onClick={() => onSave(val)}>
          Save
        </Button>
      </div>
    </div>
  );
}
