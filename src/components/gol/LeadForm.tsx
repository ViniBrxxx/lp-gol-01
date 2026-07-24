import { useEffect, useMemo, useState, type FormEvent } from "react";
import { ArrowRight, CheckCircle2, ShieldCheck } from "lucide-react";
import { z } from "zod";

const UTM_KEYS = [
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_content",
  "utm_term",
  "fbclid",
] as const;
type UtmKey = (typeof UTM_KEYS)[number];

const SEGMENTOS = [
  "Loja de Calçados",
  "Supermercado / Mercadinho",
  "Farmácia",
  "Bazar / Loja de Variedades",
  "Loja de Roupas / Moda",
  "Atacado / Distribuidor",
  "Outro",
];
const ESTADOS = [
  "AC",
  "AL",
  "AP",
  "AM",
  "BA",
  "CE",
  "DF",
  "ES",
  "GO",
  "MA",
  "MT",
  "MS",
  "MG",
  "PA",
  "PB",
  "PR",
  "PE",
  "PI",
  "RJ",
  "RN",
  "RS",
  "RO",
  "RR",
  "SC",
  "SP",
  "SE",
  "TO",
];

function useUtms() {
  const [utms, setUtms] = useState<Record<UtmKey, string>>(
    () => Object.fromEntries(UTM_KEYS.map((key) => [key, ""])) as Record<UtmKey, string>,
  );

  useEffect(() => {
    try {
      const params = new URLSearchParams(window.location.search);
      const stored = JSON.parse(localStorage.getItem("gol_utms") || "{}");
      const next: Record<string, string> = { ...stored };
      UTM_KEYS.forEach((key) => {
        const value = params.get(key);
        if (value) next[key] = value;
      });
      localStorage.setItem("gol_utms", JSON.stringify(next));
      setUtms(
        Object.fromEntries(UTM_KEYS.map((key) => [key, next[key] || ""])) as Record<UtmKey, string>,
      );
    } catch {
      // A captura de campanha é opcional e não deve impedir o preenchimento do formulário.
    }
  }, []);

  return utms;
}

function maskPhone(value: string) {
  const digits = value.replace(/\D/g, "").slice(0, 11);
  if (digits.length <= 2) return digits.length ? `(${digits}` : "";
  if (digits.length <= 6) return `(${digits.slice(0, 2)}) ${digits.slice(2)}`;
  if (digits.length <= 10)
    return `(${digits.slice(0, 2)}) ${digits.slice(2, 6)}-${digits.slice(6)}`;
  return `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7)}`;
}

function maskCNPJ(value: string) {
  const digits = value.replace(/\D/g, "").slice(0, 14);
  return digits
    .replace(/^(\d{2})(\d)/, "$1.$2")
    .replace(/^(\d{2})\.(\d{3})(\d)/, "$1.$2.$3")
    .replace(/\.(\d{3})(\d)/, ".$1/$2")
    .replace(/(\d{4})(\d)/, "$1-$2");
}

const schema = z.object({
  segmento: z.string().trim().min(2, "Selecione o segmento"),
  estado: z.string().trim().length(2, "Selecione o estado"),
  cidade: z.string().trim().min(2, "Informe a cidade").max(80),
  nome: z.string().trim().min(2, "Informe seu nome").max(100),
  loja: z.string().trim().min(2, "Informe o nome da empresa").max(120),
  cnpj: z.string().trim().length(18, "CNPJ inválido"),
  whatsapp: z.string().trim().min(14, "WhatsApp inválido").max(16),
  consent: z.literal(true, { errorMap: () => ({ message: "Você precisa aceitar a política" }) }),
});

export function LeadForm() {
  const utms = useUtms();
  const [form, setForm] = useState({
    segmento: "",
    estado: "",
    cidade: "",
    nome: "",
    loja: "",
    cnpj: "",
    whatsapp: "",
    consent: false,
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const utmEntries = useMemo(() => Object.entries(utms), [utms]);

  const set = (key: string, value: string | boolean) => {
    setForm((current) => ({ ...current, [key]: value }));
  };

  async function onSubmit(event: FormEvent) {
    event.preventDefault();
    const parsed = schema.safeParse(form);
    if (!parsed.success) {
      const nextErrors: Record<string, string> = {};
      parsed.error.issues.forEach((issue) => (nextErrors[issue.path[0] as string] = issue.message));
      setErrors(nextErrors);
      return;
    }

    setErrors({});
    setLoading(true);
    // Integração original preservada: o projeto ainda simula o envio enquanto aguarda um webhook real.
    await new Promise((resolve) => setTimeout(resolve, 800));
    setLoading(false);
    setSubmitted(true);
  }

  return (
    <section
      id="cadastro"
      className="relative overflow-hidden py-20 sm:py-28"
      style={{ background: "var(--gradient-soft), #ffffff" }}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute -left-40 top-20 h-80 w-80 rounded-full blur-3xl"
        style={{ background: "oklch(0.71 0.19 45 / 0.18)" }}
      />
      <div className="relative mx-auto grid max-w-7xl grid-cols-1 items-start gap-10 px-5 sm:px-8 lg:grid-cols-[0.85fr_1.15fr] lg:gap-14">
        <div className="text-center lg:text-left">
          <span className="eyebrow">Catálogo Gol</span>
          <h2 className="mt-3 text-3xl font-black leading-tight text-[#071E42] sm:text-4xl lg:text-5xl">
            RECEBA NOSSO <span className="text-highlight">CATÁLOGO</span>
          </h2>
          <p className="mx-auto mt-4 max-w-lg text-[15px] leading-relaxed text-[#3f4a68] lg:mx-0">
            Preencha seus dados e fale com um consultor Gol.
          </p>

          <div className="mt-8 space-y-3 text-left">
            {["Grandes marcas", "Mix para diferentes públicos", "Atendimento comercial"].map(
              (text) => (
                <div key={text} className="flex items-start gap-3">
                  <span className="mt-0.5 grid h-6 w-6 place-items-center rounded-full bg-[#F37021]/12 text-[#F37021]">
                    <CheckCircle2 size={14} />
                  </span>
                  <span className="text-sm text-[#263055]">{text}</span>
                </div>
              ),
            )}
          </div>
        </div>

        <div className="relative">
          <div
            aria-hidden
            className="absolute -inset-1 -z-10 rounded-[28px] opacity-70 blur-xl"
            style={{
              background:
                "linear-gradient(135deg, oklch(0.71 0.19 45 / 0.35), oklch(0.32 0.09 265 / 0.35))",
            }}
          />
          <form
            onSubmit={onSubmit}
            noValidate
            className="relative rounded-3xl border border-black/5 bg-white p-6 shadow-[0_30px_60px_-30px_rgba(7,30,66,0.35)] sm:p-8"
          >
            {submitted ? (
              <div className="py-8 text-center">
                <div className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-[#F37021]/15 text-[#F37021]">
                  <CheckCircle2 size={26} />
                </div>
                <h3 className="mt-4 text-xl font-black text-[#263055]">Dados recebidos!</h3>
                <p className="mt-2 text-sm text-[#5b6784]">
                  Nossa equipe comercial entrará em contato pelo WhatsApp informado.
                </p>
              </div>
            ) : (
              <>
                <div className="mb-5 flex items-center justify-between gap-3">
                  <h3 className="text-lg font-black text-[#263055]">Dados da empresa</h3>
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-[#F8F8F6] px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-[#263055]">
                    <ShieldCheck size={12} className="text-[#F37021]" /> Seguro
                  </span>
                </div>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div className="sm:col-span-2">
                    <Field label="Segmento da empresa" error={errors.segmento}>
                      <select
                        className="input"
                        name="segmento"
                        value={form.segmento}
                        onChange={(event) => set("segmento", event.target.value)}
                      >
                        <option value="">Selecione seu segmento</option>
                        {SEGMENTOS.map((segmento) => (
                          <option key={segmento} value={segmento}>
                            {segmento}
                          </option>
                        ))}
                      </select>
                    </Field>
                  </div>
                  <Field label="Estado" error={errors.estado}>
                    <select
                      className="input"
                      name="estado"
                      value={form.estado}
                      onChange={(event) => set("estado", event.target.value)}
                    >
                      <option value="">UF</option>
                      {ESTADOS.map((uf) => (
                        <option key={uf} value={uf}>
                          {uf}
                        </option>
                      ))}
                    </select>
                  </Field>
                  <Field label="Cidade" error={errors.cidade}>
                    <input
                      className="input"
                      name="cidade"
                      value={form.cidade}
                      onChange={(event) => set("cidade", event.target.value)}
                      placeholder="Sua cidade"
                      autoComplete="address-level2"
                    />
                  </Field>
                  <Field label="Nome" error={errors.nome}>
                    <input
                      className="input"
                      name="nome"
                      value={form.nome}
                      onChange={(event) => set("nome", event.target.value)}
                      placeholder="Seu nome"
                      autoComplete="name"
                    />
                  </Field>
                  <Field label="Empresa" error={errors.loja}>
                    <input
                      className="input"
                      name="loja"
                      value={form.loja}
                      onChange={(event) => set("loja", event.target.value)}
                      placeholder="Nome da empresa"
                      autoComplete="organization"
                    />
                  </Field>
                  <Field label="CNPJ" error={errors.cnpj}>
                    <input
                      className="input"
                      name="cnpj"
                      inputMode="numeric"
                      value={form.cnpj}
                      onChange={(event) => set("cnpj", maskCNPJ(event.target.value))}
                      placeholder="00.000.000/0000-00"
                    />
                  </Field>
                  <Field label="WhatsApp" error={errors.whatsapp}>
                    <input
                      className="input"
                      name="whatsapp"
                      inputMode="tel"
                      value={form.whatsapp}
                      onChange={(event) => set("whatsapp", maskPhone(event.target.value))}
                      placeholder="(00) 00000-0000"
                      autoComplete="tel"
                    />
                  </Field>
                </div>

                {utmEntries.map(([key, value]) => (
                  <input key={key} type="hidden" name={key} value={value} readOnly />
                ))}

                <label className="mt-5 flex items-start gap-3 text-sm text-[#3f4a68]">
                  <input
                    type="checkbox"
                    checked={form.consent}
                    onChange={(event) => set("consent", event.target.checked)}
                    className="mt-1 h-4 w-4 accent-[#F37021]"
                  />
                  <span>
                    Li e concordo com a{" "}
                    <a
                      href="#"
                      className="font-semibold text-[#263055] underline underline-offset-2"
                    >
                      Política de Privacidade
                    </a>
                    .
                  </span>
                </label>
                {errors.consent && <p className="mt-1 text-xs text-red-600">{errors.consent}</p>}

                <button
                  type="submit"
                  disabled={loading}
                  className="btn-cta mt-6 w-full text-[14px] sm:text-[15px]"
                >
                  {loading ? "Enviando..." : "Quero receber o catálogo"}
                  {!loading && <ArrowRight size={18} />}
                </button>
                <p className="mt-4 text-center text-xs text-[#7A7A7A]">
                  Atendimento exclusivo para empresas com CNPJ.
                </p>
              </>
            )}
          </form>
        </div>
      </div>

      <style>{`
        .input {
          width: 100%;
          min-height: 46px;
          border: 1px solid oklch(0.9 0.005 260);
          background: #fff;
          border-radius: 12px;
          padding: 0.75rem 0.9rem;
          font-size: 14px;
          color: #071E42;
          transition: border-color .2s ease, box-shadow .2s ease;
        }
        .input:focus {
          outline: none;
          border-color: #F37021;
          box-shadow: 0 0 0 4px oklch(0.71 0.19 45 / 0.15);
        }
        .input::placeholder { color: #a5adbf; }
      `}</style>
    </section>
  );
}

function Field({
  label,
  error,
  children,
}: {
  label: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-[11px] font-bold uppercase tracking-wider text-[#263055]">
        {label}
      </span>
      {children}
      {error && <span className="mt-1 block text-xs text-red-600">{error}</span>}
    </label>
  );
}
