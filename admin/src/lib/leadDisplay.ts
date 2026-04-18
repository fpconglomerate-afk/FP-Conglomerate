/** Map API lead fields to labels non-technical staff expect. */

function pickFirst(row: Record<string, unknown>, keys: string[]): unknown {
  for (const k of keys) {
    if (k in row && row[k] !== undefined && row[k] !== null && row[k] !== "") {
      return row[k];
    }
  }
  return undefined;
}

export function leadDisplayName(row: Record<string, unknown>): string {
  const v = pickFirst(row, ["fullName", "full_name", "name"]);
  if (v != null && String(v).trim()) return String(v).trim();
  const em = pickFirst(row, ["email"]);
  if (em != null && String(em).trim()) return String(em).trim();
  return "Contact";
}

export function formatLeadDate(value: unknown): string | null {
  if (value == null || value === "") return null;
  const s = String(value);
  const d = new Date(s);
  if (Number.isNaN(d.getTime())) return s;
  return d.toLocaleString(undefined, {
    dateStyle: "medium",
    timeStyle: "short",
  });
}

export type LeadFieldLine = { label: string; value: string; emphasis?: "message" };

/** Build ordered lines for one lead (for cards). */
export function leadFieldLines(row: Record<string, unknown>): LeadFieldLine[] {
  const used = new Set<string>();
  const lines: LeadFieldLine[] = [];

  const mark = (...keys: string[]) => keys.forEach((k) => used.add(k));

  const name = pickFirst(row, ["fullName", "full_name", "name"]);
  if (name != null && String(name).trim()) {
    lines.push({ label: "Name", value: String(name).trim() });
    mark("fullName", "full_name", "name");
  }

  const email = pickFirst(row, ["email"]);
  if (email != null && String(email).trim()) {
    lines.push({ label: "Email", value: String(email).trim() });
    mark("email");
  }

  const phone = pickFirst(row, ["phone", "phoneNumber", "phone_number"]);
  if (phone != null && String(phone).trim()) {
    lines.push({ label: "Phone", value: String(phone).trim() });
    mark("phone", "phoneNumber", "phone_number");
  }

  const org = pickFirst(row, ["organization", "company", "organizationName"]);
  if (org != null && String(org).trim()) {
    lines.push({ label: "Organization", value: String(org).trim() });
    mark("organization", "company", "organizationName");
  }

  const message = pickFirst(row, ["message", "body", "notes"]);
  if (message != null && String(message).trim()) {
    lines.push({
      label: "Message",
      value: String(message).trim(),
      emphasis: "message",
    });
    mark("message", "body", "notes");
  }

  const when = pickFirst(row, ["createdAt", "created_at", "submittedAt", "submitted_at"]);
  if (when != null) {
    const fmt = formatLeadDate(when);
    if (fmt) lines.push({ label: "Received", value: fmt });
    mark("createdAt", "created_at", "submittedAt", "submitted_at");
  }

  const skipRest = new Set([
    ...used,
    "id",
    "leadId",
    "organizationId",
    "siteId",
    "updatedAt",
    "updated_at",
  ]);

  const labelMap: Record<string, string> = {
    topic: "Topic",
    status: "Status",
    industryVertical: "Industry",
    sourceSystem: "Source",
    formId: "Form",
  };

  for (const k of Object.keys(row)) {
    if (skipRest.has(k)) continue;
    const v = row[k];
    if (v == null || v === "") continue;
    const label = labelMap[k] ?? humanizeKey(k);
    const value = typeof v === "object" ? JSON.stringify(v) : String(v);
    lines.push({ label, value });
  }

  const idVal = row.id ?? row.leadId;
  if (idVal != null && String(idVal).length > 0) {
    lines.push({ label: "Record number", value: String(idVal) });
  }

  return lines;
}

function humanizeKey(k: string): string {
  return k
    .replace(/([A-Z])/g, " $1")
    .replace(/_/g, " ")
    .replace(/^\w/, (c) => c.toUpperCase())
    .trim();
}
