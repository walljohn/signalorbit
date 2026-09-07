import type { NextConfig } from "next";

// GitHub Pages serves static files only, with no Node runtime, so the
// /api/consultation route can't run there. The deploy workflow removes
// src/app/api before this build runs (see .github/workflows/deploy-pages.yml),
// and this flag switches Next to a static export with the repo's subpath
// baked into every asset URL. A normal `npm run build` (this flag unset)
// keeps the full app, API route included, for a real Node host.
const isGithubPages = process.env.GITHUB_PAGES === "true";
const basePath = "/signalorbit";

const nextConfig: NextConfig = {
  ...(isGithubPages
    ? {
        output: "export",
        basePath,
        assetPrefix: `${basePath}/`,
        trailingSlash: true,
        images: { unoptimized: true },
      }
    : {}),
};

export default nextConfig;
