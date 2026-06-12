import React from "react";
import * as Icons from "lucide-react";
import SceneSection from "./SceneSection";
import VideoBackground from "./VideoBackground";
import GlassCard from "./GlassCard";
import FloatingParticles from "./FloatingParticles";

const COLOR = "#3b82f6";

const Scene2 = ({ isActive, playVideo, sectionRef, textRef, cardRef, videoRef }) => {
  return (
    <div className="w-full h-full relative">
      <SceneSection ref={sectionRef} isInitialVisible={false} isActive={isActive}>
        <VideoBackground ref={videoRef} videoSrc="/Landingpage/scene2.mp4" isActive={playVideo} />
        <FloatingParticles color={COLOR} count={25} />

        <div className="absolute inset-0 pointer-events-none z-10 overflow-hidden">
          {[
            { icon: "Upload",   top: "20%", left: "12%", size: 44 },
            { icon: "FileText", top: "80%", left: "20%", size: 38 },
            { icon: "Send",     top: "30%", left: "85%", size: 42 },
            { icon: "Camera",   top: "65%", left: "70%", size: 46 },
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
                <Icons.Camera size={10} />
                <span>Section 02 / Citizen Reporting</span>
              </div>
              <h2 className="text-5xl md:text-6xl lg:text-7xl font-black text-white tracking-tight mb-4 leading-[0.95]">
                Report Issues <span style={{ color: COLOR }}>Instantly</span>
              </h2>
              <p className="text-white/60 text-lg font-medium leading-relaxed max-w-md">
                One tap. Photo. Location. Category. Citizens become active participants in city governance.
              </p>
              <div className="h-1 w-24 rounded-full mt-6" style={{ background: `linear-gradient(to right, ${COLOR}, transparent)` }} />
            </div>

            <div ref={cardRef} className="flex-1 w-full max-w-lg">
              <GlassCard glowColor={COLOR}>
                <div className="p-8 flex flex-col gap-5">
                  <div className="flex items-center justify-between border-b border-white/5 pb-3">
                    <h3 className="text-white font-bold text-sm flex items-center gap-2">
                      <Icons.Smartphone style={{ color: COLOR }} size={16} />
                      Civic Report Submission
                    </h3>
                    <span className="text-[9px] font-bold animate-pulse" style={{ color: COLOR }}>● LIVE</span>
                  </div>

                  {/* Phone mockup simplified */}
                  <div className="bg-black/50 border border-white/10 rounded-2xl p-4 flex flex-col gap-3">
                    <div className="h-20 w-full bg-white/5 rounded-xl flex flex-col items-center justify-center gap-1.5 border border-dashed border-white/20">
                      <Icons.Camera size={18} style={{ color: COLOR }} className="animate-pulse" />
                      <span className="text-white/40 text-[9px]">Upload Photo / Video</span>
                    </div>
                    <div className="flex items-center gap-2 bg-white/5 p-2.5 rounded-xl border border-white/5">
                      <Icons.MapPin size={10} style={{ color: COLOR }} className="animate-bounce" />
                      <div>
                        <p className="text-white text-[9px] font-bold">Active GPS Pin</p>
                        <p className="text-white/40 text-[8px] font-mono">28.6139°N, 77.2090°E</p>
                      </div>
                    </div>
                    <button type="button" className="w-full py-2.5 rounded-xl text-white font-bold text-[10px] flex items-center justify-center gap-1.5 cursor-pointer"
                      style={{ background: COLOR }}>
                      <Icons.Send size={10} /> Submit Report
                    </button>
                  </div>

                  <div className="flex items-center justify-between text-[10px] text-white/40 font-bold tracking-widest pt-2 border-t border-white/5">
                    <span className="flex items-center gap-1.5"><Icons.Zap size={10} style={{ color: COLOR }} /> LIVE PROGRESSION</span>
                    <span style={{ color: COLOR }} className="font-mono">02 / 07</span>
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

export default Scene2;
