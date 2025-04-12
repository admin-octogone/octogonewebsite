"use client";

import * as React from "react";
import { Inter } from "next/font/google";
import { usePathname } from "next/navigation";
import Navigation from "@/features/navigation";

const inter = Inter({ subsets: ["latin"] });

function getRoutes(locale: string) {
  return [
  { href: `/${locale}`, label: locale === "fr" ? "Accueil" : "Home", path: "/" },
  {
    href: `/${locale}/fonctionnalites`,
    label: locale === "fr" ? "Fonctionnalités" : "Features",
    path: "/fonctionnalites",
    description: locale === "fr" ? "Ce que vous maîtrisez avec Octogone" : "What you manage with Octogone",
    children: [
      {
        href: `/${locale}/fonctionnalites/catalogue`,
        label: locale === "fr" ? "Catalogue produits & recettes" : "Product & Recipe Catalog",
        path: "/fonctionnalites/catalogue",
        description: locale === "fr" ? "Gérez facilement vos produits et recettes dans un catalogue structuré, prêt à l'usage." : "Easily manage your products and recipes in a structured, ready-to-use catalog.",
      },
      {
        href: `/${locale}/fonctionnalites/prise-inventaire`,
        label: locale === "fr" ? "Prise d'inventaire" : "Inventory Taking",
        path: "/fonctionnalites/prise-inventaire",
        description: locale === "fr" ? "Effectuez vos inventaires rapidement et sans erreurs, même en multi-sites." : "Perform your inventories quickly and without errors, even across multiple locations.",
      },
      {
        href: `/${locale}/fonctionnalites/recettes-food-cost`,
        label: locale === "fr" ? "Recettes & food cost" : "Recipes & Food Cost",
        path: "/fonctionnalites/recettes-food-cost",
        description: locale === "fr" ? "Créez des recettes standardisées avec calcul automatique des coûts." : "Create standardized recipes with automatic cost calculation.",
      },
      {
        href: `/${locale}/fonctionnalites/inventaire-temps-reel`,
        label: locale === "fr" ? "Inventaire en temps réel" : "Real-time Inventory",
        path: "/fonctionnalites/inventaire-temps-reel",
        description: locale === "fr" ? "Suivez vos sorties produits en direct, connectées à votre POS." : "Track your product outputs in real-time, connected to your POS.",
      },
      {
        href: `/${locale}/fonctionnalites/facturation`,
        label: locale === "fr" ? "Facturation automatisée" : "Automated Invoicing",
        path: "/fonctionnalites/facturation",
        description: locale === "fr" ? "Gérez vos factures fournisseurs sans saisie manuelle ni oubli." : "Manage your supplier invoices without manual entry or oversights.",
      },
      {
        href: `/${locale}/fonctionnalites/pourboires`,
        label: locale === "fr" ? "Gestion des pourboires" : "Tip Management",
        path: "/fonctionnalites/pourboires",
        description: locale === "fr" ? "Automatisez la répartition selon vos règles, en toute transparence." : "Automate distribution according to your rules, with full transparency.",
      },
      {
        href: `/${locale}/fonctionnalites/employes`,
        label: locale === "fr" ? "Gestion des employés (RH)" : "Employee Management (HR)",
        path: "/fonctionnalites/employes",
        description: locale === "fr" ? "Centralisez les rôles, accès et documents de vos équipes." : "Centralize roles, access, and documents for your teams.",
      },
      {
        href: `/${locale}/fonctionnalites/thermometres`,
        label: locale === "fr" ? "Thermomètres connectés" : "Connected Thermometers",
        path: "/fonctionnalites/thermometres",
        description: locale === "fr" ? "Recevez des alertes automatiques en cas d'écarts de température." : "Receive automatic alerts in case of temperature deviations.",
      },
      {
        href: `/${locale}/fonctionnalites/production-cuisine`,
        label: locale === "fr" ? "Module de production cuisine" : "Kitchen Production Module",
        path: "/fonctionnalites/production-cuisine",
        description: locale === "fr" ? "Planifiez et gérez la production interne en toute fluidité." : "Plan and manage internal production with complete fluidity.",
      },
    ],
  },
  {
    href: `/${locale}/modules`,
    label: locale === "fr" ? "Modules Premium" : "Premium Modules",
    path: "/modules",
    description: locale === "fr" ? "Des solutions adaptées à vos besoins spécifiques" : "Solutions tailored to your specific needs",
    children: [
      {
        href: `/${locale}/modules/octogone-360`,
        label: locale === "fr" ? "Octogone 360 – Analyse des KPIs" : "Octogone 360 – KPI Analysis",
        path: "/modules/octogone-360",
        description: locale === "fr" ? "Suivez vos performances en temps réel et améliorez vos décisions." : "Track your performance in real-time and improve your decisions.",
      },
      {
        href: `/${locale}/modules/octogone-hq`,
        label: locale === "fr" ? "Octogone HQ – Transferts inter-établissements" : "Octogone HQ – Inter-location Transfers",
        path: "/modules/octogone-hq",
        description: locale === "fr" ? "Standardisez vos transferts de produits et gérez la facturation interne." : "Standardize your product transfers and manage internal billing.",
      },
    ],
  },
  {
    href: `/${locale}/support`,
    label: locale === "fr" ? "Support" : "Support",
    path: "/support",
    description: locale === "fr" ? "Un accompagnement personnalisé pour optimiser votre expérience Octogone" : "Personalized support to optimize your Octogone experience",
    children: [
      {
        href: `/${locale}/support/accompagnement`,
        label: locale === "fr" ? "Accompagnement client" : "Client Support",
        path: "/support/accompagnement",
        description: locale === "fr" ? "Un support humain, dédié, et réellement impliqué dans vos résultats." : "Human support, dedicated, and genuinely involved in your results.",
      },
      {
        href: `/${locale}/support/banque-heures`,
        label: locale === "fr" ? "Banques d'heures" : "Hour Banks",
        path: "/support/banque-heures",
        description: locale === "fr" ? "Des blocs de temps pour vos besoins spécifiques ou ponctuels." : "Time blocks for your specific or one-time needs.",
      },
      {
        href: `/${locale}/support/conciergerie`,
        label: locale === "fr" ? "Conciergerie" : "Concierge Service",
        path: "/support/conciergerie",
        description: locale === "fr" ? "On entretient et optimise votre plateforme pour vous." : "We maintain and optimize your platform for you.",
      },
      {
        href: `/${locale}/support/onboarding`,
        label: locale === "fr" ? "Onboarding" : "Onboarding",
        path: "/support/onboarding",
        description: locale === "fr" ? "Un démarrage structuré, rapide, avec vos données intégrées dès le départ." : "A structured, quick start with your data integrated from day one.",
      },
    ],
  },
  {
    href: `/${locale}/contact`,
    label: locale === "fr" ? "Contact" : "Contact",
    path: "/contact",
    description: locale === "fr" ? "Réservez une démo personnalisée" : "Book a personalized demo",
  },
  {
    href: `/${locale}/login`,
    label: locale === "fr" ? "Connexion" : "Login",
    path: "/login",
    description: locale === "fr" ? "Accédez à votre espace client" : "Access your client portal",
  },
  ];
}

export default function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  const { locale } = params;
  const pathname = usePathname();

  // Extraire le chemin sans le préfixe de locale
  const path = pathname.replace(/^\/[^\/]+/, "");
  const activeRoute = path || "/";

  // Obtenir les routes traduites
  const translatedRoutes = getRoutes(locale);

  return (
    <div lang={locale} className={inter.className}>
      <Navigation routes={translatedRoutes} activeRoute={activeRoute} theme="light" locale={locale} />
      <div className="pt-20">{children}</div>
    </div>
  );
}
