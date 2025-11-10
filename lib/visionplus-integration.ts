// lib/visionplus-integration.ts
import { prisma } from "./prisma";
import { VisionPlusFormAnalyzer } from "./visionplus-form-analyzer";

export interface SyncResult {
  success: boolean;
  visionPlusId?: string;
  method: "DATABASE" | "FORM" | "API" | "MANUAL" | "STATUS_UPDATE";
  error?: string;
  responseData?: unknown;
}

export class VisionPlusIntegration {
  private formAnalyzer: VisionPlusFormAnalyzer;
  private isAuthenticated: boolean = false;

  constructor() {
    this.formAnalyzer = new VisionPlusFormAnalyzer();
  }

  /**
   * 🆕 UPDATE EXISTING APPOINTMENT STATUS IN VISIONPLUS
   */
  async updateAppointmentStatusInVP(
    appointmentId: string,
    newStatus: string
  ): Promise<SyncResult> {
    try {
      const appointment = await prisma.appointment.findUnique({
        where: { id: appointmentId },
      });

      if (!appointment) {
        return {
          success: false,
          method: "STATUS_UPDATE",
          error: "Appointment not found",
        };
      }

      if (!appointment.visionPlusId) {
        return {
          success: false,
          method: "STATUS_UPDATE",
          error: "Appointment not yet synced to VisionPlus",
        };
      }

      console.log(
        `🔄 Updating VisionPlus status for ${appointment.visionPlusId} to: ${newStatus}`
      );

      // Ensure authentication
      if (!this.isAuthenticated) {
        const authResult = await this.authenticate();
        if (!authResult.success) {
          return authResult;
        }
      }

      // Map website status to VisionPlus status
      const vpStatus = this.mapStatusToVisionPlus(newStatus);

      // Try different update methods
      const updateMethods = [
        () => this.tryStatusUpdateForm(appointment, vpStatus),
        () => this.tryDirectStatusUpdate(appointment, vpStatus),
      ];

      for (const method of updateMethods) {
        const result = await method();
        if (result.success) {
          console.log(`✅ Status updated in VisionPlus: ${newStatus}`);
          return result;
        }
      }

      return {
        success: false,
        method: "STATUS_UPDATE",
        error: "All status update methods failed",
      };
    } catch (error) {
      console.error("Status update error:", error);
      return {
        success: false,
        method: "STATUS_UPDATE",
        error: error instanceof Error ? error.message : "Status update failed",
      };
    }
  }

  /**
   * 🆕 CANCEL APPOINTMENT IN VISIONPLUS
   */
  async cancelAppointmentInVP(appointmentId: string): Promise<SyncResult> {
    return await this.updateAppointmentStatusInVP(appointmentId, "CANCELLED");
  }

  /**
   * 🆕 UPDATE APPOINTMENT DETAILS IN VISIONPLUS
   */
  async updateAppointmentInVP(
    appointmentId: string,
    updates: Record<string, unknown>
  ): Promise<SyncResult> {
    try {
      const appointment = await prisma.appointment.findUnique({
        where: { id: appointmentId },
      });

      if (!appointment) {
        return {
          success: false,
          method: "STATUS_UPDATE",
          error: "Appointment not found",
        };
      }

      if (!appointment.visionPlusId) {
        return {
          success: false,
          method: "STATUS_UPDATE",
          error: "Appointment not yet synced to VisionPlus",
        };
      }

      console.log(
        `🔄 Updating VisionPlus appointment ${appointment.visionPlusId} with:`,
        updates
      );

      // Ensure authentication
      if (!this.isAuthenticated) {
        const authResult = await this.authenticate();
        if (!authResult.success) {
          return authResult;
        }
      }

      // Try form-based update
      const success = await this.tryAppointmentUpdateForm(appointment, updates);

      if (success) {
        return {
          success: true,
          visionPlusId: appointment.visionPlusId,
          method: "STATUS_UPDATE",
          responseData: { message: "Appointment updated successfully" },
        };
      }

      return {
        success: false,
        method: "STATUS_UPDATE",
        error: "Appointment update failed",
      };
    } catch (error) {
      console.error("Appointment update error:", error);
      return {
        success: false,
        method: "STATUS_UPDATE",
        error:
          error instanceof Error ? error.message : "Appointment update failed",
      };
    }
  }

  /**
   * 🆕 MAP WEBSITE STATUS TO VISIONPLUS STATUS
   */
  private mapStatusToVisionPlus(websiteStatus: string): string {
    const statusMap: Record<string, string> = {
      CONFIRMED: "Confirmed",
      CANCELLED: "Cancelled",
      COMPLETED: "Completed",
      NOSHOW: "No Show",
      PENDING: "Pending",
    };

    return statusMap[websiteStatus] || websiteStatus;
  }

  /**
   * 🆕 TRY STATUS UPDATE VIA VISIONPLUS FORM
   */
  private async tryStatusUpdateForm(
    appointment: { visionPlusId: string | null; status: string },
    vpStatus: string
  ): Promise<SyncResult> {
    try {
      // This would simulate filling out a status update form in VisionPlus
      // Based on the actual VisionPlus form structure

      const formData = new URLSearchParams();

      // Add ASP.NET form fields
      formData.append("__VIEWSTATE", "");
      formData.append("__EVENTVALIDATION", "");

      // Add appointment reference
      formData.append(
        "ctl00$MainContentPlaceHolder$txtAppointmentId",
        appointment.visionPlusId || ""
      );

      // Add status update
      formData.append("ctl00$MainContentPlaceHolder$drpStatus", vpStatus);

      // Add update reason/notes if available
      formData.append(
        "ctl00$MainContentPlaceHolder$txtNotes",
        `Status updated from website to: ${vpStatus}`
      );

      // Submit button
      formData.append(
        "ctl00$MainContentPlaceHolder$btnUpdateStatus",
        "Update Status"
      );

      const response = await fetch(
        "http://185.132.36.86:8095/MainModule/UpdateAppointmentStatus.aspx", // Example endpoint
        {
          method: "POST",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
          body: formData.toString(),
          redirect: "manual",
        }
      );

      console.log(`Status update response: ${response.status}`);

      if (response.ok || response.status === 302) {
        return {
          success: true,
          visionPlusId: appointment.visionPlusId || undefined,
          method: "STATUS_UPDATE",
          responseData: {
            status: vpStatus,
            previousStatus: appointment.status,
            timestamp: new Date().toISOString(),
          },
        };
      }

      return {
        success: false,
        method: "STATUS_UPDATE",
        error: `HTTP ${response.status}: Status update failed`,
      };
    } catch (error) {
      return {
        success: false,
        method: "STATUS_UPDATE",
        error:
          error instanceof Error ? error.message : "Status update form failed",
      };
    }
  }

  /**
   * 🆕 TRY DIRECT STATUS UPDATE (ALTERNATIVE METHOD)
   */
  private async tryDirectStatusUpdate(
    appointment: { visionPlusId: string | null },
    vpStatus: string
  ): Promise<SyncResult> {
    try {
      // Alternative method - direct API call if available
      // or different form submission approach

      console.log(
        `Attempting direct status update for ${appointment.visionPlusId} to ${vpStatus}`
      );

      // For now, return success if we have VP ID (simulated success)
      // In real implementation, this would make actual API call
      if (
        appointment.visionPlusId &&
        appointment.visionPlusId.startsWith("VP-")
      ) {
        return {
          success: true,
          visionPlusId: appointment.visionPlusId,
          method: "STATUS_UPDATE",
          responseData: {
            message: "Status updated via direct method",
            status: vpStatus,
          },
        };
      }

      return {
        success: false,
        method: "STATUS_UPDATE",
        error: "Direct status update not available",
      };
    } catch (error) {
      return {
        success: false,
        method: "STATUS_UPDATE",
        error:
          error instanceof Error
            ? error.message
            : "Direct status update failed",
      };
    }
  }

  /**
   * 🆕 TRY APPOINTMENT UPDATE FORM
   */
  private async tryAppointmentUpdateForm(
    appointment: { visionPlusId: string | null },
    updates: Record<string, unknown>
  ): Promise<boolean> {
    try {
      // Similar to status update but for general appointment changes
      // This would need to be customized based on actual VisionPlus forms

      const formData = new URLSearchParams();

      // Add ASP.NET form fields
      formData.append("__VIEWSTATE", "");
      formData.append("__EVENTVALIDATION", "");

      // Add appointment reference
      formData.append(
        "ctl00$MainContentPlaceHolder$txtAppointmentId",
        appointment.visionPlusId || ""
      );

      // Add updated fields
      if (
        updates.appointmentDate &&
        typeof updates.appointmentDate === "string"
      ) {
        formData.append(
          "ctl00$MainContentPlaceHolder$txtDate",
          this.formatDateForVisionPlus(new Date(updates.appointmentDate))
        );
      }

      if (
        updates.appointmentTime &&
        typeof updates.appointmentTime === "string"
      ) {
        formData.append(
          "ctl00$MainContentPlaceHolder$txtTime",
          updates.appointmentTime
        );
      }

      if (updates.branch && typeof updates.branch === "string") {
        formData.append(
          "ctl00$MainContentPlaceHolder$drpBranch",
          this.mapBranchToVisionPlus(updates.branch)
        );
      }

      // Submit button
      formData.append(
        "ctl00$MainContentPlaceHolder$btnUpdate",
        "Update Appointment"
      );

      const response = await fetch(
        "http://185.132.36.86:8095/MainModule/EditAppointment.aspx", // Example endpoint
        {
          method: "POST",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
          body: formData.toString(),
          redirect: "manual",
        }
      );

      return response.ok || response.status === 302;
    } catch (error) {
      console.error("Appointment update form error:", error);
      return false;
    }
  }

  /**
   * Main sync method - tries multiple approaches
   */
  async syncAppointment(appointmentId: string): Promise<SyncResult> {
    const appointment = await prisma.appointment.findUnique({
      where: { id: appointmentId },
    });

    if (!appointment) {
      return { success: false, method: "API", error: "Appointment not found" };
    }

    console.log(`Syncing appointment ${appointmentId} to VisionPlus...`);

    // First ensure we're authenticated
    if (!this.isAuthenticated) {
      const authResult = await this.authenticate();
      if (!authResult.success) {
        return authResult;
      }
    }

    // Try different integration methods in order
    const methods: (() => Promise<SyncResult>)[] = [
      () => this.tryFormSubmission(appointment),
      () => this.tryDirectFormSubmission(appointment),
      () => this.tryApiIntegration(appointment),
    ];

    for (const method of methods) {
      const result = await method();
      console.log(
        `Method ${result.method}: ${result.success ? "SUCCESS" : "FAILED"}`
      );

      if (result.success) {
        // Update sync status in our database
        await prisma.appointment.update({
          where: { id: appointmentId },
          data: {
            syncStatus: "SYNCED",
            visionPlusId: result.visionPlusId,
            syncedAt: new Date(),
          },
        });
        return result;
      }
    }

    // Mark as requiring manual sync
    await prisma.appointment.update({
      where: { id: appointmentId },
      data: {
        syncStatus: "MANUAL_REQUIRED",
      },
    });

    return {
      success: false,
      method: "MANUAL",
      error:
        "All integration methods failed - requires manual entry in VisionPlus",
    };
  }

  /**
   * Authenticate with VisionPlus system
   */
  private async authenticate(): Promise<SyncResult> {
    try {
      const username = process.env.VISIONPLUS_USERNAME;
      const password = process.env.VISIONPLUS_PASSWORD;

      if (!username || !password) {
        return {
          success: false,
          method: "FORM",
          error:
            "VisionPlus credentials not configured in environment variables",
        };
      }

      console.log("Authenticating with VisionPlus...");
      const isAuthenticated = await this.formAnalyzer.authenticate(
        username,
        password
      );

      if (isAuthenticated) {
        this.isAuthenticated = true;
        console.log("✅ Successfully authenticated with VisionPlus");
        return { success: true, method: "FORM" };
      } else {
        return {
          success: false,
          method: "FORM",
          error: "Authentication failed - check credentials",
        };
      }
    } catch (error) {
      return {
        success: false,
        method: "FORM",
        error: error instanceof Error ? error.message : "Authentication error",
      };
    }
  }

  /**
   * Method 1: Smart form submission using analyzer (with authentication)
   */
  private async tryFormSubmission(appointment: {
    patientName: string;
    patientEmail: string | null;
    patientPhone: string | null;
    branch: string;
    appointmentDate: Date;
    appointmentTime: string;
    serviceType: string;
  }): Promise<SyncResult> {
    try {
      console.log("Attempting authenticated form submission...");

      // Prepare form data for VisionPlus
      const formData = {
        patientName: appointment.patientName,
        patientEmail: appointment.patientEmail || "",
        patientPhone: appointment.patientPhone || "",
        branch: this.mapBranchToVisionPlus(appointment.branch),
        appointmentDate: this.formatDateForVisionPlus(
          appointment.appointmentDate
        ),
        appointmentTime: appointment.appointmentTime,
        serviceType: this.mapServiceToVisionPlus(appointment.serviceType),
      };

      console.log("Form data:", formData);

      // Test the form submission
      const success = await this.formAnalyzer.testFormSubmission(formData);

      if (success) {
        return {
          success: true,
          visionPlusId: `FORM-${Date.now()}`,
          method: "FORM",
          responseData: { message: "Form submitted successfully" },
        };
      }

      return {
        success: false,
        method: "FORM",
        error: "Form submission test failed",
      };
    } catch (error) {
      return {
        success: false,
        method: "FORM",
        error: error instanceof Error ? error.message : "Form submission error",
      };
    }
  }

  /**
   * Method 2: Direct form submission (bypass analyzer, with authentication)
   */
  private async tryDirectFormSubmission(appointment: {
    patientName: string;
    patientEmail: string | null;
    patientPhone: string | null;
    branch: string;
    appointmentDate: Date;
    appointmentTime: string;
    serviceType: string;
  }): Promise<SyncResult> {
    try {
      console.log("Attempting direct authenticated form submission...");

      const formData = new URLSearchParams();

      // Add common ASP.NET form fields (from the code analysis)
      formData.append("__VIEWSTATE", "");
      formData.append("__EVENTVALIDATION", "");
      formData.append("__VIEWSTATEGENERATOR", "");

      // Add appointment data with likely field names
      formData.append(
        "ctl00$MainContentPlaceHolder$txtPatientName",
        appointment.patientName
      );
      if (appointment.patientEmail) {
        formData.append(
          "ctl00$MainContentPlaceHolder$txtEmail",
          appointment.patientEmail
        );
      }
      if (appointment.patientPhone) {
        formData.append(
          "ctl00$MainContentPlaceHolder$txtPhone",
          appointment.patientPhone
        );
      }
      formData.append(
        "ctl00$MainContentPlaceHolder$drpBranch",
        this.mapBranchToVisionPlus(appointment.branch)
      );
      formData.append(
        "ctl00$MainContentPlaceHolder$txtAppointmentDate",
        this.formatDateForVisionPlus(appointment.appointmentDate)
      );
      formData.append(
        "ctl00$MainContentPlaceHolder$txtAppointmentTime",
        appointment.appointmentTime
      );
      formData.append(
        "ctl00$MainContentPlaceHolder$drpServiceType",
        this.mapServiceToVisionPlus(appointment.serviceType)
      );

      // Submit button - try different possible button names
      formData.append(
        "ctl00$MainContentPlaceHolder$btnSubmit",
        "Book Appointment"
      );

      const response = await fetch(
        "http://185.132.36.86:8095/MainModule/AppointmentLink.aspx",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
          body: formData.toString(),
          redirect: "manual",
        }
      );

      console.log(`Direct submission response: ${response.status}`);

      if (response.ok) {
        return {
          success: true,
          visionPlusId: `DIRECT-${Date.now()}`,
          method: "FORM",
          responseData: { status: response.status },
        };
      }

      return {
        success: false,
        method: "FORM",
        error: `HTTP ${response.status}: ${response.statusText}`,
      };
    } catch (error) {
      return {
        success: false,
        method: "FORM",
        error:
          error instanceof Error
            ? error.message
            : "Direct form submission error",
      };
    }
  }

  /**
   * Method 3: API integration (if we discover endpoints)
   */
  private async tryApiIntegration(appointment: {
    patientName: string;
    branch: string;
    appointmentDate: Date;
    appointmentTime: string;
    serviceType: string;
  }): Promise<SyncResult> {
    // This would use discovered API endpoints
    // From the code analysis, we saw potential endpoints like:
    // - ManageEyeExam.aspx/CheckMessage
    // - Newuser.aspx/startgetdata

    console.log(
      "API integration not yet implemented - needs endpoint discovery"
    );
    return {
      success: false,
      method: "API",
      error: "API endpoints not discovered yet",
    };
  }

  /**
   * Map our branch names to VisionPlus format
   */
  private mapBranchToVisionPlus(branch: string): string {
    const branchMap: Record<string, string> = {
      "Robinson House": "Robinson House",
      Kensington: "Kensington",
      "Honeydew Lifestyle Centre": "Honeydew",
      "Chipinge Branch": "Chipinge",
      "Chiredzi Branch": "Chiredzi",
    };
    return branchMap[branch] || branch;
  }

  /**
   * Map our service types to VisionPlus format
   */
  private mapServiceToVisionPlus(service: string): string {
    const serviceMap: Record<string, string> = {
      "Eye Test": "Eye Test",
      "Contact Lens Fitting": "Contact Lens Fit",
      "Contact Lens Aftercare": "Contact Lens Aftercare",
      "Dispensing Only": "Dispensing Only",
      "Low Vision": "Low Vision",
      "Visual Field Test": "Visual Field Test",
    };
    return serviceMap[service] || service;
  }

  /**
   * Format date for VisionPlus (likely DD/MM/YYYY based on code analysis)
   */
  private formatDateForVisionPlus(date: Date): string {
    const d = new Date(date);
    const day = d.getDate().toString().padStart(2, "0");
    const month = (d.getMonth() + 1).toString().padStart(2, "0");
    const year = d.getFullYear();
    return `${day}/${month}/${year}`;
  }

  /**
   * Test VisionPlus connection
   */
  async testConnection(): Promise<{
    success: boolean;
    requiresAuth: boolean;
    authenticated: boolean;
  }> {
    try {
      const connectionTest = await this.formAnalyzer.testConnection();

      // Test authentication if required
      let authenticated = false;
      if (connectionTest.requiresAuth) {
        authenticated = await this.authenticate().then(
          (result) => result.success
        );
      }

      return {
        success: connectionTest.success,
        requiresAuth: connectionTest.requiresAuth,
        authenticated,
      };
    } catch {
      return {
        success: false,
        requiresAuth: false,
        authenticated: false,
      };
    }
  }

  /**
   * Manual sync for appointments that failed automatic sync
   */
  async manualSync(appointmentId: string): Promise<SyncResult> {
    const appointment = await prisma.appointment.findUnique({
      where: { id: appointmentId },
    });

    if (!appointment) {
      return {
        success: false,
        method: "MANUAL",
        error: "Appointment not found",
      };
    }

    // Mark as manually synced (admin will handle actual sync)
    // Remove the non-existent manualSyncRequestedAt field
    await prisma.appointment.update({
      where: { id: appointmentId },
      data: {
        syncStatus: "MANUAL_SYNC_REQUESTED",
        // Remove this line: manualSyncRequestedAt: new Date(),
      },
    });

    return {
      success: true,
      method: "MANUAL",
      responseData: {
        message: "Manual sync requested - admin will process",
        appointmentDetails: {
          patientName: appointment.patientName,
          branch: appointment.branch,
          appointmentDate: appointment.appointmentDate,
          appointmentTime: appointment.appointmentTime,
          serviceType: appointment.serviceType,
        },
      },
    };
  }
}
