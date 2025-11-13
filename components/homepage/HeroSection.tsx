"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useSession } from "next-auth/react";

const heroSlides = [
  {
    id: 1,
    title: "Premium Eye Care",
    subtitle: "For Everyone",
    description:
      "Experience world-class eye care with same-day spectacles from our in-house laboratory. Quality vision solutions across Zimbabwe.",
    image: "👁️", // Will be hero image 1
    cta: "Book Eye Exam",
    stats: ["15+ Years Experience", "5 Branches", "Same Day Service"],
  },
  {
    id: 2,
    title: "Same-Day Spectacles",
    subtitle: "Ready in Hours",
    description:
      "Get your glasses made same-day in our advanced in-house laboratory. No more waiting weeks for your vision correction.",
    image: "👓", // Will be hero image 2
    cta: "Browse Frames",
    stats: ["In-House Lab", "500+ Styles", "Quality Guarantee"],
  },
  {
    id: 3,
    title: "Expert Optometrists",
    subtitle: "15+ Years Experience",
    description:
      "Our qualified optometrists provide comprehensive eye examinations using state-of-the-art diagnostic equipment.",
    image: "🔬", // Will be hero image 3
    cta: "Meet Our Team",
    stats: ["Advanced Equipment", "50,000+ Patients", "Expert Care"],
  },
];

export default function HeroCarousel() {
  const { data: session, status } = useSession();
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 6000); // Change every 6 seconds

    return () => clearInterval(interval);
  }, []);

  const handleBookAppointment = () => {
    if (status === "loading") return;
    if (!session) {
      window.location.href =
        "/auth/login?callbackUrl=/book&message=Please sign in to book your appointment";
    } else {
      window.location.href = "/book";
    }
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
  };

  const prevSlide = () => {
    setCurrentSlide(
      (prev) => (prev - 1 + heroSlides.length) % heroSlides.length
    );
  };

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  const slide = heroSlides[currentSlide];

  return (
    <section className="relative py-20 min-h-[80vh] flex items-center">
      <div className="container-premium">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content Side */}
          <div className="space-y-8 z-10">
            {/* Slide Content */}
            <div className="space-y-6">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
                {slide.title}
                <span className="text-[#00A6E6] block">{slide.subtitle}</span>
              </h1>

              <p className="text-xl text-[#B9C4CC] max-w-2xl leading-relaxed">
                {slide.description}
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  onClick={handleBookAppointment}
                  disabled={status === "loading"}
                  className="btn-primary text-lg px-8 py-4 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {status === "loading" ? "Loading..." : slide.cta}
                </button>
                <Link
                  href="/services"
                  className="btn-secondary text-lg px-8 py-4 text-center"
                >
                  Our Services
                </Link>
              </div>
            </div>

            {/* Stats */}
            <div className="flex items-center space-x-8 pt-8">
              {slide.stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-2xl font-bold text-[#00A6E6]">
                    {stat.split(" ")[0]}
                  </div>
                  <div className="text-sm text-[#B9C4CC] max-w-[100px]">
                    {stat.split(" ").slice(1).join(" ")}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Image Side - Carousel */}
          <div className="relative">
            <div className="glow-effect bg-gradient-to-br from-[#0077B6] to-[#48CAE4] rounded-2xl p-8 aspect-square flex items-center justify-center">
              <div className="text-center text-white">
                <div className="text-6xl mb-4">{slide.image}</div>
                <div className="text-xl font-semibold">
                  Hero Image {currentSlide + 1}
                </div>
                <div className="text-sm opacity-80 mt-2">Carousel Slide</div>
              </div>
            </div>

            {/* Carousel Controls */}
            <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-3">
              {heroSlides.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={`w-3 h-3 rounded-full transition-all ${
                    index === currentSlide
                      ? "bg-white scale-125"
                      : "bg-white/50 hover:bg-white/70"
                  }`}
                />
              ))}
            </div>

            {/* Navigation Arrows */}
            <button
              onClick={prevSlide}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/10 hover:bg-white/20 text-white p-3 rounded-full transition-all"
            >
              ←
            </button>
            <button
              onClick={nextSlide}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/10 hover:bg-white/20 text-white p-3 rounded-full transition-all"
            >
              →
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
