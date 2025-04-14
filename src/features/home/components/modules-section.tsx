"use client";

import React from "react";
import { motion } from "framer-motion";
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
  ArrowRight
} from "lucide-react";
import { AnimatedCounter } from "@/components/ui/animated-counter";

/**
 * Composant ModulesSection - Section présentant les modules d'Octogone
 */
const ModulesSection = () => {
  // Récupérer la locale actuelle des paramètres d'URL
  const params = useParams();
  const locale = params ? (typeof params === 'object' && 'locale' in params ? params.locale as string : "fr") : "fr";
  
  // État pour suivre quelle tuile est survolée
  const [hoveredTile, setHoveredTile] = React.useState<string | null>(null);

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
      icon: <ClipboardCheck className="w-8 h-8 text-marine-600" strokeWidth={1.5} />,
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
      icon: <Package className="w-8 h-8 text-marine-600" strokeWidth={1.5} />,
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
      icon: <Utensils className="w-8 h-8 text-marine-600" strokeWidth={1.5} />,
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
      icon: <PackageOpen className="w-8 h-8 text-marine-600" strokeWidth={1.5} />,
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
      icon: <Receipt className="w-8 h-8 text-marine-600" strokeWidth={1.5} />,
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
      icon: <Coins className="w-8 h-8 text-marine-600" strokeWidth={1.5} />,
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
      icon: <Users className="w-8 h-8 text-marine-600" strokeWidth={1.5} />,
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
      icon: <Thermometer className="w-8 h-8 text-marine-600" strokeWidth={1.5} />,
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
      icon: <ChefHat className="w-8 h-8 text-marine-600" strokeWidth={1.5} />,
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
            <p className="text-sm xs:text-base md:text-lg text-marine-700">
              {locale === "fr" 
                ? "Octogone vous donne les bons outils pour reprendre le contrôle de vos opérations sans complexité inutile. Chaque module est pensé pour vous aider à mieux suivre vos produits, vos coûts, vos équipes et vos résultats. Peu importe la taille de votre réseau, tout est fluide, centralisé et connecté."
                : "Octogone gives you the right tools to regain control of your operations without unnecessary complexity. Each module is designed to help you better track your products, costs, teams, and results. Regardless of the size of your network, everything is fluid, centralized, and connected."}
            </p>
          </div>
        </motion.div>
        
        {/* Grille des modules */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10 w-full">
          {modules.map((module, index) => (
            <motion.div
              key={module.id}
              className="rounded-xl overflow-hidden"
            >
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-50px" }}

                variants={tileVariants}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="h-full p-8 flex flex-col relative cursor-pointer"
                onMouseEnter={() => setHoveredTile(module.id)}
                onMouseLeave={() => setHoveredTile(null)}
                style={{
                  background: getGradientForModule(module.id)
                }}
              >
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
                
                {/* En-tête avec icône et titre */}
                <div className="flex items-center mb-5 relative z-10">
                  <motion.div 
                    variants={iconVariants}
                    animate={{ 
                      scale: hoveredTile === module.id ? 1.1 : 1
                    }}
                    transition={{ 
                      type: "spring", 
                      stiffness: 300, 
                      damping: 15 
                    }}
                    className="mr-4 p-3 bg-[#dbeafe] flex items-center justify-center"
                    style={{ 
                      minWidth: '56px', 
                      minHeight: '56px',
                      clipPath: "polygon(30% 0%, 70% 0%, 100% 30%, 100% 70%, 70% 100%, 30% 100%, 0% 70%, 0% 30%)"
                    }}
                  >
                    {module.icon}
                  </motion.div>
                  <h3 className="text-xl font-bold text-marine-900">{module.title}</h3>
                </div>
                
                {/* Description */}
                <p className="text-base text-marine-800 leading-relaxed mb-6 relative z-10" style={{ textShadow: '0 0 1px rgba(255, 255, 255, 0.5)' }}>{module.description}</p>
                
                {/* Statistiques animées (toujours présentes pour équilibrer la hauteur) */}
                <div className="mt-auto pt-5 border-t border-gold-300/60 min-h-[120px] relative z-10">
                  {module.stat ? (
                    <>
                      <div className="flex items-baseline">
                        <AnimatedCounter
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
                      <p className="text-xs text-marine-500 italic">Statistiques bientôt disponibles</p>
                    </div>
                  )}
                </div>
                
                {/* Flèche indiquant que la tuile sera cliquable */}
                <div className="flex justify-center mt-2 pb-1">
                  <ArrowRight className="w-5 h-5 text-gold-500" strokeWidth={1.5} />
                </div>
                
                {/* Décoration de coin */}
                <div className="absolute bottom-0 right-0 w-12 h-12 opacity-5">
                  <div className="absolute bottom-0 right-0 w-full h-full bg-gold-500 rounded-tl-3xl"></div>
                </div>
              </motion.div>
            </motion.div>
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
