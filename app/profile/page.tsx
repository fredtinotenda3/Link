import { getCurrentUser } from "@/lib/auth";
import { redirect } from "next/navigation";

import ProfileActions from "@/components/ProfileActions";

export default async function ProfilePage() {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/auth/login");
  }

  return (
    <div className="min-h-screen">
      <section className="py-20 bg-gradient-to-br from-[#001F3F] via-[#002851] to-[#0077B6]">
        <div className="container-premium">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h1 className="text-5xl md:text-6xl font-black mb-6 leading-tight">
                <span className="text-[#F2F5F9]">My</span>
                <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00A6E6] to-[#48CAE4]">
                  Profile
                </span>
              </h1>
              <p className="text-xl text-[#B9C4CC]">
                Welcome back, {user.firstName}! Manage your appointments and
                profile.
              </p>
            </div>

            <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-8 border border-white/10">
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-2xl font-bold text-[#F2F5F9] mb-4">
                    Personal Information
                  </h3>
                  <div className="space-y-3">
                    <div>
                      <p className="text-[#B9C4CC] text-sm">Full Name</p>
                      <p className="text-[#F2F5F9] font-medium">
                        {user.firstName} {user.lastName}
                      </p>
                    </div>
                    <div>
                      <p className="text-[#B9C4CC] text-sm">Email</p>
                      <p className="text-[#F2F5F9] font-medium">{user.email}</p>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-2xl font-bold text-[#F2F5F9] mb-4">
                    Quick Actions
                  </h3>
                  <ProfileActions />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
