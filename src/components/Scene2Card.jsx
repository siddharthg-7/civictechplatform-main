import React from "react";
import { Camera, MapPin, Send } from "lucide-react";

const Scene2Card = ({ color }) => {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between pb-3 border-b border-white/5">
        <span className="text-xs font-black flex items-center gap-2" style={{ color }}>
          <Camera size={13} />
          Citizen Report
        </span>
        <span className="text-[9px] font-black animate-pulse" style={{ color }}>● LIVE</span>
      </div>

      <div className="flex flex-col gap-2.5 p-3 rounded-xl border border-white/10 bg-white/5">
        <div className="h-14 w-full rounded-lg flex flex-col items-center justify-center gap-1 border border-dashed border-white/15">
          <Camera size={18} style={{ color }} className="animate-pulse" />
          <span className="text-white/30 text-[9px]">Photo / Video</span>
        </div>
        <div className="flex items-center gap-2 bg-white/5 p-2 rounded-lg border border-white/10">
          <MapPin size={10} style={{ color }} className="animate-bounce" />
          <div>
            <p className="text-white text-[9px] font-bold">GPS Locked</p>
            <p className="text-white/30 text-[8px] font-mono">28.6139°N 77.2090°E</p>
          </div>
        </div>
        <div className="flex gap-2">
          {["Roads", "Water", "Power", "Waste"].map((cat) => (
            <span key={cat}
                  className="flex-1 text-center text-[8px] font-black py-1 rounded-lg border border-white/10 text-white/40 hover:text-white hover:border-white/20 transition-colors cursor-pointer">
              {cat}
            </span>
          ))}
        </div>
        <button type="button"
                className="w-full py-2 rounded-lg text-white font-black text-[9px] flex items-center justify-center gap-1.5 uppercase tracking-wider"
                style={{ background: color }}>
          <Send size={9} />
          Submit Report
        </button>
      </div>
    </div>
  );
};

export default Scene2Card;