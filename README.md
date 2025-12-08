# VerifyMe.world - Global Credential Verification Platform

A complete Next.js 15 application for issuing, managing, and verifying tamper-proof credentials with blockchain-backed authentication.

## 🚀 Features

- ✅ **Certificate Issuance**: Create PDF certificates with embedded QR codes
- ✅ **AI-Powered Templates**: Generate professional descriptions using Emergent LLM
- ✅ **Blockchain Simulation**: Store cryptographic hashes for verification
- ✅ **Public Verification**: Anyone can verify credentials instantly
- ✅ **Role-Based Access**: Separate workflows for learners, issuers, and verifiers
- ✅ **Analytics Dashboard**: Track issued credentials and verification stats
- ✅ **Complete Documentation**: API reference, guides, and legal pages

## 📋 Tech Stack

- **Frontend**: Next.js 15 (App Router), React 19, TypeScript, Tailwind CSS
- **Backend**: Next.js API Routes (Serverless)
- **Database**: PostgreSQL (Neon) with Drizzle ORM
- **Authentication**: JWT-based with bcryptjs
- **PDF Generation**: pdf-lib + qrcode
- **AI**: OpenAI GPT-4o-mini via Emergent Universal LLM Key
- **Deployment**: Vercel-ready

## 🏗️ Project Structure

```
/app
├── app/                    # Next.js App Router
│   ├── api/               # API routes (serverless)
│   ├── auth/              # Authentication pages
│   ├── dashboard/         # Protected dashboard
│   ├── legal/             # Legal pages
│   ├── docs/              # Documentation
│   └── page.tsx           # Landing page
├── lib/
│   ├── db.ts              # Database connection
│   ├── schema.ts          # Drizzle schema
│   └── services/          # Business logic
│       ├── pdf-service.ts
│       ├── blockchain-service.ts
│       └── ai-service.ts
├── scripts/
│   ├── migrate-db.ts      # Database migrations
│   └── seed-db.ts         # Seed demo data
└── client/src/components/ # shadcn/ui components
```

## 🔧 Setup Instructions

### 1. Environment Variables

Create a `.env.local` file:

```env
# Database (Neon PostgreSQL)
DATABASE_URL="postgresql://user:password@host/database?sslmode=require"

# AI Integration
EMERGENT_LLM_KEY="sk-emergent-61cC33511Fd3956926"

# NextAuth (generate random secret)
NEXTAUTH_SECRET="generate-with-openssl-rand-base64-32"
NEXTAUTH_URL="http://localhost:3000"

# App URL
NEXT_PUBLIC_APP_URL="http://localhost:3000"
```

### 2. Install Dependencies

```bash
npm install
# or
yarn install
```

### 3. Database Setup

```bash
# Run migrations to create tables
npm run db:migrate

# Seed with demo data (optional)
npm run db:seed
```

**Demo Accounts Created:**
- Issuer: `demo_issuer` / `demo123`
- Learner: `demo_learner` / `demo123`

### 4. Start Development Server

```bash
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000)

## 📦 Build for Production

```bash
npm run build
npm start
```

## 🚀 Deploy to Vercel

### Option 1: Vercel CLI

```bash
npm i -g vercel
vercel
```

### Option 2: GitHub Integration

1. Push code to GitHub
2. Go to [vercel.com](https://vercel.com)
3. Import your repository
4. Add environment variables:
   - `DATABASE_URL`
   - `EMERGENT_LLM_KEY`
   - `NEXTAUTH_SECRET`
   - `NEXTAUTH_URL` (your production URL)
5. Deploy!

## 🗄️ Database Schema

### Users
- **id**: UUID (primary key)
- **username**: Unique username
- **password**: Bcrypt hashed
- **email**: Optional email
- **role**: learner | issuer | verifier

### Institutions
- **id**: UUID
- **name**: Institution name
- **slug**: URL-friendly slug
- **country**: Country code
- **type**: university | bootcamp | mooc | certification-body

### Credentials
- **id**: VFY-YYYY-NNNN format
- **holderName**: Recipient name
- **title**: Certificate title
- **institutionId**: Foreign key
- **pdfBase64**: Base64 encoded PDF
- **contentHash**: SHA-256 hash
- **qrCodeData**: JSON data for QR
- **onChain**: Blockchain status
- **status**: valid | revoked | expired | pending

### Blockchain Events
- **id**: UUID
- **credentialId**: Foreign key
- **contentHash**: SHA-256 hash
- **txId**: Simulated transaction ID
- **blockNumber**: Simulated block number
- **status**: confirmed | pending | failed

## 🔌 API Endpoints

### Authentication
- `POST /api/auth/signup` - Register user
- `POST /api/auth/login` - Login user

### Credentials
- `GET /api/credentials` - List credentials
- `POST /api/credentials` - Issue credential (generates PDF + QR + hash)
- `GET /api/credentials/:id` - Get credential details
- `PATCH /api/credentials/:id` - Update status

### Institutions
- `GET /api/institutions` - List institutions
- `POST /api/institutions` - Create institution

### AI
- `POST /api/ai/suggest-template` - Get AI-generated description

## 🎨 Design System

- **Colors**: Dark theme with blue primary, green accent
- **Fonts**: Inter (body), Space Grotesk (headings)
- **Components**: shadcn/ui + custom variants
- **Icons**: lucide-react

## 📝 Available Pages

### Public
- `/` - Landing page
- `/verify` - Public verification search
- `/pricing` - Pricing tiers
- `/docs` - Documentation
- `/api-reference` - API docs
- `/legal/privacy` - Privacy Policy
- `/legal/terms` - Terms of Service

### Protected
- `/dashboard` - Overview dashboard
- `/dashboard/credentials` - Issue & manage credentials
- `/dashboard/verify` - Inline verification
- `/dashboard/analytics` - Stats & charts (issuer only)
- `/dashboard/settings` - Account settings

## 🧪 Testing

The application includes:
- Functional authentication flow
- PDF generation with QR codes
- Blockchain simulation
- Public verification
- Role-based dashboards

## 🔐 Security Features

- JWT-based authentication
- Bcrypt password hashing
- SHA-256 content hashing
- Middleware-protected routes
- SQL injection prevention (Drizzle ORM)
- XSS protection (React)

## 📚 Additional Resources

- **POC Test Script**: `test_core.ts` - Validates all core integrations
- **Design Guidelines**: `design_guidelines.md` - Complete design system
- **Migration Plan**: `plan.md` - Development phases

## 🤝 Contributing

This is a complete MVP ready for production. Future enhancements:
- Real blockchain integration (Polygon/Thirdweb)
- Cloudflare R2 for PDF storage
- Clerk authentication
- Bulk CSV upload
- Custom branding templates

## 📄 License

MIT License - feel free to use for your institution!

## 🆘 Support

For issues or questions:
- Check `/docs` page
- Review `/api-reference`
- Visit `/help-center`

---

**Built with ❤️ for global credential verification**

*VerifyMe.world - The future of tamper-proof credentials*
