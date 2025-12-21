import { unstable_cache } from "next/cache";
import type { Activity } from "@/components/kibo-ui/contribution-graph";
import { GITHUB_USERNAME } from "@/config/site";

export interface GitHubRepo {
  id: number;
  name: string;
  description: string | null;
  html_url: string;
  homepage: string | null;
  topics: string[];
  pushed_at: string;
  language: string;
  stargazers_count: number;
  fork: boolean;
}

export interface Project {
  year: string;
  role: string;
  company: string;
  description: string;
  tech: { name: string; icon?: any }[]; // Icon will be mapped on client or skipped
  liveUrl?: string;
  githubUrl?: string;
  stars?: number;
}

export async function getGithubRepos(): Promise<GitHubRepo[]> {
  try {
    const response = await fetch(
      `https://api.github.com/users/${GITHUB_USERNAME}/repos?sort=pushed&direction=desc&per_page=100`,
      {
        next: { revalidate: 3600 }, // Cache for 1 hour
        headers: {
          Accept: "application/vnd.github.v3+json",
          "User-Agent": "Portfolio-App",
        },
      }
    );

    if (!response.ok) {
      console.error("GitHub API error:", response.statusText);
      return [];
    }

    const repos: GitHubRepo[] = await response.json();

    // Filter out forks if desired, or keep them. For now, we keep sources only or maybe all?
    // Let's filter out forks to show original work, unless specific request.
    const sources = repos.filter((repo) => !repo.fork);

    return sources;
  } catch (error) {
    console.error("Failed to fetch GitHub repos:", error);
    return [];
  }
}

export const getFeaturedProjects = unstable_cache(
  async (): Promise<GitHubRepo[]> => {
    const repos = await getGithubRepos();
    // Logic to select featured projects.
    // valid criteria: has 'portfolio' topic, or just the latest 6 non-trivial ones.
    // For now, let's take the top 6 most recently pushed non-forks that have a description.
    return repos
      .filter((repo) => repo.description && repo.topics.includes("featured"))
      .slice(0, 6);
  },
  ["featured-projects"],
  { revalidate: 3600 } // Cache for 1 hour
);

export const getRecentProjects = unstable_cache(
  async (): Promise<GitHubRepo[]> => {
    const repos = await getGithubRepos();
    return repos.filter((repo) => repo.description).slice(0, 6);
  },
  ["recent-projects"],
  { revalidate: 3600 } // Cache for 1 hour
);

type GitHubContributionsResponse = {
  contributions: Activity[];
};

export const getGitHubContributions = unstable_cache(
  async () => {
    const res = await fetch(
      `https://github-contributions-api.jogruber.de/v4/${GITHUB_USERNAME}?y=last`
    );
    const data = (await res.json()) as GitHubContributionsResponse;
    return data.contributions;
  },
  ["github-contributions"],
  { revalidate: 3600 } // Cache for 1 hour (3600 seconds) to keep contributions up-to-date
);
