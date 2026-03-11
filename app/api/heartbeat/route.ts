import { handleHeartbeat } from '@/lib/agent'

export async function GET(): Promise<Response> {
  return handleHeartbeat()
}
