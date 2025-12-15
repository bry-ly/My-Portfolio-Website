import Image from "next/image";

import { FocusCarousel } from "@/components/home/focus-carousel";

export function IntroSection() {
  return (
    <header id="intro" className="min-h-screen flex items-center animate-fade-in-up">
      <div className="grid lg:grid-cols-5 gap-12 sm:gap-16 w-full">
        <div className="lg:col-span-3 space-y-6 sm:space-y-8">
          <div className="space-y-6">
            <div className="flex items-center gap-6">
              <div className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-full overflow-hidden ring-2 ring-border/50 flex-shrink-0">
                <Image
                  src="/bryan.jpg"
                  alt="Bryan Palay"
                  fill
                  sizes="(min-width: 640px) 112px, 96px"
                  className="object-cover"
                  priority
                />
              </div>
              <div className="space-y-3 sm:space-y-2">
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
              <span className="text-foreground"> Next.js</span>. Still Learning
              and Making it Better!
            </p>

            <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                Available for work -
                <span className="text-foreground">Philippines</span>
              </div>
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
              <div className="text-muted-foreground">Building & Learning</div>
              <div className="text-xs text-muted-foreground">2025 — Present</div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="text-sm text-muted-foreground font-mono">FOCUS</div>
            <FocusCarousel className="py-2" />
          </div>
        </div>
      </div>
    </header>
  );
}
