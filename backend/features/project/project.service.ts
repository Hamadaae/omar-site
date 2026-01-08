import { inject, injectable } from "tsyringe";
import type { IProjectRepository } from "./project.repository";
import { IProject } from "./project.model";

export interface IProjectService {
  getAll(): Promise<IProject[]>;
  getById(id: string): Promise<IProject | null>;
  create(data: Partial<IProject>): Promise<IProject>;
  update(id: string, data: Partial<IProject>): Promise<IProject | null>;
  delete(id: string): Promise<IProject | null>;
}

@injectable()
export class ProjectService implements IProjectService {
  constructor(
    @inject("IProjectRepository")
    private readonly projectRepository: IProjectRepository
  ) {}

  async getAll(): Promise<IProject[]> {
    return this.projectRepository.getAll();
  }

  async getById(id: string): Promise<IProject | null> {
    return this.projectRepository.getById(id);
  }

  async create(data: Partial<IProject>): Promise<IProject> {
    return this.projectRepository.create(data);
  }

  async update(id: string, data: Partial<IProject>): Promise<IProject | null> {
    return this.projectRepository.update(id, data);
  }

  async delete(id: string): Promise<IProject | null> {
    return this.projectRepository.delete(id);
  }
}
