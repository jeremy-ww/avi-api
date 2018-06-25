import { UploadFile, SmmsResponse } from '../interfaces'
import * as FormData from 'form-data'
import * as config from 'config'
import axios from 'axios'
import * as fs from 'fs'

const API: string = config.get('SMMS.upload')

export default async ({ name, path }: UploadFile) => {
  const form = new FormData()
  form.append('smfile', fs.createReadStream(path), name)
  const response = await axios.post(API, form, { headers: form.getHeaders() })
  const { data: { data } } = response
  return { url: data.url, result: data as SmmsResponse }
}
