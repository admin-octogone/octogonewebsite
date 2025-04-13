"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { useParams } from "next/navigation";
import { useTranslation } from "../../../lib/i18n/client";
import { Button } from "./button";
import { ExternalLink, Mail, MapPin, Phone } from "lucide-react";
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
    <footer className={cn("bg-marine-900 text-white", className)}>
      <div className="container mx-auto px-4 py-12 md:py-16">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          {/* Logo et description */}
          <div className="flex flex-col space-y-4">
            <Link href={`/${locale}`} className="inline-block">
              <Image
                src="/images/octogone-logo-white.svg"
                alt="Octogone"
                width={150}
                height={40}
                className="h-10 w-auto"
              />
            </Link>
            <p className="mt-4 max-w-xs text-marine-200 text-sm">
              {t("company_description", {
                defaultValue: "Plateforme de gestion complète pour les restaurants, optimisant vos opérations quotidiennes et améliorant votre rentabilité."
              })}
            </p>
            <div className="mt-6 flex space-x-4">
              <a
                href="https://twitter.com/octogone"
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full bg-marine-800 p-2 hover:bg-marine-700 transition-colors"
                aria-label="Twitter"
              >
                <svg className="h-5 w-5 fill-current" viewBox="0 0 24 24">
                  <path d="M22.46 6c-.77.35-1.6.58-2.46.69.88-.53 1.56-1.37 1.88-2.38-.83.5-1.75.85-2.72 1.05C18.37 4.5 17.26 4 16 4c-2.35 0-4.27 1.92-4.27 4.29 0 .34.04.67.11.98-3.56-.18-6.73-1.89-8.84-4.48-.37.63-.58 1.37-.58 2.15 0 1.49.75 2.81 1.91 3.56-.71 0-1.37-.2-1.95-.5v.03c0 2.08 1.48 3.82 3.44 4.21a4.22 4.22 0 0 1-1.93.07 4.28 4.28 0 0 0 4 2.98 8.521 8.521 0 0 1-5.33 1.84c-.34 0-.68-.02-1.02-.06C3.44 20.29 5.7 21 8.12 21 16 21 20.33 14.46 20.33 8.79c0-.19 0-.37-.01-.56.84-.6 1.56-1.36 2.14-2.23z" />
                </svg>
              </a>
              <a
                href="https://linkedin.com/company/octogone"
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full bg-marine-800 p-2 hover:bg-marine-700 transition-colors"
                aria-label="LinkedIn"
              >
                <svg className="h-5 w-5 fill-current" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
              </a>
              <a
                href="https://facebook.com/octogone"
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full bg-marine-800 p-2 hover:bg-marine-700 transition-colors"
                aria-label="Facebook"
              >
                <svg className="h-5 w-5 fill-current" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
              </a>
              <a
                href="https://instagram.com/octogone"
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full bg-marine-800 p-2 hover:bg-marine-700 transition-colors"
                aria-label="Instagram"
              >
                <svg className="h-5 w-5 fill-current" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Liens rapides */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-gold-400">
              {t("quick_links", { defaultValue: "Liens rapides" })}
            </h3>
            <ul className="space-y-3">
              <li>
                <Link href={`/${locale}`} className="text-marine-200 hover:text-white transition-colors">
                  {t("navigation.home", { defaultValue: "Accueil" })}
                </Link>
              </li>
              <li>
                <Link href={`/${locale}/fonctionnalites`} className="text-marine-200 hover:text-white transition-colors">
                  {t("navigation.features", { defaultValue: "Fonctionnalités" })}
                </Link>
              </li>
              <li>
                <Link href={`/${locale}/modules`} className="text-marine-200 hover:text-white transition-colors">
                  {t("navigation.modules", { defaultValue: "Modules Premium" })}
                </Link>
              </li>
              <li>
                <Link href={`/${locale}/tarifs`} className="text-marine-200 hover:text-white transition-colors">
                  {t("navigation.pricing", { defaultValue: "Tarifs" })}
                </Link>
              </li>
              <li>
                <Link href={`/${locale}/support`} className="text-marine-200 hover:text-white transition-colors">
                  {t("navigation.support", { defaultValue: "Support" })}
                </Link>
              </li>
              <li>
                <Link href={`/${locale}/contact`} className="text-marine-200 hover:text-white transition-colors">
                  {t("navigation.contact", { defaultValue: "Contact" })}
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-gold-400">
              {t("contact_us", { defaultValue: "Nous contacter" })}
            </h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <MapPin className="h-5 w-5 text-gold-400 mr-2 mt-0.5" />
                <span className="text-marine-200">
                  123 Rue de la Restauration<br />
                  75001 Paris, France
                </span>
              </li>
              <li className="flex items-center">
                <Phone className="h-5 w-5 text-gold-400 mr-2" />
                <a href="tel:+33123456789" className="text-marine-200 hover:text-white transition-colors">
                  +33 1 23 45 67 89
                </a>
              </li>
              <li className="flex items-center">
                <Mail className="h-5 w-5 text-gold-400 mr-2" />
                <a href="mailto:contact@octogone.com" className="text-marine-200 hover:text-white transition-colors">
                  contact@octogone.com
                </a>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-gold-400">
              {t("newsletter", { defaultValue: "Newsletter" })}
            </h3>
            <p className="text-marine-200 text-sm mb-4">
              {t("newsletter_description", { 
                defaultValue: "Inscrivez-vous pour recevoir nos dernières actualités et offres spéciales." 
              })}
            </p>
            <form className="space-y-2">
              <div className="flex flex-col space-y-2">
                <input
                  type="email"
                  placeholder={t("email_placeholder", { defaultValue: "Votre adresse email" })}
                  className="bg-marine-800 text-white px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-gold-400"
                  required
                />
                <Button 
                  type="submit" 
                  className="bg-gold-500 hover:bg-gold-600 text-marine-900 font-medium"
                >
                  {t("subscribe", { defaultValue: "S'inscrire" })}
                </Button>
              </div>
            </form>
          </div>
        </div>

        {/* Séparateur */}
        <div className="mt-12 pt-8 border-t border-marine-700">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-marine-300 text-sm">
              © {currentYear} Octogone. {t("all_rights_reserved", { defaultValue: "Tous droits réservés." })}
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <Link href={`/${locale}/mentions-legales`} className="text-marine-300 text-sm hover:text-white transition-colors">
                {t("legal_notice", { defaultValue: "Mentions légales" })}
              </Link>
              <Link href={`/${locale}/politique-confidentialite`} className="text-marine-300 text-sm hover:text-white transition-colors">
                {t("privacy_policy", { defaultValue: "Politique de confidentialité" })}
              </Link>
              <Link href={`/${locale}/conditions-utilisation`} className="text-marine-300 text-sm hover:text-white transition-colors">
                {t("terms_of_use", { defaultValue: "Conditions d'utilisation" })}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
