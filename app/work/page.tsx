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
          <p className="eyebrow">Work index</p>
          <h1>Selected production, post and cultural project records.</h1>
          <p>
            Project descriptions stay conservative until final materials are verified. Ordering,
            visibility and fields are prepared for admin control.
          </p>
        </section>
        <ProjectGrid />
      </main>
      <Footer />
    </>
  );
}
