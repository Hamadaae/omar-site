"use client";

import { ReactNode } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  FolderKanban,
  Mail,
  LogOut,
  LayoutDashboard,
  Home,
  ChevronRight,
} from "lucide-react";
import { signOut, useSession } from "@/lib/auth-client";
import { Button } from "@/components/ui/button";

interface AdminLayoutClientProps {
  children: ReactNode;
  locale: string;
}

export default function AdminLayoutClient({
  children,
  locale,
}: AdminLayoutClientProps) {
  const pathname = usePathname();
  const { data: session, isPending } = useSession();

  const handleLogout = async () => {
    await signOut();
    window.location.href = `/${locale}/admin`;
  };

  // Show loading state
  if (isPending) {
    return (
      <div
        className="min-h-screen flex items-center justify-center"
        style={{ backgroundColor: "var(--color-admin-bg)" }}
      >
        <div className="flex flex-col items-center gap-4">
          <div
            className="w-12 h-12 border-4 border-t-transparent rounded-full animate-spin"
            style={{ borderColor: "var(--color-admin-primary)" }}
          />
          <span style={{ color: "var(--color-admin-text-muted)" }}>
            Loading...
          </span>
        </div>
      </div>
    );
  }

  // If not authenticated and not on login page, redirect to login
  const isLoginPage = pathname === `/${locale}/admin`;
  if (!session && !isLoginPage) {
    return children;
  }

  // If on login page and authenticated, redirect to dashboard
  if (session && isLoginPage) {
    window.location.href = `/${locale}/admin/projects`;
    return null;
  }

  // If on login page and not authenticated, show login form
  if (!session && isLoginPage) {
    return children;
  }

  // Get current page name for breadcrumb
  const getCurrentPageName = () => {
    if (pathname.includes("/projects")) return "Projects";
    if (pathname.includes("/messages")) return "Messages";
    return "Dashboard";
  };

  // Authenticated dashboard layout
  const navItems = [
    {
      href: `/${locale}/admin/projects`,
      label: "Projects",
      icon: FolderKanban,
    },
    {
      href: `/${locale}/admin/messages`,
      label: "Messages",
      icon: Mail,
    },
  ];

  return (
    <div
      className="min-h-screen"
      style={{ backgroundColor: "var(--color-admin-bg)" }}
    >
      {/* Top Navigation Bar */}
      <header
        className="sticky top-0 z-50 w-full backdrop-blur-xl"
        style={{
          backgroundColor:
            "color-mix(in srgb, var(--color-admin-surface) 80%, transparent)",
          borderBottom: "1px solid var(--color-admin-border)",
        }}
      >
        <div className="w-[90%] mx-auto flex h-16 items-center justify-between">
          {/* Left side - Logo & Nav */}
          <div className="flex items-center gap-8">
            {/* Logo */}
            <Link
              href={`/${locale}/admin/projects`}
              className="flex items-center gap-3 group"
            >
              <div
                className="w-9 h-9 rounded-lg flex items-center justify-center transition-transform group-hover:scale-105"
                style={{ backgroundColor: "var(--color-admin-primary)" }}
              >
                <LayoutDashboard className="h-5 w-5 text-white" />
              </div>
              <div className="hidden sm:block">
                <h1
                  className="text-base font-bold"
                  style={{ color: "var(--color-admin-text)" }}
                >
                  Admin Panel
                </h1>
              </div>
            </Link>

            {/* Navigation Links */}
            <nav className="hidden md:flex items-center gap-1">
              {navItems.map((item) => {
                const isActive =
                  pathname === item.href ||
                  pathname.startsWith(item.href + "/");
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="flex items-center gap-2 px-4 py-2 rounded-lg font-medium text-sm transition-all"
                    style={{
                      backgroundColor: isActive
                        ? "color-mix(in srgb, var(--color-admin-primary) 15%, transparent)"
                        : "transparent",
                      color: isActive
                        ? "var(--color-admin-primary)"
                        : "var(--color-admin-text-muted)",
                    }}
                  >
                    <item.icon className="h-4 w-4" />
                    {item.label}
                  </Link>
                );
              })}
            </nav>
          </div>

          {/* Right side - User menu */}
          <div className="flex items-center gap-4">
            {/* Back to site */}
            <Link
              href={`/${locale}`}
              className="hidden sm:flex items-center gap-2 text-sm transition-colors"
              style={{ color: "var(--color-admin-text-muted)" }}
            >
              <Home className="h-4 w-4" />
              <span>View Site</span>
            </Link>

            {/* User */}
            <div
              className="flex items-center gap-3 pl-4"
              style={{ borderLeft: "1px solid var(--color-admin-border)" }}
            >
              <div
                className="w-8 h-8 rounded-full flex items-center justify-center font-semibold text-sm"
                style={{
                  backgroundColor: "var(--color-admin-accent)",
                  color: "var(--color-admin-text)",
                }}
              >
                {session?.user?.name?.[0] || "A"}
              </div>
              <div className="hidden sm:block">
                <p
                  className="text-sm font-medium"
                  style={{ color: "var(--color-admin-text)" }}
                >
                  {session?.user?.name || "Admin"}
                </p>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={handleLogout}
                className="h-8 w-8 hover:bg-red-500/10"
                style={{ color: "var(--color-admin-text-muted)" }}
                title="Sign out"
              >
                <LogOut className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        <div
          className="md:hidden"
          style={{ borderTop: "1px solid var(--color-admin-border)" }}
        >
          <div className="w-[90%] mx-auto flex items-center gap-2 py-2">
            {navItems.map((item) => {
              const isActive =
                pathname === item.href || pathname.startsWith(item.href + "/");
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className="flex-1 flex items-center justify-center gap-2 px-3 py-2 rounded-lg font-medium text-sm transition-all"
                  style={{
                    backgroundColor: isActive
                      ? "color-mix(in srgb, var(--color-admin-primary) 15%, transparent)"
                      : "transparent",
                    color: isActive
                      ? "var(--color-admin-primary)"
                      : "var(--color-admin-text-muted)",
                  }}
                >
                  <item.icon className="h-4 w-4" />
                  {item.label}
                </Link>
              );
            })}
          </div>
        </div>
      </header>

      {/* Breadcrumb */}
      <div
        style={{
          backgroundColor:
            "color-mix(in srgb, var(--color-admin-accent-light) 30%, var(--color-admin-bg))",
          borderBottom: "1px solid var(--color-admin-border)",
        }}
      >
        <div className="w-[90%] mx-auto py-3">
          <div className="flex items-center gap-2 text-sm">
            <Link
              href={`/${locale}/admin/projects`}
              className="transition-colors"
              style={{ color: "var(--color-admin-text-muted)" }}
            >
              Dashboard
            </Link>
            <ChevronRight
              className="h-4 w-4"
              style={{ color: "var(--color-admin-text-muted)" }}
            />
            <span
              className="font-medium"
              style={{ color: "var(--color-admin-text)" }}
            >
              {getCurrentPageName()}
            </span>
          </div>
        </div>
      </div>

      {/* Main content */}
      <main className="w-[90%] mx-auto py-8">{children}</main>
    </div>
  );
}
