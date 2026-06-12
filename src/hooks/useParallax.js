import { useEffect } from "react";
import { gsap } from "gsap";

export const useParallax = (containerRef, targetSelector, speed = 0.05) => {
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleMouseMove = (e) => {
      const { clientX, clientY } = e;
      const { width, height, left, top } = container.getBoundingClientRect();
      const x = (clientX - (left + width / 2)) * speed;
      const y = (clientY - (top + height / 2)) * speed;

      gsap.to(targetSelector, {
        x,
        y,
        duration: 1.2,
        ease: "power2.out",
        overwrite: "auto",
      });
    };

    container.addEventListener("mousemove", handleMouseMove);

    return () => {
      container.removeEventListener("mousemove", handleMouseMove);
    };
  }, [containerRef, targetSelector, speed]);
};
