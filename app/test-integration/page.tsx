"use client";

import { useState } from "react";
import {
  TestResult,
  TestDetails,
  VisionPlusTestResult,
  SyncStatusResponse,
  AppointmentCreateResponse,
  Appointment,
} from "@/types";

export default function IntegrationTestPage() {
  const [testResults, setTestResults] = useState<TestResult[]>([]);
  const [isTesting, setIsTesting] = useState(false);
  const [visionPlusUrl, setVisionPlusUrl] = useState(
    "http://185.132.36.86:8095"
  );

  const addTestResult = (
    step: string,
    status: TestResult["status"],
    message: string,
    details?: TestDetails
  ) => {
    setTestResults((prev) => [...prev, { step, status, message, details }]);
  };

  const clearResults = () => {
    setTestResults([]);
  };

  const runFullIntegrationTest = async () => {
    setIsTesting(true);
    clearResults();

    try {
      // STEP 1: Test Database Connection
      addTestResult("Database", "pending", "Testing database connection...");
      const dbTest = await fetch("/api/appointments");
      if (dbTest.ok) {
        addTestResult(
          "Database",
          "success",
          "✅ Database connection successful"
        );
      } else {
        addTestResult("Database", "error", "❌ Database connection failed");
        return;
      }

      // STEP 2: Test VisionPlus Connection
      addTestResult(
        "VisionPlus Connection",
        "pending",
        "Testing VisionPlus server connection..."
      );
      const vpConnectionTest = await fetch("/api/test-visionplus");
      const vpResult: VisionPlusTestResult = await vpConnectionTest.json();

      if (vpResult.success) {
        addTestResult(
          "VisionPlus Connection",
          "success",
          "✅ VisionPlus server is accessible"
        );
      } else {
        addTestResult(
          "VisionPlus Connection",
          "error",
          "❌ Cannot connect to VisionPlus",
          { error: vpResult.error }
        );
      }

      // STEP 3: Test Authentication (if needed)
      if (vpResult.connection?.requiresAuthentication) {
        addTestResult(
          "Authentication",
          "pending",
          "Testing VisionPlus authentication..."
        );
        const authTest = await fetch("/api/test-visionplus", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ testType: "connection" }),
        });
        const authResult: VisionPlusTestResult = await authTest.json();

        if (authResult.success) {
          addTestResult(
            "Authentication",
            "success",
            "✅ Authentication successful"
          );
        } else {
          addTestResult("Authentication", "error", "❌ Authentication failed", {
            error: authResult.error,
          });
        }
      }

      // STEP 4: Test Form Submission
      addTestResult(
        "Form Submission",
        "pending",
        "Testing appointment form submission..."
      );
      const testAppointment = {
        patientName: "Integration Test Patient",
        patientEmail: "test@integration.com",
        patientPhone: "0771234567",
        patientDOB: "1990-01-01",
        branch: "Robinson House",
        appointmentDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
          .toISOString()
          .split("T")[0], // 7 days from now
        appointmentTime: "10:00",
        serviceType: "Eye Test",
      };

      const formTest = await fetch("/api/test-visionplus", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          testType: "form",
          testData: testAppointment,
        }),
      });
      const formResult: VisionPlusTestResult = await formTest.json();

      if (formResult.success) {
        addTestResult(
          "Form Submission",
          "success",
          "✅ Form submission test completed",
          { result: JSON.stringify(formResult.result, null, 2) }
        );
      } else {
        addTestResult(
          "Form Submission",
          "warning",
          "⚠️ Form submission may require adjustments",
          { error: formResult.error }
        );
      }

      // STEP 5: Test Real Appointment Creation
      addTestResult(
        "Appointment Creation",
        "pending",
        "Creating test appointment in database..."
      );
      const appointmentResponse = await fetch("/api/appointments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(testAppointment),
      });
      const appointmentResult: AppointmentCreateResponse =
        await appointmentResponse.json();

      if (appointmentResponse.ok && appointmentResult.success) {
        const appointmentDetails: TestDetails = {
          appointmentId: appointmentResult.appointment?.id,
          message: appointmentResult.message,
        };

        addTestResult(
          "Appointment Creation",
          "success",
          "✅ Test appointment created successfully",
          appointmentDetails
        );

        // STEP 6: Test Sync Functionality
        addTestResult(
          "Sync Function",
          "pending",
          "Testing sync to VisionPlus..."
        );

        // Wait a moment for auto-sync to trigger
        await new Promise((resolve) => setTimeout(resolve, 2000));

        // Check sync status
        if (appointmentResult.appointment?.id) {
          const syncCheck = await fetch(
            `/api/sync/${appointmentResult.appointment.id}`
          );
          const syncStatus: SyncStatusResponse = await syncCheck.json();

          if (syncStatus.appointment?.syncStatus === "SYNCED") {
            addTestResult(
              "Sync Function",
              "success",
              "✅ Appointment synced to VisionPlus!",
              {
                visionPlusId: syncStatus.appointment.visionPlusId,
                syncStatus: syncStatus.appointment.syncStatus,
              }
            );
          } else {
            addTestResult(
              "Sync Function",
              "warning",
              "⚠️ Sync may require manual intervention",
              {
                syncStatus: syncStatus.appointment?.syncStatus,
                canSync: syncStatus.syncInfo?.canSync,
              }
            );
          }
        }
      } else {
        addTestResult(
          "Appointment Creation",
          "error",
          "❌ Failed to create test appointment",
          { error: appointmentResult.error }
        );
      }

      // STEP 7: Test Background Sync
      addTestResult(
        "Background Sync",
        "pending",
        "Testing background sync functionality..."
      );
      const backgroundTest = await fetch("/api/sync/background", {
        method: "GET",
      });
      const backgroundStatus = await backgroundTest.json();

      if (backgroundTest.ok) {
        addTestResult(
          "Background Sync",
          "success",
          "✅ Background sync system is operational",
          {
            queueStatus: backgroundStatus.queueStatus,
            totalAppointments: backgroundStatus.totalAppointments,
          }
        );
      } else {
        addTestResult(
          "Background Sync",
          "error",
          "❌ Background sync system error",
          { error: backgroundStatus.error }
        );
      }

      // FINAL SUMMARY
      const successCount = testResults.filter(
        (r) => r.status === "success"
      ).length;
      const totalTests = testResults.length;

      addTestResult(
        "Summary",
        "success",
        `🎉 Integration Test Complete: ${successCount}/${totalTests} tests passed!`
      );
    } catch (error) {
      addTestResult(
        "Test Runner",
        "error",
        "💥 Test runner encountered an error",
        { error: error instanceof Error ? error.message : "Unknown error" }
      );
    } finally {
      setIsTesting(false);
    }
  };

  const runQuickTest = async () => {
    setIsTesting(true);
    clearResults();

    try {
      // Quick connection test only
      addTestResult(
        "Quick Test",
        "pending",
        "Running quick connectivity test..."
      );

      const [dbTest, vpTest] = await Promise.all([
        fetch("/api/appointments"),
        fetch("/api/test-visionplus"),
      ]);

      const dbResult = dbTest.ok;
      const vpResult: VisionPlusTestResult = await vpTest.json();

      if (dbResult && vpResult.success) {
        addTestResult(
          "Quick Test",
          "success",
          "✅ All systems operational! Database and VisionPlus are connected."
        );
      } else {
        addTestResult(
          "Quick Test",
          "error",
          "❌ Connectivity issues detected",
          {
            database: dbResult,
            visionPlus: vpResult.success,
            visionPlusError: vpResult.error,
          }
        );
      }
    } catch (error) {
      addTestResult("Quick Test", "error", "💥 Quick test failed", {
        error: error instanceof Error ? error.message : "Unknown error",
      });
    } finally {
      setIsTesting(false);
    }
  };

  const getStatusIcon = (status: TestResult["status"]) => {
    switch (status) {
      case "success":
        return "✅";
      case "error":
        return "❌";
      case "warning":
        return "⚠️";
      case "pending":
        return "⏳";
      default:
        return "🔍";
    }
  };

  const getStatusColor = (status: TestResult["status"]) => {
    switch (status) {
      case "success":
        return "text-green-600 bg-green-50 border-green-200";
      case "error":
        return "text-red-600 bg-red-50 border-red-200";
      case "warning":
        return "text-orange-600 bg-orange-50 border-orange-200";
      case "pending":
        return "text-blue-600 bg-blue-50 border-blue-200";
      default:
        return "text-gray-600 bg-gray-50 border-gray-200";
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            VisionPlus Integration Test
          </h1>
          <p className="text-xl text-gray-600">
            Comprehensive test suite for VisionPlus integration
          </p>
          <div className="mt-4 p-4 bg-blue-50 rounded-lg max-w-2xl mx-auto">
            <p className="text-blue-800 text-sm">
              <strong>VisionPlus URL:</strong> {visionPlusUrl}
            </p>
          </div>
        </div>

        {/* Test Controls */}
        <div className="bg-white p-6 rounded-lg shadow-md mb-6">
          <div className="flex flex-wrap gap-4 justify-center">
            <button
              onClick={runQuickTest}
              disabled={isTesting}
              className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:bg-gray-400 font-medium"
            >
              {isTesting ? "🔄 Running..." : "🚀 Quick Test"}
            </button>

            <button
              onClick={runFullIntegrationTest}
              disabled={isTesting}
              className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-400 font-medium"
            >
              {isTesting
                ? "🔄 Running Full Test..."
                : "🔍 Full Integration Test"}
            </button>

            <button
              onClick={clearResults}
              disabled={isTesting}
              className="px-6 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 disabled:bg-gray-400 font-medium"
            >
              🗑️ Clear Results
            </button>
          </div>

          {isTesting && (
            <div className="mt-4 text-center">
              <div className="inline-flex items-center px-4 py-2 bg-blue-100 text-blue-800 rounded-lg">
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-800 mr-2"></div>
                Running integration tests...
              </div>
            </div>
          )}
        </div>

        {/* Test Results */}
        <div className="space-y-4">
          {testResults.map((result, index) => (
            <div
              key={index}
              className={`p-4 rounded-lg border-2 ${getStatusColor(
                result.status
              )}`}
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center mb-2">
                    <span className="text-lg mr-3">
                      {getStatusIcon(result.status)}
                    </span>
                    <h3 className="font-semibold text-lg">{result.step}</h3>
                  </div>
                  <p className="text-gray-700 ml-8">{result.message}</p>

                  {result.details && (
                    <div className="mt-3 ml-8 p-3 bg-white bg-opacity-50 rounded border">
                      <details>
                        <summary className="cursor-pointer font-medium text-sm text-gray-600">
                          View Details
                        </summary>
                        <pre className="mt-2 text-xs overflow-auto max-h-40">
                          {JSON.stringify(result.details, null, 2)}
                        </pre>
                      </details>
                    </div>
                  )}
                </div>

                <div
                  className={`px-3 py-1 rounded-full text-xs font-medium ${
                    result.status === "success"
                      ? "bg-green-200 text-green-800"
                      : result.status === "error"
                      ? "bg-red-200 text-red-800"
                      : result.status === "warning"
                      ? "bg-orange-200 text-orange-800"
                      : "bg-blue-200 text-blue-800"
                  }`}
                >
                  {result.status.toUpperCase()}
                </div>
              </div>
            </div>
          ))}

          {testResults.length === 0 && !isTesting && (
            <div className="text-center py-12 text-gray-500">
              <div className="text-6xl mb-4">🔍</div>
              <h3 className="text-xl font-semibold mb-2">No tests run yet</h3>
              <p>
                Click &quot;Quick Test&quot; or &quot;Full Integration
                Test&quot; to start testing your VisionPlus integration.
              </p>
            </div>
          )}
        </div>

        {/* Next Steps */}
        {testResults.length > 0 && !isTesting && (
          <div className="mt-8 bg-yellow-50 p-6 rounded-lg border border-yellow-200">
            <h3 className="text-lg font-semibold text-yellow-800 mb-3">
              Next Steps
            </h3>
            <ul className="list-disc list-inside space-y-2 text-yellow-700">
              <li>Check the test results above for any errors or warnings</li>
              <li>
                Visit the Admin Dashboard to manage appointments and sync status
              </li>
              <li>Test booking a real appointment through the main website</li>
              <li>Monitor the sync queue in the background sync panel</li>
              <li>
                Check server logs for detailed error information if needed
              </li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
