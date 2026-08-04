import Link from "next/link";
import { Footer } from "@/components/Footer";
import { SiteHeader } from "@/components/SiteHeader";
import { capabilities, clients, siteCopy } from "@/lib/content";

export const metadata = {
  title: "About"
};

export default function AboutPage() {
  return (
    <>
      <SiteHeader />
      <main className="routePage">
        <section className="sectionShell routeHero">
          <p className="eyebrow">About</p>
          <h1>{siteCopy.company}</h1>
        </section>
        <section className="aboutGrid sectionShell">
          <article>
            <p className="eyebrow">Capabilities</p>
            <ul>
              {capabilities.map((capability) => (
                <li key={capability}>{capability}</li>
              ))}
            </ul>
          </article>
          <article>
            <p className="eyebrow">Selected clients</p>
            <ul>
              {clients
                .filter((client) => client.visible)
                .map((client) => (
                  <li key={client.name}>{client.name}</li>
                ))}
            </ul>
          </article>
        </section>
        <section className="sectionShell contactLine">
          <Link className="button buttonLight" href="/contact">
            Start a project
          </Link>
        </section>
      </main>
      <Footer />
    </>
  );
}
