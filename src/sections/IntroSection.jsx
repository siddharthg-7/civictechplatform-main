import React, { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ArrowRight, Shield, Users } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { GetStartedButton } from "@/components/ui/get-started-button";

const IntroSection = () => {
  const navigate = useNavigate();
  const sectionRef = useRef(null);
  const badgeRef = useRef(null);
  const titleRef = useRef(null);
  const descRef = useRef(null);
  const buttonsRef = useRef(null);
  const card1Ref = useRef(null);
  const card2Ref = useRef(null);
  const skylineRef = useRef(null);

  useEffect(() => {
    const entryTl = gsap.timeline();
    const easeCurve = "power4.out";

    entryTl.fromTo(titleRef.current,
      { opacity: 0, filter: "blur(12px)", y: 20 },
      { opacity: 1, filter: "blur(0px)", y: 0, duration: 2, ease: easeCurve }, 0.1);

    entryTl.fromTo(badgeRef.current,
      { opacity: 0, y: 15 },
      { opacity: 1, y: 0, duration: 1.5, ease: easeCurve }, 0.2);

    entryTl.fromTo(descRef.current,
      { opacity: 0, y: 15 },
      { opacity: 1, y: 0, duration: 1.5, ease: easeCurve }, 0.4);

    entryTl.fromTo(buttonsRef.current,
      { opacity: 0, y: 15 },
      { opacity: 1, y: 0, duration: 1.5, ease: easeCurve }, 0.6);

    entryTl.fromTo([card1Ref.current, card2Ref.current],
      { opacity: 0, y: 30, scale: 0.98 },
      { opacity: 1, y: 0, scale: 1, duration: 2.2, ease: easeCurve, stagger: 0.1 }, 0.5);

    entryTl.fromTo(skylineRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 4, ease: "power2.inOut" }, 0.6);

    gsap.to(card1Ref.current, { y: -6, repeat: -1, yoyo: true, duration: 6, ease: "sine.inOut" });
    gsap.to(card2Ref.current, { y: 6, repeat: -1, yoyo: true, duration: 7, ease: "sine.inOut" });

  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full h-[100vh] overflow-hidden flex items-center justify-center bg-[#050505]"
      aria-label="Introduction"
    >
      {/* Ambient Glow */}
      <div className="absolute top-[45%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-[70vw] h-[60vh] pointer-events-none opacity-40 mix-blend-screen"
        style={{ background: "radial-gradient(ellipse, rgba(37, 99, 235, 0.3) 0%, transparent 60%)", filter: "blur(100px)" }} aria-hidden="true" />
      <div className="absolute top-[40%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-[40vw] h-[40vh] pointer-events-none opacity-30 mix-blend-screen"
        style={{ background: "radial-gradient(ellipse, rgba(96, 165, 250, 0.2) 0%, transparent 60%)", filter: "blur(80px)" }} aria-hidden="true" />

      {/* Skyline */}
      <div className="absolute bottom-0 left-0 right-0 pointer-events-none z-0 h-[35vh]">
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[80%] h-[80%] opacity-80"
          style={{ background: "radial-gradient(ellipse at bottom, rgba(37, 99, 235, 0.7) 0%, transparent 70%)", filter: "blur(60px)" }} />

        <div ref={skylineRef} className="absolute bottom-0 left-0 right-0 h-full w-full opacity-75" style={{
          backgroundImage: "url('/assets/images/background.png')",
          backgroundSize: "cover",
          backgroundPosition: "bottom center",
          backgroundRepeat: "no-repeat",
          maskImage: "linear-gradient(to top, rgba(0,0,0,1) 0%, rgba(0,0,0,0.8) 40%, rgba(0,0,0,0) 90%)",
          WebkitMaskImage: "linear-gradient(to top, rgba(0,0,0,1) 0%, rgba(0,0,0,0.8) 40%, rgba(0,0,0,0) 90%)"
        }} />
      </div>

      {/* Cards */}
      <div ref={card1Ref} className="absolute left-[8%] top-[26%] z-10 hidden lg:flex flex-col gap-4 rounded-[24px] pointer-events-none overflow-hidden" style={{
        width: "240px",
        height: "240px",
        padding: "32px",
        background: "rgba(12, 18, 35, 0.5)",
        border: "1px solid rgba(120, 180, 255, 0.15)",
        boxShadow: "0 24px 48px rgba(0,0,0,0.8), inset 0 1px 0 rgba(255,255,255,0.08), inset 0 0 0 1px rgba(255,255,255,0.03)",
        backdropFilter: "blur(24px)",
        transform: "rotate(-4deg)"
      }}>
        <div className="absolute inset-0 rounded-[24px] pointer-events-none opacity-20" style={{ background: "radial-gradient(circle at top left, rgba(59, 130, 246, 0.8) 0%, transparent 50%)" }} />
        <div className="w-9 h-9 rounded-[10px] flex items-center justify-center mb-1 z-10" style={{ background: "rgba(37, 99, 235, 0.15)", border: "1px solid rgba(59, 130, 246, 0.3)" }}>
          <Shield size={18} className="text-[#60A5FA]" fill="currentColor" aria-hidden="true" />
        </div>
        <div className="flex items-baseline gap-0.5 mt-auto z-10">
          <div className="text-white text-[48px] tracking-tight" style={{ fontFamily: "Geist, sans-serif", fontWeight: 700 }}>99.99</div>
          <div className="text-white/60 text-3xl font-light">%</div>
        </div>
        <div className="text-[#A1A1AA] text-[13px] tracking-wide z-10" style={{ fontFamily: "Geist, sans-serif", fontWeight: 500 }}>Resolution Integrity</div>
      </div>

      <div ref={card2Ref} className="absolute right-[8%] top-[29%] z-10 hidden lg:flex flex-col gap-4 rounded-[24px] pointer-events-none overflow-hidden" style={{
        width: "240px",
        height: "240px",
        padding: "32px",
        background: "rgba(12, 18, 35, 0.5)",
        border: "1px solid rgba(120, 180, 255, 0.15)",
        boxShadow: "0 24px 48px rgba(0,0,0,0.8), inset 0 1px 0 rgba(255,255,255,0.08), inset 0 0 0 1px rgba(255,255,255,0.03)",
        backdropFilter: "blur(24px)",
        transform: "rotate(4deg)"
      }}>
        <div className="absolute inset-0 rounded-[24px] pointer-events-none opacity-20" style={{ background: "radial-gradient(circle at top right, rgba(59, 130, 246, 0.8) 0%, transparent 50%)" }} />
        <div className="w-9 h-9 rounded-[10px] flex items-center justify-center mb-1 z-10" style={{ background: "rgba(37, 99, 235, 0.15)", border: "1px solid rgba(59, 130, 246, 0.3)" }}>
          <Users size={18} className="text-[#60A5FA]" fill="currentColor" aria-hidden="true" />
        </div>
        <div className="text-white text-[48px] tracking-tight mt-auto z-10" style={{ fontFamily: "Geist, sans-serif", fontWeight: 700 }}>24/7</div>
        <div className="text-[#A1A1AA] text-[13px] tracking-wide z-10" style={{ fontFamily: "Geist, sans-serif", fontWeight: 500 }}>Citizen Access</div>
      </div>

      {/* Apple-Style Center Glow */}
      <div
        className="absolute left-1/2 top-[42%] -translate-x-1/2 -translate-y-1/2 pointer-events-none"
        style={{
          width: "1200px",
          height: "800px",
          background: "radial-gradient(circle, rgba(37,99,235,0.25) 0%, transparent 70%)",
          filter: "blur(100px)",
        }}
      />

      {/* Main Content */}
      <div className="relative z-20 flex flex-col items-center justify-center text-center px-6 -translate-y-[45px]">

        {/* Badge */}
        <div
          ref={badgeRef}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-8"
          style={{
            background: "rgba(255, 255, 255, 0.03)",
            backdropFilter: "blur(16px)",
            border: "1px solid rgba(255, 255, 255, 0.08)",
            boxShadow: "0 8px 16px rgba(0,0,0,0.4)"
          }}
        >
          <div className="w-3.5 h-3.5 bg-[#3B82F6] rounded-full flex items-center justify-center">
            <svg width="8" height="8" viewBox="0 0 24 24" fill="none" stroke="#050505" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="20 6 9 17 4 12"></polyline>
            </svg>
          </div>
          <span
            className="text-[#A1A1AA]"
            style={{
              fontFamily: "Geist Mono, monospace",
              fontWeight: 500,
              fontSize: "12px",
              letterSpacing: "0.15em",
              textTransform: "uppercase"
            }}>
            NEXT-GEN SMART GOVERNANCE
          </span>
        </div>

        {/* Headline */}
        <h1
          ref={titleRef}
          className="text-white"
          style={{
            color: "#FFFFFF",
            textShadow: "0 0 30px rgba(255,255,255,0.08), 0 0 80px rgba(255,255,255,0.05)",
            fontFamily: "Geist, sans-serif",
            fontWeight: 700,
            fontSize: "clamp(5rem, 9vw, 8rem)",
            letterSpacing: "-0.06em",
            lineHeight: 0.95,
          }}
        >
          Civic Connect
        </h1>

        {/* Subtitle */}
        <p
          ref={descRef}
          className="mx-auto mt-10"
          style={{
            fontFamily: "Geist, sans-serif",
            fontWeight: 400,
            fontSize: "clamp(18px, 1.2vw, 22px)",
            lineHeight: 1.55,
            letterSpacing: "-0.02em",
            color: "rgba(255,255,255,0.7)",
            maxWidth: "680px",
          }}
        >
          The citizen-to-government resolution pipeline.<br />Transparent, secure, and built for the digital sovereign.
        </p>

        {/* Buttons */}
        <div ref={buttonsRef} className="mt-16 flex flex-col sm:flex-row items-center justify-center gap-7">

          {/* Primary CTA with strong outline/border */}
          <div className="relative group inline-block">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-[#2563EB] rounded-full blur-2xl opacity-40 group-hover:opacity-60 transition duration-500 pointer-events-none"></div>

            <GetStartedButton 
              onClick={() => navigate("/login")}
              className="relative px-10 h-[58px] rounded-[14px] text-white"
              style={{
                background: "linear-gradient(180deg, rgba(59, 130, 246, 0.9) 0%, rgba(37, 99, 235, 1) 100%)",
                boxShadow: "inset 0 1px 0 rgba(255,255,255,0.25), 0 0 35px rgba(59,130,246,0.35)",
                border: "1px solid rgba(255,255,255,0.16)",
                fontFamily: "Geist, sans-serif", fontWeight: 600, fontSize: "16px"
              }}
            >
              Enter Platform
            </GetStartedButton>
          </div>

          {/* Secondary CTA */}
          <GetStartedButton 
            variant="secondary"
            className="px-10 h-[58px] rounded-[14px] !bg-transparent text-[#A1A1AA] hover:text-white border border-white/12 hover:bg-white/[0.04]"
            style={{ fontFamily: "Geist, sans-serif", fontWeight: 500, fontSize: "16px" }}
          >
            Transparency Report
          </GetStartedButton>
        </div>
      </div>
    </section>
  );
};

export default IntroSection;
