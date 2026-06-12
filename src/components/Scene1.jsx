import React, { useRef } from "react";
import * as Icons from "lucide-react";
import SceneSection from "./SceneSection";
import VideoBackground from "./VideoBackground";
import GlassCard from "./GlassCard";
import FloatingParticles from "./FloatingParticles";

const COLOR = "#f43f5e";

const Scene1 = ({ isActive, playVideo, sectionRef, textRef, cardRef, videoRef }) => {
  return (
    <div className="w-full h-full relative">
      <SceneSection ref={sectionRef} isInitialVisible={true} isActive={isActive}>
        <VideoBackground ref={videoRef} videoSrc="/Landingpage/scene1.mp4" isActive={playVideo} />
        <FloatingParticles color={COLOR} count={25} />

        {/* Floating icons */}
        <div className="absolute inset-0 pointer-events-none z-10 overflow-hidden">
          {[
            { icon: "AlertTriangle", top: "15%", left: "10%", size: 40 },
            { icon: "AlertOctagon",  top: "75%", left: "15%", size: 48 },
            { icon: "MapPin",        top: "25%", left: "80%", size: 36 },
            { icon: "EyeOff",        top: "70%", left: "75%", size: 52 },
          ].map(({ icon, top, left, size }, i) => {
            const Ic = Icons[icon] || Icons.Sparkles;
            return (
              <div
                key={i}
                className={`absolute transition-opacity duration-700 ${isActive ? "opacity-30" : "opacity-0"}`}
                style={{ top, left }}
              >
                <div className="animate-float" style={{ animationDelay: `${i * 1.5}s` }}>
                  <Ic size={size} style={{ color: COLOR, filter: `drop-shadow(0 0 12px ${COLOR}55)` }} />
                </div>
              </div>
            );
          })}
        </div>

        <div className="relative z-20 w-full max-w-7xl mx-auto px-6 md:px-12 lg:px-16 flex flex-col justify-center h-full">
          <div className="flex flex-col md:flex-row items-center gap-12 lg:gap-20 w-full">

            {/* Text */}
            <div ref={textRef} className="flex-1 flex flex-col items-start text-left">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest mb-4 border"
                style={{ color: COLOR, borderColor: `${COLOR}55`, background: `${COLOR}0a` }}>
                <Icons.AlertTriangle size={10} />
                <span>Section 01 / Problem Discovery</span>
              </div>
              <h2 className="text-5xl md:text-6xl lg:text-7xl font-black text-white tracking-tight mb-4 leading-[0.95]">
                Every City Has <span style={{ color: COLOR }}>Challenges</span>
              </h2>
              <p className="text-white/60 text-lg font-medium leading-relaxed max-w-md">
                Small issues affect thousands of citizens. Potholes. Broken lights. Ignored requests.
              </p>
              <div className="h-1 w-24 rounded-full mt-6" style={{ background: `linear-gradient(to right, ${COLOR}, transparent)` }} />
            </div>

            {/* Card */}
            <div ref={cardRef} className="flex-1 w-full max-w-lg">
              <GlassCard glowColor={COLOR}>
                <div className="p-8 flex flex-col gap-5">
                  <div className="flex items-center justify-between border-b border-white/5 pb-3">
                    <h3 className="text-white font-bold text-sm flex items-center gap-2">
                      <Icons.ShieldAlert style={{ color: COLOR }} size={16} />
                      Localized City Hazards
                    </h3>
                    <span className="px-2 py-0.5 rounded-full text-[9px] font-bold animate-pulse border"
                      style={{ color: COLOR, borderColor: `${COLOR}33`, background: `${COLOR}11` }}>
                      2 LIVE
                    </span>
                  </div>
                  {[
                    { icon: "AlertTriangle", label: "Critical Road Pothole", loc: "Sector 12 Main Road", status: "UNRESOLVED", c: "#f43f5e" },
                    { icon: "LightbulbOff",  label: "Broken Street Lights",  loc: "Park Plaza Intersection", status: "PENDING",    c: "#f59e0b" },
                  ].map(({ icon, label, loc, status, c }, i) => {
                    const Ic = Icons[icon];
                    return (
                      <div key={i} className="flex items-center gap-3.5 p-3.5 bg-white/5 border border-white/10 rounded-2xl hover:bg-white/10 transition-all hover:translate-x-1">
                        <div className="p-2.5 rounded-xl" style={{ background: `${c}15` }}>
                          <Ic size={16} style={{ color: c }} />
                        </div>
                        <div className="flex-1">
                          <p className="text-white text-xs font-bold">{label}</p>
                          <p className="text-white/40 text-[10px]">{loc}</p>
                        </div>
                        <span className="px-2 py-0.5 rounded-md text-[9px] font-bold" style={{ color: c, background: `${c}15` }}>{status}</span>
                      </div>
                    );
                  })}
                  <div className="flex items-center justify-between text-[10px] text-white/40 font-bold tracking-widest pt-2 border-t border-white/5">
                    <span className="flex items-center gap-1.5"><Icons.Zap size={10} style={{ color: COLOR }} /> LIVE PROGRESSION</span>
                    <span style={{ color: COLOR }} className="font-mono">01 / 07</span>
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

export default Scene1;
