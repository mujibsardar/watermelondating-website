import { NextResponse } from "next/server"
import { sendMail } from "@/lib/mailer"

export const runtime = "nodejs"

async function parseBody(req: Request): Promise<Record<string, any>> {
  const ct = req.headers.get("content-type") || ""
  if (ct.includes("application/json")) {
    try {
      return (await req.json()) as Record<string, any>
    } catch {
      return {}
    }
  }
  if (ct.includes("application/x-www-form-urlencoded") || ct.includes("multipart/form-data")) {
    const fd = await req.formData()
    const obj: Record<string, any> = {}
    fd.forEach((v, k) => {
      obj[k] = v
    })
    return obj
  }
  return {}
}

export async function POST(req: Request) {
  try {
    const body = await parseBody(req)
    const name = String(body.name || "")
    const email = String(body.email || "")
    const phone = String(body.phone || "")

    // For multipart/form-data, resume will be a File in the parsed body
    const resume = body.resume as File | null

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
        contentType: (resume as any).type || undefined,
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


