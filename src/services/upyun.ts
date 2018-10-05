import { UploadFile, UpyunResponse } from '../global'
import * as upyun from 'upyun'
import * as url from 'url'
import * as fs from 'fs'

export interface UpyunOptions {
  operator: string
  password: string
  bucket: string
  domain: string
}

export default async ({ name, path }: UploadFile, options: UpyunOptions) => {
  const { domain, operator, password, bucket } = options
  const service = new upyun.Service(bucket, operator, password)
  const client = new upyun.Client(service)

  const result: UpyunResponse = await client.putFile(name, fs.createReadStream(path))
  return { url: url.resolve(domain, name), result }
}
