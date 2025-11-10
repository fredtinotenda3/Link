import BookingForm from "@/components/BookingForm";

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Link Optical
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Book your eye care appointment online. Quality eye care services
            across multiple branches in Zimbabwe.
          </p>
        </div>

        {/* Booking Form */}
        <BookingForm />

        {/* Additional Info */}
        <div className="max-w-2xl mx-auto mt-12 text-center">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">
            Our Services Include:
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm text-gray-600">
            <div>👁️ Eye Examinations</div>
            <div>👓 Contact Lenses</div>
            <div>🕶️ Sunglasses</div>
            <div>🔬 Visual Field Tests</div>
            <div>👨‍👩‍👧‍👦 Family Eye Care</div>
            <div>🏥 Emergency Services</div>
          </div>
        </div>
      </div>
    </main>
  );
}
