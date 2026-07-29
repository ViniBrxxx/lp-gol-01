import { createFileRoute, redirect } from "@tanstack/react-router";

/**
 * Catch-all for the old goldistribuidora.com Tray e-commerce store, which moved
 * to golshopp.com.br. Any path not explicitly handled by a real route on this
 * B2B landing page (only "/" today) 301s to the identical path on the new domain,
 * preserving the SEO equity of URLs still indexed from the old store.
 */
export const Route = createFileRoute("/$")({
  beforeLoad: ({ location }) => {
    throw redirect({
      href: `https://www.golshopp.com.br${location.href}`,
      statusCode: 301,
    });
  },
});
