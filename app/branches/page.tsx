import Link from "next/link";
import Navigation from "@/components/Navigation";
import Image from "next/image";
// ✅ Specific constant imports
import { BRANCHES } from "@/constants/branches";
import { BRANCH_FEATURES } from "@/constants/services";
// ✅ Specific type imports
import { Branch, BranchFeature } from "@/types";

export default function Branches() {
  // Function to generate Google Maps URL
  const getGoogleMapsUrl = (branch: Branch) => {
    return `https://www.google.com/maps?q=${branch.coordinates.lat},${branch.coordinates.lng}&ll=${branch.coordinates.lat},${branch.coordinates.lng}&z=15`;
  };

  // Function to generate Google Maps directions URL
  const getGoogleMapsDirectionsUrl = (branch: Branch) => {
    return `https://www.google.com/maps/dir/?api=1&destination=${branch.coordinates.lat},${branch.coordinates.lng}&travelmode=driving`;
  };

  return (
    <div className="min-h-screen">
      <Navigation />

      {/* Hero Section */}
      <section className="py-20 bg-linear-to-br from-[#001F3F] via-[#002851] to-[#0077B6]">
        <div className="container-premium">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-5xl md:text-7xl font-black mb-6 leading-tight">
              <span className="text-[#F2F5F9]">Find Your Nearest</span>
              <br />
              <span className="text-transparent bg-clip-text bg-linear-to-r from-[#00A6E6] to-[#48CAE4]">
                Link Optical
              </span>
            </h1>

            <p className="text-xl md:text-2xl text-[#B9C4CC] mb-8 leading-relaxed">
              Same premium eye care, five convenient locations across Zimbabwe.
              Experience expert service and same-day spectacles wherever you
              are.
            </p>

            {/* Quick Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
              <div className="text-center">
                <div className="text-2xl font-bold text-[#00A6E6]">5</div>
                <div className="text-sm text-[#B9C4CC]">Branches</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-[#00A6E6]">15+</div>
                <div className="text-sm text-[#B9C4CC]">Years Serving</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-[#00A6E6]">Same</div>
                <div className="text-sm text-[#B9C4CC]">Day Service</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-[#00A6E6]">All</div>
                <div className="text-sm text-[#B9C4CC]">Medical Aids</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Branch Features */}
      <section className="py-16 bg-linear-to-b from-[#001F3F] to-[#0E2433]">
        <div className="container-premium">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Premium Care, Every Location
            </h2>
            <p className="text-xl text-[#B9C4CC] max-w-2xl mx-auto">
              The same high-quality service, expert staff, and advanced
              technology at all our branches
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {BRANCH_FEATURES.map((feature: BranchFeature, index) => (
              <div
                key={index}
                className="text-center p-6 bg-white/5 rounded-xl border border-white/10"
              >
                <div className="text-3xl mb-4">{feature.icon}</div>
                <h3 className="text-lg font-bold text-[#F2F5F9] mb-2">
                  {feature.title}
                </h3>
                <p className="text-[#B9C4CC] text-sm">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Branches Grid */}
      <section className="py-20 bg-linear-to-b from-[#001F3F] to-[#002851]">
        <div className="container-premium">
          <div className="grid lg:grid-cols-2 xl:grid-cols-3 gap-8">
            {BRANCHES.map((branch: Branch) => (
              <div key={branch.id} className="card-premium group">
                {/* Branch Header */}
                <div className="mb-6">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-2xl font-bold text-[#F2F5F9] mb-1">
                        {branch.name}
                      </h3>
                      <p className="text-[#00A6E6] font-semibold">
                        {branch.type}
                      </p>
                    </div>
                    <span className="bg-[#00A6E6] text-white text-xs px-2 py-1 rounded-full">
                      {branch.id === 1 ? "MAIN LAB" : "BRANCH"}
                    </span>
                  </div>

                  {/* Branch Image */}
                  <div className="w-full h-48 rounded-xl mb-4 overflow-hidden border border-white/10">
                    <Image
                      src={branch.image}
                      alt={`${branch.name} - ${branch.type}`}
                      width={400}
                      height={192}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>

                {/* Contact Information */}
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <span className="text-[#00A6E6] mt-1">📍</span>
                    <div>
                      <p className="text-[#F2F5F9] font-medium">Address</p>
                      <p className="text-[#B9C4CC] text-sm">{branch.address}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <span className="text-[#00A6E6] mt-1">📞</span>
                    <div>
                      <p className="text-[#F2F5F9] font-medium">Phone</p>
                      <p className="text-[#B9C4CC] text-sm">{branch.phone}</p>
                    </div>
                  </div>

                  {/* Operating Hours */}
                  <div className="border-t border-white/10 pt-4">
                    <p className="text-[#F2F5F9] font-medium mb-2">
                      🕐 Operating Hours
                    </p>
                    <div className="space-y-1 text-sm">
                      <div className="flex justify-between">
                        <span className="text-[#B9C4CC]">Mon - Fri:</span>
                        <span className="text-[#F2F5F9]">
                          {branch.hours.weekdays}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-[#B9C4CC]">Saturday:</span>
                        <span className="text-[#F2F5F9]">
                          {branch.hours.saturday}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-[#B9C4CC]">Sunday:</span>
                        <span className="text-[#F2F5F9]">
                          {branch.hours.sunday}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Services */}
                  <div className="border-t border-white/10 pt-4">
                    <p className="text-[#F2F5F9] font-medium mb-2">
                      👨‍⚕️ Services Available
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {branch.services.map((service, index) => (
                        <span
                          key={index}
                          className="bg-white/5 text-[#B9C4CC] text-xs px-2 py-1 rounded border border-white/10"
                        >
                          {service}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Features */}
                  <div className="border-t border-white/10 pt-4">
                    <p className="text-[#F2F5F9] font-medium mb-2">
                      ✨ Branch Features
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {branch.features.map((feature, index) => (
                        <span
                          key={index}
                          className="bg-[#00A6E6]/10 text-[#00A6E6] text-xs px-2 py-1 rounded"
                        >
                          {feature}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* CTA Buttons - UPDATED WITH MAP LINKS */}
                  <div className="flex gap-3 pt-4">
                    <button className="flex-1 btn-primary text-sm py-2">
                      Book at {branch.name}
                    </button>
                    <a
                      href={getGoogleMapsDirectionsUrl(branch)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-secondary text-sm py-2 px-4 text-center"
                    >
                      🗺️ Directions
                    </a>
                  </div>

                  {/* Quick Map Link */}
                  <div className="border-t border-white/10 pt-3">
                    <a
                      href={getGoogleMapsUrl(branch)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-2 text-[#00A6E6] hover:text-[#48CAE4] text-sm font-medium transition-colors"
                    >
                      <span>📍 View on Google Maps</span>
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-linear-to-r from-[#001F3F] to-[#0077B6]">
        <div className="container-premium">
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Visit Us Today
            </h2>
            <p className="text-xl text-[#B9C4CC] mb-8">
              Experience the Link Optical difference at a branch near you. Same
              premium care, same expert service, wherever you are in Zimbabwe.
            </p>

            <div className="bg-white/10 rounded-xl p-6 mb-8 border border-white/20">
              <div className="grid md:grid-cols-3 gap-4 text-sm">
                <div className="flex items-center justify-center gap-2">
                  <span className="text-[#00A6E6]">⚡</span>
                  <span className="text-[#F2F5F9]">Same-Day Service</span>
                </div>
                <div className="flex items-center justify-center gap-2">
                  <span className="text-[#00A6E6]">👨‍⚕️</span>
                  <span className="text-[#F2F5F9]">Expert Optometrists</span>
                </div>
                <div className="flex items-center justify-center gap-2">
                  <span className="text-[#00A6E6]">💳</span>
                  <span className="text-[#F2F5F9]">Medical Aid Accepted</span>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="btn-primary text-lg px-8 py-4">
                📅 Book Appointment
              </button>
              <button className="btn-secondary text-lg px-8 py-4">
                📞 Call Nearest Branch
              </button>
            </div>

            <p className="text-[#B9C4CC] text-sm mt-4">
              Walk-ins welcome • Free consultations • Family-friendly •
              Wheelchair accessible
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
