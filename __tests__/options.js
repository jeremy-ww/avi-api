module.exports = process.env.CI
  ? name => JSON.parse(process.env[name])
  : name => require('config').get(name)
