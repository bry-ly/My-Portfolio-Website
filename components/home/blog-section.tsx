import { BlogSection as BlogSectionContent } from "@/components/blog/blog-section";
import type { BlogPost } from "@/lib/cms";

export function BlogSection({ posts }: { posts: BlogPost[] }) {
  return (
    <section
      id="blog"
      className="py-20 sm:py-32 opacity-0"
      aria-labelledby="blog-heading"
    >
      <div id="blog-heading" className="sr-only">
        Blog Section
      </div>
      <BlogSectionContent posts={posts} />
    </section>
  );
}
