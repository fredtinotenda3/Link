"use client";

import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { useState, useEffect } from "react";
import Image from "next/image";

// Simple admin check function
const isAdminUser = (email: string | null | undefined): boolean => {
  if (!email) return false;
  const adminEmails = [
    "fredtinotenda3@gmail.com",
    "blessedmakwara12@gmail.com",
  ];
  return adminEmails.includes(email.toLowerCase());
};

export default function Navigation() {
  const { data: session, status } = useSession();
  const isLoading = status === "loading";
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [isLogoVisible, setIsLogoVisible] = useState(true);

  const isAdmin = session?.user?.email
    ? isAdminUser(session.user.email)
    : false;

  // Navigation links for all main pages (excluding home)
  const navigationLinks = [
    { href: "/services", label: "Services" },
    { href: "/frames", label: "Frames & Lenses" },
    { href: "/branches", label: "Branches" },
    { href: "/about", label: "About" },
    { href: "/contact", label: "Contact" },
  ];

  // Blinking effect for the logo
  useEffect(() => {
    const blinkInterval = setInterval(() => {
      setIsLogoVisible((prev) => !prev);

      // Blink twice quickly
      setTimeout(() => {
        setIsLogoVisible(true);
      }, 100);

      setTimeout(() => {
        setIsLogoVisible(false);
      }, 200);

      setTimeout(() => {
        setIsLogoVisible(true);
      }, 300);
    }, 5000); // Blink every 5 seconds

    return () => clearInterval(blinkInterval);
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  const toggleUserMenu = () => {
    setShowUserMenu(!showUserMenu);
  };

  return (
    <header className="sticky top-0 z-50 bg-[#001F3F]/90 backdrop-blur-md border-b border-[#2C3E50]">
      <div className="container-premium">
        <div className="flex items-center justify-between ">
          {/* Logo - With blinking effect */}
          <div className="flex items-center">
            <Link
              href="/"
              className="flex items-center hover:opacity-90 transition-opacity"
              aria-label="Link Optical - Home"
            >
              <div className="relative w-12 h-12">
                {/* Main logo with blink animation */}
                <div
                  className={`transition-opacity duration-300 ${
                    isLogoVisible ? "opacity-100" : "opacity-70"
                  }`}
                >
                  <Image
                    src="/logo.png"
                    alt="Link Optical Logo"
                    width={48}
                    height={48}
                    className="rounded-full object-contain"
                    priority
                  />
                </div>

                {/* Glow effect around logo */}
                <div
                  className={`absolute inset-0 rounded-full ${
                    isLogoVisible
                      ? "bg-[#00A6E6]/20 blur-sm scale-110"
                      : "bg-[#00A6E6]/10 blur-none scale-100"
                  } transition-all duration-300 -z-10`}
                ></div>

                {/* Subtle pulse ring */}
                <div
                  className={`absolute inset-0 rounded-full border-2 ${
                    isLogoVisible ? "border-[#00A6E6]/30" : "border-transparent"
                  } transition-all duration-300 animate-pulse-slow`}
                ></div>
              </div>
            </Link>
          </div>

          {/* Desktop Navigation - All main pages */}
          <nav className="hidden md:flex items-center space-x-6">
            {navigationLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-[#B9C4CC] hover:text-[#00A6E6] transition-colors font-medium px-2 py-1"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* CTA Buttons - Dynamic based on auth state */}
          <div className="hidden md:flex items-center space-x-3">
            {isLoading ? (
              <div className="w-20 h-10 bg-white/5 rounded-lg animate-pulse"></div>
            ) : session ? (
              <>
                <Link
                  href="/book"
                  className="btn-primary relative overflow-hidden group px-4 py-2 text-sm font-semibold"
                >
                  {/* Glow effect */}
                  <span className="absolute inset-0 bg-[#00A6E6] rounded-lg group-hover:bg-[#008fcd] transition-colors"></span>
                  <span className="absolute inset-0 bg-gradient-to-r from-[#00A6E6] to-[#48CAE4] opacity-50 group-hover:opacity-70 rounded-lg transition-opacity"></span>
                  <span className="absolute inset-0 rounded-lg bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700"></span>

                  {/* Button text */}
                  <span className="relative flex items-center justify-center">
                    <span className="mr-2">📅</span>
                    Book Now
                  </span>
                </Link>

                <div className="relative">
                  <button
                    onClick={toggleUserMenu}
                    className="btn-secondary flex items-center gap-2 px-3 py-2"
                  >
                    👤 {session.user.firstName}
                  </button>
                  {showUserMenu && (
                    <div className="absolute right-0 top-full mt-2 w-48 bg-white/5 backdrop-blur-lg border border-white/10 rounded-lg shadow-2xl z-50">
                      <Link
                        href="/profile"
                        className="block px-4 py-3 text-[#F2F5F9] hover:bg-white/10 transition-colors"
                        onClick={() => setShowUserMenu(false)}
                      >
                        My Profile
                      </Link>
                      <Link
                        href="/appointments"
                        className="block px-4 py-3 text-[#F2F5F9] hover:bg-white/10 transition-colors border-t border-white/10"
                        onClick={() => setShowUserMenu(false)}
                      >
                        My Appointments
                      </Link>
                      {isAdmin && (
                        <Link
                          href="/admin"
                          className="block px-4 py-3 text-[#F2F5F9] hover:bg-white/10 transition-colors border-t border-white/10"
                          onClick={() => setShowUserMenu(false)}
                        >
                          📊 Admin Dashboard
                        </Link>
                      )}
                      <button
                        onClick={() => {
                          setShowUserMenu(false);
                          signOut();
                        }}
                        className="block w-full text-left px-4 py-3 text-[#F2F5F9] hover:bg-white/10 transition-colors border-t border-white/10"
                      >
                        Sign Out
                      </button>
                    </div>
                  )}
                </div>
              </>
            ) : (
              <>
                <Link href="/auth/login" className="btn-secondary px-4 py-2">
                  Sign In
                </Link>
                <Link
                  href="/auth/signup"
                  className="btn-primary relative overflow-hidden group px-4 py-2 text-sm font-semibold"
                >
                  {/* Glow effect */}
                  <span className="absolute inset-0 bg-[#00A6E6] rounded-lg group-hover:bg-[#008fcd] transition-colors"></span>
                  <span className="absolute inset-0 bg-gradient-to-r from-[#00A6E6] to-[#48CAE4] opacity-50 group-hover:opacity-70 rounded-lg transition-opacity"></span>
                  <span className="absolute inset-0 rounded-lg bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700"></span>

                  {/* Button text */}
                  <span className="relative flex items-center justify-center">
                    <span className="mr-2">📅</span>
                    Book Now
                  </span>
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={toggleMobileMenu}
            className="md:hidden flex flex-col items-center justify-center w-10 h-10 text-[#F2F5F9] hover:text-[#00A6E6] transition-colors"
            aria-label="Toggle menu"
          >
            <span
              className={`block w-6 h-0.5 bg-current transition-all duration-300 ${
                isMobileMenuOpen
                  ? "rotate-45 translate-y-1.5"
                  : "-translate-y-1"
              }`}
            />
            <span
              className={`block w-6 h-0.5 bg-current transition-all duration-300 ${
                isMobileMenuOpen ? "opacity-0" : "opacity-100"
              }`}
            />
            <span
              className={`block w-6 h-0.5 bg-current transition-all duration-300 ${
                isMobileMenuOpen
                  ? "-rotate-45 -translate-y-1.5"
                  : "translate-y-1"
              }`}
            />
          </button>
        </div>

        {/* Mobile Navigation Menu */}
        <div
          className={`md:hidden transition-all duration-300 overflow-hidden ${
            isMobileMenuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <nav className="py-4 border-t border-white/10">
            <div className="space-y-4">
              {/* Mobile Navigation Links - All pages including frames */}
              {navigationLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={closeMobileMenu}
                  className="block text-lg text-[#F2F5F9] hover:text-[#00A6E6] transition-colors py-2"
                >
                  {link.label}
                </Link>
              ))}

              {/* Mobile Auth Buttons */}
              <div className="pt-4 border-t border-white/10 space-y-3">
                {isLoading ? (
                  <div className="h-10 bg-white/5 rounded-lg animate-pulse"></div>
                ) : session ? (
                  <>
                    <Link
                      href="/book"
                      onClick={closeMobileMenu}
                      className="block w-full btn-primary text-center py-3 relative overflow-hidden group"
                    >
                      {/* Mobile glow effect */}
                      <span className="absolute inset-0 bg-[#00A6E6] rounded-lg group-hover:bg-[#008fcd] transition-colors"></span>
                      <span className="absolute inset-0 bg-gradient-to-r from-[#00A6E6] to-[#48CAE4] opacity-50 group-hover:opacity-70 rounded-lg transition-opacity"></span>
                      <span className="relative flex items-center justify-center">
                        <span className="mr-2">📅</span>
                        Book Appointment
                      </span>
                    </Link>
                    <div className="space-y-2">
                      <Link
                        href="/profile"
                        onClick={closeMobileMenu}
                        className="block w-full btn-secondary text-center py-2"
                      >
                        My Profile
                      </Link>
                      <Link
                        href="/appointments"
                        onClick={closeMobileMenu}
                        className="block w-full btn-secondary text-center py-2"
                      >
                        My Appointments
                      </Link>
                      {isAdmin && (
                        <Link
                          href="/admin"
                          onClick={closeMobileMenu}
                          className="block w-full btn-secondary text-center py-2 bg-purple-600 hover:bg-purple-700"
                        >
                          📊 Admin Dashboard
                        </Link>
                      )}
                      <button
                        onClick={() => {
                          closeMobileMenu();
                          signOut();
                        }}
                        className="block w-full btn-secondary text-center py-2"
                      >
                        Sign Out
                      </button>
                    </div>
                    <p className="text-center text-[#B9C4CC] text-sm">
                      Hello, {session.user.firstName}
                    </p>
                  </>
                ) : (
                  <>
                    <Link
                      href="/auth/signup"
                      onClick={closeMobileMenu}
                      className="block w-full btn-primary text-center py-3 relative overflow-hidden group"
                    >
                      {/* Mobile glow effect */}
                      <span className="absolute inset-0 bg-[#00A6E6] rounded-lg group-hover:bg-[#008fcd] transition-colors"></span>
                      <span className="absolute inset-0 bg-gradient-to-r from-[#00A6E6] to-[#48CAE4] opacity-50 group-hover:opacity-70 rounded-lg transition-opacity"></span>
                      <span className="relative flex items-center justify-center">
                        <span className="mr-2">📅</span>
                        Book Appointment
                      </span>
                    </Link>
                    <Link
                      href="/auth/login"
                      onClick={closeMobileMenu}
                      className="block w-full btn-secondary text-center py-3"
                    >
                      Sign In
                    </Link>
                  </>
                )}
              </div>
            </div>
          </nav>
        </div>
      </div>

      {/* Add custom animation for slow pulse */}
      <style jsx>{`
        @keyframes pulse-slow {
          0%,
          100% {
            opacity: 0.3;
            transform: scale(1);
          }
          50% {
            opacity: 0.6;
            transform: scale(1.05);
          }
        }
        .animate-pulse-slow {
          animation: pulse-slow 3s ease-in-out infinite;
        }
      `}</style>
    </header>
  );
}
