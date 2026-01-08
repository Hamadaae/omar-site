import { rootContainer } from "@/backend/config/container";
import { ProjectController } from "@/backend/features/project/project.controller";
import { IProject } from "@/backend/features/project/project.model";
import { ok, created, serverError, ApiResponse } from "@/types/api-helpers";
import { NextRequest, NextResponse } from "next/server";

// GET /api/projects - List all projects
export const GET = async (): Promise<NextResponse<ApiResponse<IProject[]>>> => {
  try {
    const controller = rootContainer.resolve(ProjectController);
    const projects = await controller.getAll();
    return ok(projects);
  } catch (error) {
    console.error("Error fetching projects:", error);
    return serverError("Failed to fetch projects");
  }
};

// POST /api/projects - Create new project
export const POST = async (
  request: NextRequest
): Promise<NextResponse<ApiResponse<IProject>>> => {
  try {
    const body = await request.json();
    const controller = rootContainer.resolve(ProjectController);
    const project = await controller.create(body);
    return created(project);
  } catch (error) {
    console.error("Error creating project:", error);
    return serverError("Failed to create project");
  }
};
