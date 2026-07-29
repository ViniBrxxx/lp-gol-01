import { createFileRoute, redirect } from "@tanstack/react-router";

/**
 * Catch-all for the old goldistribuidora.com Tray e-commerce store (now at
 * golshopp.com.br, a B2C channel). This domain is B2B-only going forward, so
 * any path not explicitly handled by a real route here (only "/" today) 301s
 * to the landing page instead of the old B2C store, to capture that traffic
 * as leads on this funnel.
 */
export const Route = createFileRoute("/$")({
  beforeLoad: () => {
    throw redirect({
      to: "/",
      statusCode: 301,
    });
  },
});
