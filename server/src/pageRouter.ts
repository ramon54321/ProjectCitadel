import * as express from 'express'
import { logPage } from './logger/logger'
import * as path from 'path'

const pageRouter = express.Router()



// TODO: Move static to subdirectory / router / nginx

pageRouter.use('/static', (_req, _res, next) => {
  logPage('Received Static Request' + _req.url)
  next()
})

pageRouter.use('/static', express.static(path.resolve('../client/dist/static')))

pageRouter.use((_req, _res, next) => {
  logPage('Received Request' + _req.url)
  next()
})

pageRouter.get('/hello', (_req, res, _next) => {
  res.send('Hello!')
})

pageRouter.get('/favicon.ico', (_req, res, _next) => {
  res.sendFile(path.resolve('../client/dist/favicon.ico'))
})

pageRouter.get('/serviceworker', (_req, res, _next) => {
  res.sendFile(path.resolve('../client/dist/serviceworker.js'))
})

pageRouter.get('/app*', (_req, res, _next) => {
  res.sendFile(path.resolve('../client/dist/app.html'))
})

export default pageRouter