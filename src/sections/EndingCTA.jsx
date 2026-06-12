import React from "react";
import { useNavigate } from "react-router-dom";
import { Sparkles, ArrowRight, Users, ChevronUp } from "lucide-react";

// Fills absolute inset-0 container given by StoryContainer
const EndingCTA = ({ onScrollUp }) => {
  const navigate = useNavigate();

  return (
    <div className="w-full h-full flex flex-col items-center justify-center bg-black overflow-hidden select-none">
      {/* Radial glow */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(16,185,129,0.07)_0%,transparent_60%)] pointer-events-none" />
      {/* Grid */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      <div className="relative z-10 flex flex-col items-center text-center gap-8 px-6 max-w-xl">
        {/* Icon */}
        <div
          className="w-16 h-16 rounded-2xl border border-white/10 flex items-center justify-center"
          style={{ background: "rgba(255,255,255,0.04)", backdropFilter: "blur(20px)" }}
        >
          <Sparkles size={26} className="text-white/60 animate-pulse" />
        </div>

        {/* Headline */}
        <h2
          className="font-black text-white tracking-[-0.04em] leading-[0.88]"
          style={{ fontSize: "clamp(2.8rem, 7vw, 5.5rem)" }}
        >
          Your City<br />
          <span style={{ color: "rgba(255,255,255,0.18)" }}>Awaits</span>
        </h2>

        <p
          className="text-white/35 font-medium leading-relaxed max-w-sm"
          style={{ fontSize: "clamp(0.88rem, 1.3vw, 1rem)" }}
        >
          Step into the platform and help shape the future of urban governance in your community.
        </p>

        {/* Buttons */}
        <div className="flex items-center gap-4 flex-wrap justify-center">
          <button
            onClick={() => navigate("/login")}
            className="flex items-center gap-2.5 px-8 py-4 rounded-2xl font-black text-black text-sm uppercase tracking-widest cursor-pointer transition-all duration-300 hover:scale-[1.03] active:scale-[0.97]"
            style={{ background: "white", boxShadow: "0 0 50px rgba(255,255,255,0.12)" }}
          >
            <span>Launch Citizen Portal</span>
            <ArrowRight size={14} />
          </button>
          <button
            onClick={() => navigate("/signup")}
            className="flex items-center gap-2.5 px-8 py-4 rounded-2xl font-black text-white text-sm uppercase tracking-widest cursor-pointer border border-white/10 backdrop-blur-xl transition-all duration-300 hover:bg-white/5 hover:border-white/25"
            style={{ background: "rgba(0,0,0,0.4)" }}
          >
            <span>Create Account</span>
            <Users size={14} />
          </button>
        </div>

        {/* Scroll back up */}
        {onScrollUp && (
          <button
            onClick={onScrollUp}
            className="flex items-center gap-1.5 text-white/20 text-[9px] font-black tracking-[0.3em] uppercase cursor-pointer hover:text-white/40 transition-colors mt-2"
          >
            <ChevronUp size={11} />
            <span>Back to top</span>
          </button>
        )}
      </div>

      <div className="absolute bottom-7 text-white/10 text-[9px] font-black tracking-[0.4em] uppercase">
        © 2026 CivicConnect — Smart Governance Platform
      </div>
    </div>
  );
};

export default EndingCTA;
