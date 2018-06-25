import * as log4js from 'log4js'

log4js.configure({
  appenders: { cheese: { type: 'file', filename: 'cheese.log' } },
  categories: { default: { appenders: ['cheese'], level: 'info' } }
})

export default log4js.getLogger('cheese')
