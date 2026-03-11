// import { Chat, type Thread, type Message } from 'chat'
// import { createTelegramAdapter } from '@chat-adapter/telegram'
// import { createRedisState } from '@chat-adapter/state-redis'
// import { createMemoryState } from '@chat-adapter/state-memory'

// import { box } from './box'

// /////////

// const telegram = createTelegramAdapter()

// export const bot = new Chat({
//   userName: 'mybot',
//   adapters: { telegram },
//   // state: createMemoryState(),
//   state: createRedisState(),
//   onLockConflict: 'force',
// })

// bot.onNewMessage(/.*/, messageHandler)
// // bot.onNewMention(messageHandler)
// bot.initialize().then(() => console.log('[chat-sdk] running', telegram.runtimeMode))

// //////////

// async function messageHandler(thread: Thread, message: Message) {
//   console.log(`< ${message.author.userName}: ${message.text}`)

//   await thread.post(`Processing your message: "${message.text}"`)
//   await thread.post(`..`)
//   await new Promise((resolve) => setTimeout(resolve, 1000))

//   console.log(`...`)
//   await thread.post(`...`)

//   // const response = await box.agent.run({ prompt: message.text })
//   // console.log(`>>>`, response.result)

//   // thread.post('response:')
//   // thread.post(response.result)
// }
