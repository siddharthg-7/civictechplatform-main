import { ShieldCheck } from "lucide-react";

const TopBar = ({ accent, progress, onEnter }) => (
  <>
    {/* Progress bar — 2px, full width */}
    <div className="fixed top-0 left-0 right-0 h-[2px] z-[200] bg-white/[0.04]">
      <div
        className="h-full transition-none will-change-transform"
        style={{
          width: `${progress * 100}%`,
          background: `linear-gradient(to right, #3B82F6, rgba(255,255,255,0.4))`,
          boxShadow: `0 0 10px #3B82F6`,
        }}
      />
    </div>

    {/* Nav strip */}
    <div className="fixed top-0 left-0 right-0 z-[200] flex items-center justify-between px-6 md:px-12 py-5 pointer-events-none bg-[#0A0A0F]/60 backdrop-blur-md border-b border-white/5">
      {/* Logo */}
      <div className="pointer-events-auto flex items-center gap-2 cursor-pointer">
        <ShieldCheck size={20} className="text-[#3B82F6]" />
        <span className="text-[#e3e2e2] text-[18px] font-semibold tracking-tight" style={{ fontFamily: "Geist, sans-serif" }}>Civic Connect</span>
      </div>

      {/* Center Links */}
      <div className="hidden md:flex items-center gap-8 pointer-events-auto">
        <a href="#" className="text-[#3B82F6] font-medium text-[15px] hover:text-[#3B82F6] transition-colors">Platform</a>
        <a href="#" className="text-[#929095] font-medium text-[15px] hover:text-[#e3e2e2] transition-colors">Transparency</a>
        <a href="#" className="text-[#929095] font-medium text-[15px] hover:text-[#e3e2e2] transition-colors">Security</a>
        <a href="#" className="text-[#929095] font-medium text-[15px] hover:text-[#e3e2e2] transition-colors">Civic Labs</a>
      </div>

      {/* Enter portal */}
      <button
        onClick={onEnter}
        className="pointer-events-auto flex items-center justify-center px-6 py-2.5 bg-[#e3e2e2] text-[#0A0A0F] text-[11px] font-black tracking-widest uppercase transition-all duration-300 hover:bg-white hover:scale-105 active:scale-95 cursor-pointer"
        style={{ fontFamily: "Inter, sans-serif" }}>
        Enter Portal
      </button>
    </div>
  </>
);

export default TopBar;
