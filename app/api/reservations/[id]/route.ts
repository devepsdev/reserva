import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;
    const reservation = await prisma.reservation.findUnique({
      where: { id: Number(id) },
      include: {
        table: true,
      },
    });

    if (!reservation) {
      return NextResponse.json(
        { error: "Reserva no encontrada" },
        { status: 404 }
      );
    }
    
    return NextResponse.json(reservation);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Error al obtener la reserva" },
      { status: 500 },
    );
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;
    const body = await request.json();

    const existing = await prisma.reservation.findUnique({
      where: { id: Number(id) },
    });

    if (!existing) {
      return NextResponse.json(
        { error: "Reserva no encontrada" },
        { status: 404 }
      );
    }

    const tableId = body.tableId ?? existing.tableId;
    const date = body.date ? new Date(body.date) : existing.date;
    const guests = body.guests ?? existing.guests;
    const duration = body.duration ?? existing.duration;

    // Validar mesa
    const table = await prisma.table.findUnique({
      where: { id: tableId },
    });

    if (!table) {
      return NextResponse.json(
        { error: "Mesa no encontrada" },
        { status: 404 }
      );
    }

    if (table.capacity < guests) {
      return NextResponse.json(
        { error: `La mesa ${table.number} tiene capacidad para ${table.capacity} personas` },
        { status: 400 }
      );
    }

    // Verificar solapamiento (excluyendo la reserva actual)
    const reservationStart = new Date(date);
    const reservationEnd = new Date(reservationStart.getTime() + duration * 60000);

    // Verificar solapamiento con otras reservas de esta mesa
    const tableReservations = await prisma.reservation.findMany({
      where: {
        tableId,
        id: { not: Number(id) },
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

    const reservation = await prisma.reservation.update({
      where: { id: Number(id) },
      data: {
        ...(body.name && { name: body.name }),
        ...(body.email && { email: body.email }),
        ...(body.phone && { phone: body.phone }),
        ...(body.date && { date: new Date(body.date) }),
        ...(body.guests !== undefined && { guests: body.guests }),
        ...(body.duration !== undefined && { duration: body.duration }),
        ...(body.status && { status: body.status }),
        ...(body.tableId !== undefined && { tableId: body.tableId }),
        ...(body.notes !== undefined && { notes: body.notes }),
      },
      include: { table: true },
    });

    return NextResponse.json(reservation);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Error al actualizar la reserva" },
      { status: 500 },
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;
    const reservation = await prisma.reservation.delete({
      where: { id: Number(id) },
    });

    if (!reservation) {
      return NextResponse.json(
        { error: "Reserva no encontrada" },
        { status: 404 }
      );
    }
    
    return NextResponse.json(reservation);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Error al eliminar la reserva" },
      { status: 500 },
    );
  }
}