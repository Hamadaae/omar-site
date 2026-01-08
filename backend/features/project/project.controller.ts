import { inject, injectable } from "tsyringe";
import type { IProjectService } from "./project.service";
import { IProject } from "./project.model";

@injectable()
export class ProjectController {
  constructor(
    @inject("IProjectService")
    private readonly projectService: IProjectService
  ) {}

  async getAll(): Promise<IProject[]> {
    return this.projectService.getAll();
  }

  async getById(id: string): Promise<IProject | null> {
    return this.projectService.getById(id);
  }

  async create(data: Partial<IProject>): Promise<IProject> {
    return this.projectService.create(data);
  }

  async update(id: string, data: Partial<IProject>): Promise<IProject | null> {
    return this.projectService.update(id, data);
  }

  async delete(id: string): Promise<IProject | null> {
    return this.projectService.delete(id);
  }
}

export default ProjectController;
