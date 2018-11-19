import * as express from 'express'
import { logAPI } from './logger'
import { getCard, postCard, WordType, Level } from './database'

const apiRouter = express.Router()

apiRouter.use((_req, _res, next) => {
  logAPI('Received Request')
  next()
})

apiRouter.get('/hello', (_req, res, _next) => {
  res.send('Hello from API!')
})

apiRouter.get('/card/:id', async (req, res, _next) => {
  const card = await getCard(req.params.id)
  res.send(card)
})

apiRouter.get('/cardpost/:id', async (_req, res, _next) => {
  const card = await postCard({
    id: 1,
    wordLanguageA: 'hi',
    wordLanguageB: 'moi',
    meaning:
      "The exclamation of saying 'hello' or 'hi'. Note that when 'moi' is used as goodbye or bye also, often times by following with another 'moi'. The same rules apply for 'hei'.",
    sentences: [
      ['Moi! Tervetuloa Suomeen!', 'Hi! Welcome to Finland!'],
      ['Moi! Hauska tutustua.', 'Hi! Nice to meet you.'],
      ['Moi moi!', 'Bye!'],
    ],
    wordType: WordType.Exclamation,
    usageAffect: 'Often used by itself, or followed by a pause or comma.',
    similiarWordsWithDifferentMeaning: ['toi', 'noi'],
    differentWordsWithSimilarMeaning: ['hei', 'terve', 'heippa', 'halo', 'paiva'],
    spokenVariations: ['Moikka!'],
    level: Level.A1,
    color: '#FFA38F',
  })
  res.send(card)
})

export default apiRouter
