import Image from "next/image";

import { FocusCarousel } from "@/components/home/focus-carousel";

export function IntroSection() {
  return (
    <header 
      id="intro" 
      className="min-h-screen flex items-center animate-fade-in-up"
      role="banner"
    >
      <div className="grid lg:grid-cols-5 gap-8 sm:gap-12 lg:gap-16 w-full">
        <div className="lg:col-span-3 space-y-6 sm:space-y-8">
          <div className="space-y-6">
            <div className="flex items-center gap-4 sm:gap-6">
              <div className="relative w-20 h-20 sm:w-24 sm:h-24 lg:w-28 lg:h-28 rounded-full overflow-hidden ring-2 ring-border/50 flex-shrink-0">
                <Image
                  src="/bryan.jpg"
                  alt="Bryan Palay, Full Stack Developer"
                  fill
                  sizes="(min-width: 640px) 112px, (min-width: 320px) 96px, 80px"
                  className="object-cover"
                  priority
                />
              </div>
              <div className="space-y-2 sm:space-y-3">
                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light tracking-tight">
                  Bryan
                  <br />
                  <span className="text-muted-foreground">Palay</span>
                </h1>
                <p className="text-sm sm:text-base text-muted-foreground font-medium">
                  Full Stack Developer
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-4 sm:space-y-6 max-w-lg">
            <p className="text-base sm:text-lg lg:text-xl text-muted-foreground leading-relaxed">
              Building modern web applications with
              <span className="text-foreground"> TypeScript</span>,
              <span className="text-foreground"> React</span>, and
              <span className="text-foreground"> Next.js</span>.
              <br />
              Still Learning and Making it Better!
            </p>

            <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-2" role="status" aria-live="polite">
                <div 
                  className="w-2 h-2 bg-green-500 rounded-full animate-pulse" 
                  aria-hidden="true"
                />
                <span>
                  Available for work - <span className="text-foreground">Philippines</span>
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="lg:col-span-2 flex flex-col justify-end space-y-6 sm:space-y-8 mt-8 lg:mt-0">
          <div className="space-y-4">
            <div className="text-xs sm:text-sm text-muted-foreground font-mono uppercase tracking-wider">
              Currently
            </div>
            <div className="space-y-2">
              <div className="text-base sm:text-lg text-foreground font-medium">
                Full Stack Developer
              </div>
              <div className="text-sm text-muted-foreground">
                Building & Learning
              </div>
              <time 
                className="text-xs text-muted-foreground" 
                dateTime="2025"
                aria-label="Since 2025"
              >
                2025 — Present
              </time>
            </div>
          </div>

          <div className="space-y-4">
            <div className="text-xs sm:text-sm text-muted-foreground font-mono uppercase tracking-wider">
              Focus
            </div>
            <div role="region" aria-label="Current focus areas">
              <FocusCarousel className="py-2" />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
