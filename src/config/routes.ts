export type Route = {
  path: string;
  label: string;
  description?: string;
  children?: Route[];
};

export const routes: Route[] = [
  {
    path: "/",
    label: "Accueil",
    description: "L'ultime solution pour les professionnels de la restauration",
  },
  {
    path: "/features",
    label: "Fonctionnalités",
    description: "Découvrez toutes les fonctionnalités d'Octogone",
    children: [
      {
        path: "/features#costs",
        label: "Coûts et rentabilité",
      },
      {
        path: "/features#inventory",
        label: "Inventaire",
      },
      {
        path: "/features#invoices",
        label: "Factures",
      },
      {
        path: "/features#hr",
        label: "RH et pourboires",
      },
      {
        path: "/features#multisite",
        label: "Multi-sites et transferts",
      },
      {
        path: "/features#pos",
        label: "Intégration POS",
      },
      {
        path: "/features#temperature",
        label: "Températures",
      },
    ],
  },
  {
    path: "/modules",
    label: "Modules avancés",
    description: "Octogone 360 & HQ pour les groupes",
    children: [
      {
        path: "/modules#360",
        label: "Octogone 360",
      },
      {
        path: "/modules#hq",
        label: "Octogone HQ",
      },
    ],
  },
  {
    path: "/solutions",
    label: "Solutions",
    description: "Solutions adaptées à vos besoins",
    children: [
      {
        path: "/solutions/independants",
        label: "Restaurateurs indépendants",
      },
      {
        path: "/solutions/groupes",
        label: "Groupes et franchises",
      },
      {
        path: "/solutions/cuisines-centrales",
        label: "Cuisines centrales",
      },
      {
        path: "/solutions/multi-sites",
        label: "Directeurs multi-sites",
      },
    ],
  },
  {
    path: "/support",
    label: "Service & Accompagnement",
    description: "Un support humain qui fait la différence",
  },
  {
    path: "/ressources",
    label: "Ressources",
    description: "Blog, guides et études de cas",
    children: [
      {
        path: "/ressources/blog",
        label: "Blog",
      },
      {
        path: "/ressources/guides",
        label: "Guides pratiques",
      },
      {
        path: "/ressources/case-studies",
        label: "Études de cas",
      },
      {
        path: "/ressources/faq",
        label: "FAQ",
      },
    ],
  },
  {
    path: "/about",
    label: "À propos",
    description: "Notre mission et notre équipe",
  },
  {
    path: "/demo",
    label: "Réserver une démo",
    description: "Découvrez Octogone en action",
  },
  {
    path: "/contact",
    label: "Contact",
    description: "Nous sommes à votre écoute",
  },
  {
    path: "/login",
    label: "Connexion",
    description: "Accédez à votre espace client",
  },
];
