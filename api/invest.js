import { Resend } from 'resend';
import "dotenv/config";

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ status: 'Error', message: 'Method Not Allowed' });
  }

  try {
    const resend = new Resend(process.env.RESEND_API_KEY);
    let body = '';
    for await (const chunk of req) {
      body += chunk;
    }
    const invstData = JSON.parse(body);
    
    const recipient = invstData.userEmail;
    console.log(`✉️ Pushing live report to user web portal: ${recipient}...`);

    invstData.timeStamp = new Date().toISOString();
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
        return res.status(400).json({ status: 'Error', message: error.message });
    }

    console.log(`✅ SUCCESS! Real email delivered straight to the user's inbox! ID: ${data.id}`);
    
    return res.status(200).json({ 
        status: 'Success', 
        message: 'Receipt dispatched successfully!' 
    });

  } catch (mailError) {
        console.error("💥 Network Transmission Failure:", mailError.message);
        return res.status(500).json({ status: 'Error', message: mailError.message });
    }
}
