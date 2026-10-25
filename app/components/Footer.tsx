import Link from "next/link";
import { Facebook, Instagram, Twitter, MapPin, Phone, Mail } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-[#241d18] pt-16 pb-8 text-[#ded3c8]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          <div>
            <h3 className="mb-4 text-xl font-bold text-white">Sabor Auténtico</h3>
            <p className="mb-6 text-[#b9aaa0]">
              Experiencias culinarias que despiertan los sentidos. Tradición y
              vanguardia en cada plato.
            </p>
            <div className="flex gap-4">
              <SocialLink href="#" label="Facebook" icon={<Facebook size={20} />} />
              <SocialLink href="#" label="Instagram" icon={<Instagram size={20} />} />
              <SocialLink href="#" label="Twitter" icon={<Twitter size={20} />} />
            </div>
          </div>

          <div>
            <h4 className="mb-4 font-semibold text-white">Enlaces Rápidos</h4>
            <ul className="space-y-2">
              <FooterLink href="/">Inicio</FooterLink>
              <FooterLink href="/#menu">Nuestra Carta</FooterLink>
              <FooterLink href="/#reservas">Reservas</FooterLink>
              <FooterLink href="/admin">Acceso Staff</FooterLink>
            </ul>
          </div>

          <div>
            <h4 className="mb-4 font-semibold text-white">Horario</h4>
            <ul className="space-y-2 text-[#b9aaa0]">
              <li className="flex justify-between">
                <span>Lunes - Jueves</span>
                <span>13:00 - 23:00</span>
              </li>
              <li className="flex justify-between">
                <span>Viernes - Sábados</span>
                <span>13:00 - 00:00</span>
              </li>
              <li className="flex justify-between">
                <span>Domingos</span>
                <span>13:00 - 17:00</span>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="mb-4 font-semibold text-white">Contacto</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 text-[#b9aaa0]">
                <MapPin className="shrink-0 text-[#d8895b]" size={20} />
                <span>Calle Gastronomía 123,<br />Ciudad del Sabor, CP 28000</span>
              </li>
              <li className="flex items-center gap-3 text-[#b9aaa0]">
                <Phone className="shrink-0 text-[#d8895b]" size={20} />
                <span>+34 912 345 678</span>
              </li>
              <li className="flex items-center gap-3 text-[#b9aaa0]">
                <Mail className="shrink-0 text-[#d8895b]" size={20} />
                <span>reservas@saborautentico.com</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 pt-8 text-center text-sm text-[#a49489]">
          <p>
            © 2026 Sabor Auténtico — Proyecto demo por{" "}
            <a
              href="https://deveps.dev"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#e3a36d] transition-colors hover:text-[#f0c29a]"
            >
              DevEps
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}

function SocialLink({ href, label, icon }: { href: string; label: string; icon: React.ReactNode }) {
  return (
    <Link
      href={href}
      aria-label={label}
      className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 transition-all duration-300 hover:bg-[#b85b32] hover:text-white"
    >
      {icon}
    </Link>
  );
}

function FooterLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <li>
      <Link href={href} className="block text-[#b9aaa0] transition-colors hover:text-[#e3a36d]">
        {children}
      </Link>
    </li>
  );
}
