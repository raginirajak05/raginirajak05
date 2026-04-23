"use client";

import { useEffect, useRef } from "react";
import { profile } from "@/data/resume";
import { Badge } from "@/components/ui/badge";
import { Mail, Phone, Link2, MapPin } from "lucide-react";

// Pretext canvas typewriter animation for the hero headline
function HeroCanvas({ text, font }: { text: string; font: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const frameRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // Respect reduced-motion preference
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const dpr = window.devicePixelRatio || 1;
    let width = canvas.parentElement?.offsetWidth ?? 600;

    const resize = () => {
      width = canvas.parentElement?.offsetWidth ?? 600;
      canvas.width = width * dpr;
      canvas.height = 80 * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = "80px";
    };
    resize();

    const ctx = canvas.getContext("2d")!;
    ctx.scale(dpr, dpr);

    if (prefersReduced) {
      // Static render — no animation
      ctx.clearRect(0, 0, width, 80);
      ctx.font = font;
      ctx.fillStyle = "#00C9B1";
      ctx.fillText(text, 0, 56);
      return;
    }

    // Typewriter: reveal one character at a time
    let charCount = 0;
    const totalChars = text.length;
    const delay = 55; // ms per char
    let lastTime = 0;

    const draw = (timestamp: number) => {
      if (timestamp - lastTime < delay) {
        frameRef.current = requestAnimationFrame(draw);
        return;
      }
      lastTime = timestamp;

      ctx.clearRect(0, 0, width, 80);
      ctx.font = font;
      ctx.fillStyle = "#00C9B1";

      const visible = text.slice(0, charCount);
      ctx.fillText(visible, 0, 56);

      // Blinking cursor
      if (charCount < totalChars || Math.floor(timestamp / 500) % 2 === 0) {
        const cursorX = ctx.measureText(visible).width + 2;
        ctx.fillRect(cursorX, 14, 3, 48);
      }

      if (charCount < totalChars) charCount++;
      frameRef.current = requestAnimationFrame(draw);
    };

    frameRef.current = requestAnimationFrame(draw);

    const ro = new ResizeObserver(resize);
    if (canvas.parentElement) ro.observe(canvas.parentElement);

    return () => {
      cancelAnimationFrame(frameRef.current);
      ro.disconnect();
    };
  }, [text, font]);

  return <canvas ref={canvasRef} aria-label={text} />;
}

export default function Hero() {
  return (
    <section
      id="profile"
      className="min-h-screen flex flex-col justify-center pt-24 pb-16 px-6"
    >
      <div className="max-w-6xl mx-auto w-full">
        {/* Animated name via canvas + Pretext */}
        <div className="mb-2 w-full overflow-hidden">
          <HeroCanvas text={profile.name} font="bold 56px Inter, sans-serif" />
        </div>

        <h2 className="text-xl md:text-2xl font-semibold text-white mb-1">
          {profile.title}
        </h2>
        <p className="text-slate-400 mb-8 text-base">{profile.subtitle}</p>

        {/* Contact row */}
        <div className="flex flex-wrap items-center gap-3 mb-12">
          <a
            href={`mailto:${profile.email}`}
            className="flex items-center gap-2 text-sm text-slate-300 hover:text-teal transition-colors"
          >
            <Mail size={15} />
            {profile.email}
          </a>
          <span className="text-slate-600">·</span>
          <span className="flex items-center gap-2 text-sm text-slate-300">
            <Phone size={15} />
            {profile.phone}
          </span>
          <span className="text-slate-600">·</span>
          <a
            href={profile.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-sm text-slate-300 hover:text-teal transition-colors"
          >
            <Link2 size={15} />
            LinkedIn
          </a>
          <span className="text-slate-600">·</span>
          <span className="flex items-center gap-2 text-sm text-slate-300">
            <MapPin size={15} />
            Berlin, Germany
          </span>
          <Badge className="ml-1 bg-teal/15 text-teal border-teal/30 text-xs">
            {profile.visaStatus}
          </Badge>
        </div>

        {/* Summary */}
        <div className="max-w-3xl">
          <div className="h-px bg-gradient-to-r from-teal/40 to-transparent mb-8" />
          <p className="text-slate-300 text-base leading-relaxed">
            {profile.summary}
          </p>
        </div>

        {/* Scroll hint */}
        <div className="mt-16 flex items-center gap-3 text-slate-500 text-sm">
          <div className="flex flex-col gap-1">
            <div className="w-0.5 h-6 bg-teal/40 mx-auto rounded" />
            <div className="w-0.5 h-3 bg-teal/20 mx-auto rounded" />
          </div>
          Scroll to explore
        </div>
      </div>
    </section>
  );
}
