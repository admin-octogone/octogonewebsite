"use client";

import React, { useRef } from "react";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { ResponsiveSection } from "@/components/ui/responsive-section";
import { useParams } from "next/navigation";
import { useScaleOut } from "@/hooks/use-features-scale";

/**
 * Composant FeaturesSection - Section principale présentant les fonctionnalités d'Octogone
 */
const FeaturesSection = () => {
  // Récupérer la locale actuelle des paramètres d'URL
  const params = useParams();
  const locale = params ? (typeof params === 'object' && 'locale' in params ? params.locale as string : "fr") : "fr";
  
  // Utiliser le hook spécifique pour l'animation de l'octogone avec effet d'agrandissement
  const octogoneScale = useScaleOut({
    initialScale: 0.9,
    finalScale: 1.05,
    scrollRange: 300 // Plage courte pour une animation réactive
  });

  // Animation pour les éléments qui apparaissent au défilement
  const fadeInUpVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <ResponsiveSection 
      bgColor="bg-marine-50" 
      spacing="xxxl"
      className="overflow-visible"
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center text-center lg:text-left">
        {/* Colonne de gauche - Image happy_octogone_users */}
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
              {/* Octogone bleu de fond avec animation inversée */}
              <div 
                className="absolute inset-0 m-auto aspect-square w-full h-full bg-[#dbeafe] transition-transform duration-300 ease-out"
                style={{
                  clipPath: "polygon(30% 0%, 70% 0%, 100% 30%, 100% 70%, 70% 100%, 30% 100%, 0% 70%, 0% 30%)",
                  zIndex: 2,
                  transformOrigin: "center center",
                  transform: `scale(${octogoneScale})`
                }}
              />
              
              {/* Image principale */}
              <div className="absolute inset-0 flex items-center justify-center z-10">
                <Image
                  src="/images/happy_octogone_users.png?v=3"
                  alt="Utilisateurs satisfaits d'Octogone"
                  width={500}
                  height={500}
                  priority
                  className="z-[5] w-[190px] xs:w-[260px] h-[190px] xs:h-[260px] md:w-[300px] md:h-[300px] lg:w-[380px] lg:h-[380px] xl:w-[460px] xl:h-[460px]"
                  style={{ objectFit: "contain" }}
                />
              </div>
            </div>
          </div>
        </motion.div>
        
        {/* Colonne de droite - Texte et bullet points */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, delay: 0.2 }}
          variants={fadeInUpVariants}
          className="flex flex-col order-2"
        >
          {/* Titre principal */}
          <h2 className="text-base xs:text-lg lg:text-2xl lg:text-3xl xl:text-4xl font-bold tracking-tight text-marine-900 mb-4 mx-auto lg:mx-0 max-w-3xl">
            {locale === "fr" ? "Pensé pour collaborer. Conçu pour mieux gérer." : "Designed for collaboration. Built for better management."}
          </h2>
          
          {/* Paragraphe principal */}
          <div className="space-y-4 mb-8 mx-auto lg:mx-0 max-w-2xl">
            <p className="text-xs xs:text-sm lg:text-base lg:text-lg xl:text-xl text-marine-700">
              {locale === "fr" 
                ? "Octogone connecte les gestionnaires, les équipes en salle ou en cuisine, et les fournisseurs — sans friction, sans double saisie, sans décalage." 
                : "Octogone connects managers, front-of-house and kitchen teams, and suppliers — without friction, without double entry, without lag."}
            </p>
            <p className="text-xs xs:text-sm lg:text-base lg:text-lg xl:text-xl text-marine-700">
              {locale === "fr" 
                ? "Les données sont à jour, accessibles et partagées en temps réel. Vous gérez vos restaurants avec plus de clarté, plus de fluidité, même en multi-établissements." 
                : "Data is up-to-date, accessible, and shared in real-time. Manage your restaurants with greater clarity and fluidity, even across multiple locations."}
            </p>
          </div>
          
          {/* Points clés */}
          <ul className="space-y-4 mb-8 mx-auto lg:mx-0 max-w-2xl">
            {(locale === "fr" ? [
              "Les gestionnaires accèdent à un portrait clair de tous leurs sites, prennent de meilleures décisions, basées sur des données fiables",
              "Les équipes voient quoi produire, avec quels produits, à quel coût — tout est standardisé et simple à suivre",
              "Les fournisseurs injectent automatiquement leurs produits et leurs factures dans Octogone grâce à l'IA — sans action requise côté client",
              "Les opérations sont alignées, peu importe le nombre d'établissements"
            ] : [
              "Managers access a clear picture of all their locations, make better decisions based on reliable data",
              "Teams see what to produce, with which products, at what cost — everything is standardized and easy to follow",
              "Suppliers automatically inject their products and invoices into Octogone using AI — no client-side action required",
              "Operations are aligned, regardless of the number of establishments"
            ]).map((item, index) => (
              <li key={index} className="flex items-start">
                <span className="text-gold-500 mr-2 flex-shrink-0">✓</span>
                <span className="text-marine-800 text-xs xs:text-sm lg:text-base">{item}</span>
              </li>
            ))}
          </ul>
          
          {/* Accroche finale */}
          <p className="text-sm xs:text-base lg:text-lg lg:text-xl font-medium text-marine-900 mx-auto lg:mx-0 max-w-2xl">
            {locale === "fr" 
              ? "Une seule plateforme. Des équipes connectées. Une gestion multi-sites simplifiée." 
              : "One platform. Connected teams. Simplified multi-location management."}
          </p>
        </motion.div>
      </div>
    </ResponsiveSection>
  );
};

export default FeaturesSection;
