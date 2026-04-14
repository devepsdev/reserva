"use client";

import { motion } from "framer-motion";

const dishes = [
  {
    name: "Ceviche de la Casa",
    description: "Pesca del día con leche de tigre al ají amarillo, camote glaseado y maíz chulpi.",
    price: "$24",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/78/Cebiche_de_corvina.JPG/960px-Cebiche_de_corvina.JPG"
  },
  {
    name: "Lomo Saltado Premium",
    description: "Cortes seleccionados de res, flameados al wok con tomates cherry, cebolla morada y papas andinas.",
    price: "$32",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/80/Lomo_Saltado_-_Lima%2C_Peru_Miraflores_%28Tiendecita_Blanca%29.jpg/960px-Lomo_Saltado_-_Lima%2C_Peru_Miraflores_%28Tiendecita_Blanca%29.jpg"
  },
  {
    name: "Risotto de Hongos",
    description: "Arroz arborio cremoso con selección de setas silvestres, trufa negra y parmesano reggiano.",
    price: "$28",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a5/Risotto_with_speck_and_goat_cheese_%286101067436%29.jpg/960px-Risotto_with_speck_and_goat_cheese_%286101067436%29.jpg"
  }
];

export default function FeaturedDishes() {
  return (
    <section className="py-24 bg-white relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-amber-200 to-transparent" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <motion.span 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-amber-600 font-medium tracking-wider uppercase text-sm mb-3 block"
          >
            Nuestras Especialidades
          </motion.span>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl font-bold text-gray-900 font-display"
          >
            Platos Estrella
          </motion.h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
          {dishes.map((dish, index) => (
            <motion.div
              key={dish.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
              className="group cursor-pointer"
            >
              <div className="relative aspect-[4/5] rounded-3xl overflow-hidden mb-6 shadow-lg">
                <div 
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                  style={{ backgroundImage: `url(${dish.image})` }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity" />
                
                <div className="absolute bottom-0 left-0 right-0 p-6 translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-2xl font-bold text-white font-display">
                      {dish.name}
                    </h3>
                    <span className="text-amber-400 font-semibold text-xl">
                      {dish.price}
                    </span>
                  </div>
                  <p className="text-gray-300 text-sm leading-relaxed opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
                    {dish.description}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
