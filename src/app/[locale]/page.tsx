import Hero from '@/features/home/components/hero'

export default function HomePage() {
  return (
    <main className="flex min-h-screen flex-col">
      {/* Le Hero est maintenant en position fixe et prend tout l'écran */}
      <Hero />
      
      {/* Conteneur pour les autres sections qui viendront après le hero */}
      <div className="mt-[100vh]">
        {/* Autres sections à ajouter ici */}
      </div>
    </main>
  )
}
