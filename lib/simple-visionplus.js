// lib/simple-visionplus.js
import fetch from "node-fetch";

export class SimpleVisionPlus {
  constructor() {
    this.baseUrl = "http://185.132.36.86:8095";
  }

  async testConnection() {
    try {
      const response = await fetch(this.baseUrl);
      return {
        success: response.ok,
        status: response.status,
        message: `VisionPlus is accessible (${response.status})`,
      };
    } catch (error) {
      return {
        success: false,
        status: 0,
        message: `Connection failed: ${error.message}`,
      };
    }
  }

  async findBookingForm() {
    console.log("🔍 Searching for booking form...");

    const potentialEndpoints = [
      "/OnlineBooking/BookAppointment.aspx",
      "/BookAppointment.aspx",
      "/OnlineAppointment.aspx",
    ];

    for (const endpoint of potentialEndpoints) {
      try {
        const response = await fetch(this.baseUrl + endpoint);
        if (response.ok) {
          const html = await response.text();
          const hasForm =
            html.includes("<form") &&
            (html.includes("appointment") || html.includes("booking"));

          if (hasForm) {
            return {
              found: true,
              endpoint,
              message: `Found booking form at: ${endpoint}`,
            };
          }
        }
      } catch (error) {
        // Continue to next endpoint
      }
    }

    return {
      found: false,
      message: "No public booking form found",
    };
  }

  async submitTestAppointment() {
    const bookingForm = await this.findBookingForm();

    if (!bookingForm.found) {
      return {
        success: false,
        message: "Cannot submit - no booking form found",
      };
    }

    // For now, just return the form location
    return {
      success: true,
      message: `Ready to submit to: ${bookingForm.endpoint}`,
      formUrl: this.baseUrl + bookingForm.endpoint,
    };
  }
}
