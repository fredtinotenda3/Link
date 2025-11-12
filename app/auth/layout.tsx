export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#001F3F] via-[#002851] to-[#0077B6]">
      <div className="flex items-center justify-center min-h-screen py-8">
        <div className="w-full max-w-md">
          {/* Logo */}
          <div className="text-center mb-8">
            <div className="flex items-center justify-center space-x-3 mb-4">
              <div className="w-12 h-12 bg-[#00A6E6] rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-xl">L</span>
              </div>
            </div>
            <h1 className="text-2xl font-bold text-[#F2F5F9]">Link Optical</h1>
          </div>

          {/* Auth Content */}
          <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-8 border border-white/10 shadow-2xl">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
