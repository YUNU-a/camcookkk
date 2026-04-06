import { useEffect, useRef } from "react";

import { Button } from "@/components/ui/button";

const navLinks = ["Home", "Studio", "About", "Journal", "Reach Us"];
const offerings = [
  {
    title: "Personal Branding",
    description:
      "We shape your voice, story, and digital presence so people remember who you are before they forget what everyone else said.",
  },
  {
    title: "Marketing Strategy",
    description:
      "From positioning to launch direction, we build campaigns that connect the message, audience, and timing with purpose.",
  },
  {
    title: "Content Systems",
    description:
      "Short-form, reels, campaign visuals, and brand assets built to keep your presence consistent without feeling repetitive.",
  },
];

const promises = [
  "Brand strategy for founders, creators, coaches, and agencies",
  "Social media marketing, content planning, and campaign direction",
  "Creative production for launches, ads, and authority-building",
  "Landing pages and digital experiences that turn attention into trust",
];

function useScrollReveal() {
  const containerRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const scope = containerRef.current;
    if (!scope) return;

    const elements = Array.from(
      scope.querySelectorAll<HTMLElement>("[data-reveal]"),
    );

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("revealed");
          }
        });
      },
      {
        threshold: 0.2,
        rootMargin: "0px 0px -10% 0px",
      },
    );

    elements.forEach((element) => observer.observe(element));

    return () => observer.disconnect();
  }, []);

  return containerRef;
}

export default function App() {
  const pageRef = useScrollReveal();

  return (
    <main
      ref={pageRef}
      className="relative min-h-screen overflow-x-hidden bg-background text-foreground"
    >
      <video
        className="fixed inset-0 z-0 h-full w-full object-cover"
        autoPlay
        loop
        muted
        playsInline
      >
        <source
          src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260314_131748_f2ca2a28-fed7-44c8-b9a9-bd9acdd5ec31.mp4"
          type="video/mp4"
        />
      </video>

      <div className="relative z-10 min-h-screen">
        <header className="px-8 py-6">
          <nav className="liquid-glass mx-auto flex w-full max-w-7xl items-center justify-between rounded-full px-6 py-4">
            <a
              href="#home"
              className="text-3xl tracking-tight text-foreground"
              style={{ fontFamily: "'Instrument Serif', serif" }}
            >
              Camcook<sup className="text-xs">{"\u00AE"}</sup>
            </a>

            <div className="hidden items-center gap-8 md:flex">
              {navLinks.map((link) => (
                <a
                  key={link}
                  href={
                    link === "Home"
                      ? "#home"
                      : link === "Studio"
                        ? "#studio"
                        : link === "About"
                          ? "#about"
                          : link === "Journal"
                            ? "#journal"
                            : "#reach"
                  }
                  className={
                    link === "Home"
                      ? "text-sm text-foreground transition-colors"
                      : "text-sm text-muted-foreground transition-colors hover:text-foreground"
                  }
                >
                  {link}
                </a>
              ))}
            </div>

            <Button className="liquid-glass liquid-glass-button rounded-full px-6 py-2.5 text-sm text-foreground transition-transform duration-300 hover:scale-[1.03]">
              Begin Journey
            </Button>
          </nav>
        </header>

        <section
          id="home"
          className="relative z-10 flex min-h-screen flex-col items-center justify-center px-6 pb-40 pt-32 py-[90px] text-center"
        >
          <div className="flex max-w-7xl flex-col items-center">
            <h1
              className="animate-fade-rise max-w-7xl text-5xl font-normal leading-[0.95] tracking-[-2.46px] text-foreground sm:text-7xl md:text-8xl"
              style={{ fontFamily: "'Instrument Serif', serif" }}
            >
              Where <em className="not-italic text-muted-foreground">dreams</em>{" "}
              rise <em className="not-italic text-muted-foreground">through the silence.</em>
            </h1>

            <p className="animate-fade-rise-delay mt-8 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">
              Camcook builds personal brands, marketing systems, and digital presence
              for founders, creators, and ambitious businesses that want to look
              unforgettable and grow with clarity.
            </p>

            <Button className="liquid-glass liquid-glass-button animate-fade-rise-delay-2 mt-12 rounded-full px-14 py-5 text-base text-foreground transition-transform duration-300 hover:scale-[1.03]">
              Begin Journey
            </Button>
          </div>
        </section>

        <section id="studio" className="relative z-10 px-6 py-24">
          <div
            data-reveal
            className="reveal mx-auto grid max-w-7xl gap-8 lg:grid-cols-[1.1fr_0.9fr]"
          >
            <div className="liquid-panel rounded-[2rem] p-8 sm:p-10">
              <p className="text-sm uppercase tracking-[0.3em] text-muted-foreground">
                Studio
              </p>
              <h2
                className="mt-4 text-4xl font-normal leading-[0.96] text-foreground sm:text-6xl"
                style={{ fontFamily: "'Instrument Serif', serif" }}
              >
                Personal branding with cinematic strategy.
              </h2>
              <p className="mt-6 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">
                We turn expertise into presence. Camcook helps you define the
                message, shape the visuals, and market with consistency so your brand
                feels premium from first glance to final conversion.
              </p>
            </div>

            <div className="space-y-6">
              {offerings.map((item, index) => (
                <article
                  key={item.title}
                  className="liquid-panel rounded-[1.75rem] p-7"
                  style={{ transitionDelay: `${index * 120}ms` }}
                >
                  <p className="text-sm uppercase tracking-[0.24em] text-muted-foreground">
                    0{index + 1}
                  </p>
                  <h3
                    className="mt-3 text-3xl font-normal text-foreground"
                    style={{ fontFamily: "'Instrument Serif', serif" }}
                  >
                    {item.title}
                  </h3>
                  <p className="mt-4 text-sm leading-7 text-muted-foreground sm:text-base">
                    {item.description}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="about" className="relative z-10 px-6 py-24">
          <div
            data-reveal
            className="reveal liquid-panel mx-auto max-w-7xl rounded-[2.25rem] p-8 sm:p-12"
          >
            <p className="text-sm uppercase tracking-[0.3em] text-muted-foreground">
              About Camcook
            </p>
            <div className="mt-6 grid gap-12 lg:grid-cols-[0.9fr_1.1fr]">
              <h2
                className="text-4xl font-normal leading-[0.96] text-foreground sm:text-6xl"
                style={{ fontFamily: "'Instrument Serif', serif" }}
              >
                We do the marketing work that makes people stop, trust, and act.
              </h2>

              <div className="space-y-5 text-base leading-relaxed text-muted-foreground sm:text-lg">
                <p>
                  Personal branding is only the start. We also handle the strategy,
                  messaging, campaign thinking, and creative direction that keeps your
                  business moving with one clear identity.
                </p>
                <div className="grid gap-4">
                  {promises.map((promise) => (
                    <div
                      key={promise}
                      className="rounded-2xl border border-white/10 bg-black/10 px-5 py-4 text-foreground/90 backdrop-blur-sm"
                    >
                      {promise}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="journal" className="relative z-10 px-6 py-24">
          <div
            data-reveal
            className="reveal mx-auto max-w-7xl rounded-[2.25rem] border border-white/10 bg-black/20 p-8 backdrop-blur-md sm:p-12"
          >
            <p className="text-sm uppercase tracking-[0.3em] text-muted-foreground">
              Journal
            </p>
            <h2
              className="mt-4 max-w-4xl text-4xl font-normal leading-[0.96] text-foreground sm:text-6xl"
              style={{ fontFamily: "'Instrument Serif', serif" }}
            >
              Built for bold founders, quiet experts, and brands ready to lead.
            </h2>
            <p className="mt-6 max-w-3xl text-base leading-relaxed text-muted-foreground sm:text-lg">
              Your website should not feel like a template. Your content should not
              sound like everybody else. Your marketing should not rely on noise. We
              create a calm, premium identity that still performs.
            </p>
          </div>
        </section>

        <section id="reach" className="relative z-10 px-6 pb-28 pt-12">
          <div
            data-reveal
            className="reveal mx-auto flex max-w-5xl flex-col items-center rounded-[2.5rem] border border-white/10 bg-black/25 px-8 py-12 text-center backdrop-blur-md sm:px-12"
          >
            <p className="text-sm uppercase tracking-[0.3em] text-muted-foreground">
              Reach Us
            </p>
            <h2
              className="mt-4 text-4xl font-normal leading-[0.96] text-foreground sm:text-6xl"
              style={{ fontFamily: "'Instrument Serif', serif" }}
            >
              Let&apos;s build your next era of attention.
            </h2>
            <p className="mt-6 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">
              If you do personal branding, growth marketing, launches, or content-led
              business, Camcook can shape the identity and the system behind it.
            </p>
            <Button
              asChild
              className="liquid-glass liquid-glass-button mt-10 rounded-full px-14 py-5 text-base text-foreground transition-transform duration-300 hover:scale-[1.03]"
            >
              <a href="tel:+917695832483">Book A Brand Call</a>
            </Button>
          </div>
        </section>
      </div>
    </main>
  );
}
