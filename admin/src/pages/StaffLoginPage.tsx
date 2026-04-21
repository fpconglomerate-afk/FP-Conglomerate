import { useState } from "react";
import { useNavigate, Navigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { getStaffToken, isApiBaseConfigured, postStaffLogin, setStaffToken } from "@/lib/elevateApi";
import { getPublicMarketingSiteUrl } from "../lib/publicSite.ts";
import { toast } from "sonner";

const defaultSlug = import.meta.env.VITE_PUBLIC_ORGANIZATION_SLUG?.trim() ?? "";

export default function StaffLoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [organizationSlug, setOrganizationSlug] = useState(defaultSlug);
  const [submitting, setSubmitting] = useState(false);

  const siteUrl = getPublicMarketingSiteUrl();

  if (getStaffToken()) {
    return <Navigate to="/leads" replace />;
  }

  const apiConfigured = isApiBaseConfigured();

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!apiConfigured) {
      toast.error("Can’t reach the server", {
        description: "This admin app needs its API connection configured. Ask whoever manages your website hosting.",
      });
      return;
    }
    setSubmitting(true);
    try {
      const { access_token } = await postStaffLogin({ email, password, organizationSlug });
      setStaffToken(access_token);
      toast.success("Signed in");
      navigate("/leads", { replace: true });
    } catch (err) {
      toast.error("Sign-in didn’t work", {
        description:
          err instanceof Error
            ? err.message
            : "Check your email, password, and organization name, or ask your administrator for access.",
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="relative flex min-h-screen flex-col bg-muted/30">
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,_hsl(var(--muted))_0%,_transparent_55%)] opacity-90"
        aria-hidden
      />
      <div className="relative flex flex-1 flex-col items-center justify-center px-4 py-12">
        <div className="w-full max-w-md space-y-8">
          <p className="text-center font-editorial text-2xl tracking-tight text-foreground">FP Conglomerate</p>
          <Card className="border-border/80 shadow-md">
            <CardHeader>
              <CardTitle className="font-editorial text-2xl">Staff sign in</CardTitle>
              <CardDescription>
                Sign in with the email, password, and organization name your administrator provided. Staying signed in
                applies to this browser tab only.
              </CardDescription>
            </CardHeader>
            <CardContent>
              {!apiConfigured && (
                <p className="mb-4 text-sm text-destructive">
                  The connection to your server isn’t configured yet. Ask your website or hosting administrator to finish
                  setup.
                </p>
              )}
              <form onSubmit={onSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="org-slug">Organization</Label>
                  <Input
                    id="org-slug"
                    value={organizationSlug}
                    onChange={(ev) => setOrganizationSlug(ev.target.value)}
                    autoComplete="organization"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(ev) => setEmail(ev.target.value)}
                    autoComplete="username"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(ev) => setPassword(ev.target.value)}
                    autoComplete="current-password"
                    required
                  />
                </div>
                <Button type="submit" className="w-full" disabled={submitting || !apiConfigured}>
                  {submitting ? "Signing in…" : "Sign in"}
                </Button>
              </form>
            </CardContent>
          </Card>
          <p className="text-center text-sm text-muted-foreground">
            <a
              href={siteUrl}
              className="font-medium text-foreground underline-offset-4 hover:underline"
              rel="noopener noreferrer"
            >
              Back to website
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
