import * as express from 'express'
import { log } from './logger'

const pageRouter = express.Router()

pageRouter.use((_req, _res, next) => {
  log('[PAGE] Received Request')
  next()
})

pageRouter.get('/hello', (_req, res, _next) => {
  res.send('Hello!')
})

export default pageRouter