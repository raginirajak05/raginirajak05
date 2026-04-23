"use client";

import { useEffect, useRef, useState } from "react";
import { experience } from "@/data/resume";

const accentColors = [
  "#A78BFA", // purple
  "#00C9B1", // teal
  "#F472B6", // pink
  "#F472B6", // pink again for 4th entry
];

function FadeIn({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setVisible(true); },
      { threshold: 0.08 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);
  return (
    <div
      ref={ref}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(28px)",
        transition: `opacity 0.6s ease ${delay}s, transform 0.6s ease ${delay}s`,
      }}
    >
      {children}
    </div>
  );
}

export default function Experience() {
  return (
    <section id="experience" className="py-24 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Section header */}
        <div className="mb-12">
          <p className="font-label text-xs font-semibold tracking-[0.2em] uppercase text-[#71717A] mb-3">
            02 / Work History
          </p>
          <h2 className="font-heading font-bold text-4xl md:text-5xl text-white">
            Experience
          </h2>
        </div>

        {/* Cards */}
        <div className="space-y-6">
          {experience.map((item, i) => {
            const accent = accentColors[i] ?? "#A78BFA";
            return (
              <FadeIn key={i} delay={i * 0.08}>
                <div
                  className="glass-card rounded-2xl overflow-hidden"
                  style={{ borderLeft: `3px solid ${accent}` }}
                >
                  <div className="p-6 md:p-8">
                    {/* Card header */}
                    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 mb-4">
                      <div>
                        <h3 className="font-heading font-bold text-white text-xl leading-tight">
                          {item.title}
                        </h3>
                        <div className="flex flex-wrap items-center gap-2 mt-1.5">
                          <span
                            className="font-label text-xs font-semibold px-2.5 py-1 rounded-full"
                            style={{ background: `${accent}18`, color: accent }}
                          >
                            {item.company}
                          </span>
                          {item.companyDetail && (
                            <span className="text-[#71717A] text-xs">{item.companyDetail}</span>
                          )}
                          <span className="text-[#71717A] text-xs">· {item.location}</span>
                        </div>
                      </div>
                      <span
                        className="font-label text-xs font-medium px-3 py-1.5 rounded-full whitespace-nowrap self-start"
                        style={{ background: `${accent}12`, color: accent, border: `1px solid ${accent}30` }}
                      >
                        {item.period}
                      </span>
                    </div>

                    {/* Context */}
                    {item.context && (
                      <p className="text-[#71717A] text-sm italic mb-5 leading-relaxed border-l-2 border-brand-purple/30 pl-4">
                        {item.context}
                      </p>
                    )}

                    {/* Bullets */}
                    <ul className="space-y-2.5">
                      {item.bullets.map((bullet, j) => (
                        <li key={j} className="flex gap-3 text-slate-300 text-sm leading-relaxed">
                          <span className="mt-1.5 shrink-0 text-xs" style={{ color: accent }}>›</span>
                          {bullet}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </FadeIn>
            );
          })}
        </div>
      </div>
    </section>
  );
}
