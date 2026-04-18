import { toast } from "sonner";

/** Show API/network errors in a toast with a short, readable description. */
export function toastRequestFailed(title: string, error: unknown): void {
  const raw = error instanceof Error ? error.message : String(error);
  const description = raw.length > 400 ? `${raw.slice(0, 397)}…` : raw;
  toast.error(title, { description });
}
