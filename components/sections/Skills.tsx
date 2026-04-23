"use client";

import { useEffect, useRef, useState } from "react";
import { skills } from "@/data/resume";

function FadeIn({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setVisible(true); },
      { threshold: 0.05 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);
  return (
    <div
      ref={ref}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(24px)",
        transition: `opacity 0.5s ease ${delay}s, transform 0.5s ease ${delay}s`,
      }}
    >
      {children}
    </div>
  );
}

export default function Skills() {
  return (
    <section id="skills" className="py-24 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Section header */}
        <div className="mb-12">
          <p className="font-label text-xs font-semibold tracking-[0.2em] uppercase text-[#71717A] mb-3">
            03 / Toolkit
          </p>
          <h2 className="font-heading font-bold text-4xl md:text-5xl text-white">
            Skills
          </h2>
        </div>

        {/* Skill groups */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {skills.map((group, i) => (
            <FadeIn key={group.category} delay={i * 0.06}>
              <div className="glass-card rounded-2xl p-6 h-full">
                {/* Category header */}
                <div className="flex items-center gap-2 mb-4">
                  <span
                    className="w-2.5 h-2.5 rounded-full shrink-0"
                    style={{ background: group.color }}
                  />
                  <h3
                    className="font-label text-xs font-semibold uppercase tracking-widest"
                    style={{ color: group.color }}
                  >
                    {group.category}
                  </h3>
                </div>
                {/* Tags */}
                <div className="flex flex-wrap gap-2">
                  {group.items.map((item) => (
                    <span
                      key={item}
                      className="font-label text-xs px-2.5 py-1 rounded-full text-white/80"
                      style={{
                        background: `${group.color}10`,
                        border: `1px solid ${group.color}28`,
                      }}
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
