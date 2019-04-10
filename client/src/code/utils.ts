import { AxiosResponse } from "axios";

export function setItem(key: string, value: string): void {
  window.localStorage.setItem(key, value)
}

export function getItem(key: string): string | undefined {
  const value = window.localStorage.getItem(key)
  return value ? value : undefined
}

export function setCookie(key: string, value: string, seconds?: number): void {
  if (seconds) {
    const expDate = new Date()
    expDate.setTime(expDate.getTime() + (seconds * 1000))
    document.cookie = `${key}=${value};expires=${expDate.toUTCString()};path=/`
  } else {
    document.cookie = `${key}=${value};path=/`
  }
}

export function getCookie(key: string): string | undefined {
  const value = "; " + document.cookie
  const parts = value.split("; " + key + "=")
  if (parts && parts.length > 1) {
    return parts.pop()!.split(";").shift()
  } else {
    return undefined
  }
}

export function deleteCookie(key: string): void {
  document.cookie = `${key}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/;`
}

export interface ApiHandler {
  onFail: () => void
  onError: (data: any) => void
  onSuccess: (data: any) => void
}

export function callApi(apiHandler: ApiHandler, response: Promise<AxiosResponse>) {
  response.then(res => {
    if (!res || !res.data) {
      apiHandler.onFail()
    } else if (res.data.status !== 'success') {
      apiHandler.onError(res.data)
    } else {
      apiHandler.onSuccess(res.data)
    }
  })
}