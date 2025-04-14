"use client";

import React from "react";
import { motion } from "framer-motion";
import { ResponsiveSection } from "@/components/ui/responsive-section";
import { useParams } from "next/navigation";
import { 
  BarChart2, 
  ClipboardCheck, 
  Thermometer, 
  DollarSign, 
  Package, 
  FileText, 
  ChefHat, 
  Users, 
  Link as LinkIcon,
  Percent,
  Clock,
  Database,
  Briefcase,
  Activity
} from "lucide-react";
import { AnimatedCounter } from "@/components/ui/animated-counter";

/**
 * Composant ModulesSection - Section présentant les modules d'Octogone
 */
const ModulesSection = () => {
  // Récupérer la locale actuelle des paramètres d'URL
  const params = useParams();
  const locale = params ? (typeof params === 'object' && 'locale' in params ? params.locale as string : "fr") : "fr";

  // Animation combinée pour les tuiles
  const tileVariants = {
    // État initial (invisible)
    hidden: { 
      opacity: 0, 
      y: 30,
      scale: 0.95,
      boxShadow: "0px 0px 0px rgba(0, 0, 0, 0)"
    },
    // Visible après l'animation d'entrée
    visible: { 
      opacity: 1, 
      y: 0,
      scale: 1,
      boxShadow: "0px 0px 0px rgba(0, 0, 0, 0)",
      transition: { 
        opacity: { duration: 0.6, ease: "easeOut" },
        y: { duration: 0.6, ease: "easeOut" },
        scale: { duration: 0.6, ease: "easeOut" },
        boxShadow: { duration: 0.6, ease: "easeOut" }
      }
    },
    // Au survol - effet plus subtil
    hover: { 
      scale: 1.01, 
      y: 0, 
      backgroundColor: "#f8f3e8", // Légèrement plus foncé que FCF8F1
      transition: { 
        scale: { duration: 0.3, ease: "easeOut" },
        backgroundColor: { duration: 0.3, ease: "easeOut" }
      } 
    },
    // Au clic
    tap: { 
      scale: 0.97, 
      boxShadow: "0px 5px 15px rgba(220, 178, 107, 0.1)",
      transition: { 
        scale: { duration: 0.2, ease: "easeOut" },
        boxShadow: { duration: 0.2, ease: "easeOut" }
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
      id: "inventory",
      title: locale === "fr" ? "Inventaire" : "Inventory",
      description: locale === "fr" 
        ? "Suivez vos stocks en temps réel, réduisez les pertes et automatisez la prise d'inventaire."
        : "Track your inventory in real-time, reduce losses, and automate inventory taking.",
      icon: <Package className="w-8 h-8 text-gold-500" strokeWidth={1.5} />,
      stat: {
        value: 28,
        prefix: "",
        suffix: locale === "fr" ? " %" : " %",
        statText: locale === "fr" ? "de pertes d'inventaire en moyenne après 3 mois" : "average inventory loss reduction after 3 months",
        source: locale === "fr" ? "Source : données internes Octogone multi-sites" : "Source: Octogone internal multi-site data"
      }
    },
    {
      id: "invoicing",
      title: locale === "fr" ? "Facturation fournisseurs" : "Supplier invoicing",
      description: locale === "fr"
        ? "Importez automatiquement vos factures, sans ressaisie. Vos prix sont toujours à jour."
        : "Automatically import your invoices, without re-entry. Your prices are always up to date.",
      icon: <FileText className="w-8 h-8 text-gold-500" strokeWidth={1.5} />,
      stat: {
        value: 8,
        prefix: "",
        suffix: locale === "fr" ? " h / semaine" : " hrs/week",
        statText: locale === "fr" ? "de gestion économisées grâce à l'automatisation des factures" : "management time saved through invoice automation",
        source: locale === "fr" ? "vs gestion manuelle multi-fournisseurs" : "vs. manual multi-vendor management"
      }
    },
    {
      id: "recipes",
      title: locale === "fr" ? "Recettes & food cost" : "Recipes & food cost",
      description: locale === "fr"
        ? "Standardisez vos recettes, calculez automatiquement les coûts de production et de vente."
        : "Standardize your recipes, automatically calculate production and sales costs.",
      icon: <DollarSign className="w-8 h-8 text-gold-500" strokeWidth={1.5} />,
      stat: {
        value: 99,
        prefix: "",
        suffix: locale === "fr" ? " %" : " %",
        statText: locale === "fr" ? "de standardisation des recettes dès l'implantation" : "recipe standardization from day one",
        source: locale === "fr" ? "fiches pré-remplies à partir du catalogue AI" : "pre-filled cards from AI catalog"
      }
    },
    {
      id: "pos",
      title: locale === "fr" ? "Connexion POS" : "POS connection",
      description: locale === "fr"
        ? "Octogone s'intègre à votre caisse pour connecter ventes, inventaires et recettes — sans changer votre système."
        : "Octogone integrates with your POS to connect sales, inventory, and recipes — without changing your system.",
      icon: <LinkIcon className="w-8 h-8 text-gold-500" strokeWidth={1.5} />,
      stat: {
        value: 100,
        prefix: "",
        suffix: locale === "fr" ? " %" : " %",
        statText: locale === "fr" ? "de synchronisation entre ventes, recettes et stocks" : "synchronization between sales, recipes and inventory",
        source: locale === "fr" ? "POS connecté à Octogone" : "POS connected to Octogone"
      }
    },
    {
      id: "hr",
      title: locale === "fr" ? "Dossiers employés (RH)" : "Employee files (HR)",
      description: locale === "fr"
        ? "Gérez les rôles, accès, documents et historique de vos équipes."
        : "Manage roles, access, documents, and history of your teams.",
      icon: <Users className="w-8 h-8 text-gold-500" strokeWidth={1.5} />,
      stat: {
        value: 50,
        prefix: "",
        suffix: locale === "fr" ? " %" : " %",
        statText: locale === "fr" ? "de temps passé sur la gestion RH et les rôles d'accès" : "time spent on HR management and access roles",
        source: locale === "fr" ? "données moyennes Octogone clients 2+ établissements" : "average data from Octogone clients with 2+ establishments"
      }
    },
    {
      id: "catalog",
      title: locale === "fr" ? "Catalogue produits" : "Product catalog",
      description: locale === "fr"
        ? "Accédez à un catalogue complet, déjà rempli grâce à notre base de données intelligente."
        : "Access a complete catalog, already filled thanks to our intelligent database.",
      icon: <ClipboardCheck className="w-8 h-8 text-gold-500" strokeWidth={1.5} />,
      stat: {
        value: 8000,
        prefix: "",
        suffix: locale === "fr" ? "+" : "+",
        statText: locale === "fr" ? "produits disponibles en un clic dans le Marketplace Octogone" : "products available with one click in the Octogone Marketplace",
        source: locale === "fr" ? "connecté à la base AI et aux fournisseurs partenaires" : "connected to AI database and partner suppliers"
      }
    },
    {
      id: "production",
      title: locale === "fr" ? "Production en cuisine" : "Kitchen production",
      description: locale === "fr"
        ? "Planifiez et suivez la production de façon claire, selon les volumes réels."
        : "Plan and track production clearly, according to actual volumes.",
      icon: <ChefHat className="w-8 h-8 text-gold-500" strokeWidth={1.5} />
    },
    {
      id: "thermometers",
      title: locale === "fr" ? "Thermomètres connectés" : "Connected thermometers",
      description: locale === "fr"
        ? "Recevez des alertes automatiques en cas d'écarts de température."
        : "Receive automatic alerts in case of temperature deviations.",
      icon: <Thermometer className="w-8 h-8 text-gold-500" strokeWidth={1.5} />
    },
    {
      id: "tips",
      title: locale === "fr" ? "Gestion des pourboires" : "Tips management",
      description: locale === "fr"
        ? "Partage automatisé selon vos conventions internes, même sur plusieurs sites."
        : "Automated sharing according to your internal conventions, even across multiple sites.",
      icon: <BarChart2 className="w-8 h-8 text-gold-500" strokeWidth={1.5} />
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
          <div className="max-w-3xl mx-auto space-y-4">
            <p className="text-sm xs:text-base md:text-lg text-marine-700">
              {locale === "fr" 
                ? "Octogone vous donne les bons outils pour reprendre le contrôle de vos opérations — sans complexité inutile."
                : "Octogone gives you the right tools to regain control of your operations — without unnecessary complexity."}
            </p>
            <p className="text-sm xs:text-base md:text-lg text-marine-700">
              {locale === "fr" 
                ? "Chaque module est pensé pour vous aider à mieux suivre vos produits, vos coûts, vos équipes et vos résultats."
                : "Each module is designed to help you better track your products, costs, teams, and results."}
            </p>
            <p className="text-sm xs:text-base md:text-lg text-marine-700">
              {locale === "fr" 
                ? "Peu importe la taille de votre réseau, tout est fluide, centralisé et connecté."
                : "Regardless of the size of your network, everything is fluid, centralized, and connected."}
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
                whileHover="hover"
                whileTap="tap"
                variants={tileVariants}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="h-full p-8 flex flex-col cursor-pointer relative border-b-2 border-transparent hover:border-gold-300 shadow-sm hover:shadow-md transition-shadow duration-300"
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
                    className="mr-4 p-3 rounded-full bg-gold-50 flex items-center justify-center shadow-sm"
                    style={{ minWidth: '56px', minHeight: '56px' }}
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
                          className="text-2xl font-bold text-gold-600 mr-2"
                        />
                        {module.stat.prefix && <span className="text-base text-marine-800 font-medium">{module.stat.prefix}</span>}
                      </div>
                      <p className="text-sm text-marine-800 mt-2 line-clamp-2 font-medium">{module.stat.statText}</p>
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
