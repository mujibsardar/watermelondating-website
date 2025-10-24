import { NextResponse } from "next/server"
import { sendMail } from "@/lib/mailer"

export const runtime = "nodejs"

export async function POST(req: Request) {
  try {
    const formData = await req.formData()
    const name = String(formData.get("name") || "")
    const email = String(formData.get("email") || "")
    const phone = String(formData.get("phone") || "")
    const resume = formData.get("resume") as File | null

    if (!name || !email || !resume) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    const subject = `Talent application: ${name}`
    const text = `New talent application\n\nName: ${name}\nEmail: ${email}\nPhone: ${phone}`

    const attachments = [] as Array<{ filename: string; content: Buffer; contentType?: string }>
    if (resume) {
      const arrayBuffer = await resume.arrayBuffer()
      attachments.push({
        filename: resume.name,
        content: Buffer.from(arrayBuffer),
        contentType: resume.type || undefined,
      })
    }

    await sendMail({
      to: "admin@watermelondating.com",
      subject,
      text,
      attachments,
    })

    return NextResponse.json({ ok: true })
  } catch (err) {
    console.error("/api/talent error", err)
    return NextResponse.json({ error: "Internal error" }, { status: 500 })
  }
}


