import type { Metadata } from "next";
import AdminNavigation from "@/components/AdminNavigation";

export const metadata: Metadata = {
  title: "Admin Dashboard - Link Optical",
  description: "Admin dashboard for managing appointments and sync operations",
};

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="min-h-screen bg-gray-50">
      <AdminNavigation />
      <main className="py-4">{children}</main>
    </div>
  );
}
