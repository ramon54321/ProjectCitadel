export const configKey = process.env['RUN_ENV'] || 'development'

const general = {
  name: 'Project Citadel',
}

const development = {
  ...general,
  port: 12000,
}

const production = {
  ...general,
  port: 3000,
}

const config = {
  development,
  production,
}

export default config[configKey]
