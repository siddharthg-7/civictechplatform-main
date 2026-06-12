import React, { useRef, useState } from "react";
import {
  AlertTriangle, LightbulbOff, Trash2,
  Smartphone, Camera, MapPin, Send,
  Cpu, Brain, Tag, ChevronRight, Image as ImageIcon,
  GitBranch, Truck, Network, CircuitBoard,
  CheckCircle2, Wrench, ShieldCheck, Clock,
  BarChart3, TrendingUp, Users, Star,
  Sparkles, Globe, Wifi, Activity, Zap,
  ArrowUpRight
} from "lucide-react";

// ─── Spatial Base Components ───────────────────────────────────────────────

const SpatialContainer = ({ children, color }) => {
  const cardRef = useRef(null);
  const [transform, setTransform] = useState("perspective(1000px) rotateX(0deg) rotateY(0deg)");
  const [glare, setGlare] = useState({ x: 50, y: 50, opacity: 0 });

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    // Magnetic pull: tilt towards mouse
    const rotateX = ((y - centerY) / centerY) * -12;
    const rotateY = ((x - centerX) / centerX) * 12;
    setTransform(`perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`);
    setGlare({
      x: (x / rect.width) * 100,
      y: (y / rect.height) * 100,
      opacity: 0.15
    });
  };

  const handleMouseLeave = () => {
    setTransform("perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)");
    setGlare(g => ({ ...g, opacity: 0 }));
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="flex flex-col w-full h-full"
      style={{
        transform,
        transition: "transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)",
        transformStyle: "preserve-3d"
      }}
    >
      {/* 21st.dev style noise overlay */}
      <div className="absolute inset-0 pointer-events-none rounded-3xl opacity-[0.25] mix-blend-overlay z-0" style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E\")" }} />
      {/* Glare effect tracking mouse */}
      <div className="absolute inset-0 pointer-events-none rounded-3xl z-[1]" style={{ background: `radial-gradient(circle at ${glare.x}% ${glare.y}%, rgba(255,255,255,${glare.opacity}), transparent 40%)`, transition: "opacity 0.4s ease" }} />

      <div 
        className="flex flex-col gap-4 relative w-full h-full z-10"
        style={{ transform: "translateZ(30px)", transformStyle: "preserve-3d" }}
      >
        {children}
      </div>
    </div>
  );
};

const CardHeader = ({ icon: Icon, title, color, badge }) => (
  <div className="flex items-center justify-between pb-2" style={{ transform: "translateZ(30px)" }}>
    <span className="text-xs font-black flex items-center gap-3 uppercase tracking-widest" style={{ color, textShadow: `0 0 15px ${color}55` }}>
      <Icon size={14} className="animate-pulse" /> {title}
    </span>
    {badge && (
      <span
        className="text-[9px] font-black px-2.5 py-1 rounded-full border shadow-xl"
        style={{ color, borderColor: `${color}44`, background: `${color}15`, boxShadow: `0 0 20px ${color}33` }}
      >
        {badge}
      </span>
    )}
  </div>
);

const CardContent = ({ children }) => (
  <div className="w-full relative" style={{ transform: "translateZ(40px)" }}>
    {children}
  </div>
);

const CardSupportingContent = ({ children }) => (
  <div className="w-full flex flex-col gap-1.5 pt-3 border-t" style={{ borderColor: "rgba(255,255,255,0.06)", transform: "translateZ(25px)" }}>
    {children}
  </div>
);

const CardActions = ({ children }) => (
  <div className="w-full pt-1" style={{ transform: "translateZ(35px)" }}>
    {children}
  </div>
);

// Helper row for supporting content
const SupportRow = ({ label, value, color }) => (
  <div className="flex items-center justify-between py-1 border-b border-transparent hover:border-white/5 transition-colors cursor-default">
    <span className="text-[9px] font-bold uppercase tracking-[0.2em]" style={{ color: "rgba(255,255,255,0.3)" }}>{label}</span>
    <span className="text-[11px] font-black" style={{ color, textShadow: `0 0 10px ${color}66` }}>{value}</span>
  </div>
);

const GlassButton = ({ children, color }) => (
  <button 
    className="w-full py-3 rounded-xl text-white font-black text-[9px] flex items-center justify-center gap-2 uppercase tracking-[0.2em] relative overflow-hidden group hover:scale-[1.02] transition-transform active:scale-[0.98]"
    style={{ 
      background: `linear-gradient(135deg, ${color}33 0%, ${color}11 100%)`,
      border: `1px solid ${color}44`,
      boxShadow: `0 4px 15px rgba(0,0,0,0.2), inset 0 1px 1px ${color}55`
    }}
  >
    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" style={{ background: `linear-gradient(90deg, transparent, ${color}55, transparent)`, transform: "skewX(-20deg) translateX(-150%)", animation: "sweep 2s infinite" }} />
    <style>{`@keyframes sweep { 100% { transform: skewX(-20deg) translateX(150%); } }`}</style>
    {children}
  </button>
);

// ─── SCENE 1 — Command Center ──────────────────────────────────────────────
const Card1 = ({ color: c }) => (
  <SpatialContainer color={c}>
    <CardHeader icon={AlertTriangle} title="City Hazards" color={c} badge="3 LIVE" />
    <CardContent>
      <div className="flex flex-col gap-2.5">
        {[
          { icon: AlertTriangle, label: "Critical Road Pothole",   loc: "Sector 12 Main Road",     sc: "#f43f5e" },
          { icon: LightbulbOff,  label: "Broken Street Lights",    loc: "Park Plaza Intersection", sc: "#f59e0b" },
          { icon: Trash2,        label: "Garbage Overflow",        loc: "Ward 7, Central Market",  sc: "#a855f7" },
        ].map(({ icon: Icon, label, loc, sc }, i) => (
          <div
            key={i}
            className="group flex items-center gap-3 p-3 rounded-2xl transition-all duration-300 cursor-pointer"
            style={{ 
              background: "linear-gradient(135deg, rgba(255,255,255,0.03) 0%, rgba(255,255,255,0.01) 100%)", 
              boxShadow: "inset 0 1px 1px rgba(255,255,255,0.05), 0 8px 24px rgba(0,0,0,0.2)", 
              border: "1px solid rgba(255,255,255,0.03)" 
            }}
          >
            <div className="p-2 rounded-xl flex-shrink-0 transition-transform group-hover:scale-110" style={{ background: `${sc}18` }}>
              <Icon size={13} style={{ color: sc }} />
            </div>
            <div className="flex-1 min-w-0 transition-transform group-hover:translate-x-1">
              <p className="text-[10px] font-bold truncate transition-colors" style={{ color: "white" }}>{label}</p>
              <p className="text-[9px] truncate" style={{ color: "rgba(255,255,255,0.3)" }}>{loc}</p>
            </div>
          </div>
        ))}
      </div>
    </CardContent>
    <CardSupportingContent>
      <SupportRow label="Severity High" value="4 Active" color={c} />
    </CardSupportingContent>
    <CardActions>
      <GlassButton color={c}>Deploy Unit <ArrowUpRight size={12} /></GlassButton>
    </CardActions>
  </SpatialContainer>
);

// ─── SCENE 2 — Glass Panel (Reporting) ────────────────────────────────────
const Card2 = ({ color: c }) => (
  <SpatialContainer color={c}>
    <CardHeader icon={Smartphone} title="Citizen Report" color={c} badge="● LIVE" />
    <CardContent>
      <div
        className="flex flex-col gap-3 p-3.5 rounded-2xl group hover:border-[rgba(255,255,255,0.1)] transition-colors duration-300 cursor-pointer"
        style={{ 
          background: "linear-gradient(135deg, rgba(255,255,255,0.04) 0%, rgba(255,255,255,0.01) 100%)", 
          boxShadow: "inset 0 1px 1px rgba(255,255,255,0.1), 0 8px 24px rgba(0,0,0,0.2)", 
          border: "1px solid rgba(255,255,255,0.03)" 
        }}
      >
        <div
          className="h-16 w-full rounded-xl flex flex-col items-center justify-center gap-1 border border-dashed transition-all group-hover:bg-[rgba(255,255,255,0.05)]"
          style={{ borderColor: "rgba(255,255,255,0.15)", background: "rgba(255,255,255,0.02)" }}
        >
          <Camera size={16} style={{ color: c }} className="group-hover:scale-110 transition-transform duration-300" />
          <span className="text-[9px] font-bold uppercase tracking-widest mt-1" style={{ color: "rgba(255,255,255,0.3)" }}>Upload Evidence</span>
        </div>
        <div className="flex gap-1.5 mt-1">
          {["Roads", "Water", "Power", "Waste"].map((cat) => (
            <span
              key={cat}
              className="flex-1 text-center text-[8px] font-black py-2 rounded-xl border hover:bg-[rgba(255,255,255,0.1)] transition-colors"
              style={{ color: "rgba(255,255,255,0.4)", borderColor: "rgba(255,255,255,0.08)" }}
            >
              {cat}
            </span>
          ))}
        </div>
      </div>
    </CardContent>
    <CardSupportingContent>
      <SupportRow label="GPS Lock" value="28.6139°N 77.2°E" color={c} />
      <SupportRow label="Avg Process" value="1.2s" color={c} />
    </CardSupportingContent>
    <CardActions>
      <GlassButton color={c}><Send size={12} /> Submit Pulse</GlassButton>
    </CardActions>
  </SpatialContainer>
);

// ─── SCENE 3 — Holographic Panel (AI) ──────────────────────────────────────
const Card3 = ({ color: c }) => (
  <SpatialContainer color={c}>
    <CardHeader icon={Cpu} title="Neural Engine" color={c} badge="ACTIVE" />
    <CardContent>
      <div
        className="flex flex-col gap-3 p-4 rounded-2xl relative overflow-hidden"
        style={{ 
          background: "linear-gradient(135deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.01) 100%)", 
          boxShadow: "inset 0 1px 1px rgba(255,255,255,0.1), 0 8px 24px rgba(0,0,0,0.3)", 
          border: "1px solid rgba(255,255,255,0.05)" 
        }}
      >
        <div className="absolute inset-0 opacity-20 pointer-events-none" style={{ backgroundImage: "radial-gradient(circle at center, rgba(168, 85, 247, 0.4) 0%, transparent 70%)" }} />
        <div className="flex items-center justify-around py-2 relative z-10">
          <div className="w-12 h-12 rounded-2xl flex items-center justify-center border backdrop-blur-md" style={{ background: "rgba(255,255,255,0.05)", borderColor: "rgba(255,255,255,0.1)" }}>
            <ImageIcon size={16} className="text-blue-400" />
          </div>
          <ChevronRight size={14} className="animate-pulse" style={{ color: "rgba(255,255,255,0.3)" }} />
          <div
            className="w-14 h-14 rounded-full flex items-center justify-center border shadow-xl"
            style={{ background: `${c}22`, borderColor: `${c}66`, boxShadow: `0 0 30px ${c}44` }}
          >
            <Brain size={20} style={{ color: c }} />
          </div>
          <ChevronRight size={14} className="animate-pulse" style={{ color: "rgba(255,255,255,0.3)" }} />
          <div className="w-12 h-12 rounded-2xl flex items-center justify-center border backdrop-blur-md" style={{ background: "rgba(255,255,255,0.05)", borderColor: "rgba(255,255,255,0.1)" }}>
            <Tag size={16} className="text-emerald-400" />
          </div>
        </div>
      </div>
    </CardContent>
    <CardSupportingContent>
      <SupportRow label="Ticket Processed" value="#49812_ROADS" color="white" />
      <SupportRow label="Confidence" value="99.8% Match" color="#34d399" />
    </CardSupportingContent>
    <CardActions>
      <GlassButton color={c}>View Cluster <Network size={12} /></GlassButton>
    </CardActions>
  </SpatialContainer>
);

// ─── SCENE 4 — Control Node (Routing) ──────────────────────────────────────
const Card4 = ({ color: c }) => (
  <SpatialContainer color={c}>
    <CardHeader icon={GitBranch} title="Smart Routing" color={c} badge="DISPATCHING" />
    <CardContent>
      <div className="flex items-center justify-between gap-2 py-4 px-2 relative">
        {[
          { label: "Signal", icon: AlertTriangle, col: c },
          { label: "Router",  icon: CircuitBoard,  col: "#a855f7" },
          { label: "Crew", icon: Truck,          col: "#10b981" },
        ].map(({ label, icon: Icon, col }, i) => (
          <div key={i} className="flex flex-col items-center gap-2.5 flex-1 group cursor-pointer z-10">
            <div className="p-4 rounded-2xl flex items-center justify-center transition-all duration-300 group-hover:scale-110 group-hover:shadow-[0_0_20px_rgba(255,255,255,0.2)]" style={{ background: "linear-gradient(135deg, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0.01) 100%)", boxShadow: "inset 0 1px 1px rgba(255,255,255,0.2), 0 8px 24px rgba(0,0,0,0.3)", border: "1px solid rgba(255,255,255,0.05)" }}>
              <Icon size={18} style={{ color: col, textShadow: `0 0 10px ${col}88` }} />
            </div>
            <span className="text-[8px] font-black uppercase text-center tracking-widest" style={{ color: "rgba(255,255,255,0.4)" }}>{label}</span>
          </div>
        ))}
        {/* Connection Line */}
        <div className="absolute top-1/2 left-[20%] right-[20%] h-px -translate-y-4 z-0" style={{ background: "rgba(255,255,255,0.1)" }}>
          <div className="h-full w-full opacity-50 animate-pulse" style={{ background: `linear-gradient(90deg, transparent, ${c}, transparent)` }} />
        </div>
      </div>
    </CardContent>
    <CardSupportingContent>
      <SupportRow label="Target Destination" value="Sanitation #4" color="white" />
      <SupportRow label="ETA Assigned" value="12 mins" color={c} />
    </CardSupportingContent>
    <CardActions>
      <GlassButton color={c}>Override Route</GlassButton>
    </CardActions>
  </SpatialContainer>
);

// ─── SCENE 5 — Resolution ─────────────────────────────────────────────────
const Card5 = ({ color: c }) => (
  <SpatialContainer color={c}>
    <CardHeader icon={Activity} title="Field Ops" color={c} badge="IN PROGRESS" />
    <CardContent>
      <div className="flex flex-col gap-2.5">
        {[
          { icon: CheckCircle2, label: "Crew Dispatched",  time: "08:00", done: true  },
          { icon: Wrench,        label: "Repairs Active", time: "08:22", done: true  },
          { icon: ShieldCheck,   label: "QC Upload",  time: "09:15", done: false },
        ].map(({ icon: Icon, label, time, done }, i) => (
          <div
            key={i}
            className="group flex items-center justify-between p-3.5 rounded-2xl transition-all duration-300"
            style={{
              background: done ? `linear-gradient(135deg, ${c}15 0%, ${c}05 100%)` : "linear-gradient(135deg, rgba(255,255,255,0.03) 0%, rgba(255,255,255,0.01) 100%)",
              boxShadow: "inset 0 1px 1px rgba(255,255,255,0.1)",
              border: done ? `1px solid ${c}33` : "1px solid rgba(255,255,255,0.03)",
            }}
          >
            <div className="flex items-center gap-3">
              <Icon size={14} className="transition-transform group-hover:scale-110" style={{ color: done ? c : "rgba(255,255,255,0.2)" }} />
              <p className="text-[10px] font-black text-white">{label}</p>
            </div>
            <span className="text-[9px] font-mono" style={{ color: done ? c : "rgba(255,255,255,0.2)" }}>{time}</span>
          </div>
        ))}
      </div>
    </CardContent>
    <CardSupportingContent>
      <SupportRow label="Resolution Rate" value="94%" color={c} />
    </CardSupportingContent>
    <CardActions>
      <GlassButton color={c}>Sign Off</GlassButton>
    </CardActions>
  </SpatialContainer>
);

// ─── SCENE 6 — Community Impact ───────────────────────────────────────────
const Card6 = ({ color: c }) => (
  <SpatialContainer color={c}>
    <CardHeader icon={BarChart3} title="Impact Board" color={c} badge="LIVE" />
    <CardContent>
      <div className="grid grid-cols-2 gap-3">
        {[
          { label: "Fixed", val: "24.5K",  col: c },
          { label: "Rating",    val: "4.8 ★",  col: "#10b981" },
        ].map(({ label, val, col }, i) => (
          <div
            key={i}
            className="p-5 rounded-2xl text-center flex flex-col justify-center items-center group cursor-pointer hover:bg-[rgba(255,255,255,0.08)] transition-all"
            style={{ background: "linear-gradient(135deg, rgba(255,255,255,0.06) 0%, rgba(255,255,255,0.01) 100%)", boxShadow: "inset 0 1px 1px rgba(255,255,255,0.1)", border: "1px solid rgba(255,255,255,0.03)" }}
          >
            <p className="text-[8px] font-black uppercase tracking-[0.2em] mb-2 opacity-60 group-hover:opacity-100 transition-opacity">{label}</p>
            <p className="font-black text-2xl leading-none group-hover:scale-110 transition-transform" style={{ color: col, textShadow: `0 0 20px ${col}88` }}>{val}</p>
          </div>
        ))}
      </div>
    </CardContent>
    <CardSupportingContent>
      <SupportRow label="SLA Compliance" value="94%" color={c} />
    </CardSupportingContent>
    <CardActions>
      <GlassButton color={c}>Detailed Metrics</GlassButton>
    </CardActions>
  </SpatialContainer>
);

// ─── SCENE 7 — Future ─────────────────────────────────────────────────────
const Card7 = ({ color: c }) => (
  <SpatialContainer color={c}>
    <CardHeader icon={Sparkles} title="Global Grid" color="rgba(255,255,255,0.8)" />
    <CardContent>
      <div className="flex flex-col gap-2">
        <SupportRow label="Cities Connected" value="142 Nodes" color="rgba(255,255,255,0.8)" />
        <SupportRow label="Active Citizens" value="2.4M+" color="#3b82f6" />
        <SupportRow label="Uptime" value="99.99%" color="#10b981" />
      </div>
    </CardContent>
    <CardSupportingContent>
      <div className="flex items-center justify-between p-3.5 rounded-2xl border bg-black/20" style={{ borderColor: "rgba(255,255,255,0.05)" }}>
        <Globe size={16} style={{ color: "rgba(255,255,255,0.5)" }} className="animate-pulse" />
        <Wifi size={14} style={{ color: "#3b82f6" }} className="animate-bounce" />
        <Activity size={14} style={{ color: "#10b981" }} />
        <Zap size={14} style={{ color: "#f59e0b" }} className="animate-pulse" />
      </div>
    </CardSupportingContent>
    <CardActions>
      <GlassButton color="rgba(255,255,255,0.8)">Initialize Protocol</GlassButton>
    </CardActions>
  </SpatialContainer>
);

const CARDS = { 1: Card1, 2: Card2, 3: Card3, 4: Card4, 5: Card5, 6: Card6, 7: Card7 };

const SceneCard = ({ n, color }) => {
  const Card = CARDS[n] || Card1;
  return <Card color={color} />;
};

export default SceneCard;
