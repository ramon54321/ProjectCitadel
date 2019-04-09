import { Client } from 'pg'
import { logDatabase } from '../logger/logger'
import config from '../config'
import { LogLevel } from '../logger/logLevel'

const db = new Client({
  user: config.dbUser,
  host: config.dbHost,
  database: config.dbDatabase,
  password: config.dbPassword,
  port: config.dbPort,
})

db.connect(err => {
  if (err) {
    logDatabase(err, LogLevel.Fatal)
    process.exit(1)
  } else {
    logDatabase(`Connected to ${config.dbHost}:${config.dbPort}`)
  }
})

db.query("SET search_path TO 'mock'")

export default db
