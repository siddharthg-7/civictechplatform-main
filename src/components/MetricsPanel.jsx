import React from "react";
import GlassCard from "./GlassCard";

const MetricsPanel = ({ children, title, icon: Icon, color, badge }) => {
  return (
    <GlassCard glowColor={color} className="w-full">
      <div className="p-8 md:p-10 flex flex-col gap-6">
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-bold text-white tracking-wide">{title}</h3>
          {Icon && (
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center border"
              style={{
                borderColor: `${color}30`,
                background: `${color}10`,
              }}
            >
              <Icon style={{ color }} size={20} />
            </div>
          )}
        </div>

        {children}

        <div className="h-[1px] w-full bg-white/5" />

        <div className="flex items-center justify-between text-xs text-slate-400 font-semibold tracking-wider">
          <span className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            <span>{badge || "SECURE SYSTEM LINK"}</span>
          </span>
          <span style={{ color }} className="font-mono">
            LIVE FEED
          </span>
        </div>
      </div>
    </GlassCard>
  );
};

export default MetricsPanel;
