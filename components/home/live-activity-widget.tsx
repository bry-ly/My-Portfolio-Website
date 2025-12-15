"use client";

import dynamic from "next/dynamic";
import React, { Suspense } from "react";

import { LazyOnView } from "@/components/home/lazy-on-view";
import { Skeleton } from "@/components/ui/skeleton";

const LiveActivity = dynamic(
  () => import("@/components/comp/live-activity").then((m) => m.LiveActivity),
  { suspense: true }
);

function LiveActivityFallback() {
  return (
    <div className="space-y-6 sm:space-y-8">
      <div className="space-y-3">
        <Skeleton className="h-10 w-56" />
        <Skeleton className="h-4 w-full max-w-xl" />
      </div>
      <div className="space-y-4 rounded-lg border border-border/50 p-6">
        <div className="flex items-start justify-between gap-4">
          <div className="space-y-2">
            <Skeleton className="h-5 w-48" />
            <Skeleton className="h-4 w-64" />
          </div>
          <Skeleton className="h-9 w-9 rounded-full" />
        </div>
        <div className="space-y-3">
          <Skeleton className="h-4 w-3/4" />
          <Skeleton className="h-4 w-2/3" />
          <Skeleton className="h-4 w-1/2" />
        </div>
      </div>
    </div>
  );
}

export const LiveActivityWidget = React.memo(function LiveActivityWidget() {
  return (
    <LazyOnView
      rootMargin="400px 0px"
      mode="inView"
      fallback={<LiveActivityFallback />}
    >
      <Suspense fallback={<LiveActivityFallback />}>
        <LiveActivity />
      </Suspense>
    </LazyOnView>
  );
});

LiveActivityWidget.displayName = "LiveActivityWidget";
