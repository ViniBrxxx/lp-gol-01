import test from "node:test";
import assert from "node:assert/strict";
import { getAttribution } from "../src/attribution.js";
import { formatCrmPayload } from "../src/crm-payload.js";
import { submitLead } from "../src/lead-submit.js";

test("LP sends answered fields and all supplied UTMs without quiz observations", () => {
  const attribution = getAttribution(
    "?utm_source=ig&utm_medium=paid_social&utm_campaign=Marcas%20Gol" +
    "&utm_content=video&utm_term=atacado&utm_id=123&utm_source_platform=instagram" +
    "&utm_custom=extra&campaign=Marcas&campaign_id=456&adset_id=789&ad_id=012" +
    "&placement=Instagram_Stories&fbclid=click&gclid=google&unrelated=discard",
  );
  const result = formatCrmPayload({
    name: " Maria Teste ", phone: "(11) 99999-9999", cnpj: "12.345.678/0001-90",
    ...attribution, _fbp: "fb.1.cookie", _fbc: "fb.1.click",
    page_url: "https://example.com/?utm_source=ig", referrer: "https://example.org/",
    notes: "Do not forward", observations: "Do not forward", email: "",
  });
  assert.equal(result.name, "Maria Teste");
  assert.equal(result.phone, "11999999999");
  assert.equal(result.document, "12345678000190");
  for (const [key, value] of Object.entries(attribution)) assert.equal(result[key], value);
  assert.equal(result.utm_custom, "extra");
  assert.equal(result.utm_campaign, "Marcas Gol");
  assert.equal(result.fbp, "fb.1.cookie");
  assert.equal(result.fbc, "fb.1.click");
  assert.equal(result.landing_url, "https://example.com/?utm_source=ig");
  for (const key of ["notes", "observations", "email", "city", "state", "unrelated", "_fbc", "_fbp", "page_url", "referrer", "event_id"]) {
    assert.equal(key in result, false);
  }
});

test("organic visits do not invent campaign data or empty optional fields", () => {
  assert.deepEqual(getAttribution("?utm_source=&unrelated=value"), {});
  assert.deepEqual(formatCrmPayload({ name: "Maria", phone: "11999999999", cnpj: "12345678000190" }), {
    name: "Maria", phone: "11999999999", document: "12345678000190",
  });
});

test("form forwards attribution and fires Meta Lead only after successful submission", async (t) => {
  const events = [];
  const requests = [];
  t.mock.method(globalThis, "fetch", async (url, options) => {
    requests.push({ url, payload: JSON.parse(options.body) });
    return { ok: true, json: async () => ({ ok: true }) };
  });
  const previousWindow = globalThis.window;
  const previousDocument = globalThis.document;
  globalThis.window = {
    location: { search: "?utm_source=ig&utm_id=123&ad_id=456", href: "https://example.com/?utm_source=ig" },
    fbq: (...args) => events.push(args),
  };
  globalThis.document = { cookie: "_fbp=fb.1.test; _fbc=fb.1.click", referrer: "" };
  t.after(() => {
    if (previousWindow === undefined) delete globalThis.window;
    else globalThis.window = previousWindow;
    if (previousDocument === undefined) delete globalThis.document;
    else globalThis.document = previousDocument;
  });
  const form = new FormData();
  form.set("nome", "Maria");
  form.set("numero", "(11) 99999-9999");
  form.set("cnpj", "12.345.678/0001-90");
  await submitLead(form);
  assert.equal(requests[0].url, "/api/leads");
  const crm = formatCrmPayload(requests[0].payload);
  assert.equal(crm.utm_id, "123");
  assert.equal(crm.ad_id, "456");
  assert.equal(crm.fbp, "fb.1.test");
  assert.equal(events.length, 1);
  assert.equal(events[0][3].eventID, requests[0].payload.event_id);
  assert.equal(crm.landing_url, requests[0].payload.page_url);
  assert.equal(requests[0].payload._fbp, "fb.1.test");
  assert.equal("_fbp" in crm, false);
  assert.equal("page_url" in crm, false);
  globalThis.fetch.mock.mockImplementation(async () => ({ ok: false, json: async () => ({ ok: false }) }));
  await assert.rejects(submitLead(form));
  assert.equal(events.length, 1);
});
