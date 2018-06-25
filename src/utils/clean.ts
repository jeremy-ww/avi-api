import { UploadFile } from '../interfaces'
import * as fs from 'fs'

export default (file: UploadFile | undefined) => {
  if (file) {
    fs.unlink(file.path, (err: Error) => {
      if (err) throw err
    })
  }
}
