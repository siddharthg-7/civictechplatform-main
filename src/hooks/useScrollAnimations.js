import { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export const useScrollAnimations = (containerRef, onActiveIndexChange, onScrollProgressChange) => {
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: container,
        start: "top top",
        end: "bottom bottom",
        scrub: 1.2,
        snap: {
          snapTo: 1 / 6,
          duration: { min: 0.3, max: 0.8 },
          delay: 0.15,
          ease: "power2.out",
        },
        onUpdate: (self) => {
          if (onScrollProgressChange) onScrollProgressChange(self.progress);
          const index = Math.min(Math.round(self.progress * 6), 6);
          if (onActiveIndexChange) onActiveIndexChange(index);
        },
      },
    });

    return () => {
      tl.kill();
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, [containerRef, onActiveIndexChange, onScrollProgressChange]);
};
