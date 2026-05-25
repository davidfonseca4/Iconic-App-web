import { Schema, model } from "mongoose";

export interface SubscriberDocument {
  email: string;
  source: string;
  createdAt: Date;
  updatedAt: Date;
}

const subscriberSchema = new Schema<SubscriberDocument>(
  {
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    source: { type: String, default: "web" }
  },
  {
    timestamps: true,
    collection: "subscribers"
  }
);

export const SubscriberModel = model<SubscriberDocument>("Subscriber", subscriberSchema);
