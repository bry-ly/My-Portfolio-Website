"use client";

import React, { useCallback, useEffect, useState } from "react";
import { useTheme } from "next-themes";

export const ThemeToggleButton = React.memo(function ThemeToggleButton() {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [announceText, setAnnounceText] = useState("");

  useEffect(() => setMounted(true), []);

  const isDark = resolvedTheme === "dark";

  const toggleTheme = useCallback(() => {
    const newTheme = isDark ? "light" : "dark";
    setTheme(newTheme);
    
    // Announce theme change for screen readers
    setAnnounceText(`Switched to ${newTheme} theme`);
    setTimeout(() => setAnnounceText(""), 1000);
  }, [isDark, setTheme]);

  if (!mounted) {
    return (
      <>
        <button
          disabled
          className="group p-3 rounded-lg border border-border"
          aria-label="Toggle theme (loading)"
          type="button"
        >
          <span className="block w-4 h-4" aria-hidden="true" />
        </button>
        <div className="sr-only" aria-live="polite">
          {announceText}
        </div>
      </>
    );
  }

  return (
    <>
      <button
        onClick={toggleTheme}
        className="group p-3 rounded-lg border border-border hover:border-muted-foreground/50 focus:border-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:ring-offset-background transition-all duration-300"
        aria-label={isDark ? "Switch to light theme" : "Switch to dark theme"}
        aria-describedby="theme-toggle-description"
        type="button"
      >
        {isDark ? (
          <svg
            className="w-4 h-4 text-muted-foreground group-hover:text-foreground transition-colors duration-300"
            fill="currentColor"
            viewBox="0 0 20 20"
            aria-hidden="true"
          >
            <path
              fillRule="evenodd"
              d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z"
              clipRule="evenodd"
            />
          </svg>
        ) : (
          <svg
            className="w-4 h-4 text-muted-foreground group-hover:text-foreground transition-colors duration-300"
            fill="currentColor"
            viewBox="0 0 20 20"
            aria-hidden="true"
          >
            <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
          </svg>
        )}
      </button>
      
      <div id="theme-toggle-description" className="sr-only">
        Click to toggle between light and dark theme modes
      </div>
      
      <div className="sr-only" aria-live="polite" aria-atomic="true">
        {announceText}
      </div>
    </>
  );
});

ThemeToggleButton.displayName = "ThemeToggleButton";
