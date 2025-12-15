import Link from "next/link";

import { SocialIcons, TechIcons } from "@/components/comp/tech-icons";
import { SOCIAL_LINKS } from "@/components/home/constants";

const ICON_BY_KEY = {
  github: TechIcons.GitHub,
  facebook: SocialIcons.Facebook,
  instagram: SocialIcons.Instagram,
  twitter: SocialIcons.Twitter,
} as const;

export function ConnectSection() {
  return (
    <section id="connect" className="py-20 sm:py-32 opacity-0">
      <div className="grid lg:grid-cols-2 gap-12 sm:gap-16">
        <div className="space-y-6 sm:space-y-8">
          <h2 className="text-3xl sm:text-4xl font-light">Let's Connect</h2>

          <div className="space-y-6">
            <p className="text-lg sm:text-xl text-muted-foreground leading-relaxed">
              Open to new opportunities and collaborations. Let's connect and
              build something amazing together!
            </p>

            <div className="space-y-4">
              <Link
                href="mailto:bryanpalay119@gmail.com"
                className="group inline-flex items-center gap-3 text-foreground hover:text-muted-foreground transition-colors duration-300 p-4 border border-border rounded-lg hover:border-muted-foreground/50"
              >
                <svg
                  className="w-6 h-6 group-hover:scale-110 transition-transform duration-300"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
                <span className="text-base sm:text-lg font-medium">
                  bryanpalay119@gmail.com
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
          <div className="text-sm text-muted-foreground font-mono">ELSEWHERE</div>

          <div className="grid grid-cols-2 gap-4 lg:grid-cols-2 w-full lg:w-lg">
            {SOCIAL_LINKS.map((social) => {
              const Icon = ICON_BY_KEY[social.iconKey];

              return (
                <Link
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group p-6 border border-border rounded-xl hover:border-muted-foreground/50 transition-all duration-300 hover:shadow-lg"
                >
                  <div className="flex items-start gap-4">
                    <div className="p-3 rounded-xl bg-accent/50 group-hover:bg-accent transition-colors duration-300">
                      <Icon
                        className={`w-6 h-6 group-hover:scale-110 transition-transform duration-300 ${
                          social.color ?? ""
                        }`}
                      />
                    </div>
                    <div className="space-y-1.5 flex-1 min-w-0">
                      <div className="text-foreground group-hover:text-muted-foreground transition-colors duration-300 font-medium text-base">
                        {social.name}
                      </div>
                      <div className="text-sm text-muted-foreground whitespace-nowrap">
                        {social.handle}
                      </div>
                    </div>
                    <svg
                      className="w-5 h-5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex-shrink-0 mt-1"
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
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
