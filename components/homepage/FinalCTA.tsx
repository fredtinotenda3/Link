// components/homepage/FinalCTA.tsx - VERIFIED COMPLIANT
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
            Ready for an Eye Test?
          </h2>
          <p className="text-xl text-[#B9C4CC] mb-8">
            Book an appointment and get your eye test at any of our branches.
          </p>

          {/* Medical Aids Assurance */}
          <div className="bg-white/5 rounded-xl p-6 mb-8 border border-white/10">
            <div className="grid md:grid-cols-3 gap-4 text-sm">
              <div className="flex items-center justify-center gap-2">
                <span className="text-[#00A6E6]">⚡</span>
                <span className="text-[#F2F5F9]">Same-Day Service</span>
              </div>
              <div className="flex items-center justify-center gap-2">
                <span className="text-[#00A6E6]">🏥</span>
                <span className="text-[#F2F5F9]">Medical Aid Accepted</span>
              </div>
              <div className="flex items-center justify-center gap-2">
                <span className="text-[#00A6E6]">👨‍⚕️</span>
                <span className="text-[#F2F5F9]">Eye care services</span>
              </div>
            </div>
            <div className="mt-4 text-center">
              <p className="text-[#B9C4CC] text-sm">
                We accept: {MEDICAL_AIDS.slice(0, 3).join(", ")} +{" "}
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
            <p>📍 5 locations • 📞 Phone support • 💰 Clear pricing</p>
          </div>
        </div>
      </div>
    </section>
  );
}
