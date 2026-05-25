import { NextFunction, Request, Response } from "express";
import path from "path";
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

    const htmlContent = `
      <div style="background-color: #050505; color: #ffffff; font-family: monospace; padding: 40px 20px; line-height: 1.6;">
        <div style="max-w: 600px; margin: 0 auto; background-color: #0a0a0a; border: 1px solid rgba(255,255,255,0.1); padding: 40px;">
          
          <div style="text-align: center; margin-bottom: 40px;">
            <h1 style="color: #f59e0b; letter-spacing: 0.3em; margin: 0; font-size: 14px;">ICONIC</h1>
            <p style="color: #666; font-size: 10px; letter-spacing: 0.2em; text-transform: uppercase; margin-top: 10px;">The Archives</p>
          </div>

          <h2 style="font-family: serif; font-size: 28px; font-weight: normal; margin-bottom: 20px; text-align: center; letter-spacing: 0.1em; color: #ffffff;">
            Welcome to the Syndicate.
          </h2>
          
          <p style="color: #ccc; text-align: center; margin-bottom: 40px; font-size: 13px; line-height: 1.8;">
            You have successfully secured private access to the world's most exclusive historical artifacts. 
            As a member of the Syndicate, you will receive highly confidential updates, editorial pieces, and 
            first-right-of-refusal for newly acquired catalog entries before they are made available to the public.
          </p>

          <div style="border-top: 1px solid rgba(255,255,255,0.1); padding-top: 40px; margin-top: 40px;">
            <h3 style="color: #f59e0b; font-size: 12px; letter-spacing: 0.2em; text-transform: uppercase; margin-bottom: 25px; text-align: center; font-weight: normal;">
              A Glimpse into Royalty
            </h3>
            <p style="color: #888; text-align: center; font-size: 11px; margin-bottom: 30px;">
              Our Royal Collection represents the pinnacle of human craftsmanship and historical weight.
            </p>

            <div style="text-align: center; font-size: 0;">
              <!--[if mso]>
              <table role="presentation" width="100%" style="border-collapse: collapse;">
              <tr>
              <td width="50%" valign="top" style="padding: 10px;">
              <![endif]-->
              <div style="display: inline-block; width: 100%; max-width: 240px; vertical-align: top; font-size: 12px; padding: 10px; box-sizing: border-box; text-align: center;">
                <img src="cid:tiara@iconic.com" alt="Royal Crown" style="width: 100%; max-width: 220px; border: 1px solid rgba(255,255,255,0.1); padding: 5px; background: #030303;" />
                <p style="color: #aaa; font-size: 10px; margin-top: 10px; text-transform: uppercase; letter-spacing: 0.1em;">Imperial Diadem</p>
              </div>
              <!--[if mso]>
              </td>
              <td width="50%" valign="top" style="padding: 10px;">
              <![endif]-->
              <div style="display: inline-block; width: 100%; max-width: 240px; vertical-align: top; font-size: 12px; padding: 10px; box-sizing: border-box; text-align: center;">
                <img src="cid:ring@iconic.com" alt="Sapphire Ring" style="width: 100%; max-width: 220px; border: 1px solid rgba(255,255,255,0.1); padding: 5px; background: #030303;" />
                <p style="color: #aaa; font-size: 10px; margin-top: 10px; text-transform: uppercase; letter-spacing: 0.1em;">Royal Sapphire</p>
              </div>
              <!--[if mso]>
              </td>
              </tr>
              </table>
              <![endif]-->
            </div>
          </div>

          <div style="text-align: center; margin-top: 60px; border-top: 1px solid rgba(255,255,255,0.1); padding-top: 30px;">
             <a href="http://localhost:3000/collection" style="display: inline-block; background: #f59e0b; color: #000; text-decoration: none; padding: 15px 30px; font-size: 12px; font-weight: bold; letter-spacing: 0.2em; text-transform: uppercase;">EXPLORE THE ARCHIVES</a>
          </div>

          <div style="text-align: center; margin-top: 60px;">
            <p style="color: #444; font-size: 10px; text-transform: uppercase; letter-spacing: 0.1em;">
              ICONIC Secure Vault HQ | Geneva, Switzerland<br/><br/>
              This is an automated encrypted message. Do not reply.
            </p>
          </div>

        </div>
      </div>
    `;

    const imagesDir = "/Users/davidfonseca7/iconic/iconic-store/public/images";
    await sendMailIfConfigured({
      to: email,
      subject: "Welcome to the Syndicate | ICONIC Archives",
      html: htmlContent,
      attachments: [
        {
          filename: "tiara.png",
          path: path.join(imagesDir, "princess-diana-diamond-tiara-1991.png"),
          cid: "tiara@iconic.com"
        },
        {
          filename: "ring.png",
          path: path.join(imagesDir, "princess-diana-sapphire-ring-1981.png"),
          cid: "ring@iconic.com"
        }
      ]
    });

    res.status(200).json({ success: true });
  } catch (error) {
    next(error);
  }
};
