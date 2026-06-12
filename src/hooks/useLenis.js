import { useEffect, useRef } from "react";
import Lenis from "lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

/**
 * useLenis
 * Cinematic smooth scroll — spec:
 *   lerp:            0.08   low value = more lag = silky cinematic feel
 *   wheelMultiplier: 1      standard wheel speed
 *   touchMultiplier: 1.2    slightly faster on touch for responsiveness
 *   normalizeWheel:  true   consistent across trackpad / mouse / HiDPI
 *
 * GSAP sync:
 *   ScrollTrigger.update() called on every Lenis scroll event
 *   lenis.raf() called from gsap.ticker so everything is frame-locked
 *   lagSmoothing(0) prevents GSAP skipping frames on lag spikes
 */
const useLenis = (options = { lerp: 0.08, wheelMultiplier: 1, touchMultiplier: 1.2 }) => {
  const lenisRef = useRef(null);

  useEffect(() => {
    // Disable native smooth scroll so Lenis is sole scroll driver
    document.documentElement.style.scrollBehavior = "auto";

    const lenis = new Lenis({
      lerp:               0.08,
      wheelMultiplier:    1,
      touchMultiplier:    1.2,
      smoothWheel:        true,
      syncTouch:          false,
      infinite:           false,
      orientation:        "vertical",
      gestureOrientation: "vertical",
      normalizeWheel:     true,
    });

    lenisRef.current = lenis;

    // Keep GSAP ScrollTrigger in sync with Lenis scroll position
    lenis.on("scroll", ScrollTrigger.update);

    // Drive from GSAP ticker — single frame loop for all animations
    const onTick = (time) => lenis.raf(time * 1000);
    gsap.ticker.add(onTick);
    gsap.ticker.lagSmoothing(0);

    return () => {
      lenis.destroy();
      gsap.ticker.remove(onTick);
      document.documentElement.style.scrollBehavior = "";
    };
  }, []);

  return lenisRef;
};

export default useLenis;
