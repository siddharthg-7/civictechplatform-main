import React, { useRef, useEffect, useState, useCallback } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useNavigate } from "react-router-dom";
import {
  AlertTriangle, Smartphone, Brain, Network,
  CheckCircle2, BarChart3, Sparkles, ArrowRight,
  Users, ChevronDown, Radio, Activity
} from "lucide-react";
import SceneCard from "../components/SceneCard";

gsap.registerPlugin(ScrollTrigger);

// ─── Scene data ────────────────────────────────────────────────────────────
const SCENES = [
  {
    id: 1,
    video: "/Landingpage/scene1.mp4",
    accent: "#ff3b5c",
    label: "01 — DISCOVERY",
    headline: ["Every City", "Has Unseen", "Fractures"],
    sub: "Potholes. Broken lights. Silent suffering. Issues that erode urban life one block at a time.",
    stats: [{ v: "2.4M", l: "Citizens Affected" }, { v: "847", l: "Open Issues" }],
    icon: AlertTriangle,
    tag: "Problem Detection",
  },
  {
    id: 2,
    video: "/Landingpage/scene2.mp4",
    accent: "#3b82f6",
    label: "02 — REPORTING",
    headline: ["Your Voice,", "Geotagged &", "Amplified"],
    sub: "One tap. Photo. Location. Category. A complaint transforms into a live civic signal.",
    stats: [{ v: "98%", l: "Submission Rate" }, { v: "1.2s", l: "Avg Response" }],
    icon: Smartphone,
    tag: "Citizen Interface",
  },
  {
    id: 3,
    video: "/Landingpage/scene3.mp4",
    accent: "#a855f7",
    label: "03 — ANALYSIS",
    headline: ["AI Reads", "The City's", "Pulse"],
    sub: "Machine learning clusters complaints, scores urgency, and reveals systemic failure patterns.",
    stats: [{ v: "99.2%", l: "AI Accuracy" }, { v: "< 3s", l: "Processing" }],
    icon: Brain,
    tag: "Intelligence Layer",
  },
  {
    id: 4,
    video: "/Landingpage/scene4.mp4",
    accent: "#06b6d4",
    label: "04 — ROUTING",
    headline: ["Every Issue", "Finds Its", "Authority"],
    sub: "Smart routing assigns complaints to the precise department, ward officer, or contractor.",
    stats: [{ v: "34", l: "Departments" }, { v: "< 2hr", l: "Assignment" }],
    icon: Network,
    tag: "Smart Dispatch",
  },
  {
    id: 5,
    video: "/Landingpage/scene5.mp4",
    accent: "#10b981",
    label: "05 — RESOLUTION",
    headline: ["Problems", "Solved. Lives", "Restored."],
    sub: "Field teams receive tasks, upload proof, close the loop. Citizens see resolution in real time.",
    stats: [{ v: "94%", l: "Resolution Rate" }, { v: "48hr", l: "Avg Fix Time" }],
    icon: CheckCircle2,
    tag: "Action & Closure",
  },
  {
    id: 6,
    video: "/Landingpage/scene6.mp4",
    accent: "#f59e0b",
    label: "06 — IMPACT",
    headline: ["Trust Built", "Block By", "Block"],
    sub: "Transparent metrics. Public accountability. A city that earns faith through measurable action.",
    stats: [{ v: "24.5K", l: "Issues Resolved" }, { v: "4.8★", l: "Citizen Rating" }],
    icon: BarChart3,
    tag: "Public Accountability",
  },
  {
    id: 7,
    video: "/Landingpage/scene7.mp4",
    accent: "#ffffff",
    label: "07 — FUTURE",
    headline: ["The Smart", "City Starts", "With You"],
    sub: "Join thousands of citizens building tomorrow's urban infrastructure — one report at a time.",
    stats: [{ v: "∞", l: "Possibilities" }, { v: "Now", l: "Begin" }],
    icon: Sparkles,
    tag: "Your City, Your Voice",
    isFinal: true,
  },
];

// ─── Video Panel ───────────────────────────────────────────────────────────
const VideoPanel = React.forwardRef(({ src, accent, isNext }, ref) => (
  <div
    ref={ref}
    className="absolute inset-0 w-full h-full will-change-transform"
    style={{ transformOrigin: "center center" }}
  >
    <video
      src={src}
      autoPlay
      muted
      loop
      playsInline
      className="absolute inset-0 w-full h-full object-cover"
      style={{ transform: "scale(1.08)", transformOrigin: "center center" }}
    />
    {/* Cinematic vignette */}
    <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/20 to-black/80 pointer-events-none" />
    {/* Side darkness */}
    <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-transparent to-black/40 pointer-events-none" />
    {/* Color tint layer */}
    <div
      className="absolute inset-0 pointer-events-none mix-blend-color opacity-[0.12]"
      style={{ background: accent }}
    />
    {/* Scanline texture */}
    <div
      className="absolute inset-0 pointer-events-none opacity-[0.025]"
      style={{
        backgroundImage: "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,1) 2px, rgba(255,255,255,1) 3px)",
        backgroundSize: "100% 3px",
      }}
    />
  </div>
));

// ─── Blur Transition Overlay ───────────────────────────────────────────────
const BlurTransition = React.forwardRef((_, ref) => (
  <div
    ref={ref}
    className="absolute inset-0 pointer-events-none z-30"
    style={{
      background: "rgba(0,0,0,0)",
      opacity: 0,
    }}
  />
));

// ─── Scene Overlay Content ─────────────────────────────────────────────────
const SceneContent = React.forwardRef(({ scene, navigate }, ref) => {
  const Icon = scene.icon;
  const accentRgb = hexToRgb(scene.accent);
  const glowStyle = accentRgb
    ? { boxShadow: `0 0 40px 0 rgba(${accentRgb},0.22), inset 0 0 20px rgba(${accentRgb},0.06)` }
    : {};

  return (
    <div
      ref={ref}
      className="absolute inset-0 z-20 flex items-center justify-start pointer-events-none"
      style={{ willChange: "opacity, transform" }}
    >
      <div className="w-full max-w-[40%] ml-[6vw] px-4 flex flex-col gap-6 pointer-events-auto select-none">

        {/* Scene label pill */}
        <div
          className="self-start inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full border backdrop-blur-md text-[10px] font-black tracking-[0.2em] uppercase"
          style={{
            color: scene.accent,
            borderColor: `${scene.accent}44`,
            background: `rgba(0,0,0,0.5)`,
            ...glowStyle,
          }}
        >
          <Icon size={10} />
          <span>{scene.label}</span>
        </div>

        {/* Headline — stacked cinematic words */}
        <h2 className="flex flex-col gap-0 leading-[0.88] tracking-[-0.03em]">
          {scene.headline.map((line, i) => (
            <span
              key={i}
              className="block font-black text-white"
              style={{
                fontSize: "clamp(72px, 8vw, 140px)",
                lineHeight: "0.9",
                maxWidth: "650px",
                textShadow: "0 4px 40px rgba(0,0,0,0.8)",
              }}
            >
              {i === scene.headline.length - 1 ? (
                <span style={{ color: scene.accent }}>{line}</span>
              ) : line}
            </span>
          ))}
        </h2>

        {/* Sub copy */}
        <p
          className="text-white/70 font-medium leading-relaxed"
          style={{ fontSize: "clamp(0.9rem, 1.4vw, 1.15rem)", maxWidth: "520px" }}
        >
          {scene.sub}
        </p>

        {/* Stats row */}
        <div className="flex gap-6 mt-1">
          {scene.stats.map((s, i) => (
            <div key={i} className="flex flex-col gap-0.5">
              <span
                className="font-black tracking-tight"
                style={{ fontSize: "clamp(1.4rem, 2.8vw, 2.2rem)", color: scene.accent }}
              >
                {s.v}
              </span>
              <span className="text-white/40 text-[10px] font-bold uppercase tracking-[0.15em]">
                {s.l}
              </span>
            </div>
          ))}
        </div>

        {/* CTA on final scene */}
        {scene.isFinal && (
          <button
            onClick={() => navigate("/login")}
            className="self-start flex items-center gap-3 px-7 py-3.5 rounded-2xl font-black text-black text-sm uppercase tracking-widest transition-all duration-300 hover:scale-[1.04] active:scale-[0.97] cursor-pointer mt-2"
            style={{ background: "white", boxShadow: "0 0 40px rgba(255,255,255,0.3)" }}
          >
            <span>Enter Portal</span>
            <ArrowRight size={16} />
          </button>
        )}
      </div>

      {/* RIGHT_COLUMN: anchor: right_middle */}
      <div className="hidden lg:flex flex-col gap-4 absolute right-[12%] top-1/2 -translate-y-1/2">
        <div
          className="w-[280px] xl:w-[320px] p-6 flex flex-col gap-5"
          style={{
            borderRadius: "32px",
            background: "rgba(10,10,15,0.35)",
            border: "1px solid rgba(255,255,255,0.08)",
            backdropFilter: "blur(24px) saturate(160%)",
            WebkitBackdropFilter: "blur(24px) saturate(160%)",
            boxShadow: accentRgb
              ? `0 30px 120px rgba(0,0,0,0.4), inset 0 1px 1px rgba(255,255,255,0.1), inset 0 0 40px rgba(${accentRgb},0.1)`
              : "0 30px 120px rgba(0,0,0,0.4)",
          }}
        >
          <SceneCard n={scene.id} color={scene.accent} />
        </div>
      </div>
    </div>
  );
});

// ─── Right floating glass data card ───────────────────────────────────────
function hexToRgb(hex) {
  if (!hex) return null;
  const r = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return r ? `${parseInt(r[1],16)},${parseInt(r[2],16)},${parseInt(r[3],16)}` : null;
}

// ─── Nav Dots ──────────────────────────────────────────────────────────────
const NavDots = ({ active, total, scenes, onDotClick }) => (
  <div className="fixed right-8 top-1/2 -translate-y-1/2 z-[200] hidden md:flex flex-col gap-4">
    {scenes.map((scene, i) => (
      <button
        key={i}
        onClick={() => onDotClick(i)}
        className="group relative flex items-center justify-center w-5 h-5 focus:outline-none"
        aria-label={`Scene ${i + 1}`}
      >
        {/* Tooltip */}
        <span className="absolute right-7 whitespace-nowrap px-2.5 py-1 rounded-lg text-[9px] font-black tracking-widest uppercase opacity-0 translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200 pointer-events-none border border-white/10"
          style={{ background: "rgba(0,0,0,0.8)", color: scene.accent }}>
          {scene.tag}
        </span>
        {active === i && (
          <span
            className="absolute inset-0 rounded-full animate-ping opacity-40"
            style={{ background: scene.accent }}
          />
        )}
        <span
          className="rounded-full transition-all duration-300"
          style={{
            width: active === i ? 10 : 5,
            height: active === i ? 10 : 5,
            background: active === i ? scene.accent : "rgba(255,255,255,0.25)",
            boxShadow: active === i ? `0 0 12px ${scene.accent}` : "none",
          }}
        />
      </button>
    ))}
  </div>
);

// ─── Progress bar ──────────────────────────────────────────────────────────
const ProgressBar = ({ progress, accent }) => (
  <div className="fixed top-0 left-0 right-0 h-[2px] z-[200] bg-white/5">
    <div
      className="h-full transition-none"
      style={{
        width: `${progress * 100}%`,
        background: `linear-gradient(to right, ${accent}, rgba(255,255,255,0.6))`,
        boxShadow: `0 0 8px ${accent}`,
      }}
    />
  </div>
);

// ─── Top Nav Bar ───────────────────────────────────────────────────────────
const TopNav = ({ accent, navigate }) => (
  <div className="fixed top-0 left-0 right-0 z-[200] flex items-center justify-between px-8 pt-6 pointer-events-none">
    <div
      className="pointer-events-auto flex items-center gap-2.5 px-4 py-2 rounded-full border border-white/10 backdrop-blur-xl"
      style={{ background: "rgba(0,0,0,0.6)" }}
    >
      <Radio size={12} style={{ color: accent }} className="animate-pulse" />
      <span className="text-white text-xs font-black tracking-[0.2em] uppercase">CivicConnect</span>
    </div>
    <button
      onClick={() => navigate("/login")}
      className="pointer-events-auto flex items-center gap-2 px-5 py-2 rounded-full text-white text-xs font-black tracking-widest uppercase border border-white/10 backdrop-blur-xl transition-all duration-300 hover:border-white/30 hover:bg-white/10 cursor-pointer"
      style={{ background: "rgba(0,0,0,0.6)" }}
    >
      <span>Enter Portal</span>
      <ArrowRight size={12} />
    </button>
  </div>
);

// ─── Hero intro overlay ────────────────────────────────────────────────────
const HeroOverlay = React.forwardRef((_, ref) => (
  <div
    ref={ref}
    className="absolute inset-0 z-40 flex flex-col items-center justify-center pointer-events-none"
  >
    <div className="flex flex-col items-center gap-5 text-center px-6">
      <div className="flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/15 backdrop-blur-xl text-[10px] font-black tracking-[0.25em] uppercase text-white/60"
        style={{ background: "rgba(0,0,0,0.5)" }}>
        <Activity size={10} className="text-white/40" />
        <span>Smart City Experience</span>
      </div>
      <h1
        className="font-black text-white tracking-[-0.04em] leading-[0.85]"
        style={{ fontSize: "clamp(3.5rem, 12vw, 10rem)", textShadow: "0 8px 60px rgba(0,0,0,0.9)" }}
      >
        Civic<br />Connect
      </h1>
      <p className="text-white/50 font-medium max-w-sm" style={{ fontSize: "clamp(0.85rem, 1.5vw, 1.1rem)" }}>
        A cinematic journey through urban governance. Scroll to explore.
      </p>
      <div className="flex flex-col items-center gap-2 mt-4 animate-bounce">
        <span className="text-white/30 text-[9px] font-black tracking-[0.3em] uppercase">Scroll</span>
        <ChevronDown size={16} className="text-white/30" />
      </div>
    </div>
  </div>
));

// ─── Main ImmersiveJourney ─────────────────────────────────────────────────
const SCENE_HOLD = 1;      // timeline units a scene stays fully visible
const SCENE_XFADE = 0.6;   // timeline units for cross-fade between scenes
const HERO_UNITS = 1;      // timeline units for hero intro
// Total timeline length = HERO_UNITS + 7 * SCENE_HOLD + 6 * SCENE_XFADE
const TOTAL_UNITS = HERO_UNITS + SCENES.length * SCENE_HOLD + (SCENES.length - 1) * SCENE_XFADE;

const ImmersiveJourney = () => {
  const navigate = useNavigate();
  const wrapperRef = useRef(null);
  const stickyRef = useRef(null);
  const heroOverlayRef = useRef(null);
  const blurRef = useRef(null);

  const videoPanelRefs = useRef([]);
  const contentRefs = useRef([]);

  const [activeIndex, setActiveIndex] = useState(0);
  const [progress, setProgress] = useState(0);

  const setVideoRef = useCallback((el, i) => { videoPanelRefs.current[i] = el; }, []);
  const setContentRef = useCallback((el, i) => { contentRefs.current[i] = el; }, []);

  // Scroll to a scene by mapping its position in the master timeline
  const scrollToScene = useCallback((i) => {
    const wrapper = wrapperRef.current;
    if (!wrapper) return;
    const totalScroll = wrapper.scrollHeight - window.innerHeight;
    // scene i starts after hero + i*(hold+xfade)
    const sceneStart = HERO_UNITS + i * (SCENE_HOLD + SCENE_XFADE);
    const ratio = sceneStart / TOTAL_UNITS;
    window.scrollTo({ top: ratio * totalScroll, behavior: "smooth" });
  }, []);

  useEffect(() => {
    const panels = videoPanelRefs.current;
    const contents = contentRefs.current;
    const heroOverlay = heroOverlayRef.current;
    const blurOverlay = blurRef.current;
    const wrapper = wrapperRef.current;

    if (!wrapper || panels.filter(Boolean).length < 7 || contents.filter(Boolean).length < 7) return;

    // ── Set all panels/contents to a known hidden start state ──
    panels.forEach((el, i) => {
      if (!el) return;
      gsap.set(el, { opacity: i === 0 ? 1 : 0, filter: i === 0 ? "blur(0px)" : "blur(12px)" });
    });
    contents.forEach((el) => {
      if (!el) return;
      gsap.set(el, { opacity: 0, y: 120, scale: 0.92 });
    });

    // ── Single master scrubbed timeline ──
    const tl = gsap.timeline({ defaults: { ease: "none" } });

    // Hero hold then fade out
    tl.to(heroOverlay, { opacity: 0, y: -30, duration: 0.5, ease: "power2.in" }, HERO_UNITS - 0.5);

    SCENES.forEach((_, i) => {
      const sceneStart = HERO_UNITS + i * (SCENE_HOLD + SCENE_XFADE);
      const xfadeStart = sceneStart + SCENE_HOLD;

      // Scene content: fade in at sceneStart, hold, fade out at xfadeStart
      tl.to(contents[i], { opacity: 1, y: 0, scale: 1, duration: 0.3, ease: "power2.out" }, sceneStart);
      tl.to(contents[i], { opacity: 0, y: -120, scale: 0.92, duration: SCENE_XFADE * 0.5, ease: "power2.in" }, xfadeStart);

      if (i < SCENES.length - 1) {
        const nextStart = xfadeStart;
        // Video cross-fade: current out, next in
        tl.to(panels[i], { opacity: 0, filter: "blur(12px)", duration: SCENE_XFADE, ease: "power1.inOut" }, nextStart);
        tl.fromTo(panels[i + 1],
          { opacity: 0, filter: "blur(12px)" },
          { opacity: 1, filter: "blur(0px)", duration: SCENE_XFADE, ease: "power1.inOut" },
          nextStart
        );
        // Black flash peaks mid-xfade
        tl.to(blurOverlay,
          { opacity: 0.55, background: "rgba(0,0,0,1)", ease: "power1.in", duration: SCENE_XFADE * 0.5 },
          nextStart
        );
        tl.to(blurOverlay,
          { opacity: 0, ease: "power1.out", duration: SCENE_XFADE * 0.5 },
          nextStart + SCENE_XFADE * 0.5
        );
      } else {
        // Last scene: just fade content in and hold
        tl.to(contents[i], { opacity: 1, y: 0, scale: 1, duration: 0.3 }, sceneStart);
      }
    });

    // Pad timeline to TOTAL_UNITS so scrub math is consistent
    tl.to({}, { duration: 0.01 }, TOTAL_UNITS);

    // Hook timeline to scroll
    ScrollTrigger.create({
      trigger: wrapper,
      start: "top top",
      end: "bottom bottom",
      scrub: 1.4,
      animation: tl,
      onUpdate: (self) => {
        setProgress(self.progress);
        // Derive active scene index from scroll progress
        const p = self.progress * TOTAL_UNITS;
        let idx = 0;
        for (let i = 0; i < SCENES.length; i++) {
          const sceneStart = HERO_UNITS + i * (SCENE_HOLD + SCENE_XFADE);
          if (p >= sceneStart) idx = i;
        }
        setActiveIndex(idx);
      },
    });

    return () => {
      tl.kill();
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  const accent = SCENES[activeIndex]?.accent || "#ffffff";

  return (
    <>
      <ProgressBar progress={progress} accent={accent} />
      <TopNav accent={accent} navigate={navigate} />
      <NavDots active={activeIndex} total={SCENES.length} scenes={SCENES} onDotClick={scrollToScene} />

      {/* Scroll wrapper — height based on timeline units for predictable scrub */}
      <div
        ref={wrapperRef}
        style={{ height: `${TOTAL_UNITS * 120}vh` }}
        className="relative"
      >
        {/* ── Sticky fullscreen stage ── */}
        <div
          ref={stickyRef}
          className="sticky top-0 w-full h-screen overflow-hidden"
        >
          {/* Video panels — all stacked, opacity controlled by timeline */}
          {SCENES.map((scene, i) => (
            <VideoPanel
              key={scene.id}
              ref={(el) => setVideoRef(el, i)}
              src={scene.video}
              accent={scene.accent}
            />
          ))}

          {/* Blur transition overlay */}
          <BlurTransition ref={blurRef} />

          {/* Scene content overlays — all stacked, opacity controlled by timeline */}
          {SCENES.map((scene, i) => (
            <SceneContent
              key={scene.id}
              ref={(el) => setContentRef(el, i)}
              scene={scene}
              navigate={navigate}
            />
          ))}

          {/* Hero intro overlay */}
          <HeroOverlay ref={heroOverlayRef} />

          {/* Scene label strip */}
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-50">
            <span
              className="text-[9px] font-black tracking-[0.3em] uppercase transition-all duration-500"
              style={{ color: `${accent}80` }}
            >
              {SCENES[activeIndex]?.label}
            </span>
          </div>
        </div>
      </div>

      {/* ── CTA Section after scroll ── */}
      <CTASection navigate={navigate} />
    </>
  );
};

// ─── Ending CTA ────────────────────────────────────────────────────────────
const CTASection = ({ navigate }) => (
  <div className="relative w-full min-h-screen flex flex-col items-center justify-center bg-black overflow-hidden">
    <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.04)_0%,transparent_65%)] pointer-events-none" />
    <div
      className="absolute inset-0 pointer-events-none opacity-[0.04]"
      style={{
        backgroundImage: "linear-gradient(rgba(255,255,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)",
        backgroundSize: "60px 60px",
      }}
    />

    <div className="relative z-10 flex flex-col items-center gap-8 text-center px-6 max-w-2xl">
      <div className="w-16 h-16 rounded-2xl border border-white/10 flex items-center justify-center"
        style={{ background: "rgba(255,255,255,0.05)", backdropFilter: "blur(20px)" }}>
        <Sparkles size={28} className="text-white/80" />
      </div>

      <h2
        className="font-black text-white tracking-[-0.04em] leading-[0.88]"
        style={{ fontSize: "clamp(3rem, 8vw, 6rem)" }}
      >
        Your City<br />
        <span className="text-white/30">Awaits</span>
      </h2>

      <p className="text-white/40 font-medium leading-relaxed max-w-md" style={{ fontSize: "clamp(0.9rem, 1.5vw, 1.1rem)" }}>
        Step into the platform and help shape the future of urban governance in your community.
      </p>

      <div className="flex items-center gap-4 flex-wrap justify-center">
        <button
          onClick={() => navigate("/login")}
          className="flex items-center gap-2.5 px-8 py-4 rounded-2xl font-black text-black text-sm uppercase tracking-widest cursor-pointer transition-all duration-300 hover:scale-[1.03] active:scale-[0.97]"
          style={{ background: "white", boxShadow: "0 0 60px rgba(255,255,255,0.2)" }}
        >
          <span>Launch Citizen Portal</span>
          <ArrowRight size={15} />
        </button>
        <button
          onClick={() => navigate("/signup")}
          className="flex items-center gap-2.5 px-8 py-4 rounded-2xl font-black text-white text-sm uppercase tracking-widest cursor-pointer border border-white/15 backdrop-blur-xl transition-all duration-300 hover:bg-white/5 hover:border-white/30"
          style={{ background: "rgba(0,0,0,0.4)" }}
        >
          <span>Create Account</span>
          <Users size={15} />
        </button>
      </div>
    </div>

    <div className="absolute bottom-8 text-white/15 text-[9px] font-black tracking-[0.4em] uppercase">
      © 2026 CivicConnect — Smart Governance Platform
    </div>
  </div>
);

export default ImmersiveJourney;
