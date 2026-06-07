import { Annotation } from '@langchain/langgraph'

export const GraphState = Annotation.Root({
  prompt: Annotation<string>(),
  plan: Annotation<string>(),
  code: Annotation<string>(),
  errors: Annotation<string[]>(),
  fixAttempts: Annotation<number>(),
  finalCode: Annotation<string>(),
})

export type GraphStateType = typeof GraphState.State
