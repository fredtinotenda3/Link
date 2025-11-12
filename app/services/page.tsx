"use client";
import Navigation from "@/components/Navigation";
// ✅ Specific constant imports
import { SERVICES, MEDICAL_AIDS, BRANCH_FEATURES } from "@/constants/services";
import { TESTIMONIALS } from "@/constants/testimonials";
// ✅ Specific type imports
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
                <div className="text-3xl mb-4">⚡</div>
                <h3 className="text-xl font-bold text-[#F2F5F9] mb-2">
                  Same-Day Service
                </h3>
                <p className="text-[#B9C4CC]">
                  Spectacles ready while you wait
                </p>
              </div>

              <div className="text-center p-6 bg-white/5 rounded-xl border border-white/10">
                <div className="text-3xl mb-4">👨‍⚕️</div>
                <h3 className="text-xl font-bold text-[#F2F5F9] mb-2">
                  Expert Optometrists
                </h3>
                <p className="text-[#B9C4CC]">15+ years experience each</p>
              </div>

              <div className="text-center p-6 bg-white/5 rounded-xl border border-white/10">
                <div className="text-3xl mb-4">🎯</div>
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
                    ✅ Accepted Medical Aids
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
                    📍 5 Convenient Branches
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
