"use client";

import React from "react";
import { motion } from "framer-motion";
import { ResponsiveSection } from "@/components/ui/responsive-section";
import { useParams } from "next/navigation";
import Link from "next/link";

/**
 * Composant PremiumSection - Section présentant les modules premium d'Octogone
 */
const PremiumSection = () => {
  // Récupérer la locale actuelle des paramètres d'URL
  const params = useParams();
  const locale = params ? (typeof params === 'object' && 'locale' in params ? params.locale as string : "fr") : "fr";

  // Animation pour les éléments qui apparaissent au défilement
  const fadeInUpVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <ResponsiveSection 
      bgColor="bg-gold-50" 
      spacing="xxxl"
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center text-center lg:text-left">
        {/* Colonne de gauche - Élément visuel décoratif */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          variants={fadeInUpVariants}
          className="relative order-1 flex justify-center"
        >
          <div className="relative flex justify-center items-center mx-auto">
            <div className="relative aspect-square w-[260px] xs:w-[320px] md:w-[380px] lg:w-[480px] xl:w-[580px] flex justify-center items-center">
              {/* Octogone doré de fond avec animation */}
              <div 
                className="absolute inset-0 m-auto aspect-square w-full h-full bg-gold-100 transition-transform duration-300 ease-out"
                style={{
                  clipPath: "polygon(30% 0%, 70% 0%, 100% 30%, 100% 70%, 70% 100%, 30% 100%, 0% 70%, 0% 30%)",
                  zIndex: 2,
                }}
              />
              
              {/* Texte "PREMIUM" */}
              <div className="absolute inset-0 flex items-center justify-center z-10">
                <div className="text-6xl font-bold text-gold-600/30 transform -rotate-12">PREMIUM</div>
              </div>
            </div>
          </div>
        </motion.div>
        
        {/* Colonne de droite - Contenu textuel */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, delay: 0.2 }}
          variants={fadeInUpVariants}
          className="flex flex-col order-2"
        >
          {/* Titre principal */}
          <h2 className="text-base xs:text-lg lg:text-2xl lg:text-3xl xl:text-4xl font-bold tracking-tight text-gold-800 mb-4 mx-auto lg:mx-0 max-w-3xl">
            {locale === "fr" ? "Conçus pour ceux qui gèrent plusieurs établissements. Ensemble ou séparément." : "Designed for those managing multiple establishments. Together or separately."}
          </h2>
          
          {/* Paragraphe d'introduction */}
          <div className="space-y-4 mb-8 mx-auto lg:mx-0 max-w-2xl">
            <p className="text-xs xs:text-sm lg:text-base lg:text-lg xl:text-xl text-gold-700">
              {locale === "fr" 
                ? "Quand on gère plus d'un restaurant, les défis changent : il faut comparer, structurer, transférer, harmoniser. Octogone propose deux modules exclusifs pour les groupes et chaînes : 360 et HQ." 
                : "When managing more than one restaurant, the challenges change: you need to compare, structure, transfer, harmonize. Octogone offers two exclusive modules for groups and chains: 360 and HQ."}
            </p>
            <p className="text-xs xs:text-sm lg:text-base lg:text-lg xl:text-xl text-gold-700">
              {locale === "fr" 
                ? "Ils vous donnent les outils pour analyser chaque site ou l'ensemble, gérer vos transferts, et assurer la cohérence de vos opérations — sans complexité." 
                : "They give you the tools to analyze each site or the whole, manage your transfers, and ensure consistency in your operations — without complexity."}
            </p>
          </div>
          
          {/* Modules premium */}
          <div className="space-y-8 mb-8 mx-auto lg:mx-0 max-w-2xl">
            {/* Module Octogone 360 */}
            <div>
              <h3 className="text-xl font-bold text-gold-800 mb-2">[Octogone 360]</h3>
              <p className="text-lg font-medium text-gold-700 mb-2">
                {locale === "fr" ? "Voir. Comparer. Ajuster." : "See. Compare. Adjust."}
              </p>
              <p className="text-sm lg:text-base text-gold-700 mb-4">
                {locale === "fr"
                  ? "Octogone 360 vous permet de visualiser vos KPIs par établissement ou de façon consolidée. Vous comparez les performances, identifiez les écarts, et ajustez ce qui doit l'être — sans ressaisie, sans approximations."
                  : "Octogone 360 allows you to visualize your KPIs by establishment or in a consolidated way. You compare performances, identify gaps, and adjust what needs to be — without re-entry, without approximations."}
              </p>
              
              <p className="text-sm lg:text-base font-medium text-gold-800 mb-2">
                {locale === "fr" ? "Ce que vous pouvez faire avec Octogone 360 :" : "What you can do with Octogone 360:"}
              </p>
              
              <ul className="space-y-2 mb-4">
                {(locale === "fr" ? [
                  "Suivre vos ventes, marges, coûts et bénéfices en temps réel",
                  "Comparer vos sites selon les mêmes indicateurs",
                  "Analyser les résultats par recette, période ou menu",
                  "Générer des rapports personnalisés pour chaque décisionnaire"
                ] : [
                  "Track your sales, margins, costs and profits in real time",
                  "Compare your sites using the same indicators",
                  "Analyze results by recipe, period or menu",
                  "Generate customized reports for each decision maker"
                ]).map((item, index) => (
                  <li key={index} className="flex items-start">
                    <span className="text-gold-500 mr-2 flex-shrink-0">✓</span>
                    <span className="text-gold-700 text-xs xs:text-sm lg:text-base">{item}</span>
                  </li>
                ))}
              </ul>
              
              <Link href={locale === "fr" ? "/fr/modules/octogone-360" : "/en/modules/octogone-360"} className="text-gold-600 font-medium hover:text-gold-800 transition-colors">
                {locale === "fr" ? "Découvrir Octogone 360" : "Discover Octogone 360"} →
              </Link>
            </div>
            
            {/* Module Octogone HQ */}
            <div>
              <h3 className="text-xl font-bold text-gold-800 mb-2">[Octogone HQ]</h3>
              <p className="text-lg font-medium text-gold-700 mb-2">
                {locale === "fr" ? "Une gestion structurée entre vos établissements." : "Structured management between your establishments."}
              </p>
              <p className="text-sm lg:text-base text-gold-700 mb-4">
                {locale === "fr"
                  ? "Octogone HQ facilite les transferts de produits, recettes et pratiques entre vos sites. Vous pouvez centraliser, déléguer ou hybrider selon votre façon de gérer — tout en gardant une traçabilité complète."
                  : "Octogone HQ facilitates the transfer of products, recipes and practices between your sites. You can centralize, delegate or hybridize according to your management style — while maintaining complete traceability."}
              </p>
              
              <p className="text-sm lg:text-base font-medium text-gold-800 mb-2">
                {locale === "fr" ? "Ce que vous pouvez faire avec Octogone HQ :" : "What you can do with Octogone HQ:"}
              </p>
              
              <ul className="space-y-2 mb-4">
                {(locale === "fr" ? [
                  "Gérer les transferts internes avec facturation automatique",
                  "Standardiser recettes et approches d'un site à l'autre",
                  "Suivre les flux entre établissements en temps réel",
                  "Assurer cohérence, contrôle et souplesse à travers votre réseau"
                ] : [
                  "Manage internal transfers with automatic invoicing",
                  "Standardize recipes and approaches from one site to another",
                  "Track flows between establishments in real time",
                  "Ensure consistency, control and flexibility across your network"
                ]).map((item, index) => (
                  <li key={index} className="flex items-start">
                    <span className="text-gold-500 mr-2 flex-shrink-0">✓</span>
                    <span className="text-gold-700 text-xs xs:text-sm lg:text-base">{item}</span>
                  </li>
                ))}
              </ul>
              
              <Link href={locale === "fr" ? "/fr/modules/octogone-hq" : "/en/modules/octogone-hq"} className="text-gold-600 font-medium hover:text-gold-800 transition-colors">
                {locale === "fr" ? "Découvrir Octogone HQ" : "Discover Octogone HQ"} →
              </Link>
            </div>
          </div>
          
          {/* Accroche finale */}
          <p className="text-sm xs:text-base lg:text-lg lg:text-xl font-medium text-gold-800 mx-auto lg:mx-0 max-w-2xl">
            {locale === "fr" 
              ? "Ces modules sont faits pour ceux qui ne veulent pas juste additionner des restaurants — mais les gérer intelligemment. Ensemble, ou séparément." 
              : "These modules are made for those who don't just want to add restaurants — but manage them intelligently. Together, or separately."}
          </p>
        </motion.div>
      </div>
    </ResponsiveSection>
  );
};

export default PremiumSection;
