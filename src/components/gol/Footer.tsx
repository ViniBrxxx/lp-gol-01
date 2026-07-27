import { Instagram, Mail } from "lucide-react";
import { Logo } from "./Logo";

export function Footer() {
  return (
    <footer style={{ background: "#071E42" }} className="text-white/80">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-8 px-5 py-14 sm:px-8 lg:grid-cols-[1.4fr_1fr_1fr]">
        <div>
          <Logo variant="white" />
          <p className="mt-4 max-w-sm text-sm leading-relaxed text-white/70">
            Grandes marcas para o seu negócio.
          </p>
        </div>
        <div>
          <h4 className="text-[11px] font-bold uppercase tracking-[0.18em] text-white/50">
            Institucional
          </h4>
          <ul className="mt-4 space-y-2 text-sm">
            <li>
              <a href="#" className="hover:text-[#F37021]">
                Política de Privacidade
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-[#F37021]">
                Termos de Uso
              </a>
            </li>
          </ul>
        </div>
        <div>
          <h4 className="text-[11px] font-bold uppercase tracking-[0.18em] text-white/50">
            Contato
          </h4>
          <ul className="mt-4 space-y-2 text-sm">
            <li>
              <a
                href="https://www.instagram.com/gol.distribuidora/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 hover:text-[#F37021]"
              >
                <Instagram size={14} /> Instagram
              </a>
            </li>
            <li>
              <a
                href="#cadastro-mobile"
                className="inline-flex items-center gap-2 hover:text-[#F37021] lg:hidden"
              >
                <Mail size={14} /> Fale com um consultor
              </a>
              <a
                href="#cadastro"
                className="hidden items-center gap-2 hover:text-[#F37021] lg:inline-flex"
              >
                <Mail size={14} /> Fale com um consultor
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-2 px-5 py-5 text-xs text-white/50 sm:flex-row sm:px-8">
          <p>© {new Date().getFullYear()} GOL Distribuidora. Todos os direitos reservados.</p>
          <p>
            Atendimento exclusivo para empresas com CNPJ.
            <br />
            CNPJ: 07.693.868/0001-63
          </p>
        </div>
      </div>
    </footer>
  );
}
