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
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        scrolled
          ? "bg-white/80 backdrop-blur-md shadow-sm py-4"
          : "bg-transparent py-6"
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 group">
            <div className="bg-amber-600 p-2 rounded-lg text-white group-hover:bg-amber-700 transition-colors">
              <UtensilsCrossed size={24} />
            </div>
            <span className="text-xl font-bold text-gray-900 tracking-tight">
              Sabor <span className="text-amber-600">Auténtico</span>
            </span>
          </Link>

          <div className="hidden md:flex items-center gap-8">
            <NavLink href="/">Inicio</NavLink>
            <NavLink href="/#menu">Menú</NavLink>
            <NavLink href="/#story">Historia</NavLink>
            <Link
              href="/#reservas"
              className="px-6 py-2.5 bg-amber-600 text-white font-medium rounded-full hover:bg-amber-700 transition-all shadow-lg shadow-amber-600/20"
            >
              Reservar Mesa
            </Link>
          </div>

          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 text-gray-700 hover:text-amber-600 transition-colors"
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
            className="md:hidden bg-white/95 backdrop-blur-md border-t border-gray-100 overflow-hidden"
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
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      className="text-gray-600 hover:text-amber-600 font-medium transition-colors relative group"
    >
      {children}
      <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-amber-600 transition-all group-hover:w-full" />
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
