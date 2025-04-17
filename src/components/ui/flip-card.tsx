"use client";

import React, { useState, useEffect, ReactNode } from 'react';
import { motion } from 'framer-motion';

interface FlipCardProps {
  front: ReactNode;
  back: ReactNode;
  initialFlipped?: boolean;
  autoFlipInterval?: number | null; // Intervalle en ms, null pour désactiver
  className?: string;
}

/**
 * Composant FlipCard - Carte qui peut être retournée au survol ou automatiquement
 */
const FlipCard: React.FC<FlipCardProps> = ({
  front,
  back,
  initialFlipped = false,
  autoFlipInterval = null,
  className = "",
}) => {
  const [isFlipped, setIsFlipped] = useState(initialFlipped);
  const [isHovered, setIsHovered] = useState(false);

  // Effet pour le flip automatique
  useEffect(() => {
    if (!autoFlipInterval || isHovered) return;

    const interval = setInterval(() => {
      if (!isHovered) { // Ne pas retourner si la souris est dessus
        setIsFlipped(prev => !prev);
      }
    }, autoFlipInterval);

    return () => clearInterval(interval);
  }, [autoFlipInterval, isHovered]);

  return (
    <div
      className={`relative w-full h-full perspective-1000 ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => setIsFlipped(prev => !prev)}
    >
      <div 
        className="relative w-full h-full transition-transform duration-500 preserve-3d cursor-pointer"
        style={{ transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)' }}
      >
        {/* Face avant */}
        <div className="absolute inset-0 w-full h-full backface-hidden overflow-hidden">
          {front}
        </div>

        {/* Face arrière */}
        <div 
          className="absolute inset-0 w-full h-full backface-hidden overflow-hidden"
          style={{ transform: 'rotateY(180deg)' }}
        >
          {back}
        </div>
      </div>
    </div>
  );
};

export default FlipCard;
