import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { Logo } from "./Logo";

const links = [
  { href: "#sobre", label: "A Gol" },
  { href: "#marcas", label: "Marcas" },
  { href: "#produtos", label: "Produtos" },
  { href: "#diferenciais", label: "Diferenciais" },
  { href: "#como-comprar", label: "Como comprar" },
];

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "backdrop-blur-md bg-white/85 border-b border-black/5 shadow-[0_6px_24px_-16px_rgba(7,30,66,0.25)]"
          : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-3 sm:px-8">
        <a href="#top" aria-label="GOL Distribuidora">
          <Logo />
        </a>

        <nav className="hidden items-center gap-8 lg:flex">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-sm font-semibold text-[#263055]/80 transition-colors hover:text-[#F37021]"
            >
              {l.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <a href="#cadastro-mobile" className="btn-cta hidden text-sm sm:inline-flex lg:hidden">
            Receber catálogo
          </a>
          <a href="#cadastro" className="btn-cta hidden text-sm lg:inline-flex">
            Receber catálogo
          </a>
          <button
            aria-label="Abrir menu"
            className="grid h-11 w-11 place-items-center rounded-xl border border-black/10 bg-white text-[#263055] lg:hidden"
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {open && (
        <div className="border-t border-black/5 bg-white/95 backdrop-blur-md lg:hidden">
          <div className="mx-auto flex max-w-7xl flex-col gap-1 px-5 py-4">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="rounded-lg px-3 py-3 text-sm font-semibold text-[#263055] hover:bg-[#F8F8F6]"
              >
                {l.label}
              </a>
            ))}
            <a href="#cadastro-mobile" onClick={() => setOpen(false)} className="btn-cta mt-2">
              Receber catálogo
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
