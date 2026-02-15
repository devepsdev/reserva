import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const date = searchParams.get("date");
    const time = searchParams.get("time");
    const guests = searchParams.get("guests");
    const duration = Number(searchParams.get("duration") || 120);

    if (!date || !time || !guests) {
      return NextResponse.json(
        { error: "Parámetros requeridos: date, time, guests" },
        { status: 400 }
      );
    }

    const guestsNum = Number(guests);
    if (isNaN(guestsNum) || guestsNum < 1) {
      return NextResponse.json(
        { error: "Número de invitados inválido" },
        { status: 400 }
      );
    }

    const reservationStart = new Date(`${date}T${time}`);
    if (isNaN(reservationStart.getTime())) {
      return NextResponse.json(
        { error: "Fecha u hora inválida" },
        { status: 400 }
      );
    }

    const reservationEnd = new Date(
      reservationStart.getTime() + duration * 60000
    );

    // Buscar mesas con capacidad suficiente
    const tables = await prisma.table.findMany({
      where: {
        capacity: { gte: guestsNum },
      },
      include: {
        reservations: {
          where: {
            status: { not: "CANCELLED" },
          },
        },
      },
      orderBy: { capacity: "asc" },
    });

    // Filtrar mesas que NO tengan solapamiento
    const availableTables = tables.filter((table) => {
      return !table.reservations.some((res) => {
        const existingStart = new Date(res.date);
        const existingEnd = new Date(
          existingStart.getTime() + res.duration * 60000
        );
        return reservationStart < existingEnd && reservationEnd > existingStart;
      });
    });

    // Devolver sin las reservas (solo datos de la mesa)
    const result = availableTables.map(({ reservations: _, ...table }) => table);

    return NextResponse.json(result);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Error al verificar disponibilidad" },
      { status: 500 }
    );
  }
}
