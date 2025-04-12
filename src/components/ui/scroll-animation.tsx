"use client"

import React, { useRef, useState, useEffect } from 'react'
import { motion, useScroll, useTransform, MotionProps } from 'framer-motion'

/**
 * Types d'animations disponibles pour le composant ScrollAnimation
 */
export type ScrollAnimationType = 
  | 'scale-up'      // Agrandissement progressif
  | 'scale-down'    // Réduction progressive
  | 'fade-in'       // Apparition progressive
  | 'slide-up'      // Glissement vers le haut
  | 'slide-in'      // Glissement depuis le côté
  | 'rotate'        // Rotation progressive
  | 'custom'        // Animation personnalisée

/**
 * Props pour le composant ScrollAnimation
 */
interface ScrollAnimationProps extends MotionProps {
  children: React.ReactNode
  type?: ScrollAnimationType
  startOffset?: [string, string]
  amount?: number
  threshold?: number
  duration?: number
  minWidth?: number
  className?: string
  customTransform?: (progress: any) => any
}

/**
 * Composant ScrollAnimation
 * 
 * Ce composant permet d'ajouter facilement des animations basées sur le défilement
 * à n'importe quel élément du site. Il s'adapte automatiquement aux différentes
 * tailles d'écran et peut être personnalisé selon les besoins.
 * 
 * @example
 * // Animation d'agrandissement simple
 * <ScrollAnimation type="scale-up">
 *   <div className="my-element">Contenu</div>
 * </ScrollAnimation>
 * 
 * @example
 * // Animation personnalisée avec des paramètres spécifiques
 * <ScrollAnimation 
 *   type="custom" 
 *   threshold={0.2} 
 *   minWidth={768}
 *   customTransform={(progress) => useTransform(progress, [0, 0.5], [0.8, 1.2])}
 * >
 *   <div className="my-element">Contenu</div>
 * </ScrollAnimation>
 */
export const ScrollAnimation: React.FC<ScrollAnimationProps> = ({
  children,
  type = 'scale-up',
  startOffset = ['start start', 'start end'],
  amount = 0.2,
  threshold = 0.15,
  duration = 0.1,
  minWidth = 0,
  className = '',
  customTransform,
  ...props
}) => {
  // Référence pour l'élément à animer
  const elementRef = useRef<HTMLDivElement>(null)
  
  // État pour la détection côté client et la taille de l'écran
  const [isClient, setIsClient] = useState(false)
  const [windowWidth, setWindowWidth] = useState(0)
  
  // Effet pour la détection côté client et le redimensionnement
  useEffect(() => {
    setIsClient(true)
    setWindowWidth(window.innerWidth)
    
    const handleResize = () => {
      setWindowWidth(window.innerWidth)
    }
    
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])
  
  // Animation basée sur le défilement
  const { scrollYProgress } = useScroll({
    target: elementRef,
    offset: startOffset
  })
  
  // Définir toutes les transformations en dehors des conditions
  // pour respecter les règles des hooks React
  const scaleUp = useTransform(scrollYProgress, [0, threshold], [1, 1 + amount])
  const scaleDown = useTransform(scrollYProgress, [0, threshold], [1, 1 - amount])
  const opacity = useTransform(scrollYProgress, [0, threshold], [0, 1])
  const y = useTransform(scrollYProgress, [0, threshold], [50, 0])
  const x = useTransform(scrollYProgress, [0, threshold], [50, 0])
  const rotate = useTransform(scrollYProgress, [0, threshold], [0, 360 * amount])
  
  // Configuration des transformations selon le type d'animation
  const getAnimationProps = () => {
    // Ne pas appliquer l'animation si l'écran est trop petit
    if (!isClient || windowWidth < minWidth) {
      return {}
    }
    
    // Appliquer l'animation personnalisée si fournie
    if (type === 'custom' && customTransform) {
      return {
        style: {
          ...props.style,
          ...customTransform(scrollYProgress),
          transition: { duration }
        }
      }
    }
    
    // Configurations pour les différents types d'animations prédéfinis
    switch (type) {
      case 'scale-up':
        return {
          style: {
            ...props.style,
            scale: scaleUp,
            transformOrigin: 'center center',
            transition: { duration }
          }
        }
        
      case 'scale-down':
        return {
          style: {
            ...props.style,
            scale: scaleDown,
            transformOrigin: 'center center',
            transition: { duration }
          }
        }
        
      case 'fade-in':
        return {
          style: {
            ...props.style,
            opacity,
            transition: { duration }
          }
        }
        
      case 'slide-up':
        return {
          style: {
            ...props.style,
            y,
            opacity,
            transition: { duration }
          }
        }
        
      case 'slide-in':
        return {
          style: {
            ...props.style,
            x,
            opacity,
            transition: { duration }
          }
        }
        
      case 'rotate':
        return {
          style: {
            ...props.style,
            rotate,
            transformOrigin: 'center center',
            transition: { duration }
          }
        }
        
      default:
        return {}
    }
  }
  
  return (
    <motion.div
      ref={elementRef}
      className={className}
      {...props}
      {...getAnimationProps()}
    >
      {children}
    </motion.div>
  )
}
