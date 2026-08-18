import type { NextConfig } from "next";
import { initOpenNextCloudflareForDev } from "@opennextjs/cloudflare";

const nextConfig: NextConfig = {
  /* config options here */
};

// Makes Cloudflare bindings (D1, KV, R2, ...) declared in wrangler.jsonc
// available inside `next dev` via local Miniflare emulation, so
// getCloudflareContext().env.DB works the same in local dev as in prod.
initOpenNextCloudflareForDev();

export default nextConfig;
