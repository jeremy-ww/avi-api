import grant from './src/middlewares/grant'
import avi from './src/middlewares/avi'
import * as session from 'koa-session'
import * as logger from 'koa-logger'
import * as koaBody from 'koa-body'
import router from './src/routers/'
import * as cors from '@koa/cors'
import * as config from 'config'
import * as Koa from 'koa'
import './src/utils/db'

const PORT = config.get('PORT')
// should be same as nginx conf
const FILE_SIZE_LIMIT = '200mb'
const app = new Koa()

app.keys = ['avi']

app.use(avi)
app.use(session(app))
app.use(koaBody({
  formLimit: FILE_SIZE_LIMIT,
  formidable: { maxFieldsSize: 200 * 1024 * 1024 },
  multipart: true
}))
app.use(cors({ credentials: true }))
app.use(logger())
app.use(grant)
app
  .use(router.routes())
  .use(router.allowedMethods())

app.listen(PORT)
