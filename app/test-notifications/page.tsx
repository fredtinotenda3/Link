"use client";

import { useState, useEffect } from "react";
import {
  TestResult as NotificationTestResult,
  VisionPlusTestResult,
  Appointment,
  NotificationResult,
  AppointmentFormData,
} from "@/types";

interface NotificationConfig {
  email: {
    configured: boolean;
    provider?: string;
  };
  sms: {
    configured: boolean;
    provider?: string;
  };
}

interface NotificationTestResponse {
  success: boolean;
  configuration?: NotificationConfig;
  testAppointment?: {
    id: string;
    patientName: string;
    patientEmail: string | null;
    patientPhone: string | null;
  };
  instructions?: {
    email: string;
    sms: string;
  };
  result?: NotificationResult;
  error?: string;
}

interface AppointmentsResponse {
  appointments: Appointment[];
}

export default function TestNotificationsPage() {
  const [testResult, setTestResult] = useState<NotificationTestResponse | null>(
    null
  );
  const [loading, setLoading] = useState(false);
  const [selectedAppointment, setSelectedAppointment] = useState("");
  const [appointments, setAppointments] = useState<Appointment[]>([]);

  useEffect(() => {
    loadConfiguration();
    loadAppointments();
  }, []);

  const loadConfiguration = async () => {
    try {
      const response = await fetch("/api/test-notifications");
      const data: NotificationTestResponse = await response.json();
      setTestResult(data);
    } catch (error) {
      console.error("Failed to load configuration:", error);
    }
  };

  const loadAppointments = async () => {
    try {
      const response = await fetch("/api/appointments");
      const data: AppointmentsResponse = await response.json();
      setAppointments(data.appointments || []);
    } catch (error) {
      console.error("Failed to load appointments:", error);
    }
  };

  const runTest = async (testType: string) => {
    setLoading(true);
    try {
      const response = await fetch("/api/test-notifications", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          testType,
          appointmentId: selectedAppointment || undefined,
        }),
      });

      const data: NotificationTestResponse = await response.json();
      setTestResult(data);

      if (data.success) {
        alert(`✅ ${testType} test completed successfully!`);
      } else {
        alert(`❌ ${testType} test failed: ${data.error}`);
      }
    } catch (error) {
      alert("❌ Test failed - check console for details");
      console.error("Test error:", error);
    } finally {
      setLoading(false);
    }
  };

  const getConfigStatus = (config: NotificationConfig | undefined) => {
    if (!config) return "loading...";

    const emailStatus = config.email.configured
      ? "✅ Production"
      : "⚠️ Console Mode";
    const smsStatus = config.sms.configured
      ? "✅ Production"
      : "⚠️ Console Mode";

    return `Email: ${emailStatus} | SMS: ${smsStatus}`;
  };

  const getAppointmentDisplayName = (appointment: Appointment): string => {
    const date = new Date(appointment.appointmentDate).toLocaleDateString();
    return `${appointment.patientName} - ${appointment.branch} - ${date}`;
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Notification System Test
          </h1>
          <p className="text-xl text-gray-600">
            Test email and SMS notifications before going live
          </p>
        </div>

        {/* Configuration Status */}
        {testResult?.configuration && (
          <div className="bg-white p-6 rounded-lg shadow-md mb-6">
            <h2 className="text-xl font-semibold mb-4">Configuration Status</h2>
            <div
              className={`p-4 rounded-lg ${
                testResult.configuration.email.configured &&
                testResult.configuration.sms.configured
                  ? "bg-green-50 border border-green-200"
                  : "bg-yellow-50 border border-yellow-200"
              }`}
            >
              <p className="font-medium">
                {getConfigStatus(testResult.configuration)}
              </p>
              <p className="text-sm mt-2">{testResult.instructions?.email}</p>
              <p className="text-sm">{testResult.instructions?.sms}</p>
            </div>
          </div>
        )}

        {/* Test Controls */}
        <div className="bg-white p-6 rounded-lg shadow-md mb-6">
          <h2 className="text-xl font-semibold mb-4">Test Notifications</h2>

          {/* Appointment Selection */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Test with specific appointment:
            </label>
            <select
              value={selectedAppointment}
              onChange={(e) => setSelectedAppointment(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Use mock data</option>
              {appointments.map((appt) => (
                <option key={appt.id} value={appt.id}>
                  {getAppointmentDisplayName(appt)}
                </option>
              ))}
            </select>
          </div>

          {/* Test Buttons */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <button
              onClick={() => runTest("booking")}
              disabled={loading}
              className="px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-400 font-medium"
            >
              {loading ? "Testing..." : "📧 Test Booking Confirmation"}
            </button>

            <button
              onClick={() => runTest("status")}
              disabled={loading}
              className="px-4 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:bg-gray-400 font-medium"
            >
              {loading ? "Testing..." : "🔄 Test Status Update"}
            </button>

            <button
              onClick={() => runTest("reminder")}
              disabled={loading}
              className="px-4 py-3 bg-orange-600 text-white rounded-lg hover:bg-orange-700 disabled:bg-gray-400 font-medium"
            >
              {loading ? "Testing..." : "⏰ Test Reminder"}
            </button>
          </div>

          <div className="mt-4 text-sm text-gray-600">
            <p>
              • <strong>Console Mode:</strong> Notifications are logged to
              console (current)
            </p>
            <p>
              • <strong>Production:</strong> Real emails/SMS are sent to
              patients
            </p>
          </div>
        </div>

        {/* Test Results */}
        {testResult?.result && (
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">Test Results</h2>
            <div
              className={`p-4 rounded-lg ${
                testResult.result.success
                  ? "bg-green-50 border border-green-200"
                  : "bg-red-50 border border-red-200"
              }`}
            >
              <p
                className={`font-medium ${
                  testResult.result.success ? "text-green-800" : "text-red-800"
                }`}
              >
                {testResult.result.success ? "✅ Success" : "❌ Failed"}
              </p>
              {testResult.result.error && (
                <p className="text-red-600 mt-2">{testResult.result.error}</p>
              )}
              {testResult.result.messageId && (
                <p className="text-green-600 mt-2">
                  Message ID: {testResult.result.messageId}
                </p>
              )}
            </div>
            {testResult.result.details && (
              <details className="mt-4">
                <summary className="cursor-pointer font-medium text-gray-700">
                  View Detailed Results
                </summary>
                <pre className="bg-gray-100 p-4 rounded overflow-auto text-sm mt-2">
                  {JSON.stringify(testResult.result.details, null, 2)}
                </pre>
              </details>
            )}
          </div>
        )}

        {/* Next Steps */}
        <div className="mt-8 bg-blue-50 p-6 rounded-lg border border-blue-200">
          <h3 className="text-lg font-semibold text-blue-800 mb-3">
            Next Steps to Go Live
          </h3>
          <ol className="list-decimal list-inside space-y-2 text-blue-700">
            <li>Choose an email provider (Resend recommended for ease)</li>
            <li>
              Choose an SMS provider (Twilio or Africa&apos;s Talking for
              Zimbabwe)
            </li>
            <li>Sign up and get API keys from your chosen providers</li>
            <li>Add API keys to your .env.local file</li>
            <li>Test with real notifications using this page</li>
            <li>Deploy to production!</li>
          </ol>
        </div>
      </div>
    </div>
  );
}
