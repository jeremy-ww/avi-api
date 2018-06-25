import * as config from 'config'
import axios from 'axios'

const API: string = config.get('GOOGLE.userinfo')

export interface UserInfo {
  id: string
  email: string
  verified_email: boolean
  name: string
  given_name: string
  family_name: string
  picture: string
  locale: string
}

export function userinfo (Bearer: string) {
  return axios.get(API, {
    headers: {
      Authorization: `Bearer ${Bearer}`
    }
  })
}
