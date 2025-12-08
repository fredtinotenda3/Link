// components/FramesGallery.tsx - REFACTORED VERSION
"use client";

import { useState } from "react";
// ✅ Specific constant imports
import { FRAMES, LENSES, FRAME_CATEGORIES } from "@/constants/frames";
// ✅ Specific type imports
import { Frame, Lens, FrameCategoryInfo, FrameCategory } from "@/types";

export default function FramesGallery() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [, setSelectedFrame] = useState<Frame | null>(null);

  const filteredFrames =
    activeCategory === "all"
      ? FRAMES
      : FRAMES.filter((frame) => frame.category === activeCategory);

  const getCategoryColor = (category: FrameCategory) => {
    switch (category) {
      case "designer":
        return "bg-purple-500";
      case "premium":
        return "bg-blue-500";
      case "standard":
        return "bg-green-500";
      case "budget":
        return "bg-orange-500";
      default:
        return "bg-gray-500";
    }
  };

  return (
    <div className="space-y-12">
      {/* Categories Filter */}
      <div className="flex flex-wrap gap-4 justify-center">
        {FRAME_CATEGORIES.map((category: FrameCategoryInfo) => (
          <button
            key={category.id}
            onClick={() => setActiveCategory(category.id)}
            className={`px-6 py-3 rounded-full font-medium transition-all ${
              activeCategory === category.id
                ? "bg-[#00A6E6] text-white"
                : "bg-white/10 text-[#B9C4CC] hover:bg-white/20"
            }`}
          >
            {category.name} ({category.count})
          </button>
        ))}
      </div>

      {/* Frames Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredFrames.map((frame: Frame) => (
          <div
            key={frame.id}
            className="card-premium group cursor-pointer"
            onClick={() => setSelectedFrame(frame)}
          >
            <div className="mb-4">
              <div className="w-full h-64 bg-linear-to-br from-[#0077B6] to-[#48CAE4] rounded-xl mb-4 flex items-center justify-center group-hover:scale-105 transition-transform">
                <div className="text-white text-center">
                  <div className="text-4xl mb-2">👓</div>
                  <div className="text-sm font-medium">{frame.brand}</div>
                </div>
              </div>

              <div className="flex items-start justify-between mb-3">
                <div>
                  <h3 className="text-xl font-bold text-[#F2F5F9]">
                    {frame.name}
                  </h3>
                  <p className="text-[#00A6E6] font-semibold">{frame.brand}</p>
                </div>
                <span
                  className={`px-3 py-1 rounded-full text-xs font-medium text-white ${getCategoryColor(
                    frame.category
                  )}`}
                >
                  {frame.category.toUpperCase()}
                </span>
              </div>

              <p className="text-[#B9C4CC] text-sm mb-4 leading-relaxed">
                {frame.description}
              </p>

              <div className="space-y-3">
                <div>
                  <p className="text-[#B9C4CC] text-xs mb-1">Price Range</p>
                  <p className="text-[#F2F5F9] font-semibold">
                    {frame.priceRange}
                  </p>
                </div>

                <div>
                  <p className="text-[#B9C4CC] text-xs mb-2">
                    Available Colors
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {frame.availableColors.map((color) => (
                      <span
                        key={color}
                        className="px-2 py-1 bg-white/5 text-[#B9C4CC] text-xs rounded border border-white/10"
                      >
                        {color}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex flex-wrap gap-1">
                  {frame.features.map((feature, index) => (
                    <span
                      key={index}
                      className="px-2 py-1 bg-[#00A6E6]/10 text-[#00A6E6] text-xs rounded"
                    >
                      {feature}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <button className="w-full btn-primary mt-4">
              Book Consultation
            </button>
          </div>
        ))}
      </div>

      {/* Lenses Section */}
      <div className="bg-white/5 rounded-2xl p-8 border border-white/10">
        <h2 className="text-3xl font-bold text-[#F2F5F9] mb-8 text-center">
          Lens Options
        </h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {LENSES.map((lens: Lens) => (
            <div
              key={lens.id}
              className="text-center p-6 bg-white/5 rounded-xl border border-white/10"
            >
              <div className="text-3xl mb-4">🔍</div>
              <h3 className="text-lg font-bold text-[#F2F5F9] mb-2">
                {lens.name}
              </h3>
              <p className="text-[#00A6E6] font-semibold mb-3">
                {lens.priceRange}
              </p>
              <p className="text-[#B9C4CC] text-sm mb-4">{lens.description}</p>
              <div className="space-y-2">
                {lens.features.map((feature, index) => (
                  <span
                    key={index}
                    className="block bg-white/5 text-[#B9C4CC] text-xs px-2 py-1 rounded"
                  >
                    {feature}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* CTA Section */}
      <div className="text-center bg-white/5 rounded-2xl p-8 border border-white/10">
        <h3 className="text-2xl font-bold text-[#F2F5F9] mb-4">
          Ready to Look at Frames?
        </h3>
        <p className="text-[#B9C4CC] mb-6 max-w-2xl mx-auto">
          Visit any of our 5 branches for a consultation and frame fitting. Our
          staff will help you find frames for your style and prescription needs.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a href="/book" className="btn-primary">
            Book Frame Consultation
          </a>
          <a href="/branches" className="btn-secondary">
            Find Nearest Branch
          </a>
        </div>
      </div>
    </div>
  );
}
