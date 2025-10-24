import nodemailer, { type SendMailOptions } from "nodemailer"

export async function sendMail(
  options: SendMailOptions & { to: string; subject: string; text: string }
) {
  const host = process.env.SMTP_HOST!
  const port = Number(process.env.SMTP_PORT || 587)
  const user = process.env.SMTP_USER!
  const pass = process.env.SMTP_PASS!
  const secure = port === 465

  if (!host || !user || !pass) {
    throw new Error("SMTP configuration is missing. Please set SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS.")
  }

  const transporter = nodemailer.createTransport({ host, port, secure, auth: { user, pass } })
  const from = process.env.SMTP_FROM || user

  return transporter.sendMail({ from, ...options })
}


