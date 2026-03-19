"use client";

import {useEffect, useRef} from "react";
import {Palette, ShoppingBag, Brain, Sparkles, Flame, Gem, Pyramid} from "lucide-react";

export function ActivitySection() {
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
      {threshold: 0.1, rootMargin: "-50px"},
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
      id="actividad"
      className="relative py-16 sm:py-24 px-4 sm:px-6 bg-secondary/30">
      {/* Decorative pattern */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23c9a89e' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto">
        {/* Section header */}
        <div className="text-center mb-10 sm:mb-16">
          <div className="animate-on-scroll inline-flex items-center gap-2 mb-3 sm:mb-4">
            <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 text-accent" />
            <span className="text-xs sm:text-sm uppercase tracking-widest text-muted-foreground">
              Actividad especial
            </span>
            <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 text-accent" />
          </div>
          <h2 className="animate-on-scroll font-serif text-3xl sm:text-4xl md:text-5xl font-semibold text-foreground mb-4 sm:mb-6 text-balance">
            Incluye un mini momento creativo.
          </h2>
          <p className="animate-on-scroll text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto">
            Idea random de mi combo ♈ ♊ ♑
          </p>
        </div>

        {/* Activity card */}
        <div className="animate-on-scroll bg-card rounded-2xl sm:rounded-3xl border border-border p-5 sm:p-8 md:p-12 shadow-lg">
          <div className="grid md:grid-cols-2 gap-6 sm:gap-8 md:gap-12">
            {/* Left side - illustration area */}
            <div className="flex flex-col items-center justify-center bg-secondary/50 rounded-xl sm:rounded-2xl p-6 sm:p-8 min-h-[200px] sm:min-h-[280px]">
              <div className="relative">
                {/* Tote bag illustration */}
                <div className="w-24 h-32 sm:w-32 sm:h-40 bg-card rounded-lg border-2 border-primary/30 relative shadow-md">
                  {/* Bag handles */}
                  <div className="absolute -top-3 sm:-top-4 left-3 sm:left-4 w-6 sm:w-8 h-5 sm:h-6 border-t-3 sm:border-t-4 border-l-3 sm:border-l-4 border-r-3 sm:border-r-4 border-primary/40 rounded-t-full" />
                  <div className="absolute -top-3 sm:-top-4 right-3 sm:right-4 w-6 sm:w-8 h-5 sm:h-6 border-t-3 sm:border-t-4 border-l-3 sm:border-l-4 border-r-3 sm:border-r-4 border-primary/40 rounded-t-full" />
                  {/* Paint splatters */}
                  <div className="absolute top-6 sm:top-8 left-4 sm:left-6 w-6 h-6 sm:w-8 sm:h-8 bg-primary/30 rounded-full" />
                  <div className="absolute top-10 sm:top-14 right-4 sm:right-6 w-5 h-5 sm:w-6 sm:h-6 bg-accent/40 rounded-full" />
                  <div className="absolute bottom-6 sm:bottom-8 left-8 sm:left-10 w-4 h-4 sm:w-5 sm:h-5 bg-primary/20 rounded-full" />
                </div>
                {/* Floating paint elements */}
                <Palette className="absolute -right-6 sm:-right-8 -top-3 sm:-top-4 w-8 h-8 sm:w-10 sm:h-10 text-primary/60 animate-pulse" />
                <div className="absolute -left-4 sm:-left-6 bottom-3 sm:bottom-4 w-3 h-3 sm:w-4 sm:h-4 bg-accent rounded-full animate-bounce" />
              </div>
            </div>

            {/* Right side - details */}
            <div className="flex flex-col justify-center gap-4 sm:gap-6">
              <div className="flex items-start gap-3 sm:gap-4">
                <div className="flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 rounded-lg sm:rounded-xl bg-primary/10 flex items-center justify-center">
                  <ShoppingBag className="w-5 h-5 sm:w-6 sm:h-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground text-base sm:text-lg mb-0.5 sm:mb-1">
                    Tu lienzo
                  </h3>
                  <p className="text-sm sm:text-base text-muted-foreground">
                   Cada una lo recibe listo para intervenir con su propio diseño.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 sm:gap-4">
                <div className="flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 rounded-lg sm:rounded-xl bg-accent/20 flex items-center justify-center">
                  <Palette className="w-5 h-5 sm:w-6 sm:h-6 text-accent" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground text-base sm:text-lg mb-0.5 sm:mb-1">
                    Materiales disponibles
                  </h3>
                  <p className="text-sm sm:text-base text-muted-foreground">
                    Todo lo necesario, mate en abundancia, espacio de calma, risas aseguradas y cositas ricas. 
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 sm:gap-4">
                <div className="flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 rounded-lg sm:rounded-xl bg-secondary flex items-center justify-center">
                  <Brain className="w-5 h-5 sm:w-6 sm:h-6 text-foreground" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground text-base sm:text-lg mb-0.5 sm:mb-1">
                    Pensá tu diseño
                  </h3>
                  <p className="text-sm sm:text-base text-muted-foreground">
                    Puede ser una frase, un dibujo simple o algo que te represente.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Tip box */}
          <div className="mt-6 sm:mt-8 pt-6 sm:pt-8 border-t border-border">
            <div className="flex items-center gap-3 p-3 sm:p-4 rounded-lg sm:rounded-xl bg-primary/5 border border-primary/10">
              <span className="text-xl sm:text-2xl flex-shrink-0">💡</span>
              <p className="text-xs sm:text-sm text-muted-foreground">
                <span className="font-medium text-foreground">Tip:</span> Podes
                Si te falta inspiración, un paseo por Pinterest o Instagram siempre ayuda.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
