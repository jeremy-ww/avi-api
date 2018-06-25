import * as url from 'url'

const { URL } = url

export default (url: string) => {
  try {
    /* tslint:disable no-unused-expression */
    new URL(url)
    return true
  } catch (e) {
    return false
  }
}
