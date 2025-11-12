import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { prisma } from "@/lib/prisma";

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Get user's appointments
    const appointments = await prisma.appointment.findMany({
      where: {
        patientEmail: session.user.email,
      },
      orderBy: {
        appointmentDate: "desc",
      },
      select: {
        id: true,
        patientName: true,
        patientEmail: true,
        patientPhone: true,
        branch: true,
        appointmentDate: true,
        appointmentTime: true,
        serviceType: true,
        status: true,
        syncStatus: true,
        visionPlusId: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    return NextResponse.json({
      success: true,
      appointments,
    });
  } catch (error) {
    console.error("Get user appointments error:", error);
    return NextResponse.json(
      { error: "Failed to fetch appointments" },
      { status: 500 }
    );
  }
}
