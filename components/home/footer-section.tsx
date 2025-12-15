"use client";

import Link from "next/link";
import React from "react";

import { TechIcons } from "@/components/comp/tech-icons";
import { UptimeTimer } from "@/components/comp/uptime-timer";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { ThemeToggleButton } from "@/components/home/theme-toggle-button";

export const FooterSection = React.memo(function FooterSection() {
  return (
    <footer className="py-10 sm:py-10 border-t border-border">
      <TooltipProvider>
        <div className="space-y-2">
          <div className="flex justify-center pb-6 border-b border-border/50">
            <UptimeTimer />
          </div>

          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 sm:gap-8">
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                © 2025 Bryan Palay. All rights reserved.
              </div>
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <span>Built with </span>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Link
                      href="https://nextjs.org"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:scale-110 transition-transform duration-200"
                    >
                      <TechIcons.NextJS className="w-3.5 h-3.5 text-sky-400" />
                    </Link>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Next.js</p>
                  </TooltipContent>
                </Tooltip>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Link
                      href="https://ui.shadcn.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:scale-110 transition-transform duration-200"
                    >
                      <TechIcons.Shadcn className="w-3.5 h-3.5" />
                    </Link>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Shadcn UI</p>
                  </TooltipContent>
                </Tooltip>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Link
                      href="https://resend.com/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:scale-110 transition-transform duration-200"
                    >
                      <TechIcons.Resend className="w-3.5 h-3.5" />
                    </Link>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Resend</p>
                  </TooltipContent>
                </Tooltip>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Link
                      href="https://tailwindcss.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:scale-110 transition-transform duration-200"
                    >
                      <TechIcons.TailwindCSS className="w-3.5 h-3.5 text-sky-400" />
                    </Link>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Tailwind CSS</p>
                  </TooltipContent>
                </Tooltip>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Link
                      href="https://www.typescriptlang.org/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:scale-110 transition-transform duration-200"
                    >
                      <TechIcons.TypeScript className="w-3.5 h-3.5 text-sky-600" />
                    </Link>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>TypeScript</p>
                  </TooltipContent>
                </Tooltip>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Link
                      href="https://reactjs.org/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:scale-110 transition-transform duration-200"
                    >
                      <TechIcons.React className="w-3.5 h-3.5 text-sky-500" />
                    </Link>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>React</p>
                  </TooltipContent>
                </Tooltip>
              </div>
              <Link
                href="https://vercel.com"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-xs text-muted-foreground hover:text-foreground transition-colors duration-300"
              >
                <span>Deployed on</span>
                <TechIcons.Vercel className="w-4 h-4" />
                <span className="font-medium">Vercel</span>
              </Link>
            </div>

            <div className="flex items-center gap-4">
              <ThemeToggleButton />

              <button
                type="button"
                className="group p-3 rounded-lg border border-border hover:border-muted-foreground/50 transition-all duration-300"
                aria-label="Feedback"
              >
                <svg
                  className="w-4 h-4 text-muted-foreground group-hover:text-foreground transition-colors duration-300"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </TooltipProvider>
    </footer>
  );
});

FooterSection.displayName = "FooterSection";
