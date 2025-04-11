"use client"

import * as React from 'react'
import { Menu } from 'lucide-react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { cn } from '@/lib/utils'
import { useScrollPosition } from '@/lib/hooks/use-scroll-position'
import { Button } from '@/components/ui/button'
import { DesktopNav } from './components/desktop-nav'
import { MobileNav } from './components/mobile-nav'
import { NavigationProvider, useNavigation } from './hooks/use-navigation'
import type { DesktopNavProps } from './types'

const NavigationContent: React.FC<DesktopNavProps> = ({
  routes,
  activeRoute,
}) => {
  const { isOpen, setIsOpen, theme } = useNavigation()
  const { isScrolled } = useScrollPosition()

  // Framer Motion scroll animations
  const { scrollYProgress } = useScroll()
  const headerOpacity = useTransform(scrollYProgress, [0, 0.1], [0, 1])

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-[60] transition-all duration-200',
        {
          'bg-white/80 backdrop-blur-lg shadow-sm': isScrolled,
          'bg-transparent': !isScrolled && theme === 'transparent',
          'bg-white': !isScrolled && theme === 'light',
          'bg-marine-900': !isScrolled && theme === 'dark',
        }
      )}
    >
      {/* Progress bar */}
      <motion.div
        className="absolute bottom-0 left-0 right-0 h-[2px] bg-gold-300 origin-left"
        style={{ scaleX: scrollYProgress }}
      />

      <div className="w-full relative">
        <div className="flex h-16 items-center justify-between gap-4 md:h-20 px-4 sm:px-6 lg:px-8">
          {/* Logo */}
          <div className="flex-shrink-0">
            <span className="text-xl font-bold text-marine-900">Octogone</span>
          </div>

          {/* Desktop Navigation */}
          <div className="flex-1 flex justify-center">
            <DesktopNav routes={routes} activeRoute={activeRoute} />
          </div>

          <div className="flex-shrink-0 flex items-center">
            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden"
              onClick={() => setIsOpen(true)}
            >
              <Menu className="h-6 w-6" />
            </Button>

            {/* CTA Button */}
            <Button variant="default" size="sm" className="hidden lg:inline-flex ml-4">
              Réserver une démo
            </Button>
          </div>

          {/* Mobile Navigation */}
          <MobileNav
            isOpen={isOpen}
            onClose={() => setIsOpen(false)}
            routes={routes}
            activeRoute={activeRoute}
          />
        </div>
      </div>
    </header>
  )
}

// Main Navigation component with Provider
export const Navigation: React.FC<DesktopNavProps> = (props) => {
  return (
    <NavigationProvider initialTheme={props.theme}>
      <NavigationContent {...props} />
    </NavigationProvider>
  )
}

export default Navigation
export { NavigationProvider, useNavigation } from './hooks/use-navigation'
