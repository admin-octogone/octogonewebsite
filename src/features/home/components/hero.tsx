"use client"

import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'

// Constantes pour les hauteurs (en pixels)
const BANNER_HEIGHT = 40; // --banner-height dans globals.css
const NAVBAR_HEIGHT = 80; // h-20 dans le composant Navigation

export const Hero: React.FC = () => {
  // État pour détecter la présence de la bannière
  const [hasBanner, setHasBanner] = useState(true);
  
  useEffect(() => {
    // Fonction pour vérifier la visibilité de la bannière
    const checkBannerVisibility = () => {
      const bannerElement = document.querySelector('.announcement-banner');
      const isVisible = bannerElement && window.getComputedStyle(bannerElement).display !== 'none';
      setHasBanner(!!isVisible);
    };
    
    // Vérifier initialement
    checkBannerVisibility();
    
    // Observer les changements dans le DOM
    const observer = new MutationObserver(checkBannerVisibility);
    observer.observe(document.body, { childList: true, subtree: true });
    
    // Nettoyage
    return () => observer.disconnect();
  }, []);
  
  // Calcul de la hauteur totale à soustraire
  const totalOffset = hasBanner ? NAVBAR_HEIGHT + BANNER_HEIGHT : NAVBAR_HEIGHT;
  
  return (
    <section 
      className="relative overflow-hidden bg-white flex items-center transition-all duration-300 ease-in-out" 
      style={{ height: `calc(100vh - ${totalOffset}px)` }}
    >
      {/* Fond décoratif */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-marine-50 rounded-bl-[100px] opacity-70" />
        <div className="absolute bottom-0 left-0 w-1/4 h-1/4 bg-gold-100 rounded-tr-[70px] opacity-60" />
      </div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-16 items-center">
          {/* Contenu textuel */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="flex flex-col gap-6"
          >
            {/* Badge secteur */}
            <div className="inline-flex items-center rounded-full bg-gold-100 px-3 py-1 text-sm text-marine-800 mb-2 w-fit">
              <span className="inline-block w-2 h-2 rounded-full bg-gold-400 animate-pulse mr-2" />
              Solution spécialisée restauration
            </div>
            
            {/* Titre principal */}
            <h1 className="text-4xl font-bold tracking-tight text-marine-900 sm:text-5xl lg:text-6xl">
              L'ultime solution pour les professionnels de la <span className="text-gold-500">restauration</span>
            </h1>
            
            {/* Description */}
            <p className="mt-2 text-xl text-marine-600 max-w-2xl">
              Des outils innovants et personnalisés pour optimiser la gestion de votre établissement et maximiser votre rentabilité.
            </p>
            
            {/* Boutons d'action */}
            <div className="mt-6 flex flex-col sm:flex-row gap-4">
              <Button variant="primary" size="lg" className="btn-gold text-base font-medium">
                Démo pour restaurateurs
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              
              <Link 
                href="/services" 
                className="inline-flex items-center justify-center rounded-md px-4 py-2 text-base font-medium text-marine-700 hover:text-marine-900 transition-colors"
              >
                Solutions restauration
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </div>
            
            {/* Indicateurs de confiance */}
            <div className="mt-8 flex items-center gap-6">
              {/* Avatars */}
              <div className="flex -space-x-2">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="inline-block h-10 w-10 rounded-full ring-2 ring-white overflow-hidden bg-marine-100">
                    <Image 
                      src={`/images/avatar-${i}.svg`} 
                      alt={`Avatar ${i}`} 
                      width={40} 
                      height={40}
                      className="h-full w-full object-cover"
                    />
                  </div>
                ))}
              </div>
              
              {/* Étoiles et texte */}
              <div>
                <div className="flex items-center">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <svg key={i} className="h-5 w-5 text-gold-500" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <p className="text-sm text-marine-600">Plus de <span className="font-semibold">200+</span> restaurants équipés</p>
              </div>
            </div>
          </motion.div>
          
          {/* Image ou illustration */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="relative"
          >
            <div className="relative mx-auto w-full max-w-lg lg:max-w-none">
              {/* Image principale */}
              <div className="aspect-[4/3] overflow-hidden rounded-2xl bg-marine-50 shadow-xl">
                <Image
                  src="/images/hero-dashboard.svg"
                  alt="Dashboard Octogone"
                  width={600}
                  height={450}
                  className="h-full w-full object-cover"
                  priority
                />
              </div>
              
              {/* Élément flottant - Performance */}
              <motion.div 
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.6, duration: 0.8 }}
                className="absolute -bottom-6 -left-6 rounded-xl bg-white p-4 shadow-lg"
              >
                <div className="flex items-center gap-4">
                  <div className="rounded-full bg-gold-100 p-2">
                    <svg 
                      className="h-6 w-6 text-gold-500" 
                      fill="none" 
                      viewBox="0 0 24 24" 
                      stroke="currentColor"
                      aria-hidden="true"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-marine-900">Performance optimale</p>
                    <p className="text-xs text-marine-500">Temps de réponse amélioré</p>
                  </div>
                </div>
              </motion.div>
              
              {/* Élément flottant - Sécurité */}
              <motion.div 
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.8, duration: 0.8 }}
                className="absolute -top-6 -right-6 rounded-xl bg-white p-4 shadow-lg"
              >
                <div className="flex items-center gap-4">
                  <div className="rounded-full bg-marine-100 p-2">
                    <svg 
                      className="h-6 w-6 text-marine-500" 
                      fill="none" 
                      viewBox="0 0 24 24" 
                      stroke="currentColor"
                      aria-hidden="true"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-marine-900">Sécurité renforcée</p>
                    <p className="text-xs text-marine-500">Protection des données</p>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default Hero
