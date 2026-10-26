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
  for (const key of ["page_url", "referrer", "event_id", "_fbc", "_fbp"]) {
    if (typeof payload[key] === "string" && payload[key].trim()) {
      result[key] = payload[key];
    }
  }
  // Include unprefixed cookie aliases for CRM attribution mapping.
  if (result._fbc) result.fbc = result._fbc;
  if (result._fbp) result.fbp = result._fbp;

  return result;
}
