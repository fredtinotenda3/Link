// scripts/test-api.js
const testAppointment = {
  patientName: "John Doe",
  patientEmail: "john@example.com",
  patientPhone: "+1234567890",
  patientDOB: "1990-01-15",
  branch: "Robinson House",
  appointmentDate: "2024-12-15",
  appointmentTime: "10:00 AM",
  serviceType: "Eye Test",
};

async function testCreateAppointment() {
  try {
    const response = await fetch("http://localhost:3000/api/appointments", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(testAppointment),
    });

    const result = await response.json();
    console.log("API Response:", result);

    if (response.ok) {
      console.log("✅ Appointment created successfully!");
      console.log("Appointment ID:", result.appointment.id);
    } else {
      console.log("❌ API Error:", result.error);
    }
  } catch (error) {
    console.log("❌ Network error:", error.message);
  }
}

testCreateAppointment();
