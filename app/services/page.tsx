"use client";
import Navigation from "@/components/Navigation";
import ServicesHero from "@/components/services/ServicesHero";
import ServicesCarousel from "@/components/services/ServicesCarousel";
import { MEDICAL_AIDS, BRANCH_FEATURES } from "@/constants/services";
import { TESTIMONIALS } from "@/constants/testimonials";
import { BranchFeature, Testimonial } from "@/types";

export default function Services() {
  return (
    <div className="min-h-screen">
      <Navigation />

      {/* NEW FULL-WIDTH HERO BANNER */}
      <ServicesHero />

      {/* Medical Aid & Trust Section */}
      <section className="py-16 bg-linear-to-b from-[#001F3F] to-[#002851]">
        <div className="container-premium">
          <div className="bg-white/10 rounded-2xl p-8 border border-white/20">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <h4 className="text-2xl font-bold text-[#F2F5F9] mb-4">
                  ✅ Accepted Medical Aids
                </h4>
                <div className="flex flex-wrap gap-3">
                  {MEDICAL_AIDS.slice(0, 3).map((aid, index) => (
                    <span
                      key={index}
                      className="bg-[#00A6E6] px-4 py-2 rounded-full text-sm text-white font-medium"
                    >
                      {aid}
                    </span>
                  ))}
                  <span className="bg-white/20 px-4 py-2 rounded-full text-sm text-[#F2F5F9]">
                    +{MEDICAL_AIDS.length - 3} more
                  </span>
                </div>
              </div>
              <div className="text-center md:text-right">
                <h4 className="text-2xl font-bold text-[#00A6E6] mb-3">
                  📍 5 Convenient Branches
                </h4>
                <p className="text-[#B9C4CC] text-lg">
                  Same great service across Zimbabwe
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SERVICES CAROUSEL */}
      <ServicesCarousel />

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
                          ⭐
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
                  <span className="text-[#00A6E6]">✅</span>
                  <span className="text-[#F2F5F9]">Free Consultation</span>
                </div>
                <div className="flex items-center justify-center gap-2">
                  <span className="text-[#00A6E6]">✅</span>
                  <span className="text-[#F2F5F9]">Medical Aid Accepted</span>
                </div>
                <div className="flex items-center justify-center gap-2">
                  <span className="text-[#00A6E6]">✅</span>
                  <span className="text-[#F2F5F9]">Quality Guarantee</span>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="btn-primary text-lg px-8 py-4">
                📅 Book Your Appointment
              </button>
              <button className="btn-secondary text-lg px-8 py-4">
                📞 Call Nearest Branch
              </button>
            </div>
            <p className="text-[#B9C4CC] text-sm mt-4">
              ⚡ Same-day service available • 💳 All medical aids accepted • 📍
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
