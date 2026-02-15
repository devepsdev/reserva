"use client";

import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useEffect, useState, useCallback } from "react";

interface Table {
  id: number;
  number: number;
  capacity: number;
}

interface Reservation {
  id: number;
  name: string;
  email: string;
  phone: string;
  date: string;
  guests: number;
  duration: number;
  status: "PENDING" | "CONFIRMED" | "CANCELLED" | "COMPLETED";
  tableId: number;
  table: Table;
  notes: string | null;
  createdAt: string;
}

const statusColors: Record<string, string> = {
  PENDING: "bg-yellow-100 text-yellow-800",
  CONFIRMED: "bg-green-100 text-green-800",
  CANCELLED: "bg-red-100 text-red-800",
  COMPLETED: "bg-blue-100 text-blue-800",
};

const statusLabels: Record<string, string> = {
  PENDING: "Pendiente",
  CONFIRMED: "Confirmada",
  CANCELLED: "Cancelada",
  COMPLETED: "Completada",
};

export default function DashboardPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [loading, setLoading] = useState(true);
  const [filterDate, setFilterDate] = useState("");
  const [filterStatus, setFilterStatus] = useState("");

  const fetchReservations = useCallback(async () => {
    try {
      const res = await fetch("/api/reservations");
      const data = await res.json();
      setReservations(data);
    } catch (error) {
      console.error("Error fetching reservations:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/admin");
      return;
    }
    if (status === "authenticated") {
      fetchReservations();
    }
  }, [status, router, fetchReservations]);

  const updateStatus = async (id: number, newStatus: string) => {
    try {
      const res = await fetch(`/api/reservations/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });

      if (res.ok) {
        setReservations((prev) =>
          prev.map((r) =>
            r.id === id ? { ...r, status: newStatus as Reservation["status"] } : r
          )
        );
      }
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };

  const deleteReservation = async (id: number) => {
    if (!confirm("¿Estás seguro de que quieres eliminar esta reserva?")) return;

    try {
      const res = await fetch(`/api/reservations/${id}`, {
        method: "DELETE",
      });

      if (res.ok) {
        setReservations((prev) => prev.filter((r) => r.id !== id));
      }
    } catch (error) {
      console.error("Error deleting reservation:", error);
    }
  };

  const filtered = reservations.filter((r) => {
    if (filterStatus && r.status !== filterStatus) return false;
    if (filterDate) {
      const resDate = new Date(r.date).toISOString().split("T")[0];
      if (resDate !== filterDate) return false;
    }
    return true;
  });

  if (status === "loading" || (status === "authenticated" && loading)) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-gray-500">Cargando...</div>
      </div>
    );
  }

  if (status === "unauthenticated") return null;

  const counts = {
    total: reservations.length,
    pending: reservations.filter((r) => r.status === "PENDING").length,
    confirmed: reservations.filter((r) => r.status === "CONFIRMED").length,
    today: reservations.filter(
      (r) =>
        new Date(r.date).toDateString() === new Date().toDateString() &&
        r.status !== "CANCELLED"
    ).length,
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold text-gray-900">
              Panel de Administración
            </h1>
            <p className="text-sm text-gray-500">
              Hola, {session?.user?.name}
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Link
              href="/"
              className="text-sm text-gray-600 hover:text-gray-900"
            >
              Ver sitio
            </Link>
            <button
              onClick={() => signOut({ callbackUrl: "/admin" })}
              className="px-4 py-2 text-sm bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
            >
              Cerrar sesión
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-6">
        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-white rounded-xl shadow-sm p-4">
            <div className="text-2xl font-bold text-gray-900">{counts.today}</div>
            <div className="text-sm text-gray-500">Hoy</div>
          </div>
          <div className="bg-white rounded-xl shadow-sm p-4">
            <div className="text-2xl font-bold text-yellow-600">{counts.pending}</div>
            <div className="text-sm text-gray-500">Pendientes</div>
          </div>
          <div className="bg-white rounded-xl shadow-sm p-4">
            <div className="text-2xl font-bold text-green-600">{counts.confirmed}</div>
            <div className="text-sm text-gray-500">Confirmadas</div>
          </div>
          <div className="bg-white rounded-xl shadow-sm p-4">
            <div className="text-2xl font-bold text-gray-900">{counts.total}</div>
            <div className="text-sm text-gray-500">Total</div>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-xl shadow-sm p-4 mb-6">
          <div className="flex flex-col sm:flex-row gap-3">
            <div>
              <label className="block text-xs text-gray-500 mb-1">
                Filtrar por fecha
              </label>
              <input
                type="date"
                value={filterDate}
                onChange={(e) => setFilterDate(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
              />
            </div>
            <div>
              <label className="block text-xs text-gray-500 mb-1">
                Filtrar por estado
              </label>
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
              >
                <option value="">Todos</option>
                <option value="PENDING">Pendiente</option>
                <option value="CONFIRMED">Confirmada</option>
                <option value="CANCELLED">Cancelada</option>
                <option value="COMPLETED">Completada</option>
              </select>
            </div>
            {(filterDate || filterStatus) && (
              <div className="flex items-end">
                <button
                  onClick={() => {
                    setFilterDate("");
                    setFilterStatus("");
                  }}
                  className="px-3 py-2 text-sm text-amber-600 hover:text-amber-700"
                >
                  Limpiar filtros
                </button>
              </div>
            )}
            <div className="flex items-end ml-auto">
              <button
                onClick={() => {
                  setLoading(true);
                  fetchReservations();
                }}
                className="px-4 py-2 text-sm bg-amber-600 text-white rounded-lg hover:bg-amber-700 transition-colors"
              >
                Actualizar
              </button>
            </div>
          </div>
        </div>

        {/* Reservations table */}
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-gray-50 border-b">
                <tr>
                  <th className="text-left px-4 py-3 font-medium text-gray-600">
                    Cliente
                  </th>
                  <th className="text-left px-4 py-3 font-medium text-gray-600">
                    Fecha/Hora
                  </th>
                  <th className="text-left px-4 py-3 font-medium text-gray-600">
                    Mesa
                  </th>
                  <th className="text-left px-4 py-3 font-medium text-gray-600">
                    Personas
                  </th>
                  <th className="text-left px-4 py-3 font-medium text-gray-600">
                    Estado
                  </th>
                  <th className="text-left px-4 py-3 font-medium text-gray-600">
                    Acciones
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {filtered.length === 0 ? (
                  <tr>
                    <td
                      colSpan={6}
                      className="px-4 py-8 text-center text-gray-500"
                    >
                      No hay reservas
                      {filterDate || filterStatus
                        ? " con los filtros seleccionados"
                        : ""}
                    </td>
                  </tr>
                ) : (
                  filtered.map((r) => (
                    <tr key={r.id} className="hover:bg-gray-50">
                      <td className="px-4 py-3">
                        <div className="font-medium text-gray-900">
                          {r.name}
                        </div>
                        <div className="text-xs text-gray-500">{r.email}</div>
                        <div className="text-xs text-gray-500">{r.phone}</div>
                        {r.notes && (
                          <div className="text-xs text-amber-600 mt-1">
                            Nota: {r.notes}
                          </div>
                        )}
                      </td>
                      <td className="px-4 py-3 text-gray-700">
                        <div>
                          {new Date(r.date).toLocaleDateString("es-ES", {
                            weekday: "short",
                            day: "numeric",
                            month: "short",
                          })}
                        </div>
                        <div className="text-xs text-gray-500">
                          {new Date(r.date).toLocaleTimeString("es-ES", {
                            hour: "2-digit",
                            minute: "2-digit",
                          })}{" "}
                          ({r.duration} min)
                        </div>
                      </td>
                      <td className="px-4 py-3 text-gray-700">
                        Mesa {r.table.number}
                      </td>
                      <td className="px-4 py-3 text-gray-700">{r.guests}</td>
                      <td className="px-4 py-3">
                        <span
                          className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${
                            statusColors[r.status]
                          }`}
                        >
                          {statusLabels[r.status]}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex flex-wrap gap-1">
                          {r.status === "PENDING" && (
                            <button
                              onClick={() => updateStatus(r.id, "CONFIRMED")}
                              className="px-2 py-1 text-xs bg-green-600 text-white rounded hover:bg-green-700 transition-colors"
                            >
                              Confirmar
                            </button>
                          )}
                          {(r.status === "PENDING" ||
                            r.status === "CONFIRMED") && (
                            <button
                              onClick={() => updateStatus(r.id, "CANCELLED")}
                              className="px-2 py-1 text-xs bg-red-600 text-white rounded hover:bg-red-700 transition-colors"
                            >
                              Cancelar
                            </button>
                          )}
                          {r.status === "CONFIRMED" && (
                            <button
                              onClick={() => updateStatus(r.id, "COMPLETED")}
                              className="px-2 py-1 text-xs bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
                            >
                              Completar
                            </button>
                          )}
                          <button
                            onClick={() => deleteReservation(r.id)}
                            className="px-2 py-1 text-xs bg-gray-200 text-gray-700 rounded hover:bg-gray-300 transition-colors"
                          >
                            Eliminar
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
}
