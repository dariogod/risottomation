"use client";

import { useEffect, useRef, useState } from "react";

export default function VideoSection() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isMuted, setIsMuted] = useState(true);

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !videoRef.current.muted;
      setIsMuted(videoRef.current.muted);
    }
  };

  useEffect(() => {
    const video = videoRef.current;
    const section = sectionRef.current;
    
    if (!video || !section) return;

    // Sync state with video muted property
    setIsMuted(video.muted);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Try to play with sound first
            const playPromise = video.play();
            if (playPromise !== undefined) {
              playPromise.catch((error) => {
                // If autoplay with sound fails, try muted autoplay as fallback
                console.warn("Autoplay with sound blocked, trying muted:", error);
                video.muted = true;
                setIsMuted(true);
                video.play().catch((err) => {
                  console.error("Error playing video:", err);
                });
              });
            }
          } else {
            video.pause();
          }
        });
      },
      {
        threshold: 0.5, // Start playing when 50% of the video is visible
      }
    );

    observer.observe(section);

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <section id="video" ref={sectionRef} className="relative w-full py-12 md:py-20 bg-[#faf0d8]">
      <div className="max-w-6xl mx-auto px-4">
        <div className="relative w-full aspect-video rounded-lg overflow-hidden shadow-xl">
          <video
            ref={videoRef}
            src="/product_video.MOV"
            className="w-full h-full object-cover"
            playsInline
            loop
            preload="metadata"
            muted
          >
            Your browser does not support the video tag.
          </video>
          
          {/* Mute/Unmute Button */}
          <button
            onClick={toggleMute}
            className="absolute bottom-4 right-4 bg-black/60 hover:bg-black/80 text-white rounded-full p-3 transition-all duration-200 flex items-center justify-center z-10"
            aria-label={isMuted ? "Unmute video" : "Mute video"}
          >
            {isMuted ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-6 h-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M17 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2"
                />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-6 h-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z"
                />
              </svg>
            )}
          </button>
        </div>
      </div>
    </section>
  );
}

