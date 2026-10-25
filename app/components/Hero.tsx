"use client";

import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import Link from "next/link";
import { ArrowDown, ArrowRight, Sparkles } from "lucide-react";

const heroImage =
  "https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=85";

export default function Hero() {
  const heroRef = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const backgroundY = useTransform(
    scrollYProgress,
    [0, 1],
    reduceMotion ? [0, 0] : [0, 110]
  );
  const backgroundScale = useTransform(
    scrollYProgress,
    [0, 1],
    reduceMotion ? [1, 1] : [1.04, 1.14]
  );

  return (
    <section
      ref={heroRef}
      aria-labelledby="hero-title"
      className="relative isolate flex min-h-[calc(100svh-37px)] items-center overflow-hidden bg-[#201914] text-white"
    >
      <motion.div
        aria-hidden="true"
        className="absolute inset-0 -inset-y-24 z-[-2] bg-cover bg-center"
        style={{ backgroundImage: `url('${heroImage}')`, y: backgroundY, scale: backgroundScale }}
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 z-[-1] bg-[linear-gradient(90deg,rgba(24,18,14,.88)_0%,rgba(32,23,17,.72)_48%,rgba(29,20,16,.25)_100%)]"
      />
      <div aria-hidden="true" className="editorial-grain pointer-events-none absolute inset-0 z-[-1] opacity-20 mix-blend-soft-light" />

      <div className="mx-auto grid w-full max-w-7xl grid-cols-1 items-center gap-12 px-6 pb-24 pt-28 sm:px-10 lg:grid-cols-[1.15fr_.85fr] lg:px-12 lg:pb-28 lg:pt-32">
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: reduceMotion ? 0 : 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="relative z-10 max-w-3xl"
        >
          <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-xs font-semibold uppercase tracking-[.2em] text-[#f2c28e] backdrop-blur-sm">
            <Sparkles size={14} aria-hidden="true" />
            Cocina de temporada · producto local
          </div>
          <h1 id="hero-title" className="font-editorial text-[clamp(3.5rem,8vw,7.2rem)] leading-[.92] tracking-[-.055em] text-white">
            Una mesa
            <br />
            <span className="text-[#e3a36d]">para recordar.</span>
          </h1>
          <p className="mt-7 max-w-xl text-base leading-7 text-white/75 sm:text-lg sm:leading-8">
            Tradición, producto de temporada y una cocina hecha para disfrutarse sin prisa.
            Ven por el sabor; quédate por el momento.
          </p>

          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <Link
              href="#reservas"
              className="group inline-flex min-h-14 items-center justify-center gap-3 rounded-full bg-[#bd6237] px-7 py-4 font-semibold text-white shadow-[0_14px_40px_rgba(128,54,26,.3)] transition hover:-translate-y-0.5 hover:bg-[#a94f2b] focus-visible:outline-white"
            >
              Reserva tu mesa
              <ArrowRight size={18} aria-hidden="true" className="transition-transform group-hover:translate-x-1" />
            </Link>
            <Link
              href="#menu"
              className="inline-flex min-h-14 items-center justify-center rounded-full border border-white/30 bg-white/[.07] px-7 py-4 font-medium text-white backdrop-blur-sm transition hover:border-white/60 hover:bg-white/[.14] focus-visible:outline-white"
            >
              Descubre nuestra cocina
            </Link>
          </div>
        </motion.div>

        <div className="relative hidden min-h-[420px] items-center justify-center lg:flex" aria-hidden="true">
          <motion.div
            initial={reduceMotion ? false : { opacity: 0, scale: 0.85, rotate: -12 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ duration: reduceMotion ? 0 : 1, delay: reduceMotion ? 0 : 0.25 }}
            className="relative flex h-[330px] w-[330px] items-center justify-center rounded-full border border-white/25 bg-white/[.06] shadow-[0_30px_100px_rgba(0,0,0,.18)] backdrop-blur-sm"
          >
            <div className="seal-turn absolute inset-3 rounded-full border border-dashed border-[#e8b482]/60" />
            <div className="flex h-[248px] w-[248px] flex-col items-center justify-center rounded-full border border-white/30 text-center">
              <Sparkles size={24} className="mb-4 text-[#e3a36d]" />
              <span className="font-editorial text-4xl leading-tight text-white">Sabor<br />con raíces</span>
              <span className="mt-4 text-[10px] font-semibold uppercase tracking-[.28em] text-white/65">Sabor Auténtico · desde siempre</span>
            </div>
            <div className="absolute -right-6 top-10 flex h-20 w-20 rotate-12 items-center justify-center rounded-full bg-[#e6b27f] text-center text-[10px] font-bold uppercase leading-tight tracking-wider text-[#38251a] shadow-lg">
              cada día<br />mejor
            </div>
          </motion.div>
          <div className="absolute bottom-3 right-3 max-w-[180px] border-l border-[#e3a36d] pl-4 text-sm leading-6 text-white/70">
            Un homenaje a la cocina honesta y a quienes la hacen posible.
          </div>
        </div>
      </div>

      <Link
        href="#story"
        className="absolute bottom-6 left-1/2 flex -translate-x-1/2 flex-col items-center gap-2 text-[10px] font-semibold uppercase tracking-[.25em] text-white/65 transition hover:text-white sm:bottom-8"
      >
        Explora
        <ArrowDown size={16} aria-hidden="true" />
      </Link>
    </section>
  );
}
