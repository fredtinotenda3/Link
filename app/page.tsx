"use client";

import Navigation from "@/components/Navigation";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

export default function Home() {
  const router = useRouter();
  const { data: session, status } = useSession();

  const handleBookEyeExam = () => {
    if (status === "loading") return;

    if (!session) {
      // Redirect to login with callback to booking page
      router.push(
        "/auth/login?callbackUrl=/book&message=Please sign in to book your eye exam"
      );
    } else {
      router.push("/book");
    }
  };

  const handleBrowseFrames = () => {
    router.push("/frames");
  };

  return (
    <div className="min-h-screen">
      <Navigation />

      {/* ✅ Premium Hero Section */}
      <main>
        <section className="py-20">
          <div className="container-premium">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              {/* Hero Content */}
              <div className="space-y-8">
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
                  Premium Eye Care
                  <span className="text-[#00A6E6] block">For Everyone</span>
                </h1>

                <p className="text-xl text-[#B9C4CC] max-w-2xl">
                  Experience world-class eye care with same-day spectacles from
                  our in-house laboratory. Quality vision solutions across
                  Zimbabwe.
                </p>

                <div className="flex flex-col sm:flex-row gap-4">
                  <button
                    onClick={handleBookEyeExam}
                    disabled={status === "loading"}
                    className="btn-primary text-lg px-8 py-4 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {status === "loading" ? "Loading..." : "Book Eye Exam"}
                  </button>
                  <button
                    onClick={handleBrowseFrames}
                    className="btn-secondary text-lg px-8 py-4"
                  >
                    Browse Frames
                  </button>
                </div>

                {/* Trust Indicators */}
                <div className="flex items-center space-x-8 pt-8">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-[#00A6E6]">15+</div>
                    <div className="text-sm text-[#B9C4CC]">
                      Years Experience
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-[#00A6E6]">5</div>
                    <div className="text-sm text-[#B9C4CC]">Branches</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-[#00A6E6]">
                      Same Day
                    </div>
                    <div className="text-sm text-[#B9C4CC]">
                      Spectacles Ready
                    </div>
                  </div>
                </div>
              </div>

              {/* Hero Visual */}
              <div className="relative">
                <div className="glow-effect bg-gradient-to-br from-[#0077B6] to-[#48CAE4] rounded-2xl p-8 aspect-square flex items-center justify-center">
                  <div className="text-center text-white">
                    <div className="text-6xl mb-4">👓</div>
                    <div className="text-xl font-semibold">
                      Premium Vision Care
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
