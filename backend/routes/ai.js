import { Router } from 'express'
import rateLimit from 'express-rate-limit'
import { AIController } from '../controllers/ai.js'

export const createAIRouter = ({ jobModel }) => {

  const aiRateLimiter = rateLimit({
    windowMs: 60 * 1000, // -> 1 minute
    limit: 5, // -> 5 request per IP per minute
    message: { error: 'Too many attempts please retry later.' },
    legacyHeaders: false,
    standardHeaders: 'draft-8'
  })

  const aiRouter = Router()

  const aiController = new AIController({ jobModel })

  aiRouter.use(aiRateLimiter)

  aiRouter.get('/summary/:id', aiController.getSummary)

  return aiRouter

}