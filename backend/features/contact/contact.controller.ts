import { inject, injectable } from "tsyringe";
import type { IContactService } from "./contact.service";
import { IContactMessage } from "./contact.model";

@injectable()
export class ContactController {
  constructor(
    @inject("IContactService")
    private readonly contactService: IContactService
  ) {}

  async getAll(): Promise<IContactMessage[]> {
    return this.contactService.getAll();
  }

  async getById(id: string): Promise<IContactMessage | null> {
    return this.contactService.getById(id);
  }

  async create(data: Partial<IContactMessage>): Promise<IContactMessage> {
    return this.contactService.create(data);
  }

  async markAsRead(id: string): Promise<IContactMessage | null> {
    return this.contactService.markAsRead(id);
  }

  async delete(id: string): Promise<IContactMessage | null> {
    return this.contactService.delete(id);
  }

  async getUnreadCount(): Promise<number> {
    return this.contactService.getUnreadCount();
  }
}

export default ContactController;
