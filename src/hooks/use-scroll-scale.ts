import { useState, useEffect } from 'react';

interface ScrollScaleOptions {
  initialScale?: number;
  finalScale?: number;
  scrollRange?: number;
  reverse?: boolean;
}

/**
 * Hook personnalisé pour animer l'échelle d'un élément en fonction du défilement
 * @param options Options de configuration pour l'animation
 * @param options.initialScale Échelle initiale (défaut: 1.15)
 * @param options.finalScale Échelle finale (défaut: 0.95)
 * @param options.scrollRange Plage de défilement en pixels (défaut: 300)
 * @param options.reverse Inverser l'animation (défaut: false)
 * @returns La valeur d'échelle actuelle
 */
export function useScrollScale(options: ScrollScaleOptions = {}) {
  const {
    initialScale = 1.15,
    finalScale = 0.95,
    scrollRange = 300,
    reverse = false
  } = options;

  const [scale, setScale] = useState(initialScale);

  useEffect(() => {
    const handleScroll = () => {
      // Calculer la position de défilement relative
      const scrollPosition = window.scrollY;
      
      // Calculer le facteur de progression (0 à 1)
      const scrollProgress = Math.min(1, scrollPosition / scrollRange);
      
      // Calculer l'échelle en fonction de la direction
      let newScale;
      if (reverse) {
        // Animation inversée (petit → grand)
        newScale = initialScale + (scrollProgress * (finalScale - initialScale));
      } else {
        // Animation normale (grand → petit)
        newScale = initialScale - (scrollProgress * (initialScale - finalScale));
      }
      
      // Mettre à jour l'état
      setScale(newScale);
    };
    
    // Ajouter l'écouteur d'événement
    window.addEventListener('scroll', handleScroll);
    
    // Appeler une fois pour initialiser
    handleScroll();
    
    // Nettoyer l'écouteur d'événement
    return () => window.removeEventListener('scroll', handleScroll);
  }, [initialScale, finalScale, scrollRange, reverse]);

  return scale;
}
