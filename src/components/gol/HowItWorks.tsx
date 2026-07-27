import { ClipboardCheck, Headset, PackageCheck } from "lucide-react";

const steps = [
  {
    n: "01",
    title: "Cadastre sua empresa",
    desc: "Informe seu CNPJ e WhatsApp.",
    Icon: ClipboardCheck,
  },
  {
    n: "02",
    title: "Fale com um consultor",
    desc: "Nossa equipe entra em contato pelo WhatsApp.",
    Icon: Headset,
  },
  {
    n: "03",
    title: "Monte seu pedido",
    desc: "Conheça o catálogo e escolha os produtos para o seu negócio.",
    Icon: PackageCheck,
  },
];

export function HowItWorks() {
  return (
    <section id="como-comprar" className="relative py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <span className="eyebrow">Simples e direto</span>
          <h2 className="mt-3 text-3xl font-black leading-tight text-[#071E42] sm:text-4xl lg:text-5xl">
            COMPRAR COM A GOL <span className="text-highlight">É SIMPLES</span>
          </h2>
        </div>

        <div className="relative mt-14 grid grid-cols-1 gap-5 md:grid-cols-3">
          <div
            aria-hidden
            className="pointer-events-none absolute left-0 right-0 top-8 hidden h-px md:block"
            style={{
              background:
                "repeating-linear-gradient(to right, #F37021 0 6px, transparent 6px 14px)",
              opacity: 0.4,
            }}
          />

          {steps.map(({ n, title, desc, Icon }) => (
            <div key={n} className="card-surface relative p-6">
              <div className="flex items-center justify-between">
                <div className="grid h-14 w-14 place-items-center rounded-2xl bg-[#F8F8F6] text-[#263055] ring-1 ring-black/5">
                  <Icon size={22} className="text-[#F37021]" />
                </div>
                <span className="text-4xl font-black text-[#F37021]">{n}</span>
              </div>
              <h3 className="mt-5 text-base font-black uppercase tracking-wide text-[#263055]">
                {title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-[#5b6784]">{desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
