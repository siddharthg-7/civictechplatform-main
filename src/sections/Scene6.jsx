import React, { useRef } from "react";
import * as Icons from "lucide-react";
import SceneSection from "../components/SceneSection";
import VideoBackground from "../components/VideoBackground";
import GlassCard from "../components/GlassCard";
import { useParallax } from "../hooks/useParallax";

const Scene6 = ({ isActive, playVideo, sectionRef, textRef, cardRef, videoRef }) => {
  const localContainerRef = useRef(null);

  // Mouse Parallax
  useParallax(localContainerRef, ".scene-6-para", 0.06);
  useParallax(localContainerRef, ".scene-6-card", 0.025);

  const floatingIcons = [
    { icon: "Heart", top: "15%", left: "25%", size: 44 },
    { icon: "Users", top: "75%", left: "15%", size: 40 },
    { icon: "Award", top: "20%", left: "80%", size: 48 },
    { icon: "MessageSquare", top: "70%", left: "80%", size: 38 }
  ];

  return (
    <div ref={localContainerRef} className="w-full h-full relative">
      <SceneSection ref={sectionRef} isInitialVisible={false} isActive={isActive}>
        <VideoBackground 
          ref={videoRef}
          videoSrc="/Landingpage/scene6.mp4" 
          isActive={playVideo} 
        />

        {/* Floating Icons */}
        <div className="absolute inset-0 pointer-events-none z-10 overflow-hidden">
          {floatingIcons.map((floatIcon, fIdx) => {
            const FloatIconComponent = Icons[floatIcon.icon] || Icons.Sparkles;
            return (
              <div
                key={fIdx}
                className={`scene-6-para absolute transition-opacity duration-700 ${isActive ? "opacity-35" : "opacity-0"}`}
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
                <Icons.Users size={10} />
                <span>SECTION 06 / COMMUNITY IMPACT</span>
              </div>

              <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white tracking-tight mb-4 leading-[1.1] font-sans">
                Community Impact
              </h2>

              <p className="text-slate-300 text-lg md:text-xl font-medium leading-relaxed max-w-xl">
                Visible improvements create stronger cities.
              </p>
              
              <div 
                className="h-1 rounded-full w-24 mt-6"
                style={{
                  background: "linear-gradient(to right, #a855f7, transparent)",
                }}
              />
            </div>

            {/* Metric Displays inside Glass Card */}
            <div 
              ref={cardRef} 
              className="flex-1 w-full max-w-lg scene-6-card opacity-0"
            >
              <GlassCard glowColor="#a855f7" className="w-full">
                <div className="p-8 md:p-10 relative z-10">
                  
                  <div className="flex flex-col gap-5">
                    <div className="flex items-center justify-between border-b border-white/5 pb-3">
                      <h3 className="text-white font-bold text-base flex items-center gap-2">
                        <Icons.Users size={18} className="text-purple-400" />
                        City Performance Metrics
                      </h3>
                      <span className="text-[9px] text-slate-400 font-mono font-bold">UPDATED LIVE</span>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div className="p-4 bg-white/5 border border-white/10 rounded-2xl text-center flex flex-col gap-1 hover:border-white/20 transition-all duration-300">
                        <span className="text-slate-400 text-[10px] font-bold uppercase tracking-widest font-sans">Resolution Rate</span>
                        <span id="heavy-counter-1" className="text-3xl font-extrabold text-purple-400 tracking-tight font-sans">98%</span>
                      </div>
                      <div className="p-4 bg-white/5 border border-white/10 rounded-2xl text-center flex flex-col gap-1 hover:border-white/20 transition-all duration-300">
                        <span className="text-slate-400 text-[10px] font-bold uppercase tracking-widest font-sans">Total Reports</span>
                        <span id="heavy-counter-2" className="text-3xl font-extrabold text-blue-400 tracking-tight font-sans">24,500+</span>
                      </div>
                    </div>

                    <div className="flex flex-col gap-1.5">
                      <div className="flex justify-between text-[10px] text-slate-400 font-bold uppercase font-sans">
                        <span>Overall SLA Compliance</span>
                        <span className="text-white">98% Completed</span>
                      </div>
                      <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden border border-white/10">
                        <div className="metric-bar-fill h-full bg-gradient-to-r from-purple-500 to-blue-500 rounded-full" style={{ width: "98%" }} />
                      </div>
                    </div>
                  </div>

                  <div className="h-[1px] w-full bg-white/5 my-4" />

                  <div className="flex items-center justify-between text-xs text-slate-400 font-semibold tracking-wider font-sans">
                    <span className="flex items-center gap-1.5">
                      <Icons.Zap size={12} style={{ color: "#a855f7" }} />
                      <span>LIVE PROGRESSION</span>
                    </span>
                    <span style={{ color: "#a855f7" }} className="font-mono font-bold font-bold font-bold font-bold">
                      06 / 07
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

export default Scene6;
