import React from "react";
import { ArrowRight, Radio } from "lucide-react";

const TopBar = ({ accent, progress, onEnter }) => (
  <>
    {/* Progress line */}
    <div className="fixed top-0 left-0 right-0 h-[2px] z-[200] bg-white/[0.04]">
      <div
        className="h-full"
        style={{
          width: `${progress * 100}%`,
          background: `linear-gradient(to right, ${accent}, rgba(255,255,255,0.5))`,
          boxShadow: `0 0 10px ${accent}`,
          transition: "width 0.08s linear",
        }}
      />
    </div>

    {/* Nav strip */}
    <div className="fixed top-0 left-0 right-0 z-[200] flex items-center justify-between px-6 md:px-10 pt-6 pointer-events-none">
      {/* Logo */}
      <div
        className="pointer-events-auto flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 backdrop-blur-xl"
        style={{ background: "rgba(0,0,0,0.6)" }}
      >
        <Radio size={11} style={{ color: accent }} className="animate-pulse" />
        <span className="text-white text-[11px] font-black tracking-[0.18em] uppercase">
          CivicConnect
        </span>
      </div>

      {/* CTA */}
      <button
        onClick={onEnter}
        className="pointer-events-auto flex items-center gap-2 px-5 py-2 rounded-full text-white text-[11px] font-black tracking-widest uppercase border border-white/10 backdrop-blur-xl transition-all duration-300 hover:border-white/30 hover:bg-white/10 cursor-pointer"
        style={{ background: "rgba(0,0,0,0.6)" }}
      >
        <span>Enter Portal</span>
        <ArrowRight size={11} />
      </button>
    </div>
  </>
);

export default TopBar;
