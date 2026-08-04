"use client";

import dynamic from "next/dynamic";
import { useState } from "react";

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
  const [enabled, setEnabled] = useState(false);

  return (
    <div
      className="heroLensLoader"
      onPointerEnter={() => setEnabled(true)}
      onPointerMove={() => setEnabled(true)}
      onTouchStart={() => setEnabled(true)}
      aria-hidden="true"
    >
      {enabled ? <LensScene /> : <LensFallback />}
    </div>
  );
}
