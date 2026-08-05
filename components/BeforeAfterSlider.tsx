"use client";

import Image from "next/image";
import type { CSSProperties } from "react";
import { useState } from "react";

type BeforeAfterSliderProps = {
  before: string;
  after: string;
  label: string;
};

export function BeforeAfterSlider({ before, after, label }: BeforeAfterSliderProps) {
  const [value, setValue] = useState(52);

  return (
    <div className="beforeAfter" style={{ "--split": `${value}%` } as CSSProperties}>
      <Image src={after} alt="" fill sizes="(max-width: 900px) 100vw, 50vw" />
      <div className="beforeLayer">
        <Image src={before} alt="" fill sizes="(max-width: 900px) 100vw, 50vw" />
      </div>
      <span className="beforeAfterLabel">{label}</span>
      <span className="splitLine" aria-hidden="true" />
      <input
        aria-label={`${label} before after split`}
        max="100"
        min="0"
        onChange={(event) => setValue(Number(event.target.value))}
        type="range"
        value={value}
      />
    </div>
  );
}
