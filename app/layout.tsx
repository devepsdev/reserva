import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import SessionProvider from "@/app/components/SessionProvider";
import Navbar from "@/app/components/Navbar";
import Footer from "@/app/components/Footer";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Reservas - Restaurante",
  description: "Sistema de reservas para restaurante",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className="scroll-smooth" data-scroll-behavior="smooth">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{__html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Restaurant",
            "name": "Sabor Auténtico",
            "description": "Restaurante de cocina de autor en Barcelona. Reservas online.",
            "address": {
              "@type": "PostalAddress",
              "streetAddress": "Calle Gastronomía 123",
              "addressLocality": "Barcelona",
              "addressCountry": "ES"
            },
            "servesCuisine": "Cocina de autor",
            "url": "https://reserva-deveps.vercel.app",
            "priceRange": "€€€"
          })}}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-gray-50 flex flex-col min-h-screen`}
      >
        {/* Banner demo DevEps */}
        <div style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 9999,
          backgroundColor: "#1a1a2e",
          color: "white",
          fontSize: "13px",
          textAlign: "center",
          padding: "8px 16px",
        }}>
          Esto es un proyecto de demostración de{" "}
          <a
            href="https://deveps.dev"
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: "#FF6B00", fontWeight: 600, textDecoration: "none" }}
          >
            DevEps
          </a>
          {" — "}
          <a
            href="https://deveps.dev/#contacto"
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: "white", textDecoration: "underline" }}
          >
            ¿Quieres una web así para tu restaurante?
          </a>
        </div>

        {/* Botón flotante DevEps */}
        <a
          href="https://deveps.dev"
          target="_blank"
          rel="noopener noreferrer"
          className="deveps-float-btn"
          style={{
            position: "fixed",
            bottom: "24px",
            left: "24px",
            zIndex: 9999,
            backgroundColor: "#FF6B00",
            color: "white",
            padding: "8px 16px",
            borderRadius: "9999px",
            fontSize: "14px",
            fontWeight: 600,
            textDecoration: "none",
            boxShadow: "0 2px 8px rgba(0,0,0,0.2)",
            transition: "box-shadow 0.2s",
          }}
        >
          ← DevEps
        </a>

        <SessionProvider>
          {/* padding-top para compensar el banner fijo (≈37px) */}
          <div style={{ paddingTop: "37px" }}>
            <Navbar />
            <main className="flex-grow pt-0">{children}</main>
            <Footer />
          </div>
        </SessionProvider>
      </body>
    </html>
  );
}
