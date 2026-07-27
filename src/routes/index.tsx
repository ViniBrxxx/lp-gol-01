import { createFileRoute } from "@tanstack/react-router";
import { Header } from "@/components/gol/Header";
import { Hero } from "@/components/gol/Hero";
import { AboutCarousel } from "@/components/gol/AboutCarousel";
import { CategoryCards } from "@/components/gol/CategoryCards";
import { BrandsSection } from "@/components/gol/BrandsSection";
import { PositioningSection } from "@/components/gol/PositioningSection";
import { HowItWorks } from "@/components/gol/HowItWorks";
import { Footer } from "@/components/gol/Footer";
import { LeadForm } from "@/components/gol/LeadForm";
import { VslSection } from "@/components/gol/VslSection";

export const Route = createFileRoute("/")({
  component: Index,
  head: () => ({
    meta: [
      { title: "GOL Distribuidora | Calçados no Atacado para Lojistas" },
      {
        name: "description",
        content:
          "Conheça o portfólio da GOL Distribuidora e encontre calçados, sandálias e acessórios no atacado para sua loja. Faça seu cadastro comercial.",
      },
      { property: "og:title", content: "GOL Distribuidora | Calçados no Atacado para Lojistas" },
      {
        property: "og:description",
        content:
          "Portfólio multimarcas para lojistas e revendedores. Cadastre-se e fale com um consultor comercial.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "GOL Distribuidora | Calçados no Atacado" },
      {
        name: "twitter:description",
        content: "Distribuição B2B de calçados, sandálias e acessórios para lojistas.",
      },
    ],
    links: [
      { rel: "canonical", href: "/" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700;800;900&display=swap",
      },
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Organization",
          name: "GOL Distribuidora",
          description:
            "Distribuidora multimarcas de calçados, sandálias e acessórios para lojistas e revendedores.",
          areaServed: "BR",
        }),
      },
    ],
  }),
});

function Index() {
  return (
    <main className="min-h-screen bg-white text-[#071E42]">
      <Header />
      <Hero />
      <VslSection />
      <AboutCarousel />
      <BrandsSection />
      <CategoryCards />
      <PositioningSection />
      <HowItWorks />
      <section className="bg-white px-5 py-14 sm:px-8 sm:py-20 lg:hidden">
        <div className="mx-auto max-w-2xl">
          <LeadForm embedded sectionId="cadastro-mobile" />
        </div>
      </section>
      <div className="hidden lg:block">
        <LeadForm sectionId="cadastro-final" />
      </div>
      <Footer />
    </main>
  );
}
