import { useState } from "react";
import { createRoot } from "react-dom/client";
import { ArrowRight, Headset, BadgeCheck, Menu, ShieldCheck, Handshake, Tags, X } from "lucide-react";
import { submitLead } from "./lead-submit.js";
import { onPhoneInput, onCNPJInput, validateCNPJField, validatePhoneField } from "./masks.js";
import "./styles.css";

const benefits = [
  [BadgeCheck, "Marcas com procedência"],
  [Headset, "Atendimento comercial"],
  [Handshake, "Suporte ao lojista"],
  [Tags, "Condições de atacado"],
];

function LeadForm() {
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submissionError, setSubmissionError] = useState("");

  async function handleSubmit(event) {
    event.preventDefault();
    const form = event.currentTarget;
    const phoneValid = validatePhoneField(form.querySelector('input[name="numero"]'));
    const cnpjValid = validateCNPJField(form.querySelector('input[name="cnpj"]'));
    if (!phoneValid || !cnpjValid) return;

    setSubmitting(true);
    setSubmissionError("");

    try {
      await submitLead(new FormData(form));
      setSubmitted(true);
    } catch (error) {
      setSubmissionError(error.message);
    } finally {
      setSubmitting(false);
    }
  }

  if (submitted) {
    return <div className="form-card confirmation"><span>✓</span><h2>Dados recebidos!</h2><p>Em breve, um consultor entrará em contato com você.</p></div>;
  }

  return (
    <form id="cadastro" className="form-card" onSubmit={handleSubmit}>
      <div className="form-heading"><h2>Fale com a Gol Distribuidora</h2><b><ShieldCheck size={13}/> Seguro</b></div>
      <div className="form-grid">
        <label className="full">Nome<input name="nome" required placeholder="Seu nome" /></label>
        <label>Número<input name="numero" required inputMode="tel" placeholder="(00) 00000-0000" maxLength={15} onInput={onPhoneInput} onBlur={e => validatePhoneField(e.currentTarget)} /></label>
        <label>CNPJ<input name="cnpj" required inputMode="numeric" placeholder="00.000.000/0000-00" maxLength={18} onInput={onCNPJInput} onBlur={e => validateCNPJField(e.currentTarget)} /></label>
      </div>
      <label className="consent"><input required type="checkbox"/> <span>Li e concordo com a <a href="#politica">Política de Privacidade</a>.</span></label>
      {submissionError && <p className="form-error" role="alert">{submissionError}</p>}
      <button className="button full-button" type="submit" disabled={submitting}>{submitting ? "Enviando..." : "Quero receber o catálogo"} {!submitting && <ArrowRight size={18}/>}</button>
      <p className="form-note">Informe seus dados para receber o contato da nossa equipe comercial.</p>
    </form>
  );
}

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  return <main>
    <header>
      <a href="#top" aria-label="GOL Distribuidora"><img src="/gol-distribuidora.webp" alt="GOL Distribuidora" /></a>
      <nav><a href="#top">A Gol</a><a href="#top">Marcas</a><a href="#top">Produtos</a><a href="#top">Diferenciais</a><a href="#top">Como comprar</a></nav>
      <a className="button nav-button" href="#cadastro">Conhecer a Gol</a>
      <button className="menu-button" aria-label="Abrir menu" onClick={() => setMenuOpen(!menuOpen)}>{menuOpen ? <X/> : <Menu/>}</button>
      {menuOpen && <div className="mobile-menu"><a href="#top">A Gol</a><a href="#top">Marcas</a><a href="#top">Produtos</a><a href="#cadastro">Conhecer a Gol</a></div>}
    </header>
    <section className="hero" id="top">
      <div className="circles" aria-hidden="true" />
      <div className="hero-content">
        <div className="copy">
          <div className="eyebrow"><i/> GOL DISTRIBUIDORA • ATENDIMENTO COMERCIAL</div>
          <h1>ABASTEÇA SEU NEGÓCIO<br/> COM <em>MAIS SEGURANÇA</em></h1>
          <p>Conheça o catálogo de uma distribuidora com operação estruturada, grandes marcas e atendimento comercial antes, durante e depois do pedido.</p>
          <a className="button hero-button" href="#cadastro">Quero receber o catálogo <ArrowRight size={18}/></a>
          <small>Atendimento exclusivo para empresas com CNPJ.</small>
          <div className="benefits">{benefits.map(([Icon, label]) => <span key={label}><Icon size={14}/>{label}</span>)}</div>
        </div>
        <div className="form-wrap"><LeadForm /></div>
      </div>
    </section>
  </main>;
}

createRoot(document.getElementById("root")).render(<App />);
