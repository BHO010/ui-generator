import { NextFunction, Request, Response } from 'express'
import { generateComponent, generateComponentStream } from '../services/generate.service'
import { GenerateBody } from '../schemas/generate.schema'

export async function generate(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const { prompt } = req.body as GenerateBody
    console.log("prompt", prompt)
    const generatedCode = await generateComponent(prompt)
    res.status(200).json({
      prompt: prompt,
      model: process.env['OLLAMA_MODEL'],
      generatedCode,
      generatedAt: new Date().toISOString(),
    })
  } catch (err) {
    next(err)
  }
}

export async function generateStream(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const { prompt } = req.body as GenerateBody

    res.setHeader('Content-Type', 'text/event-stream')
    res.setHeader('Cache-Control', 'no-cache')
    res.setHeader('Connection', 'keep-alive')
    res.flushHeaders()

    for await (const event of generateComponentStream(prompt)) {
      res.write(`data: ${JSON.stringify(event)}\n\n`)
    }

    res.end()
  } catch (err: any) {
    console.log("err", err.toString())
    if (res.headersSent) {
      res.write(`data: ${JSON.stringify({ error: 'Stream error' })}\n\n`)
      res.end()
    } else {
      next(err)
    }
  }
}
