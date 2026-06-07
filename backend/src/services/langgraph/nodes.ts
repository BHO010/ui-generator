import { ChatOllama } from '@langchain/ollama'
import { HumanMessage, SystemMessage } from '@langchain/core/messages'
import { parse } from '@babel/parser'
import { END } from '@langchain/langgraph'
import { GraphStateType } from './state'
import { COMPONENT_DOCS } from './componentDocs'

const MAX_FIX_ATTEMPTS = 3

function getModel(): ChatOllama {
  return new ChatOllama({
    baseUrl: process.env['OLLAMA_BASE_URL'] ?? 'http://localhost:11434',
    model: process.env['OLLAMA_MODEL'] ?? 'llama3',
  })
}

function extractCodeBlock(text: string): string {
  const match = text.match(/```(?:tsx?|jsx?|react)?\n?([\s\S]*?)```/)
  if (match?.[1]) return match[1].trim()
  return text.trim()
}

function extractContent(content: unknown): string {
  if (typeof content === 'string') return content
  if (Array.isArray(content)) {
    return content
      .map((c: unknown) => (typeof c === 'string' ? c : (c as Record<string, string>).text ?? ''))
      .join('')
  }
  return String(content)
}

export async function plannerNode(state: GraphStateType): Promise<Partial<GraphStateType>> {
  const model = getModel()
  const response = await model.invoke([
    new SystemMessage(
      `You are a UI planning expert. Given a user request, create a concise plan for a React component.
Describe the component name, internal state variables, and key UI elements. Keep it brief and structured.
Important: the component must accept NO props. All data and values must be hardcoded or derived internally.`,
    ),
    new HumanMessage(`Plan a React component for: ${state.prompt}`),
  ])
  return { plan: extractContent(response.content) }
}

export async function generatorNode(state: GraphStateType): Promise<Partial<GraphStateType>> {
  const model = getModel()
  const response = await model.invoke([
    new SystemMessage(
      `You are an expert React developer. Generate a complete, runnable React component based on the plan.

COMPONENTS
${COMPONENT_DOCS}

Additional rules:
- Use functional components with TypeScript
- The component must accept NO props — define it as \`export default function ComponentName()\` with no parameters
- All data, labels, and values must be hardcoded as constants or literals inside the component body
- Export the component as default export
- Only use components in COMPONENTS else use html.
- Do not create/import components that are not provided in COMPONENTS.
- Return ONLY the code inside a single \`\`\`tsx code block, nothing else`,
    ),
    new HumanMessage(`Generate a React component based on this plan:\n${state.plan}`),
  ])
  const code = extractCodeBlock(extractContent(response.content))
  return { code, fixAttempts: 0, finalCode: '' }
}

export function validatorNode(state: GraphStateType): Partial<GraphStateType> {
  const errors: string[] = []

  try {
    parse(state.code, {
      plugins: ['jsx', 'typescript'],
      sourceType: 'module',
    })
  } catch (e) {
    errors.push(`Syntax error: ${(e as Error).message}`)
  }

  if (!state.code.includes('export default')) {
    errors.push('Component must have a default export')
  }

  if (/export default function \w+\s*\(\s*\{/.test(state.code) || /export default function \w+\s*\(\s*\w/.test(state.code)) {
    errors.push('Component must not accept any props — define it as function ComponentName() with no parameters')
  }

  if (errors.length === 0) {
    return { errors: [], finalCode: state.code }
  }
  return { errors }
}

export async function fixerNode(state: GraphStateType): Promise<Partial<GraphStateType>> {
  const model = getModel()
  const response = await model.invoke([
    new SystemMessage(
      `You are an expert React developer. Fix the provided React component code.

${COMPONENT_DOCS}

Additional rules:
- The component must accept NO props — it must be defined as \`export default function ComponentName()\` with no parameters
- All data, labels, and values must be hardcoded as constants or literals inside the component body
- Do NOT introduce any props, external variables, or imported data
- Return ONLY the fixed code inside a \`\`\`tsx code block, nothing else`,
    ),
    new HumanMessage(
      `Fix the following errors in the React component:

Errors:
${state.errors.join('\n')}

Current code:
\`\`\`tsx
${state.code}
\`\`\``,
    ),
  ])
  const fixedCode = extractCodeBlock(extractContent(response.content))
  return { code: fixedCode, fixAttempts: state.fixAttempts + 1 }
}

export function routeAfterValidation(state: GraphStateType): string | typeof END {
  if (state.errors.length > 0 && state.fixAttempts < MAX_FIX_ATTEMPTS) {
    return 'fixer'
  }
  return END
}
