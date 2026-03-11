export const isProduction = process.env.VERCEL_ENV === 'production'
export const appDomain = isProduction ? process.env.VERCEL_PROJECT_PRODUCTION_URL : process.env.VERCEL_URL
export const appUrl = appDomain ? `https://${appDomain}` : 'http://localhost:3000'

export function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms))
}
