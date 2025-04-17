"use client";

import React from 'react';
import { motion } from 'framer-motion';

interface TestimonialCardProps {
  name: string;
  role: string;
  quote: string;
  className?: string;
  avatarIndex?: number; // Index pour générer un avatar aléatoire
  avatarImage?: string; // Chemin vers l'image d'avatar (optionnel)
}

/**
 * Composant TestimonialCard - Affiche un témoignage client
 */
const TestimonialCard: React.FC<TestimonialCardProps> = ({
  name,
  role,
  quote,
  className = "",
  avatarIndex = 0, // Valeur par défaut déterministe
  avatarImage,
}) => {
  // Générer une couleur de fond aléatoire pour l'avatar basée sur l'index
  const getAvatarColor = (index: number) => {
    const colors = [
      'bg-blue-100 text-blue-600',
      'bg-green-100 text-green-600',
      'bg-purple-100 text-purple-600',
      'bg-amber-100 text-amber-600',
      'bg-rose-100 text-rose-600',
      'bg-teal-100 text-teal-600',
      'bg-indigo-100 text-indigo-600',
      'bg-orange-100 text-orange-600',
      'bg-cyan-100 text-cyan-600',
      'bg-emerald-100 text-emerald-600'
    ];
    return colors[index % colors.length];
  };

  // Obtenir les initiales du nom
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(part => part[0])
      .join('')
      .toUpperCase();
  };

  return (
    <div className={`flex flex-col h-full justify-between ${className}`}>
      {/* En-tête avec avatar */}
      <div className="flex items-center mb-3">
        {avatarImage ? (
          <div className="w-10 h-10 rounded-full overflow-hidden mr-3 border border-gold-200">
            <img 
              src={`/${avatarImage}`} 
              alt={`Avatar de ${name}`} 
              className="w-full h-full object-cover"
              width={40}
              height={40}
            />
          </div>
        ) : (
          <div className={`w-10 h-10 rounded-full flex items-center justify-center mr-3 ${getAvatarColor(avatarIndex)}`}>
            <span className="font-semibold text-sm">{getInitials(name)}</span>
          </div>
        )}
      </div>
      
      {/* Citation */}
      <p className="text-gold-800 text-sm md:text-base italic flex-grow mb-4">{quote}</p>
      
      {/* Informations sur l'auteur */}
      <div className="mt-auto">
        <p className="text-gold-700 font-semibold">{name}</p>
        <p className="text-gold-600 text-xs">{role}</p>
      </div>
    </div>
  );
};

export default TestimonialCard;
