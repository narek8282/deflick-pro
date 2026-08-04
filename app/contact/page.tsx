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
                <dd>Instagram / Vimeo / LinkedIn fields are ready in admin data.</dd>
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
