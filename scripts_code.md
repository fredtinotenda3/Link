===============================
  scripts\check-config.js
===============================
`$lang
// scripts/check-config.js
import { VisionPlusConfig } from "../lib/visionplus";

console.log("ðŸ”§ Checking VisionPlus Configuration...\n");

try {
  const validation = VisionPlusConfig.logConfigStatus();

  if (validation.valid) {
    console.log("\nâœ… Configuration is valid! You can proceed with testing.");
    console.log("\nNext steps:");
    console.log("1. Run: npm run dev");
    console.log("2. Visit: http://localhost:3000/api/test-visionplus");
    console.log("3. Check the response for connection status");
  } else {
    console.log("\nâŒ Configuration errors found:");
    validation.errors.forEach((error) => console.log(`   - ${error}`));
    console.log(
      "\nPlease update your .env.local file with the correct values."
    );
  }
} catch (error) {
  console.error("Error checking configuration:", error.message);
}

```

===============================
  scripts\simple-test.js
===============================
`$lang
// scripts/simple-test.mjs
import fetch from "node-fetch";

const VISIONPLUS_URL = "http://185.132.36.86:8095";

async function simpleTest() {
  console.log("ðŸ” Simple VisionPlus Connection Test\n");

  // Test 1: Check if site is accessible
  console.log("1. Testing basic connection...");
  try {
    const response = await fetch(VISIONPLUS_URL);
    console.log(`   âœ… Main site: ${response.status} ${response.statusText}`);
  } catch (error) {
    console.log(`   âŒ Cannot connect: ${error.message}`);
    return;
  }

  // Test 2: Look for booking pages
  console.log("\n2. Looking for booking pages...");
  const pages = [
    "/OnlineBooking/BookAppointment.aspx",
    "/BookAppointment.aspx",
    "/OnlineAppointment.aspx",
    "/booking",
    "/appointments",
    "/MainModule/AppointmentLink.aspx",
  ];

  for (const page of pages) {
    try {
      const response = await fetch(VISIONPLUS_URL + page, {
        method: "HEAD",
        redirect: "manual",
      });
      console.log(`   ${page}: ${response.status} ${response.statusText}`);
    } catch (error) {
      console.log(`   ${page}: âŒ ${error.message}`);
    }
  }

  // Test 3: Check login page
  console.log("\n3. Checking login requirements...");
  try {
    const response = await fetch(VISIONPLUS_URL + "/LoginUser.aspx");
    console.log(`   Login page: ${response.status} ${response.statusText}`);
  } catch (error) {
    console.log(`   Login page: âŒ ${error.message}`);
  }

  console.log("\nðŸŽ¯ NEXT STEP:");
  console.log("Visit http://185.132.36.86:8095 in your browser");
  console.log('Look for "Book Appointment" or "Online Booking" links');
  console.log("Then we can target the correct page!");
}

simpleTest();

```

===============================
  scripts\test-api.js
===============================
`$lang
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
      console.log("âœ… Appointment created successfully!");
      console.log("Appointment ID:", result.appointment.id);
    } else {
      console.log("âŒ API Error:", result.error);
    }
  } catch (error) {
    console.log("âŒ Network error:", error.message);
  }
}

testCreateAppointment();

```

