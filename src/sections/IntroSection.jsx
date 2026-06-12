import React, { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ChevronDown, BadgeCheck } from "lucide-react";
import BackgroundShader from "../components/BackgroundShader";

gsap.registerPlugin(ScrollTrigger);

const IntroSection = () => {
  const sectionRef = useRef(null);
  const contentRef = useRef(null);
  
  const badgeRef = useRef(null);
  const titleRef = useRef(null);
  const descRef = useRef(null);
  const scrollRef = useRef(null);
  const card1Ref = useRef(null);
  const card2Ref = useRef(null);

  useEffect(() => {
    // Entry Animations
    const entryTl = gsap.timeline();
    
    // Badge blur reveal
    entryTl.fromTo(badgeRef.current, 
      { opacity: 0, filter: "blur(12px)", y: 20 }, 
      { opacity: 1, filter: "blur(0px)", y: 0, duration: 1.2, ease: "power3.out" }, 0.2);
      
    // Headline fade up
    entryTl.fromTo(titleRef.current, 
      { opacity: 0, y: 40 }, 
      { opacity: 1, y: 0, duration: 1.4, ease: "power3.out" }, 0.4);
      
    // Description stagger fade
    entryTl.fromTo(descRef.current, 
      { opacity: 0, y: 20 }, 
      { opacity: 0.7, y: 0, duration: 1.2, ease: "power3.out" }, 0.6);

    // Cards floating in background
    entryTl.fromTo([card1Ref.current, card2Ref.current],
      { opacity: 0, y: 60, rotateX: 10 },
      { opacity: 1, y: 0, rotateX: 0, duration: 1.5, ease: "power3.out", stagger: 0.2 }, 0.8);

    // Scroll Indicator pulse
    entryTl.fromTo(scrollRef.current, 
      { opacity: 0 }, 
      { opacity: 0.5, duration: 1, ease: "power2.out" }, 1.2);
    
    gsap.to(scrollRef.current, { y: 10, repeat: -1, yoyo: true, duration: 1.5, ease: "power1.inOut" });

    // Scroll away timeline
    const exitTl = gsap.timeline({ paused: true });
    exitTl.to(contentRef.current, { opacity: 0, y: -80, filter: "blur(15px)", ease: "power2.in", duration: 1 });

    ScrollTrigger.create({
      trigger: sectionRef.current,
      start: "top top",
      end: "bottom top",
      scrub: 1.2,
      animation: exitTl,
    });

    return () => ScrollTrigger.getAll()
      .filter((t) => t.vars.trigger === sectionRef.current)
      .forEach((t) => t.kill());
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full overflow-hidden bg-[#050505]"
      style={{ height: "100vh" }}
    >
      {/* Subtle Noise Overlay */}
      <div className="absolute inset-0 z-0 opacity-20 pointer-events-none mix-blend-overlay" style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E\")" }} />
      
      {/* Soft Center Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] z-0 pointer-events-none opacity-30" style={{ background: "radial-gradient(circle, rgba(59, 130, 246, 0.15) 0%, transparent 60%)", filter: "blur(60px)" }} />

      {/* Floating Decorative Glass Cards */}
      <div ref={card1Ref} className="absolute left-[10%] top-[20%] w-[280px] h-[160px] z-0 rounded-3xl pointer-events-none opacity-20" style={{
        background: "linear-gradient(135deg, rgba(255,255,255,0.03) 0%, rgba(255,255,255,0.01) 100%)", 
        boxShadow: "0 20px 40px rgba(0,0,0,0.4), inset 0 1px 1px rgba(255,255,255,0.05)",
        backdropFilter: "blur(24px)",
        border: "1px solid rgba(255,255,255,0.03)",
        transform: "rotate(-12deg)"
      }}>
        <div className="p-4 flex flex-col gap-3 opacity-30">
          <div className="w-12 h-12 rounded-full bg-white/5" />
          <div className="w-full h-2 rounded-full bg-white/10" />
          <div className="w-2/3 h-2 rounded-full bg-white/10" />
        </div>
      </div>

      <div ref={card2Ref} className="absolute right-[10%] bottom-[30%] w-[320px] h-[200px] z-0 rounded-3xl pointer-events-none opacity-20" style={{
        background: "linear-gradient(135deg, rgba(255,255,255,0.03) 0%, rgba(255,255,255,0.01) 100%)", 
        boxShadow: "0 20px 40px rgba(0,0,0,0.4), inset 0 1px 1px rgba(255,255,255,0.05)",
        backdropFilter: "blur(24px)",
        border: "1px solid rgba(255,255,255,0.03)",
        transform: "rotate(8deg)"
      }}>
        <div className="p-4 flex flex-col gap-4 opacity-30 mt-8">
          <div className="w-full h-2 rounded-full bg-white/10" />
          <div className="w-full h-2 rounded-full bg-white/10" />
          <div className="w-1/2 h-2 rounded-full bg-white/10" />
        </div>
      </div>

      <div
        ref={contentRef}
        className="relative z-10 w-full h-full flex flex-col items-center justify-center text-center px-6"
      >
        <div 
          ref={badgeRef}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-6 border"
          style={{
            background: "rgba(10, 10, 15, 0.4)",
            backdropFilter: "blur(20px)",
            borderColor: "rgba(255, 255, 255, 0.08)",
            boxShadow: "0 4px 20px rgba(0,0,0,0.2)"
          }}
        >
          <BadgeCheck size={14} color="black" fill="#3B82F6" />
          <span className="text-[10px] uppercase tracking-[0.2em]" style={{ color: "#e3e2e2", fontWeight: 700, fontFamily: "'Google Sans', sans-serif" }}>Next-Gen Smart Governance</span>
        </div>

        <h1
          ref={titleRef}
          className="text-white leading-[0.9] tracking-[-0.06em]"
          style={{ 
            fontFamily: "'Google Sans', sans-serif", 
            fontWeight: 400, 
            fontSize: "clamp(96px, 10vw, 180px)",
            textShadow: "0 0 40px rgba(255, 255, 255, 0.15)",
            maxWidth: "900px"
          }}
        >
          Civic<br />Connect
        </h1>

        <p
          ref={descRef}
          className="mx-auto mt-8"
          style={{ 
            fontFamily: "'Google Sans', sans-serif", 
            fontWeight: 300, 
            fontSize: "clamp(18px, 2vw, 22px)", 
            lineHeight: 1.6,
            color: "#ffffff",
            opacity: 0.7,
            maxWidth: "600px"
          }}
        >
          The citizen-to-government resolution pipeline. Immutable, transparent, and built for the digital sovereign.
        </p>

        <div ref={scrollRef} className="absolute bottom-12 flex flex-col items-center gap-4">
          <span className="text-[10px] uppercase tracking-[0.2em] font-semibold text-white/50">Scroll to Begin</span>
          <ChevronDown size={20} className="text-white/50" />
        </div>
      </div>
    </section>
  );
};

export default IntroSection;
