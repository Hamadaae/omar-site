import { rootContainer } from "@/backend/config/container";
import { ProjectController } from "@/backend/features/project/project.controller";
import { IProject } from "@/backend/features/project/project.model";
import { ok, notFound, serverError, ApiResponse } from "@/types/api-helpers";
import { NextRequest, NextResponse } from "next/server";

type Params = { params: Promise<{ id: string }> };

// GET /api/projects/[id] - Get single project
export const GET = async (
  request: NextRequest,
  { params }: Params
): Promise<NextResponse<ApiResponse<IProject>>> => {
  try {
    const { id } = await params;
    const controller = rootContainer.resolve(ProjectController);
    const project = await controller.getById(id);

    if (!project) {
      return notFound("Project not found");
    }

    return ok(project);
  } catch (error) {
    console.error("Error fetching project:", error);
    return serverError("Failed to fetch project");
  }
};

// PUT /api/projects/[id] - Update project
export const PUT = async (
  request: NextRequest,
  { params }: Params
): Promise<NextResponse<ApiResponse<IProject>>> => {
  try {
    const { id } = await params;
    const body = await request.json();
    const controller = rootContainer.resolve(ProjectController);
    const project = await controller.update(id, body);

    if (!project) {
      return notFound("Project not found");
    }

    return ok(project);
  } catch (error) {
    console.error("Error updating project:", error);
    return serverError("Failed to update project");
  }
};

// DELETE /api/projects/[id] - Delete project
export const DELETE = async (
  request: NextRequest,
  { params }: Params
): Promise<NextResponse<ApiResponse<IProject>>> => {
  try {
    const { id } = await params;
    const controller = rootContainer.resolve(ProjectController);
    const project = await controller.delete(id);

    if (!project) {
      return notFound("Project not found");
    }

    return ok(project);
  } catch (error) {
    console.error("Error deleting project:", error);
    return serverError("Failed to delete project");
  }
};
