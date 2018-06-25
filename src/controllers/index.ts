import { Context } from 'koa'

export default (ctx: Context) => {
  ctx.body = `<style>h2 { margin-top: 10%; font-weight: 200; }</style><h2 align="center">Yeap, It's Avi.</h2>`
}
