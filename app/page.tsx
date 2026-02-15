"use client";

import Hero from "@/app/components/Hero";
import ScrollRevealSection from "@/app/components/ScrollRevealSection";
import ReservationSection from "@/app/components/ReservationSection";

export default function HomePage() {
  return (
    <>
      <Hero />
      
      <div id="story">
        <ScrollRevealSection
          title="Nuestra Pasión"
          description="En Sabor Auténtico, creemos que la comida es más que sustento; es una historia que se cuenta en cada bocado. Nuestro chef selecciona personalmente cada ingrediente de productores locales, asegurando frescura y calidad inigualables."
          imageSrc="https://images.unsplash.com/photo-1559339352-11d035aa65de?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
          alignment="left"
        />
        
        <ScrollRevealSection
          title="Ambiente Único"
          description="Sumérgete en un espacio diseñado para el confort y la elegancia. La iluminación cálida, la música suave y la atención al detalle crean la atmósfera perfecta para cenas románticas, reuniones familiares o comidas de negocios."
          imageSrc="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
          alignment="right"
          className="bg-stone-50"
        />
      </div>

      <div id="menu">
         <ScrollRevealSection
          title="Carta de Autor"
          description="Nuestra carta cambia con las estaciones, ofreciendo siempre lo mejor que la naturaleza tiene para dar. Desde platos tradicionales reinventados hasta creaciones vanguardistas, cada opción es una aventura para el paladar."
          imageSrc="https://images.unsplash.com/photo-1504674900247-0877df9cc836?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
          alignment="left"
        />
      </div>

      <ReservationSection />
    </>
  );
}
