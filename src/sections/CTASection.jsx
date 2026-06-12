import React, { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight, Users, Sparkles } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const CTASection = ({ onEnter, onSignup }) => {
  const sectionRef = useRef(null);
  const cardRef    = useRef(null);

  // Entrance: fade + scale up as section scrolls into view
  useEffect(() => {
    const section = sectionRef.current;
    const card    = cardRef.current;
    if (!section || !card) return;

    gsap.set(card, { opacity: 0, y: 70, scale: 0.94 });

    ScrollTrigger.create({
      trigger: section,
      start:   "top 80%",
      once:    true,
      onEnter: () => {
        gsap.to(card, {
          opacity: 1,
          y:       0,
          scale:   1,
          duration: 1.1,
          ease:    "power3.out",
        });
      },
    });

    return () => ScrollTrigger.getAll()
      .filter((t) => t.vars.trigger === section)
      .forEach((t) => t.kill());
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full flex flex-col items-center justify-center bg-black overflow-hidden"
      style={{ minHeight: "100vh" }}
    >
      {/* Radial glow */}
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: "radial-gradient(ellipse at center, rgba(16,185,129,0.08) 0%, transparent 60%)" }}
      />
      {/* Grid */}
      <div className="absolute inset-0 pointer-events-none" style={{
        backgroundImage: "linear-gradient(rgba(255,255,255,0.025) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.025) 1px,transparent 1px)",
        backgroundSize: "60px 60px",
      }} />

      <div ref={cardRef} className="relative z-10 flex flex-col items-center text-center gap-8 px-6 max-w-xl">
        {/* Icon */}
        <div
          className="w-16 h-16 rounded-2xl border border-white/10 flex items-center justify-center"
          style={{ background: "rgba(255,255,255,0.04)", backdropFilter: "blur(20px)" }}
        >
          <Sparkles size={26} className="text-white/50 animate-pulse" />
        </div>

        {/* Headline */}
        <h2
          className="font-black text-white tracking-[-0.04em] leading-[0.88]"
          style={{ fontSize: "clamp(3rem, 8vw, 6rem)" }}
        >
          Your City<br />
          <span style={{ color: "rgba(255,255,255,0.16)" }}>Awaits</span>
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
            onClick={onEnter}
            className="flex items-center gap-2.5 px-8 py-4 rounded-2xl font-black text-black text-sm uppercase tracking-widest cursor-pointer transition-all duration-300 hover:scale-[1.04] active:scale-[0.97]"
            style={{ background: "white", boxShadow: "0 0 50px rgba(255,255,255,0.12)" }}
          >
            <span>Launch Citizen Portal</span>
            <ArrowRight size={14} />
          </button>
          <button
            onClick={onSignup}
            className="flex items-center gap-2.5 px-8 py-4 rounded-2xl font-black text-white text-sm uppercase tracking-widest cursor-pointer border border-white/10 backdrop-blur-xl transition-all duration-300 hover:bg-white/5 hover:border-white/25"
            style={{ background: "rgba(0,0,0,0.4)" }}
          >
            <span>Create Account</span>
            <Users size={14} />
          </button>
        </div>
      </div>

      <div className="absolute bottom-7 text-white/10 text-[9px] font-black tracking-[0.4em] uppercase">
        © 2026 CivicConnect — Smart Governance Platform
      </div>
    </section>
  );
};

export default CTASection;
