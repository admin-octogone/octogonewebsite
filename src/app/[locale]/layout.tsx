"use client"

import * as React from "react"
import { Inter } from "next/font/google"
import { usePathname } from "next/navigation"
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
    label: "Modules Premium", 
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
    href: "/fr/services", 
    label: "Services", 
    path: "/services",
    description: "Des services d'accompagnement sur mesure pour optimiser votre expérience Octogone",
    children: [
      { 
        href: "/fr/services/banque-de-temps", 
        label: "Banque de temps", 
        path: "/services/banque-de-temps",
        description: "Forfaits d'heures flexibles pour répondre à vos besoins spécifiques et projets ponctuels" 
      },
      { 
        href: "/fr/services/conciergerie", 
        label: "Conciergerie", 
        path: "/services/conciergerie",
        description: "Accompagnement Premium personnalisé garantissant une performance optimale en continu" 
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
  const pathname = usePathname()
  
  // Extraire le chemin sans le préfixe de locale
  const path = pathname.replace(/^\/[^\/]+/, '')
  const activeRoute = path || '/'
  
  return (
    <div lang={locale} className={inter.className}>
      <Navigation routes={routes} activeRoute={activeRoute} theme="light" />
      <div className="pt-20">
        {children}
      </div>
    </div>
  )
}
