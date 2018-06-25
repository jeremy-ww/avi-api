import * as noUnhandledRejection from 'no-unhandledrejection'
import Response from '../utils/response'
import clean from '../utils/clean'
import log from '../utils/log'
import { Context } from 'koa'

noUnhandledRejection({
  callback (e: Error) {
    console.log(e)
    log.info(e)
  }
})

export default async (ctx: Context, next: Function) => {
  try {
    await next()
  } catch (e) {
    console.info(e)
    log.info(ctx.session.user && ctx.session.user.id)
    log.info(ctx.request)
    log.info(ctx.request.body)
    log.info(ctx.request.files)
    log.error(e)
    ctx.body = Response.fail()
  }
  const file = ctx.request.files && ctx.request.files.file
  clean(file)
}
