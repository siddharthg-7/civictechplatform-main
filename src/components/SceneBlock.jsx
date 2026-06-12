import React, { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight, AlertTriangle, Smartphone, Brain, GitBranch, CheckCircle2, BarChart3, Sparkles, MapPin, LightbulbOff, Zap, Send, Camera, Cpu, ChevronRight, Tag, Image, Truck, Activity, Users, Award } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

// ─── Per-scene card content ────────────────────────────────────────────────
const SceneCard = ({ scene }) => {
  const { color: c, n } = scene;

  if (n === 1) return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between pb-3 border-b border-white/[0.07]">
        <span className="text-xs font-black flex items-center gap-2" style={{ color: c }}>
          <AlertTriangle size={13} /> City Hazards
        </span>
        <span className="text-[9px] font-black animate-pulse px-2 py-0.5 rounded-full border" style={{ color: c, borderColor: `${c}33`, background: `${c}11` }}>2 LIVE</span>
      </div>
      {[
        { label: "Critical Road Pothole", loc: "Sector 12 Main Road",       status: "UNRESOLVED", ic: AlertTriangle, sc: "#f43f5e" },
        { label: "Broken Street Lights",  loc: "Park Plaza Intersection",   status: "PENDING",    ic: LightbulbOff,  sc: "#f59e0b" },
      ].map(({ label, loc, status, ic: Ic, sc }, i) => (
        <div key={i} className="flex items-center gap-3 p-3 rounded-2xl border border-white/[0.07] bg-white/[0.03] hover:bg-white/[0.06] transition-colors">
          <div className="p-2 rounded-xl" style={{ background: `${sc}18` }}><Ic size={14} style={{ color: sc }} /></div>
          <div className="flex-1 min-w-0">
            <p className="text-white text-[11px] font-bold truncate">{label}</p>
            <p className="text-white/35 text-[9px]">{loc}</p>
          </div>
          <span className="text-[8px] font-black px-1.5 py-0.5 rounded" style={{ color: sc, background: `${sc}15` }}>{status}</span>
        </div>
      ))}
    </div>
  );

  if (n === 2) return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between pb-3 border-b border-white/[0.07]">
        <span className="text-xs font-black flex items-center gap-2" style={{ color: c }}>
          <Smartphone size={13} /> Report Submission
        </span>
        <span className="text-[9px] font-black animate-pulse" style={{ color: c }}>● LIVE</span>
      </div>
      <div className="flex flex-col gap-3 p-3 rounded-2xl border border-white/[0.07] bg-white/[0.03]">
        <div className="h-16 w-full rounded-xl flex flex-col items-center justify-center gap-1 border border-dashed border-white/15">
          <Camera size={16} style={{ color: c }} className="animate-pulse" />
          <span className="text-white/30 text-[9px]">Upload Photo / Video</span>
        </div>
        <div className="flex items-center gap-2 bg-white/[0.04] p-2.5 rounded-xl border border-white/[0.06]">
          <MapPin size={10} style={{ color: c }} className="animate-bounce" />
          <div>
            <p className="text-white text-[9px] font-bold">Active GPS Pin</p>
            <p className="text-white/30 text-[8px] font-mono">28.6139°N, 77.2090°E</p>
          </div>
        </div>
        <button type="button" className="w-full py-2 rounded-xl text-white font-black text-[9px] flex items-center justify-center gap-1.5 uppercase tracking-wider" style={{ background: c }}>
          <Send size={9} /> Submit Report
        </button>
      </div>
    </div>
  );

  if (n === 3) return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between pb-3 border-b border-white/[0.07]">
        <span className="text-xs font-black flex items-center gap-2" style={{ color: c }}>
          <Cpu size={13} className="animate-spin" style={{ animationDuration: "4s" }} /> Neural Engine
        </span>
        <span className="text-[9px] font-black px-2 py-0.5 rounded-full border animate-pulse" style={{ color: c, borderColor: `${c}33`, background: `${c}11` }}>ACTIVE</span>
      </div>
      <div className="flex flex-col gap-3 p-3 rounded-2xl border border-white/[0.07] bg-white/[0.03]">
        <div className="flex items-center justify-between text-[9px] font-mono text-white/30">
          <span>TICKET</span><span className="text-white">#49812_ROADS</span>
        </div>
        <div className="flex items-center justify-around py-2">
          <div className="w-8 h-8 rounded-xl bg-white/[0.05] border border-white/10 flex items-center justify-center">
            <Image size={13} className="text-blue-400" />
          </div>
          <ChevronRight size={11} className="text-white/20 animate-pulse" />
          <div className="w-10 h-10 rounded-full flex items-center justify-center border" style={{ background: `${c}18`, borderColor: `${c}44`, boxShadow: `0 0 20px ${c}33` }}>
            <Brain size={16} style={{ color: c }} />
          </div>
          <ChevronRight size={11} className="text-white/20 animate-pulse" />
          <div className="w-8 h-8 rounded-xl bg-white/[0.05] border border-white/10 flex items-center justify-center">
            <Tag size={13} className="text-emerald-400" />
          </div>
        </div>
        <div className="flex items-center justify-between text-[9px] font-mono border-t border-white/[0.07] pt-2">
          <span className="text-white/30">Category 4 Pothole</span>
          <span style={{ color: "#10b981" }} className="font-black">99.8% Match</span>
        </div>
      </div>
    </div>
  );

  if (n === 4) return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between pb-3 border-b border-white/[0.07]">
        <span className="text-xs font-black flex items-center gap-2" style={{ color: c }}>
          <GitBranch size={13} /> Routing Matrix
        </span>
        <span style={{ color: "#10b981" }} className="text-[9px] font-black">DISPATCHING</span>
      </div>
      <div className="flex items-center justify-between gap-2 py-2">
        {[{ label: "Complaint", icon: AlertTriangle, col: c }, { label: "Router", icon: Cpu, col: "#a855f7" }, { label: "Crew", icon: Truck, col: "#10b981" }].map(({ label, icon: Ic, col }, i, arr) => (
          <React.Fragment key={i}>
            <div className="flex flex-col items-center gap-1.5 p-2.5 bg-white/[0.04] border border-white/[0.07] rounded-xl">
              <Ic size={14} style={{ color: col }} />
              <span className="text-white/30 text-[8px] uppercase font-black">{label}</span>
            </div>
            {i < arr.length - 1 && (
              <div className="flex-1 h-px" style={{ background: `linear-gradient(to right, ${c}44, ${c})` }} />
            )}
          </React.Fragment>
        ))}
      </div>
      <p className="text-[10px] text-white/30 text-center font-mono bg-white/[0.03] py-2 rounded-xl border border-white/[0.06]">
        Assigned → Sanitation Crew #4 (Zone C)
      </p>
    </div>
  );

  if (n === 5) return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between pb-3 border-b border-white/[0.07]">
        <span className="text-xs font-black flex items-center gap-2" style={{ color: c }}>
          <Activity size={13} /> Crew Verification
        </span>
        <span className="text-[9px] font-black px-2 py-0.5 rounded-full border" style={{ color: c, borderColor: `${c}33`, background: `${c}11` }}>IN PROGRESS</span>
      </div>
      {[
        { icon: CheckCircle2, label: "Dispatched",       time: "08:00 AM", note: "Crew assigned, routing optimized." },
        { icon: Zap,          label: "Repairs Underway", time: "08:20 AM", note: "Asphalt leveled. QC in progress."  },
      ].map(({ icon: Ic, label, time, note }, i) => (
        <div key={i} className="flex items-start gap-3 p-3 rounded-2xl border" style={{ background: `${c}09`, borderColor: `${c}22` }}>
          <Ic size={14} style={{ color: c }} className="mt-0.5 shrink-0" />
          <div className="flex-1">
            <div className="flex items-center justify-between mb-0.5">
              <p className="text-white text-[10px] font-black uppercase tracking-wider">{label}</p>
              <span className="text-[8px] font-mono" style={{ color: c }}>{time}</span>
            </div>
            <p className="text-white/35 text-[9px]">{note}</p>
          </div>
        </div>
      ))}
    </div>
  );

  if (n === 6) return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between pb-3 border-b border-white/[0.07]">
        <span className="text-xs font-black flex items-center gap-2" style={{ color: c }}>
          <BarChart3 size={13} /> Performance
        </span>
        <span className="text-[9px] text-white/20 font-mono font-black">LIVE</span>
      </div>
      <div className="grid grid-cols-2 gap-3">
        {[{ label: "Resolution Rate", val: "98%", col: c }, { label: "Total Reports", val: "24.5K", col: "#3b82f6" }].map(({ label, val, col }, i) => (
          <div key={i} className="p-3 bg-white/[0.04] border border-white/[0.07] rounded-2xl text-center">
            <p className="text-white/30 text-[9px] font-black uppercase tracking-widest mb-1">{label}</p>
            <p className="font-black text-xl" style={{ color: col }}>{val}</p>
          </div>
        ))}
      </div>
      <div className="flex flex-col gap-1.5">
        <div className="flex justify-between text-[9px] text-white/25 font-black uppercase">
          <span>SLA Compliance</span><span className="text-white">98%</span>
        </div>
        <div className="h-1.5 w-full bg-white/[0.06] rounded-full overflow-hidden">
          <div className="h-full rounded-full" style={{ width: "98%", background: `linear-gradient(to right, ${c}, #3b82f6)` }} />
        </div>
      </div>
    </div>
  );

  // n === 7
  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between pb-3 border-b border-white/[0.07]">
        <span className="text-xs font-black flex items-center gap-2 text-white/60">
          <Sparkles size={13} className="text-white/40" /> Smart Governance
        </span>
        <Users size={13} className="text-white/25" />
      </div>
      <div className="flex flex-col gap-3">
        {[
          { label: "Active Cities",    val: "142",     col: "rgba(255,255,255,0.7)" },
          { label: "Citizens Joined",  val: "2.4M+",   col: "rgba(255,255,255,0.7)" },
          { label: "Issues Resolved",  val: "98%",     col: "#10b981"               },
          { label: "Avg Response",     val: "< 48hr",  col: "rgba(255,255,255,0.7)" },
        ].map(({ label, val, col }, i) => (
          <div key={i} className="flex items-center justify-between py-1.5 border-b border-white/[0.05]">
            <span className="text-white/30 text-[10px] font-medium">{label}</span>
            <span className="text-[11px] font-black" style={{ color: col }}>{val}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

// ─── SceneBlock ────────────────────────────────────────────────────────────
const SceneBlock = ({ scene, index, onActive, onProgress, onEnterPortal }) => {
  const sectionRef  = useRef(null);
  const videoRef    = useRef(null);
  const overlayRef  = useRef(null);
  const headlineRef = useRef(null);
  const subRef      = useRef(null);
  const statsRef    = useRef(null);
  const cardRef     = useRef(null);
  const tagRef      = useRef(null);

  const { color, tag, headline, sub, stats, video, isFinal } = scene;

  // ── Video: play when section is visible, pause when not ─────────────────
  useEffect(() => {
    const vid = videoRef.current;
    const sec = sectionRef.current;
    if (!vid || !sec) return;

    vid.muted       = true;
    vid.loop        = true;
    vid.playsInline = true;
    vid.preload     = "auto";

    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) vid.play().catch(() => {});
        else vid.pause();
      },
      { threshold: 0.05 }
    );
    obs.observe(sec);
    return () => obs.disconnect();
  }, []);

  // ── ScrollTrigger: scrub timeline 0 → 1 over 300vh ──────────────────────
  useEffect(() => {
    const section  = sectionRef.current;
    const overlay  = overlayRef.current;
    const headline = headlineRef.current;
    const sub_el   = subRef.current;
    const stats_el = statsRef.current;
    const card     = cardRef.current;
    const tagEl    = tagRef.current;
    const vid      = videoRef.current;

    if (!section || !overlay || !headline || !sub_el || !stats_el || !card || !tagEl || !vid) return;

    // ── Initial state: everything hidden ──
    gsap.set([tagEl, headline, sub_el, stats_el, card], { opacity: 0, y: 55, force3D: true });
    gsap.set(vid, { scale: 1.12, force3D: true });

    // ── Timeline: 0→0.2 entry | 0.2→0.8 hold | 0.8→1.0 exit ──
    const tl = gsap.timeline({ paused: true });

    // Entry (0 → 0.2)
    tl.to(vid,      { scale: 1.0,  ease: "power2.out", duration: 0.20 }, 0.00);
    tl.to(tagEl,    { opacity: 1, y: 0, ease: "power3.out", duration: 0.12 }, 0.05);
    tl.to(headline, { opacity: 1, y: 0, ease: "power3.out", duration: 0.13 }, 0.07);
    tl.to(sub_el,   { opacity: 1, y: 0, ease: "power3.out", duration: 0.11 }, 0.10);
    tl.to(stats_el, { opacity: 1, y: 0, ease: "power3.out", duration: 0.11 }, 0.12);
    tl.to(card,     { opacity: 1, y: 0, ease: "power3.out", duration: 0.13 }, 0.14);

    // Hold (0.2 → 0.8): nothing — elements stay fully visible

    // Exit (0.8 → 1.0)
    tl.to(tagEl,    { opacity: 0, y: -28, ease: "power2.in", duration: 0.08 }, 0.84);
    tl.to(headline, { opacity: 0, y: -50, ease: "power2.in", duration: 0.10 }, 0.80);
    tl.to(sub_el,   { opacity: 0, y: -38, ease: "power2.in", duration: 0.09 }, 0.82);
    tl.to(stats_el, { opacity: 0, y: -38, ease: "power2.in", duration: 0.09 }, 0.83);
    tl.to(card,     { opacity: 0, y: -48, ease: "power2.in", duration: 0.10 }, 0.81);
    tl.to(vid,      { scale: 1.10, ease: "power2.in",  duration: 0.20 }, 0.80);

    // Pad to exactly duration=1
    tl.to({}, { duration: 0.001 }, 1);

    ScrollTrigger.create({
      trigger:    section,
      start:      "top top",
      end:        "bottom bottom",
      scrub:      1.4,
      animation:  tl,
      onEnter:     () => onActive(),
      onEnterBack: () => onActive(),
      onUpdate:   (self) => onProgress(self.progress),
    });

    return () => {
      tl.kill();
      ScrollTrigger.getAll()
        .filter((t) => t.vars.trigger === section)
        .forEach((t) => t.kill());
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const c = color;

  return (
    <section
      ref={sectionRef}
      style={{ height: "300vh", position: "relative" }}
    >
      {/* ── Sticky fullscreen stage ── */}
      <div className="sticky top-0 w-full bg-black overflow-hidden" style={{ height: "100vh" }}>

        {/* Video */}
        <video
          ref={videoRef}
          src={video}
          muted playsInline loop preload="auto"
          className="absolute inset-0 w-full h-full object-cover"
          style={{ transform: "scale(1.12)", transformOrigin: "center center", willChange: "transform" }}
        />

        {/* Cinematic grading */}
        <div className="absolute inset-0 pointer-events-none" style={{ background: "linear-gradient(to bottom, rgba(0,0,0,0.52) 0%, rgba(0,0,0,0.12) 45%, rgba(0,0,0,0.65) 100%)" }} />
        <div className="absolute inset-0 pointer-events-none" style={{ background: "linear-gradient(to right, rgba(0,0,0,0.58) 0%, transparent 55%, rgba(0,0,0,0.18) 100%)" }} />
        {/* Accent color tint */}
        <div className="absolute inset-0 pointer-events-none" style={{ background: c, opacity: 0.055, mixBlendMode: "color" }} />
        {/* Grid */}
        <div className="absolute inset-0 pointer-events-none" style={{
          backgroundImage: "linear-gradient(rgba(255,255,255,0.022) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.022) 1px,transparent 1px)",
          backgroundSize: "60px 60px",
        }} />

        {/* ── Overlay ── */}
        <div ref={overlayRef} className="absolute inset-0 z-20 flex items-center">
          <div className="w-full max-w-7xl mx-auto px-8 md:px-14 flex flex-col md:flex-row items-center gap-14 md:gap-20">

            {/* Left — narrative */}
            <div className="flex-1 flex flex-col gap-5 max-w-[560px]">

              {/* Scene tag */}
              <div
                ref={tagRef}
                className="self-start inline-flex items-center gap-2 px-4 py-1.5 rounded-full border text-[10px] font-black tracking-[0.22em] uppercase"
                style={{ color: c, borderColor: `${c}44`, background: `${c}0d`, backdropFilter: "blur(12px)" }}
              >
                {tag}
              </div>

              {/* Headline */}
              <h2 ref={headlineRef} className="flex flex-col leading-[0.88] tracking-[-0.03em]">
                {headline.map((line, li) => (
                  <span
                    key={li}
                    className="block font-black"
                    style={{
                      fontSize: "clamp(2.8rem, 6.5vw, 6rem)",
                      color: li === headline.length - 1 ? c : "white",
                      textShadow: "0 2px 40px rgba(0,0,0,0.85)",
                    }}
                  >
                    {line}
                  </span>
                ))}
              </h2>

              {/* Sub copy */}
              <p
                ref={subRef}
                className="text-white/55 font-medium leading-relaxed max-w-[400px]"
                style={{ fontSize: "clamp(0.88rem, 1.25vw, 1.05rem)" }}
              >
                {sub}
              </p>

              {/* Stats */}
              <div ref={statsRef} className="flex gap-8">
                {stats.map((s, si) => (
                  <div key={si} className="flex flex-col gap-0.5">
                    <span className="font-black leading-none" style={{ fontSize: "clamp(1.5rem, 2.8vw, 2.2rem)", color: c }}>
                      {s.v}
                    </span>
                    <span className="text-white/30 text-[9px] font-black uppercase tracking-[0.16em]">{s.l}</span>
                  </div>
                ))}
              </div>

              {/* Final scene CTA */}
              {isFinal && (
                <button
                  onClick={onEnterPortal}
                  className="self-start flex items-center gap-2.5 px-7 py-3.5 rounded-2xl font-black text-black text-[11px] uppercase tracking-widest mt-2 cursor-pointer transition-all duration-300 hover:scale-[1.04] active:scale-[0.97]"
                  style={{ background: "white", boxShadow: "0 0 50px rgba(255,255,255,0.2)" }}
                >
                  <span>Enter Portal</span>
                  <ArrowRight size={13} />
                </button>
              )}
            </div>

            {/* Right — glass card */}
            <div ref={cardRef} className="hidden lg:block w-[290px] xl:w-[330px] shrink-0">
              <div
                className="rounded-[1.75rem] border border-white/[0.09] p-6 flex flex-col gap-0"
                style={{
                  background: "rgba(0,0,0,0.52)",
                  backdropFilter: "blur(28px) saturate(160%)",
                  WebkitBackdropFilter: "blur(28px) saturate(160%)",
                  boxShadow: `0 25px 60px rgba(0,0,0,0.7), 0 0 0 1px ${c}18, inset 0 1px 0 rgba(255,255,255,0.05)`,
                }}
              >
                <SceneCard scene={scene} />

                {/* Journey progress bar */}
                <div className="mt-5 flex flex-col gap-2">
                  <div className="flex justify-between text-[9px] text-white/25 font-black uppercase tracking-widest">
                    <span>Journey</span>
                    <span style={{ color: c }}>{scene.n} / 7</span>
                  </div>
                  <div className="h-1 w-full bg-white/[0.06] rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all duration-700"
                      style={{ width: `${(scene.n / 7) * 100}%`, background: `linear-gradient(to right, ${c}, ${c}88)` }}
                    />
                  </div>
                </div>

                {/* Status indicator */}
                <div className="flex items-center gap-2 mt-4 pt-3 border-t border-white/[0.05]">
                  <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: "#10b981" }} />
                  <span className="text-white/20 text-[9px] font-black tracking-widest uppercase">System Active</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom scene label */}
        <div className="absolute bottom-7 left-1/2 -translate-x-1/2 z-30 flex flex-col items-center gap-1.5 pointer-events-none">
          <span className="text-[9px] font-black tracking-[0.28em] uppercase" style={{ color: `${c}55` }}>{tag}</span>
          <div className="w-px h-5" style={{ background: `linear-gradient(to bottom, ${c}40, transparent)` }} />
        </div>
      </div>
    </section>
  );
};

export default SceneBlock;
