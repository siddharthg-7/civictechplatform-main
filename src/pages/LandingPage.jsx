import React, { useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import * as Icons from "lucide-react";

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

// Hooks
import { useLenis } from "../hooks/useLenis";

// Styles
import "../styles/globals.css";
import "../styles/animations.css";

// Components
import FloatingParticles from "../components/FloatingParticles";

// Sections
import Scene1 from "../sections/Scene1";
import Scene2 from "../sections/Scene2";
import Scene3 from "../sections/Scene3";
import Scene4 from "../sections/Scene4";
import Scene5 from "../sections/Scene5";
import Scene6 from "../sections/Scene6";
import Scene7 from "../sections/Scene7";

const SCENES_METADATA = [
  { id: 1, title: "Discovery", color: "#f43f5e" },
  { id: 2, title: "Reporting", color: "#3b82f6" },
  { id: 3, title: "Analysis", color: "#a855f7" },
  { id: 4, title: "Routing", color: "#3b82f6" },
  { id: 5, title: "Resolution", color: "#10b981" },
  { id: 6, title: "Impact", color: "#a855f7" },
  { id: 7, title: "Future", color: "#ffffff" },
];

const LandingPage = () => {
  const navigate = useNavigate();
  const containerRef = useRef(null);
  
  const sceneRefs = useRef([]);
  const textRefs = useRef([]);
  const cardRefs = useRef([]);
  const videoRefs = useRef([]);

  const [activeIndex, setActiveIndex] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);

  // Initialize Lenis smooth scroll
  const lenisRef = useLenis();

  // Set up unified GSAP timeline transitions after components render
  useEffect(() => {
    // Confirm elements exist before initializing timeline
    if (sceneRefs.current.length === 0) return;

    // Set initial states for offscreen sections and elements
    gsap.set(sceneRefs.current.slice(1), { opacity: 0 });
    gsap.set(textRefs.current.slice(1), { opacity: 0 });
    gsap.set(cardRefs.current.slice(1), { opacity: 0 });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top top",
        end: "bottom bottom",
        scrub: 1.2,
        snap: {
          snapTo: 1 / 6,
          duration: { min: 0.3, max: 0.8 },
          delay: 0.15,
          ease: "power2.out",
        },
        onUpdate: (self) => {
          setScrollProgress(self.progress);
          const index = Math.min(Math.round(self.progress * 6), 6);
          setActiveIndex(index);
        },
      }
    });

    // Animate initial scene elements
    gsap.fromTo(
      textRefs.current[0],
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, duration: 1.5, delay: 0.4, ease: "power3.out" }
    );
    gsap.fromTo(
      cardRefs.current[0],
      { opacity: 0, scale: 0.85, y: 70 },
      { opacity: 1, scale: 1, y: 0, duration: 1.6, delay: 0.6, ease: "back.out(1.5)" }
    );

    // Build timeline transitions between slides
    for (let i = 0; i < 6; i++) {
      const label = `step-${i}`;
      tl.addLabel(label);

      // Section i Exit
      tl.to(sceneRefs.current[i], {
        opacity: 0,
        duration: 1.2,
        ease: "power2.inOut",
      }, label);

      tl.to(textRefs.current[i], {
        opacity: 0,
        y: -60,
        duration: 1,
        ease: "power2.inOut",
      }, label);

      tl.to(cardRefs.current[i], {
        opacity: 0,
        y: -120,
        scale: 0.9,
        duration: 1,
        ease: "power2.inOut",
      }, label);

      tl.to(videoRefs.current[i], {
        scale: 0.95,
        duration: 1.2,
        ease: "power2.inOut",
      }, label);

      // Section i + 1 Entry
      tl.to(sceneRefs.current[i + 1], {
        opacity: 1,
        duration: 1.2,
        ease: "power2.inOut",
      }, label);

      tl.fromTo(videoRefs.current[i + 1],
        { scale: 1.15 },
        { scale: 1.05, duration: 1.2, ease: "power2.inOut" },
        label
      );

      tl.fromTo(textRefs.current[i + 1],
        { opacity: 0, y: 60 },
        { opacity: 1, y: 0, duration: 1, ease: "power2.out" },
        label + "+=0.3"
      );

      tl.fromTo(cardRefs.current[i + 1],
        { opacity: 0, y: 120, scale: 0.85 },
        { opacity: 1, y: 0, scale: 1, duration: 1.2, ease: "power3.out" },
        label + "+=0.3"
      );

      // Unique page animations
      if (i + 1 === 1) {
        tl.fromTo(".phone-ui-mockup",
          { y: 350, opacity: 0, scale: 0.9 },
          { y: 0, opacity: 1, scale: 1, duration: 1.3, ease: "power3.out" },
          label + "+=0.3"
        );
      } else if (i + 1 === 2) {
        tl.fromTo(".analysis-particle",
          { y: 60, opacity: 0, scale: 0.4 },
          { y: -40, opacity: 1, scale: 1, stagger: 0.15, duration: 1.4, ease: "power2.out" },
          label + "+=0.3"
        );
      } else if (i + 1 === 3) {
        tl.fromTo(".routing-path",
          { strokeDashoffset: 140, opacity: 0 },
          { strokeDashoffset: 0, opacity: 1, duration: 1.8, ease: "power1.inOut" },
          label + "+=0.3"
        );
      } else if (i + 1 === 4) {
        tl.fromTo(".resolution-progress-card",
          { x: -60, opacity: 0, scale: 0.95 },
          { x: 0, opacity: 1, scale: 1, stagger: 0.25, duration: 0.9, ease: "back.out(1.2)" },
          label + "+=0.3"
        );
      } else if (i + 1 === 5) {
        const counterTarget = { val1: 0, val2: 0 };
        tl.to(counterTarget, {
          val1: 98,
          val2: 24500,
          duration: 1.6,
          ease: "power3.out",
          onUpdate: () => {
            const el1 = document.getElementById("heavy-counter-1");
            const el2 = document.getElementById("heavy-counter-2");
            if (el1) el1.innerText = `${Math.floor(counterTarget.val1)}%`;
            if (el2) el2.innerText = `${Math.floor(counterTarget.val2).toLocaleString()}+`;
          }
        }, label + "+=0.3");
        tl.fromTo(".metric-bar-fill",
          { width: "0%" },
          { width: "98%", duration: 1.5, ease: "power2.out" },
          label + "+=0.4"
        );
      } else if (i + 1 === 6) {
        tl.fromTo(".hero-reveal-box",
          { scale: 0.8, opacity: 0, filter: "brightness(0.3) blur(10px)" },
          { scale: 1, opacity: 1, filter: "brightness(1) blur(0px) drop-shadow(0 0 30px rgba(255,255,255,0.3))", duration: 1.8, ease: "power3.out" },
          label + "+=0.3"
        );
      }
    }

    return () => {
      tl.kill();
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  const scrollToScene = (index) => {
    if (lenisRef.current) {
      lenisRef.current.scrollTo(index * window.innerHeight, {
        duration: 1.5,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      });
    }
  };

  const activeColor = SCENES_METADATA[activeIndex]?.color || "#ffffff";

  return (
    <div ref={containerRef} className="storytelling-page relative w-full h-[700vh] bg-slate-950 select-none">
      
      {/* ── CANVAS PARTICLES IN BACKGROUND ── */}
      <FloatingParticles color={activeColor} count={35} />

      {/* ── TOP SCROLL PROGRESS BAR ── */}
      <div 
        className="fixed top-0 left-0 h-[3px] z-[110] transition-all duration-100"
        style={{ 
          width: `${scrollProgress * 100}%`,
          background: `linear-gradient(to right, ${activeColor}, #3b82f6)`,
          boxShadow: `0 0 10px ${activeColor}`
        }}
      />

      {/* ── TOP-RIGHT PORTAL ACCESS BUTTON ── */}
      <button
        onClick={() => navigate("/login")}
        className="fixed top-6 right-6 md:top-8 md:right-8 px-6 py-2.5 rounded-xl text-white font-bold tracking-wide text-xs uppercase z-[120] transition-all duration-300 hover:scale-[1.03] active:scale-[0.97] hover:bg-white/15 select-none cursor-pointer flex items-center gap-2 shadow-2xl"
        style={{
          background: "rgba(255, 255, 255, 0.08)",
          backdropFilter: "blur(16px) saturate(120%)",
          WebkitBackdropFilter: "blur(16px) saturate(120%)",
          border: "1px solid rgba(255, 255, 255, 0.15)",
          boxShadow: "0 8px 32px 0 rgba(0, 0, 0, 0.3)",
        }}
      >
        <span>Enter Portal</span>
        <Icons.ArrowRight size={14} />
      </button>

      {/* ── STICKY VIEWPORT STAGE ── */}
      <div className="sticky top-0 left-0 w-full h-screen overflow-hidden">
        
        {/* Render Modular Sections */}
        <Scene1 
          isActive={activeIndex === 0}
          playVideo={Math.abs(activeIndex - 0) <= 1}
          sectionRef={(el) => (sceneRefs.current[0] = el)}
          textRef={(el) => (textRefs.current[0] = el)}
          cardRef={(el) => (cardRefs.current[0] = el)}
          videoRef={(el) => (videoRefs.current[0] = el)}
        />
        <Scene2 
          isActive={activeIndex === 1}
          playVideo={Math.abs(activeIndex - 1) <= 1}
          sectionRef={(el) => (sceneRefs.current[1] = el)}
          textRef={(el) => (textRefs.current[1] = el)}
          cardRef={(el) => (cardRefs.current[1] = el)}
          videoRef={(el) => (videoRefs.current[1] = el)}
        />
        <Scene3 
          isActive={activeIndex === 2}
          playVideo={Math.abs(activeIndex - 2) <= 1}
          sectionRef={(el) => (sceneRefs.current[2] = el)}
          textRef={(el) => (textRefs.current[2] = el)}
          cardRef={(el) => (cardRefs.current[2] = el)}
          videoRef={(el) => (videoRefs.current[2] = el)}
        />
        <Scene4 
          isActive={activeIndex === 3}
          playVideo={Math.abs(activeIndex - 3) <= 1}
          sectionRef={(el) => (sceneRefs.current[3] = el)}
          textRef={(el) => (textRefs.current[3] = el)}
          cardRef={(el) => (cardRefs.current[3] = el)}
          videoRef={(el) => (videoRefs.current[3] = el)}
        />
        <Scene5 
          isActive={activeIndex === 4}
          playVideo={Math.abs(activeIndex - 4) <= 1}
          sectionRef={(el) => (sceneRefs.current[4] = el)}
          textRef={(el) => (textRefs.current[4] = el)}
          cardRef={(el) => (cardRefs.current[4] = el)}
          videoRef={(el) => (videoRefs.current[4] = el)}
        />
        <Scene6 
          isActive={activeIndex === 5}
          playVideo={Math.abs(activeIndex - 5) <= 1}
          sectionRef={(el) => (sceneRefs.current[5] = el)}
          textRef={(el) => (textRefs.current[5] = el)}
          cardRef={(el) => (cardRefs.current[5] = el)}
          videoRef={(el) => (videoRefs.current[5] = el)}
        />
        <Scene7 
          isActive={activeIndex === 6}
          playVideo={Math.abs(activeIndex - 6) <= 1}
          sectionRef={(el) => (sceneRefs.current[6] = el)}
          textRef={(el) => (textRefs.current[6] = el)}
          cardRef={(el) => (cardRefs.current[6] = el)}
          videoRef={(el) => (videoRefs.current[6] = el)}
          onEnterPortal={() => navigate("/login")}
        />

      </div>

      {/* ── VERTICAL PAGE NAV DOTS (RIGHT SIDE) ── */}
      <div className="fixed right-8 top-1/2 -translate-y-1/2 z-[100] flex flex-col gap-4 hidden md:flex">
        {SCENES_METADATA.map((scene, index) => {
          const isActive = index === activeIndex;
          return (
            <button
              key={scene.id}
              onClick={() => scrollToScene(index)}
              className="group relative flex items-center justify-center w-6 h-6 rounded-full cursor-pointer focus:outline-none"
              aria-label={`Scroll to section ${index + 1}`}
            >
              <span className="absolute right-8 px-3 py-1 rounded bg-slate-900 border border-white/10 text-white text-[10px] font-bold tracking-widest uppercase opacity-0 translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 pointer-events-none whitespace-nowrap font-sans">
                {scene.title}
              </span>
              
              {isActive && (
                <span 
                  className="absolute w-full h-full rounded-full animate-ping opacity-30 pointer-events-none"
                  style={{ backgroundColor: scene.color }}
                />
              )}

              <span 
                className={`rounded-full transition-all duration-300 ${
                  isActive ? "w-3 h-3 scale-110" : "w-1.5 h-1.5 bg-slate-500 scale-100 group-hover:scale-125 group-hover:bg-slate-300"
                }`}
                style={{ backgroundColor: isActive ? scene.color : undefined }}
              />
            </button>
          );
        })}
      </div>

      {/* ── FOOTER INDICATOR IN LAST SCENE ── */}
      <div 
        className="fixed bottom-8 left-1/2 -translate-x-1/2 z-30 text-center pointer-events-none text-slate-500 text-[10px] tracking-widest uppercase transition-opacity duration-500 font-sans"
        style={{ opacity: activeIndex === 6 ? 0.7 : 0 }}
      >
        © 2026 Civic Technology Platform. All rights reserved.
      </div>
      
    </div>
  );
};

export default LandingPage;
