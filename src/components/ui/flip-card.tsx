"use client";

import React, { useState, useEffect, useRef, ReactNode } from 'react';
import { motion } from 'framer-motion';

interface FlipCardProps {
  front: React.ReactNode;
  back: React.ReactNode;
  initialFlipped?: boolean;
  autoFlipInterval?: number;
  className?: string;
  onFlipChange?: (isFlipped: boolean) => void;
}

/**
 * Composant FlipCard - Carte qui peut être retournée au survol ou automatiquement
 */
const FlipCard: React.FC<FlipCardProps> = ({
  front,
  back,
  initialFlipped = false,
  autoFlipInterval,
  className = "",
  onFlipChange,
}) => {
  const [isFlipped, setIsFlipped] = useState(initialFlipped);
  const [isHovered, setIsHovered] = useState(false);

  // Gérer le flip automatique si activé
  useEffect(() => {
    if (autoFlipInterval && typeof window !== 'undefined') {
      const timer = setInterval(() => {
        setIsFlipped(prev => !prev);
      }, autoFlipInterval);
      
      return () => clearInterval(timer);
    }
  }, [autoFlipInterval]);
  
  // Exposer l'état de flip via la prop onFlipChange si fournie, mais uniquement lors des changements réels
  // pour éviter les boucles infinies
  const prevFlippedRef = useRef(initialFlipped);
  
  useEffect(() => {
    // Ne déclencher le callback que si l'état a réellement changé
    if (onFlipChange && prevFlippedRef.current !== isFlipped) {
      prevFlippedRef.current = isFlipped;
      onFlipChange(isFlipped);
    }
  }, [isFlipped, onFlipChange]);

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
