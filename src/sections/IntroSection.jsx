import React, { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ChevronDown, ShieldCheck } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const IntroSection = () => {
  const sectionRef = useRef(null);
  const contentRef = useRef(null);

  // Fade out and slide up as user scrolls away
  useEffect(() => {
    const tl = gsap.timeline({ paused: true });
    tl.to(contentRef.current, { opacity: 0, y: -60, ease: "power2.in", duration: 1 });

    ScrollTrigger.create({
      trigger: sectionRef.current,
      start: "top top",
      end: "bottom top",
      scrub: 1,
      animation: tl,
    });

    return () => ScrollTrigger.getAll()
      .filter((t) => t.vars.trigger === sectionRef.current)
      .forEach((t) => t.kill());
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full bg-black overflow-hidden"
      style={{ height: "100vh" }}
    >
      {/* Radial glow */}
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: "radial-gradient(ellipse at center, rgba(59,130,246,0.09) 0%, transparent 65%)" }}
      />
      {/* Grid */}
      <div className="absolute inset-0 pointer-events-none" style={{
        backgroundImage: "linear-gradient(rgba(255,255,255,0.03) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.03) 1px,transparent 1px)",
        backgroundSize: "60px 60px",
      }} />

      <div
        ref={contentRef}
        className="relative z-10 w-full h-full flex flex-col items-center justify-center text-center px-6"
      >
        {/* Tag */}
        <div className="flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/10 bg-white/[0.04] text-[10px] font-black tracking-[0.22em] uppercase text-white/40 mb-6">
          <ShieldCheck size={10} className="text-blue-400" />
          <span>Next-Gen Smart Governance</span>
        </div>

        {/* Wordmark */}
        <h1
          className="font-black text-white leading-[0.86] tracking-[-0.045em] mb-6"
          style={{
            fontSize: "clamp(4rem, 13vw, 10rem)",
            textShadow: "0 2px 80px rgba(0,0,0,0.9)",
          }}
        >
          Civic<br />
          <span style={{ color: "rgba(255,255,255,0.14)" }}>Connect</span>
        </h1>

        <p
          className="text-white/30 font-medium max-w-xs leading-relaxed mb-10"
          style={{ fontSize: "clamp(0.85rem, 1.4vw, 1rem)" }}
        >
          A cinematic scroll through the citizen-to-government resolution pipeline.
        </p>

        <div className="flex flex-col items-center gap-2 animate-bounce">
          <span className="text-white/20 text-[9px] font-black tracking-[0.35em] uppercase">
            Scroll to Begin
          </span>
          <ChevronDown size={14} className="text-white/20" />
        </div>
      </div>
    </section>
  );
};

export default IntroSection;
