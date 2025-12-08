# VerifyMe.world Migration Plan (Express → Next.js 15 + Vercel)

## 1) Objectives
- Migrate to Next.js 15 (App Router) + TypeScript + Tailwind + shadcn/ui on Vercel
- Replace Express/Wouter with Next.js API Routes (serverless) and RSC patterns
- Connect to real PostgreSQL via Drizzle ORM (reuse schema, create migrations)
- Implement credential issuance with PDF generation + embedded QR
- Add simulated blockchain (SHA-256 hashing + event log)
- Add AI assistant using Emergent LLM Key (template suggestions, summaries)
- Build marketing site + docs: Landing, How it works (Institutions/Students), Pricing, Resources, Docs, API Ref, Community, Help Center, Legal (Privacy, Terms, Cookies, Compliance)
- Ship production deployment on Vercel with environment config

## 2) Approach & Phasing
POC required (external AI + file generation + DB connectivity). Build fast, then full app around proven core.

### Phase 1 — Core POC (Isolation)
Scope: Single Node/TS script (test_core.ts) proving end-to-end core capabilities.
- AI (Emergent LLM):
  - Call integration_playbook_expert_v2 → adopt recommended SDK (emergent integrations)
  - Use EMERGENT_LLM_KEY from env; test a simple “generate certificate body copy” prompt
  - Success: non-empty response with > 50 chars, latency < 5s typical
- DB (Drizzle + Postgres):
  - Load DATABASE_URL; init Drizzle client; run `select 1` and a test upsert in a scratch table
  - Success: query passes, insert/read roundtrip ok
- PDF + QR + Hash:
  - Generate QR (credentialId URL); compose PDF (pdf-lib) with holder/institution/title/date
  - Compute SHA-256 over PDF bytes; write base64 to /tmp; ensure size < 1 MB
  - Success: file written, hash logged, QR embedded (manual visual check ok)
- Simulated blockchain:
  - Write helper that stores {credentialId, hash, txId (uuid), timestamp} to DB scratch table
  - Success: event row exists and retrievable
- Deliverables: test_core.ts, console PASS logs, sample PDF artifact, README with run steps.

User stories (Phase 1):
1. As a developer, I can run one script to validate LLM output reliability.
2. As a developer, I can verify DB connectivity and migrations won’t fail at deploy time.
3. As a developer, I can generate a certificate PDF with QR locally to confirm library choice works on serverless.
4. As a developer, I can compute/store a tamperproof hash and retrieve a simulated “tx.”
5. As a developer, I can repeat the script and consistently get PASS.

### Phase 2 — Full App Development (MVP)
Stack: Next.js 15 (App Router), TypeScript, Tailwind, shadcn/ui, Drizzle ORM, NextAuth (Credentials), Zod, TanStack Query.

A) Project setup
- Create Next.js app (app/ dir), Tailwind config, shadcn/ui init, next-themes
- Drizzle config + migrations (Neon/Vercel Postgres); env: DATABASE_URL
- Auth: NextAuth Credentials Provider + Drizzle Adapter, bcryptjs hash, session via JWT (Vercel friendly)
- Design agent: request design guidelines for dark, global, trust vibe

B) Data model (Drizzle)
- Tables: users, institutions, credentials, verifications, activity_logs, blockchain_events
- Reuse/align types from current schema; add fields: credential.pdf_base64, credential.hash, credential.image_qr_base64 (optional); blockchain_events(tx_id, hash, status)

C) API Routes (/app/api)
- /auth/[...nextauth] (Credentials signup/login with role)
- /institutions [GET, POST], /institutions/[id] [GET]
- /credentials [GET(search param), POST(issue)], /credentials/[id] [GET, PATCH(status), DELETE]
- /verifications [GET, POST], /verifications/credential/[id] [GET]
- /analytics [GET]
- /ai/template-suggest [POST] (calls Emergent LLM)

D) Services (server-only modules)
- pdfService.ts: createCertificatePDF({holder, title, institution, dates, qrData}) → {base64, hash}
- qrService.ts: toDataURL(id or URL)
- blockchainService.ts: simulate({credentialId, hash}) → txId + event row
- aiService.ts: suggestTemplateText(prompt, context)

E) App Router UI
- Marketing site (public):
  - / (Landing): Hero, How it works (Institutions/Students), Pricing, Resources, CTA to Verify/Dashboard, Footer
  - /verify, /verify/[id]: search + result card with status, issuer, on-chain demo, events
  - /docs, /api-reference, /community, /help-center
  - /legal/privacy, /legal/terms, /legal/cookies, /legal/compliance
- Auth:
  - /auth/sign-in, /auth/sign-up (credentials), role select (learner/issuer/verifier)
- Dashboard (protected):
  - /dashboard (Overview per role)
  - /dashboard/credentials (grid/table with filters; issue form using AI helper; view PDF)
  - /dashboard/verify (inline search/history)
  - /dashboard/analytics (issuer only)
  - /dashboard/settings (profile/org, theme, reset demo)

F) Content & Design (copy + components)
- Tone: modern, global trust, dark-first, subtle gradients, glass panels; icons (lucide)
- Sections content (to author during build):
  - How it works — Institutions: issue → share → verify; API + dashboard
  - How it works — Students: single profile → share QR → verify history
  - Pricing: Free, Pro (branded PDFs), Enterprise (SLAs)
  - Resources: Documentation, API Reference, Community, Help Center
  - Legal: concise policies (Privacy, Terms, Cookies, Compliance overview)

G) Observability & Ops
- Vercel Analytics enabled; Sentry (optional); rate limiting via simple in-memory (MVP) or Upstash (later)
- Drizzle migrations on deploy: `drizzle-kit push` or migration script during build step

H) Seed & Demo
- Seed script to create demo institutions, credentials, and verifications
- Demo toggle to reset data for showcases (dev-only)

User stories (Phase 2):
1. As an issuer, I can sign up and issue a credential that immediately generates a PDF with QR and hash.
2. As an issuer, I can see a simulated on-chain transaction ID and event log for any credential.
3. As a verifier, I can search by credential ID and see status, issuer, and last verification events.
4. As a learner, I can view my issued credentials and download PDFs.
5. As an issuer, I can ask the AI to suggest certificate wording and paste it into the issue form.
6. As an admin (issuer role), I can view analytics of issued/valid/revoked credentials by time/country.
7. As any visitor, I can read clear documentation and API reference for verification endpoints.
8. As any visitor, I can navigate the landing page and understand pricing and compliance posture.
9. As a signed-in user, I can change my role (for demo) and see relevant dashboard navigation.
10. As a verifier, I can view a credential detail page with embedded PDF preview and blockchain events.

### Phase 3 — Enhancements (post-MVP)
- Real blockchain (Thirdweb + Polygon), wallet connection, mint VC NFTs
- Cloudflare R2 for PDF storage, signed URLs; move PDFs out of DB
- Clerk migration (Google login, OTP, magic link) if needed
- Upstash Redis for durable rate limiting & caching; Sentry for error tracking

## 3) Implementation Steps (High Level)
1. Phase 1 POC: implement test_core.ts (AI + DB + PDF+QR+Hash + simulated tx) → PASS
2. Bootstrap Next.js 15 app; Tailwind, shadcn/ui, next-themes
3. Add Drizzle + schema + migrations; wire DATABASE_URL
4. Implement NextAuth (Credentials) with Drizzle Adapter; role selection on signup
5. Implement services (pdf/qr/blockchain/ai); validate locally
6. Implement API routes; Zod validation; error handling
7. Build marketing pages with authored copy; footer links to legal/docs
8. Build dashboard routes and components; integrate TanStack Query
9. Add analytics endpoint and charts; add seed script
10. Configure Vercel project + envs (DATABASE_URL, NEXTAUTH_SECRET, NEXTAUTH_URL, EMERGENT_LLM_KEY)
11. Test with testing_agent_v3 (E2E flows); fix defects; deploy

## 4) Next Actions (Inputs Needed)
- Provide: DATABASE_URL (Neon/Vercel Postgres), EMERGENT_LLM_KEY, Vercel project ready
- Approve: dark theme + copy tone; pricing tiers (Free/Pro/Enterprise) ranges
- Confirm: keep simulated blockchain for MVP (yes)

## 5) Success Criteria
- Phase 1: One script verifies AI, DB, PDF+QR, hash+event — PASS artifacts produced
- Phase 2: Deployed on Vercel; Landing + Docs/Legal available; Auth works; Issue → PDF/QR/hash → Verify flows work
- AI endpoint responds < 2s p50 in dev; PDFs < 1 MB; DB queries stable
- Analytics shows correct counts; all core user stories validated via testing agent
- No hardcoded secrets; envs configured; accessibility passes basic checks
