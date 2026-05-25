import { NextFunction, Request, Response } from "express";
import { SubscriberModel } from "./subscribers.model";
import { createSubscriberSchema } from "./subscribers.validator";
import { sendMailIfConfigured } from "../../utils/mailer";

export const createSubscriber = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const payload = createSubscriberSchema.parse(req.body);
    const email = payload.email.toLowerCase();

    await SubscriberModel.updateOne(
      { email },
      { $setOnInsert: { email, source: "web" } },
      { upsert: true }
    );

    await sendMailIfConfigured({
      to: email,
      subject: "Welcome to the Syndicate | ICONIC Archives",
      html: `<p>Welcome to the Syndicate. You now have private access to exclusive ICONIC updates.</p>`
    });

    res.status(200).json({ success: true });
  } catch (error) {
    next(error);
  }
};
