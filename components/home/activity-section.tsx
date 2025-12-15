import type { Activity } from "@/components/kibo-ui/contribution-graph";

import { GitHubContributionsWidget } from "@/components/home/github-contributions-widget";
import { LiveActivityWidget } from "@/components/home/live-activity-widget";

export function ActivitySection({ contributions }: { contributions: Activity[] }) {
  return (
    <section id="activity" className="py-20 sm:py-32 opacity-0">
      <LiveActivityWidget />
      <GitHubContributionsWidget contributions={contributions} />
    </section>
  );
}
