import Link from "next/link";

import type { Project } from "@/lib/github";
import { ProjectTechSlider } from "@/components/home/project-tech-slider";

export function FeaturedProjectsSection({ projects }: { projects: Project[] }) {
  return (
    <section 
      id="work" 
      className="min-h-screen py-16 sm:py-20 lg:py-32 opacity-0"
      aria-labelledby="projects-heading"
    >
      <div className="space-y-8 sm:space-y-12 lg:space-y-16">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
          <div>
            <h2 id="projects-heading" className="text-3xl sm:text-4xl font-light">
              Featured Projects
            </h2>
            <p className="text-sm text-muted-foreground font-mono mt-2">
              Latest Updates
            </p>
          </div>
        </div>

        <div className="space-y-8 sm:space-y-12">
          {projects.map((project, index) => (
            <article
              key={project.githubUrl ?? `${project.role}-${index}`}
              className="group grid lg:grid-cols-12 gap-4 sm:gap-6 lg:gap-8 py-6 sm:py-8 border-b border-border/50 hover:border-border transition-colors duration-500 focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2 focus-within:ring-offset-background rounded-lg"
              aria-labelledby={`project-title-${index}`}
            >
              <header className="lg:col-span-2">
                <time 
                  className="text-lg sm:text-xl lg:text-2xl font-light text-muted-foreground group-hover:text-foreground transition-colors duration-500 block"
                  dateTime={project.year}
                  aria-label={`Project from ${project.year}`}
                >
                  {project.year}
                </time>
              </header>

              <div className="lg:col-span-6 space-y-3">
                <div>
                  <h3 id={`project-title-${index}`} className="text-lg sm:text-xl font-medium">
                    {project.role}
                  </h3>
                  <div className="text-muted-foreground" aria-label={`Company: ${project.company}`}>
                    {project.company}
                  </div>
                </div>
                
                <p className="text-muted-foreground leading-relaxed max-w-lg">
                  {project.description}
                </p>
                
                <div className="flex flex-wrap items-center gap-2 sm:gap-3 pt-2" role="group" aria-label="Project links">
                  {project.liveUrl && (
                    <Link
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-3 py-1.5 text-xs font-medium bg-primary text-primary-foreground rounded-md hover:bg-primary/90 focus:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 transition-colors duration-300"
                      aria-label={`Open live demo for ${project.role}`}
                    >
                      <svg
                        className="w-3.5 h-3.5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        aria-hidden="true"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                        />
                      </svg>
                      Live Demo
                    </Link>
                  )}
                  {project.githubUrl && (
                    <Link
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-3 py-1.5 text-xs font-medium border border-border rounded-md hover:border-muted-foreground/50 hover:bg-accent focus:border-muted-foreground/50 focus:bg-accent focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 transition-all duration-300"
                      aria-label={`View source code for ${project.role} on GitHub`}
                    >
                      <svg
                        className="w-3.5 h-3.5"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                        aria-hidden="true"
                      >
                        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                      </svg>
                      GitHub
                    </Link>
                  )}
                </div>
              </div>

              <div className="lg:col-span-4 space-y-3 mt-4 lg:mt-0">
                <div className="text-xs text-muted-foreground font-mono uppercase tracking-wider">
                  Technologies Used
                </div>
                <ProjectTechSlider
                  techNames={project.tech.map((tech) => tech.name)}
                  speed={15}
                  direction="left"
                />
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
