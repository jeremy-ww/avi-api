import { UploadFile } from '../global'
import * as fs from 'fs'

export default (file: UploadFile | undefined) => {
  if (file) {
    fs.unlink(file.path, (err: Error) => {
      if (err) throw err
    })
  }
}
