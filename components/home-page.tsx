import type { Activity } from "@/components/kibo-ui/contribution-graph";
import type { BlogPost } from "@/lib/cms";
import type { Project } from "@/lib/github";

import { HomeShell } from "@/components/home/home-shell";
import { ActivitySection } from "@/components/home/activity-section";
import { BlogSection } from "@/components/home/blog-section";
import { ConnectSection } from "@/components/home/connect-section";
import { ContactSection } from "@/components/home/contact-section";
import { ExperienceSection } from "@/components/home/experience-section";
import { FeaturedProjectsSection } from "@/components/home/featured-projects-section";
import { FooterSection } from "@/components/home/footer-section";
import { GallerySection } from "@/components/home/gallery-section";
import { IntroSection } from "@/components/home/intro-section";

interface HomePageProps {
  projects: Project[];
  contributions: Activity[];
  blogPosts: BlogPost[];
}

export default function HomePage({
  projects,
  contributions,
  blogPosts,
}: HomePageProps) {
  return (
    <HomeShell>
      <IntroSection />
      <FeaturedProjectsSection projects={projects} />
      <ExperienceSection />
      <GallerySection />
      <BlogSection posts={blogPosts} />
      <ActivitySection contributions={contributions} />
      <ConnectSection />
      <ContactSection />
      <FooterSection />
    </HomeShell>
  );
}
