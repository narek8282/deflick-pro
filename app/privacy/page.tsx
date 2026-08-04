import Link from "next/link";

export const metadata = {
  title: "Privacy"
};

export default function PrivacyPage() {
  return (
    <main className="simplePage">
      <Link href="/" className="textLink">
        DeFlick
      </Link>
      <p className="eyebrow">Privacy</p>
      <h1>Inquiry data is used only to reply to production requests.</h1>
      <p>
        The contact form collects the fields you submit, plus basic technical data needed for
        spam prevention and rate limiting. Do not submit private personal information unless it
        is necessary for a project inquiry.
      </p>
      <p>No analytics or marketing pixels are required for the current version.</p>
    </main>
  );
}
