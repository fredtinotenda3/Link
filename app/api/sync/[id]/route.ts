import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { VisionPlusIntegration } from "@/lib/visionplus-integration";

// 🆕 Helper function for safe enum comparisons
const isSyncStatus = (status: string, expected: string): boolean => {
  return status === expected;
};

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id: appointmentId } = await params;

    if (!appointmentId) {
      return NextResponse.json(
        { error: "Appointment ID is required" },
        { status: 400 }
      );
    }

    // Verify appointment exists
    const appointment = await prisma.appointment.findUnique({
      where: { id: appointmentId },
    });

    if (!appointment) {
      return NextResponse.json(
        { error: "Appointment not found" },
        { status: 404 }
      );
    }

    console.log(`🔄 Manual sync requested for appointment: ${appointmentId}`);

    // Initialize integration and sync
    const integration = new VisionPlusIntegration();
    const syncResult = await integration.syncAppointment(appointmentId);

    // Return detailed sync result
    return NextResponse.json({
      success: syncResult.success,
      appointmentId,
      syncResult: {
        method: syncResult.method,
        visionPlusId: syncResult.visionPlusId,
        error: syncResult.error,
        responseData: syncResult.responseData,
      },
      appointmentDetails: {
        patientName: appointment.patientName,
        branch: appointment.branch,
        appointmentDate: appointment.appointmentDate,
        appointmentTime: appointment.appointmentTime,
        serviceType: appointment.serviceType,
      },
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error("Sync API error:", error);
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : "Sync failed",
        appointmentId: (await params).id,
      },
      { status: 500 }
    );
  }
}

// GET endpoint to check sync status
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id: appointmentId } = await params;

    const appointment = await prisma.appointment.findUnique({
      where: { id: appointmentId },
      select: {
        id: true,
        patientName: true,
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

    if (!appointment) {
      return NextResponse.json(
        { error: "Appointment not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      appointment,
      syncInfo: {
        // 🆕 FIXED: Use helper function for safe comparisons
        canSync: !isSyncStatus(appointment.syncStatus, "SYNCED"),
        requiresManual: isSyncStatus(appointment.syncStatus, "MANUAL_REQUIRED"),
        lastUpdated: appointment.updatedAt,
      },
    });
  } catch (error) {
    console.error("Get sync status error:", error);
    return NextResponse.json(
      { error: "Failed to get sync status" },
      { status: 500 }
    );
  }
}
