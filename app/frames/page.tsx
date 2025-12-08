// app\frames\page.tsx - REFACTORED VERSION
import Navigation from "@/components/Navigation";
import FramesGallery from "@/components/FramesGallery";

export default function FramesPage() {
  return (
    <div className="min-h-screen">
      <Navigation />

      <section className="py-20 bg-gradient-to-br from-[#001F3F] via-[#002851] to-[#0077B6]">
        <div className="container-premium">
          <div className="text-center mb-16">
            <h1 className="text-5xl md:text-7xl font-black mb-6 leading-tight">
              <span className="text-[#F2F5F9]">Frames</span>
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00A6E6] to-[#48CAE4]">
                & Lenses
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-[#B9C4CC] max-w-3xl mx-auto">
              Different frame styles and lens options. From various brands to
              different price options, all made in our lab.
            </p>
          </div>

          <FramesGallery />
        </div>
      </section>
    </div>
  );
}
