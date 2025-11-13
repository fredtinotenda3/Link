"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { SERVICES } from "@/constants/services";

export default function ServicesCarousel() {
  const [currentService, setCurrentService] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentService((prev) => (prev + 1) % SERVICES.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const nextService = () => {
    setCurrentService((prev) => (prev + 1) % SERVICES.length);
  };

  const prevService = () => {
    setCurrentService((prev) => (prev - 1 + SERVICES.length) % SERVICES.length);
  };

  const service = SERVICES[currentService];

  return (
    <section className="py-20 bg-linear-to-b from-[#001F3F] to-[#002851]">
      <div className="container-premium">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Our Premium Services
          </h2>
          <p className="text-xl text-[#B9C4CC] max-w-2xl mx-auto">
            Comprehensive eye care solutions with same-day service and expert
            care
          </p>
        </div>

        <div className="max-w-6xl mx-auto">
          {/* Service Carousel */}
          <div className="bg-white/5 rounded-2xl p-8 border border-white/10">
            <div className="grid lg:grid-cols-2 gap-8 items-center">
              {/* Service Content */}
              <div className="space-y-6">
                <div>
                  <h3 className="text-3xl md:text-4xl font-bold text-[#F2F5F9] mb-2">
                    {service.title}
                  </h3>
                  <span className="bg-[#00A6E6] text-white text-sm px-3 py-1 rounded-full">
                    {service.duration}
                  </span>
                </div>

                <p className="text-lg text-[#B9C4CC] leading-relaxed">
                  {service.description}
                </p>

                <div className="space-y-3">
                  {service.features.map((feature, index) => (
                    <div
                      key={index}
                      className="flex items-center text-[#B9C4CC]"
                    >
                      <span className="w-2 h-2 bg-[#00A6E6] rounded-full mr-3"></span>
                      {feature}
                    </div>
                  ))}
                </div>

                <div className="flex gap-4 pt-4">
                  <Link href="/book" className="btn-primary flex-1 text-center">
                    {service.cta}
                  </Link>
                  <Link
                    href="/services"
                    className="btn-secondary px-6 text-center"
                  >
                    Learn More
                  </Link>
                </div>
              </div>

              {/* Service Image */}
              <div className="relative">
                <div className="rounded-2xl overflow-hidden aspect-square border border-white/10">
                  <Image
                    src={service.image}
                    alt={service.title}
                    width={500}
                    height={500}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Service Navigation */}
                <div className="flex justify-between items-center mt-6">
                  <button
                    onClick={prevService}
                    className="bg-white/10 hover:bg-white/20 text-white p-2 rounded-full transition-all"
                  >
                    ←
                  </button>

                  <div className="flex space-x-2">
                    {SERVICES.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => setCurrentService(index)}
                        className={`w-2 h-2 rounded-full transition-all ${
                          index === currentService
                            ? "bg-[#00A6E6] scale-125"
                            : "bg-white/30 hover:bg-white/50"
                        }`}
                      />
                    ))}
                  </div>

                  <button
                    onClick={nextService}
                    className="bg-white/10 hover:bg-white/20 text-white p-2 rounded-full transition-all"
                  >
                    →
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Service Access */}
          <div className="flex flex-wrap justify-center gap-4 mt-8">
            {SERVICES.slice(0, 3).map((service) => (
              <Link
                key={service.id}
                href="/services"
                className="bg-white/5 hover:bg-white/10 text-[#F2F5F9] px-4 py-2 rounded-lg transition-all border border-white/10"
              >
                {service.title.split(" ")[0]}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
