"use client";

import Navigation from "@/components/Navigation";
import HeroCarousel from "@/components/homepage/HeroCarousel";
import ServiceShowcase from "@/components/homepage/ServiceShowcase";
import WhyChooseUs from "@/components/homepage/WhyChooseUs";
import TestimonialSection from "@/components/homepage/TestimonialSection";
import FinalCTA from "@/components/homepage/FinalCTA";

export default function Home() {
  return (
    <div className="min-h-screen">
      <Navigation />

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
