"use client";

import React, { useEffect, useRef, useState } from "react";

type RenderMode = "once" | "inView";

export const LazyOnView = React.memo(function LazyOnView({
  children,
  fallback = null,
  rootMargin = "200px 0px",
  mode = "once",
}: {
  children: React.ReactNode;
  fallback?: React.ReactNode;
  rootMargin?: string;
  mode?: RenderMode;
}) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [isInView, setIsInView] = useState(false);
  const [hasBeenInView, setHasBeenInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        const intersecting = Boolean(entry?.isIntersecting);

        setIsInView(intersecting);

        if (intersecting) {
          setHasBeenInView(true);
        }
      },
      { rootMargin }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [rootMargin]);

  const shouldRender = mode === "once" ? hasBeenInView : isInView;

  return <div ref={ref}>{shouldRender ? children : fallback}</div>;
});

LazyOnView.displayName = "LazyOnView";
