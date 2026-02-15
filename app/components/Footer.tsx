import Link from "next/link";
import { Facebook, Instagram, Twitter, MapPin, Phone, Mail } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          <div>
            <h3 className="text-white text-xl font-bold mb-4">Sabor Auténtico</h3>
            <p className="text-gray-400 mb-6">
              Experiencias culinarias que despiertan los sentidos. Tradición y
              vanguardia en cada plato.
            </p>
            <div className="flex gap-4">
              <SocialLink href="#" icon={<Facebook size={20} />} />
              <SocialLink href="#" icon={<Instagram size={20} />} />
              <SocialLink href="#" icon={<Twitter size={20} />} />
            </div>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4">Enlaces Rápidos</h4>
            <ul className="space-y-2">
              <FooterLink href="/">Inicio</FooterLink>
              <FooterLink href="/#menu">Nuestra Carta</FooterLink>
              <FooterLink href="/#reservas">Reservas</FooterLink>
              <FooterLink href="/admin">Acceso Staff</FooterLink>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4">Horario</h4>
            <ul className="space-y-2 text-gray-400">
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
            <h4 className="text-white font-semibold mb-4">Contacto</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 text-gray-400">
                <MapPin className="text-amber-600 shrink-0" size={20} />
                <span>Calle Gastronomía 123,<br />Ciudad del Sabor, CP 28000</span>
              </li>
              <li className="flex items-center gap-3 text-gray-400">
                <Phone className="text-amber-600 shrink-0" size={20} />
                <span>+34 912 345 678</span>
              </li>
              <li className="flex items-center gap-3 text-gray-400">
                <Mail className="text-amber-600 shrink-0" size={20} />
                <span>reservas@saborautentico.com</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8 text-center text-sm text-gray-500">
          <p>© {new Date().getFullYear()} Sabor Auténtico. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  );
}

function SocialLink({ href, icon }: { href: string; icon: React.ReactNode }) {
  return (
    <Link
      href={href}
      className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-amber-600 hover:text-white transition-all duration-300"
    >
      {icon}
    </Link>
  );
}

function FooterLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <li>
      <Link href={href} className="text-gray-400 hover:text-amber-500 transition-colors block">
        {children}
      </Link>
    </li>
  );
}
