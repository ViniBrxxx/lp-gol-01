import { useCallback, useEffect, useState } from "react";
import { ArrowLeft, ArrowRight, Building2, PackageCheck, Users } from "lucide-react";
import {
  Carousel,
  type CarouselApi,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import facade from "@/assets/carrossel/1.jpg";
import warehouse from "@/assets/carrossel/2.jpg";
import logistics from "@/assets/carrossel/3.jpg";
import management from "@/assets/carrossel/4.jpg";
import team from "@/assets/carrossel/5.jpg";

const slides = [
  {
    image: facade,
    eyebrow: "Nossa estrutura",
    title: "Uma distribuidora preparada para o seu negócio",
    description:
      "Conheça de perto a estrutura da Gol e uma operação construída para atender lojistas.",
    alt: "Fachada da sede da Gol Distribuidora",
  },
  {
    image: warehouse,
    eyebrow: "Estoque organizado",
    title: "Variedade pronta para movimentar a sua loja",
    description: "Um espaço dedicado à organização de marcas, modelos e categorias para o atacado.",
    alt: "Corredores do estoque da Gol Distribuidora",
  },
  {
    image: logistics,
    eyebrow: "Operação",
    title: "Cuidado em cada etapa do pedido",
    description:
      "Equipe e estrutura trabalhando juntas para dar ritmo à separação e à movimentação dos produtos.",
    alt: "Operação logística no estoque da Gol Distribuidora",
  },
  {
    image: management,
    eyebrow: "Gestão próxima",
    title: "Decisões com foco no crescimento dos clientes",
    description:
      "Uma gestão presente, conectada à rotina comercial e às necessidades de quem compra para revender.",
    alt: "Gestor trabalhando no escritório da Gol Distribuidora",
  },
  {
    image: team,
    eyebrow: "Nosso time",
    title: "Pessoas que entendem o atacado",
    description:
      "Uma equipe dedicada a oferecer suporte comercial e facilitar a experiência de compra.",
    alt: "Equipe da Gol Distribuidora em atividade no escritório",
  },
];

export function AboutCarousel() {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);

  const onSelect = useCallback((carouselApi: CarouselApi) => {
    if (!carouselApi) return;
    setCurrent(carouselApi.selectedScrollSnap());
  }, []);

  useEffect(() => {
    if (!api) return;

    onSelect(api);
    api.on("select", onSelect);
    api.on("reInit", onSelect);

    return () => {
      api.off("select", onSelect);
      api.off("reInit", onSelect);
    };
  }, [api, onSelect]);

  return (
    <section id="sobre" className="relative overflow-hidden bg-[#071E42] py-20 text-white sm:py-28">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-60"
        style={{
          background:
            "radial-gradient(60% 80% at 8% 15%, oklch(0.71 0.19 45 / 0.2), transparent 65%), radial-gradient(55% 70% at 95% 80%, oklch(0.45 0.12 260 / 0.35), transparent 70%)",
        }}
      />

      <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
        <div className="grid items-end gap-7 lg:grid-cols-[1fr_auto]">
          <div className="max-w-3xl">
            <span className="eyebrow text-[#ff9858]">Por dentro da Gol</span>
            <h2 className="mt-3 text-3xl font-black leading-tight sm:text-4xl lg:text-5xl">
              CONHEÇA A <span className="text-[#F37021]">GOL DISTRIBUIDORA</span>
            </h2>
            <p className="mt-4 max-w-2xl text-sm leading-relaxed text-white/65 sm:text-base">
              Estrutura, organização e pessoas trabalhando para conectar grandes marcas ao seu
              negócio.
            </p>
          </div>

          <div className="hidden items-center gap-3 lg:flex" aria-label="Navegação do carrossel">
            <button
              type="button"
              onClick={() => api?.scrollPrev()}
              className="grid h-12 w-12 place-items-center rounded-full border border-white/15 bg-white/10 text-white backdrop-blur-md transition hover:-translate-y-0.5 hover:border-white/30 hover:bg-white/20 disabled:cursor-not-allowed disabled:opacity-35"
              disabled={!api?.canScrollPrev()}
              aria-label="Imagem anterior"
            >
              <ArrowLeft size={19} />
            </button>
            <button
              type="button"
              onClick={() => api?.scrollNext()}
              className="grid h-12 w-12 place-items-center rounded-full bg-[#F37021] text-white shadow-[0_12px_30px_-12px_rgba(243,112,33,0.9)] transition hover:-translate-y-0.5 hover:bg-[#ff7f32] disabled:cursor-not-allowed disabled:opacity-35"
              disabled={!api?.canScrollNext()}
              aria-label="Próxima imagem"
            >
              <ArrowRight size={19} />
            </button>
          </div>
        </div>

        <Carousel setApi={setApi} opts={{ align: "start", loop: true }} className="mt-10 sm:mt-12">
          <CarouselContent className="-ml-3 sm:-ml-5">
            {slides.map((slide, index) => (
              <CarouselItem
                key={slide.title}
                className="basis-[92%] pl-3 sm:basis-[84%] sm:pl-5 lg:basis-[78%]"
              >
                <article className="group relative aspect-[16/10] overflow-hidden rounded-[24px] border border-white/10 bg-[#102957] shadow-[0_30px_80px_-28px_rgba(0,0,0,0.65)] sm:aspect-[16/9] sm:rounded-[32px]">
                  <img
                    src={slide.image}
                    alt={slide.alt}
                    loading="lazy"
                    width={1600}
                    height={900}
                    className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.025]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#04132e] via-[#04132e]/15 to-transparent" />
                  <div className="absolute inset-x-0 bottom-0 p-5 sm:p-8 lg:p-10">
                    <div className="mb-3 flex items-center gap-3">
                      <span className="rounded-full border border-white/15 bg-white/10 px-3 py-1 text-[9px] font-extrabold uppercase tracking-[0.16em] text-white/80 backdrop-blur-md sm:text-[10px]">
                        {slide.eyebrow}
                      </span>
                      <span className="text-xs font-bold tabular-nums text-white/45">
                        {String(index + 1).padStart(2, "0")} /{" "}
                        {String(slides.length).padStart(2, "0")}
                      </span>
                    </div>
                    <h3 className="max-w-2xl text-xl font-black leading-tight sm:text-3xl lg:text-4xl">
                      {slide.title}
                    </h3>
                    <p className="mt-2 hidden max-w-xl text-sm leading-relaxed text-white/70 sm:block">
                      {slide.description}
                    </p>
                  </div>
                </article>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>

        <div className="mt-7 flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-2" aria-label="Selecionar imagem">
            {slides.map((slide, index) => (
              <button
                key={slide.title}
                type="button"
                onClick={() => api?.scrollTo(index)}
                className={`h-2 rounded-full transition-all duration-300 ${
                  current === index ? "w-10 bg-[#F37021]" : "w-2 bg-white/25 hover:bg-white/45"
                }`}
                aria-label={`Ir para imagem ${index + 1}: ${slide.eyebrow}`}
                aria-current={current === index ? "true" : undefined}
              />
            ))}
          </div>

          <div className="flex items-center gap-5 text-[10px] font-bold uppercase tracking-[0.12em] text-white/50 sm:text-[11px]">
            <span className="inline-flex items-center gap-2">
              <Building2 size={14} className="text-[#F37021]" /> Estrutura
            </span>
            <span className="inline-flex items-center gap-2">
              <PackageCheck size={14} className="text-[#F37021]" /> Operação
            </span>
            <span className="inline-flex items-center gap-2">
              <Users size={14} className="text-[#F37021]" /> Pessoas
            </span>
          </div>

          <div className="flex items-center gap-3 lg:hidden">
            <button
              type="button"
              onClick={() => api?.scrollPrev()}
              className="grid h-11 w-11 place-items-center rounded-full border border-white/15 bg-white/10 transition hover:bg-white/20 disabled:opacity-35"
              disabled={!api?.canScrollPrev()}
              aria-label="Imagem anterior"
            >
              <ArrowLeft size={18} />
            </button>
            <button
              type="button"
              onClick={() => api?.scrollNext()}
              className="grid h-11 w-11 place-items-center rounded-full bg-[#F37021] transition hover:bg-[#ff7f32] disabled:opacity-35"
              disabled={!api?.canScrollNext()}
              aria-label="Próxima imagem"
            >
              <ArrowRight size={18} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
