import { Appointment } from "@/lib/generated/prisma";
import {
  SmsResult,
  TwilioModule,
  TwilioClient,
  TwilioMessageOptions,
  TwilioMessageInstance,
  AfricaTalkingModule,
  AfricaTalkingInstance,
  AfricaTalkingSmsOptions,
  AfricaTalkingSmsResponse,
} from "@/types";

export class SMSService {
  private provider: string;

  constructor() {
    this.provider = process.env.SMS_PROVIDER || "console";
  }

  /**
   * Send booking confirmation SMS
   */
  async sendBookingConfirmation(appointment: Appointment): Promise<SmsResult> {
    const message = this.getBookingConfirmationMessage(appointment);
    return await this.sendSMS(appointment.patientPhone, message);
  }

  /**
   * Send status update SMS
   */
  async sendStatusUpdate(
    appointment: Appointment,
    oldStatus: string,
    newStatus: string
  ): Promise<SmsResult> {
    const message = this.getStatusUpdateMessage(
      appointment,
      oldStatus,
      newStatus
    );
    return await this.sendSMS(appointment.patientPhone, message);
  }

  /**
   * Send appointment reminder SMS
   */
  async sendReminder(appointment: Appointment): Promise<SmsResult> {
    const message = this.getReminderMessage(appointment);
    return await this.sendSMS(appointment.patientPhone, message);
  }

  /**
   * Send cancellation SMS
   */
  async sendCancellation(
    appointment: Appointment,
    reason?: string
  ): Promise<SmsResult> {
    const message = this.getCancellationMessage(appointment, reason);
    return await this.sendSMS(appointment.patientPhone, message);
  }

  /**
   * Main SMS sending method
   */
  private async sendSMS(
    to: string | null,
    message: string
  ): Promise<SmsResult> {
    if (!to) {
      return { success: false, error: "No phone number provided" };
    }

    // Clean phone number (remove spaces, dashes, etc.)
    const cleanNumber = this.cleanPhoneNumber(to);

    // Validate Zimbabwean phone number format
    if (!this.isValidZimbabweNumber(cleanNumber)) {
      console.warn(`⚠️ Invalid Zimbabwe phone number format: ${to}`);
      return { success: false, error: "Invalid phone number format" };
    }

    try {
      switch (this.provider) {
        case "twilio":
          return await this.sendViaTwilio(cleanNumber, message);
        case "africastalking":
          return await this.sendViaAfricaTalking(cleanNumber, message);
        case "vonage":
          return await this.sendViaVonage(cleanNumber, message);
        default:
          return await this.sendViaConsole(cleanNumber, message);
      }
    } catch (error) {
      console.error("SMS sending error:", error);
      return {
        success: false,
        error: error instanceof Error ? error.message : "SMS sending failed",
      };
    }
  }

  /**
   * Send via Twilio
   */
  private async sendViaTwilio(to: string, message: string): Promise<SmsResult> {
    try {
      const twilioModule = (await import("twilio")) as TwilioModule;

      // Use the Twilio constructor from the module
      const client: TwilioClient = new twilioModule.Twilio(
        process.env.TWILIO_ACCOUNT_SID!,
        process.env.TWILIO_AUTH_TOKEN!
      );

      const messageOptions: TwilioMessageOptions = {
        body: message,
        from: process.env.TWILIO_PHONE_NUMBER!,
        to: this.formatInternationalNumber(to),
      };

      const result: TwilioMessageInstance = await client.messages.create(
        messageOptions
      );

      console.log(`✅ SMS sent via Twilio. SID: ${result.sid}`);
      return { success: true, messageId: result.sid };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : "Twilio SMS failed",
      };
    }
  }

  /**
   * Send via Africa's Talking
   */
  private async sendViaAfricaTalking(
    to: string,
    message: string
  ): Promise<SmsResult> {
    try {
      const africastalkingModule = (await import(
        "africastalking"
      )) as unknown as AfricaTalkingModule;

      // Initialize Africa's Talking using the initialize method
      const at: AfricaTalkingInstance = africastalkingModule.default.initialize(
        {
          apiKey: process.env.AFRICASTALKING_API_KEY!,
          username: process.env.AFRICASTALKING_USERNAME!,
        }
      );

      const sms = at.SMS;

      const smsOptions: AfricaTalkingSmsOptions = {
        to: [this.formatInternationalNumber(to)],
        message: message,
        from: process.env.SMS_FROM || "LinkOptical",
      };

      const result: AfricaTalkingSmsResponse = await sms.send(smsOptions);

      console.log(`✅ SMS sent via Africa's Talking:`, result);

      // Extract message ID from the first recipient
      const messageId = result.SMSMessageData.Recipients[0]?.messageId;
      return { success: true, messageId };
    } catch (error) {
      return {
        success: false,
        error:
          error instanceof Error
            ? error.message
            : "Africa's Talking SMS failed",
      };
    }
  }

  /**
   * Send via Vonage (Nexmo)
   */
  private async sendViaVonage(to: string, message: string): Promise<SmsResult> {
    try {
      // 🆕 Use the newer Vonage SDK with promise-based API
      const { Vonage } = await import("@vonage/server-sdk");

      const vonage = new Vonage({
        apiKey: process.env.VONAGE_API_KEY!,
        apiSecret: process.env.VONAGE_API_SECRET!,
      });

      const from = process.env.VONAGE_FROM || "LinkOptical";

      // 🆕 Use the promise-based API instead of callback
      const result = await vonage.sms.send({
        to: this.formatInternationalNumber(to),
        from,
        text: message,
      });

      console.log(`✅ SMS sent via Vonage to: ${to}`, result);

      if (result.messages && result.messages[0]) {
        return { success: true, messageId: result.messages[0]["message-id"] };
      } else {
        return { success: false, error: "No response from Vonage" };
      }
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : "Vonage SMS failed",
      };
    }
  }

  /**
   * Fallback: Log to console (for development)
   */
  private async sendViaConsole(
    to: string,
    message: string
  ): Promise<SmsResult> {
    console.log("📱 SMS NOTIFICATION (Console):");
    console.log(`   To: ${to}`);
    console.log(`   Message: ${message}`);
    console.log("---");
    return { success: true };
  }

  /**
   * Clean and validate phone number
   */
  private cleanPhoneNumber(phone: string): string {
    return phone.replace(/[^\d+]/g, "");
  }

  /**
   * Validate Zimbabwean phone number
   */
  private isValidZimbabweNumber(phone: string): boolean {
    const zimbabweRegex = /^(\+263|263|0)(7[1-8])\d{7}$/;
    return zimbabweRegex.test(phone);
  }

  /**
   * Format number for international SMS
   */
  private formatInternationalNumber(phone: string): string {
    let cleanNumber = this.cleanPhoneNumber(phone);

    if (cleanNumber.startsWith("0")) {
      cleanNumber = "+263" + cleanNumber.substring(1);
    } else if (
      cleanNumber.startsWith("263") &&
      !cleanNumber.startsWith("+263")
    ) {
      cleanNumber = "+" + cleanNumber;
    } else if (!cleanNumber.startsWith("+")) {
      cleanNumber = "+" + cleanNumber;
    }

    return cleanNumber;
  }

  /**
   * Booking Confirmation Message
   */
  private getBookingConfirmationMessage(appointment: Appointment): string {
    const date = new Date(appointment.appointmentDate).toLocaleDateString(
      "en-ZA",
      {
        day: "numeric",
        month: "short",
        year: "numeric",
      }
    );

    return `Link Optical: Appointment confirmed for ${date} at ${appointment.appointmentTime}, ${appointment.branch}. Service: ${appointment.serviceType}. We look forward to seeing you!`;
  }

  /**
   * Status Update Message
   */
  private getStatusUpdateMessage(
    appointment: Appointment,
    oldStatus: string,
    newStatus: string
  ): string {
    const date = new Date(appointment.appointmentDate).toLocaleDateString(
      "en-ZA",
      {
        day: "numeric",
        month: "short",
      }
    );

    const statusMessages: Record<string, string> = {
      CONFIRMED: `confirmed for ${date} at ${appointment.appointmentTime}`,
      CANCELLED: `cancelled for ${date} at ${appointment.appointmentTime}`,
      COMPLETED: `completed - thank you for visiting Link Optical`,
      NOSHOW: `marked as No Show for ${date}. Please contact us to reschedule.`,
    };

    const message = statusMessages[newStatus] || `updated to ${newStatus}`;

    return `Link Optical: Your appointment has been ${message}.`;
  }

  /**
   * Reminder Message
   */
  private getReminderMessage(appointment: Appointment): string {
    const date = new Date(appointment.appointmentDate).toLocaleDateString(
      "en-ZA",
      {
        day: "numeric",
        month: "short",
      }
    );

    return `Link Optical: Reminder - You have an appointment tomorrow (${date}) at ${appointment.appointmentTime}, ${appointment.branch}. Please arrive 10 mins early.`;
  }

  /**
   * Same-day Reminder Message
   */
  private getSameDayReminderMessage(appointment: Appointment): string {
    return `Link Optical: Reminder - Your appointment is today at ${appointment.appointmentTime}, ${appointment.branch}. See you soon!`;
  }

  /**
   * Cancellation Message
   */
  private getCancellationMessage(
    appointment: Appointment,
    reason?: string
  ): string {
    const date = new Date(appointment.appointmentDate).toLocaleDateString(
      "en-ZA",
      {
        day: "numeric",
        month: "short",
      }
    );

    let message = `Link Optical: Your appointment for ${date} at ${appointment.appointmentTime} has been cancelled.`;

    if (reason) {
      message += ` Reason: ${reason}`;
    }

    message += ` To reschedule, please contact us.`;

    return message;
  }

  /**
   * Welcome Message (for new users)
   */
  async sendWelcomeMessage(
    phone: string,
    patientName: string
  ): Promise<SmsResult> {
    const message = `Welcome to Link Optical, ${patientName}! Thank you for registering. Book appointments easily via our website.`;
    return await this.sendSMS(phone, message);
  }

  /**
   * Bulk SMS for multiple appointments
   */
  async sendBulkReminders(appointments: Appointment[]): Promise<{
    success: number;
    failed: number;
    details: Array<{
      appointmentId: string;
      patientName: string;
      phone: string | null;
      success: boolean;
      error?: string;
    }>;
  }> {
    const results = {
      success: 0,
      failed: 0,
      details: [] as Array<{
        appointmentId: string;
        patientName: string;
        phone: string | null;
        success: boolean;
        error?: string;
      }>,
    };

    for (const appointment of appointments) {
      try {
        const result = await this.sendReminder(appointment);

        results.details.push({
          appointmentId: appointment.id,
          patientName: appointment.patientName,
          phone: appointment.patientPhone,
          success: result.success,
          error: result.error,
        });

        if (result.success) {
          results.success++;
        } else {
          results.failed++;
        }

        // Small delay to avoid rate limiting
        await new Promise((resolve) => setTimeout(resolve, 100));
      } catch (error) {
        results.failed++;
        results.details.push({
          appointmentId: appointment.id,
          patientName: appointment.patientName,
          phone: appointment.patientPhone,
          success: false,
          error: error instanceof Error ? error.message : "Bulk SMS failed",
        });
      }
    }

    return results;
  }
}
