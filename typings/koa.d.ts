import { Context } from 'koa'

declare module 'koa' {

  interface Context {
    session: any
  }
}
