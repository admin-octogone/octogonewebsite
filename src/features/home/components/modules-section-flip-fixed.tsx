"use client";

import React, { useState, useEffect, useCallback } from "react";
import { motion, useAnimation } from "framer-motion";
import { ResponsiveSection } from "@/components/ui/responsive-section";
import { useParams } from "next/navigation";
import { 
  ClipboardCheck, 
  Thermometer, 
  Package, 
  FileText, 
  ChefHat, 
  Users, 
  Link as LinkIcon,
  Percent,
  Clock,
  Database,
  Briefcase,
  Activity,
  Utensils,
  Calculator,
  Coins,
  Receipt,
  PackageOpen,
  Quote
} from "lucide-react";
import { AnimatedCounter } from "@/components/ui/animated-counter";
import FlipCard from "@/components/ui/flip-card";
import TestimonialCard from "@/components/ui/testimonial-card";
import { testimonials } from "@/data/testimonials";
// Définition des traductions pour les modules
const moduleTranslations = {
  fr: {
    discover: "Découvrir"
  },
  en: {
    discover: "Discover"
  }
};

/**
 * Composant ModulesSection - Section présentant les modules d'Octogone
 */
const ModulesSection = () => {
  // Récupérer la locale actuelle des paramètres d'URL
  const params = useParams();
  const locale = params ? (typeof params === 'object' && 'locale' in params ? params.locale as string : "fr") : "fr";
  
  // État pour suivre si les cartes sont retournées
  const [areAllCardsFlipped, setAreAllCardsFlipped] = useState(false);
  const [isClient, setIsClient] = useState(false);
  
  // Interface pour les témoignages
  interface Testimonial {
    name: string;
    role: string;
    quote: string;
    avatarImage?: string;
  }

  // Fonction pour obtenir un témoignage pour un module (déterministe)
  const getTestimonial = (moduleId: string): Testimonial => {
    // Vérifier si le module a des témoignages spécifiques
    const moduleTestimonials = testimonials[locale as 'fr' | 'en'][moduleId as keyof typeof testimonials.fr];
    
    if (moduleTestimonials && moduleTestimonials.length > 0) {
      // Utiliser l'index 0 pour le rendu côté serveur (déterministe)
      return moduleTestimonials[0] as Testimonial;
    }
    
    // Si le module n'a pas de témoignage spécifique, utiliser un témoignage par défaut
    // Nous utilisons les témoignages du module "catalog" comme fallback
    const defaultTestimonials = testimonials[locale as 'fr' | 'en']['catalog'];
    return defaultTestimonials[0] as Testimonial;
  };
  
  // Initialisation côté client uniquement
  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    // Marquer que nous sommes côté client
    setIsClient(true);
  }, []);
  
  // Définir les modules statiquement pour éviter les problèmes de dépendances circulaires
  const modulesList = [
    { id: 'inventory', name: 'Inventaire' },
    { id: 'haccp', name: 'HACCP' },
    { id: 'catalog', name: 'Catalogue' },
    { id: 'orders', name: 'Commandes' },
    { id: 'kitchen', name: 'Cuisine' },
    { id: 'staff', name: 'Personnel' },
    { id: 'reports', name: 'Rapports' },
    { id: 'pos', name: 'Point de vente' },
    { id: 'accounting', name: 'Comptabilité' }
  ];
  
  // Fonction pour basculer l'état de toutes les cartes
  const toggleAllCards = () => {
    setAreAllCardsFlipped(prev => !prev);
  };
  


  // Animation combinée pour les tuiles
  const tileVariants = {
    // État initial (invisible)
    hidden: { 
      opacity: 0, 
      y: 30,
      scale: 0.95
    },
    // Visible après l'animation d'entrée
    visible: { 
      opacity: 1, 
      y: 0,
      scale: 1,
      transition: { 
        opacity: { duration: 0.6, ease: "easeOut" },
        y: { duration: 0.6, ease: "easeOut" },
        scale: { duration: 0.6, ease: "easeOut" }
      }
    }
  };
  
  // Fonction pour générer un dégradé unique pour chaque module
  const getGradientForModule = (moduleId: string) => {
    // Palette de couleurs subtiles basées sur le thème gold
    const gradients = {
      inventory: 'linear-gradient(135deg, #FCF8F1 0%, #FDF6EA 25%, #FCF8F1 50%, #FEF9F2 75%, #FCF8F1 100%)',
      invoicing: 'linear-gradient(120deg, #FCF8F1 0%, #FEF9F2 30%, #FCF7EE 60%, #FCF8F1 100%)',
      recipes: 'linear-gradient(150deg, #FCF8F1 0%, #FDF7ED 40%, #FCF8F1 70%, #FEF9F2 100%)',
      pos: 'linear-gradient(165deg, #FCF8F1 0%, #FEF9F2 35%, #FCF7EE 65%, #FCF8F1 100%)',
      hr: 'linear-gradient(140deg, #FCF8F1 0%, #FDF6EA 20%, #FCF8F1 60%, #FEF9F2 100%)',
      catalog: 'linear-gradient(130deg, #FCF8F1 0%, #FEF9F2 25%, #FCF7EE 55%, #FCF8F1 100%)',
      production: 'linear-gradient(145deg, #FCF8F1 0%, #FDF6EA 30%, #FCF8F1 65%, #FEF9F2 100%)',
      thermometers: 'linear-gradient(155deg, #FCF8F1 0%, #FEF9F2 20%, #FCF7EE 50%, #FCF8F1 100%)',
      tips: 'linear-gradient(125deg, #FCF8F1 0%, #FDF6EA 35%, #FCF8F1 70%, #FEF9F2 100%)'
    };
    
    // Retourner le dégradé correspondant au module ou un dégradé par défaut
    return gradients[moduleId as keyof typeof gradients] || 'linear-gradient(135deg, #FCF8F1 0%, #FDF6EA 25%, #FCF8F1 50%, #FEF9F2 75%, #FCF8F1 100%)';
  };
  
  // Animation pour les icônes
  const iconVariants = {
    hidden: { scale: 0.8, opacity: 0 },
    visible: { 
      scale: 1, 
      opacity: 1,
      transition: { duration: 0.5, delay: 0.1 }
    },
    hover: { 
      scale: 1.1,
      transition: { duration: 0.2, ease: "easeOut" }
    }
  };

  // Liste des modules avec leurs descriptions, icônes et statistiques
  const modules = [
    {
      id: "catalog",
      title: locale === "fr" ? "Catalogue produits & recettes" : "Product & Recipe Catalog",
      description: locale === "fr" 
        ? "Gérez facilement vos produits et recettes dans un catalogue structuré, prêt à l'usage."
        : "Easily manage your products and recipes in a structured catalog, ready to use.",
      icon: <ClipboardCheck className="w-10 h-10 text-marine-600" strokeWidth={1.5} />,
      stat: {
        value: 3450,
        prefix: "",
        suffix: "+",
        statText: locale === "fr" ? "produits disponibles à l'ajout en un clic via notre base intelligente" : "products available to add with one click via our intelligent database",
        source: null
      }
    },
    {
      id: "inventory",
      title: locale === "fr" ? "Prise d'inventaire" : "Inventory Taking",
      description: locale === "fr" 
        ? "Effectuez vos inventaires rapidement et sans erreurs, même en multi-sites."
        : "Perform your inventories quickly and without errors, even across multiple sites.",
      icon: <Package className="w-10 h-10 text-marine-600" strokeWidth={1.5} />,
      stat: {
        value: 28,
        prefix: "",
        suffix: "%",
        negative: true,
        statText: locale === "fr" ? "de pertes en moyenne après 3 mois" : "average loss reduction after 3 months",
        source: null
      }
    },
    {
      id: "recipes",
      title: locale === "fr" ? "Recettes & food cost" : "Recipes & Food Cost",
      description: locale === "fr"
        ? "Créez des recettes standardisées avec calcul automatique des coûts."
        : "Create standardized recipes with automatic cost calculation.",
      icon: <Utensils className="w-10 h-10 text-marine-600" strokeWidth={1.5} />,
      stat: {
        value: 99,
        prefix: "",
        suffix: "%",
        statText: locale === "fr" ? "de recettes standardisées dès l'implantation" : "of recipes standardized from implementation",
        source: null
      }
    },
    {
      id: "realtime",
      title: locale === "fr" ? "Inventaire en temps réel" : "Real-time Inventory",
      description: locale === "fr"
        ? "Suivez vos sorties produits en direct, connectées à votre POS."
        : "Track your product outputs in real-time, connected to your POS.",
      icon: <PackageOpen className="w-10 h-10 text-marine-600" strokeWidth={1.5} />,
      stat: {
        value: 100,
        prefix: "",
        suffix: "%",
        statText: locale === "fr" ? "de synchronisation entre ventes, stocks et recettes" : "synchronization between sales, inventory and recipes",
        source: null
      }
    },
    {
      id: "invoices",
      title: locale === "fr" ? "Facturation automatisée" : "Automated Invoicing",
      description: locale === "fr"
        ? "Gérez vos factures fournisseurs sans saisie manuelle ni oubli."
        : "Manage your supplier invoices without manual entry or oversight.",
      icon: <Receipt className="w-10 h-10 text-marine-600" strokeWidth={1.5} />,
      stat: {
        value: 8,
        prefix: "",
        suffix: "h",
        statText: locale === "fr" ? "/ semaine de saisie éliminées grâce à l'automatisation" : "/ week of data entry eliminated thanks to automation",
        source: null
      }
    },
    {
      id: "tips",
      title: locale === "fr" ? "Gestion des pourboires" : "Tips Management",
      description: locale === "fr"
        ? "Automatisez la répartition selon vos règles, en toute transparence."
        : "Automate distribution according to your rules, with complete transparency.",
      icon: <Coins className="w-10 h-10 text-marine-600" strokeWidth={1.5} />,
      stat: {
        value: 0,
        prefix: "",
        suffix: "",
        statText: locale === "fr" ? "litige signalé depuis l'automatisation sur Octogone" : "disputes reported since automation on Octogone",
        source: null
      }
    },
    {
      id: "hr",
      title: locale === "fr" ? "Gestion des employés (RH)" : "Employee Management (HR)",
      description: locale === "fr"
        ? "Centralisez les rôles, accès et documents de vos équipes."
        : "Centralize roles, access and documents for your teams.",
      icon: <Users className="w-10 h-10 text-marine-600" strokeWidth={1.5} />,
      stat: {
        value: 50,
        prefix: "",
        suffix: "%",
        negative: true,
        statText: locale === "fr" ? "de temps consacré à la gestion RH" : "time spent on HR management",
        source: null
      }
    },
    {
      id: "thermometers",
      title: locale === "fr" ? "Thermomètres connectés" : "Connected Thermometers",
      description: locale === "fr"
        ? "Recevez des alertes automatiques en cas d'écarts de température."
        : "Receive automatic alerts in case of temperature deviations.",
      icon: <Thermometer className="w-10 h-10 text-marine-600" strokeWidth={1.5} />,
      stat: {
        value: 90,
        prefix: "",
        suffix: "%",
        statText: locale === "fr" ? "de pertes évitées liées aux variations de température" : "of losses avoided related to temperature variations",
        source: null
      }
    },
    {
      id: "production",
      title: locale === "fr" ? "Module de production cuisine" : "Kitchen Production Module",
      description: locale === "fr"
        ? "Planifiez et gérez la production interne en toute fluidité."
        : "Plan and manage internal production smoothly.",
      icon: <ChefHat className="w-10 h-10 text-marine-600" strokeWidth={1.5} />,
      stat: {
        value: 2,
        prefix: "x",
        suffix: "",
        statText: locale === "fr" ? "plus rapide pour transmettre les consignes et planifications en cuisine" : "faster to transmit instructions and planning in the kitchen",
        source: null
      }
    }
  ];

  return (
    <ResponsiveSection 
      bgColor="bg-marine-50" 
      spacing="xxxl"
      className="overflow-visible"
    >
      <div className="flex flex-col items-center">
        {/* En-tête de la section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 md:mb-16"
        >
          {/* Espace au-dessus du titre */}
          <div className="mb-2"></div>
          
          {/* Titre principal */}
          <h2 className="text-xl xs:text-2xl md:text-3xl lg:text-4xl font-bold tracking-tight text-marine-900 mb-6">
            {locale === "fr" ? "Tout ce que vous devez gérer, au même endroit." : "Everything you need to manage, in one place."}
          </h2>
          
          {/* Paragraphe d'introduction */}
          <div className="max-w-3xl mx-auto">
            <p className="text-sm xs:text-base md:text-lg text-marine-700 mb-6">
              {locale === "fr" 
                ? "Octogone vous donne les bons outils pour reprendre le contrôle de vos opérations sans complexité inutile. Chaque module est pensé pour vous aider à mieux suivre vos produits, vos coûts, vos équipes et vos résultats. Peu importe la taille de votre réseau, tout est fluide, centralisé et connecté."
                : "Octogone gives you the right tools to regain control of your operations without unnecessary complexity. Each module is designed to help you better track your products, costs, teams, and results. Regardless of the size of your network, everything is fluid, centralized, and connected."}
            </p>
            
            {/* Toggle professionnel pour basculer entre statistiques et témoignages */}
            <div className="inline-flex rounded-md bg-gray-100 p-1 mt-2">
              <button
                type="button"
                onClick={() => setAreAllCardsFlipped(false)}
                className={`relative px-4 py-2 text-sm font-medium transition-all duration-300 ease-in-out rounded-md cursor-pointer ${!areAllCardsFlipped ? 'bg-blue-100 text-marine-900 shadow-md' : 'text-marine-600 hover:bg-gray-200'}`}
              >
                <span className="relative z-10 flex items-center">
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                  {locale === "fr" ? "Statistiques" : "Statistics"}
                </span>
              </button>
              <button
                type="button"
                onClick={() => setAreAllCardsFlipped(true)}
                className={`relative px-4 py-2 text-sm font-medium transition-all duration-300 ease-in-out rounded-md cursor-pointer ${areAllCardsFlipped ? 'bg-blue-100 text-marine-900 shadow-md' : 'text-marine-600 hover:bg-gray-200'}`}
              >
                <span className="relative z-10 flex items-center">
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                  </svg>
                  {locale === "fr" ? "Témoignages" : "Testimonials"}
                </span>
              </button>
            </div>
          </div>
        </motion.div>
        
        {/* Grille des modules */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10 w-full">
          {modules.map((module, index) => (
            <div key={module.id} className="w-full">
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-50px" }}
                variants={{
                  visible: {
                    transition: {
                      staggerChildren: 0.05,
                      delayChildren: index * 0.1
                    }
                  }
                }}
                className="h-full"
              >
                <motion.div
                  variants={tileVariants}
                  className="relative h-full p-6 bg-white rounded-lg border border-gray-100 group overflow-hidden"
                  style={{ 
                    background: getGradientForModule(module.id),
                    height: '330px' // Hauteur fixe pour toutes les cartes
                  }}
                >
                  {/* Overlay au survol avec texte "En savoir plus" */}
                  <div className="absolute inset-0 bg-blue-100/95 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10 cursor-pointer">
                    <div className="text-marine-900 text-center flex flex-col items-center">
                      <span className="text-lg font-medium">
                        {locale === "fr" ? "En savoir plus" : "Learn more"}
                      </span>
                      <div className="mt-3 flex justify-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-marine-900" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                        </svg>
                      </div>
                    </div>
                  </div>
                  {/* Éléments décoratifs en arrière-plan */}
                  <div className="absolute inset-0 overflow-hidden pointer-events-none" style={{ zIndex: 0 }}>
                    {/* Ligne décorative en haut */}
                    <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-gold-300/0 via-gold-400/40 to-gold-300/0"></div>
                    
                    {/* Dégradé subtil dans le coin supérieur gauche */}
                    <div className="absolute top-0 left-0 w-40 h-40 rounded-full opacity-10" 
                         style={{
                           background: `radial-gradient(circle, rgba(220, 178, 107, ${0.15 + (index % 3) * 0.05}) 0%, rgba(220, 178, 107, ${0.05 + (index % 3) * 0.02}) 50%, rgba(0, 0, 0, 0) 70%)`,
                           transform: `translate(-${25 + (index % 5) * 2}%, -${25 + (index % 5) * 2}%)`
                         }}>
                    </div>
                    
                    {/* Dégradé subtil dans le coin inférieur droit */}
                    <div className="absolute bottom-0 right-0 w-32 h-32 rounded-full opacity-5" 
                         style={{
                           background: `radial-gradient(circle, rgba(220, 178, 107, ${0.12 + (index % 4) * 0.03}) 0%, rgba(220, 178, 107, ${0.04 + (index % 4) * 0.01}) 50%, rgba(0, 0, 0, 0) 70%)`,
                           transform: `translate(${15 + (index % 6) * 2}%, ${15 + (index % 6) * 2}%)`
                         }}>
                    </div>
                  </div>
                  
                  {/* Structure avec titre fixe et contenu flippable */}
                  <div className="h-full flex flex-col">
                    {/* En-tête avec icône et titre - TOUJOURS VISIBLE */}
                    <div className="flex items-center mb-5">
                      <div className="mr-4 text-marine-600">
                        {module.icon}
                      </div>
                      <h3 className="text-xl font-bold text-marine-900">{module.title}</h3>
                    </div>
                    
                    {/* Description - TOUJOURS VISIBLE avec hauteur fixe */}
                    <p className="text-base text-marine-800 leading-relaxed h-[70px] overflow-hidden" style={{ textShadow: '0 0 1px rgba(255, 255, 255, 0.5)' }}>{module.description}</p>
                    
                    {/* Séparateur avec espacement équilibré */}
                    <div className="border-t border-gold-300/60 mt-2 mb-4"></div>
                    
                    {/* Partie flippable - contient les stats ou le témoignage */}
                    <div className="flex-grow">
                      {isClient ? (
                        <FlipCard
                          isFlipped={areAllCardsFlipped}
                          className="h-[100px]"
                          front={
                            <div className="h-full w-full">
                              {/* Statistiques animées */}
                              <div className="h-full">
                                {module.stat ? (
                                  <>
                                    <div className="flex items-baseline">
                                      <AnimatedCounter
                                        key={`counter-${module.id}-${areAllCardsFlipped ? 'flipped' : 'not-flipped'}`}
                                        from={0}
                                        to={module.stat.value}
                                        suffix={module.stat.suffix}
                                        delay={index * 0.1}
                                        negative={module.stat.negative}
                                        className="text-2xl font-bold text-gold-600 mr-2"
                                      />
                                      {module.stat.prefix && <span className="text-base text-marine-800 font-medium">{module.stat.prefix}</span>}
                                    </div>
                                    <p className="text-sm text-gold-600 mt-2 line-clamp-2 font-normal" style={{ textShadow: '0 0 1px rgba(255, 255, 255, 0.5)' }}>{module.stat.statText}</p>
                                    {module.stat.source && (
                                      <p className="text-xs text-marine-600 italic mt-1 line-clamp-1" style={{ textShadow: '0 0 1px rgba(255, 255, 255, 0.5)' }}>{module.stat.source}</p>
                                    )}
                                  </>
                                ) : (
                                  <div className="flex items-center justify-center h-full opacity-40">
                                    <p className="text-xs text-marine-500 italic">{moduleTranslations[locale as 'fr' | 'en'].discover}</p>
                                  </div>
                                )}
                              </div>
                            </div>
                          }
                          back={
                            <div className="h-full w-full">
                              <TestimonialCard
                                name={getTestimonial(module.id).name}
                                role={getTestimonial(module.id).role}
                                quote={getTestimonial(module.id).quote}
                                className="h-full"
                                avatarIndex={index} // Utiliser l'index du module pour l'avatar
                                avatarImage={getTestimonial(module.id).avatarImage} // Passer l'image d'avatar
                                isFlipped={areAllCardsFlipped} // Passer l'état flipped
                              />
                            </div>
                          }
                        />
                      ) : (
                        // Version statique pour le SSR
                        <div className="h-[100px]">
                          {module.stat ? (
                            <>
                              <div className="flex items-baseline">
                                <span className="text-2xl font-bold text-gold-600 mr-2">{module.stat.value}{module.stat.suffix}</span>
                                {module.stat.prefix && <span className="text-base text-marine-800 font-medium">{module.stat.prefix}</span>}
                              </div>
                              <p className="text-sm text-gold-600 mt-2 line-clamp-2 font-normal">{module.stat.statText}</p>
                              {module.stat.source && (
                                <p className="text-xs text-marine-600 italic mt-1 line-clamp-1">{module.stat.source}</p>
                              )}
                            </>
                          ) : (
                            <div className="flex items-center justify-center h-full opacity-40">
                              <p className="text-xs text-marine-500 italic">Statistiques bientôt disponibles</p>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                  
                  {/* Décoration de coin */}
                  <div className="absolute bottom-0 right-0 w-12 h-12 opacity-5">
                    <div className="absolute bottom-0 right-0 w-full h-full bg-gold-500 rounded-tl-3xl"></div>
                  </div>
                </motion.div>
              </motion.div>
            </div>
          ))}
        </div>
        
        {/* Accroche finale */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-12 md:mt-16 text-center"
        >
          <p className="text-base xs:text-lg md:text-xl font-medium text-marine-900 max-w-3xl mx-auto">
            {locale === "fr" 
              ? "Des opérations structurées, des équipes alignées, une plateforme unique pour tout gérer."
              : "Structured operations, aligned teams, a unique platform to manage everything."}
          </p>
        </motion.div>
      </div>
    </ResponsiveSection>
  );
};

export default ModulesSection;
