import { Client } from 'pg'
import { logDatabase } from './logger/logger'

import config from './config'
import * as escape from 'pg-escape'
import { LogLevel } from './logger/logLevel';

const client = new Client({
  user: config.dbUser,
  host: config.dbHost,
  database: config.dbDatabase,
  password: config.dbPassword,
  port: config.dbPort,
})

client.connect(err => {
  if (err) {
    logDatabase(err, LogLevel.Fatal)
    process.exit(1)
  } else {
    logDatabase(`Connected to ${config.dbHost}:${config.dbPort}`)
  }
})

export enum WordType {
  Noun,
  Verb,
  Adjective,
  Adverb,
  Pronoun,
  Exclamation,
}

export enum Level {
  A1 = 1,
  A2 = 2,
  B1 = 3,
  B2 = 4,
  C1 = 5,
  C2 = 6,
}

export async function getCard(_id: number) {
  const res = await client.query('SELECT * FROM cards')
  logDatabase(res)
  return res.rows[0]
}

export async function postCard(card: any) {
  const query = escape("INSERT INTO cards (data) VALUES (%Q)", JSON.stringify(card))
  const res = await client.query(query)
  logDatabase(res)
}
