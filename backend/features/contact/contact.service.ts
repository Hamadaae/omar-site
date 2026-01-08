import { inject, injectable } from "tsyringe";
import type { IContactRepository } from "./contact.repository";
import { IContactMessage } from "./contact.model";

export interface IContactService {
  getAll(): Promise<IContactMessage[]>;
  getById(id: string): Promise<IContactMessage | null>;
  create(data: Partial<IContactMessage>): Promise<IContactMessage>;
  markAsRead(id: string): Promise<IContactMessage | null>;
  delete(id: string): Promise<IContactMessage | null>;
  getUnreadCount(): Promise<number>;
}

@injectable()
export class ContactService implements IContactService {
  constructor(
    @inject("IContactRepository")
    private readonly contactRepository: IContactRepository
  ) {}

  async getAll(): Promise<IContactMessage[]> {
    return this.contactRepository.getAll();
  }

  async getById(id: string): Promise<IContactMessage | null> {
    return this.contactRepository.getById(id);
  }

  async create(data: Partial<IContactMessage>): Promise<IContactMessage> {
    return this.contactRepository.create(data);
  }

  async markAsRead(id: string): Promise<IContactMessage | null> {
    return this.contactRepository.markAsRead(id);
  }

  async delete(id: string): Promise<IContactMessage | null> {
    return this.contactRepository.delete(id);
  }

  async getUnreadCount(): Promise<number> {
    return this.contactRepository.getUnreadCount();
  }
}
