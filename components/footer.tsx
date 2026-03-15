"use client";

import { useEffect, useRef } from "react";
import { Heart } from "lucide-react";

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
      { threshold: 0.1 }
    );

    const elements = footerRef.current?.querySelectorAll(".animate-on-scroll");
    elements?.forEach((el, index) => {
      (el as HTMLElement).style.transitionDelay = `${index * 100}ms`;
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <footer
      ref={footerRef}
      className="relative py-20 px-6 bg-secondary/30"
    >
      {/* Decorative top border */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-1 bg-gradient-to-r from-transparent via-primary/30 to-transparent" />

      <div className="max-w-2xl mx-auto text-center">
        {/* Decorative heart pattern */}
        <div className="animate-on-scroll flex items-center justify-center gap-2 mb-8">
          <div className="w-8 h-px bg-border" />
          <Heart className="w-5 h-5 text-primary fill-primary/30" />
          <div className="w-8 h-px bg-border" />
        </div>

        {/* Main message */}
        <h3 className="animate-on-scroll font-serif text-3xl sm:text-4xl md:text-5xl font-semibold text-foreground mb-6">
          ¡Te espero!
        </h3>

        <p className="animate-on-scroll text-lg text-muted-foreground mb-8">
          Va a ser una tarde muy especial compartiendo con mis amigas mas
          queridas. ¡No te lo pierdas!
        </p>

        {/* Signature */}
        <div className="animate-on-scroll">
          <p className="font-serif text-2xl text-primary italic">
            Con amor, Nati
          </p>
        </div>

        {/* Bottom decoration */}
        <div className="animate-on-scroll mt-12 flex items-center justify-center gap-3">
          <div className="w-2 h-2 rounded-full bg-primary/40" />
          <div className="w-3 h-3 rounded-full bg-accent/60" />
          <div className="w-2 h-2 rounded-full bg-primary/40" />
        </div>
      </div>

      {/* Subtle copyright */}
      <div className="mt-16 text-center">
        <p className="text-xs text-muted-foreground/60">
          Cumple de Nati 2026
        </p>
      </div>
    </footer>
  );
}
