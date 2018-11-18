import config from "./config";

export enum LogLevel {
  Trace = 'TRACE',
  Info = 'INFO',
  Warning = 'WARNING',
  Error = 'ERROR',
  Fatal = 'FATAL',
}

const levels = {}
levels[LogLevel.Fatal] = 5
levels[LogLevel.Error] = 4
levels[LogLevel.Warning] = 3
levels[LogLevel.Info] = 2
levels[LogLevel.Trace] = 1

function log(message: string, logLevel: LogLevel = LogLevel.Info) {
  const level = levels[logLevel]
  if (level >= levels[config.logLevel]) {
    console.log(`[${level}] ${message}`)
  }
}

export function logAPI(message: string, logLevel: LogLevel = LogLevel.Info) {
  log(`[API] ${message}`, logLevel)
}

export function logPage(message: string, logLevel: LogLevel = LogLevel.Info) {
  log(`[PAGE] ${message}`, logLevel)
}