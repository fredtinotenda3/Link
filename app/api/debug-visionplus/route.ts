import { NextResponse } from "next/server";

export async function GET() {
  try {
    const baseUrl = process.env.VISIONPLUS_BASE_URL;
    const username = process.env.VISIONPLUS_USERNAME;
    const password = process.env.VISIONPLUS_PASSWORD;

    // Test 1: Check environment variables
    console.log("🔍 Environment Check:");
    console.log("Base URL:", baseUrl);
    console.log("Username:", username ? "✓ Set" : "✗ Missing");
    console.log("Password:", password ? "✓ Set" : "✗ Missing");

    if (!baseUrl || !username || !password) {
      return NextResponse.json({
        success: false,
        error: "Missing environment variables",
        config: {
          baseUrl: !!baseUrl,
          username: !!username,
          password: !!password,
        },
      });
    }

    // Test 2: Basic connection test
    console.log("🌐 Testing basic connection...");
    const connectionTest = await fetch(baseUrl, {
      method: "GET",
      redirect: "manual",
    });

    console.log("Connection status:", connectionTest.status);

    // Test 3: Check login page
    console.log("🔐 Testing login page...");
    const loginTest = await fetch(`${baseUrl}/LoginUser.aspx`, {
      method: "GET",
      redirect: "manual",
    });

    return NextResponse.json({
      success: true,
      tests: {
        environment: "✓ Configured",
        baseConnection: connectionTest.status,
        loginPage: loginTest.status,
        visionPlusUrl: baseUrl,
      },
      raw: {
        connectionStatus: connectionTest.status,
        loginStatus: loginTest.status,
      },
    });
  } catch (error) {
    console.error("❌ Debug error:", error);
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : "Unknown error",
        stack: error instanceof Error ? error.stack : undefined,
      },
      { status: 500 }
    );
  }
}
