const ocr = require('services/ocr').default
const path = require('path')
const fs = require('fs')

const image = fs.readFileSync(path.resolve(__dirname, '../ocr.jpeg')).toString('base64')

it('ocr', async () => {
  const reponse = await ocr(image)
  expect(reponse.map(v => v.itemstring).join(''))
    .toBe('ABCDEFGHJKLMN 0PQRST')
})
