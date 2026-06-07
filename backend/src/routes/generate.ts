import { Router } from 'express'
import { validate } from '../middleware/validate'
import { GenerateBodySchema, GenerateResponseSchema } from '../schemas/generate.schema'
import { generate, generateStream } from '../controllers/generate.controller'
import { registry } from '../openapi/registry'

const router = Router()

registry.registerPath({
  method: 'post',
  path: '/generate',
  summary: 'Generate a React component using AI',
  request: {
    body: {
      content: {
        'application/json': {
          schema: GenerateBodySchema,
        },
      },
    },
  },
  responses: {
    200: {
      description: 'Generated React component code',
      content: {
        'application/json': {
          schema: GenerateResponseSchema,
        },
      },
    },
    400: {
      description: 'Validation error',
    },
    500: {
      description: 'Internal server error',
    },
  },
})

registry.registerPath({
  method: 'post',
  path: '/generate/stream',
  summary: 'Generate a React component with SSE progress events',
  request: {
    body: {
      content: {
        'application/json': {
          schema: GenerateBodySchema,
        },
      },
    },
  },
  responses: {
    200: {
      description: 'Server-sent events stream: progress events then a complete event with the result',
    },
    400: {
      description: 'Validation error',
    },
    500: {
      description: 'Internal server error',
    },
  },
})

router.post('/', validate({ body: GenerateBodySchema }), generate)
router.post('/stream', validate({ body: GenerateBodySchema }), generateStream)

export default router
