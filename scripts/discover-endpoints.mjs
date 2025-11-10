// scripts/discover-endpoints.mjs
import fetch from "node-fetch";

const VISIONPLUS_BASE = "http://185.132.36.86:8095";

async function discoverEndpoints() {
  console.log("🎯 VisionPlus Endpoint Discovery\n");

  const endpoints = [
    // Common booking endpoints
    "/OnlineBooking/BookAppointment.aspx",
    "/BookAppointment.aspx",
    "/OnlineAppointment.aspx",
    "/Appointment/Book.aspx",
    "/Booking/Appointment.aspx",
    "/Public/BookAppointment.aspx",
    "/External/AppointmentBooking.aspx",

    // Admin endpoints (for reference)
    "/MainModule/AppointmentLink.aspx",
    "/MainModule/ManageOnlineAppointment.aspx",
    "/MainModule/OptometristDiary.aspx",

    // Generic pages
    "/booking",
    "/appointments",
    "/online-booking",
  ];

  const results = [];

  for (const endpoint of endpoints) {
    const url = VISIONPLUS_BASE + endpoint;
    try {
      const response = await fetch(url, {
        method: "GET",
        redirect: "manual",
      });

      let status = "❌";
      if (response.status === 200) status = "✅ FORM PAGE";
      if (response.status === 302) status = "🔄 REDIRECT";
      if (response.status === 404) status = "🚫 NOT FOUND";
      if (response.status === 401 || response.status === 403)
        status = "🔐 AUTH REQUIRED";

      results.push({
        endpoint,
        status: response.status,
        description: status,
        location: response.headers.get("location") || "-",
      });

      console.log(`${status} ${endpoint.padEnd(40)} ${response.status}`);
    } catch (error) {
      results.push({
        endpoint,
        status: "ERROR",
        description: "❌ NETWORK ERROR",
        location: error.message,
      });
      console.log(`❌ ${endpoint.padEnd(40)} ${error.message}`);
    }
  }

  console.log("\n📊 SUMMARY:");
  const formPages = results.filter((r) => r.description.includes("FORM PAGE"));
  const redirects = results.filter((r) => r.description.includes("REDIRECT"));

  console.log(`Form Pages: ${formPages.length}`);
  console.log(`Redirects: ${redirects.length}`);

  if (formPages.length > 0) {
    console.log("\n🎯 POTENTIAL BOOKING FORMS:");
    formPages.forEach((page) => {
      console.log(`   📝 ${page.endpoint}`);
    });
  }
}

discoverEndpoints();
