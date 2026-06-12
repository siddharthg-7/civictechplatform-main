import React, { useRef } from "react";
import * as Icons from "lucide-react";
import SceneSection from "../components/SceneSection";
import VideoBackground from "../components/VideoBackground";
import GlassCard from "../components/GlassCard";
import { useParallax } from "../hooks/useParallax";

const Scene2 = ({ isActive, playVideo, sectionRef, textRef, cardRef, videoRef }) => {
  const localContainerRef = useRef(null);

  // Mouse Parallax
  useParallax(localContainerRef, ".scene-2-para", 0.06);
  useParallax(localContainerRef, ".scene-2-card", 0.025);

  const floatingIcons = [
    { icon: "Upload", top: "20%", left: "12%", size: 44 },
    { icon: "FileText", top: "80%", left: "20%", size: 38 },
    { icon: "Send", top: "30%", left: "85%", size: 42 },
    { icon: "Camera", top: "65%", left: "70%", size: 46 }
  ];

  return (
    <div ref={localContainerRef} className="w-full h-full relative">
      <SceneSection ref={sectionRef} isInitialVisible={false} isActive={isActive}>
        <VideoBackground 
          ref={videoRef}
          videoSrc="/Landingpage/scene2.mp4" 
          isActive={playVideo} 
        />

        {/* Floating Icons */}
        <div className="absolute inset-0 pointer-events-none z-10 overflow-hidden">
          {floatingIcons.map((floatIcon, fIdx) => {
            const FloatIconComponent = Icons[floatIcon.icon] || Icons.Sparkles;
            return (
              <div
                key={fIdx}
                className={`scene-2-para absolute transition-opacity duration-700 ${isActive ? "opacity-35" : "opacity-0"}`}
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
                <Icons.Camera size={10} />
                <span>SECTION 02 / CITIZEN REPORTING</span>
              </div>

              <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white tracking-tight mb-4 leading-[1.1] font-sans">
                Report Issues Instantly
              </h2>

              <p className="text-slate-300 text-lg md:text-xl font-medium leading-relaxed max-w-xl">
                Citizens become active participants.
              </p>
              
              <div 
                className="h-1 rounded-full w-24 mt-6"
                style={{
                  background: "linear-gradient(to right, #3b82f6, transparent)",
                }}
              />
            </div>

            {/* Interactive Phone Mockup inside Glass Card */}
            <div 
              ref={cardRef} 
              className="flex-1 w-full max-w-lg scene-2-card opacity-0"
            >
              <GlassCard glowColor="#3b82f6" className="w-full">
                <div className="p-8 md:p-10 relative z-10">
                  
                  {/* Smartphone */}
                  <div className="phone-ui-mockup flex flex-col bg-slate-900 border-[3px] border-slate-700/80 rounded-[2.2rem] p-3 shadow-2xl relative max-w-xs mx-auto overflow-hidden aspect-[9/18] h-[330px]">
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 h-4.5 w-24 bg-slate-900 rounded-b-2xl z-20 flex items-center justify-center">
                      <div className="w-8 h-1 bg-white/20 rounded-full" />
                    </div>
                    
                    <div className="flex-1 bg-slate-950 rounded-[1.8rem] p-4 flex flex-col gap-3 relative overflow-hidden pt-6">
                      <div className="flex items-center justify-between text-slate-500 text-[8px] font-mono mt-0.5">
                        <span>12:00</span>
                        <div className="flex items-center gap-1">
                          <Icons.Wifi size={8} />
                          <Icons.Battery size={8} />
                        </div>
                      </div>
                      
                      <div className="text-white text-[10px] font-bold text-center">New Civic Report</div>
                      
                      <div className="h-24 w-full bg-white/5 rounded-xl flex flex-col items-center justify-center gap-1.5 border border-dashed border-white/20 text-slate-400 relative overflow-hidden hover:bg-white/10 transition-colors">
                        <Icons.Camera size={18} className="text-blue-400 animate-pulse" />
                        <span className="text-[8px]">Upload Photo / Video</span>
                      </div>

                      <div className="flex items-center gap-2 bg-white/5 p-2 rounded-xl text-[9px] text-slate-300 border border-white/5">
                        <Icons.MapPin size={10} className="text-blue-400 animate-bounce" />
                        <div className="flex-col flex">
                          <span className="font-semibold text-[8px]">Active GPS Pin</span>
                          <span className="text-[7px] text-slate-400 font-mono">28.6139° N, 77.2090° E</span>
                        </div>
                      </div>

                      <button type="button" className="w-full mt-auto py-2 rounded-xl text-white font-bold text-[10px] flex items-center justify-center gap-1.5 cursor-pointer shadow-lg" style={{ backgroundColor: "#3b82f6" }}>
                        <Icons.Send size={10} />
                        Submit Report
                      </button>
                    </div>
                  </div>

                  <div className="h-[1px] w-full bg-white/5 my-4" />

                  <div className="flex items-center justify-between text-xs text-slate-400 font-semibold tracking-wider font-sans">
                    <span className="flex items-center gap-1.5">
                      <Icons.Zap size={12} style={{ color: "#3b82f6" }} />
                      <span>LIVE PROGRESSION</span>
                    </span>
                    <span style={{ color: "#3b82f6" }} className="font-mono font-bold font-bold">
                      02 / 07
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

export default Scene2;
