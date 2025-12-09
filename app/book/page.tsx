import { getCurrentUser } from "@/lib/auth";
import { redirect } from "next/navigation";

import BookingForm from "@/components/BookingForm";

export default async function BookPage() {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/auth/login?callbackUrl=/book");
  }

  return (
    <div className="min-h-screen">
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
