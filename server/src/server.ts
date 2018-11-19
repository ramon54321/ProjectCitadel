import * as dotenv from 'dotenv'
dotenv.config()
import * as express from 'express'
import config, { configKey } from './config'
import pageRouter from './pageRouter'
import apiRouter from './apiRouter'
import { log } from './logger'

const app = express()

app.use('/', pageRouter)
app.use('/api', apiRouter)

app.listen(config.port, () => {
  log(`Config: ${configKey}`)
  log(`Port: ${config.port}`)
})
