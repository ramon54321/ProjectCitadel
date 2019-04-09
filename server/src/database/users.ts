import db from './database'
import { ResponseStatus } from '../utils'

export interface AppUser {
  id: number
  data: {
    email: string
    password: string
    salt: string
  }
}

export function createUser(email: string, password: string, salt: string): Promise<ResponseStatus> {
  const query = `INSERT INTO app_user (data) VALUES ($1)`
  return db
    .query(query, [{
      email: email,
      password: password,
      salt: salt,
    }])
    .then(_ => {
      return {
        status: 'success',
      }
    })
    .catch(err => {
      throw Error(`db_error: ${err}`)
    })
}

export function retrieveUsersById(id: number): Promise<AppUser[]> {
  const query = `SELECT * FROM app_user WHERE app_user.id = $1`
  return db
    .query(query, [id])
    .then(res => {
      return res.rows as AppUser[]
    })
    .catch(err => {
      throw Error(`db_error: ${err}`)
    })
}

export function retrieveUsersByEmail(email: string): Promise<AppUser[]> {
  const query = `SELECT * FROM app_user WHERE app_user.data->>'email' = $1`
  return db
    .query(query, [email])
    .then(res => {
      return res.rows as AppUser[]
    })
    .catch(err => {
      throw Error(`db_error: ${err}`)
    })
}

export async function retrieveUsersByToken(token: string): Promise<AppUser[]> {
  const query = `SELECT app_user.id, data FROM app_user INNER JOIN user_session ON app_user.id = user_session.app_user_id WHERE user_session.token = $1`
  return db
    .query(query, [token])
    .then(res => {
      return res.rows as AppUser[]
    })
    .catch(err => {
      throw Error(`db_error: ${err}`)
    })
}

export async function updateUser(user: AppUser): Promise<ResponseStatus> {
  const query = `UPDATE app_user SET data = $1 WHERE app_user.id = $2`
  return db
    .query(query, [user.data, user.id])
    .then(_ => {
      return {
        status: 'success',
      }
    })
    .catch(err => {
      throw Error(`db_error: ${err}`)
    })
}
