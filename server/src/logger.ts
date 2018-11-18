export enum LogLevel {
  Trace = 'TRACE',
  Info = 'INFO',
  Warning = 'WARNING',
  Error = 'ERROR',
  Fatal = 'FATAL',
}

export function log(message: string, level: LogLevel = LogLevel.Info) {
  console.log(`[${level}] ${message}`)
}