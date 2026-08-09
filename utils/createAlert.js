import { Resend } from 'resend';
import path from "node:path";
import fs from "node:fs/promises";
import "dotenv/config";

const __dirname = import.meta.dirname;
const dataPath = path.join(__dirname, '../data/invtRec.json');

const resend = new Resend(process.env.RESEND_API_KEY); 

export async function createAlert(invstData) {
  try {
    const recipient = invstData.userEmail || 'babalolasamuel323@gmail.com';
    console.log(`✉️ Pushing live report to user web portal: ${recipient}...`);

    const singleReceiptBuffer = Buffer.from(JSON.stringify(invstData, null, 2), 'utf8');

    const { data, error } = await resend.emails.send({
      from: 'GoldDigger App <onboarding@resend.dev>', 
      to: recipient,                        
      subject: '📊 GoldDigger Investment Report',
      html: `
        <h3>🚀 Investment Receipt</h3>
        <p>Thanks for buying <b>${invstData.ozBought || 0} oz</b> of gold for <b>${invstData.invest || 0}</b> on <b>GoldDigger</b>.</p>
      `,
      attachments: [
        {
          filename: 'invstData-Report.json',
          content: singleReceiptBuffer 
        }
      ]
    });

    if (error) {
        console.error("❌ Resend API Refused Delivery:", error);
        return;
    }

    console.log(`✅ SUCCESS! Real email delivered straight to the user's inbox! ID: ${data.id}`);

  } catch (mailError) {
        console.error("💥 Network Transmission Failure:", mailError.message);
    }
}
