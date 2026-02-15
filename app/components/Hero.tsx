"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image with Dark Overlay */}
      <div 
        className="absolute inset-0 z-0 bg-cover bg-center bg-fixed"
        style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80')",
        }}
      >
        <div className="absolute inset-0 bg-black/50" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <span className="text-amber-400 font-medium tracking-wider uppercase mb-4 block">
            Bienvenidos a Sabor Auténtico
          </span>
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 font-display">
            Experiencia Culinaria <br />
            <span className="text-amber-500">Inolvidable</span>
          </h1>
          <p className="text-xl text-gray-200 mb-10 max-w-2xl mx-auto text-balance">
            Descubre la fusión perfecta entre tradición y modernidad. 
            Ingredientes locales, pasión global.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link
              href="#reservas"
              className="group px-8 py-4 bg-amber-600 text-white rounded-full font-semibold text-lg hover:bg-amber-700 transition-all flex items-center gap-2"
            >
              Reservar Mesa
              <ArrowRight className="group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              href="#menu"
              className="px-8 py-4 bg-white/10 backdrop-blur-sm border border-white/20 text-white rounded-full font-semibold text-lg hover:bg-white/20 transition-all"
            >
              Ver Menú
            </Link>
          </div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 text-white flex flex-col items-center gap-2"
      >
        <span className="text-sm font-light tracking-widest text-white/70">DESCUBRE MÁS</span>
        <div className="w-px h-16 bg-gradient-to-b from-amber-500 to-transparent" />
      </motion.div>
    </section>
  );
}
