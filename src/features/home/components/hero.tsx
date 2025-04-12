"use client"

import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { LogoMarquee } from '@/components/ui/logo-marquee'

// Définition du type pour les logos des clients
interface ClientLogo {
  id: number
  name: string
  logo: string
  alt: string
}

// Exemples de logos clients
const clientLogos: ClientLogo[] = [
  { id: 1, name: "Restaurant A", logo: "/images/clients/client1.svg", alt: "Logo Restaurant A" },
  { id: 2, name: "Restaurant B", logo: "/images/clients/client2.svg", alt: "Logo Restaurant B" },
  { id: 3, name: "Restaurant C", logo: "/images/clients/client3.svg", alt: "Logo Restaurant C" },
  { id: 4, name: "Restaurant D", logo: "/images/clients/client4.svg", alt: "Logo Restaurant D" },
  { id: 5, name: "Restaurant E", logo: "/images/clients/client5.svg", alt: "Logo Restaurant E" },
  { id: 6, name: "Restaurant F", logo: "/images/clients/client6.svg", alt: "Logo Restaurant F" },
  { id: 7, name: "Restaurant G", logo: "/images/clients/client7.svg", alt: "Logo Restaurant G" },
  { id: 8, name: "Restaurant H", logo: "/images/clients/client8.svg", alt: "Logo Restaurant H" },
]

// Constantes pour les hauteurs (en pixels)
const BANNER_HEIGHT = 40; // --banner-height dans globals.css
const NAVBAR_HEIGHT = 80; // h-20 dans le composant Navigation

const Hero = () => {
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
  
  // État pour le type de graphique et son titre
  const [graphIndex, setGraphIndex] = useState(0);
  
  // Définition des différents graphiques et leurs titres avec les types les plus adaptés
  const graphs = [
    { title: "Ventes", type: "bar" },            // Diagramme à barres pour comparer les ventes par jour
    { title: "Achats", type: "horizontal" },     // Barres horizontales pour comparer les catégories d'achats
    { title: "Coûts Alimentaires", type: "pie" },  // Camembert pour visualiser la répartition des coûts alimentaires
    { title: "Coûts de Main-d'Œuvre", type: "horizontal" },  // Barres horizontales pour comparer les coûts par département
    { title: "Frais Fixes", type: "pie" },        // Camembert pour montrer la composition des frais fixes
    { title: "Ingénierie des Menus", type: "matrix" }, // Matrice spéciale pour l'ingénierie des menus (Étoiles, Produits Populaires, etc.)
    { title: "Achalandage", type: "line" },      // Graphique en ligne pour montrer l'évolution dans le temps
    { title: "Facture Moyenne", type: "bar" },    // Diagramme à barres pour comparer par jour
    { title: "Transferts", type: "line" },        // Graphique en ligne pour montrer les tendances sur plusieurs mois
    { title: "Surveillance des Prix", type: "line" }, // Graphique en ligne pour suivre les hausses et baisses de prix des produits
  ];
  
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
  
  // Effet pour mettre à jour les hauteurs des barres et changer le type de graphique toutes les 5 secondes
  useEffect(() => {
    const updateDashboard = () => {
      // Mettre à jour les hauteurs des barres
      setBarHeights({
        bar1: 55 + Math.floor(Math.random() * 15),
        bar2: 70 + Math.floor(Math.random() * 10),
        bar3: 42 + Math.floor(Math.random() * 8),
        bar4: 82 + Math.floor(Math.random() * 8),
        bar5: 62 + Math.floor(Math.random() * 10),
        bar6: 67 + Math.floor(Math.random() * 8),
        bar7: 52 + Math.floor(Math.random() * 8)
      });
      
      // Changer le type de graphique
      setGraphIndex((prevIndex) => (prevIndex + 1) % graphs.length);
    };
    
    // Mettre à jour immédiatement pour éviter le délai initial
    updateDashboard();
    
    // Configurer l'intervalle pour les mises à jour périodiques
    const interval = setInterval(updateDashboard, 5000);
    
    // Nettoyage à la démontage du composant
    return () => clearInterval(interval);
  }, []);
  
  // Calcul de la hauteur totale à soustraire
  const totalOffset = hasBanner ? NAVBAR_HEIGHT + BANNER_HEIGHT : NAVBAR_HEIGHT;
  
  // Utilisation du composant LogoMarquee réutilisable pour le carrousel de logos
  
  return (
    <section className="w-full h-full flex flex-col justify-between bg-white overflow-hidden py-4 md:py-8">
      {/* Fond décoratif */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-marine-50 rounded-bl-[100px] opacity-70" />
        <div className="absolute bottom-0 left-0 w-1/4 h-1/4 bg-gold-100 rounded-tr-[70px] opacity-60" />
      </div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 gap-4 md:gap-12 lg:grid-cols-2 lg:gap-16 items-center">
          {/* Image avec fond bleu clair et éléments flottants - En haut sur mobile */}
          <div className="flex justify-center items-center h-full mt-0 mb-2 md:mb-8 order-first lg:order-last">
            <div className="relative w-full max-w-[320px] md:max-w-[450px] lg:max-w-[550px] xl:max-w-[650px] h-[280px] md:h-[450px] lg:h-[550px] xl:h-[650px] flex justify-center items-center">
              {/* Octogone bleu de fond */}
              <div className="absolute w-[260px] md:w-[420px] lg:w-[520px] xl:w-[600px] h-[260px] md:h-[420px] lg:h-[520px] xl:h-[600px] bg-[#dbeafe]" style={{
                clipPath: 'polygon(30% 0%, 70% 0%, 100% 30%, 100% 70%, 70% 100%, 30% 100%, 0% 70%, 0% 30%)',
                zIndex: 2
              }}></div>
              {/* Version simplifiée du dashboard pour mobile uniquement */}
              <div
                className="absolute z-[3] overflow-hidden rounded-lg shadow-md block md:hidden w-[180px] h-[180px]"
                style={{
                  background: 'linear-gradient(135deg, #003049 0%, #00456A 100%)',
                  padding: '10px',
                  left: '50%',
                  top: '50%',
                  transform: 'translate(-50%, -50%)',
                }}>
                {/* Titre simplifié */}
                <div style={{ 
                  color: 'white',
                  fontSize: '14px', 
                  fontWeight: 'normal',
                  marginBottom: '15px',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  height: '16px'
                }}>
                  <span style={{ color: 'white', fontWeight: '400' }}>Dashboard</span>
                  <div style={{ display: 'flex', gap: '6px' }}>
                    <div style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#3b82f6' }}></div>
                    <div style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#10b981' }}></div>
                  </div>
                </div>
                
                {/* Contenu simplifié - barres statiques */}
                <div style={{ 
                  display: 'flex',
                  alignItems: 'flex-end',
                  justifyContent: 'space-between',
                  height: '130px',
                  padding: '0 5px'
                }}>
                  <div style={{ width: '18px', height: '60%', background: 'linear-gradient(to top, #3b82f6, #60a5fa)', borderRadius: '3px 3px 0 0' }}></div>
                  <div style={{ width: '18px', height: '75%', background: 'linear-gradient(to top, #10b981, #34d399)', borderRadius: '3px 3px 0 0' }}></div>
                  <div style={{ width: '18px', height: '45%', background: 'linear-gradient(to top, #f59e0b, #fbbf24)', borderRadius: '3px 3px 0 0' }}></div>
                  <div style={{ width: '18px', height: '85%', background: 'linear-gradient(to top, #3b82f6, #60a5fa)', borderRadius: '3px 3px 0 0' }}></div>
                  <div style={{ width: '18px', height: '65%', background: 'linear-gradient(to top, #10b981, #34d399)', borderRadius: '3px 3px 0 0' }}></div>
                </div>
              </div>
              
              {/* Dashboard avec barres verticales animées en arrière-plan - version complète pour tablette/desktop */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="absolute z-[3] overflow-hidden rounded-xl shadow-lg hidden md:block md:w-[280px] md:h-[280px] lg:w-[320px] lg:h-[320px]"
                style={{
                  background: 'linear-gradient(135deg, #003049 0%, #00456A 100%)', /* Couleur Marine du thème */
                  padding: '15px',
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
                  <span style={{ color: 'white', fontWeight: '400' }}>{graphs[graphIndex].title}</span>
                  <div style={{ display: 'flex', gap: '8px' }}>
                    <div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#3b82f6' }}></div>
                    <div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#10b981' }}></div>
                    <div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#f59e0b' }}></div>
                  </div>
                </div>
                
                {/* Conteneur du graphique avec AnimatePresence pour les transitions */}
                <div style={{ 
                  height: '200px',
                  padding: '0 10px',
                  position: 'relative',
                  minHeight: '200px', /* Hauteur minimale fixe */
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  overflow: 'hidden' /* Pour masquer les éléments pendant la transition */
                }}>
                  
                <AnimatePresence mode="wait" initial={false}>
                {/* Graphique de type barres verticales - Adapté pour Ventes, Facture Moyenne */}
                {graphs[graphIndex].type === "bar" && (
                  <motion.div 
                    key={`bar-chart-${graphIndex}`}
                    initial={{ opacity: 0, x: 100 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -100 }}
                    transition={{ duration: 0.5 }}
                    style={{ 
                      display: 'flex', 
                      alignItems: 'flex-end', 
                      justifyContent: 'space-between',
                      height: '200px',
                      width: '100%'
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
                  </motion.div>
                )}
                
                {/* Graphique de type camembert - Adapté pour Coûts Alimentaires, Frais Fixes */}
                {graphs[graphIndex].type === "pie" && (
                  <motion.div 
                    key={`pie-chart-${graphIndex}`}
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -50 }}
                    transition={{ duration: 0.5 }}
                    style={{ 
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                      height: '200px',
                      width: '100%'
                    }}>
                    <div style={{ 
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                      position: 'relative',
                      width: '100%',
                      height: '100%'
                    }}>
                      <motion.div 
                        initial={{ scale: 0, rotate: -90 }}
                        animate={{ scale: 1, rotate: 0 }}
                        transition={{ duration: 1, ease: "easeOut" }}
                        style={{ 
                          position: 'relative',
                          width: '180px',
                          height: '180px',
                          borderRadius: '50%',
                          background: 'conic-gradient(#3b82f6 0% 15%, #10b981 15% 40%, #f59e0b 40% 55%, #8b5cf6 55% 80%, #ef4444 80% 100%)',
                          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
                          display: 'flex',
                          justifyContent: 'center',
                          alignItems: 'center'
                        }}
                      >
                        <motion.div 
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ duration: 0.5, delay: 0.5 }}
                          style={{ 
                            width: '60px',
                            height: '60px',
                            borderRadius: '50%',
                            background: 'linear-gradient(135deg, #003049 0%, #00456A 100%)',
                            boxShadow: 'inset 0 2px 4px rgba(0, 0, 0, 0.2)'
                          }}
                        ></motion.div>
                      </motion.div>
                    </div>
                  </motion.div>
                )}
                
                {/* Graphique de type barres horizontales - Adapté pour Achats, Coûts de Main-d'Œuvre */}
                {graphs[graphIndex].type === "horizontal" && (
                  <motion.div 
                    key={`horizontal-chart-${graphIndex}`}
                    initial={{ opacity: 0, x: -100 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 100 }}
                    transition={{ duration: 0.5 }}
                    style={{ 
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'space-between',
                      height: '200px',
                      width: '100%'
                    }}>
                    {[1, 2, 3, 4, 5].map((_, i) => (
                      <div key={i} style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
                        <motion.div 
                          initial={{ width: 0, opacity: 0 }}
                          animate={{ 
                            width: `${30 + Math.floor(Math.random() * 50)}%`, 
                            opacity: 1 
                          }}
                          transition={{ 
                            duration: 1.2, 
                            delay: i * 0.15,
                            ease: "easeOut" 
                          }}
                          style={{ 
                            height: '20px',
                            background: i === 0 ? 'linear-gradient(to right, #3b82f6, #60a5fa)' :
                                       i === 1 ? 'linear-gradient(to right, #10b981, #34d399)' :
                                       i === 2 ? 'linear-gradient(to right, #f59e0b, #fbbf24)' :
                                       i === 3 ? 'linear-gradient(to right, #8b5cf6, #a78bfa)' :
                                                'linear-gradient(to right, #ef4444, #f87171)',
                            borderRadius: '4px',
                          }}
                        ></motion.div>
                      </div>
                    ))}
                  </motion.div>
                )}
                
                {/* Graphique de type ligne - Adapté pour Achalandage, Transferts, Surveillance des Prix */}
                {graphs[graphIndex].type === "line" && (
                  <motion.div 
                    key={`line-chart-${graphIndex}`}
                    initial={{ opacity: 0, y: -50 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 50 }}
                    transition={{ duration: 0.5 }}
                    style={{ 
                      position: 'relative',
                      height: '200px',
                      width: '100%'
                    }}>
                    <svg width="100%" height="180" viewBox="0 0 280 180" style={{ overflow: 'visible' }}>
                      <motion.path 
                        initial={{ pathLength: 0, opacity: 0 }}
                        animate={{ pathLength: 1, opacity: 1 }}
                        transition={{ duration: 1.5, ease: "easeInOut" }}
                        d="M0,150 C20,100 40,120 70,80 C100,40 130,90 160,60 C190,30 220,70 250,50 C280,30 300,60 320,40" 
                        fill="none" 
                        stroke="#3b82f6" 
                        strokeWidth="3"
                        strokeLinecap="round"
                      />
                      <motion.path 
                        initial={{ pathLength: 0, opacity: 0 }}
                        animate={{ pathLength: 1, opacity: 1 }}
                        transition={{ duration: 1.5, delay: 0.3, ease: "easeInOut" }}
                        d="M0,170 C30,150 60,160 90,140 C120,120 150,130 180,110 C210,90 240,100 270,80 C300,60 330,70 360,50" 
                        fill="none" 
                        stroke="#10b981" 
                        strokeWidth="3"
                        strokeLinecap="round"
                      />
                      
                      {/* Ligne spécifique pour Surveillance des Prix */}
                      {graphIndex === 9 && (
                        <motion.path 
                          initial={{ pathLength: 0, opacity: 0 }}
                          animate={{ pathLength: 1, opacity: 1 }}
                          transition={{ duration: 1.5, delay: 0.6, ease: "easeInOut" }}
                          d="M0,120 C30,140 60,110 90,130 C120,150 150,90 180,70 C210,50 240,90 270,110 C300,130 330,100 360,80" 
                          fill="none" 
                          stroke="#f59e0b" 
                          strokeWidth="3"
                          strokeDasharray="5,5"
                          strokeLinecap="round"
                        />
                      )}
                      {/* Points pour tous les graphiques en ligne sauf Surveillance des Prix */}
                      {graphIndex !== 9 && [0, 40, 80, 120, 160, 200, 240].map((x, i) => (
                        <motion.circle 
                          key={i}
                          initial={{ scale: 0, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          transition={{ 
                            duration: 0.5, 
                            delay: 1.5 + (i * 0.1),
                            ease: "backOut" 
                          }}
                          cx={x}
                          cy={80 + Math.floor(Math.random() * 40)}
                          r="4"
                          fill="#f59e0b"
                        />
                      ))}
                      
                      {/* Points spécifiques pour Surveillance des Prix avec flèches directionnelles */}
                      {graphIndex === 9 && [0, 40, 80, 120, 160, 200, 240].map((x, i) => {
                        const yPos = [120, 140, 110, 130, 70, 90, 110][i];
                        const isUp = [false, true, false, true, false, true, true][i];
                        const colors = ["#ef4444", "#10b981", "#ef4444", "#10b981", "#ef4444", "#10b981", "#10b981"];
                        
                        return (
                          <g key={i}>
                            <motion.circle 
                              initial={{ scale: 0, opacity: 0 }}
                              animate={{ scale: 1, opacity: 1 }}
                              transition={{ 
                                duration: 0.5, 
                                delay: 1.5 + (i * 0.1),
                                ease: "backOut" 
                              }}
                              cx={x}
                              cy={yPos}
                              r="5"
                              fill={colors[i]}
                            />
                            <motion.text 
                              initial={{ opacity: 0, y: isUp ? 10 : -10 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ duration: 0.5, delay: 1.8 + i * 0.1 }}
                              x={x} 
                              y={yPos + (isUp ? -10 : 15)} 
                              fill={colors[i]}
                              fontSize="10"
                              fontWeight="bold"
                              textAnchor="middle"
                            >
                              {isUp ? "+" : "-"}{Math.floor(Math.random() * 8) + 1}%
                            </motion.text>
                          </g>
                        );
                      })}
                    </svg>
                  </motion.div>
                )}
                
                {/* Graphique de type matrice - Spécifique pour Ingénierie des Menus */}
                {graphs[graphIndex].type === "matrix" && (
                  <motion.div 
                    key={`matrix-chart-${graphIndex}`}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    transition={{ duration: 0.5 }}
                    style={{ 
                      position: 'relative',
                      height: '200px',
                      width: '100%',
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center'
                    }}
                  >
                    <div style={{
                      display: 'grid',
                      gridTemplateColumns: '1fr 1fr',
                      gridTemplateRows: '1fr 1fr',
                      gap: '8px',
                      width: '90%',
                      height: '90%'
                    }}>
                      {/* Stars - Haut à droite */}
                      <motion.div 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.3, duration: 0.5 }}
                        style={{
                          gridColumn: '2 / 3',
                          gridRow: '1 / 2',
                          background: 'linear-gradient(135deg, #3b82f6, #60a5fa)',
                          borderRadius: '6px',
                          padding: '8px',
                          display: 'flex',
                          flexDirection: 'column',
                          justifyContent: 'center',
                          alignItems: 'center',
                          color: 'white'
                        }}
                      >
                        <div style={{ fontSize: '14px', fontWeight: 'bold' }}>Étoiles</div>
                        <div style={{ fontSize: '11px', opacity: 0.8 }}>Popularité ↑ Marge ↑</div>
                      </motion.div>
                      
                      {/* Plow Horses - Haut à gauche */}
                      <motion.div 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.5, duration: 0.5 }}
                        style={{
                          gridColumn: '1 / 2',
                          gridRow: '1 / 2',
                          background: 'linear-gradient(135deg, #10b981, #34d399)',
                          borderRadius: '6px',
                          padding: '8px',
                          display: 'flex',
                          flexDirection: 'column',
                          justifyContent: 'center',
                          alignItems: 'center',
                          color: 'white'
                        }}
                      >
                        <div style={{ fontSize: '14px', fontWeight: 'bold' }}>Produits Populaires</div>
                        <div style={{ fontSize: '11px', opacity: 0.8 }}>Popularité ↑ Marge ↓</div>
                      </motion.div>
                      
                      {/* Puzzles - Bas à droite */}
                      <motion.div 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.7, duration: 0.5 }}
                        style={{
                          gridColumn: '2 / 3',
                          gridRow: '2 / 3',
                          background: 'linear-gradient(135deg, #f59e0b, #fbbf24)',
                          borderRadius: '6px',
                          padding: '8px',
                          display: 'flex',
                          flexDirection: 'column',
                          justifyContent: 'center',
                          alignItems: 'center',
                          color: 'white'
                        }}
                      >
                        <div style={{ fontSize: '14px', fontWeight: 'bold' }}>Énigmes</div>
                        <div style={{ fontSize: '11px', opacity: 0.8 }}>Popularité ↓ Marge ↑</div>
                      </motion.div>
                      
                      {/* Dogs - Bas à gauche */}
                      <motion.div 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.9, duration: 0.5 }}
                        style={{
                          gridColumn: '1 / 2',
                          gridRow: '2 / 3',
                          background: 'linear-gradient(135deg, #ef4444, #f87171)',
                          borderRadius: '6px',
                          padding: '8px',
                          display: 'flex',
                          flexDirection: 'column',
                          justifyContent: 'center',
                          alignItems: 'center',
                          color: 'white'
                        }}
                      >
                        <div style={{ fontSize: '14px', fontWeight: 'bold' }}>Poids Morts</div>
                        <div style={{ fontSize: '11px', opacity: 0.8 }}>Popularité ↓ Marge ↓</div>
                      </motion.div>
                    </div>
                  </motion.div>
                )}
                </AnimatePresence>
                </div>
                
                {/* Légende en bas */}
                <div style={{ 
                  display: 'flex', 
                  justifyContent: 'space-between',
                  marginTop: '15px',
                  padding: '0 10px'
                }}>
                  {/* Ventes */}
                  {graphIndex === 0 && ['L', 'M', 'M', 'J', 'V', 'S', 'D'].map((day, i) => (
                    <div key={i} style={{ 
                      color: 'rgba(255, 255, 255, 0.7)', 
                      fontSize: '12px', 
                      width: '30px',
                      textAlign: 'center'
                    }}>
                      {day}
                    </div>
                  ))}
                  
                  {/* Achats */}
                  {graphIndex === 1 && ['Viande', 'Poisson', 'Légumes', 'Fruits', 'Boissons', 'Autres', ''].map((item, i) => (
                    <div key={i} style={{ 
                      color: 'rgba(255, 255, 255, 0.7)', 
                      fontSize: '11px', 
                      width: '30px',
                      textAlign: 'center'
                    }}>
                      {item}
                    </div>
                  ))}
                  
                  {/* Coûts Alimentaires */}
                  {graphIndex === 2 && ['Entrées', 'Plats', 'Desserts', 'Boissons', 'Spéciaux', '', ''].map((category, i) => (
                    <div key={i} style={{ 
                      color: 'rgba(255, 255, 255, 0.7)', 
                      fontSize: '11px', 
                      width: '30px',
                      textAlign: 'center'
                    }}>
                      {category}
                    </div>
                  ))}
                  
                  {/* Coûts de Main-d'Œuvre */}
                  {graphIndex === 3 && ['Cuisine', 'Service', 'Bar', 'Gestion', 'Entretien', 'Autres', ''].map((staff, i) => (
                    <div key={i} style={{ 
                      color: 'rgba(255, 255, 255, 0.7)', 
                      fontSize: '11px', 
                      width: '30px',
                      textAlign: 'center'
                    }}>
                      {staff}
                    </div>
                  ))}
                  
                  {/* Frais Fixes */}
                  {graphIndex === 4 && ['Loyer', 'Assur.', 'Élec.', 'Eau', 'Taxes', 'Autres', ''].map((expense, i) => (
                    <div key={i} style={{ 
                      color: 'rgba(255, 255, 255, 0.7)', 
                      fontSize: '11px', 
                      width: '30px',
                      textAlign: 'center'
                    }}>
                      {expense}
                    </div>
                  ))}
                  
                  {/* Ingénierie des Menus */}
                  {graphIndex === 5 && ['Étoiles', 'Produits Populaires', 'Énigmes', 'Poids Morts', '', '', ''].map((category, i) => (
                    <div key={i} style={{ 
                      color: 'rgba(255, 255, 255, 0.7)', 
                      fontSize: '11px', 
                      width: '30px',
                      textAlign: 'center'
                    }}>
                      {category}
                    </div>
                  ))}
                  
                  {/* Achalandage */}
                  {graphIndex === 6 && ['11h', '13h', '15h', '17h', '19h', '21h', '23h'].map((hour, i) => (
                    <div key={i} style={{ 
                      color: 'rgba(255, 255, 255, 0.7)', 
                      fontSize: '12px', 
                      width: '30px',
                      textAlign: 'center'
                    }}>
                      {hour}
                    </div>
                  ))}
                  
                  {/* Facture Moyenne */}
                  {graphIndex === 7 && ['L', 'M', 'M', 'J', 'V', 'S', 'D'].map((day, i) => (
                    <div key={i} style={{ 
                      color: 'rgba(255, 255, 255, 0.7)', 
                      fontSize: '12px', 
                      width: '30px',
                      textAlign: 'center'
                    }}>
                      {day}
                    </div>
                  ))}
                  
                  {/* Transferts */}
                  {graphIndex === 8 && ['Jan', 'Fév', 'Mar', 'Avr', 'Mai', 'Juin', 'Juil'].map((month, i) => (
                    <div key={i} style={{ 
                      color: 'rgba(255, 255, 255, 0.7)', 
                      fontSize: '12px', 
                      width: '30px',
                      textAlign: 'center'
                    }}>
                      {month}
                    </div>
                  ))}
                  
                  {/* Surveillance des Prix */}
                  {graphIndex === 9 && ['Viandes', 'Poissons', 'Légumes', 'Fruits', 'Boissons', 'Huiles', 'Autres'].map((product, i) => (
                    <div key={i} style={{ 
                      color: 'rgba(255, 255, 255, 0.7)', 
                      fontSize: '11px', 
                      width: '30px',
                      textAlign: 'center'
                    }}>
                      {product}
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
                className="relative z-[5] w-[220px] h-[220px] md:w-[350px] md:h-[350px] lg:w-[420px] lg:h-[420px] xl:w-[500px] xl:h-[500px]"
                style={{ objectFit: 'contain' }}
              />
            </div>
          </div>
          
          {/* Contenu textuel - En bas sur mobile */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="flex flex-col gap-2 md:gap-4 lg:gap-6 text-center lg:text-left pt-0 order-last lg:order-first"
          >
            {/* Texte secteur */}
            <p className="text-base md:text-lg lg:text-xl mb-1 md:mb-2 text-center lg:text-left">
              Plateforme de gestion pour les restaurants
            </p>
            
            {/* Titre principal */}
            <h1 className="text-2xl md:text-4xl lg:text-5xl xl:text-6xl font-bold tracking-tight">
              L'ultime solution pour les professionnels de la <span className="text-gold-500">restauration</span>
            </h1>
            
            {/* Description */}
            <p className="mt-1 md:mt-2 text-sm md:text-base lg:text-lg xl:text-xl max-w-2xl mx-auto lg:mx-0">
              Optimisez la gestion quotidienne de vos restaurants, suivez vos métriques et améliorez vos performances.
            </p>
            
            {/* Boutons d'action */}
            <div className="mt-4 md:mt-6 flex flex-row gap-3 md:gap-4 justify-center lg:justify-start">
              <Button variant="primary" size="default" className="btn-gold text-sm md:text-base font-medium w-full sm:w-auto py-1.5 md:py-2">
                En savoir plus
                <ArrowRight className="ml-2 h-4 w-4 hidden md:inline" />
              </Button>
              
              <Link 
                href="/services" 
                className="inline-flex items-center justify-center rounded-md px-3 py-1.5 md:px-4 md:py-2 text-sm md:text-base font-medium text-marine-700 hover:text-marine-900 transition-colors w-full sm:w-auto"
              >
                Parler à un expert
                <ArrowRight className="ml-2 h-4 w-4 hidden md:inline" />
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
      
      {/* Carrousel de logos clients en bas du Hero */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 mt-auto pt-2 md:pt-8 pb-2 md:pb-4">
        <LogoMarquee logos={clientLogos} title="Partenaire de leur succès" titleClassName="text-sm md:text-lg" />
      </div>
    </section>
  )
}

export default Hero;
