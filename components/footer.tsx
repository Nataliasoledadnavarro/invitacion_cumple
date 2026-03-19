"use client";

import {useEffect, useRef} from "react";
import {Rainbow} from "lucide-react";

export function Footer() {
  const footerRef = useRef<HTMLElement>(null);

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

    const elements = footerRef.current?.querySelectorAll(".animate-on-scroll");
    elements?.forEach((el, index) => {
      (el as HTMLElement).style.transitionDelay = `${index * 100}ms`;
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <footer ref={footerRef} className="relative py-20 px-6 bg-secondary/30">
      {/* Decorative top border */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-1 bg-gradient-to-r from-transparent via-primary/30 to-transparent" />

      <div className="max-w-2xl mx-auto text-center">
        {/* Decorative heart pattern */}
        <div className="animate-on-scroll flex items-center justify-center gap-2 mb-8">
          <div className="w-8 h-px bg-border" />
          <Rainbow className="w-10 h-10 text-primary fill-primary/30" />
          <div className="w-8 h-px bg-border" />
        </div>

        {/* Main message */}
        <h3 className="animate-on-scroll font-serif text-3xl sm:text-4xl md:text-5xl font-semibold text-foreground mb-6">
          ¡Te espero!
        </h3>

        <div className="animate-on-scroll flex flex-col gap-1 text-lg text-muted-foreground mb-8">
          <p>
           ¡No me falles! <span className="font-bold">ahre!</span>, se hacia la
            joven..🤌
          </p>
          <p>Me rodean las mejores... Las Adoro!</p>
        </div>

        {/* Bottom decoration */}
        <div className="animate-on-scroll mt-12 h-px w-full max-w-xs mx-auto bg-linear-to-r from-transparent via-primary/40 to-transparent" />
      </div>

      {/* Subtle copyright */}
      <div className="mt-16 text-center">
        <p className="text-xs text-muted-foreground/60">Cumple de Naty 2026</p>
      </div>
    </footer>
  );
}
