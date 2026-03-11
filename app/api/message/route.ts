import { handleMessage } from '@/lib/agent'

export async function GET(request: Request): Promise<Response> {
  return handleMessage(request)
}
