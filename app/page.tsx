import Image from "next/image";
import Link from "next/link";
import { ContactForm } from "@/components/ContactForm";
import { Footer } from "@/components/Footer";
import { LensScene } from "@/components/LensScene";
import { Loader } from "@/components/Loader";
import { MotionLayer } from "@/components/MotionLayer";
import { ProjectGrid } from "@/components/ProjectGrid";
import { SiteHeader } from "@/components/SiteHeader";
import { capabilities, clients, siteCopy } from "@/lib/content";

export default function HomePage() {
  return (
    <>
      <Loader />
      <SiteHeader />
      <MotionLayer />
      <main>
        <section className="hero">
          <div className="heroPoster" data-parallax>
            <Image
              src="/assets/deflick-logo.jpg"
              alt="DeFlick Production logo"
              width={1440}
              height={900}
              priority
            />
            <LensScene />
          </div>
          <div className="heroStatement" data-reveal>
            <p className="eyebrow">Production + post / Yerevan and beyond</p>
            <h1>{siteCopy.headline}</h1>
            <p>{siteCopy.intro}</p>
            <Link className="button buttonLight" href="/work">
              Selected work
            </Link>
          </div>
        </section>

        <section className="wordmarkBand" data-reveal>
          <span>DEFLICK</span>
          <p>{siteCopy.capability}</p>
        </section>

        <section className="sectionShell" aria-labelledby="selected-work">
          <div className="sectionHead" data-reveal>
            <p className="eyebrow">Selected work</p>
            <h2 id="selected-work">Large images first. Claims only when verified.</h2>
          </div>
          <ProjectGrid />
        </section>

        <section className="capabilityStrip" data-reveal>
          <h2>{siteCopy.capability}</h2>
          <div>
            {capabilities.slice(0, 6).map((capability) => (
              <span key={capability}>{capability}</span>
            ))}
          </div>
        </section>

        <section className="clientSection sectionShell" data-reveal>
          <p className="eyebrow">Clients and cultural partners</p>
          <div className="clientGrid">
            {clients
              .filter((client) => client.visible)
              .map((client) => (
                <span key={client.name}>{client.name}</span>
              ))}
          </div>
        </section>

        <section className="introBlock sectionShell" data-reveal>
          <p className="eyebrow">Company</p>
          <h2>{siteCopy.company}</h2>
        </section>

        <section className="contactCta sectionShell" data-reveal>
          <div>
            <p className="eyebrow">Contact</p>
            <h2>Bring a film, commercial or cultural project into the room.</h2>
            <p>
              Business email: <a href={`mailto:${siteCopy.email}`}>{siteCopy.email}</a>
            </p>
          </div>
          <ContactForm />
        </section>
      </main>
      <Footer />
    </>
  );
}
