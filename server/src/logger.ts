import config from './config'
import * as syslog from 'syslog-client'

const syslogClient = syslog.createClient('127.0.0.1', {
  transport: syslog.Transport.Udp
})

export enum LogLevel {
  Trace,
  Info,
  Warning,
  Error,
  Fatal,
}

export function log(message: string, _level: LogLevel = LogLevel.Info) {
  if (config.syslog) {
    syslogClient.log(message, error => console.log(error))
  } else {
    console.log(message)
  }
}