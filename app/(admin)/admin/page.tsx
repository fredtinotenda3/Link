"use client";

import { useState, useEffect } from "react";
import { Appointment, StatusInfo, QueueStatus } from "@/types";

export default function AdminDashboard() {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all");
  const [syncingAppointments, setSyncingAppointments] = useState<Set<string>>(
    new Set()
  );
  const [backgroundSyncRunning, setBackgroundSyncRunning] = useState(false);
  const [queueStatus, setQueueStatus] = useState<QueueStatus | null>(null);
  const [lastBackgroundRun, setLastBackgroundRun] = useState<string | null>(
    null
  );
  const [updatingStatuses, setUpdatingStatuses] = useState<Set<string>>(
    new Set()
  );
  const [statusInfo, setStatusInfo] = useState<Record<string, StatusInfo>>({});

  useEffect(() => {
    fetchAppointments();
    loadQueueStatus();
  }, [filter]);

  const fetchAppointments = async () => {
    try {
      const url =
        filter === "all"
          ? "/api/appointments"
          : `/api/appointments?status=${filter}`;

      const response = await fetch(url);
      const data = await response.json();
      setAppointments(data.appointments || []);

      // Load status info for each appointment
      loadStatusInfoForAppointments(data.appointments || []);
    } catch (error) {
      console.error("Failed to fetch appointments:", error);
    } finally {
      setLoading(false);
    }
  };

  const loadStatusInfoForAppointments = async (appts: Appointment[]) => {
    const newStatusInfo: Record<string, StatusInfo> = {};

    for (const appointment of appts) {
      try {
        const response = await fetch(
          `/api/appointments/${appointment.id}/status`
        );
        const data = await response.json();
        if (data.statusInfo) {
          newStatusInfo[appointment.id] = data.statusInfo;
        }
      } catch (error) {
        console.error(
          `Failed to load status info for ${appointment.id}:`,
          error
        );
      }
    }

    setStatusInfo(newStatusInfo);
  };

  const loadQueueStatus = async () => {
    try {
      const response = await fetch("/api/sync/background");
      const data = await response.json();
      setQueueStatus(data);
    } catch (error) {
      console.error("Failed to load queue status:", error);
    }
  };

  // 🆕 STATUS UPDATE FUNCTION
  const handleStatusUpdate = async (
    appointmentId: string,
    newStatus: string,
    reason?: string
  ) => {
    if (updatingStatuses.has(appointmentId)) return;

    setUpdatingStatuses((prev) => new Set(prev).add(appointmentId));

    try {
      const response = await fetch(
        `/api/appointments/${appointmentId}/status`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            status: newStatus,
            reason: reason,
            notifyUser: true,
          }),
        }
      );

      const result = await response.json();

      if (result.success) {
        console.log(`✅ Status updated to ${newStatus}:`, result);
        await fetchAppointments();
        await loadQueueStatus();

        // Show success message
        alert(`Appointment status updated to ${newStatus}`);
      } else {
        console.error("❌ Status update failed:", result.error);
        alert(`Status update failed: ${result.error}`);
      }
    } catch (error) {
      console.error("❌ Status update request failed:", error);
      alert("Failed to update status");
    } finally {
      setUpdatingStatuses((prev) => {
        const newSet = new Set(prev);
        newSet.delete(appointmentId);
        return newSet;
      });
    }
  };

  // 🆕 STATUS BUTTON COMPONENT
  const StatusButton = ({
    appointment,
    status,
    label,
    variant = "primary",
  }: {
    appointment: Appointment;
    status: string;
    label: string;
    variant?: "primary" | "danger" | "success" | "warning";
  }) => {
    const isUpdating = updatingStatuses.has(appointment.id);
    const canUpdate =
      statusInfo[appointment.id]?.allowedTransitions.includes(status);

    if (!canUpdate) return null;

    const variantClasses = {
      primary: "bg-blue-600 hover:bg-blue-700",
      danger: "bg-red-600 hover:bg-red-700",
      success: "bg-green-600 hover:bg-green-700",
      warning: "bg-orange-600 hover:bg-orange-700",
    };

    return (
      <button
        onClick={() => handleStatusUpdate(appointment.id, status)}
        disabled={isUpdating}
        className={`px-2 py-1 text-xs rounded text-white ${
          variantClasses[variant]
        } ${isUpdating ? "opacity-50 cursor-not-allowed" : ""}`}
      >
        {isUpdating ? "..." : label}
      </button>
    );
  };

  // Existing sync function (keep your existing code)
  const handleSyncAppointment = async (appointmentId: string) => {
    if (syncingAppointments.has(appointmentId)) return;

    setSyncingAppointments((prev) => new Set(prev).add(appointmentId));

    try {
      const response = await fetch(`/api/sync/${appointmentId}`, {
        method: "POST",
      });

      const result = await response.json();

      if (result.success) {
        console.log("✅ Sync successful:", result);
        await fetchAppointments();
        await loadQueueStatus();
      } else {
        console.error("❌ Sync failed:", result.error);
        alert(`Sync failed: ${result.error}`);
      }
    } catch (error) {
      console.error("❌ Sync request failed:", error);
      alert("Failed to trigger sync");
    } finally {
      setSyncingAppointments((prev) => {
        const newSet = new Set(prev);
        newSet.delete(appointmentId);
        return newSet;
      });
    }
  };

  // Existing background sync functions (keep your existing code)
  const runBackgroundSync = async () => {
    if (backgroundSyncRunning) return;

    setBackgroundSyncRunning(true);
    try {
      const response = await fetch("/api/sync/background", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          batchSize: 10,
          maxRetries: 3,
        }),
      });

      const result = await response.json();

      if (result.success) {
        setLastBackgroundRun(new Date().toLocaleTimeString());
        alert(
          `✅ Background sync completed!\nSynced: ${result.summary.synced}\nFailed: ${result.summary.failed}`
        );
        await fetchAppointments();
        await loadQueueStatus();
      } else {
        alert(`❌ Background sync failed: ${result.error}`);
      }
    } catch (error) {
      alert("❌ Failed to run background sync");
      console.error("Background sync error:", error);
    } finally {
      setBackgroundSyncRunning(false);
    }
  };

  const syncAllPending = async () => {
    if (backgroundSyncRunning) return;

    setBackgroundSyncRunning(true);
    try {
      const response = await fetch("/api/sync/background", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          batchSize: 50,
          maxRetries: 5,
        }),
      });

      const result = await response.json();

      if (result.success) {
        setLastBackgroundRun(new Date().toLocaleTimeString());
        alert(
          `✅ Sync All completed!\nProcessed: ${result.summary.processed}\nSynced: ${result.summary.synced}\nFailed: ${result.summary.failed}`
        );
        await fetchAppointments();
        await loadQueueStatus();
      } else {
        alert(`❌ Sync All failed: ${result.error}`);
      }
    } catch (error) {
      alert("❌ Failed to run Sync All");
      console.error("Sync All error:", error);
    } finally {
      setBackgroundSyncRunning(false);
    }
  };

  // Existing UI helper functions (keep your existing code)
  const getStatusColor = (status: string) => {
    switch (status) {
      case "CONFIRMED":
        return "bg-green-100 text-green-800";
      case "CANCELLED":
        return "bg-red-100 text-red-800";
      case "NOSHOW":
        return "bg-orange-100 text-orange-800";
      case "COMPLETED":
        return "bg-purple-100 text-purple-800";
      default:
        return "bg-blue-100 text-blue-800";
    }
  };

  const getSyncColor = (syncStatus: string) => {
    switch (syncStatus) {
      case "SYNCED":
        return "bg-green-100 text-green-800";
      case "FAILED":
        return "bg-red-100 text-red-800";
      case "MANUAL_REQUIRED":
        return "bg-orange-100 text-orange-800";
      case "PENDING":
        return "bg-yellow-100 text-yellow-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  // Existing SyncButton component (keep your existing code)
  const SyncButton = ({ appointment }: { appointment: Appointment }) => {
    const isSyncing = syncingAppointments.has(appointment.id);
    const canSync = appointment.syncStatus !== "SYNCED";

    if (!canSync && appointment.syncStatus === "SYNCED") {
      return (
        <div className="text-xs text-green-600">
          ✅ Synced
          {appointment.visionPlusId && (
            <div className="text-green-500">ID: {appointment.visionPlusId}</div>
          )}
        </div>
      );
    }

    return (
      <button
        onClick={() => handleSyncAppointment(appointment.id)}
        disabled={isSyncing}
        className={`px-3 py-1 text-xs rounded ${
          isSyncing
            ? "bg-gray-400 text-white cursor-not-allowed"
            : "bg-blue-600 text-white hover:bg-blue-700"
        }`}
      >
        {isSyncing ? "🔄 Syncing..." : "🔄 Sync"}
      </button>
    );
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-xl">Loading appointments...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            Appointments Dashboard
          </h1>
          <p className="text-gray-600">Manage and monitor website bookings</p>

          {/* Sync Status Summary */}
          <div className="mt-4 p-4 bg-white rounded-lg shadow">
            <h3 className="font-semibold mb-2">VisionPlus Sync Status</h3>
            <div className="flex space-x-4 text-sm">
              <span className="text-green-600">
                ✅ Synced:{" "}
                {appointments.filter((a) => a.syncStatus === "SYNCED").length}
              </span>
              <span className="text-yellow-600">
                ⏳ Pending:{" "}
                {appointments.filter((a) => a.syncStatus === "PENDING").length}
              </span>
              <span className="text-red-600">
                ❌ Failed:{" "}
                {appointments.filter((a) => a.syncStatus === "FAILED").length}
              </span>
              <span className="text-orange-600">
                🛠️ Manual:{" "}
                {
                  appointments.filter((a) => a.syncStatus === "MANUAL_REQUIRED")
                    .length
                }
              </span>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-white p-4 rounded-lg shadow">
            <div className="text-2xl font-bold text-gray-900">
              {appointments.length}
            </div>
            <div className="text-gray-600">Total Bookings</div>
          </div>
          <div className="bg-white p-4 rounded-lg shadow">
            <div className="text-2xl font-bold text-blue-600">
              {appointments.filter((a) => a.status === "PENDING").length}
            </div>
            <div className="text-gray-600">Pending</div>
          </div>
          <div className="bg-white p-4 rounded-lg shadow">
            <div className="text-2xl font-bold text-green-600">
              {appointments.filter((a) => a.syncStatus === "SYNCED").length}
            </div>
            <div className="text-gray-600">Synced to VP</div>
          </div>
          <div className="bg-white p-4 rounded-lg shadow">
            <div className="text-2xl font-bold text-red-600">
              {appointments.filter((a) => a.syncStatus === "FAILED").length}
            </div>
            <div className="text-gray-600">Sync Failed</div>
          </div>
        </div>

        {/* Background Sync Panel */}
        <div className="bg-white p-6 rounded-lg shadow-md mb-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold text-gray-900">
              🚀 Background Sync Operations
            </h3>
            <button
              onClick={loadQueueStatus}
              className="px-3 py-1 bg-gray-200 text-gray-700 rounded text-sm hover:bg-gray-300"
            >
              🔄 Refresh Status
            </button>
          </div>

          {/* Queue Status */}
          {queueStatus && (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4 p-4 bg-gray-50 rounded-lg">
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">
                  {queueStatus.queueStatus?.needsSync || 0}
                </div>
                <div className="text-sm text-gray-600">Pending Sync</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-red-600">
                  {queueStatus.queueStatus?.failedSyncs || 0}
                </div>
                <div className="text-sm text-gray-600">Failed</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-orange-600">
                  {queueStatus.queueStatus?.manualRequired || 0}
                </div>
                <div className="text-sm text-gray-600">Manual Required</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">
                  {queueStatus.syncStatus?.SYNCED || 0}
                </div>
                <div className="text-sm text-gray-600">Synced</div>
              </div>
            </div>
          )}

          {/* Sync Actions */}
          <div className="flex flex-wrap gap-3">
            <button
              onClick={runBackgroundSync}
              disabled={
                backgroundSyncRunning ||
                queueStatus?.queueStatus?.needsSync === 0
              }
              className={`px-4 py-2 rounded text-sm font-medium ${
                backgroundSyncRunning ||
                queueStatus?.queueStatus?.needsSync === 0
                  ? "bg-gray-400 text-gray-200 cursor-not-allowed"
                  : "bg-blue-600 text-white hover:bg-blue-700"
              }`}
            >
              {backgroundSyncRunning
                ? "🔄 Processing..."
                : "🔄 Sync Next Batch"}
            </button>

            <button
              onClick={syncAllPending}
              disabled={
                backgroundSyncRunning ||
                (queueStatus?.queueStatus?.needsSync === 0 &&
                  queueStatus?.queueStatus?.failedSyncs === 0)
              }
              className={`px-4 py-2 rounded text-sm font-medium ${
                backgroundSyncRunning ||
                (queueStatus?.queueStatus?.needsSync === 0 &&
                  queueStatus?.queueStatus?.failedSyncs === 0)
                  ? "bg-gray-400 text-gray-200 cursor-not-allowed"
                  : "bg-green-600 text-white hover:bg-green-700"
              }`}
            >
              {backgroundSyncRunning
                ? "🔄 Processing All..."
                : "🚀 Sync All Pending"}
            </button>

            <button
              onClick={fetchAppointments}
              className="px-4 py-2 bg-gray-200 text-gray-700 rounded text-sm font-medium hover:bg-gray-300"
            >
              📊 Refresh Appointments
            </button>
          </div>

          {/* Last Run Info */}
          {lastBackgroundRun && (
            <div className="mt-3 text-sm text-gray-600">
              Last run: {lastBackgroundRun}
            </div>
          )}
        </div>

        {/* Filters */}
        <div className="bg-white p-4 rounded-lg shadow mb-6">
          <div className="flex space-x-4">
            <button
              onClick={() => setFilter("all")}
              className={`px-4 py-2 rounded ${
                filter === "all"
                  ? "bg-blue-600 text-white"
                  : "bg-gray-200 text-gray-700"
              }`}
            >
              All Appointments
            </button>
            <button
              onClick={() => setFilter("PENDING")}
              className={`px-4 py-2 rounded ${
                filter === "PENDING"
                  ? "bg-blue-600 text-white"
                  : "bg-gray-200 text-gray-700"
              }`}
            >
              Pending
            </button>
            <button
              onClick={() => setFilter("CONFIRMED")}
              className={`px-4 py-2 rounded ${
                filter === "CONFIRMED"
                  ? "bg-blue-600 text-white"
                  : "bg-gray-200 text-gray-700"
              }`}
            >
              Confirmed
            </button>
            <button
              onClick={() => setFilter("NOT_SYNCED")}
              className={`px-4 py-2 rounded ${
                filter === "NOT_SYNCED"
                  ? "bg-blue-600 text-white"
                  : "bg-gray-200 text-gray-700"
              }`}
            >
              Not Synced
            </button>
          </div>
        </div>

        {/* Appointments Table */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Patient
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Branch & Service
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date & Time
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Sync Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Created
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {appointments.map((appointment) => (
                <tr key={appointment.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">
                      {appointment.patientName}
                    </div>
                    <div className="text-sm text-gray-500">
                      {appointment.patientEmail}
                    </div>
                    <div className="text-sm text-gray-500">
                      {appointment.patientPhone}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      {appointment.branch}
                    </div>
                    <div className="text-sm text-gray-500">
                      {appointment.serviceType}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      {new Date(
                        appointment.appointmentDate
                      ).toLocaleDateString()}
                    </div>
                    <div className="text-sm text-gray-500">
                      {appointment.appointmentTime}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(
                        appointment.status
                      )}`}
                    >
                      {appointment.status}
                    </span>
                    {/* 🆕 STATUS ACTION BUTTONS */}
                    <div className="mt-2 flex flex-wrap gap-1">
                      <StatusButton
                        appointment={appointment}
                        status="CONFIRMED"
                        label="Confirm"
                        variant="success"
                      />
                      <StatusButton
                        appointment={appointment}
                        status="CANCELLED"
                        label="Cancel"
                        variant="danger"
                      />
                      <StatusButton
                        appointment={appointment}
                        status="COMPLETED"
                        label="Complete"
                        variant="primary"
                      />
                      <StatusButton
                        appointment={appointment}
                        status="NOSHOW"
                        label="No Show"
                        variant="warning"
                      />
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getSyncColor(
                        appointment.syncStatus
                      )}`}
                    >
                      {appointment.syncStatus}
                    </span>
                    {appointment.visionPlusId && (
                      <div className="text-xs text-gray-500 mt-1">
                        VP ID: {appointment.visionPlusId}
                      </div>
                    )}
                  </td>
                  {/* Sync Actions Column */}
                  <td className="px-6 py-4 whitespace-nowrap">
                    <SyncButton appointment={appointment} />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {new Date(appointment.createdAt).toLocaleDateString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {appointments.length === 0 && (
            <div className="text-center py-8 text-gray-500">
              No appointments found
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
