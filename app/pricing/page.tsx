import Link from "next/link";
import { Footer } from "@/components/Footer";
import { SiteHeader } from "@/components/SiteHeader";

export const metadata = {
  title: "Pricing"
};

export default function PricingPage() {
  return (
    <>
      <SiteHeader />
      <main className="routePage">
        <section className="sectionShell routeHero simpleRouteHero">
          <p className="eyebrow">Pricing</p>
          <h1>ORDER BY SCOPE</h1>
          <p>
            Pricing is handled as a production estimate after format, crew, dates, locations,
            post-production and delivery versions are clear.
          </p>
          <Link className="button buttonLight" href="/contact">
            ORDER
          </Link>
        </section>
      </main>
      <Footer />
    </>
  );
}
