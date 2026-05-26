import { NextFunction, Request, Response } from "express";
import path from "path";
import { sendMailIfConfigured } from "../../utils/mailer";
import { VaultInquiryModel } from "./vaultInquiries.model";
import { createVaultInquirySchema } from "./vaultInquiries.validator";
import { staticProducts } from "../products/products.data";

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

    // Dynamically look up the matching product in the database to find its image
    const product = staticProducts.find(
      (p) => p.name.toLowerCase() === payload.item.toLowerCase() || payload.item.toLowerCase().includes(p.name.toLowerCase())
    );

    const attachments: Array<{ filename: string; path: string; cid: string }> = [];
    let imageTagHtml = "";

    if (product && product.images && product.images.length > 0) {
      const imagePath = path.join("/Users/davidfonseca7/iconic/iconic-store/public", product.images[0]);
      attachments.push({
        filename: "product.png",
        path: imagePath,
        cid: "product@iconic.com"
      });

      imageTagHtml = `
        <div style="text-align: center; margin-top: 30px; margin-bottom: 30px;">
          <img src="cid:product@iconic.com" alt="${product.name}" style="width: 100%; max-width: 320px; border: 1px solid rgba(255,255,255,0.1); padding: 8px; background: #030303;" />
          <p style="color: #aaa; font-size: 10px; margin-top: 10px; text-transform: uppercase; letter-spacing: 0.15em;">${product.name}</p>
        </div>
      `;
    }

    const htmlContent = `
      <div style="background-color: #050505; color: #ffffff; font-family: monospace; padding: 40px 20px; line-height: 1.6;">
        <div style="max-w: 600px; margin: 0 auto; background-color: #0a0a0a; border: 1px solid rgba(255,255,255,0.1); padding: 40px;">
          
          <div style="text-align: center; margin-bottom: 40px;">
            <h1 style="color: #f59e0b; letter-spacing: 0.3em; margin: 0; font-size: 14px;">ICONIC</h1>
            <p style="color: #666; font-size: 10px; letter-spacing: 0.2em; text-transform: uppercase; margin-top: 10px;">The Vault</p>
          </div>

          <h2 style="font-family: serif; font-size: 24px; font-weight: normal; margin-bottom: 20px; text-align: center; letter-spacing: 0.1em; color: #ffffff;">
            Acquisition Request Received
          </h2>
          
          <div style="border-top: 1px solid rgba(255,255,255,0.1); padding-top: 30px; margin-top: 30px; margin-bottom: 30px;">
            <p style="color: #ccc; text-align: left; font-size: 13px; line-height: 1.8;">
              Estimado/a ${payload.name},
            </p>
            <p style="color: #ccc; text-align: left; font-size: 13px; line-height: 1.8; margin-top: 20px;">
              Tu registro de intención de compra del producto <strong>${payload.item}</strong> perteneciente a la colección The Vault ha sido recibido. 
            </p>
            <p style="color: #ccc; text-align: left; font-size: 13px; line-height: 1.8; margin-top: 20px;">
              Realizaremos un análisis exhaustivo de tu perfil y la información proporcionada. En breve te comunicaremos directamente si eres candidato para adquirir esta pieza histórica de nuestra colección.
            </p>
          </div>

          ${imageTagHtml}

          <div style="background-color: #030303; border: 1px solid rgba(255,255,255,0.05); padding: 20px; text-align: left;">
            <p style="color: #f59e0b; font-size: 10px; text-transform: uppercase; letter-spacing: 0.2em; margin-bottom: 10px;">Inquiry Details:</p>
            <p style="color: #888; font-size: 11px; margin: 5px 0;"><strong>Artifact:</strong> ${payload.item}</p>
            <p style="color: #888; font-size: 11px; margin: 5px 0;"><strong>Name:</strong> ${payload.name}</p>
            <p style="color: #888; font-size: 11px; margin: 5px 0;"><strong>Phone:</strong> ${payload.phone}</p>
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

    void sendMailIfConfigured({
      to: payload.email,
      subject: `Vault Inquiry Received: ${payload.item}`,
      html: htmlContent,
      attachments
    });

    res.status(200).json({ success: true });
  } catch (error) {
    next(error);
  }
};
