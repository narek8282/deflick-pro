import { Footer } from "@/components/Footer";
import { ProjectGrid } from "@/components/ProjectGrid";
import { SiteHeader } from "@/components/SiteHeader";

export const metadata = {
  title: "Work"
};

export default function WorkPage() {
  return (
    <>
      <SiteHeader />
      <main className="routePage">
        <section className="sectionShell routeHero">
          <p className="eyebrow">Portfolio</p>
          <h1>PROJECTS</h1>
          <p>
            Film making, trailers, commercials, music videos, animation and documentary records
            rebuilt from the legacy DeFlick structure. Filters work instantly without reloading.
          </p>
        </section>
        <ProjectGrid />
      </main>
      <Footer />
    </>
  );
}
