import { ArrowRight, Headset, Layers, Sparkles, Truck } from "lucide-react";
import { LeadForm } from "./LeadForm";

const benefits = [
  { icon: Layers, label: "Grandes marcas" },
  { icon: Sparkles, label: "Variedade de modelos" },
  { icon: Truck, label: "Frete grátis*" },
  { icon: Headset, label: "Atendimento comercial" },
];

export function Hero() {
  return (
    <section
      id="top"
      className="relative overflow-hidden pb-16 pt-28 sm:pb-24 sm:pt-36 lg:pt-52"
      style={{ background: "var(--gradient-soft), #ffffff" }}
    >
      <svg
        aria-hidden
        className="pointer-events-none absolute -right-32 -top-20 hidden opacity-[0.06] lg:block"
        width="720"
        height="720"
        viewBox="0 0 720 720"
        fill="none"
      >
        <circle cx="360" cy="360" r="300" stroke="#263055" strokeWidth="1" />
        <circle cx="360" cy="360" r="220" stroke="#263055" strokeWidth="1" />
        <circle cx="360" cy="360" r="140" stroke="#263055" strokeWidth="1" />
      </svg>
      <div className="relative mx-auto grid max-w-7xl grid-cols-1 items-center gap-10 px-5 sm:px-8 lg:grid-cols-[1.05fr_1fr] lg:items-start">
        <div className="anim-fade-up min-w-0 text-center lg:pt-6 lg:text-left">
          <span className="inline-flex max-w-full items-center justify-center gap-2 whitespace-normal rounded-full border border-[#263055]/15 bg-white px-3 py-1.5 text-center text-[9px] font-bold uppercase leading-relaxed tracking-[0.1em] text-[#263055] shadow-sm min-[390px]:text-[10px] sm:text-[11px] sm:tracking-[0.16em]">
            <span className="h-1.5 w-1.5 rounded-full bg-[#F37021]" />
            Gol Distribuidora • Atacado para empresas
          </span>

          <h1 className="mx-auto mt-5 max-w-3xl text-4xl font-black leading-[1.02] tracking-tight text-[#071E42] sm:text-5xl lg:mx-0 lg:text-6xl">
            CALÇADOS DE <span className="text-highlight">GRANDES MARCAS</span>
            <br />
            PARA O SEU NEGÓCIO
          </h1>

          <p className="mx-auto mt-5 max-w-xl text-[15px] leading-relaxed text-[#3f4a68] sm:text-base lg:mx-0">
            Conheça nosso catálogo, veja as marcas disponíveis e fale com um consultor Gol.
          </p>

          <div className="mt-7 flex justify-center lg:justify-start">
            <a href="#cadastro-mobile" className="btn-cta w-full max-w-full sm:w-auto lg:hidden">
              Quero receber o catálogo <ArrowRight size={18} />
            </a>
            <a
              href="#cadastro"
              className="btn-cta hidden w-full max-w-full sm:w-auto lg:inline-flex"
            >
              Quero receber o catálogo <ArrowRight size={18} />
            </a>
          </div>
          <p className="mt-3 text-xs font-medium text-[#7A7A7A]">
            Atendimento para empresas com CNPJ.
          </p>

          <div className="mt-8 grid grid-cols-[minmax(0,1fr)_minmax(0,1fr)] gap-2 sm:flex sm:flex-wrap sm:justify-center lg:justify-start">
            {benefits.map(({ icon: Icon, label }) => (
              <span
                key={label}
                className="inline-flex min-h-10 min-w-0 items-center justify-center gap-1.5 whitespace-normal rounded-full border border-black/5 bg-white px-2 py-1.5 text-center text-[10px] font-semibold leading-tight text-[#263055] shadow-sm sm:px-3 sm:text-[12px]"
              >
                <Icon size={13} className="text-[#F37021]" />
                {label}
              </span>
            ))}
          </div>
        </div>

        <div className="relative hidden w-full lg:block">
          <div
            aria-hidden
            className="absolute inset-0 -z-10 blur-3xl"
            style={{
              background:
                "radial-gradient(60% 60% at 50% 40%, oklch(0.71 0.19 45 / 0.22), transparent 70%), radial-gradient(50% 50% at 30% 70%, oklch(0.32 0.09 265 / 0.18), transparent 70%)",
            }}
          />
          <LeadForm embedded sectionId="cadastro" />
        </div>
      </div>
    </section>
  );
}
