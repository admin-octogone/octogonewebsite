"use client"

import * as React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface AnnouncementBannerProps {
  message: string
  link?: {
    text: string
    href: string
  }
  isVisible: boolean
  onDismiss: () => void
}

export const AnnouncementBanner: React.FC<AnnouncementBannerProps> = ({
  message,
  link,
  isVisible,
  onDismiss,
}) => {
  // Diviser le message en parties plus courtes pour les petits écrans si nécessaire
  const [isMobile, setIsMobile] = React.useState(false);

  React.useEffect(() => {
    // Vérifier la taille de l'écran au chargement et lors du redimensionnement
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 640);
    };
    
    // Vérification initiale
    checkScreenSize();
    
    // Ajouter un écouteur pour le redimensionnement
    window.addEventListener('resize', checkScreenSize);
    
    // Nettoyage
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: -40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -40, opacity: 0 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className="announcement-banner bg-gold-100 text-marine-800 z-[70] overflow-hidden"
        >
          <div className="container mx-auto px-3 py-2 sm:py-3 flex items-center justify-center relative">
            {/* Contenu principal centré */}
            <div className="flex items-center justify-center max-w-[90%] sm:max-w-[85%] overflow-hidden text-center">
              <span className="inline-block w-1.5 sm:w-2 h-1.5 sm:h-2 rounded-full bg-gold-400 animate-pulse flex-shrink-0 mr-2"></span>
              <div className="text-xs sm:text-sm font-medium truncate">
                {message}
                {link && (
                  <a 
                    href={link.href} 
                    className="ml-1 sm:ml-2 font-semibold hover:text-marine-800 transition-colors border-b border-gold-300 hover:border-gold-500 inline-block"
                  >
                    {link.text}
                  </a>
                )}
              </div>
            </div>
            
            {/* Bouton de fermeture */}
            <Button
              variant="ghost"
              size="icon"
              className="absolute right-1 sm:right-3 top-1/2 transform -translate-y-1/2 h-6 w-6 text-marine-900 hover:bg-gold-400 hover:text-marine-800 btn-gold-light flex-shrink-0 ml-2"
              onClick={onDismiss}
            >
              <X className="h-4 w-4" />
              <span className="sr-only">Fermer</span>
            </Button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default AnnouncementBanner
