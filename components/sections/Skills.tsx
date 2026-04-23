"use client";

import { useEffect, useRef, useState } from "react";
import * as d3 from "d3";
import { prepare, layout } from "@chenglou/pretext";
import { skills } from "@/data/resume";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Badge } from "@/components/ui/badge";

type BubbleDatum = {
  id: string;
  category: string;
  color: string;
  count: number;
  items: string[];
  x?: number;
  y?: number;
  r: number;
};

// Use Pretext to measure whether category label fits in the bubble.
// Returns the font-size (capped at 14px) that lets the text fit.
function fitFontSize(text: string, maxWidth: number): number {
  for (let size = 14; size >= 9; size--) {
    const prepared = prepare(text, `bold ${size}px Inter, sans-serif`);
    const { lineCount } = layout(prepared, maxWidth - 8, size * 1.3);
    if (lineCount <= 1) return size;
  }
  return 9;
}

export default function Skills() {
  const svgRef = useRef<SVGSVGElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [tooltip, setTooltip] = useState<{ category: string; items: string[]; color: string } | null>(null);
  const [tooltipPos, setTooltipPos] = useState({ x: 0, y: 0 });
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    if (!mounted) return;
    const container = containerRef.current;
    const svg = svgRef.current;
    if (!container || !svg) return;

    const width = container.offsetWidth;
    const height = Math.min(520, Math.max(380, width * 0.55));

    // Build bubble data — radius scales with item count
    const rScale = d3.scaleSqrt()
      .domain([0, d3.max(skills, (d) => d.items.length)!])
      .range([50, 110]);

    const bubbles: BubbleDatum[] = skills.map((s) => ({
      id: s.category,
      category: s.category,
      color: s.color,
      count: s.items.length,
      items: s.items,
      r: rScale(s.items.length),
    }));

    // D3 force simulation
    const simulation = d3.forceSimulation<BubbleDatum>(bubbles)
      .force("charge", d3.forceManyBody().strength(5))
      .force("center", d3.forceCenter(width / 2, height / 2))
      .force("collision", d3.forceCollide<BubbleDatum>((d) => d.r + 6))
      .stop();

    // Run synchronously for static render
    for (let i = 0; i < 300; i++) simulation.tick();

    // Draw
    d3.select(svg).selectAll("*").remove();
    const root = d3.select(svg)
      .attr("width", width)
      .attr("height", height)
      .attr("viewBox", `0 0 ${width} ${height}`);

    const g = root.append("g");

    const node = g
      .selectAll<SVGGElement, BubbleDatum>("g.node")
      .data(bubbles)
      .join("g")
      .attr("class", "node")
      .attr("transform", (d) => `translate(${d.x ?? width / 2},${d.y ?? height / 2})`)
      .style("cursor", "pointer");

    // Outer glow circle
    node
      .append("circle")
      .attr("r", (d) => d.r + 6)
      .attr("fill", (d) => `${d.color}08`)
      .attr("stroke", (d) => `${d.color}20`)
      .attr("stroke-width", 1);

    // Main bubble
    node
      .append("circle")
      .attr("r", (d) => d.r)
      .attr("fill", (d) => `${d.color}18`)
      .attr("stroke", (d) => d.color)
      .attr("stroke-width", 1.5)
      .attr("stroke-opacity", 0.6);

    // Category label — sized with Pretext to fit
    node.each(function (d) {
      const el = d3.select(this);
      const maxW = d.r * 1.8;
      const fs = fitFontSize(d.category, maxW);

      // Use foreignObject for proper text wrapping
      const fo = el.append("foreignObject")
        .attr("x", -d.r + 4)
        .attr("y", -d.r / 2)
        .attr("width", d.r * 2 - 8)
        .attr("height", d.r);

      fo.append("xhtml:div")
        .style("display", "flex")
        .style("align-items", "center")
        .style("justify-content", "center")
        .style("height", "100%")
        .style("text-align", "center")
        .style("font-family", "Inter, sans-serif")
        .style("font-size", `${fs}px`)
        .style("font-weight", "700")
        .style("color", d.color)
        .style("line-height", "1.25")
        .style("pointer-events", "none")
        .text(d.category);

      // Item count badge
      el.append("text")
        .attr("y", d.r * 0.52)
        .attr("text-anchor", "middle")
        .attr("font-size", "11")
        .attr("fill", d.color)
        .attr("opacity", "0.7")
        .text(`${d.count} skills`);
    });

    // Interaction
    node
      .on("mouseenter", function (event, d) {
        d3.select(this)
          .select("circle:nth-child(2)")
          .transition()
          .duration(200)
          .attr("fill", `${d.color}35`)
          .attr("stroke-opacity", "1");
        setTooltip({ category: d.category, items: d.items, color: d.color });
        const rect = container.getBoundingClientRect();
        setTooltipPos({
          x: (d.x ?? 0) - rect.left,
          y: (d.y ?? 0) - rect.top,
        });
      })
      .on("mouseleave", function (_, d) {
        d3.select(this)
          .select("circle:nth-child(2)")
          .transition()
          .duration(200)
          .attr("fill", `${d.color}18`)
          .attr("stroke-opacity", "0.6");
        setTooltip(null);
      });

    return () => { simulation.stop(); };
  }, [mounted]);

  return (
    <section id="skills" className="py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center gap-4 mb-12">
          <h2 className="text-3xl font-bold text-white">Skills</h2>
          <div className="h-px flex-1 bg-gradient-to-r from-teal/40 to-transparent" />
        </div>

        <p className="text-slate-400 text-sm mb-8">
          Hover a bubble to see all skills in that category.
        </p>

        <div className="relative" ref={containerRef}>
          <svg ref={svgRef} className="w-full" />

          {/* Tooltip rendered in React (not D3) */}
          {tooltip && (
            <div
              className="absolute z-20 pointer-events-none"
              style={{
                left: tooltipPos.x,
                top: tooltipPos.y,
                transform: "translate(-50%, calc(-100% - 12px))",
              }}
            >
              <div
                className="rounded-xl border px-4 py-3 bg-navy-950/95 backdrop-blur shadow-2xl min-w-[180px]"
                style={{ borderColor: `${tooltip.color}40` }}
              >
                <p className="font-semibold text-sm mb-2" style={{ color: tooltip.color }}>
                  {tooltip.category}
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {tooltip.items.map((item) => (
                    <Badge
                      key={item}
                      className="text-xs bg-white/5 text-slate-300 border-white/10"
                    >
                      {item}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
