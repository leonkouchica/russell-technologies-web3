# Admin dashboard foundation

## Build
- Add an isolated `/admin` shell with the reference's navy navigation, light content background, compact global search, notification control, administrator identity, and responsive sidebar behavior.
- Implement only `/admin`, `/admin/blog-posts`, and `/admin/blog-posts/$id`; keep future navigation visible but inactive, with no placeholder pages for deferred modules.
- Match the supplied dashboard screenshot's overview, metrics, activity chart, recent posts, events, and subscriber panels.
- Match the blog list screenshot with status tabs/counts, search and filters, sortable/paginated rows, summary sidebar, and confirmed deletion. Make post details open inside the admin shell, using the supplied editor-style page as the closest available visual reference.
- Centralize typed demo posts and dashboard constants; keep all admin styling scoped so the completed public site remains unchanged.

## Verification
- Run the relevant tests and inspect the three admin routes plus a public route in the running preview; verify interactions, direct navigation, responsive layout, and fresh build diagnostics.

## Technical details
- Add reusable admin shell and page modules under `src/components/admin/` and centralized mock data under `src/lib/admin-data.ts`.
- Use TanStack file routes with per-route metadata, typed links, existing design-system controls, and a shared detail not-found state.
- No Cloud, authentication, or persistence is included in this phase.
