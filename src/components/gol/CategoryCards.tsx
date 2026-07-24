import fem from "@/assets/cat-feminino.png";
import masc from "@/assets/cat-masculino.png";
import inf from "@/assets/cat-infantil.png";
import sport from "@/assets/cat-chinelos.png";

const categories = [
  { title: "Feminino", desc: "Sandálias, casuais e outros modelos.", img: fem },
  { title: "Masculino", desc: "Chinelos, sandálias e casuais.", img: masc },
  { title: "Infantil", desc: "Linhas para diferentes idades.", img: inf },
  { title: "Esportivo", desc: "Opções para ampliar seu mix.", img: sport },
];

export function CategoryCards() {
  return (
    <section id="produtos" className="relative py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="max-w-3xl">
          <span className="eyebrow">Variedade para o seu negócio</span>
          <h2 className="mt-3 text-3xl font-black leading-tight text-[#071E42] sm:text-4xl lg:text-5xl">
            ENCONTRE O MIX IDEAL <span className="text-highlight">PARA SEUS CLIENTES</span>
          </h2>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {categories.map((category) => (
            <article
              key={category.title}
              className="card-surface group relative overflow-hidden p-6"
            >
              <div
                aria-hidden
                className="absolute -right-16 -top-16 h-40 w-40 rounded-full opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-100"
                style={{ background: "oklch(0.71 0.19 45 / 0.25)" }}
              />
              <div className="relative flex h-44 items-center justify-center">
                <img
                  src={category.img}
                  alt={category.title}
                  loading="lazy"
                  width={800}
                  height={800}
                  className="max-h-44 w-auto object-contain transition-transform duration-500 group-hover:-translate-y-1 group-hover:rotate-[-3deg]"
                />
              </div>
              <div className="mt-6 border-t border-black/5 pt-5">
                <h3 className="text-[15px] font-black uppercase tracking-wide text-[#263055]">
                  {category.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-[#5b6784]">{category.desc}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
