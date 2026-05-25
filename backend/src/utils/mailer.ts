import { env } from "../config/env";

const nodemailer = require("nodemailer") as {
  createTransport: (config: {
    service: string;
    auth: { user: string; pass: string };
  }) => {
    sendMail: (params: { from: string; to: string; subject: string; html: string }) => Promise<unknown>;
  };
};

const hasSmtpConfig = (): boolean => Boolean(env.smtp.email && env.smtp.password);

export const sendMailIfConfigured = async (params: {
  to: string;
  subject: string;
  html: string;
  attachments?: Array<{
    filename: string;
    path: string;
    cid: string;
  }>;
}): Promise<void> => {
  if (!hasSmtpConfig()) {
    return;
  }

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: env.smtp.email,
      pass: env.smtp.password
    }
  });

  try {
    await transporter.sendMail({
      from: `"ICONIC" <${env.smtp.email}>`,
      to: params.to,
      subject: params.subject,
      html: params.html,
      attachments: params.attachments
    });
  } catch (error) {
    console.error("SMTP Mailer Error (non-blocking):", error);
  }
};
