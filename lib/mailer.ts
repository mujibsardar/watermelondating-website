import { Resend } from "resend"

const apiKey = process.env.RESEND_API_KEY!
if (!apiKey) {
  // Defer throwing until runtime to avoid build-time crash in some envs
  console.warn("[MAILER] RESEND_API_KEY not set; emails will fail at runtime")
}
const resend = apiKey ? new Resend(apiKey) : (null as unknown as Resend)
const FROM = process.env.EMAIL_FROM || "Watermelon Dating <onboarding@resend.dev>"

export async function sendMail(opts: {
  to: string | string[]
  subject: string
  text: string
  replyTo?: string
  attachments?: { filename: string; content: Buffer }[]
}) {
  const { to, subject, text, replyTo, attachments } = opts
  if (!resend) throw new Error("[MAILER] Missing RESEND_API_KEY")
  const result = await resend.emails.send({
    from: FROM,
    to: Array.isArray(to) ? to : [to],
    subject,
    text,
    reply_to: replyTo,
    attachments,
  })
  if ((result as any).error) {
    console.error("[MAILER] Resend error", (result as any).error)
    throw new Error((result as any).error?.message || "Email send failed")
  }
  return result
}


