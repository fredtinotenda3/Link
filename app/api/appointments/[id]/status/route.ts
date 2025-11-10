// app/api/appointments/[id]/status/route.ts
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { VisionPlusIntegration } from "@/lib/visionplus-integration";
import { NotificationService } from "@/lib/notification-service";

// Valid status transitions
const VALID_STATUSES = [
  "PENDING",
  "CONFIRMED",
  "CANCELLED",
  "COMPLETED",
  "NOSHOW",
];
const ALLOWED_TRANSITIONS: Record<string, string[]> = {
  PENDING: ["CONFIRMED", "CANCELLED"],
  CONFIRMED: ["CANCELLED", "COMPLETED", "NOSHOW"],
  CANCELLED: ["CONFIRMED"],
  COMPLETED: [],
  NOSHOW: [],
};

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id: appointmentId } = await params;
    const body = await request.json();
    const { status, reason, notifyUser = true } = body;

    // Validate input
    if (!appointmentId || !status) {
      return NextResponse.json(
        { error: "Appointment ID and status are required" },
        { status: 400 }
      );
    }

    if (!VALID_STATUSES.includes(status)) {
      return NextResponse.json(
        {
          error: `Invalid status. Must be one of: ${VALID_STATUSES.join(", ")}`,
        },
        { status: 400 }
      );
    }

    // Get current appointment
    const currentAppointment = await prisma.appointment.findUnique({
      where: { id: appointmentId },
    });

    if (!currentAppointment) {
      return NextResponse.json(
        { error: "Appointment not found" },
        { status: 404 }
      );
    }

    // Validate status transition
    const allowedTransitions =
      ALLOWED_TRANSITIONS[currentAppointment.status] || [];
    if (
      !allowedTransitions.includes(status) &&
      status !== currentAppointment.status
    ) {
      return NextResponse.json(
        {
          error: `Cannot change status from ${
            currentAppointment.status
          } to ${status}. Allowed transitions: ${
            allowedTransitions.join(", ") || "none"
          }`,
        },
        { status: 400 }
      );
    }

    console.log(
      `🔄 Changing status for appointment ${appointmentId}: ${currentAppointment.status} → ${status}`
    );

    // Update status in our database
    const updatedAppointment = await prisma.appointment.update({
      where: { id: appointmentId },
      data: {
        status,
        updatedAt: new Date(),
      },
    });

    // 🚀 SYNC STATUS CHANGE TO VISIONPLUS
    let syncResult = null;
    let notificationResult = null;

    try {
      const integration = new VisionPlusIntegration();

      // Only sync to VisionPlus for meaningful status changes
      if (shouldSyncStatusToVisionPlus(currentAppointment.status, status)) {
        console.log(`🔄 Syncing status change to VisionPlus: ${status}`);
        syncResult = await integration.updateAppointmentStatusInVP(
          appointmentId,
          status
        );

        if (syncResult.success) {
          console.log(`✅ Status synced to VisionPlus: ${status}`);
        } else {
          console.warn(
            `⚠️ Status sync to VisionPlus failed: ${syncResult.error}`
          );
        }
      }

      // 🆕 REAL NOTIFICATIONS - REPLACED CONSOLE LOGS
      if (notifyUser && shouldNotifyUser(currentAppointment.status, status)) {
        console.log(`📧📱 Sending real notifications for status: ${status}`);

        const notificationService = new NotificationService();
        notificationResult = await notificationService.sendStatusUpdate(
          updatedAppointment,
          currentAppointment.status,
          status,
          reason
        );

        if (notificationResult.success) {
          console.log(`✅ Notifications sent successfully`);
        } else {
          console.warn(`⚠️ Notifications failed: ${notificationResult.error}`);
        }
      }
    } catch (syncError) {
      console.error("Sync/notification error (non-fatal):", syncError);
    }

    return NextResponse.json({
      success: true,
      appointment: updatedAppointment,
      sync: syncResult,
      notification: notificationResult,
      message: `Appointment status updated to ${status}`,
    });
  } catch (error) {
    console.error("Status update error:", error);
    return NextResponse.json(
      {
        success: false,
        error:
          error instanceof Error
            ? error.message
            : "Failed to update appointment status",
      },
      { status: 500 }
    );
  }
}

// GET current status and allowed transitions
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

    if (!appointment) {
      return NextResponse.json(
        { error: "Appointment not found" },
        { status: 404 }
      );
    }

    const allowedTransitions = ALLOWED_TRANSITIONS[appointment.status] || [];

    return NextResponse.json({
      appointment,
      statusInfo: {
        current: appointment.status,
        allowedTransitions,
        canCancel: allowedTransitions.includes("CANCELLED"),
        canConfirm: allowedTransitions.includes("CONFIRMED"),
        canComplete: allowedTransitions.includes("COMPLETED"),
        canMarkNoShow: allowedTransitions.includes("NOSHOW"),
      },
      syncInfo: {
        visionPlusId: appointment.visionPlusId,
        syncStatus: appointment.syncStatus,
        canSyncToVP: !!appointment.visionPlusId,
      },
    });
  } catch (error) {
    console.error("Get appointment status error:", error);
    return NextResponse.json(
      { error: "Failed to get appointment status" },
      { status: 500 }
    );
  }
}

/**
 * Determine if status change should be synced to VisionPlus
 */
function shouldSyncStatusToVisionPlus(
  oldStatus: string,
  newStatus: string
): boolean {
  // Only sync meaningful status changes that affect VisionPlus
  const syncStatuses = ["CONFIRMED", "CANCELLED", "COMPLETED", "NOSHOW"];

  return (
    syncStatuses.includes(newStatus) &&
    oldStatus !== newStatus &&
    // Don't sync if changing from CANCELLED back to CONFIRMED (already handled by re-sync)
    !(oldStatus === "CANCELLED" && newStatus === "CONFIRMED")
  );
}

/**
 * Determine if user should be notified about status change
 */
function shouldNotifyUser(oldStatus: string, newStatus: string): boolean {
  // Notify for important status changes
  const notifyStatuses = ["CONFIRMED", "CANCELLED", "NOSHOW"];

  return notifyStatuses.includes(newStatus) && oldStatus !== newStatus;
}
