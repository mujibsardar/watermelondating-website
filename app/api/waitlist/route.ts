import { NextResponse } from "next/server"
import { sendMail } from "@/lib/mailer"

export const runtime = "nodejs"

async function parseBody(req: Request): Promise<Record<string, string>> {
  const ct = req.headers.get("content-type") || ""
  if (ct.includes("application/json")) {
    try {
      return (await req.json()) as Record<string, string>
    } catch {
      return {}
    }
  }
  if (ct.includes("application/x-www-form-urlencoded") || ct.includes("multipart/form-data")) {
    const fd = await req.formData()
    const obj: Record<string, string> = {}
    fd.forEach((v, k) => {
      if (typeof v === "string") obj[k] = v
    })
    return obj
  }
  return {}
}

export async function POST(req: Request) {
  try {
    const { name = "", email = "", phone = "" } = await parseBody(req)
    if (!email) return NextResponse.json({ error: "Missing email" }, { status: 400 })

    const ADMIN = process.env.ADMIN_EMAIL || "admin@watermelondating.com"

    await sendMail({
      to: ADMIN,
      subject: `Waitlist signup: ${name || email}`,
      text: `New waitlist signup\nName: ${name}\nEmail: ${email}\nPhone: ${phone}`,
      replyTo: email,
    } as any)

    console.log("/api/waitlist → sent to", ADMIN)

    return NextResponse.json({ ok: true })
  } catch (err) {
    console.error("/api/waitlist error", err)
    return NextResponse.json({ error: "Internal error" }, { status: 500 })
  }
}


