import Link from "next/link";
import { siteCopy } from "@/lib/content";

export function Footer() {
  return (
    <footer className="footer">
      <span>DEFLICK.PRO</span>
      <div>
        <Link href={siteCopy.socials.instagram} target="_blank" rel="noreferrer">
          Instagram
        </Link>
        <Link href={siteCopy.socials.facebook} target="_blank" rel="noreferrer">
          Facebook
        </Link>
        <Link href="/privacy">Privacy</Link>
        <Link href="/contact">Contact</Link>
      </div>
    </footer>
  );
}
