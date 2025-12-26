import { getGitHubContributions } from "@/lib/github";
import HomePage from "@/components/home-page";

// Revalidate page every hour - this enables ISR in production
export const revalidate = 3600;

export default async function Home() {
  const contributions = await getGitHubContributions();

  return <HomePage contributions={contributions} />;
}
