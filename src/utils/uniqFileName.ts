import * as uuid from 'uuid/v4'
import * as path from 'path'

const keyword = 'image'

export default (filename: string): string => {
  const name = path.basename(filename, path.extname(filename))
  return name === keyword ? uuid() + '_' + filename : filename
}
