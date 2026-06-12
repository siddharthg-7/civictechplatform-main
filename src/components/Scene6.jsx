import React from "react";
import * as Icons from "lucide-react";
import SceneSection from "./SceneSection";
import VideoBackground from "./VideoBackground";
import GlassCard from "./GlassCard";
import FloatingParticles from "./FloatingParticles";

const COLOR = "#f59e0b";

const Scene6 = ({ isActive, playVideo, sectionRef, textRef, cardRef, videoRef }) => {
  return (
    <div className="w-full h-full relative">
      <SceneSection ref={sectionRef} isInitialVisible={false} isActive={isActive}>
        <VideoBackground ref={videoRef} videoSrc="/Landingpage/scene6.mp4" isActive={playVideo} />
        <FloatingParticles color={COLOR} count={25} />

        <div className="absolute inset-0 pointer-events-none z-10 overflow-hidden">
          {[
            { icon: "Heart",        top: "15%", left: "25%", size: 44 },
            { icon: "Users",        top: "75%", left: "15%", size: 40 },
            { icon: "Award",        top: "20%", left: "80%", size: 48 },
            { icon: "BarChart3",    top: "70%", left: "80%", size: 38 },
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
                <Icons.Users size={10} />
                <span>Section 06 / Community Impact</span>
              </div>
              <h2 className="text-5xl md:text-6xl lg:text-7xl font-black text-white tracking-tight mb-4 leading-[0.95]">
                Community <span style={{ color: COLOR }}>Impact</span>
              </h2>
              <p className="text-white/60 text-lg font-medium leading-relaxed max-w-md">
                Transparent metrics. Public accountability. A city that earns trust through visible results.
              </p>
              <div className="h-1 w-24 rounded-full mt-6" style={{ background: `linear-gradient(to right, ${COLOR}, transparent)` }} />
            </div>

            <div ref={cardRef} className="flex-1 w-full max-w-lg">
              <GlassCard glowColor={COLOR}>
                <div className="p-8 flex flex-col gap-5">
                  <div className="flex items-center justify-between border-b border-white/5 pb-3">
                    <h3 className="text-white font-bold text-sm flex items-center gap-2">
                      <Icons.BarChart3 style={{ color: COLOR }} size={16} />
                      Performance Metrics
                    </h3>
                    <span className="text-[9px] text-white/30 font-mono font-bold">LIVE</span>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    {[
                      { label: "Resolution Rate", val: "98%",    c: COLOR },
                      { label: "Total Reports",   val: "24,500+", c: "#3b82f6" },
                    ].map(({ label, val, c }, i) => (
                      <div key={i} className="p-4 bg-white/5 border border-white/10 rounded-2xl text-center flex flex-col gap-1">
                        <span className="text-white/40 text-[9px] font-bold uppercase tracking-widest">{label}</span>
                        <span className="text-2xl font-black" style={{ color: c }}>{val}</span>
                      </div>
                    ))}
                  </div>

                  <div className="flex flex-col gap-2">
                    <div className="flex justify-between text-[10px] text-white/40 font-bold uppercase">
                      <span>SLA Compliance</span>
                      <span className="text-white">98%</span>
                    </div>
                    <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden border border-white/10">
                      <div className="h-full rounded-full" style={{ width: "98%", background: `linear-gradient(to right, ${COLOR}, #3b82f6)` }} />
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-[10px] text-white/40 font-bold tracking-widest pt-2 border-t border-white/5">
                    <span className="flex items-center gap-1.5"><Icons.Zap size={10} style={{ color: COLOR }} /> LIVE PROGRESSION</span>
                    <span style={{ color: COLOR }} className="font-mono">06 / 07</span>
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

export default Scene6;
