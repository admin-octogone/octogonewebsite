import { useState, useEffect } from 'react';

interface ScrollScaleOptions {
  initialScale?: number;
  finalScale?: number;
  scrollRange?: number;
}

/**
 * Hook personnalisé pour animer l'échelle de l'octogone dans la section Hero
 * @param options Options de configuration pour l'animation
 * @param options.initialScale Échelle initiale (défaut: 1.15)
 * @param options.finalScale Échelle finale (défaut: 0.95)
 * @param options.scrollRange Plage de défilement en pixels (défaut: 300)
 * @returns La valeur d'échelle actuelle
 */
export function useScrollScale(options: ScrollScaleOptions = {}) {
  const {
    initialScale = 1.15,
    finalScale = 0.95,
    scrollRange = 300
  } = options;

  const [scale, setScale] = useState(initialScale);
  
  useEffect(() => {
    const handleScroll = () => {
      // Obtenir la position de défilement actuelle
      const scrollPosition = window.scrollY;
      
      // Calculer le facteur de progression (0 à 1)
      const scrollProgress = Math.min(1, scrollPosition / scrollRange);
      
      // Calculer l'échelle pour la section Hero (grand → petit)
      const newScale = initialScale - (scrollProgress * (initialScale - finalScale));
      
      // Mettre à jour l'état
      setScale(newScale);
    };
    
    // Ajouter l'écouteur d'événement
    window.addEventListener('scroll', handleScroll);
    
    // Appeler une fois pour initialiser
    handleScroll();
    
    // Nettoyer l'écouteur d'événement
    return () => window.removeEventListener('scroll', handleScroll);
  }, [initialScale, finalScale, scrollRange]);

  return scale;
}
