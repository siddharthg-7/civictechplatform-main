import { ShieldCheck, LogIn } from "lucide-react";
import { href } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { GetStartedButton } from "@/components/ui/get-started-button";

const TopBar = ({ onEnter }) => {
  const navigate = useNavigate();

  return (
    <div className="fixed top-0 left-0 right-0 z-[200] flex items-center justify-between px-8 py-5 pointer-events-none bg-transparent">
      {/* Logo */}
      <div onClick={() => (window.location.href = "/")} className="pointer-events-auto flex items-center gap-2 cursor-pointer">
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
      <div className="pointer-events-auto">
        <GetStartedButton onClick={() => navigate("/login")}>
          Enter Platform
        </GetStartedButton>
      </div>
    </div>
  );
};

export default TopBar;
