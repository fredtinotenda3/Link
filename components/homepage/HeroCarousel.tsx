// components/homepage/HeroCarousel.tsx - REFACTORED VERSION
"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { COMPANY_STATS } from "@/constants/company";
import { SERVICES } from "@/constants/services";
import { HERO_CAROUSEL_IMAGES } from "@/constants/homepage";
import Image from "next/image";

export default function HeroCarousel() {
  const { data: session, status } = useSession();
  const [currentSlide, setCurrentSlide] = useState(0);

  // Hero slides with real image paths
  const heroSlides = [
    {
      id: 1,
      title: "Eye Care Services",
      subtitle: "In Zimbabwe",
      description:
        "Eye tests, prescription glasses, and lens fittings at our branches across Zimbabwe.",
      image: HERO_CAROUSEL_IMAGES.eyeExam,
      cta: "Book Eye Test",
    },
    {
      id: 2,
      title: "Same-Day Glasses",
      subtitle: "Made in our lab",
      description:
        "Get glasses made same-day in our lab. No waiting weeks for vision correction.",
      image: HERO_CAROUSEL_IMAGES.sameDaySpectacles,
      cta: "Browse Frames",
    },
    {
      id: 3,
      title: "Eye Tests",
      subtitle: "At our branches",
      description:
        "Eye examinations using available equipment at our branches.",
      image: HERO_CAROUSEL_IMAGES.expertOptometrists,
      cta: "Our Services",
    },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 6000);

    return () => clearInterval(interval);
  }, [heroSlides.length]);

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
                  {status === "loading" ? "Loading..." : "Book Appointment"}
                </button>
                <Link
                  href={
                    slide.id === 1
                      ? "/services"
                      : slide.id === 2
                      ? "/frames"
                      : "/about"
                  }
                  className="btn-secondary text-lg px-8 py-4 text-center"
                >
                  {slide.cta}
                </Link>
              </div>
            </div>

            {/* Stats from COMPANY_STATS */}
            <div className="flex items-center space-x-8 pt-8">
              <div className="text-center">
                <div className="text-2xl font-bold text-[#00A6E6]">
                  {COMPANY_STATS.yearsExperience}
                </div>
                <div className="text-sm text-[#B9C4CC]">Years operating</div>
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
                <div className="text-sm text-[#B9C4CC]">Day service</div>
              </div>
            </div>
          </div>

          {/* Image Side - UPDATED WITH REAL IMAGES */}
          <div className="relative">
            <div className="glow-effect rounded-2xl overflow-hidden aspect-square border border-white/10">
              <Image
                src={slide.image}
                alt={slide.title}
                width={600}
                height={600}
                className="w-full h-full object-cover"
                priority={currentSlide === 0}
              />
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
