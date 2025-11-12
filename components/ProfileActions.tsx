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
