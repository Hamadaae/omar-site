import { rootContainer } from "@/backend/config/container";
import { ContactController } from "@/backend/features/contact/contact.controller";
import { IContactMessage } from "@/backend/features/contact/contact.model";
import { ok, notFound, serverError, ApiResponse } from "@/types/api-helpers";
import { NextRequest, NextResponse } from "next/server";

type Params = { params: Promise<{ id: string }> };

// PATCH /api/messages/[id] - Mark message as read
export const PATCH = async (
  request: NextRequest,
  { params }: Params
): Promise<NextResponse<ApiResponse<IContactMessage>>> => {
  try {
    const { id } = await params;
    const controller = rootContainer.resolve(ContactController);
    const message = await controller.markAsRead(id);

    if (!message) {
      return notFound("Message not found");
    }

    return ok(message);
  } catch (error) {
    console.error("Error updating message:", error);
    return serverError("Failed to update message");
  }
};

// DELETE /api/messages/[id] - Delete message
export const DELETE = async (
  request: NextRequest,
  { params }: Params
): Promise<NextResponse<ApiResponse<IContactMessage>>> => {
  try {
    const { id } = await params;
    const controller = rootContainer.resolve(ContactController);
    const message = await controller.delete(id);

    if (!message) {
      return notFound("Message not found");
    }

    return ok(message);
  } catch (error) {
    console.error("Error deleting message:", error);
    return serverError("Failed to delete message");
  }
};
