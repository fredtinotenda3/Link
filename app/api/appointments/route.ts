import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { VisionPlusIntegration } from "@/lib/visionplus-integration";
import { NotificationService } from "@/lib/notification-service";
import { AppointmentStatus, Prisma } from "@/lib/generated/prisma";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const {
      patientName,
      patientEmail,
      patientPhone,
      patientDOB,
      branch,
      appointmentDate,
      appointmentTime,
      serviceType,
    } = body;

    // Basic validation
    if (
      !patientName ||
      !branch ||
      !appointmentDate ||
      !appointmentTime ||
      !serviceType
    ) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Create appointment in database
    const appointment = await prisma.appointment.create({
      data: {
        patientName,
        patientEmail,
        patientPhone,
        patientDOB: patientDOB ? new Date(patientDOB) : null,
        branch,
        appointmentDate: new Date(appointmentDate),
        appointmentTime,
        serviceType,
        status: "PENDING",
        source: "WEBSITE",
        syncStatus: "PENDING",
      },
    });

    // 🆕 SEND BOOKING CONFIRMATION NOTIFICATION
    try {
      console.log(`📧📱 Sending booking confirmation for: ${patientName}`);
      const notificationService = new NotificationService();
      const notificationResult =
        await notificationService.sendBookingConfirmation(appointment);

      if (notificationResult.success) {
        console.log(`✅ Booking confirmation sent successfully`);
      } else {
        console.warn(
          `⚠️ Booking confirmation failed: ${notificationResult.error}`
        );
      }
    } catch (notificationError) {
      console.error(
        "Booking confirmation error (non-fatal):",
        notificationError
      );
      // Don't fail the booking if notification fails
    }

    // AUTO-SYNC TO VISIONPLUS (Non-blocking)
    try {
      const integration = new VisionPlusIntegration();

      // Start sync but don't wait for it (non-blocking)
      integration
        .syncAppointment(appointment.id)
        .then((syncResult) => {
          console.log(`🔄 Sync result for ${appointment.id}:`, {
            success: syncResult.success,
            method: syncResult.method,
            visionPlusId: syncResult.visionPlusId,
          });
        })
        .catch((syncError) => {
          console.error(`❌ Sync failed for ${appointment.id}:`, syncError);
        });

      console.log(
        `✅ Appointment created and sync initiated: ${appointment.id}`
      );
    } catch (syncError) {
      console.error("⚠️ Failed to initiate sync:", syncError);
      // Don't fail the appointment creation if sync fails
    }

    return NextResponse.json(
      {
        success: true,
        appointment,
        message:
          "Appointment created successfully. You will receive a confirmation shortly.",
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Appointment creation error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

// GET function with proper Prisma types
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const branch = searchParams.get("branch");
    const date = searchParams.get("date");
    const status = searchParams.get("status");

    // Build filter conditions with proper Prisma types
    const where: Prisma.AppointmentWhereInput = {};

    if (branch) where.branch = { equals: branch };
    if (date) {
      const dateObj = new Date(date);
      where.appointmentDate = {
        gte: new Date(dateObj.setHours(0, 0, 0, 0)),
        lt: new Date(dateObj.setHours(24, 0, 0, 0)),
      };
    }
    if (status) {
      // Validate and cast the status to the proper enum type
      if (
        Object.values(AppointmentStatus).includes(status as AppointmentStatus)
      ) {
        where.status = { equals: status as AppointmentStatus };
      } else {
        console.warn(`Invalid status filter: ${status}`);
      }
    }

    const appointments = await prisma.appointment.findMany({
      where,
      orderBy: {
        appointmentDate: "asc",
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

    return NextResponse.json({ appointments });
  } catch (error) {
    console.error("Get appointments error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
