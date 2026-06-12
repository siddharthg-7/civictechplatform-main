import React from "react";
import * as Icons from "lucide-react";
import SceneSection from "./SceneSection";
import VideoBackground from "./VideoBackground";
import GlassCard from "./GlassCard";
import FloatingParticles from "./FloatingParticles";

const COLOR = "#06b6d4";

const Scene4 = ({ isActive, playVideo, sectionRef, textRef, cardRef, videoRef }) => {
  return (
    <div className="w-full h-full relative">
      <SceneSection ref={sectionRef} isInitialVisible={false} isActive={isActive}>
        <VideoBackground ref={videoRef} videoSrc="/Landingpage/scene4.mp4" isActive={playVideo} />
        <FloatingParticles color={COLOR} count={25} />

        <div className="absolute inset-0 pointer-events-none z-10 overflow-hidden">
          {[
            { icon: "Truck",       top: "25%", left: "15%", size: 46 },
            { icon: "Clock",       top: "80%", left: "25%", size: 36 },
            { icon: "Navigation2", top: "15%", left: "80%", size: 40 },
            { icon: "GitBranch",   top: "60%", left: "80%", size: 50 },
          ].map(({ icon, top, left, size }, i) => {
            const Ic = Icons[icon] || Icons.Sparkles;
            return (
              <div key={i} className={`absolute transition-opacity duration-700 ${isActive ? "opacity-30" : "opacity-0"}`} style={{ top, left }}>
                <div className="animate-float" style={{ animationDelay: `${i * 1.5}s` }}>
                  <Ic size={size} style={{ color: COLOR, filter: `drop-shadow(0 0 12px ${COLOR}55)` }} />
                </div>
              </div>
            );
          })}
        </div>

        <div className="relative z-20 w-full max-w-7xl mx-auto px-6 md:px-12 lg:px-16 flex flex-col justify-center h-full">
          <div className="flex flex-col md:flex-row items-center gap-12 lg:gap-20 w-full">

            <div ref={textRef} className="flex-1 flex flex-col items-start text-left">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest mb-4 border"
                style={{ color: COLOR, borderColor: `${COLOR}55`, background: `${COLOR}0a` }}>
                <Icons.GitBranch size={10} />
                <span>Section 04 / Smart Dispatch</span>
              </div>
              <h2 className="text-5xl md:text-6xl lg:text-7xl font-black text-white tracking-tight mb-4 leading-[0.95]">
                Smart Department <span style={{ color: COLOR }}>Routing</span>
              </h2>
              <p className="text-white/60 text-lg font-medium leading-relaxed max-w-md">
                Issues reach the right team in under 2 hours. Zero manual sorting needed.
              </p>
              <div className="h-1 w-24 rounded-full mt-6" style={{ background: `linear-gradient(to right, ${COLOR}, transparent)` }} />
            </div>

            <div ref={cardRef} className="flex-1 w-full max-w-lg">
              <GlassCard glowColor={COLOR}>
                <div className="p-8 flex flex-col gap-5">
                  <div className="flex items-center justify-between border-b border-white/5 pb-3">
                    <h3 className="text-white font-bold text-sm flex items-center gap-2">
                      <Icons.GitBranch style={{ color: COLOR }} size={16} />
                      Routing Matrix
                    </h3>
                    <span style={{ color: "#10b981" }} className="text-[9px] font-bold">DISPATCHING</span>
                  </div>

                  <div className="flex items-center justify-between gap-3 py-2">
                    {[
                      { icon: "FileText", label: "Complaint", c: COLOR },
                      { icon: "Cpu",      label: "Router",    c: "#a855f7" },
                      { icon: "Truck",    label: "Crew",      c: "#10b981" },
                    ].map(({ icon, label, c }, i) => {
                      const Ic = Icons[icon];
                      return (
                        <React.Fragment key={i}>
                          <div className="flex flex-col items-center gap-1.5 p-3 bg-white/5 border border-white/10 rounded-xl">
                            <Ic size={16} style={{ color: c }} />
                            <span className="text-white/40 text-[8px] uppercase font-bold">{label}</span>
                          </div>
                          {i < 2 && (
                            <div className="flex-1 h-px" style={{ background: `linear-gradient(to right, ${COLOR}44, ${COLOR})` }} />
                          )}
                        </React.Fragment>
                      );
                    })}
                  </div>

                  <p className="text-[11px] text-white/40 text-center font-mono bg-white/5 py-2.5 rounded-xl border border-white/5">
                    Assigned → Sanitation Crew #4 (Zone C)
                  </p>

                  <div className="flex items-center justify-between text-[10px] text-white/40 font-bold tracking-widest pt-2 border-t border-white/5">
                    <span className="flex items-center gap-1.5"><Icons.Zap size={10} style={{ color: COLOR }} /> LIVE PROGRESSION</span>
                    <span style={{ color: COLOR }} className="font-mono">04 / 07</span>
                  </div>
                </div>
              </GlassCard>
            </div>

          </div>
        </div>
      </SceneSection>
    </div>
  );
};

export default Scene4;
