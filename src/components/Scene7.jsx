import React from "react";
import * as Icons from "lucide-react";
import SceneSection from "./SceneSection";
import VideoBackground from "./VideoBackground";
import FloatingParticles from "./FloatingParticles";

const COLOR = "#ffffff";

const Scene7 = ({ isActive, playVideo, sectionRef, textRef, cardRef, videoRef, onEnterPortal }) => {
  return (
    <div className="w-full h-full relative">
      <SceneSection ref={sectionRef} isInitialVisible={false} isActive={isActive}>
        <VideoBackground ref={videoRef} videoSrc="/Landingpage/scene7.mp4" isActive={playVideo} />
        <FloatingParticles color="#aaaaaa" count={30} />

        <div className="absolute inset-0 pointer-events-none z-10 overflow-hidden">
          {[
            { icon: "Globe",   top: "15%", left: "12%", size: 52 },
            { icon: "Rocket",  top: "75%", left: "20%", size: 38 },
            { icon: "Layers",  top: "25%", left: "85%", size: 46 },
            { icon: "Compass", top: "65%", left: "70%", size: 42 },
          ].map(({ icon, top, left, size }, i) => {
            const Ic = Icons[icon] || Icons.Sparkles;
            return (
              <div key={i} className={`absolute transition-opacity duration-700 ${isActive ? "opacity-25" : "opacity-0"}`} style={{ top, left }}>
                <div className="animate-float" style={{ animationDelay: `${i * 1.5}s` }}>
                  <Ic size={size} style={{ color: "#ffffff", filter: "drop-shadow(0 0 12px rgba(255,255,255,0.3))" }} />
                </div>
              </div>
            );
          })}
        </div>

        <div className="relative z-20 w-full max-w-7xl mx-auto px-6 md:px-12 lg:px-16 flex flex-col justify-center h-full">
          <div className="flex flex-col items-center text-center gap-10 max-w-3xl mx-auto w-full">

            <div ref={textRef} className="flex flex-col items-center">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest mb-4 border border-white/20 bg-white/5">
                <Icons.Sparkles size={10} className="text-white" />
                <span className="text-white/60">Section 07 / Future Smart City</span>
              </div>
              <h2 className="text-5xl md:text-6xl lg:text-7xl font-black text-white tracking-tight mb-4 leading-[0.95]">
                The Future of <br /><span className="text-white/40">Smart Governance</span>
              </h2>
              <p className="text-white/50 text-lg font-medium leading-relaxed max-w-md">
                Powered by citizens. Driven by action. Built for every city on earth.
              </p>
              <div className="h-1 w-24 rounded-full mt-6 bg-white/20" />
            </div>

            <div ref={cardRef} className="w-full max-w-md">
              <div
                className="flex flex-col gap-6 text-center py-8 px-8 rounded-[2rem] border border-white/10"
                style={{
                  background: "rgba(0,0,0,0.5)",
                  backdropFilter: "blur(24px)",
                  WebkitBackdropFilter: "blur(24px)",
                  boxShadow: "0 0 60px rgba(255,255,255,0.08), 0 25px 60px rgba(0,0,0,0.6)",
                }}
              >
                <div className="w-14 h-14 rounded-2xl border border-white/15 bg-white/5 flex items-center justify-center mx-auto">
                  <Icons.Sparkles size={28} className="text-white animate-pulse" />
                </div>
                <div className="flex flex-col gap-2">
                  <h3 className="text-white font-black text-xl tracking-tight">Access Smart Governance</h3>
                  <p className="text-white/40 text-sm leading-relaxed">
                    Join over two million citizens participating in the digital transformation of their cities.
                  </p>
                </div>
                <button
                  onClick={onEnterPortal}
                  className="flex items-center justify-center gap-2 px-8 py-3.5 rounded-2xl font-black text-black text-[11px] uppercase tracking-widest cursor-pointer transition-all duration-300 hover:scale-[1.03] active:scale-[0.97] mx-auto"
                  style={{ background: "white", boxShadow: "0 0 30px rgba(255,255,255,0.2)" }}
                >
                  <span>Launch Citizen Portal</span>
                  <Icons.ArrowRight size={13} />
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
