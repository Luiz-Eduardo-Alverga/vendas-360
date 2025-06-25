export function normalizeImageUrl(url?: string): string {
  if (!url) return '/placeholder.png'
  if (url.startsWith('//')) return `https:${url}`
  return url
}
