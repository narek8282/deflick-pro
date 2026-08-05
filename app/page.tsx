import Image from "next/image";
import Link from "next/link";
import { ContactForm } from "@/components/ContactForm";
import { Footer } from "@/components/Footer";
import { HeroLens } from "@/components/HeroLens";
import { Loader } from "@/components/Loader";
import { MotionLayer } from "@/components/MotionLayer";
import { SiteHeader } from "@/components/SiteHeader";
import { categoryTiles, clients, siteCopy } from "@/lib/content";

export default function HomePage() {
  const marquee = [...clients, ...clients];

  return (
    <>
      <Loader />
      <SiteHeader />
      <MotionLayer />
      <main>
        <section className="hero legacyHero">
          <div className="heroStatement" data-reveal>
            <p className="eyebrow">Production / Yerevan</p>
            <h1>{siteCopy.headline}</h1>
            <p>{siteCopy.intro}</p>
            <div className="heroActions">
              <Link className="button buttonLight" href="/work">
                EXPLORE PROJECTS
              </Link>
            </div>
          </div>
          <div className="heroIdentity" aria-label="DeFlick Production">
            <HeroLens />
            <strong>DEFLICK</strong>
            <span>PRODUCTION</span>
          </div>
        </section>

        <section className="mtsFeature" data-reveal>
          <div className="mtsMap" aria-hidden="true">
            <span />
            <span />
            <span />
            <span />
          </div>
          <article>
            <h2>
              <span />
              MTS
            </h2>
            <p>
              Leading telecom brand from the legacy DeFlick portfolio. Replace this reversible
              copy with the approved case text when original MTS files arrive.
            </p>
            <Link href="/work/mts">MORE</Link>
          </article>
        </section>

        <section className="clientMarquee" aria-label="Clients">
          <div>
            {marquee.map((client, index) => (
              <Link href="/work" key={`${client.name}-${index}`}>
                {client.name}
              </Link>
            ))}
          </div>
        </section>

        <section className="categoryMosaic" aria-label="Work categories">
          {categoryTiles.map((tile) => (
            <Link className={tile.wide ? "categoryTile wide" : "categoryTile"} href="/work" key={tile.title}>
              <Image src={tile.image} alt="" fill sizes="(max-width: 900px) 100vw, 50vw" />
              <span>{tile.number}</span>
              <h2>{tile.title}</h2>
              <b aria-hidden="true">-&gt;</b>
            </Link>
          ))}
        </section>

        <section className="helpBand" data-reveal>
          <p>DON&apos;T YOU KNOW WHAT SUITS YOU?</p>
          <Link href="/contact">WE CAN HELP YOU</Link>
        </section>

        <section className="contactCta sectionShell" data-reveal>
          <div>
            <p className="eyebrow">Contact us</p>
            <h2>Bring a film, commercial or cultural project into the room.</h2>
            <p>
              E-mail: <a href={`mailto:${siteCopy.email}`}>{siteCopy.email}</a>
            </p>
            <div className="socialLinks">
              <Link href={siteCopy.portfolioUrl} target="_blank" rel="noreferrer">
                Drive portfolio
              </Link>
              <Link href={siteCopy.socials.instagram} target="_blank" rel="noreferrer">
                Instagram
              </Link>
              <Link href={siteCopy.socials.facebook} target="_blank" rel="noreferrer">
                Facebook
              </Link>
            </div>
          </div>
          <ContactForm />
        </section>
      </main>
      <Footer />
    </>
  );
}
