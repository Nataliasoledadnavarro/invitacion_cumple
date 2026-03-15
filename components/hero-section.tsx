"use client";

import {useEffect, useRef} from "react";
import {CalendarDays, Clock, HouseHeart, Coffee} from "lucide-react";
import {FriendsCarousel} from "@/components/friends-carousel";

export function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
          }
        });
      },
      {threshold: 0.1},
    );

    const elements = sectionRef.current?.querySelectorAll(".animate-on-scroll");
    elements?.forEach((el, index) => {
      (el as HTMLElement).style.transitionDelay = `${index * 100}ms`;
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="relative min-h-svh flex flex-col items-center justify-center px-4 sm:px-6 py-12 sm:py-16 overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-24 -right-24 w-64 sm:w-96 h-64 sm:h-96 rounded-full bg-primary/10 blur-3xl" />
        <div className="absolute -bottom-32 -left-32 w-56 sm:w-80 h-56 sm:h-80 rounded-full bg-accent/20 blur-3xl" />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center w-full max-w-2xl mx-auto">
        {/* Main heading */}
        <h1 className="animate-on-scroll font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-semibold text-foreground mb-3 sm:mb-4 leading-tight text-balance">
          ¡Celebremos juntas!
        </h1>

        {/* Tagline */}
        <p className="animate-on-scroll text-lg sm:text-xl md:text-2xl text-muted-foreground mb-6 sm:mb-8 font-light">
          Un reencuentro de amigas es el plan.
        </p>

        {/* Friends Carousel */}
        <div className="animate-on-scroll mb-8 sm:mb-10">
          <p className="text-xs sm:text-sm text-muted-foreground mb-3 uppercase tracking-wider">
            Nosotras...
          </p>
          <FriendsCarousel />
        </div>

        {/* Event details - horizontal scroll on mobile */}
        <div className="animate-on-scroll mb-8 sm:mb-10">
          <div className="flex items-center justify-start sm:justify-center gap-2 sm:gap-4 overflow-x-auto pb-2 -mx-4 px-4 sm:mx-0 sm:px-0 sm:flex-wrap scrollbar-hide">
            <div className="flex-shrink-0 flex items-center gap-2 px-3 sm:px-4 py-2.5 sm:py-3 rounded-xl sm:rounded-2xl bg-card border border-border shadow-sm">
              <CalendarDays className="w-4 h-4 sm:w-5 sm:h-5 text-primary" />
              <span className="text-sm sm:text-base text-foreground font-medium whitespace-nowrap">
                Sab 28 de marzo
              </span>
            </div>
            <div className="flex-shrink-0 flex items-center gap-2 px-3 sm:px-4 py-2.5 sm:py-3 rounded-xl sm:rounded-2xl bg-card border border-border shadow-sm">
              <Clock className="w-4 h-4 sm:w-5 sm:h-5 text-primary" />
              <span className="text-sm sm:text-base text-foreground font-medium whitespace-nowrap">
                16:00 hs
              </span>
            </div>
            <div className="flex-shrink-0 flex items-center gap-2 px-3 sm:px-4 py-2.5 sm:py-3 rounded-xl sm:rounded-2xl bg-card border border-border shadow-sm">
              <Coffee className="w-4 h-4 sm:w-5 sm:h-5 text-primary" />
              <span className="text-sm sm:text-base text-foreground font-medium whitespace-nowrap">
                Merienda
              </span>
            </div>
            <div className="flex-shrink-0 flex items-center gap-2 px-3 sm:px-4 py-2.5 sm:py-3 rounded-xl sm:rounded-2xl bg-card border border-border shadow-sm">
              <HouseHeart className="w-4 h-4 sm:w-5 sm:h-5 text-primary" />
              <span className="text-sm sm:text-base text-foreground font-medium whitespace-nowrap">
                En mi casa
              </span>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="animate-on-scroll">
          <a
            href="#actividad"
            className="inline-flex flex-col items-center gap-1.5 text-muted-foreground hover:text-primary transition-colors">
            <span className="text-xs sm:text-sm">Mas detalles</span>
            <div className="w-5 h-8 sm:w-6 sm:h-10 rounded-full border-2 border-current flex items-start justify-center p-1">
              <div className="w-1 h-2 sm:w-1.5 sm:h-2.5 rounded-full bg-current animate-bounce" />
            </div>
          </a>
        </div>
      </div>

      {/* Decorative corner elements - hidden on mobile */}
      <div className="hidden sm:block absolute top-8 left-8 w-16 h-16 border-l-2 border-t-2 border-primary/20 rounded-tl-3xl" />
      <div className="hidden sm:block absolute top-8 right-8 w-16 h-16 border-r-2 border-t-2 border-primary/20 rounded-tr-3xl" />
      <div className="hidden sm:block absolute bottom-8 left-8 w-16 h-16 border-l-2 border-b-2 border-primary/20 rounded-bl-3xl" />
      <div className="hidden sm:block absolute bottom-8 right-8 w-16 h-16 border-r-2 border-b-2 border-primary/20 rounded-br-3xl" />
    </section>
  );
}
