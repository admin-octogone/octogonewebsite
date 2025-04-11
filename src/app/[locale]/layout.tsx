"use client"

import * as React from "react"
import { Inter } from "next/font/google"
import Navigation from "@/features/navigation"

const inter = Inter({ subsets: ["latin"] })

const routes = [
  { href: "/fr", label: "Accueil", path: "/" },
  {
    href: "/fr/fonctionnalites", 
    label: "Fonctionnalités", 
    path: "/fonctionnalites",
    description: "Ce que vous maîtrisez avec Octogone",
    children: [
      { 
        href: "/fr/fonctionnalites/food-cost", 
        label: "Food cost en temps réel", 
        path: "/fonctionnalites/food-cost",
        description: "Coûts de recette calculés automatiquement selon vos prix d'achat réels." 
      },
      { 
        href: "/fr/fonctionnalites/inventaire", 
        label: "Inventaire clair et connecté", 
        path: "/fonctionnalites/inventaire",
        description: "Plus de feuilles volantes. Des données fiables, accessibles à tout moment." 
      },
      { 
        href: "/fr/fonctionnalites/rentabilite", 
        label: "Analyse de rentabilité", 
        path: "/fonctionnalites/rentabilite",
        description: "Marges par plat, par site, par période. Tout est mesurable." 
      },
      { 
        href: "/fr/fonctionnalites/facturation", 
        label: "Facturation fournisseurs automatisée", 
        path: "/fonctionnalites/facturation",
        description: "Zéro saisie manuelle. Moins d'erreurs, plus d'efficacité." 
      },
      { 
        href: "/fr/fonctionnalites/transferts", 
        label: "Transferts entre établissements", 
        path: "/fonctionnalites/transferts",
        description: "Produits et recettes transférés avec suivi complet et facturation interne." 
      },
    ]
  },
  {
    href: "/fr/modules", 
    label: "Modules avancés", 
    path: "/modules",
    description: "Des solutions adaptées à vos besoins spécifiques",
    children: [
      { 
        href: "/fr/modules/octogone-360", 
        label: "Octogone 360", 
        path: "/modules/octogone-360",
        description: "Analyse de performance avancée (KPIs). Tableaux de bord, suivi en temps réel, données consolidées." 
      },
      { 
        href: "/fr/modules/octogone-hq", 
        label: "Octogone HQ", 
        path: "/modules/octogone-hq",
        description: "Gestion des transferts inter-succursales. Contrôle, structure, facturation automatisée." 
      },
    ]
  },
  {
    href: "/fr/a-propos", 
    label: "À propos", 
    path: "/a-propos",
    description: "Une plateforme de gestion complète pour les restaurateurs",
    children: [
      { 
        href: "/fr/a-propos/support", 
        label: "Notre accompagnement", 
        path: "/a-propos/support",
        description: "Une équipe qui vous répond, vous suit, vous connaît" 
      },
      { 
        href: "/fr/a-propos/cible", 
        label: "Pour qui ?", 
        path: "/a-propos/cible",
        description: "Groupes de restauration, franchises, chaînes. Restaurants indépendants avec une vision claire." 
      },
    ]
  },
  { 
    href: "/fr/contact", 
    label: "Contact", 
    path: "/contact",
    description: "Réservez une démo personnalisée" 
  },
]

export default function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}) {
  const { locale } = React.use(params)
  
  return (
    <div lang={locale} className={inter.className}>
      <Navigation routes={routes} activeRoute="/fr" theme="light" />
      <div className="pt-20">
        {children}
      </div>
    </div>
  )
}
