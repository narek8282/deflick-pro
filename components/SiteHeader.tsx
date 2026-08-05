"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

const links = [
  { href: "/work", label: "PROJECTS" },
  { href: "/how-we-work", label: "HOW WE WORK" },
  { href: "/pricing", label: "PRICING" },
  { href: "/about", label: "ABOUT" }
];

export function SiteHeader() {
  const [open, setOpen] = useState(false);

  return (
    <header className="siteHeader">
      <Link className="brandMark" href="/" aria-label="DeFlick home" onClick={() => setOpen(false)}>
        <Image src="/assets/deflick-logo-mark.png" alt="" width={1360} height={759} priority />
      </Link>
      <nav className={open ? "open" : ""} aria-label="Primary">
        {links.map((link) => (
          <Link href={link.href} key={link.href} onClick={() => setOpen(false)}>
            {link.label}
          </Link>
        ))}
        <span className="navDivider" aria-hidden="true" />
        <Link href="/contact" onClick={() => setOpen(false)}>
          CONTACT US
        </Link>
        <Link className="orderButton" href="/contact" onClick={() => setOpen(false)}>
          ORDER
        </Link>
        <button className="langSwitch" type="button" aria-label="Language">
          Eng
        </button>
      </nav>
      <button className="mobileMenuButton" type="button" onClick={() => setOpen(!open)} aria-expanded={open}>
        <span />
        <span />
      </button>
    </header>
  );
}
