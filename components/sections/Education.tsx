"use client";

import { useEffect, useRef, useState } from "react";
import { education, certifications, languages } from "@/data/resume";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { GraduationCap, Languages, Award } from "lucide-react";

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
    <section id="education" className="py-24 px-6 bg-navy-900/40">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center gap-4 mb-12">
          <h2 className="text-3xl font-bold text-white">Education</h2>
          <div className="h-px flex-1 bg-gradient-to-r from-teal/40 to-transparent" />
        </div>

        {/* Degree cards */}
        <div className="grid md:grid-cols-2 gap-6 mb-16">
          {education.map((edu, i) => (
            <FadeIn key={i} delay={i * 0.1}>
              <Card className="bg-navy-950/80 border border-white/10 hover:border-teal/30 transition-all duration-300 h-full">
                <CardContent className="p-6 flex flex-col gap-3">
                  <div className="flex items-start gap-3">
                    <GraduationCap className="text-teal mt-0.5 flex-shrink-0" size={20} />
                    <div className="flex-1">
                      <h3 className="text-white font-semibold text-base leading-tight">
                        {edu.degree}
                      </h3>
                      <p className="text-teal text-sm font-medium mt-0.5">{edu.institution}</p>
                      <p className="text-slate-500 text-xs mt-0.5">{edu.location}</p>
                    </div>
                    <Badge className="bg-teal/10 text-teal border-teal/20 text-xs flex-shrink-0">
                      {edu.grade}
                    </Badge>
                  </div>

                  <Separator className="bg-white/5" />

                  <p className="text-slate-500 text-xs">{edu.period}</p>

                  {edu.thesis && (
                    <p className="text-slate-400 text-xs leading-relaxed border-l-2 border-teal/30 pl-3 italic">
                      <span className="text-slate-300 not-italic font-medium">Thesis: </span>
                      {edu.thesis}
                    </p>
                  )}
                  {edu.note && (
                    <p className="text-slate-400 text-xs leading-relaxed italic">{edu.note}</p>
                  )}
                </CardContent>
              </Card>
            </FadeIn>
          ))}
        </div>

        {/* Languages + Certifications */}
        <div className="grid md:grid-cols-2 gap-10">
          <FadeIn delay={0.2}>
            <div>
              <div className="flex items-center gap-2 mb-5">
                <Languages className="text-teal" size={18} />
                <h3 className="text-white font-semibold text-lg">Languages</h3>
              </div>
              <div className="space-y-3">
                {languages.map((lang, i) => (
                  <div key={i} className="flex items-center justify-between">
                    <span className="text-slate-300 text-sm font-medium">{lang.language}</span>
                    <Badge className="bg-white/5 text-slate-400 border-white/10 text-xs">
                      {lang.level}
                    </Badge>
                  </div>
                ))}
              </div>
            </div>
          </FadeIn>

          <FadeIn delay={0.3}>
            <div>
              <div className="flex items-center gap-2 mb-5">
                <Award className="text-teal" size={18} />
                <h3 className="text-white font-semibold text-lg">Certifications & Leadership</h3>
              </div>
              <ul className="space-y-3">
                {certifications.map((cert, i) => (
                  <li key={i} className="flex gap-2 text-slate-300 text-sm leading-relaxed">
                    <span className="text-teal mt-1.5 flex-shrink-0 text-xs">▸</span>
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
