import React, { useRef } from "react";
import * as Icons from "lucide-react";
import SceneSection from "../components/SceneSection";
import VideoBackground from "../components/VideoBackground";
import GlassCard from "../components/GlassCard";
import { useParallax } from "../hooks/useParallax";

const Scene4 = ({ isActive, playVideo, sectionRef, textRef, cardRef, videoRef }) => {
  const localContainerRef = useRef(null);

  // Mouse Parallax
  useParallax(localContainerRef, ".scene-4-para", 0.06);
  useParallax(localContainerRef, ".scene-4-card", 0.025);

  const floatingIcons = [
    { icon: "Truck", top: "25%", left: "15%", size: 46 },
    { icon: "Clock", top: "80%", left: "25%", size: 36 },
    { icon: "Milestone", top: "15%", left: "80%", size: 40 },
    { icon: "Navigation2", top: "60%", left: "80%", size: 50 }
  ];

  return (
    <div ref={localContainerRef} className="w-full h-full relative">
      <SceneSection ref={sectionRef} isInitialVisible={false} isActive={isActive}>
        <VideoBackground 
          ref={videoRef}
          videoSrc="/Landingpage/scene4.mp4" 
          isActive={playVideo} 
        />

        {/* Floating Icons */}
        <div className="absolute inset-0 pointer-events-none z-10 overflow-hidden">
          {floatingIcons.map((floatIcon, fIdx) => {
            const FloatIconComponent = Icons[floatIcon.icon] || Icons.Sparkles;
            return (
              <div
                key={fIdx}
                className={`scene-4-para absolute transition-opacity duration-700 ${isActive ? "opacity-35" : "opacity-0"}`}
                style={{
                  top: floatIcon.top,
                  left: floatIcon.left,
                }}
              >
                <div className="animate-float" style={{ animationDelay: `${fIdx * 1.5}s` }}>
                  <FloatIconComponent
                    size={floatIcon.size}
                    style={{
                      color: "#3b82f6",
                      filter: "drop-shadow(0 0 12px rgba(59,130,246,0.35))",
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
                  color: "#3b82f6",
                  borderColor: "rgba(59, 130, 246, 0.35)",
                  background: "rgba(59, 130, 246, 0.04)",
                }}
              >
                <Icons.GitBranch size={10} />
                <span>SECTION 04 / GOVERNMENT DISPATCH</span>
              </div>

              <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white tracking-tight mb-4 leading-[1.1] font-sans">
                Smart Department Routing
              </h2>

              <p className="text-slate-300 text-lg md:text-xl font-medium leading-relaxed max-w-xl">
                Issues reach the right team instantly.
              </p>
              
              <div 
                className="h-1 rounded-full w-24 mt-6"
                style={{
                  background: "linear-gradient(to right, #3b82f6, transparent)",
                }}
              />
            </div>

            {/* Department Flow Diagram inside Glass Card */}
            <div 
              ref={cardRef} 
              className="flex-1 w-full max-w-lg scene-4-card opacity-0"
            >
              <GlassCard glowColor="#3b82f6" className="w-full">
                <div className="p-8 md:p-10 relative z-10">
                  
                  <div className="flex flex-col gap-4">
                    <div className="flex items-center justify-between border-b border-white/5 pb-3">
                      <h3 className="text-white font-bold text-base flex items-center gap-2">
                        <Icons.GitBranch style={{ color: "#3b82f6" }} size={18} />
                        Smart Routing Matrix
                      </h3>
                      <span className="text-[10px] text-emerald-400 font-bold">DISPATCHING</span>
                    </div>
                    
                    <div className="relative py-4 flex items-center justify-between h-20">
                      <div className="p-3 bg-white/5 border border-white/10 rounded-xl flex flex-col items-center gap-1 z-10">
                        <Icons.FileText size={16} className="text-blue-400" />
                        <span className="text-[8px] text-slate-400 uppercase tracking-wider font-bold">Complaint</span>
                      </div>
                      
                      <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ minHeight: '80px' }}>
                        <line 
                          className="routing-path" 
                          x1="20%" y1="50%" x2="50%" y2="50%" 
                          stroke="#3b82f6" strokeWidth="2.5" strokeDasharray="6,6"
                        />
                        <line 
                          className="routing-path" 
                          x1="50%" y1="50%" x2="80%" y2="50%" 
                          stroke="#10b981" strokeWidth="2.5" strokeDasharray="6,6"
                        />
                      </svg>
                      
                      <div className="p-3 bg-white/5 border border-white/10 rounded-xl flex flex-col items-center gap-1 z-10 animate-pulse">
                        <Icons.Cpu size={16} className="text-purple-400" />
                        <span className="text-[8px] text-slate-400 uppercase tracking-wider font-bold">Router</span>
                      </div>
                      
                      <div className="p-3 bg-white/5 border border-white/10 rounded-xl flex flex-col items-center gap-1 z-10">
                        <Icons.Truck size={16} className="text-emerald-400" />
                        <span className="text-[8px] text-slate-400 uppercase tracking-wider font-bold">Crews</span>
                      </div>
                    </div>

                    <p className="text-[11px] text-slate-400 text-center font-medium bg-white/5 py-2.5 rounded-xl border border-white/5 font-mono">
                      Assigned to sanitation crew #4 (Zone C)
                    </p>
                  </div>

                  <div className="h-[1px] w-full bg-white/5 my-4" />

                  <div className="flex items-center justify-between text-xs text-slate-400 font-semibold tracking-wider font-sans">
                    <span className="flex items-center gap-1.5">
                      <Icons.Zap size={12} style={{ color: "#3b82f6" }} />
                      <span>LIVE PROGRESSION</span>
                    </span>
                    <span style={{ color: "#3b82f6" }} className="font-mono font-bold font-bold">
                      04 / 07
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

export default Scene4;
