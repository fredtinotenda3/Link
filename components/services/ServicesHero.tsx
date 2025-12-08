// components/services/ServicesHero.tsx - REFACTORED VERSION
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
    <section className="relative py-20 h-[500px] flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/services/hero-banner.png"
          alt="Optometry services"
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
              <span className="text-[#F2F5F9]">Eye Care</span>
              <br />
              <span className="text-transparent bg-clip-text bg-linear-to-r from-[#00A6E6] to-[#48CAE4]">
                Services
              </span>
            </h1>
          </div>

          {/* Sub-headline */}
          <div className="mb-16">
            <p className="text-3xl md:text-4xl text-[#F2F5F9] font-semibold mb-8">
              Eye Tests and Glasses in Zimbabwe
            </p>
            <p className="text-xl md:text-2xl text-[#B9C4CC] leading-relaxed max-w-4xl mx-auto">
              With experience serving Zimbabwe, we provide eye tests, glasses,
              and contact lenses at our branches.
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
            <div className="text-[#00A6E6] text-lg">↓</div>
            <div className="text-[#B9C4CC] text-sm mt-2">Explore Services</div>
          </div>
        </div>
      </div>
    </section>
  );
}
