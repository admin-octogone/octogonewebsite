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
  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: -40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -40, opacity: 0 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className="announcement-banner bg-gold-100 text-marine-800"
        >
          <div className="container mx-auto px-4 py-2 flex items-center justify-center relative">
            <div className="flex items-center justify-center flex-1 text-center">
              <p className="text-sm font-medium flex items-center gap-2">
                <span className="inline-block w-2 h-2 rounded-full bg-gold-400 animate-pulse"></span>
                {message}
                {link && (
                  <a 
                    href={link.href} 
                    className="ml-1 font-semibold hover:text-marine-800 transition-colors border-b border-gold-300 hover:border-gold-500"
                  >
                    {link.text}
                  </a>
                )}
              </p>
            </div>
            <Button
              variant="ghost"
              size="icon"
              className="absolute right-4 h-6 w-6 text-marine-900 hover:bg-gold-400 hover:text-marine-800 btn-gold-light"
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
