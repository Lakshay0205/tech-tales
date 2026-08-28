import express from 'express'
import nodemailer from 'nodemailer'
import cors from 'cors'

const app = express()
app.use(express.json())
app.use(cors())

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT) || 587,
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
})

app.post('/contact', async (req, res) => {
  const { name, email, company, service, message } = req.body
  if (!name || !email || !message) return res.status(400).json({ error: 'Missing required fields' })

  try {
    await transporter.sendMail({
      from: `"Tech&Tales Contact" <${process.env.SMTP_USER}>`,
      to: process.env.FOUNDERS_EMAIL,
      replyTo: email,
      subject: `New inquiry from ${name}${company ? ` — ${company}` : ''}`,
      text: `Name: ${name}\nEmail: ${email}\nCompany: ${company || 'N/A'}\nService: ${service || 'N/A'}\n\nMessage:\n${message}`,
      html: `
        <div style="font-family:monospace;max-width:600px;background:#0A0A0F;color:#F0EDE6;padding:32px;border:1px solid #2A2A4A">
          <h2 style="color:#C9A84C;font-size:18px;margin-bottom:24px">New Inquiry — Tech&Tales</h2>
          <table style="width:100%;border-collapse:collapse">
            ${[['Name', name], ['Email', email], ['Company', company || 'N/A'], ['Service', service || 'N/A']].map(([k, v]) => `
              <tr>
                <td style="color:#6B6B8A;font-size:11px;letter-spacing:0.1em;text-transform:uppercase;padding:8px 0;width:100px">${k}</td>
                <td style="color:#F0EDE6;font-size:14px;padding:8px 0">${v}</td>
              </tr>
            `).join('')}
          </table>
          <div style="border-top:1px solid #2A2A4A;margin-top:24px;padding-top:24px">
            <p style="color:#6B6B8A;font-size:11px;letter-spacing:0.1em;text-transform:uppercase;margin-bottom:12px">Message</p>
            <p style="color:#F0EDE6;font-size:14px;line-height:1.6;white-space:pre-wrap">${message}</p>
          </div>
        </div>
      `,
    })
    res.json({ ok: true })
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Failed to send email' })
  }
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
