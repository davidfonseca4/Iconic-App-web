import { Schema, model } from "mongoose";

export interface UserDocument {
  name: string;
  email: string;
  passwordHash: string;
  phone: string;
  role: "user" | "admin";
  createdAt: Date;
  updatedAt: Date;
}

const userSchema = new Schema<UserDocument>(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    passwordHash: { type: String, required: true },
    phone: { type: String, required: true, trim: true },
    role: { type: String, enum: ["user", "admin"], default: "user" }
  },
  {
    timestamps: true,
    collection: "users"
  }
);

export const UserModel = model<UserDocument>("User", userSchema);
