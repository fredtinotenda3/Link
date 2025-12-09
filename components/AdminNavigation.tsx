"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut, useSession } from "next-auth/react";
import { useState, useEffect, useMemo } from "react";
import { useRouter } from "next/navigation";

const adminNavLinks = [
  {
    href: "/admin",
    label: "Dashboard",
    icon: "📊",
    description: "Appointment management",
  },
  {
    href: "/test-integration",
    label: "Integration Tests",
    icon: "🔧",
    description: "Test VisionPlus sync",
  },
  {
    href: "/test-visionplus",
    label: "VisionPlus Test",
    icon: "🔍",
    description: "Check VisionPlus connection",
  },
  {
    href: "/test-notifications",
    label: "Notification Tests",
    icon: "📨",
    description: "Test email & SMS",
  },
];

// Simple admin check - in production, you'd check user roles
const isAdminUser = (email: string | null | undefined): boolean => {
  if (!email) return false;
  const adminEmails = [
    "blessedmakwara12@gmail.com",
    "fredtinotenda3@gmail.com",
  ];
  return adminEmails.includes(email.toLowerCase());
};

export default function AdminNavigation() {
  const pathname = usePathname();
  const { data: session, status } = useSession();
  const router = useRouter();
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  // Get the email safely
  const userEmail = session?.user?.email;

  // Use useMemo to compute isAdmin without causing re-renders
  const isAdmin = useMemo(() => {
    return isAdminUser(userEmail);
  }, [userEmail]);

  // Redirect non-admin users away from admin pages
  useEffect(() => {
    if (status === "authenticated" && !isAdmin) {
      const isOnAdminPage =
        pathname.startsWith("/admin") || pathname.startsWith("/test-");
      if (isOnAdminPage) {
        router.push("/");
      }
    }
  }, [status, isAdmin, pathname, router]);

  // Show loading while checking auth
  if (status === "loading") {
    return (
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <div className="animate-pulse h-8 w-48 bg-gray-200 rounded"></div>
          </div>
        </div>
      </header>
    );
  }

  // Don't show admin nav if not admin
  if (status !== "authenticated" || !isAdmin) {
    return null;
  }

  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo and Brand */}
          <div className="flex items-center space-x-3">
            <Link
              href="/admin"
              className="flex items-center space-x-2 text-gray-900 font-bold hover:text-blue-600 transition-colors"
            >
              <div className="w-8 h-8 bg-blue-600 rounded flex items-center justify-center">
                <span className="text-white text-sm">A</span>
              </div>
              <span>Link Optical Admin</span>
            </Link>
            <span className="hidden md:inline text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
              Admin Access
            </span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1">
            {adminNavLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`flex flex-col items-center px-3 py-2 rounded-md text-sm font-medium transition-colors min-w-[100px] ${
                  pathname === link.href
                    ? "bg-blue-50 text-blue-700"
                    : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                }`}
              >
                <span className="text-lg">{link.icon}</span>
                <span className="mt-1">{link.label}</span>
              </Link>
            ))}
          </nav>

          {/* Right Side Actions */}
          <div className="flex items-center space-x-3">
            <div className="hidden md:block text-sm text-gray-600">
              Logged in as:{" "}
              <span className="font-medium">{session?.user?.firstName}</span>
            </div>
            <div className="hidden md:flex items-center space-x-2">
              <Link
                href="/"
                className="text-sm text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md hover:bg-gray-50 transition-colors"
              >
                ← Back to Site
              </Link>
              <button
                onClick={() => signOut({ callbackUrl: "/" })}
                className="text-sm text-red-600 hover:text-red-800 px-3 py-2 rounded-md hover:bg-red-50 transition-colors"
              >
                Sign Out
              </button>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setShowMobileMenu(!showMobileMenu)}
              className="md:hidden p-2 rounded-md text-gray-600 hover:bg-gray-100"
              aria-label="Toggle menu"
            >
              <div className="w-6 h-6 flex flex-col justify-center">
                <span
                  className={`block h-0.5 w-6 bg-gray-600 transition-all ${
                    showMobileMenu ? "rotate-45 translate-y-1.5" : ""
                  }`}
                ></span>
                <span
                  className={`block h-0.5 w-6 bg-gray-600 my-1 transition-all ${
                    showMobileMenu ? "opacity-0" : "opacity-100"
                  }`}
                ></span>
                <span
                  className={`block h-0.5 w-6 bg-gray-600 transition-all ${
                    showMobileMenu ? "-rotate-45 -translate-y-1.5" : ""
                  }`}
                ></span>
              </div>
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {showMobileMenu && (
          <div className="md:hidden py-3 border-t border-gray-200">
            <div className="space-y-1">
              {adminNavLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setShowMobileMenu(false)}
                  className={`flex items-center justify-between px-3 py-3 rounded-md text-sm font-medium ${
                    pathname === link.href
                      ? "bg-blue-50 text-blue-700"
                      : "text-gray-600 hover:bg-gray-50"
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <span className="text-lg">{link.icon}</span>
                    <div>
                      <div className="font-medium">{link.label}</div>
                      <div className="text-xs text-gray-500">
                        {link.description}
                      </div>
                    </div>
                  </div>
                  <span className="text-gray-400">→</span>
                </Link>
              ))}

              <div className="pt-3 border-t border-gray-200 space-y-2">
                <div className="px-3 py-2 text-sm text-gray-600">
                  Logged in as:{" "}
                  <span className="font-medium">
                    {session?.user?.firstName}
                  </span>
                </div>
                <Link
                  href="/"
                  onClick={() => setShowMobileMenu(false)}
                  className="flex items-center justify-between px-3 py-3 rounded-md text-sm font-medium text-gray-600 hover:bg-gray-50"
                >
                  <div className="flex items-center space-x-3">
                    <span>🏠</span>
                    <span>Back to Main Site</span>
                  </div>
                  <span>→</span>
                </Link>
                <button
                  onClick={() => {
                    setShowMobileMenu(false);
                    signOut({ callbackUrl: "/" });
                  }}
                  className="w-full flex items-center justify-between px-3 py-3 rounded-md text-sm font-medium text-red-600 hover:bg-red-50"
                >
                  <div className="flex items-center space-x-3">
                    <span>🚪</span>
                    <span>Sign Out</span>
                  </div>
                  <span>→</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
