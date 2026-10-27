# Billionaire Bailout

A mobile-first MVP concept for matching people with supporters who can help clear verified essential bills.

## Stack

- Next.js App Router + React + TypeScript
- Tailwind CSS v4 (with custom responsive styling)
- Lucide icons

## Run locally

```bash
npm install
npm run dev
```

Open http://localhost:3000.

## Current MVP

- Responsive landing page and navigation
- Illustrative bill marketplace with category filters
- Demo-only contribution interactions
- Bill request modal with local file selection and a request-preview state
- Privacy and direct-to-provider payment messaging
- Clear demo disclaimers

## Important boundaries

This repository currently contains a frontend prototype. It does **not** upload or persist submitted documents, verify identities or bills, create real donor accounts, accept funds, or initiate payments. Marketplace entries and funding figures are illustrative. The contribution button only changes local UI state and is not a payment.

Before handling real requests or money, add a secure backend, authentication and role-based access, private document storage, provider-side invoice verification, audit logging, payment-provider approval and integration, settlement reconciliation, dispute/refund handling, and independent legal/compliance review for each operating jurisdiction. Do not put API secrets in client-side code.

## Suggested next milestones

1. Set up linting and CI; run a production build.
2. Add a database schema for recipients, bills, verification decisions, donor commitments, allocations, payment attempts, settlements, and reversals.
3. Add authenticated recipient and reviewer workflows.
4. Integrate private file upload with malware scanning and retention controls.
5. Integrate approved provider payment flows in a sandbox.
6. Add audited financial reconciliation and operational monitoring.
