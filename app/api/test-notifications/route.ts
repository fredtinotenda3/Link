import { NextRequest, NextResponse } from "next/server";
import { NotificationService } from "@/lib/notification-service";
import { prisma } from "@/lib/prisma";
import {
  Appointment,
  SyncStatus,
  AppointmentStatus,
} from "@/lib/generated/prisma";

// 🆕 Define a complete mock appointment type that includes all required fields
type MockAppointment = Pick<
  Appointment,
  | "id"
  | "patientName"
  | "patientEmail"
  | "patientPhone"
  | "branch"
  | "appointmentDate"
  | "appointmentTime"
  | "serviceType"
  | "status"
  | "syncStatus"
  | "visionPlusId"
  | "source"
  | "patientDOB"
  | "createdAt"
  | "updatedAt"
  | "syncedAt" // 🆕 ADD THIS MISSING FIELD
>;

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
      // Test with mock data - using proper type instead of any
      const mockAppointment: MockAppointment = {
        id: "test-" + Date.now(),
        patientName: "Test Patient",
        patientEmail: "test@example.com",
        patientPhone: "0771234567",
        branch: "Robinson House",
        appointmentDate: new Date(),
        appointmentTime: "10:00 AM",
        serviceType: "Eye Test",
        status: AppointmentStatus.PENDING,
        syncStatus: SyncStatus.PENDING,
        visionPlusId: null,
        source: "WEBSITE",
        patientDOB: null,
        createdAt: new Date(),
        updatedAt: new Date(),
        syncedAt: null, // 🆕 ADD THIS MISSING FIELD
      };

      result = await notificationService.sendBookingConfirmation(
        mockAppointment as Appointment // 🆕 ADD TYPE ASSERTION
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
