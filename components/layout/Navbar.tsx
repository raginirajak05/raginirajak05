"use client";

import { profile } from "@/data/resume";
import { useEffect, useState } from "react";

const navLinks = [
  { label: "Profile", href: "#profile" },
  { label: "Experience", href: "#experience" },
  { label: "Education", href: "#education" },
  { label: "Skills", href: "#skills" },
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
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? "bg-navy-950/90 backdrop-blur-md border-b border-white/10 shadow-lg" : ""
        }`}
    >
      <nav className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <span className="text-teal font-bold text-lg tracking-tight">
          {profile.name.split(" ")[0]}
          <span className="text-white">.{profile.name.split(" ")[1]}</span>
        </span>

        <ul className="hidden md:flex items-center gap-1">
          {navLinks.map(({ label, href }) => (
            <li key={href}>
              <a
                href={href}
                onClick={(e) => handleClick(e, href)}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${activeSection === href.slice(1)
                    ? "text-teal bg-teal/10"
                    : "text-slate-400 hover:text-white hover:bg-white/5"
                  }`}
              >
                {label}
              </a>
            </li>
          ))}
        </ul>

        <a
          href={`mailto:${profile.email}`}
          className="hidden md:inline-flex items-center gap-2 text-sm px-4 py-2 rounded-md border border-teal/40 text-teal hover:bg-teal hover:text-navy-950 transition-all duration-200 font-medium"
        >
          Hire Me
        </a>

        {/* Mobile: simple stacked links */}
        <div className="md:hidden flex gap-3">
          {navLinks.map(({ label, href }) => (
            <a
              key={href}
              href={href}
              onClick={(e) => handleClick(e, href)}
              className="text-xs text-slate-400 hover:text-teal transition-colors"
            >
              {label}
            </a>
          ))}
        </div>
      </nav>
    </header>
  );
}
