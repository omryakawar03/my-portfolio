"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function HeroSec() {
  const heroRef = useRef<HTMLDivElement>(null);
  const nameRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
  /* ---------- PAGE ENTER ANIMATION ---------- */
  gsap.fromTo(
    heroRef.current,
    { opacity: 0, y: 40 },
    {
      opacity: 1,
      y: 0,
      duration: 1,
      ease: "power3.out",
    }
  );

  /* ---------- TYPEWRITER (FIXED) ---------- */
  const text = "Omkar Ryakawar";
  let index = 0;
  let isDeleting = false;

  const type = () => {
    if (!nameRef.current) return;

    // set text
    nameRef.current.textContent = text.substring(0, index);

    if (!isDeleting && index === text.length) {
      // pause after full text
      setTimeout(() => (isDeleting = true), 1500);
    } else if (isDeleting && index === 0) {
      // pause before retyping
      isDeleting = false;
    }

    index += isDeleting ? -1 : 1;

    setTimeout(type, isDeleting ? 60 : 120);
  };

  type();
}, []);

  return (
    <section className="min-h-[calc(100vh-4rem)] flex items-center justify-center px-4">
      <div
        ref={heroRef}
        className="text-center max-w-4xl space-y-6"
      >
        {/* NAME (TYPEWRITER) */}
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight">
          <span ref={nameRef} />
          <span className="animate-blink">|</span>
        </h1>

        {/* ROLE */}
        <p className="text-sm sm:text-base text-gray-400">
          Full-Stack Engineer · DevOps-Driven
        </p>

        {/* HEADLINE */}
        <h2 className="text-xl sm:text-2xl md:text-3xl font-medium text-gray-200">
          I build production-ready systems — code, infrastructure, and deployment.
        </h2>

        {/* DESCRIPTION */}
        <p className="text-sm sm:text-base md:text-lg text-gray-300 leading-relaxed">
          I design scalable architectures, automate deployments, and ship systems
          that survive real users and real traffic. From frontend to backend to
          CI/CD and cloud — I own the full lifecycle.
        </p>
      </div>
    </section>
  );
}
