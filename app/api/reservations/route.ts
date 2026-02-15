import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const reservations = await prisma.reservation.findMany({
      include: {
        table: true,
      },
      orderBy: { date: "desc" },
    });
    
    return NextResponse.json(reservations);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Error al obtener las reservas" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Validar que la mesa existe y está disponible
    const table = await prisma.table.findUnique({
      where: { id: body.tableId },
    });
    
    if (!table) {
      return NextResponse.json(
        { error: "Mesa no encontrada" },
        { status: 404 }
      );
    }

    // Validar campos requeridos
    if (!body.name || !body.email || !body.phone || !body.date || !body.guests) {
      return NextResponse.json(
        { error: "Campos requeridos: name, email, phone, date, guests, tableId" },
        { status: 400 }
      );
    }

    // Validar capacidad de la mesa
    if (table.capacity < body.guests) {
      return NextResponse.json(
        { error: `La mesa ${table.number} tiene capacidad para ${table.capacity} personas` },
        { status: 400 }
      );
    }

    // Verificar solapamiento de horarios
    const duration = body.duration || 120;
    const reservationStart = new Date(body.date);
    const reservationEnd = new Date(reservationStart.getTime() + duration * 60000);

    const tableReservations = await prisma.reservation.findMany({
      where: {
        tableId: body.tableId,
        status: { not: "CANCELLED" },
      },
    });

    const hasOverlap = tableReservations.some((res) => {
      const existingStart = new Date(res.date);
      const existingEnd = new Date(existingStart.getTime() + res.duration * 60000);
      return reservationStart < existingEnd && reservationEnd > existingStart;
    });

    if (hasOverlap) {
      return NextResponse.json(
        { error: "La mesa no está disponible en ese horario" },
        { status: 409 }
      );
    }

    // Crear la reserva
    const reservation = await prisma.reservation.create({
      data: {
        name: body.name,
        email: body.email,
        phone: body.phone,
        date: new Date(body.date),
        guests: body.guests,
        tableId: body.tableId,
        notes: body.notes || null,
      },
      include: {
        table: true,
      },
    });
    
    return NextResponse.json(reservation, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Error al crear la reserva" },
      { status: 500 }
    );
  }
}