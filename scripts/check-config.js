// scripts/check-config.js
import { VisionPlusConfig } from "../lib/visionplus";

console.log("🔧 Checking VisionPlus Configuration...\n");

try {
  const validation = VisionPlusConfig.logConfigStatus();

  if (validation.valid) {
    console.log("\n✅ Configuration is valid! You can proceed with testing.");
    console.log("\nNext steps:");
    console.log("1. Run: npm run dev");
    console.log("2. Visit: http://localhost:3000/api/test-visionplus");
    console.log("3. Check the response for connection status");
  } else {
    console.log("\n❌ Configuration errors found:");
    validation.errors.forEach((error) => console.log(`   - ${error}`));
    console.log(
      "\nPlease update your .env.local file with the correct values."
    );
  }
} catch (error) {
  console.error("Error checking configuration:", error.message);
}
