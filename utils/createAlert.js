import nodemailer from "nodemailer"
import path from "node:path"

const __dirname = import.meta.dirname
const dataPath = path.join(__dirname, '../data/invtRec.json')

export async function createAlert(invstData) {

  try {
    const transporter = nodemailer.createTransport({
          host: 'smtp.ethereal.email',
          port: 587,
          secure: false, 
          auth: {
            user: 'piper44@ethereal.email', 
            pass: 'h3dGCTtvp4NjkCC6Pv'
          },
          connectionTimeout: 3000, 
          greetingTimeout: 3000
        });

        const mailOptions = {
          from: '"GoldDigger App" <no-reply@golddigger.com>',
          to: invstData.userEmail,
          subject: '📊 GoldDigger Investment Report',
          text: `Thanks for using GoldDigger, you bought oz ${invstData.ozBought} of gold for ${invstData.invest}`,
          html: `<h3> Investment Receipt</h3><p>Thanks for buying <b>${invstData.ozBought} oz</b> of gold for <b>${invstData.invest}</b> on <b>GoldDigger</b></p>`,
          attachments: [{ filename: 'invstData-Report.json', path: dataPath }]
        }

        const info = await transporter.sendMail(mailOptions)
        console.log(`✅ Success! Email captured by Ethereal.`);
        console.log(`🔗 Preview Sent Email: ${nodemailer.getTestMessageUrl(info)}`);
  } catch (mailError) {
        console.error("⚠️ Emitter Mail Delivery Failure:", mailError.message)
    }
}