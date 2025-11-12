===============================
  app\about\page.tsx
===============================
`$lang
import Link from "next/link";
import Navigation from "@/components/Navigation";
// âœ… Specific constant imports
import { TEAM_MEMBERS } from "@/constants/team";
import {
  COMPANY_TIMELINE,
  COMPANY_VALUES,
  MISSION_STATEMENT,
  COMPANY_STATS,
} from "@/constants/company";
import { CERTIFICATIONS } from "@/constants/company"; // Certifications are in company constants
// âœ… Specific type imports
import { TeamMember, TimelineItem, CompanyValue } from "@/types";

export default function About() {
  return (
    <div className="min-h-screen">
      <Navigation />

      {/* Hero Section */}
      <section className="py-20 bg-linear-to-br from-[#001F3F] via-[#002851] to-[#0077B6]">
        <div className="container-premium">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-5xl md:text-7xl font-black mb-6 leading-tight">
              <span className="text-[#F2F5F9]">Our Story of</span>
              <br />
              <span className="text-transparent bg-clip-text bg-linear-to-r from-[#00A6E6] to-[#48CAE4]">
                Vision & Care
              </span>
            </h1>

            <p className="text-xl md:text-2xl text-[#B9C4CC] mb-8 leading-relaxed">
              For over 15 years, Link Optical has been transforming vision and
              changing lives across Zimbabwe through premium eye care
              that&apos;s accessible to everyone.
            </p>

            {/* Quick Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
              <div className="text-center">
                <div className="text-2xl font-bold text-[#00A6E6]">
                  {COMPANY_STATS.yearsExperience}
                </div>
                <div className="text-sm text-[#B9C4CC]">Years Experience</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-[#00A6E6]">
                  {COMPANY_STATS.patientsServed}
                </div>
                <div className="text-sm text-[#B9C4CC]">Patients Served</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-[#00A6E6]">
                  {COMPANY_STATS.branches}
                </div>
                <div className="text-sm text-[#B9C4CC]">Branches</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-[#00A6E6]">
                  {COMPANY_STATS.sameDayService}
                </div>
                <div className="text-sm text-[#B9C4CC]">Day Service</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Story Timeline */}
      <section className="py-20 bg-linear-to-b from-[#001F3F] to-[#0E2433]">
        <div className="container-premium">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Our Journey of Excellence
            </h2>
            <p className="text-xl text-[#B9C4CC] max-w-2xl mx-auto">
              From humble beginnings to becoming a trusted name in Zimbabwean
              eye care
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            {COMPANY_TIMELINE.map((item: TimelineItem, index) => (
              <div key={index} className="flex gap-8 mb-12 last:mb-0">
                {/* Year */}
                <div className="shrink-0 w-24">
                  <div className="bg-[#00A6E6] text-white rounded-lg py-2 px-4 text-center">
                    <span className="font-bold text-lg">{item.year}</span>
                  </div>
                </div>

                {/* Content */}
                <div className="flex-1">
                  <div className="bg-white/5 rounded-xl p-6 border border-white/10">
                    <h3 className="text-xl font-bold text-[#F2F5F9] mb-3">
                      {item.title}
                    </h3>
                    <p className="text-[#B9C4CC] leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission & Values */}
      <section className="py-20 bg-linear-to-b from-[#001F3F] to-[#002851]">
        <div className="container-premium">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Our Mission & Values
            </h2>
            <p className="text-xl text-[#B9C4CC] max-w-2xl mx-auto">
              Guided by our commitment to excellence and accessibility in eye
              care
            </p>
          </div>

          {/* Mission Statement */}
          <div className="bg-white/5 rounded-2xl p-8 border border-white/10 text-center mb-16 max-w-4xl mx-auto">
            <h3 className="text-2xl md:text-3xl font-bold text-[#00A6E6] mb-6">
              {MISSION_STATEMENT.title}
            </h3>
            <p className="text-lg text-[#B9C4CC] leading-relaxed">
              {MISSION_STATEMENT.description}
            </p>
          </div>

          {/* Values Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {COMPANY_VALUES.map((value: CompanyValue, index) => (
              <div
                key={index}
                className="text-center p-6 bg-white/5 rounded-xl border border-white/10"
              >
                <div className="text-3xl mb-4">{value.icon}</div>
                <h3 className="text-lg font-bold text-[#F2F5F9] mb-3">
                  {value.title}
                </h3>
                <p className="text-[#B9C4CC] text-sm">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Meet the Team */}
      <section className="py-20 bg-linear-to-b from-[#001F3F] to-[#0E2433]">
        <div className="container-premium">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Meet Our Leadership Team
            </h2>
            <p className="text-xl text-[#B9C4CC] max-w-2xl mx-auto">
              Experienced professionals dedicated to your vision health
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {TEAM_MEMBERS.map((member: TeamMember) => (
              <div key={member.id} className="text-center">
                {/* Team Member Photo */}
                <div className="w-32 h-32 bg-linear-to-br from-[#0077B6] to-[#48CAE4] rounded-full mx-auto mb-6 flex items-center justify-center">
                  <span className="text-white text-sm font-medium text-center">
                    ðŸ‘¨â€âš•ï¸
                    <br />
                    <span className="text-xs">Photo</span>
                  </span>
                </div>

                <h3 className="text-xl font-bold text-[#F2F5F9] mb-2">
                  {member.name}
                </h3>
                <p className="text-[#00A6E6] font-semibold mb-4">
                  {member.role}
                </p>

                <p className="text-[#B9C4CC] text-sm mb-4 leading-relaxed">
                  {member.bio}
                </p>

                <div className="space-y-2">
                  {member.expertise.map((skill, index) => (
                    <span
                      key={index}
                      className="block bg-white/5 text-[#B9C4CC] text-xs px-3 py-1 rounded border border-white/10"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Certifications & Trust */}
      <section className="py-20 bg-linear-to-b from-[#001F3F] to-[#002851]">
        <div className="container-premium">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Trusted & Certified
            </h2>
            <p className="text-xl text-[#B9C4CC] max-w-2xl mx-auto">
              Committed to the highest standards of professional eye care
            </p>
          </div>

          <div className="bg-white/5 rounded-2xl p-8 border border-white/10 max-w-4xl mx-auto">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {CERTIFICATIONS.map((cert, index) => (
                <div key={index} className="flex items-center gap-3">
                  <span className="text-[#00A6E6]">âœ…</span>
                  <span className="text-[#F2F5F9] font-medium">{cert}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section - Keep as is since it's mostly UI */}
      <section className="py-20 bg-linear-to-r from-[#001F3F] to-[#0077B6]">
        <div className="container-premium">
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Experience Our Difference
            </h2>
            <p className="text-xl text-[#B9C4CC] mb-8">
              Join thousands of satisfied patients who trust Link Optical with
              their vision care
            </p>

            <div className="bg-white/10 rounded-xl p-6 mb-8 border border-white/20">
              <div className="grid md:grid-cols-3 gap-4 text-sm">
                <div className="flex items-center justify-center gap-2">
                  <span className="text-[#00A6E6]">ðŸ•ðŸ”„</span>
                  <span className="text-[#F2F5F9]">15+ Years Experience</span>
                </div>
                <div className="flex items-center justify-center gap-2">
                  <span className="text-[#00A6E6]">âš¡</span>
                  <span className="text-[#F2F5F9]">Same-Day Service</span>
                </div>
                <div className="flex items-center justify-center gap-2">
                  <span className="text-[#00A6E6]">ðŸ’¼</span>
                  <span className="text-[#F2F5F9]">Premium Quality</span>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="btn-primary text-lg px-8 py-4">
                Book Your Appointment
              </button>
              <button className="btn-secondary text-lg px-8 py-4">
                Visit Our Branches
              </button>
            </div>

            <p className="text-[#B9C4CC] text-sm mt-4">
              Family-owned since 2008 â€¢ Committed to Zimbabwe â€¢ Quality you can
              trust
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}

```

===============================
  app\admin\page.tsx
===============================
`$lang
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

  // ðŸ†• STATUS UPDATE FUNCTION
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
        console.log(`âœ… Status updated to ${newStatus}:`, result);
        await fetchAppointments();
        await loadQueueStatus();

        // Show success message
        alert(`Appointment status updated to ${newStatus}`);
      } else {
        console.error("âŒ Status update failed:", result.error);
        alert(`Status update failed: ${result.error}`);
      }
    } catch (error) {
      console.error("âŒ Status update request failed:", error);
      alert("Failed to update status");
    } finally {
      setUpdatingStatuses((prev) => {
        const newSet = new Set(prev);
        newSet.delete(appointmentId);
        return newSet;
      });
    }
  };

  // ðŸ†• STATUS BUTTON COMPONENT
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
        console.log("âœ… Sync successful:", result);
        await fetchAppointments();
        await loadQueueStatus();
      } else {
        console.error("âŒ Sync failed:", result.error);
        alert(`Sync failed: ${result.error}`);
      }
    } catch (error) {
      console.error("âŒ Sync request failed:", error);
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
          `âœ… Background sync completed!\nSynced: ${result.summary.synced}\nFailed: ${result.summary.failed}`
        );
        await fetchAppointments();
        await loadQueueStatus();
      } else {
        alert(`âŒ Background sync failed: ${result.error}`);
      }
    } catch (error) {
      alert("âŒ Failed to run background sync");
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
          `âœ… Sync All completed!\nProcessed: ${result.summary.processed}\nSynced: ${result.summary.synced}\nFailed: ${result.summary.failed}`
        );
        await fetchAppointments();
        await loadQueueStatus();
      } else {
        alert(`âŒ Sync All failed: ${result.error}`);
      }
    } catch (error) {
      alert("âŒ Failed to run Sync All");
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
          âœ… Synced
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
        {isSyncing ? "ðŸ”„ Syncing..." : "ðŸ”„ Sync"}
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
                âœ… Synced:{" "}
                {appointments.filter((a) => a.syncStatus === "SYNCED").length}
              </span>
              <span className="text-yellow-600">
                â³ Pending:{" "}
                {appointments.filter((a) => a.syncStatus === "PENDING").length}
              </span>
              <span className="text-red-600">
                âŒ Failed:{" "}
                {appointments.filter((a) => a.syncStatus === "FAILED").length}
              </span>
              <span className="text-orange-600">
                ðŸ› ï¸ Manual:{" "}
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
              ðŸš€ Background Sync Operations
            </h3>
            <button
              onClick={loadQueueStatus}
              className="px-3 py-1 bg-gray-200 text-gray-700 rounded text-sm hover:bg-gray-300"
            >
              ðŸ”„ Refresh Status
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
                ? "ðŸ”„ Processing..."
                : "ðŸ”„ Sync Next Batch"}
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
                ? "ðŸ”„ Processing All..."
                : "ðŸš€ Sync All Pending"}
            </button>

            <button
              onClick={fetchAppointments}
              className="px-4 py-2 bg-gray-200 text-gray-700 rounded text-sm font-medium hover:bg-gray-300"
            >
              ðŸ“Š Refresh Appointments
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
                    {/* ðŸ†• STATUS ACTION BUTTONS */}
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

```

===============================
  app\api\appointments\[id]\status\route.ts
===============================
`$lang
// app/api/appointments/[id]/status/route.ts
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { VisionPlusIntegration } from "@/lib/visionplus-integration";
import { NotificationService } from "@/lib/notification-service";

// Valid status transitions
const VALID_STATUSES = [
  "PENDING",
  "CONFIRMED",
  "CANCELLED",
  "COMPLETED",
  "NOSHOW",
];
const ALLOWED_TRANSITIONS: Record<string, string[]> = {
  PENDING: ["CONFIRMED", "CANCELLED"],
  CONFIRMED: ["CANCELLED", "COMPLETED", "NOSHOW"],
  CANCELLED: ["CONFIRMED"],
  COMPLETED: [],
  NOSHOW: [],
};

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id: appointmentId } = await params;
    const body = await request.json();
    const { status, reason, notifyUser = true } = body;

    // Validate input
    if (!appointmentId || !status) {
      return NextResponse.json(
        { error: "Appointment ID and status are required" },
        { status: 400 }
      );
    }

    if (!VALID_STATUSES.includes(status)) {
      return NextResponse.json(
        {
          error: `Invalid status. Must be one of: ${VALID_STATUSES.join(", ")}`,
        },
        { status: 400 }
      );
    }

    // Get current appointment
    const currentAppointment = await prisma.appointment.findUnique({
      where: { id: appointmentId },
    });

    if (!currentAppointment) {
      return NextResponse.json(
        { error: "Appointment not found" },
        { status: 404 }
      );
    }

    // Validate status transition
    const allowedTransitions =
      ALLOWED_TRANSITIONS[currentAppointment.status] || [];
    if (
      !allowedTransitions.includes(status) &&
      status !== currentAppointment.status
    ) {
      return NextResponse.json(
        {
          error: `Cannot change status from ${
            currentAppointment.status
          } to ${status}. Allowed transitions: ${
            allowedTransitions.join(", ") || "none"
          }`,
        },
        { status: 400 }
      );
    }

    console.log(
      `ðŸ”„ Changing status for appointment ${appointmentId}: ${currentAppointment.status} â†’ ${status}`
    );

    // Update status in our database
    const updatedAppointment = await prisma.appointment.update({
      where: { id: appointmentId },
      data: {
        status,
        updatedAt: new Date(),
      },
    });

    // ðŸš€ SYNC STATUS CHANGE TO VISIONPLUS
    let syncResult = null;
    let notificationResult = null;

    try {
      const integration = new VisionPlusIntegration();

      // Only sync to VisionPlus for meaningful status changes
      if (shouldSyncStatusToVisionPlus(currentAppointment.status, status)) {
        console.log(`ðŸ”„ Syncing status change to VisionPlus: ${status}`);
        syncResult = await integration.updateAppointmentStatusInVP(
          appointmentId,
          status
        );

        if (syncResult.success) {
          console.log(`âœ… Status synced to VisionPlus: ${status}`);
        } else {
          console.warn(
            `âš ï¸ Status sync to VisionPlus failed: ${syncResult.error}`
          );
        }
      }

      // ðŸ†• REAL NOTIFICATIONS - REPLACED CONSOLE LOGS
      if (notifyUser && shouldNotifyUser(currentAppointment.status, status)) {
        console.log(`ðŸ“§ðŸ“± Sending real notifications for status: ${status}`);

        const notificationService = new NotificationService();
        notificationResult = await notificationService.sendStatusUpdate(
          updatedAppointment,
          currentAppointment.status,
          status,
          reason
        );

        if (notificationResult.success) {
          console.log(`âœ… Notifications sent successfully`);
        } else {
          console.warn(`âš ï¸ Notifications failed: ${notificationResult.error}`);
        }
      }
    } catch (syncError) {
      console.error("Sync/notification error (non-fatal):", syncError);
    }

    return NextResponse.json({
      success: true,
      appointment: updatedAppointment,
      sync: syncResult,
      notification: notificationResult,
      message: `Appointment status updated to ${status}`,
    });
  } catch (error) {
    console.error("Status update error:", error);
    return NextResponse.json(
      {
        success: false,
        error:
          error instanceof Error
            ? error.message
            : "Failed to update appointment status",
      },
      { status: 500 }
    );
  }
}

// GET current status and allowed transitions
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id: appointmentId } = await params;

    const appointment = await prisma.appointment.findUnique({
      where: { id: appointmentId },
      select: {
        id: true,
        patientName: true,
        patientEmail: true,
        patientPhone: true,
        branch: true,
        appointmentDate: true,
        appointmentTime: true,
        serviceType: true,
        status: true,
        syncStatus: true,
        visionPlusId: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    if (!appointment) {
      return NextResponse.json(
        { error: "Appointment not found" },
        { status: 404 }
      );
    }

    const allowedTransitions = ALLOWED_TRANSITIONS[appointment.status] || [];

    return NextResponse.json({
      appointment,
      statusInfo: {
        current: appointment.status,
        allowedTransitions,
        canCancel: allowedTransitions.includes("CANCELLED"),
        canConfirm: allowedTransitions.includes("CONFIRMED"),
        canComplete: allowedTransitions.includes("COMPLETED"),
        canMarkNoShow: allowedTransitions.includes("NOSHOW"),
      },
      syncInfo: {
        visionPlusId: appointment.visionPlusId,
        syncStatus: appointment.syncStatus,
        canSyncToVP: !!appointment.visionPlusId,
      },
    });
  } catch (error) {
    console.error("Get appointment status error:", error);
    return NextResponse.json(
      { error: "Failed to get appointment status" },
      { status: 500 }
    );
  }
}

/**
 * Determine if status change should be synced to VisionPlus
 */
function shouldSyncStatusToVisionPlus(
  oldStatus: string,
  newStatus: string
): boolean {
  // Only sync meaningful status changes that affect VisionPlus
  const syncStatuses = ["CONFIRMED", "CANCELLED", "COMPLETED", "NOSHOW"];

  return (
    syncStatuses.includes(newStatus) &&
    oldStatus !== newStatus &&
    // Don't sync if changing from CANCELLED back to CONFIRMED (already handled by re-sync)
    !(oldStatus === "CANCELLED" && newStatus === "CONFIRMED")
  );
}

/**
 * Determine if user should be notified about status change
 */
function shouldNotifyUser(oldStatus: string, newStatus: string): boolean {
  // Notify for important status changes
  const notifyStatuses = ["CONFIRMED", "CANCELLED", "NOSHOW"];

  return notifyStatuses.includes(newStatus) && oldStatus !== newStatus;
}

```

===============================
  app\api\appointments\route.ts
===============================
`$lang
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { VisionPlusIntegration } from "@/lib/visionplus-integration";
import { NotificationService } from "@/lib/notification-service";
import { AppointmentStatus, Prisma } from "@prisma/client"; // ðŸ†• ADD Prisma import

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const {
      patientName,
      patientEmail,
      patientPhone,
      patientDOB,
      branch,
      appointmentDate,
      appointmentTime,
      serviceType,
    } = body;

    // Basic validation
    if (
      !patientName ||
      !branch ||
      !appointmentDate ||
      !appointmentTime ||
      !serviceType
    ) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Create appointment in database
    const appointment = await prisma.appointment.create({
      data: {
        patientName,
        patientEmail,
        patientPhone,
        patientDOB: patientDOB ? new Date(patientDOB) : null,
        branch,
        appointmentDate: new Date(appointmentDate),
        appointmentTime,
        serviceType,
        status: "PENDING",
        source: "WEBSITE",
        syncStatus: "PENDING",
      },
    });

    // ðŸ†• SEND BOOKING CONFIRMATION NOTIFICATION
    try {
      console.log(`ðŸ“§ðŸ“± Sending booking confirmation for: ${patientName}`);
      const notificationService = new NotificationService();
      const notificationResult =
        await notificationService.sendBookingConfirmation(appointment);

      if (notificationResult.success) {
        console.log(`âœ… Booking confirmation sent successfully`);
      } else {
        console.warn(
          `âš ï¸ Booking confirmation failed: ${notificationResult.error}`
        );
      }
    } catch (notificationError) {
      console.error(
        "Booking confirmation error (non-fatal):",
        notificationError
      );
      // Don't fail the booking if notification fails
    }

    // AUTO-SYNC TO VISIONPLUS (Non-blocking)
    try {
      const integration = new VisionPlusIntegration();

      // Start sync but don't wait for it (non-blocking)
      integration
        .syncAppointment(appointment.id)
        .then((syncResult) => {
          console.log(`ðŸ”„ Sync result for ${appointment.id}:`, {
            success: syncResult.success,
            method: syncResult.method,
            visionPlusId: syncResult.visionPlusId,
          });
        })
        .catch((syncError) => {
          console.error(`âŒ Sync failed for ${appointment.id}:`, syncError);
        });

      console.log(
        `âœ… Appointment created and sync initiated: ${appointment.id}`
      );
    } catch (syncError) {
      console.error("âš ï¸ Failed to initiate sync:", syncError);
      // Don't fail the appointment creation if sync fails
    }

    return NextResponse.json(
      {
        success: true,
        appointment,
        message:
          "Appointment created successfully. You will receive a confirmation shortly.",
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Appointment creation error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

// GET function with proper Prisma types
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const branch = searchParams.get("branch");
    const date = searchParams.get("date");
    const status = searchParams.get("status");

    // Build filter conditions with proper Prisma types
    const where: Prisma.AppointmentWhereInput = {};

    if (branch) where.branch = { equals: branch };
    if (date) {
      const dateObj = new Date(date);
      where.appointmentDate = {
        gte: new Date(dateObj.setHours(0, 0, 0, 0)),
        lt: new Date(dateObj.setHours(24, 0, 0, 0)),
      };
    }
    if (status) {
      // Validate and cast the status to the proper enum type
      if (
        Object.values(AppointmentStatus).includes(status as AppointmentStatus)
      ) {
        where.status = { equals: status as AppointmentStatus };
      } else {
        console.warn(`Invalid status filter: ${status}`);
      }
    }

    const appointments = await prisma.appointment.findMany({
      where,
      orderBy: {
        appointmentDate: "asc",
      },
      select: {
        id: true,
        patientName: true,
        patientEmail: true,
        patientPhone: true,
        branch: true,
        appointmentDate: true,
        appointmentTime: true,
        serviceType: true,
        status: true,
        syncStatus: true,
        visionPlusId: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    return NextResponse.json({ appointments });
  } catch (error) {
    console.error("Get appointments error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

```

===============================
  app\api\appointments\user\route.ts
===============================
`$lang
import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { prisma } from "@/lib/prisma";

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Get user's appointments
    const appointments = await prisma.appointment.findMany({
      where: {
        patientEmail: session.user.email,
      },
      orderBy: {
        appointmentDate: "desc",
      },
      select: {
        id: true,
        patientName: true,
        patientEmail: true,
        patientPhone: true,
        branch: true,
        appointmentDate: true,
        appointmentTime: true,
        serviceType: true,
        status: true,
        syncStatus: true,
        visionPlusId: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    return NextResponse.json({
      success: true,
      appointments,
    });
  } catch (error) {
    console.error("Get user appointments error:", error);
    return NextResponse.json(
      { error: "Failed to fetch appointments" },
      { status: 500 }
    );
  }
}

```

===============================
  app\api\auth\[...nextauth]\route.ts
===============================
`$lang
import NextAuth, { AuthOptions } from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter"; // âœ… Use @auth/prisma-adapter
import { prisma } from "@/lib/prisma";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { JWT } from "next-auth/jwt";
import { Session, User } from "next-auth";

// Extend built-in types
declare module "next-auth" {
  interface Session {
    user: {
      phone: string;
      id: string;
      firstName: string;
      lastName: string;
      email: string;
    };
  }

  interface User {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    firstName: string;
    lastName: string;
  }
}

export const authOptions: AuthOptions = {
  adapter: PrismaAdapter(prisma) as any,
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials): Promise<User | null> {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        // Find user by email
        const user = await prisma.user.findUnique({
          where: {
            email: credentials.email,
          },
        });

        if (!user || !user.password) {
          return null;
        }

        // Verify password
        const isPasswordValid = await bcrypt.compare(
          credentials.password,
          user.password
        );

        if (!isPasswordValid) {
          return null;
        }

        return {
          id: user.id,
          email: user.email,
          firstName: user.firstName,
          lastName: user.lastName,
          name: `${user.firstName} ${user.lastName}`,
        };
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async jwt({ token, user }: { token: JWT; user?: User }) {
      if (user) {
        token.id = user.id;
        token.firstName = user.firstName;
        token.lastName = user.lastName;
      }
      return token;
    },
    async session({ session, token }: { session: Session; token: JWT }) {
      if (token) {
        session.user.id = token.id;
        session.user.firstName = token.firstName;
        session.user.lastName = token.lastName;
      }
      return session;
    },
  },
  pages: {
    signIn: "/auth/login",
    //signUp: "/auth/signup",
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };

```

===============================
  app\api\auth\register\route.ts
===============================
`$lang
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";

export async function POST(request: NextRequest) {
  try {
    const { firstName, lastName, email, phone, password } =
      await request.json();

    // Validate required fields
    if (!firstName || !lastName || !email || !password) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return NextResponse.json(
        { error: "User with this email already exists" },
        { status: 400 }
      );
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 12);

    // Create user
    const user = await prisma.user.create({
      data: {
        firstName,
        lastName,
        email,
        phone: phone || null,
        password: hashedPassword,
      },
    });

    // Return user without password
    const { password: _, ...userWithoutPassword } = user;

    return NextResponse.json(
      {
        message: "User created successfully",
        user: userWithoutPassword,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Registration error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

```

===============================
  app\api\debug-visionplus\route.ts
===============================
`$lang
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const baseUrl = process.env.VISIONPLUS_BASE_URL;
    const username = process.env.VISIONPLUS_USERNAME;
    const password = process.env.VISIONPLUS_PASSWORD;

    // Test 1: Check environment variables
    console.log("ðŸ” Environment Check:");
    console.log("Base URL:", baseUrl);
    console.log("Username:", username ? "âœ“ Set" : "âœ— Missing");
    console.log("Password:", password ? "âœ“ Set" : "âœ— Missing");

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
    console.log("ðŸŒ Testing basic connection...");
    const connectionTest = await fetch(baseUrl, {
      method: "GET",
      redirect: "manual",
    });

    console.log("Connection status:", connectionTest.status);

    // Test 3: Check login page
    console.log("ðŸ” Testing login page...");
    const loginTest = await fetch(`${baseUrl}/LoginUser.aspx`, {
      method: "GET",
      redirect: "manual",
    });

    return NextResponse.json({
      success: true,
      tests: {
        environment: "âœ“ Configured",
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
    console.error("âŒ Debug error:", error);
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

```

===============================
  app\api\discover\route.js
===============================
`$lang
// app/api/discover/route.js
import { SimpleVisionPlus } from "@/lib/simple-visionplus";

export async function GET() {
  const visionplus = new SimpleVisionPlus();

  try {
    const connection = await visionplus.testConnection();
    const bookingForm = await visionplus.findBookingForm();
    const testSubmission = await visionplus.submitTestAppointment();

    return Response.json({
      success: true,
      connection,
      bookingForm,
      testSubmission,
      timestamp: new Date().toISOString(),
      nextSteps: bookingForm.found
        ? [
            "ðŸŽ¯ Booking form found!",
            "1. Visit the form URL to see the actual form",
            "2. Analyze the form fields and structure",
            "3. Implement form submission",
          ]
        : [
            "ðŸ” No public booking form found",
            "1. Check if VisionPlus has online booking enabled",
            '2. Look for "Book Appointment" links on main site',
            "3. Contact VisionPlus support about online booking",
          ],
    });
  } catch (error) {
    return Response.json(
      {
        success: false,
        error: error.message,
      },
      { status: 500 }
    );
  }
}

```

===============================
  app\api\sync\[id]\route.ts
===============================
`$lang
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { VisionPlusIntegration } from "@/lib/visionplus-integration";

// ðŸ†• Helper function for safe enum comparisons
const isSyncStatus = (status: string, expected: string): boolean => {
  return status === expected;
};

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id: appointmentId } = await params;

    if (!appointmentId) {
      return NextResponse.json(
        { error: "Appointment ID is required" },
        { status: 400 }
      );
    }

    // Verify appointment exists
    const appointment = await prisma.appointment.findUnique({
      where: { id: appointmentId },
    });

    if (!appointment) {
      return NextResponse.json(
        { error: "Appointment not found" },
        { status: 404 }
      );
    }

    console.log(`ðŸ”„ Manual sync requested for appointment: ${appointmentId}`);

    // Initialize integration and sync
    const integration = new VisionPlusIntegration();
    const syncResult = await integration.syncAppointment(appointmentId);

    // Return detailed sync result
    return NextResponse.json({
      success: syncResult.success,
      appointmentId,
      syncResult: {
        method: syncResult.method,
        visionPlusId: syncResult.visionPlusId,
        error: syncResult.error,
        responseData: syncResult.responseData,
      },
      appointmentDetails: {
        patientName: appointment.patientName,
        branch: appointment.branch,
        appointmentDate: appointment.appointmentDate,
        appointmentTime: appointment.appointmentTime,
        serviceType: appointment.serviceType,
      },
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error("Sync API error:", error);
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : "Sync failed",
        appointmentId: (await params).id,
      },
      { status: 500 }
    );
  }
}

// GET endpoint to check sync status
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id: appointmentId } = await params;

    const appointment = await prisma.appointment.findUnique({
      where: { id: appointmentId },
      select: {
        id: true,
        patientName: true,
        branch: true,
        appointmentDate: true,
        appointmentTime: true,
        serviceType: true,
        status: true,
        syncStatus: true,
        visionPlusId: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    if (!appointment) {
      return NextResponse.json(
        { error: "Appointment not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      appointment,
      syncInfo: {
        // ðŸ†• FIXED: Use helper function for safe comparisons
        canSync: !isSyncStatus(appointment.syncStatus, "SYNCED"),
        requiresManual: isSyncStatus(appointment.syncStatus, "MANUAL_REQUIRED"),
        lastUpdated: appointment.updatedAt,
      },
    });
  } catch (error) {
    console.error("Get sync status error:", error);
    return NextResponse.json(
      { error: "Failed to get sync status" },
      { status: 500 }
    );
  }
}

```

===============================
  app\api\sync\background\route.ts
===============================
`$lang
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { VisionPlusIntegration } from "@/lib/visionplus-integration";
import { SyncStatus } from "@prisma/client";

// Define proper type for sync details
interface SyncDetail {
  appointmentId: string;
  patientName: string;
  success: boolean;
  method?: string;
  visionPlusId?: string;
  error?: string;
}

export async function POST(request: NextRequest) {
  try {
    const { maxRetries = 5, batchSize = 10 } = await request.json();

    console.log(
      `ðŸ”„ Starting background sync: maxRetries=${maxRetries}, batchSize=${batchSize}`
    );

    // Find appointments that need syncing - use string literals as fallback
    const pendingAppointments = await prisma.appointment.findMany({
      where: {
        OR: [
          { syncStatus: "PENDING" as SyncStatus },
          { syncStatus: "FAILED" as SyncStatus },
        ],
      },
      take: batchSize,
      orderBy: {
        createdAt: "asc",
      },
    });

    console.log(`ðŸ“‹ Found ${pendingAppointments.length} appointments to sync`);

    if (pendingAppointments.length === 0) {
      return NextResponse.json({
        success: true,
        message: "No appointments need syncing",
        processed: 0,
        synced: 0,
        failed: 0,
      });
    }

    const integration = new VisionPlusIntegration();
    const results = {
      processed: 0,
      synced: 0,
      failed: 0,
      details: [] as SyncDetail[],
    };

    // Process each appointment
    for (const appointment of pendingAppointments) {
      try {
        results.processed++;

        console.log(
          `ðŸ”„ Syncing appointment ${appointment.id}: ${appointment.patientName}`
        );

        const syncResult = await integration.syncAppointment(appointment.id);

        if (syncResult.success) {
          results.synced++;
          console.log(`âœ… Successfully synced appointment ${appointment.id}`);
        } else {
          results.failed++;
          console.log(
            `âŒ Failed to sync appointment ${appointment.id}:`,
            syncResult.error
          );
        }

        results.details.push({
          appointmentId: appointment.id,
          patientName: appointment.patientName,
          success: syncResult.success,
          method: syncResult.method,
          visionPlusId: syncResult.visionPlusId,
          error: syncResult.error,
        });

        // Small delay to avoid overwhelming VisionPlus
        await new Promise((resolve) => setTimeout(resolve, 1000));
      } catch (error) {
        results.failed++;
        console.error(`ðŸ’¥ Error syncing appointment ${appointment.id}:`, error);

        results.details.push({
          appointmentId: appointment.id,
          patientName: appointment.patientName,
          success: false,
          error: error instanceof Error ? error.message : "Unknown error",
        });
      }
    }

    console.log(
      `ðŸŽ‰ Background sync completed: ${results.synced} synced, ${results.failed} failed`
    );

    return NextResponse.json({
      success: true,
      message: `Background sync completed: ${results.synced} synced, ${results.failed} failed`,
      summary: results,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error("Background sync error:", error);
    return NextResponse.json(
      {
        success: false,
        error:
          error instanceof Error ? error.message : "Background sync failed",
      },
      { status: 500 }
    );
  }
}

// GET endpoint to check sync queue status
export async function GET() {
  try {
    const syncStats = await prisma.appointment.groupBy({
      by: ["syncStatus"],
      _count: {
        id: true,
      },
    });

    const totalAppointments = await prisma.appointment.count(); // ðŸ†• FIXED: removed extra .appisma

    // Get recent sync activity (last 24 hours)
    const twentyFourHoursAgo = new Date(Date.now() - 24 * 60 * 60 * 1000);

    const recentActivity = await prisma.appointment.findMany({
      where: {
        updatedAt: {
          gte: twentyFourHoursAgo,
        },
        OR: [
          { syncStatus: "SYNCED" as SyncStatus },
          { syncStatus: "FAILED" as SyncStatus },
        ],
      },
      select: {
        id: true,
        patientName: true,
        syncStatus: true,
        visionPlusId: true,
        updatedAt: true,
      },
      orderBy: {
        updatedAt: "desc",
      },
      take: 10,
    });

    // Helper function to safely get count for a sync status
    const getCountForStatus = (status: string): number => {
      const stat = syncStats.find((s) => s.syncStatus === status);
      return stat?._count.id || 0;
    };

    return NextResponse.json({
      syncStatus: syncStats.reduce((acc, stat) => {
        acc[stat.syncStatus] = stat._count.id;
        return acc;
      }, {} as Record<string, number>),
      totalAppointments,
      recentActivity,
      queueStatus: {
        needsSync: getCountForStatus("PENDING"),
        failedSyncs: getCountForStatus("FAILED"),
        manualRequired: getCountForStatus("MANUAL_REQUIRED"),
      },
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error("Get sync status error:", error);
    return NextResponse.json(
      { error: "Failed to get sync status" },
      { status: 500 }
    );
  }
}

```

===============================
  app\api\test-notifications\route.ts
===============================
`$lang
import { NextRequest, NextResponse } from "next/server";
import { NotificationService } from "@/lib/notification-service";
import { prisma } from "@/lib/prisma";
import { Appointment, SyncStatus, AppointmentStatus } from "@prisma/client";

// ðŸ†• Define a proper interface for mock appointment data
interface MockAppointment {
  id: string;
  patientName: string;
  patientEmail: string | null;
  patientPhone: string | null;
  patientDOB: Date | null;
  branch: string;
  appointmentDate: Date;
  appointmentTime: string;
  serviceType: string;
  status: AppointmentStatus;
  syncStatus: SyncStatus;
  visionPlusId: string | null;
  source: string;
  createdAt: Date;
  updatedAt: Date;
  syncedAt: Date | null;
  manualSyncRequestedAt: Date | null;
  userId: string | null; // âœ… ADD THIS MISSING FIELD
}

export async function GET(request: NextRequest) {
  try {
    const notificationService = new NotificationService();
    const config = await notificationService.testConfiguration();

    // Get a recent appointment for testing
    const testAppointment = await prisma.appointment.findFirst({
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json({
      success: true,
      configuration: config,
      testAppointment: testAppointment
        ? {
            id: testAppointment.id,
            patientName: testAppointment.patientName,
            patientEmail: testAppointment.patientEmail,
            patientPhone: testAppointment.patientPhone,
          }
        : null,
      instructions: {
        email: config.email.configured
          ? "âœ… Email is configured for production"
          : "âš ï¸ Email is in console mode - add API keys for real emails",
        sms: config.sms.configured
          ? "âœ… SMS is configured for production"
          : "âš ï¸ SMS is in console mode - add API keys for real SMS",
      },
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

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { testType = "booking", appointmentId } = body;

    const notificationService = new NotificationService();

    let result;

    if (appointmentId) {
      // Test with specific appointment
      const appointment = await prisma.appointment.findUnique({
        where: { id: appointmentId },
      });

      if (!appointment) {
        return NextResponse.json(
          { error: "Appointment not found" },
          { status: 404 }
        );
      }

      switch (testType) {
        case "booking":
          result = await notificationService.sendBookingConfirmation(
            appointment
          );
          break;
        case "status":
          result = await notificationService.sendStatusUpdate(
            appointment,
            "PENDING",
            "CONFIRMED"
          );
          break;
        case "reminder":
          result = await notificationService.sendReminder(appointment);
          break;
        default:
          return NextResponse.json(
            { error: "Invalid test type" },
            { status: 400 }
          );
      }
    } else {
      // Test with mock data - using proper interface instead of Pick
      const mockAppointment: MockAppointment = {
        id: "test-" + Date.now(),
        patientName: "Test Patient",
        patientEmail: "test@example.com",
        patientPhone: "0771234567",
        patientDOB: null,
        branch: "Robinson House",
        appointmentDate: new Date(),
        appointmentTime: "10:00 AM",
        serviceType: "Eye Test",
        status: AppointmentStatus.PENDING,
        syncStatus: SyncStatus.PENDING,
        visionPlusId: null,
        source: "WEBSITE",
        createdAt: new Date(),
        updatedAt: new Date(),
        syncedAt: null,
        manualSyncRequestedAt: null,
        userId: null, // âœ… ADD THIS MISSING FIELD
      };

      result = await notificationService.sendBookingConfirmation(
        mockAppointment
      );
    }

    return NextResponse.json({
      success: result.success,
      testType,
      result,
      message: result.success
        ? "Test notification sent successfully"
        : "Test notification failed",
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

```

===============================
  app\api\test-visionplus\route.ts
===============================
`$lang
// app/api/test-visionplus/route.ts - DEBUG VERSION
import { NextRequest, NextResponse } from "next/server";
import { VisionPlusFormAnalyzer } from "@/lib/visionplus-form-analyzer";

export async function GET() {
  try {
    console.log("ðŸ” Starting VisionPlus test...");

    // Test 1: Check environment variables
    const baseUrl = process.env.VISIONPLUS_BASE_URL;
    const username = process.env.VISIONPLUS_USERNAME;
    const password = process.env.VISIONPLUS_PASSWORD;

    console.log("ðŸ“‹ Environment check:");
    console.log("Base URL:", baseUrl);
    console.log("Username:", username ? "âœ“ Set" : "âœ— Missing");
    console.log("Password:", password ? "âœ“ Set" : "âœ— Missing");

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
    console.log("ðŸŒ Testing basic connection...");
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
    console.log("ðŸ” Testing login page...");
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
    console.log("ðŸ”‘ Testing authentication...");
    let authResult;
    try {
      const formAnalyzer = new VisionPlusFormAnalyzer();
      authResult = await formAnalyzer.authenticate(username, password);
      console.log(`Authentication: ${authResult ? "âœ“ Success" : "âœ— Failed"}`);
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
        environment: "âœ“ Configured",
        basicConnection: connectionTest.status,
        loginPage: loginTest.status,
        authentication: authResult ? "âœ“ Success" : "âœ— Failed",
      },
      details: {
        baseUrl,
        requiresAuthentication: loginTest.status === 200,
        authenticated: authResult,
      },
      nextSteps: authResult
        ? [
            "âœ… Authentication successful!",
            "Next: Test form submission with appointment data",
          ]
        : [
            "âŒ Authentication failed",
            "Check credentials and try manual login in browser",
          ],
    });
  } catch (error) {
    console.error("ðŸ’¥ VisionPlus test failed with unexpected error:", error);
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

```

===============================
  app\appointments\page.tsx
===============================
`$lang
import { getCurrentUser } from "@/lib/auth";
import { redirect } from "next/navigation";
import Navigation from "@/components/Navigation";
import AppointmentsHistory from "@/components/AppointmentsHistory";

export default async function AppointmentsPage() {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/auth/login");
  }

  return (
    <div className="min-h-screen">
      <Navigation />

      <section className="py-20 bg-linear-to-br from-[#001F3F] via-[#002851] to-[#0077B6]">
        <div className="container-premium">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h1 className="text-5xl md:text-6xl font-black mb-6 leading-tight">
                <span className="text-[#F2F5F9]">My</span>
                <br />
                <span className="text-transparent bg-clip-text bg-linear-to-r from-[#00A6E6] to-[#48CAE4]">
                  Appointments
                </span>
              </h1>
              <p className="text-xl text-[#B9C4CC]">
                View and manage your appointment history with Link Optical
              </p>
            </div>

            <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-8 border border-white/10">
              <AppointmentsHistory userId={user.id} />
            </div>

            {/* Quick Actions Footer */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
              <a href="/book" className="btn-primary">
                ðŸ“… Book New Appointment
              </a>
              <a href="/profile" className="btn-secondary">
                ðŸ‘¤ Back to Profile
              </a>
              <a href="/services" className="btn-secondary">
                ðŸ” Browse Services
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

```

===============================
  app\auth\layout.tsx
===============================
`$lang
export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#001F3F] via-[#002851] to-[#0077B6]">
      <div className="flex items-center justify-center min-h-screen py-8">
        <div className="w-full max-w-md">
          {/* Logo */}
          <div className="text-center mb-8">
            <div className="flex items-center justify-center space-x-3 mb-4">
              <div className="w-12 h-12 bg-[#00A6E6] rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-xl">L</span>
              </div>
            </div>
            <h1 className="text-2xl font-bold text-[#F2F5F9]">Link Optical</h1>
          </div>

          {/* Auth Content */}
          <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-8 border border-white/10 shadow-2xl">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}

```

===============================
  app\auth\login\LoginForm.tsx
===============================
`$lang
"use client";

import { useState } from "react";
import Link from "next/link";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

interface LoginFormProps {
  message?: string | null;
}

export default function LoginForm({ message }: LoginFormProps) {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const result = await signIn("credentials", {
        email: formData.email,
        password: formData.password,
        redirect: false,
      });

      if (result?.error) {
        setError("Invalid email or password");
      } else {
        // Redirect to booking page
        router.push("/book");
      }
    } catch (error) {
      setError("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-[#F2F5F9] mb-2">Welcome Back</h2>
        <p className="text-[#B9C4CC]">Sign in to your account</p>
      </div>

      {message && (
        <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-4">
          <p className="text-green-400 text-sm">{message}</p>
        </div>
      )}

      {error && (
        <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-4">
          <p className="text-red-400 text-sm">{error}</p>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-[#F2F5F9] mb-2">
            Email Address
          </label>
          <input
            type="email"
            required
            value={formData.email}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
            className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-[#F2F5F9] placeholder-[#B9C4CC] focus:outline-none focus:border-[#00A6E6] transition-colors"
            placeholder="Enter your email"
          />
        </div>

        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="block text-sm font-medium text-[#F2F5F9]">
              Password
            </label>
            <Link
              href="/auth/forgot-password"
              className="text-sm text-[#00A6E6] hover:text-[#48CAE4] transition-colors"
            >
              Forgot password?
            </Link>
          </div>
          <input
            type="password"
            required
            value={formData.password}
            onChange={(e) =>
              setFormData({ ...formData, password: e.target.value })
            }
            className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-[#F2F5F9] placeholder-[#B9C4CC] focus:outline-none focus:border-[#00A6E6] transition-colors"
            placeholder="Enter your password"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full btn-primary py-3 text-lg font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? "Signing In..." : "Sign In"}
        </button>
      </form>

      <div className="text-center">
        <p className="text-[#B9C4CC]">
          Don&apos;t have an account?{" "}
          <Link
            href="/auth/signup"
            className="text-[#00A6E6] hover:text-[#48CAE4] font-semibold transition-colors"
          >
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}

```

===============================
  app\auth\login\page.tsx
===============================
`$lang
"use client";

import { Suspense } from "react";
import Link from "next/link";
import { signIn } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import LoginForm from "./LoginForm";

// This component handles the search params with Suspense
function LoginContent() {
  const searchParams = useSearchParams();
  const message = searchParams.get("message");

  return <LoginForm message={message} />;
}

// Loading component for Suspense fallback
function LoginLoading() {
  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-[#F2F5F9] mb-2">Welcome Back</h2>
        <p className="text-[#B9C4CC]">Loading...</p>
      </div>
      <div className="animate-pulse space-y-4">
        <div className="h-12 bg-white/5 rounded-lg"></div>
        <div className="h-12 bg-white/5 rounded-lg"></div>
        <div className="h-12 bg-white/5 rounded-lg"></div>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={<LoginLoading />}>
      <LoginContent />
    </Suspense>
  );
}

```

===============================
  app\auth\signup\page.tsx
===============================
`$lang
"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function SignupPage() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    // Validation
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      setLoading(false);
      return;
    }

    if (formData.password.length < 6) {
      setError("Password must be at least 6 characters");
      setLoading(false);
      return;
    }

    try {
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          phone: formData.phone,
          password: formData.password,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        // Redirect to login page with success message
        router.push(
          "/auth/login?message=Account created successfully. Please sign in."
        );
      } else {
        setError(data.error || "Registration failed");
      }
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      setError("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-[#F2F5F9] mb-2">
          Create Account
        </h2>
        <p className="text-[#B9C4CC]">Join thousands of satisfied patients</p>
      </div>

      {error && (
        <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-4">
          <p className="text-red-400 text-sm">{error}</p>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-[#F2F5F9] mb-2">
              First Name *
            </label>
            <input
              type="text"
              required
              value={formData.firstName}
              onChange={(e) =>
                setFormData({ ...formData, firstName: e.target.value })
              }
              className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-[#F2F5F9] placeholder-[#B9C4CC] focus:outline-none focus:border-[#00A6E6] transition-colors"
              placeholder="First name"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-[#F2F5F9] mb-2">
              Last Name *
            </label>
            <input
              type="text"
              required
              value={formData.lastName}
              onChange={(e) =>
                setFormData({ ...formData, lastName: e.target.value })
              }
              className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-[#F2F5F9] placeholder-[#B9C4CC] focus:outline-none focus:border-[#00A6E6] transition-colors"
              placeholder="Last name"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-[#F2F5F9] mb-2">
            Email Address *
          </label>
          <input
            type="email"
            required
            value={formData.email}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
            className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-[#F2F5F9] placeholder-[#B9C4CC] focus:outline-none focus:border-[#00A6E6] transition-colors"
            placeholder="Enter your email"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-[#F2F5F9] mb-2">
            Phone Number
          </label>
          <input
            type="tel"
            value={formData.phone}
            onChange={(e) =>
              setFormData({ ...formData, phone: e.target.value })
            }
            className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-[#F2F5F9] placeholder-[#B9C4CC] focus:outline-none focus:border-[#00A6E6] transition-colors"
            placeholder="+263 XXX XXX XXX"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-[#F2F5F9] mb-2">
            Password *
          </label>
          <input
            type="password"
            required
            minLength={6}
            value={formData.password}
            onChange={(e) =>
              setFormData({ ...formData, password: e.target.value })
            }
            className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-[#F2F5F9] placeholder-[#B9C4CC] focus:outline-none focus:border-[#00A6E6] transition-colors"
            placeholder="Create a password (min. 6 characters)"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-[#F2F5F9] mb-2">
            Confirm Password *
          </label>
          <input
            type="password"
            required
            value={formData.confirmPassword}
            onChange={(e) =>
              setFormData({ ...formData, confirmPassword: e.target.value })
            }
            className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-[#F2F5F9] placeholder-[#B9C4CC] focus:outline-none focus:border-[#00A6E6] transition-colors"
            placeholder="Confirm your password"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full btn-primary py-3 text-lg font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? "Creating Account..." : "Create Account"}
        </button>
      </form>

      <div className="text-center">
        <p className="text-[#B9C4CC]">
          Already have an account?{" "}
          <Link
            href="/auth/login"
            className="text-[#00A6E6] hover:text-[#48CAE4] font-semibold transition-colors"
          >
            Sign in
          </Link>
        </p>
      </div>

      {/* Terms Notice */}
      <p className="text-xs text-[#B9C4CC] text-center">
        By creating an account, you agree to our Terms of Service and Privacy
        Policy
      </p>
    </div>
  );
}

```

===============================
  app\book\page.tsx
===============================
`$lang
import { getCurrentUser } from "@/lib/auth";
import { redirect } from "next/navigation";
import Navigation from "@/components/Navigation";
import BookingForm from "@/components/BookingForm";

export default async function BookPage() {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/auth/login?callbackUrl=/book");
  }

  return (
    <div className="min-h-screen">
      <Navigation />

      <section className="py-20 bg-gradient-to-br from-[#001F3F] via-[#002851] to-[#0077B6]">
        <div className="container-premium">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h1 className="text-5xl md:text-6xl font-black mb-6 leading-tight">
                <span className="text-[#F2F5F9]">Book Your</span>
                <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00A6E6] to-[#48CAE4]">
                  Appointment
                </span>
              </h1>
              <p className="text-xl text-[#B9C4CC]">
                Welcome back, {user.firstName}! Ready to schedule your eye care
                appointment?
              </p>
            </div>

            <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-8 border border-white/10">
              <BookingForm user={user} />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

```

===============================
  app\branches\page.tsx
===============================
`$lang
import Link from "next/link";
import Navigation from "@/components/Navigation";
// âœ… Specific constant imports
import { BRANCHES } from "@/constants/branches";
import { BRANCH_FEATURES } from "@/constants/services"; // Branch features are in services constants
// âœ… Specific type imports
import { Branch, BranchFeature } from "@/types";

export default function Branches() {
  return (
    <div className="min-h-screen">
      <Navigation />

      {/* Hero Section */}
      <section className="py-20 bg-linear-to-br from-[#001F3F] via-[#002851] to-[#0077B6]">
        <div className="container-premium">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-5xl md:text-7xl font-black mb-6 leading-tight">
              <span className="text-[#F2F5F9]">Find Your Nearest</span>
              <br />
              <span className="text-transparent bg-clip-text bg-linear-to-r from-[#00A6E6] to-[#48CAE4]">
                Link Optical
              </span>
            </h1>

            <p className="text-xl md:text-2xl text-[#B9C4CC] mb-8 leading-relaxed">
              Same premium eye care, five convenient locations across Zimbabwe.
              Experience expert service and same-day spectacles wherever you
              are.
            </p>

            {/* Quick Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
              <div className="text-center">
                <div className="text-2xl font-bold text-[#00A6E6]">5</div>
                <div className="text-sm text-[#B9C4CC]">Branches</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-[#00A6E6]">15+</div>
                <div className="text-sm text-[#B9C4CC]">Years Serving</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-[#00A6E6]">Same</div>
                <div className="text-sm text-[#B9C4CC]">Day Service</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-[#00A6E6]">All</div>
                <div className="text-sm text-[#B9C4CC]">Medical Aids</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Branch Features */}
      <section className="py-16 bg-linear-to-b from-[#001F3F] to-[#0E2433]">
        <div className="container-premium">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Premium Care, Every Location
            </h2>
            <p className="text-xl text-[#B9C4CC] max-w-2xl mx-auto">
              The same high-quality service, expert staff, and advanced
              technology at all our branches
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {BRANCH_FEATURES.map((feature: BranchFeature, index) => (
              <div
                key={index}
                className="text-center p-6 bg-white/5 rounded-xl border border-white/10"
              >
                <div className="text-3xl mb-4">{feature.icon}</div>
                <h3 className="text-lg font-bold text-[#F2F5F9] mb-2">
                  {feature.title}
                </h3>
                <p className="text-[#B9C4CC] text-sm">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Branches Grid */}
      <section className="py-20 bg-linear-to-b from-[#001F3F] to-[#002851]">
        <div className="container-premium">
          <div className="grid lg:grid-cols-2 xl:grid-cols-3 gap-8">
            {BRANCHES.map((branch: Branch) => (
              <div key={branch.id} className="card-premium group">
                {/* Branch Header */}
                <div className="mb-6">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-2xl font-bold text-[#F2F5F9] mb-1">
                        {branch.name}
                      </h3>
                      <p className="text-[#00A6E6] font-semibold">
                        {branch.type}
                      </p>
                    </div>
                    <span className="bg-[#00A6E6] text-white text-xs px-2 py-1 rounded-full">
                      {branch.id === 1 ? "MAIN LAB" : "BRANCH"}
                    </span>
                  </div>

                  {/* Branch Image Placeholder */}
                  <div className="w-full h-48 bg-linear-to-br from-[#0077B6] to-[#48CAE4] rounded-xl mb-4 flex items-center justify-center">
                    <span className="text-white text-sm font-medium text-center">
                      ðŸ“ {branch.name}
                      <br />
                      <span className="text-xs opacity-80">
                        Branch Location
                      </span>
                    </span>
                  </div>
                </div>

                {/* Contact Information */}
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <span className="text-[#00A6E6] mt-1">ðŸ“</span>
                    <div>
                      <p className="text-[#F2F5F9] font-medium">Address</p>
                      <p className="text-[#B9C4CC] text-sm">{branch.address}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <span className="text-[#00A6E6] mt-1">ðŸ“ž</span>
                    <div>
                      <p className="text-[#F2F5F9] font-medium">Phone</p>
                      <p className="text-[#B9C4CC] text-sm">{branch.phone}</p>
                    </div>
                  </div>

                  {/* Operating Hours */}
                  <div className="border-t border-white/10 pt-4">
                    <p className="text-[#F2F5F9] font-medium mb-2">
                      ðŸ• Operating Hours
                    </p>
                    <div className="space-y-1 text-sm">
                      <div className="flex justify-between">
                        <span className="text-[#B9C4CC]">Mon - Fri:</span>
                        <span className="text-[#F2F5F9]">
                          {branch.hours.weekdays}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-[#B9C4CC]">Saturday:</span>
                        <span className="text-[#F2F5F9]">
                          {branch.hours.saturday}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-[#B9C4CC]">Sunday:</span>
                        <span className="text-[#F2F5F9]">
                          {branch.hours.sunday}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Services */}
                  <div className="border-t border-white/10 pt-4">
                    <p className="text-[#F2F5F9] font-medium mb-2">
                      ðŸ‘¨â€âš•ï¸ Services Available
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {branch.services.map((service, index) => (
                        <span
                          key={index}
                          className="bg-white/5 text-[#B9C4CC] text-xs px-2 py-1 rounded border border-white/10"
                        >
                          {service}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Features */}
                  <div className="border-t border-white/10 pt-4">
                    <p className="text-[#F2F5F9] font-medium mb-2">
                      âœ¨ Branch Features
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {branch.features.map((feature, index) => (
                        <span
                          key={index}
                          className="bg-[#00A6E6]/10 text-[#00A6E6] text-xs px-2 py-1 rounded"
                        >
                          {feature}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* CTA Buttons */}
                  <div className="flex gap-3 pt-4">
                    <button className="flex-1 btn-primary text-sm py-2">
                      Book at {branch.name}
                    </button>
                    <button className="btn-secondary text-sm py-2 px-4">
                      Directions
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-linear-to-r from-[#001F3F] to-[#0077B6]">
        <div className="container-premium">
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Visit Us Today
            </h2>
            <p className="text-xl text-[#B9C4CC] mb-8">
              Experience the Link Optical difference at a branch near you. Same
              premium care, same expert service, wherever you are in Zimbabwe.
            </p>

            <div className="bg-white/10 rounded-xl p-6 mb-8 border border-white/20">
              <div className="grid md:grid-cols-3 gap-4 text-sm">
                <div className="flex items-center justify-center gap-2">
                  <span className="text-[#00A6E6]">âš¡</span>
                  <span className="text-[#F2F5F9]">Same-Day Service</span>
                </div>
                <div className="flex items-center justify-center gap-2">
                  <span className="text-[#00A6E6]">ðŸ‘¨â€âš•ï¸</span>
                  <span className="text-[#F2F5F9]">Expert Optometrists</span>
                </div>
                <div className="flex items-center justify-center gap-2">
                  <span className="text-[#00A6E6]">ðŸ’³</span>
                  <span className="text-[#F2F5F9]">Medical Aid Accepted</span>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="btn-primary text-lg px-8 py-4">
                ðŸ“… Book Appointment
              </button>
              <button className="btn-secondary text-lg px-8 py-4">
                ðŸ“ž Call Nearest Branch
              </button>
            </div>

            <p className="text-[#B9C4CC] text-sm mt-4">
              Walk-ins welcome â€¢ Free consultations â€¢ Family-friendly â€¢
              Wheelchair accessible
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}

```

===============================
  app\contact\page.tsx
===============================
`$lang
import Navigation from "@/components/Navigation";
// âœ… Specific constant imports
import { BRANCHES } from "@/constants/branches";
import { CONTACT_METHODS, FAQS } from "@/constants/contact";
// âœ… Specific type imports
import { Branch, ContactMethod, FAQ } from "@/types";

export default function Contact() {
  return (
    <div className="min-h-screen">
      <Navigation />

      {/* Hero Section */}
      <section className="py-20 bg-linear-to-br from-[#001F3F] via-[#002851] to-[#0077B6]">
        <div className="container-premium">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-5xl md:text-7xl font-black mb-6 leading-tight">
              <span className="text-[#F2F5F9]">Get In</span>
              <br />
              <span className="text-transparent bg-clip-text bg-linear-to-r from-[#00A6E6] to-[#48CAE4]">
                Touch
              </span>
            </h1>

            <p className="text-xl md:text-2xl text-[#B9C4CC] mb-8 leading-relaxed">
              We&apos;re here to help with all your eye care needs. Reach out to
              us through any channel and experience our commitment to
              exceptional service.
            </p>

            {/* Quick Contact Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
              <div className="text-center">
                <div className="text-2xl font-bold text-[#00A6E6]">5</div>
                <div className="text-sm text-[#B9C4CC]">Branches</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-[#00A6E6]">24h</div>
                <div className="text-sm text-[#B9C4CC]">Response Time</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-[#00A6E6]">All</div>
                <div className="text-sm text-[#B9C4CC]">Medical Aids</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-[#00A6E6]">
                  Walk-ins
                </div>
                <div className="text-sm text-[#B9C4CC]">Welcome</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Methods */}
      <section className="py-20 bg-linear-to-b from-[#001F3F] to-[#0E2433]">
        <div className="container-premium">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Multiple Ways to Connect
            </h2>
            <p className="text-xl text-[#B9C4CC] max-w-2xl mx-auto">
              Choose the method that works best for you. We&apos;re ready to
              assist.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {CONTACT_METHODS.map((method: ContactMethod, index) => (
              <div
                key={index}
                className="text-center p-6 bg-white/5 rounded-xl border border-white/10 group hover:bg-white/10 transition-all"
              >
                <div className="text-3xl mb-4">{method.icon}</div>
                <h3 className="text-lg font-bold text-[#F2F5F9] mb-2">
                  {method.title}
                </h3>
                <p className="text-[#B9C4CC] text-sm mb-3">
                  {method.description}
                </p>
                <p className="text-[#00A6E6] font-semibold text-sm mb-4">
                  {method.details}
                </p>
                <a
                  href={method.action}
                  className="btn-primary text-sm py-2 px-4 inline-block"
                >
                  {method.cta}
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form & Branch Info */}
      <section className="py-20 bg-linear-to-b from-[#001F3F] to-[#002851]">
        <div className="container-premium">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6 text-[#F2F5F9]">
                Send Us a Message
              </h2>
              <p className="text-[#B9C4CC] mb-8">
                Have questions about our services? Need help with an
                appointment? Fill out the form below and we&apos;ll get back to
                you promptly.
              </p>

              <form className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[#F2F5F9] font-medium mb-2">
                      First Name
                    </label>
                    <input
                      type="text"
                      className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-[#F2F5F9] focus:outline-none focus:border-[#00A6E6] transition-colors"
                      placeholder="Your first name"
                    />
                  </div>
                  <div>
                    <label className="block text-[#F2F5F9] font-medium mb-2">
                      Last Name
                    </label>
                    <input
                      type="text"
                      className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-[#F2F5F9] focus:outline-none focus:border-[#00A6E6] transition-colors"
                      placeholder="Your last name"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[#F2F5F9] font-medium mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-[#F2F5F9] focus:outline-none focus:border-[#00A6E6] transition-colors"
                    placeholder="your.email@example.com"
                  />
                </div>

                <div>
                  <label className="block text-[#F2F5F9] font-medium mb-2">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-[#F2F5F9] focus:outline-none focus:border-[#00A6E6] transition-colors"
                    placeholder="+263 XXX XXX XXX"
                  />
                </div>

                <div>
                  <label className="block text-[#F2F5F9] font-medium mb-2">
                    Preferred Branch
                  </label>
                  <select className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-[#F2F5F9] focus:outline-none focus:border-[#00A6E6] transition-colors">
                    <option value="">Select a branch</option>
                    {BRANCHES.map((branch: Branch) => (
                      <option key={branch.id} value={branch.id}>
                        {branch.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-[#F2F5F9] font-medium mb-2">
                    Message
                  </label>
                  <textarea
                    rows={4}
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-[#F2F5F9] focus:outline-none focus:border-[#00A6E6] transition-colors"
                    placeholder="How can we help you today?"
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="w-full btn-primary text-lg py-4"
                >
                  Send Message
                </button>
              </form>
            </div>

            {/* Branch Contact Info */}
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6 text-[#F2F5F9]">
                Branch Contact Details
              </h2>
              <p className="text-[#B9C4CC] mb-8">
                Find contact information for all our locations across Zimbabwe.
              </p>

              <div className="space-y-6">
                {BRANCHES.map((branch: Branch) => (
                  <div
                    key={branch.id}
                    className="bg-white/5 rounded-xl p-6 border border-white/10"
                  >
                    <h3 className="text-xl font-bold text-[#F2F5F9] mb-3">
                      {branch.name}
                    </h3>

                    <div className="space-y-3">
                      <div className="flex items-center gap-3">
                        <span className="text-[#00A6E6]">ðŸ“</span>
                        <span className="text-[#B9C4CC] text-sm">
                          {branch.address}
                        </span>
                      </div>

                      <div className="flex items-center gap-3">
                        <span className="text-[#00A6E6]">ðŸ“ž</span>
                        <span className="text-[#B9C4CC] text-sm">
                          {branch.phone}
                        </span>
                      </div>

                      <div className="flex items-center gap-3">
                        <span className="text-[#00A6E6]">ðŸ“§</span>
                        <span className="text-[#B9C4CC] text-sm">
                          {branch.name.toLowerCase().replace(/\s+/g, "-")}
                          @linkoptical.co.zw
                        </span>
                      </div>

                      <div className="border-t border-white/10 pt-3 mt-3">
                        <p className="text-[#F2F5F9] font-medium mb-2">
                          ðŸ• Hours
                        </p>
                        <div className="text-sm text-[#B9C4CC] space-y-1">
                          <div className="flex justify-between">
                            <span>Mon - Fri:</span>
                            <span>{branch.hours.weekdays}</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Saturday:</span>
                            <span>{branch.hours.saturday}</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Sunday:</span>
                            <span>{branch.hours.sunday}</span>
                          </div>
                        </div>
                      </div>

                      <div className="flex gap-2 pt-3">
                        <button className="btn-primary text-sm py-2 px-4 flex-1">
                          Call Branch
                        </button>
                        <button className="btn-secondary text-sm py-2 px-4">
                          Directions
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-linear-to-b from-[#001F3F] to-[#0E2433]">
        <div className="container-premium">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Frequently Asked Questions
            </h2>
            <p className="text-xl text-[#B9C4CC] max-w-2xl mx-auto">
              Quick answers to common questions about our services
            </p>
          </div>

          <div className="max-w-4xl mx-auto space-y-6">
            {FAQS.map((faq: FAQ, index) => (
              <div
                key={index}
                className="bg-white/5 rounded-xl p-6 border border-white/10"
              >
                <h3 className="text-lg font-bold text-[#F2F5F9] mb-3">
                  {faq.question}
                </h3>
                <p className="text-[#B9C4CC] leading-relaxed">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 bg-linear-to-r from-[#001F3F] to-[#0077B6]">
        <div className="container-premium">
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Ready to Improve Your Vision?
            </h2>
            <p className="text-xl text-[#B9C4CC] mb-8">
              Don&apos;t wait to experience better vision. Contact us today and
              take the first step toward clearer sight.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="btn-primary text-lg px-8 py-4">
                ðŸ“ž Call Us Now
              </button>
              <button className="btn-secondary text-lg px-8 py-4">
                ðŸ“ Visit Branch
              </button>
              <button className="btn-secondary text-lg px-8 py-4">
                ðŸ’¬ WhatsApp
              </button>
            </div>

            <p className="text-[#B9C4CC] text-sm mt-4">
              Emergency eye care available â€¢ All medical aids accepted â€¢
              Family-friendly service
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}

```

===============================
  app\frames\page.tsx
===============================
`$lang
import Navigation from "@/components/Navigation";
import FramesGallery from "@/components/FramesGallery";

export default function FramesPage() {
  return (
    <div className="min-h-screen">
      <Navigation />

      <section className="py-20 bg-gradient-to-br from-[#001F3F] via-[#002851] to-[#0077B6]">
        <div className="container-premium">
          <div className="text-center mb-16">
            <h1 className="text-5xl md:text-7xl font-black mb-6 leading-tight">
              <span className="text-[#F2F5F9]">Premium Frames</span>
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00A6E6] to-[#48CAE4]">
                & Lenses
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-[#B9C4CC] max-w-3xl mx-auto">
              Discover our exclusive collection of designer frames and advanced
              lenses. From global luxury brands to affordable quality options,
              all crafted with precision in our in-house laboratory.
            </p>
          </div>

          <FramesGallery />
        </div>
      </section>
    </div>
  );
}

```

===============================
  app\globals.css
===============================
`$lang
@import url("https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,300;0,400;0,500;0,600;0,700;0,900;1,300&display=swap");
@import "tailwindcss";

:root {
  /* âœ… Deep Ocean Color Palette */
  --bg-top: #001f3f;
  --bg-bottom: #0099cc;
  --accent: #00a6e6;
  --glow-center: #0077b6;
  --glow-edge: #48cae4;
  --text-primary: #f2f5f9;
  --text-muted: #b9c4cc;
  --surface-dark: #0e2433;
  --surface-light: #ffffff;
  --border-dark: #2c3e50;
  --border-light: #e6eef5;
  --success: #2ecc71;
  --warning: #f39c12;
  --error: #e74c3c;

  /* âœ… Premium Typography */
  --font-montserrat: "Montserrat", system-ui, -apple-system, "Segoe UI", Roboto,
    "Helvetica Neue", Arial, sans-serif;
  --font-sans: var(--font-montserrat);

  /* âœ… Spacing System */
  --space-xs: 0.5rem;
  --space-sm: 1rem;
  --space-md: 1.5rem;
  --space-lg: 2rem;
  --space-xl: 3rem;
  --space-2xl: 4rem;
}

@theme inline {
  --color-background: var(--background);
  --color-foreground: var(--foreground);
  --font-sans: var(--font-montserrat);
  --font-mono: var(--font-geist-mono);
}

/* âœ… Base Styles with Premium Ocean Theme */
body {
  background: linear-gradient(135deg, var(--bg-top) 0%, var(--bg-bottom) 100%);
  color: var(--text-primary);
  font-family: var(--font-montserrat);
  font-weight: 400;
  line-height: 1.6;
  min-height: 100vh;
}

/* âœ… Premium Container */
.container-premium {
  max-width: 1100px;
  margin: 0 auto;
  padding: 1.5rem;
}

@media (min-width: 768px) {
  .container-premium {
    padding: 3rem;
  }
}

/* âœ… Premium Button Styles */
.btn-primary {
  background: var(--accent);
  color: #ffffff;
  padding: 0.75rem 1.5rem;
  border-radius: 0.5rem;
  font-weight: 600;
  font-size: 1rem;
  border: none;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 14px 0 rgba(0, 166, 230, 0.35);
  position: relative;
  overflow: hidden;
}

.btn-primary:hover {
  background: #008fcd;
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(0, 166, 230, 0.5);
}

.btn-primary:focus {
  outline: 3px solid rgba(72, 202, 228, 0.5);
  outline-offset: 2px;
}

.btn-secondary {
  background: transparent;
  color: var(--text-primary);
  padding: 0.75rem 1.5rem;
  border-radius: 0.5rem;
  font-weight: 500;
  font-size: 1rem;
  border: 2px solid var(--border-light);
  cursor: pointer;
  transition: all 0.3s ease;
}

.btn-secondary:hover {
  background: rgba(255, 255, 255, 0.1);
  border-color: var(--accent);
}

/* âœ… Premium Card Styles */
.card-premium {
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 1rem;
  padding: 2rem;
  transition: all 0.3s ease;
}

.card-premium:hover {
  transform: translateY(-4px);
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.2);
  border-color: rgba(72, 202, 228, 0.3);
}

/* âœ… Premium Typography Scale */
h1 {
  font-size: 3rem;
  font-weight: 700;
  line-height: 1.1;
  margin-bottom: 1.5rem;
}

h2 {
  font-size: 2rem;
  font-weight: 600;
  line-height: 1.2;
  margin-bottom: 1rem;
}

h3 {
  font-size: 1.5rem;
  font-weight: 500;
  line-height: 1.3;
  margin-bottom: 0.75rem;
}

p {
  font-size: 1rem;
  font-weight: 400;
  line-height: 1.6;
  margin-bottom: 1rem;
}

.text-muted {
  color: var(--text-muted);
}

/* âœ… Accessibility & Focus Styles */
*:focus {
  outline: 2px solid var(--accent);
  outline-offset: 2px;
}

/* âœ… Glow Effects for Premium Feel */
.glow-effect {
  position: relative;
}

.glow-effect::before {
  content: "";
  position: absolute;
  top: -10px;
  left: -10px;
  right: -10px;
  bottom: -10px;
  background: radial-gradient(
    circle at center,
    var(--glow-center) 0%,
    var(--glow-edge) 50%,
    transparent 70%
  );
  opacity: 0.1;
  z-index: -1;
  border-radius: inherit;
}

/* âœ… Responsive Design */
@media (max-width: 768px) {
  h1 {
    font-size: 2.25rem;
  }

  h2 {
    font-size: 1.75rem;
  }

  .container-premium {
    padding: 1rem;
  }
}

/* âœ… Smooth Scrolling */
html {
  scroll-behavior: smooth;
}

/* âœ… Selection Colors */
::selection {
  background: var(--accent);
  color: white;
}

```

===============================
  app\layout.tsx
===============================
`$lang
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import AuthProvider from "@/providers/AuthProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const montserrat = Geist({
  variable: "--font-montserrat",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Link Opticians â€” Premium Eye Care & Precision Vision",
  description:
    "Same-day spectacles from our in-house lab. Book an eye exam online at Link Opticians. Quality eye care across Zimbabwe.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <meta name="theme-color" content="#001F3F" />
        <meta property="og:site_name" content="Link Opticians" />
        <meta
          property="og:title"
          content="Link Opticians â€” Eye Care & Precision Vision"
        />
        <meta
          property="og:description"
          content="Same-day spectacles from our in-house lab. Book an eye exam online at Link Opticians."
        />
        <meta property="og:image" content="/assets/og-image.png" />
      </head>
      <body
        className={`${montserrat.variable} ${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}

```

===============================
  app\page.tsx
===============================
`$lang
"use client";

import Navigation from "@/components/Navigation";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

export default function Home() {
  const router = useRouter();
  const { data: session, status } = useSession();

  const handleBookEyeExam = () => {
    if (status === "loading") return;

    if (!session) {
      // Redirect to login with callback to booking page
      router.push(
        "/auth/login?callbackUrl=/book&message=Please sign in to book your eye exam"
      );
    } else {
      router.push("/book");
    }
  };

  const handleBrowseFrames = () => {
    router.push("/frames");
  };

  return (
    <div className="min-h-screen">
      <Navigation />

      {/* âœ… Premium Hero Section */}
      <main>
        <section className="py-20">
          <div className="container-premium">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              {/* Hero Content */}
              <div className="space-y-8">
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
                  Premium Eye Care
                  <span className="text-[#00A6E6] block">For Everyone</span>
                </h1>

                <p className="text-xl text-[#B9C4CC] max-w-2xl">
                  Experience world-class eye care with same-day spectacles from
                  our in-house laboratory. Quality vision solutions across
                  Zimbabwe.
                </p>

                <div className="flex flex-col sm:flex-row gap-4">
                  <button
                    onClick={handleBookEyeExam}
                    disabled={status === "loading"}
                    className="btn-primary text-lg px-8 py-4 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {status === "loading" ? "Loading..." : "Book Eye Exam"}
                  </button>
                  <button
                    onClick={handleBrowseFrames}
                    className="btn-secondary text-lg px-8 py-4"
                  >
                    Browse Frames
                  </button>
                </div>

                {/* Trust Indicators */}
                <div className="flex items-center space-x-8 pt-8">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-[#00A6E6]">15+</div>
                    <div className="text-sm text-[#B9C4CC]">
                      Years Experience
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-[#00A6E6]">5</div>
                    <div className="text-sm text-[#B9C4CC]">Branches</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-[#00A6E6]">
                      Same Day
                    </div>
                    <div className="text-sm text-[#B9C4CC]">
                      Spectacles Ready
                    </div>
                  </div>
                </div>
              </div>

              {/* Hero Visual */}
              <div className="relative">
                <div className="glow-effect bg-gradient-to-br from-[#0077B6] to-[#48CAE4] rounded-2xl p-8 aspect-square flex items-center justify-center">
                  <div className="text-center text-white">
                    <div className="text-6xl mb-4">ðŸ‘“</div>
                    <div className="text-xl font-semibold">
                      Premium Vision Care
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

```

===============================
  app\profile\actions.ts
===============================
`$lang
"use server";

import { redirect } from "next/navigation";

export async function redirectToBooking() {
  redirect("/book");
}

export async function redirectToAppointments() {
  redirect("/appointments");
}

```

===============================
  app\profile\page.tsx
===============================
`$lang
import { getCurrentUser } from "@/lib/auth";
import { redirect } from "next/navigation";
import Navigation from "@/components/Navigation";
import ProfileActions from "@/components/ProfileActions";

export default async function ProfilePage() {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/auth/login");
  }

  return (
    <div className="min-h-screen">
      <Navigation />

      <section className="py-20 bg-gradient-to-br from-[#001F3F] via-[#002851] to-[#0077B6]">
        <div className="container-premium">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h1 className="text-5xl md:text-6xl font-black mb-6 leading-tight">
                <span className="text-[#F2F5F9]">My</span>
                <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00A6E6] to-[#48CAE4]">
                  Profile
                </span>
              </h1>
              <p className="text-xl text-[#B9C4CC]">
                Welcome back, {user.firstName}! Manage your appointments and
                profile.
              </p>
            </div>

            <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-8 border border-white/10">
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-2xl font-bold text-[#F2F5F9] mb-4">
                    Personal Information
                  </h3>
                  <div className="space-y-3">
                    <div>
                      <p className="text-[#B9C4CC] text-sm">Full Name</p>
                      <p className="text-[#F2F5F9] font-medium">
                        {user.firstName} {user.lastName}
                      </p>
                    </div>
                    <div>
                      <p className="text-[#B9C4CC] text-sm">Email</p>
                      <p className="text-[#F2F5F9] font-medium">{user.email}</p>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-2xl font-bold text-[#F2F5F9] mb-4">
                    Quick Actions
                  </h3>
                  <ProfileActions />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

```

===============================
  app\services\page.tsx
===============================
`$lang
"use client";
import Navigation from "@/components/Navigation";
// âœ… Specific constant imports
import { SERVICES, MEDICAL_AIDS, BRANCH_FEATURES } from "@/constants/services";
import { TESTIMONIALS } from "@/constants/testimonials";
// âœ… Specific type imports
import { Service, Testimonial, BranchFeature } from "@/types";

export default function Services() {
  return (
    <div className="min-h-screen">
      <Navigation />

      {/* Enhanced Header with Team Trust */}
      <section className="py-24 bg-linear-to-br from-[#001F3F] via-[#002851] to-[#0077B6] relative">
        <div className="container-premium">
          <div className="text-center max-w-4xl mx-auto">
            {/* Main Headline */}
            <div className="mb-8">
              <h1 className="text-5xl md:text-7xl font-black mb-6 leading-tight">
                <span className="text-[#F2F5F9]">Your Vision</span>
                <br />
                <span className="text-transparent bg-clip-text bg-linear-to-r from-[#00A6E6] to-[#48CAE4]">
                  Our Passion
                </span>
              </h1>
            </div>

            {/* Sub-headline */}
            <div className="mb-12">
              <p className="text-2xl md:text-3xl text-[#F2F5F9] font-semibold mb-6">
                Expert Eye Care You Can Trust
              </p>
              <p className="text-lg md:text-xl text-[#B9C4CC] leading-relaxed">
                Led by experienced optometrists with 15+ years serving Zimbabwe,
                we combine cutting-edge technology with personalized care for
                vision that transforms lives.
              </p>
            </div>

            {/* Key Benefits Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
              <div className="text-center p-6 bg-white/5 rounded-xl border border-white/10">
                <div className="text-3xl mb-4">âš¡</div>
                <h3 className="text-xl font-bold text-[#F2F5F9] mb-2">
                  Same-Day Service
                </h3>
                <p className="text-[#B9C4CC]">
                  Spectacles ready while you wait
                </p>
              </div>

              <div className="text-center p-6 bg-white/5 rounded-xl border border-white/10">
                <div className="text-3xl mb-4">ðŸ‘¨â€âš•ï¸</div>
                <h3 className="text-xl font-bold text-[#F2F5F9] mb-2">
                  Expert Optometrists
                </h3>
                <p className="text-[#B9C4CC]">15+ years experience each</p>
              </div>

              <div className="text-center p-6 bg-white/5 rounded-xl border border-white/10">
                <div className="text-3xl mb-4">ðŸŽ¯</div>
                <h3 className="text-xl font-bold text-[#F2F5F9] mb-2">
                  Quality Guarantee
                </h3>
                <p className="text-[#B9C4CC]">
                  Premium materials & craftsmanship
                </p>
              </div>
            </div>

            {/* Medical Aid & Branch Info */}
            <div className="bg-white/10 rounded-2xl p-6 mb-8 border border-white/20">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="text-lg font-bold text-[#F2F5F9] mb-3">
                    âœ… Accepted Medical Aids
                  </h4>
                  <div className="flex flex-wrap gap-2 justify-center">
                    {MEDICAL_AIDS.slice(0, 3).map((aid, index) => (
                      <span
                        key={index}
                        className="bg-[#00A6E6] px-3 py-1 rounded-full text-sm text-white"
                      >
                        {aid}
                      </span>
                    ))}
                    <span className="bg-white/20 px-3 py-1 rounded-full text-sm text-[#F2F5F9]">
                      +{MEDICAL_AIDS.length - 3} more
                    </span>
                  </div>
                </div>
                <div>
                  <h4 className="text-lg font-bold text-[#00A6E6] mb-3">
                    ðŸ“ 5 Convenient Branches
                  </h4>
                  <p className="text-[#B9C4CC] text-sm">
                    Same great service across Zimbabwe
                  </p>
                </div>
              </div>
            </div>

            {/* CTA Section */}
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <button className="btn-primary text-lg px-12 py-4 font-bold">
                Book Your Appointment
              </button>
              <button className="btn-secondary text-lg px-8 py-4">
                Meet Our Team
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20 bg-linear-to-b from-[#001F3F] to-[#0E2433]">
        <div className="container-premium">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {SERVICES.map((service: Service) => (
              <div
                key={service.id}
                className="card-premium group hover:scale-105 transition-all duration-300"
              >
                <div className="mb-6">
                  <div className="text-5xl mb-4 text-center">
                    {service.icon}
                  </div>
                  <div className="w-full h-48 bg-linear-to-br from-[#0077B6] to-[#48CAE4] rounded-xl mb-4 flex items-center justify-center group-hover:shadow-xl group-hover:shadow-[#00A6E6]/20 transition-all">
                    <span className="text-white text-sm font-medium text-center">
                      Professional Service
                      <br />
                      <span className="text-xs opacity-80">
                        Quality Guaranteed
                      </span>
                    </span>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-start justify-between">
                    <h3 className="text-xl font-semibold text-[#F2F5F9] flex-1">
                      {service.title}
                    </h3>
                    <span className="text-xs bg-[#00A6E6] text-white px-2 py-1 rounded-full ml-2 whitespace-nowrap">
                      {service.duration}
                    </span>
                  </div>

                  <p className="text-[#B9C4CC] leading-relaxed">
                    {service.description}
                  </p>

                  <ul className="space-y-2">
                    {service.features.map((feature, index) => (
                      <li
                        key={index}
                        className="flex items-center text-sm text-[#B9C4CC]"
                      >
                        <span className="w-2 h-2 bg-[#00A6E6] rounded-full mr-3"></span>
                        {feature}
                      </li>
                    ))}
                  </ul>

                  <div className="pt-4">
                    <button className="w-full btn-primary text-center justify-center">
                      {service.cta}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Branch Services Overview */}
      <section className="py-16 bg-linear-to-r from-[#001F3F] to-[#003366]">
        <div className="container-premium">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Services Across All Branches
            </h2>
            <p className="text-xl text-[#B9C4CC] max-w-2xl mx-auto">
              Same premium quality and expert care at all 5 locations
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            {BRANCH_FEATURES.map((feature: BranchFeature, index) => (
              <div
                key={index}
                className="text-center p-6 bg-white/5 rounded-xl border border-white/10"
              >
                <div className="text-3xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-bold text-[#F2F5F9] mb-2">
                  {feature.title}
                </h3>
                <p className="text-[#B9C4CC]">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Marquee Testimonials */}
      <section className="py-20 bg-linear-to-b from-[#001F3F] to-[#002851]">
        <div className="container-premium">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Loved by Our Patients
            </h2>
            <p className="text-xl text-[#B9C4CC] max-w-2xl mx-auto">
              Real stories from real people across Zimbabwe
            </p>
          </div>

          {/* Marquee Container */}
          <div className="relative overflow-hidden">
            <div className="flex animate-marquee space-x-8">
              {[...TESTIMONIALS, ...TESTIMONIALS].map(
                (testimonial: Testimonial, index) => (
                  <div
                    key={index}
                    className="shrink-0 w-80 bg-white/5 rounded-xl p-6 border border-white/10"
                  >
                    <div className="flex justify-center mb-4">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <span key={i} className="text-yellow-400 text-lg">
                          â­
                        </span>
                      ))}
                    </div>
                    <p className="text-[#B9C4CC] italic mb-4 text-sm leading-relaxed">
                      &quot;{testimonial.text}&quot;
                    </p>
                    <div className="border-t border-white/10 pt-3">
                      <h4 className="font-bold text-[#F2F5F9] text-sm">
                        {testimonial.name}
                      </h4>
                      <p className="text-xs text-[#B9C4CC]">
                        {testimonial.location}
                      </p>
                    </div>
                  </div>
                )
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-20 bg-linear-to-r from-[#001F3F] to-[#0077B6]">
        <div className="container-premium">
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Ready to See Clearly?
            </h2>
            <p className="text-xl text-[#B9C4CC] mb-8">
              Experience the Link Optical difference - where expert care meets
              same-day service.
            </p>

            {/* Final Assurance */}
            <div className="bg-white/10 rounded-xl p-6 mb-8 border border-white/20">
              <div className="grid md:grid-cols-3 gap-4 text-sm">
                <div className="flex items-center justify-center gap-2">
                  <span className="text-[#00A6E6]">âœ…</span>
                  <span className="text-[#F2F5F9]">Free Consultation</span>
                </div>
                <div className="flex items-center justify-center gap-2">
                  <span className="text-[#00A6E6]">âœ…</span>
                  <span className="text-[#F2F5F9]">Medical Aid Accepted</span>
                </div>
                <div className="flex items-center justify-center gap-2">
                  <span className="text-[#00A6E6]">âœ…</span>
                  <span className="text-[#F2F5F9]">Quality Guarantee</span>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="btn-primary text-lg px-8 py-4">
                ðŸ“… Book Your Appointment
              </button>
              <button className="btn-secondary text-lg px-8 py-4">
                ðŸ“ž Call Nearest Branch
              </button>
            </div>
            <p className="text-[#B9C4CC] text-sm mt-4">
              âš¡ Same-day service available â€¢ ðŸ’³ All medical aids accepted â€¢ ðŸ“
              5 locations nationwide
            </p>
          </div>
        </div>
      </section>

      {/* Add Marquee Animation */}
      <style jsx>{`
        @keyframes marquee {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        .animate-marquee {
          animation: marquee 30s linear infinite;
        }
      `}</style>
    </div>
  );
}

```

===============================
  app\test-integration\page.tsx
===============================
`$lang
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
          "âœ… Database connection successful"
        );
      } else {
        addTestResult("Database", "error", "âŒ Database connection failed");
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
          "âœ… VisionPlus server is accessible"
        );
      } else {
        addTestResult(
          "VisionPlus Connection",
          "error",
          "âŒ Cannot connect to VisionPlus",
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
            "âœ… Authentication successful"
          );
        } else {
          addTestResult("Authentication", "error", "âŒ Authentication failed", {
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
          "âœ… Form submission test completed",
          { result: JSON.stringify(formResult.result, null, 2) }
        );
      } else {
        addTestResult(
          "Form Submission",
          "warning",
          "âš ï¸ Form submission may require adjustments",
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
          "âœ… Test appointment created successfully",
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
              "âœ… Appointment synced to VisionPlus!",
              {
                visionPlusId: syncStatus.appointment.visionPlusId,
                syncStatus: syncStatus.appointment.syncStatus,
              }
            );
          } else {
            addTestResult(
              "Sync Function",
              "warning",
              "âš ï¸ Sync may require manual intervention",
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
          "âŒ Failed to create test appointment",
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
          "âœ… Background sync system is operational",
          {
            queueStatus: backgroundStatus.queueStatus,
            totalAppointments: backgroundStatus.totalAppointments,
          }
        );
      } else {
        addTestResult(
          "Background Sync",
          "error",
          "âŒ Background sync system error",
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
        `ðŸŽ‰ Integration Test Complete: ${successCount}/${totalTests} tests passed!`
      );
    } catch (error) {
      addTestResult(
        "Test Runner",
        "error",
        "ðŸ’¥ Test runner encountered an error",
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
          "âœ… All systems operational! Database and VisionPlus are connected."
        );
      } else {
        addTestResult(
          "Quick Test",
          "error",
          "âŒ Connectivity issues detected",
          {
            database: dbResult,
            visionPlus: vpResult.success,
            visionPlusError: vpResult.error,
          }
        );
      }
    } catch (error) {
      addTestResult("Quick Test", "error", "ðŸ’¥ Quick test failed", {
        error: error instanceof Error ? error.message : "Unknown error",
      });
    } finally {
      setIsTesting(false);
    }
  };

  const getStatusIcon = (status: TestResult["status"]) => {
    switch (status) {
      case "success":
        return "âœ…";
      case "error":
        return "âŒ";
      case "warning":
        return "âš ï¸";
      case "pending":
        return "â³";
      default:
        return "ðŸ”";
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
              {isTesting ? "ðŸ”„ Running..." : "ðŸš€ Quick Test"}
            </button>

            <button
              onClick={runFullIntegrationTest}
              disabled={isTesting}
              className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-400 font-medium"
            >
              {isTesting
                ? "ðŸ”„ Running Full Test..."
                : "ðŸ” Full Integration Test"}
            </button>

            <button
              onClick={clearResults}
              disabled={isTesting}
              className="px-6 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 disabled:bg-gray-400 font-medium"
            >
              ðŸ—‘ï¸ Clear Results
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
              <div className="text-6xl mb-4">ðŸ”</div>
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

```

===============================
  app\test-notifications\page.tsx
===============================
`$lang
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
        alert(`âœ… ${testType} test completed successfully!`);
      } else {
        alert(`âŒ ${testType} test failed: ${data.error}`);
      }
    } catch (error) {
      alert("âŒ Test failed - check console for details");
      console.error("Test error:", error);
    } finally {
      setLoading(false);
    }
  };

  const getConfigStatus = (config: NotificationConfig | undefined) => {
    if (!config) return "loading...";

    const emailStatus = config.email.configured
      ? "âœ… Production"
      : "âš ï¸ Console Mode";
    const smsStatus = config.sms.configured
      ? "âœ… Production"
      : "âš ï¸ Console Mode";

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
              {loading ? "Testing..." : "ðŸ“§ Test Booking Confirmation"}
            </button>

            <button
              onClick={() => runTest("status")}
              disabled={loading}
              className="px-4 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:bg-gray-400 font-medium"
            >
              {loading ? "Testing..." : "ðŸ”„ Test Status Update"}
            </button>

            <button
              onClick={() => runTest("reminder")}
              disabled={loading}
              className="px-4 py-3 bg-orange-600 text-white rounded-lg hover:bg-orange-700 disabled:bg-gray-400 font-medium"
            >
              {loading ? "Testing..." : "â° Test Reminder"}
            </button>
          </div>

          <div className="mt-4 text-sm text-gray-600">
            <p>
              â€¢ <strong>Console Mode:</strong> Notifications are logged to
              console (current)
            </p>
            <p>
              â€¢ <strong>Production:</strong> Real emails/SMS are sent to
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
                {testResult.result.success ? "âœ… Success" : "âŒ Failed"}
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

```

===============================
  app\test-visionplus\page.tsx
===============================
`$lang
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
          recommendations: ["âŒ Failed to connect to VisionPlus server"],
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
          ? "ðŸ” Testing VisionPlus Access..."
          : "ðŸš€ Run VisionPlus Discovery"}
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
            <h2 className="text-xl font-bold mb-4">ðŸ“Š Discovery Summary</h2>
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
            <h3 className="text-lg font-bold mb-3">ðŸŽ¯ Next Steps</h3>
            <ul className="list-disc list-inside space-y-2">
              {results.recommendations.map((rec, index) => (
                <li
                  key={index}
                  className={
                    rec.includes("âŒ") ? "text-red-600" : "text-green-600"
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
              <h2 className="text-xl font-bold mb-4">ðŸŒ Access Test Details</h2>
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
                          {test.accessible ? "âœ… Accessible" : "âŒ Blocked"}
                        </span>
                        {test.hasForm && (
                          <span className="block mt-1 px-2 py-1 bg-purple-200 text-purple-800 rounded text-xs font-medium">
                            ðŸ“ Form
                          </span>
                        )}
                        {test.requiresLogin && (
                          <span className="block mt-1 px-2 py-1 bg-orange-200 text-orange-800 rounded text-xs font-medium">
                            ðŸ” Login Required
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
            <h2 className="text-xl font-bold mb-4">ðŸ” Detailed Results</h2>
            <pre className="bg-gray-100 p-4 rounded overflow-auto text-sm">
              {JSON.stringify(results, null, 2)}
            </pre>
          </div>
        </div>
      )}
    </div>
  );
}

```

