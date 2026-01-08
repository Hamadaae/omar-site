import { Document, model, models, Schema, Types } from "mongoose";

export interface IProject extends Document {
  _id: Types.ObjectId;
  title: string;
  period: string;
  description: string;
  technologies: string[];
  createdAt?: Date;
  updatedAt?: Date;
}

const projectSchema = new Schema<IProject>(
  {
    title: { type: String, required: true },
    period: { type: String, required: true },
    description: { type: String, required: true },
    technologies: { type: [String], default: [] },
  },
  { timestamps: true }
);

projectSchema.index({ createdAt: -1 });

export const ProjectModel =
  models.Project || model<IProject>("Project", projectSchema);
