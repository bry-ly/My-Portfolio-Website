"use client";

import dynamic from "next/dynamic";
import React, { Suspense } from "react";

import type { ExperienceItemType } from "@/components/work-experience";
import { LazyOnView } from "@/components/home/lazy-on-view";
import { Skeleton } from "@/components/ui/skeleton";

const WorkExperience = dynamic(
  () => import("@/components/work-experience").then((m) => m.WorkExperience),
  { suspense: true }
);

function WorkExperienceFallback() {
  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Skeleton className="h-4 w-40" />
        <Skeleton className="h-4 w-72" />
      </div>
      <Skeleton className="h-24 w-full" />
      <Skeleton className="h-24 w-full" />
    </div>
  );
}

export const WorkExperienceWidget = React.memo(function WorkExperienceWidget({
  experiences,
}: {
  experiences: ExperienceItemType[];
}) {
  return (
    <LazyOnView rootMargin="300px 0px" fallback={<WorkExperienceFallback />}>
      <Suspense fallback={<WorkExperienceFallback />}>
        <WorkExperience experiences={experiences} />
      </Suspense>
    </LazyOnView>
  );
});

WorkExperienceWidget.displayName = "WorkExperienceWidget";
