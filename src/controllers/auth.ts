import { userinfo, UserInfo } from '../utils/google'
import get from 'sewing/dist/get'
import * as config from 'config'
import { Context } from 'koa'

// /connect/google/callback => google
// /connect/imgur/logout    => imgur
const GRANT_PROVIDER_EXGREP = /^\/auth\/(.+?)\/(?:callback|logout)$/
const CLIENT_DOMAIN = config.get('CLIENT_DOMAIN') + '/setting'

function extractProfile (user: UserInfo) {
  return {
    displayName: user.name,
    id: user.id,
    image: user.picture
  }
}

function extractGrantProvider (ctx: Context) {
  return ctx.path.match(GRANT_PROVIDER_EXGREP)![1]
}

const setSessionAndRedirect = async (ctx: Context, provider: string, secrets: any) => {
  ctx.session = {
    oauth: Object.assign(ctx.session.oauth || {}, {
      [provider]: secrets
    }),
    user: ctx.session.user
  }
  if (provider === 'google') {
    if (secrets) {
      try {
        const { data } = await userinfo(get(secrets, 'access_token'))
        ctx.session.user = extractProfile(data)
      } catch (e) {
        ctx.session.user = undefined
      }
    } else {
      ctx.session.user = undefined
    }
  }
}

export async function logout (ctx: Context) {
  const provider = extractGrantProvider(ctx)
  await setSessionAndRedirect(ctx, provider, null)
  ctx.redirect(ctx.headers.referer || CLIENT_DOMAIN)
}

export async function callback (ctx: Context) {
  const provider = extractGrantProvider(ctx)
  const { grant } = ctx.session
  if (grant && (grant.provider === provider) && grant.response && !grant.response.error) {
    await setSessionAndRedirect(ctx, provider, grant.response)
    const lng = ctx.cookies.get('lng') || 'en'
    ctx.redirect(CLIENT_DOMAIN + (lng ? `?lng=${lng}` : ''))
  } else {
    await logout(ctx)
  }
}
