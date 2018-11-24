import * as express from 'express'
import { logPage } from './logger/logger'
import * as path from 'path'

const pageRouter = express.Router()

pageRouter.use((_req, _res, next) => {
  logPage('Received Request')
  next()
})

pageRouter.get('/hello', (_req, res, _next) => {
  res.send('Hello!')
})

pageRouter.get('/pay', (_req, res, _next) => {
  res.sendFile(path.resolve('../client/dist/app.html'))
})

export default pageRouter