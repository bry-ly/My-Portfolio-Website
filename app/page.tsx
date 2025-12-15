import {
  getRecentProjects,
  getGitHubContributions,
  Project,
} from "@/lib/github";
import { getBlogPosts } from "@/lib/cms";
import HomePage from "@/components/home-page";

export const revalidate = 3600;

export default async function Home() {
  const [repos, contributions, blogPosts] = await Promise.all([
    getRecentProjects(),
    getGitHubContributions(),
    getBlogPosts(3),
  ]);

  const projects: Project[] = repos.map((repo) => {
    // Basic mapping: use topics to guess tech stack if possible
    // For now, we manually map specific repos or just use a generic list
    // Actually, real metadata is better.
    // Let's deduce tech from topics or language

    const techStack = repo.topics
      .map((t) => ({ name: capitalize(t) }))
      .slice(0, 5);
    if (
      repo.language &&
      !techStack.find(
        (t) => t.name.toLowerCase() === repo.language.toLowerCase()
      )
    ) {
      techStack.unshift({ name: repo.language });
    }

    return {
      year: new Date(repo.pushed_at).getFullYear().toString(),
      role: repo.name.replace(/-/g, " "), // "my-project" -> "my project"
      company: "Personal Project",
      description: repo.description || "No description provided.",
      tech: techStack,
      liveUrl: repo.homepage || undefined,
      githubUrl: repo.html_url,
      stars: repo.stargazers_count,
    };
  });

  return <HomePage projects={projects} contributions={contributions} blogPosts={blogPosts} />;
}

function capitalize(s: string) {
  if (!s) return s;
  return s.charAt(0).toUpperCase() + s.slice(1);
}
