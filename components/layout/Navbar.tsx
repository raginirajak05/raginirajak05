"use client";

import { profile } from "@/data/resume";
import { useEffect, useState } from "react";

const navLinks = [
  { label: "Work", href: "#experience" },
  { label: "Skills", href: "#skills" },
  { label: "Education", href: "#education" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("");

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActiveSection(entry.target.id);
        }
      },
      { rootMargin: "-40% 0px -55% 0px" }
    );
    navLinks.forEach(({ href }) => {
      const el = document.querySelector(href);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled
          ? "bg-navy-950/80 backdrop-blur-xl border-b border-white/6"
          : ""
        }`}
    >
      <nav className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Wordmark */}
        <a
          href="#"
          onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: "smooth" }); }}
          className="font-(family-name:--font-heading) font-bold text-lg tracking-tight text-white hover:opacity-80 transition-opacity"
        >
          {profile.name.split(" ")[0]}
          <span className="text-brand-purple">&nbsp;{profile.name.split(" ")[1]}</span>
        </a>

        <div className="flex items-center gap-6">
          {/* Nav links */}
          <ul className="hidden md:flex items-center gap-1">
            {navLinks.map(({ label, href }) => {
              const isActive = activeSection === href.replace("#", "");
              return (
                <li key={href}>
                  <a
                    href={href}
                    onClick={(e) => handleClick(e, href)}
                    className={`font-label text-sm px-3 py-1.5 rounded-lg transition-all duration-200 ${isActive
                        ? "text-brand-purple bg-brand-purple/10"
                        : "text-[#71717A] hover:text-white hover:bg-white/5"
                      }`}
                  >
                    {label}
                  </a>
                </li>
              );
            })}
          </ul>

          {/* Availability badge */}
          <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full border border-[#00C9B1]/30 bg-[#00C9B1]/5">
            <span className="w-1.5 h-1.5 rounded-full bg-[#00C9B1] animate-pulse" />
            <span className="font-label text-xs text-[#00C9B1] font-medium tracking-wide whitespace-nowrap">
              Available · Berlin
            </span>
          </div>
        </div>

        {/* Mobile links */}
        <div className="md:hidden flex gap-3">
          {navLinks.map(({ label, href }) => (
            <a
              key={href}
              href={href}
              onClick={(e) => handleClick(e, href)}
              className="text-xs text-[#71717A] hover:text-white transition-colors"
            >
              {label}
            </a>
          ))}
        </div>
      </nav>
    </header>
  );
}
