 import React from "react";

  const GlassCard = ({ children, className = "", style = {}, glowColor = "" }) => {
    return (
      <div
        className={`relative rounded-[2rem] overflow-hidden border border-white/10 bg-black/40 backdrop-blur-xl
  shadow-2xl ${className}`}
        style={{
          boxShadow: glowColor
            ? `0 25px 60px rgba(0,0,0,0.6), 0 0 40px ${glowColor}22`
            : "0 25px 60px rgba(0,0,0,0.6)",
          ...style,
        }}
      >
        {glowColor && (
          <div
            className="absolute -top-16 -left-16 w-48 h-48 rounded-full blur-[100px] pointer-events-none opacity-25"
            style={{ background: glowColor }}
          />
        )}
        <div className="relative z-10">{children}</div>
      </div>
    );
  };

  export default GlassCard;
