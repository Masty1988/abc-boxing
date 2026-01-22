"use client";

import { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import type { LottieRefCurrentProps } from "lottie-react";

// Dynamic import pour reduire le bundle initial (~150KB economises)
const Lottie = dynamic(() => import("lottie-react"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full flex items-center justify-center">
      <span className="text-2xl">🥊</span>
    </div>
  ),
});

interface AnimatedBoxingGloveProps {
  className?: string;
  autoplay?: boolean;
  loop?: boolean;
}

export function AnimatedBoxingGlove({
  className = "w-12 h-12",
  autoplay = false,
  loop = false,
}: AnimatedBoxingGloveProps) {
  const lottieRef = useRef<LottieRefCurrentProps>(null);
  const [animationData, setAnimationData] = useState<object | null>(null);

  // Charger les donnees d'animation de maniere asynchrone
  useEffect(() => {
    import("../../../public/animations/boxing-glove.json").then((data) => {
      setAnimationData(data.default);
    });
  }, []);

  useEffect(() => {
    if (lottieRef.current && !autoplay) {
      lottieRef.current.stop();
    }
  }, [autoplay, animationData]);

  const handleMouseEnter = () => {
    if (lottieRef.current && !autoplay) {
      lottieRef.current.play();
    }
  };

  const handleMouseLeave = () => {
    if (lottieRef.current && !autoplay && !loop) {
      lottieRef.current.stop();
    }
  };

  if (!animationData) {
    return (
      <div className={className}>
        <div className="w-full h-full flex items-center justify-center">
          <span className="text-2xl">🥊</span>
        </div>
      </div>
    );
  }

  return (
    <div
      className={className}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <Lottie
        lottieRef={lottieRef}
        animationData={animationData}
        loop={loop}
        autoplay={autoplay}
      />
    </div>
  );
}
