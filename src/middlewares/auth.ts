import isEmpty from 'sewing/dist/isEmpty'
import Response from '../utils/response'
import { Context } from 'koa'

function unauthorized (ctx: Context) {
  ctx.body = Response.unauthorized()
}

async function base (ctx: Context, next: Function) {
  const { session: { user } } = ctx
  if (isEmpty(user) || !user.id) {
    unauthorized(ctx)
  }
  await next()
}

async function upload (ctx: Context, next: Function) {
  const { request: { body: { type = 'smms' } } } = ctx
  if (!['', 'smms'].includes(type)) {
    await base(ctx, next)
  } else {
    await next()
  }
}

export default { base, upload }
