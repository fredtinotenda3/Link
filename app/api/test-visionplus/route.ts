// app/api/test-visionplus/route.ts - DEBUG VERSION
import { NextRequest, NextResponse } from "next/server";
import { VisionPlusFormAnalyzer } from "@/lib/visionplus-form-analyzer";

export async function GET() {
  try {
    console.log("🔍 Starting VisionPlus test...");

    // Test 1: Check environment variables
    const baseUrl = process.env.VISIONPLUS_BASE_URL;
    const username = process.env.VISIONPLUS_USERNAME;
    const password = process.env.VISIONPLUS_PASSWORD;

    console.log("📋 Environment check:");
    console.log("Base URL:", baseUrl);
    console.log("Username:", username ? "✓ Set" : "✗ Missing");
    console.log("Password:", password ? "✓ Set" : "✗ Missing");

    if (!baseUrl || !username || !password) {
      return NextResponse.json({
        success: false,
        error: "Missing environment variables",
        missing: {
          baseUrl: !baseUrl,
          username: !username,
          password: !password,
        },
      });
    }

    // Test 2: Basic connection test
    console.log("🌐 Testing basic connection...");
    let connectionTest;
    try {
      connectionTest = await fetch(baseUrl, { redirect: "manual" });
      console.log(`Basic connection: ${connectionTest.status}`);
    } catch (error) {
      console.error("Basic connection failed:", error);
      return NextResponse.json({
        success: false,
        error: `Basic connection failed: ${
          error instanceof Error ? error.message : "Unknown error"
        }`,
        step: "basic_connection",
      });
    }

    // Test 3: Test login page
    console.log("🔐 Testing login page...");
    let loginTest;
    try {
      loginTest = await fetch(`${baseUrl}/LoginUser.aspx`, {
        redirect: "manual",
      });
      console.log(`Login page: ${loginTest.status}`);
    } catch (error) {
      console.error("Login page test failed:", error);
      return NextResponse.json({
        success: false,
        error: `Login page test failed: ${
          error instanceof Error ? error.message : "Unknown error"
        }`,
        step: "login_page_test",
      });
    }

    // Test 4: Test authentication
    console.log("🔑 Testing authentication...");
    let authResult;
    try {
      const formAnalyzer = new VisionPlusFormAnalyzer();
      authResult = await formAnalyzer.authenticate(username, password);
      console.log(`Authentication: ${authResult ? "✓ Success" : "✗ Failed"}`);
    } catch (error) {
      console.error("Authentication test failed:", error);
      return NextResponse.json({
        success: false,
        error: `Authentication test failed: ${
          error instanceof Error ? error.message : "Unknown error"
        }`,
        step: "authentication",
        stack: error instanceof Error ? error.stack : undefined,
      });
    }

    // Return comprehensive results
    return NextResponse.json({
      success: true,
      tests: {
        environment: "✓ Configured",
        basicConnection: connectionTest.status,
        loginPage: loginTest.status,
        authentication: authResult ? "✓ Success" : "✗ Failed",
      },
      details: {
        baseUrl,
        requiresAuthentication: loginTest.status === 200,
        authenticated: authResult,
      },
      nextSteps: authResult
        ? [
            "✅ Authentication successful!",
            "Next: Test form submission with appointment data",
          ]
        : [
            "❌ Authentication failed",
            "Check credentials and try manual login in browser",
          ],
    });
  } catch (error) {
    console.error("💥 VisionPlus test failed with unexpected error:", error);
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : "Unknown error",
        step: "unexpected_error",
        stack: error instanceof Error ? error.stack : undefined,
      },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { testData, testType = "form" } = body;

    const formAnalyzer = new VisionPlusFormAnalyzer();

    let result;

    if (testType === "connection") {
      // Test connection only
      result = await formAnalyzer.testConnection();
    } else {
      // Test form submission
      const submissionTest = await formAnalyzer.testFormSubmission(
        testData || {
          patientName: "Test Patient",
          patientEmail: "test@example.com",
          patientPhone: "0771234567",
          branch: "Robinson House",
          appointmentDate: "15/12/2024",
          appointmentTime: "10:00",
          serviceType: "Eye Test",
        }
      );

      result = { submissionTest };
    }

    return NextResponse.json({
      success: true,
      testType,
      result,
      message:
        testType === "connection"
          ? "Connection test completed"
          : "Form submission test completed",
    });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : "Test failed",
      },
      { status: 500 }
    );
  }
}
