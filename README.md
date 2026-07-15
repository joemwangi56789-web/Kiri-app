# Field & Fern — Full-Stack E-Commerce Starter

A complete e-commerce site: product catalog, cart, Stripe checkout, customer
accounts, and an admin panel to manage products and view orders.

**Stack:** Next.js 14 (App Router) · PostgreSQL · Prisma · NextAuth · Stripe · Tailwind CSS

This was generated in a sandbox without internet access, so it has **not**
been run or tested yet. Follow the steps below on your own machine — they're
the standard flow for this stack and should work as written, but budget time
for the usual first-run debugging.

## 1. Prerequisites

- Node.js 18.18+ installed
- A PostgreSQL database — easiest options for a first launch:
  - [Neon](https://neon.tech) or [Supabase](https://supabase.com) (free tier, hosted)
  - Or `brew install postgresql` / Docker locally
- A [Stripe](https://stripe.com) account (free to create, test mode has no fees)

## 2. Install and configure

```bash
cd ecommerce-app
npm install
cp .env.example .env
```

Edit `.env`:
- `DATABASE_URL` — your Postgres connection string
- `NEXTAUTH_SECRET` — run `openssl rand -base64 32` and paste the result
- `STRIPE_SECRET_KEY` / `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` — from Stripe Dashboard → Developers → API keys (use the **test mode** keys to start)
- `STRIPE_WEBHOOK_SECRET` — see step 5

## 3. Set up the database

```bash
npm run db:push    # creates tables from prisma/schema.prisma
npm run db:seed     # adds 6 sample products + an admin user
```

Seeded admin login: `admin@fieldandfern.test` / `admin123`
**Change this password before going live** — sign in, or update it directly
in the database.

## 4. Run it locally

```bash
npm run dev
```

Visit `http://localhost:3000`. Sign in at `/account/login` with the seeded
admin account, then visit `/admin` to manage products and view orders.

## 5. Connect Stripe webhooks (required for orders to be recorded)

Orders are only written to the database when Stripe confirms payment via a
webhook — the success page alone doesn't create the order record.

**For local development**, use the Stripe CLI:
```bash
stripe listen --forward-to localhost:3000/api/webhooks/stripe
```
This prints a webhook signing secret (`whsec_...`) — put it in `.env` as
`STRIPE_WEBHOOK_SECRET` and restart `npm run dev`.

**For production**, add an endpoint in Stripe Dashboard → Developers →
Webhooks pointing to `https://yourdomain.com/api/webhooks/stripe`, listening
for `checkout.session.completed`. Copy its signing secret into your
production environment variables.

## 6. Deploying

The simplest path is [Vercel](https://vercel.com) (made by the Next.js team):
1. Push this project to a GitHub repo
2. Import it in Vercel
3. Add all the `.env` variables in Vercel's project settings
4. Update `STRIPE_SECRET_KEY` and `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` to your
   **live** Stripe keys when you're ready to accept real payments
5. Set up the production webhook (step 5) pointing at your live domain

## What's included

- Product catalog with category filtering (`/`)
- Product detail pages (`/products/[slug]`)
- Cart with localStorage persistence (`/cart`)
- Stripe Checkout integration with server-side price verification (never
  trusts prices sent from the browser)
- Customer registration/login (`/account/register`, `/account/login`)
- Admin panel (`/admin`) — dashboard, product CRUD, order list — gated to
  users with the `ADMIN` role
- Inventory decrements automatically when an order is paid

## What you'll likely want to add before a real launch

- Email confirmations (e.g. via Resend or Postmark) — triggered from the
  Stripe webhook handler
- Image upload for products (currently takes an image URL — pair with
  something like Uploadthing or S3 for real uploads)
- Order status transitions (fulfilled/shipped) and customer order history
  page
- Tax calculation (Stripe Tax can be enabled directly in the Checkout
  session config)
- Discount codes (Stripe Checkout supports these natively)
- Rate limiting on `/api/register` and `/api/checkout`

## Project structure

```
src/
  app/            Pages and API routes (Next.js App Router)
    admin/        Admin panel (protected)
    api/          Backend endpoints
    products/     Product detail pages
  components/     React components
  lib/            Prisma, NextAuth, Stripe clients
  types/          Shared TypeScript types
prisma/
  schema.prisma   Database models
  seed.ts         Sample data
```
