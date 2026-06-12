import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import useLenis from "../hooks/useLenis";
import { SCENES_META } from "../constants/scenes";
import TopBar from "./TopBar";
import NavDots from "./NavDots";
import SceneBlock from "./SceneBlock";
import IntroSection from "../sections/IntroSection";
import CTASection from "../sections/CTASection";

// Step 7 — register ScrollTrigger globally once
gsap.registerPlugin(ScrollTrigger);
ScrollTrigger.config({ invalidateOnRefresh: true });

const EASING = (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t));

const StoryContainer = () => {
  const navigate    = useNavigate();
  const lenisRef    = useLenis();                        // Step 5 — Lenis
  const [activeScene, setActiveScene] = useState(-1);   // -1 = intro
  const [progress,    setProgress]    = useState(0);

  // Step 6 — preload next scene video when a scene becomes active
  useEffect(() => {
    if (activeScene < 0) return;
    const next = SCENES_META[activeScene + 1];
    if (!next) return;
    const link = document.createElement("link");
    link.rel  = "preload";
    link.as   = "video";
    link.href = next.video;
    document.head.appendChild(link);
    return () => { try { document.head.removeChild(link); } catch (_) {} };
  }, [activeScene]);

  // Step 6 — Lenis scrollTo with cinematic easing
  const lenisScrollTo = useCallback((top) => {
    if (lenisRef.current) {
      lenisRef.current.scrollTo(top, { duration: 1.6, easing: EASING });
    } else {
      window.scrollTo({ top, behavior: "smooth" });
    }
  }, [lenisRef]);

  // Scroll position helpers (100vh intro + 300vh per scene)
  const scrollToScene = useCallback((i) => {
    lenisScrollTo((100 + i * 300) * window.innerHeight / 100 + 10);
  }, [lenisScrollTo]);

  const scrollToCTA = useCallback(() => {
    lenisScrollTo((100 + 7 * 300) * window.innerHeight / 100);
  }, [lenisScrollTo]);

  const accent = SCENES_META[activeScene]?.color ?? "#3b82f6";

  return (
    <div className="w-full bg-black text-white">

      {/* ── Fixed chrome ── */}
      <TopBar accent={accent} progress={progress} onEnter={() => navigate("/login")} />
      <NavDots
        scenes={SCENES_META}
        activeScene={activeScene}
        onDotClick={scrollToScene}
        onCTA={scrollToCTA}
      />

      {/* Step 3 — WEBSITE FLOW ───────────────────────────────────── */}

      {/* 1. Intro — 100vh, GSAP scroll-out */}
      <IntroSection />

      {/* 2–8. Seven × 300vh pinned scenes */}
      {SCENES_META.map((scene, i) => (
        <SceneBlock
          key={scene.n}
          scene={scene}
          index={i}
          onActive={() => setActiveScene(i)}
          onProgress={setProgress}
          onEnterPortal={() => navigate("/login")}
        />
      ))}

      {/* 9. Final CTA */}
      <CTASection onEnter={() => navigate("/login")} onSignup={() => navigate("/signup")} />
    </div>
  );
};

export default StoryContainer;
