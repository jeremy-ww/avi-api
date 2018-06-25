import { UploadFile, ImgurResponse } from '../interfaces'
import * as FormData from 'form-data'
import * as config from 'config'
import axios from 'axios'
import * as fs from 'fs'

const API: string = config.get('IMGUR.upload')

export default async ({ name, path }: UploadFile, options: object, user: any) => {
  const form = new FormData()
  form.append('image', fs.createReadStream(path), name)
  const headers = {
    ...form.getHeaders(),
    Authorization: `Bearer ${user.access_token}`
  }
  const { data: { data } } = await axios.post(API, form, { headers })
  return { url: data.link, result: data as ImgurResponse }
}
