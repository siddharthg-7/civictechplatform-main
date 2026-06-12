import React from "react";
import * as Icons from "lucide-react";
import SceneSection from "./SceneSection";
import VideoBackground from "./VideoBackground";
import GlassCard from "./GlassCard";
import FloatingParticles from "./FloatingParticles";

const COLOR = "#a855f7";

const Scene3 = ({ isActive, playVideo, sectionRef, textRef, cardRef, videoRef }) => {
  return (
    <div className="w-full h-full relative">
      <SceneSection ref={sectionRef} isInitialVisible={false} isActive={isActive}>
        <VideoBackground ref={videoRef} videoSrc="/Landingpage/scene3.mp4" isActive={playVideo} />
        <FloatingParticles color={COLOR} count={25} />

        <div className="absolute inset-0 pointer-events-none z-10 overflow-hidden">
          {[
            { icon: "Cpu",     top: "15%", left: "20%", size: 52 },
            { icon: "Network", top: "75%", left: "10%", size: 40 },
            { icon: "Zap",     top: "25%", left: "75%", size: 44 },
            { icon: "Brain",   top: "70%", left: "85%", size: 48 },
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
                <Icons.Cpu size={10} />
                <span>Section 03 / AI Analysis</span>
              </div>
              <h2 className="text-5xl md:text-6xl lg:text-7xl font-black text-white tracking-tight mb-4 leading-[0.95]">
                AI-Powered <span style={{ color: COLOR }}>Intelligence</span>
              </h2>
              <p className="text-white/60 text-lg font-medium leading-relaxed max-w-md">
                Every complaint is classified, scored, and clustered by neural analysis in under 3 seconds.
              </p>
              <div className="h-1 w-24 rounded-full mt-6" style={{ background: `linear-gradient(to right, ${COLOR}, transparent)` }} />
            </div>

            <div ref={cardRef} className="flex-1 w-full max-w-lg">
              <GlassCard glowColor={COLOR}>
                <div className="p-8 flex flex-col gap-5">
                  <div className="flex items-center justify-between border-b border-white/5 pb-3">
                    <h3 className="text-white font-bold text-sm flex items-center gap-2">
                      <Icons.Cpu style={{ color: COLOR }} size={16} className="animate-spin" />
                      Neural Engine
                    </h3>
                    <span className="px-2 py-0.5 rounded-full text-[9px] font-bold border animate-pulse"
                      style={{ color: COLOR, borderColor: `${COLOR}33`, background: `${COLOR}11` }}>ACTIVE</span>
                  </div>

                  <div className="bg-black/40 border border-white/5 rounded-2xl p-4 flex flex-col gap-3">
                    <div className="flex items-center justify-between text-[10px] font-mono text-white/40">
                      <span>TICKET</span><span className="text-white">#49812_ROADS</span>
                    </div>
                    <div className="flex items-center justify-around py-2">
                      <div className="w-9 h-9 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center">
                        <Icons.Image size={14} style={{ color: "#3b82f6" }} />
                      </div>
                      <Icons.ChevronRight size={12} className="text-white/20 animate-pulse" />
                      <div className="w-11 h-11 rounded-full border flex items-center justify-center"
                        style={{ background: `${COLOR}18`, borderColor: `${COLOR}44`, boxShadow: `0 0 20px ${COLOR}33` }}>
                        <Icons.Brain size={18} style={{ color: COLOR }} />
                      </div>
                      <Icons.ChevronRight size={12} className="text-white/20 animate-pulse" />
                      <div className="w-9 h-9 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center">
                        <Icons.Tag size={14} style={{ color: "#10b981" }} />
                      </div>
                    </div>
                    <div className="flex items-center justify-between text-[10px] font-mono border-t border-white/5 pt-2">
                      <span className="text-white/40">Class: Category 4 Pothole</span>
                      <span style={{ color: "#10b981" }} className="font-bold">99.8% Match</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-[10px] text-white/40 font-bold tracking-widest pt-2 border-t border-white/5">
                    <span className="flex items-center gap-1.5"><Icons.Zap size={10} style={{ color: COLOR }} /> LIVE PROGRESSION</span>
                    <span style={{ color: COLOR }} className="font-mono">03 / 07</span>
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

export default Scene3;
