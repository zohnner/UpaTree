# Up A Tree LLC — Web Platform

A Next.js web application for Up A Tree LLC, a Kansas City-based tree
trimming and removal company. Deploys to Cloudflare Workers via the
OpenNext adapter.

## What's here (Phase 1)

- **Public marketing site** — home, services, service area, about, and a
  contact/quote-request page. Content in `src/lib/content.ts` is
  placeholder copy for the KC tree service market; swap in real branding,
  photos, service list, and pricing once available.
- **Internal admin tool** (`/admin`, no login yet — do not share the link
  publicly) — a job scheduling board (`/admin/schedule`) grouped by date
  with status tracking, and a read-only view of quote requests submitted
  from the public site (`/admin/quotes`).
- **Data layer** (`src/lib/store.ts`) — backed by Cloudflare D1 (their
  serverless SQLite). Schema lives in `migrations/0001_init.sql`.

## Getting started (local dev)

```bash
npm install
npm run cf-typegen        # generates cloudflare-env.d.ts from wrangler.jsonc
npx wrangler d1 execute upatree-db --local --file=./migrations/0001_init.sql
npm run dev
```

Visit `http://localhost:3000` for the public site and
`http://localhost:3000/admin` for the internal dashboard. `next dev` gets
a local emulated D1 database automatically (via
`initOpenNextCloudflareForDev()` in `next.config.ts`) — no need to run
`wrangler dev` just to develop.

## Deploying to Cloudflare Workers

This app deploys as a Cloudflare Worker (not "Pages" — Cloudflare's
guidance for SSR Next.js apps is Workers + the OpenNext adapter). One-time
setup, from the project root:

```bash
npx wrangler login                                    # authenticate this machine
npx wrangler d1 create upatree-db                     # creates the production database
```

Copy the `database_id` it prints into `wrangler.jsonc` under
`d1_databases[0].database_id` (currently a placeholder —
`REPLACE_WITH_YOUR_D1_DATABASE_ID`). Then apply the schema to the real
database:

```bash
npx wrangler d1 execute upatree-db --remote --file=./migrations/0001_init.sql
```

From then on, build and deploy with:

```bash
npm run build     # next build — sanity check
npm run deploy     # opennextjs-cloudflare build && opennextjs-cloudflare deploy
```

`npm run preview` builds and runs the app locally under the real
`workerd` runtime (closer to production than plain `next dev`) if you
want to sanity-check before deploying.

### Deploying via GitHub (Cloudflare Workers Builds)

In the Cloudflare dashboard, connect the `zohnner/UpaTree` repo under
Workers & Pages → Create → Workers Builds. Set the build command to:

```
npm install && npx opennextjs-cloudflare build
```

Cloudflare deploys automatically on push to `main`. The D1 binding in
`wrangler.jsonc` is picked up the same way it is for a manual deploy —
just make sure the real `database_id` is committed (it's not a secret,
unlike API tokens) and that you've run the `--remote` migration at least
once against the production database before the first deploy.

## Roadmap

- [ ] Real branding: logo, photos, brand colors, finalized service list
      and pricing
- [ ] Authentication for `/admin` (owner/staff login)
- [ ] Customer & lead management (CRM) beyond the quote-request inbox
- [ ] Invoicing and payments
- [ ] Email/SMS notifications on new quote requests
      (`src/app/api/quote-requests/route.ts`)
