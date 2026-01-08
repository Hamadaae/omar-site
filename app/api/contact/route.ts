import { rootContainer } from "@/backend/config/container";
import { ContactController } from "@/backend/features/contact/contact.controller";
import { IContactMessage } from "@/backend/features/contact/contact.model";
import {
  created,
  badRequest,
  serverError,
  ApiResponse,
} from "@/types/api-helpers";
import { NextRequest, NextResponse } from "next/server";
import { contactFormSchema } from "@/zodSchemas/ContactUsForm";

// POST /api/contact - Submit contact form
export const POST = async (
  request: NextRequest
): Promise<NextResponse<ApiResponse<IContactMessage>>> => {
  try {
    const body = await request.json();

    // Validate the request body
    const validation = contactFormSchema.safeParse(body);
    if (!validation.success) {
      return badRequest(validation.error.errors[0].message);
    }

    const controller = rootContainer.resolve(ContactController);
    const message = await controller.create(validation.data);

    return created(message);
  } catch (error) {
    console.error("Error submitting contact form:", error);
    return serverError("Failed to submit contact form");
  }
};
