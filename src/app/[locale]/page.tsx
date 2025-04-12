"use client";

import { motion } from 'framer-motion';
import Hero from '@/features/home/components/hero';
import { ArrowRight, PieChart, DollarSign, ClipboardCheck, BarChart2, Clock, Users, TrendingUp, ChevronDown } from 'lucide-react';
import { useRef, useState, useEffect } from 'react';

export default function HomePage() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [hasBanner, setHasBanner] = useState(true);
  
  // Détecter la présence de la bannière
  useEffect(() => {
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
  
  const scrollToSection = () => {
    sectionRef.current?.scrollIntoView({ behavior: 'smooth' });
  };
  
  // Calculer l'offset en fonction de la présence de la bannière
  const offsetMargin = hasBanner ? -120 : -160; // -120px si bannière, -160px sinon (remonte quand pas de bannière)
  
  return (
    <main className="flex min-h-screen flex-col">
      {/* Hero section avec centrage ajusté pour la barre de navigation */}
      <div className="flex items-center justify-center w-full h-screen">
        {/* Ajout d'un div avec margin-top négative pour compenser la barre de navigation et la bannière si présente */}
        <div className="w-full" style={{ marginTop: `${offsetMargin}px` }}>
          <Hero />
        </div>
        
        {/* La flèche de défilement a été supprimée */}
      </div>
      
      {/* Conteneur pour les autres sections qui viendront après le hero */}
      <div ref={sectionRef}>
        {/* Section 1 */}
        <section className="py-16 md:py-24 bg-blue-100">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center"
            >
              <h2 className="text-2xl xs:text-3xl sm:text-4xl font-bold text-marine-800 mb-4 md:mb-6">Section 1</h2>
              <p className="text-base xs:text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto">
                Description temporaire de la section avec adaptation responsive pour les différents écrans.
              </p>
            </motion.div>
          </div>
        </section>
        
        {/* Section 2 */}
        <section className="py-16 md:py-24 bg-green-100">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center"
            >
              <h2 className="text-2xl xs:text-3xl sm:text-4xl font-bold text-marine-800 mb-4 md:mb-6">Section 2</h2>
              <p className="text-base xs:text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto">
                Description temporaire de la section avec adaptation responsive pour les différents écrans.
              </p>
            </motion.div>
          </div>
        </section>
        
        {/* Section 3 */}
        <section className="py-16 md:py-24 bg-amber-100">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center"
            >
              <h2 className="text-2xl xs:text-3xl sm:text-4xl font-bold text-marine-800 mb-4 md:mb-6">Section 3</h2>
              <p className="text-base xs:text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto">
                Description temporaire de la section avec adaptation responsive pour les différents écrans.
              </p>
            </motion.div>
          </div>
        </section>
        
        {/* Section 4 */}
        <section className="py-16 md:py-24 bg-purple-100">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center"
            >
              <h2 className="text-2xl xs:text-3xl sm:text-4xl font-bold text-marine-800 mb-4 md:mb-6">Section 4</h2>
              <p className="text-base xs:text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto">
                Description temporaire de la section avec adaptation responsive pour les différents écrans.
              </p>
            </motion.div>
          </div>
        </section>
      </div>
    </main>
  )
}
