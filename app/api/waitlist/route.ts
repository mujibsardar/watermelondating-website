import { NextResponse } from "next/server"
import { sendMail } from "@/lib/mailer"

export async function POST(req: Request) {
  try {
    const formData = await req.formData()
    const name = String(formData.get("name") || "")
    const email = String(formData.get("email") || "")
    const phone = String(formData.get("phone") || "")

    if (!name || !email) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    const subject = `Waitlist signup: ${name}`
    const text = `New waitlist signup\n\nName: ${name}\nEmail: ${email}\nPhone: ${phone}`

    await sendMail({
      to: "admin@watermelondating.com",
      subject,
      text,
    })

    return NextResponse.json({ ok: true })
  } catch (err) {
    console.error("/api/waitlist error", err)
    return NextResponse.json({ error: "Internal error" }, { status: 500 })
  }
}


