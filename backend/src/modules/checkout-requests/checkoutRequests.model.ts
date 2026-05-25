import { Schema, model } from "mongoose";

interface CheckoutItem {
  id: number;
  slug: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
}

export interface CheckoutRequestDocument {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  items: CheckoutItem[];
  total: number;
  status: "pending" | "reviewed" | "approved" | "rejected";
  createdAt: Date;
  updatedAt: Date;
}

const checkoutItemSchema = new Schema<CheckoutItem>(
  {
    id: { type: Number, required: true },
    slug: { type: String, required: true },
    name: { type: String, required: true },
    price: { type: Number, required: true },
    image: { type: String, required: true },
    quantity: { type: Number, required: true }
  },
  { _id: false }
);

const checkoutRequestSchema = new Schema<CheckoutRequestDocument>(
  {
    firstName: { type: String, required: true, trim: true },
    lastName: { type: String, required: true, trim: true },
    email: { type: String, required: true, lowercase: true, trim: true },
    phone: { type: String, required: true, trim: true },
    items: { type: [checkoutItemSchema], required: true },
    total: { type: Number, required: true },
    status: { type: String, enum: ["pending", "reviewed", "approved", "rejected"], default: "pending" }
  },
  {
    timestamps: true,
    collection: "checkout_requests"
  }
);

export const CheckoutRequestModel = model<CheckoutRequestDocument>("CheckoutRequest", checkoutRequestSchema);
