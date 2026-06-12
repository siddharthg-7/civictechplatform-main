import React, { useRef } from "react";
import * as Icons from "lucide-react";
import SceneSection from "../components/SceneSection";
import VideoBackground from "../components/VideoBackground";
import GlassCard from "../components/GlassCard";
import { useParallax } from "../hooks/useParallax";

const Scene5 = ({ isActive, playVideo, sectionRef, textRef, cardRef, videoRef }) => {
  const localContainerRef = useRef(null);

  // Mouse Parallax
  useParallax(localContainerRef, ".scene-5-para", 0.06);
  useParallax(localContainerRef, ".scene-5-card", 0.025);

  const floatingIcons = [
    { icon: "CheckSquare", top: "20%", left: "10%", size: 48 },
    { icon: "Wrench", top: "70%", left: "15%", size: 42 },
    { icon: "Sparkles", top: "30%", left: "85%", size: 36 },
    { icon: "ThumbsUp", top: "65%", left: "75%", size: 44 }
  ];

  return (
    <div ref={localContainerRef} className="w-full h-full relative">
      <SceneSection ref={sectionRef} isInitialVisible={false} isActive={isActive}>
        <VideoBackground 
          ref={videoRef}
          videoSrc="/Landingpage/scene5.mp4" 
          isActive={playVideo} 
        />

        {/* Floating Icons */}
        <div className="absolute inset-0 pointer-events-none z-10 overflow-hidden">
          {floatingIcons.map((floatIcon, fIdx) => {
            const FloatIconComponent = Icons[floatIcon.icon] || Icons.Sparkles;
            return (
              <div
                key={fIdx}
                className={`scene-5-para absolute transition-opacity duration-700 ${isActive ? "opacity-35" : "opacity-0"}`}
                style={{
                  top: floatIcon.top,
                  left: floatIcon.left,
                }}
              >
                <div className="animate-float" style={{ animationDelay: `${fIdx * 1.5}s` }}>
                  <FloatIconComponent
                    size={floatIcon.size}
                    style={{
                      color: "#10b981",
                      filter: "drop-shadow(0 0 12px rgba(16,185,129,0.35))",
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
                  color: "#10b981",
                  borderColor: "rgba(16, 185, 129, 0.35)",
                  background: "rgba(16, 185, 129, 0.04)",
                }}
              >
                <Icons.Activity size={10} />
                <span>SECTION 05 / ISSUE RESOLUTION</span>
              </div>

              <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white tracking-tight mb-4 leading-[1.1] font-sans">
                Rapid Resolution
              </h2>

              <p className="text-slate-300 text-lg md:text-xl font-medium leading-relaxed max-w-xl">
                Field teams respond efficiently.
              </p>
              
              <div 
                className="h-1 rounded-full w-24 mt-6"
                style={{
                  background: "linear-gradient(to right, #10b981, transparent)",
                }}
              />
            </div>

            {/* Verification checklist inside Glass Card */}
            <div 
              ref={cardRef} 
              className="flex-1 w-full max-w-lg scene-5-card opacity-0"
            >
              <GlassCard glowColor="#10b981" className="w-full">
                <div className="p-8 md:p-10 relative z-10">
                  
                  <div className="flex flex-col gap-4">
                    <div className="flex items-center justify-between border-b border-white/5 pb-3">
                      <h3 className="text-white font-bold text-base flex items-center gap-2">
                        <Icons.Activity style={{ color: "#10b981" }} size={18} />
                        Active Crew Verification
                      </h3>
                      <span className="px-2 py-0.5 bg-emerald-500/10 text-[9px] text-emerald-400 border border-emerald-500/20 rounded-full font-bold">IN PROGRESS</span>
                    </div>
                    
                    <div className="flex flex-col gap-3">
                      <div className="resolution-progress-card flex items-center gap-3.5 p-3.5 bg-emerald-500/10 border border-emerald-500/20 rounded-2xl">
                        <Icons.CheckCircle size={16} className="text-emerald-400 shrink-0" />
                        <div className="flex-1">
                          <div className="flex justify-between items-center">
                            <h4 className="text-white text-xs font-bold uppercase tracking-wider">Step 1: Dispatched</h4>
                            <span className="text-[9px] text-emerald-400 font-bold bg-emerald-500/10 px-2 py-0.5 rounded-full font-mono font-bold">08:00 AM</span>
                          </div>
                          <p className="text-[11px] text-slate-300 mt-0.5">Crew assigned, routing optimized, and team departed.</p>
                        </div>
                      </div>
                      
                      <div className="resolution-progress-card flex items-center gap-3.5 p-3.5 bg-emerald-500/15 border border-emerald-500/30 rounded-2xl">
                        <Icons.Wrench size={16} className="text-emerald-400 shrink-0 animate-bounce" />
                        <div className="flex-1">
                          <div className="flex justify-between items-center">
                            <h4 className="text-white text-xs font-bold uppercase tracking-wider font-sans">Step 2: Repairs Underway</h4>
                            <span className="text-[9px] text-emerald-400 font-bold bg-emerald-500/10 px-2 py-0.5 rounded-full font-mono font-bold">08:20 AM</span>
                          </div>
                          <p className="text-[11px] text-slate-300 mt-0.5">Asphalt leveled. Quality checks actively processing.</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="h-[1px] w-full bg-white/5 my-4" />

                  <div className="flex items-center justify-between text-xs text-slate-400 font-semibold tracking-wider font-sans">
                    <span className="flex items-center gap-1.5">
                      <Icons.Zap size={12} style={{ color: "#10b981" }} />
                      <span>LIVE PROGRESSION</span>
                    </span>
                    <span style={{ color: "#10b981" }} className="font-mono font-bold font-bold">
                      05 / 07
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

export default Scene5;
