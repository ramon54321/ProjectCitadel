export const configKey = process.env['RUN_ENV'] || 'development'

const general = {
  name: 'Project Citadel',
}

const development = {
  ...general,
  port: 12000,
  syslog: false,
};

const production = {
  ...general,
  port: 80,
  syslog: true,
}

const config = {
  development,
  production,
}

export default config[configKey]
