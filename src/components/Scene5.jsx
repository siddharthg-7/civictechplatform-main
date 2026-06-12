import React from "react";
import * as Icons from "lucide-react";
import SceneSection from "./SceneSection";
import VideoBackground from "./VideoBackground";
import GlassCard from "./GlassCard";
import FloatingParticles from "./FloatingParticles";

const COLOR = "#10b981";

const Scene5 = ({ isActive, playVideo, sectionRef, textRef, cardRef, videoRef }) => {
  return (
    <div className="w-full h-full relative">
      <SceneSection ref={sectionRef} isInitialVisible={false} isActive={isActive}>
        <VideoBackground ref={videoRef} videoSrc="/Landingpage/scene5.mp4" isActive={playVideo} />
        <FloatingParticles color={COLOR} count={25} />

        <div className="absolute inset-0 pointer-events-none z-10 overflow-hidden">
          {[
            { icon: "CheckSquare", top: "20%", left: "10%", size: 48 },
            { icon: "Wrench",      top: "70%", left: "15%", size: 42 },
            { icon: "Sparkles",    top: "30%", left: "85%", size: 36 },
            { icon: "ThumbsUp",    top: "65%", left: "75%", size: 44 },
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
                <Icons.Activity size={10} />
                <span>Section 05 / Resolution</span>
              </div>
              <h2 className="text-5xl md:text-6xl lg:text-7xl font-black text-white tracking-tight mb-4 leading-[0.95]">
                Rapid <span style={{ color: COLOR }}>Resolution</span>
              </h2>
              <p className="text-white/60 text-lg font-medium leading-relaxed max-w-md">
                Field teams receive tasks, upload proof of completion, and close the loop in real time.
              </p>
              <div className="h-1 w-24 rounded-full mt-6" style={{ background: `linear-gradient(to right, ${COLOR}, transparent)` }} />
            </div>

            <div ref={cardRef} className="flex-1 w-full max-w-lg">
              <GlassCard glowColor={COLOR}>
                <div className="p-8 flex flex-col gap-5">
                  <div className="flex items-center justify-between border-b border-white/5 pb-3">
                    <h3 className="text-white font-bold text-sm flex items-center gap-2">
                      <Icons.Activity style={{ color: COLOR }} size={16} />
                      Crew Verification
                    </h3>
                    <span className="px-2 py-0.5 rounded-full text-[9px] font-bold border"
                      style={{ color: COLOR, borderColor: `${COLOR}33`, background: `${COLOR}11` }}>IN PROGRESS</span>
                  </div>

                  {[
                    { icon: "CheckCircle2", label: "Dispatched",      time: "08:00 AM", note: "Crew assigned, routing optimized." },
                    { icon: "Wrench",       label: "Repairs Underway", time: "08:20 AM", note: "Asphalt leveled. QC in progress."   },
                  ].map(({ icon, label, time, note }, i) => {
                    const Ic = Icons[icon];
                    return (
                      <div key={i} className="flex items-start gap-3.5 p-3.5 rounded-2xl border" style={{ background: `${COLOR}0a`, borderColor: `${COLOR}22` }}>
                        <Ic size={16} style={{ color: COLOR }} className="mt-0.5 shrink-0" />
                        <div className="flex-1">
                          <div className="flex justify-between items-center mb-0.5">
                            <p className="text-white text-xs font-bold uppercase tracking-wider">{label}</p>
                            <span className="text-[9px] font-mono" style={{ color: COLOR }}>{time}</span>
                          </div>
                          <p className="text-white/40 text-[10px]">{note}</p>
                        </div>
                      </div>
                    );
                  })}

                  <div className="flex items-center justify-between text-[10px] text-white/40 font-bold tracking-widest pt-2 border-t border-white/5">
                    <span className="flex items-center gap-1.5"><Icons.Zap size={10} style={{ color: COLOR }} /> LIVE PROGRESSION</span>
                    <span style={{ color: COLOR }} className="font-mono">05 / 07</span>
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

export default Scene5;
