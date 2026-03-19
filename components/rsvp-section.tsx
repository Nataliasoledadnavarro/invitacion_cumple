"use client";

import {useEffect, useRef, useState} from "react";
import {
  Check,
 HandMetal,
  Paintbrush,
  MessageCircle,
} from "lucide-react";
import {cn} from "@/lib/utils";
import {Confetti} from "@/components/confetti";

const WHATSAPP_NUMBER = "5491161737665"; // Argentina +54 9

export function RSVPSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [isConfirmed, setIsConfirmed] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [name, setName] = useState("");
  const [designPhrase, setDesignPhrase] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

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

  const buildWhatsAppURL = () => {
    const hasPhrase = designPhrase.trim();

    const message = [
  `Hola mi amikaaa!`,
  `Confirmo que voy a tu cumple!`,
  ``,
  `Nombre: ${name}`,
  hasPhrase
    ? `Mi frase elegida: "${designPhrase.trim()}"`
    : `Diseño: te paso la info por acá.`,
].join("\n");

    return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
  };

  const handleConfirm = async () => {
    if (!name.trim()) return;

    setIsSubmitting(true);
    await new Promise((resolve) => setTimeout(resolve, 800));
    setIsConfirmed(true);
    setShowConfetti(true);
    setIsSubmitting(false);

    // Pequeño delay para que vea el confetti antes de abrir WhatsApp
    setTimeout(() => {
      window.open(buildWhatsAppURL(), "_blank");
    }, 1200);
  };

  return (
    <>
      <Confetti isActive={showConfetti} />
      <section
        ref={sectionRef}
        id="confirmar"
        className="relative py-16 sm:py-24 px-4 sm:px-6">
        {/* Decorative background */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-0 left-1/4 w-64 h-64 rounded-full bg-accent/10 blur-3xl" />
          <div className="absolute bottom-0 right-1/4 w-72 h-72 rounded-full bg-primary/10 blur-3xl" />
        </div>

        <div className="relative z-10 max-w-xl mx-auto">
          {/* Section header */}
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="animate-on-scroll font-serif text-3xl sm:text-4xl md:text-5xl font-semibold text-foreground mb-3 sm:mb-4 text-balance">
              ¿Venis?
            </h2>
            <p className="animate-on-scroll text-base sm:text-lg text-muted-foreground">
              Confirmame y mandame qué querés pintar así lo preparo.
            </p>
          </div>

          {/* RSVP Card */}
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
                    <label
                      htmlFor="name"
                      className="block text-sm font-medium text-foreground mb-2">
                      Tu nombre
                    </label>
                    <input
                      id="name"
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Ej: Lali Espósito"
                      suppressHydrationWarning
                      className="w-full px-4 py-3 rounded-xl bg-secondary/50 border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all"
                    />
                  </div>

                  {/* Separador decorativo */}
                  <div className="flex items-center gap-3 py-2">
                    <div className="flex-1 h-px bg-border" />
                    <Paintbrush className="w-4 h-4 text-primary" />
                    <span className="text-xs text-muted-foreground uppercase tracking-wider">
                      tu diseño
                    </span>
                    <Paintbrush className="w-4 h-4 text-primary" />
                    <div className="flex-1 h-px bg-border" />
                  </div>

                  {/* Frase opcional */}
                  <div>
                    <label
                      htmlFor="phrase"
                      className="block text-sm font-medium text-foreground mb-2">
                      Frase o palabra{" "}
                      <span className="text-muted-foreground font-normal">
                        (opcional)
                      </span>
                    </label>
                    <textarea
                      id="phrase"
                      value={designPhrase}
                      onChange={(e) => setDesignPhrase(e.target.value)}
                      placeholder='Ej: "Usa el amor como un puente", "El decorado se calla", etc'
                      rows={3}
                      className="w-full px-4 py-3 rounded-xl bg-secondary/50 border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all resize-none"
                    />
                  </div>

                  {/* Info de imagen por WhatsApp */}
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

                  <button
                    onClick={handleConfirm}
                    disabled={!name.trim() || isSubmitting}
                    className={cn(
                      "w-full py-4 rounded-xl font-medium text-lg transition-all flex items-center justify-center gap-2",
                      name.trim()
                        ? "bg-primary text-primary-foreground hover:bg-primary/90 shadow-lg shadow-primary/20"
                        : "bg-muted text-muted-foreground cursor-not-allowed",
                    )}>
                    {isSubmitting ? (
                      <>
                        <div className="w-5 h-5 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                        <span>Confirmando...</span>
                      </>
                    ) : (
                      <>
                        <HandMetal className="w-5 h-5" />
                        <span>¡Yo voy!</span>
                      </>
                    )}
                  </button>
                </div>
              ) : (
                <div className="text-center py-4">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
                    <Check className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="font-serif text-2xl font-semibold text-foreground mb-2">
                    ¡Confirmado!
                  </h3>
                  <p className="text-muted-foreground mb-6">
                    Gracias{" "}
                    <span className="font-medium text-foreground">{name}</span>,
                    te espero el 28 de marzo. 🎉
                  </p>
                  <p className="text-sm text-muted-foreground mb-4">
                    Se abrió WhatsApp con tu confirmación. Si tenés una imagen,
                    adjuntala ahí antes de enviar 👇
                  </p>
                  <a
                    href={buildWhatsAppURL()}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#25D366] text-white font-medium hover:bg-[#20c05c] transition-colors">
                    <MessageCircle className="w-5 h-5" />
                    Abrir WhatsApp
                  </a>
                </div>
              )}
            </div>
          </div>

          {/* Additional info */}
          <p className="animate-on-scroll text-center text-sm text-muted-foreground mt-6">
            Si tenés alguna duda, escribime por WhatsApp
          </p>
        </div>
      </section>
    </>
  );
}
