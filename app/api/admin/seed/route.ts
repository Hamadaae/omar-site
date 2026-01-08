import { ok, ApiResponse } from "@/types/api-helpers";
import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";

// GET /api/admin/seed - Create initial admin user
export const GET = async (): Promise<
  NextResponse<ApiResponse<{ message: string }>>
> => {
  try {
    // Create admin user using better-auth signUpEmail
    const result = await auth.api.signUpEmail({
      body: {
        email: "admin@omar-site.com",
        password: "admin123",
        name: "Admin",
      },
    });

    if (result) {
      return ok({
        message:
          "Admin user created successfully. Email: admin@omar-site.com, Password: admin123",
      });
    }

    return ok({ message: "Admin user may already exist" });
  } catch (error) {
    console.error("Error seeding admin:", error);
    // If user already exists, better-auth will throw an error
    return ok({
      message:
        "Admin user already exists or there was an error. Try logging in with admin@omar-site.com / admin123",
    });
  }
};
