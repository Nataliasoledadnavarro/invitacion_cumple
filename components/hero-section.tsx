"use client";

import {useEffect, useRef} from "react";
import {CalendarDays, Clock, HouseHeart, Coffee} from "lucide-react";
import {FriendsCarousel} from "@/components/friends-carousel";

export function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);

  const eventDetails = [
    {icon: CalendarDays, label: "Sab 28 de marzo", color: "text-primary"},
    {icon: Clock, label: "16:00 hs", color: "text-primary"},
    {icon: Coffee, label: "Merienda", color: "text-primary"},
    {icon: HouseHeart, label: "En mi casa", color: "text-primary"},
  ];

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
      className="relative min-h-svh flex flex-col items-center justify-center px-4 sm:px-6 sm:py-30 overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-24 -right-24 w-64 sm:w-96 h-64 sm:h-96 rounded-full bg-primary/10 blur-3xl" />
        <div className="absolute -bottom-32 -left-32 w-56 sm:w-80 h-56 sm:h-80 rounded-full bg-accent/20 blur-3xl" />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center w-full max-w-2xl mx-auto">
        {/* Main heading */}
        <h1 className="animate-on-scroll font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-semibold text-foreground mb-3 sm:mb-4 leading-tight text-balance">
          ¡OMG, que vértigo!
        </h1>

        {/* Tagline */}
        <p className="animate-on-scroll text-lg sm:text-xl md:text-2xl text-muted-foreground mb-6 sm:mb-8 font-light">
          Un reencuentro de amigas es el plan.
        </p>

        {/* Friends Carousel */}
        <div className="animate-on-scroll mb-6 sm:mb-10">

          <FriendsCarousel />
        </div>

        {/* Event details - Modern Grid */}
        <div className="animate-on-scroll mb-8 sm:mb-10 w-full">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
            {eventDetails.map((detail, index) => {
              const IconComponent = detail.icon;
              return (
                <div
                  key={index}
                  className="flex flex-col items-center gap-2 p-3 sm:p-4 rounded-2xl sm:rounded-3xl bg-gradient-to-br from-card to-card/80 border border-border/50 shadow-sm hover:shadow-md transition-all duration-300 hover:scale-105">
                  <IconComponent className="w-6 h-6 sm:w-8 sm:h-8 text-primary" />
                  <span className="text-xs sm:text-sm text-foreground font-semibold text-center leading-tight">
                    {detail.label}
                  </span>
                </div>
              );
            })}
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
