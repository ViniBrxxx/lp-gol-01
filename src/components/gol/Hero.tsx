import { ArrowRight, CheckCircle2, Headset, Layers, Sparkles, Truck } from "lucide-react";
import heroImg from "@/assets/hero-composition.png";

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
      className="relative overflow-hidden pb-16 pt-28 sm:pb-24 sm:pt-36"
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
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-24 inset-x-0 h-48"
        style={{
          background:
            "radial-gradient(60% 100% at 50% 0%, oklch(0.71 0.19 45 / 0.08), transparent 70%)",
        }}
      />

      <div className="relative mx-auto grid max-w-7xl grid-cols-1 items-center gap-10 px-5 sm:px-8 lg:grid-cols-[1.05fr_1fr]">
        <div className="anim-fade-up min-w-0 text-center lg:text-left">
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
            <a href="#cadastro" className="btn-cta w-full max-w-full sm:w-auto">
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

        <div className="relative">
          <div
            aria-hidden
            className="absolute inset-0 -z-10 blur-3xl"
            style={{
              background:
                "radial-gradient(60% 60% at 50% 40%, oklch(0.71 0.19 45 / 0.22), transparent 70%), radial-gradient(50% 50% at 30% 70%, oklch(0.32 0.09 265 / 0.18), transparent 70%)",
            }}
          />
          <div className="relative mx-auto aspect-square w-full max-w-[560px]">
            <img
              src={heroImg}
              alt="Calçados e acessórios do portfólio da GOL Distribuidora"
              width={1200}
              height={1200}
              className="h-full w-full object-contain drop-shadow-[0_25px_35px_rgba(7,30,66,0.15)]"
            />
            <div className="glass-card floaty absolute left-2 top-6 hidden items-center gap-3 px-3 py-2.5 sm:flex">
              <div className="grid h-8 w-8 place-items-center rounded-lg bg-[#F37021]/15 text-[#F37021]">
                <Layers size={16} />
              </div>
              <div>
                <div className="text-[11px] font-bold uppercase tracking-wider text-[#263055]">
                  Multimarcas
                </div>
                <div className="text-[11px] text-[#7A7A7A]">Grandes marcas</div>
              </div>
            </div>
            <div
              className="glass-card floaty absolute right-0 top-1/3 hidden items-center gap-3 px-3 py-2.5 sm:flex"
              style={{ animationDelay: "1.2s" }}
            >
              <div className="grid h-8 w-8 place-items-center rounded-lg bg-[#263055]/10 text-[#263055]">
                <CheckCircle2 size={16} />
              </div>
              <div>
                <div className="text-[11px] font-bold uppercase tracking-wider text-[#263055]">
                  Atendimento B2B
                </div>
                <div className="text-[11px] text-[#7A7A7A]">Consultor comercial</div>
              </div>
            </div>
            <div
              className="glass-card floaty absolute bottom-4 left-4 hidden items-center gap-3 px-3 py-2.5 sm:flex"
              style={{ animationDelay: "2.4s" }}
            >
              <div className="grid h-8 w-8 place-items-center rounded-lg bg-[#F37021]/15 text-[#F37021]">
                <Sparkles size={16} />
              </div>
              <div>
                <div className="text-[11px] font-bold uppercase tracking-wider text-[#263055]">
                  Categorias
                </div>
                <div className="text-[11px] text-[#7A7A7A]">Fem · Masc · Infantil</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
