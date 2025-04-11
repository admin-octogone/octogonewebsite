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
              {/* Dashboard en arrière-plan */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{
                  opacity: 1,
                  y: [0, -8, 0]
                }}
                transition={{
                  opacity: { duration: 0.5 },
                  y: {
                    duration: 4,
                    ease: "easeInOut",
                    repeat: Infinity,
                    repeatType: "reverse"
                  }
                }}
                style={{
                  position: 'absolute',
                  width: '320px',
                  height: '320px',
                  background: 'linear-gradient(135deg, #f0f9ff 0%, #e6f7ff 100%)',
                  borderRadius: '12px',
                  boxShadow: '0 10px 30px rgba(0, 0, 0, 0.05)',
                  zIndex: 3,
                  overflow: 'hidden'
                }}>
                {/* Éléments du dashboard */}
                <div style={{
                  position: 'absolute',
                  top: '10px',
                  left: '10px',
                  right: '10px',
                  height: '40px',
                  background: 'white',
                  borderRadius: '6px',
                  boxShadow: '0 2px 5px rgba(0, 0, 0, 0.05)',
                  display: 'flex',
                  alignItems: 'center',
                  padding: '0 15px'
                }}>
                  <div style={{ width: '20px', height: '20px', borderRadius: '50%', backgroundColor: '#e6f7ff', marginRight: '10px' }}></div>
                  <div style={{ width: '120px', height: '12px', borderRadius: '6px', backgroundColor: '#e6f7ff' }}></div>
                  <div style={{ marginLeft: 'auto', display: 'flex', gap: '10px' }}>
                    <div style={{ width: '80px', height: '12px', borderRadius: '6px', backgroundColor: '#e6f7ff' }}></div>
                    <div style={{ width: '60px', height: '12px', borderRadius: '6px', backgroundColor: '#e6f7ff' }}></div>
                  </div>
                </div>
                
                {/* Graphiques */}
                <div style={{
                  position: 'absolute',
                  top: '60px',
                  left: '10px',
                  width: '180px',
                  height: '140px',
                  background: 'white',
                  borderRadius: '6px',
                  boxShadow: '0 2px 5px rgba(0, 0, 0, 0.05)',
                  padding: '10px'
                }}>
                  <div style={{ width: '80px', height: '12px', borderRadius: '6px', backgroundColor: '#e6f7ff', marginBottom: '15px' }}></div>
                  <div style={{ display: 'flex', height: '60px', alignItems: 'flex-end', gap: '6px', marginTop: '10px' }}>
                    {[40, 65, 45, 80, 60, 75, 50].map((height, i) => (
                      <div key={i} style={{ flex: 1, height: `${height}%`, backgroundColor: '#e6f7ff', borderRadius: '4px 4px 0 0' }}></div>
                    ))}
                  </div>
                </div>
                
                {/* Tableau */}
                <div style={{
                  position: 'absolute',
                  top: '60px',
                  right: '10px',
                  width: '180px',
                  height: '140px',
                  background: 'white',
                  borderRadius: '6px',
                  boxShadow: '0 2px 5px rgba(0, 0, 0, 0.05)',
                  padding: '10px'
                }}>
                  <div style={{ width: '80px', height: '12px', borderRadius: '6px', backgroundColor: '#e6f7ff', marginBottom: '15px' }}></div>
                  {[1, 2, 3, 4].map((row) => (
                    <div key={row} style={{ display: 'flex', marginBottom: '10px' }}>
                      <div style={{ width: '30%', height: '10px', borderRadius: '5px', backgroundColor: '#e6f7ff', marginRight: '10px' }}></div>
                      <div style={{ width: '20%', height: '10px', borderRadius: '5px', backgroundColor: '#e6f7ff', marginRight: '10px' }}></div>
                      <div style={{ width: '40%', height: '10px', borderRadius: '5px', backgroundColor: '#e6f7ff' }}></div>
                    </div>
                  ))}
                </div>
                
                {/* Cartes en bas */}
                <div style={{
                  position: 'absolute',
                  bottom: '10px',
                  left: '10px',
                  right: '10px',
                  display: 'flex',
                  gap: '8px'
                }}>
                  {[1, 2].map((card) => (
                    <div key={card} style={{
                      flex: 1,
                      height: '120px',
                      background: 'white',
                      borderRadius: '6px',
                      boxShadow: '0 2px 5px rgba(0, 0, 0, 0.05)',
                      padding: '10px'
                    }}>
                      <div style={{ width: '60px', height: '12px', borderRadius: '6px', backgroundColor: '#e6f7ff', marginBottom: '15px' }}></div>
                      <div style={{ width: '100%', height: '80px', borderRadius: '6px', backgroundColor: '#e6f7ff', marginBottom: '10px' }}></div>
                      <div style={{ width: '80%', height: '10px', borderRadius: '5px', backgroundColor: '#e6f7ff' }}></div>
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
              
              {/* Les tuiles flottantes ont été retirées */}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero
