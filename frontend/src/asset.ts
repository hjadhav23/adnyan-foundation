/** Prefixes public-folder paths with the site's base URL (needed on GitHub Pages sub-paths). */
export const asset = (p: string) =>
  !p || !p.startsWith('/') || p.startsWith('//') ? p : import.meta.env.BASE_URL + p.slice(1)
