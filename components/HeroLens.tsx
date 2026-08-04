"use client";

import dynamic from "next/dynamic";

const LensScene = dynamic(() => import("@/components/LensScene").then((mod) => mod.LensScene), {
  ssr: false,
  loading: () => <LensFallback />
});

function LensFallback() {
  return (
    <div className="lensFallback" aria-hidden="true">
      <span className="fallbackLens blue" />
      <span className="fallbackLens pink" />
      <span className="fallbackLens orange" />
    </div>
  );
}

export function HeroLens() {
  return <LensScene />;
}
