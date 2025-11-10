import { Appointment } from "@prisma/client"; // ✅ FIXED IMPORT
import {
  EmailTemplate,
  EmailResult,
  SendGridModule,
  ResendModule,
  NodemailerModule,
  SendGridMessage,
  ResendEmailOptions,
  NodemailerConfig,
  NodemailerMessage,
  NodemailerAuth,
} from "@/types";

export class EmailService {
  private provider: string;

  constructor() {
    this.provider = process.env.EMAIL_PROVIDER || "console";
  }

  /**
   * Send booking confirmation email
   */
  async sendBookingConfirmation(
    appointment: Appointment
  ): Promise<EmailResult> {
    const template = this.getBookingConfirmationTemplate(appointment);
    return await this.sendEmail(appointment.patientEmail, template);
  }

  /**
   * Send status update email
   */
  async sendStatusUpdate(
    appointment: Appointment,
    oldStatus: string,
    newStatus: string
  ): Promise<EmailResult> {
    const template = this.getStatusUpdateTemplate(
      appointment,
      oldStatus,
      newStatus
    );
    return await this.sendEmail(appointment.patientEmail, template);
  }

  /**
   * Send appointment reminder
   */
  async sendReminder(appointment: Appointment): Promise<EmailResult> {
    const template = this.getReminderTemplate(appointment);
    return await this.sendEmail(appointment.patientEmail, template);
  }

  /**
   * Send cancellation notification
   */
  async sendCancellation(
    appointment: Appointment,
    reason?: string
  ): Promise<EmailResult> {
    const template = this.getCancellationTemplate(appointment, reason);
    return await this.sendEmail(appointment.patientEmail, template);
  }

  /**
   * Main email sending method
   */
  private async sendEmail(
    to: string | null,
    template: EmailTemplate
  ): Promise<EmailResult> {
    if (!to) {
      return { success: false, error: "No email address provided" };
    }

    try {
      switch (this.provider) {
        case "resend":
          return await this.sendViaResend(to, template);
        case "sendgrid":
          return await this.sendViaSendGrid(to, template);
        case "smtp":
          return await this.sendViaSMTP(to, template);
        default:
          return await this.sendViaConsole(to, template);
      }
    } catch (error) {
      console.error("Email sending error:", error);
      return {
        success: false,
        error: error instanceof Error ? error.message : "Email sending failed",
      };
    }
  }

  /**
   * Send via Resend.com
   */
  private async sendViaResend(
    to: string,
    template: EmailTemplate
  ): Promise<EmailResult> {
    try {
      const { Resend } = (await import("resend")) as unknown as ResendModule;
      const resend = new Resend(process.env.RESEND_API_KEY!);

      const { data, error } = await resend.emails.send({
        from:
          process.env.EMAIL_FROM || "Link Optical <bookings@linkoptical.com>",
        to: [to],
        subject: template.subject,
        html: template.html,
        text: template.text,
      } as ResendEmailOptions);

      if (error) {
        return { success: false, error: error.message };
      }

      console.log(`✅ Email sent via Resend: ${data?.id}`);
      return { success: true, messageId: data?.id };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : "Resend email failed",
      };
    }
  }

  /**
   * Send via SendGrid
   */
  private async sendViaSendGrid(
    to: string,
    template: EmailTemplate
  ): Promise<EmailResult> {
    try {
      const sgMail = (await import(
        "@sendgrid/mail"
      )) as unknown as SendGridModule;
      sgMail.setApiKey(process.env.SENDGRID_API_KEY!);

      const msg: SendGridMessage = {
        to,
        from: process.env.EMAIL_FROM || "bookings@linkoptical.com",
        subject: template.subject,
        html: template.html,
        text: template.text,
      };

      await sgMail.send(msg);
      console.log(`✅ Email sent via SendGrid to: ${to}`);
      return { success: true };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : "SendGrid email failed",
      };
    }
  }

  /**
   * Send via SMTP (Nodemailer)
   */
  private async sendViaSMTP(
    to: string,
    template: EmailTemplate
  ): Promise<EmailResult> {
    try {
      const nodemailer = (await import("nodemailer")) as NodemailerModule;

      const auth: NodemailerAuth = {
        user: process.env.SMTP_USER!,
        pass: process.env.SMTP_PASS!,
      };

      const config: NodemailerConfig = {
        host: process.env.SMTP_HOST!,
        port: parseInt(process.env.SMTP_PORT || "587"),
        secure: false,
        auth,
      };

      const transporter = nodemailer.createTransport(config);

      const message: NodemailerMessage = {
        from: process.env.EMAIL_FROM!,
        to,
        subject: template.subject,
        html: template.html,
        text: template.text,
      };

      await transporter.sendMail(message);
      console.log(`✅ Email sent via SMTP to: ${to}`);
      return { success: true };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : "SMTP email failed",
      };
    }
  }

  /**
   * Fallback: Log to console (for development)
   */
  private async sendViaConsole(
    to: string,
    template: EmailTemplate
  ): Promise<EmailResult> {
    console.log("📧 EMAIL NOTIFICATION (Console):");
    console.log(`   To: ${to}`);
    console.log(`   Subject: ${template.subject}`);
    console.log(`   Text: ${template.text}`);
    console.log("---");
    return { success: true };
  }

  /**
   * Booking Confirmation Template
   */
  private getBookingConfirmationTemplate(
    appointment: Appointment
  ): EmailTemplate {
    const appointmentDate = new Date(
      appointment.appointmentDate
    ).toLocaleDateString("en-ZA", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });

    const subject = `Appointment Confirmation - Link Optical`;

    const html = `
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: #2563eb; color: white; padding: 20px; text-align: center; }
          .content { background: #f9fafb; padding: 20px; }
          .appointment-details { background: white; padding: 15px; border-radius: 5px; margin: 15px 0; }
          .footer { text-align: center; padding: 20px; color: #6b7280; font-size: 14px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>Link Optical</h1>
            <h2>Appointment Confirmation</h2>
          </div>
          <div class="content">
            <p>Dear ${appointment.patientName},</p>
            <p>Thank you for booking your eye care appointment with Link Optical.</p>
            
            <div class="appointment-details">
              <h3>Appointment Details:</h3>
              <p><strong>Date:</strong> ${appointmentDate}</p>
              <p><strong>Time:</strong> ${appointment.appointmentTime}</p>
              <p><strong>Branch:</strong> ${appointment.branch}</p>
              <p><strong>Service:</strong> ${appointment.serviceType}</p>
            </div>

            <p>We look forward to seeing you and providing you with quality eye care services.</p>
            
            <p><strong>Need to reschedule or cancel?</strong><br>
            Please contact us at least 24 hours before your appointment.</p>
          </div>
          <div class="footer">
            <p>Link Optical - Quality Eye Care Across Zimbabwe</p>
            <p>Contact: [Your Phone Number] | Email: [Your Email]</p>
          </div>
        </div>
      </body>
      </html>
    `;

    const text = `
      APPOINTMENT CONFIRMATION - LINK OPTICAL

      Dear ${appointment.patientName},

      Thank you for booking your eye care appointment with Link Optical.

      APPOINTMENT DETAILS:
      Date: ${appointmentDate}
      Time: ${appointment.appointmentTime}
      Branch: ${appointment.branch}
      Service: ${appointment.serviceType}

      We look forward to seeing you and providing you with quality eye care services.

      Need to reschedule or cancel?
      Please contact us at least 24 hours before your appointment.

      Link Optical - Quality Eye Care Across Zimbabwe
      Contact: [Your Phone Number] | Email: [Your Email]
    `;

    return { subject, html, text };
  }

  /**
   * Status Update Template
   */
  private getStatusUpdateTemplate(
    appointment: Appointment,
    oldStatus: string,
    newStatus: string
  ): EmailTemplate {
    const statusMessages: Record<string, string> = {
      CONFIRMED: "has been confirmed",
      CANCELLED: "has been cancelled",
      COMPLETED: "has been completed",
      NOSHOW: "has been marked as No Show",
    };

    const subject = `Appointment Update - ${newStatus}`;
    const message = statusMessages[newStatus] || "has been updated";

    const html = `
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: #2563eb; color: white; padding: 20px; text-align: center; }
          .content { background: #f9fafb; padding: 20px; }
          .status-badge { 
            display: inline-block; 
            padding: 5px 15px; 
            border-radius: 20px; 
            color: white; 
            font-weight: bold; 
            margin: 10px 0;
          }
          .confirmed { background: #10b981; }
          .cancelled { background: #ef4444; }
          .completed { background: #8b5cf6; }
          .noshow { background: #f59e0b; }
          .footer { text-align: center; padding: 20px; color: #6b7280; font-size: 14px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>Link Optical</h1>
            <h2>Appointment Status Update</h2>
          </div>
          <div class="content">
            <p>Dear ${appointment.patientName},</p>
            <p>Your appointment ${message}.</p>
            
            <div class="status-badge ${newStatus.toLowerCase()}">
              ${newStatus}
            </div>

            <p><strong>Appointment Details:</strong></p>
            <ul>
              <li>Date: ${new Date(
                appointment.appointmentDate
              ).toLocaleDateString()}</li>
              <li>Time: ${appointment.appointmentTime}</li>
              <li>Branch: ${appointment.branch}</li>
              <li>Service: ${appointment.serviceType}</li>
            </ul>

            ${
              newStatus === "CANCELLED"
                ? `
            <p>If you need to schedule a new appointment, please visit our website or contact us directly.</p>
            `
                : ""
            }

            ${
              newStatus === "NOSHOW"
                ? `
            <p>Please contact us to reschedule your appointment.</p>
            `
                : ""
            }
          </div>
          <div class="footer">
            <p>Link Optical - Quality Eye Care Across Zimbabwe</p>
          </div>
        </div>
      </body>
      </html>
    `;

    const text = `
      APPOINTMENT STATUS UPDATE - LINK OPTICAL

      Dear ${appointment.patientName},

      Your appointment ${message}.

      Status: ${newStatus}

      Appointment Details:
      - Date: ${new Date(appointment.appointmentDate).toLocaleDateString()}
      - Time: ${appointment.appointmentTime}
      - Branch: ${appointment.branch}
      - Service: ${appointment.serviceType}

      ${
        newStatus === "CANCELLED"
          ? "If you need to schedule a new appointment, please visit our website or contact us directly."
          : ""
      }
      ${
        newStatus === "NOSHOW"
          ? "Please contact us to reschedule your appointment."
          : ""
      }

      Link Optical - Quality Eye Care Across Zimbabwe
    `;

    return { subject, html, text };
  }

  /**
   * Reminder Template
   */
  private getReminderTemplate(appointment: Appointment): EmailTemplate {
    const subject = `Appointment Reminder - Link Optical`;

    const html = `
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: #f59e0b; color: white; padding: 20px; text-align: center; }
          .content { background: #f9fafb; padding: 20px; }
          .reminder { background: #fff7ed; padding: 15px; border-radius: 5px; margin: 15px 0; }
          .footer { text-align: center; padding: 20px; color: #6b7280; font-size: 14px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>Link Optical</h1>
            <h2>Appointment Reminder</h2>
          </div>
          <div class="content">
            <p>Dear ${appointment.patientName},</p>
            
            <div class="reminder">
              <h3>⏰ Friendly Reminder</h3>
              <p>This is a reminder for your upcoming appointment:</p>
              <p><strong>Date:</strong> ${new Date(
                appointment.appointmentDate
              ).toLocaleDateString()}</p>
              <p><strong>Time:</strong> ${appointment.appointmentTime}</p>
              <p><strong>Branch:</strong> ${appointment.branch}</p>
              <p><strong>Service:</strong> ${appointment.serviceType}</p>
            </div>

            <p>Please arrive 10-15 minutes early for your appointment.</p>
            <p>If you need to reschedule or cancel, please contact us as soon as possible.</p>
          </div>
          <div class="footer">
            <p>Link Optical - Quality Eye Care Across Zimbabwe</p>
          </div>
        </div>
      </body>
      </html>
    `;

    const text = `
      APPOINTMENT REMINDER - LINK OPTICAL

      Dear ${appointment.patientName},

      FRIENDLY REMINDER
      This is a reminder for your upcoming appointment:

      Date: ${new Date(appointment.appointmentDate).toLocaleDateString()}
      Time: ${appointment.appointmentTime}
      Branch: ${appointment.branch}
      Service: ${appointment.serviceType}

      Please arrive 10-15 minutes early for your appointment.
      If you need to reschedule or cancel, please contact us as soon as possible.

      Link Optical - Quality Eye Care Across Zimbabwe
    `;

    return { subject, html, text };
  }

  /**
   * Cancellation Template
   */
  private getCancellationTemplate(
    appointment: Appointment,
    reason?: string
  ): EmailTemplate {
    const subject = `Appointment Cancelled - Link Optical`;

    const html = `
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: #ef4444; color: white; padding: 20px; text-align: center; }
          .content { background: #f9fafb; padding: 20px; }
          .cancellation { background: #fef2f2; padding: 15px; border-radius: 5px; margin: 15px 0; }
          .footer { text-align: center; padding: 20px; color: #6b7280; font-size: 14px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>Link Optical</h1>
            <h2>Appointment Cancelled</h2>
          </div>
          <div class="content">
            <p>Dear ${appointment.patientName},</p>
            
            <div class="cancellation">
              <h3>❌ Appointment Cancelled</h3>
              <p>Your appointment has been cancelled:</p>
              <p><strong>Date:</strong> ${new Date(
                appointment.appointmentDate
              ).toLocaleDateString()}</p>
              <p><strong>Time:</strong> ${appointment.appointmentTime}</p>
              <p><strong>Branch:</strong> ${appointment.branch}</p>
              <p><strong>Service:</strong> ${appointment.serviceType}</p>
              ${reason ? `<p><strong>Reason:</strong> ${reason}</p>` : ""}
            </div>

            <p>If this was a mistake or you'd like to reschedule, please contact us or book a new appointment on our website.</p>
            <p>We hope to see you soon for your eye care needs.</p>
          </div>
          <div class="footer">
            <p>Link Optical - Quality Eye Care Across Zimbabwe</p>
          </div>
        </div>
      </body>
      </html>
    `;

    const text = `
      APPOINTMENT CANCELLED - LINK OPTICAL

      Dear ${appointment.patientName},

      APPOINTMENT CANCELLED
      Your appointment has been cancelled:

      Date: ${new Date(appointment.appointmentDate).toLocaleDateString()}
      Time: ${appointment.appointmentTime}
      Branch: ${appointment.branch}
      Service: ${appointment.serviceType}
      ${reason ? `Reason: ${reason}` : ""}

      If this was a mistake or you'd like to reschedule, please contact us or book a new appointment on our website.

      We hope to see you soon for your eye care needs.

      Link Optical - Quality Eye Care Across Zimbabwe
    `;

    return { subject, html, text };
  }
}
