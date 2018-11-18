import * as express from 'express'
import { logPage } from './logger'

const pageRouter = express.Router()

pageRouter.use((_req, _res, next) => {
  logPage('Received Request')
  next()
})

pageRouter.get('/hello', (_req, res, _next) => {
  res.send('Hello!')
})

export default pageRouter