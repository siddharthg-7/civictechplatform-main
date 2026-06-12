import React, { useRef } from "react";
import * as Icons from "lucide-react";
import SceneSection from "../components/SceneSection";
import VideoBackground from "../components/VideoBackground";
import GlassCard from "../components/GlassCard";
import { useParallax } from "../hooks/useParallax";

const Scene3 = ({ isActive, playVideo, sectionRef, textRef, cardRef, videoRef }) => {
  const localContainerRef = useRef(null);

  // Mouse Parallax
  useParallax(localContainerRef, ".scene-3-para", 0.06);
  useParallax(localContainerRef, ".scene-3-card", 0.025);

  const floatingIcons = [
    { icon: "Cpu", top: "15%", left: "20%", size: 52 },
    { icon: "Binary", top: "75%", left: "10%", size: 40 },
    { icon: "Network", top: "25%", left: "75%", size: 44 },
    { icon: "Zap", top: "70%", left: "85%", size: 48 }
  ];

  return (
    <div ref={localContainerRef} className="w-full h-full relative">
      <SceneSection ref={sectionRef} isInitialVisible={false} isActive={isActive}>
        <VideoBackground 
          ref={videoRef}
          videoSrc="/Landingpage/scene3.mp4" 
          isActive={playVideo} 
        />

        {/* Floating Icons */}
        <div className="absolute inset-0 pointer-events-none z-10 overflow-hidden">
          {floatingIcons.map((floatIcon, fIdx) => {
            const FloatIconComponent = Icons[floatIcon.icon] || Icons.Sparkles;
            return (
              <div
                key={fIdx}
                className={`scene-3-para absolute transition-opacity duration-700 ${isActive ? "opacity-35" : "opacity-0"}`}
                style={{
                  top: floatIcon.top,
                  left: floatIcon.left,
                }}
              >
                <div className="animate-float" style={{ animationDelay: `${fIdx * 1.5}s` }}>
                  <FloatIconComponent
                    size={floatIcon.size}
                    style={{
                      color: "#a855f7",
                      filter: "drop-shadow(0 0 12px rgba(168,85,247,0.35))",
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
              className="flex-1 flex flex-col items-start text-left opacity-0"
            >
              <div 
                className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest mb-4 border shadow-inner"
                style={{
                  color: "#a855f7",
                  borderColor: "rgba(168, 85, 247, 0.35)",
                  background: "rgba(168, 85, 247, 0.04)",
                }}
              >
                <Icons.Cpu size={10} />
                <span>SECTION 03 / AI ANALYSIS</span>
              </div>

              <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white tracking-tight mb-4 leading-[1.1] font-sans">
                AI-Powered Analysis
              </h2>

              <p className="text-slate-300 text-lg md:text-xl font-medium leading-relaxed max-w-xl">
                Every complaint is classified automatically.
              </p>
              
              <div 
                className="h-1 rounded-full w-24 mt-6"
                style={{
                  background: "linear-gradient(to right, #a855f7, transparent)",
                }}
              />
            </div>

            {/* Neural Dashboard inside Glass Card */}
            <div 
              ref={cardRef} 
              className="flex-1 w-full max-w-lg scene-3-card opacity-0"
            >
              <GlassCard glowColor="#a855f7" className="w-full">
                <div className="p-8 md:p-10 relative z-10">
                  
                  <div className="flex flex-col gap-4">
                    <div className="flex items-center justify-between border-b border-white/5 pb-3">
                      <h3 className="text-white font-bold text-base flex items-center gap-2">
                        <Icons.Cpu style={{ color: "#a855f7", animationDuration: '4s' }} className="animate-spin" />
                        Neural Engine Analysis
                      </h3>
                      <span className="px-2 py-0.5 bg-purple-500/10 text-[9px] text-purple-400 border border-purple-500/20 rounded-full font-bold">ACTIVE</span>
                    </div>
                    
                    <div className="relative h-36 bg-slate-950/80 border border-white/5 rounded-2xl p-4 flex flex-col justify-between overflow-hidden">
                      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(168,85,247,0.08),transparent_70%)]" />
                      
                      <div className="flex items-center justify-between z-10 text-[10px] font-mono">
                        <span className="text-slate-400">TICKET IDENTIFIER</span>
                        <span className="text-white font-bold">#49812_ROADS</span>
                      </div>

                      <div className="flex items-center justify-around my-2 py-1 z-10">
                        <div className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center relative">
                          <Icons.Image size={14} className="text-blue-400" />
                          <span className="analysis-particle absolute -right-3 w-1.5 h-1.5 bg-purple-400 rounded-full animate-pulse" />
                        </div>
                        
                        <Icons.ChevronRight size={14} className="text-slate-600 animate-pulse" />
                        
                        <div className="w-10 h-10 rounded-full bg-purple-500/15 border border-purple-500/40 flex items-center justify-center relative shadow-[0_0_20px_rgba(168,85,247,0.25)]">
                          <Icons.Brain size={18} className="text-purple-400" />
                          <span className="analysis-particle absolute -top-1 -right-1 w-2 h-2 bg-emerald-400 rounded-full animate-ping" />
                        </div>
                        
                        <Icons.ChevronRight size={14} className="text-slate-600 animate-pulse" />
                        
                        <div className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center relative">
                          <Icons.Tag size={14} className="text-emerald-400" />
                          <span className="analysis-particle absolute -left-3 w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse" />
                        </div>
                      </div>

                      <div className="flex items-center justify-between text-[10px] font-mono border-t border-white/5 pt-2 z-10">
                        <span className="text-slate-400">Class: Category 4 Pothole</span>
                        <span className="text-emerald-400 font-bold">99.8% Match</span>
                      </div>
                    </div>
                  </div>

                  <div className="h-[1px] w-full bg-white/5 my-4" />

                  <div className="flex items-center justify-between text-xs text-slate-400 font-semibold tracking-wider font-sans">
                    <span className="flex items-center gap-1.5">
                      <Icons.Zap size={12} style={{ color: "#a855f7" }} />
                      <span>LIVE PROGRESSION</span>
                    </span>
                    <span style={{ color: "#a855f7" }} className="font-mono font-bold font-bold">
                      03 / 07
                    </span>
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
