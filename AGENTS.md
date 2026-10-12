# Russell Technologies Web Application Guidelines

- Standalone deployment target: Vercel (Nitro TanStack Start SSR).

- Public site content (services, products, posts, contact details) lives in src/lib/site-data.ts; service/product/blog detail pages are dynamic `$slug` routes reading it — single source until the admin dashboard adds a backend.
- Shared site chrome (Header/Footer) renders in __root.tsx; reusable page blocks live in src/components/site/blocks.tsx — keeps every page visually consistent.
- Product detail section navigation uses typed links with hashes; contact actions target the message form, and unavailable media/social destinations are disabled rather than fabricated.
