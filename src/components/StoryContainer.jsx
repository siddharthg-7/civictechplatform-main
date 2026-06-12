import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import useLenis from "../hooks/useLenis";
import TopBar from "./TopBar";
import NavDots from "./NavDots";
import IntroSection from "../sections/IntroSection";
import SceneBlock from "./SceneBlock";
import CTASection from "../sections/CTASection";

gsap.registerPlugin(ScrollTrigger);

// ─── Single source of truth for all 7 scenes ──────────────────────────────
export const SCENES_META = [
  {
    n: 1, color: "#f43f5e", tag: "01 — Discovery",
    headline: ["Every City", "Has Unseen", "Fractures"],
    sub: "Potholes. Broken lights. Silent suffering. Issues that erode urban life one block at a time.",
    video: "/Landingpage/scene1.mp4",
    stats: [{ v: "2.4M", l: "Citizens Affected" }, { v: "847", l: "Open Issues" }],
  },
  {
    n: 2, color: "#3b82f6", tag: "02 — Reporting",
    headline: ["Your Voice,", "Geotagged &", "Amplified"],
    sub: "One tap. Photo. Location. A complaint transforms into a live civic signal in seconds.",
    video: "/Landingpage/scene2.mp4",
    stats: [{ v: "98%", l: "Submit Rate" }, { v: "1.2s", l: "Avg Response" }],
  },
  {
    n: 3, color: "#a855f7", tag: "03 — Analysis",
    headline: ["AI Reads", "The City's", "Pulse"],
    sub: "Machine learning clusters complaints, scores urgency, and reveals systemic failure patterns.",
    video: "/Landingpage/scene3.mp4",
    stats: [{ v: "99.2%", l: "AI Accuracy" }, { v: "< 3s", l: "Processing" }],
  },
  {
    n: 4, color: "#06b6d4", tag: "04 — Routing",
    headline: ["Every Issue", "Finds Its", "Authority"],
    sub: "Smart routing assigns complaints to the precise department, ward officer, or contractor.",
    video: "/Landingpage/scene4.mp4",
    stats: [{ v: "34", l: "Departments" }, { v: "< 2hr", l: "Assignment" }],
  },
  {
    n: 5, color: "#10b981", tag: "05 — Resolution",
    headline: ["Problems", "Solved. Lives", "Restored."],
    sub: "Field teams receive tasks, upload proof, and close the loop. Citizens see it in real time.",
    video: "/Landingpage/scene5.mp4",
    stats: [{ v: "94%", l: "Resolution Rate" }, { v: "48hr", l: "Avg Fix Time" }],
  },
  {
    n: 6, color: "#f59e0b", tag: "06 — Impact",
    headline: ["Trust Built", "Block By", "Block"],
    sub: "Transparent metrics. Public accountability. A city that earns faith through visible results.",
    video: "/Landingpage/scene6.mp4",
    stats: [{ v: "24.5K", l: "Issues Resolved" }, { v: "4.8★", l: "Citizen Rating" }],
  },
  {
    n: 7, color: "#ffffff", tag: "07 — Future",
    headline: ["The Smart", "City Starts", "With You"],
    sub: "Join thousands of citizens building tomorrow's urban infrastructure — one report at a time.",
    video: "/Landingpage/scene7.mp4",
    stats: [{ v: "∞", l: "Possibilities" }, { v: "Now", l: "Begin" }],
    isFinal: true,
  },
];

const EASING = (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t));

const StoryContainer = () => {
  const navigate    = useNavigate();
  const lenisRef    = useLenis();
  const [activeScene, setActiveScene] = useState(-1);
  const [progress,    setProgress]    = useState(0);

  // Cinematic scroll via Lenis — falls back to native if Lenis not ready
  const lenisScrollTo = (top) => {
    if (lenisRef.current) {
      lenisRef.current.scrollTo(top, { duration: 1.6, easing: EASING });
    } else {
      window.scrollTo({ top, behavior: "smooth" });
    }
  };

  const scrollToScene = (i) => {
    lenisScrollTo((100 + i * 300) * window.innerHeight / 100 + 10);
  };

  const scrollToCTA = () => {
    lenisScrollTo((100 + 7 * 300) * window.innerHeight / 100);
  };

  const accent = activeScene >= 0 && activeScene < SCENES_META.length
    ? SCENES_META[activeScene].color
    : "#3b82f6";

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

      {/* ── 1. Intro — 100vh ── */}
      <IntroSection />

      {/* ── 2–8. Seven pinned scenes — each 300vh ── */}
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

      {/* ── 9. Final CTA ── */}
      <CTASection onEnter={() => navigate("/login")} onSignup={() => navigate("/signup")} />
    </div>
  );
};

export default StoryContainer;
