import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://makodivers.club'

  const routes = [
    '',
    '/courses',
    '/gallery',
    '/mini-safaris',
    '/packages',
    '/contact',
    '/reviews',
    '/updates',
    '/schedule-25/26',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date().toISOString(),
    changeFrequency: 'weekly' as const,
    priority: route === '' ? 1 : 0.8,
  }))

  return routes
}
