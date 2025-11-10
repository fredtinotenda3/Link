// scripts/simple-test.mjs
import fetch from "node-fetch";

const VISIONPLUS_URL = "http://185.132.36.86:8095";

async function simpleTest() {
  console.log("🔍 Simple VisionPlus Connection Test\n");

  // Test 1: Check if site is accessible
  console.log("1. Testing basic connection...");
  try {
    const response = await fetch(VISIONPLUS_URL);
    console.log(`   ✅ Main site: ${response.status} ${response.statusText}`);
  } catch (error) {
    console.log(`   ❌ Cannot connect: ${error.message}`);
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
      console.log(`   ${page}: ❌ ${error.message}`);
    }
  }

  // Test 3: Check login page
  console.log("\n3. Checking login requirements...");
  try {
    const response = await fetch(VISIONPLUS_URL + "/LoginUser.aspx");
    console.log(`   Login page: ${response.status} ${response.statusText}`);
  } catch (error) {
    console.log(`   Login page: ❌ ${error.message}`);
  }

  console.log("\n🎯 NEXT STEP:");
  console.log("Visit http://185.132.36.86:8095 in your browser");
  console.log('Look for "Book Appointment" or "Online Booking" links');
  console.log("Then we can target the correct page!");
}

simpleTest();
