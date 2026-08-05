import { ContactForm } from "@/components/ContactForm";
import { Footer } from "@/components/Footer";
import { SiteHeader } from "@/components/SiteHeader";
import { siteCopy } from "@/lib/content";

export const metadata = {
  title: "Contact"
};

export default function ContactPage() {
  return (
    <>
      <SiteHeader />
      <main className="routePage">
        <section className="sectionShell contactRoute">
          <div>
            <p className="eyebrow">Contact</p>
            <h1>Project inquiries, commercials, post and cultural work.</h1>
            <dl className="contactDetails">
              <div>
                <dt>Email</dt>
                <dd>
                  <a href={`mailto:${siteCopy.email}`}>{siteCopy.email}</a>
                </dd>
              </div>
              <div>
                <dt>Location</dt>
                <dd>{siteCopy.location}</dd>
              </div>
              <div>
                <dt>Social</dt>
                <dd className="stackedLinks">
                  <a href={siteCopy.socials.instagram} target="_blank" rel="noreferrer">
                    Instagram
                  </a>
                  <a href={siteCopy.socials.facebook} target="_blank" rel="noreferrer">
                    Facebook
                  </a>
                </dd>
              </div>
              <div>
                <dt>Portfolio</dt>
                <dd className="stackedLinks">
                  <a href={siteCopy.portfolioUrl} target="_blank" rel="noreferrer">
                    Google Drive
                  </a>
                  <a href={siteCopy.showreelUrl} target="_blank" rel="noreferrer">
                    Showreel
                  </a>
                </dd>
              </div>
            </dl>
          </div>
          <ContactForm />
        </section>
      </main>
      <Footer />
    </>
  );
}
