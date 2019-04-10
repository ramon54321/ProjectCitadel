import axios, { AxiosResponse } from 'axios'
import { getCookie } from './utils';

export async function signin(email: string, password: string): Promise<AxiosResponse> {
  return axios.post('/api/signin', {
    email: email,
    password: password,
  }).catch(error => {
    return error.response
  })
}

export async function signup(email: string, password: string): Promise<AxiosResponse> {
  return axios.post('/api/signup', {
    email: email,
    password: password,
  }).catch(error => {
    return error.response
  })
}

export async function signout(): Promise<AxiosResponse> {
  const token = getCookie('token')
  return axios.post('/api/signout', {}, {
    headers: {
      token: token
    }
  }).catch(error => {
    return error.response
  })
}
