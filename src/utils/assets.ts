/**
 * Resolves public asset paths taking Vite's BASE_URL into account.
 * This ensures assets load properly on GitHub Pages subpaths (e.g. /chanchal-portfolio/)
 * as well as root domains (e.g. / on Vercel, Cloudflare, custom domain, and localhost).
 */
export const asset = (path: string): string => {
  if (!path) return path;
  if (
    path.startsWith("http://") ||
    path.startsWith("https://") ||
    path.startsWith("data:") ||
    path.startsWith("blob:")
  ) {
    return path;
  }
  const base = import.meta.env.BASE_URL || "/";
  const cleanBase = base.endsWith("/") ? base : `${base}/`;
  const cleanPath = path.startsWith("/") ? path.slice(1) : path;
  return `${cleanBase}${cleanPath}`;
};
