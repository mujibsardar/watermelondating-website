# Watermelon Dating Website

Next.js 14 marketing site with contact forms.

## What is Resend?

Resend is an email API for apps. It avoids SMTP authentication errors (like Gmail 535) and works reliably on serverless platforms like Vercel.

**Quick test**: Use `onboarding@resend.dev` (works out of the box).  
**Production**: Verify your domain and use `noreply@watermelondating.com`.

## Configure Resend on Vercel

1. Create account at [resend.com](https://resend.com) → API Keys → Create → copy `re_...`.

2. Vercel → Project → Settings → Environment Variables (Preview now, Production before merge):
   - `RESEND_API_KEY` = `re_...`
   - `EMAIL_FROM` = `"Watermelon Dating <onboarding@resend.dev>"`

3. Deployments → … → Redeploy.

4. Test:

   **Waitlist** (JSON):
   ```bash
   curl -H "Content-Type: application/json" \
     -d '{"email":"test@example.com","name":"Test"}' \
     https://<preview>.vercel.app/api/waitlist
   ```

   **Talent** (multipart):
   ```bash
   curl -i -X POST \
     -F "name=Test User" -F "email=test@example.com" \
     -F "phone=123-456-7890" \
     -F "resume=@/tmp/resume.pdf;type=application/pdf" \
     https://<preview>.vercel.app/api/talent
   ```

   Expect `200 {"ok":true}` and an email at `admin@watermelondating.com`.

## Rollback to Render (Quick Restore)

1. Namecheap DNS → set:
   - `www` → CNAME back to Render host.
   - `@` (apex) → ALIAS/A back to Render records.
2. Wait for DNS to take effect; confirm forms work on Render.
3. Keep Vercel project paused until we complete domain email setup.

## Finish Vercel Email (Resend, Production)

1. Resend → **Domains** → Add `watermelondating.com` → add the DKIM/SPF/Return-Path DNS they show.
2. When Verified:
   - Vercel ENV (Preview + Production):
     - `RESEND_API_KEY = re_...`
     - `EMAIL_FROM = "Watermelon Dating <noreply@watermelondating.com>"`
     - `ADMIN_EMAIL = admin@watermelondating.com`
3. Redeploy latest build; test:
   ```bash
   curl -H "Content-Type: application/json" \
     -d '{"email":"test@example.com","name":"Test"}' \
     https://<preview-or-prod>/api/waitlist
   curl -i -X POST \
     -F "name=Test User" -F "email=test@example.com" \
     -F "phone=123-456-7890" \
     -F "resume=@/tmp/resume.pdf;type=application/pdf" \
     https://<preview-or-prod>/api/talent
   ```
   Expect `200 {"ok":true}` and email delivery.

## Getting Started

```bash
pnpm install
pnpm dev
```

Open http://localhost:3000

## Tech Stack

- Next.js 14 (App Router)
- TypeScript
- Tailwind CSS
- Resend (email API)
- pnpm

