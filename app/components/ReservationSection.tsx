"use client";

import { useState } from "react";
import { motion } from "framer-motion";

interface Table {
  id: number;
  number: number;
  capacity: number;
}

export default function ReservationSection() {
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
    <section id="reservas" className="py-20 bg-amber-50/50">
      <div className="max-w-4xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4 font-display">Reserva tu Mesa</h2>
          <p className="text-gray-600">Asegura tu experiencia gastronómica con nosotros</p>
        </div>

        {/* Progress indicator */}
        <div className="flex items-center justify-center gap-2 mb-8">
          {["Buscar", "Elegir mesa", "Datos", "Confirmado"].map((label, i) => {
            const steps = ["search", "select", "form", "success"];
            const currentIndex = steps.indexOf(step);
            const isActive = i <= currentIndex;
            return (
              <div key={label} className="flex items-center gap-2">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-colors ${
                    isActive
                      ? "bg-amber-600 text-white"
                      : "bg-gray-200 text-gray-500"
                  }`}
                >
                  {i + 1}
                </div>
                <span
                  className={`text-sm hidden sm:inline transition-colors ${
                    isActive ? "text-amber-700 font-medium" : "text-gray-400"
                  }`}
                >
                  {label}
                </span>
                {i < 3 && (
                  <div
                    className={`w-8 h-0.5 transition-colors ${
                      i < currentIndex ? "bg-amber-600" : "bg-gray-200"
                    }`}
                  />
                )}
              </div>
            );
          })}
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6">
            {error}
          </div>
        )}

        <motion.div
          key={step}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
        >
          {/* Step 1: Search */}
          {step === "search" && (
            <div className="bg-white rounded-xl shadow-lg p-6 md:p-8 border border-gray-100">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">
                Buscar disponibilidad
              </h2>
              <form onSubmit={searchAvailability} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Fecha
                    </label>
                    <input
                      type="date"
                      value={date}
                      onChange={(e) => setDate(e.target.value)}
                      min={new Date().toISOString().split("T")[0]}
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none transition-shadow"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Hora
                    </label>
                    <input
                      type="time"
                      value={time}
                      onChange={(e) => setTime(e.target.value)}
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none transition-shadow"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Personas
                    </label>
                    <select
                      value={guests}
                      onChange={(e) => setGuests(Number(e.target.value))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none transition-shadow"
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
                  className="w-full sm:w-auto px-6 py-3 bg-amber-600 text-white font-medium rounded-lg hover:bg-amber-700 disabled:opacity-50 transition-colors shadow-md hover:shadow-lg"
                >
                  {loading ? "Buscando..." : "Buscar mesas disponibles"}
                </button>
              </form>
            </div>
          )}

          {/* Step 2: Select table */}
          {step === "select" && (
            <div className="bg-white rounded-xl shadow-lg p-6 md:p-8 border border-gray-100">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-gray-900">
                  Mesas disponibles
                </h2>
                <button
                  onClick={() => setStep("search")}
                  className="text-sm text-amber-600 hover:text-amber-700 font-medium"
                >
                  ← Cambiar búsqueda
                </button>
              </div>
              <p className="text-gray-600 mb-4 bg-gray-50 p-3 rounded-lg inline-block">
                {date} a las {time} — {guests}{" "}
                {guests === 1 ? "persona" : "personas"}
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {availableTables.map((table) => (
                  <button
                    key={table.id}
                    onClick={() => selectTable(table)}
                    className="p-4 border-2 border-gray-200 rounded-xl hover:border-amber-500 hover:bg-amber-50 transition-all text-left group"
                  >
                    <div className="text-lg font-semibold text-gray-900 group-hover:text-amber-700">
                      Mesa {table.number}
                    </div>
                    <div className="text-sm text-gray-500">
                      Capacidad: {table.capacity} personas
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Step 3: Reservation form */}
          {step === "form" && (
            <div className="bg-white rounded-xl shadow-lg p-6 md:p-8 border border-gray-100">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-gray-900">
                  Completa tu reserva
                </h2>
                <button
                  onClick={() => setStep("select")}
                  className="text-sm text-amber-600 hover:text-amber-700 font-medium"
                >
                  ← Cambiar mesa
                </button>
              </div>

              <div className="bg-amber-50 rounded-lg p-4 mb-6 border border-amber-100">
                <p className="text-sm text-amber-800">
                  <strong>Mesa {selectedTable?.number}</strong> — {date} a las{" "}
                  {time} — {guests} {guests === 1 ? "persona" : "personas"}
                </p>
              </div>

              <form onSubmit={submitReservation} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Nombre completo
                  </label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none transition-shadow"
                  />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Email
                    </label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none transition-shadow"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Teléfono
                    </label>
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none transition-shadow"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Notas especiales (alergias, celebraciones, etc.)
                  </label>
                  <textarea
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none transition-shadow"
                  />
                </div>
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full px-6 py-3 bg-amber-600 text-white font-medium rounded-lg hover:bg-amber-700 disabled:opacity-50 transition-colors shadow-md hover:shadow-lg"
                >
                  {loading ? "Reservando..." : "Confirmar reserva"}
                </button>
              </form>
            </div>
          )}

          {/* Step 4: Success */}
          {step === "success" && (
            <div className="bg-white rounded-xl shadow-lg p-6 md:p-8 text-center border border-gray-100">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4 animate-bounce">
                <svg
                  className="w-8 h-8 text-green-600"
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
              <h2 className="text-2xl font-semibold text-gray-900 mb-2">
                ¡Reserva confirmada!
              </h2>
              <p className="text-gray-600 mb-6">
                Te esperamos con los brazos abiertos. Hemos enviado los detalles a tu email.
              </p>
              <div className="bg-gray-50 rounded-lg p-4 mb-6 inline-block text-left border border-gray-200">
                <p className="text-sm text-gray-700">
                  <strong>Mesa {selectedTable?.number}</strong>
                </p>
                <p className="text-sm text-gray-700">
                  {date} a las {time}
                </p>
                <p className="text-sm text-gray-700">
                  {guests} {guests === 1 ? "persona" : "personas"}
                </p>
                <p className="text-sm text-gray-700">{name}</p>
              </div>
              <div>
                <button
                  onClick={reset}
                  className="px-6 py-3 bg-amber-600 text-white font-medium rounded-lg hover:bg-amber-700 transition-colors shadow-md"
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
