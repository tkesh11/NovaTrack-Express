# NovaTrack Express

NovaTrack Express — Next.js 15 (App Router) starter with a premium black & gold design, manual package tracking, a simple admin dashboard, and feedback/contact pages.

Important: this repo is a scaffold. You must configure environment variables and run Prisma migrations/seed.

Environment variables (.env):

- DATABASE_URL=postgresql://user:pass@localhost:5432/dbname
- ADMIN_EMAIL=admin@novatrack.com
- ADMIN_PASSWORD=ChangeMe123!
- JWT_SECRET=your_jwt_secret
- SENDGRID_API_KEY=optional

Quick setup:

1. Install dependencies: npm install
2. Generate Prisma client: npx prisma generate
3. Run migrations: npx prisma migrate dev --name init
4. Seed admin (uses ADMIN_EMAIL & ADMIN_PASSWORD): npm run prisma:seed
5. Run dev server: npm run dev

Notes:
- Admin panel: /admin/login then /admin/dashboard
- Public tracking: /tracking
- Contact: /contact

Security & production:
- Replace JWT_SECRET in production
- Set up a managed Postgres and set DATABASE_URL
- Optional: wire SendGrid or other email provider in app/api/feedback/route.ts
