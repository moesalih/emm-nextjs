import { startTyping, sendTelegramMessage } from '@/lib/bot-grammy'
import { box } from '@/lib/box'

// handle user message from telegram webhook/api
export async function handleMessage(request: Request): Promise<Response> {
  const url = new URL(request.url)
  const chatId = url.searchParams.get('chatId')
  let message = url.searchParams.get('message')
  if (!chatId) return Response.json({ error: 'chatId query parameter is required' }, { status: 400 })
  if (!message) return Response.json({ error: 'message query parameter is required' }, { status: 400 })

  if (message.startsWith('/pause')) {
    await box.pause()
    message = '/status'
  }
  if (message.startsWith('/status')) {
    const { status } = await box.getStatus()
    return await respond(chatId, message, `Box status: ${status}`)
  }

  if (message.startsWith('/heartbeat')) {
    await box.files.write({ path: 'LAST_CHAT_ID.txt', content: chatId })
    message = message.replace('/heartbeat', HEARTBEAT_ADD_PROMPT).trim()
  }

  await startTyping(chatId)
  const response = await box.agent.run({ prompt: message })
  return await respond(chatId, message, response.result)
}

const respond = async (chatId: string, message: string, response: string) => {
  await sendTelegramMessage(chatId, response)
  console.log(`>> ${response}`)
  return Response.json({ status: 'success', chatId, message, response })
}

// handle heartbeat from cron
export async function handleHeartbeat() {
  const chatId = await box.files.read('LAST_CHAT_ID.txt')
  const fullPrompt = `${HEARTBEAT_PROMPT} Current time: ${currentTime()}.`

  const response = await box.agent.run({ prompt: fullPrompt })
  console.log(`>> ${response.result}`)

  if (!response.result.includes('HEARTBEAT_OK')) {
    await sendTelegramMessage(chatId, response.result)
  }

  return Response.json({ status: 'success', chatId, response: response.result })
}

const HEARTBEAT_ADD_PROMPT = 'add the following user request to HEARTBEAT.md (create it if needed): '
const HEARTBEAT_PROMPT =
  'Read HEARTBEAT.md if it exists. Follow it strictly. For any item scheduled at or around a specific time, do it if its within 15 minutes of current time. Do not infer or repeat old tasks from prior chats. If nothing needs attention, reply HEARTBEAT_OK.'

const currentTime = () =>
  new Date().toLocaleString('en-US', { timeZone: 'America/New_York', hour: 'numeric', minute: '2-digit', hour12: true })
