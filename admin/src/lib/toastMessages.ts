import { toast } from "sonner";

function technicalDetail(error: unknown): string {
  const raw = error instanceof Error ? error.message : String(error);
  const oneLine = raw.replace(/\s+/g, " ").trim();
  return oneLine.length > 260 ? `${oneLine.slice(0, 257)}...` : oneLine;
}

/** Show API/network errors in a toast with a short, readable description. */
export function toastRequestFailed(title: string, error: unknown, hint?: string): void {
  const detail = technicalDetail(error);
  const baseHint = hint ?? "Please try again. If this keeps happening, contact your website administrator.";
  toast.error(title, {
    description: `${baseHint}${detail ? ` Technical details: ${detail}` : ""}`,
  });
}

export function toastCmsSaved(entity: string, created: boolean, extra?: string): void {
  const action = created ? "created" : "updated";
  const message = `Your ${entity} was ${action} successfully.`;
  toast.success(created ? `${entity} created` : `${entity} updated`, {
    description: extra ? `${message} ${extra}` : message,
  });
}

export function toastCmsDeleted(entity: string): void {
  toast.success(`${entity} deleted`, {
    description: `The ${entity.toLowerCase()} was removed successfully.`,
  });
}
