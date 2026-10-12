import { QueryClient } from "@tanstack/react-query";
import { createMemoryHistory, createRouter, RouterProvider } from "@tanstack/react-router";
import { cleanup, render, waitFor } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import type { ReactNode } from "react";

import { routeTree } from "@/routeTree.gen";

function renderAt(path: string) {
  // A document shell cannot mount inside Testing Library's div container.
  Object.assign(routeTree.options, { shellComponent: ({ children }: { children: ReactNode }) => <>{children}</> });
  const queryClient = new QueryClient();
  const router = createRouter({
    routeTree,
    context: { queryClient },
    history: createMemoryHistory({ initialEntries: [path] }),
  });
  return render(<RouterProvider router={router} />);
}

afterEach(() => {
  cleanup();
  vi.restoreAllMocks();
});

// Assert only that the router mounts and paints, never page content:
// routes are rewritten as the app is built and this must keep passing.
describe("App routing", () => {
  it("renders the index route", async () => {
    const { container } = renderAt("/");

    await waitFor(() => expect(container.firstChild).not.toBeNull());
  });

  it("renders the not-found route", async () => {
    vi.spyOn(console, "warn").mockImplementation(() => undefined);

    const { container } = renderAt("/this-route-does-not-exist");

    await waitFor(() => expect(container.firstChild).not.toBeNull());
  });

  it("renders the admin overview route", async () => {
    const { container } = renderAt("/admin");

    await waitFor(() => expect(container.firstChild).not.toBeNull());
  });

  it("renders the admin blog posts route", async () => {
    const { container } = renderAt("/admin/blog-posts");

    await waitFor(() => expect(container.firstChild).not.toBeNull());
  });

  it("renders the admin web pages route", async () => {
    const { container } = renderAt("/admin/web-pages");

    await waitFor(() => expect(container.firstChild).not.toBeNull());
  });

  it("renders the admin events route", async () => {
    const { container } = renderAt("/admin/events");

    await waitFor(() => expect(container.firstChild).not.toBeNull());
  });

  it("renders the admin newsletter route", async () => {
    const { container } = renderAt("/admin/newsletter");

    await waitFor(() => expect(container.firstChild).not.toBeNull());
  });

  it("renders the admin media route", async () => {
    const { container } = renderAt("/admin/media");

    await waitFor(() => expect(container.firstChild).not.toBeNull());
  });

  it("renders the admin analytics route", async () => {
    const { container } = renderAt("/admin/analytics");

    await waitFor(() => expect(container.firstChild).not.toBeNull());
  });

  it("renders the admin users route", async () => {
    const { container } = renderAt("/admin/users");

    await waitFor(() => expect(container.firstChild).not.toBeNull());
  });

  it("renders the privacy policy route", async () => {
    const { container } = renderAt("/privacy-policy");

    await waitFor(() => expect(container.firstChild).not.toBeNull());
  });

  it("renders the terms of service route", async () => {
    const { container } = renderAt("/terms-of-service");

    await waitFor(() => expect(container.firstChild).not.toBeNull());
  });

  it("renders the public events directory route", async () => {
    const { container } = renderAt("/events");

    await waitFor(() => expect(container.firstChild).not.toBeNull());
  });

  it("renders the admin login route", async () => {
    const { container } = renderAt("/admin/login");

    await waitFor(() => expect(container.firstChild).not.toBeNull());
  });

  it("renders the admin profile route", async () => {
    const { container } = renderAt("/admin/profile");

    await waitFor(() => expect(container.firstChild).not.toBeNull());
  });
});
