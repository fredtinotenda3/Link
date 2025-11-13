===============================
  components\AppointmentsHistory.tsx
===============================
`$lang
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
        <div className="text-6xl mb-4">ðŸ“…</div>
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

```

===============================
  components\BookingForm.tsx
===============================
`$lang
"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
// âœ… Specific constant imports
import { BOOKING_BRANCHES, SERVICE_TYPES } from "@/constants/booking";
// âœ… Specific type imports
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
          "âœ… Appointment booked successfully! You will receive a confirmation shortly."
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
        setMessage(`âŒ Error: ${result.error}`);
      }
    } catch (error) {
      setMessage("âŒ Network error. Please try again.");
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
              message.includes("âœ…")
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

```

===============================
  components\FramesGallery.tsx
===============================
`$lang
"use client";

import { useState } from "react";
// âœ… Specific constant imports
import { FRAMES, LENSES, FRAME_CATEGORIES } from "@/constants/frames";
// âœ… Specific type imports
import { Frame, Lens, FrameCategoryInfo, FrameCategory } from "@/types";

export default function FramesGallery() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [, setSelectedFrame] = useState<Frame | null>(null);

  const filteredFrames =
    activeCategory === "all"
      ? FRAMES
      : FRAMES.filter((frame) => frame.category === activeCategory);

  const getCategoryColor = (category: FrameCategory) => {
    switch (category) {
      case "designer":
        return "bg-purple-500";
      case "premium":
        return "bg-blue-500";
      case "standard":
        return "bg-green-500";
      case "budget":
        return "bg-orange-500";
      default:
        return "bg-gray-500";
    }
  };

  return (
    <div className="space-y-12">
      {/* Categories Filter */}
      <div className="flex flex-wrap gap-4 justify-center">
        {FRAME_CATEGORIES.map((category: FrameCategoryInfo) => (
          <button
            key={category.id}
            onClick={() => setActiveCategory(category.id)}
            className={`px-6 py-3 rounded-full font-medium transition-all ${
              activeCategory === category.id
                ? "bg-[#00A6E6] text-white"
                : "bg-white/10 text-[#B9C4CC] hover:bg-white/20"
            }`}
          >
            {category.name} ({category.count})
          </button>
        ))}
      </div>

      {/* Frames Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredFrames.map((frame: Frame) => (
          <div
            key={frame.id}
            className="card-premium group cursor-pointer"
            onClick={() => setSelectedFrame(frame)}
          >
            <div className="mb-4">
              <div className="w-full h-64 bg-linear-to-br from-[#0077B6] to-[#48CAE4] rounded-xl mb-4 flex items-center justify-center group-hover:scale-105 transition-transform">
                <div className="text-white text-center">
                  <div className="text-4xl mb-2">ðŸ‘“</div>
                  <div className="text-sm font-medium">{frame.brand}</div>
                </div>
              </div>

              <div className="flex items-start justify-between mb-3">
                <div>
                  <h3 className="text-xl font-bold text-[#F2F5F9]">
                    {frame.name}
                  </h3>
                  <p className="text-[#00A6E6] font-semibold">{frame.brand}</p>
                </div>
                <span
                  className={`px-3 py-1 rounded-full text-xs font-medium text-white ${getCategoryColor(
                    frame.category
                  )}`}
                >
                  {frame.category.toUpperCase()}
                </span>
              </div>

              <p className="text-[#B9C4CC] text-sm mb-4 leading-relaxed">
                {frame.description}
              </p>

              <div className="space-y-3">
                <div>
                  <p className="text-[#B9C4CC] text-xs mb-1">Price Range</p>
                  <p className="text-[#F2F5F9] font-semibold">
                    {frame.priceRange}
                  </p>
                </div>

                <div>
                  <p className="text-[#B9C4CC] text-xs mb-2">
                    Available Colors
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {frame.availableColors.map((color) => (
                      <span
                        key={color}
                        className="px-2 py-1 bg-white/5 text-[#B9C4CC] text-xs rounded border border-white/10"
                      >
                        {color}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex flex-wrap gap-1">
                  {frame.features.map((feature, index) => (
                    <span
                      key={index}
                      className="px-2 py-1 bg-[#00A6E6]/10 text-[#00A6E6] text-xs rounded"
                    >
                      {feature}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <button className="w-full btn-primary mt-4">
              Book Consultation
            </button>
          </div>
        ))}
      </div>

      {/* Lenses Section */}
      <div className="bg-white/5 rounded-2xl p-8 border border-white/10">
        <h2 className="text-3xl font-bold text-[#F2F5F9] mb-8 text-center">
          Advanced Lens Technology
        </h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {LENSES.map((lens: Lens) => (
            <div
              key={lens.id}
              className="text-center p-6 bg-white/5 rounded-xl border border-white/10"
            >
              <div className="text-3xl mb-4">ðŸ”</div>
              <h3 className="text-lg font-bold text-[#F2F5F9] mb-2">
                {lens.name}
              </h3>
              <p className="text-[#00A6E6] font-semibold mb-3">
                {lens.priceRange}
              </p>
              <p className="text-[#B9C4CC] text-sm mb-4">{lens.description}</p>
              <div className="space-y-2">
                {lens.features.map((feature, index) => (
                  <span
                    key={index}
                    className="block bg-white/5 text-[#B9C4CC] text-xs px-2 py-1 rounded"
                  >
                    {feature}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* CTA Section */}
      <div className="text-center bg-white/5 rounded-2xl p-8 border border-white/10">
        <h3 className="text-2xl font-bold text-[#F2F5F9] mb-4">
          Ready to Find Your Perfect Frames?
        </h3>
        <p className="text-[#B9C4CC] mb-6 max-w-2xl mx-auto">
          Visit any of our 5 branches across Zimbabwe for a free consultation
          and frame fitting. Our expert staff will help you find the perfect
          frames for your style and prescription needs.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a href="/book" className="btn-primary">
            Book Frame Consultation
          </a>
          <a href="/branches" className="btn-secondary">
            Find Nearest Branch
          </a>
        </div>
      </div>
    </div>
  );
}

```

===============================
  components\homepage\FinalCTA.tsx
===============================
`$lang
import Link from "next/link";
import { useSession } from "next-auth/react";
import { MEDICAL_AIDS } from "@/constants/services";

export default function FinalCTA() {
  const { data: session, status } = useSession();

  const handleBookAppointment = () => {
    if (status === "loading") return;
    if (!session) {
      window.location.href =
        "/auth/login?callbackUrl=/book&message=Please sign in to book your appointment";
    } else {
      window.location.href = "/book";
    }
  };

  return (
    <section className="py-20 bg-linear-to-b from-[#001F3F] to-[#0E2433]">
      <div className="container-premium">
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Ready to See Clearly?
          </h2>
          <p className="text-xl text-[#B9C4CC] mb-8">
            Join thousands of satisfied patients who trust Link Optical with
            their vision care. Book your appointment today and experience the
            difference.
          </p>

          {/* Medical Aids Assurance */}
          <div className="bg-white/5 rounded-xl p-6 mb-8 border border-white/10">
            <div className="grid md:grid-cols-3 gap-4 text-sm">
              <div className="flex items-center justify-center gap-2">
                <span className="text-[#00A6E6]">âš¡</span>
                <span className="text-[#F2F5F9]">Same-Day Service</span>
              </div>
              <div className="flex items-center justify-center gap-2">
                <span className="text-[#00A6E6]">ðŸ›¡ï¸</span>
                <span className="text-[#F2F5F9]">Medical Aid Accepted</span>
              </div>
              <div className="flex items-center justify-center gap-2">
                <span className="text-[#00A6E6]">ðŸŽ¯</span>
                <span className="text-[#F2F5F9]">Expert Optometrists</span>
              </div>
            </div>
            <div className="mt-4 text-center">
              <p className="text-[#B9C4CC] text-sm">
                Accepted: {MEDICAL_AIDS.slice(0, 3).join(", ")} +{" "}
                {MEDICAL_AIDS.length - 3} more
              </p>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={handleBookAppointment}
              disabled={status === "loading"}
              className="btn-primary text-lg px-8 py-4 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {status === "loading" ? "Loading..." : "Book Your Appointment"}
            </button>
            <Link
              href="/branches"
              className="btn-secondary text-lg px-8 py-4 text-center"
            >
              Find Nearest Branch
            </Link>
          </div>

          {/* Additional Info */}
          <div className="mt-8 text-[#B9C4CC] text-sm">
            <p>
              ðŸ“ 5 locations nationwide â€¢ ðŸ“ž 24/7 support â€¢ ðŸ’° Affordable
              pricing
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

```

===============================
  components\homepage\HeroCarousel.tsx
===============================
`$lang
"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { COMPANY_STATS } from "@/constants/company";
import { SERVICES } from "@/constants/services";
import { HERO_CAROUSEL_IMAGES } from "@/constants/homepage";
import Image from "next/image";

export default function HeroCarousel() {
  const { data: session, status } = useSession();
  const [currentSlide, setCurrentSlide] = useState(0);

  // Hero slides with real image paths
  const heroSlides = [
    {
      id: 1,
      title: "Premium Eye Care",
      subtitle: "For Everyone",
      description:
        "Experience world-class eye care with same-day spectacles from our in-house laboratory. Quality vision solutions across Zimbabwe.",
      image: HERO_CAROUSEL_IMAGES.eyeExam,
      cta: "Book Eye Exam",
    },
    {
      id: 2,
      title: "Same-Day Spectacles",
      subtitle: "Ready in Hours",
      description:
        "Get your glasses made same-day in our advanced in-house laboratory. No more waiting weeks for your vision correction.",
      image: HERO_CAROUSEL_IMAGES.sameDaySpectacles,
      cta: "Browse Frames",
    },
    {
      id: 3,
      title: "Expert Optometrists",
      subtitle: "15+ Years Experience",
      description:
        "Our qualified optometrists provide comprehensive eye examinations using state-of-the-art diagnostic equipment.",
      image: HERO_CAROUSEL_IMAGES.expertOptometrists,
      cta: "Meet Our Team",
    },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 6000);

    return () => clearInterval(interval);
  }, [heroSlides.length]);

  const handleBookAppointment = () => {
    if (status === "loading") return;
    if (!session) {
      window.location.href =
        "/auth/login?callbackUrl=/book&message=Please sign in to book your appointment";
    } else {
      window.location.href = "/book";
    }
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
  };

  const prevSlide = () => {
    setCurrentSlide(
      (prev) => (prev - 1 + heroSlides.length) % heroSlides.length
    );
  };

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  const slide = heroSlides[currentSlide];

  return (
    <section className="relative py-20 min-h-[80vh] flex items-center">
      <div className="container-premium">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content Side */}
          <div className="space-y-8 z-10">
            <div className="space-y-6">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
                {slide.title}
                <span className="text-[#00A6E6] block">{slide.subtitle}</span>
              </h1>

              <p className="text-xl text-[#B9C4CC] max-w-2xl leading-relaxed">
                {slide.description}
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  onClick={handleBookAppointment}
                  disabled={status === "loading"}
                  className="btn-primary text-lg px-8 py-4 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {status === "loading" ? "Loading..." : "Book Appointment"}
                </button>
                <Link
                  href={
                    slide.id === 1
                      ? "/services"
                      : slide.id === 2
                      ? "/frames"
                      : "/about"
                  }
                  className="btn-secondary text-lg px-8 py-4 text-center"
                >
                  {slide.cta}
                </Link>
              </div>
            </div>

            {/* Stats from COMPANY_STATS */}
            <div className="flex items-center space-x-8 pt-8">
              <div className="text-center">
                <div className="text-2xl font-bold text-[#00A6E6]">
                  {COMPANY_STATS.yearsExperience}
                </div>
                <div className="text-sm text-[#B9C4CC]">Years Experience</div>
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

          {/* Image Side - UPDATED WITH REAL IMAGES */}
          <div className="relative">
            <div className="glow-effect rounded-2xl overflow-hidden aspect-square border border-white/10">
              <Image
                src={slide.image}
                alt={slide.title}
                width={600}
                height={600}
                className="w-full h-full object-cover"
                priority={currentSlide === 0}
              />
            </div>

            {/* Carousel Controls */}
            <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-3">
              {heroSlides.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={`w-3 h-3 rounded-full transition-all ${
                    index === currentSlide
                      ? "bg-white scale-125"
                      : "bg-white/50 hover:bg-white/70"
                  }`}
                />
              ))}
            </div>

            {/* Navigation Arrows */}
            <button
              onClick={prevSlide}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/10 hover:bg-white/20 text-white p-3 rounded-full transition-all"
            >
              â†
            </button>
            <button
              onClick={nextSlide}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/10 hover:bg-white/20 text-white p-3 rounded-full transition-all"
            >
              â†’
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

```

===============================
  components\homepage\HeroSection.tsx
===============================
`$lang
"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useSession } from "next-auth/react";

const heroSlides = [
  {
    id: 1,
    title: "Premium Eye Care",
    subtitle: "For Everyone",
    description:
      "Experience world-class eye care with same-day spectacles from our in-house laboratory. Quality vision solutions across Zimbabwe.",
    image: "ðŸ‘ï¸", // Will be hero image 1
    cta: "Book Eye Exam",
    stats: ["15+ Years Experience", "5 Branches", "Same Day Service"],
  },
  {
    id: 2,
    title: "Same-Day Spectacles",
    subtitle: "Ready in Hours",
    description:
      "Get your glasses made same-day in our advanced in-house laboratory. No more waiting weeks for your vision correction.",
    image: "ðŸ‘“", // Will be hero image 2
    cta: "Browse Frames",
    stats: ["In-House Lab", "500+ Styles", "Quality Guarantee"],
  },
  {
    id: 3,
    title: "Expert Optometrists",
    subtitle: "15+ Years Experience",
    description:
      "Our qualified optometrists provide comprehensive eye examinations using state-of-the-art diagnostic equipment.",
    image: "ðŸ”¬", // Will be hero image 3
    cta: "Meet Our Team",
    stats: ["Advanced Equipment", "50,000+ Patients", "Expert Care"],
  },
];

export default function HeroCarousel() {
  const { data: session, status } = useSession();
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 6000); // Change every 6 seconds

    return () => clearInterval(interval);
  }, []);

  const handleBookAppointment = () => {
    if (status === "loading") return;
    if (!session) {
      window.location.href =
        "/auth/login?callbackUrl=/book&message=Please sign in to book your appointment";
    } else {
      window.location.href = "/book";
    }
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
  };

  const prevSlide = () => {
    setCurrentSlide(
      (prev) => (prev - 1 + heroSlides.length) % heroSlides.length
    );
  };

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  const slide = heroSlides[currentSlide];

  return (
    <section className="relative py-20 min-h-[80vh] flex items-center">
      <div className="container-premium">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content Side */}
          <div className="space-y-8 z-10">
            {/* Slide Content */}
            <div className="space-y-6">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
                {slide.title}
                <span className="text-[#00A6E6] block">{slide.subtitle}</span>
              </h1>

              <p className="text-xl text-[#B9C4CC] max-w-2xl leading-relaxed">
                {slide.description}
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  onClick={handleBookAppointment}
                  disabled={status === "loading"}
                  className="btn-primary text-lg px-8 py-4 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {status === "loading" ? "Loading..." : slide.cta}
                </button>
                <Link
                  href="/services"
                  className="btn-secondary text-lg px-8 py-4 text-center"
                >
                  Our Services
                </Link>
              </div>
            </div>

            {/* Stats */}
            <div className="flex items-center space-x-8 pt-8">
              {slide.stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-2xl font-bold text-[#00A6E6]">
                    {stat.split(" ")[0]}
                  </div>
                  <div className="text-sm text-[#B9C4CC] max-w-[100px]">
                    {stat.split(" ").slice(1).join(" ")}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Image Side - Carousel */}
          <div className="relative">
            <div className="glow-effect bg-gradient-to-br from-[#0077B6] to-[#48CAE4] rounded-2xl p-8 aspect-square flex items-center justify-center">
              <div className="text-center text-white">
                <div className="text-6xl mb-4">{slide.image}</div>
                <div className="text-xl font-semibold">
                  Hero Image {currentSlide + 1}
                </div>
                <div className="text-sm opacity-80 mt-2">Carousel Slide</div>
              </div>
            </div>

            {/* Carousel Controls */}
            <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-3">
              {heroSlides.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={`w-3 h-3 rounded-full transition-all ${
                    index === currentSlide
                      ? "bg-white scale-125"
                      : "bg-white/50 hover:bg-white/70"
                  }`}
                />
              ))}
            </div>

            {/* Navigation Arrows */}
            <button
              onClick={prevSlide}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/10 hover:bg-white/20 text-white p-3 rounded-full transition-all"
            >
              â†
            </button>
            <button
              onClick={nextSlide}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/10 hover:bg-white/20 text-white p-3 rounded-full transition-all"
            >
              â†’
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

```

===============================
  components\homepage\ServiceShowcase.tsx
===============================
`$lang
import Link from "next/link";
import { SERVICES } from "@/constants/services";

export default function ServiceShowcase() {
  // Use first 3 services for showcase
  const showcaseServices = SERVICES.slice(0, 3);

  return (
    <section className="py-20 bg-linear-to-b from-[#001F3F] to-[#0E2433]">
      <div className="container-premium">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Our Premium Services
          </h2>
          <p className="text-xl text-[#B9C4CC] max-w-2xl mx-auto">
            Comprehensive eye care solutions with same-day service and expert
            care
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {showcaseServices.map((service) => (
            <div key={service.id} className="card-premium text-center group">
              <div className="text-5xl mb-6">{service.icon}</div>

              <h3 className="text-2xl font-bold text-[#F2F5F9] mb-4">
                {service.title}
              </h3>

              <p className="text-[#B9C4CC] mb-6 leading-relaxed">
                {service.description}
              </p>

              <div className="space-y-2 mb-6">
                {service.features.slice(0, 3).map((feature, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-center text-sm text-[#B9C4CC]"
                  >
                    <span className="w-2 h-2 bg-[#00A6E6] rounded-full mr-3"></span>
                    {feature}
                  </div>
                ))}
              </div>

              <Link href="/services" className="btn-primary w-full">
                {service.cta}
              </Link>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link href="/services" className="btn-secondary text-lg px-8 py-4">
            View All Services
          </Link>
        </div>
      </div>
    </section>
  );
}

```

===============================
  components\homepage\TestimonialSection.tsx
===============================
`$lang
"use client";

import { useState, useEffect } from "react";
import { TESTIMONIALS } from "@/constants/testimonials";
import { COMPANY_STATS } from "@/constants/company";

export default function TestimonialSection() {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % TESTIMONIALS.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const testimonial = TESTIMONIALS[currentTestimonial];

  return (
    <section className="py-20 bg-linear-to-r from-[#001F3F] to-[#0077B6]">
      <div className="container-premium">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Loved by Our Patients
          </h2>
          <p className="text-xl text-[#B9C4CC] max-w-2xl mx-auto">
            Real stories from real people across Zimbabwe
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="bg-white/10 rounded-2xl p-8 border border-white/20">
            {/* Rating Stars */}
            <div className="flex justify-center mb-6">
              {[...Array(testimonial.rating)].map((_, i) => (
                <span key={i} className="text-yellow-400 text-2xl">
                  â­
                </span>
              ))}
            </div>

            {/* Testimonial Text */}
            <blockquote className="text-xl text-[#F2F5F9] text-center italic mb-8 leading-relaxed">
              "{testimonial.text}"
            </blockquote>

            {/* Author */}
            <div className="text-center">
              <div className="font-bold text-[#F2F5F9] text-lg">
                {testimonial.name}
              </div>
              <div className="text-[#B9C4CC]">{testimonial.location}</div>
            </div>

            {/* Navigation Dots */}
            <div className="flex justify-center mt-6 space-x-2">
              {TESTIMONIALS.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentTestimonial(index)}
                  className={`w-3 h-3 rounded-full transition-all ${
                    index === currentTestimonial
                      ? "bg-[#00A6E6]"
                      : "bg-white/30"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Quick Stats from COMPANY_STATS */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16 max-w-2xl mx-auto">
          <div className="text-center">
            <div className="text-3xl font-bold text-[#00A6E6]">
              {COMPANY_STATS.patientsServed}
            </div>
            <div className="text-sm text-[#B9C4CC]">Patients Served</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-[#00A6E6]">99%</div>
            <div className="text-sm text-[#B9C4CC]">Satisfaction Rate</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-[#00A6E6]">
              {COMPANY_STATS.yearsExperience}
            </div>
            <div className="text-sm text-[#B9C4CC]">Years Experience</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-[#00A6E6]">
              {COMPANY_STATS.branches}
            </div>
            <div className="text-sm text-[#B9C4CC]">Branches Nationwide</div>
          </div>
        </div>
      </div>
    </section>
  );
}

```

===============================
  components\homepage\WhyChooseUs.tsx
===============================
`$lang
import { COMPANY_VALUES, CERTIFICATIONS } from "@/constants/company";
import { BRANCH_FEATURES } from "@/constants/services";

export default function WhyChooseUs() {
  return (
    <section className="py-20 bg-linear-to-b from-[#001F3F] to-[#002851]">
      <div className="container-premium">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Why Choose Link Optical?
          </h2>
          <p className="text-xl text-[#B9C4CC] max-w-2xl mx-auto">
            Experience the difference that 15 years of excellence makes in eye
            care
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {COMPANY_VALUES.map((value, index) => (
            <div
              key={index}
              className="text-center p-6 bg-white/5 rounded-xl border border-white/10 group hover:bg-white/10 transition-all"
            >
              <div className="text-3xl mb-4">{value.icon}</div>
              <h3 className="text-lg font-bold text-[#F2F5F9] mb-2">
                {value.title}
              </h3>
              <p className="text-[#B9C4CC] text-sm">{value.description}</p>
            </div>
          ))}

          {BRANCH_FEATURES.map((feature, index) => (
            <div
              key={index + COMPANY_VALUES.length}
              className="text-center p-6 bg-white/5 rounded-xl border border-white/10 group hover:bg-white/10 transition-all"
            >
              <div className="text-3xl mb-4">{feature.icon}</div>
              <h3 className="text-lg font-bold text-[#F2F5F9] mb-2">
                {feature.title}
              </h3>
              <p className="text-[#B9C4CC] text-sm">{feature.description}</p>
            </div>
          ))}
        </div>

        {/* Trust Badges from CERTIFICATIONS */}
        <div className="mt-16 text-center">
          <div className="bg-white/5 rounded-2xl p-8 border border-white/10">
            <h3 className="text-xl font-bold text-[#F2F5F9] mb-6">
              Trusted & Certified
            </h3>
            <div className="flex flex-wrap justify-center gap-6 opacity-80">
              {CERTIFICATIONS.map((certification, index) => (
                <div key={index} className="text-center">
                  <div className="text-2xl mb-2">â­</div>
                  <div className="text-sm text-[#B9C4CC] max-w-[120px]">
                    {certification}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

```

===============================
  components\Navigation.tsx
===============================
`$lang
"use client";

import Link from "next/link";
import { useSession, signOut } from "next-auth/react";

export default function Navigation() {
  const { data: session, status } = useSession();
  const isLoading = status === "loading";

  return (
    <header className="sticky top-0 z-50 bg-[#001F3F]/90 backdrop-blur-md border-b border-[#2C3E50]">
      <div className="container-premium">
        <div className="flex items-center justify-between py-4">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <Link
              href="/"
              className="w-10 h-10 bg-[#00A6E6] rounded-full flex items-center justify-center"
            >
              <span className="text-white font-bold text-lg">L</span>
            </Link>
            <Link href="/" className="text-xl font-bold text-[#F2F5F9]">
              Link Optical
            </Link>
          </div>

          {/* Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link
              href="/"
              className="text-[#F2F5F9] hover:text-[#00A6E6] transition-colors"
            >
              Home
            </Link>
            <Link
              href="/services"
              className="text-[#B9C4CC] hover:text-[#00A6E6] transition-colors"
            >
              Services
            </Link>
            <Link
              href="/branches"
              className="text-[#B9C4CC] hover:text-[#00A6E6] transition-colors"
            >
              Branches
            </Link>
            <Link
              href="/about"
              className="text-[#B9C4CC] hover:text-[#00A6E6] transition-colors"
            >
              About
            </Link>
            <Link
              href="/contact"
              className="text-[#B9C4CC] hover:text-[#00A6E6] transition-colors"
            >
              Contact
            </Link>
          </nav>

          {/* CTA Buttons - Dynamic based on auth state */}
          <div className="flex items-center space-x-4">
            {isLoading ? (
              // Loading state
              <div className="w-20 h-10 bg-white/5 rounded-lg animate-pulse"></div>
            ) : session ? (
              // Authenticated state
              <>
                <Link href="/book" className="btn-primary">
                  Book Appointment
                </Link>
                <div className="relative group">
                  <button className="btn-secondary flex items-center gap-2">
                    ðŸ‘¤ {session.user.firstName}
                  </button>
                  <div className="absolute right-0 top-full mt-2 w-48 bg-white/5 backdrop-blur-lg border border-white/10 rounded-lg shadow-2xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all">
                    <Link
                      href="/profile"
                      className="block px-4 py-3 text-[#F2F5F9] hover:bg-white/10 transition-colors"
                    >
                      My Profile
                    </Link>
                    <button
                      onClick={() => signOut()}
                      className="block w-full text-left px-4 py-3 text-[#F2F5F9] hover:bg-white/10 transition-colors border-t border-white/10"
                    >
                      Sign Out
                    </button>
                  </div>
                </div>
              </>
            ) : (
              // Unauthenticated state
              <>
                <Link href="/auth/login" className="btn-secondary">
                  Sign In
                </Link>
                <Link href="/auth/signup" className="btn-primary">
                  Book Appointment
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}

```

===============================
  components\ProfileActions.tsx
===============================
`$lang
"use client";

import {
  redirectToBooking,
  redirectToAppointments,
} from "@/app/profile/actions";

export default function ProfileActions() {
  return (
    <div className="space-y-3">
      <form action={redirectToBooking}>
        <button type="submit" className="w-full btn-primary">
          Book New Appointment
        </button>
      </form>

      <form action={redirectToAppointments}>
        <button type="submit" className="w-full btn-secondary">
          View Appointment History
        </button>
      </form>
    </div>
  );
}

```

===============================
  components\services\ServicesCarousel.tsx
===============================
`$lang
"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { SERVICES } from "@/constants/services";

export default function ServicesCarousel() {
  const [currentService, setCurrentService] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentService((prev) => (prev + 1) % SERVICES.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const nextService = () => {
    setCurrentService((prev) => (prev + 1) % SERVICES.length);
  };

  const prevService = () => {
    setCurrentService((prev) => (prev - 1 + SERVICES.length) % SERVICES.length);
  };

  const service = SERVICES[currentService];

  return (
    <section className="py-20 bg-linear-to-b from-[#001F3F] to-[#002851]">
      <div className="container-premium">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Our Premium Services
          </h2>
          <p className="text-xl text-[#B9C4CC] max-w-2xl mx-auto">
            Comprehensive eye care solutions with same-day service and expert
            care
          </p>
        </div>

        <div className="max-w-6xl mx-auto">
          {/* Service Carousel */}
          <div className="bg-white/5 rounded-2xl p-8 border border-white/10">
            <div className="grid lg:grid-cols-2 gap-8 items-center">
              {/* Service Content */}
              <div className="space-y-6">
                <div>
                  <h3 className="text-3xl md:text-4xl font-bold text-[#F2F5F9] mb-2">
                    {service.title}
                  </h3>
                  <span className="bg-[#00A6E6] text-white text-sm px-3 py-1 rounded-full">
                    {service.duration}
                  </span>
                </div>

                <p className="text-lg text-[#B9C4CC] leading-relaxed">
                  {service.description}
                </p>

                <div className="space-y-3">
                  {service.features.map((feature, index) => (
                    <div
                      key={index}
                      className="flex items-center text-[#B9C4CC]"
                    >
                      <span className="w-2 h-2 bg-[#00A6E6] rounded-full mr-3"></span>
                      {feature}
                    </div>
                  ))}
                </div>

                <div className="flex gap-4 pt-4">
                  <Link href="/book" className="btn-primary flex-1 text-center">
                    {service.cta}
                  </Link>
                  <Link
                    href="/services"
                    className="btn-secondary px-6 text-center"
                  >
                    Learn More
                  </Link>
                </div>
              </div>

              {/* Service Image */}
              <div className="relative">
                <div className="rounded-2xl overflow-hidden aspect-square border border-white/10">
                  <Image
                    src={service.image}
                    alt={service.title}
                    width={500}
                    height={500}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Service Navigation */}
                <div className="flex justify-between items-center mt-6">
                  <button
                    onClick={prevService}
                    className="bg-white/10 hover:bg-white/20 text-white p-2 rounded-full transition-all"
                  >
                    â†
                  </button>

                  <div className="flex space-x-2">
                    {SERVICES.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => setCurrentService(index)}
                        className={`w-2 h-2 rounded-full transition-all ${
                          index === currentService
                            ? "bg-[#00A6E6] scale-125"
                            : "bg-white/30 hover:bg-white/50"
                        }`}
                      />
                    ))}
                  </div>

                  <button
                    onClick={nextService}
                    className="bg-white/10 hover:bg-white/20 text-white p-2 rounded-full transition-all"
                  >
                    â†’
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Service Access */}
          <div className="flex flex-wrap justify-center gap-4 mt-8">
            {SERVICES.slice(0, 3).map((service) => (
              <Link
                key={service.id}
                href="/services"
                className="bg-white/5 hover:bg-white/10 text-[#F2F5F9] px-4 py-2 rounded-lg transition-all border border-white/10"
              >
                {service.title.split(" ")[0]}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

```

===============================
  components\services\ServicesHero.tsx
===============================
`$lang
"use client";

import { useSession } from "next-auth/react";
import Image from "next/image";

export default function ServicesHero() {
  const { data: session, status } = useSession();

  const handleBookAppointment = () => {
    if (status === "loading") return;
    if (!session) {
      window.location.href =
        "/auth/login?callbackUrl=/book&message=Please sign in to book your appointment";
    } else {
      window.location.href = "/book";
    }
  };

  return (
    <section className="relative py-32 min-h-[80vh] flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/services/hero-banner.png"
          alt="Professional optometry services"
          fill
          className="object-cover"
          priority
        />
        {/* Dark overlay for better text readability */}
        <div className="absolute inset-0 bg-black/50"></div>
      </div>

      <div className="container-premium relative z-10">
        <div className="text-center max-w-5xl mx-auto">
          {/* Main Headline */}
          <div className="mb-12">
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-black mb-8 leading-tight">
              <span className="text-[#F2F5F9]">Your Vision</span>
              <br />
              <span className="text-transparent bg-clip-text bg-linear-to-r from-[#00A6E6] to-[#48CAE4]">
                Our Passion
              </span>
            </h1>
          </div>

          {/* Sub-headline */}
          <div className="mb-16">
            <p className="text-3xl md:text-4xl text-[#F2F5F9] font-semibold mb-8">
              Expert Eye Care You Can Trust
            </p>
            <p className="text-xl md:text-2xl text-[#B9C4CC] leading-relaxed max-w-4xl mx-auto">
              Led by experienced optometrists with 15+ years serving Zimbabwe,
              we combine cutting-edge technology with personalized care for
              vision that transforms lives.
            </p>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16">
            <button
              onClick={handleBookAppointment}
              disabled={status === "loading"}
              className="btn-primary text-lg px-12 py-4 font-bold disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {status === "loading" ? "Loading..." : "Book Your Appointment"}
            </button>
            <button className="btn-secondary text-lg px-8 py-4 border-2 border-white/30 hover:border-white/50">
              Meet Our Team
            </button>
          </div>

          {/* Scroll Indicator */}
          <div className="animate-bounce">
            <div className="text-[#00A6E6] text-lg">â†“</div>
            <div className="text-[#B9C4CC] text-sm mt-2">
              Explore Our Services
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

```

