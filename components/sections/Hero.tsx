"use client";

import { profile } from "@/data/resume";

const marqueeText = "GTM STRATEGY · PRODUCT LAUNCHES · COMMUNITY GROWTH · WEB3 · SAAS · BRAND MARKETING · ";

export default function Hero() {
  return (
    <section
      id="profile"
      className="relative min-h-screen flex flex-col justify-center overflow-hidden"
    >
      {/* Background glow */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-225 h-175 rounded-full bg-brand-purple/8 blur-[140px]" />
        <div className="absolute top-1/3 -left-20 w-100 h-100 rounded-full bg-brand-pink/5 blur-[120px]" />
        <div className="absolute top-1/4 -right-20 w-87.5 h-87.5 rounded-full bg-brand-teal/5 blur-[100px]" />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-6 pt-28 pb-8 w-full">
        {/* Label */}
        <p className="font-label text-xs font-semibold tracking-[0.2em] uppercase text-[#71717A] mb-6">
          GTM &amp; Product Marketing Manager · Berlin
        </p>

        {/* Giant name */}
        <h1 className="font-heading font-extrabold leading-none tracking-tighter mb-6">
          <span className="block text-[clamp(3rem,10vw,7rem)] text-white">
            {profile.name.split(" ")[0]}
          </span>
          <span className="block text-[clamp(3rem,10vw,7rem)] gradient-text">
            {profile.name.split(" ")[1]}
          </span>
        </h1>

        {/* Subtitle */}
        <p className="text-[#71717A] text-lg md:text-xl mb-12 max-w-lg leading-relaxed">
          SaaS &amp; Web3 &middot; 4+ years building brands from&nbsp;
          <span className="text-white font-medium">0→1</span>
        </p>

        {/* Stats row */}
        <div className="flex flex-wrap gap-10 mb-12">
          {[
            { num: "90K+", label: "Community Members" },
            { num: "$25M", label: "TVL Reached" },
            { num: "5+", label: "Product Launches" },
          ].map(({ num, label }) => (
            <div key={label} className="flex flex-col gap-1">
              <span className="font-heading font-bold text-3xl md:text-4xl text-[#00C9B1] leading-none">
                {num}
              </span>
              <span className="font-label text-xs text-[#71717A] uppercase tracking-widest">
                {label}
              </span>
            </div>
          ))}
        </div>

        {/* CTAs */}
        <div className="flex flex-wrap gap-3">
          <a
            href="#experience"
            onClick={(e) => {
              e.preventDefault();
              document.querySelector("#experience")?.scrollIntoView({ behavior: "smooth" });
            }}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-linear-to-r from-brand-purple to-brand-pink text-white font-label font-semibold text-sm hover:opacity-90 transition-opacity"
          >
            View My Work →
          </a>
          <a
            href={profile.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-white/15 text-white font-label font-semibold text-sm hover:border-brand-purple/50 hover:bg-brand-purple/5 transition-all"
          >
            LinkedIn ↗
          </a>
        </div>
      </div>

      {/* Marquee strip */}
      <div className="relative z-10 mt-8 border-t border-white/6 overflow-hidden py-4 bg-navy-950/50">
        <div className="flex animate-marquee whitespace-nowrap">
          {[...Array(4)].map((_, i) => (
            <span
              key={i}
              className="font-label text-xs font-medium tracking-[0.18em] text-brand-purple/40 mr-0"
            >
              {marqueeText}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
