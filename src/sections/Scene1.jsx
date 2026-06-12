import React, { useRef } from "react";
import * as Icons from "lucide-react";
import SceneSection from "../components/SceneSection";
import VideoBackground from "../components/VideoBackground";
import GlassCard from "../components/GlassCard";
import { useParallax } from "../hooks/useParallax";

const Scene1 = ({ isActive, playVideo, sectionRef, textRef, cardRef, videoRef }) => {
  const localContainerRef = useRef(null);

  // Mouse Parallax
  useParallax(localContainerRef, ".scene-1-para", 0.06);
  useParallax(localContainerRef, ".scene-1-card", 0.025);

  const floatingIcons = [
    { icon: "AlertTriangle", top: "15%", left: "10%", size: 40 },
    { icon: "AlertOctagon", top: "75%", left: "15%", size: 48 },
    { icon: "MapPin", top: "25%", left: "80%", size: 36 },
    { icon: "EyeOff", top: "70%", left: "75%", size: 52 }
  ];

  return (
    <div ref={localContainerRef} className="w-full h-full relative">
      <SceneSection ref={sectionRef} isInitialVisible={true} isActive={isActive}>
        <VideoBackground 
          ref={videoRef}
          videoSrc="/Landingpage/scene1.mp4" 
          isActive={playVideo} 
        />

        {/* Floating Icons */}
        <div className="absolute inset-0 pointer-events-none z-10 overflow-hidden">
          {floatingIcons.map((floatIcon, fIdx) => {
            const FloatIconComponent = Icons[floatIcon.icon] || Icons.Sparkles;
            return (
              <div
                key={fIdx}
                className={`scene-1-para absolute transition-opacity duration-700 ${isActive ? "opacity-35" : "opacity-0"}`}
                style={{
                  top: floatIcon.top,
                  left: floatIcon.left,
                }}
              >
                <div className="animate-float" style={{ animationDelay: `${fIdx * 1.5}s` }}>
                  <FloatIconComponent
                    size={floatIcon.size}
                    style={{
                      color: "#f43f5e",
                      filter: "drop-shadow(0 0 12px rgba(244,63,94,0.35))",
                    }}
                  />
                </div>
              </div>
            );
          })}
        </div>

        <div className="relative z-20 w-full max-w-7xl mx-auto px-6 md:px-12 lg:px-16 flex flex-col justify-center h-full">
          <div className="flex flex-col md:flex-row items-center gap-12 lg:gap-20 w-full">
            
            {/* Narrative Column */}
            <div 
              ref={textRef} 
              className="flex-1 flex flex-col items-start text-left opacity-100"
            >
              <div 
                className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest mb-4 border shadow-inner"
                style={{
                  color: "#f43f5e",
                  borderColor: "rgba(244, 63, 94, 0.35)",
                  background: "rgba(244, 63, 94, 0.04)",
                }}
              >
                <Icons.AlertTriangle size={10} />
                <span>SECTION 01 / PROBLEM DISCOVERY</span>
              </div>

              <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white tracking-tight mb-4 leading-[1.1] font-sans">
                Every City Has Challenges
              </h2>

              <p className="text-slate-300 text-lg md:text-xl font-medium leading-relaxed max-w-xl">
                Small issues affect thousands of citizens.
              </p>
              
              <div 
                className="h-1 rounded-full w-24 mt-6"
                style={{
                  background: "linear-gradient(to right, #f43f5e, transparent)",
                }}
              />
            </div>

            {/* Interactive Visual Card */}
            <div 
              ref={cardRef} 
              className="flex-1 w-full max-w-lg scene-1-card opacity-100"
            >
              <GlassCard glowColor="#f43f5e" className="w-full">
                <div className="p-8 md:p-10 relative z-10">
                  <div className="flex flex-col gap-5">
                    <div className="flex items-center justify-between border-b border-white/5 pb-3">
                      <h3 className="text-white font-bold text-base flex items-center gap-2">
                        <Icons.ShieldAlert style={{ color: "#f43f5e" }} size={18} />
                        Localized City Hazards
                      </h3>
                      <span className="px-2 py-0.5 bg-red-500/10 text-[9px] text-red-400 border border-red-500/20 rounded-full font-bold animate-pulse">2 LIVE</span>
                    </div>
                    
                    <div className="flex flex-col gap-3">
                      <div className="flex items-center gap-3.5 p-3.5 bg-white/5 border border-white/10 rounded-2xl hover:bg-white/10 transition-all duration-300 hover:translate-x-1">
                        <div className="p-2.5 bg-rose-500/10 rounded-xl text-rose-500">
                          <Icons.AlertTriangle size={18} />
                        </div>
                        <div className="flex-1">
                          <h4 className="text-white text-xs font-bold font-sans">Critical Road Pothole</h4>
                          <span className="text-[10px] text-slate-400">Sector 12 Main Road Bypass</span>
                        </div>
                        <span className="px-2 py-0.5 bg-rose-500/15 text-[9px] text-rose-400 rounded-md font-bold">UNRESOLVED</span>
                      </div>
                      
                      <div className="flex items-center gap-3.5 p-3.5 bg-white/5 border border-white/10 rounded-2xl hover:bg-white/10 transition-all duration-300 hover:translate-x-1">
                        <div className="p-2.5 bg-amber-500/10 rounded-xl text-amber-500">
                          <Icons.LightbulbOff size={18} />
                        </div>
                        <div className="flex-1">
                          <h4 className="text-white text-xs font-bold font-sans">Broken Street Lights</h4>
                          <span className="text-[10px] text-slate-400">Park Plaza Main Intersection</span>
                        </div>
                        <span className="px-2 py-0.5 bg-amber-500/15 text-[9px] text-amber-400 rounded-md font-bold">PENDING</span>
                      </div>
                    </div>

                    <div className="h-[1px] w-full bg-white/5 my-4" />

                    <div className="flex items-center justify-between text-xs text-slate-400 font-semibold tracking-wider font-sans">
                      <span className="flex items-center gap-1.5">
                        <Icons.Zap size={12} style={{ color: "#f43f5e" }} />
                        <span>LIVE PROGRESSION</span>
                      </span>
                      <span style={{ color: "#f43f5e" }} className="font-mono font-bold font-bold">
                        01 / 07
                      </span>
                    </div>
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
