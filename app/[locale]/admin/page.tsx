"use client";

import { useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { signIn } from "@/lib/auth-client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { Lock, Mail, ArrowRight, LayoutDashboard } from "lucide-react";

export default function AdminLoginPage() {
  const router = useRouter();
  const params = useParams();
  const locale = params.locale as string;

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const result = await signIn.email({
        email,
        password,
      });

      if (result.error) {
        toast.error(result.error.message || "Invalid credentials");
      } else {
        toast.success("Logged in successfully");
        router.push(`/${locale}/admin/projects`);
      }
    } catch (error) {
      console.error(error);
      toast.error("An error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center px-4"
      style={{ backgroundColor: "var(--color-admin-bg)" }}
    >
      {/* Login Card */}
      <div className="w-full max-w-md">
        <div
          className="rounded-2xl shadow-xl p-8"
          style={{
            backgroundColor: "var(--color-admin-surface)",
            border: "1px solid var(--color-admin-border)",
          }}
        >
          {/* Header */}
          <div className="text-center mb-8">
            <div
              className="inline-flex items-center justify-center w-14 h-14 rounded-xl mb-4"
              style={{ backgroundColor: "var(--color-admin-primary)" }}
            >
              <LayoutDashboard className="h-7 w-7 text-white" />
            </div>
            <h1
              className="text-2xl font-bold mb-2"
              style={{ color: "var(--color-admin-text)" }}
            >
              Admin Login
            </h1>
            <p style={{ color: "var(--color-admin-text-muted)" }}>
              Sign in to access your dashboard
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-2">
              <Label
                htmlFor="email"
                style={{ color: "var(--color-admin-text)" }}
              >
                Email Address
              </Label>
              <div className="relative">
                <Mail
                  className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5"
                  style={{ color: "var(--color-admin-text-muted)" }}
                />
                <Input
                  id="email"
                  type="email"
                  placeholder="admin@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="pl-11 h-11"
                  style={{
                    backgroundColor: "var(--color-admin-bg)",
                    borderColor: "var(--color-admin-border)",
                    color: "var(--color-admin-text)",
                  }}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label
                htmlFor="password"
                style={{ color: "var(--color-admin-text)" }}
              >
                Password
              </Label>
              <div className="relative">
                <Lock
                  className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5"
                  style={{ color: "var(--color-admin-text-muted)" }}
                />
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="pl-11 h-11"
                  style={{
                    backgroundColor: "var(--color-admin-bg)",
                    borderColor: "var(--color-admin-border)",
                    color: "var(--color-admin-text)",
                  }}
                />
              </div>
            </div>

            <Button
              type="submit"
              className="w-full h-11 gap-2 text-white"
              style={{ backgroundColor: "var(--color-admin-primary)" }}
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Signing in...
                </>
              ) : (
                <>
                  Sign In
                  <ArrowRight className="h-4 w-4" />
                </>
              )}
            </Button>
          </form>

          {/* Footer */}
          <div
            className="mt-6 pt-6 text-center"
            style={{ borderTop: "1px solid var(--color-admin-border)" }}
          >
            <p
              className="text-sm"
              style={{ color: "var(--color-admin-text-muted)" }}
            >
              Protected area • Authorized personnel only
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
