"use client";

import * as React from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";

interface LanguageToggleProps {
  currentLocale: string;
}

const LanguageToggle: React.FC<LanguageToggleProps> = ({ currentLocale }) => {
  const pathname = usePathname();

  // Déterminer la locale alternative
  const alternateLocale = currentLocale === "fr" ? "en" : "fr";

  // Construire le chemin pour la locale alternative
  const getAlternatePathname = () => {
    // Si nous sommes à la racine d'une locale
    if (pathname === `/${currentLocale}`) {
      return `/${alternateLocale}`;
    }

    // Sinon, remplacer la locale dans le chemin
    return pathname.replace(`/${currentLocale}`, `/${alternateLocale}`);
  };

  return (
    <motion.div
      className="relative"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <Link
        href={getAlternatePathname()}
        className="flex items-center justify-center px-3 py-1 rounded-md bg-marine-50 hover:bg-marine-100 text-marine-800 font-medium text-sm transition-colors"
      >
        {alternateLocale === "fr" ? "FR" : "EN"}
      </Link>
    </motion.div>
  );
};

export default LanguageToggle;
