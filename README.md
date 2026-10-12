# Russell Technologies web3

Implement exactly the screenshot and nothing else

# Russell Technologies Web Application

Corporate website and administrative management portal for **Russell Technologies**, featuring enterprise digital products (EduPro, Russell Law, Blueflame, Farmspots), tech services, and full operational admin dashboard.

## Tech Stack

- **Framework**: TanStack Start / React 19 / Vite 8
- **Styling**: Tailwind CSS & Lucide Icons
- **Deployment**: Vercel (Nitro Serverless SSR) / Cloudflare / Node

## Development

```bash
bun install  # or npm install
bun run dev  # starts Vite dev server
```

## Vercel Deployment

This project is prepared for 1-click deployment on [Vercel](https://vercel.com):

1. Push your repository to GitHub.
2. In the Vercel dashboard, click **Add New > Project** and import `russell-technologies-web3`.
3. Vercel automatically detects Vite/Nitro.
   - **Framework Preset**: Other / Vite
   - **Build Command**: `bun run build` (or `npm run build`)
   - **Output Directory**: `.output/public` (or automatic Nitro preset)
4. Set Environment Variable (optional):
   - `NITRO_PRESET=vercel`
5. Click **Deploy**.

