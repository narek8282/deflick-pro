import Image from "next/image";
import Link from "next/link";

export function SiteHeader() {
  return (
    <header className="siteHeader">
      <Link className="brandMark" href="/" aria-label="DeFlick home">
        <Image src="/assets/deflick-logo-mark.png" alt="" width={1360} height={759} priority />
        <span>DEFLICK</span>
      </Link>
      <nav aria-label="Primary">
        <Link href="/work">Work</Link>
        <Link href="/about">About</Link>
        <Link href="/contact">Contact</Link>
        <Link href="/admin">Admin</Link>
      </nav>
    </header>
  );
}
