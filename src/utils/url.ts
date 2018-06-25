import { URL } from 'url'

export const https = (url: string) => {
  const link = new URL(url.startsWith('http') ? url : ('https://' + url))
  link.protocol = 'https:'
  return link.toString()
}
