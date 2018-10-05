import { UploadFile, AmazonResponse } from '../global'
import * as AWS from 'aws-sdk'
import * as fs from 'fs'

export interface AmazonOptions {
  accessKeyId: string
  secretAccessKey: string
  bucket: string
}

export default ({ name, path }: UploadFile, options: AmazonOptions) => {
  return new Promise((resolve, reject) => {
    const { accessKeyId, secretAccessKey, bucket } = options
    const params = { Bucket: bucket, Key: name, Body: fs.createReadStream(path) }
    AWS.config.update({ accessKeyId, secretAccessKey })
    const s3 = new AWS.S3()
    s3.upload(params, (err: Error, data: any) => {
      if (err) reject(err)
      resolve({
        url: data.Location,
        result: data as AmazonResponse
      })
    })
  })
}
