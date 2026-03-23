"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

// Fotos estaticas de las amigas - reemplaza con tus propias imagenes
const friends = [
  { id: 0, image: "/friends/friend-0.jpg" },
  { id: 1, image: "/friends/friend-1.jpg" },
  { id: 2, image: "/friends/friend-2.jpg" },
  { id: 3, image: "/friends/friend-3.jpg" },
  { id: 4, image: "/friends/friend-4.jpg" },
  { id: 5, image: "/friends/friend-5.jpg" },
  { id: 6, image: "/friends/friend-6.jpg" },
  { id: 7, image: "/friends/friend-7.jpg" },
  { id: 8, image: "/friends/friend-8.jpg" },
  { id: 9, image: "/friends/friend-9.jpg" },
  { id: 10, image: "/friends/friend-10.jpg" },
  { id: 11, image: "/friends/friend-11.jpg" },
  { id: 12, image: "/friends/friend-12.jpg" },
  { id: 13, image: "/friends/friend-13.jpg" },
  { id: 14, image: "/friends/friend-29.jpg" },
  { id: 15, image: "/friends/friend-15.jpg" },
  { id: 16, image: "/friends/friend-16.jpg" },
  { id: 17, image: "/friends/friend-17.jpg" },
  { id: 18, image: "/friends/friend-18.jpg" },
  { id: 19, image: "/friends/friend-19.jpg" },
  { id: 20, image: "/friends/friend-20.jpg" },
  { id: 21, image: "/friends/friend-21.jpg" },
  { id: 22, image: "/friends/friend-22.jpg" },
  { id: 23, image: "/friends/friend-23.jpg" },
  { id: 24, image: "/friends/friend-24.jpg" },
  { id: 25, image: "/friends/friend-25.jpg" },
  { id: 26, image: "/friends/friend-26.jpg" },
  { id: 27, image: "/friends/friend-27.jpg" },
  { id: 28, image: "/friends/friend-28.jpg" },
  { id: 29, image: "/friends/friend-14.jpg" },
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

  const handleAdjacentClick = (position: number) => {
    if (position === 0) {
      // Anterior
      setCurrentIndex((prev) => (prev - 1 + friends.length) % friends.length);
    } else if (position === 2) {
      // Siguiente
      setCurrentIndex((prev) => (prev + 1) % friends.length);
    }
  };

  const visibleIndices = getVisibleIndices();

  return (
    <div className="relative w-full max-w-xl mx-auto h-75 sm:h-120">
      {visibleIndices.map((friendIndex, position) => {
        const friend = friends[friendIndex];
        const isCenter = position === 1;
        const isLeft = position === 0;
        const isClickable = !isCenter;

        return (
          <div
            key={`${friend.id}-${position}`}
            className={`absolute top-1/2 left-1/2 transition-all duration-500 ease-out ${
              isClickable ? "cursor-pointer" : ""
            }`}
            style={{
              transform: `
                translate(-50%, -50%) 
                translateX(${isCenter ? 0 : isLeft ? -70 : 70}%) 
                scale(${isCenter ? 1 : 0.65})
              `,
              zIndex: isCenter ? 10 : 5,
              opacity: isCenter ? 1 : 0.5,
            }}
            onClick={() => isClickable && handleAdjacentClick(position)}
          >
            <div
              className={`relative w-40 h-56 sm:w-64 sm:h-96 rounded-2xl sm:rounded-3xl overflow-hidden border-4 sm:border-6 border-card shadow-2xl bg-card ${
                isClickable ? "hover:shadow-xl transition-shadow" : ""
              }`}
            >
              <Image
                src={friend.image}
                alt={`Foto ${friend.id}`}
                fill
                className="object-cover"
                sizes="(max-width: 640px) 160px, 256px"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-foreground/40 via-transparent to-transparent" />
            </div>
          </div>
        );
      })}
    </div>
  );
}
