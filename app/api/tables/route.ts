import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const tables = await prisma.table.findMany({
      orderBy: { number: "asc" },
    });

    return NextResponse.json(tables);
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "Error al obtener las mesas" },
      { status: 500 },
    );
  }
}
