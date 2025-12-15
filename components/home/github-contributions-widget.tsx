"use client";

import dynamic from "next/dynamic";
import React, { Suspense } from "react";

import type { Activity } from "@/components/kibo-ui/contribution-graph";
import { LazyOnView } from "@/components/home/lazy-on-view";
import { Panel, PanelContent } from "@/components/ui/panel";
import { Skeleton } from "@/components/ui/skeleton";
import { TooltipProvider } from "@/components/ui/tooltip";

const GitHubContributions = dynamic(
  () =>
    import("@/components/github-contribution-client").then(
      (m) => m.GitHubContributions
    ),
  { suspense: true }
);

function ContributionsFallback() {
  return (
    <div className="space-y-3">
      <Skeleton className="h-[162px] w-full" />
      <div className="flex items-center justify-between">
        <Skeleton className="h-4 w-40" />
        <Skeleton className="h-4 w-24" />
      </div>
    </div>
  );
}

export const GitHubContributionsWidget = React.memo(
  function GitHubContributionsWidget({
    contributions,
  }: {
    contributions: Activity[];
  }) {
    if (contributions.length === 0) {
      return null;
    }

    return (
      <LazyOnView
        rootMargin="600px 0px"
        fallback={<ContributionsFallback />}
      >
        <div className="mt-16 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
            <h3 className="text-2xl sm:text-3xl font-light">
              GitHub Contributions
            </h3>
            <div className="text-sm text-muted-foreground font-mono">
              CODING ACTIVITY
            </div>
          </div>

          <Panel className="rounded-lg">
            <PanelContent>
              <TooltipProvider>
                <Suspense fallback={<ContributionsFallback />}>
                  <GitHubContributions contributions={contributions} />
                </Suspense>
              </TooltipProvider>
            </PanelContent>
          </Panel>
        </div>
      </LazyOnView>
    );
  }
);

GitHubContributionsWidget.displayName = "GitHubContributionsWidget";
