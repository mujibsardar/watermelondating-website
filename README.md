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

### Namecheap: Add Resend DNS

1. **Advanced DNS → Mail Settings:** switch **Email Forwarding → Custom MX** and Save.
2. **MX Records:** Add
   - Host: `send`
   - Mail Server: `<feedback-smtp... from Resend>`
   - Priority: `10`
   - TTL: `Automatic`
3. **Host Records → TXT:**
   - Host `send` → Value `<Resend SPF: v=spf1 include:amazonses...>`
   - Host `resend._domainkey` → Value `<Resend DKIM p=...>`
   - Host `_dmarc` → Value `v=DMARC1; p=none;`
4. **Verify in Resend**. Do **not** change `@` (ALIAS) or `www` (CNAME).

### Vercel: Enable Production Email

1. Resend → **Domains** → Add `watermelondating.com` → copy DNS values above.
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

## Receive Form Emails + DNS Cutover

### Receive Form Emails

1. Vercel → Settings → **Environment Variables**:
   - `ADMIN_EMAIL = watermelondatingapp@gmail.com`
   - `EMAIL_FROM = "Watermelon Dating <noreply@watermelondating.com>"`
   - `RESEND_API_KEY = re_...`
   - Add in **Preview** now and **Production** before merge.
2. Redeploy the latest build and submit the form (or curl). Check the Gmail inbox and Spam/Promotions once.

### Point Domain to Vercel

1. Vercel → Project → Settings → **Domains** → Add `www.watermelondating.com` and `watermelondating.com`.
2. Namecheap → **Advanced DNS**:
   - `www` → **CNAME** → `cname.vercel-dns.com`
   - `@` → **A/ALIAS** → values shown by Vercel for apex
   - Leave Resend TXT/MX/DMARC records untouched.
3. Wait for **Verified** + **SSL Active** in Vercel, then test `https://www.watermelondating.com` and `https://watermelondating.com`.
4. Merge to `main` to build **Production**.

## Tech Stack

- Next.js 14 (App Router)
- TypeScript
- Tailwind CSS
- Resend (email API)
- pnpm

