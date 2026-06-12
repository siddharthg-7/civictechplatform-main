import React from "react";
import { Cpu, Image, Brain, ChevronRight, Tag, Zap } from "lucide-react";

const Scene3Card = ({ color }) => {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between pb-3 border-b border-white/5">
        <span className="text-xs font-black flex items-center gap-2" style={{ color }}>
          <Cpu size={13} style={{ animationDuration: "4s" }} className="animate-spin" />
          Neural Engine
        </span>
        <span className="text-[9px] font-black px-2 py-0.5 rounded-full border animate-pulse"
              style={{ color, borderColor: `${color}33`, background: `${color}11` }}>
          ACTIVE
        </span>
      </div>

      <div className="flex flex-col gap-3 p-3 rounded-xl border border-white/10 bg-white/5">
        <div className="flex items-center justify-between text-[9px] font-mono">
          <span className="text-white/30">TICKET</span><span className="text-white">#49812_ROADS</span>
        </div>
        <div className="flex items-center justify-around py-2">
          <div className="w-8 h-8 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center">
            <Image size={12} className="text-blue-400" />
          </div>
          <ChevronRight size={10} className="text-white/20 animate-pulse" />
          <div className="w-10 h-10 rounded-full flex items-center justify-center border"
                style={{ background: `${color}18`, borderColor: `${color}44`, boxShadow: `0 0 18px ${color}33` }}>
            <Brain size={16} style={{ color }} />
          </div>
          <ChevronRight size={10} className="text-white/20 animate-pulse" />
          <div className="w-8 h-8 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center">
            <Tag size={12} className="text-emerald-400" />
          </div>
        </div>
        <div className="flex items-center justify-between text-[9px] font-mono border-t border-white/7 pt-2">
          <span className="text-white/30">Class: Category 4 Pothole</span>
          <span style={{ color: "#10b981" }} className="font-bold">99.8% Match</span>
        </div>
        {[{ l: "Complaints Scanned", v: "1,247" }, { l: "Avg Process Time", v: "2.8s" }].map(({ l, v }, i) => (
          <div key={i} className="flex items-center justify-between">
            <span className="text-white/30 text-[10px]">{l}</span>
            <span className="font-black text-xs" style={{ color }}>{v}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Scene3Card;