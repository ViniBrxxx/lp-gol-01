import { PlayCircle } from "lucide-react";

export function VslSection() {
  return (
    <section className="relative overflow-hidden bg-white py-16 sm:py-24">
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/2 h-72 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#F37021]/10 blur-3xl sm:h-96 sm:w-96"
      />

      <div className="relative mx-auto max-w-6xl px-5 sm:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <span className="eyebrow justify-center">
            <PlayCircle size={15} />
            Conheça a Gol
          </span>
          <h2 className="mt-3 text-3xl font-black leading-tight text-[#071E42] sm:text-4xl lg:text-5xl">
            VEJA COMO A GOL PODE <span className="text-highlight">FORTALECER SUA LOJA</span>
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-[#5b6784] sm:text-base">
            Conheça nossa estrutura, nosso atendimento e a variedade de grandes marcas disponíveis
            para o seu negócio.
          </p>
        </div>

        <div className="relative mx-auto mt-9 max-w-5xl sm:mt-12">
          <div
            aria-hidden
            className="absolute -inset-2 -z-10 rounded-[28px] bg-gradient-to-br from-[#F37021]/35 via-transparent to-[#263055]/30 blur-xl"
          />
          <div className="overflow-hidden rounded-2xl border border-[#263055]/10 bg-[#071E42] p-1.5 shadow-[0_30px_70px_-28px_rgba(7,30,66,0.55)] sm:rounded-[28px] sm:p-2">
            <div className="aspect-video overflow-hidden rounded-xl sm:rounded-[20px]">
              <iframe
                className="h-full w-full"
                src="https://www.youtube-nocookie.com/embed/5MnWu0N5LRk?rel=0"
                title="Conheça a Gol Distribuidora"
                loading="lazy"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
