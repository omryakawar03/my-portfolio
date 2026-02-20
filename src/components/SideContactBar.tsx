'use client'

import Link from "next/link";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import {
  FaGithub,
  FaLinkedin,
  FaEnvelope,
} from "react-icons/fa";
import { FaMessage } from "react-icons/fa6";

const socials = [
  {
    icon: <FaGithub />,
    url: "https://github.com/omryakawar03",
    label: "GitHub",
    external: true,
  },
  {
    icon: <FaLinkedin />,
    url: "https://www.linkedin.com/in/omkar-ryakawar-18368b387/",
    label: "LinkedIn",
    external: true,
  },
  {
    icon: <FaEnvelope />,
    url: "mailto:ryakawarom@gmail.com",
    label: "Email",
    external: true,
  },
  {
    icon: <FaMessage />,
    url: "/contact",
    label: "Contact",
    external: false,
  },
];

const SideContactBar = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    gsap.from(containerRef.current.children, {
      x: 40,
      opacity: 0,
      stagger: 0.15,
      duration: 0.8,
      ease: "power3.out",
    });
  }, []);

  return (
    <div
      ref={containerRef}
      className="fixed left-6 top-1/3 z-50 hidden md:flex flex-col gap-5"
    >
      {socials.map((social, i) => {
        const content = (
          <div className="relative group flex items-center">
            <div className=" text-xl p-3 rounded-2xl  bg-white/10 backdrop-blur-xl border border-white/10  text-white transition-all duration-300 hover:-translate-y-1 hover:scale-110  hover:bg-white hover:text-black shadow-lg hover:shadow-white/30">
              {social.icon}
            </div>

            {/* Tooltip */}
            <span
              className="absolute left-full ml-4 px-3 py-1 text-sm rounded-lg bg-black text-white border border-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
              {social.label}
            </span>
          </div>
        );

        return social.external ? (
          <a
            key={i}
            href={social.url}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={social.label}
          >
            {content}
          </a>
        ) : (
          <Link key={i} href={social.url} aria-label={social.label}>
            {content}
          </Link>
        );
      })}
    </div>
  );
};

export default SideContactBar;