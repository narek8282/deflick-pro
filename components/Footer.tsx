import Link from "next/link";

export function Footer() {
  return (
    <footer className="footer">
      <span>DEFLICK.PRO</span>
      <div>
        <Link href="/privacy">Privacy</Link>
        <Link href="/contact">Contact</Link>
      </div>
    </footer>
  );
}
