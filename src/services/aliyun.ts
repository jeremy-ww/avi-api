import { UploadFile, AliyunResponse } from '../interfaces'
import { https } from '../utils/url'
import * as oss from 'ali-oss'
import * as co from 'co'

export interface AliyunOptions {
  accessKeyId: string
  accessKeySecret: string
  bucket: string
  region: string
}

export default async ({ name, path }: UploadFile, options: AliyunOptions) => {
  const store = oss(options)

  return co(function * () { return yield store.put(name, path) })
    .then((result: AliyunResponse) => {
      return { url: https(result.url), result }
    })
}
