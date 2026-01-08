import { rootContainer } from "@/backend/config/container";
import { ProjectController } from "@/backend/features/project/project.controller";
import { ok, serverError, ApiResponse } from "@/types/api-helpers";
import { NextResponse } from "next/server";

const seedProjects = [
  // Original static data from timeline
  {
    title: "Universal Contract M365 Admin Support",
    period: "Apr 2025 - Sep 2025",
    description:
      "A Microsoft 365 Cloud Administrator responsible for setting up, managing, and maintaining Microsoft 365 tenants for medium and growing businesses. Ensures a stable, well-configured Microsoft 365 environment that supports daily business operations without disruption.",
    technologies: [
      "Microsoft 365",
      "Azure AD",
      "Exchange Online",
      "SharePoint",
    ],
  },
  {
    title: "Universal Contract M365 Admin Support",
    period: "Feb 2025 - Apr 2025",
    description:
      "A security-focused Microsoft 365 specialist dedicated to protecting business environments through best-practice security and compliance configurations. Protects company data, users, and devices while ensuring compliance and reducing security risks.",
    technologies: ["Office 365", "Azure", "InTune", "Power Apps"],
  },
  {
    title: "Universal Contract M365 Admin Support",
    period: "Oct 2024 - Feb 2025",
    description:
      "A Microsoft 365 specialist focused on collaboration tools and device management to improve productivity and simplify IT operations. Improves team productivity while keeping devices and collaboration tools secure and easy to use.",
    technologies: ["Teams", "OneDrive", "Endpoint Manager"],
  },
  // 2 Extra projects
  {
    title: "Cloud Infrastructure Migration",
    period: "Jul 2024 - Oct 2024",
    description:
      "Led a comprehensive cloud migration project transitioning legacy on-premises infrastructure to Azure. Designed hybrid identity solutions with Azure AD Connect, implemented disaster recovery strategies, and optimized cloud costs by 40%.",
    technologies: ["Azure", "Terraform", "PowerShell", "Azure DevOps"],
  },
  {
    title: "Enterprise Security Assessment",
    period: "Mar 2024 - Jun 2024",
    description:
      "Conducted thorough security assessments for enterprise clients. Implemented Zero Trust architecture, configured Conditional Access policies, and deployed Microsoft Defender for Endpoint across organizations with 500+ users.",
    technologies: [
      "Microsoft Defender",
      "Sentinel",
      "Conditional Access",
      "Zero Trust",
    ],
  },
];

// GET /api/projects/seed - Seed projects table
export const GET = async (): Promise<
  NextResponse<ApiResponse<{ message: string; count: number }>>
> => {
  try {
    const controller = rootContainer.resolve(ProjectController);

    // Check if projects already exist
    const existingProjects = await controller.getAll();
    if (existingProjects.length > 0) {
      return ok({
        message: `Projects already seeded. Found ${existingProjects.length} existing projects.`,
        count: existingProjects.length,
      });
    }

    // Seed all projects
    let count = 0;
    for (const project of seedProjects) {
      await controller.create(project);
      count++;
    }

    return ok({
      message: `Successfully seeded ${count} projects!`,
      count,
    });
  } catch (error) {
    console.error("Error seeding projects:", error);
    return serverError("Failed to seed projects");
  }
};
