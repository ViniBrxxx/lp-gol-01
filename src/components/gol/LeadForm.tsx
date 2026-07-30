import { useEffect, useMemo, useState, type FormEvent } from "react";
import { ArrowRight, CheckCircle2, ShieldCheck } from "lucide-react";
import { z } from "zod";
import { submitLeadToCrm } from "../../lib/lead-submit";

const UTM_KEYS = [
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_content",
  "utm_term",
  "fbclid",
] as const;
type UtmKey = (typeof UTM_KEYS)[number];

type AccessTracking = Record<UtmKey, string> & {
  landing_page_url: string;
  referrer: string;
  fbp: string;
  fbc: string;
};

declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void;
  }
}

const SEGMENTOS = [
  "Loja de Calçados",
  "Supermercado / Mercadinho",
  "Farmácia",
  "Bazar / Loja de Variedades",
  "Loja de Roupas / Moda",
  "Atacado / Distribuidor",
  "Outro",
];
const FAIXAS_INVESTIMENTO = [
  "Até R$ 5 mil",
  "De R$ 5 mil a R$ 10 mil",
  "De R$ 10 mil a R$ 20 mil",
  "Acima de R$ 20 mil",
] as const;
const LINHAS_CALCADOS = ["Feminino", "Masculino", "Infantil", "Esportivo"] as const;
const ESTADOS = [
  { uf: "PI", nome: "Piauí", codigoIbge: 22 },
  { uf: "MA", nome: "Maranhão", codigoIbge: 21 },
  { uf: "TO", nome: "Tocantins", codigoIbge: 17 },
] as const;

function getCookie(name: string) {
  const prefix = `${name}=`;
  const cookie = document.cookie
    .split(";")
    .map((item) => item.trim())
    .find((item) => item.startsWith(prefix));
  return cookie ? decodeURIComponent(cookie.slice(prefix.length)) : "";
}

function useAccessTracking() {
  const [tracking, setTracking] = useState<AccessTracking>(() => ({
    ...(Object.fromEntries(UTM_KEYS.map((key) => [key, ""])) as Record<UtmKey, string>),
    landing_page_url: "",
    referrer: "",
    fbp: "",
    fbc: "",
  }));

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
      const landingPageUrl = sessionStorage.getItem("gol_landing_page_url") || window.location.href;
      sessionStorage.setItem("gol_landing_page_url", landingPageUrl);

      setTracking({
        ...(Object.fromEntries(UTM_KEYS.map((key) => [key, next[key] || ""])) as Record<
          UtmKey,
          string
        >),
        landing_page_url: landingPageUrl,
        referrer: document.referrer,
        fbp: getCookie("_fbp"),
        fbc: getCookie("_fbc"),
      });
    } catch {
      // A captura de campanha é opcional e não deve impedir o preenchimento do formulário.
    }
  }, []);

  return tracking;
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
  faixaInvestimento: z.enum(FAIXAS_INVESTIMENTO, {
    errorMap: () => ({ message: "Selecione a faixa de investimento" }),
  }),
  linhasInteresse: z
    .array(z.enum(LINHAS_CALCADOS))
    .min(1, "Selecione pelo menos uma linha de calçados"),
  estado: z
    .string()
    .trim()
    .refine((value) => ESTADOS.some(({ uf }) => uf === value), "Selecione o estado"),
  cidade: z.string().trim().min(2, "Selecione a cidade").max(80),
  nome: z.string().trim().min(2, "Informe seu nome").max(100),
  loja: z.string().trim().min(2, "Informe o nome da empresa").max(120),
  cnpj: z.string().trim().length(18, "CNPJ inválido"),
  whatsapp: z.string().trim().min(14, "WhatsApp inválido").max(16),
  consent: z.literal(true, { errorMap: () => ({ message: "Você precisa aceitar a política" }) }),
});

export function LeadForm({
  embedded = false,
  sectionId = "cadastro",
}: {
  embedded?: boolean;
  sectionId?: string;
}) {
  const accessTracking = useAccessTracking();
  const [form, setForm] = useState({
    segmento: "",
    faixaInvestimento: "",
    linhasInteresse: [] as string[],
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
  const [submitError, setSubmitError] = useState("");
  const [cidades, setCidades] = useState<string[]>([]);
  const [cidadesLoading, setCidadesLoading] = useState(false);
  const [cidadesError, setCidadesError] = useState("");
  const utmEntries = useMemo(
    () => UTM_KEYS.map((key) => [key, accessTracking[key]] as const),
    [accessTracking],
  );

  const set = (key: string, value: string | boolean) => {
    setForm((current) => ({ ...current, [key]: value }));
  };

  const toggleLinhaInteresse = (linha: string) => {
    setForm((current) => ({
      ...current,
      linhasInteresse: current.linhasInteresse.includes(linha)
        ? current.linhasInteresse.filter((item) => item !== linha)
        : [...current.linhasInteresse, linha],
    }));
    setErrors((current) => ({ ...current, linhasInteresse: "" }));
  };

  useEffect(() => {
    const estado = ESTADOS.find(({ uf }) => uf === form.estado);
    setCidades([]);
    setCidadesError("");

    if (!estado) {
      setCidadesLoading(false);
      return;
    }

    const controller = new AbortController();
    setCidadesLoading(true);

    fetch(
      `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${estado.codigoIbge}/municipios?orderBy=nome`,
      { signal: controller.signal },
    )
      .then((response) => {
        if (!response.ok) throw new Error("Falha ao consultar municípios");
        return response.json() as Promise<Array<{ nome: string }>>;
      })
      .then((municipios) => setCidades(municipios.map(({ nome }) => nome)))
      .catch((error: unknown) => {
        if (error instanceof DOMException && error.name === "AbortError") return;
        setCidadesError("Não foi possível carregar as cidades. Tente novamente.");
      })
      .finally(() => {
        if (!controller.signal.aborted) setCidadesLoading(false);
      });

    return () => controller.abort();
  }, [form.estado]);

  async function onSubmit(event: FormEvent) {
    event.preventDefault();
    const parsed = schema.safeParse(form);
    if (!parsed.success) {
      const nextErrors: Record<string, string> = {};
      parsed.error.issues.forEach((issue) => (nextErrors[issue.path[0] as string] = issue.message));
      setErrors(nextErrors);
      return;
    }

    if (!cidades.includes(parsed.data.cidade)) {
      setErrors({ cidade: "Selecione uma cidade válida" });
      return;
    }

    setErrors({});
    setSubmitError("");
    setLoading(true);

    try {
      const eventId = crypto.randomUUID();
      const submittedAt = new Date().toISOString();

      await submitLeadToCrm({
        data: {
          phone: parsed.data.whatsapp.replace(/\D/g, ""),
          name: parsed.data.nome,
          document: parsed.data.cnpj.replace(/\D/g, ""),
          city: parsed.data.cidade,
          state: parsed.data.estado,
          pipeline_stage: "Qualificado",
          empresa: parsed.data.loja,
          segmento: parsed.data.segmento,
          faixa_investimento: parsed.data.faixaInvestimento,
          linhas_interesse: parsed.data.linhasInteresse,
          ...accessTracking,
          page_url: window.location.href,
          user_agent: navigator.userAgent,
          submitted_at: submittedAt,
          event_id: eventId,
        },
      });

      setSubmitted(true);
      window.fbq?.(
        "track",
        "Lead",
        {
          content_name: "Cadastro de lojista",
          content_category: parsed.data.segmento,
        },
        { eventID: eventId },
      );

      const whatsappMessage = encodeURIComponent(
        [
          "Olá! Acabei de enviar meu cadastro pelo site da Gol Distribuidora e gostaria de falar com um consultor.",
          "",
          "*Dados do cadastro:*",
          `Nome: ${parsed.data.nome}`,
          `Empresa: ${parsed.data.loja}`,
          `CNPJ: ${parsed.data.cnpj}`,
          `WhatsApp: ${parsed.data.whatsapp}`,
          `Segmento: ${parsed.data.segmento}`,
          `Faixa de investimento: ${parsed.data.faixaInvestimento}`,
          `Linhas de interesse: ${parsed.data.linhasInteresse.join(", ")}`,
          `Localização: ${parsed.data.cidade}/${parsed.data.estado}`,
        ].join("\n"),
      );
      window.setTimeout(() => {
        window.location.assign(`https://wa.me/558699840542?text=${whatsappMessage}`);
      }, 700);
    } catch (error) {
      console.error("Erro ao enviar lead para o sistema de vendas:", error);
      setSubmitError(
        "Não foi possível enviar seus dados agora. Verifique sua conexão e tente novamente.",
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <section
      id={sectionId}
      className={embedded ? "relative" : "relative overflow-hidden py-20 sm:py-28"}
      style={embedded ? undefined : { background: "var(--gradient-soft), #ffffff" }}
    >
      <div
        aria-hidden
        className={`pointer-events-none absolute -left-40 top-20 h-80 w-80 rounded-full blur-3xl ${
          embedded ? "hidden" : ""
        }`}
        style={{ background: "oklch(0.71 0.19 45 / 0.18)" }}
      />
      <div
        className={
          embedded
            ? "relative"
            : "relative mx-auto grid max-w-7xl grid-cols-1 items-start gap-10 px-5 sm:px-8 lg:grid-cols-[0.85fr_1.15fr] lg:gap-14"
        }
      >
        <div className={embedded ? "hidden" : "text-center lg:text-left"}>
          <span className="eyebrow">Próximo passo</span>
          <h2 className="mt-3 text-3xl font-black leading-tight text-[#071E42] sm:text-4xl lg:text-5xl">
            LEVE <span className="text-highlight">GRANDES MARCAS</span> PARA SUA LOJA
          </h2>
          <p className="mx-auto mt-4 max-w-lg text-[15px] leading-relaxed text-[#3f4a68] lg:mx-0">
            Conte um pouco sobre o seu negócio. Nossa equipe prepara o atendimento e apresenta o mix
            mais adequado para seus clientes.
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
            className={`relative rounded-3xl border border-black/5 bg-white shadow-[0_30px_60px_-30px_rgba(7,30,66,0.35)] ${
              embedded ? "p-5 sm:p-6" : "p-6 sm:p-8"
            }`}
          >
            {submitted ? (
              <div className="py-8 text-center">
                <div className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-[#F37021]/15 text-[#F37021]">
                  <CheckCircle2 size={26} />
                </div>
                <h3 className="mt-4 text-xl font-black text-[#263055]">Dados recebidos!</h3>
                <p className="mt-2 text-sm text-[#5b6784]">
                  Cadastro enviado com sucesso. Estamos redirecionando você para o WhatsApp do
                  consultor.
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
                  <div className="sm:col-span-2">
                    <Field label="Faixa de investimento" error={errors.faixaInvestimento}>
                      <select
                        className="input"
                        name="faixaInvestimento"
                        value={form.faixaInvestimento}
                        onChange={(event) => set("faixaInvestimento", event.target.value)}
                      >
                        <option value="">Selecione uma faixa</option>
                        {FAIXAS_INVESTIMENTO.map((faixa) => (
                          <option key={faixa} value={faixa}>
                            {faixa}
                          </option>
                        ))}
                      </select>
                    </Field>
                  </div>
                  <fieldset className="sm:col-span-2">
                    <legend className="mb-2 block text-[11px] font-bold uppercase tracking-wider text-[#263055]">
                      Linhas de calçados de maior interesse
                    </legend>
                    <div className="grid grid-cols-2 gap-2">
                      {LINHAS_CALCADOS.map((linha) => (
                        <label
                          key={linha}
                          className={`flex cursor-pointer items-center gap-2 rounded-xl border px-3 py-2.5 text-sm font-semibold transition-colors ${
                            form.linhasInteresse.includes(linha)
                              ? "border-[#F37021] bg-[#F37021]/10 text-[#263055]"
                              : "border-black/10 bg-white text-[#5b6784] hover:border-[#F37021]/50"
                          }`}
                        >
                          <input
                            type="checkbox"
                            name="linhasInteresse"
                            value={linha}
                            checked={form.linhasInteresse.includes(linha)}
                            onChange={() => toggleLinhaInteresse(linha)}
                            className="h-4 w-4 accent-[#F37021]"
                          />
                          {linha}
                        </label>
                      ))}
                    </div>
                    {errors.linhasInteresse && (
                      <span className="mt-1 block text-xs text-red-600">
                        {errors.linhasInteresse}
                      </span>
                    )}
                  </fieldset>
                  <Field label="Estado" error={errors.estado}>
                    <select
                      className="input"
                      name="estado"
                      value={form.estado}
                      onChange={(event) => {
                        const estado = event.target.value;
                        setForm((current) => ({ ...current, estado, cidade: "" }));
                        setErrors((current) => ({ ...current, estado: "", cidade: "" }));
                      }}
                      autoComplete="address-level1"
                    >
                      <option value="">Selecione</option>
                      {ESTADOS.map(({ uf, nome }) => (
                        <option key={uf} value={uf}>
                          {nome} ({uf})
                        </option>
                      ))}
                    </select>
                  </Field>
                  <Field label="Cidade" error={errors.cidade || cidadesError}>
                    <select
                      className="input"
                      name="cidade"
                      value={form.cidade}
                      onChange={(event) => set("cidade", event.target.value)}
                      disabled={!form.estado || cidadesLoading || Boolean(cidadesError)}
                      autoComplete="address-level2"
                    >
                      <option value="">
                        {!form.estado
                          ? "Selecione o estado primeiro"
                          : cidadesLoading
                            ? "Carregando cidades..."
                            : cidadesError
                              ? "Cidades indisponíveis"
                              : "Selecione sua cidade"}
                      </option>
                      {cidades.map((cidade) => (
                        <option key={cidade} value={cidade}>
                          {cidade}
                        </option>
                      ))}
                    </select>
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
                {submitError && (
                  <p role="alert" className="mt-4 text-center text-sm font-medium text-red-600">
                    {submitError}
                  </p>
                )}

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
        .input:disabled {
          cursor: not-allowed;
          background: #F8F8F6;
          color: #9aa3b5;
        }
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
