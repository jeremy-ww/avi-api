import map2SearchString from 'sewing/dist/map2SearchString'
import { TecentOCRResponse } from '../interfaces'
import * as config from 'config'
import * as crypto from 'crypto'
import axios from 'axios'

const APP_KEY: string = config.get('OCR.AppKey')
const APP_ID: number = config.get('OCR.AppID')
const API: string = config.get('OCR.api')

interface SignatureParams {
  app_id: number
  time_stamp: number
  nonce_str: string
  image: string
  [prop: string]: number | string
}

const signature = (params: SignatureParams) => {
  const string: string[] = []

  Object.keys(params).sort().forEach(v => {
    string.push(v + '=' + encodeURIComponent(String(params[v])))
  })

  return crypto
    .createHash('md5')
    .update(string.concat(`app_key=${APP_KEY}`).join('&'))
    .digest('hex')
    .toUpperCase()
}

export default async (image: string) => {
  const params = {
    app_id: APP_ID,
    time_stamp: parseInt(String(Date.now() / 1000), 10),
    nonce_str: Math.random().toString(36).slice(2),
    image: image.replace(/^data:[a-z]+?\/[a-z]+?;base64,/g, '')
  }
  Object.assign(params, { sign: signature(params) })
  const { data } = await axios.post(API, map2SearchString(params).slice(1))
  return (data as TecentOCRResponse).data.item_list
}
