import Link from "next/link";
import { capabilities, siteCopy } from "@/lib/content";

const columns = ["PROJECTS", "HOW WE WORK", "PRICING", "ABOUT", "CONTACT US"];

function columnHref(column: string) {
  if (column === "PROJECTS") return "/work";
  if (column === "CONTACT US") return "/contact";
  return `/${column.toLowerCase().replaceAll(" ", "-")}`;
}

export function Footer() {
  return (
    <footer className="footer">
      <div className="footerColumns">
        {columns.map((column) => (
          <nav aria-label={column} key={column}>
            <strong>{column}</strong>
            {capabilities.map((item) => (
              <Link href={columnHref(column)} key={item}>
                {item}
              </Link>
            ))}
          </nav>
        ))}
      </div>
      <div className="footerBottom">
        <span>&quot;DeFlick Production&quot; LLC<br />Copyright 2026. All rights reserved</span>
        <address>
          {siteCopy.location}<br />
          {siteCopy.address}<br />
          E-mail: <a href={`mailto:${siteCopy.email}`}>{siteCopy.email}</a><br />
          <Link href={siteCopy.socials.instagram} target="_blank" rel="noreferrer">Instagram</Link>{" "}
          <Link href={siteCopy.socials.facebook} target="_blank" rel="noreferrer">Facebook</Link>
        </address>
      </div>
    </footer>
  );
}
