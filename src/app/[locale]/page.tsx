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
        {/* Section "Ce que vous maîtrisez avec Octogone" */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl font-bold text-marine-800 mb-6">Ce que vous maîtrisez avec Octogone</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Des outils simples et efficaces pour optimiser chaque aspect de votre restaurant et maximiser votre rentabilité au quotidien.
              </p>
            </motion.div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {/* Carte 1: Coûts et Marges */}
              <motion.div 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow p-6 border border-gray-100"
              >
                <div className="w-14 h-14 bg-blue-100 rounded-lg flex items-center justify-center mb-5">
                  <PieChart className="w-7 h-7 text-blue-600" />
                </div>
                <h3 className="text-xl font-bold text-marine-800 mb-3">Coûts et Marges</h3>
                <p className="text-gray-600 mb-4">
                  Suivez précisément vos coûts alimentaires, de main-d'œuvre et vos marges en temps réel pour optimiser votre rentabilité.
                </p>
                <ul className="text-gray-600 space-y-2 mb-4">
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2">✓</span> Food cost par plat et catégorie
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2">✓</span> Analyse des marges par service
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2">✓</span> Alertes de dépassement de coûts
                  </li>
                </ul>
              </motion.div>
              
              {/* Carte 2: Inventaire */}
              <motion.div 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow p-6 border border-gray-100"
              >
                <div className="w-14 h-14 bg-amber-100 rounded-lg flex items-center justify-center mb-5">
                  <ClipboardCheck className="w-7 h-7 text-amber-600" />
                </div>
                <h3 className="text-xl font-bold text-marine-800 mb-3">Inventaire Simplifié</h3>
                <p className="text-gray-600 mb-4">
                  Gérez votre inventaire sans effort avec des outils intuitifs qui réduisent le gaspillage et optimisent vos commandes.
                </p>
                <ul className="text-gray-600 space-y-2 mb-4">
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2">✓</span> Suivi des stocks en temps réel
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2">✓</span> Commandes automatiques
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2">✓</span> Alertes de rupture de stock
                  </li>
                </ul>
              </motion.div>
              
              {/* Carte 3: Pourboires */}
              <motion.div 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow p-6 border border-gray-100"
              >
                <div className="w-14 h-14 bg-green-100 rounded-lg flex items-center justify-center mb-5">
                  <DollarSign className="w-7 h-7 text-green-600" />
                </div>
                <h3 className="text-xl font-bold text-marine-800 mb-3">Gestion des Pourboires</h3>
                <p className="text-gray-600 mb-4">
                  Répartissez équitablement les pourboires et suivez les performances de votre équipe pour une gestion transparente.
                </p>
                <ul className="text-gray-600 space-y-2 mb-4">
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2">✓</span> Répartition automatique
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2">✓</span> Historique des pourboires
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2">✓</span> Rapports de performance
                  </li>
                </ul>
              </motion.div>
              
              {/* Carte 4: Analyses */}
              <motion.div 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow p-6 border border-gray-100"
              >
                <div className="w-14 h-14 bg-purple-100 rounded-lg flex items-center justify-center mb-5">
                  <BarChart2 className="w-7 h-7 text-purple-600" />
                </div>
                <h3 className="text-xl font-bold text-marine-800 mb-3">Analyses Détaillées</h3>
                <p className="text-gray-600 mb-4">
                  Accédez à des rapports clairs et des tableaux de bord intuitifs pour prendre des décisions basées sur des données réelles.
                </p>
                <ul className="text-gray-600 space-y-2 mb-4">
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2">✓</span> Tableaux de bord personnalisables
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2">✓</span> Rapports automatiques
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2">✓</span> Prévisions de ventes
                  </li>
                </ul>
              </motion.div>
            </div>
            
            <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Avantage 1: Gain de temps */}
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="bg-marine-50 rounded-lg p-6 text-center"
              >
                <div className="w-12 h-12 bg-marine-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Clock className="w-6 h-6 text-marine-700" />
                </div>
                <h3 className="text-lg font-bold text-marine-800 mb-2">Gagnez du temps</h3>
                <p className="text-gray-600">
                  Automatisez les tâches administratives et concentrez-vous sur l'essentiel : vos clients et votre cuisine.
                </p>
              </motion.div>
              
              {/* Avantage 2: Simplicité */}
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="bg-marine-50 rounded-lg p-6 text-center"
              >
                <div className="w-12 h-12 bg-marine-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="w-6 h-6 text-marine-700" />
                </div>
                <h3 className="text-lg font-bold text-marine-800 mb-2">Simple pour tous</h3>
                <p className="text-gray-600">
                  Interface intuitive que tout votre personnel peut utiliser sans formation spécifique ou compétences techniques.
                </p>
              </motion.div>
              
              {/* Avantage 3: Rentabilité */}
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="bg-marine-50 rounded-lg p-6 text-center"
              >
                <div className="w-12 h-12 bg-marine-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <TrendingUp className="w-6 h-6 text-marine-700" />
                </div>
                <h3 className="text-lg font-bold text-marine-800 mb-2">Augmentez vos profits</h3>
                <p className="text-gray-600">
                  Optimisez chaque aspect de votre restaurant pour réduire les coûts et maximiser vos marges bénéficiaires.
                </p>
              </motion.div>
            </div>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="mt-16 text-center"
            >
              <a href="/contact" className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-marine-600 hover:bg-marine-700 transition-colors duration-200">
                Découvrir nos forfaits
                <ArrowRight className="ml-2 h-5 w-5" />
              </a>
              <p className="mt-4 text-sm text-gray-500">Démonstration gratuite disponible sur demande</p>
            </motion.div>
          </div>
        </section>
      </div>
    </main>
  )
}
