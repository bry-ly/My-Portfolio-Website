"use client";

import React, { useMemo } from "react";

import { TechIcons } from "@/components/comp/tech-icons";
import { getIconColor } from "@/components/home/icon-utils";
import { InfiniteTechSlider } from "@/components/ui/infinite-tech-slider";

const TECH_ICON_KEY_BY_NORMALIZED_NAME: Record<string, keyof typeof TechIcons> = {
  nextjs: "NextJS",
  react: "React",
  typescript: "TypeScript",
  javascript: "JavaScript",
  tailwindcss: "TailwindCSS",
  shadcnui: "Shadcn",
  prisma: "Prisma",
  postgresql: "PostgreSQL",
  mongodb: "MongoDB",
  expressjs: "Express",
  betterauth: "BetterAuth",
  html5: "HTML5",
  git: "Git",
  nodejs: "Node",
  node: "Node",
};

function normalizeTechName(name: string) {
  return name.replace(/[^a-zA-Z0-9]/g, "").toLowerCase();
}

export const ProjectTechSlider = React.memo(function ProjectTechSlider({
  techNames,
  speed = 15,
  direction = "left",
}: {
  techNames: string[];
  speed?: number;
  direction?: "left" | "right";
}) {
  const technologies = useMemo(
    () =>
      techNames.map((name) => {
        const normalized = normalizeTechName(name);
        const iconKey = TECH_ICON_KEY_BY_NORMALIZED_NAME[normalized];

        const Icon =
          iconKey && TechIcons[iconKey]
            ? TechIcons[iconKey]
            : TechIcons.Git;

        return {
          name,
          icon: Icon,
          color: getIconColor(name),
        };
      }),
    [techNames]
  );

  return (
    <InfiniteTechSlider
      technologies={technologies}
      speed={speed}
      direction={direction}
    />
  );
});

ProjectTechSlider.displayName = "ProjectTechSlider";
