import { StateGraph, START, END } from '@langchain/langgraph'
import { GraphState } from './state'
import { plannerNode, generatorNode, validatorNode, fixerNode, routeAfterValidation } from './nodes'

const workflow = new StateGraph(GraphState)
  .addNode('planner', plannerNode)
  .addNode('generator', generatorNode)
  .addNode('validator', validatorNode)
  .addNode('fixer', fixerNode)
  .addEdge(START, 'planner')
  .addEdge('planner', 'generator')
  .addEdge('generator', 'validator')
  .addConditionalEdges('validator', routeAfterValidation, {
    fixer: 'fixer',
    [END]: END,
  })
  .addEdge('fixer', 'validator')

export const graph = workflow.compile()
