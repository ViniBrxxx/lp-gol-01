const CAMPAIGN_FIELDS = [
  "fbclid", "gclid", "gbraid", "wbraid", "msclkid", "ttclid",
  "campaign", "campaign_id", "adset_id", "ad_id", "placement",
];

export function selectAttribution(values) {
  return Object.fromEntries(
    Object.entries(values).filter(([key, value]) =>
      (/^utm_[a-z0-9_]+$/.test(key) || CAMPAIGN_FIELDS.includes(key)) &&
      typeof value === "string" && value.trim() !== "",
    ),
  );
}

export function getAttribution(search) {
  return selectAttribution(Object.fromEntries(new URLSearchParams(search)));
}
