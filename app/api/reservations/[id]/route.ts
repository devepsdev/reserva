import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } },
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

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } },
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