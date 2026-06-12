const NavDots = ({ scenes, activeScene, onDotClick, onCTA }) => (
  <div className="fixed right-6 top-1/2 -translate-y-1/2 z-[200] hidden md:flex flex-col gap-[14px]">
    {scenes.map((scene, i) => {
      const active = i === activeScene;
      return (
        <button
          key={i}
          onClick={() => onDotClick(i)}
          className="group relative flex items-center justify-center w-5 h-5 focus:outline-none"
          aria-label={scene.title}
        >
          {/* Tooltip */}
          <span
            className="absolute right-7 whitespace-nowrap px-2.5 py-1 rounded-lg text-[9px] font-black tracking-[0.18em] uppercase opacity-0 translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200 pointer-events-none border border-white/[0.09]"
            style={{ background: "rgba(0,0,0,0.9)", color: scene.color }}>
            {scene.title}
          </span>

          {/* Ping on active */}
          {active && (
            <span className="absolute inset-0 rounded-full animate-ping opacity-25 pointer-events-none"
              style={{ background: scene.color }} />
          )}

          {/* Dot */}
          <span
            className="rounded-full block transition-all duration-300"
            style={{
              width:      active ? 10 : 5,
              height:     active ? 10 : 5,
              background: active ? scene.color : "rgba(255,255,255,0.18)",
              boxShadow:  active ? `0 0 12px ${scene.color}` : "none",
            }}
          />
        </button>
      );
    })}

    {/* CTA dot */}
    <button
      onClick={onCTA}
      className="group relative flex items-center justify-center w-5 h-5 focus:outline-none mt-1"
      aria-label="Final CTA">
      <span
        className="absolute right-7 whitespace-nowrap px-2.5 py-1 rounded-lg text-[9px] font-black tracking-[0.18em] uppercase opacity-0 translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200 pointer-events-none border border-white/[0.09]"
        style={{ background: "rgba(0,0,0,0.9)", color: "rgba(255,255,255,0.4)" }}>
        Launch Portal
      </span>
      <span
        className="w-1.5 h-1.5 rounded-full block transition-all duration-300 group-hover:scale-150"
        style={{ background: "rgba(255,255,255,0.12)" }}
      />
    </button>
  </div>
);

export default NavDots;
