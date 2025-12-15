"use client";

import React, { useCallback, useEffect, useMemo, useState } from "react";

import { SECTION_IDS } from "@/components/home/section-ids";

export const HomeShell = React.memo(function HomeShell({
  children,
}: {
  children: React.ReactNode;
}) {
  const [activeSection, setActiveSection] = useState<
    (typeof SECTION_IDS)[number] | ""
  >("");

  const observerOptions = useMemo(
    () => ({
      threshold: 0.3,
      rootMargin: "0px 0px -20% 0px",
    }),
    []
  );

  const onIntersect = useCallback((entries: IntersectionObserverEntry[]) => {
    for (const entry of entries) {
      if (!entry.isIntersecting) continue;

      const target = entry.target as HTMLElement;

      if (!target.dataset.animated) {
        target.classList.add("animate-fade-in-up");
        target.dataset.animated = "true";
      }

      if (target.id) {
        setActiveSection((prev) =>
          prev === target.id ? prev : (target.id as (typeof SECTION_IDS)[number])
        );
      }
    }
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(onIntersect, observerOptions);

    const sections = SECTION_IDS.map((id) => document.getElementById(id)).filter(
      Boolean
    ) as HTMLElement[];

    sections.forEach((section) => observer.observe(section));

    return () => observer.disconnect();
  }, [observerOptions, onIntersect]);

  const scrollToSection = useCallback((section: (typeof SECTION_IDS)[number]) => {
    document.getElementById(section)?.scrollIntoView({ behavior: "smooth" });
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground relative overflow-x-hidden">
      <nav className="fixed left-8 top-1/2 -translate-y-1/2 z-10 hidden lg:block">
        <div className="flex flex-col gap-4">
          {SECTION_IDS.map((section) => (
            <button
              key={section}
              onClick={() => scrollToSection(section)}
              className={`w-2 h-8 rounded-full transition-all duration-500 ${
                activeSection === section
                  ? "bg-foreground"
                  : "bg-muted-foreground/30 hover:bg-muted-foreground/60"
              }`}
              aria-label={`Navigate to ${section}`}
            />
          ))}
        </div>
      </nav>

      <main className="max-w-4xl mx-auto px-6 sm:px-8 lg:px-16">{children}</main>

      <div className="fixed bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-background via-background/80 to-transparent pointer-events-none" />
    </div>
  );
});

HomeShell.displayName = "HomeShell";
