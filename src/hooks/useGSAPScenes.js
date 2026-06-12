import { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { buildStoryTimeline } from "../animations/sceneTimelines";

gsap.registerPlugin(ScrollTrigger);

export const useGSAPScenes = (
  containerRef,
  sceneRefs,
  textRefs,
  cardRefs,
  videoRefs,
  setActiveIndex,
  setScrollProgress,
  isReady
) => {
  useEffect(() => {
    if (!isReady) return;

    const container = containerRef.current;
    if (!container) return;

    const scenes  = sceneRefs.current.filter(Boolean);
    const texts   = textRefs.current.filter(Boolean);
    const cards   = cardRefs.current.filter(Boolean);
    const videos  = videoRefs.current.filter(Boolean);

    if (scenes.length !== 7 || texts.length !== 7 || cards.length !== 7 || videos.length !== 7) return;

    const tl = buildStoryTimeline(
      container,
      scenes,
      texts,
      cards,
      videos,
      setActiveIndex,
      setScrollProgress
    );

    return () => {
      tl.kill();
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, [isReady]); // eslint-disable-line react-hooks/exhaustive-deps
};
