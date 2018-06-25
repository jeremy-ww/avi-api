const PNGImage = require('pngjs-image')
const uuidv4 = require('uuid/v4')
require('jasmine-expect')
const fs = require('fs')

jest.setTimeout(400000)

if (process.env.CI && !fs.existsSync('config/test.json')) {
  fs.copyFileSync('config/default.json.example', 'config/test.json')
}

const resolve = subpath => require('path').resolve(__dirname, subpath)
const files = []

global.getAviTestFile = function () {
  return global._file_for_avi_
}

beforeEach(done => {
  const image = PNGImage.createImage(100, 300)
  const name = uuidv4() + '.png'
  const path = resolve(name)

  image.writeImage(path, err => {
    if (err) throw err

    const file = global._file_for_avi_ = { name, path }
    files.push(file)
    done()
  })
})

afterAll(() => {
  files.forEach(({ path }) => {
    try {
      fs.unlinkSync(path)
    } catch (e) { console.error(e) }
  })
})
