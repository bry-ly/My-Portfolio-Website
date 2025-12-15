"use client";

import React, { useMemo } from "react";

import { TechIcons } from "@/components/comp/tech-icons";
import { InfiniteTechSlider } from "@/components/ui/infinite-tech-slider";

const FOCUS_TECHNOLOGIES = [
  { name: "Next.js", icon: TechIcons.NextJS, color: "currentColor" },
  { name: "React", icon: TechIcons.React, color: "text-[#61DAFB]" },
  { name: "TypeScript", icon: TechIcons.TypeScript, color: "text-[#3178C6]" },
  { name: "JavaScript", icon: TechIcons.JavaScript, color: "text-[#F7DF1E]" },
  {
    name: "Tailwind CSS",
    icon: TechIcons.TailwindCSS,
    color: "text-[#06B6D4]",
  },
  { name: "Shadcn UI", icon: TechIcons.Shadcn, color: "text-foreground" },
  { name: "Prisma", icon: TechIcons.Prisma, color: "text-[#2D3748]" },
  { name: "PostgreSQL", icon: TechIcons.PostgreSQL, color: "text-[#336791]" },
  { name: "MongoDB", icon: TechIcons.MongoDB, color: "text-[#47A248]" },
  { name: "Express.js", icon: TechIcons.Express, color: "text-gray-400" },
  { name: "Better Auth", icon: TechIcons.BetterAuth, color: "text-yellow-500" },
  { name: "HTML5", icon: TechIcons.HTML5, color: "text-[#E34F26]" },
  { name: "Git", icon: TechIcons.Git, color: "text-[#E34F26]" },
  { name: "NodeJs", icon: TechIcons.Node, color: "text-[#0DDB24]" },
] as const;

export const FocusCarousel = React.memo(function FocusCarousel({
  className,
}: {
  className?: string;
}) {
  const technologies = useMemo(() => [...FOCUS_TECHNOLOGIES], []);

  return (
    <InfiniteTechSlider
      technologies={technologies}
      speed={20}
      direction="left"
      className={className}
    />
  );
});

FocusCarousel.displayName = "FocusCarousel";
