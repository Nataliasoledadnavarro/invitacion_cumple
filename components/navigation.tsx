"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

const navItems = [
  { href: "#hero", label: "Inicio" },
  { href: "#actividad", label: "Actividad" },
  { href: "#confirmar", label: "Confirmar" },
];

export function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);

      // Find active section
      const sections = ["hero", "actividad", "confirmar"];
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 100 && rect.bottom >= 100) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
        isScrolled
          ? "bg-background/80 backdrop-blur-lg border-b border-border shadow-sm"
          : "bg-transparent"
      )}
    >
      <div className="max-w-4xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <a
            href="#hero"
            className={cn(
              "font-serif text-xl font-semibold transition-colors",
              isScrolled ? "text-foreground" : "text-foreground"
            )}
          >
      Cumplo 41      
          </a>

          {/* Nav items - hidden on mobile, shown on larger screens */}
          <div className="hidden sm:flex items-center gap-1">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className={cn(
                  "px-4 py-2 rounded-full text-sm font-medium transition-all",
                  activeSection === item.href.slice(1)
                    ? "bg-primary/10 text-primary"
                    : "text-muted-foreground hover:text-foreground hover:bg-secondary/50"
                )}
              >
                {item.label}
              </a>
            ))}
          </div>

          {/* Mobile indicator dots */}
          <div className="flex items-center gap-2">
            <div className="flex sm:hidden items-center gap-2">
              {navItems.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "w-2 h-2 rounded-full transition-all",
                    activeSection === item.href.slice(1)
                      ? "bg-primary scale-125"
                      : "bg-muted-foreground/30"
                  )}
                  aria-label={item.label}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
