"use client";

import * as React from "react";
import { Inter } from "next/font/google";
import { usePathname } from "next/navigation";
import Navigation from "@/features/navigation";

const inter = Inter({ subsets: ["latin"] });

const routes = [
  { href: "/fr", label: "Accueil", path: "/" },
  {
    href: "/fr/fonctionnalites",
    label: "Fonctionnalités",
    path: "/fonctionnalites",
    description: "Ce que vous maîtrisez avec Octogone",
    children: [
      {
        href: "/fr/fonctionnalites/catalogue",
        label: "Catalogue produits & recettes",
        path: "/fonctionnalites/catalogue",
        description:
          "Gérez facilement vos produits et recettes dans un catalogue structuré, prêt à l'usage.",
      },
      {
        href: "/fr/fonctionnalites/prise-inventaire",
        label: "Prise d'inventaire",
        path: "/fonctionnalites/prise-inventaire",
        description:
          "Effectuez vos inventaires rapidement et sans erreurs, même en multi-sites.",
      },
      {
        href: "/fr/fonctionnalites/recettes-food-cost",
        label: "Recettes & food cost",
        path: "/fonctionnalites/recettes-food-cost",
        description:
          "Créez des recettes standardisées avec calcul automatique des coûts.",
      },
      {
        href: "/fr/fonctionnalites/inventaire-temps-reel",
        label: "Inventaire en temps réel",
        path: "/fonctionnalites/inventaire-temps-reel",
        description:
          "Suivez vos sorties produits en direct, connectées à votre POS.",
      },
      {
        href: "/fr/fonctionnalites/facturation",
        label: "Facturation automatisée",
        path: "/fonctionnalites/facturation",
        description:
          "Gérez vos factures fournisseurs sans saisie manuelle ni oubli.",
      },
      {
        href: "/fr/fonctionnalites/pourboires",
        label: "Gestion des pourboires",
        path: "/fonctionnalites/pourboires",
        description:
          "Automatisez la répartition selon vos règles, en toute transparence.",
      },
      {
        href: "/fr/fonctionnalites/employes",
        label: "Gestion des employés (RH)",
        path: "/fonctionnalites/employes",
        description:
          "Centralisez les rôles, accès et documents de vos équipes.",
      },
      {
        href: "/fr/fonctionnalites/thermometres",
        label: "Thermomètres connectés",
        path: "/fonctionnalites/thermometres",
        description:
          "Recevez des alertes automatiques en cas d'écarts de température.",
      },
      {
        href: "/fr/fonctionnalites/production-cuisine",
        label: "Module de production cuisine",
        path: "/fonctionnalites/production-cuisine",
        description:
          "Planifiez et gérez la production interne en toute fluidité.",
      },
    ],
  },
  {
    href: "/fr/modules",
    label: "Modules Premium",
    path: "/modules",
    description: "Des solutions adaptées à vos besoins spécifiques",
    children: [
      {
        href: "/fr/modules/octogone-360",
        label: "Octogone 360 – Analyse des KPIs",
        path: "/modules/octogone-360",
        description:
          "Suivez vos performances en temps réel et améliorez vos décisions.",
      },
      {
        href: "/fr/modules/octogone-hq",
        label: "Octogone HQ – Transferts inter-établissements",
        path: "/modules/octogone-hq",
        description:
          "Standardisez vos transferts de produits et gérez la facturation interne.",
      },
    ],
  },
  {
    href: "/fr/support",
    label: "Support",
    path: "/support",
    description:
      "Un accompagnement personnalisé pour optimiser votre expérience Octogone",
    children: [
      {
        href: "/fr/support/accompagnement",
        label: "Accompagnement client",
        path: "/support/accompagnement",
        description:
          "Un support humain, dédié, et réellement impliqué dans vos résultats.",
      },
      {
        href: "/fr/support/banque-heures",
        label: "Banques d'heures",
        path: "/support/banque-heures",
        description:
          "Des blocs de temps pour vos besoins spécifiques ou ponctuels.",
      },
      {
        href: "/fr/support/conciergerie",
        label: "Conciergerie",
        path: "/support/conciergerie",
        description:
          "On entretient et optimise votre plateforme pour vous.",
      },
      {
        href: "/fr/support/onboarding",
        label: "Onboarding",
        path: "/support/onboarding",
        description:
          "Un démarrage structuré, rapide, avec vos données intégrées dès le départ.",
      },
    ],
  },
  {
    href: "/fr/contact",
    label: "Contact",
    path: "/contact",
    description: "Réservez une démo personnalisée",
  },
  {
    href: "/fr/login",
    label: "Connexion",
    path: "/login",
    description: "Accédez à votre espace client",
  },
];

export default function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = React.use(params);
  const pathname = usePathname();

  // Extraire le chemin sans le préfixe de locale
  const path = pathname.replace(/^\/[^\/]+/, "");
  const activeRoute = path || "/";

  return (
    <div lang={locale} className={inter.className}>
      <Navigation routes={routes} activeRoute={activeRoute} theme="light" />
      <div className="pt-20">{children}</div>
    </div>
  );
}
