"use client";

import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";

interface Table {
  id: number;
  number: number;
  capacity: number;
}

export default function ReservationSection() {
  const reduceMotion = useReducedMotion();
  const [step, setStep] = useState<"search" | "select" | "form" | "success">("search");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [guests, setGuests] = useState(2);
  const [availableTables, setAvailableTables] = useState<Table[]>([]);
  const [selectedTable, setSelectedTable] = useState<Table | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Form fields
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [notes, setNotes] = useState("");

  const searchAvailability = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch(
        `/api/reservations/available?date=${date}&time=${time}&guests=${guests}`
      );
      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Error al buscar disponibilidad");
        return;
      }

      setAvailableTables(data);
      if (data.length === 0) {
        setError("No hay mesas disponibles para esa fecha y hora. Intenta con otro horario.");
      } else {
        setStep("select");
      }
    } catch {
      setError("Error de conexión");
    } finally {
      setLoading(false);
    }
  };

  const selectTable = (table: Table) => {
    setSelectedTable(table);
    setStep("form");
  };

  const submitReservation = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/reservations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          phone,
          date: `${date}T${time}`,
          guests,
          tableId: selectedTable!.id,
          notes: notes || null,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Error al crear la reserva");
        return;
      }

      setStep("success");
    } catch {
      setError("Error de conexión");
    } finally {
      setLoading(false);
    }
  };

  const reset = () => {
    setStep("search");
    setDate("");
    setTime("");
    setGuests(2);
    setAvailableTables([]);
    setSelectedTable(null);
    setName("");
    setEmail("");
    setPhone("");
    setNotes("");
    setError("");
  };

  return (
    <section id="reservas" className="relative overflow-hidden bg-[#f2e9df] py-24 sm:py-32">
      <div aria-hidden="true" className="pointer-events-none absolute -right-28 -top-32 h-96 w-96 rounded-full border border-[#d8c6b6] sm:-right-12" />
      <div aria-hidden="true" className="pointer-events-none absolute -right-12 -top-16 h-64 w-64 rounded-full border border-[#d8c6b6]" />
      <div className="relative mx-auto max-w-4xl px-4 sm:px-6">
        <div className="mb-12 text-center">
          <span className="mb-4 block text-xs font-semibold uppercase tracking-[.25em] text-[#a65230]">Tu próxima historia empieza aquí</span>
          <h2 className="font-editorial mb-4 text-5xl tracking-[-.04em] text-[#30251f] sm:text-6xl">Reserva tu mesa</h2>
          <p className="text-[#716860]">Asegura tu experiencia gastronómica con nosotros</p>
        </div>

        {/* Progress indicator */}
        <div role="list" aria-label="Progreso de la reserva" className="mb-8 flex items-center justify-center gap-2">
          {["Buscar", "Elegir mesa", "Datos", "Confirmado"].map((label, i) => {
            const steps = ["search", "select", "form", "success"];
            const currentIndex = steps.indexOf(step);
            const isActive = i <= currentIndex;
            return (
              <div key={label} role="listitem" className="flex items-center gap-2">
                <div
                  aria-current={i === currentIndex ? "step" : undefined}
                  className={`flex h-9 w-9 items-center justify-center rounded-full text-sm font-semibold transition-colors ${
                    isActive
                      ? "bg-[#b85b32] text-white shadow-md shadow-[#b85b32]/20"
                      : "bg-[#e1d7cd] text-[#786d65]"
                  }`}
                >
                  {i + 1}
                </div>
                <span
                  className={`text-sm hidden sm:inline transition-colors ${
                    isActive ? "font-semibold text-[#8e4327]" : "text-[#9a8f86]"
                  }`}
                >
                  {label}
                </span>
                {i < 3 && (
                  <div
                    className={`w-8 h-0.5 transition-colors ${
                      i < currentIndex ? "bg-[#b85b32]" : "bg-[#d8cbc0]"
                    }`}
                  />
                )}
              </div>
            );
          })}
        </div>

        {error && (
          <div role="alert" className="mb-6 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-red-800">
            {error}
          </div>
        )}

        <motion.div
          key={step}
          initial={reduceMotion ? false : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={reduceMotion ? undefined : { opacity: 0, y: -20 }}
          transition={{ duration: reduceMotion ? 0 : 0.3 }}
        >
          {/* Step 1: Search */}
          {step === "search" && (
            <div className="rounded-3xl border border-white/80 bg-[#fffdfa] p-6 shadow-[0_25px_70px_rgba(67,45,29,.09)] md:p-9">
              <h2 className="mb-6 text-xl font-semibold text-[#30251f]">
                Buscar disponibilidad
              </h2>
              <form onSubmit={searchAvailability} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label htmlFor="reservation-date" className="mb-1 block text-sm font-medium text-[#544a43]">
                      Fecha
                    </label>
                    <input
                      type="date"
                      id="reservation-date"
                      value={date}
                      onChange={(e) => setDate(e.target.value)}
                      min={new Date().toISOString().split("T")[0]}
                      required
                      className="w-full rounded-xl border border-[#ddd2c7] bg-white px-4 py-3 text-[#29231f] outline-none transition-shadow focus:border-[#b85b32] focus:ring-2 focus:ring-[#b85b32]/20"
                    />
                  </div>
                  <div>
                    <label htmlFor="reservation-time" className="mb-1 block text-sm font-medium text-[#544a43]">
                      Hora
                    </label>
                    <input
                      type="time"
                      id="reservation-time"
                      value={time}
                      onChange={(e) => setTime(e.target.value)}
                      required
                      className="w-full rounded-xl border border-[#ddd2c7] bg-white px-4 py-3 text-[#29231f] outline-none transition-shadow focus:border-[#b85b32] focus:ring-2 focus:ring-[#b85b32]/20"
                    />
                  </div>
                  <div>
                    <label htmlFor="reservation-guests" className="mb-1 block text-sm font-medium text-[#544a43]">
                      Personas
                    </label>
                    <select
                      id="reservation-guests"
                      value={guests}
                      onChange={(e) => setGuests(Number(e.target.value))}
                      className="w-full rounded-xl border border-[#ddd2c7] bg-white px-4 py-3 text-[#29231f] outline-none transition-shadow focus:border-[#b85b32] focus:ring-2 focus:ring-[#b85b32]/20"
                    >
                      {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((n) => (
                        <option key={n} value={n}>
                          {n} {n === 1 ? "persona" : "personas"}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full rounded-full bg-[#b85b32] px-7 py-3.5 font-semibold text-white shadow-lg shadow-[#b85b32]/20 transition hover:-translate-y-0.5 hover:bg-[#8e4327] disabled:opacity-50 sm:w-auto"
                >
                  {loading ? "Buscando..." : "Buscar mesas disponibles"}
                </button>
              </form>
            </div>
          )}

          {/* Step 2: Select table */}
          {step === "select" && (
            <div className="rounded-3xl border border-white/80 bg-[#fffdfa] p-6 shadow-[0_25px_70px_rgba(67,45,29,.09)] md:p-9">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-[#30251f]">
                  Mesas disponibles
                </h2>
                <button
                  onClick={() => setStep("search")}
                  className="text-sm font-semibold text-[#a65230] underline-offset-4 hover:underline"
                >
                  ← Cambiar búsqueda
                </button>
              </div>
              <p className="mb-5 inline-block rounded-full border border-[#e9ddd2] bg-[#f8f2ec] px-4 py-2 text-sm text-[#665a50]">
                {date} a las {time} — {guests}{" "}
                {guests === 1 ? "persona" : "personas"}
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {availableTables.map((table) => (
                  <button
                    key={table.id}
                    onClick={() => selectTable(table)}
                    className="group rounded-2xl border border-[#e6d9ce] bg-white p-5 text-left transition-all hover:-translate-y-1 hover:border-[#bf7047] hover:bg-[#fff9f4] hover:shadow-lg"
                  >
                    <div className="text-lg font-semibold text-[#30251f] group-hover:text-[#a65230]">
                      Mesa {table.number}
                    </div>
                    <div className="mt-1 text-sm text-[#716860]">
                      Capacidad: {table.capacity} personas
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Step 3: Reservation form */}
          {step === "form" && (
            <div className="rounded-3xl border border-white/80 bg-[#fffdfa] p-6 shadow-[0_25px_70px_rgba(67,45,29,.09)] md:p-9">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-[#30251f]">
                  Completa tu reserva
                </h2>
                <button
                  onClick={() => setStep("select")}
                  className="text-sm font-semibold text-[#a65230] underline-offset-4 hover:underline"
                >
                  ← Cambiar mesa
                </button>
              </div>

              <div className="mb-6 rounded-2xl border border-[#ead6c7] bg-[#fbf1e9] p-4">
                <p className="text-sm text-[#713c2b]">
                  <strong>Mesa {selectedTable?.number}</strong> — {date} a las{" "}
                  {time} — {guests} {guests === 1 ? "persona" : "personas"}
                </p>
              </div>

              <form onSubmit={submitReservation} className="space-y-4">
                <div>
                  <label htmlFor="reservation-name" className="mb-1 block text-sm font-medium text-[#544a43]">
                    Nombre completo
                  </label>
                  <input
                    type="text"
                    id="reservation-name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    className="w-full rounded-xl border border-[#ddd2c7] bg-white px-4 py-3 text-[#29231f] outline-none transition-shadow focus:border-[#b85b32] focus:ring-2 focus:ring-[#b85b32]/20"
                  />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="reservation-email" className="mb-1 block text-sm font-medium text-[#544a43]">
                      Email
                    </label>
                    <input
                      type="email"
                      id="reservation-email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className="w-full rounded-xl border border-[#ddd2c7] bg-white px-4 py-3 text-[#29231f] outline-none transition-shadow focus:border-[#b85b32] focus:ring-2 focus:ring-[#b85b32]/20"
                    />
                  </div>
                  <div>
                    <label htmlFor="reservation-phone" className="mb-1 block text-sm font-medium text-[#544a43]">
                      Teléfono
                    </label>
                    <input
                      type="tel"
                      id="reservation-phone"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      required
                      className="w-full rounded-xl border border-[#ddd2c7] bg-white px-4 py-3 text-[#29231f] outline-none transition-shadow focus:border-[#b85b32] focus:ring-2 focus:ring-[#b85b32]/20"
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="reservation-notes" className="mb-1 block text-sm font-medium text-[#544a43]">
                    Notas especiales (alergias, celebraciones, etc.)
                  </label>
                  <textarea
                    id="reservation-notes"
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    rows={3}
                    className="w-full rounded-xl border border-[#ddd2c7] bg-white px-4 py-3 text-[#29231f] outline-none transition-shadow focus:border-[#b85b32] focus:ring-2 focus:ring-[#b85b32]/20"
                  />
                </div>
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full rounded-full bg-[#b85b32] px-7 py-3.5 font-semibold text-white shadow-lg shadow-[#b85b32]/20 transition hover:-translate-y-0.5 hover:bg-[#8e4327] disabled:opacity-50"
                >
                  {loading ? "Reservando..." : "Confirmar reserva"}
                </button>
              </form>
            </div>
          )}

          {/* Step 4: Success */}
          {step === "success" && (
            <div role="status" aria-live="polite" className="rounded-3xl border border-white/80 bg-[#fffdfa] p-6 text-center shadow-[0_25px_70px_rgba(67,45,29,.09)] md:p-9">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-[#e8f1e7]">
                <svg
                  className="h-8 w-8 text-green-700"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
              <h2 className="font-editorial mb-2 text-3xl font-semibold text-[#30251f]">
                ¡Reserva confirmada!
              </h2>
              <p className="mb-6 text-[#716860]">
                Te esperamos con los brazos abiertos. Hemos enviado los detalles a tu email.
              </p>
              <div className="mb-6 inline-block rounded-2xl border border-[#e9ddd2] bg-[#f8f2ec] p-4 text-left">
                <p className="text-sm text-[#544a43]">
                  <strong>Mesa {selectedTable?.number}</strong>
                </p>
                <p className="text-sm text-[#544a43]">
                  {date} a las {time}
                </p>
                <p className="text-sm text-[#544a43]">
                  {guests} {guests === 1 ? "persona" : "personas"}
                </p>
                <p className="text-sm text-[#544a43]">{name}</p>
              </div>
              <div>
                <button
                  onClick={reset}
                  className="rounded-full bg-[#b85b32] px-7 py-3.5 font-semibold text-white shadow-lg transition hover:bg-[#8e4327]"
                >
                  Hacer otra reserva
                </button>
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </section>
  );
}
