import React, { useEffect, useState } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import GoldButton from "@/components/ui/gold-button";
import { ResponsiveSection } from "@/components/ui/responsive-section";

interface DashboardSectionProps {
  locale: string;
}

export const DashboardSection: React.FC<DashboardSectionProps> = ({ locale }) => {
  const [isMounted, setIsMounted] = useState(false);
  const { scrollYProgress } = useScroll();

  // Définition de valeurs fixes pour garantir la même distance
  const startValue = 200;
  const endValue = -200;
  
  // KPI gauche - monte quand on scrolle
  const kpiLeftY = useTransform(scrollYProgress, [0, 1], [startValue, endValue]);
  
  // KPI droit - descend quand on scrolle (valeurs exactement inversées)
  const kpiRightY = useTransform(scrollYProgress, [0, 1], [endValue, startValue]);
  
  // Léger déplacement pour l'image principale
  const mainDashboardY = useTransform(scrollYProgress, [0, 1], [30, -30]);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <ResponsiveSection 
      bgColor="bg-white" 
      spacing="xxxl"
      className="overflow-hidden"
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center text-center lg:text-left">
        {/* Colonne de gauche - Texte */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          variants={{
            hidden: { opacity: 0, y: 20 },
            visible: { opacity: 1, y: 0 }
          }}
          className="flex flex-col order-2 lg:order-1"
        >
          {/* Titre principal */}
          <h2 className="text-base xs:text-lg lg:text-2xl lg:text-3xl xl:text-4xl font-bold tracking-tight text-marine-900 mb-4 mx-auto lg:mx-0 max-w-3xl">
            {locale === "fr" 
              ? "Visualisez vos données. Prenez les bonnes décisions." 
              : "Visualize your data. Make the right decisions."}
          </h2>
          
          {/* Paragraphe principal */}
          <div className="space-y-4 mb-8 mx-auto lg:mx-0 max-w-2xl">
            <p className="text-xs xs:text-sm lg:text-base lg:text-lg xl:text-xl text-marine-700">
              {locale === "fr" 
                ? "Des tableaux de bord intuitifs qui transforment vos données en insights actionnables. Suivez vos KPIs, analysez vos coûts et optimisez vos performances en temps réel." 
                : "Intuitive dashboards that transform your data into actionable insights. Track your KPIs, analyze your costs, and optimize your performance in real-time."}
            </p>
          </div>
          
          {/* Points clés */}
          <ul className="space-y-4 mb-8 mx-auto lg:mx-0 max-w-2xl">
            {(locale === "fr" ? [
              "Tableaux de bord personnalisables pour suivre vos métriques les plus importantes",
              "Visualisations claires de vos coûts, ventes et marges par établissement",
              "Alertes intelligentes qui vous avertissent des anomalies avant qu'elles ne deviennent problématiques",
              "Rapports automatisés envoyés à votre équipe selon la fréquence de votre choix"
            ] : [
              "Customizable dashboards to track your most important metrics",
              "Clear visualizations of your costs, sales, and margins by location",
              "Smart alerts that notify you of anomalies before they become problematic",
              "Automated reports sent to your team at the frequency of your choice"
            ]).map((item, index) => (
              <li key={index} className="flex items-start">
                <span className="text-gold-500 mr-2 flex-shrink-0">✓</span>
                <span className="text-marine-800 text-xs xs:text-sm lg:text-base">{item}</span>
              </li>
            ))}
          </ul>
          
          {/* Accroche finale */}
          <p className="text-sm xs:text-base lg:text-lg lg:text-xl font-medium text-marine-900 mx-auto lg:mx-0 max-w-2xl mb-6">
            {locale === "fr" 
              ? "Des données claires. Des décisions éclairées. Des résultats mesurables." 
              : "Clear data. Informed decisions. Measurable results."}
          </p>
          
          {/* Bouton Octogone 360 avec flèche à droite */}
          <div className="mx-auto lg:mx-0">
            <GoldButton href={`/${locale}/modules/octogone-360`}>
              {locale === "fr" ? "Découvrir Octogone 360" : "Discover Octogone 360"}
            </GoldButton>
          </div>
        </motion.div>

        {/* Colonne de droite - Dashboard flottant */}
        <div className="relative order-1 lg:order-2 h-[400px] xs:h-[500px] md:h-[600px] lg:h-[700px]">
          {/* Image principale du dashboard */}
          <motion.div
            style={{ 
              y: mainDashboardY
            }}
            transition={{ 
              type: "spring", 
              stiffness: 40, 
              damping: 20 
            }}
            className="absolute inset-0 z-10"
          >
            <div className="relative w-full h-full bg-transparent">
              <Image
                src="/images/new_dashboard.png"
                alt={locale === "fr" ? "Tableau de bord Octogone" : "Octogone Dashboard"}
                className="object-contain rounded-lg"
                fill
                sizes="(max-width: 640px) 90vw, (max-width: 1024px) 80vw, 40vw"
                priority
              />
            </div>
          </motion.div>

          {/* KPI Gauche - Total des ventes (monte au scroll) */}
          <motion.div
            style={{ 
              y: kpiLeftY
            }}
            transition={{ 
              type: "spring", 
              stiffness: 60, 
              damping: 15 
            }}
            className="absolute top-[30%] left-0 translate-x-[-30%] w-[180px] h-[120px] xs:w-[220px] xs:h-[150px] md:w-[250px] md:h-[180px] z-20 block"
          >
            <div className="relative w-full h-full bg-white rounded-lg shadow-xl p-4 flex flex-col justify-between border-2 border-[#D4AF37] transform scale-100">
              <div className="text-sm text-marine-600 font-medium">{locale === "fr" ? "Total des ventes" : "Total Sales"}</div>
              <div className="text-2xl xs:text-3xl font-bold text-marine-900">24,050.71 $</div>
              <div className="flex items-center">
                <div className="text-xs text-green-600 font-medium flex items-center">
                  <svg className="w-3 h-3 mr-1" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 19V5M12 5L5 12M12 5L19 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  +8.2%
                </div>
                <div className="text-xs text-marine-500 ml-2">{locale === "fr" ? "vs mois dernier" : "vs last month"}</div>
              </div>
            </div>
          </motion.div>

          {/* KPI Droite - Profit (descend au scroll) */}
          <motion.div
            style={{ 
              y: kpiRightY
            }}
            transition={{ 
              type: "spring", 
              stiffness: 60, 
              damping: 15 
            }}
            className="absolute top-[30%] right-0 translate-x-[30%] w-[180px] h-[120px] xs:w-[220px] xs:h-[150px] md:w-[250px] md:h-[180px] z-20 block"
          >
            <div className="relative w-full h-full bg-white rounded-lg shadow-xl p-4 flex flex-col justify-between border-2 border-[#D4AF37] transform scale-100">
              <div className="text-sm text-marine-600 font-medium">{locale === "fr" ? "Profit" : "Profit"}</div>
              <div className="text-2xl xs:text-3xl font-bold text-gold-500">18,155.85 $</div>
              <div className="flex items-center">
                <div className="text-xs text-green-600 font-medium flex items-center">
                  <svg className="w-3 h-3 mr-1" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 19V5M12 5L5 12M12 5L19 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  +24%
                </div>
                <div className="text-xs text-marine-500 ml-2">{locale === "fr" ? "vs année dernière" : "vs last year"}</div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </ResponsiveSection>
  );
};
