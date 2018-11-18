import * as express from 'express'
import { logAPI } from './logger'

const apiRouter = express.Router()

apiRouter.use((_req, _res, next) => {
  logAPI('Received Request')
  next()
})

apiRouter.get('/hello', (_req, res, _next) => {
  res.send('Hello from API!')
})

export default apiRouter