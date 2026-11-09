# Deployment Guide — Nizam's Direct Ordering App (Company A)

## 1. Live Production Links
* **Storefront:** https://company-a-direct-ordering.vercel.app
* **Kitchen Display System (KDS):** https://company-a-direct-ordering.vercel.app/kds
* **Admin CMS:** https://company-a-direct-ordering.vercel.app/admin
* **GitHub Repository:** https://github.com/Dheerajk2002/company-a-direct-ordering

## 2. Environment Variables
Configure `.env` based on `.env.example`:
DATABASE_URL="file:./dev.db"

## 3. Local Setup & Verification
1. `npm install`
2. `npx prisma generate && npx prisma db push`
3. `npm test` (Vitest unit suite for `aiPrepEngine.test.ts`)
4. `npm run build`

## 4. Production Release (Vercel CLI)
1. `npx vercel login`
2. `npx vercel --prod`
