"use client";

import { useState, useEffect } from "react";
import { Appointment } from "@/types";

interface AppointmentsHistoryProps {
  userId: string;
}

export default function AppointmentsHistory({
  userId,
}: AppointmentsHistoryProps) {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchUserAppointments();
  }, []);

  const fetchUserAppointments = async () => {
    try {
      setLoading(true);
      const response = await fetch("/api/appointments/user");

      if (!response.ok) {
        throw new Error("Failed to fetch appointments");
      }

      const data = await response.json();

      if (data.success) {
        setAppointments(data.appointments || []);
      } else {
        setError(data.error || "Failed to load appointments");
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "CONFIRMED":
        return "bg-green-100 text-green-800 border-green-200";
      case "COMPLETED":
        return "bg-purple-100 text-purple-800 border-purple-200";
      case "CANCELLED":
        return "bg-red-100 text-red-800 border-red-200";
      case "NOSHOW":
        return "bg-orange-100 text-orange-800 border-orange-200";
      default:
        return "bg-blue-100 text-blue-800 border-blue-200";
    }
  };

  const getSyncStatusColor = (syncStatus: string) => {
    switch (syncStatus) {
      case "SYNCED":
        return "bg-green-100 text-green-800";
      case "FAILED":
        return "bg-red-100 text-red-800";
      case "MANUAL_REQUIRED":
        return "bg-orange-100 text-orange-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-ZA", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center py-12">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#00A6E6] mx-auto mb-4"></div>
          <p className="text-[#B9C4CC]">Loading your appointments...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-8">
        <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-4 max-w-md mx-auto">
          <p className="text-red-400 mb-4">Error loading appointments</p>
          <p className="text-red-300 text-sm mb-4">{error}</p>
          <button
            onClick={fetchUserAppointments}
            className="btn-primary text-sm"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  if (appointments.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-6xl mb-4">📅</div>
        <h3 className="text-2xl font-bold text-[#F2F5F9] mb-4">
          No Appointments Yet
        </h3>
        <p className="text-[#B9C4CC] mb-6">
          You haven't booked any appointments yet. Book your first appointment
          to get started!
        </p>
        <a href="/book" className="btn-primary">
          Book Your First Appointment
        </a>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-2xl font-bold text-[#F2F5F9]">
          Appointment History
        </h3>
        <div className="text-sm text-[#B9C4CC]">
          {appointments.length} appointment
          {appointments.length !== 1 ? "s" : ""}
        </div>
      </div>

      <div className="space-y-4">
        {appointments.map((appointment) => (
          <div
            key={appointment.id}
            className="bg-white/5 rounded-xl p-6 border border-white/10 hover:bg-white/10 transition-all"
          >
            <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
              {/* Appointment Details */}
              <div className="flex-1">
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between mb-4">
                  <div>
                    <h4 className="text-xl font-bold text-[#F2F5F9] mb-2">
                      {appointment.serviceType}
                    </h4>
                    <p className="text-[#00A6E6] font-semibold">
                      {appointment.branch}
                    </p>
                  </div>

                  <div className="flex flex-wrap gap-2 mt-2 sm:mt-0">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(
                        appointment.status
                      )}`}
                    >
                      {appointment.status}
                    </span>
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${getSyncStatusColor(
                        appointment.syncStatus
                      )}`}
                    >
                      {appointment.syncStatus}
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-[#B9C4CC]">Date & Time</p>
                    <p className="text-[#F2F5F9] font-medium">
                      {formatDate(appointment.appointmentDate)} at{" "}
                      {appointment.appointmentTime}
                    </p>
                  </div>

                  <div>
                    <p className="text-[#B9C4CC]">Booked On</p>
                    <p className="text-[#F2F5F9] font-medium">
                      {new Date(appointment.createdAt).toLocaleDateString()}
                    </p>
                  </div>

                  {appointment.visionPlusId && (
                    <div>
                      <p className="text-[#B9C4CC]">VisionPlus ID</p>
                      <p className="text-[#F2F5F9] font-medium text-sm">
                        {appointment.visionPlusId}
                      </p>
                    </div>
                  )}
                </div>
              </div>

              {/* Actions */}
              <div className="flex flex-col gap-2 lg:items-end">
                {appointment.status === "PENDING" && (
                  <button className="btn-primary text-sm px-4 py-2">
                    Confirm Appointment
                  </button>
                )}
                {appointment.status === "CONFIRMED" && (
                  <button className="btn-secondary text-sm px-4 py-2">
                    Reschedule
                  </button>
                )}
                {(appointment.status === "PENDING" ||
                  appointment.status === "CONFIRMED") && (
                  <button className="text-red-400 hover:text-red-300 text-sm font-medium">
                    Cancel
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Quick Stats */}
      <div className="bg-white/5 rounded-xl p-6 border border-white/10 mt-8">
        <h4 className="text-lg font-bold text-[#F2F5F9] mb-4">
          Appointment Summary
        </h4>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
          <div>
            <div className="text-2xl font-bold text-[#00A6E6]">
              {appointments.length}
            </div>
            <div className="text-sm text-[#B9C4CC]">Total</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-green-500">
              {appointments.filter((a) => a.status === "CONFIRMED").length}
            </div>
            <div className="text-sm text-[#B9C4CC]">Confirmed</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-blue-500">
              {appointments.filter((a) => a.status === "COMPLETED").length}
            </div>
            <div className="text-sm text-[#B9C4CC]">Completed</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-purple-500">
              {appointments.filter((a) => a.syncStatus === "SYNCED").length}
            </div>
            <div className="text-sm text-[#B9C4CC]">Synced</div>
          </div>
        </div>
      </div>
    </div>
  );
}
