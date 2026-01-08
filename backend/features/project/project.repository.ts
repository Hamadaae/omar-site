import { injectable } from "tsyringe";
import { IProject, ProjectModel } from "./project.model";
import { DBInstance } from "@/backend/config/dbConnect";

export interface IProjectRepository {
  getAll(): Promise<IProject[]>;
  getById(id: string): Promise<IProject | null>;
  create(data: Partial<IProject>): Promise<IProject>;
  update(id: string, data: Partial<IProject>): Promise<IProject | null>;
  delete(id: string): Promise<IProject | null>;
}

@injectable()
export class ProjectRepository implements IProjectRepository {
  async getAll(): Promise<IProject[]> {
    await DBInstance.getConnection();
    return ProjectModel.find().sort({ createdAt: -1 }).lean();
  }

  async getById(id: string): Promise<IProject | null> {
    await DBInstance.getConnection();
    return ProjectModel.findById(id).lean();
  }

  async create(data: Partial<IProject>): Promise<IProject> {
    await DBInstance.getConnection();
    const project = new ProjectModel(data);
    return project.save();
  }

  async update(id: string, data: Partial<IProject>): Promise<IProject | null> {
    await DBInstance.getConnection();
    return ProjectModel.findByIdAndUpdate(id, data, { new: true }).lean();
  }

  async delete(id: string): Promise<IProject | null> {
    await DBInstance.getConnection();
    return ProjectModel.findByIdAndDelete(id).lean();
  }
}
