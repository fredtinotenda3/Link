"use client";

import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { useState } from "react";

// Simple admin check function
const isAdminUser = (email: string | null | undefined): boolean => {
  if (!email) return false;
  const adminEmails = [
    "admin@linkoptical.co.zw",
    "richard@linkoptical.co.zw",
    "bismark@linkoptical.co.zw",
    "blessedmakwara12@gmail.com", // Add this line
  ];
  return adminEmails.includes(email.toLowerCase());
};

export default function Navigation() {
  const { data: session, status } = useSession();
  const isLoading = status === "loading";
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);

  const isAdmin = session?.user?.email
    ? isAdminUser(session.user.email)
    : false;

  const navigationLinks = [
    { href: "/", label: "Home" },
    { href: "/services", label: "Services" },
    { href: "/branches", label: "Branches" },
    { href: "/about", label: "About" },
    { href: "/contact", label: "Contact" },
  ];

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

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navigationLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-[#B9C4CC] hover:text-[#00A6E6] transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* CTA Buttons - Dynamic based on auth state */}
          <div className="hidden md:flex items-center space-x-4">
            {isLoading ? (
              <div className="w-20 h-10 bg-white/5 rounded-lg animate-pulse"></div>
            ) : session ? (
              <>
                <Link href="/book" className="btn-primary">
                  Book Appointment
                </Link>
                <div className="relative">
                  <button
                    onClick={toggleUserMenu}
                    className="btn-secondary flex items-center gap-2"
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
                <Link href="/auth/login" className="btn-secondary">
                  Sign In
                </Link>
                <Link href="/auth/signup" className="btn-primary">
                  Book Appointment
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
              {/* Navigation Links */}
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
                      className="block w-full btn-primary text-center py-3"
                    >
                      Book Appointment
                    </Link>
                    <div className="space-y-2">
                      <Link
                        href="/profile"
                        onClick={closeMobileMenu}
                        className="block w-full btn-secondary text-center py-2"
                      >
                        My Profile
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
                      className="block w-full btn-primary text-center py-3"
                    >
                      Book Appointment
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
    </header>
  );
}
