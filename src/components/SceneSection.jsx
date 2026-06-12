import React from "react";

/**
 * SceneSection — fullscreen absolute layer for each scroll scene.
 * 
 * IMPORTANT: opacity is NOT set via className here.
 * Initial visibility is controlled entirely by GSAP in sceneTimelines.js
 * via gsap.set() so there are no CSS/GSAP specificity conflicts.
 * 
 * isInitialVisible is used only as a data hint — actual initial opacity
 * is set by gsap.set in the animation hook.
 */
const SceneSection = React.forwardRef(({ children, isInitialVisible, isActive }, ref) => {
  return (
    <div
      ref={ref}
      data-scene-initial={isInitialVisible ? "visible" : "hidden"}
      className={`absolute inset-0 flex items-center w-full h-full ${
        isActive ? "pointer-events-auto" : "pointer-events-none"
      }`}
      style={{
        // Scene 0 visible by default, others invisible.
        // GSAP will overwrite this immediately on init.
        opacity: isInitialVisible ? 1 : 0,
      }}
    >
      {children}
    </div>
  );
});

SceneSection.displayName = "SceneSection";
export default SceneSection;
