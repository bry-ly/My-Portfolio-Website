import { WORK_EXPERIENCES } from "@/components/home/constants";
import { WorkExperienceWidget } from "@/components/home/work-experience-widget";

export function ExperienceSection() {
  return (
    <section id="experience" className="py-20 sm:py-32 opacity-0">
      <div className="space-y-12 sm:space-y-16">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
          <h2 className="text-3xl sm:text-4xl font-light">Work Experience</h2>
          <div className="text-sm text-muted-foreground font-mono">MY JOURNEY</div>
        </div>

        <WorkExperienceWidget experiences={WORK_EXPERIENCES} />
      </div>
    </section>
  );
}
