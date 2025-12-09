// app\page.tsx - REFACTORED VERSION
"use client";

import HeroCarousel from "@/components/homepage/HeroCarousel";
import ServiceShowcase from "@/components/homepage/ServiceShowcase";
import WhyChooseUs from "@/components/homepage/WhyChooseUs";
import TestimonialSection from "@/components/homepage/TestimonialSection";
import FinalCTA from "@/components/homepage/FinalCTA";

export default function Home() {
  return (
    <div className="min-h-screen">
      <main>
        <HeroCarousel />
        <ServiceShowcase />
        <WhyChooseUs />
        <TestimonialSection />
        <FinalCTA />
      </main>
    </div>
  );
}
