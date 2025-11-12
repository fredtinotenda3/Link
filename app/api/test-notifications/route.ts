import { NextRequest, NextResponse } from "next/server";
import { NotificationService } from "@/lib/notification-service";
import { prisma } from "@/lib/prisma";
import { Appointment, SyncStatus, AppointmentStatus } from "@prisma/client";

// 🆕 Define a proper interface for mock appointment data
interface MockAppointment {
  id: string;
  patientName: string;
  patientEmail: string | null;
  patientPhone: string | null;
  patientDOB: Date | null;
  branch: string;
  appointmentDate: Date;
  appointmentTime: string;
  serviceType: string;
  status: AppointmentStatus;
  syncStatus: SyncStatus;
  visionPlusId: string | null;
  source: string;
  createdAt: Date;
  updatedAt: Date;
  syncedAt: Date | null;
  manualSyncRequestedAt: Date | null;
  userId: string | null; // ✅ ADD THIS MISSING FIELD
}

export async function GET(request: NextRequest) {
  try {
    const notificationService = new NotificationService();
    const config = await notificationService.testConfiguration();

    // Get a recent appointment for testing
    const testAppointment = await prisma.appointment.findFirst({
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json({
      success: true,
      configuration: config,
      testAppointment: testAppointment
        ? {
            id: testAppointment.id,
            patientName: testAppointment.patientName,
            patientEmail: testAppointment.patientEmail,
            patientPhone: testAppointment.patientPhone,
          }
        : null,
      instructions: {
        email: config.email.configured
          ? "✅ Email is configured for production"
          : "⚠️ Email is in console mode - add API keys for real emails",
        sms: config.sms.configured
          ? "✅ SMS is configured for production"
          : "⚠️ SMS is in console mode - add API keys for real SMS",
      },
    });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : "Test failed",
      },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { testType = "booking", appointmentId } = body;

    const notificationService = new NotificationService();

    let result;

    if (appointmentId) {
      // Test with specific appointment
      const appointment = await prisma.appointment.findUnique({
        where: { id: appointmentId },
      });

      if (!appointment) {
        return NextResponse.json(
          { error: "Appointment not found" },
          { status: 404 }
        );
      }

      switch (testType) {
        case "booking":
          result = await notificationService.sendBookingConfirmation(
            appointment
          );
          break;
        case "status":
          result = await notificationService.sendStatusUpdate(
            appointment,
            "PENDING",
            "CONFIRMED"
          );
          break;
        case "reminder":
          result = await notificationService.sendReminder(appointment);
          break;
        default:
          return NextResponse.json(
            { error: "Invalid test type" },
            { status: 400 }
          );
      }
    } else {
      // Test with mock data - using proper interface instead of Pick
      const mockAppointment: MockAppointment = {
        id: "test-" + Date.now(),
        patientName: "Test Patient",
        patientEmail: "test@example.com",
        patientPhone: "0771234567",
        patientDOB: null,
        branch: "Robinson House",
        appointmentDate: new Date(),
        appointmentTime: "10:00 AM",
        serviceType: "Eye Test",
        status: AppointmentStatus.PENDING,
        syncStatus: SyncStatus.PENDING,
        visionPlusId: null,
        source: "WEBSITE",
        createdAt: new Date(),
        updatedAt: new Date(),
        syncedAt: null,
        manualSyncRequestedAt: null,
        userId: null, // ✅ ADD THIS MISSING FIELD
      };

      result = await notificationService.sendBookingConfirmation(
        mockAppointment
      );
    }

    return NextResponse.json({
      success: result.success,
      testType,
      result,
      message: result.success
        ? "Test notification sent successfully"
        : "Test notification failed",
    });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : "Test failed",
      },
      { status: 500 }
    );
  }
}
