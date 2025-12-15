export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  coverImage: string;
  publishedAt: string;
  tags: string[];
  readingTime: number;
  author?: {
    name: string;
    avatar?: string;
  };
}

const MOCK_BLOG_POSTS: BlogPost[] = [
  {
    id: "1",
    title: "Building Scalable Web Apps with Next.js 15",
    slug: "building-scalable-web-apps-nextjs-15",
    excerpt:
      "Discover the latest features in Next.js 15 and how they can help you build performant, scalable web applications with modern React patterns.",
    coverImage: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&h=500&fit=crop",
    publishedAt: "2025-01-15T10:00:00Z",
    tags: ["Next.js", "React", "Web Development"],
    readingTime: 8,
    author: {
      name: "Bryan Palay",
    },
  },
  {
    id: "2",
    title: "TypeScript Best Practices for 2025",
    slug: "typescript-best-practices-2025",
    excerpt:
      "Learn the essential TypeScript patterns and practices that will make your code more maintainable, type-safe, and developer-friendly.",
    coverImage: "https://images.unsplash.com/photo-1516116216624-53e697fedbea?w=800&h=500&fit=crop",
    publishedAt: "2025-01-10T14:30:00Z",
    tags: ["TypeScript", "Best Practices", "JavaScript"],
    readingTime: 12,
    author: {
      name: "Bryan Palay",
    },
  },
  {
    id: "3",
    title: "Mastering Tailwind CSS Utilities",
    slug: "mastering-tailwind-css-utilities",
    excerpt:
      "Deep dive into Tailwind CSS utility classes and learn how to create beautiful, responsive designs without writing custom CSS.",
    coverImage: "https://images.unsplash.com/photo-1507721999472-8ed4421c4af2?w=800&h=500&fit=crop",
    publishedAt: "2025-01-05T09:15:00Z",
    tags: ["Tailwind CSS", "CSS", "Design"],
    readingTime: 6,
    author: {
      name: "Bryan Palay",
    },
  },
  {
    id: "4",
    title: "Authentication Patterns in Modern Web Apps",
    slug: "authentication-patterns-modern-web-apps",
    excerpt:
      "Explore different authentication strategies including JWT, session-based auth, and OAuth integration for secure web applications.",
    coverImage: "https://images.unsplash.com/photo-1633265486064-086b219458ec?w=800&h=500&fit=crop",
    publishedAt: "2024-12-28T16:45:00Z",
    tags: ["Authentication", "Security", "Backend"],
    readingTime: 10,
    author: {
      name: "Bryan Palay",
    },
  },
  {
    id: "5",
    title: "Database Design with Prisma and PostgreSQL",
    slug: "database-design-prisma-postgresql",
    excerpt:
      "Learn how to design efficient database schemas using Prisma ORM with PostgreSQL for your full-stack applications.",
    coverImage: "https://images.unsplash.com/photo-1544383835-bda2bc66a55d?w=800&h=500&fit=crop",
    publishedAt: "2024-12-20T11:20:00Z",
    tags: ["Prisma", "PostgreSQL", "Database"],
    readingTime: 15,
    author: {
      name: "Bryan Palay",
    },
  },
  {
    id: "6",
    title: "React Server Components Explained",
    slug: "react-server-components-explained",
    excerpt:
      "Understanding React Server Components and how they revolutionize data fetching and server-side rendering in Next.js applications.",
    coverImage: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=800&h=500&fit=crop",
    publishedAt: "2024-12-15T13:00:00Z",
    tags: ["React", "Next.js", "Server Components"],
    readingTime: 9,
    author: {
      name: "Bryan Palay",
    },
  },
];

export async function getBlogPosts(limit?: number): Promise<BlogPost[]> {
  await new Promise((resolve) => setTimeout(resolve, 100));
  
  const posts = [...MOCK_BLOG_POSTS].sort(
    (a, b) =>
      new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
  );
  
  return limit ? posts.slice(0, limit) : posts;
}

export async function getBlogPost(slug: string): Promise<BlogPost | null> {
  await new Promise((resolve) => setTimeout(resolve, 100));
  
  return MOCK_BLOG_POSTS.find((post) => post.slug === slug) || null;
}
