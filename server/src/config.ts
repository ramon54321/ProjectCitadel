import { LogLevel } from './logger'

export const configKey = process.env['RUN_ENV'] || 'development'

const general = {
  name: 'Project Citadel',
  dbHost: process.env.DBHOST_PRODUCTION,
  dbPort: process.env.DBPORT_PRODUCTION,
  dbUser: process.env.DBUSER_PRODUCTION,
  dbPassword: process.env.DBPASSWORD_PRODUCTION,
  dbDatabase: process.env.DBDATABASE_PRODUCTION,
}

const development = {
  ...general,
  port: 12000,
  logLevel: LogLevel.Trace,
}

const production = {
  ...general,
  port: 3000,
  logLevel: LogLevel.Info,
}

const config = {
  development,
  production,
}

export default config[configKey]
