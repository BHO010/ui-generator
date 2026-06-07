import { z } from 'zod'

export const GenerateBodySchema = z
  .object({
    prompt: z
      .string({
        error: (issue) =>
          issue.input === undefined
            ? { message: 'prompt is required' }
            : { message: 'prompt must be a string' },
      })
      .min(1, { error: 'prompt cannot be empty' }),
  })
  .openapi('GenerateBody')

export const GenerateResponseSchema = z
  .object({
    generatedCode: z.string(),
    generatedAt: z.string(),
  })
  .openapi('GenerateResponse')

export type GenerateBody = z.infer<typeof GenerateBodySchema>
export type GenerateResponse = z.infer<typeof GenerateResponseSchema>
