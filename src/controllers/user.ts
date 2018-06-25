import Response from '../utils/response'
import setting from '../models/setting'
import { mapValues } from 'lodash'
import get from 'sewing/dist/get'
import { Context } from 'koa'

interface UserReponse {
  grant?: {
    flickr: string
    imgur: string
  }
  options?: {
    preference: string
  }
  aliyun?: {
    accessKeyId: number
    accessKeySecret: number
    bucket: number
    region: number
  }
  tecent?: {
    SecretId: number
    SecretKey: number
    Bucket: number
    Region: number
  }
  qiniu?: {
    accessKey: number
    secretKey: number
    bucket: number
    domain: number
  }
  upyun?: {
    domain: number
    operator: number
    password: number
    bucket: number
  }
  [prop: string]: object | undefined
}

const secrets = ['amazon', 'aliyun', 'tecent', 'qiniu', 'upyun']

async function response (user: any, session: any) {
  const settings = await setting.find(user.id)
  const reponse: UserReponse = { options: settings.options }
  const grant = {
    flickr: get(session, 'oauth.flickr.raw.username'),
    imgur: get(session, 'oauth.imgur.raw.account_username')
  }
  for (let item of secrets) {
    const cloud = settings[item]
    if (!cloud) continue
    reponse[item] = mapValues(cloud, (v: string) => typeof v === 'string' ? v.length : 0)
  }
  return Response.success(Object.assign(reponse, user, { grant }))
}

export default async (ctx: Context) => {
  const { session, session: { user } } = ctx
  ctx.body = user ? await response(user, session) : Response.unauthorized()
}
