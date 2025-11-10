// lib/notification-service.ts
import { Appointment } from "@prisma/client"; // ✅ FIXED IMPORT
import { EmailService } from "./email-service";
import { SMSService } from "./sms-service";

export interface NotificationResult {
  success: boolean;
  email?: { success: boolean; error?: string };
  sms?: { success: boolean; error?: string };
  error?: string;
}

export interface NotificationPreferences {
  email: boolean;
  sms: boolean;
}

export class NotificationService {
  private emailService: EmailService;
  private smsService: SMSService;
  private defaultPreferences: NotificationPreferences = {
    email: true,
    sms: true,
  };

  constructor() {
    this.emailService = new EmailService();
    this.smsService = new SMSService();
  }

  /**
   * Send booking confirmation (both email and SMS)
   */
  async sendBookingConfirmation(
    appointment: Appointment
  ): Promise<NotificationResult> {
    console.log(
      `📧📱 Sending booking confirmation for: ${appointment.patientName}`
    );

    const preferences = await this.getNotificationPreferences(appointment);
    const results: NotificationResult = { success: false };

    try {
      // Send email if enabled and email exists
      if (preferences.email && appointment.patientEmail) {
        results.email = await this.emailService.sendBookingConfirmation(
          appointment
        );
      }

      // Send SMS if enabled and phone exists
      if (preferences.sms && appointment.patientPhone) {
        results.sms = await this.smsService.sendBookingConfirmation(
          appointment
        );
      }

      // Overall success if at least one method succeeded
      results.success = !!(results.email?.success || results.sms?.success);

      if (!results.success) {
        results.error = "All notification methods failed";
      }

      this.logNotificationResult("Booking Confirmation", appointment, results);
      return results;
    } catch (error) {
      console.error("Booking confirmation error:", error);
      return {
        success: false,
        error:
          error instanceof Error
            ? error.message
            : "Booking confirmation failed",
      };
    }
  }

  /**
   * Send status update notification
   */
  async sendStatusUpdate(
    appointment: Appointment,
    oldStatus: string,
    newStatus: string,
    reason?: string
  ): Promise<NotificationResult> {
    console.log(
      `📧📱 Sending status update: ${oldStatus} → ${newStatus} for ${appointment.patientName}`
    );

    const preferences = await this.getNotificationPreferences(appointment);
    const results: NotificationResult = { success: false };

    try {
      // Determine which notification methods to use based on status
      const shouldNotify = this.shouldNotifyForStatus(oldStatus, newStatus);

      if (!shouldNotify) {
        console.log(
          `ℹ️ Skipping notification for status change: ${oldStatus} → ${newStatus}`
        );
        return { success: true }; // Consider this a "success" since we intentionally skipped
      }

      // Send email if enabled and email exists
      if (preferences.email && appointment.patientEmail) {
        results.email = await this.emailService.sendStatusUpdate(
          appointment,
          oldStatus,
          newStatus
        );
      }

      // Send SMS if enabled and phone exists
      if (preferences.sms && appointment.patientPhone) {
        results.sms = await this.smsService.sendStatusUpdate(
          appointment,
          oldStatus,
          newStatus
        );
      }

      // Overall success if at least one method succeeded
      results.success = !!(results.email?.success || results.sms?.success);

      if (!results.success) {
        results.error = "All status update methods failed";
      }

      this.logNotificationResult("Status Update", appointment, results);
      return results;
    } catch (error) {
      console.error("Status update error:", error);
      return {
        success: false,
        error: error instanceof Error ? error.message : "Status update failed",
      };
    }
  }

  /**
   * Send appointment reminder
   */
  async sendReminder(appointment: Appointment): Promise<NotificationResult> {
    console.log(`📧📱 Sending reminder for: ${appointment.patientName}`);

    const preferences = await this.getNotificationPreferences(appointment);
    const results: NotificationResult = { success: false };

    try {
      // Send email if enabled and email exists
      if (preferences.email && appointment.patientEmail) {
        results.email = await this.emailService.sendReminder(appointment);
      }

      // Send SMS if enabled and phone exists (SMS is often better for reminders)
      if (preferences.sms && appointment.patientPhone) {
        results.sms = await this.smsService.sendReminder(appointment);
      }

      // Overall success if at least one method succeeded
      results.success = !!(results.email?.success || results.sms?.success);

      if (!results.success) {
        results.error = "All reminder methods failed";
      }

      this.logNotificationResult("Reminder", appointment, results);
      return results;
    } catch (error) {
      console.error("Reminder error:", error);
      return {
        success: false,
        error: error instanceof Error ? error.message : "Reminder failed",
      };
    }
  }

  /**
   * Send cancellation notification
   */
  async sendCancellation(
    appointment: Appointment,
    reason?: string
  ): Promise<NotificationResult> {
    console.log(`📧📱 Sending cancellation for: ${appointment.patientName}`);

    const preferences = await this.getNotificationPreferences(appointment);
    const results: NotificationResult = { success: false };

    try {
      // Send email if enabled and email exists
      if (preferences.email && appointment.patientEmail) {
        results.email = await this.emailService.sendCancellation(
          appointment,
          reason
        );
      }

      // Send SMS if enabled and phone exists
      if (preferences.sms && appointment.patientPhone) {
        results.sms = await this.smsService.sendCancellation(
          appointment,
          reason
        );
      }

      // Overall success if at least one method succeeded
      results.success = !!(results.email?.success || results.sms?.success);

      if (!results.success) {
        results.error = "All cancellation methods failed";
      }

      this.logNotificationResult("Cancellation", appointment, results);
      return results;
    } catch (error) {
      console.error("Cancellation error:", error);
      return {
        success: false,
        error: error instanceof Error ? error.message : "Cancellation failed",
      };
    }
  }

  /**
   * Send welcome message for new users
   */
  async sendWelcome(
    patientName: string,
    email: string | null,
    phone: string | null
  ): Promise<NotificationResult> {
    console.log(`📧📱 Sending welcome message for: ${patientName}`);

    const preferences = this.defaultPreferences;
    const results: NotificationResult = { success: false };

    try {
      // Create a mock appointment for template purposes
      const mockAppointment: Partial<Appointment> = {
        patientName,
        patientEmail: email,
        patientPhone: phone,
      };

      // Send email if enabled and email exists
      if (preferences.email && email) {
        // For now, use booking confirmation as welcome email
        // You might want to create a dedicated welcome email template
        results.email = await this.emailService.sendBookingConfirmation(
          mockAppointment as Appointment
        );
      }

      // Send SMS if enabled and phone exists
      if (preferences.sms && phone) {
        results.sms = await this.smsService.sendWelcomeMessage(
          phone,
          patientName
        );
      }

      // Overall success if at least one method succeeded
      results.success = !!(results.email?.success || results.sms?.success);

      if (!results.success) {
        results.error = "All welcome message methods failed";
      }

      console.log(`🎉 Welcome message result:`, results);
      return results;
    } catch (error) {
      console.error("Welcome message error:", error);
      return {
        success: false,
        error:
          error instanceof Error ? error.message : "Welcome message failed",
      };
    }
  }

  /**
   * Send bulk reminders for multiple appointments
   */
  async sendBulkReminders(appointments: Appointment[]): Promise<{
    success: number;
    failed: number;
    details: Array<{
      appointmentId: string;
      patientName: string;
      result: NotificationResult;
    }>;
  }> {
    console.log(
      `📧📱 Sending bulk reminders for ${appointments.length} appointments`
    );

    const results = {
      success: 0,
      failed: 0,
      details: [] as Array<{
        appointmentId: string;
        patientName: string;
        result: NotificationResult;
      }>,
    };

    for (const appointment of appointments) {
      try {
        const notificationResult = await this.sendReminder(appointment);

        results.details.push({
          appointmentId: appointment.id,
          patientName: appointment.patientName,
          result: notificationResult,
        });

        if (notificationResult.success) {
          results.success++;
        } else {
          results.failed++;
        }

        // Small delay to avoid rate limiting
        await new Promise((resolve) => setTimeout(resolve, 200));
      } catch (error) {
        results.failed++;
        results.details.push({
          appointmentId: appointment.id,
          patientName: appointment.patientName,
          result: {
            success: false,
            error:
              error instanceof Error ? error.message : "Bulk reminder failed",
          },
        });
      }
    }

    console.log(
      `📊 Bulk reminders completed: ${results.success} successful, ${results.failed} failed`
    );
    return results;
  }

  /**
   * Get notification preferences for a patient
   * In future, this could be stored in database per patient
   */
  private async getNotificationPreferences(
    appointment: Appointment
  ): Promise<NotificationPreferences> {
    // For now, return default preferences
    // In future, you could:
    // 1. Store preferences in database
    // 2. Allow patients to set preferences in their dashboard
    // 3. Have business rules (e.g., always SMS for reminders)

    return this.defaultPreferences;
  }

  /**
   * Determine if we should send notifications for a status change
   */
  private shouldNotifyForStatus(oldStatus: string, newStatus: string): boolean {
    // Only notify for important status changes
    const notifyStatuses = ["CONFIRMED", "CANCELLED", "NOSHOW"];

    return notifyStatuses.includes(newStatus) && oldStatus !== newStatus;
  }

  /**
   * Log notification results
   */
  private logNotificationResult(
    type: string,
    appointment: Appointment,
    result: NotificationResult
  ): void {
    console.log(
      `📊 ${type} Notification Result for ${appointment.patientName}:`
    );
    console.log(`   Overall: ${result.success ? "✅ SUCCESS" : "❌ FAILED"}`);

    if (result.email) {
      console.log(
        `   Email: ${result.email.success ? "✅" : "❌"} ${
          result.email.error || ""
        }`
      );
    }

    if (result.sms) {
      console.log(
        `   SMS: ${result.sms.success ? "✅" : "❌"} ${result.sms.error || ""}`
      );
    }

    if (result.error) {
      console.log(`   Error: ${result.error}`);
    }
  }

  /**
   * Test notification service configuration
   */
  async testConfiguration(): Promise<{
    email: { configured: boolean; provider: string };
    sms: { configured: boolean; provider: string };
  }> {
    const emailProvider = process.env.EMAIL_PROVIDER || "console";
    const smsProvider = process.env.SMS_PROVIDER || "console";

    return {
      email: {
        configured: emailProvider !== "console",
        provider: emailProvider,
      },
      sms: {
        configured: smsProvider !== "console",
        provider: smsProvider,
      },
    };
  }
}
