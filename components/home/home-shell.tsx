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
      {/* Skip to content link for screen readers */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-primary focus:text-primary-foreground focus:rounded-md focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
        aria-label="Skip to main content"
      >
        Skip to main content
      </a>

      {/* Section navigation with enhanced accessibility */}
      <nav 
        className="fixed left-8 top-1/2 -translate-y-1/2 z-10 hidden lg:block" 
        aria-label="Section navigation"
        role="navigation"
      >
        <div className="flex flex-col gap-4">
          {SECTION_IDS.map((section) => {
            const sectionLabel = section
              .split('-')
              .map(word => word.charAt(0).toUpperCase() + word.slice(1))
              .join(' ');
            
            return (
              <button
                key={section}
                onClick={() => scrollToSection(section)}
                className={`w-2 h-8 rounded-full transition-all duration-500 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:ring-offset-background ${
                  activeSection === section
                    ? "bg-foreground"
                    : "bg-muted-foreground/30 hover:bg-muted-foreground/60 focus:bg-muted-foreground/60"
                }`}
                aria-label={`Navigate to ${sectionLabel} section`}
                aria-current={activeSection === section ? "page" : undefined}
              />
            );
          })}
        </div>
      </nav>

      <main 
        id="main-content" 
        className="max-w-4xl mx-auto px-6 sm:px-8 lg:px-16"
        role="main"
        tabIndex={-1}
      >
        {children}
      </main>

      <div className="fixed bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-background via-background/80 to-transparent pointer-events-none" />
    </div>
  );
});

HomeShell.displayName = "HomeShell";
