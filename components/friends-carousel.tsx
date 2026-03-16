"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

// Fotos estaticas de las amigas - reemplaza con tus propias imagenes
const friends = [
  { id: 1, name: "Ana", image: "/friends/friend-1.jpg" },
  { id: 2, name: "Laura", image: "/friends/friend-2.jpg" },
  { id: 3, name: "Sofia", image: "/friends/friend-3.jpg" },
  { id: 4, name: "Carmen", image: "/friends/friend-4.jpg" },
  { id: 5, name: "Paula", image: "/friends/friend-5.jpg" },
  { id: 6, name: "Maria", image: "/friends/friend-6.jpg" },
];

export function FriendsCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % friends.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  // Obtener indices para mostrar 3 tarjetas
  const getVisibleIndices = () => {
    const indices = [];
    for (let i = -1; i <= 1; i++) {
      const index = (currentIndex + i + friends.length) % friends.length;
      indices.push(index);
    }
    return indices;
  };

  const visibleIndices = getVisibleIndices();

  return (
    <div className="relative w-full max-w-sm sm:max-w-md mx-auto h-40 sm:h-48">
      {visibleIndices.map((friendIndex, position) => {
        const friend = friends[friendIndex];
        const isCenter = position === 1;
        const isLeft = position === 0;

        return (
          <div
            key={`${friend.id}-${position}`}
            className="absolute top-1/2 left-1/2 transition-all duration-500 ease-out"
            style={{
              transform: `
                translate(-50%, -50%) 
                translateX(${isCenter ? 0 : isLeft ? -65 : 65}%) 
                scale(${isCenter ? 1 : 0.7})
              `,
              zIndex: isCenter ? 10 : 5,
              opacity: isCenter ? 1 : 0.5,
            }}
          >
            <div className="relative w-20 h-24 sm:w-28 sm:h-36 rounded-xl sm:rounded-2xl overflow-hidden border-3 sm:border-4 border-card shadow-xl bg-card">
              <Image
                src={friend.image}
                alt={friend.name}
                fill
                className="object-cover"
                sizes="(max-width: 640px) 80px, 112px"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 via-transparent to-transparent" />
              <div className="absolute bottom-1.5 sm:bottom-2 left-0 right-0 text-center">
                <span className="text-card text-xs sm:text-sm font-medium drop-shadow-lg">
                  {friend.name}
                </span>
              </div>
            </div>
          </div>
        );
      })}

      {/* Indicadores */}
      <div className="absolute -bottom-5 sm:-bottom-6 left-1/2 -translate-x-1/2 flex gap-1">
        {friends.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            suppressHydrationWarning
            className={`w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full transition-all ${
              index === currentIndex
                ? "bg-primary w-4 sm:w-6"
                : "bg-primary/30"
            }`}
            aria-label={`Ver foto ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
