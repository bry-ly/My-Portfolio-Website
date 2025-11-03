"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { TechIcons, SocialIcons } from "@/components/tech-icons";

export default function Home() {
  const [isDark, setIsDark] = useState(true);
  const [activeSection, setActiveSection] = useState("");
  const sectionsRef = useRef<(HTMLElement | null)[]>([]);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", isDark);
  }, [isDark]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-fade-in-up");
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0.3, rootMargin: "0px 0px -20% 0px" }
    );

    sectionsRef.current.forEach((section) => {
      if (section) observer.observe(section);
    });

    return () => observer.disconnect();
  }, []);

  const toggleTheme = () => {
    setIsDark(!isDark);
  };

  return (
    <div className="min-h-screen bg-background text-foreground relative">
      <nav className="fixed left-8 top-1/2 -translate-y-1/2 z-10 hidden lg:block">
        <div className="flex flex-col gap-4">
          {["intro", "work", "thoughts", "connect"].map((section) => (
            <button
              key={section}
              onClick={() =>
                document
                  .getElementById(section)
                  ?.scrollIntoView({ behavior: "smooth" })
              }
              className={`w-2 h-8 rounded-full transition-all duration-500 ${
                activeSection === section
                  ? "bg-foreground"
                  : "bg-muted-foreground/30 hover:bg-muted-foreground/60"
              }`}
              aria-label={`Navigate to ${section}`}
            />
          ))}
        </div>
      </nav>

      <main className="max-w-4xl mx-auto px-6 sm:px-8 lg:px-16">
        <header
          id="intro"
          ref={(el) => {
            sectionsRef.current[0] = el;
          }}
          className="min-h-screen flex items-center opacity-0"
        >
          <div className="grid lg:grid-cols-5 gap-12 sm:gap-16 w-full">
            <div className="lg:col-span-3 space-y-6 sm:space-y-8">
              <div className="space-y-6">
                <div className="flex items-start gap-6">
                  <div className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-full overflow-hidden ring-2 ring-border/50 flex-shrink-0 mt-10">
                    <Image
                      src="/bryan.jpg"
                      alt="Bryan Palay"
                      fill
                      className="object-cover"
                      priority
                    />
                  </div>
                  <div className="space-y-3 sm:space-y-2 pt-2">
                    <div className="text-sm text-muted-foreground font-mono tracking-wider">
                      PORTFOLIO / 2025
                    </div>
                    <h1 className="text-4xl sm:text-5xl lg:text-6xl font-light tracking-tight">
                      Bryan
                      <br />
                      <span className="text-muted-foreground">Palay</span>
                    </h1>
                  </div>
                </div>
              </div>

              <div className="space-y-6 max-w-md">
                <p className="text-lg sm:text-xl text-muted-foreground leading-relaxed">
                  Full Stack Developer building modern web applications with
                  <span className="text-foreground"> TypeScript</span>,
                  <span className="text-foreground"> React</span>, and
                  <span className="text-foreground"> Next.js</span>. Still
                  Learning and Making it Better!
                </p>

                <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                    Available for work
                  </div>
                  <div>Philippines</div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-2 flex flex-col justify-end space-y-6 sm:space-y-8 mt-8 lg:mt-0">
              <div className="space-y-4">
                <div className="text-sm text-muted-foreground font-mono">
                  CURRENTLY
                </div>
                <div className="space-y-2">
                  <div className="text-foreground">Full Stack Developer</div>
                  <div className="text-muted-foreground">
                    Building & Learning
                  </div>
                  <div className="text-xs text-muted-foreground">
                    2025 — Present
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="text-sm text-muted-foreground font-mono">
                  FOCUS
                </div>
                <div className="flex flex-wrap gap-2">
                  {[
                    { name: "React", icon: TechIcons.React },
                    { name: "Next.js", icon: TechIcons.NextJS },
                    { name: "TypeScript", icon: TechIcons.TypeScript },
                    { name: "JavaScript", icon: TechIcons.JavaScript },
                    { name: "HTML5", icon: TechIcons.HTML5 },
                    { name: "Prisma", icon: TechIcons.Prisma },
                    { name: "Shadcn UI", icon: TechIcons.Shadcn },
                  ].map((skill) => (
                    <span
                      key={skill.name}
                      className="group px-3 py-1.5 text-xs border border-border rounded-full hover:border-muted-foreground/50 hover:bg-accent transition-all duration-300 flex items-center gap-2"
                    >
                      <skill.icon className="w-3.5 h-3.5 group-hover:scale-110 transition-transform duration-300" />
                      {skill.name}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </header>

        <section
          id="work"
          ref={(el) => {
            sectionsRef.current[1] = el;
          }}
          className="min-h-screen py-20 sm:py-32 opacity-0"
        >
          <div className="space-y-12 sm:space-y-16">
            <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
              <h2 className="text-3xl sm:text-4xl font-light">
                Featured Projects
              </h2>
              <div className="text-sm text-muted-foreground font-mono">
                2025 — Present
              </div>
            </div>

            <div className="space-y-8 sm:space-y-12">
              {[
                {
                  year: "2025",
                  role: "Tech Parts Inventory System",
                  company: "Personal Project",
                  description:
                    "A modern Inventory Management System built with Next.js, Prisma, Better Auth, and Shadcn UI. It provides a secure, scalable, and visually polished platform for managing products, categories, and stock.",
                  tech: ["TypeScript", "Next.js", "Prisma", "Shadcn UI"],
                  url: "https://github.com/bry-ly/tech-parts-inventory-system",
                },
                {
                  year: "2025",
                  role: "Serene Inn Guest House",
                  company: "Personal Project",
                  description:
                    "A guest house booking platform offering cozy rooms and warm hospitality. Perfect for travelers seeking comfort and relaxation with a clean, responsive interface.",
                  tech: ["TypeScript", "React", "Next.js"],
                  url: "https://github.com/bry-ly/Serene-Inn-Guest-House",
                },
                {
                  year: "2025",
                  role: "A+ Quiz System",
                  company: "Personal Project",
                  description:
                    "A user-friendly assessment platform designed to make quizzes easier to create, manage, and evaluate. Provides automated scoring and flexible quiz management.",
                  tech: ["TypeScript", "React", "Next.js"],
                  url: "https://github.com/bry-ly/APlus-QuizSystem",
                },
                {
                  year: "2025",
                  role: "Dental U-Care",
                  company: "Personal Project",
                  description:
                    "Dental Booking System for managing appointments and patient care with a modern, intuitive interface.",
                  tech: ["TypeScript", "React", "Next.js"],
                  url: "https://github.com/bry-ly/dental-u-care",
                },
              ].map((job, index) => (
                <Link
                  key={index}
                  href={job.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group grid lg:grid-cols-12 gap-4 sm:gap-8 py-6 sm:py-8 border-b border-border/50 hover:border-border transition-colors duration-500"
                >
                  <div className="lg:col-span-2">
                    <div className="text-xl sm:text-2xl font-light text-muted-foreground group-hover:text-foreground transition-colors duration-500">
                      {job.year}
                    </div>
                  </div>

                  <div className="lg:col-span-6 space-y-3">
                    <div>
                      <h3 className="text-lg sm:text-xl font-medium flex items-center gap-2">
                        {job.role}
                        <svg
                          className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                          />
                        </svg>
                      </h3>
                      <div className="text-muted-foreground">{job.company}</div>
                    </div>
                    <p className="text-muted-foreground leading-relaxed max-w-lg">
                      {job.description}
                    </p>
                  </div>

                  <div className="lg:col-span-4 flex flex-wrap gap-2 lg:justify-end mt-2 lg:mt-0">
                    {job.tech.map((tech) => (
                      <span
                        key={tech}
                        className="px-2 py-1 text-xs text-muted-foreground rounded group-hover:border-muted-foreground/50 transition-colors duration-500"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section
          id="thoughts"
          ref={(el) => {
            sectionsRef.current[2] = el;
          }}
          className="min-h-screen py-20 sm:py-32 opacity-0"
        >
          <div className="space-y-12 sm:space-y-16">
            <h2 className="text-3xl sm:text-4xl font-light">Recent Thoughts</h2>

            <div className="grid gap-6 sm:gap-8 lg:grid-cols-2">
              {[
                {
                  title: "Building with Next.js and TypeScript",
                  excerpt:
                    "My journey learning modern web development with Next.js, TypeScript, and best practices for scalable applications.",
                  date: "Jan 2025",
                  readTime: "5 min",
                },
                {
                  title: "Creating a Full-Stack Inventory System",
                  excerpt:
                    "Lessons learned from building a complete inventory management system with Prisma, Better Auth, and modern UI components.",
                  date: "Dec 2024",
                  readTime: "8 min",
                },
                {
                  title: "From Learning to Building",
                  excerpt:
                    "How I transitioned from learning React basics to building production-ready applications with real-world features.",
                  date: "Nov 2024",
                  readTime: "6 min",
                },
                {
                  title: "My Developer Journey",
                  excerpt:
                    "Still learning and making it better - reflections on continuous growth as a self-taught developer.",
                  date: "Oct 2024",
                  readTime: "4 min",
                },
              ].map((post, index) => (
                <article
                  key={index}
                  className="group p-6 sm:p-8 border border-border rounded-lg hover:border-muted-foreground/50 transition-all duration-500 hover:shadow-lg cursor-pointer"
                >
                  <div className="space-y-4">
                    <div className="flex items-center justify-between text-xs text-muted-foreground font-mono">
                      <span>{post.date}</span>
                      <span>{post.readTime}</span>
                    </div>

                    <h3 className="text-lg sm:text-xl font-medium group-hover:text-muted-foreground transition-colors duration-300">
                      {post.title}
                    </h3>

                    <p className="text-muted-foreground leading-relaxed">
                      {post.excerpt}
                    </p>

                    <div className="flex items-center gap-2 text-sm text-muted-foreground group-hover:text-foreground transition-colors duration-300">
                      <span>Read more</span>
                      <svg
                        className="w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-300"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M17 8l4 4m0 0l-4 4m4-4H3"
                        />
                      </svg>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section
          id="connect"
          ref={(el) => {
            sectionsRef.current[3] = el;
          }}
          className="py-20 sm:py-32 opacity-0"
        >
          <div className="grid lg:grid-cols-2 gap-12 sm:gap-16">
            <div className="space-y-6 sm:space-y-8">
              <h2 className="text-3xl sm:text-4xl font-light">Let's Connect</h2>

              <div className="space-y-6">
                <p className="text-lg sm:text-xl text-muted-foreground leading-relaxed">
                  Open to new opportunities and collaborations. Let's connect
                  and build something amazing together!
                </p>

                <div className="space-y-4">
                  <Link
                    href="https://github.com/bry-ly"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group inline-flex items-center gap-3 text-foreground hover:text-muted-foreground transition-colors duration-300 p-4 border border-border rounded-lg hover:border-muted-foreground/50"
                  >
                    <TechIcons.GitHub className="w-6 h-6 group-hover:scale-110 transition-transform duration-300" />
                    <span className="text-base sm:text-lg font-medium">
                      github.com/bry-ly
                    </span>
                    <svg
                      className="w-5 h-5 transform group-hover:translate-x-1 transition-transform duration-300 ml-auto"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17 8l4 4m0 0l-4 4m4-4H3"
                      />
                    </svg>
                  </Link>
                </div>
              </div>
            </div>

            <div className="space-y-6 sm:space-y-8">
              <div className="text-sm text-muted-foreground font-mono">
                ELSEWHERE
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  {
                    name: "GitHub",
                    handle: "@bry-ly",
                    url: "https://github.com/bry-ly",
                    icon: TechIcons.GitHub,
                  },
                  {
                    name: "Facebook",
                    handle: "bryan.palay.35",
                    url: "https://facebook.com/bryan.palay.35",
                    icon: SocialIcons.Facebook,
                  },
                  {
                    name: "Instagram",
                    handle: "@aokinyccc",
                    url: "https://instagram.com/aokinyccc",
                    icon: SocialIcons.Instagram,
                  },
                  {
                    name: "X (Twitter)",
                    handle: "@bry_ly28",
                    url: "https://x.com/bry_ly28",
                    icon: SocialIcons.Twitter,
                  },
                ].map((social) => (
                  <Link
                    key={social.name}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group p-4 border border-border rounded-lg hover:border-muted-foreground/50 transition-all duration-300 hover:shadow-sm"
                  >
                    <div className="flex items-start gap-3">
                      <div className="p-2 rounded-lg bg-accent/50 group-hover:bg-accent transition-colors duration-300">
                        <social.icon className="w-5 h-5 group-hover:scale-110 transition-transform duration-300" />
                      </div>
                      <div className="space-y-1 flex-1">
                        <div className="text-foreground group-hover:text-muted-foreground transition-colors duration-300 font-medium">
                          {social.name}
                        </div>
                        <div className="text-sm text-muted-foreground">
                          {social.handle}
                        </div>
                      </div>
                      <svg
                        className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex-shrink-0 mt-1"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                        />
                      </svg>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </section>

        <footer className="py-12 sm:py-16 border-t border-border">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 sm:gap-8">
            <div className="space-y-2">
              <div className="text-sm text-muted-foreground">
                © 2025 Bryan Palay. All rights reserved.
              </div>
              <div className="text-xs text-muted-foreground">
                Built with Next.js & TypeScript
              </div>
            </div>

            <div className="flex items-center gap-4">
              <button
                onClick={toggleTheme}
                className="group p-3 rounded-lg border border-border hover:border-muted-foreground/50 transition-all duration-300"
                aria-label="Toggle theme"
              >
                {isDark ? (
                  <svg
                    className="w-4 h-4 text-muted-foreground group-hover:text-foreground transition-colors duration-300"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z"
                      clipRule="evenodd"
                    />
                  </svg>
                ) : (
                  <svg
                    className="w-4 h-4 text-muted-foreground group-hover:text-foreground transition-colors duration-300"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
                  </svg>
                )}
              </button>

              <button className="group p-3 rounded-lg border border-border hover:border-muted-foreground/50 transition-all duration-300">
                <svg
                  className="w-4 h-4 text-muted-foreground group-hover:text-foreground transition-colors duration-300"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                  />
                </svg>
              </button>
            </div>
          </div>
        </footer>
      </main>

      <div className="fixed bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-background via-background/80 to-transparent pointer-events-none"></div>
    </div>
  );
}
