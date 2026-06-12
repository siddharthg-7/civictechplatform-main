import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight } from "lucide-react";
import FloatingParticles from "./FloatingParticles";
import SceneCard from "./SceneCard";

gsap.registerPlugin(ScrollTrigger);

/**
 * SceneBlock — 300vh scroll section, 100vh sticky stage.
 *
 * LEFT  (40%): tag, headline, description, metrics  — absolute, left:6%
 * RIGHT (60%): glass card                           — absolute, right:12%
 */
const SceneBlock = ({ scene, index, onActive, onProgress, onEnterPortal }) => {
  const sectionRef  = useRef(null);
  const videoRef    = useRef(null);
  const leftRef     = useRef(null);
  const tagRef      = useRef(null);
  const headlineRef = useRef(null);
  const subRef      = useRef(null);
  const statsRef    = useRef(null);
  const cardRef     = useRef(null);

  const { color, tag, headline, sub, stats, video, isFinal, n } = scene;

  // ── Video: play via IntersectionObserver ──────────────────────────
  useEffect(() => {
    const vid = videoRef.current;
    const sec = sectionRef.current;
    if (!vid || !sec) return;
    vid.muted = true; vid.loop = true; vid.playsInline = true; vid.preload = "auto";
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) vid.play().catch(() => {}); else vid.pause(); },
      { threshold: 0.05 }
    );
    obs.observe(sec);
    return () => obs.disconnect();
  }, []);

  // ── ScrollTrigger per scene ───────────────────────────────────────
  useEffect(() => {
    const section = sectionRef.current;
    const vid     = videoRef.current;
    const tag_el  = tagRef.current;
    const hl      = headlineRef.current;
    const sub_el  = subRef.current;
    const st      = statsRef.current;
    const card    = cardRef.current;
    if (!section || !vid) return;

    // Initial state
    gsap.set(vid,   { scale: 1.08, transformOrigin: "center center" });
    gsap.set([tag_el, hl, sub_el, st].filter(Boolean), { opacity: 0, y: 60, filter: "blur(10px)", force3D: true });
    if (card) {
      gsap.set(card, { opacity: 0, y: 80, filter: "blur(16px)", rotateX: 15, transformPerspective: 1200, force3D: true });
    }

    const tl = gsap.timeline({ paused: true });

    // ENTRY 0→0.20
    tl.to(vid,    { scale: 1.0, ease: "power2.out",  duration: 0.20 }, 0.00);
    tl.to(tag_el, { opacity: 1, y: 0, filter: "blur(0px)", ease: "power3.out", duration: 0.12 }, 0.04);
    tl.to(hl,     { opacity: 1, y: 0, filter: "blur(0px)", ease: "power3.out", duration: 0.14 }, 0.07);
    tl.to(sub_el, { opacity: 1, y: 0, filter: "blur(0px)", ease: "power3.out", duration: 0.11 }, 0.10);
    tl.to(st,     { opacity: 1, y: 0, filter: "blur(0px)", ease: "power3.out", duration: 0.11 }, 0.13);
    if (card) {
      tl.to(card,   { opacity: 1, y: 0, filter: "blur(0px)", rotateX: 0, ease: "power3.out", duration: 0.14 }, 0.15);
    }

    // HOLD 0.20→0.80 — no keyframes needed

    // EXIT 0.80→1.00
    tl.to(hl,     { opacity: 0, y: -60, filter: "blur(8px)", ease: "power2.in", duration: 0.10 }, 0.80);
    if (card) {
      tl.to(card,   { opacity: 0, y: -60, filter: "blur(12px)", rotateX: -10, ease: "power2.in", duration: 0.10 }, 0.81);
    }
    tl.to(sub_el, { opacity: 0, y: -45, filter: "blur(8px)", ease: "power2.in", duration: 0.09 }, 0.82);
    tl.to(st,     { opacity: 0, y: -40, filter: "blur(8px)", ease: "power2.in", duration: 0.09 }, 0.83);
    tl.to(tag_el, { opacity: 0, y: -30, filter: "blur(8px)", ease: "power2.in", duration: 0.08 }, 0.84);
    tl.to(vid,    { scale: 1.06, ease: "power2.in",  duration: 0.20 }, 0.80);

    tl.to({}, { duration: 0.001 }, 1);

    ScrollTrigger.create({
      trigger: section,
      start: "top top",
      end: "bottom bottom",
      scrub: 1.4,
      anticipatePin: 1,
      invalidateOnRefresh: true,
      animation: tl,
      onEnter:     () => onActive(),
      onEnterBack: () => onActive(),
      onUpdate:    (self) => onProgress(self.progress),
    });

    return () => {
      tl.kill();
      ScrollTrigger.getAll()
        .filter((t) => t.vars.trigger === section)
        .forEach((t) => t.kill());
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <section ref={sectionRef} style={{ height: "300vh", position: "relative" }} data-scene={n}>
      {/* ── Sticky 100vh stage ── */}
      <div className="sticky top-0 w-full bg-black overflow-hidden" style={{ height: "100vh" }}>

        {/* Video — no inline scale */}
        <video
          ref={videoRef}
          src={video}
          muted playsInline loop preload="auto"
          className="absolute inset-0 w-full h-full object-cover"
          style={{ transformOrigin: "center center", willChange: "transform" }}
        />

        {/* Particles z-10 */}
        <div className="absolute inset-0 pointer-events-none" style={{ zIndex: 10 }}>
          <FloatingParticles color={color} count={20} />
        </div>

        {/* Cinematic grading z-[11] */}
        <div className="absolute inset-0 pointer-events-none" style={{
          zIndex: 11,
          background: "linear-gradient(to bottom, rgba(0,0,0,0.5) 0%, rgba(0,0,0,0.08) 45%, rgba(0,0,0,0.65) 100%)",
        }} />
        <div className="absolute inset-0 pointer-events-none" style={{
          zIndex: 11,
          background: "linear-gradient(to right, rgba(0,0,0,0.6) 0%, transparent 52%, rgba(0,0,0,0.15) 100%)",
        }} />
        <div className="absolute inset-0 pointer-events-none" style={{
          zIndex: 11,
          background: color, opacity: 0.042, mixBlendMode: "color",
        }} />
        {/* Grid */}
        <div className="absolute inset-0 pointer-events-none" style={{
          zIndex: 11,
          backgroundImage: "linear-gradient(rgba(255,255,255,0.018) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.018) 1px,transparent 1px)",
          backgroundSize: "60px 60px",
        }} />

        {/* ── LEFT TEXT COLUMN — z-20 ── */}
        <div
          ref={leftRef}
          className="absolute flex flex-col gap-5"
          style={{ zIndex: 20, left: "6%", top: "50%", transform: "translateY(-50%)", maxWidth: 580 }}
        >
          {/* Tag */}
          <div
            ref={tagRef}
            className="self-start inline-flex items-center gap-2 px-4 py-1.5 rounded-full border text-[10px] font-black tracking-[0.22em] uppercase"
            style={{ color, borderColor: `${color}44`, background: `${color}0d`, backdropFilter: "blur(12px)" }}
          >
            {tag}
          </div>

          {/* Headline — last line = accent color */}
          <h2 ref={headlineRef} className="flex flex-col leading-[0.9] tracking-[-0.03em]">
            {headline.map((line, li) => (
              <span
                key={li}
                className="block font-black"
                style={{
                  fontSize: "clamp(2.8rem, 6.5vw, 8rem)",
                  color: li === headline.length - 1 ? color : "white",
                  textShadow: "0 2px 40px rgba(0,0,0,0.9)",
                }}
              >
                {line}
              </span>
            ))}
          </h2>

          {/* Sub */}
          <p
            ref={subRef}
            className="text-white/55 font-medium leading-relaxed"
            style={{ fontSize: "clamp(0.88rem, 1.2vw, 1.05rem)", maxWidth: 440 }}
          >
            {sub}
          </p>

          {/* Metrics */}
          <div ref={statsRef} className="flex gap-12">
            {stats.map((s, si) => (
              <div key={si} className="flex flex-col gap-0.5">
                <span
                  className="font-black leading-none"
                  style={{ fontSize: "clamp(1.6rem, 2.8vw, 2.4rem)", color }}
                >
                  {s.v}
                </span>
                <span className="text-white/30 text-[9px] font-black uppercase tracking-[0.16em]">
                  {s.l}
                </span>
              </div>
            ))}
          </div>

          {/* Scene 7 CTA */}
          {isFinal && (
            <button
              onClick={onEnterPortal}
              className="self-start flex items-center gap-2.5 px-7 py-3.5 rounded-2xl font-black text-black text-[11px] uppercase tracking-widest mt-2 cursor-pointer transition-all duration-300 hover:scale-[1.04] active:scale-[0.97]"
              style={{ background: "white", boxShadow: "0 0 50px rgba(255,255,255,0.2)" }}
            >
              <span>Enter Portal</span>
              <ArrowRight size={14} />
            </button>
          )}
        </div>

        {/* ── RIGHT GLASS CARD — z-20, anchored right:12% ── */}
        <div
          ref={cardRef}
          className="absolute hidden lg:block"
          style={{
            zIndex: 20,
            right: "6%",
            top: "50%",
            transform: "translateY(-50%)",
            width: "clamp(380px, 32vw, 520px)",
          }}
        >
          <div
            className="rounded-3xl border p-6 flex flex-col gap-0"
            style={{
              background: "rgba(8,8,14,0.38)",
              backdropFilter: "blur(28px) saturate(160%)",
              WebkitBackdropFilter: "blur(28px) saturate(160%)",
              borderColor: "rgba(255,255,255,0.08)",
              boxShadow: `0 30px 100px rgba(0,0,0,0.5), 0 0 0 1px ${color}16, inset 0 1px 0 rgba(255,255,255,0.05)`,
            }}
          >
            <SceneCard n={n} color={color} />

            {/* Journey progress */}
            <div className="mt-5 flex flex-col gap-1.5">
              <div className="flex justify-between text-[9px] text-white/20 font-black uppercase tracking-widest">
                <span>Journey</span>
                <span style={{ color }}>{n} / 7</span>
              </div>
              <div className="h-1 w-full rounded-full overflow-hidden" style={{ background: "rgba(255,255,255,0.06)" }}>
                <div
                  className="h-full rounded-full"
                  style={{ width: `${(n / 7) * 100}%`, background: `linear-gradient(to right, ${color}, ${color}66)` }}
                />
              </div>
            </div>

            {/* System status */}
            <div className="flex items-center gap-2 mt-4 pt-3 border-t" style={{ borderColor: "rgba(255,255,255,0.05)" }}>
              <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: "#10b981" }} />
              <span className="text-[9px] font-black tracking-widest uppercase" style={{ color: "rgba(255,255,255,0.18)" }}>
                System Active
              </span>
            </div>
          </div>
        </div>

        {/* Scene label bottom-center */}
        <div
          className="absolute left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 pointer-events-none select-none"
          style={{ zIndex: 30, bottom: 28 }}
        >
          <span className="text-[9px] font-black tracking-[0.28em] uppercase" style={{ color: `${color}48` }}>
            {tag}
          </span>
          <div className="w-px h-5" style={{ background: `linear-gradient(to bottom, ${color}38, transparent)` }} />
        </div>
      </div>
    </section>
  );
};

export default SceneBlock;
