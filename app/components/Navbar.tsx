"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { Menu, X, UtensilsCrossed } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      aria-label="Navegación principal"
      className={cn(
        "fixed left-0 right-0 top-[37px] z-50 transition-all duration-300",
        scrolled
          ? "bg-[#fbf8f3]/95 py-3 shadow-[0_8px_30px_rgba(44,31,22,.08)] backdrop-blur-xl"
          : "bg-transparent py-5 sm:py-6"
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          <Link href="/" aria-label="Sabor Auténtico, inicio" className="group flex items-center gap-3">
            <div className="rounded-xl bg-[#b85b32] p-2.5 text-white shadow-lg shadow-[#b85b32]/20 transition-colors group-hover:bg-[#8e4327]">
              <UtensilsCrossed size={24} />
            </div>
            <span className={cn("text-lg font-semibold tracking-tight transition-colors sm:text-xl", scrolled ? "text-[#29231f]" : "text-white")}>
              Sabor <span className={scrolled ? "text-[#b85b32]" : "text-[#e3a36d]"}>Auténtico</span>
            </span>
          </Link>

          <div className="hidden md:flex items-center gap-8">
            <NavLink href="/" scrolled={scrolled}>Inicio</NavLink>
            <NavLink href="/#menu" scrolled={scrolled}>Menú</NavLink>
            <NavLink href="/#story" scrolled={scrolled}>Historia</NavLink>
            <Link
              href="/#reservas"
              className="rounded-full bg-[#b85b32] px-6 py-3 font-semibold text-white shadow-lg shadow-[#b85b32]/20 transition-all hover:-translate-y-0.5 hover:bg-[#8e4327]"
            >
              Reservar Mesa
            </Link>
          </div>

          <button
            onClick={() => setIsOpen(!isOpen)}
            type="button"
            aria-label={isOpen ? "Cerrar menú" : "Abrir menú"}
            aria-expanded={isOpen}
            aria-controls="mobile-navigation"
            className={cn("rounded-lg p-2 transition-colors focus-visible:outline-offset-2 md:hidden", scrolled ? "text-[#29231f] hover:text-[#b85b32]" : "text-white hover:text-[#e3a36d]")}
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            id="mobile-navigation"
            className="overflow-hidden border-t border-[#eadfd4] bg-[#fbf8f3]/95 backdrop-blur-xl md:hidden"
          >
            <div className="px-4 py-6 space-y-4 flex flex-col items-center">
              <MobileNavLink href="/" onClick={() => setIsOpen(false)}>
                Inicio
              </MobileNavLink>
              <MobileNavLink href="/#menu" onClick={() => setIsOpen(false)}>
                Menú
              </MobileNavLink>
              <MobileNavLink href="/#story" onClick={() => setIsOpen(false)}>
                Historia
              </MobileNavLink>
              <Link
                href="/#reservas"
                onClick={() => setIsOpen(false)}
                className="w-full text-center px-6 py-3 bg-amber-600 text-white font-medium rounded-full hover:bg-amber-700 transition-all"
              >
                Reservar Mesa
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}

function NavLink({
  href,
  children,
  scrolled,
}: {
  href: string;
  children: React.ReactNode;
  scrolled: boolean;
}) {
  return (
    <Link
      href={href}
      className={cn(
        "group relative font-medium transition-colors",
        scrolled ? "text-[#5c5149] hover:text-[#b85b32]" : "text-white/85 hover:text-white"
      )}
    >
      {children}
      <span className={cn("absolute -bottom-1 left-0 h-0.5 w-0 transition-all group-hover:w-full", scrolled ? "bg-[#b85b32]" : "bg-[#e3a36d]")} />
    </Link>
  );
}

function MobileNavLink({
  href,
  onClick,
  children,
}: {
  href: string;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className="text-lg font-medium text-gray-800 hover:text-amber-600 transition-colors"
    >
      {children}
    </Link>
  );
}
