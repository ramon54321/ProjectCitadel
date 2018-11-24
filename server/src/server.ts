import * as dotenv from 'dotenv'
dotenv.config()
import { log } from './logger/logger'
import config, { configKey } from './config'
import * as express from 'express'
import * as bodyParser from 'body-parser'
import pageRouter from './pageRouter'
import apiRouter from './apiRouter'

const app = express()

app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

app.use('/api', apiRouter)
app.use('/', pageRouter)

app.listen(config.port, () => {
  log(`Config: ${configKey}`)
  log(`Port: ${config.port}`)
})
