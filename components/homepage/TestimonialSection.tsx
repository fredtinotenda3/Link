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
                  ⭐
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
