import { UploadFile, UploadType, UploadServicesMaping } from '../global'
import isEmpty from 'sewing/dist/isEmptyValueObj'
import uniqFileName from '../utils/uniqFileName'
import download from '../utils/download'
import Response from '../utils/response'
import setting from '../models/setting'
import clean from '../utils/clean'
import get from 'sewing/dist/get'
import { Context } from 'koa'

import amazon from '../services/amazon'
import flickr from '../services/flickr'
import imgur from '../services/imgur'
import aliyun from '../services/aliyun'
import tecent from '../services/tecent'
import qiniu from '../services/qiniu'
import upyun from '../services/upyun'
import smms from '../services/smms'

const services: UploadServicesMaping = {
  amazon,
  imgur,
  flickr,
  aliyun,
  tecent,
  qiniu,
  upyun,
  smms
}

const nonAvaliable = (type: UploadType, options: object, user: object) => {
  return !['smms'].includes(type)
    ? ['imgur', 'flickr'].includes(type) ? isEmpty(user) : isEmpty(options)
    : false
}

export default async (ctx: Context) => {
  const file = ctx.request.files && ctx.request.files.file
  const { type = 'smms', url } = ctx.request.body
  const { session: { user } } = ctx
  if (!file && !url) return (ctx.body = Response.fileRequired())

  const service = services[type] || services['smms']
  const options = user.id ? (await setting.find(user.id))[type] : undefined
  const secretOAuthUserInfo = get(ctx, `session.oauth.${type}`)

  if (nonAvaliable(type, options, secretOAuthUserInfo)) {
    ctx.body = Response.badRequest()
  } else {
    const downloadedFileByURL = url ? await download(url) : undefined
    const upload = (downloadedFileByURL || file) as UploadFile
    upload.name = uniqFileName(upload.name)
    const result = await service(
      upload,
      options,
      secretOAuthUserInfo
    )
    ctx.body = result instanceof Response
      ? result
      : Response.success({ url: result.url })
    clean(downloadedFileByURL)
  }
}
