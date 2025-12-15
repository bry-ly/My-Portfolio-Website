import Image from "next/image";
import Link from "next/link";

import { GALLERY_PROJECTS } from "@/components/home/constants";

export function GallerySection() {
  return (
    <section id="gallery" className="py-20 sm:py-32 opacity-0">
      <div className="space-y-12 sm:space-y-16">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
          <h2 className="text-3xl sm:text-4xl font-light">Project Gallery</h2>
          <div className="text-sm text-muted-foreground font-mono">FEATURED WORK</div>
        </div>

        <div className="grid gap-8 sm:gap-12 md:grid-cols-2 lg:grid-cols-3">
          {GALLERY_PROJECTS.map((project) => (
            <Link
              key={project.title}
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative overflow-hidden rounded-lg border border-border hover:border-muted-foreground/50 transition-all duration-500"
            >
              <div className="relative aspect-video w-full overflow-hidden bg-muted">
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-background/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>
              <div className="p-4 sm:p-6">
                <h3 className="text-lg font-medium flex items-center gap-2 group-hover:text-muted-foreground transition-colors duration-300">
                  {project.title}
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
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
