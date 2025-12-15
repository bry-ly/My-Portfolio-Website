"use client";

import React, { useEffect, useRef, useState } from "react";

const LAUNCH_DATE = new Date("2025-11-04T00:00:00Z");
const LAUNCH_TIME = LAUNCH_DATE.getTime();

const formatNumber = (num: number) => String(num).padStart(2, "0");

export function UptimeTimer() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [isInView, setIsInView] = useState(false);
  const [isPageVisible, setIsPageVisible] = useState(true);

  const [uptime, setUptime] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => setIsInView(Boolean(entry?.isIntersecting)),
      { rootMargin: "100px 0px" }
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

  useEffect(() => {
    if (!isInView || !isPageVisible) {
      return;
    }

    const calculateUptime = () => {
      const now = Date.now();
      const diff = now - LAUNCH_TIME;

      if (diff < 0) {
        setUptime({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        return;
      }

      const seconds = Math.floor(diff / 1000);
      const minutes = Math.floor(seconds / 60);
      const hours = Math.floor(minutes / 60);
      const days = Math.floor(hours / 24);

      setUptime({
        days,
        hours: hours % 24,
        minutes: minutes % 60,
        seconds: seconds % 60,
      });
    };

    calculateUptime();
    const interval = setInterval(calculateUptime, 1000);

    return () => clearInterval(interval);
  }, [isInView, isPageVisible]);

  return (
    <div ref={containerRef} className="flex items-center gap-3 text-xs">
      <div className="flex items-center gap-2">
        <div className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
          <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500" />
        </div>
        <span className="text-muted-foreground font-medium">Live Uptime</span>
      </div>
      <div className="flex items-center gap-1.5 font-mono">
        <TimeUnit value={uptime.days} label="Days" />
        <span className="text-muted-foreground pb-3">:</span>
        <TimeUnit value={uptime.hours} label="Hrs" />
        <span className="text-muted-foreground pb-3">:</span>
        <TimeUnit value={uptime.minutes} label="Min" />
        <span className="text-muted-foreground pb-3">:</span>
        <TimeUnit value={uptime.seconds} label="Sec" />
      </div>
    </div>
  );
}

const TimeUnit = React.memo(({ value, label }: { value: number; label: string }) => (
  <div className="flex flex-col items-center">
    <span className="text-foreground font-semibold text-sm">
      {formatNumber(value)}
    </span>
    <span className="text-[10px] text-muted-foreground uppercase tracking-wider">
      {label}
    </span>
  </div>
));

TimeUnit.displayName = "TimeUnit";
