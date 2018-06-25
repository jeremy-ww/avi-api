import { UploadFile, FlickrResponse, FlickrSize } from '../interfaces'
import * as Flickr from 'flickrapi'
import * as config from 'config'

const API_KEY: string = config.get('FLICKR.key')
const SECRET: string = config.get('FLICKR.secret')

const requestFlickrInstance = new Promise((resolve, reject) => {
  Flickr.tokenOnly({ api_key: API_KEY, secret: SECRET }, (err: Error, flickr: any) => {
    if (err) reject(err)
    resolve(flickr)
  })
})

export default ({ name, path }: UploadFile, options: object, user: any) => {
  return new Promise((resolve, reject) => {
    const photos = { photos: [{ title: name, photo: path }] }
    const FlickrOptions = {
      api_key: API_KEY,
      secret: SECRET,
      user_id: user.raw.user_nsid,
      access_token: user.access_token,
      access_token_secret: user.access_secret
    }

    requestFlickrInstance.then((flickr: any) => {
      Flickr.upload(photos, FlickrOptions, (err: Error, result: any) => {
        if (err) reject(err)
        const options = { api_key: API_KEY, photo_id: result[0] }
        flickr.photos.getSizes(options, (err: Error, result: FlickrResponse) => {
          if (err) reject(err)
          const photo = result.sizes.size.find((size: FlickrSize) => size.label === 'Original')
          resolve({ url: (photo || { source: '' }).source, result })
        })
      })
    }, error => { reject(error) })
  })
}
