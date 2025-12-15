import Link from "next/link";
import { BlogPost } from "@/lib/cms";
import { BlogCard, BlogCardSkeleton } from "./blog-card";
import { Button } from "@/components/ui/button";

interface BlogSectionProps {
  posts: BlogPost[];
  isLoading?: boolean;
}

export function BlogSection({ posts, isLoading = false }: BlogSectionProps) {
  if (isLoading) {
    return (
      <div className="space-y-12 sm:space-y-16">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
          <h2 className="text-3xl sm:text-4xl font-light">Latest Articles</h2>
          <div className="text-sm text-muted-foreground font-mono">
            FROM THE BLOG
          </div>
        </div>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 3 }).map((_, i) => (
            <BlogCardSkeleton key={i} />
          ))}
        </div>
      </div>
    );
  }

  if (posts.length === 0) {
    return (
      <div className="space-y-12 sm:space-y-16">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
          <h2 className="text-3xl sm:text-4xl font-light">Latest Articles</h2>
          <div className="text-sm text-muted-foreground font-mono">
            FROM THE BLOG
          </div>
        </div>

        <div
          className="flex flex-col items-center justify-center py-20 px-6 rounded-lg border border-dashed border-border bg-muted/20"
          role="status"
          aria-live="polite"
        >
          <svg
            className="w-16 h-16 mb-4 text-muted-foreground/50"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z"
            />
          </svg>
          <h3 className="text-xl font-medium mb-2">No articles yet</h3>
          <p className="text-muted-foreground text-center max-w-md">
            Blog posts will appear here once they are published. Check back soon
            for updates!
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-12 sm:space-y-16">
      <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
        <h2 className="text-3xl sm:text-4xl font-light">Latest Articles</h2>
        <div className="text-sm text-muted-foreground font-mono">
          FROM THE BLOG
        </div>
      </div>

      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {posts.map((post) => (
          <BlogCard key={post.id} post={post} />
        ))}
      </div>

      <div className="flex justify-center pt-8">
        <Button
          asChild
          variant="outline"
          size="lg"
          className="group"
        >
          <Link href="/blog">
            View All Posts
            <svg
              className="w-4 h-4 ml-2 transition-transform duration-300 group-hover:translate-x-1"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 8l4 4m0 0l-4 4m4-4H3"
              />
            </svg>
          </Link>
        </Button>
      </div>
    </div>
  );
}
