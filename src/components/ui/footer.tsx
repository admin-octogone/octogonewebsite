"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { useParams } from "next/navigation";
import { useTranslation } from "../../../lib/i18n/client";
import { Button } from "./button";
import { ArrowRight, ExternalLink, Globe, Linkedin, Mail, MapPin, Phone } from "lucide-react";
import { cn } from "@/lib/utils";

interface FooterProps {
  className?: string;
}

export function Footer({ className }: FooterProps) {
  // Récupérer la locale actuelle des paramètres d'URL
  const params = useParams();
  const locale = params ? (typeof params === 'object' && 'locale' in params ? params.locale as string : "fr") : "fr";
  
  // État pour stocker la fonction de traduction
  const [t, setT] = React.useState<any>(() => (key: string, options?: any) => {
    // Fonction par défaut qui retourne la valeur par défaut ou la clé
    return (options?.defaultValue || key);
  });
  
  // Initialiser les traductions
  React.useEffect(() => {
    const loadTranslations = async () => {
      try {
        const { t: translationFunc } = await useTranslation(locale, "footer");
        setT(() => translationFunc);
      } catch (error) {
        console.error("Error loading translations:", error);
      }
    };
    
    loadTranslations();
  }, [locale]);

  const currentYear = new Date().getFullYear();

  return (
    <footer className={cn("bg-marine-900 text-white w-full", className)}>
      <div className="w-full px-4 py-12 md:py-16">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3 lg:grid-cols-6 max-w-[1800px] mx-auto">
          {/* 1. Logo et baseline */}
          <div className="flex flex-col space-y-4 lg:col-span-1">
            <Link href={`/${locale}`} className="inline-block">
              <div className="bg-white p-2 rounded-md inline-block">
                <Image
                  src="/images/partners/logo_octogne_full.png"
                  alt="Octogone"
                  width={120}
                  height={35}
                  className="h-8 w-auto"
                  priority
                />
              </div>
            </Link>
            <p className="mt-2 max-w-xs text-marine-200">
              {locale === "fr" ? 
                "Plateforme de gestion pour les restaurants" : 
                "Restaurant management platform"}
            </p>
          </div>

          {/* 2. Navigation par sections clés - Produit */}
          <div className="lg:col-span-1">
            <h3 className="text-lg font-semibold mb-4 text-gold-400">
              {locale === "fr" ? "Produit" : "Product"}
            </h3>
            <ul className="space-y-3">
              <li>
                <Link href={`/${locale}/features`} className="text-marine-200 hover:text-white transition-colors">
                  {locale === "fr" ? "Fonctionnalités" : "Features"}
                </Link>
              </li>
              <li>
                <Link href={`/${locale}/modules`} className="text-marine-200 hover:text-white transition-colors">
                  {locale === "fr" ? "Modules avancés" : "Advanced Modules"}
                </Link>
              </li>
              <li>
                <Link href={`/${locale}/features#pos`} className="text-marine-200 hover:text-white transition-colors">
                  {locale === "fr" ? "Intégration POS" : "POS Integration"}
                </Link>
              </li>
            </ul>
          </div>

          {/* 2. Navigation par sections clés - Solutions */}
          <div className="lg:col-span-1">
            <h3 className="text-lg font-semibold mb-4 text-gold-400">
              {locale === "fr" ? "Solutions" : "Solutions"}
            </h3>
            <ul className="space-y-3">
              <li>
                <Link href={`/${locale}/solutions/groupes-chaines`} className="text-marine-200 hover:text-white transition-colors">
                  {locale === "fr" ? "Groupes & chaînes" : "Groups & chains"}
                </Link>
              </li>
              <li>
                <Link href={`/${locale}/solutions/independants`} className="text-marine-200 hover:text-white transition-colors">
                  {locale === "fr" ? "Restaurateurs indépendants" : "Independent restaurants"}
                </Link>
              </li>
              <li>
                <Link href={`/${locale}/solutions/cuisines-centrales`} className="text-marine-200 hover:text-white transition-colors">
                  {locale === "fr" ? "Cuisines centrales" : "Central kitchens"}
                </Link>
              </li>
              <li>
                <Link href={`/${locale}/solutions/directeurs-operations`} className="text-marine-200 hover:text-white transition-colors">
                  {locale === "fr" ? "Directeurs d'opérations" : "Operations directors"}
                </Link>
              </li>
            </ul>
          </div>

          {/* 2. Navigation par sections clés - Support */}
          <div className="lg:col-span-1">
            <h3 className="text-lg font-semibold mb-4 text-gold-400">
              {locale === "fr" ? "Support" : "Support"}
            </h3>
            <ul className="space-y-3">
              <li>
                <Link href={`/${locale}/support#accompagnement`} className="text-marine-200 hover:text-white transition-colors">
                  {locale === "fr" ? "Accompagnement client" : "Client support"}
                </Link>
              </li>
              <li>
                <Link href={`/${locale}/support#conciergerie`} className="text-marine-200 hover:text-white transition-colors">
                  {locale === "fr" ? "Conciergerie" : "Concierge service"}
                </Link>
              </li>
              <li>
                <Link href={`/${locale}/ressources#faq`} className="text-marine-200 hover:text-white transition-colors">
                  {locale === "fr" ? "FAQ" : "FAQ"}
                </Link>
              </li>
              <li>
                <Link href={`/${locale}/contact`} className="text-marine-200 hover:text-white transition-colors">
                  {locale === "fr" ? "Contact" : "Contact"}
                </Link>
              </li>
            </ul>
          </div>

          {/* 2. Navigation par sections clés - Ressources */}
          <div className="lg:col-span-1">
            <h3 className="text-lg font-semibold mb-4 text-gold-400">
              {locale === "fr" ? "Ressources" : "Resources"}
            </h3>
            <ul className="space-y-3">
              <li>
                <Link href={`/${locale}/etudes-de-cas`} className="text-marine-200 hover:text-white transition-colors">
                  {locale === "fr" ? "Études de cas" : "Case studies"}
                </Link>
              </li>
              <li>
                <Link href={`/${locale}/guides`} className="text-marine-200 hover:text-white transition-colors">
                  {locale === "fr" ? "Guides pratiques" : "Practical guides"}
                </Link>
              </li>
              <li>
                <Link href={`/${locale}/webinaires`} className="text-marine-200 hover:text-white transition-colors">
                  {locale === "fr" ? "Webinaires (futur)" : "Webinars (coming soon)"}
                </Link>
              </li>
            </ul>
          </div>



          {/* Contact */}
          <div className="lg:col-span-1">
            <h3 className="text-lg font-semibold mb-4 text-gold-400">
              {locale === "fr" ? "Nous contacter" : "Contact Us"}
            </h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <MapPin className="h-5 w-5 text-gold-400 mr-2 mt-0.5" />
                <span className="text-marine-200">
                  Québec (Vieux-Port)
                </span>
              </li>
              <li className="flex items-center">
                <Phone className="h-5 w-5 text-gold-400 mr-2" />
                <a href="tel:+15818745990" className="text-marine-200 hover:text-white transition-colors">
                  581-874-5990
                </a>
              </li>
              <li className="flex items-center">
                <Mail className="h-5 w-5 text-gold-400 mr-2" />
                <a href="mailto:info@octogone.ai" className="text-marine-200 hover:text-white transition-colors">
                  info@octogone.ai
                </a>
              </li>
              <li className="flex items-center">
                <Mail className="h-5 w-5 text-gold-400 mr-2" />
                <a href="mailto:support@octogone.ai" className="text-marine-200 hover:text-white transition-colors">
                  support@octogone.ai
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* 3. Call to Action secondaire */}
        <div className="mt-12 py-6 rounded-lg bg-marine-800">
          <div className="flex flex-col md:flex-row justify-between items-center max-w-[1800px] mx-auto px-4">
            <p className="text-white mb-4 md:mb-0">
              {locale === "fr" ? "Prêt à voir comment Octogone peut s'intégrer à vos opérations ?" : "Ready to see how Octogone can integrate with your operations?"}
            </p>
            <Button variant="primary" size="lg" className="font-medium flex items-center" style={{ backgroundColor: "#dcb26b", color: "#002236" }}>
              {locale === "fr" ? "Réserver une démo" : "Book a demo"}
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* 4. Bas de footer */}
        <div className="mt-12 pt-8 border-t border-marine-700">
          <div className="flex flex-col md:flex-row justify-between items-center max-w-[1800px] mx-auto px-4">
            <p className="text-marine-300 text-sm">
              © Octogone Collectif Inc. {currentYear}
            </p>
            <div className="flex items-center space-x-6 mt-4 md:mt-0">
              <Link href={`/${locale}/politique-confidentialite`} className="text-marine-300 text-sm hover:text-white transition-colors">
                {locale === "fr" ? "Politique de confidentialité" : "Privacy Policy"}
              </Link>
              <Link href={`/${locale}/conditions-utilisation`} className="text-marine-300 text-sm hover:text-white transition-colors">
                {locale === "fr" ? "Conditions d'utilisation" : "Terms of Use"}
              </Link>
              <div className="flex items-center space-x-2 ml-6">
                <Globe className="h-4 w-4 text-marine-300" />
                <Link href="/fr" className={`text-sm ${locale === "fr" ? "text-white font-medium" : "text-marine-300 hover:text-white"} transition-colors`}>
                  FR
                </Link>
                <span className="text-marine-500">/</span>
                <Link href="/en" className={`text-sm ${locale === "en" ? "text-white font-medium" : "text-marine-300 hover:text-white"} transition-colors`}>
                  EN
                </Link>
              </div>
              <a
                href="https://linkedin.com/company/octogone"
                target="_blank"
                rel="noopener noreferrer"
                className="text-marine-300 hover:text-white transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
