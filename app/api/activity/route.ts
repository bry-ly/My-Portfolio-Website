import { NextResponse } from "next/server";

import { fetchLatestGithubActivity } from "@/lib/live-activity";

export async function GET() {
  let githubActivity = null;

  const errors: Record<string, string> = {};

  try {
    githubActivity = await fetchLatestGithubActivity();
  } catch (error) {
    errors.github =
      error instanceof Error
        ? error.message
        : "Unable to fetch GitHub activity.";
  }

  const payload = {
    github: githubActivity,
  };

  return NextResponse.json(
    {
      data: payload,
      errors: Object.keys(errors).length > 0 ? errors : undefined,
      fetchedAt: new Date().toISOString(),
    },
    {
      headers: {
        "Cache-Control": "no-store",
      },
    }
  );
}
