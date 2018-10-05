import { UploadFile } from '../global'
import * as uuid from 'uuid/v4'
import * as path from 'path'
import axios from 'axios'
import * as fs from 'fs'
import * as os from 'os'

const tmpdir = os.tmpdir()

export default (url: string) => {
  return new Promise((resolve: (value: UploadFile) => void) => {
    const filename = path.basename(require('url').parse(url).pathname || uuid())
    const filepath = path.resolve(tmpdir, filename)
    const stream = fs.createWriteStream(filepath)
    stream.on('close', () => { resolve({ path: filepath, name: filename }) })

    axios(url, { method: 'get', responseType: 'stream' }).then(response => {
      response.data.pipe(stream)
    }, error => {
      throw error
    })
  })
}
