// import config from './config'

export enum LogLevel {
  Trace,
  Info,
  Warning,
  Error,
  Fatal,
}

export function log(message: string, _level: LogLevel = LogLevel.Info) {
  console.log(message)
}