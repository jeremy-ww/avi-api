import { UploadFile, QiniuResponse } from '../global'
import * as qiniu from 'qiniu'
import * as url from 'url'
import * as fs from 'fs'

export interface QiniuOptions {
  accessKey: string
  secretKey: string
  bucket: string
  domain: string
}

export default ({ name, path }: UploadFile, options: QiniuOptions) => {
  const { accessKey, secretKey, bucket, domain } = options
  const mac = new qiniu.auth.digest.Mac(accessKey, secretKey)
  const putPolicy = new qiniu.rs.PutPolicy({ scope: bucket })
  const uploadToken = putPolicy.uploadToken(mac)

  const formUploader = new qiniu.form_up.FormUploader(new qiniu.conf.Config())
  const putExtra = new qiniu.form_up.PutExtra()

  return new Promise((resolve, reject) => {
    formUploader.putStream(
      uploadToken,
      name,
      fs.createReadStream(path),
      putExtra,
      (err, body: QiniuResponse, info: any) => {
        if (err) reject(err)
        resolve({ url: url.resolve(domain, body.key), result: body })
      }
    )
  })
}
