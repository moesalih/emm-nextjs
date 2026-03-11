import { Box, Agent, OpenCodeModel } from '@upstash/box'

// export const box = await Box.create({
//   runtime: 'node',
//   agent: {
//     runner: Agent.OpenCode,
//     model: OpenCodeModel.Zen_MiniMax_M2_5_Free,
//   },
// })

export const box = await Box.get(process.env.UPSTASH_BOX_ID!)
