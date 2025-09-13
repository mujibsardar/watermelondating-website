import nodemailer, { Transporter } from "nodemailer"

let cachedTransporter: Transporter | null = null

function createTransporter(): Transporter {
  const host = process.env.SMTP_HOST
  const port = process.env.SMTP_PORT ? Number(process.env.SMTP_PORT) : 587
  const user = process.env.SMTP_USER
  const pass = process.env.SMTP_PASS

  if (!host || !user || !pass) {
    throw new Error("SMTP configuration is missing. Please set SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS.")
  }

  return nodemailer.createTransport({
    host,
    port,
    secure: port === 465,
    auth: { user, pass },
  })
}

export function getTransporter(): Transporter {
  if (!cachedTransporter) {
    cachedTransporter = createTransporter()
  }
  return cachedTransporter
}

export async function sendMail(options: {
  to: string
  subject: string
  text: string
  html?: string
  attachments?: Array<{ filename: string; content: Buffer; contentType?: string }>
}) {
  const transporter = getTransporter()

  const from = process.env.SMTP_FROM || "Watermelon Dating <no-reply@watermelondating.com>"

  return transporter.sendMail({
    from,
    ...options,
  })
}


