import { Document, model, models, Schema, Types } from "mongoose";

export interface IContactMessage extends Document {
  _id: Types.ObjectId;
  fullName: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
  isRead: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

const contactMessageSchema = new Schema<IContactMessage>(
  {
    fullName: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: false },
    subject: { type: String, required: true },
    message: { type: String, required: true },
    isRead: { type: Boolean, default: false },
  },
  { timestamps: true }
);

contactMessageSchema.index({ createdAt: -1 });
contactMessageSchema.index({ isRead: 1 });

export const ContactMessageModel =
  models.ContactMessage ||
  model<IContactMessage>("ContactMessage", contactMessageSchema);
