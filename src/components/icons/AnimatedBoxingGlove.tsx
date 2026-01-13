"use client";

import { useEffect, useRef } from "react";
import Lottie, { LottieRefCurrentProps } from "lottie-react";
import animationData from "../../../public/animations/boxing-glove.json";

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

  useEffect(() => {
    if (lottieRef.current && !autoplay) {
      lottieRef.current.stop();
    }
  }, [autoplay]);

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
