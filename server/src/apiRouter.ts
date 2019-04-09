import * as express from 'express'
import { logAPI } from './logger/logger'
import { retrieveUsersByEmail, createUser } from './database/users'
import { createSession, deleteSessionByUser, retrieveSessionByToken } from './database/sessions'
import { verify } from 'jsonwebtoken'
import { generateSalt, getPasswordHash } from './utils'

const apiRouter = express.Router()

apiRouter.use((_req, _res, next) => {
  logAPI('Received Request')
  next()
})

apiRouter.post('/signin', async (req, res) => {
  const users = await retrieveUsersByEmail(req.body.email)
  if (users.length === 0 || !users[0].data) {
    return res.status(403).json({
      status: 'error',
      error: 'invalid_credentials',
    })
  }
  const password = getPasswordHash(req.body.password, users[0].data.salt)
  if (password !== users[0].data.password) {
    return res.status(403).json({
      status: 'error',
      error: 'invalid_credentials',
    })
  }
  const sessionToken = await createSession(users[0])
  return res.json({
    status: 'success',
    token: sessionToken,
  })
})

apiRouter.post('/user', async (req, res) => {
  try {
    const email = req.body.email
    const salt = generateSalt()
    const password = getPasswordHash(req.body.password, salt)
    const users = await retrieveUsersByEmail(email)
    if (users.length > 0) {
      return res.json({
        status: 'error',
        error: 'user_exists',
      })
    }
    await createUser(email, password, salt)
    return res.json({
      status: 'success',
    })
  } catch (err) {
    return res.status(400).json({
      status: 'error',
      error: err,
    })
  }
})

// -----------------------------------------------------
//   Secure Routes
// -----------------------------------------------------

apiRouter.use('/*', async (req, res, next) => {
  console.log('Secure Route')
  try {
    const token = req.headers.token as string
    await retrieveSessionByToken(token)
    return next()
  } catch (err) {
    return res.status(403).json({
      status: 'error',
      error: 'unauthorized',
    })
  }
})

apiRouter.post('/signout', async (req, res) => {
  try {
    const users = await retrieveUsersByEmail(req.body.email)
    if (!users[0]) {
      return res.status(400).json({
        status: 'error',
        error: 'sign_out_error',
      })
    }
    await deleteSessionByUser(users[0])
    return res.json({
      status: 'success',
    })
  } catch (err) {
    return res.status(400).json({
      status: 'error',
      error: 'sign_out_error',
    })
  }
})

apiRouter.get('/user', async (req, res) => {
  try {
    const token = req.headers.token as string
    const tokenInfo = verify(token, 'serversecret1')
    return res.json(tokenInfo)
  } catch (err) {
    return res.status(400).json({
      status: 'error',
      error: err,
    })
  }
})

export default apiRouter

// const token = sign({username: "anton"}, "serversecret1")
//   const isValid = verify(token, "serversecret1")
//   const decoded = decode(token)
//   res.json({
//     token,
//     isValid,
//     decoded
//   })

// apiRouter.post('/pay', async (req, res) => {
//   const token = req.body.stripeToken
//   const email = req.body.stripeEmail
//   logAPI(req.body)
//   const customer = await createCustomer(token, email)
//   res.send(customer)
// })

// apiRouter.get('/card/:id', async (req, res, _next) => {
//   const card = await getCard(req.params.id)
//   res.send(card)
// })

// apiRouter.get('/cardpost/:id', async (_req, res, _next) => {
//   const card = await postCard({
//     id: 1,
//     wordLanguageA: 'hi',
//     wordLanguageB: 'moi',
//     meaning:
//       "The exclamation of saying 'hello' or 'hi'. Note that when 'moi' is used as goodbye or bye also, often times by following with another 'moi'. The same rules apply for 'hei'.",
//     sentences: [
//       ['Moi! Tervetuloa Suomeen!', 'Hi! Welcome to Finland!'],
//       ['Moi! Hauska tutustua.', 'Hi! Nice to meet you.'],
//       ['Moi moi!', 'Bye!'],
//     ],
//     wordType: WordType.Exclamation,
//     usageAffect: 'Often used by itself, or followed by a pause or comma.',
//     similiarWordsWithDifferentMeaning: ['toi', 'noi'],
//     differentWordsWithSimilarMeaning: ['hei', 'terve', 'heippa', 'halo', 'paiva'],
//     spokenVariations: ['Moikka!'],
//     level: Level.A1,
//     color: '#FFA38F',
//   })
//   res.send(card)
// })

// import { getCard, postCard, WordType, Level } from './database'
// import { createCustomer } from './payment'

// export enum WordType {
//   Noun,
//   Verb,
//   Adjective,
//   Adverb,
//   Pronoun,
//   Exclamation,
// }

// export enum Level {
//   A1 = 1,
//   A2 = 2,
//   B1 = 3,
//   B2 = 4,
//   C1 = 5,
//   C2 = 6,
// }

// export async function getCard(_id: number) {
//   const res = await client.query('SELECT * FROM card')
//   logDatabase(res)
//   return res.rows[0]
// }

// export async function postCard(card: any) {
//   const query = escape('INSERT INTO card (data) VALUES (%Q)', JSON.stringify(card))
//   const res = await client.query(query)
//   logDatabase(res)
// }
