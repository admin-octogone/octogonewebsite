"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
// import { motion } from "framer-motion"; // Import non utilisé

// Définition du type pour les logos des clients
interface ClientLogo {
  id: number;
  name: string;
  logo: string;
  alt: string;
}

// Exemples de logos clients (à remplacer par vos vrais clients)
const clientLogos: ClientLogo[] = [
  {
    id: 1,
    name: "Restaurant A",
    logo: "/images/clients/client1.svg",
    alt: "Logo Restaurant A",
  },
  {
    id: 2,
    name: "Restaurant B",
    logo: "/images/clients/client2.svg",
    alt: "Logo Restaurant B",
  },
  {
    id: 3,
    name: "Restaurant C",
    logo: "/images/clients/client3.svg",
    alt: "Logo Restaurant C",
  },
  {
    id: 4,
    name: "Restaurant D",
    logo: "/images/clients/client4.svg",
    alt: "Logo Restaurant D",
  },
  {
    id: 5,
    name: "Restaurant E",
    logo: "/images/clients/client5.svg",
    alt: "Logo Restaurant E",
  },
  {
    id: 6,
    name: "Restaurant F",
    logo: "/images/clients/client6.svg",
    alt: "Logo Restaurant F",
  },
  {
    id: 7,
    name: "Restaurant G",
    logo: "/images/clients/client7.svg",
    alt: "Logo Restaurant G",
  },
  {
    id: 8,
    name: "Restaurant H",
    logo: "/images/clients/client8.svg",
    alt: "Logo Restaurant H",
  },
];

const ClientLogosCarousel = () => {
  const scrollRef = useRef<HTMLDivElement>(null);

  // Animation d'auto-scroll pour le carrousel
  useEffect(() => {
    const scrollContainer = scrollRef.current;
    if (!scrollContainer) return;

    let animationId: number;
    let scrollPosition = 0;
    const scrollSpeed = 0.5; // Vitesse de défilement en pixels par frame
    const containerWidth = scrollContainer.scrollWidth;
    const viewportWidth = scrollContainer.offsetWidth;

    const scroll = () => {
      if (!scrollContainer) return;

      scrollPosition += scrollSpeed;
      // Réinitialiser la position lorsqu'on atteint la moitié des logos
      if (scrollPosition >= (containerWidth - viewportWidth) / 2) {
        scrollPosition = 0;
      }

      scrollContainer.scrollLeft = scrollPosition;
      animationId = requestAnimationFrame(scroll);
    };

    // Démarrer l'animation
    animationId = requestAnimationFrame(scroll);

    // Mettre en pause l'animation au survol
    const handleMouseEnter = () => cancelAnimationFrame(animationId);
    const handleMouseLeave = () => {
      animationId = requestAnimationFrame(scroll);
    };

    scrollContainer.addEventListener("mouseenter", handleMouseEnter);
    scrollContainer.addEventListener("mouseleave", handleMouseLeave);

    // Nettoyage
    return () => {
      cancelAnimationFrame(animationId);
      if (scrollContainer) {
        scrollContainer.removeEventListener("mouseenter", handleMouseEnter);
        scrollContainer.removeEventListener("mouseleave", handleMouseLeave);
      }
    };
  }, []);

  return (
    <div className="w-full bg-white py-8 overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="text-center mb-6">
          <h3 className="text-lg font-medium text-gray-500">
            Ils nous font confiance
          </h3>
        </div>

        <div ref={scrollRef} className="flex items-center overflow-x-hidden">
          {/* Premier groupe de logos */}
          <div className="flex space-x-12 items-center">
            {clientLogos.map((client) => (
              <div
                key={client.id}
                className="flex-shrink-0 h-16 w-32 flex items-center justify-center grayscale hover:grayscale-0 transition-all duration-300"
              >
                <Image
                  src={client.logo}
                  alt={client.alt}
                  width={120}
                  height={60}
                  className="object-contain"
                />
              </div>
            ))}
          </div>

          {/* Deuxième groupe de logos (copie pour créer un effet infini) */}
          <div className="flex space-x-12 items-center">
            {clientLogos.map((client) => (
              <div
                key={`duplicate-${client.id}`}
                className="flex-shrink-0 h-16 w-32 flex items-center justify-center grayscale hover:grayscale-0 transition-all duration-300"
              >
                <Image
                  src={client.logo}
                  alt={client.alt}
                  width={120}
                  height={60}
                  className="object-contain"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClientLogosCarousel;
