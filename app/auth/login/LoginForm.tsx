"use client";

import { useState } from "react";
import Link from "next/link";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

interface LoginFormProps {
  message?: string | null;
}

export default function LoginForm({ message }: LoginFormProps) {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const result = await signIn("credentials", {
        email: formData.email,
        password: formData.password,
        redirect: false,
      });

      if (result?.error) {
        setError("Invalid email or password");
      } else {
        // Redirect to booking page
        router.push("/book");
      }
    } catch (error) {
      setError("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-[#F2F5F9] mb-2">Welcome Back</h2>
        <p className="text-[#B9C4CC]">Sign in to your account</p>
      </div>

      {message && (
        <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-4">
          <p className="text-green-400 text-sm">{message}</p>
        </div>
      )}

      {error && (
        <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-4">
          <p className="text-red-400 text-sm">{error}</p>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-[#F2F5F9] mb-2">
            Email Address
          </label>
          <input
            type="email"
            required
            value={formData.email}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
            className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-[#F2F5F9] placeholder-[#B9C4CC] focus:outline-none focus:border-[#00A6E6] transition-colors"
            placeholder="Enter your email"
          />
        </div>

        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="block text-sm font-medium text-[#F2F5F9]">
              Password
            </label>
            <Link
              href="/auth/forgot-password"
              className="text-sm text-[#00A6E6] hover:text-[#48CAE4] transition-colors"
            >
              Forgot password?
            </Link>
          </div>
          <input
            type="password"
            required
            value={formData.password}
            onChange={(e) =>
              setFormData({ ...formData, password: e.target.value })
            }
            className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-[#F2F5F9] placeholder-[#B9C4CC] focus:outline-none focus:border-[#00A6E6] transition-colors"
            placeholder="Enter your password"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full btn-primary py-3 text-lg font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? "Signing In..." : "Sign In"}
        </button>
      </form>

      <div className="text-center">
        <p className="text-[#B9C4CC]">
          Don&apos;t have an account?{" "}
          <Link
            href="/auth/signup"
            className="text-[#00A6E6] hover:text-[#48CAE4] font-semibold transition-colors"
          >
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}
