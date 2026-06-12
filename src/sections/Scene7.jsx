import React, { useRef } from "react";
import * as Icons from "lucide-react";
import SceneSection from "../components/SceneSection";
import VideoBackground from "../components/VideoBackground";
import { useParallax } from "../hooks/useParallax";

const Scene7 = ({ isActive, playVideo, sectionRef, textRef, cardRef, videoRef, onEnterPortal }) => {
  const localContainerRef = useRef(null);

  // Mouse Parallax
  useParallax(localContainerRef, ".scene-7-para", 0.06);
  useParallax(localContainerRef, ".scene-7-card", 0.025);

  const floatingIcons = [
    { icon: "Globe", top: "15%", left: "12%", size: 52 },
    { icon: "Rocket", top: "75%", left: "20%", size: 38 },
    { icon: "Layers", top: "25%", left: "85%", size: 46 },
    { icon: "Compass", top: "65%", left: "70%", size: 42 }
  ];

  return (
    <div ref={localContainerRef} className="w-full h-full relative">
      <SceneSection ref={sectionRef} isInitialVisible={false} isActive={isActive}>
        <VideoBackground 
          ref={videoRef}
          videoSrc="/Landingpage/scene7.mp4" 
          isActive={playVideo} 
        />

        {/* Floating Icons */}
        <div className="absolute inset-0 pointer-events-none z-10 overflow-hidden">
          {floatingIcons.map((floatIcon, fIdx) => {
            const FloatIconComponent = Icons[floatIcon.icon] || Icons.Sparkles;
            return (
              <div
                key={fIdx}
                className={`scene-7-para absolute transition-opacity duration-700 ${isActive ? "opacity-35" : "opacity-0"}`}
                style={{
                  top: floatIcon.top,
                  left: floatIcon.left,
                }}
              >
                <div className="animate-float" style={{ animationDelay: `${fIdx * 1.5}s` }}>
                  <FloatIconComponent
                    size={floatIcon.size}
                    style={{
                      color: "#ffffff",
                      filter: "drop-shadow(0 0 12px rgba(255,255,255,0.35))",
                    }}
                  />
                </div>
              </div>
            );
          })}
        </div>

        <div className="relative z-20 w-full max-w-7xl mx-auto px-6 md:px-12 lg:px-16 flex flex-col justify-center h-full">
          <div className="flex flex-col items-center text-center justify-center max-w-4xl mx-auto w-full gap-12">
            
            {/* Narrative Column */}
            <div 
              ref={textRef} 
              className="flex flex-col items-center text-center opacity-0"
            >
              <div 
                className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest mb-4 border shadow-inner"
                style={{
                  color: "#ffffff",
                  borderColor: "rgba(255, 255, 255, 0.35)",
                  background: "rgba(255, 255, 255, 0.04)",
                }}
              >
                <Icons.Sparkles size={10} />
                <span>SECTION 07 / FUTURE SMART CITY</span>
              </div>

              <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white tracking-tight mb-4 leading-[1.1] font-sans">
                The Future of Smart Governance
              </h2>

              <p className="text-slate-300 text-lg md:text-xl font-medium leading-relaxed max-w-xl">
                Powered by citizens. Driven by action.
              </p>
              
              <div 
                className="h-1 rounded-full w-24 mt-6"
                style={{
                  background: "linear-gradient(to right, #ffffff, transparent)",
                }}
              />
            </div>

            {/* Portal Action Trigger Card */}
            <div 
              ref={cardRef} 
              className="w-full max-w-lg scene-7-card opacity-0"
            >
              <div
                className="hero-reveal-box flex flex-col gap-6 text-center py-8 px-6 md:px-10 rounded-[2rem] border border-[rgba(255,255,255,0.15)] bg-[rgba(10,15,30,0.45)] backdrop-blur-[24px] shadow-[0_25px_60px_rgba(0,0,0,0.6)]"
                style={{ boxShadow: "0 0 35px rgba(255, 255, 255, 0.15)" }}
              >
                <div 
                  className="w-16 h-16 rounded-2xl bg-white/10 border border-white/20 flex items-center justify-center mx-auto shadow-2xl relative overflow-hidden group hover:scale-105 transition-transform duration-500"
                >
                  <Icons.Sparkles size={32} className="text-white animate-pulse" />
                </div>
                
                <div className="flex flex-col gap-2">
                  <h3 className="text-white font-extrabold text-xl tracking-tight font-sans">Access Smart Governance Today</h3>
                  <p className="text-slate-300 text-sm max-w-sm mx-auto leading-relaxed">
                    Join over two million citizens participating in the digital transformation of their cities.
                  </p>
                </div>

                <button
                  onClick={onEnterPortal}
                  className="px-8 py-3.5 rounded-2xl text-slate-950 font-bold uppercase tracking-wider text-[11px] shadow-2xl hover:scale-[1.03] active:scale-[0.98] transition-all duration-300 flex items-center justify-center gap-2 max-w-xs mx-auto border cursor-pointer font-sans"
                  style={{
                    background: "linear-gradient(135deg, #ffffff 0%, #cbd5e1 100%)",
                    borderColor: "rgba(255, 255, 255, 0.9)",
                    boxShadow: "0 15px 30px rgba(255, 255, 255, 0.2)",
                  }}
                >
                  <span>Launch Citizen Portal</span>
                  <Icons.ArrowRight size={14} className="text-slate-950" />
                </button>
              </div>
            </div>

          </div>
        </div>
      </SceneSection>
    </div>
  );
};

export default Scene7;
