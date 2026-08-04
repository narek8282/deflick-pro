import Link from "next/link";

export default function NotFound() {
  return (
    <main className="notFound">
      <p className="eyebrow">404 / Lost frame</p>
      <h1>This frame is not in the cut.</h1>
      <Link className="button buttonLight" href="/">
        Return home
      </Link>
    </main>
  );
}
