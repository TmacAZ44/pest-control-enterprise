# ABC Shield

Enterprise marketing site and customer portal for a pest control company. The app uses the current Next.js App Router (this scaffold is Next.js 16, the maintained successor to the Next.js 14 App Router), TypeScript, Tailwind CSS v4, Prisma, and shadcn-style UI primitives.

## Stack

- Next.js App Router and TypeScript
- Tailwind CSS v4, configured in CSS with light and dark tokens
- Prisma schema for PostgreSQL (Supabase-compatible)
- Feature modules for marketing, estimates, booking, portal, and local SEO
- Stripe Checkout for deposits and invoice payment when `STRIPE_SECRET_KEY` is set
- react-hook-form and Zod for the quote calculator and booking validation
- Framer Motion on the homepage hero

## Setup

```bash
npx create-next-app@latest . --typescript --tailwind --eslint --app --src-dir --import-alias "@/*" --use-npm --turbopack --yes
npm install framer-motion react-hook-form zod@3.25.76 @hookform/resolvers stripe lucide-react clsx tailwind-merge class-variance-authority @prisma/client@6.19.0 prisma@6.19.0
copy .env.example .env
npx prisma generate
npm run dev
```

`npm run dev` and `npm run build` use webpack. On current Node for Windows, `fs.readlink` reports `EISDIR` for ordinary files, which crashes Next's bundler. `scripts/fs-readlink-patch.cjs` maps that error to `EINVAL` before Next starts.

When a Postgres database is available:

```bash
npx prisma db push
```

## Folder structure

```text
prisma/schema.prisma          Users, services, appointments, quotes, invoices
src/app                        Routes: home, estimate, book, portal, locations/[city]
src/components/layout          Header, footer, page shell, theme toggle
src/components/ui              Button, input, card, and form primitives
src/features/marketing         Hero and homepage sections
src/features/estimator         Multi-step quote calculator
src/features/booking           Availability calendar and deposit checkout
src/features/portal            Customer dashboard
src/features/seo               LocalBusiness and Service JSON-LD
src/lib                        Catalog, pricing, locations, validators
src/server                     Server actions and Stripe Checkout
```

Tailwind v4 reads the theme from `src/app/globals.css` (`@theme` and CSS variables). Brand navy stays constant. Primary, accent, and safety colors switch with the `.dark` class.

Without `DATABASE_URL`, quotes and bookings stay in the request and are confirmed in the UI. With `DATABASE_URL`, quote submissions are written to `QuoteRequest`. Without `STRIPE_SECRET_KEY`, deposits and invoice payments confirm locally and return a mock Stripe reference.
