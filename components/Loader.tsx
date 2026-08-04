"use client";

import { useEffect, useState } from "react";

export function Loader() {
  const [visible, setVisible] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (sessionStorage.getItem("deflick-loader-seen") === "1") return;

    const start = window.setTimeout(() => setVisible(true), 0);
    let frame = 0;
    const timer = window.setInterval(() => {
      frame += 8;
      setProgress(Math.min(frame, 100));
      if (frame >= 100) {
        window.clearInterval(timer);
        sessionStorage.setItem("deflick-loader-seen", "1");
        window.setTimeout(() => setVisible(false), 280);
      }
    }, 80);

    return () => {
      window.clearTimeout(start);
      window.clearInterval(timer);
    };
  }, []);

  if (!visible) return null;

  return (
    <div className="loader" aria-label="Loading DeFlick">
      <div className="loaderLens loaderBlue" />
      <div className="loaderLens loaderPink" />
      <div className="loaderLens loaderOrange" />
      <strong>DEFLICK</strong>
      <span>{progress}%</span>
    </div>
  );
}
