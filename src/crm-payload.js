import { selectAttribution } from "./attribution.js";

export function formatCrmPayload(payload) {
  const result = {
    phone: String(payload.phone || "").replace(/\D/g, ""),
    name: String(payload.name || "").trim(),
    document: String(payload.cnpj || "").replace(/\D/g, ""),
    ...selectAttribution(payload),
  };

  // This LP only collects name, phone and CNPJ. Campaign data belongs in
  // dedicated fields; quiz answers/notes must not be generated for this form.
  // The CRM treats unknown top-level fields as observations. Only send its
  // campaign field names. Referrer and event_id remain in the Supabase payload.
  const campaignFields = {
    event_source_url: payload.page_url,
    fbc: payload._fbc,
    fbp: payload._fbp,
  };
  for (const [key, value] of Object.entries(campaignFields)) {
    if (typeof value === "string" && value.trim()) result[key] = value;
  }

  return result;
}
