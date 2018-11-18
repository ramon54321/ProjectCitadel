import { LogLevel } from "./logger";

export const configKey = process.env['RUN_ENV'] || 'development'

const general = {
  name: 'Project Citadel',
}

const development = {
  ...general,
  port: 12000,
  logLevel: LogLevel.Trace
}

const production = {
  ...general,
  port: 3000,
  logLevel: LogLevel.Info
}

const config = {
  development,
  production,
}

export default config[configKey]
