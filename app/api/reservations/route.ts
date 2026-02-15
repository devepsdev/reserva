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