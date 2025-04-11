"use client"

import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
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
  
  // État pour le type de graphique et son titre
  const [graphIndex, setGraphIndex] = useState(0);
  
  // Définition des différents graphiques et leurs titres avec les types les plus adaptés
  const graphs = [
    { title: "Ventes", type: "bar" },            // Diagramme à barres pour comparer les ventes par jour
    { title: "Achats", type: "horizontal" },     // Barres horizontales pour comparer les catégories d'achats
    { title: "Food Cost", type: "pie" },         // Camembert pour visualiser la répartition des coûts alimentaires
    { title: "Labor Cost", type: "horizontal" },  // Barres horizontales pour comparer les coûts par département
    { title: "Frais Fixes", type: "pie" },        // Camembert pour montrer la composition des frais fixes
    { title: "Menu Engineering", type: "matrix" }, // Matrice spéciale pour le menu engineering (Étoiles, Vaches à Lait, etc.)
    { title: "Achalandage", type: "line" },      // Graphique en ligne pour montrer l'évolution dans le temps
    { title: "Facture Moyenne", type: "bar" },    // Diagramme à barres pour comparer par jour
    { title: "Transferts", type: "line" },        // Graphique en ligne pour montrer les tendances sur plusieurs mois
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
                  
                <AnimatePresence mode="wait">
                {/* Graphique de type barres verticales - Adapté pour Ventes, Facture Moyenne */}
                {graphs[graphIndex].type === "bar" && (
                  <motion.div 
                    key="bar-chart"
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
                
                {/* Graphique de type camembert - Adapté pour Food Cost, Frais Fixes */}
                {graphs[graphIndex].type === "pie" && (
                  <motion.div 
                    key="pie-chart"
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
                        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)'
                      }}
                    >
                      <motion.div 
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ duration: 0.5, delay: 0.5 }}
                        style={{ 
                          position: 'absolute',
                          top: '50%',
                          left: '50%',
                          transform: 'translate(-50%, -50%)',
                          width: '60px',
                          height: '60px',
                          borderRadius: '50%',
                          background: 'linear-gradient(135deg, #003049 0%, #00456A 100%)',
                        }}
                      ></motion.div>
                    </motion.div>
                  </motion.div>
                )}
                
                {/* Graphique de type barres horizontales - Adapté pour Achats, Labor Cost */}
                {graphs[graphIndex].type === "horizontal" && (
                  <motion.div 
                    key="horizontal-chart"
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
                
                {/* Graphique de type ligne - Adapté pour Achalandage, Transferts */}
                {graphs[graphIndex].type === "line" && (
                  <motion.div 
                    key="line-chart"
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
                      {[0, 40, 80, 120, 160, 200, 240].map((x, i) => (
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
                    </svg>
                  </motion.div>
                )}
                
                {/* Graphique de type matrice - Spécifique pour Menu Engineering */}
                {graphs[graphIndex].type === "matrix" && (
                  <motion.div 
                    key="matrix-chart"
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
                        <div style={{ fontSize: '14px', fontWeight: 'bold' }}>Vaches à Lait</div>
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
                  
                  {/* Food Cost */}
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
                  
                  {/* Labor Cost */}
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
                  
                  {/* Menu Engineering */}
                  {graphIndex === 5 && ['Étoiles', 'Vaches à Lait', 'Énigmes', 'Poids Morts', '', '', ''].map((category, i) => (
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
