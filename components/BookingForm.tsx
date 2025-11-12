"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
// ✅ Specific constant imports
import { BOOKING_BRANCHES, SERVICE_TYPES } from "@/constants/booking";
// ✅ Specific type imports
import { BookingBranch, ServiceType } from "@/types";

interface BookingFormProps {
  user?: {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    phone?: string;
  };
}

export default function BookingForm({ user }: BookingFormProps) {
  const { data: session } = useSession();
  const currentUser = user || session?.user;

  const [formData, setFormData] = useState({
    patientName: "",
    patientEmail: "",
    patientPhone: "",
    patientDOB: "",
    branch: "",
    appointmentDate: "",
    appointmentTime: "",
    serviceType: "",
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  // Fix: Use useEffect to set initial values after component mount
  useEffect(() => {
    if (currentUser) {
      setFormData((prev) => ({
        ...prev,
        patientName: `${currentUser.firstName} ${currentUser.lastName}`,
        patientEmail: currentUser.email || "",
        patientPhone: currentUser.phone || "",
      }));
    }
  }, [currentUser]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const response = await fetch("/api/appointments", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          userId: currentUser?.id,
        }),
      });

      const result = await response.json();

      if (response.ok) {
        setMessage(
          "✅ Appointment booked successfully! You will receive a confirmation shortly."
        );
        // Reset form but keep user info
        setFormData({
          patientName: currentUser
            ? `${currentUser.firstName} ${currentUser.lastName}`
            : "",
          patientEmail: currentUser?.email || "",
          patientPhone: currentUser?.phone || "",
          patientDOB: "",
          branch: "",
          appointmentDate: "",
          appointmentTime: "",
          serviceType: "",
        });
      } else {
        setMessage(`❌ Error: ${result.error}`);
      }
    } catch (error) {
      setMessage("❌ Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-2xl font-bold text-[#F2F5F9] mb-2">
          Book Your Eye Appointment
        </h3>
        <p className="text-[#B9C4CC]">
          {currentUser
            ? `Welcome, ${currentUser.firstName}! Your information has been pre-filled.`
            : "Please fill in your details to book an appointment."}
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Patient Details */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-[#F2F5F9] mb-1">
              Full Name *
            </label>
            <input
              type="text"
              name="patientName"
              value={formData.patientName}
              onChange={handleChange}
              required
              className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-[#F2F5F9] placeholder-[#B9C4CC] focus:outline-none focus:border-[#00A6E6] transition-colors"
              placeholder="Enter your full name"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-[#F2F5F9] mb-1">
              Email *
            </label>
            <input
              type="email"
              name="patientEmail"
              value={formData.patientEmail}
              onChange={handleChange}
              required
              className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-[#F2F5F9] placeholder-[#B9C4CC] focus:outline-none focus:border-[#00A6E6] transition-colors"
              placeholder="Enter your email"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-[#F2F5F9] mb-1">
              Phone Number
            </label>
            <input
              type="tel"
              name="patientPhone"
              value={formData.patientPhone}
              onChange={handleChange}
              className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-[#F2F5F9] placeholder-[#B9C4CC] focus:outline-none focus:border-[#00A6E6] transition-colors"
              placeholder="+263 XXX XXX XXX"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-[#F2F5F9] mb-1">
              Date of Birth
            </label>
            <input
              type="date"
              name="patientDOB"
              value={formData.patientDOB}
              onChange={handleChange}
              className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-[#F2F5F9] placeholder-[#B9C4CC] focus:outline-none focus:border-[#00A6E6] transition-colors"
            />
          </div>
        </div>

        {/* Appointment Details */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-[#F2F5F9] mb-1">
              Branch *
            </label>
            <select
              name="branch"
              value={formData.branch}
              onChange={handleChange}
              required
              className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-[#F2F5F9] focus:outline-none focus:border-[#00A6E6] transition-colors"
            >
              <option value="">Select a branch</option>
              {BOOKING_BRANCHES.map((branch: BookingBranch) => (
                <option key={branch} value={branch}>
                  {branch}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-[#F2F5F9] mb-1">
              Service Type *
            </label>
            <select
              name="serviceType"
              value={formData.serviceType}
              onChange={handleChange}
              required
              className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-[#F2F5F9] focus:outline-none focus:border-[#00A6E6] transition-colors"
            >
              <option value="">Select a service</option>
              {SERVICE_TYPES.map((service: ServiceType) => (
                <option key={service} value={service}>
                  {service}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-[#F2F5F9] mb-1">
              Appointment Date *
            </label>
            <input
              type="date"
              name="appointmentDate"
              value={formData.appointmentDate}
              onChange={handleChange}
              required
              min={new Date().toISOString().split("T")[0]}
              className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-[#F2F5F9] focus:outline-none focus:border-[#00A6E6] transition-colors"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-[#F2F5F9] mb-1">
              Preferred Time *
            </label>
            <input
              type="time"
              name="appointmentTime"
              value={formData.appointmentTime}
              onChange={handleChange}
              required
              className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-[#F2F5F9] focus:outline-none focus:border-[#00A6E6] transition-colors"
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full btn-primary py-3 text-lg font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? "Booking..." : "Book Appointment"}
        </button>

        {message && (
          <div
            className={`p-4 rounded-lg ${
              message.includes("✅")
                ? "bg-green-500/10 border border-green-500/20 text-green-400"
                : "bg-red-500/10 border border-red-500/20 text-red-400"
            }`}
          >
            {message}
          </div>
        )}
      </form>
    </div>
  );
}
