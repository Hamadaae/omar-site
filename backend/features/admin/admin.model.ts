import { Document, model, models, Schema, Types } from "mongoose";
import bcrypt from "bcrypt";

export interface IAdmin extends Document {
  _id: Types.ObjectId;
  username: string;
  password: string;
  createdAt?: Date;
  updatedAt?: Date;
  comparePassword(candidatePassword: string): Promise<boolean>;
}

const adminSchema = new Schema<IAdmin>(
  {
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true, select: false },
  },
  { timestamps: true }
);

// Hash password before saving
adminSchema.pre<IAdmin>("save", function (): Promise<void> | undefined {
  if (!this.isModified("password")) return;

  return bcrypt.hash(this.password, 10).then((hashedPassword) => {
    this.password = hashedPassword;
  });
});

// Compare password method
adminSchema.methods.comparePassword = async function (
  candidatePassword: string
): Promise<boolean> {
  return await bcrypt.compare(candidatePassword, this.password);
};

export const AdminModel = models.Admin || model<IAdmin>("Admin", adminSchema);
