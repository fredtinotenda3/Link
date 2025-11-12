"use client";

import { Suspense } from "react";
import Link from "next/link";
import { signIn } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import LoginForm from "./LoginForm";

// This component handles the search params with Suspense
function LoginContent() {
  const searchParams = useSearchParams();
  const message = searchParams.get("message");

  return <LoginForm message={message} />;
}

// Loading component for Suspense fallback
function LoginLoading() {
  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-[#F2F5F9] mb-2">Welcome Back</h2>
        <p className="text-[#B9C4CC]">Loading...</p>
      </div>
      <div className="animate-pulse space-y-4">
        <div className="h-12 bg-white/5 rounded-lg"></div>
        <div className="h-12 bg-white/5 rounded-lg"></div>
        <div className="h-12 bg-white/5 rounded-lg"></div>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={<LoginLoading />}>
      <LoginContent />
    </Suspense>
  );
}
