import React from "react";
import { ChevronDown, ShieldCheck } from "lucide-react";

// Fills whatever container wraps it — StoryContainer gives it absolute inset-0
const HeroIntro = () => (
  <div className="w-full h-full flex flex-col items-center justify-center bg-black overflow-hidden select-none">
    {/* Radial glow */}
    <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(59,130,246,0.09)_0%,transparent_60%)] pointer-events-none" />
    {/* Grid */}
    <div
      className="absolute inset-0 pointer-events-none"
      style={{
        backgroundImage:
          "linear-gradient(rgba(255,255,255,0.035) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.035) 1px, transparent 1px)",
        backgroundSize: "60px 60px",
      }}
    />

    <div className="relative z-10 flex flex-col items-center text-center gap-5 px-6 max-w-5xl">
      {/* Tag */}
      <div
        className="flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/10 bg-white/[0.04] text-[10px] font-black tracking-[0.22em] uppercase text-white/40"
      >
        <ShieldCheck size={10} className="text-blue-400" />
        <span>Next-Gen Smart Governance</span>
      </div>

      {/* Wordmark */}
      <h1
        className="font-black text-white leading-[0.86] tracking-[-0.045em]"
        style={{
          fontSize: "clamp(4.5rem, 14vw, 11rem)",
          textShadow: "0 2px 80px rgba(0,0,0,0.9)",
        }}
      >
        Civic<br />
        <span style={{ color: "rgba(255,255,255,0.15)" }}>Connect</span>
      </h1>

      <p
        className="text-white/35 font-medium max-w-xs leading-relaxed"
        style={{ fontSize: "clamp(0.85rem, 1.4vw, 1rem)" }}
      >
        A cinematic scroll through the citizen-to-government resolution pipeline.
      </p>

      {/* Scroll prompt */}
      <div className="flex flex-col items-center gap-2 mt-4" style={{ animation: "bounce 2s infinite" }}>
        <span className="text-white/20 text-[9px] font-black tracking-[0.35em] uppercase">
          Scroll to Begin
        </span>
        <ChevronDown size={14} className="text-white/20" />
      </div>
    </div>
  </div>
);

export default HeroIntro;
