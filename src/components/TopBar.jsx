import { ShieldCheck, LogIn } from "lucide-react";

const TopBar = ({ onEnter }) => (
  <div className="fixed top-0 left-0 right-0 z-[200] flex items-center justify-between px-8 py-5 pointer-events-none bg-transparent">
    {/* Logo */}
    <div className="pointer-events-auto flex items-center gap-2 cursor-pointer">
      <ShieldCheck size={24} className="text-blue-500" />
      <span className="text-white font-bold" style={{ fontFamily: "Geist, sans-serif", fontSize: "20px", letterSpacing: "-0.04em" }}>Civic Connect</span>
    </div>

    {/* Center Links */}
    <div className="hidden md:flex items-center gap-8 pointer-events-auto" style={{ fontFamily: "Geist, sans-serif", fontWeight: 500, fontSize: "16px", letterSpacing: "-0.02em", color: "rgba(255,255,255,0.9)" }}>
      <a href="#" className="hover:text-white transition-colors">Platform</a>
      <a href="#" className="hover:text-white transition-colors">Transparency</a>
      <a href="#" className="hover:text-white transition-colors">Security</a>
      <a href="#" className="hover:text-white transition-colors">Civic Labs</a>
    </div>

    {/* Enter platform button */}
    <button
      onClick={onEnter}
      className="pointer-events-auto flex items-center gap-2 justify-center px-5 py-2.5 bg-transparent border border-white/10 text-white/90 transition-all duration-300 hover:bg-white/5 cursor-pointer rounded-full"
      style={{ fontFamily: "Geist, sans-serif", fontWeight: 500, fontSize: "14px" }}>
      <LogIn size={16} className="opacity-80" />
      Enter Platform
    </button>
  </div>
);

export default TopBar;
