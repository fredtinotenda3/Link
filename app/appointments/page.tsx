import { getCurrentUser } from "@/lib/auth";
import { redirect } from "next/navigation";

import AppointmentsHistory from "@/components/AppointmentsHistory";

export default async function AppointmentsPage() {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/auth/login");
  }

  return (
    <div className="min-h-screen">
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
                📅 Book New Appointment
              </a>
              <a href="/profile" className="btn-secondary">
                👤 Back to Profile
              </a>
              <a href="/services" className="btn-secondary">
                🔍 Browse Services
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
