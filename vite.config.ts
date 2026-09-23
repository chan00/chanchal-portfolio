import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

declare const process: { env: Record<string, string | undefined> };

// https://vitejs.dev/config/
const isGitHubPages =
  process.env.GITHUB_PAGES === "true" ||
  (process.env.GITHUB_ACTIONS === "true" &&
    process.env.GITHUB_REPOSITORY?.includes("chanchal-portfolio"));

export default defineConfig({
  base: isGitHubPages ? "/chanchal-portfolio/" : "/",
  plugins: [react()],
  server: {
    port: 5173,
    host: true,
  },
  optimizeDeps: {
    include: ["gsap", "gsap/ScrollTrigger", "gsap/ScrollSmoother", "gsap/SplitText"],
  },
});
