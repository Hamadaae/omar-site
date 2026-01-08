import { rootContainer } from "@/backend/config/container";
import { ContactController } from "@/backend/features/contact/contact.controller";
import { IContactMessage } from "@/backend/features/contact/contact.model";
import { ok, serverError, ApiResponse } from "@/types/api-helpers";
import { NextResponse } from "next/server";

// GET /api/messages - List all contact messages
export const GET = async (): Promise<
  NextResponse<ApiResponse<IContactMessage[]>>
> => {
  try {
    const controller = rootContainer.resolve(ContactController);
    const messages = await controller.getAll();
    return ok(messages);
  } catch (error) {
    console.error("Error fetching messages:", error);
    return serverError("Failed to fetch messages");
  }
};
