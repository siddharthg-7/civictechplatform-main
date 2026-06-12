import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export const buildStoryTimeline = (
  container,
  sceneElements,   // SceneSection wrapper divs
  textElements,    // textRef divs inside each scene
  cardElements,    // cardRef divs inside each scene
  videoElements,   // raw <video> elements
  onActiveIndexChange,
  onScrollProgressChange
) => {
  const N = sceneElements.length; // 7
  const HOLD  = 1.0;  // timeline units a scene stays fully on
  const XFADE = 0.6;  // timeline units for crossfade to next

  // ── Hard-set ALL initial states before any animation ──
  sceneElements.forEach((el, i) => {
    gsap.set(el, { opacity: i === 0 ? 1 : 0, force3D: true });
  });
  textElements.forEach((el, i) => {
    gsap.set(el, { opacity: i === 0 ? 1 : 0, y: i === 0 ? 0 : 50, force3D: true });
  });
  cardElements.forEach((el, i) => {
    gsap.set(el, { opacity: i === 0 ? 1 : 0, y: i === 0 ? 0 : 60, scale: i === 0 ? 1 : 0.93, force3D: true });
  });
  // Video elements — no opacity manipulation, GSAP only moves scale
  videoElements.forEach((el) => {
    if (el) gsap.set(el, { scale: 1.05, force3D: true });
  });

  // ── Build master timeline ──
  const tl = gsap.timeline({ defaults: { ease: "none" } });

  for (let i = 0; i < N; i++) {
    const tScene = i * (HOLD + XFADE); // when scene i is fully on

    if (i < N - 1) {
      const tX = tScene + HOLD; // when crossfade to scene i+1 begins

      // ── Scene i EXIT ──
      tl.to(textElements[i],
        { opacity: 0, y: -40, duration: XFADE * 0.55, ease: "power2.in" },
        tX
      );
      tl.to(cardElements[i],
        { opacity: 0, y: -55, scale: 0.93, duration: XFADE * 0.55, ease: "power2.in" },
        tX
      );
      tl.to(sceneElements[i],
        { opacity: 0, duration: XFADE, ease: "power1.inOut" },
        tX
      );
      tl.to(videoElements[i],
        { scale: 1.12, duration: XFADE, ease: "power1.inOut" },
        tX
      );

      // ── Scene i+1 ENTRY ──
      tl.to(sceneElements[i + 1],
        { opacity: 1, duration: XFADE, ease: "power1.inOut" },
        tX
      );
      tl.fromTo(videoElements[i + 1],
        { scale: 1.12 },
        { scale: 1.05, duration: XFADE, ease: "power1.inOut" },
        tX
      );
      tl.to(textElements[i + 1],
        { opacity: 1, y: 0, duration: XFADE * 0.65, ease: "power3.out" },
        tX + XFADE * 0.35
      );
      tl.to(cardElements[i + 1],
        { opacity: 1, y: 0, scale: 1, duration: XFADE * 0.65, ease: "power3.out" },
        tX + XFADE * 0.4
      );
    }
  }

  // Pad timeline so last scene stays on screen during final hold
  tl.to({}, { duration: HOLD }, (N - 1) * (HOLD + XFADE));

  // ── Attach to scroll ──
  ScrollTrigger.create({
    trigger: container,
    start: "top top",
    end: "bottom bottom",
    scrub: 1.4,
    animation: tl,
    snap: {
      snapTo: 1 / (N - 1),
      duration: { min: 0.25, max: 0.7 },
      delay: 0.08,
      ease: "power2.inOut",
    },
    onUpdate(self) {
      if (onScrollProgressChange) onScrollProgressChange(self.progress);

      // Derive active scene index from scrub position
      const totalUnits = N * HOLD + (N - 1) * XFADE;
      const pos = self.progress * totalUnits;
      let idx = 0;
      for (let i = 0; i < N; i++) {
        if (pos >= i * (HOLD + XFADE) - 0.01) idx = i;
      }
      if (onActiveIndexChange) onActiveIndexChange(Math.min(idx, N - 1));
    },
  });

  return tl;
};
