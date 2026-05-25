import { NextFunction, Request, Response } from "express";
import { sendMailIfConfigured } from "../../utils/mailer";
import { VaultInquiryModel } from "./vaultInquiries.model";
import { createVaultInquirySchema } from "./vaultInquiries.validator";

export const createVaultInquiry = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const payload = createVaultInquirySchema.parse(req.body);

    await VaultInquiryModel.create({
      name: payload.name,
      email: payload.email.toLowerCase(),
      phone: payload.phone,
      intent: payload.intent,
      item: payload.item,
      status: "pending"
    });

    await sendMailIfConfigured({
      to: payload.email,
      subject: `Vault Inquiry Received: ${payload.item}`,
      html: `<p>Estimado/a ${payload.name}, recibimos tu solicitud para <strong>${payload.item}</strong>. Nuestro equipo te contactara pronto.</p>`
    });

    res.status(200).json({ success: true });
  } catch (error) {
    next(error);
  }
};
