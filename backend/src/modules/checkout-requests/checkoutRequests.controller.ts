import { NextFunction, Request, Response } from "express";
import { sendMailIfConfigured } from "../../utils/mailer";
import { CheckoutRequestModel } from "./checkoutRequests.model";
import { createCheckoutRequestSchema } from "./checkoutRequests.validator";

export const createCheckoutRequest = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const payload = createCheckoutRequestSchema.parse(req.body);

    await CheckoutRequestModel.create({
      firstName: payload.firstName,
      lastName: payload.lastName,
      email: payload.email.toLowerCase(),
      phone: payload.phone,
      items: payload.items,
      total: payload.total,
      status: "pending"
    });

    await sendMailIfConfigured({
      to: payload.email,
      subject: "ICONIC | Acquisition Request Secured",
      html: `<p>Dear ${payload.firstName}, your acquisition request has been received. Our concierge will contact you shortly.</p>`
    });

    res.status(200).json({ success: true });
  } catch (error) {
    next(error);
  }
};
