import { Bot, webhookCallback } from 'grammy'

import { appUrl, delay } from './misc'

export const telegramBot = new Bot(process.env.TELEGRAM_BOT_TOKEN!)

telegramBot.on('message:text', async (ctx) => {
  console.log(`< ${ctx.from.username ?? ctx.from.id}: ${ctx.message.text}`)

  fetch(`${appUrl}/api/message?chatId=${ctx.chat.id}&message=${encodeURIComponent(ctx.message.text)}`)
    .then((res) => res.json())
    .then(console.log)
    .catch(console.error)

  await delay(1000)
})

const isDev = process.env.NODE_ENV === 'development'

export const handleWebhook = isDev ? () => Response.json({}) : webhookCallback(telegramBot, 'std/http')

if (isDev) telegramBot.start()
