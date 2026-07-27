import { ArrowRight } from "lucide-react";
import beiraRioLogo from "@/assets/brands/beira-rio.png";
import cartagoLogo from "@/assets/brands/cartago.png";
import danperLogo from "@/assets/brands/danper.png";
import ipanemaLogo from "@/assets/brands/ipanema.png";
import modareLogo from "@/assets/brands/modare.png";
import molecaLogo from "@/assets/brands/moleca.png";
import molekinhaLogo from "@/assets/brands/molekinha.png";
import olindaLogo from "@/assets/brands/olinda.png";
import penaltyLogo from "@/assets/brands/penalty.svg";
import riderLogo from "@/assets/brands/rider.png";
import vizzanoLogo from "@/assets/brands/vizzano.png";
import zaxyLogo from "@/assets/brands/zaxy.png";

const brands = [
  { name: "Beira Rio", logo: beiraRioLogo, imageClassName: "brightness-0" },
  { name: "Moleca", logo: molecaLogo },
  { name: "Vizzano", logo: vizzanoLogo, imageClassName: "max-h-16" },
  { name: "Modare", logo: modareLogo, imageClassName: "brightness-0" },
  { name: "Ipanema", logo: ipanemaLogo, imageClassName: "scale-[2.8]" },
  { name: "Rider", logo: riderLogo },
  { name: "Cartago", logo: cartagoLogo, imageClassName: "scale-[3]" },
  { name: "Zaxy", logo: zaxyLogo, imageClassName: "scale-[2.2]" },
  { name: "Olinda", logo: olindaLogo, imageClassName: "max-h-16" },
  { name: "Penalty", logo: penaltyLogo },
  { name: "Danper", logo: danperLogo, imageClassName: "scale-[2.8]" },
  { name: "Molekinha", logo: molekinhaLogo },
];

export function BrandsSection() {
  return (
    <section id="marcas" className="relative py-20 sm:py-28" style={{ background: "#F8F8F6" }}>
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-3xl font-black leading-tight text-[#071E42] sm:text-4xl lg:text-5xl">
            GRANDES MARCAS <span className="text-highlight">EM UM SÓ LUGAR</span>
          </h2>
          <p className="mt-4 text-[15px] leading-relaxed text-[#3f4a68]">
            Encontre marcas que seus clientes já conhecem e procuram.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-4">
          {brands.map(({ name, logo, imageClassName }) => (
            <div
              key={name}
              className="group relative flex h-24 items-center justify-center overflow-hidden rounded-2xl border border-black/5 bg-white px-4 shadow-[0_4px_20px_-12px_rgba(7,30,66,0.15)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_16px_36px_-16px_rgba(7,30,66,0.25)] sm:h-28"
            >
              <div className="flex h-16 w-full max-w-[180px] items-center justify-center overflow-hidden transition-transform duration-300 group-hover:scale-105">
                <img
                  src={logo}
                  alt={`Logo ${name}`}
                  loading="lazy"
                  className={`max-h-12 max-w-full object-contain ${imageClassName ?? ""}`}
                />
              </div>
            </div>
          ))}
        </div>

        <div className="mt-10 flex justify-center">
          <a href="#cadastro-mobile" className="btn-cta lg:hidden">
            Ver catálogo <ArrowRight size={18} />
          </a>
          <a href="#cadastro" className="btn-cta hidden lg:inline-flex">
            Ver catálogo <ArrowRight size={18} />
          </a>
        </div>
      </div>
    </section>
  );
}
