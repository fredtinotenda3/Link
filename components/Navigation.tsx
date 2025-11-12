"use client";

import Link from "next/link";
import { useSession, signOut } from "next-auth/react";

export default function Navigation() {
  const { data: session, status } = useSession();
  const isLoading = status === "loading";

  return (
    <header className="sticky top-0 z-50 bg-[#001F3F]/90 backdrop-blur-md border-b border-[#2C3E50]">
      <div className="container-premium">
        <div className="flex items-center justify-between py-4">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <Link
              href="/"
              className="w-10 h-10 bg-[#00A6E6] rounded-full flex items-center justify-center"
            >
              <span className="text-white font-bold text-lg">L</span>
            </Link>
            <Link href="/" className="text-xl font-bold text-[#F2F5F9]">
              Link Optical
            </Link>
          </div>

          {/* Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link
              href="/"
              className="text-[#F2F5F9] hover:text-[#00A6E6] transition-colors"
            >
              Home
            </Link>
            <Link
              href="/services"
              className="text-[#B9C4CC] hover:text-[#00A6E6] transition-colors"
            >
              Services
            </Link>
            <Link
              href="/branches"
              className="text-[#B9C4CC] hover:text-[#00A6E6] transition-colors"
            >
              Branches
            </Link>
            <Link
              href="/about"
              className="text-[#B9C4CC] hover:text-[#00A6E6] transition-colors"
            >
              About
            </Link>
            <Link
              href="/contact"
              className="text-[#B9C4CC] hover:text-[#00A6E6] transition-colors"
            >
              Contact
            </Link>
          </nav>

          {/* CTA Buttons - Dynamic based on auth state */}
          <div className="flex items-center space-x-4">
            {isLoading ? (
              // Loading state
              <div className="w-20 h-10 bg-white/5 rounded-lg animate-pulse"></div>
            ) : session ? (
              // Authenticated state
              <>
                <Link href="/book" className="btn-primary">
                  Book Appointment
                </Link>
                <div className="relative group">
                  <button className="btn-secondary flex items-center gap-2">
                    👤 {session.user.firstName}
                  </button>
                  <div className="absolute right-0 top-full mt-2 w-48 bg-white/5 backdrop-blur-lg border border-white/10 rounded-lg shadow-2xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all">
                    <Link
                      href="/profile"
                      className="block px-4 py-3 text-[#F2F5F9] hover:bg-white/10 transition-colors"
                    >
                      My Profile
                    </Link>
                    <button
                      onClick={() => signOut()}
                      className="block w-full text-left px-4 py-3 text-[#F2F5F9] hover:bg-white/10 transition-colors border-t border-white/10"
                    >
                      Sign Out
                    </button>
                  </div>
                </div>
              </>
            ) : (
              // Unauthenticated state
              <>
                <Link href="/auth/login" className="btn-secondary">
                  Sign In
                </Link>
                <Link href="/auth/signup" className="btn-primary">
                  Book Appointment
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
