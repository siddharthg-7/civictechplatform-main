import React, { useEffect, useRef, useImperativeHandle } from "react";

const VideoBackground = React.forwardRef(({ videoSrc, isActive }, ref) => {
  const videoRef = useRef(null);

  // Expose the raw video element so GSAP can animate its transform
  useImperativeHandle(ref, () => videoRef.current);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    video.muted = true;
    video.loop = true;
    video.playsInline = true;

    if (isActive) {
      // Try to play; browsers allow muted autoplay
      const promise = video.play();
      if (promise !== undefined) {
        promise.catch(() => {
          // Retry once on user interaction
          const retry = () => {
            video.play().catch(() => {});
            document.removeEventListener("click", retry);
            document.removeEventListener("touchstart", retry);
          };
          document.addEventListener("click", retry, { once: true });
          document.addEventListener("touchstart", retry, { once: true });
        });
      }
    } else {
      video.pause();
    }
  }, [isActive]);

  return (
    <div className="absolute inset-0 w-full h-full overflow-hidden">
      {/* 
        No autoPlay attr — we control play/pause imperatively.
        No inline brightness filter — that was making videos look black.
      */}
      <video
        ref={videoRef}
        src={videoSrc}
        muted
        playsInline
        loop
        preload="auto"
        className="absolute inset-0 w-full h-full object-cover"
        style={{
          transform: "scale(1.05)",
          transformOrigin: "center center",
          willChange: "transform",
        }}
      />

      {/* Cinematic grading — dark enough for text legibility, bright enough to see video */}
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: "linear-gradient(to bottom, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0.20) 50%, rgba(0,0,0,0.65) 100%)" }} />
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: "linear-gradient(to right, rgba(0,0,0,0.45) 0%, transparent 60%, rgba(0,0,0,0.25) 100%)" }} />

      {/* Subtle grid overlay */}
      <div className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: "linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />
    </div>
  );
});

VideoBackground.displayName = "VideoBackground";
export default VideoBackground;
