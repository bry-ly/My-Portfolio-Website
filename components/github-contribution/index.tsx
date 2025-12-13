import { Suspense } from "react";

import { getGitHubContributions } from "@/lib/github";
import { GitHubContributionFallback, GitHubContributionGraph } from "./graph";

async function GitHubContributionsContent() {
  const contributions = await getGitHubContributions();

  return <GitHubContributionGraph contributions={contributions} />;
}

export function GitHubContributions() {
  return (
    <div>
      <h2 className="sr-only">GitHub Contributions</h2>

      <Suspense fallback={<GitHubContributionFallback />}>
        <GitHubContributionsContent />
      </Suspense>
    </div>
  );
}
