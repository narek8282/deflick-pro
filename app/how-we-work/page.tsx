import { Footer } from "@/components/Footer";
import { SiteHeader } from "@/components/SiteHeader";

const stages = [
  ["DEVELOPMENT", "Treatment, references, scope and production logic."],
  ["PRE-PRODUCTION", "Schedule, crew, casting, locations and visual rules."],
  ["PRODUCTION", "Set, camera, light, direction and captured material."],
  ["POST-PRODUCTION", "Edit, sound, VFX, color correction and delivery masters."],
  ["DISTRIBUTION", "Trailers, festival assets, social versions and launch files."]
];

export const metadata = {
  title: "How We Work"
};

export default function HowWeWorkPage() {
  return (
    <>
      <SiteHeader />
      <main className="routePage howPage">
        <section className="factoryHero">
          <div className="factoryIcon" aria-hidden="true">
            <span />
            <span />
            <span />
          </div>
          <div>
            <p className="eyebrow">How we work</p>
            <h1>PRODUCTION LINE</h1>
            <p>One clear path from first idea to final delivery.</p>
          </div>
        </section>

        <section className="productionLine sectionShell" aria-label="Production stages">
          {stages.map(([title, text], index) => (
            <article className={`stage stage${index + 1}`} key={title}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <h2>{title}</h2>
              <p>{text}</p>
            </article>
          ))}
        </section>
      </main>
      <Footer />
    </>
  );
}
