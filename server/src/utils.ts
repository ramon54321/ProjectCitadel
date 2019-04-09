import { createHash } from 'crypto'

export interface ResponseStatus {
  status: string
}

export function generateSalt() {
  return Math.floor(Math.random() * 100000).toString()
}

export function getPasswordHash(password: string, salt: string) {
  return createHash('sha256').update(password).update(salt).digest('hex')
}