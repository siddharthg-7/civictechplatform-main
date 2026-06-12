import React, { useEffect, useRef, useImperativeHandle } from "react";

  const VideoBackground = React.forwardRef(({ videoSrc, isActive }, ref) => {
    const videoRef = useRef(null);

    // expose the video element to parent for animation control
    useImperativeHandle(ref, () => videoRef.current);

    useEffect(() => {
      const video = videoRef.current;
      if (!video) return;
      video.muted = true;
      video.loop = true;
      video.playsInline = true;

      if (isActive) {
        const playPromise = video.play();
        if (playPromise !== undefined) {
          playPromise.catch(() => {
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
    }, [isActive, videoSrc]);

    return (
      <div className="absolute inset-0 w-full h-full overflow-hidden">
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
            transformOrigin: "center",
            willChange: "transform",
          }}
        />
        {/* Cinematic grading */}
        <div className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "linear-gradient(to bottom, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0.20) 50%, rgba(0,0,0,0.65) 100%)",
          }}
        />
        <div className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "linear-gradient(to right, rgba(0,0,0,0.45) 0%, transparent 60%, rgba(0,0,0,0.25) 100%)",
          }}
        />
      </div>
    );
  });

  export default VideoBackground;