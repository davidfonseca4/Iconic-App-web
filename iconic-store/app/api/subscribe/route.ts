import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request: Request) {
  try {
    const { email } = await request.json();

    if (!email) {
      return NextResponse.json({ error: 'Email is required' }, { status: 400 });
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
            <p style="color: #666; font-size: 10px; letter-spacing: 0.2em; text-transform: uppercase; margin-top: 10px;">The Archives</p>
          </div>

          <h2 style="font-family: serif; font-size: 28px; font-weight: normal; margin-bottom: 20px; text-align: center; letter-spacing: 0.1em;">
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

            <table style="width: 100%; border-collapse: collapse;">
              <tr>
                <td style="width: 50%; padding: 10px; text-align: center; vertical-align: top;">
                  <img src="cid:tiara@iconic.com" alt="Royal Crown" style="width: 100%; max-width: 250px; border: 1px solid rgba(255,255,255,0.1); padding: 5px; background: #030303;" />
                  <p style="color: #aaa; font-size: 10px; margin-top: 10px; text-transform: uppercase; letter-spacing: 0.1em;">Imperial Diadem</p>
                </td>
                <td style="width: 50%; padding: 10px; text-align: center; vertical-align: top;">
                  <img src="cid:ring@iconic.com" alt="Sapphire Ring" style="width: 100%; max-width: 250px; border: 1px solid rgba(255,255,255,0.1); padding: 5px; background: #030303;" />
                  <p style="color: #aaa; font-size: 10px; margin-top: 10px; text-transform: uppercase; letter-spacing: 0.1em;">Royal Sapphire</p>
                </td>
              </tr>
            </table>
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

    const info = await transporter.sendMail({
      from: `"ICONIC Syndicate" <${process.env.SMTP_EMAIL}>`,
      to: email,
      subject: "Welcome to the Syndicate | ICONIC Archives",
      html: htmlContent,
      attachments: [
        {
          filename: 'tiara.png',
          path: process.cwd() + '/public/images/princess-diana-diamond-tiara-1991.png',
          cid: 'tiara@iconic.com' // same cid value as in the html img src
        },
        {
          filename: 'ring.png',
          path: process.cwd() + '/public/images/princess-diana-sapphire-ring-1981.png',
          cid: 'ring@iconic.com' // same cid value as in the html img src
        }
      ]
    });

    console.log("Subscription email sent successfully:", info.messageId);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error sending subscription email:", error);
    return NextResponse.json({ error: 'Failed to process request' }, { status: 500 });
  }
}
