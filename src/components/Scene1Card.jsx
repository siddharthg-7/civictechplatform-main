import React from "react";
import { AlertTriangle, CheckCircle2, Heart, Users, BarChart3, Sparkles } from "lucide-react";

const Scene1Card = ({ color }) => {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between pb-3 border-b border-white/5">
        <span className="text-xs font-black flex items-center gap-2" style={{ color: color }}>
          <AlertTriangle size={13} />
          City Hazards
        </span>
        <span className="text-[9px] font-black animate-pulse px-2 py-0.5 rounded-full border"
              style={{ color: color, borderColor: `${color}33`, background: `${color}11` }}>2 LIVE</span>
      </div>

      {[
        {
          label: "Critical Road Pothole",
          loc: "Sector 12 Main Road",
          status: "UNRESOLVED",
          ic: AlertTriangle,
          sc: "#f43f5e",
        },
        {
          label: "Broken Street Lights",
          loc: "Park Plaza Intersection",
          status: "PENDING",
          ic: "LightbulbOff",
          sc: "#f59e0b",
        },
        {
          label: "Garbage Overflow",
          loc: "Ward 7, Central Market",
          status: "REPORTED",
          ic: AlertTriangle,
          sc: "#a855f7",
        },
      ].map(({ label, loc, status, ic: Ic, sc }, i) => (
        <div key={i}
             className="flex items-center gap-3 p-2.5 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 transition-colors">
          <div className="p-2.5 rounded-lg flex-shrink-0" style={{ background: `${sc}18` }}><Ic size={16} style={{ color: sc }} /></div>
          <div className="flex-1 min-w-0">
            <p className="text-white text-[10px] font-bold truncate">{label}</p>
            <p className="text-white/30 text-[9px] truncate">{loc}</p>
          </div>
          <span className="text-[8px] font-black px-1.5 py-0.5 rounded flex-shrink-0"
                style={{ color: sc, background: `${sc}15` }}>{status}</span>
        </div>
      ))}
    </div>
  );
};

export default Scene1Card;