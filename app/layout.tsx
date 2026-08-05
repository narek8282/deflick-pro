import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://deflick.pro"),
  title: {
    default: "DeFlick / Production + Post",
    template: "%s / DeFlick"
  },
  description:
    "Independent production and post-production studio working across film, commercials, documentaries and cultural projects.",
  openGraph: {
    title: "DeFlick / Production + Post",
    description:
      "Independent production and post-production studio working across film, commercials, documentaries and cultural projects.",
    images: ["/assets/deflick-logo-black.png"],
    type: "website"
  }
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const organization = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "DeFlick Production",
    url: "https://deflick.pro",
    logo: "https://deflick.pro/assets/deflick-logo-black.png",
    sameAs: []
  };

  return (
    <html lang="en" data-scroll-behavior="smooth">
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organization) }}
        />
        {children}
      </body>
    </html>
  );
}
