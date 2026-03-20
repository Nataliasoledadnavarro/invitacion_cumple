"use client";

import { useEffect, useRef, useState } from "react";
import {
  Check,
  HandMetal,
  Paintbrush,
  MessageCircle,
  CalendarPlus,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Confetti } from "@/components/confetti";

const WHATSAPP_NUMBER = "5491161737665";

// 📅 Google Calendar
const buildGoogleCalendarURL = () => {
  const url = new URL("https://calendar.google.com/calendar/render");
  url.searchParams.set("action", "TEMPLATE");
  url.searchParams.set("text", "Cumple Naty! 🎉");
  url.searchParams.set("dates", "20260328T160000/20260328T200000");
  url.searchParams.set(
    "details",
    "Ahi nos vemos!! abrazo! 🫶",
  );
  url.searchParams.set("location", "En mi casa 🏠");
  url.searchParams.set("ctz", "America/Argentina/Buenos_Aires");

  return url.toString();
};

// 📅 Apple / Outlook (.ics)
const buildICSFile = () => {
  const event = `BEGIN:VCALENDAR
VERSION:2.0
BEGIN:VEVENT
SUMMARY:Cumple 41 OMG! 🎉
DTSTART:20260328T150000
DTEND:20260328T220000
DESCRIPTION:Festejo de cumple con pintada de tote bags 🎨
LOCATION:Tu dirección acá
END:VEVENT
END:VCALENDAR`;

  const blob = new Blob([event], {
    type: "text/calendar;charset=utf-8",
  });

  return URL.createObjectURL(blob);
};

export function RSVPSection() {
  const sectionRef = useRef<HTMLElement>(null);

  const [isConfirmed, setIsConfirmed] = useState(false);
  const [name, setName] = useState("");
  const [designPhrase, setDesignPhrase] = useState("");
  const [showConfetti, setShowConfetti] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isHydrated, setIsHydrated] = useState(false);

  // ✅ Hydration safe
  useEffect(() => {
    const storedConfirmed = localStorage.getItem("rsvp_sent") === "true";
    const storedName = localStorage.getItem("rsvp_name") ?? "";

    setIsConfirmed(storedConfirmed);
    setName(storedName);
    setIsHydrated(true);
  }, []);

  // Animaciones
  useEffect(() => {
    if (!isHydrated) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
          }
        });
      },
      { threshold: 0.1, rootMargin: "-50px" },
    );

    const elements = sectionRef.current?.querySelectorAll(".animate-on-scroll");

    elements?.forEach((el, index) => {
      (el as HTMLElement).style.transitionDelay = `${index * 100}ms`;
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, [isHydrated]);

  // WhatsApp
  const buildWhatsAppURL = () => {
    const hasPhrase = !!designPhrase.trim();

    const message = [
      "Hola mi amikaaa!",
      "Confirmo que voy a tu cumple!",
      "",
      `Nombre: ${name}`,
      hasPhrase
        ? `Mi frase elegida: "${designPhrase.trim()}"`
        : "Diseño: te paso la info por acá.",
    ].join("\n");

    return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
      message,
    )}`;
  };

  // Confirmar
  const handleConfirm = async () => {
    if (!name.trim()) return;

    setIsSubmitting(true);

    await new Promise((resolve) => setTimeout(resolve, 800));

    setIsConfirmed(true);
    setShowConfetti(true);

    localStorage.setItem("rsvp_sent", "true");
    localStorage.setItem("rsvp_name", name);

    setIsSubmitting(false);

    setTimeout(() => {
      window.open(buildWhatsAppURL(), "_blank");
    }, 1200);
  };

  if (!isHydrated) {
    return (
      <section className="py-24 text-center text-muted-foreground">
        Cargando...
      </section>
    );
  }

  return (
    <>
      <Confetti isActive={showConfetti} />

      <section
        ref={sectionRef}
        id="confirmar"
        className="relative py-16 sm:py-24 px-4 sm:px-6"
      >
        {/* Background */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-0 left-1/4 w-64 h-64 rounded-full bg-accent/10 blur-3xl" />
          <div className="absolute bottom-0 right-1/4 w-72 h-72 rounded-full bg-primary/10 blur-3xl" />
        </div>

        <div className="relative z-10 max-w-xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="animate-on-scroll font-serif text-3xl sm:text-4xl md:text-5xl font-semibold text-foreground mb-3 sm:mb-4">
              ¿Venís?
            </h2>
            <p className="animate-on-scroll text-base sm:text-lg text-muted-foreground">
              Confirmame y mandame qué querés pintar así lo preparo.
            </p>
          </div>

          <div className="animate-on-scroll">
            <div
              className={cn(
                "bg-card rounded-3xl border border-border p-8 md:p-10 shadow-lg transition-all duration-500",
                isConfirmed && "bg-primary/5 border-primary/20",
              )}
            >
              {!isConfirmed ? (
                <div className="space-y-6">
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Tu nombre"
                    className="w-full px-4 py-3 rounded-xl bg-secondary/50 border border-border"
                  />

                  <textarea
                    value={designPhrase}
                    onChange={(e) => setDesignPhrase(e.target.value)}
                    placeholder="Frase opcional..."
                    className="w-full px-4 py-3 rounded-xl bg-secondary/50 border border-border"
                  />

                  <button
                    onClick={handleConfirm}
                    disabled={!name.trim() || isSubmitting}
                    className="w-full py-4 rounded-xl bg-primary text-white"
                  >
                    {isSubmitting ? "Confirmando..." : "¡Yo voy!"}
                  </button>
                </div>
              ) : (
                <div className="text-center py-6">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
                    <Check className="w-8 h-8 text-primary" />
                  </div>

                  <h3 className="text-2xl font-semibold">¡Confirmada!</h3>

                  <p className="mt-2 text-muted-foreground mb-6">
                    Gracias{" "}
                    <span className="font-medium text-foreground">{name}</span>,
                    te espero! 🎉
                  </p>

                  <div className="flex flex-col gap-3 items-center">
                    {/* WhatsApp */}
                    <a
                      href={buildWhatsAppURL()}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-[#25D366] text-white font-medium hover:bg-[#20c05c] transition-all shadow-md hover:shadow-lg"
                    >
                      <MessageCircle className="w-5 h-5" />
                      Abrir WhatsApp
                    </a>

                    {/* Google Calendar */}
                    <a
                      href={buildGoogleCalendarURL()}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-[#4285F4] text-white font-medium hover:bg-[#3367d6] transition-all shadow-md hover:shadow-lg"
                    >
                      <CalendarPlus className="w-5 h-5" />
                      Agendar en Google
                    </a>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
