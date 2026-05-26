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

    const itemsHtml = payload.items.map((item) => `
      <tr>
        <td style="padding: 15px 0; border-bottom: 1px solid rgba(255,255,255,0.1);">
          <strong style="font-family: serif; font-size: 16px; color: #ffffff;">${item.name}</strong><br/>
          <span style="color: #666; font-size: 12px; text-transform: uppercase;">Registry #${item.id.toString().padStart(4, '0')}</span>
        </td>
        <td style="padding: 15px 0; text-align: right; border-bottom: 1px solid rgba(255,255,255,0.1); color: #f59e0b;">
          ${new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR' }).format(item.price)}
        </td>
      </tr>
    `).join('');

    const htmlContent = `
      <div style="background-color: #050505; color: #ffffff; font-family: monospace; padding: 40px 20px; line-height: 1.6;">
        <div style="max-w: 600px; margin: 0 auto; background-color: #0a0a0a; border: 1px solid rgba(255,255,255,0.1); padding: 40px;">
          
          <div style="text-align: center; margin-bottom: 40px;">
            <h1 style="color: #f59e0b; letter-spacing: 0.3em; margin: 0; font-size: 14px;">ICONIC</h1>
            <p style="color: #666; font-size: 10px; letter-spacing: 0.2em; text-transform: uppercase; margin-top: 10px;">The Archives</p>
          </div>

          <h2 style="font-family: serif; font-size: 24px; font-weight: normal; margin-bottom: 20px; text-align: center; color: #ffffff;">Acquisition Request Secured</h2>
          
          <p style="color: #aaa; text-align: center; margin-bottom: 40px; font-size: 12px; line-height: 1.8;">
            Dear ${payload.firstName || 'Collector'},<br/><br/>
            Your request for the following artifacts has been received and securely logged in our system. Our concierge will contact you shortly to arrange your private viewing and finalization at the ICONIC Secure Vault in Geneva.
          </p>

          <table style="width: 100%; border-collapse: collapse; margin-bottom: 40px;">
            <thead>
              <tr>
                <th style="text-align: left; padding-bottom: 10px; border-bottom: 1px solid rgba(255,255,255,0.2); color: #f59e0b; font-size: 10px; letter-spacing: 0.2em; text-transform: uppercase;">Artifact</th>
                <th style="text-align: right; padding-bottom: 10px; border-bottom: 1px solid rgba(255,255,255,0.2); color: #f59e0b; font-size: 10px; letter-spacing: 0.2em; text-transform: uppercase;">Value</th>
              </tr>
            </thead>
            <tbody>
              ${itemsHtml}
            </tbody>
            <tfoot>
              <tr>
                <td style="padding-top: 20px; text-align: right; color: #aaa; font-size: 12px;">Total Value:</td>
                <td style="padding-top: 20px; text-align: right; color: #f59e0b; font-size: 16px;">
                  ${new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR' }).format(payload.total)}
                </td>
              </tr>
            </tfoot>
          </table>

          <div style="border-top: 1px solid rgba(255,255,255,0.1); padding-top: 40px; margin-top: 40px; text-align: left; font-size: 0;">
            <!--[if mso]>
            <table role="presentation" width="100%" style="border-collapse: collapse;">
            <tr>
            <td width="50%" valign="top" style="padding-right: 20px;">
            <![endif]-->
            <div style="display: inline-block; width: 100%; max-width: 250px; vertical-align: top; font-size: 12px; margin-bottom: 30px; box-sizing: border-box; padding-right: 10px;">
              <h3 style="color: #f59e0b; font-size: 10px; letter-spacing: 0.2em; text-transform: uppercase; margin-bottom: 20px; font-weight: normal; margin-top: 0;">Collection Center</h3>
              <p style="color: #ccc; font-size: 12px; margin-bottom: 25px; line-height: 1.8;">
                Due to the immense value and security risks associated with transit, this transaction must be finalized in person. Our concierge will contact you shortly to schedule your private viewing and handover.
              </p>
              <div style="border-left: 1px solid #f59e0b; padding-left: 15px;">
                <p style="color: #fff; font-size: 12px; margin: 0 0 8px 0;">ICONIC Secure Vault HQ</p>
                <p style="color: #888; font-size: 12px; margin: 0 0 8px 0;">1254 Rue de la Paix</p>
                <p style="color: #888; font-size: 12px; margin: 0;">Geneva, Switzerland, 1204</p>
              </div>
            </div>
            <!--[if mso]>
            </td>
            <td width="50%" valign="top" style="padding-left: 20px;">
            <![endif]-->
            <div style="display: inline-block; width: 100%; max-width: 250px; vertical-align: top; font-size: 12px; margin-bottom: 30px; box-sizing: border-box; padding-left: 10px;">
              <h3 style="color: #f59e0b; font-size: 10px; letter-spacing: 0.2em; text-transform: uppercase; margin-bottom: 20px; font-weight: normal; margin-top: 0;">Approved Payment Methods</h3>
              <p style="color: #ccc; font-size: 12px; margin-bottom: 25px; line-height: 1.8;">
                Payment is exclusively accepted on-site after artifact inspection. We accept high-limit credit cards and verified cryptographic transfers.
              </p>
              <div>
                <span style="display: inline-block; background: #fff; color: #1A1F71; font-family: sans-serif; font-weight: 900; font-style: italic; padding: 8px 12px; font-size: 14px; margin-right: 6px; margin-bottom: 6px; border-radius: 2px; vertical-align: middle;">VISA</span>
                <span style="display: inline-block; background: #fff; padding: 6px 12px; margin-right: 6px; margin-bottom: 6px; border-radius: 2px; vertical-align: middle; line-height: 1;">
                   <span style="font-size: 20px; letter-spacing: -6px; line-height: 1;">
                     <span style="color: #EB001B;">&#9679;</span><span style="color: #F79E1B;">&#9679;</span>
                   </span>
                </span>
                <span style="display: inline-block; background: #2671B9; color: #fff; font-family: sans-serif; font-weight: bold; padding: 8px 8px; font-size: 9px; line-height: 1.2; margin-right: 6px; margin-bottom: 6px; border-radius: 2px; text-transform: uppercase; vertical-align: middle;">Amex</span>
                <span style="display: inline-block; background: #000; border: 1px solid rgba(255,255,255,0.2); color: #fff; font-weight: bold; padding: 8px 12px; font-size: 10px; line-height: 1.3; margin-bottom: 6px; border-radius: 2px; letter-spacing: 0.1em; vertical-align: middle;">CRYPTO</span>
              </div>
            </div>
            <!--[if mso]>
            </td>
            </tr>
            </table>
            <![endif]-->
          </div>

          <div style="text-align: center; margin-top: 60px;">
            <p style="color: #444; font-size: 10px; text-transform: uppercase; letter-spacing: 0.1em;">
              This is an automated encrypted message. Do not reply.
            </p>
          </div>

        </div>
      </div>
    `;

    void sendMailIfConfigured({
      to: payload.email,
      subject: "ICONIC | Acquisition Request Secured",
      html: htmlContent
    });

    res.status(200).json({ success: true });
  } catch (error) {
    next(error);
  }
};
