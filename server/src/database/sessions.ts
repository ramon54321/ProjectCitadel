import db from './database'
import { sign } from 'jsonwebtoken'
import { AppUser } from './users'
import { ResponseStatus } from '../utils'

export interface UserSession {
  id: number
  appUserId: number
  token: string
}

export function createSession(user: AppUser): Promise<string> {
  const token = sign({ app_user_id: user.id, email: user.data.email }, 'serversecret1')
  const query = `INSERT INTO user_session (app_user_id, token) VALUES ($1, $2)`
  return db
    .query(query, [user.id, token])
    .then(_ => {
      return token
    })
    .catch(err => {
      throw Error(`db_error: ${err}`)
    })
}

export function retrieveSessionByToken(token: string): Promise<UserSession> {
  const query = `SELECT * FROM user_session WHERE user_session.token = $1`
  return db
    .query(query, [token])
    .then(res => {
      if (res.rowCount > 0) {
        return res.rows[0] as UserSession
      } else {
        throw Error('session_not_found')
      }
    })
    .catch(err => {
      throw Error(`db_error: ${err}`)
    })
}

export function deleteSessionByToken(token: string): Promise<ResponseStatus> {
  const query = `DELETE FROM user_session WHERE user_session.token = $1`
  return db
    .query(query, [token])
    .then(_ => {
      return {
        status: 'success',
      }
    })
    .catch(err => {
      throw Error(`db_error: ${err}`)
    })
}

export function deleteSessionsByUser(user: AppUser): Promise<ResponseStatus> {
  const query = `DELETE FROM user_session WHERE user_session.app_user_id = $1`
  return db
    .query(query, [user.id])
    .then(_ => {
      return {
        status: 'success',
      }
    })
    .catch(err => {
      throw Error(`db_error: ${err}`)
    })
}
