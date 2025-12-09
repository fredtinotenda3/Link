// app\about\page.tsx - OPTIMIZED VERSION
import Link from "next/link";
import Image from "next/image";

import { TEAM_MEMBERS } from "@/constants/team";
import {
  COMPANY_TIMELINE,
  COMPANY_VALUES,
  MISSION_STATEMENT,
  COMPANY_STATS,
} from "@/constants/company";
import { CERTIFICATIONS } from "@/constants/company";
import { TeamMember, TimelineItem, CompanyValue } from "@/types";

export default function About() {
  return (
    <div className="min-h-screen">
      {/* Hero Section - OPTIMIZED */}
      <section className="py-20 bg-linear-to-br from-[#001F3F] via-[#002851] to-[#0077B6]">
        <div className="container-premium">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-5xl md:text-7xl font-black mb-6 leading-tight">
              <span className="text-[#F2F5F9]">Our Story of</span>
              <br />
              <span className="text-transparent bg-clip-text bg-linear-to-r from-[#00A6E6] to-[#48CAE4]">
                Vision & Care
              </span>
            </h1>

            <p className="text-xl md:text-2xl text-[#B9C4CC] mb-8 leading-relaxed">
              For over 15 years, Link Optical has been helping people in
              Zimbabwe with eye tests, prescription glasses, and lens fittings
              at our branches.
            </p>

            {/* Quick Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
              <div className="text-center">
                <div className="text-2xl font-bold text-[#00A6E6]">
                  {COMPANY_STATS.yearsExperience}
                </div>
                <div className="text-sm text-[#B9C4CC]">Years in operation</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-[#00A6E6]">
                  {COMPANY_STATS.patientsServed}
                </div>
                <div className="text-sm text-[#B9C4CC]">
                  People we've served
                </div>
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
                <div className="text-sm text-[#B9C4CC]">
                  Day service for glasses
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Story Timeline - OPTIMIZED */}
      <section className="py-20 bg-linear-to-b from-[#001F3F] to-[#0E2433]">
        <div className="container-premium">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">Our Journey</h2>
            <p className="text-xl text-[#B9C4CC] max-w-2xl mx-auto">
              How we've grown to serve communities across Zimbabwe
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            {COMPANY_TIMELINE.map((item: TimelineItem, index) => (
              <div key={index} className="flex gap-8 mb-12 last:mb-0">
                <div className="shrink-0 w-24">
                  <div className="bg-[#00A6E6] text-white rounded-lg py-2 px-4 text-center">
                    <span className="font-bold text-lg">{item.year}</span>
                  </div>
                </div>
                <div className="flex-1">
                  <div className="bg-white/5 rounded-xl p-6 border border-white/10">
                    <h3 className="text-xl font-bold text-[#F2F5F9] mb-3">
                      {item.title}
                    </h3>
                    <p className="text-[#B9C4CC] leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission & Values - OPTIMIZED */}
      <section className="py-20 bg-linear-to-b from-[#001F3F] to-[#002851]">
        <div className="container-premium">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              What Guides Us
            </h2>
            <p className="text-xl text-[#B9C4CC] max-w-2xl mx-auto">
              Our approach to eye care in Zimbabwe
            </p>
          </div>

          {/* Mission Statement */}
          <div className="bg-white/5 rounded-2xl p-8 border border-white/10 text-center mb-16 max-w-4xl mx-auto">
            <h3 className="text-2xl md:text-3xl font-bold text-[#00A6E6] mb-6">
              {MISSION_STATEMENT.title}
            </h3>
            <p className="text-lg text-[#B9C4CC] leading-relaxed">
              {MISSION_STATEMENT.description}
            </p>
          </div>

          {/* Values Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {COMPANY_VALUES.map((value: CompanyValue, index) => (
              <div
                key={index}
                className="text-center p-6 bg-white/5 rounded-xl border border-white/10"
              >
                <div className="text-3xl mb-4">{value.icon}</div>
                <h3 className="text-lg font-bold text-[#F2F5F9] mb-3">
                  {value.title}
                </h3>
                <p className="text-[#B9C4CC] text-sm">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Meet the Team - OPTIMIZED */}
      <section className="py-20 bg-linear-to-b from-[#001F3F] to-[#0E2433]">
        <div className="container-premium">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Meet Our Team
            </h2>
            <p className="text-xl text-[#B9C4CC] max-w-2xl mx-auto">
              The people who help with your eye care needs
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {TEAM_MEMBERS.map((member: TeamMember) => (
              <div key={member.id} className="text-center">
                <div className="w-32 h-32 rounded-full mx-auto mb-6 overflow-hidden border-2 border-[#00A6E6]">
                  <Image
                    src={member.image}
                    alt={`${member.name} - ${member.role}`}
                    width={128}
                    height={128}
                    className="w-full h-full object-cover"
                  />
                </div>

                <h3 className="text-xl font-bold text-[#F2F5F9] mb-2">
                  {member.name}
                </h3>
                <p className="text-[#00A6E6] font-semibold mb-4">
                  {member.role}
                </p>

                <p className="text-[#B9C4CC] text-sm mb-4 leading-relaxed">
                  {member.bio}
                </p>

                <div className="space-y-2">
                  {member.expertise.map((skill, index) => (
                    <span
                      key={index}
                      className="block bg-white/5 text-[#B9C4CC] text-xs px-3 py-1 rounded border border-white/10"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Memberships - OPTIMIZED */}
      <section className="py-20 bg-linear-to-b from-[#001F3F] to-[#002851]">
        <div className="container-premium">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Our Memberships
            </h2>
            <p className="text-xl text-[#B9C4CC] max-w-2xl mx-auto">
              We're part of these eye care organizations in Zimbabwe
            </p>
          </div>

          <div className="bg-white/5 rounded-2xl p-8 border border-white/10 max-w-4xl mx-auto">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {CERTIFICATIONS.map((cert, index) => (
                <div key={index} className="flex items-center gap-3">
                  <span className="text-[#00A6E6]">✓</span>
                  <span className="text-[#F2F5F9] font-medium">{cert}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section - OPTIMIZED */}
      <section className="py-20 bg-linear-to-r from-[#001F3F] to-[#0077B6]">
        <div className="container-premium">
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Ready for Your Eye Test?
            </h2>
            <p className="text-xl text-[#B9C4CC] mb-8">
              Book an appointment at any of our 5 branches across Zimbabwe
            </p>

            <div className="bg-white/10 rounded-xl p-6 mb-8 border border-white/20">
              <div className="grid md:grid-cols-3 gap-4 text-sm">
                <div className="flex items-center justify-center gap-2">
                  <span className="text-[#00A6E6]">📅</span>
                  <span className="text-[#F2F5F9]">15+ Years in operation</span>
                </div>
                <div className="flex items-center justify-center gap-2">
                  <span className="text-[#00A6E6]">⚡</span>
                  <span className="text-[#F2F5F9]">Same-Day Glasses</span>
                </div>
                <div className="flex items-center justify-center gap-2">
                  <span className="text-[#00A6E6]">🏥</span>
                  <span className="text-[#F2F5F9]">Medical Aid Accepted</span>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="btn-primary text-lg px-8 py-4">
                Book Your Appointment
              </button>
              <button className="btn-secondary text-lg px-8 py-4">
                Visit Our Branches
              </button>
            </div>

            <p className="text-[#B9C4CC] text-sm mt-4">
              Family-owned since 2008 • Serving Zimbabwe • Walk-ins welcome
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
