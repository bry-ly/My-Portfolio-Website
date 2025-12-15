import Image from "next/image";
import Link from "next/link";
import { BlogPost } from "@/lib/cms";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";

interface BlogCardProps {
  post: BlogPost;
}

export function BlogCard({ post }: BlogCardProps) {
  const formattedDate = new Date(post.publishedAt).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  return (
    <article
      className="group flex flex-col overflow-hidden rounded-lg border border-border bg-card hover:border-muted-foreground/50 transition-all duration-300 hover:shadow-lg"
      aria-labelledby={`blog-title-${post.id}`}
    >
      <Link
        href={`/blog/${post.slug}`}
        className="relative aspect-[16/9] w-full overflow-hidden bg-muted"
        aria-label={`Read article: ${post.title}`}
      >
        <Image
          src={post.coverImage}
          alt={post.title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-110"
          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-background/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      </Link>

      <div className="flex flex-1 flex-col gap-4 p-6">
        <div className="space-y-3">
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <time dateTime={post.publishedAt}>{formattedDate}</time>
            <span>•</span>
            <span>{post.readingTime} min read</span>
          </div>

          <h3
            id={`blog-title-${post.id}`}
            className="text-xl font-semibold leading-tight group-hover:text-muted-foreground transition-colors duration-300"
          >
            <Link href={`/blog/${post.slug}`} className="focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 rounded">
              {post.title}
            </Link>
          </h3>

          <p className="text-muted-foreground leading-relaxed line-clamp-3">
            {post.excerpt}
          </p>
        </div>

        <div className="flex flex-wrap gap-2 mt-auto">
          {post.tags.slice(0, 3).map((tag) => (
            <Badge
              key={tag}
              variant="secondary"
              className="text-xs"
            >
              {tag}
            </Badge>
          ))}
        </div>

        <div className="flex items-center gap-3 pt-2">
          <Button
            asChild
            variant="outline"
            size="sm"
            className="w-full group/btn"
          >
            <Link href={`/blog/${post.slug}`}>
              Read More
              <svg
                className="w-4 h-4 ml-2 transition-transform duration-300 group-hover/btn:translate-x-1"
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
    </article>
  );
}

export function BlogCardSkeleton() {
  return (
    <div className="flex flex-col overflow-hidden rounded-lg border border-border bg-card">
      <Skeleton className="aspect-[16/9] w-full" />
      <div className="flex flex-1 flex-col gap-4 p-6">
        <div className="space-y-3">
          <Skeleton className="h-4 w-32" />
          <Skeleton className="h-6 w-full" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-3/4" />
        </div>
        <div className="flex gap-2 mt-auto">
          <Skeleton className="h-6 w-16 rounded-full" />
          <Skeleton className="h-6 w-20 rounded-full" />
          <Skeleton className="h-6 w-16 rounded-full" />
        </div>
        <Skeleton className="h-9 w-full" />
      </div>
    </div>
  );
}
