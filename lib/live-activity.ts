const GITHUB_EVENTS_URL = "https://api.github.com/users";

export type GithubActivity = {
  repo?: string;
  message?: string;
  url?: string;
  branch?: string;
  timestamp?: string;
};

function createFetchOptions(options?: RequestInit) {
  return {
    ...(options ?? {}),
    // Ensure requests bypass any cached response unless caller configures otherwise.
    cache: "no-store" as const,
    headers: {
      Accept: "application/json",
      ...(options?.headers ?? {}),
    },
  } satisfies RequestInit;
}

export async function fetchLatestGithubActivity(): Promise<GithubActivity | null> {
  const username = process.env.GITHUB_USERNAME || "bry-ly";
  if (!username) {
    return null;
  }

  const token = process.env.GITHUB_TOKEN;
  const response = await fetch(
    `${GITHUB_EVENTS_URL}/${encodeURIComponent(username)}/events/public`,
    createFetchOptions({
      headers: token
        ? {
            Authorization: `Bearer ${token}`,
            "User-Agent": "minimalist-portfolio",
          }
        : { "User-Agent": "minimalist-portfolio" },
      next: { revalidate: 0 },
    })
  );

  if (!response.ok) {
    throw new Error(`GitHub API responded with ${response.status}`);
  }

  const events = (await response.json()) as Array<Record<string, any>>;
  if (!Array.isArray(events) || events.length === 0) {
    return null;
  }

  const pushEvent = events.find((event) => event.type === "PushEvent");
  if (!pushEvent) {
    return null;
  }

  const commits = Array.isArray(pushEvent.payload?.commits)
    ? pushEvent.payload.commits
    : [];
  const latestCommit = commits[commits.length - 1];

  const repoName = pushEvent.repo?.name as string | undefined;
  const commitMessage = latestCommit?.message as string | undefined;
  const commitSha = latestCommit?.sha as string | undefined;

  return {
    repo: repoName,
    message: commitMessage,
    url:
      repoName && commitSha
        ? `https://github.com/${repoName}/commit/${commitSha}`
        : repoName
        ? `https://github.com/${repoName}`
        : undefined,
    branch:
      typeof pushEvent.payload?.ref === "string"
        ? pushEvent.payload.ref.split("/").pop()
        : undefined,
    timestamp: pushEvent.created_at,
  };
}
