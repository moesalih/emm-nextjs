import { box } from '@/lib/box'

export async function GET(request: Request): Promise<Response> {
  const response = await box.agent.run({
    prompt: 'hello there',
  })

  return Response.json({ response, result: response.result })
}
