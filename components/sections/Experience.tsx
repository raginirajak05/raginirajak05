"use client";

import { useEffect, useRef, useState } from "react";
import { experience } from "@/data/resume";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin } from "lucide-react";

function TimelineCard({
  item,
  index,
}: {
  item: (typeof experience)[number];
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.15 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className="flex gap-6 group"
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(24px)",
        transition: `opacity 0.5s ease ${index * 0.1}s, transform 0.5s ease ${index * 0.1}s`,
      }}
    >
      {/* Timeline spine */}
      <div className="flex flex-col items-center pt-1.5 flex-shrink-0">
        <div className="w-3 h-3 rounded-full bg-teal ring-4 ring-teal/20 flex-shrink-0" />
        {index < experience.length - 1 && (
          <div className="w-px flex-1 bg-gradient-to-b from-teal/30 to-transparent mt-2" />
        )}
      </div>

      {/* Card */}
      <div className="pb-12 flex-1">
        <Card className="bg-navy-900 border border-white/10 hover:border-teal/30 transition-all duration-300 hover:shadow-lg hover:shadow-teal/5">
          <CardContent className="p-6">
            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-3">
              <div>
                <h3 className="text-white font-semibold text-lg leading-tight">
                  {item.title}
                </h3>
                <p className="text-teal font-medium text-sm mt-0.5">
                  {item.company}
                  {item.companyDetail && (
                    <span className="text-slate-500 font-normal">
                      {" "}· {item.companyDetail}
                    </span>
                  )}
                </p>
              </div>
              <div className="flex flex-col items-start sm:items-end gap-1 flex-shrink-0">
                <Badge className="bg-teal/10 text-teal border-teal/20 text-xs whitespace-nowrap">
                  {item.period}
                </Badge>
                <span className="flex items-center gap-1 text-slate-500 text-xs">
                  <MapPin size={10} />
                  {item.location}
                </span>
              </div>
            </div>

            {item.context && (
              <p className="text-slate-400 text-sm italic mb-4 leading-relaxed border-l-2 border-teal/30 pl-3">
                {item.context}
              </p>
            )}

            <ul className="space-y-2">
              {item.bullets.map((bullet, i) => (
                <li key={i} className="flex gap-2 text-slate-300 text-sm leading-relaxed">
                  <span className="text-teal mt-1.5 flex-shrink-0 text-xs">▸</span>
                  {bullet}
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default function Experience() {
  return (
    <section id="experience" className="py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <SectionHeader title="Experience" />
        <div className="mt-12">
          {experience.map((item, i) => (
            <TimelineCard key={i} item={item} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

function SectionHeader({ title }: { title: string }) {
  return (
    <div className="flex items-center gap-4">
      <h2 className="text-3xl font-bold text-white">{title}</h2>
      <div className="h-px flex-1 bg-gradient-to-r from-teal/40 to-transparent" />
    </div>
  );
}
