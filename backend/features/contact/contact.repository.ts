import { injectable } from "tsyringe";
import { IContactMessage, ContactMessageModel } from "./contact.model";
import { DBInstance } from "@/backend/config/dbConnect";

export interface IContactRepository {
  getAll(): Promise<IContactMessage[]>;
  getById(id: string): Promise<IContactMessage | null>;
  create(data: Partial<IContactMessage>): Promise<IContactMessage>;
  markAsRead(id: string): Promise<IContactMessage | null>;
  delete(id: string): Promise<IContactMessage | null>;
  getUnreadCount(): Promise<number>;
}

@injectable()
export class ContactRepository implements IContactRepository {
  async getAll(): Promise<IContactMessage[]> {
    await DBInstance.getConnection();
    return ContactMessageModel.find().sort({ createdAt: -1 }).lean();
  }

  async getById(id: string): Promise<IContactMessage | null> {
    await DBInstance.getConnection();
    return ContactMessageModel.findById(id).lean();
  }

  async create(data: Partial<IContactMessage>): Promise<IContactMessage> {
    await DBInstance.getConnection();
    const message = new ContactMessageModel(data);
    return message.save();
  }

  async markAsRead(id: string): Promise<IContactMessage | null> {
    await DBInstance.getConnection();
    return ContactMessageModel.findByIdAndUpdate(
      id,
      { isRead: true },
      { new: true }
    ).lean();
  }

  async delete(id: string): Promise<IContactMessage | null> {
    await DBInstance.getConnection();
    return ContactMessageModel.findByIdAndDelete(id).lean();
  }

  async getUnreadCount(): Promise<number> {
    await DBInstance.getConnection();
    return ContactMessageModel.countDocuments({ isRead: false });
  }
}
