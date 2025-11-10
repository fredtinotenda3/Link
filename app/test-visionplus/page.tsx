"use client";

import { testVisionPlusAccess } from "@/lib/visionplus-discovery";
import { useState } from "react";
import { VisionPlusDiscoveryResult, VisionPlusApiResponse } from "@/types";

// Helper function to safely convert the API response
const convertToDiscoveryResult = (
  data: VisionPlusApiResponse
): VisionPlusDiscoveryResult => {
  const baseUrl = data.baseUrl || "http://185.132.36.86:8095";
  const summary = data.summary || {};

  return {
    baseUrl,
    accessTest: data.accessTest || [],
    loginRequired:
      data.loginRequired ?? summary.requiresAuthentication ?? false,
    formsFound: data.formsFound ?? summary.formsFound ?? 0,
    accessibleEndpoints:
      data.accessibleEndpoints ?? summary.accessibleEndpoints ?? 0,
    recommendations: data.recommendations || [],
    summary: {
      totalEndpointsTested: summary.totalEndpointsTested ?? 0,
      accessibleEndpoints: summary.accessibleEndpoints ?? 0,
      formsFound: summary.formsFound ?? 0,
      requiresAuthentication: summary.requiresAuthentication ?? false,
      serverStatus: summary.serverStatus || "Unknown",
      baseUrl: summary.baseUrl || baseUrl,
    },
    endpoints: data.endpoints,
    error: data.error,
  };
};

export default function TestVisionPlus() {
  const [results, setResults] = useState<VisionPlusDiscoveryResult | null>(
    null
  );
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const runTest = async () => {
    setLoading(true);
    setError(null);
    try {
      const discoveryResults = await testVisionPlusAccess();
      const convertedResults = convertToDiscoveryResult(
        discoveryResults as unknown as VisionPlusApiResponse
      );
      setResults(convertedResults);
    } catch (err) {
      // Fix: Properly handle unknown error
      const errorMessage =
        err instanceof Error ? err.message : "Unknown error occurred";
      setError(errorMessage);
      setResults(
        convertToDiscoveryResult({
          error: errorMessage,
          recommendations: ["❌ Failed to connect to VisionPlus server"],
        })
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-8 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">VisionPlus Access Test</h1>

      <div className="mb-6 p-4 bg-blue-50 rounded-lg">
        <p className="text-blue-800">
          <strong>Testing URL:</strong> http://185.132.36.86:8095
        </p>
        <p className="text-blue-600 text-sm mt-2">
          This will test if we can access VisionPlus forms and determine the
          integration approach.
        </p>
      </div>

      <button
        onClick={runTest}
        disabled={loading}
        className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 disabled:bg-gray-400 font-medium"
      >
        {loading
          ? "🔍 Testing VisionPlus Access..."
          : "🚀 Run VisionPlus Discovery"}
      </button>

      {error && (
        <div className="mt-4 p-4 bg-red-100 text-red-800 rounded-lg">
          <strong>Error:</strong> {error}
        </div>
      )}

      {results && (
        <div className="mt-8 space-y-6">
          {/* Summary */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-bold mb-4">📊 Discovery Summary</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center p-3 bg-gray-50 rounded">
                <div className="text-2xl font-bold text-blue-600">
                  {results.summary.totalEndpointsTested}
                </div>
                <div className="text-sm">Endpoints Tested</div>
              </div>
              <div className="text-center p-3 bg-gray-50 rounded">
                <div className="text-2xl font-bold text-green-600">
                  {results.summary.accessibleEndpoints}
                </div>
                <div className="text-sm">Accessible</div>
              </div>
              <div className="text-center p-3 bg-gray-50 rounded">
                <div className="text-2xl font-bold text-purple-600">
                  {results.summary.formsFound}
                </div>
                <div className="text-sm">Forms Found</div>
              </div>
              <div className="text-center p-3 bg-gray-50 rounded">
                <div
                  className={`text-2xl font-bold ${
                    results.summary.requiresAuthentication
                      ? "text-orange-600"
                      : "text-green-600"
                  }`}
                >
                  {results.summary.requiresAuthentication ? "Yes" : "No"}
                </div>
                <div className="text-sm">Requires Login</div>
              </div>
            </div>
          </div>

          {/* Recommendations */}
          <div className="bg-yellow-50 p-6 rounded-lg border border-yellow-200">
            <h3 className="text-lg font-bold mb-3">🎯 Next Steps</h3>
            <ul className="list-disc list-inside space-y-2">
              {results.recommendations.map((rec, index) => (
                <li
                  key={index}
                  className={
                    rec.includes("❌") ? "text-red-600" : "text-green-600"
                  }
                >
                  {rec}
                </li>
              ))}
            </ul>
          </div>

          {/* Access Test Details */}
          {results.accessTest.length > 0 && (
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-xl font-bold mb-4">🌐 Access Test Details</h2>
              <div className="space-y-4">
                {results.accessTest.map((test, index) => (
                  <div
                    key={index}
                    className={`p-4 rounded-lg border ${
                      test.accessible
                        ? "bg-green-50 border-green-200"
                        : "bg-red-50 border-red-200"
                    }`}
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="font-semibold">{test.name}</h4>
                        <p className="text-sm text-gray-600">{test.url}</p>
                        <p className="text-sm">
                          Status: {test.status} | Content Length:{" "}
                          {test.contentLength}
                        </p>
                        {test.pageTitle && (
                          <p className="text-sm mt-1">
                            Title: {test.pageTitle}
                          </p>
                        )}
                        {test.hasForm && (
                          <div className="mt-2">
                            <p className="text-sm font-medium">
                              Form: {test.formDetails.method}{" "}
                              {test.formDetails.action || "No action"}
                            </p>
                            <p className="text-sm">
                              Fields: {test.formDetails.fieldCount} | File
                              Upload:{" "}
                              {test.formDetails.hasFileUpload ? "Yes" : "No"} |
                              Captcha:{" "}
                              {test.formDetails.hasCaptcha ? "Yes" : "No"}
                            </p>
                            {test.formDetails.fields.length > 0 && (
                              <div className="flex flex-wrap gap-1 mt-1">
                                {test.formDetails.fields.map(
                                  (field, fieldIndex) => (
                                    <span
                                      key={fieldIndex}
                                      className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded"
                                    >
                                      {field}
                                    </span>
                                  )
                                )}
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                      <div className="text-right">
                        <span
                          className={`px-2 py-1 rounded text-xs font-medium ${
                            test.accessible
                              ? "bg-green-200 text-green-800"
                              : "bg-red-200 text-red-800"
                          }`}
                        >
                          {test.accessible ? "✅ Accessible" : "❌ Blocked"}
                        </span>
                        {test.hasForm && (
                          <span className="block mt-1 px-2 py-1 bg-purple-200 text-purple-800 rounded text-xs font-medium">
                            📝 Form
                          </span>
                        )}
                        {test.requiresLogin && (
                          <span className="block mt-1 px-2 py-1 bg-orange-200 text-orange-800 rounded text-xs font-medium">
                            🔐 Login Required
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Detailed Results */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-bold mb-4">🔍 Detailed Results</h2>
            <pre className="bg-gray-100 p-4 rounded overflow-auto text-sm">
              {JSON.stringify(results, null, 2)}
            </pre>
          </div>
        </div>
      )}
    </div>
  );
}
