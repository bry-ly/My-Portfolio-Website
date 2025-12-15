"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import { cn } from "@/lib/utils";

interface Tech {
  name: string;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  color: string;
}

interface InfiniteTechSliderProps {
  technologies: Tech[];
  className?: string;
  speed?: number;
  direction?: "left" | "right";
}

const TechItem = React.memo(
  ({ tech }: { tech: Tech; keyPrefix: string }) => (
    <div className="flex-shrink-0 flex items-center gap-2 px-3 py-2">
      <tech.icon className={`w-4 h-4 ${tech.color}`} />
      <span className="text-xs font-medium text-foreground whitespace-nowrap">
        {tech.name}
      </span>
    </div>
  )
);
TechItem.displayName = "TechItem";

export const InfiniteTechSlider = React.memo(function InfiniteTechSlider({
  technologies,
  className,
  speed = 30,
  direction = "left",
}: InfiniteTechSliderProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [isInView, setIsInView] = useState(true);
  const [isPageVisible, setIsPageVisible] = useState(true);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  // Check for reduced motion preference
  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mediaQuery.matches);

    const handleChange = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches);
    };

    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => setIsInView(Boolean(entry?.isIntersecting)),
      { rootMargin: "200px 0px" }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const onVisibilityChange = () => setIsPageVisible(!document.hidden);
    onVisibilityChange();

    document.addEventListener("visibilitychange", onVisibilityChange);
    return () =>
      document.removeEventListener("visibilitychange", onVisibilityChange);
  }, []);

  const maskStyle = useMemo(
    () => ({
      maskImage:
        "linear-gradient(to right, transparent, white 10%, white 90%, transparent)",
      WebkitMaskImage:
        "linear-gradient(to right, transparent, white 10%, white 90%, transparent)",
    }),
    []
  );

  const animationStyle = useMemo(
    () => ({
      animationDuration: `${speed}s`,
      animationDirection: direction === "right" ? "reverse" : "normal",
      animationPlayState: isInView && isPageVisible && !prefersReducedMotion ? "running" : "paused",
      width: "max-content",
    }),
    [speed, direction, isInView, isPageVisible, prefersReducedMotion]
  );

  return (
    <>
      {/* Screen reader announcement for animation state */}
      <div 
        className="sr-only" 
        aria-live="polite"
        aria-atomic="true"
      >
        {prefersReducedMotion ? "Animations paused due to reduced motion preference" : null}
      </div>
      
      <div
        ref={containerRef}
        className={cn(
          "w-full overflow-x-hidden overflow-y-visible touch-none pointer-events-none",
          className
        )}
        style={maskStyle}
        role="region"
        aria-label="Technology stack"
        aria-roledescription="scrolling list"
      >
        {prefersReducedMotion ? (
          // Static fallback for reduced motion users
          <div className="flex gap-2 flex-wrap">
            {technologies.map((tech, index) => (
              <TechItem key={`tech-static-${index}`} tech={tech} keyPrefix="tech" />
            ))}
          </div>
        ) : (
          // Animated version
          <div
            className={cn(
              "flex gap-6 flex-nowrap animate-infinite-scroll whitespace-nowrap will-change-transform"
            )}
            style={animationStyle}
          >
            {technologies.map((tech, index) => (
              <TechItem key={`tech-${index}`} tech={tech} keyPrefix="tech" />
            ))}
            {technologies.map((tech, index) => (
              <TechItem key={`tech-dup-${index}`} tech={tech} keyPrefix="tech-dup" />
            ))}
          </div>
        )}
      </div>
    </>
  );
});

InfiniteTechSlider.displayName = "InfiniteTechSlider";
