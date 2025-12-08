# VerifyMe.world - Vercel Deployment Guide

## Prerequisites

1. **GitHub Account** - Your code must be in a GitHub repository
2. **Vercel Account** - Sign up at [vercel.com](https://vercel.com)
3. **Neon PostgreSQL Database** - Already set up ✓

## Environment Variables Required

Before deploying, you need these environment variables:

### 1. DATABASE_URL
Your Neon PostgreSQL connection string:
```
postgresql://neondb_owner:npg_j8neDuby6MxB@ep-proud-fog-ahl5fwhz-pooler.c-3.us-east-1.aws.neon.tech/neondb?sslmode=require
```

### 2. EMERGENT_LLM_KEY
Your AI integration key:
```
sk-emergent-61cC33511Fd3956926
```

### 3. NEXTAUTH_SECRET
Generate a random secret:
```bash
openssl rand -base64 32
```
Or use: `verifyme-production-secret-change-this-in-production-2025`

### 4. NEXTAUTH_URL
Your production URL (set after first deploy):
```
https://your-app-name.vercel.app
```

---

## Deployment Steps

### Method 1: Vercel Dashboard (Recommended)

1. **Push to GitHub**
   ```bash
   git init
   git add .
   git commit -m "Initial commit - VerifyMe.world"
   git branch -M main
   git remote add origin https://github.com/YOUR_USERNAME/verifyme-world.git
   git push -u origin main
   ```

2. **Import to Vercel**
   - Go to [vercel.com/new](https://vercel.com/new)
   - Click "Import Git Repository"
   - Select your repository
   - Click "Import"

3. **Configure Environment Variables**
   - In the import screen, expand "Environment Variables"
   - Add the 4 variables above:
     - `DATABASE_URL` → (paste your Neon URL)
     - `EMERGENT_LLM_KEY` → `sk-emergent-61cC33511Fd3956926`
     - `NEXTAUTH_SECRET` → (generate or use placeholder)
     - `NEXTAUTH_URL` → Leave blank for now

4. **Deploy**
   - Click "Deploy"
   - Wait 2-3 minutes for build

5. **Update NEXTAUTH_URL**
   - After deployment, copy your Vercel URL (e.g., `https://verifyme-world.vercel.app`)
   - Go to Settings → Environment Variables
   - Edit `NEXTAUTH_URL` and set it to your Vercel URL
   - Redeploy (Deployments → Click "..." → Redeploy)

---

### Method 2: Vercel CLI

1. **Install Vercel CLI**
   ```bash
   npm i -g vercel
   ```

2. **Login**
   ```bash
   vercel login
   ```

3. **Set Environment Variables**
   ```bash
   vercel env add DATABASE_URL
   # Paste: postgresql://neondb_owner:npg_j8neDuby6MxB@...
   
   vercel env add EMERGENT_LLM_KEY
   # Paste: sk-emergent-61cC33511Fd3956926
   
   vercel env add NEXTAUTH_SECRET
   # Paste: your-generated-secret
   
   vercel env add NEXTAUTH_URL
   # Paste: https://your-app.vercel.app (use after first deploy)
   ```

4. **Deploy**
   ```bash
   vercel --prod
   ```

---

## Post-Deployment Checklist

### ✓ Verify Core Features

1. **Landing Page**
   - Visit `https://your-app.vercel.app`
   - Check hero section loads
   - Navigation works

2. **Sign Up / Sign In**
   - Create a test account
   - Login with demo account: `demo_issuer` / `demo123`

3. **Credential Issuance**
   - Go to Dashboard → Credentials
   - Click "Issue Credential"
   - Test AI suggestion (click sparkle icon)
   - Issue a test credential
   - Verify PDF downloads

4. **Verification**
   - Go to `/verify`
   - Search for `VFY-2025-DEMO1`
   - Verify details display correctly

5. **Database Connection**
   - If you see database errors, verify:
     - `DATABASE_URL` is set correctly
     - Database is accessible (check Neon dashboard)
     - SSL mode is enabled

---

## Troubleshooting

### Build Fails

**Error: "Cannot find module '@/lib/db'"**
- Check tsconfig.json paths are correct
- Ensure all imports use `@/` prefix

**Error: "Tailwind CSS version conflict"**
- Already fixed in package.json (v3.4.1)
- Delete node_modules and reinstall if needed

**Error: "DATABASE_URL not found"**
- Go to Vercel Dashboard → Project → Settings → Environment Variables
- Ensure DATABASE_URL is added for Production

### Runtime Errors

**Error: "Failed to connect to database"**
- Verify DATABASE_URL format includes `?sslmode=require`
- Check Neon dashboard - database should be active
- Test connection locally first

**Error: "EMERGENT_LLM_KEY invalid"**
- Key format: `sk-emergent-XXXXXXXXXXXX`
- Verify key is set in environment variables
- AI features will fallback to default text if key fails

**Error: "JWT must be provided"**
- Set NEXTAUTH_SECRET in environment variables
- Redeploy after adding the variable

---

## Performance Optimization

### Enable Edge Runtime (Optional)

For faster response times, convert API routes to Edge:

```typescript
// In API route files:
export const runtime = 'edge';
```

### Database Connection Pooling

Neon automatically handles pooling. No additional config needed.

### Image Optimization

Next.js automatically optimizes images. For custom images:

```tsx
import Image from 'next/image';

<Image src="/logo.png" width={200} height={200} alt="Logo" />
```

---

## Custom Domain Setup

1. **Purchase Domain** (e.g., from Namecheap, GoDaddy)

2. **Add to Vercel**
   - Go to Project → Settings → Domains
   - Add your domain: `verifyme.world`
   - Follow DNS configuration instructions

3. **Update Environment**
   - Edit `NEXTAUTH_URL` to use your domain
   - `https://verifyme.world`

4. **SSL Certificate**
   - Vercel automatically provisions SSL
   - Wait 24-48 hours for DNS propagation

---

## Monitoring & Analytics

### Vercel Analytics
- Automatically enabled
- View at: Project → Analytics

### Error Tracking
- Check: Project → Logs
- Filter by error type

### Database Monitoring
- Neon dashboard shows:
  - Connection count
  - Query performance
  - Storage usage

---

## Scaling Considerations

### Free Tier Limits (Vercel)
- ✓ Unlimited deployments
- ✓ 100 GB bandwidth/month
- ✓ Serverless function execution
- ⚠ 100k serverless function invocations/month

### Neon Free Tier
- ✓ 0.5 GB storage
- ✓ 1 project
- ⚠ Auto-pause after inactivity (wakes on request)

### When to Upgrade
- **Vercel Pro** ($20/mo) - For custom domains + priority support
- **Neon Pro** ($19/mo) - For always-on database + more storage

---

## Backup Strategy

### Database Backups
Neon provides automatic backups:
- Point-in-time recovery (last 7 days on Pro)
- Manual snapshots available

### Code Backups
- GitHub serves as version control
- Vercel maintains deployment history

---

## Security Best Practices

✓ **Environment Variables** - Never commit to Git
✓ **HTTPS** - Enabled by default on Vercel
✓ **JWT Tokens** - Use strong NEXTAUTH_SECRET
✓ **Database** - SSL mode required
✓ **API Rate Limiting** - Consider adding middleware

---

## Support Resources

- **Vercel Docs**: https://vercel.com/docs
- **Next.js Docs**: https://nextjs.org/docs
- **Neon Docs**: https://neon.tech/docs
- **Project README**: `/README.md`
- **API Docs**: https://your-app.vercel.app/api-reference

---

## Cost Estimate (Monthly)

| Service | Free Tier | Pro Tier |
|---------|-----------|----------|
| Vercel  | $0        | $20      |
| Neon DB | $0        | $19      |
| **Total** | **$0** | **$39** |

**Free tier covers:**
- ✓ 10,000+ credentials/month
- ✓ Unlimited verifications
- ✓ AI-powered features
- ✓ Global CDN
- ✓ Automatic SSL

---

## Production Checklist

Before going live:

- [ ] All environment variables set
- [ ] Database migrated and seeded
- [ ] Demo accounts working
- [ ] SSL certificate active
- [ ] Custom domain configured (optional)
- [ ] Error tracking enabled
- [ ] Backup strategy in place
- [ ] Legal pages reviewed
- [ ] Privacy policy customized
- [ ] Terms of service customized

---

**🚀 Your VerifyMe.world platform is ready for global deployment!**

For issues or questions:
- Check logs in Vercel dashboard
- Review API documentation at `/api-reference`
- Test locally first with `npm run dev`
