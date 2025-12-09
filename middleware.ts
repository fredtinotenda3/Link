import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

// List of admin emails (in production, you'd store this in a database)
const ADMIN_EMAILS = [
  "admin@linkoptical.co.zw",
  "fredtinotenda3@gmail.com",
  "blessedmakwara12@gmail.com",
];

export default withAuth(
  function middleware(req) {
    const token = req.nextauth.token;
    const isAdminPage =
      req.nextUrl.pathname.startsWith("/admin") ||
      req.nextUrl.pathname.startsWith("/test-");

    // Check if user is trying to access admin pages
    if (isAdminPage && token?.email) {
      const isAdmin = ADMIN_EMAILS.includes(token.email.toLowerCase());

      if (!isAdmin) {
        // Redirect non-admin users to home page
        return NextResponse.redirect(new URL("/", req.url));
      }
    }

    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ token }) => {
        // Allow access to all pages even without token
        // Admin check is handled above
        return true;
      },
    },
  }
);

export const config = {
  matcher: [
    "/admin/:path*",
    "/test-integration/:path*",
    "/test-visionplus/:path*",
    "/test-notifications/:path*",
  ],
};
