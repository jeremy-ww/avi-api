import { isProd } from '../utils/'
import * as mount from 'koa-mount'
import * as grant from 'grant-koa'
import * as config from 'config'
import * as url from 'url'

const LOCAL_DOMAIN: string = config.get('LOCAL_DOMAIN')
const PROD_DOMAIN: string = config.get('PROD_DOMAIN')
const GOOGLE: object = config.get('GOOGLE')
const FLICKR: object = config.get('FLICKR')
const IMGUR: object = config.get('IMGUR')

const server = isProd
  ? { protocol: 'https', host: url.parse(PROD_DOMAIN).host }
  : { protocol: 'http', host: url.parse(LOCAL_DOMAIN).host }

export default mount(grant({
  server: {
    ...server,
    transport: 'session'
  },
  google: {
    ...GOOGLE,
    scope: ['profile', 'email'],
    callback: '/auth/google/callback'
  },
  imgur: {
    ...IMGUR,
    custom_params: { response_type: 'token' },
    callback: '/auth/imgur/callback'
  },
  flickr: {
    ...FLICKR,
    scope: ['write'],
    callback: '/auth/flickr/callback'
  }
}))
