import { handleWebhook } from '@/lib/bot-grammy'

export async function POST(request: Request): Promise<Response> {
  return handleWebhook(request)
}

export async function GET(request: Request): Promise<Response> {
  return new Response('Telegram webhook is running')
}
