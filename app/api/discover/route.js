// app/api/discover/route.js
import { SimpleVisionPlus } from "@/lib/simple-visionplus";

export async function GET() {
  const visionplus = new SimpleVisionPlus();

  try {
    const connection = await visionplus.testConnection();
    const bookingForm = await visionplus.findBookingForm();
    const testSubmission = await visionplus.submitTestAppointment();

    return Response.json({
      success: true,
      connection,
      bookingForm,
      testSubmission,
      timestamp: new Date().toISOString(),
      nextSteps: bookingForm.found
        ? [
            "🎯 Booking form found!",
            "1. Visit the form URL to see the actual form",
            "2. Analyze the form fields and structure",
            "3. Implement form submission",
          ]
        : [
            "🔍 No public booking form found",
            "1. Check if VisionPlus has online booking enabled",
            '2. Look for "Book Appointment" links on main site',
            "3. Contact VisionPlus support about online booking",
          ],
    });
  } catch (error) {
    return Response.json(
      {
        success: false,
        error: error.message,
      },
      { status: 500 }
    );
  }
}
