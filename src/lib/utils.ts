// src/lib/utils.ts
export function mediaURL(path?: string | null) {
  if (!path) return "";
  const base = process.env.NEXT_PUBLIC_STRAPI_URL || "";
  return path.startsWith("/") ? `${base}${path}` : path;
}
