// lib/visionplus.ts

export interface VisionPlusAppointment {
  // These are example fields - we need actual VisionPlus API docs
  PatientName: string;
  PatientEmail?: string;
  PatientPhone?: string;
  PatientDOB?: string;
  Branch: string;
  AppointmentDate: string;
  AppointmentTime: string;
  ServiceType: string;
  Source: string;
}

export interface VisionPlusResponse {
  success: boolean;
  appointmentId?: string;
  error?: string;
  message?: string;
}

export class VisionPlusClient {
  private baseUrl: string;
  private apiKey: string;

  constructor() {
    this.baseUrl = process.env.VISIONPLUS_API_URL || "";
    this.apiKey = process.env.VISIONPLUS_API_KEY || "";
  }

  async createAppointment(
    appointment: VisionPlusAppointment
  ): Promise<VisionPlusResponse> {
    // Validate configuration
    if (!this.baseUrl || !this.apiKey) {
      throw new Error("VisionPlus API configuration missing");
    }

    try {
      const response = await fetch(`${this.baseUrl}/api/appointments`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${this.apiKey}`,
        },
        body: JSON.stringify(appointment),
      });

      if (!response.ok) {
        throw new Error(
          `VisionPlus API error: ${response.status} ${response.statusText}`
        );
      }

      const data = await response.json();
      return {
        success: true,
        appointmentId: data.appointmentId,
        message: data.message,
      };
    } catch (error) {
      console.error("VisionPlus integration error:", error);
      return {
        success: false,
        error: error instanceof Error ? error.message : "Unknown error",
      };
    }
  }

  // Test connection to VisionPlus
  async testConnection(): Promise<boolean> {
    if (!this.baseUrl || !this.apiKey) {
      return false;
    }

    try {
      const response = await fetch(`${this.baseUrl}/api/health`, {
        headers: {
          Authorization: `Bearer ${this.apiKey}`,
        },
      });
      return response.ok;
    } catch {
      return false;
    }
  }
}
