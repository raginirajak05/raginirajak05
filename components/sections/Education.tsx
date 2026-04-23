"use client";

import { useEffect, useRef, useState } from "react";
import { education, certifications, languages } from "@/data/resume";

function FadeIn({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold: 0.1 });
    observer.observe(el);
    return () => observer.disconnect();
  }, []);
  return (
    <div
      ref={ref}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(20px)",
        transition: `opacity 0.5s ease ${delay}s, transform 0.5s ease ${delay}s`,
      }}
    >
      {children}
    </div>
  );
}

export default function Education() {
  return (
    <section id="education" className="py-24 px-6 bg-[#111118]/50">
      <div className="max-w-6xl mx-auto">
        {/* Section header */}
        <div className="mb-12">
          <p className="font-label text-xs font-semibold tracking-[0.2em] uppercase text-[#71717A] mb-3">
            04 / Education
          </p>
          <h2 className="font-heading font-bold text-4xl md:text-5xl text-white">
            Education
          </h2>
        </div>

        {/* Degree cards */}
        <div className="grid md:grid-cols-2 gap-6 mb-16">
          {education.map((edu, i) => (
            <FadeIn key={i} delay={i * 0.1}>
              <div className="glass-card rounded-2xl p-6 h-full flex flex-col gap-4 border-l-[3px] border-l-[#A78BFA]">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex-1">
                    <h3 className="font-heading font-bold text-white text-lg leading-tight">
                      {edu.degree}
                    </h3>
                    <p className="text-[#A78BFA] text-sm font-medium mt-1">{edu.institution}</p>
                    <p className="text-[#71717A] text-xs mt-0.5">{edu.location} · {edu.period}</p>
                  </div>
                  <span className="font-label text-xs font-bold px-2.5 py-1 rounded-full bg-[#A78BFA]/15 text-[#A78BFA] border border-[#A78BFA]/30 shrink-0">
                    {edu.grade}
                  </span>
                </div>

                {edu.thesis && (
                  <p className="text-[#71717A] text-xs leading-relaxed border-l-2 border-[#A78BFA]/20 pl-3 italic">
                    <span className="text-slate-300 not-italic font-medium">Thesis: </span>
                    {edu.thesis}
                  </p>
                )}
                {edu.note && (
                  <p className="text-[#71717A] text-xs leading-relaxed italic">{edu.note}</p>
                )}
              </div>
            </FadeIn>
          ))}
        </div>

        {/* Languages + Certifications */}
        <div className="grid md:grid-cols-2 gap-10">
          <FadeIn delay={0.2}>
            <div>
              <h3 className="font-label text-xs font-semibold uppercase tracking-widest text-[#00C9B1] mb-5">
                Languages
              </h3>
              <div className="flex flex-wrap gap-2">
                {languages.map((lang, i) => (
                  <div
                    key={i}
                    className="font-label text-xs px-3 py-1.5 rounded-full border border-[#00C9B1]/25 bg-[#00C9B1]/8 text-white/80"
                  >
                    <span className="font-semibold text-[#00C9B1]">{lang.language}</span>
                    <span className="text-[#71717A] ml-1.5">{lang.level}</span>
                  </div>
                ))}
              </div>
            </div>
          </FadeIn>

          <FadeIn delay={0.3}>
            <div>
              <h3 className="font-label text-xs font-semibold uppercase tracking-widest text-[#F472B6] mb-5">
                Certifications &amp; Leadership
              </h3>
              <ul className="space-y-3">
                {certifications.map((cert, i) => (
                  <li key={i} className="flex gap-3 text-slate-300 text-sm leading-relaxed">
                    <span className="text-[#F472B6] mt-1.5 shrink-0 text-xs">›</span>
                    {cert}
                  </li>
                ))}
              </ul>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
