"use client";

import {useEffect, useRef, useState} from "react";
import {Check, HandMetal, Paintbrush, MessageCircle} from "lucide-react";
import {cn} from "@/lib/utils";
import {Confetti} from "@/components/confetti";

const WHATSAPP_NUMBER = "5491161737665";

export function RSVPSection() {
  const sectionRef = useRef<HTMLElement>(null);

  const [isConfirmed, setIsConfirmed] = useState(false);
  const [name, setName] = useState("");
  const [designPhrase, setDesignPhrase] = useState("");
  const [showConfetti, setShowConfetti] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isHydrated, setIsHydrated] = useState(false);

  // ✅ Hydration safe (solo cliente)
  useEffect(() => {
    const storedConfirmed = localStorage.getItem("rsvp_sent") === "true";
    const storedName = localStorage.getItem("rsvp_name") ?? "";

    setIsConfirmed(storedConfirmed);
    setName(storedName);
    setIsHydrated(true);
  }, []);

  // Animaciones on scroll
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
      {threshold: 0.1, rootMargin: "-50px"},
    );

    const elements = sectionRef.current?.querySelectorAll(".animate-on-scroll");

    elements?.forEach((el, index) => {
      (el as HTMLElement).style.transitionDelay = `${index * 100}ms`;
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, [isHydrated]);

  // Generar URL WhatsApp
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

  // Confirmar asistencia
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

  // 🚫 Evita hydration mismatch
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
        className="relative py-16 sm:py-24 px-4 sm:px-6">
        {/* Background */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-0 left-1/4 w-64 h-64 rounded-full bg-accent/10 blur-3xl" />
          <div className="absolute bottom-0 right-1/4 w-72 h-72 rounded-full bg-primary/10 blur-3xl" />
        </div>

        <div className="relative z-10 max-w-xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="animate-on-scroll font-serif text-3xl sm:text-4xl md:text-5xl font-semibold text-foreground mb-3 sm:mb-4 text-balance">
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
              )}>
              {!isConfirmed ? (
                <div className="space-y-6">
                  {/* Nombre */}
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Tu nombre
                    </label>
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Ej: Lali Espósito"
                      className="w-full px-4 py-3 rounded-xl bg-secondary/50 border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all"
                    />
                  </div>

                  {/* Divider */}
                  <div className="flex items-center gap-3 py-2">
                    <div className="flex-1 h-px bg-border" />
                    <Paintbrush className="w-4 h-4 text-primary" />
                    <span className="text-xs text-muted-foreground uppercase tracking-wider">
                      tu diseño
                    </span>
                    <Paintbrush className="w-4 h-4 text-primary" />
                    <div className="flex-1 h-px bg-border" />
                  </div>

                  {/* Frase */}
                  <textarea
                    value={designPhrase}
                    onChange={(e) => setDesignPhrase(e.target.value)}
                    placeholder='Ej: "Usa el amor como un puente"...'
                    rows={3}
                    className="w-full px-4 py-3 rounded-xl bg-secondary/50 border border-border"
                  />

                  {/* Info */}
                 <div className="flex gap-3 items-start p-4 rounded-xl border border-primary/50">
                    <MessageCircle className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      Si tenés una imagen,{" "}
                      <span className="text-foreground font-medium">
                        adjuntála directo en WhatsApp
                      </span>{" "}
                      cuando te abra el chat.
                    </p>
                  </div>

                  {/* CTA */}
                  <button
                    onClick={handleConfirm}
                    disabled={!name.trim() || isSubmitting}
                    className={cn(
                      "w-full py-4 rounded-xl flex items-center justify-center gap-4",
                      name.trim()
                        ? "bg-primary text-white"
                        : "bg-muted text-muted-foreground",
                    )}>
                      <HandMetal className="w-5 h-5" />
                    {isSubmitting ? "Confirmando..." : "¡Yo voy!"}
                  </button>
                </div>
              ) : (
                <div className="text-center">
                  <Check className="mx-auto w-10 h-10 text-primary" />
                  <h3 className="text-xl font-semibold mt-2">¡Confirmado!</h3>

                  <p className="mt-2 text-muted-foreground">
                    Gracias {name}, te espero! 
                  </p>

                  <a
                    href={buildWhatsAppURL()}
                    target="_blank"
                    className="mt-4 inline-block bg-green-500 text-white px-4 py-2 rounded-xl">
                    Abrir WhatsApp
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
