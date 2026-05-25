import { Schema, model } from "mongoose";

export interface VaultInquiryDocument {
  name: string;
  email: string;
  phone: string;
  intent: string;
  item: string;
  status: "pending" | "reviewed" | "approved" | "rejected";
  createdAt: Date;
  updatedAt: Date;
}

const vaultInquirySchema = new Schema<VaultInquiryDocument>(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, lowercase: true, trim: true },
    phone: { type: String, required: true, trim: true },
    intent: { type: String, required: true, trim: true },
    item: { type: String, required: true, trim: true },
    status: { type: String, enum: ["pending", "reviewed", "approved", "rejected"], default: "pending" }
  },
  {
    timestamps: true,
    collection: "vault_inquiries"
  }
);

export const VaultInquiryModel = model<VaultInquiryDocument>("VaultInquiry", vaultInquirySchema);
