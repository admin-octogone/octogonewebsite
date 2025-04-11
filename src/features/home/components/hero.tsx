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
  
  // État pour les hauteurs des barres du graphique
  const [barHeights, setBarHeights] = useState({
    bar1: 60,
    bar2: 75,
    bar3: 45,
    bar4: 85,
    bar5: 65,
    bar6: 70,
    bar7: 55
  });
  
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
  
  // Effet pour mettre à jour les hauteurs des barres toutes les 5 secondes
  useEffect(() => {
    const updateBarHeights = () => {
      setBarHeights({
        bar1: 55 + Math.floor(Math.random() * 15),
        bar2: 70 + Math.floor(Math.random() * 10),
        bar3: 42 + Math.floor(Math.random() * 8),
        bar4: 82 + Math.floor(Math.random() * 8),
        bar5: 62 + Math.floor(Math.random() * 10),
        bar6: 67 + Math.floor(Math.random() * 8),
        bar7: 52 + Math.floor(Math.random() * 8)
      });
    };
    
    // Mettre à jour immédiatement pour éviter le délai initial
    updateBarHeights();
    
    // Configurer l'intervalle pour les mises à jour périodiques
    const interval = setInterval(updateBarHeights, 5000);
    
    // Nettoyage à la démontage du composant
    return () => clearInterval(interval);
  }, []);
  
  // Calcul de la hauteur totale à soustraire
  const totalOffset = hasBanner ? NAVBAR_HEIGHT + BANNER_HEIGHT : NAVBAR_HEIGHT;
  
  return (
    <section 
      className="relative overflow-hidden bg-white flex items-center justify-center transition-all duration-300 ease-in-out" 
      style={{ 
        height: '100vh',
        position: 'fixed',
        top: '0',
        left: '0',
        right: '0',
        zIndex: '10',
        paddingTop: `${totalOffset}px`
      }}
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
            className="flex flex-col gap-6 text-left"
          >
            {/* Texte secteur */}
            <p className="text-xl mb-2 text-left">
              Plateforme de gestion pour les restaurants
            </p>
            
            {/* Titre principal */}
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
              L'ultime solution pour les professionnels de la <span className="text-gold-500">restauration</span>
            </h1>
            
            {/* Description */}
            <p className="mt-2 text-xl max-w-2xl">
              Des outils innovants et personnalisés pour optimiser la gestion de votre établissement et maximiser votre rentabilité.
            </p>
            
            {/* Boutons d'action */}
            <div className="mt-6 flex flex-col sm:flex-row gap-4">
              <Button variant="primary" size="lg" className="btn-gold text-base font-medium">
                En savoir plus
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              
              <Link 
                href="/services" 
                className="inline-flex items-center justify-center rounded-md px-4 py-2 text-base font-medium text-marine-700 hover:text-marine-900 transition-colors"
              >
                Parler à un expert
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </div>
            
            {/* Indicateurs de confiance retirés */}
          </motion.div>
          
          {/* Image avec fond bleu clair et éléments flottants */}
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
            <div style={{
              position: 'relative',
              width: '650px',
              height: '650px',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center'
            }}>
              {/* Cercle bleu de fond */}
              <div style={{
                position: 'absolute',
                width: '600px',
                height: '600px',
                backgroundColor: '#dbeafe',
                borderRadius: '50%',
                zIndex: 2
              }}></div>
              {/* Dashboard avec barres verticales animées en arrière-plan */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
                style={{
                  position: 'absolute',
                  width: '320px',
                  height: '320px',
                  background: 'linear-gradient(135deg, #003049 0%, #00456A 100%)', /* Couleur Marine du thème */
                  borderRadius: '12px',
                  boxShadow: '0 10px 30px rgba(0, 0, 0, 0.15)',
                  zIndex: 3,
                  overflow: 'hidden',
                  padding: '20px'
                }}>
                {/* Titre du dashboard */}
                <div style={{ 
                  color: 'white', /* Titre en blanc */
                  fontSize: '16px', 
                  fontWeight: 'normal', 
                  marginBottom: '25px',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  height: '20px' /* Hauteur fixe pour stabiliser */
                }}>
                  <span style={{ color: 'white', fontWeight: '400' }}>Performances</span>
                  <div style={{ display: 'flex', gap: '8px' }}>
                    <div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#3b82f6' }}></div>
                    <div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#10b981' }}></div>
                    <div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#f59e0b' }}></div>
                  </div>
                </div>
                
                {/* Barres verticales animées */}
                <div style={{ 
                  display: 'flex', 
                  alignItems: 'flex-end', 
                  justifyContent: 'space-between',
                  height: '200px',
                  padding: '0 10px',
                  position: 'relative',
                  minHeight: '200px' /* Hauteur minimale fixe */
                }}>
                  {/* Barre 1 */}
                  <motion.div
                    initial={{ height: 0 }}
                    animate={{ height: `${barHeights.bar1}%` }}
                    transition={{ duration: 1.5, ease: "easeInOut" }}
                    style={{ 
                      width: '30px', 
                      background: 'linear-gradient(to top, #3b82f6, #60a5fa)',
                      borderRadius: '4px 4px 0 0',
                      position: 'relative'
                    }}
                  >
                    <motion.div
                      animate={{ height: ['0%', '100%', '0%'] }}
                      transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                      style={{ 
                        position: 'absolute',
                        bottom: 0,
                        left: 0,
                        width: '100%',
                        background: 'linear-gradient(to top, rgba(255, 255, 255, 0.3), transparent)',
                        borderRadius: '4px 4px 0 0'
                      }}
                    />
                  </motion.div>
                  
                  {/* Barre 2 */}
                  <motion.div
                    initial={{ height: 0 }}
                    animate={{ height: `${barHeights.bar2}%` }}
                    transition={{ duration: 1.5, ease: "easeInOut" }}
                    style={{ 
                      width: '30px', 
                      background: 'linear-gradient(to top, #10b981, #34d399)',
                      borderRadius: '4px 4px 0 0',
                      position: 'relative'
                    }}
                  >
                    <motion.div
                      animate={{ height: ['0%', '100%', '0%'] }}
                      transition={{ duration: 2.8, repeat: Infinity, ease: "easeInOut" }}
                      style={{ 
                        position: 'absolute',
                        bottom: 0,
                        left: 0,
                        width: '100%',
                        background: 'linear-gradient(to top, rgba(255, 255, 255, 0.3), transparent)',
                        borderRadius: '4px 4px 0 0'
                      }}
                    />
                  </motion.div>
                  
                  {/* Barre 3 */}
                  <motion.div
                    initial={{ height: 0 }}
                    animate={{ height: `${barHeights.bar3}%` }}
                    transition={{ duration: 1.5, ease: "easeInOut" }}
                    style={{ 
                      width: '30px', 
                      background: 'linear-gradient(to top, #f59e0b, #fbbf24)',
                      borderRadius: '4px 4px 0 0',
                      position: 'relative'
                    }}
                  >
                    <motion.div
                      animate={{ height: ['0%', '100%', '0%'] }}
                      transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut" }}
                      style={{ 
                        position: 'absolute',
                        bottom: 0,
                        left: 0,
                        width: '100%',
                        background: 'linear-gradient(to top, rgba(255, 255, 255, 0.3), transparent)',
                        borderRadius: '4px 4px 0 0'
                      }}
                    />
                  </motion.div>
                  
                  {/* Barre 4 */}
                  <motion.div
                    initial={{ height: 0 }}
                    animate={{ height: `${barHeights.bar4}%` }}
                    transition={{ duration: 1.5, ease: "easeInOut" }}
                    style={{ 
                      width: '30px', 
                      background: 'linear-gradient(to top, #8b5cf6, #a78bfa)',
                      borderRadius: '4px 4px 0 0',
                      position: 'relative'
                    }}
                  >
                    <motion.div
                      animate={{ height: ['0%', '100%', '0%'] }}
                      transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
                      style={{ 
                        position: 'absolute',
                        bottom: 0,
                        left: 0,
                        width: '100%',
                        background: 'linear-gradient(to top, rgba(255, 255, 255, 0.3), transparent)',
                        borderRadius: '4px 4px 0 0'
                      }}
                    />
                  </motion.div>
                  
                  {/* Barre 5 */}
                  <motion.div
                    initial={{ height: 0 }}
                    animate={{ height: `${barHeights.bar5}%` }}
                    transition={{ duration: 1.5, ease: "easeInOut" }}
                    style={{ 
                      width: '30px', 
                      background: 'linear-gradient(to top, #ef4444, #f87171)',
                      borderRadius: '4px 4px 0 0',
                      position: 'relative'
                    }}
                  >
                    <motion.div
                      animate={{ height: ['0%', '100%', '0%'] }}
                      transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                      style={{ 
                        position: 'absolute',
                        bottom: 0,
                        left: 0,
                        width: '100%',
                        background: 'linear-gradient(to top, rgba(255, 255, 255, 0.3), transparent)',
                        borderRadius: '4px 4px 0 0'
                      }}
                    />
                  </motion.div>
                  
                  {/* Barre 6 */}
                  <motion.div
                    initial={{ height: 0 }}
                    animate={{ height: `${barHeights.bar6}%` }}
                    transition={{ duration: 1.5, ease: "easeInOut" }}
                    style={{ 
                      width: '30px', 
                      background: 'linear-gradient(to top, #0ea5e9, #38bdf8)',
                      borderRadius: '4px 4px 0 0',
                      position: 'relative'
                    }}
                  >
                    <motion.div
                      animate={{ height: ['0%', '100%', '0%'] }}
                      transition={{ duration: 2.7, repeat: Infinity, ease: "easeInOut" }}
                      style={{ 
                        position: 'absolute',
                        bottom: 0,
                        left: 0,
                        width: '100%',
                        background: 'linear-gradient(to top, rgba(255, 255, 255, 0.3), transparent)',
                        borderRadius: '4px 4px 0 0'
                      }}
                    />
                  </motion.div>
                  
                  {/* Barre 7 */}
                  <motion.div
                    initial={{ height: 0 }}
                    animate={{ height: `${barHeights.bar7}%` }}
                    transition={{ duration: 1.5, ease: "easeInOut" }}
                    style={{ 
                      width: '30px', 
                      background: 'linear-gradient(to top, #14b8a6, #2dd4bf)',
                      borderRadius: '4px 4px 0 0',
                      position: 'relative'
                    }}
                  >
                    <motion.div
                      animate={{ height: ['0%', '100%', '0%'] }}
                      transition={{ duration: 3.3, repeat: Infinity, ease: "easeInOut" }}
                      style={{ 
                        position: 'absolute',
                        bottom: 0,
                        left: 0,
                        width: '100%',
                        background: 'linear-gradient(to top, rgba(255, 255, 255, 0.3), transparent)',
                        borderRadius: '4px 4px 0 0'
                      }}
                    />
                  </motion.div>
                </div>
                
                {/* Légende en bas */}
                <div style={{ 
                  display: 'flex', 
                  justifyContent: 'space-between',
                  marginTop: '15px',
                  padding: '0 10px'
                }}>
                  {['L', 'M', 'M', 'J', 'V', 'S', 'D'].map((day, i) => (
                    <div key={i} style={{ 
                      color: 'rgba(255, 255, 255, 0.7)', 
                      fontSize: '12px', 
                      width: '30px',
                      textAlign: 'center'
                    }}>
                      {day}
                    </div>
                  ))}
                </div>
              </motion.div>
              
              {/* Image principale */}
              <Image
                src="/images/hero_image.png?v=1"
                alt="Solution Octogone pour la restauration"
                width={500}
                height={500}
                priority
                style={{ objectFit: 'contain', position: 'relative', zIndex: 5 }}
              />
              
              {/* Les barres verticales animées ont été supprimées */}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero
