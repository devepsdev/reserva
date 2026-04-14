"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface ScrollRevealSectionProps {
  imageSrc: string;
  title: string;
  description: string;
  alignment: "left" | "right";
  className?: string;
}

export default function ScrollRevealSection({
  imageSrc,
  title,
  description,
  alignment,
  className,
}: ScrollRevealSectionProps) {
  return (
    <section
      className={cn(
        "relative min-h-[80vh] flex items-center justify-center overflow-hidden py-20 px-4",
        className
      )}
    >
      <div className="max-w-7xl w-full mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        {/* Text Content */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className={cn(
            "p-8 z-10",
            alignment === "left" ? "md:order-2" : "md:order-1"
          )}
        >
          <div className="bg-white/90 backdrop-blur-sm p-8 rounded-2xl shadow-xl border border-amber-100">
            <h2 className="text-4xl font-bold text-gray-900 mb-6 font-display">
              {title}
            </h2>
            <p className="text-lg text-gray-700 leading-relaxed text-balance">
              {description}
            </p>
          </div>
        </motion.div>

        {/* Image Content */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, x: alignment === "left" ? -30 : 30 }}
          whileInView={{ opacity: 1, scale: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7, ease: "easeOut", delay: 0.1 }}
          className={cn(
            "relative aspect-square md:aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl",
            alignment === "left" ? "md:order-1" : "md:order-2"
          )}
        >
          <div
            className="absolute inset-0 bg-cover bg-center transition-transform hover:scale-110 duration-700"
            style={{ backgroundImage: `url(${imageSrc})` }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
        </motion.div>
      </div>
    </section>
  );
}
