import config from '../config'
import { LogLevel } from './logLevel';

const levels = {}
levels[LogLevel.Fatal] = 5
levels[LogLevel.Error] = 4
levels[LogLevel.Warning] = 3
levels[LogLevel.Info] = 2
levels[LogLevel.Trace] = 1

function _log(message: any, logLevel: LogLevel = LogLevel.Info, prefixes: string[] = []) {
  const level = levels[logLevel]
  if (level >= levels[config.logLevel]) {
    message = typeof message === 'object' ? '\n' + JSON.stringify(message, null, 2) : message
    console.log(`[${logLevel}] ${prefixes.map(prefix => '[' + prefix + ']').join(' ')} ${message}`)
  }
}

export function log(message: any, logLevel: LogLevel = LogLevel.Info) {
  _log(message, logLevel, ['GENERAL'])
}

export function logAPI(message: any, logLevel: LogLevel = LogLevel.Info) {
  _log(message, logLevel, ['API'])
}

export function logPage(message: any, logLevel: LogLevel = LogLevel.Info) {
  _log(message, logLevel, ['PAGE'])
}

export function logDatabase(message: any, logLevel: LogLevel = LogLevel.Info) {
  _log(message, logLevel, ['DATABASE'])
}

export function logPayments(message: any, logLevel: LogLevel = LogLevel.Info) {
  _log(message, logLevel, ['PAYMENTS'])
}
