"use client";

import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";

const testimonials = [
  {
    text: "La experiencia gastronómica superó todas nuestras expectativas. Cada plato cuenta una historia diferente. El ambiente es íntimo y elegante.",
    author: "María Elena R.",
    role: "Crítica Gastronómica",
    rating: 5
  },
  {
    text: "Celebramos nuestro aniversario y no podríamos haber elegido un lugar mejor. El trato del personal es excepcional y la carta de vinos espectacular.",
    author: "Carlos De la Fuente",
    role: "Cliente Frecuente",
    rating: 5
  },
  {
    text: "Una joya oculta de la ciudad. La fusión de sabores tradicionales con técnicas modernas nos dejó sin palabras. Volveremos pronto.",
    author: "Ana y David",
    role: "Viajeros",
    rating: 5
  }
];

export default function TestimonialSection() {
  return (
    <section className="py-24 bg-stone-50 relative">
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-amber-200 to-transparent" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <motion.span 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-amber-600 font-medium tracking-wider uppercase text-sm mb-3 block"
          >
            Voces
          </motion.span>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl font-bold text-gray-900 font-display"
          >
            Lo Que Dicen Nuestros Invitados
          </motion.h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
              className="bg-white p-10 rounded-2xl shadow-sm border border-stone-100 hover:shadow-xl hover:border-amber-100 transition-all duration-300 relative group"
            >
              <div className="text-amber-200 absolute top-8 right-8 transition-transform duration-500 group-hover:scale-110 group-hover:text-amber-300">
                <Quote size={48} />
              </div>
              
              <div className="flex gap-1 mb-6 text-amber-500 relative z-10">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} size={18} fill="currentColor" />
                ))}
              </div>
              
              <p className="text-gray-700 leading-relaxed mb-8 relative z-10 italic">
                &quot;{testimonial.text}&quot;
              </p>
              
              <div className="relative z-10">
                <p className="font-bold text-gray-900">{testimonial.author}</p>
                <p className="text-amber-600 text-sm font-medium">{testimonial.role}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
