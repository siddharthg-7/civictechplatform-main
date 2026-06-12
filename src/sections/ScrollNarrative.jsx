import React, { useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowRight } from "lucide-react";

import Scene1 from "../components/Scene1";
import Scene2 from "../components/Scene2";
import Scene3 from "../components/Scene3";
import Scene4 from "../components/Scene4";
import Scene5 from "../components/Scene5";
import Scene6 from "../components/Scene6";
import Scene7 from "../components/Scene7";
import { useGSAPScenes } from "../hooks/useGSAPScenes";

const SCENES_META = [
  { id: 1, title: "Discovery",  color: "#f43f5e" },
  { id: 2, title: "Reporting",  color: "#3b82f6" },
  { id: 3, title: "Analysis",   color: "#a855f7" },
  { id: 4, title: "Routing",    color: "#06b6d4" },
  { id: 5, title: "Resolution", color: "#10b981" },
  { id: 6, title: "Impact",     color: "#f59e0b" },
  { id: 7, title: "Future",     color: "#ffffff" },
];

const TOTAL_HEIGHT_VH = 700;

const ScrollNarrative = () => {
  const navigate   = useNavigate();
  const containerRef = useRef(null);

  const sceneRefs = useRef([]);
  const textRefs  = useRef([]);
  const cardRefs  = useRef([]);
  const videoRefs = useRef([]);

  const [activeIndex,    setActiveIndex]    = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isReady,        setIsReady]        = useState(false);

  // Wait until all 7×4 refs are populated before initialising GSAP
  useEffect(() => {
    let live = true;
    const poll = () => {
      if (!live) return;
      const ready =
        sceneRefs.current.filter(Boolean).length === 7 &&
        textRefs.current.filter(Boolean).length  === 7 &&
        cardRefs.current.filter(Boolean).length  === 7 &&
        videoRefs.current.filter(Boolean).length === 7;
      if (ready) setIsReady(true);
      else       setTimeout(poll, 40);
    };
    poll();
    return () => { live = false; };
  }, []);

  useGSAPScenes(
    containerRef,
    sceneRefs,
    textRefs,
    cardRefs,
    videoRefs,
    setActiveIndex,
    setScrollProgress,
    isReady
  );

  // Scroll to a scene: map index → pixel position inside ScrollNarrative
  const scrollToScene = (i) => {
    const heroHeight = window.innerHeight;             // HeroIntro is 100vh
    const narrativeScroll = (TOTAL_HEIGHT_VH / 100 - 1) * window.innerHeight; // scrollable range of this section
    const target = heroHeight + (i / 6) * narrativeScroll;
    window.scrollTo({ top: target, behavior: "smooth" });
  };

  // ref-setter factories
  const sr = (i) => (el) => { sceneRefs.current[i] = el; };
  const tr = (i) => (el) => { textRefs.current[i]  = el; };
  const cr = (i) => (el) => { cardRefs.current[i]  = el; };
  const vr = (i) => (el) => { videoRefs.current[i] = el; };

  // A scene plays video if it's active or adjacent (preload buffer)
  const plays = (i) => Math.abs(activeIndex - i) <= 1;

  const activeColor = SCENES_META[activeIndex]?.color ?? "#ffffff";

  return (
    <div
      ref={containerRef}
      className="relative w-full select-none"
      style={{ height: `${TOTAL_HEIGHT_VH}vh` }}
    >
      {/* ── Top scroll progress bar ── */}
      <div
        className="fixed top-0 left-0 h-[2px] z-[110]"
        style={{
          width: `${scrollProgress * 100}%`,
          background: `linear-gradient(to right, ${activeColor}, #3b82f6)`,
          boxShadow: `0 0 8px ${activeColor}`,
          transition: "width 0.1s linear",
        }}
      />

      {/* ── Enter portal button ── */}
      <button
        onClick={() => navigate("/login")}
        className="fixed top-6 right-6 md:top-7 md:right-8 z-[120] flex items-center gap-2 px-5 py-2.5 rounded-xl text-white font-black tracking-widest text-[11px] uppercase border border-white/10 backdrop-blur-xl cursor-pointer transition-all duration-300 hover:border-white/30 hover:bg-white/10"
        style={{ background: "rgba(0,0,0,0.55)" }}
      >
        <span>Enter Portal</span>
        <ArrowRight size={13} />
      </button>

      {/* ── Sticky fullscreen stage ── */}
      <div className="sticky top-0 left-0 w-full h-screen overflow-hidden bg-black">
        <Scene1 isActive={activeIndex === 0} playVideo={plays(0)}
          sectionRef={sr(0)} textRef={tr(0)} cardRef={cr(0)} videoRef={vr(0)} />
        <Scene2 isActive={activeIndex === 1} playVideo={plays(1)}
          sectionRef={sr(1)} textRef={tr(1)} cardRef={cr(1)} videoRef={vr(1)} />
        <Scene3 isActive={activeIndex === 2} playVideo={plays(2)}
          sectionRef={sr(2)} textRef={tr(2)} cardRef={cr(2)} videoRef={vr(2)} />
        <Scene4 isActive={activeIndex === 3} playVideo={plays(3)}
          sectionRef={sr(3)} textRef={tr(3)} cardRef={cr(3)} videoRef={vr(3)} />
        <Scene5 isActive={activeIndex === 4} playVideo={plays(4)}
          sectionRef={sr(4)} textRef={tr(4)} cardRef={cr(4)} videoRef={vr(4)} />
        <Scene6 isActive={activeIndex === 5} playVideo={plays(5)}
          sectionRef={sr(5)} textRef={tr(5)} cardRef={cr(5)} videoRef={vr(5)} />
        <Scene7 isActive={activeIndex === 6} playVideo={plays(6)}
          sectionRef={sr(6)} textRef={tr(6)} cardRef={cr(6)} videoRef={vr(6)}
          onEnterPortal={() => navigate("/login")} />
      </div>

      {/* ── Right side nav dots ── */}
      <div className="fixed right-7 top-1/2 -translate-y-1/2 z-[100] hidden md:flex flex-col gap-4">
        {SCENES_META.map((scene, i) => {
          const active = i === activeIndex;
          return (
            <button
              key={scene.id}
              onClick={() => scrollToScene(i)}
              className="group relative flex items-center justify-center w-5 h-5 focus:outline-none"
              aria-label={`Go to ${scene.title}`}
            >
              <span
                className="absolute right-7 whitespace-nowrap px-2.5 py-1 rounded-lg text-[9px] font-black tracking-widest uppercase opacity-0 translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200 pointer-events-none border border-white/10"
                style={{ background: "rgba(0,0,0,0.85)", color: scene.color }}
              >
                {scene.title}
              </span>
              {active && (
                <span
                  className="absolute inset-0 rounded-full animate-ping opacity-40 pointer-events-none"
                  style={{ background: scene.color }}
                />
              )}
              <span
                className="rounded-full transition-all duration-300"
                style={{
                  width:      active ? 10 : 5,
                  height:     active ? 10 : 5,
                  background: active ? scene.color : "rgba(255,255,255,0.2)",
                  boxShadow:  active ? `0 0 10px ${scene.color}` : "none",
                }}
              />
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default ScrollNarrative;
