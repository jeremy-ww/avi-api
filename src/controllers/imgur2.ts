import map2SearchString from 'sewing/dist/map2SearchString'
import * as config from 'config'
import { Context } from 'koa'

const CLIENT_DOMAIN = config.get('CLIENT_DOMAIN') + '/setting'
const AUTHORIZE_API = config.get('IMGUR.authorize')
const PROD_DOMAIN = config.get('PROD_DOMAIN')
const CLIENT_ID = config.get('IMGUR.key')

const auth = (ctx: Context) => {
  ctx.redirect(AUTHORIZE_API + map2SearchString({ client_id: CLIENT_ID, response_type: 'token' }))
}

const catchtoken = (ctx: Context) => {
  ctx.body = `
    <script>
      window.location.href = '${PROD_DOMAIN}/auth/imgur/callback?' + location.hash.substring(1)
    </script>
  `
}

const callback = (ctx: Context) => {
  const { access_token, account_id, account_username, refresh_token } = ctx.request.query
  const secrets = {
    access_token,
    refresh_token,
    raw: {
      access_token,
      refresh_token,
      account_id,
      account_username
    }
  }
  ctx.session = {
    oauth: Object.assign(ctx.session.oauth || {}, {
      imgur: secrets
    }),
    user: ctx.session.user
  }
  const lng = ctx.cookies.get('lng') || 'en'
  ctx.redirect(CLIENT_DOMAIN + (lng ? `?lng=${lng}` : ''))
}

export default { auth, catchtoken, callback }
