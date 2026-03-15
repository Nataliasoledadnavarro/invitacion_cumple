"use client";

import { useEffect, useRef, useState } from "react";
import { Check, PartyPopper, Send, ImagePlus, X, Paintbrush } from "lucide-react";
import { cn } from "@/lib/utils";
import { Confetti } from "@/components/confetti";
import Image from "next/image";

export function RSVPSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [isConfirmed, setIsConfirmed] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [name, setName] = useState("");
  const [designType, setDesignType] = useState<"image" | "phrase">("phrase");
  const [designPhrase, setDesignPhrase] = useState("");
  const [designImage, setDesignImage] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
          }
        });
      },
      { threshold: 0.1, rootMargin: "-50px" }
    );

    const elements = sectionRef.current?.querySelectorAll(".animate-on-scroll");
    elements?.forEach((el, index) => {
      (el as HTMLElement).style.transitionDelay = `${index * 100}ms`;
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setDesignImage(event.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeImage = () => {
    setDesignImage(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleConfirm = async () => {
    if (!name.trim()) return;
    
    setIsSubmitting(true);
    await new Promise(resolve => setTimeout(resolve, 800));
    setIsConfirmed(true);
    setShowConfetti(true);
    setIsSubmitting(false);
  };

  const hasDesign = designType === "image" ? !!designImage : !!designPhrase.trim();

  return (
    <>
      <Confetti isActive={showConfetti} />
      <section
        ref={sectionRef}
        id="confirmar"
        className="relative py-16 sm:py-24 px-4 sm:px-6"
      >
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
              Confirmame tu asistencia y mandame que querés pintar asi lo preparo. 
            </p>
          </div>

          {/* RSVP Card */}
          <div className="animate-on-scroll">
            <div
              className={cn(
                "bg-card rounded-3xl border border-border p-8 md:p-10 shadow-lg transition-all duration-500",
                isConfirmed && "bg-primary/5 border-primary/20"
              )}
            >
              {!isConfirmed ? (
                <div className="space-y-6">
                  {/* Nombre */}
                  <div>
                    <label
                      htmlFor="name"
                      className="block text-sm font-medium text-foreground mb-2"
                    >
                      Tu nombre
                    </label>
                    <input
                      id="name"
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Ej: Maria Lopez"
                      className="w-full px-4 py-3 rounded-xl bg-secondary/50 border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all"
                    />
                  </div>

                  {/* Separador decorativo */}
                  <div className="flex items-center gap-3 py-2">
                    <div className="flex-1 h-px bg-border" />
                    <Paintbrush className="w-4 h-4 text-primary" />
                    <span className="text-xs text-muted-foreground uppercase tracking-wider">Tu diseno para la totebag</span>
                    <Paintbrush className="w-4 h-4 text-primary" />
                    <div className="flex-1 h-px bg-border" />
                  </div>

                  {/* Selector de tipo de diseno */}
                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={() => setDesignType("phrase")}
                      className={cn(
                        "flex-1 py-2.5 px-4 rounded-xl text-sm font-medium transition-all border",
                        designType === "phrase"
                          ? "bg-primary text-primary-foreground border-primary"
                          : "bg-secondary/50 text-muted-foreground border-border hover:border-primary/50"
                      )}
                    >
                      Frase
                    </button>
                    <button
                      type="button"
                      onClick={() => setDesignType("image")}
                      className={cn(
                        "flex-1 py-2.5 px-4 rounded-xl text-sm font-medium transition-all border",
                        designType === "image"
                          ? "bg-primary text-primary-foreground border-primary"
                          : "bg-secondary/50 text-muted-foreground border-border hover:border-primary/50"
                      )}
                    >
                      Imagen
                    </button>
                  </div>

                  {/* Campo de frase o imagen */}
                  {designType === "phrase" ? (
                    <div>
                      <label
                        htmlFor="phrase"
                        className="block text-sm font-medium text-foreground mb-2"
                      >
                        Frase o palabra que queres pintar
                      </label>
                      <textarea
                        id="phrase"
                        value={designPhrase}
                        onChange={(e) => setDesignPhrase(e.target.value)}
                        placeholder='Ej: "Usa el amor como un puente", "El decorado se calla", "Una diva soñada, ¿quién me puede culpar?", una palabra que te inspire...'
                        rows={3}
                        className="w-full px-4 py-3 rounded-xl bg-secondary/50 border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all resize-none"
                      />
                    </div>
                  ) : (
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        Subi una imagen de referencia
                      </label>
                      
                      {!designImage ? (
                        <label
                          htmlFor="design-image"
                          className="flex flex-col items-center justify-center w-full h-36 rounded-xl border-2 border-dashed border-border bg-secondary/30 hover:bg-secondary/50 hover:border-primary/50 cursor-pointer transition-all"
                        >
                          <ImagePlus className="w-8 h-8 text-muted-foreground mb-2" />
                          <span className="text-sm text-muted-foreground">
                            Toca para subir imagen
                          </span>
                          <span className="text-xs text-muted-foreground/70 mt-1">
                            JPG, PNG o GIF
                          </span>
                          <input
                            ref={fileInputRef}
                            id="design-image"
                            type="file"
                            accept="image/*"
                            onChange={handleImageUpload}
                            className="hidden"
                          />
                        </label>
                      ) : (
                        <div className="relative w-full h-40 rounded-xl overflow-hidden border border-border">
                          <Image
                            src={designImage}
                            alt="Diseno seleccionado"
                            fill
                            className="object-contain bg-secondary/30"
                          />
                          <button
                            type="button"
                            onClick={removeImage}
                            className="absolute top-2 right-2 p-1.5 rounded-full bg-foreground/80 text-background hover:bg-foreground transition-colors"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </div>
                      )}
                    </div>
                  )}

                  <p className="text-xs text-muted-foreground text-center">
                    Asi puedo ir preparando los materiales.
                  </p>

                  <button
                    onClick={handleConfirm}
                    disabled={!name.trim() || isSubmitting}
                    className={cn(
                      "w-full py-4 rounded-xl font-medium text-lg transition-all flex items-center justify-center gap-2",
                      name.trim()
                        ? "bg-primary text-primary-foreground hover:bg-primary/90 shadow-lg shadow-primary/20"
                        : "bg-muted text-muted-foreground cursor-not-allowed"
                    )}
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-5 h-5 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                        <span>Confirmando...</span>
                      </>
                    ) : (
                      <>
                        <Send className="w-5 h-5" />
                        <span>Confirmar asistencia</span>
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
                  <p className="text-muted-foreground mb-4">
                    Gracias <span className="font-medium text-foreground">{name}</span>, 
                    te espero el 28 de marzo.
                  </p>
                  {hasDesign && (
                    <div className="mt-4 p-4 rounded-xl bg-secondary/50 border border-border">
                      <p className="text-sm text-muted-foreground mb-2">Tu diseno:</p>
                      {designType === "phrase" ? (
                        <p className="font-medium text-foreground italic">"{designPhrase}"</p>
                      ) : designImage && (
                        <div className="relative w-24 h-24 mx-auto rounded-lg overflow-hidden">
                          <Image src={designImage} alt="Tu diseno" fill className="object-contain" />
                        </div>
                      )}
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Additional info */}
          <p className="animate-on-scroll text-center text-sm text-muted-foreground mt-6">
            Si tenes alguna duda, escribime por WhatsApp
          </p>
        </div>
      </section>
    </>
  );
}
