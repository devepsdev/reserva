"use client";

import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
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
  const containerRef = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const yMove = useTransform(
    scrollYProgress,
    [0, 1],
    reduceMotion ? [0, 0] : [alignment === "left" ? 30 : -30, alignment === "left" ? -30 : 30]
  );
  const opacity = useTransform(
    scrollYProgress,
    [0, 0.2, 0.8, 1],
    reduceMotion ? [1, 1, 1, 1] : [0, 1, 1, 0]
  );
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], reduceMotion ? [1, 1, 1] : [0.96, 1, 0.96]);
  return (
    <section
      ref={containerRef}
      className={cn(
        "relative flex min-h-[78vh] items-center justify-center overflow-hidden px-5 py-24 sm:px-8 lg:py-32",
        className
      )}
    >
      <div className="max-w-7xl w-full mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        {/* Text Content */}
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: reduceMotion ? 0 : 0.6, ease: "easeOut" }}
          className={cn(
            "z-10 px-1 py-4 sm:px-5 lg:py-8",
            alignment === "left" ? "md:order-2" : "md:order-1"
          )}
        >
          <div className="max-w-xl">
            <span className="mb-5 block text-xs font-semibold uppercase tracking-[.24em] text-[#a65230]">
              Sabor Auténtico <span className="mx-2 text-stone-300">/</span> Hecho con intención
            </span>
            <h2 className="font-editorial mb-6 text-5xl leading-[1.02] tracking-[-.035em] text-[#30251f] sm:text-6xl">
              {title}
            </h2>
            <div className="mb-6 h-px w-16 bg-[#bf7047]" />
            <p className="text-lg leading-8 text-[#716860] text-balance">
              {description}
            </p>
          </div>
        </motion.div>

        {/* Image Content */}
        <motion.div
          style={{ y: yMove, scale, opacity }}
          initial={reduceMotion ? false : { x: alignment === "left" ? -30 : 30 }}
          whileInView={{ x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: reduceMotion ? 0 : 0.7, ease: "easeOut", delay: reduceMotion ? 0 : 0.1 }}
          className={cn(
            "group relative aspect-[5/4] overflow-hidden rounded-[2rem] shadow-[0_35px_90px_rgba(44,31,22,.18)] md:aspect-[4/3]",
            alignment === "left" ? "md:order-1" : "md:order-2"
          )}
        >
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-[1.04] motion-reduce:transition-none"
            style={{ backgroundImage: `url(${imageSrc})` }}
          />
          <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-[#201914]/55 via-transparent to-white/5" />
          <div className="absolute bottom-5 left-5 rounded-full border border-white/30 bg-black/20 px-4 py-2 text-xs font-medium tracking-wide text-white backdrop-blur-md sm:bottom-7 sm:left-7">
            Del origen a tu mesa
          </div>
        </motion.div>
      </div>
    </section>
  );
}
