import type { ExperienceItemType } from "@/components/work-experience";

export const GALLERY_PROJECTS = [
  {
    title: "Librarium",
    image: "/projects/librarium.png",
    url: "https://librarium-self.vercel.app/",
  },
  {
    title: "Velos Inventory",
    image: "/projects/velos.png",
    url: "https://velos-inve.vercel.app/",
  },
  {
    title: "Dental U-Care",
    image: "/projects/dental.png",
    url: "https://www.dentalucare.tech/",
  },
  {
    title: "Amethyst Inn",
    image: "/projects/amethsyt.png",
    url: "https://amethystinn.vercel.app/",
  },
  {
    title: "A+ Quiz",
    image: "/projects/a-plus-quiz.png",
    url: "https://a-plus-quiz.vercel.app/",
  },
  {
    title: "Health Care",
    image: "/projects/health-care.png",
    url: "https://health-care-rouge-theta.vercel.app/",
  },
] as const;

export type SocialLinkIconKey = "github" | "facebook" | "instagram" | "twitter";

export const SOCIAL_LINKS = [
  {
    name: "GitHub",
    handle: "@bry-ly",
    url: "https://github.com/bry-ly",
    iconKey: "github",
  },
  {
    name: "Facebook",
    handle: "Bryan Palay",
    url: "https://facebook.com/bryan.palay.35",
    iconKey: "facebook",
    color: "text-[#1877F2]",
  },
  {
    name: "Instagram",
    handle: "@aokinyccc",
    url: "https://instagram.com/aokinyccc",
    iconKey: "instagram",
    color: "text-[#E4405F]",
  },
  {
    name: "X (Twitter)",
    handle: "@bry_ly28",
    url: "https://x.com/bry_ly28",
    iconKey: "twitter",
  },
] as const;

export const WORK_EXPERIENCES = [
  {
    id: "freelance",
    companyName: "Freelance",
    isCurrentEmployer: true,
    positions: [
      {
        id: "fullstack-dev",
        title: "Full Stack Developer",
        employmentPeriod: "2024 - Present",
        employmentType: "Freelance",
        icon: "code",
        description:
          "Building modern web applications for clients using Next.js, React, TypeScript, and various backend technologies. Focusing on creating scalable, performant, and user-friendly solutions.",
        skills: [
          "Next.js",
          "React",
          "TypeScript",
          "Tailwind CSS",
          "Prisma",
          "PostgreSQL",
        ],
        isExpanded: true,
      },
    ],
  },
] satisfies ExperienceItemType[];
