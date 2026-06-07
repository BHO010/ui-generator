import { graph } from './langgraph/graph'

const NODE_PROGRESS: Record<string, number> = {
  planner: 25,
  generator: 55,
  validator: 75,
}

export type StreamProgressEvent = { stage: string; progress: number }
export type StreamCompleteEvent = {
  stage: 'complete'
  progress: 100
  result: { prompt: string; model: string; generatedCode: string; generatedAt: string }
}
export type StreamEvent = StreamProgressEvent | StreamCompleteEvent

export async function* generateComponentStream(prompt: string): AsyncGenerator<StreamEvent> {
  let finalCode = ''
  let fixAttempts = 0

  for await (const chunk of await graph.stream(
    { prompt, plan: '', code: '', errors: [], fixAttempts: 0, finalCode: '' },
    { streamMode: 'updates' },
  )) {
    const updates = chunk as Record<string, Record<string, unknown>>

    for (const [nodeName, nodeState] of Object.entries(updates)) {
      if (nodeState.finalCode) finalCode = nodeState.finalCode as string
      else if (nodeState.code) finalCode = nodeState.code as string

      let progress: number
      if (nodeName === 'fixer') {
        fixAttempts++
        progress = Math.min(75 + fixAttempts * 5, 90)
      } else {
        progress = NODE_PROGRESS[nodeName] ?? 80
      }

      yield { stage: nodeName, progress }
    }
  }

  yield {
    stage: 'complete',
    progress: 100,
    result: {
      prompt,
      model: process.env['OLLAMA_MODEL'] ?? 'unknown',
      generatedCode: finalCode,
      generatedAt: new Date().toISOString(),
    },
  }
}

export async function generateComponent(prompt: string): Promise<string> {
  const result = await graph.invoke({
    prompt,
    plan: '',
    code: '',
    errors: [],
    fixAttempts: 0,
    finalCode: '',
  })

  return result.finalCode || result.code
}
