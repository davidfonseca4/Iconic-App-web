import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, phone, item } = body;

    if (!name || !email || !item) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.SMTP_EMAIL,
        pass: process.env.SMTP_PASSWORD,
      },
    });

    const htmlContent = `
      <div style="background-color: #050505; color: #ffffff; font-family: monospace; padding: 40px 20px; line-height: 1.6;">
        <div style="max-w-[600px] margin: 0 auto; background-color: #0a0a0a; border: 1px solid rgba(255,255,255,0.1); padding: 40px;">
          
          <div style="text-align: center; margin-bottom: 40px;">
            <h1 style="color: #f59e0b; letter-spacing: 0.3em; margin: 0; font-size: 14px;">ICONIC</h1>
            <p style="color: #666; font-size: 10px; letter-spacing: 0.2em; text-transform: uppercase; margin-top: 10px;">The Vault</p>
          </div>

          <h2 style="font-family: serif; font-size: 24px; font-weight: normal; margin-bottom: 20px; text-align: center; letter-spacing: 0.1em; color: #fff;">
            Acquisition Request Received
          </h2>
          
          <div style="border-top: 1px solid rgba(255,255,255,0.1); padding-top: 30px; margin-top: 30px; margin-bottom: 30px;">
            <p style="color: #ccc; text-align: left; font-size: 13px; line-height: 1.8;">
              Estimado/a ${name},
            </p>
            <p style="color: #ccc; text-align: left; font-size: 13px; line-height: 1.8; margin-top: 20px;">
              Tu registro de intención de compra del producto <strong>${item}</strong> perteneciente a la colección The Vault ha sido recibida. 
            </p>
            <p style="color: #ccc; text-align: left; font-size: 13px; line-height: 1.8; margin-top: 20px;">
              Realizaremos un análisis exhaustivo de tu perfil y la información proporcionada. En breve te comunicaremos directamente si eres candidato para adquirir esta pieza histórica de nuestra colección.
            </p>
          </div>

          <div style="background-color: #030303; border: 1px solid rgba(255,255,255,0.05); padding: 20px; text-align: left;">
            <p style="color: #f59e0b; font-size: 10px; text-transform: uppercase; letter-spacing: 0.2em; margin-bottom: 10px;">Inquiry Details:</p>
            <p style="color: #888; font-size: 11px; margin: 5px 0;"><strong>Artifact:</strong> ${item}</p>
            <p style="color: #888; font-size: 11px; margin: 5px 0;"><strong>Name:</strong> ${name}</p>
            <p style="color: #888; font-size: 11px; margin: 5px 0;"><strong>Phone:</strong> ${phone}</p>
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

    const info = await transporter.sendMail({
      from: `"ICONIC Vault" <${process.env.SMTP_EMAIL}>`,
      to: email,
      subject: `Vault Inquiry Received: ${item}`,
      html: htmlContent,
    });

    console.log("Vault inquiry email sent successfully:", info.messageId);

    // Additionally, you could send a notification to the admin/concierge email here
    // with the user's details and "intent" statement.

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error processing vault inquiry:", error);
    return NextResponse.json({ error: 'Failed to process inquiry' }, { status: 500 });
  }
}
