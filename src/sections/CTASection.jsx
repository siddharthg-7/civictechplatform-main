import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useNavigate } from "react-router-dom";
import { ArrowRight, Users, Sparkles } from "lucide-react";
import { GetStartedButton } from "@/components/ui/get-started-button";
gsap.registerPlugin(ScrollTrigger);

/**
 * Step 10 — Final CTA
 * Headline:    Build Smarter Cities Together
 * Subheadline: Empowering citizens. Accelerating governance.
 * Button:      Request Demo / Create Account
 * Animation:   fade in + scale up + background glow
 */
const CTASection = ({ onEnter, onSignup }) => {
  const navigate    = useNavigate();
  const sectionRef  = useRef(null);
  const glowRef     = useRef(null);
  const contentRef  = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;
    const content = contentRef.current;
    const glow    = glowRef.current;
    if (!section || !content) return;

    // Initial state — fade + scale up on entry
    gsap.set(content, { opacity: 0, y: 80, scale: 0.93 });
    gsap.set(glow,    { opacity: 0, scale: 0.5 });

    ScrollTrigger.create({
      trigger: section,
      start: "top 75%",
      once: true,
      onEnter: () => {
        gsap.to(glow,    { opacity: 1, scale: 1.4, duration: 2.0, ease: "power2.out" });
        gsap.to(content, { opacity: 1, y: 0, scale: 1, duration: 1.2, ease: "power3.out", delay: 0.2 });
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
      {/* Background glow — animates on entry */}
      <div ref={glowRef} className="absolute inset-0 pointer-events-none"
        style={{ background: "radial-gradient(ellipse at center, rgba(16,185,129,0.10) 0%, transparent 65%)" }}
      />

      {/* Grid */}
      <div className="absolute inset-0 pointer-events-none" style={{
        backgroundImage: "linear-gradient(rgba(255,255,255,0.022) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.022) 1px,transparent 1px)",
        backgroundSize: "60px 60px",
      }} />

      {/* Content */}
      <div ref={contentRef} className="relative z-10 flex flex-col items-center text-center gap-7 px-6 max-w-xl">
        <div className="w-16 h-16 rounded-2xl border border-white/10 flex items-center justify-center"
          style={{ background: "rgba(255,255,255,0.04)", backdropFilter: "blur(20px)" }}>
          <Sparkles size={26} className="text-white/50 animate-pulse" />
        </div>

        {/* Step 10 headline */}
        <div className="flex flex-col gap-2">
          <h2 className="font-black text-white tracking-[-0.04em] leading-[0.9]"
            style={{ fontSize: "clamp(2.8rem, 7vw, 5.5rem)" }}>
            Build Smarter<br />
            <span style={{ color: "rgba(255,255,255,0.18)" }}>Cities Together</span>
          </h2>
          <p className="text-white/35 font-medium" style={{ fontSize: "clamp(0.9rem, 1.4vw, 1.05rem)" }}>
            Empowering citizens. Accelerating governance.
          </p>
        </div>

        {/* Buttons */}
        <div className="flex items-center gap-4 flex-wrap justify-center mt-1">
          {/* Request Demo — primary */}
          <GetStartedButton onClick={onEnter ?? (() => navigate("/login"))} className="font-black tracking-widest uppercase shadow-[0_0_50px_rgba(255,255,255,0.14)]">
            Request Demo
          </GetStartedButton>

          {/* Create Account — secondary */}
          <GetStartedButton onClick={onSignup ?? (() => navigate("/signup"))} variant="secondary" className="font-black tracking-widest uppercase border border-white/10 backdrop-blur-xl transition-all duration-300 hover:bg-white/5 hover:border-white/25 !bg-black/40 text-white">
            Create Account
          </GetStartedButton>
        </div>
      </div>

      <div className="absolute bottom-7 text-white/10 text-[9px] font-black tracking-[0.4em] uppercase">
        © 2026 CivicConnect — Smart Governance Platform
      </div>
    </section>
  );
};

export default CTASection;
