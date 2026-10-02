<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

- Public site content (services, products, posts, contact details) lives in src/lib/site-data.ts; service/product/blog detail pages are dynamic `$slug` routes reading it — single source until the admin dashboard adds a backend.
- Shared site chrome (Header/Footer) renders in __root.tsx; reusable page blocks live in src/components/site/blocks.tsx — keeps every page visually consistent.
