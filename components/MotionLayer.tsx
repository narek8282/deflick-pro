"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect } from "react";

export function MotionLayer() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    gsap.registerPlugin(ScrollTrigger);

    const context = gsap.context(() => {
      gsap.from("[data-reveal]", {
        y: 44,
        opacity: 0,
        duration: 0.9,
        ease: "power3.out",
        stagger: 0.08,
        scrollTrigger: {
          trigger: "main",
          start: "top 70%"
        }
      });

      gsap.utils.toArray<HTMLElement>("[data-parallax]").forEach((element) => {
        gsap.to(element, {
          yPercent: -12,
          ease: "none",
          scrollTrigger: {
            trigger: element,
            start: "top bottom",
            end: "bottom top",
            scrub: true
          }
        });
      });
    });

    return () => context.revert();
  }, []);

  return null;
}
