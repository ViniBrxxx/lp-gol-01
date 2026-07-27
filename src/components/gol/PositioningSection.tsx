import {
  ArrowLeftRight,
  BadgeCheck,
  Boxes,
  Gift,
  Headset,
  Truck,
  type LucideIcon,
} from "lucide-react";

type Benefit = {
  title: string;
  desc: string;
  Icon: LucideIcon;
  featured?: boolean;
};

const benefits: Benefit[] = [
  {
    title: "Possibilidade de troca",
    desc: "Calçados com baixo giro podem ser avaliados para troca, conforme a política comercial.",
    Icon: ArrowLeftRight,
    featured: true,
  },
  {
    title: "Brindes e materiais promocionais",
    desc: "Tenha acesso a brindes das próprias marcas e materiais para apoiar suas vendas.",
    Icon: Gift,
    featured: true,
  },
  {
    title: "Marcas reconhecidas",
    desc: "Produtos que seus clientes já conhecem.",
    Icon: BadgeCheck,
  },
  {
    title: "Mix variado",
    desc: "Opções para diferentes públicos e perfis de negócio.",
    Icon: Boxes,
  },
  {
    title: "Frete grátis*",
    desc: "Mais facilidade para abastecer seu estoque.",
    Icon: Truck,
  },
  {
    title: "Atendimento comercial",
    desc: "Conte com um consultor para ajudar na escolha do seu mix.",
    Icon: Headset,
  },
];

export function PositioningSection() {
  return (
    <section
      id="diferenciais"
      className="relative overflow-hidden py-20 text-white sm:py-28"
      style={{ background: "var(--gradient-navy)" }}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute -left-32 -top-24 h-96 w-96 rounded-full blur-3xl"
        style={{ background: "oklch(0.71 0.19 45 / 0.18)" }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -right-32 bottom-0 h-96 w-96 rounded-full blur-3xl"
        style={{ background: "oklch(0.5 0.15 265 / 0.4)" }}
      />
      <svg
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 w-full opacity-[0.08]"
        viewBox="0 0 1440 200"
        preserveAspectRatio="none"
      >
        <path
          d="M0,120 C240,180 480,40 720,80 C960,120 1200,180 1440,100 L1440,200 L0,200 Z"
          fill="#ffffff"
        />
      </svg>

      <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-3 py-1.5 text-[11px] font-bold uppercase tracking-[0.18em] text-[#F58a45] backdrop-blur">
            <span className="h-1.5 w-1.5 rounded-full bg-[#F37021]" />
            Diferenciais Gol
          </span>
          <h2 className="mt-5 text-3xl font-black leading-[1.05] sm:text-4xl lg:text-5xl">
            POR QUE COMPRAR <span className="text-[#F37021]">COM A GOL?</span>
          </h2>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {benefits.map(({ title, desc, Icon, featured }) => (
            <article
              key={title}
              className={`group relative overflow-hidden rounded-2xl border p-6 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 ${
                featured
                  ? "border-[#F37021]/55 bg-white/[0.12] shadow-[0_18px_45px_-20px_rgba(243,112,33,0.65)] sm:col-span-1 lg:col-span-2"
                  : "border-white/10 bg-white/[0.06] hover:border-white/25 hover:bg-white/[0.1]"
              }`}
            >
              {featured && (
                <span className="absolute right-4 top-4 rounded-full bg-[#F37021] px-2.5 py-1 text-[9px] font-black uppercase tracking-widest text-white">
                  Destaque
                </span>
              )}
              <div
                className={`grid h-12 w-12 place-items-center rounded-2xl ${featured ? "bg-[#F37021] text-white" : "bg-white/10 text-[#F58a45]"}`}
              >
                <Icon size={21} />
              </div>
              <h3 className="mt-5 max-w-[85%] text-base font-black uppercase tracking-wide text-white">
                {title}
              </h3>
              <p className="mt-2 max-w-md text-sm leading-relaxed text-white/70">{desc}</p>
              <div className="absolute -bottom-16 -right-16 h-32 w-32 rounded-full bg-[#F37021]/0 blur-2xl transition-colors duration-500 group-hover:bg-[#F37021]/20" />
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
