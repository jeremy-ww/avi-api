import { UploadFile, TecentResponse } from '../interfaces'
import * as COS from 'cos-nodejs-sdk-v5'
import { https } from '../utils/url'

export interface TecentOptions {
  SecretId: string
  SecretKey: string
  Bucket: string
  Region: string
}

export default ({ name, path }: UploadFile, options: TecentOptions) => {
  return new Promise((resolve, reject) => {
    const { SecretId, SecretKey, Bucket, Region } = options
    const cos = new COS({ SecretId, SecretKey })
    const params = {
      Bucket,
      Region,
      Key: name,
      FilePath: path
    }
    cos.sliceUploadFile(params, (err: Error, data: TecentResponse) => {
      if (err) return reject(err)
      resolve({ url: https(data.Location), result: data })
    })
  })
}
