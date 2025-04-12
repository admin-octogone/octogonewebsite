"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu } from "lucide-react";
import { motion, useScroll, useTransform } from "framer-motion";
import { cn } from "@/lib/utils";
import { useScrollPosition } from "@/lib/hooks/use-scroll-position";
import { Button } from "@/components/ui/button";
import { DesktopNav } from "./components/desktop-nav";
import { ModernMobileNav } from "./components/modern-mobile-nav";
import LanguageToggle from "./components/language-toggle";
import AnnouncementBanner from "./components/announcement-banner";
import { NavigationProvider, useNavigation } from "./hooks/use-navigation";
import type { DesktopNavProps } from "./types";

// Constante pour activer/désactiver la bannière d'annonce
const SHOW_ANNOUNCEMENT_BANNER = true;

const NavigationContent: React.FC<DesktopNavProps> = ({
  routes,
  activeRoute,
  locale = "fr",
}) => {
  const { isOpen, setIsOpen, theme } = useNavigation();
  const { isScrolled } = useScrollPosition();

  // État pour la bannière d'annonce
  const [isAnnouncementVisible, setIsAnnouncementVisible] =
    React.useState(true);

  // Vérifier si la bannière a été fermée manuellement
  const [manuallyDismissed, setManuallyDismissed] = React.useState(false);

  React.useEffect(() => {
    if (typeof window !== "undefined") {
      // Effacer le localStorage au chargement de la page
      const dismissKey = "announcement-dismissed";

      // Vérifier si nous sommes dans une nouvelle session de navigation
      const lastSession = localStorage.getItem("last-session-time");
      const currentTime = Date.now();

      // Mettre à jour le timestamp de la session
      localStorage.setItem("last-session-time", currentTime.toString());

      // Si la dernière session était il y a plus de 2 secondes, c'est un refresh ou une nouvelle visite
      if (!lastSession || currentTime - parseInt(lastSession) > 2000) {
        // C'est un refresh ou une nouvelle session, réinitialiser l'état
        localStorage.removeItem(dismissKey);
        setIsAnnouncementVisible(true);
        setManuallyDismissed(false);
      } else {
        // Même session, vérifier si la bannière a été fermée
        const isDismissed = localStorage.getItem(dismissKey) === "true";
        setIsAnnouncementVisible(!isDismissed);
        setManuallyDismissed(isDismissed);
      }
    }
  }, []);

  // Gérer la visibilité de la bannière en fonction du défilement
  React.useEffect(() => {
    let lastScrollY = window.scrollY;

    const handleScroll = () => {
      // Ne pas gérer le défilement si la bannière a été fermée manuellement
      if (manuallyDismissed) {
        return;
      }

      const currentScrollY = window.scrollY;

      // Masquer la bannière lors du défilement vers le bas
      if (currentScrollY > lastScrollY && currentScrollY > 20) {
        setIsAnnouncementVisible(false);
      }
      // Afficher la bannière lors du défilement vers le haut près du haut de la page
      else if (currentScrollY < lastScrollY && currentScrollY < 100) {
        setIsAnnouncementVisible(true);
      }

      lastScrollY = currentScrollY;
    };

    // Ajouter l'écouteur d'événement
    window.addEventListener("scroll", handleScroll);

    // Nettoyer
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [manuallyDismissed]);

  // Framer Motion scroll animations
  const { scrollYProgress } = useScroll();
  // Variable commentée car non utilisée actuellement
  // const headerOpacity = useTransform(scrollYProgress, [0, 0.1], [0, 1]);

  return (
    <>
      {/* Bannière d'annonce */}
      {SHOW_ANNOUNCEMENT_BANNER && (
        <AnnouncementBanner
          message="Nouvelle fonctionnalité disponible : Modules Premium avec IA intégrée !"
          link={{ text: "En savoir plus", href: "/modules-premium" }}
          isVisible={isAnnouncementVisible}
          onDismiss={() => {
            setIsAnnouncementVisible(false);
            setManuallyDismissed(true);
            // Marquer comme fermée dans cette session
            localStorage.setItem("announcement-dismissed", "true");
          }}
        />
      )}

      <header
        className={cn(
          "fixed left-0 right-0 z-[60] transition-all duration-200 border-b",
          {
            "bg-white/80 backdrop-blur-lg shadow-sm border-gray-300":
              isScrolled,
            "bg-transparent border-gray-300":
              !isScrolled && theme === "transparent",
            "bg-white border-gray-300": !isScrolled && theme === "light",
            "bg-marine-900 border-gray-700": !isScrolled && theme === "dark",
            "with-announcement":
              SHOW_ANNOUNCEMENT_BANNER && isAnnouncementVisible,
            "without-announcement":
              !SHOW_ANNOUNCEMENT_BANNER || !isAnnouncementVisible,
          },
        )}
      >
        {/* Progress bar */}
        <motion.div
          className="absolute bottom-0 left-0 right-0 h-[2px] bg-gold-300 origin-left"
          style={{ scaleX: scrollYProgress }}
        />

        <div className="w-full relative">
          <div className="flex h-16 items-center justify-between gap-4 md:h-20 px-4 sm:px-6 lg:px-8 max-w-[1800px] mx-auto">
            {/* Logo */}
            <div className="flex-shrink-0">
              <Link href="/">
                <Image
                  src="/images/partners/logo_octogne_full.png"
                  alt="Logo Octogone"
                  width={120}
                  height={35}
                  className="h-6 w-auto xs:h-6 sm:h-7 md:h-8"
                  priority
                />
              </Link>
            </div>

            {/* Desktop Navigation - uniquement visible sur les écrans plus grands que 1024px */}
            <div className="flex-1 hidden xl:flex justify-center">
              <DesktopNav
                routes={routes}
                activeRoute={activeRoute}
                locale={locale}
              />
            </div>

            <div className="flex-shrink-0 flex items-center">
              {/* Mobile Menu Button - visible sur toutes les résolutions jusqu'à 1024px inclus */}
              <Button
                variant="ghost"
                size="icon"
                className="xl:hidden"
                onClick={() => setIsOpen(true)}
              >
                <Menu className="h-6 w-6" />
              </Button>

              {/* Language Toggle */}
              <div className="hidden xl:flex items-center mr-4">
                <LanguageToggle currentLocale={locale} />
              </div>

              {/* CTA Button */}
              <Link
                href="/contact"
                className="hidden xl:inline-flex items-center justify-center rounded-md px-3 py-2 text-base font-medium bg-gold-500 text-marine-900 hover:bg-gold-400 transition-colors btn-gold"
              >
                Réserver une démo
              </Link>
            </div>

            {/* Mobile Navigation - Version moderne */}
            <ModernMobileNav
              isOpen={isOpen}
              onClose={() => setIsOpen(false)}
              routes={routes}
              activeRoute={activeRoute}
            />
          </div>
        </div>
      </header>
    </>
  );
};

// Main Navigation component with Provider
export const Navigation: React.FC<DesktopNavProps> = (props) => {
  return (
    <NavigationProvider initialTheme={props.theme}>
      <NavigationContent {...props} />
    </NavigationProvider>
  );
};

export default Navigation;
export { NavigationProvider, useNavigation } from "./hooks/use-navigation";
